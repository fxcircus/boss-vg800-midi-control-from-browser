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
- **Engine:** `voiceChord(rootPc, formula)` — formula → per-string offsets.
- **Helpers:** `chordExtDef()`, `chordRows()`, `applyChord()`.
- **Render:** `renderChords()` — builds the matrix + Extend selector, wires taps.
- **State:** `activeChord` (`{r, row}` or null); persisted `settings.chordExt`.
- **CSS:** `.chord-matrix`, `.chord-cell`, `.chord-rowhd(.ext)`, `.chord-ext`.
- **Integration:** `apply({name, offsets, chord})` sets `activeChord` and reuses
  the normal tuning pipeline. `applyInst`/`applySteel`/`applyTest` clear
  `activeChord`. All of them call `renderChords()` so the highlight stays in sync.

## 2. Layout & behavior (unchanged rules)

- **Rows:** 5 fixed rows (MAJ, MIN, 7, MIN7, MAJ7) + 1 dynamic "special" row set
  by the **Extend** selector (add9 / 6 / m6 / sus2 / sus4 / dim / dim7 / m7♭5 /
  aug). Left row label = full quality (spelled out). Button = compact symbol.
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
| dim | extend | 0‑3‑6 | R, m3, ♭5 | `C°` | Cdim |
| dim7 | extend | 0‑3‑6‑9 | R, m3, ♭5, ♭♭7 | `C°7` | Cdim7 |
| m7♭5 (half‑dim) | extend | 0‑3‑6‑10 | R, m3, ♭5, m7 | `Cø` | Cm7♭5 |
| aug | extend | 0‑4‑8 | R, M3, ♯5 | `C+` | Caug |

Notes:
- `add9`'s 9th is written as interval **14** (an octave + M2) so the voicing
  places it up high, not as a cluster with the root.
- `dim7`'s 7th is a **diminished 7th** = 9 semitones (♭♭7), enharmonic to a M6.
- `m7♭5` = half-diminished: minor 3rd + ♭5 + **minor** 7th (contrast dim7's ♭♭7).
- `sus2`/`sus4` have **no 3rd** — the 2nd / 4th is the quality tone.

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

Run this in `node` to check every quality × 12 roots for foreign notes, missing
tones, dropped ♭5, and ±12 range. Paste the *current* `voiceChord` verbatim:

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
