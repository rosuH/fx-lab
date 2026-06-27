# Copper Bars (canvas)

> Five glowing colored bars bounce on black; warm Amiga Copper demoscene glow.

- **id**: `copperbars` · **kind**: canvas · **section**: screen-and-signal
- **tags**: lines, neon, glow, geometry, canvas2d, background · **vibe**: retro, energetic, playful
- **culture**: demoscene / Amiga
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: copperbars — Copper Bars (canvas) · license MIT -->
<canvas id="fx-copperbars" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function copperbars(ctx,w,h,t){ ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);const hues=[30,180,300,90,210];for(let i=0;i<5;i++){const cy=h/2+Math.sin(t*1.5+i*0.6)*h*0.34;for(let y=-18;y<18;y++){ctx.fillStyle='hsl('+hues[i]+',90%,'+(58-Math.abs(y)*2.6)+'%)';ctx.fillRect(0,cy+y,w,1);}}};
const cv = document.getElementById('fx-copperbars');
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
