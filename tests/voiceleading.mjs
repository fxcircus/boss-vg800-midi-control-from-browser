// Regression harness for the Voiced-cluster chord engine (voice-leading-plan.md).
// Extracts the REAL engine functions from vg800-tuner.html (no copy — can't drift) and
// asserts the invariants across every cluster × key × quality × feel.
//   run:  node tests/voiceleading.mjs   (exit 0 = pass)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, '..', 'vg800-tuner.html'), 'utf8');
const src = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

// Pull a `const NAME=…;` or `function NAME(…){…}` out of the source by brace/bracket matching.
// (Safe here: none of the target declarations contain braces inside string literals or comments.)
function grab(sig) {
  const i = src.indexOf(sig);
  if (i < 0) throw new Error('declaration not found: ' + sig);
  if (sig.startsWith('const')) {
    let d = 0;
    for (let j = i; j < src.length; j++) {
      const c = src[j];
      if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--; else if (c === ';' && d === 0) return src.slice(i, j + 1);
    }
  } else {
    let j = src.indexOf('{', i), d = 0;
    for (; j < src.length; j++) { const c = src[j]; if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return src.slice(i, j + 1); } }
  }
  throw new Error('unterminated: ' + sig);
}

const DECLS = [
  'const CHORD_STR_LO=', 'const VOICE_STD=',
  'function voiceChord(', 'function reachPitch(', 'function permsUniq(',
  'function solveCluster(', 'function clusterTargetPcs(', 'function clusterIdx(', 'function voiceChordVoiced(',
];
const engineSrc = DECLS.map(grab).join('\n\n');

// Build a sandbox exposing the engine + control over its `settings`/`lastVoiced` globals.
const api = new Function(`
  let settings = { voicing:'voiced', voiceSize:3, voiceStart:0, voiceFeel:'grip' };
  let lastVoiced = null;
  ${engineSrc}
  return {
    voice: (r,f) => voiceChordVoiced(r,f),
    set: (k,v) => { settings[k]=v; },
    resetLegato: () => { lastVoiced = null; },
  };
`)();

const STD = [64,59,55,50,45,40];
const QUAL = { maj:[0,4,7], min:[0,3,7], dim:[0,3,6], aug:[0,4,8], sus2:[0,2,7], sus4:[0,5,7],
  sev:[0,4,7,10], min7:[0,3,7,10], maj7:[0,4,7,11], dim7:[0,3,6,9], m7b5:[0,3,6,10], add9:[0,4,7,14], '6':[0,4,7,9], m6:[0,3,7,9] };

let cases = 0, fails = 0;
const fail = (msg) => { fails++; if (fails <= 20) console.error('  ✗ ' + msg); };

for (const feel of ['grip', 'legato']) {
  api.set('voiceFeel', feel);
  for (let size = 3; size <= 4; size++) {
    api.set('voiceSize', size);
    for (let start = 0; start <= 6 - size; start++) {
      api.set('voiceStart', start);
      const cluster = Array.from({ length: size }, (_, i) => start + i);
      const ascIdx = cluster.slice().sort((a, b) => STD[a] - STD[b]);
      for (let root = 0; root < 12; root++) {
        for (const [q, f] of Object.entries(QUAL)) {
          api.resetLegato();
          const off = api.voice(root, f);
          cases++;
          const tag = `${feel} size${size} start${start} root${root} ${q}`;
          if (!Array.isArray(off) || off.length !== 6) { fail('bad array ' + tag); continue; }
          // 1. every string within ±12
          if (off.some(o => o < -12 || o > 12)) { fail('out of range ' + tag + ' ' + off); continue; }
          // 2. every string is a chord tone
          const chordPcs = new Set(f.map(iv => (root + iv) % 12));
          const sounded = off.map((o, i) => (((STD[i] + o) % 12) + 12) % 12);
          if (sounded.some(pc => !chordPcs.has(pc))) { fail('non-chord tone ' + tag); continue; }
          // 3. cluster strictly ascending (no voice crossing)
          const clP = ascIdx.map(i => STD[i] + off[i]);
          for (let k = 1; k < clP.length; k++) if (clP[k] <= clP[k - 1]) { fail('voice crossing ' + tag); break; }
          // 4. altered 5th (♭5/♯5) must be present when the chord has one
          for (const alt of [6, 8]) {
            if (f.some(iv => iv % 12 === alt) && !sounded.includes((root + alt) % 12)) fail('dropped altered 5th ' + tag);
          }
          // 5. triad on a 3-cluster: all three triad tones present in the cluster
          if (f.length === 3 && size === 3) {
            const clPcs = new Set(cluster.map(i => (((STD[i] + off[i]) % 12) + 12) % 12));
            if ([...chordPcs].some(pc => !clPcs.has(pc))) fail('incomplete triad in cluster ' + tag);
          }
        }
      }
    }
  }
}

// 6. determinism: dim7 (symmetric) must voice identically across taps in Grip
api.set('voiceFeel', 'grip'); api.set('voiceSize', 3); api.set('voiceStart', 0);
api.resetLegato(); const d1 = api.voice(0, QUAL.dim7);
api.resetLegato(); const d2 = api.voice(0, QUAL.dim7);
if (JSON.stringify(d1) !== JSON.stringify(d2)) fail('dim7 not deterministic');

// 7. Spread mode passthrough: voicing='spread' returns the stock voiceChord result
api.set('voicing', 'spread');
const stock = new Function(`${grab('const CHORD_STR_LO=')}\n${grab('function voiceChord(')}\nreturn voiceChord;`)();
for (let root = 0; root < 12; root++) for (const f of Object.values(QUAL)) {
  cases++;
  if (JSON.stringify(api.voice(root, f)) !== JSON.stringify(stock(root, f))) fail('spread passthrough root' + root);
}
api.set('voicing', 'voiced');

console.log(`voiceleading harness: ${cases} cases, ${fails} failures`);
if (fails) { console.error('FAIL'); process.exit(1); }
console.log('PASS ✅');
