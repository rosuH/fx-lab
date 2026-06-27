# Chevron (canvas)

> Scrolling multicolor chevron stripes; vivid zigzag rows stream in retro palette.

- **id**: `chevron` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: chevron, stripes, geometry, lines, canvas2d, background · **vibe**: energetic, playful, retro
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: chevron — Chevron (canvas) · license MIT -->
<canvas id="fx-chevron" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function chevron(ctx,w,h,t){ const cols=['#ff6b5a','#ffd23f','#34d1c4','#7b6cf6'],S=26,off=(t*20)%(S*2); for(let r=0,y=-S;y<h+S;r++,y+=S/2+0)for(let x=-S*2;x<w+S;x+=S*2){ctx.strokeStyle=cols[r%4];ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+off,y+S/2);ctx.lineTo(x+S+off,y);ctx.lineTo(x+2*S+off,y+S/2);ctx.stroke();} };
const cv = document.getElementById('fx-chevron');
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
