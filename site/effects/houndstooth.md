# Houndstooth (canvas)

> Classic black-and-white houndstooth check slowly scrolling; crisp tailoring pattern.

- **id**: `houndstooth` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: geometry, tiling, stripes, grid, canvas2d, background · **vibe**: elegant, retro, minimal
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: houndstooth — Houndstooth (canvas) · license MIT -->
<canvas id="fx-houndstooth" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function houndstooth(ctx,w,h,t){ ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.fillStyle='#111';const S=20,off=(t*10)%S; for(let y=-S;y<h+S;y+=S)for(let x=-S;x<w+S;x+=S){const px=x+off;ctx.fillRect(px,y,S/2,S/2);ctx.beginPath();ctx.moveTo(px+S/2,y);ctx.lineTo(px+S,y);ctx.lineTo(px+S/2,y+S/2);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(px,y+S/2);ctx.lineTo(px+S/2,y+S);ctx.lineTo(px,y+S);ctx.closePath();ctx.fill();} };
const cv = document.getElementById('fx-houndstooth');
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
