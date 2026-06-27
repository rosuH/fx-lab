# Orbits (canvas)

> Four colored planets orbit a golden sun on deep space; calm, minimal cosmic loop.

- **id**: `orbits` · **kind**: canvas · **section**: cellular-and-physics
- **tags**: orbit, rings, stars, dots, geometry, canvas2d, background · **vibe**: calm, ambient, meditative
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: orbits — Orbits (canvas) · license MIT -->
<canvas id="fx-orbits" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function orbits(ctx,w,h,t){ ctx.fillStyle='#05060e';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2;ctx.fillStyle='#ffd23f';ctx.beginPath();ctx.arc(cx,cy,8,0,7);ctx.fill();const pl=[[28,1.2,'#7fd0ff',3],[50,0.8,'#ff8f6a',5],[74,0.5,'#9fe0a0',4],[98,0.34,'#c79bff',6]];for(const p of pl){const a=t*p[1];ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.arc(cx,cy,p[0],0,7);ctx.stroke();ctx.fillStyle=p[2];ctx.beginPath();ctx.arc(cx+Math.cos(a)*p[0],cy+Math.sin(a)*p[0],p[3],0,7);ctx.fill();} };
const cv = document.getElementById('fx-orbits');
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
