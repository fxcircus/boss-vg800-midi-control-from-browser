// Regression harness for the Real Bend engine (ALT TUNE base ±24 + BEND DEPTH ±12 + BEND CONTROL sweep).
// Extracts the REAL engine functions from vg800-tuner.html (no copy — can't drift) and asserts:
//   1. the two semitone→CC scalings (±12 bend depth vs ±24 alt-tune pitch),
//   2. rbApply message sequencing (depths land before the control sweep; release parks depths at 0),
//   3. sendBase (control zeroed first, ALT TUNE CCs 71–76, ±24 scaling, Ethnic octave lift).
//   run:  node tests/realbend.mjs   (exit 0 = pass)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, '..', 'vg800-tuner.html'), 'utf8');
const src = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

function grab(sig) {                       // pull `function NAME(…){…}` or a `let/const NAME=…;` statement by brace matching
  const i = src.indexOf(sig);
  if (i < 0) throw new Error('declaration not found: ' + sig);
  if (sig.startsWith('function')) {
    let j = src.indexOf('{', i), d = 0;
    for (; j < src.length; j++) { const c = src[j]; if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return src.slice(i, j + 1); } }
  } else {
    let d = 0;
    for (let j = i; j < src.length; j++) {
      const c = src[j];
      if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--; else if (c === ';' && d === 0) return src.slice(i, j + 1);
    }
  }
  throw new Error('unterminated: ' + sig);
}

const DECLS = [
  'function toCC(', 'function toAltCC(',
  'let rbCtl=0',
  'function rbCC(', 'function rbSendDepths(', 'function rbRamp(', 'function rbApply(', 'function rbReset(',
  'function altLift(', 'function sendBase(',
];
const engineSrc = DECLS.map(grab).join('\n\n');

// Sandbox: real functions + stubbed MIDI/app globals. setInterval/setTimeout run synchronously so sweeps complete inline.
const api = new Function(`
  const sent = [];                                             // every [status, cc, value] in send order
  let settings = { realBend:true, channel:1, rbMs:300, gap:0,
                   ccs:[30,31,64,65,66,68], altCCs:[71,72,73,74,75,76], bendCC:69, levelCC:70 };
  let midiOut = { send: m => sent.push([...m]) };
  let baseOffsets = [0,0,0,0,0,0];
  let octave = false;
  const instFxOn = () => ({ doubler:false, octave });
  const setInterval = fn => { for (let k = 0; k < 10000; k++) { let done = false; const ci = () => { done = true; }; _ci = ci; fn(); if (done) break; } return 1; };
  let _ci = null;
  const clearInterval = () => { if (_ci) _ci(); };
  const setTimeout = (fn) => { fn(); return 1; };
  const clearTimeout = () => {};
  ${engineSrc}
  return {
    toCC, toAltCC,
    apply: b => rbApply(b),
    base: o => { sendBase(o); },
    setBase: o => { baseOffsets = o.slice(); },
    setOctave: v => { octave = v; },
    set: (k,v) => { settings[k]=v; },
    log: () => sent.splice(0),
    ctl: () => rbCtl,
  };
`)();

let fails = 0, cases = 0;
const eq = (got, want, label) => { cases++; const g = JSON.stringify(got), w = JSON.stringify(want); if (g !== w) { fails++; console.error(`FAIL ${label}\n  got  ${g}\n  want ${w}`); } };

/* 1 ── the two scalings */
eq([-12,-6,-1,0,1,6,12].map(api.toCC),    [0,32,58,64,69,95,127], 'toCC ±12 table');
eq([-24,-12,-6,-1,0,1,6,12,24].map(api.toAltCC), [0,32,48,61,64,66,79,95,127], 'toAltCC ±24 table');
eq(api.toCC(99), 127, 'toCC clamps high');   eq(api.toCC(-99), 0, 'toCC clamps low');
eq(api.toAltCC(99), 127, 'toAltCC clamps high'); eq(api.toAltCC(-99), 0, 'toAltCC clamps low');

/* 2 ── bend gesture sequencing */
api.base([0,0,0,0,0,0]); api.log();                    // settle: base sent, engine reset, log cleared
api.apply([0,0,2,0,0,0]);                              // press: +2 on string 3
let msgs = api.log();
const depthMsgs = msgs.filter(m => m[1] === 64);       // string 3 depth CC
const ctlMsgs   = msgs.filter(m => m[1] === 69);
eq(depthMsgs, [[0xB0, 64, api.toCC(2)]], 'press writes the +2 depth once');
eq(msgs[0][1], 64, 'depth lands before the control sweep starts');
eq(ctlMsgs[ctlMsgs.length - 1][2], 127, 'sweep ends at BEND CONTROL full');
eq(ctlMsgs.length > 3, true, 'up-sweep is a ramp, not a jump');
eq(ctlMsgs.every((m, i, a) => i === 0 || m[2] >= a[i-1][2]), true, 'up-sweep rises monotonically');

api.apply([0,0,0,0,0,0]);                              // release
msgs = api.log();
const dnCtl = msgs.filter(m => m[1] === 69);
eq(dnCtl[dnCtl.length - 1][2], 0, 'release sweeps BEND CONTROL back to 0');
eq(dnCtl.every((m, i, a) => i === 0 || m[2] <= a[i-1][2]), true, 'down-sweep falls monotonically');
const lastCtlIdx = msgs.lastIndexOf(msgs.filter(m => m[1] === 69).pop());
const zeroDepth = msgs.filter(m => m[1] === 64);
eq(zeroDepth, [[0xB0, 64, 64]], 'depths park at 0 (CC64) after release');
eq(msgs.indexOf(zeroDepth[0]) > lastCtlIdx, true, 'depths zero only after control reaches 0');

/* 3 ── base tuning on ALT TUNE */
api.base([-4,-3,0,-2,-2,-4]);                          // "Radiohead" C G C G G# C
msgs = api.log();
eq(msgs[0], [0xB0, 69, 0], 'sendBase zeroes BEND CONTROL first');
const altMsgs = msgs.filter(m => m[1] >= 71 && m[1] <= 76);
eq(altMsgs.map(m => m[1]), [71,72,73,74,75,76], 'base rides ALT TUNE CCs 71–76 in string order');
eq(altMsgs.map(m => m[2]), [-4,-3,0,-2,-2,-4].map(api.toAltCC), 'base uses the ±24 scaling');

/* 4 ── Ethnic octave lift baked into the base pitches */
api.setOctave(true);
api.base([0,0,5,-2,0,0]);
msgs = api.log().filter(m => m[1] >= 71 && m[1] <= 76);
eq(msgs.map(m => m[2]), [12,12,17,10,12,12].map(api.toAltCC), '+Octave adds 12 to every ALT TUNE pitch');
api.setOctave(false);

/* 5 ── stacked pedals: depth updates while engaged don't re-sweep */
api.base([0,0,0,0,0,0]); api.log();
api.apply([0,0,2,0,0,0]); api.log();                   // engaged at full
api.apply([1,0,2,0,0,0]);                              // add a second string mid-hold
msgs = api.log();
eq(msgs.filter(m => m[1] === 30), [[0xB0, 30, api.toCC(1)]], 'added string writes its depth');
eq(msgs.filter(m => m[1] === 69), [], 'no new sweep while already engaged (control stays at full)');

console.log(`realbend harness: ${cases} cases, ${fails} failures`);
if (fails) { process.exit(1); } else { console.log('PASS ✅'); }
