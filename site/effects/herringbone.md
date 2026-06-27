# Herringbone (canvas)

> Warm gold herringbone tile weave on dark brown; a rich static textile pattern.

- **id**: `herringbone` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: geometry, tiling, weave, stripes, canvas2d, background · **vibe**: elegant, cozy, retro
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger none
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: herringbone — Herringbone (canvas) · license MIT -->
<canvas id="fx-herringbone" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function herringbone(ctx,w,h,t){ ctx.fillStyle='#16140f';ctx.fillRect(0,0,w,h);const L=22,W=8; ctx.fillStyle='#c9a86a'; for(let y=-L,r=0;y<h+L;y+=W*2,r++)for(let x=-L;x<w+L;x+=L){ctx.save();ctx.translate(x+(r%2)*L/2,y);ctx.rotate(((Math.floor(x/L)+r)%2?1:-1)*Math.PI/4);ctx.fillRect(0,0,L,W);ctx.restore();} };
const cv = document.getElementById('fx-herringbone');
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
