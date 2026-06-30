// Canvas2D renderer. ctx.setTransform(dpr) each frame (coords in CSS px); draw is called with
// `this === NOISE` so effects that use this.vhash/this.vnoise resolve. state persists per mount.
//
// opts.resScale (0–1) shrinks the LOGICAL canvas handed to draw(): effects loop over fewer pixels
// (work drops ~scale²), then the browser upscales the smaller bitmap to fill the box. Critical for
// per-pixel effects (mandelbrot, julia, plasma, …) whose cost is the JS loop, not fillRect. The
// coordinate space stays self-consistent at any scale — effects see a smaller w/h, not a squished
// one. Defaults to 1 (full res); the gallery passes 0.5 for cpu:"high" effects.

import { NOISE } from './noise.js';

// makeCanvas2D(canvas, module, opts?) -> { resize(w,h,dpr), render(t, mxCss, myCss), dispose() }
export function makeCanvas2D(canvas, module, opts = {}) {
  const ctx = canvas.getContext('2d');
  const resScale = Math.min(1, Math.max(0.1, Number(opts.resScale) || 1));
  const state = {}; // persisted across frames for this mount
  let w = 0, h = 0, dpr = 1;
  return {
    resize(_w, _h, _dpr) {
      w = _w; h = _h; dpr = _dpr;
      // Backing store matches the scaled logical size × dpr; CSS box (width/height:100%) upscales it.
      const sw = Math.max(1, Math.round(_w * resScale));
      const sh = Math.max(1, Math.round(_h * resScale));
      canvas.width = Math.max(1, Math.round(sw * dpr));
      canvas.height = Math.max(1, Math.round(sh * dpr));
    },
    render(t, mx, my) {
      // dpr maps the (scaled) logical space onto the backing store. Pass the scaled w/h so the
      // effect's pixel loops iterate over fewer cells.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // CSS-px coords; resets any transform the effect left behind
      const sw = Math.max(1, Math.round(w * resScale));
      const sh = Math.max(1, Math.round(h * resScale));
      module.draw.call(NOISE, ctx, sw, sh, t, mx, my, state); // mx,my are CSS px, -9999 when not hovering
    },
    dispose() {},
  };
}
