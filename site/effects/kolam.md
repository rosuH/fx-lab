# Kolam (canvas)

> Pink circle rings and warm dots repeat on deep plum; delicate South Indian threshold geometry.

- **id**: `kolam` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: dots, geometry, tiling, canvas2d, background · **vibe**: elegant, meditative, cultural
- **culture**: India
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: kolam — Kolam (canvas) · license MIT
     accuracy: Procedural approximation of South Indian Kolam floor patterns; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-kolam" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function kolam(ctx,w,h,t){ ctx.fillStyle='#2a0a1e';ctx.fillRect(0,0,w,h);const S=30;ctx.strokeStyle='#ff7ab0';ctx.lineWidth=2;for(let y=S;y<h-S/2;y+=S)for(let x=S;x<w-S/2;x+=S){ctx.beginPath();ctx.arc(x+S/2,y+S/2,S*0.46,0,7);ctx.stroke();}ctx.fillStyle='#ffd9b0';for(let y=S;y<h;y+=S)for(let x=S;x<w;x+=S){ctx.beginPath();ctx.arc(x,y,2,0,7);ctx.fill();}};
const cv = document.getElementById('fx-kolam');
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

- Procedural approximation of South Indian Kolam floor patterns; not a faithful reproduction of any specific historical motif.
