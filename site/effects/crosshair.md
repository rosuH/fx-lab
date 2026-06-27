# Crosshair HUD (canvas)

> Sci-fi HUD crosshair locks to the cursor with real-time coordinate readout; minimal, technical.

- **id**: `crosshair` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: lines, geometry, cursor, overlay, canvas2d · **vibe**: technical, minimal
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: crosshair — Crosshair HUD (canvas) · license MIT -->
<canvas id="fx-crosshair" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function crosshair(ctx,w,h,t,mx,my){ ctx.fillStyle='#0a0c10';ctx.fillRect(0,0,w,h);const x=mx>=0?mx:w/2+Math.cos(t)*w*0.3,y=my>=0?my:h/2+Math.sin(t)*h*0.3;ctx.strokeStyle='rgba(120,255,180,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();ctx.strokeStyle='#7CFFB0';ctx.beginPath();ctx.arc(x,y,14,0,7);ctx.stroke();ctx.font='11px monospace';ctx.fillStyle='#7CFFB0';ctx.fillText('X:'+String(Math.round(x)).padStart(4,'0')+' Y:'+String(Math.round(y)).padStart(4,'0'),x+18,y-10); };
const cv = document.getElementById('fx-crosshair');
const ctx = cv.getContext('2d');
const DPR = Math.min(2, window.devicePixelRatio || 1);
const state = {};
let mx = -9999, my = -9999; // -9999 == not hovering (CONTRACT 2)
cv.addEventListener('pointermove', (e) => {
  const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
});
cv.addEventListener('pointerleave', () => { mx = -9999; my = -9999; });
const t0 = performance.now();
(function frame() {
  const w = Math.max(1, cv.clientWidth || 300), h = Math.max(1, cv.clientHeight || 240);
  if (cv.width !== Math.round(w * DPR) || cv.height !== Math.round(h * DPR)) {
    cv.width = Math.round(w * DPR); cv.height = Math.round(h * DPR);
  }
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); // draw in CSS px
  const t = (performance.now() - t0) / 1000;
  draw(ctx, w, h, t, mx, my, state);
  requestAnimationFrame(frame);
})();
</script>
```

## Runtime notes

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Reduced motion: freeze.

## Known limitations

- None noted.
