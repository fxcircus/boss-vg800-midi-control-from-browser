# Pedal-bend review — proposals for approval

**How to use this file:** every proposal has an `Approve: [ ]` line. Change it to `[x]` for the ones
you want, edit any values inline (they're all plain text), then tell Claude "apply the approved
bends-review items". Nothing has been changed in the app yet — this is a decision document.

---

## Current inventory (for reference)

| System | Applies to | Controls today |
|---|---|---|
| **Generic copedent** | every regular tuning with a detectable major-triad root | A: 5th +2 · B: 3rd +1 · LKL: root +1 · LKR: root −1 (maj7) · A+B combo · A+B+LKR combo |
| **E9 copedent** | E9 Nashville, E9 Lanois, B6 Universal | A: 5th +2 · B: 3rd +1 · C: 5th +2 & root +2 · LKL: root +1 · LKR: root −1 · VERT: 5th −1 · A+B |
| **C6 copedent** | C6 Swing/Jazz | P5: 5th −1 · P6: root +1 · P8 "Boo-wah": root −3 · LWR: 3rd −1 |
| **Modes pedals** | Modes section | A: high string up to the 7th · B: low string down to the 7th |
| **Scale bends** | Chords key mode | six string-pedals to the next scale tone (systematic — not reviewed) |
| **Custom pedals** | Radiohead (G→C pull), Sitar (5 meend pulls) | intentional per-tuning designs — untouched |
| **Per-String factory presets** | both pedal modes | Clear, ±1, ±2, 4th ↑, 5th ↑, Oct ↑/↓, B-Bender, G-Bender, Drop Low, Nashville |

---

## Generic copedent (the big one — every regular tuning feels this)

### P1 — LKL: root +1 → **3rd −1 (major → minor)**
- **Current**: LKL raises the root a half step (root → ♭2 against the untouched 3rd & 5th — a harsh
  sus♭2 on its own; on a real E9 the F-lever only shines in combinations our degree model doesn't have).
- **Proposed**: LKL lowers the **3rd by 1** → instant **parallel minor** on any major tuning card.
  `{id:'LKL', name:'LKL', group:'knee', key:'d', act:'3rd −½ (minor)', moves:[{deg:'3',semis:-1}]}`
- **Why**: hold one lever and every open-major tuning (Open E/D/G/A, the lap-steel 6ths, Standard's
  detected root…) becomes its minor. It's the single most-requested move on real steels, and the C6
  copedent already proves it works in this app (LWR). Root +1 standalone is the least musical control
  in the current set.
- **Approve**: [ ]

### P2 — new combo **A + LKL = minor 6th** (requires P1)
- **Proposed**: `{id:'AL', name:'A + LKL', group:'combo', parts:['A','LKL'], key:'j',
  act:'the m6 grip', moves:[{deg:'5',semis:2},{deg:'3',semis:-1}]}`
- **Math**: root stays, 3rd −1 = ♭3, 5th +2 = 6 → **R ♭3 6** — the classic steel/jazz m6 color
  (C → C E♭ A). Verified against the degree engine.
- **Note**: key J is free in copedent context (All Strings only exists in Per-String mode); flag if
  you'd rather leave J untouched.
- **Approve**: [ ]

### P3 — keep or retire **A+B+LKR**?
- **Current**: 5th +2, 3rd +1, root −1 → maj7-over-IV color ("IV, maj-7th"). Usable but the least
  idiomatic of the combos.
- **Proposed**: keep as-is (default), **or** if P1+P2 land and three combos feel crowded, retire it.
- **Approve keep**: [x]  **Approve retire**: [ ]

---

## E9 copedent (pedal-steel section)

### P4 — add the classic **B + C combo = the ii chord**
- **Proposed**: `{id:'BC', name:'B + C', group:'combo', parts:['B','C'], key:'h',
  act:'the ii chord', moves:[{deg:'3',semis:1},{deg:'5',semis:2},{deg:'1',semis:2}]}`
- **Math**: C E G → D F A = **D minor, the ii** — the second-most-used grip on a real E9 after A+B.
  Key H is free in the e9 set (uses a,s,w,d,f,e,g).
- **Approve**: [ ]

### P5 — E9 LKL: root +1 → keep
- On E9 I suggest **keeping** root +1 (it's the authentic F-lever), even if the generic copedent
  changes per P1. The steel section should stay faithful to the real instrument.
- **Approve keep**: [x]  **Approve change to 3rd −1 as well**: [ ]

---

## C6 copedent

### P6 — add combo **P5 + LWR = diminished**
- **Proposed**: `{id:'DIM', name:'P5 + LWR', group:'combo', parts:['P5','LWR'], key:'g',
  act:'diminished', moves:[{deg:'5',semis:-1},{deg:'3',semis:-1}]}`
- **Math**: C E G → C E♭ G♭ = **C°** — the swing-era passing-chord bread and butter.
- **Approve**: [ ]

---

## Modes section

### P7 — third pedal: the mode's **characteristic tone**
- **Proposed**: a Pedal C that bends one inner string to the current mode's defining color note
  (Lydian ♯4, Dorian 6, Phrygian ♭2, Mixolydian ♭7…), retargeting per mode like the 7th pedals do.
- **Note**: this is a small engine extension (a `charTone` field per mode + one controlState branch),
  not just data. Worth it if you use the Modes section a lot.
- **Approve**: [ ]

---

## Tuning-specific custom pedals (new — the Radiohead/Sitar mechanism)

### P8 — **DADGAD**: the sus resolution pedal
- **Proposed**: Pedal A raises string 3 (G) +2 → A: **D A D G A D → D A D A A D**, the suspended 4th
  resolving into pure fifths — *the* DADGAD gesture, and it glides in Classic mode.
  `pedals:[{id:'A', name:'Sus · resolve', group:'foot', key:'a', string:2, semis:2}]`
- **Approve**: [ ]

### P9 — **Nashville**: shimmer drop
- **Proposed**: Pedal A drops the two octave-strings 3+4 back down 12 (high-strung → standard core),
  a reverse-shimmer reveal. Needs two single-string pedals or one two-string custom control —
  flag: two separate pedals (A: string 3 −12, B: string 4 −12) is what the mechanism supports today.
- **Approve**: [ ]

### P10 — **Open G Dobro / Open G low**: 3rd-hammer
- **Proposed**: Pedal A raises the ♭3-adjacent string... in practice: string 2 (B) −1 → B♭ giving
  open **G minor** for slide. (Gm conversion for both open-G cards.)
- **Approve**: [ ]

---

## Per-String factory presets

### P11 — add **4th ↓** `[-5,-5,-5,-5,-5,-5]` (Jump row)
- Down-jump partner to 4th ↑ — drone drops, half-time feels.
- **Approve**: [ ]

### P12 — add **Drop Hi** `[-2,0,0,0,0,0]` (Benders row)
- High E → D: the "palm bender"/Hipshot drop, companion to Drop Low.
- **Approve**: [ ]

---

*Verified: all degree math above checked against the app's `controlState` semantics
(moves apply per pitch-class degree; combos aggregate). Nothing here is implemented yet.*
