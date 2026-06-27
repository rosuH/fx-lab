# Mandelbrot (canvas)

> Hypnotic zoom into the Mandelbrot set; cycling hues trace infinite fractal complexity.

- **id**: `mandelbrot` · **kind**: canvas · **section**: fractal-and-chaos
- **tags**: fractal, geometry, curves, pixel · **vibe**: hypnotic, psychedelic, meditative
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: mandelbrot — Mandelbrot (canvas) · license MIT -->
<canvas id="fx-mandelbrot" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function mandelbrot(ctx,w,h,t){ const S=2,zoom=1.7+Math.sin(t*0.1)*0.6,cx=-0.745,cy=0.115; for(let py=0;py<h;py+=S)for(let px=0;px<w;px+=S){const x0=(px/w-0.5)*zoom+cx,y0=(py/h-0.5)*zoom*(h/w)+cy;let x=0,y=0,i=0;for(;i<42&&x*x+y*y<4;i++){const xt=x*x-y*y+x0;y=2*x*y+y0;x=xt;}const c=i===42?0:i/42;ctx.fillStyle='hsl('+((c*300+t*20)%360)+','+(c>0?70:0)+'%,'+(c*55|0)+'%)';ctx.fillRect(px,py,S,S);} };
const cv = document.getElementById('fx-mandelbrot');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Reduced motion: freeze.

## Known limitations

- None noted.
