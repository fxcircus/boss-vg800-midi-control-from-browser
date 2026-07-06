# Voice Leading for the Chords Section — Research

Feasibility + design + effort study for adding **voice leading** to the omnichord
Chords section, so that (e.g.) in C major you can strum the *same few strings* and
hear chords change smoothly — common tones held, one voice gliding a step — instead
of every button jumping to its own root-position spread.

**Status:** research only, nothing built. **Date:** 2026-07-06.
Verified by an independent adversarial pass (see §Feasibility — the ±3 result is tight).
Implementation plan: **`voice-leading-plan.md`** (movable-cluster design, phased).

---

## TL;DR

**Yes, and the hardware is on your side.** Your exact use case — a tight voicing on a
fixed set of strings, changing smoothly between chords — is the *one* place on this
device where textbook voice leading is well-posed. Every diatonic triad in all 12
keys fits on the top 3 strings with per-string bends of **at most ±3 semitones**,
leaving ~9 semitones of slack on each string to spend on smoothness.

**But there's a fork you have to choose up front** (this is the crux):

- **What you literally described** — "hold the common tones, glide the one moving
  voice" — needs a **stateful** voicer (it must remember the previous chord's
  voicing). That's **Medium effort, ~1–2 focused days** on a top‑3/4 subset. The
  trade-off: it's *history-dependent* — the same button can produce a slightly
  different shape depending on what you played before.
- A simpler **stateless "grip"** (always voice in a fixed register, no memory) is
  ~1 day and fully deterministic, but it does **not** reliably hold common tones —
  it gives tight, in-range, low-*average*-motion voicings, not the "one voice
  glides, others hold" feel. It's a good consolation, not the thing you asked for.

Recommendation: if the mental model is "same strings, one voice moves," **go
straight to the stateful bounded solver on the top 3–4 strings** (with a re-center
gesture), rather than shipping the stateless grip and calling it done.

---

## Why today's voicings don't voice-lead

`voiceChord(rootPc, formula)` is a **pure, stateless function of `(root, formula)`**.
For every chord it slams the root to the octave nearest the low‑E string
(`d = rootPc−4` → `bass = 40+d`) and stacks a fixed `[R,5,color,3,5,R]` template.
No argument references the outgoing chord, so common tones are never held and
inter-chord motion is just whatever two independent spreads happen to differ by.

Measured on C‑major diatonic triads (same-string semitone motion, all 6 strings):
**7 · 12 · 11 · 12 · 11 · … · 62** — averaging **~19 st/change**, and the B°
chord leaps **62 st** because its root resets an octave in the bass.

The fix is structural, not a rewrite: voice leading needs a *previous voicing* input
that `voiceChord` doesn't take — and that input **already exists as live state**
(§Integration).

---

## The constraint that shapes everything

Each string bends only ±12 from its **own** standard open pitch
(`STD_MIDI = [64,59,55,50,45,40]`). So each string is a fixed reachable window:

| String | Std | Reachable band |
|---|---|---|
| 1 high E | 64 | 52–76 (E3–E5) |
| 2 B | 59 | 47–71 (B2–B4) |
| 3 G | 55 | 43–67 (G2–G4) |
| 4 D | 50 | 38–62 (D2–D4) |
| 5 A | 45 | 33–57 (A1–A3) |
| 6 low E | 40 | 28–52 (E1–E3) |

Two facts follow, and they decide the whole design:

1. **All six windows intersect at exactly one pitch (MIDI 52 / E3).** A tight shared
   register across *all six* strings literally cannot exist — the octave spread the
   current engine makes is **forced**, not stylistic. On 6 strings the low ones must
   always leap to supply bass roots. **Voice leading therefore belongs on the upper
   strings, not all six.**
2. **The top strings overlap generously.** Strings 1–3 share ~15 semitones of span
   (52–67); strings 1–4 share ~10 (52–62). Your "same three strings" idea maps
   *exactly* onto this overlap band.

**The drift trap.** A naïve greedy "nearest note" solver over a rising run drifts
upward and hits the ceiling (it breaks ±12 by the B chord). Reachability isn't the
problem — you just have to **bound the register** (a soft pull toward a center
register, or an octave-reset guard around ±9) and then spend the remaining slack on
smoothness. Bound the register; don't chase nearest-absolute.

Bonus: same-string offset delta = physical bend travel = the length of the on-screen
`.slide` glide. **Minimizing voice motion also minimizes the visible/audible
portamento** — smoother leading looks cleaner too.

---

## The design space (two solvers, a table, a scope)

| Option | What it is | Deterministic? | Holds common tones? | Scope | Effort |
|---|---|---|---|---|---|
| **A. Stateful nearest** ("Legato") | Voice the new chord to minimize motion from the *previous* voicing, register-bounded | **No** (history-dependent) | **Yes** — the real thing | Any; shines on a subset | **M** |
| **B. Register-locked grip** | Always seat voices in a fixed band; no memory | **Yes** | Not reliably | Subset (degenerates on all‑6) | **S–M** |
| **C. Per-key tables** | Pre-generate 7 smooth diatonic voicings per key (offline, with A or B), look up at runtime | **Yes** | As designed | Diatonic only; off-key → fallback | **M–L** |
| **D. Fixed-grip subset** | *Scope*, not a solver: only 3–4 strings carry the chord; low strings double a bass root+5th | inherits solver | inherits solver | subset by definition | **S** on top of A/B |

They compose: **B on a subset = D**; **C = bake A or B into a table**. The honest
mapping to your request: **A (or C) is what "voice leading between buttons" means.**
B/D alone give *close, reachable, small-average-motion* voicings — nice, but not the
common-tone-holding behavior.

---

## Feasibility — verified, and tight

Independently brute-forced (every octave/permutation, ascending & no-crossing,
against the true per-string windows):

- **All 84 diatonic triads (12 keys × 7 degrees) fit on the top 3 strings**, and the
  best-centered voicing's worst-case bend is **exactly ±3** (distribution of max
  |offset|: 0→3, 1→30, 2→42, 3→9). Not hand-waved — literally tight.
- **F♯ major and D♭/C♯ major** (the usual suspects) both pass at ≤±3; the vii°
  (diminished) is never the tight case.
- **7th chords forced onto 3 strings** (drop the 5th, keep R‑3‑♭7): all 12 roots, ≤±3.
- **4-note 7ths on the top 4 strings** (dom7 / maj7 / min7 / m7♭5 / dim7): all 12
  roots, ≤±3 — so **top‑4 needs no dropped tone.**
- No counterexample found in any key, on any degree. The scary-looking ±12 limit is
  actually **generous** once the register is centered.

**Clusters — the voice leading is movable (verified).** The top-3 result generalizes:
**every contiguous string cluster works, in all 12 keys**, with the *same* quality —
they are the same voicing shapes shifted by octave. So the cluster can be a
user-selectable window, exactly like the ethnic/steel string-placement selector.

| Cluster | Strings | Register | On a real progression | In range |
|---|---|---|---|---|
| 1‑2‑3 | E B G | ≈ C4 (bright) | 2.9 st/change, ~1.2 held | ±5 |
| 2‑3‑4 | B G D | ≈ G3 | 2.9 st/change, ~1.2 held | ±5 |
| 3‑4‑5 | G D A | ≈ D3 | 2.9 st/change, ~1.2 held | ±7 |
| 4‑5‑6 | D A E | ≈ A2 (dark) | 2.9 st/change, ~1.2 held | ±8 |

4-string clusters (1‑2‑3‑4, 2‑3‑4‑5, 3‑4‑5‑6) all carry **full 7th chords** (no
dropped tone) in every key (worst ±9). The only difference between clusters is
**register/timbre** — a creative feature, not a limit; the sole caveat is that close
triads in the low 4‑5‑6 cluster (~A2) sound **muddy** (guitar physics). And the
"whole guitar tuned to the chord" model checks out: the cluster carries the voiced
part, the remaining strings complete it with **root+5th bass + doublings**, all within
±12 — strum all six = full chord, strum just the cluster = pure voice leading. See
**`voice-leading-plan.md`** for the phased build of this movable-cluster design.

**Motion, two honest data points:**
- *Stateful* solver on a musical progression (C‑Am‑F‑G‑C‑Em‑Am‑Dm‑G‑C): **~2.9
  st/voice/change, common tones held** (e.g. C→Am holds C & E, only the top voice
  moves G→A; F holds C & A, only E→F moves).
- *Stateless* grip over the same progression: fine ~1.4 st *average*, but it can
  re-pick a common tone in a different octave (G→C jumps ~9 st) — **it doesn't
  reliably hold common tones.** This is the difference that matters for your ask.

---

## Worked example — C major, top-3 strings (G, B, high‑E)

The **stateful** voicer, close register, doubling a stable bass on strings 4–6:

| Chord | Voicing | str3 G | str2 B | str1 E | From prev |
|---|---|---|---|---|---|
| C  | C4 E4 G4 | C4 (+5) | E4 (+5) | G4 (+3) | — |
| Am | C4 E4 A4 | C4 (+5, **hold**) | E4 (+5, **hold**) | A4 (+5) | **2 st** (E→A only) |
| F  | C4 F4 A4 | C4 (+5, **hold**) | F4 (+6) | A4 (+5, **hold**) | **1 st** (E→F only) |

Two common tones held each change; the single moving voice slides a step — and
because of the workbench **role-tags** shipped last week, you literally *see* it: the
held strings keep their colored dot and pitch, while the moving string glides and
re-tags its role (e.g. the yellow "5" on string 1 slides G→A and becomes "R" going
C→Am). Strings 4–6 double C/G so a full strum still sounds complete.

*(A stateless grip would land tight, in-range voicings here too — but wouldn't
guarantee the "hold two, move one" pattern across an arbitrary progression.)*

---

## Integration — why this is cheap to wire

- **One seam.** Everything funnels through the `voiceChord(rootIdx, formula)` call
  inside `applyChord`. Downstream — `apply` (sets `baseOffsets`), `renderStrings`,
  the pan strip, the bend overlay (reads `baseOffsets`), `tuningSend`/MIDI, and the
  `chordDegrees` role-tags — all already consume an **arbitrary 6-element offsets
  array**. Swapping the voicer is a local change with no downstream rewiring.
- **The "previous voicing" memory already exists.** `apply` sets `activeChord={r,row}`
  *and* `baseOffsets` = the current voicing. At the top of `applyChord`, *before*
  `apply` overwrites it, `baseOffsets` still holds the outgoing chord — so a stateful
  voicer reads it with **no new persistent state**. Caveat: after a non-chord tuning
  `activeChord===null` → treat that as "no seed, use a centered stateless voicing."
  Clear sites: `applyInst`, `applySteel`, `applyTest`, and `apply` for non-chord presets.
- **Role-tags stay correct for free.** `renderStrings` derives each tag from the
  *sounded* pitch class; any voicing built from real chord tones tags right, and a
  stray tone degrades cleanly to the octave superscript. Only rule for the solver:
  **place chord tones only.**
- **Key mode is untouched.** It's highlight/lookup on `{r,row}`, which voice leading
  doesn't change. And diatonic progressions are exactly where common tones are
  richest — VL + Key mode is pure synergy.
- **Keep the grey-out on the stateless engine.** `renderChords` computes
  `dis = !voiceChord(ri, row.formula)`; leave that on the stateless voicer (never
  greys in practice) so the matrix doesn't flicker as history changes, and have any
  stateful voicer fall back to `voiceChord` if a candidate exceeds ±12.
- **One gotcha:** the Settings-modal save handler *manually re-assembles* the settings
  object field-by-field (it doesn't spread the old one). A new `settings.voicing` must
  be added there too, not only in `loadSettings`, or it's silently dropped on every
  Save.

---

## Effort

**(a) The thing you actually asked for — stateful voice leading on a top‑3/4 subset:
Medium, ~1–2 focused days.**
- New `voiceChordVL(rootPc, formula, prevOffsets)` — bounded nearest-neighbour on the
  top 3–4 strings, center pull + octave-reset guard, ascending/no-crossing, fall back
  to `voiceChord` if out of range. Strings 5–6 double a stable root+5th bass.
- Read the seed from `baseOffsets` in `applyChord`; treat `activeChord===null` as
  "start from a centered voicing"; clear at the non-chord sites.
- A **re-center** gesture (e.g. double-tap the active chord) to discard history and
  avoid drift/confusion.
- A `Voicing` toggle in the `.chord-key` bar + `settings.voicing` (default keeps
  today's **Spread**), validated in `loadSettings` **and** added to the Settings-save
  rebuild. Budget a little CSS time — that bar already holds Key + Extend + legend, so
  a third control needs wrap attention on narrow screens.
- 7th chords: on top‑4 no drop is needed; on top‑3 drop the 5th (keep R‑3‑♭7).

**(b) Full polish across all chord types and keys: Medium–Large, several days.**
Everything above, plus: per-key precomputed tables (Option C) with off-key fallback;
explicit quality-tone rules (never drop the ♭5/♯5 on dim/m7♭5/aug); a deterministic
tie-break for **dim7** (it's symmetric — every inversion is equidistant, so
minimal-motion is ambiguous and looks random without one); guaranteed no-voice-crossing;
optional deterministic "grip" mode alongside the stateful one; and testing across 12
keys × ~14 qualities for ≤±12 and no crossings.

**(c) Deterministic-only stateless grip (if you decide determinism > true VL):
Small, ~1 day** — but note it delivers "same strings, tight changes, always in range,"
**not** the common-tone-holding glide. Listed for completeness; probably not what you
want.

**Bottom line:** the feature is not blocked by the hardware — it's *enabled* by it once
you center the register. The integration surface is a single function with the needed
memory already present. The real decision is **determinism vs. true voice leading**:
pick the stateful top‑3/4 solver (~1–2 days) if you want the "one voice glides, others
hold" experience you described.

---

## Key references

`vg800-tuner.html`: `voiceChord` (the seam), `applyChord` (read `baseOffsets`+
`activeChord` here), `apply` (sets/overwrites them), the grey-out in `renderChords`,
`renderStrings`/`chordDegrees` (offset-agnostic), `SCALES`/`diatonicMap` (Key mode),
the `.chord-key` key bar (where the Voicing toggle goes), `loadSettings` + the
Settings-modal save rebuild, and the `activeChord` clear sites
(`applyInst`/`applySteel`/`applyTest`). Theory model: `chords-theory.md` §5/§7/§8.
