# Talavera (canvas)

> Cream tiles edged in cobalt, petalled in gold; bright repeating Mexican Talavera ceramics.

- **id**: `talavera` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: mosaic, tiling, geometry, canvas2d, background · **vibe**: elegant, cultural, playful
- **culture**: Mexico
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: talavera — Talavera (canvas) · license MIT
     accuracy: Procedural approximation of Mexican Talavera ceramic tile; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-talavera" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function talavera(ctx,w,h,t){ ctx.fillStyle='#f4f0e4';ctx.fillRect(0,0,w,h);const S=58;for(let y=0;y<h+S;y+=S)for(let x=0;x<w+S;x+=S){ctx.strokeStyle='#1a5fa8';ctx.lineWidth=2;ctx.strokeRect(x,y,S,S);ctx.fillStyle='#e8a800';for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.save();ctx.translate(x+S/2+Math.cos(a)*S*0.28,y+S/2+Math.sin(a)*S*0.28);ctx.rotate(a);ctx.beginPath();ctx.ellipse(0,0,5,2,0,0,7);ctx.fill();ctx.restore();}ctx.fillStyle='#1a5fa8';ctx.beginPath();ctx.arc(x+S/2,y+S/2,6,0,7);ctx.fill();}};
const cv = document.getElementById('fx-talavera');
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

- Procedural approximation of Mexican Talavera ceramic tile; not a faithful reproduction of any specific historical motif.
