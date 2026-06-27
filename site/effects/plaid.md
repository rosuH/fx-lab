# Tartan Plaid (canvas)

> Scrolling tartan plaid in forest green, red, and cream; classic Scottish textile in motion.

- **id**: `plaid` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: stripes, geometry, tiling, grid, canvas2d, background · **vibe**: cozy, retro, elegant
- **culture**: Scotland
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: plaid — Tartan Plaid (canvas) · license MIT -->
<canvas id="fx-plaid" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function plaid(ctx,w,h,t){ ctx.fillStyle='#13362a';ctx.fillRect(0,0,w,h);const bands=[['rgba(220,60,50,0.55)',0,14],['rgba(240,225,185,0.45)',18,4],['rgba(40,40,70,0.5)',30,10]],o=(t*8)%40; for(let p=-40;p<w;p+=40)for(const b of bands){ctx.fillStyle=b[0];ctx.fillRect(p+b[1]+o,0,b[2],h);} for(let p=-40;p<h;p+=40)for(const b of bands){ctx.fillStyle=b[0];ctx.fillRect(0,p+b[1]+o,w,b[2]);} };
const cv = document.getElementById('fx-plaid');
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
