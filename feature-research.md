# VG-800 App — Feature Research

Research notes for two prospective features, grounded in web research and the
VG-800 Parameter Guide / the app's existing engine. Companion to
[`midi-automation-ideas.md`](./midi-automation-ideas.md).

**Compiled:** 2026-07-05

Two topics:
1. [Circle Guitar → per-string volume choreography (rhythm sequencer)](#1-circle-guitar--per-string-volume-choreography)
2. [Arabic maqam microtuning for the Oud](#2-arabic-maqam-microtuning-for-the-oud)

Cross-cutting hardware fact used by both: the VG-800 has **16 ASSIGN slots total**
(Parameter Guide, ASSIGN TARGET list pp. 54–64). Each *per-string* layer costs 6
slots; each *global* effect costs 1. Current usage: 6 (pitch / STR BEND DEPTH) +
6 (pan / STRING PAN) = **12 used, 4 free**.

---

## 1. Circle Guitar → per-string volume choreography

**Question explored:** can we do something like the Circle Guitar by mapping
per-string *volume* (in addition to per-string pan) — "six mappings for panning
and six for volume" — as a per-string rhythm sequencer?

**Verdict:** Yes for the *rhythm/motion* (the "when" and "where"); no for the
*mechanical re-attack* (the "what"). Ships honestly as "a per-string rhythm
sequencer / gated rotary texture **inspired by** the Circle Guitar," not "sounds
like one." The user's instinct to map volume **instead of** tuning is exactly
what the 16-slot budget requires.

### 1.1 What the Circle Guitar is (and why it's novel)

The Circle Guitar (Anthony Dickens / Circle Instruments, London) is an
electro-mechanical guitar that replaces the picking hand with a **motor-driven
wheel spinning under the strings at up to ~250 BPM**. Magnetically-held
"Magpicks" clip into slots around the wheel (4 / 12 / 16 / 20 positions) and
**physically re-strike the strings on every rotation**. Dickens describes it as
"a MIDI-enabled physical sequencer that strums the strings," synced to a DAW
clock with swing and phase offsets. A **hexaphonic pickup** gives each string its
own output; a **mute matrix** (6 buttons + 6 toggles + 6 faders) plus the freed
picking hand decides which strings are heard.

The genuinely novel part is the **mechanical re-excitation**: a real plectrum
injects a fresh attack transient into a real string dozens of times per second,
with per-strike timbre set by pick hardness. Everything downstream of that
(per-string pan, per-string on/off gating in time, tempo sync) is *not* novel —
it's a per-string trance-gate / auto-pan, which the app already does.

### 1.2 The core distinction — RE-STRIKE vs GATE

**The Circle Guitar re-strikes. The VG-800 can only gate.** The VG-800 shapes the
amplitude (and pan) of a string that is *already* vibrating; it cannot re-pluck,
re-trigger, or manufacture a pick attack.

The clearest way to explain why this matters: a real re-strike **resets each
pulse to full amplitude**, whereas gating a strummed chord rides the decay — so
pulses get **quieter pulse-over-pulse *and* decay within each pulse**. That is
precisely why gated volume can't produce the "machine-gun" re-pick.

**Reproducible (the WHEN / WHERE):**
- Per-string rhythmic gating on a tempo-synced step grid (the mute-matrix "which
  strings are heard right now").
- Sequenced patterns — placing a gate step is the direct analogue of dropping a
  Magpick into a slot.
- Tremolo / stutter / chop on a held sound.
- Cross-string arpeggios and rolls (walk the "open" step down the six lanes).
- Rotation / spatial motion — per-string pan already does this; combined with
  volume it becomes the "spinning-disc" sweep.
- Swing, phase-offset, phase-ahead/behind feel.

**Not reproducible (the WHAT):**
- A consistent fresh attack transient every step ("machine-gun" re-picking).
- Per-strike timbre from different pick hardnesses.
- True endless re-excited sustain / the never-ending strum.

**How the player gets closest** — feed the gate a *continuously sustaining*
per-string source so gating reads as re-articulation rather than a chopped decay:
held chords into high gain + heavy compression; controlled feedback or an
**EBow**; or a sustaining/synth VG-800 model rather than a bright plucked one.
(The VG-800 is a divided-pickup *processor*, not a string sustainer — the sustain
must come from the input signal or the chosen model.)

### 1.3 The slot budget makes "volume instead of tuning" mandatory

| Layer | Slots |
|---|---|
| Per-string pitch (STR BEND DEPTH 1–6) — tuning | 6 |
| Per-string pan (STRING PAN 1–6) | 6 |
| Per-string **level** (STRING LEVEL 1–6) — new | 6 |
| **All three at once** | **18 > 16 ✗** |

You cannot assign pitch + pan + volume simultaneously. But **pan (6) + volume
(6) = 12/16, 4 to spare** — exactly the proposal. So **"Circle mode" and
"custom-tuning mode" are mutually exclusive presets**: loading a rhythm preset
swaps the 6 pitch assigns out for 6 volume assigns.

### 1.4 Design — a per-string step sequencer reusing the LFO engine

The existing auto-pan engine already provides the hard parts: the 40 ms tick loop
(`AUTOPAN_MS`), tempo-sync with straight + triplet divisions (`AP_DIVS`),
per-string phase spread, and a **send-on-change dedupe** (`autoPanLast` — emits a
CC only when the 0–127 value actually changes). The sequencer is a second
value-source feeding the same tick.

- **One merged 40 ms tick** computes, per string: LFO pan (existing) and/or
  sequencer level + sequencer pan → sends only changed CCs. A preset can then run
  a slow rotary pan *under* a 16th-note volume chop.
- **Rotation = per-string phase offset.** `phase[i] = i` makes the open gate walk
  1→6 around the strings while pan places each string at a different point in the
  field — tracing the spinning circle. Phase offset literally *is* the slot
  spacing on the wheel.
- **Preset kinds:** add a `kind` field — `kind:'tuning'` (existing per-string
  pitch) vs `kind:'rhythm'` (carries the `seq` block, optionally an `ap` pan-LFO
  block for combined motion). Loading a rhythm preset writes `settings.seq`,
  points the shared tick loop at it, and lights an on/off toggle like auto-pan.
  Reuses existing preset persistence / import-export.

**Proposed data model:**

```js
settings.levelCCs = [ /* 6 CCs */ ];   // new assign type: STRING LEVEL 1–6 (prefer CC# 1–31)

settings.seq = {
  on: false,
  bpm: 120,
  div: '1/16',              // step grid — needs its OWN beats-per-STEP map (see 1.6)
  steps: 16,                // pattern length
  swing: 0.0,               // 0–0.6, delays even steps (quantized to the 40 ms grid)
  gateLen: 0.5,             // fraction of a step the gate stays open (staccato ↔ legato)
  glide: 20,                // ms slew on level edges; 0 = hard chop, higher = smoother
  vol: {
    depth: 1.0,             // how deep an "off" step cuts (1 = full mute, <1 = tremolo dip)
    floor: 0, ceil: 127,    // level for off / on steps
    lanes: [ /* 6 arrays of `steps` values, 0..1 (or 0..127 for per-step accents) */ ],
    phase: [0,0,0,0,0,0]    // per-string step offset → rotation / roll
  },
  pan: {
    enabled: false,
    lanes: [ /* 6 arrays, target pan −1..+1 per step */ ],
    phase: [0,0,0,0,0,0]
  }
};
```

### 1.5 Preset ideas

1. **Spinning Rotary Strum** — all 6 volume lanes gently pulse on 1/8; pan lanes
   rotate (`phase[i]=i`) at 1/2-bar. Gate barely dips (depth ~0.4) while the sound
   circles the room.
2. **Banjo / Harp Roll** — one string open per step, gate walking 1→6→1 on 1/16
   (forward roll), pan spread L→R. Requires the chord to be ringing first.
3. **16th Machine-Gun Chop** — all 6 lanes gate full on/off together on straight
   1/16, short `gateLen` (~0.3), `depth=1`, `glide=0`. *Honest limit: decays
   between chops — feed it feedback / EBow / compressed sustain.*
4. **Rhythmic Mute / Stutter** — sparse syncopated 1/16 pattern, deep cut,
   different strings muted on different steps (the mute-matrix feel).
5. **Generative Drift** — per-string gate probability random-walks per step,
   never repeats; shallow depth for a shimmering texture. (Use the sample-and-hold
   primitive, not the smoothed `drift` char.)
6. **Tremolo Shimmer** — fast triplet (1/16T) shallow gate (level *dips*, not full
   mutes), per-string phase offset so flutters interleave.
7. **Sequential Cross-Panned Arpeggio** — fret a chord; gate opens each string in
   order on 1/8 with `pan.phase` offset per string.
8. **Half-Time Rotary Swell** — slow 1/2-bar rotate pan LFO under a subtle
   4-on-the-floor volume gate; the cinematic version of #1.

### 1.6 Feasibility + limits

**Resolution — 40 ms tick = 25 updates/sec.** Every gate edge snaps to a 40 ms
boundary (timing jitter up to ±20 ms). Rule of thumb: ≥2–3 ticks per step for a
clean attack→hold→release.

Step duration = 60000 / BPM / (steps-per-beat):

| Grid | @ 120 BPM | ticks/step | @ 170 BPM | ticks/step | Verdict |
|------|-----------|-----------|-----------|-----------|---------|
| 1/8  | 250 ms | 6.3 | 176 ms | 4.4 | Rock solid |
| **1/16** | 125 ms | 3.1 | 88 ms | 2.2 | **Reliable sweet spot** (marginal at 170) |
| 1/16T | 83 ms | 2.1 | 59 ms | 1.5 | Usable to ~130 BPM, coarse above |
| 1/32 | 62 ms | 1.6 | 44 ms | 1.1 | Clean ≤ ~120 BPM; smears fast |
| 1/64 | 31 ms | 0.8 | — | — | Below the tick — drop it |

1/16 is the reliable finest resolution across the range; the 40 ms tick is the
ceiling on how convincing fast "machine-gun" can get. Cap selectable grids at
1/32 and warn/auto-limit below ~2 ticks/step.

**Message load** — worst case 6 vol + 6 pan = 12 CCs/tick × 25/s = **~300 msg/s
(~900 B/s)**. Negligible on USB / Web MIDI; even legacy 31.25 kbaud DIN
(~1040 msg/s ceiling) sits at ~29%. The send-on-change dedupe cuts real load to
bursts at step edges.

**Timing caveats (must state honestly):**
- **Free-running internal tempo, no MIDI clock** — will drift against a DAW,
  unlike the Circle Guitar which locks to DAW clock. Consider adding MIDI Clock +
  Start/Stop *out* to close this gap.
- **Browser background-tab throttling** clamps `setInterval` to ~250–1000 ms when
  the tab loses focus — this breaks the rhythm entirely. Keep the tab foregrounded
  (or drive timing differently for live use).
- **Step time base ≠ LFO time base.** The auto-pan `AP_DIVMAP` values are
  beats-per-LFO-*cycle* and `apCyclesPerSec` applies a ×2 slowdown. A step
  sequencer needs beats-per-*step* with no ×2. Reuse the division *labels* but
  give the sequencer its own mapping, or step timing comes out 2× wrong.
- Keep the merged tick's compute well under 40 ms and keep UI redraw
  (`updateOverview`) off the MIDI-critical path so the tick can't self-throttle.

### 1.7 Verify on the VG-800 (in risk order), then build

**Verify:**
1. **Is `STRING LEVEL 1–6` an assignable target** with SOURCE = CC (same pattern
   as PAN)? If not, the feature is blocked.
2. **Slot budget** — you'll swap pitch→level, so 12/16 is fine; just confirm the
   mutual exclusivity with tuning is acceptable.
3. **Does MIN = 0 fully mute** or just attenuate? (Determines whether stutter
   mutes go silent.)
4. **Rapid-CC behavior** — send a 1/16 square-wave level CC and listen: clean gate
   or zipper? **Does the VG-800 internally smooth level changes?** Onboard slew of
   tens of ms rounds gate edges and most limits how convincing fast gating is —
   this sets the `gateLen` / `glide` floor. Also check round-trip latency and that
   6 level + 6 pan streams at once don't choke.

CC choice: pan already runs continuously on CC 71–76 (so 64–95 tracks fine here),
but prefer level CCs from **1–31** to be safe.

**Build order:** add STRING LEVEL assign row (mirror the PAN row; `sendLevel()`
like `sendPan`) → merge the tick loop → add a beats-per-step division map → build
the sequencer engine (`settings.seq`) + a 6-lane × N-step grid editor (per-lane
phase, swing, gate length, depth, glide) → add `kind:'rhythm'` presets to
save/load/import/export → on/off toggle + a UI note that this is rhythmic gating
of a sustained source, not a re-picker.

**Bonus lever:** an assign's SOURCE can be the VG-800's internal **WAVE PEDAL**
LFO (per-assign sine/tri/saw). Offload steady rotary motion to the unit and let
the browser handle only intentional sequenced gates — freeing host timing budget.

### 1.8 Sources

- Circle Instruments — [official site](https://www.circleinstruments.com/) ·
  [Specification](https://www.circleinstruments.com/specification)
- [Guitar.com — Circle Guitar cover feature](https://guitar.com/features/the-cover/circle-guitar/)
- [MusicRadar — "the 250BPM robo-plucker in a six-string"](https://www.musicradar.com/news/meet-circle-guitar-a-rotating-robo-plucker-in-a-six-string)
- [New Atlas — spinning string picker](https://newatlas.com/music/anthony-dickens-circle-guitar/)
- [Designboom — self-playing electric Circle Guitar, up to 250 bpm](https://www.designboom.com/technology/self-playing-electric-circle-guitar-pick-250-bpm-08-27-2020/)
- [Engadget — self-strumming guitar](https://www.engadget.com/circle-guitar-electric-motorized-171537722.html)
- [maxon — the Circle Guitar (motor)](https://www.maxongroup.com/en/knowledge-and-support/blog/the-circle-guitar-creating-new-kinds-of-music-285374)
- [Sonicstate — Circle Guitar interfacing with CV and gate](https://sonicstate.com/news/2021/04/09/mechanical-circle-guitar-interfacing-with-cv-and-gate)
- YouTube demos: [hex output / step sequencer (Demo 1)](https://www.youtube.com/watch?v=9dtrvc6gOc4) ·
  [heavy techno (Demo 2)](https://www.youtube.com/watch?v=38VNCn56e5Y)
- Prior art / analogues: [Moog Guitar](https://en.wikipedia.org/wiki/Moog_Guitar) ·
  [Vo-96](https://voinventions.com/vo-96/) · [Gizmotron 2.0](https://www.soundonsound.com/reviews/gizmotron-20) ·
  [EBow player's guide](https://ebow.com/players-guide) ·
  [Kilohearts Trance Gate](https://kilohearts.com/products/trance_gate)

---

## 2. Arabic maqam microtuning for the Oud

**Question explored:** using open ASSIGN slots to give one or two strings finer
pitch control, can the existing pedal/bend system play Arabic maqam scales
authentically by temporarily lowering pitch a quarter-tone?

**Verdict:** Viable and potentially *more* authentic than a 24-TET keyboard —
**but only with a dedicated narrow-range bend assign**, not the ±12 one used for
tuning. The limitation is resolution (fixable) and the fact that a bend shifts the
*whole string*, not a single note (workable through fingering/position).

### 2.1 How maqam microtonality works

Maqamat such as **Rast, Bayati, Saba, Sikah, Huzam** use "neutral" intervals —
notes between the Western semitones ("half-flat" / quarter-tone degrees). Key
research findings:

- The textbook model is **24-TET** (quarter-tones = exactly 50 cents), but that's
  a *notational convention*, not how it's actually played. Musicians use the
  24-tone names while performing finer intonation learned by ear.
- Real intervals are **not 50 cents**. The Arabic **Rast neutral third is
  ~362 cents** (vs. 400 major, 300 minor) — so half-flat E in Rast on C is about
  **38 cents** below E natural, not 50.
- A practical quarter-tone is **~48–50 cents (≈2 Pythagorean commas)**, but each
  maqam and region (Egyptian / Syrian / Iraqi) tunes its neutral notes slightly
  differently.
- **Turkish makam is a different system** — a 53-comma (Holdrian) grid, comma
  ≈ 22–25 cents, whole/half tones at 204 / 90 cents. Needs its own presets.

Takeaway: authenticity means hitting **arbitrary, maqam-specific cents values
accurately** — not a fixed 50-cent grid.

### 2.2 Resolution math (the crux)

Current STR BEND assign = **MIN −12 / MAX +12** = 24 semitones over 128 CC steps:

> 2400 cents ÷ 127 = **~18.9 cents per step** → reachable pitches quantized to
> ~19-cent chunks → up to **±9.5 cents error** placing a neutral note. **Too
> coarse** to be reliably authentic.

Dedicate an open slot to a **narrow** assign on the microtonal string(s):

| Assign range | Resolution | Max error | Verdict |
|---|---|---|---|
| MIN −12 / MAX +12 (current) | 18.9 ¢/step | ±9.5 ¢ | too coarse |
| **MIN −2 / MAX +2** | **3.15 ¢/step** | **±1.6 ¢** | ✅ cents-accurate, ±200 ¢ range |
| MIN −1 / MAX +1 | 1.57 ¢/step | ±0.8 ¢ | ✅ finest, ±100 ¢ range |

At **±2 semitones you get ~3-cent precision** — inaudible error and far more range
than the ~60 cents any neutral bend needs. This is where it becomes *more*
authentic than a 24-TET keyboard: you can dial exact regional values (362 / 150 /
1060 cents) per maqam.

### 2.3 The whole-string constraint

STR BEND shifts the **entire string**, so a quarter-tone bend lowers *every* note
on that string, not just the maqam's neutral degree. Ways to work with it (how
microtonal guitarists already operate):

1. **Play in position** so each neutral scale-degree lands on a known string, and
   detune those strings.
2. **Dedicate strings** to the neutral degrees (the "map two strings" idea).
3. **Pedal-engage** the microshift only during phrases where that string carries
   the neutral note.

**Two strings enough?** For many maqamat in a single position, yes — Rast has two
neutral degrees (3rd + 7th); Bayati / Sikah often just one. It won't make the
whole fretboard maqam-correct (neutral degrees recur across octaves/strings), but
covers a maqam played in position.

### 2.4 Already playable vs unlocked by microtuning

- **Already playable** (no microtuning; existing integer-semitone tunings):
  **Nahawand** (minor), **Kurd** (Phrygian), **Ajam** (major), roughly **Hijaz**
  (augmented-2nd, near-12-TET).
- **Unlocked by microtuning** (neutral-interval family): **Rast, Bayati, Saba,
  Sikah, Huzam, Awj**, etc.

### 2.5 Worked example — Maqam Rast on C (fits the Oud's low C)

Scale: C – D – **E‑** – F – G – A – **B‑** – C. Two neutral degrees:

- **E‑ (neutral 3rd):** target ~362 ¢ → bend E down **~38 ¢**. On a ±2 assign
  that's 12 steps = 37.8 ¢ (0.2 ¢ off).
- **B‑ (neutral 7th):** target ~1060 ¢ → bend B down **~40 ¢** → 13 steps =
  41.0 ¢ (1 ¢ off).

Arrange fingering so E and B fall on the two dedicated strings; one "Rast" pedal
engages both quarter-tone-down. Inaudible error, authentic result.

### 2.6 What to build + verify

**App work:**
1. **Cents-valued bends** — the pedal/copedent engine currently emits *integer
   semitones*; add fractional/cents support.
2. **Per-string assign-range awareness** — a settings field for each microtonal
   string's MIN/MAX so it computes the right CC (a −38 ¢ bend is a different CC on
   a ±2 assign vs. ±12).
3. **Maqam presets** — per-maqam neutral-degree cents mapped to pedals ("Rast
   3rd/7th", "Bayati 2nd"), Arabic and Turkish variants.
4. **Expressive upgrade (the standout):** map the fine bend to the **expression
   pedal** to *slide into* the neutral note like a fretless oud, or an LFO on it
   for vibrato around the neutral pitch — closes most of the fretted-vs-fretless
   gap.

**Verify on hardware:**
- Whether the VG-800 lets a **second assign target the same DEPTH parameter** as
  the ±12 tuning assign so the two **sum** (coarse tuning + fine vernier). Roland
  assigns often *fight* rather than add on the same target — if so, a microtonal
  string uses the narrow assign *alone* and can't simultaneously take a large
  tuning offset. This decides whether microtuning layers onto any tuning or is
  reserved for specific strings.

### 2.7 Sources

- [Rast (Arabic maqam) — Wikipedia](https://en.wikipedia.org/wiki/Rast_(Arabic_maqam))
- [Arabic maqam — Wikipedia](https://en.wikipedia.org/wiki/Arabic_maqam)
- [Makams and Cents — BabaYagaMusic](https://babayagamusic.com/Music/Makams-and-Cents.htm)
- [Microtonal Theory — Makams and Maqamat](https://www.microtonaltheory.com/microtonal-ethnography/makams-and-maqamat)
- [Maqam for Beginners — Ethnic Musical](https://www.ethnicmusical.com/blog/maqam-music-for-beginners/)
