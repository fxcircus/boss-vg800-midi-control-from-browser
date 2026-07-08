# Chords Section — Music Theory & Voicing Reference

Reference for the **Chords** section (`#sec-chords`) in `vg800-tuner.html`. It's
an omnichord: tap a chord, all 6 strings retune to a musical voicing of that
chord so strumming plays it with no wrong notes. This documents every chord's
theory, the voicing engine, and how to change things safely.

**Last updated:** 2026-07-06

## 1. Where it lives in the code

All in `vg800-tuner.html` (single file). Key pieces (search by name — line
numbers drift):

- **Data:** `CHORD_ROOTS`, `CHORD_FIXED`, `CHORD_EXT`, `CHORD_STR_LO`.
- **Engine:** `voiceChord(rootPc, formula)` — formula → per-string offsets (Spread).
- **Voiced engine:** `voiceChordVoiced()`, `clusterIdx()`, `solveCluster()`,
  `clusterTargetPcs()`, `reachPitch()`, `permsUniq()`, `lastVoiced` — see §Voicing modes.
- **Helpers:** `chordExtDef()`, `chordRows()`, `applyChord()`, `reapplyActiveChord()`.
- **Key mode:** `SCALES`, `CHORD_FUNC`, `RN_BASE`, `QUAL_ROW`, `romanNumeral()`, `diatonicMap()` — see §Key mode.
- **Workbench role tags:** `degLabel()`, `degColor()`, `chordDegrees()` — consumed by `renderStrings()` to colour each string by its chord role. See §Role tags.
- **Render:** `renderChords()` — builds the key bar + matrix + Extend selector, wires taps.
- **State:** `activeChord` (`{r, row}` or null); `lastVoiced` (Legato memory, not persisted); persisted `settings.chordExt`, `settings.keyRoot`, `settings.keyScale`, `settings.voicing`, `settings.voiceSize`, `settings.voiceStart`, `settings.voiceFeel`.
- **CSS:** `.chord-matrix`, `.chord-cell` (+ `.tonic/.subdom/.dominant/.offkey/.on`), `.chord-rn`, `.chord-rowhd(.ext)`, `.chord-ext`, `.chord-key`, `.chord-legend`; `.str .slide .oct.deg` (workbench role tag).
- **Integration:** `apply({name, offsets, chord})` sets `activeChord` and reuses
  the normal tuning pipeline. `applyInst`/`applySteel`/`applyTest` clear
  `activeChord`. All of them call `renderChords()` so the highlight stays in sync.

## 2. Layout & behavior (unchanged rules)

- **Rows:** 6 fixed rows (MAJ, MIN, 7, MIN7, MAJ7, DIM) + 1 dynamic "special" row
  set by the **Extend** selector (add9 / 6 / m6 / sus2 / sus4 / dim7 / m7♭5 / aug).
  Left row label = full quality (spelled out). Button = compact symbol.
  (DIM is a fixed row so every key's one diatonic dim chord is always visible — §Key mode.)
- **Columns:** 12 roots C … B (all sharps — see §6).
- **Latching:** one tap = active tuning (radio-button, one active at a time).
- **Grey-out:** a cell greys + is non-tappable if its voicing can't fit ±12 on
  some string (recomputed when Extend changes). In practice this never triggers
  — see §7.
- Tapping reuses the app's tuning path: sets `baseOffsets`, updates the live
  string display / workbench, and sends per-string pitch CCs. Bends/panning
  overlays read the same `baseOffsets`, so everything stays in sync.

## 3. Data model

Each row/quality is an object:

```js
{ key, label, suffix, sym, formula }
```

| Field | Meaning |
|---|---|
| `key` | unique id (used for `activeChord.row`, `data-row`, and — for extensions — `settings.chordExt`). Keep ASCII (e.g. `m7b5`, not `m7♭5`). |
| `label` | full quality; shown as the **left row label** (`.toUpperCase()` for the special row). |
| `suffix` | full chord-name suffix → the **applied name** in the workbench ("Current Tuning"), e.g. `Cmaj7`, `Cm7♭5`. |
| `sym` | **compact button symbol** shown in the grid cell, e.g. `Δ`, `°`, `ø`, `+`. |
| `formula` | semitone intervals from the root (drives the voicing + range check). |

`CHORD_FIXED` = the always-visible rows. `CHORD_EXT` = the Extend options (one at
a time becomes the special row). `chordRows()` = `[...CHORD_FIXED, currentExt]`.

Button text = `root + sym`. Applied/workbench name = `root + suffix`. (This split
is why `CΔ` on the button reads `Cmaj7` in the workbench.)

## 4. Full chord catalog

Formula = semitones from root. Button shown for root **C**. "Row" = fixed (always
visible) or extend (special row via the Extend selector).

| Chord | Row | Formula | Intervals | Button | Full name |
|---|---|---|---|---|---|
| Major | fixed | 0‑4‑7 | R, M3, P5 | `C` | C |
| Minor | fixed | 0‑3‑7 | R, m3, P5 | `Cm` | Cm |
| Dominant 7 | fixed | 0‑4‑7‑10 | R, M3, P5, m7 | `C7` | C7 |
| Minor 7 | fixed | 0‑3‑7‑10 | R, m3, P5, m7 | `Cm7` | Cm7 |
| Major 7 | fixed | 0‑4‑7‑11 | R, M3, P5, M7 | `CΔ` | Cmaj7 |
| add9 | extend | 0‑4‑7‑14 | R, M3, P5, M9 | `Cadd9` | Cadd9 |
| 6 (major 6) | extend | 0‑4‑7‑9 | R, M3, P5, M6 | `C6` | C6 |
| m6 (minor 6) | extend | 0‑3‑7‑9 | R, m3, P5, M6 | `Cm6` | Cm6 |
| sus2 | extend | 0‑2‑7 | R, M2, P5 | `Csus2` | Csus2 |
| sus4 | extend | 0‑5‑7 | R, P4, P5 | `Csus` | Csus4 |
| dim | **fixed** | 0‑3‑6 | R, m3, ♭5 | `C°` | Cdim |
| dim7 | extend | 0‑3‑6‑9 | R, m3, ♭5, ♭♭7 | `C°7` | Cdim7 |
| m7♭5 (half‑dim) | extend | 0‑3‑6‑10 | R, m3, ♭5, m7 | `Cø` | Cm7♭5 |
| aug | extend | 0‑4‑8 | R, M3, ♯5 | `C+` | Caug |

Notes:
- `add9`'s 9th is written as interval **14** (an octave + M2) so the voicing
  places it up high, not as a cluster with the root.
- `dim7`'s 7th is a **diminished 7th** = 9 semitones (♭♭7), enharmonic to a M6.
- `m7♭5` = half-diminished: minor 3rd + ♭5 + **minor** 7th (contrast dim7's ♭♭7).
- `sus2`/`sus4` have **no 3rd** — the 2nd / 4th is the quality tone.

## Key mode (scale-aware highlighting)

Pick a **root + scale** and the grid highlights that key's seven diatonic chords
— colored by harmonic function, labeled with Roman numerals. Non-diatonic chords
dim but stay tappable (borrowed chords are a real songwriting tool). It's a
lookup-and-highlight layer only: **tapping any cell still retunes exactly as
before** — key mode never changes what a tap does.

**Chord follows the key.** If a diatonic chord is latched and you then change the
**root** or **scale**, the active chord *moves to the same scale degree* in the new
key (`chordDegreeIn` → `diatonicChordAt` → re-`applyChord`, in `moveChordToKey`): e.g.
the I in C major becomes the i when you switch to C minor; changing the root C→G
transposes the vi from Am to Em; the V7 stays a V7. A non-diatonic (borrowed) active
chord has no degree, so it's left as-is.

### Data

```js
SCALES = { 'Major': {alt:'Ionian', intervals:[…7], quals:[…7], special:'add9'}, … }
```

| Scale | Alt | Intervals (from root) | Diatonic qualities (deg 1→7) | Extend auto-set |
|---|---|---|---|---|
| Major | Ionian | 0 2 4 5 7 9 11 | maj min min maj **7** min dim | add9 |
| Minor | Aeolian | 0 2 3 5 7 8 10 | min dim maj min min maj maj | add9 |
| Dorian | — | 0 2 3 5 7 9 10 | min min maj maj min dim maj | add9 |
| Phrygian | — | 0 1 3 5 7 8 10 | min maj maj min dim maj min | add9 |
| Lydian | — | 0 2 4 6 7 9 11 | maj maj min dim maj min min | add9 |
| Mixolydian | — | 0 2 4 5 7 9 10 | maj min dim maj min min maj | add9 |
| Harm. Minor | — | 0 2 3 5 7 8 11 | min dim **aug** min **7** maj **dim7** | aug |

- `intervals` compute each degree's pitch class; `quals` are the diatonic chord
  qualities (which determine the grid **row** each diatonic chord lands in).
- `special` is auto-set on scale selection (the user can override the Extend
  selector afterward). For the six standard scales the diatonic dim chord is the
  fixed DIM row, so the special row is free (add9 color). Harmonic minor needs
  **both** aug (III+) and dim7 (vii°7) — see the limitation below.

### Function coloring & Roman numerals

- `CHORD_FUNC = ['tonic','subdom','tonic','subdom','dominant','tonic','dominant']`
  (by scale degree, 0-indexed). Colors: **tonic = green `#45c07a`**,
  **subdominant = blue `#5aa2ea`**, **dominant = orange `#ea6a3c`** (also the
  legend swatches). Applied as the cell's `.tonic/.subdom/.dominant` class.
- `romanNumeral(deg, qual)`: uppercase for maj (I, IV); lowercase for min (ii,
  iii, vi); lowercase + `°` for dim (vii°); lowercase + `°7` for dim7 (vii°7);
  uppercase + `+` for aug (III+); uppercase + `7` for the dominant (**V7**).

### Quality → grid row (`QUAL_ROW`)

Diatonic qualities map straight to row keys **except** the dominant:
`maj→maj, min→min, '7'→'sev', dim→dim, aug→aug, dim7→dim7`. `diatonicMap(root,
scale)` returns `{"<pc>-<rowKey>": {func, rn}}`; each grid cell looks up
`ri + '-' + row.key`.

### Cell states in key mode

Per cell, in source-order so later CSS wins (all equal specificity):
`.tonic/.subdom/.dominant` (diatonic, + a `.chord-rn`) → `.offkey` (non-diatonic,
dimmed, still tappable) → `.on` (active, brass, `opacity:1` — plus
`.offkey.on{opacity:1}` for hovered active borrowed chords) → `.disabled`
(out-of-range, non-tappable, wins). The Roman-numeral slot (`.chord-rn`,
`min-height`) is reserved on every cell in key mode so symbols stay aligned.

### Design decisions (deliberate — change here if revisited)

- **The V is a dominant 7th**, per `quals` (`'7'` on degree 5). So the **G7** cell
  lights as V7 and the plain **G** major triad greys as non-diatonic. To make the
  V *triad* also diatonic, you'd need a second qual/row concept.
- **Diatonic = triads (+ V7 + harmonic-minor's dim7).** So the **MIN7 and MAJ7
  rows stay dark** in key mode for the standard scales (their diatonic sevenths
  aren't in `quals`). Still tappable as color.
- **Harmonic Minor is the only scale needing two special-row chords** (III+ aug
  and vii°7 dim7). Only one shows at a time; auto-set to aug, flip Extend to °7
  for the vii°7. Every other diatonic chord is a fixed row, so nothing else hides.
- **III+ in harmonic minor is colored *tonic* (green)** because `CHORD_FUNC[2] =
  'tonic'`. (Some analyses call it dominant-function.)

### Adding / changing a scale

Add to `SCALES` (7-length `intervals` + `quals`, a `special` Extend key). Every
`quals` value must be one of `maj/min/7/dim/aug/dim7` (all have rows). The scale
appears in the dropdown automatically (`Object.keys(SCALES)`). Verify with §10
plus the independent third-stacking check used to validate these.

### Verified

Independent derivation (stacking thirds on the raw scale intervals) matches every
declared quality across all 7 scales × 7 degrees; all **588** diatonic chords
(7 × 12 × 7) voice within ±12 with exactly their own tones.

## Role tags (workbench string colouring)

When a chord is active, the **Current Tuning** workbench labels each of the six
strings with its role in the chord — without resizing the component. Two cues:

1. **Left dot recoloured by role.** The six string colours are reused as a *role*
   palette (`degColor()`): root = red, 3rd = orange, 5th = yellow, 7th = green,
   2nd/9th = blue, 4th/6th = purple. Because a voicing doubles tones, several
   dots share a colour — you can see the roots/3rds/5ths group at a glance.
2. **Degree tag in the note pill.** The octave superscript is replaced by the
   degree name (`.oct.deg`, bold + `--ink`): `R 2 ♭3 3 4 ♭5 5 ♯5 6 ♭7 7 °7 9`.
   Minor vs major 3rd/7th are distinct (`♭3`/`3`, `♭7`/`7`), as is `°7` (dim7)
   vs `6`, and `9` (add9) vs `2` (sus2).

### How it's computed

- `chordDegrees()` builds `{pcInterval → {label, color}}` from the active chord's
  formula (looked up in `CHORD_FIXED`+`CHORD_EXT` by `activeChord.row`).
- In `renderStrings()`, each string's sounded pitch class minus the chord root
  gives a 0–11 interval; that keys into the map for the tag + dot colour.
- `degLabel(formulaValue, rowKey)` turns a formula value into a name, keeping the
  ambiguous cases apart: `14 → 9`, `2 → 2`, `9 → °7` for dim7 else `6`.

### Notes

- **Layout is never touched.** The pill is `position:absolute` (floats on the
  wire, centred), so a wider tag grows within the wire instead of reflowing the
  row. Dots only change colour. Works at both the sidebar and below-content sizes.
- **Only the tuning rows are recoloured.** The pan strip keeps fixed per-string
  colours — it needs each dot distinguishable by *string*, not role.
- **Reverts cleanly.** Non-chord tunings (and any string bent off a chord tone)
  fall back to the string-index colour + octave superscript.
- **Verified** across all 14 chord types × 12 roots (168 voiced instances): every
  string resolves to a real chord tone with the matching tag and colour family.

## 5. Reference voicings (root C)

Generated straight from `voiceChord`. `low→high` = the sounded notes on strings
6→1. `offsets` = the app's per-string array, index 0 = string 1 (high E) …
index 5 = string 6 (low E). The `max ±off` column is the worst-case offset over
**all 12 roots** for that quality (all well within ±12).

| Chord | Button (C) | C voicing low→high | Offsets str1..6 | max ±off (12 roots) |
|---|---|---|---|---|
| Major | C | C G C E G C | −4,−4,−3,−2,−2,−4 | ±8 |
| Minor | Cm | C G C D♯ G C | −4,−4,−4,−2,−2,−4 | ±8 |
| Dominant 7 | C7 | C G A♯ E G C | −4,−4,−3,−4,−2,−4 | ±8 |
| Minor 7 | Cm7 | C G A♯ D♯ G C | −4,−4,−4,−4,−2,−4 | ±8 |
| Major 7 | CΔ | C G B E G C | −4,−4,−3,−3,−2,−4 | ±8 |
| add9 | Cadd9 | C G D E G C | −4,−4,−3,0,−2,−4 | ±10 |
| 6 | C6 | C G A E G C | −4,−4,−3,−5,−2,−4 | ±8 |
| m6 | Cm6 | C G A D♯ G C | −4,−4,−4,−5,−2,−4 | ±8 |
| sus2 | Csus2 | C G C D G C | −4,−4,−5,−2,−2,−4 | ±8 |
| sus4 | Csus | C G C F G C | −4,−4,−2,−2,−2,−4 | ±8 |
| dim | C° | C F♯ C D♯ F♯ C | −4,−5,−4,−2,−3,−4 | ±8 |
| dim7 | C°7 | C F♯ A D♯ F♯ C | −4,−5,−4,−5,−3,−4 | ±7 |
| m7♭5 | Cø | C F♯ A♯ D♯ F♯ C | −4,−5,−4,−4,−3,−4 | ±7 |
| aug | C+ | C G♯ C E G♯ C | −4,−3,−3,−2,−1,−4 | ±9 |

(Notes shown with the app's sharp spelling — see §6.)

## 6. Enharmonic spelling convention

The whole app uses one **global sharp-based** chromatic spelling:
`C C♯ D D♯ E F F♯ G G♯ A A♯ B` (the `NOTE` array). Roots and all displayed notes
use it everywhere (tunings, ethnic, steel, chords). Consequences:

- Flat/double-sharp tones show as their **sharp enharmonic**: F minor's 3rd →
  `G♯` (not A♭); A♯ major's 3rd → `D` (not C♯♯); D♯ major's 3rd → `G` (not F♯♯).
- This is **pitch-correct** — the sounded pitch class is right — just not always
  the idiomatic spelling for flat/sharp keys.
- Proper per-chord flat spelling (e.g. E♭ major with A♭/B♭) would be an
  **app-wide** note-display change (every section), so it's out of scope for the
  chords feature alone. Flag it as a separate task if ever wanted.

## 7. The ±12 grey-out (why nothing greys)

`voiceChord` returns `null` if any string would exceed ±12; `renderChords` then
greys + disables that cell, recomputing whenever the Extend selection changes.

With the current engine **every one of the 14 qualities fits on all 12 roots**
(max offset ±10). So the safety net is implemented and correct but **never trips**
— which is the desired outcome for an omnichord: every chord is playable. If a
future chord/voicing did exceed ±12, its cell would grey out automatically.

## 8. The voicing engine (`voiceChord`)

Goal: a musical spread (root in the bass, tones stacked low→high) with every
string reachable within ±12 of standard tuning.

```
STD_MIDI     = [64,59,55,50,45,40]   // string 1(high E) … string 6(low E)
CHORD_STR_LO = [40,45,50,55,59,64]   // low→high (= STD_MIDI reversed)
```

Steps:

1. **Bass root** = the nearest root to the low‑E string (40): `bass = 40 + d`
   where `d = rootPc − 4` folded into −6..+6. Keeps the root in the bass, near
   the physical low string.
2. **Template** (which tone each of the 6 stacked voices plays), from the formula
   `f`:
   - 4-tone chord: `[f0, f2, f3, f1, f2, f0]` = **R, 5, color(7th/9th/6th), 3rd, 5, R**
   - 3-tone chord: `[f0, f2, f0, f1, f2, f0]` = **R, 5, R, 3rd/quality, 5, R**
   - So the essential tones are always present, the root is doubled (×2–3), the
     5th (`f2`) is doubled — and because the 5th is `f2`, dim/dim7/m7♭5 keep their
     **♭5** (it's never dropped).
3. **Ascending walk:** place slot 0 at `bass`, then each next slot at the lowest
   pitch strictly above the previous whose pitch class matches that tone. This
   spreads the voicing upward low→high and picks each string's nearest usable
   octave automatically.
4. **Offsets:** `off[i] = voicing[i] − CHORD_STR_LO[i]` (low→high), then
   **reversed** to the app's index convention (index 0 = string 1). If any
   `|off| > 12`, return `null` (grey out).

### Voicing rules the engine satisfies

- Always include the **quality-defining tone** (3rd; 4th for sus4; 2nd for sus2;
  correct 7th for 7th/maj7/min7/m7♭5; 6th for 6/m6). ✔ (`f1` and `f3` in the
  template)
- **5th droppable first** when space is tight — but the engine never runs out of
  room, so nothing is ever dropped. The ♭5 in dim7/m7♭5 is therefore always
  kept. ✔
- Fill remaining strings by **doubling the root first, then the 5th**. ✔ (root ×2,
  fifth ×2 in the template)
- **Spread** tones across octaves low→high, not clustered. ✔ (ascending walk)
- **Root in the bass** when possible. ✔ (slot 0 = bass root)
- **Nearest octave** per string, **clamped to ±12**. ✔

## Voicing modes (Spread / Voiced clusters)

The **Voicing** control (in the Chords key bar) picks how a tapped chord is spread
across the six strings. Full design + feasibility: `voice-leading-plan.md` and
`voice-leading-research.md`. `applyChord` routes through `voiceChordVoiced()`, which
dispatches on `settings.voicing`; everything downstream consumes the resulting
6-offset array unchanged.

- **Spread** (default) — the classic root-in-bass `voiceChord()` (§8). Nothing about
  the sections above changes; this is what the reference voicings (§5) describe.
- **Voiced** — a chosen **cluster** of 3 or 4 adjacent strings carries a close,
  ascending, voice-led voicing; the remaining strings complete the chord (root+5th
  bass below, nearest chord-tone doublings above). So a full strum sounds the whole
  chord; strumming just the cluster gives smooth voice leading.

### The knobs (`settings.*`, all persisted; also re-listed in the Settings-save rebuild)

- `voicing` — `'spread'` | `'voiced'`.
- `voiceSize` — `3` | `4` strings in the cluster.
- `voiceStart` — 0-based index of the cluster's top string (0 = string 1 / high E).
  Cluster = `[voiceStart … voiceStart+voiceSize-1]`; the picker offers `1–3`…`4–6`
  (size 3) or `1–4`…`3–6` (size 4).
- `voiceFeel` — `'grip'` (**block chords**: root position — the root is the lowest
  cluster note, so a chord is the same shape every time; stateless, deterministic) |
  `'legato'` (**smooth**: voice-leads from the previous voicing, holding common tones).
  The two are genuinely distinct: Grip's bottom voice tracks the chord roots (they
  jump), Legato holds common tones and moves one voice. (For rootless cluster targets
  — m7♭5/dim7 on a 3-string cluster — Grip falls back to a centered voicing since
  there's no root to put on the bottom.)

### Engine (`voiceChordVoiced`)

1. **Cluster tones** (`clusterTargetPcs`): distinct chord tones, then reduce to
   cluster size — **drop the perfect 5th first, then the root** (the bass re-supplies
   both), so guide tones (3rd/7th) and any **altered 5th (♭5/♯5)** survive. If the
   cluster is larger than the chord (triad on 4 strings), **double the root**.
2. **Solve** (`solveCluster`): pick pitches for the cluster strings — one per string,
   strictly **ascending / no crossing**, each within its ±12 window — minimising
   `Σ|pitch − prev| + 0.25·Σ|pitch − center|` (+ a `rootLow` penalty for Grip). In
   **Legato** `prev` = the previous cluster voicing (follow it); in **Grip** `prev` is
   `null` and `rootLow` = the chord root, adding +100 cost to any voicing whose lowest
   note isn't the root → **root position** every time. The `0.25·center` term is the
   **register guard** that keeps voicings inside ±12 (no drift). `center` = midpoint of
   the cluster's ±12 intersection band.
3. **Complete**: bass strings below the cluster get root/5th (the chord's *actual*
   5th), strings above get the nearest chord tone. Any failure → fall back to
   `voiceChord`.

### Legato memory & re-center

`lastVoiced = {cluster, pitches}` (module-level, **not persisted**) is set after each
voiced tap and read as `prev` when `voiceFeel==='legato'` and the cluster is unchanged.
It's cleared on every non-chord path — `applyInst`, `applySteel`, `applyTest`, and a
**guarded** `if(!t.chord)` in `apply` (chord taps route through `apply` *with*
`t.chord` set, so the guard prevents wiping memory on every tap). The **⟲ Center**
button (shown in Voiced+Legato) clears `lastVoiced` so the next chord re-seeds centered.

### Invariants (why nothing else breaks)

Voiced changes **offsets only**, never the `{r, row}` identity — so **Key mode** and
the **role-tags** are untouched (role-tags derive from the sounded pitch class, and
every voiced string is a real chord tone, so they always tag correctly). The
**grey-out** stays on stateless `voiceChord` (§7). Every cluster/key/quality is proven
reachable within ±12 (see the harness, §10).

## 9. How to change / add a chord

To **add a fixed row**: add an entry to `CHORD_FIXED` (matrix row order = array
order). To **add an Extend option**: add to `CHORD_EXT` *and* add its `key` to the
`settings.chordExt` validation list in `loadSettings` (the
`['add9','6',…].includes(...)` check) so a saved value isn't reset. Give it
`key/label/suffix/sym/formula`.

To **change a symbol**: edit that entry's `sym` (button) — leave `suffix` alone to
keep the workbench name, or change both.

To **change a voicing shape** (affects *all* chords): edit the two `tmpl`
templates in `voiceChord`. Re-run the audit (§10) afterward — a template change
can push some chords out of ±12.

No CSS changes are needed for extra rows/columns (the grid is auto-flow); the
Extend selector wraps on narrow screens.

## 10. How to verify after any change (audit script)

For the **Voiced engine**, run the committed regression harness — it *extracts*
the live engine from `vg800-tuner.html` (no copy to drift) and checks every
cluster × key × quality × feel for range, foreign notes, voice crossing, dropped
altered-5th, dim7 determinism, and Spread passthrough:

```
node tests/voiceleading.mjs      # exit 0 = pass (2520 cases)
```

For **Spread** (`voiceChord`), run this in `node` to check every quality × 12 roots
for foreign notes, missing tones, dropped ♭5, and ±12 range. Paste the *current*
`voiceChord` verbatim:

```js
const NOTE=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const STD_MIDI=[64,59,55,50,45,40], CHORD_STR_LO=[40,45,50,55,59,64];
function voiceChord(rootPc,f){ /* paste verbatim from vg800-tuner.html */ }
const QUALS=[ ['maj',[0,4,7]],['min',[0,3,7]],['7',[0,4,7,10]],['min7',[0,3,7,10]],
  ['maj7',[0,4,7,11]],['add9',[0,4,7,14]],['6',[0,4,7,9]],['m6',[0,3,7,9]],
  ['sus2',[0,2,7]],['sus4',[0,5,7]],['dim',[0,3,6]],['dim7',[0,3,6,9]],
  ['m7b5',[0,3,6,10]],['aug',[0,4,8]] ];
for(const [q,f] of QUALS){ const need=new Set(f.map(iv=>iv%12));
  for(let r=0;r<12;r++){ const off=voiceChord(r,f);
    if(!off){ console.log(NOTE[r]+q+': GREYED'); continue; }
    const pcs=off.map((o,i)=>((STD_MIDI[i]+o)%12+12)%12), chord=new Set([...need].map(iv=>(r+iv)%12));
    for(const pc of pcs) if(!chord.has(pc)) console.log(NOTE[r]+q+': FOREIGN '+NOTE[pc]);
    for(const pc of chord) if(!pcs.includes(pc)) console.log(NOTE[r]+q+': MISSING '+NOTE[pc]);
  }
}
```

A clean run prints nothing. Last verified: all 14 qualities × 12 roots pass
(no foreign notes, all tones present, ♭5 kept in dim7/m7♭5, max offset ±10).
