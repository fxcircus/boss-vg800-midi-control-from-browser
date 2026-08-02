# Fretboard Visualizer × VG-800: integration plan

Goal: a fretboard button in the VG-800 header (left of the theme/pedal button)
that opens the guitar-fretboard-visualizer in a modal. Theme inherited from the
host, board settings ported, tuning synced both ways with the host's cards.

## The two apps, as surveyed

| | VG-800 (host) | Visualizer (guest) |
|---|---|---|
| Stack | one 3,881-line vanilla HTML file, no build step | React 19 + styled-components 6, Vite |
| Serving | GH Pages via Actions artifact, `/boss-vg800-midi-control-from-browser/` | GH Pages via gh-pages branch, `/guitar-fretboard-visualizer/` |
| Offline | PWA: `sw.js` cache `vg800-v1`, SHELL precache list, stale-while-revalidate | no service worker |
| Theme | 5 themes as CSS vars on `html[data-theme]` (`dd500` default/light, `dark`, `cs3`, `rc500`, `ds1`) | 2 styled-components themes (`dark`/`light`) |
| Tuning identity | display NAME string in global `active`; six offsets-from-standard, high-E first | catalog id; absolute MIDI, low-string first |
| Audio | none (zero Web Audio today) | EKS string bank in an AudioWorklet + amp bus |

Both deploy to the **same origin** (fxcircus.github.io), different subpaths.

## Architecture decision: same-document ESM bundle (not iframe, not vendoring)

Ship the visualizer as a **prebuilt ES module** committed into this repo
(`fretboard/fretboard-embed.es.js`, ~100 KB gzip, React + styled-components
bundled in), loaded lazily with `import()` the first time the modal opens, and
mounted into a standard `.scrim/.sheet` modal.

Why not an iframe of the deployed visualizer: it dies offline (this app's SW
scope can't cache another subpath and the visualizer has no SW of its own —
the feature would fail exactly when the PWA is used as intended), and theme
inheritance would be limited to dark/light. Why not vendoring source: it adds
a build pipeline to a deliberately build-less repo and forks an active app.

The ESM artifact keeps this repo build-less (one committed file), is
SHELL-precachable for offline, and gives a real props/callbacks API.

## Work in the visualizer repo (make it embeddable)

1. **Embed entry** `src/embed.tsx` exporting:
   ```ts
   mountFretboard(el: HTMLElement, opts: {
     theme: EmbedTheme | 'dark' | 'light',
     tuningId?: string,
     onTuningChange?: (id: string) => void,
   }): {
     setTuning(id: string): void
     setCustomTuning(midiLowFirst: number[]): void   // for host tunings with no catalog id
     setTheme(t: EmbedTheme | 'dark' | 'light'): void
     stopAudio(): void
     unmount(): void
     version: string
   }
   ```
2. **`embedded` mode in App.tsx** (single flag, standalone path untouched):
   - suppress `GlobalStyle`'s body/button restyling → scoped wrapper div
     (today mounting would repaint the host page body and change global
     box-sizing — first thing to gate)
   - suppress ALL URL-hash coupling (`saveState` rewrites `location.hash` on
     every state change; `loadState` reads the host hash at boot; `watchHash`
     listener) — embedded state is prop-driven + internal only
   - hide the standalone header (title, theme button — theme comes from the
     host). Keep the speaker (sound) and gear (board settings) popovers inside
     the modal; keep everything else as-is
   - popover/TuningPicker Escape handlers get `stopPropagation` when embedded
     (host closes all modals on any Escape — today it would double-close)
3. **Worklet delivery**: `new URL('./steel-processor.js', import.meta.url)`
   bakes in the `/guitar-fretboard-visualizer/` base → silently 404s from the
   host path (falls back to oscillator, quiet breakage). And Chromium worklet
   fetches bypass service workers, so a file can't be made offline-safe anyway.
   Fix: embed entry imports the worklet source with `?raw` and feeds
   `audioWorklet.addModule(URL.createObjectURL(new Blob([src])))`;
   `createSteelGraph` gains an optional worklet-URL parameter.
4. **Library build** `vite.config.embed.ts` — lib mode, ES format only (UMD
   breaks `import.meta`), no base path, everything bundled. `npm run
   build:embed` + a tiny sync script that copies the artifact into
   `../vg800_midi_control/fretboard/`. Version constant exported and logged.
5. **Storage scoping**: share `gfv.board.v1` deliberately (same origin — board
   prefs follow the user between standalone and embedded); embedded does NOT
   read/write `gfv.state.v1` (tuning is host-driven); volume/autoplay/tone
   keys shared (harmless, arguably nice).

## Work in this repo (host shell + bridge)

1. **Header button** `#fretBtn` inserted between `#coffeeBtn` and
   `.theme-wrap` (i.e. immediately left of the theme button), class
   `about-btn`, with a small fretboard icon (vertical strings + bar glyph —
   NOT the `#pedalIco` pedal, which already means "theme" one button over).
2. **Modal**: `.scrim#fretModal` + wide sheet (`min(960px, 95vw)`, the
   timelineModal variant). Must be appended to BOTH hardcoded modal-id arrays
   at ~lines 3712–3713 (backdrop-close + Escape-close) or it silently loses
   those behaviors. `.scrim.open` already mutes the host's pedal/chord
   keyboard shortcuts for free.
3. **Lifecycle**: lazy `import('./fretboard/fretboard-embed.es.js')` on first
   open; mount ONCE and keep mounted-but-hidden afterwards (browsers cap
   concurrent AudioContexts at ~4–6; also instant reopen). `stopAudio()` on
   close. The opening click is the user gesture that unlocks audio.
4. **Theme bridge**: build the guest theme from the host's computed CSS vars
   (`--wood`→card, `--ink`→background, `--bone`/`--bone-dim`→text,
   `--brass`→primary, `--edge`→border, fonts `--sans`/`--mono`), light/dark
   base picked per theme (dd500 light, ds1 light-ish, rest dark). `applyTheme`
   dispatches no event → patch it (or observe `html[data-theme]`) and call
   `controller.setTheme()` so an open modal re-themes live. Board wood
   finishes are theme-independent and untouched.
5. **Tuning bridge** (the "talk to each other" part):
   - **Host → modal**: patch the single funnel `tuningSend()` (line ~1984 —
     every card path goes through it with `active` already set) to dispatch a
     CustomEvent. Bridge maps name→id via an explicit 66-entry table
     (4 non-slug ids: `e9-lap`, `open-g-dobro`, `open-g-low`, `open-a-high`;
     pedal steels use `ps-*` ids). Mappable → `setTuning(id)`. Not mappable
     (user customs, re-rooted Modes like "D Dorian", Transpose TEST) →
     `setCustomTuning(reverse(STD_MIDI[i] + offsets[i]))` so the board always
     shows what the guitar is actually tuned to. Chord taps → ignored.
   - **Modal → host**: `onTuningChange(id)` → map id→name → call the host's
     `apply(t)` (sets `active`, re-renders cards, sends MIDI). The host's own
     values are what go to the hardware (for the 2 known value divergences —
     the host stays MIDI source of truth; Young Cinnamon has since been
     corrected to double drop D on the host side, leaving B6 Universal as
     the one remaining divergence).
     Visualizer-only `b11-tk-smith`: modal-local, no host action.
   - **Echo guard**: a `syncing` flag around both programmatic directions
     (duplicate offsets are common — Drop D ≡ Blur Song2 ≡ SoundG Sun — so
     name/id comparison alone can't break loops).
   - **On open**: host's live `active` wins over anything the modal remembers.
   - Octave note: 13 host tunings match the catalog by pitch class only (host
     is a 6-string guitar; the catalog draws canonical instruments — lap
     steels, Charango, pedal steels in their real octaves). The catalog id
     wins for display; audio may sit an octave from the guitar. Accepted.
6. **Service worker**: add `fretboard/fretboard-embed.es.js` to the SHELL
   precache list AND bump `CACHE` (`vg800-v1` → `v2`) in the same commit —
   without the bump the new asset is never precached and returning users can
   get new HTML with a missing bundle offline. (Worklet needs no SW entry —
   it ships inside the bundle as a Blob.)
7. **Mobile**: header buttons shrink at ≤560 px and wrap onto two rows —
   verify the extra button at 360 px width; sheet goes full-width there.

## Test/verify checklist

- Standalone visualizer unchanged: 103 tests, build, live smoke.
- Embed: all 5 host themes (incl. live switch with modal open), both sync
  directions incl. customs/modes/transpose, Escape layering (picker open →
  Esc closes picker only), backdrop close, audio after reopen ×10 (single
  AudioContext), offline: airplane-mode reload → modal still opens and plays.
- The host's `tests/*.mjs` extract functions from the inline script by name —
  the `tuningSend` patch must not rename or duplicate declarations.

## Known limitations (reviewed and accepted)

These match the app's existing stale-while-revalidate update model rather
than fight it:

- Right after a deploy, a returning user's first launch runs the NEW HTML
  under the OLD service worker (whose cache predates the bundle); the first
  modal open then fetches the bundle from the network. Offline in exactly
  that window, the modal shows its load-error message; the next fully
  restarted launch precaches it. A failed load can be retried (the bridge
  cache-busts the module specifier, since failed dynamic imports are cached
  by the document).
- The SHELL precache is non-atomic by design (`cache.add(...).catch(noop)`),
  so a bundle fetch that fails during SW install is healed lazily by the
  runtime cache on first successful open, not by the install.
- After future bundle updates, an open may serve the previous cached bundle
  once (stale-while-revalidate), self-healing on the next open.

## Explicitly out of scope (for now)

- Pedal/copedent UI (lib/copedents.ts stays parked in the visualizer).
- Persisting the host's current tuning (it always boots Standard today;
  unchanged).
- npm publishing; the committed-artifact flow is versioned by an exported
  version string until the repos ever merge.
