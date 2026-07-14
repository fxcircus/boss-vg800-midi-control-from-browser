# VG-800 — MIDI Automation Ideas

Candidates for animating VG-800 parameters over MIDI (Control Change), driven by the
browser app. Grounded in the VG-800 Parameter Guide (ASSIGN TARGET list, pp. 54–64;
SOURCE / MODE, pp. 39–41).

## Framing

- The VG-800's superpower is the **divided pickup** — it addresses each of the 6 strings
  independently. That's where the genuinely *original* automations live (impossible on a
  normal guitar rig). FX sweeps are cool but conventional.
- **Slot budget:** 16 ASSIGN slots total. Tuning uses **6** (STR BEND DEPTH 1–6) → ~10 free.
  Each *per-string* layer costs **6** slots; each *global* effect costs **1**.
  Realistic ceiling: one more per-string layer + a handful of single-slot FX.
- Each animated parameter needs: one ASSIGN slot, a SOURCE = external MIDI CC#, and the
  app streaming that CC. The **glide** feature is the first modulation primitive.

## Tier 1 — Per-string (the originals, 6 slots each)

1. **Per-string auto-pan — "spin the chord around the room"**
   Target: `INST:STRING(A) → STRING PAN 1…6` (p.58).
   Each string gets its own pan LFO with staggered phase → kaleidoscopic stereo swirl;
   or static low→high fan like a grand piano. Top pick for wow-factor.

2. **Per-string arpeggiator / reveal**
   Target: `INST:STRING(A) → STRING LEVEL 1…6` (p.58).
   Sequence levels so a *held* chord assembles note-by-note (auto-strum/arp), per-string
   tremolo with phase offsets (rippling shimmer), or rhythmic per-string gating.

3. **Per-string detune shimmer**
   Target: `INST:ALT TUNE(A) → FINE 1…6`, ±50 = ±1 semitone (p.4 / 54).
   Slowly drift each string's fine-tune → living 12-string chorus, natural beating, or
   morph in/out of a Nashville/honky-tonk spread. No chorus block used.

- **Bonus (0 extra slots): tuning *morph.*** Reuse the 6 STR BEND DEPTH assigns and drive
  them with glide/sequencer so one chord voicing liquifies into another as a gesture.

## Tier 2 — Whole-instrument morph (1 slot, huge payoff)

4. **A/B model crossfade.** Target: `MIXER → A/B BALANCE` (or `BALANCER 1/2 A/B`,
   `DUAL GUITAR A/B`, p.64 / 55). The VG runs two INST models at once — one CC morphs
   **electric ↔ acoustic ↔ synth ↔ 12-string**. Slow morph or rhythmic stutter. Best
   bang-per-slot on the unit.

## Tier 3 — Global FX motion (1 slot each; classic but great when LFO/tempo-synced)

- **Delay TIME warp** — `DELAY1 TIME` (p.64): sweep live for tape-warble / dive-bomb echoes.
- **Talkbox vowel morph** — `FX:HUMANIZER VOWEL1/VOWEL2` (p.62): animate ah→ee→oo.
- **Harmony / pitch interval moves** — `FX:HARMONIST HR1:HARMONY` / `FX:PITCH SHIFTER PS1:PITCH` (p.62).
- **GR-300 / synth filter sweep** — `INST:SYN:GR-300 CUTOFF/RESONANCE/SWEEP` (p.57) or
  `FX:AUTO WAH FREQUENCY` (p.61): vintage synth-guitar fades.
- **Rotary ramp** — `FX:ROTARY SPEED SELECT` (p.63): Leslie spin-up/down.
- **Ring-mod sweep** — `FX:RING MOD FREQUENCY` (p.62): metallic, alien.
- **Slicer / Isolator gate** — `FX:SLICER RATE / PATTERN` (p.63): tempo-synced chopping.

## Two engines to drive them

- **App-side (to build):** a modulation section — LFO lanes (sine/tri/saw/square + rate +
  depth + per-string phase), one-shot envelopes, a step sequencer, tempo/BPM sync. Each
  lane streams a CC to one ASSIGN source. The glide feature is the first primitive.
- **VG-800-internal (no computer):** an ASSIGN's SOURCE can be **WAVE PEDAL** — a built-in
  SINE/TRI/SAW LFO with its own rate *per assign* (pp.39–41) — or **STRING 1–6 input level**,
  a *per-string envelope follower* (pick harder → that string reacts). Free, standalone,
  expressive. Good for offloading steady LFOs so the browser only handles intentional gestures.

## Recommended next build

Prototype **per-string auto-pan** (Tier 1 #1) — most jaw-dropping, and building it forces the
app to grow real LFO lanes reusable for everything else. Pair with the **1-slot A/B model
morph** as a cheap second demo.
Budget: 6 (tuning) + 6 (pan) + 1 (morph) = **13 slots, 3 to spare**.

Open questions:
- LFOs free-running or tempo-synced to a set BPM?
- Which per-string layer first: pan or arp?
