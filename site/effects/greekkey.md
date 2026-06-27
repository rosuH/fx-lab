# Greek Key (canvas)

> Gold meander hooks scroll steadily across deep navy, forming a flowing ancient Greek frieze.

- **id**: `greekkey` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: geometry, lines, tiling, canvas2d, background · **vibe**: elegant, cultural, retro
- **culture**: Greece
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: greekkey — Greek Key (canvas) · license MIT
     accuracy: Procedural approximation of Greek meander (key) pattern; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-greekkey" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function greekkey(ctx,w,h,t){ ctx.fillStyle='#0a1a2a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffd23f';ctx.lineWidth=3;const S=30,off=(t*12)%S;for(let y=S;y<h+S;y+=S)for(let x=-S+off;x<w;x+=S){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-S*0.62);ctx.lineTo(x+S*0.62,y-S*0.62);ctx.lineTo(x+S*0.62,y-S*0.28);ctx.lineTo(x+S*0.3,y-S*0.28);ctx.stroke();}};
const cv = document.getElementById('fx-greekkey');
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

- Procedural approximation of Greek meander (key) pattern; not a faithful reproduction of any specific historical motif.
