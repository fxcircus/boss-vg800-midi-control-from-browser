#!/usr/bin/env python3
"""Trace a VG-800 pedal-display screenshot into a clean line-art SVG.

Deterministic bitmap-tracing pipeline (potrace algorithm via the pure-python
`potracer` port — same turdsize/alphamax/opttolerance parameters as the C tool):

  1. crop the screenshot down to the guitar graphic (inside the LCD frame)
  2. threshold on luminance (bright pixels = ink for the light-on-dark LCD;
     pass --ink dark for dark-on-light sources)
  3. upscale 4x LANCZOS + gaussian blur + re-threshold, so curves get fitted
     to smooth shapes instead of pixel staircases
  4. trace, then emit a minimal SVG: viewBox only (no width/height), one
     currentColor path, no metadata

Usage:
  python3 tools/trace_guitar.py IN.png OUT.svg --crop L,T,R,B [--threshold 110]
      [--ink bright|dark] [--scale 4] [--blur 1.6]
      [--turd 40] [--alphamax 1.2] [--opttol 0.35] [--debug-png bitmap.png]

Run with --histogram first to inspect a new screenshot and pick its threshold.
Deps: pillow, numpy, potracer  (python3 -m pip install --user pillow numpy potracer)
"""
import argparse, sys
from PIL import Image, ImageFilter
import numpy as np
import potrace


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('input'); ap.add_argument('output', nargs='?')
    ap.add_argument('--crop', help='L,T,R,B box in source pixels (inside any UI frame)')
    ap.add_argument('--threshold', type=float, default=110, help='luminance cut for ink')
    ap.add_argument('--ink', choices=['bright', 'dark'], default='bright',
                    help='which side of the threshold is ink (bright = light-on-dark LCD)')
    ap.add_argument('--scale', type=int, default=4)
    ap.add_argument('--blur', type=float, default=1.6)
    ap.add_argument('--dilate', type=int, default=0,
                    help='odd MaxFilter size applied after upscale, bridges small line breaks in noisy photos')
    ap.add_argument('--turd', type=int, default=40, help='suppress speckles smaller than N px (at scaled size)')
    ap.add_argument('--alphamax', type=float, default=1.2, help='corner smoothing, higher = smoother')
    ap.add_argument('--opttol', type=float, default=0.35, help='curve optimization tolerance')
    ap.add_argument('--round', type=int, default=1, help='decimals in emitted coordinates')
    ap.add_argument('--histogram', action='store_true', help='print luminance stats and exit')
    ap.add_argument('--debug-png', help='save the pre-trace 1-bit bitmap here')
    a = ap.parse_args()

    im = Image.open(a.input).convert('RGB')
    if a.crop:
        box = tuple(int(v) for v in a.crop.split(','))
        im = im.crop(box)
    lum = np.asarray(im).astype(float).mean(axis=2)

    if a.histogram:
        hist, _ = np.histogram(lum, bins=16, range=(0, 256))
        print(f'size {im.size}  lum min/max/mean {lum.min():.0f}/{lum.max():.0f}/{lum.mean():.1f}')
        for i, h in enumerate(hist):
            print(f'  {i*16:3d}-{i*16+15:3d} {"#" * (h * 60 // max(hist.max(), 1))} {h}')
        return

    if not a.output:
        sys.exit('output path required (or use --histogram)')

    mask = (lum > a.threshold) if a.ink == 'bright' else (lum < a.threshold)
    print(f'crop {im.size}  threshold {a.threshold} ({a.ink}=ink)  ink {mask.mean()*100:.1f}%')

    big = Image.fromarray((mask * 255).astype(np.uint8)) \
        .resize((im.width * a.scale, im.height * a.scale), Image.LANCZOS)
    if a.dilate:
        big = big.filter(ImageFilter.MaxFilter(a.dilate))
    big = big.filter(ImageFilter.GaussianBlur(a.blur)).point(lambda p: 255 if p > 128 else 0)
    bits = np.asarray(big) > 128
    if a.debug_png:
        big.convert('1').save(a.debug_png)

    # potracer treats 0 as foreground (PIL image convention), so hand it the inverse of our ink mask
    path = potrace.Bitmap(np.logical_not(bits)).trace(
        turdsize=a.turd, alphamax=a.alphamax, opticurve=True, opttolerance=a.opttol,
        turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY)

    f = (lambda v: f'{v:.{a.round}f}'.rstrip('0').rstrip('.')) if a.round > 0 else (lambda v: f'{v:.0f}')   # only strip zeros when there is a decimal point to strip toward
    d = []
    for curve in path:
        sp = curve.start_point
        d.append(f'M{f(sp.x)} {f(sp.y)}')
        for seg in curve.segments:
            e = seg.end_point
            if seg.is_corner:
                c = seg.c
                d.append(f'L{f(c.x)} {f(c.y)}L{f(e.x)} {f(e.y)}')
            else:
                c1, c2 = seg.c1, seg.c2
                d.append(f'C{f(c1.x)} {f(c1.y)} {f(c2.x)} {f(c2.y)} {f(e.x)} {f(e.y)}')
        d.append('Z')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {big.width} {big.height}">'
           f'<path fill="currentColor" stroke="none" fill-rule="evenodd" d="{"".join(d)}"/></svg>')
    with open(a.output, 'w') as fh:
        fh.write(svg)
    n = sum(1 for _ in path)
    print(f'traced {n} contours -> {a.output}  {len(svg)} bytes  viewBox 0 0 {big.width} {big.height}')


if __name__ == '__main__':
    main()
