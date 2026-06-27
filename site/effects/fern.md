# Barnsley Fern (canvas)

> Bright green Barnsley fern materializes from chaos; organic fractal nature on dark green.

- **id**: `fern` · **kind**: canvas · **section**: fractal-and-chaos
- **tags**: fractal, particles, geometry, noise · **vibe**: calm, organic, meditative
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: fern — Barnsley Fern (canvas) · license MIT -->
<canvas id="fx-fern" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function fern(ctx,w,h,t){ ctx.fillStyle='#060c06';ctx.fillRect(0,0,w,h);ctx.fillStyle='rgba(120,230,120,0.7)';let x=0,y=0;for(let i=0;i<7000;i++){const r=Math.random();let nx,ny;if(r<0.01){nx=0;ny=0.16*y;}else if(r<0.86){nx=0.85*x+0.04*y;ny=-0.04*x+0.85*y+1.6;}else if(r<0.93){nx=0.2*x-0.26*y;ny=0.23*x+0.22*y+1.6;}else{nx=-0.15*x+0.28*y;ny=0.26*x+0.24*y+0.44;}x=nx;y=ny;ctx.fillRect(w/2+x*w*0.085,h-y*h*0.095,1,1);} };
const cv = document.getElementById('fx-fern');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
