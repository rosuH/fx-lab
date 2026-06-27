# Spiral (canvas)

> Clean white Archimedean spiral slowly rotating on pure black; minimal and meditative.

- **id**: `spiralarc` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: spiral, curves, geometry, lines, canvas2d, background · **vibe**: minimal, meditative, calm
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: spiralarc — Spiral (canvas) · license MIT -->
<canvas id="fx-spiralarc" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function spiralarc(ctx,w,h,t){ ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2; ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath(); for(let a=0;a<44;a+=0.1){const r=a*2.2;a?ctx.lineTo(cx+Math.cos(a+t)*r,cy+Math.sin(a+t)*r):ctx.moveTo(cx+Math.cos(a+t)*r,cy+Math.sin(a+t)*r);} ctx.stroke(); };
const cv = document.getElementById('fx-spiralarc');
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
