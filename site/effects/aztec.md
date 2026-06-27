# Aztec Step-Fret (canvas)

> Earthy step-fret squares in terracotta and teal tile boldly; vivid Mesoamerican graphic rhythm.

- **id**: `aztec` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: geometry, mosaic, tiling, grid, canvas2d, background · **vibe**: energetic, cultural, geometric
- **culture**: Mesoamerica
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: aztec — Aztec Step-Fret (canvas) · license MIT
     accuracy: Procedural approximation of Mesoamerican step-fret pattern; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-aztec" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function aztec(ctx,w,h,t){ ctx.fillStyle='#1a0f0a';ctx.fillRect(0,0,w,h);const cols=['#d9763a','#e8b04b','#3a9b8a','#c0392b'],S=28;for(let y=0,r=0;y<h;y+=S,r++)for(let x=0,c=0;x<w;x+=S,c++){ctx.fillStyle=cols[(r+c)%4];ctx.fillRect(x,y,S,S);ctx.fillStyle='#1a0f0a';ctx.fillRect(x+S*0.3,y+S*0.3,S*0.4,S*0.4);ctx.fillStyle=cols[(r+c+1)%4];ctx.fillRect(x+S*0.4,y+S*0.4,S*0.2,S*0.2);}};
const cv = document.getElementById('fx-aztec');
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

- Procedural approximation of Mesoamerican step-fret pattern; not a faithful reproduction of any specific historical motif.
