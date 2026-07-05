# VG800 MIDI Control — retune your Boss VG-800 from the browser

Pick an alternate tuning and all six strings of your **Boss VG-800** retune instantly over MIDI — no menu-diving. It also does pedal-steel **bends**, ethnic-instrument voicings and stereo **auto-panning**, all from a single self-contained HTML page (no build step, no dependencies) that talks to the pedal through the **Web MIDI API**.

**▶ Live app: https://fxcircus.github.io/boss-vg800-midi-control-from-browser/**
Open in **Chrome or Edge**, allow MIDI, and pick your interface. (GitHub Pages serves over HTTPS, so Web MIDI works.)

☕ Like it? [Buy me a coffee](https://buymeacoffee.com/fxcircus).

![The app](screenshots/app.png)

---

## Quick start

1. Open the [live app](https://fxcircus.github.io/boss-vg800-midi-control-from-browser/) in **Chrome or Edge** (Safari & Firefox don't support Web MIDI) and allow MIDI access when asked.
2. Open **⚙ Settings → MIDI Output**, pick your interface's output port and set **Channel** to match the VG-800 (factory default **1**). The dot on the ⚙ button glows **green** once a port is live.
3. Click any **tuning card** — all six strings retune at once.
4. First time connecting the hardware? Do the [one-time VG-800 setup](#one-time-vg-800-setup) below so the pedal actually responds.

---

## How it works

Each of the six strings is driven by its own MIDI **CC number**. The app converts a per-string semitone offset (−12 … +12) into a CC value (0 … 127) and sends it on the VG-800's receive channel. On the VG-800, each CC is assigned to a **STR BEND → BEND DEPTH** parameter with a range of −12 … +12 semitones, so the CC value maps linearly onto the string's pitch shift.

- Offset `0` → CC `64` → 0 semitones
- Offset `−12` → CC `0` → one octave down
- Offset `+12` → CC `127` → one octave up

Panning works the same way, driving **STRING(A) · PAN 1–6** (default CC# 71–76, MIN `L50` / MAX `R50`).

---

## One-time VG-800 setup

Configure the pedal once so it listens to the app.

### 1. Turn on String Bend and set Bend Control to 100

In **INST → STR BEND** (Bend Control tab):

![String Bend enabled](screenshots/str_bend_setup.png)

- **STR BEND SW = ON**
- **BEND CONTROL = 100**

This is essential — the VG-800 only applies **BEND DEPTH** when **BEND CONTROL = 100**. At 0 (its normal default) the depth values are ignored and nothing changes, no matter what the app sends. The **BEND DEPTH** knobs are the per-string pitch shifts (DEPTH 1 = high E … DEPTH 6 = low E; DEPTH 7 is unused on a 6-string) — these are what the app drives over MIDI.

### 2. Map each string's BEND DEPTH to a CC number

Under **CONTROL/ASSIGN → ASSIGN**, create one assign per string:

![Individual assign example](screenshots/mapping_individual_string_example.png)

Every assign uses the same pattern:

- **TARGET CATEGORY** = `INST:STR BEND(A)`
- **TARGET PARAMETER** = `DEPTH n` (the string)
- **TARGET MIN** = `−12`, **TARGET MAX** = `+12`
- **MODE** = `MOMENT`
- **SOURCE** = the CC number for that string

Repeat for all six strings:

![Full assign mapping](screenshots/mapping_page.png)

| ASSIGN | TARGET (INST:STR BEND(A)) | String | SOURCE | MIN | MAX | MODE |
|:------:|:--------------------------|:-------|:-------|:---:|:---:|:-----|
| 1 | DEPTH 1 | high E (1st) | `CC# 30` | −12 | +12 | MOMENT |
| 2 | DEPTH 2 | B (2nd)     | `CC# 31` | −12 | +12 | MOMENT |
| 3 | DEPTH 3 | G (3rd)     | `CC# 64` | −12 | +12 | MOMENT |
| 4 | DEPTH 4 | D (4th)     | `CC# 65` | −12 | +12 | MOMENT |
| 5 | DEPTH 5 | A (5th)     | `CC# 66` | −12 | +12 | MOMENT |
| 6 | DEPTH 6 | low E (6th) | `CC# 68` | −12 | +12 | MOMENT |

Notes:

- **DEPTH 1 is the high E string**, DEPTH 6 the low E — the app already sends in this order.
- **MODE must be `MOMENT`, not `TOGGLE`** so the incoming CC tracks continuously across the −12 … +12 range instead of snapping to the extremes.
- The VG-800 exposes only **CC# 0–31 and 64+** as assign sources (32–63 aren't selectable) and may not track 64–95 continuously — prefer CC# **1–31**.
- Set **MIDI → RX CHANNEL** to match the app's channel. These CC numbers are the app's defaults, so out of the box they already line up (see **⚙ Settings → CC numbers**).

---

## Features

- **Tuning cards** — click to retune all six strings. Families: **Common** (Standard, DADGAD, Nashville, Baritone), **Open Majors**, **Drop**, and an **Artists** set (Fripp NST, Gambale, Page's Rain Song, Sonic Youth, Nick Drake, Keith Richards, American Football, Soundgarden, Joni Mitchell). Each card shows its note names and per-string ± offset.
- **Ethnic** — mandolin, Irish/Greek bouzouki, oud, charango, saz/bağlama, cavaquinho, balalaika, 5-string banjo. Each maps the instrument's pitches onto a chosen cluster of strings (pick the placement with the string-dot buttons). A **capo hint** says where to physically capo, since the VG-800 only bends ±12 semitones.
- **Pedal Steel** — load a real steel tuning (**E9 Nashville**, **C6 Swing/Jazz**, **B6 Universal**) and choose which contiguous **6 of the 10** strings map onto the guitar; the **Bends** section reconfigures to that tuning's copedent.
- **Bends** — hold the on-screen **Pedal A / B** and knee levers **LKL / LKR** (or keys <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> <kbd>F</kbd>) to bend the root / 3rd / 5th of the current tuning, pedal-steel style. They stack, the icons animate as they move, and any bend beyond ±12 greys out. **Combos** (A+B…) engage a whole grip at once. **Latch** toggles instead of holding; **Key Mapping** lets you rebind any control to a key.
- **Panning & auto-pan** — manual stereo modes (Center, Equal Spread, Split, Zig-Zag, Pairs…) glide each string to its new position; the **Pan glide** toggle sets the sweep time (Instant → Long). **Auto-pan** gives each string its own pan LFO with character presets (**Rotate, Leslie, Fan Breathe, Ping-Pong, Drift**), Width, Shape, Phase spread, and Free-rate or Tempo-synced timing.
- **Current Tuning readout** — an always-on panel combining pitch and pan for all six strings: a **pan strip** up top over a **pitch neck** where each note slides flat↔sharp from standard. Updates and animates live from the current tuning, bends and panning (parks in the left sidebar on wide screens).
- **Themes & display** — the pedal button (top-right) opens the theme picker: **CS3, DS1, RC500, DD500, GT1000**, each styled after a Boss pedal. **Compact mode** hides note/offset text on cards to fit more on screen.
- **⚙ Settings** — MIDI Output (port + channel), CC numbers (per-string pitch + pan), and **Bend effect** (a scoop articulation that swells into each new tuning).
- **+ Custom tuning** — dial each string ±12 from standard, name it and save it.

![The Bends section](screenshots/bends.png)

---

## Run it locally

Web MIDI needs a **secure context**, so serve over `http://localhost` — opening the file as a `file://` path fails with "MIDI access denied."

```bash
git clone https://github.com/fxcircus/boss-vg800-midi-control-from-browser.git
cd boss-vg800-midi-control-from-browser
python3 -m http.server 8765
```

Then open **http://localhost:8765/vg800-tuner.html** in **Chrome or Edge**, allow MIDI when prompted, and pick your interface's MIDI output.

> Tip: to stop Chrome re-asking for MIDI permission, open the site-info menu (icon left of the address bar) → **MIDI devices → Allow**. Permission is remembered per origin.

---

## Troubleshooting

- **Nothing changes?** Check the **green dot** on ⚙ (MIDI connected), that **BEND CONTROL = 100** on the VG-800, and that the app's CC numbers match your assigns.
- **Wrong strings move?** Confirm the DEPTH → CC mapping order (DEPTH 1 = high E) and that MODE is `MOMENT`.
- **No sound / no MIDI?** Use Chrome or Edge over HTTPS or `localhost`, and select the correct output port in Settings.

---

## Browser support

Requires the **Web MIDI API**: Chrome, Edge and other Chromium browsers. Not supported in Safari or Firefox.
