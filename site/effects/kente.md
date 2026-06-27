# Kente Cloth (canvas)

> Vivid gold, green and red colour bands tile in the rhythm of West African Kente weaving.

- **id**: `kente` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: stripes, weave, geometry, canvas2d, background · **vibe**: energetic, cultural, geometric
- **culture**: West Africa
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: kente — Kente Cloth (canvas) · license MIT
     accuracy: Procedural approximation of West African Kente cloth weaving; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-kente" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function kente(ctx,w,h,t){ const cols=['#f2c20a','#0a8a3a','#c0140a','#111','#1a6cc0'],S=17;for(let y=0,r=0;y<h;y+=S,r++)for(let x=0,c=0;x<w;x+=S,c++){ctx.fillStyle=cols[((r%2)?(c+r):(r*2+c))%5];ctx.fillRect(x,y,S,S);if((r+c)%3===0){ctx.fillStyle=cols[c%5];ctx.fillRect(x,y,S,S/2);}}};
const cv = document.getElementById('fx-kente');
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

- Procedural approximation of West African Kente cloth weaving; not a faithful reproduction of any specific historical motif.
