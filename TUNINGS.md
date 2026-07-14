# Tunings

Every tuning built into the app, with its open-string notes (low→high), the per-string semitone offset from standard **E A D G B E** (string 1 = high E … string 6 = low E; positive = tune up), and the **VG-800 guitar model** the app auto-selects for it in Classic mode (⚙ Settings → Mode → *Guitar model*). Model selection sends two CCs in order: **INST · TYPE** (CC 70, electric vs acoustic), then **INST:E.GTR · TYPE** (CC 77) or **INST:ACOUSTIC · TYPE** (CC 78). The value tables live in `vg800-tuner.html` (`EGTR_MODELS` / `ACOUSTIC_MODELS`) and in the README. Modes re-rooted to other keys reuse their C-template's model; user tunings and chords don't change the model.

## Common

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **Standard** | E A D G B E | `[0, 0, 0, 0, 0, 0]` | `CLA-ST` |  |
| **DADGAD** | D A D G A D | `[-2, -2, 0, 0, 0, -2]` | `MA28` |  |
| **Nashville** | E A D G B E | `[0, 0, +12, +12, +12, +12]` | `MA28` |  |
| **Baritone** | B E A D F# B | `[-5, -5, -5, -5, -5, -5]` | `TE` |  |
| **Bass VI** | E A D G B E | `[-12, -12, -12, -12, -12, -12]` | `P-90` |  |
| **Hendrix** | Eb Ab Db Gb Bb Eb | `[-1, -1, -1, -1, -1, -1]` | `CLA-ST` |  |

## Lap Steel

### 6th Family

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **C6** | C E G A C E | `[0, +1, +2, +5, -5, -4]` | `P-90` |  |
| **A6** | C# E F# A C# E | `[0, +2, +2, +4, -5, -3]` | `P-90` |  |
| **C6/A7** | C# E G A C E | `[0, +1, +2, +5, -5, -3]` | `P-90` |  |

### Dominant / 7th

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **E7** | B D E G# B E | `[0, 0, +1, +2, +5, -5]` | `P-90` |  |
| **E13** | D E G# B C# E | `[0, +2, +4, -6, -5, -2]` | `P-90` |  |
| **E9 lap** | D E F# G# B E | `[0, 0, +1, +4, -5, -2]` | `P-90` |  |

### Other

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **B11** | B D# F# A C# E | `[0, +2, +2, +4, -6, -5]` | `P-90` |  |
| **Cyrus Hybrid** | G B D F# A D | `[-2, -2, -1, 0, +2, +3]` | `335` |  |

## Open Majors

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **Open E** | E B E G# B E | `[0, 0, +1, +2, +2, 0]` | `LP` |  |
| **Open D** | D A D F# A D | `[-2, -2, -1, 0, 0, -2]` | `MA28` |  |
| **Open G Dobro** | G B D G B D | `[-2, 0, 0, 0, +2, +3]` | `RESO` |  |
| **Open G low** | D G D G B D | `[-2, 0, 0, 0, -2, -2]` | `GB SML` |  |
| **Open A high** | A C# E A C# E | `[0, +2, +2, +2, +4, +5]` | `GB SML` |  |

## Drop

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **Drop D** | D A D G B E | `[0, 0, 0, 0, 0, -2]` | `LP` |  |
| **Drop Db** | Db Ab Db Gb Bb Eb | `[-1, -1, -1, -1, -1, -3]` | `BRIGHT HUM` |  |
| **Drop C** | C G C F A D | `[-2, -2, -2, -2, -2, -4]` | `BRIGHT HUM` |  |
| **Drop B** | B Gb B E Ab Db | `[-3, -3, -3, -3, -3, -5]` | `BRIGHT HUM` |  |
| **Drop Bb** | Bb F Bb Eb G C | `[-4, -4, -4, -4, -4, -6]` | `BRIGHT HUM` |  |
| **Drop A** | A E A D F# B | `[-5, -5, -5, -5, -5, -7]` | `BRIGHT HUM` |  |

## Artists

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **Fripp NST** | C G D A E G | `[+3, +5, +2, 0, -2, -4]` | `LP` | Robert Fripp’s New Standard Tuning (all fifths) · King Crimson “Frame by Frame” (Discipline, 1981) |
| **Gambale** | A D G C E A | `[-7, -7, +5, +5, +5, +5]` | `335` | Frank Gambale · fourths tuning |
| **Rain Song** | D G C G C D | `[-2, +1, 0, -2, -2, -2]` | `LIPS` | Led Zeppelin · “The Rain Song” (Jimmy Page) |
| **Ostrich** | G A B D E G | `[-9, -7, -5, -3, 0, +3]` | `P-90` | Sonic Youth · Ostrich tuning |
| **Schizophrenia** | F# F# G G A A | `[+5, -2, 0, +5, -3, +2]` | `MOD-ST` | Sonic Youth · “Schizophrenia” (Thurston Moore) |
| **Nick Drake** | C G C F C E | `[0, +1, -2, -2, -2, -4]` | `TRP-0` | Nick Drake · “Pink Moon” (Open C) |
| **Keith Richards** | G G D G B D | `[-2, 0, 0, 0, -2, +3]` | `TE` | Rolling Stones · “Start Me Up” (5-string Open G) |
| **Am. Football** | F A C G C E | `[0, +1, 0, -2, 0, +1]` | `TE` | American Football · “Never Meant” (Fmaj9) |
| **Soundgarden** | E E B B B B | `[-5, 0, +4, -3, -5, 0]` | `BRIGHT HUM` | Soundgarden · “The Day I Tried to Live” |
| **Joni Mitchell** | E B E G# B E | `[0, 0, +1, +2, +2, 0]` | `MA28` | Joni Mitchell · “Big Yellow Taxi” (Open E) |
| **Both Sides** | D A D F# A D | `[-2, -2, -1, 0, 0, -2]` | `MA28` | Joni Mitchell — Open D, no capo. Recording uses capo 4 (sounds in F# major); this is the no-capo base tuning. |
| **Pyramid Song** | F# A# C# F# A# F# | `[+2, -1, -1, -1, +1, +2]` | `L4` | Radiohead — Open F# major. Let the top F# ring as a pedal; barre strings 6-2 for Gmaj7 (fret 1) and A6 (fret 3). |
| **Radiohead** | C G C G G# C | `[-4, -3, 0, -2, -2, -4]` | `RICK` | Radiohead — "Everything In Its Right Place" voicing — open strings C G C G G# C with a C pedal on the top string. Pedal A pushes the neutral G string (3) up 5 semitones (a fourth) to a second C. |

## Modes

One white-key tuning, seven parallel modes rooted on C (bright → dark).

| Tuning | Notes (low→high) | Offsets (str 1→6) | Model | Reference |
|---|---|---|---|---|
| **White Keys** | C D E F G A | `[-7, -4, -2, +2, +5, +8]` | `CLA-ST` | Base — the natural-note set the modes are drawn from |
| **C Lydian** | C D E F# G A | `[-7, -4, -1, +2, +5, +8]` | `CLA-ST` | 7th degree: B (maj7) |
| **C Ionian** | C D E F G A | `[-7, -4, -2, +2, +5, +8]` | `CLA-ST` | 7th degree: B (maj7) |
| **C Mixolydian** | C D E F G A | `[-7, -4, -2, +2, +5, +8]` | `CLA-ST` | 7th degree: B♭ (♭7) |
| **C Dorian** | C D Eb F G A | `[-7, -4, -2, +1, +5, +8]` | `CLA-ST` | 7th degree: B♭ (♭7) |
| **C Aeolian** | C D Eb F G Ab | `[-8, -4, -2, +1, +5, +8]` | `CLA-ST` | 7th degree: B♭ (♭7) |
| **C Phrygian** | C Db Eb F G Ab | `[-8, -4, -2, +1, +4, +8]` | `CLA-ST` | 7th degree: B♭ (♭7) |
| **C Locrian** | C Db Eb F Gb Ab | `[-8, -5, -2, +1, +4, +8]` | `CLA-ST` | 7th degree: B♭ (♭7) |

## Ethnic instruments

Maps an instrument's pitches onto a cluster of strings.

| Instrument | Notes | Model | Reference |
|---|---|---|---|
| **Mandolin** | G D A E | `GB SML` | Traditional Irish / Bluegrass |
| **Irish Bouzouki** | G D A D | `GB SML` | Irish Traditional Music |
| **Greek Bouzouki** | C F A D | `GB SML` | Rebetiko · Trichordo |
| **Oud** | C F A D G C | `NYLON` | Middle-Eastern Taqsim |
| **Charango** | G C E A E | `NYLON` | Andean Folk Music |
| **Saz / Bağlama** | B E A | `NYLON` | Turkish Folk · short neck |
| **Cavaquinho** | D G B D | `GB SML` | Samba & Choro |
| **Ukulele** | G C E A | `NYLON` | Soprano · reentrant tuning |
| **Baritone Uke** | D G B E | `NYLON` | Tuned like a guitar’s top four |
| **Cuatro** | A D F# B | `NYLON` | Venezuelan Joropo · reentrant |
| **Balalaika** | E E A | `NYLON` | Russian Folk Tunes |
| **Banjo** | D G B D G | `BANJO` | 5-string · open G |

## Pedal Steel

10-string pedal-steel copedents; pick 6 of the 10 strings in the app.

| Tuning | Spelling (low→high) | Model | Notes |
|---|---|---|---|
| **E9 Nashville** | B D E F# G# B E G# D# F# | `TE` | country · session sound |
| **E9 Lanois** | B B E E G# B E G# D# F# | `335` | ambient variant · doubled low strings for 12-string shimmer |
| **C6 Swing/Jazz** | C F A C E G A C E D | `L4` | western swing · jazz |
| **B6 Universal** | B D D F# G# B D G# D# F# | `335` | 6th-flavored hybrid |


---

_62 tunings in total. Generated from `vg800-tuner.html`._
