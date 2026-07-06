# Voice Leading — Implementation Plan

Multi-phase plan to add **voice-led chord voicings with a movable string cluster** to
the Chords section of `vg800-tuner.html`. Companion to `voice-leading-research.md`
(the *why* / feasibility proof); this file is the *how* / build order.

**Status:** planned, not started. **Date:** 2026-07-06.
Every phase leaves the app shippable. Line numbers drift — search by symbol.

---

## 0. Locked decisions (from the design review)

1. **Cluster sizes:** support **both 3-string and 4-string** clusters.
2. **Behavior:** ship **both Legato (stateful, true voice leading) and Grip
   (stateless, deterministic)**, user-selectable.
3. **Mode model:** add as a **new selectable Voicing mode**; the current 6-string
   root-position **Spread stays the default** — nothing existing changes unless the
   user opts in.

---

## 1. What we verified (feasibility — all proven, all keys)

- **Every cluster is reachable within ±12 in all 12 keys.** The four 3-string
  clusters (1‑2‑3, 2‑3‑4, 3‑4‑5, 4‑5‑6) and three 4-string clusters (1‑2‑3‑4,
  2‑3‑4‑5, 3‑4‑5‑6) all voice-lead diatonic chords with the *same* quality — they
  are the same shapes shifted by octave. On a real progression: **~2.9 st/change,
  ~1.2 common tones held, worst offset ±5…±8**.
- **Registers** (the only real difference, and a creative feature):
  1‑2‑3 ≈ C4 (bright) · 2‑3‑4 ≈ G3 · 3‑4‑5 ≈ D3 · 4‑5‑6 ≈ A2 (dark). Musical
  caveat only: close triads in 4‑5‑6 (~A2) sound **muddy** — that's guitar physics,
  not reachability.
- **4-note chords, two clean paths (both verified):**
  - 3-string cluster → drop to **R‑3‑7 guide tones** (jazz shell; 3rds/7ths resolve
    by step). Smoothest option.
  - 4-string cluster → **all four tones**, no drop (worst ±9, all keys).
- **"Whole guitar tuned to the chord" works:** the cluster carries the voice-led
  voicing; the remaining strings complete the chord with **root+5th bass + doublings**,
  all within ±12. Strum all six = full chord; strum just the cluster = pure voice
  leading. The bass even supplies the 5th a 3-string guide-tone cluster "dropped."
- **No per-string mute exists** (only pitch + pan CCs), so filling the non-cluster
  strings is both what we want *and* the only clean option (leaving them at standard
  would sound wrong).

---

## 2. Target UX (end state)

In the Chords section header, next to the existing **Key** bar, add a **Voicing** row:

```
Voicing:  [ Spread ]  [ Voiced ]                     ← mode (default Spread)
  when Voiced:  Cluster [▮▮▮·· positions]  Size [3│4]  Feel [Legato│Grip]
```

- **Spread** (default): today's behavior, untouched.
- **Voiced**: reveals three controls, styled after the ethnic/steel **string-placement
  selector** (`clusterRowHTML` 1604, container `.clrow`, buttons **`.clbtn`** styled at
  419‑422, inner `.cldots`/`.cllbl`) so it feels native:
  - **Cluster position** — which contiguous strings carry the voicing, shown as lit
    string-dots over the 6 strings (like the ethnic 1‑4 / 2‑5 / 3‑6 picker). 3-size
    offers 4 positions; 4-size offers 3.
  - **Size** — 3 or 4 strings (switches the position set).
  - **Feel** — Legato (holds common tones, glides one voice; history-dependent) vs
    Grip (deterministic, fixed register).
- Tapping a chord in Voiced mode retunes all 6 strings: the cluster is the moving
  voicing, the rest completes the chord. The workbench role-tags then let you *watch*
  the held vs. moving voices.
- Persists across reloads (`settings.voicing`, `settings.voiceCluster`,
  `settings.voiceSize`, `settings.voiceFeel`). Spread default keeps the existing
  `chords-theory.md §5` reference accurate.

---

## 3. Architecture — the single seam

**One integration point:** the `voiceChord(rootIdx, formula)` call at **line 1701**
inside `applyChord` (1700). Everything downstream — `apply` (1978, sets `baseOffsets` +
`activeChord`), `renderStrings`/`chordDegrees` role-tags (1216/1720/1235),
**`renderPedals` (1368/1371, runs the pedal-steel chord analysis on `baseOffsets`)**,
the bend overlay (reads `baseOffsets` at 1416), `tuningSend`/MIDI — already consumes an
**arbitrary 6-element offsets array** (they already handle ethnic/steel offsets, so
"no rewiring" holds). The pan strip is *not* an offsets consumer (pan is per-string CC,
offset-independent). So the whole feature is: *produce a different offsets array at that
one call site.*

Empirically, `voiceChord` returns non-null for all 168 combos (12 roots × 14 qualities),
so the grey-out never fires today and the voiced engine's `voiceChord` fallback is
**always** a valid array — no new greying is possible.

New engine entry point:

```
voiceChordVoiced(rootPc, formula, rowKey, opts) -> offsets[str1..str6] | null
    opts = { mode, cluster:[stringIdx...], feel:'grip'|'legato', prev:offsets|null }
```

- `mode==='spread'` → `return voiceChord(rootPc, formula)` (bit-for-bit unchanged).
- otherwise build the voiced array (§4). On any internal failure → fall back to
  `voiceChord` so a tap **always** produces a playable voicing.

State added (module-level, near `activeChord` at 1080):
- `lastVoiced = { cluster, pitches }` or `null` — the previous voiced cluster's actual
  pitches, for Legato. **This is the ONLY source of `prev`** — do *not* read it from
  `baseOffsets`, which holds ethnic/steel/transpose offsets after a non-chord preset.
  **Not persisted.** Seeded to a centered voicing when null or when the cluster changed
  since last tap.

Grey-out (`dis=!voiceChord(ri,row.formula)`, 1765) **stays on the stateless Spread
engine** — never recompute it from the voiced/stateful result, or the matrix would
flicker as history changes. Since `voiceChord` already succeeds for every chord, the
voiced engine's fallback guarantees no new greying.

---

## 4. The voicing engine spec (voiced mode)

Given `rootPc`, `formula`, `rowKey`, chosen `cluster` (contiguous string indices),
`feel`, and `prev`:

**Step A — cluster target tones.**
Chord tones `T = {(rootPc+iv)%12 for iv in formula}`. Let `k = cluster.length` (3 or 4).
- `|T| == k` → use all of T.
- `|T| > k` (4-tone chord on a 3-string cluster) → **drop** to k tones by priority:
  keep the **3rd** (or 2nd/4th for sus), the **7th/6th/9th color tone**, and any
  **altered 5th (♭5/♯5)**; drop the **perfect 5th** first, then the **root** (the bass
  fill re-supplies both). E.g. maj7→R‑3‑7, m7♭5→♭3‑♭5‑♭7, dim7→(see tie-break).
- `|T| < k` (triad on a 4-string cluster) → **double** a tone: prefer the **root**,
  then the **5th**.
- **dim7 is symmetric** (four minor-3rds) → every inversion is equidistant, so a
  deterministic tie-break is required or it looks random: pick the candidate with the
  lowest total |offset|, then lowest string as root.

**Step B — solve the cluster voicing** (strings ascending in pitch, no crossing;
every note within its string's ±12 window; `center` = midpoint of the cluster's
±12 intersection band):
- **Grip (stateless):** minimize Σ|pitch − center|. Deterministic; drift impossible.
- **Legato (stateful):** minimize Σ|pitch − prev[i]| (per cluster string) + a soft
  `0.25·Σ|pitch − center|` register pull + an **octave-reset guard** (if a voice would
  exceed ~±9, prefer the octave that pulls back toward center). If `prev` is null or
  the cluster changed → seed as Grip.
- Both enforce **ascending / no voice-crossing** so a strum reads low→high.
- (Reference solver + exhaustive feasibility check live in the node harness, §8.)

**Step C — complete the chord on non-cluster strings.**
- Strings **below** the cluster (lower pitch): **bass** — lowest string → **root**,
  next → **5th**, next → **root octave** or **3rd**; nearest realization in each window.
- Strings **above** the cluster (higher pitch): **doublings** — nearest chord tone to
  each string's standard pitch, within window.
- All must be chord tones; if any can't fit its window → fall back to `voiceChord`.

**Step D — assemble** `offsets[str1..str6]` and return. Update `lastVoiced` in
`applyChord` after a successful voiced result.

---

## 5. Phases

> Progress: **[✅] Phase 1** · [✅] Phase 2 · [✅] Phase 3 · [ ] Phase 4 · [ ] Phase 5 · [ ] Phase 6

### Phase 1 — Scaffolding: mode + settings + controls (no behavior change yet) · S · ✅ DONE
**Goal:** all the plumbing and UI exist; Voiced mode currently just calls `voiceChord`
(so output is identical to Spread). Ship-safe, invisible.
- Add `settings.voicing ('spread'|'voiced', default 'spread')`, `settings.voiceCluster`
  (e.g. `[0,1,2]`), `settings.voiceSize (3|4, default 3)`, `settings.voiceFeel
  ('legato'|'grip', default 'legato')`.
- Validate all four in `loadSettings` (1116, mirror the `chordExt` `.includes()` guard)
  **and add them to the Settings-modal save rebuild (2226)** — that handler re-assembles
  the settings object field-by-field and does NOT spread the old one, so a field added
  only to `loadSettings` is silently dropped on every Save. (This is the #1 gotcha.)
- Add the **Voicing row** to the key bar (`keyBar`, 1774) — mode toggle + (when Voiced)
  cluster/size/feel controls, modeled on `clusterRowHTML` (1613). Wire change handlers
  like the existing `keyRoot`/`keyScale` selects; each saves + re-renders + re-applies
  the active chord so a live chord updates immediately.
- Route `applyChord` (1700) through `voiceChordVoiced(...)` which, this phase, returns
  `voiceChord(...)` for both modes.
- **Acceptance:** controls render, persist across reload and across opening/saving
  Settings; no audible/tuning change yet. **Test:** toggle, reload, confirm settings;
  diff MIDI output = identical.
- **Risk:** key-bar crowding on narrow screens — budget CSS time; likely a second row.

### Phase 2 — Core engine: stateless Grip on a fixed cluster (triads) · M · ✅ DONE
**Goal:** Voiced+Grip actually voices triads on the selected cluster + completes the
chord. Deterministic, the first real payoff.
- Implement Steps A (triads only), B (Grip), C, D of §4.
- Cluster index resolution from `settings.voiceCluster`/`voiceSize`; `center` per band.
- Fallback to `voiceChord` on any failure.
- **Acceptance:** in C major, Voiced+Grip on cluster 1‑2‑3 gives tight top-3 triads +
  bass; switching cluster moves the register; every chord in every key stays in range.
- **Test:** node harness (§8) asserts all 12 keys × 7 diatonic triads × all 4 three-
  clusters are in range with correct tones; spot-check the workbench role-tags.

### Phase 3 — Legato: stateful voice leading + memory + re-center · M · ✅ DONE
**Goal:** the "hold common tones, glide one voice" feel; Feel toggle goes live.
- Add `lastVoiced` state (a separate module var, **not** `baseOffsets`). In
  `applyChord`: read `prev` from `lastVoiced` → compute the voiced array → call `apply`
  → set `lastVoiced` to the new cluster pitches.
- Implement Step B Legato (nearest-neighbour + center pull + octave-reset guard);
  seed Grip when `prev` null or cluster changed.
- **Clear `lastVoiced` at the three non-chord entry points** — `applyInst` (1591),
  `applySteel` (1657), `applyTest` (2230) — **plus a GUARDED clear at `apply`**:
  `if(!t.chord) lastVoiced=null`. The guard is essential — `applyChord` routes through
  `apply` *with* `t.chord` set, so an unconditional clear at 1979 would wipe memory on
  every chord tap.
- Add a **re-center gesture** (double-tap the active chord, or a small ⟲ button) that
  discards `lastVoiced` so drift/history can be reset. Do **not** persist `lastVoiced`.
- **Acceptance:** C‑Am‑F‑G holds 2 common tones on the rich changes; same-button-twice
  after different predecessors may differ (expected, documented); re-center resets.
- **Test:** harness asserts avg motion ≈ research numbers and always in range; manual
  A/B Grip vs Legato.

### Phase 4 — 7th chords & all qualities · M
**Goal:** extend from triads to all 14 chord types with correct drop/double rules.
- Step A full rules: guide-tone drop on 3-string clusters (drop 5th, keep altered 5th),
  full 7ths on 4-string clusters, triad-doubling on 4-string clusters, **dim7
  symmetric tie-break**, sus (no 3rd), aug (keep ♯5), add9/6/m6 color-tone retention.
- Non-cluster bass supplies dropped tones so a full strum is complete.
- **Acceptance:** every chord type in every key, on every cluster+size, in range with
  the intended tones; guide-tone ii‑V‑I voice-leads by step.
- **Test:** harness exhaustive over 12 keys × 14 qualities × 7 clusters; assert no
  voice crossing, altered-5th never dropped, dim7 deterministic.

### Phase 5 — Integration polish & invariants · M
**Goal:** everything shipped stays correct in Voiced mode.
- **Role-tags:** confirm `chordDegrees`/`renderStrings` (1720/1235) tag every string
  from its sounded pitch class; any stray tone degrades to the octave superscript
  (already true — assert it).
- **Key mode:** unaffected (highlight/lookup on `{r,row}`; voiced changes offsets, not
  identity) — verify coloring/Roman numerals unchanged; note the VL+Key-mode synergy.
- **Bends/pan:** the bend engine computes `eff=baseOffsets.map((o,i)=>o+bends[i])` (1416)
  and gates pedal availability on ±12 (`controlState` 1371, feasibility check 1321).
  **Known consequence:** voiced offsets reach ~±8, so a pedal/bend that works on Standard
  can push a string past ±12 on a voiced chord and get auto-disabled or clamped. Decide
  whether bends operate on the whole voicing or just the cluster, and expect some pedals
  to grey out on voiced chords — this is a real behavioral change, not just cosmetics.
- **Grey-out** stays on `voiceChord` (1765); confirm no new greying.
- **CSS:** finalize the key-bar layout for the added controls on narrow/sidebar widths;
  qlmanage mockups at both sizes (per prior workflow practice).

### Phase 6 — Docs, tests, QA · S
- Update `chords-theory.md` (new "Voicing modes / clusters" section; note §5 spread is
  still the default) and `voice-leading-research.md` (mark implemented).
- Commit the node **feasibility harness** as the permanent regression test.
- Final pass: 12 keys × 14 qualities × 7 clusters × 2 feels sanity sweep; deploy;
  poll Pages (empty-commit re-trigger if the deploy step flakes, per history).

---

## 6. Settings & persistence (gotchas)

- `loadSettings` (1116): add 4 validated fields with sensible defaults; also add them to
  the **default return object** at the end of that function.
- Settings-modal save (2226): **must include** the 4 new fields in the manual rebuild —
  otherwise every Save silently drops them.
- Cluster stored as an explicit string-index array (e.g. `[0,1,2]`) so size + position
  are one value; `voiceSize` is derived/redundant but kept for the UI toggle.

## 7. Interactions & invariants (must stay true)

- Downstream is offset-agnostic → **no rewiring** of `apply`, `renderStrings`,
  `renderPedals`, bends, MIDI (all already handle arbitrary ethnic/steel offsets).
- Voiced changes **offsets only**, never the `{r,row}` identity → Key mode + role-tags
  intact.
- Voiced engine **always** returns a playable voicing (fallback to `voiceChord`).
- Grey-out computed on the stateless engine only (no flicker).
- `lastVoiced` cleared at all four `activeChord` clear sites; never persisted.

## 8. Test harness (build first, keep forever)

Port the node solver used in research into `tests/voiceleading.mjs`:
- Exhaustive: 12 keys × 14 qualities × 7 clusters × {grip,legato} — assert (a) all
  offsets ∈ [−12,12], (b) only chord tones (with the sanctioned drops/doubles),
  (c) ascending/no-crossing, (d) altered 5th never dropped, (e) dim7 deterministic.
- Report avg motion + common-tones-held per cluster; regression-guard the research
  numbers (~2.9 st/change on the standard progression).

## 9. Effort summary

- **Phases 1–2 (scaffold + stateless Grip on triads):** the first shippable slice —
  **~1–1.5 days**. Delivers movable clusters, deterministically.
- **Phase 3 (Legato):** **~0.5–1 day** — the "glide one voice" feel; memory is a small
  non-persisted `lastVoiced` var (not `baseOffsets`).
- **Phase 4 (all qualities/7ths):** **~1 day** — mostly the drop/double rule table +
  tests.
- **Phase 5–6 (polish, docs, harness, deploy):** **~0.5–1 day.**
- **Total: ~3–4.5 focused days** for the full feature (both sizes, both feels, all
  chords, all clusters). The stopping point after Phase 2 is already useful.

## 10. Open questions (decide during build)

- Bends in Voiced mode: bend the whole voicing, or only the cluster voices?
- Re-center gesture: double-tap vs. a visible control?
- Should the cluster picker preview the register (e.g. a tiny note range label)?
- Low-cluster muddiness: warn/hint on 4‑5‑6, or leave it as a creative choice?
