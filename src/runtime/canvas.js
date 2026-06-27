// Canvas2D renderer. ctx.setTransform(dpr) each frame (coords in CSS px); draw is called with
// `this === NOISE` so effects that use this.vhash/this.vnoise resolve. state persists per mount.

import { NOISE } from './noise.js';

// makeCanvas2D(canvas, module) -> { resize(w,h,dpr), render(t, mxCss, myCss), dispose() }
export function makeCanvas2D(canvas, module) {
  const ctx = canvas.getContext('2d');
  const state = {}; // persisted across frames for this mount
  let w = 0, h = 0, dpr = 1;
  return {
    resize(_w, _h, _dpr) {
      w = _w; h = _h; dpr = _dpr;
      canvas.width = Math.max(1, Math.round(_w * dpr));
      canvas.height = Math.max(1, Math.round(_h * dpr));
    },
    render(t, mx, my) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // CSS-px coords; resets any transform the effect left behind
      module.draw.call(NOISE, ctx, w, h, t, mx, my, state); // mx,my are CSS px, -9999 when not hovering
    },
    dispose() {},
  };
}
