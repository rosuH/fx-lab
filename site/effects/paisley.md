# Paisley (canvas)

> Jewel-toned boteh teardrops gently sway on deep indigo; lush Persian paisley textile rhythm.

- **id**: `paisley` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: curves, geometry, tiling, canvas2d, background · **vibe**: elegant, cultural, hypnotic
- **culture**: Persia
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: paisley — Paisley (canvas) · license MIT
     accuracy: Procedural approximation of Persian Paisley (boteh) textile pattern; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-paisley" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function paisley(ctx,w,h,t){ ctx.fillStyle='#1a0a2a';ctx.fillRect(0,0,w,h);const cols=['#e8b04b','#ff7ab0','#34d1c4'],S=64;for(let y=0,r=0;y<h+S;y+=S,r++)for(let x=0,c=0;x<w+S;x+=S,c++){ctx.save();ctx.translate(x+(r%2)*S/2,y);ctx.rotate(Math.sin(t*0.3+r+c)*0.2);ctx.fillStyle=cols[(r+c)%3];ctx.beginPath();ctx.moveTo(0,-18);ctx.bezierCurveTo(17,-16,17,9,0,17);ctx.bezierCurveTo(-9,10,-7,-5,0,-18);ctx.fill();ctx.fillStyle='#1a0a2a';ctx.beginPath();ctx.moveTo(0,-12);ctx.bezierCurveTo(9,-10,9,5,0,10);ctx.bezierCurveTo(-4,6,-3,-3,0,-12);ctx.fill();ctx.restore();}};
const cv = document.getElementById('fx-paisley');
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

- Procedural approximation of Persian Paisley (boteh) textile pattern; not a faithful reproduction of any specific historical motif.
