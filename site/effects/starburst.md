# Starburst (canvas)

> Yellow and pink radiating wedges slowly spinning; bold retro sunburst from canvas center.

- **id**: `starburst` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: geometry, spiral, rings, lines, canvas2d, background · **vibe**: energetic, playful, retro
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: starburst — Starburst (canvas) · license MIT -->
<canvas id="fx-starburst" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function starburst(ctx,w,h,t){ ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,N=40,D=Math.hypot(w,h); for(let i=0;i<N;i++){const a=i/N*6.2831+t*0.1;ctx.fillStyle=i%2?'#ffd23f':'#ff5a8a';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*D,cy+Math.sin(a)*D);ctx.lineTo(cx+Math.cos(a+6.2831/N)*D,cy+Math.sin(a+6.2831/N)*D);ctx.closePath();ctx.fill();} };
const cv = document.getElementById('fx-starburst');
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
