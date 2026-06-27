# Sierpinski (canvas)

> Warm amber Sierpinski triangle emerges from the chaos game; minimal fractal on dark.

- **id**: `sierpinski` · **kind**: canvas · **section**: fractal-and-chaos
- **tags**: fractal, geometry, particles, dots · **vibe**: minimal, geometric, hypnotic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: sierpinski — Sierpinski (canvas) · license MIT -->
<canvas id="fx-sierpinski" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function sierpinski(ctx,w,h,t){ ctx.fillStyle='#0a0a0f';ctx.fillRect(0,0,w,h);const V=[[w/2,8],[8,h-8],[w-8,h-8]];let x=w/2,y=h/2;ctx.fillStyle='rgba(255,210,120,0.7)';for(let i=0;i<7000;i++){const v=V[Math.floor(Math.random()*3)];x=(x+v[0])/2;y=(y+v[1])/2;if(i>10)ctx.fillRect(x,y,1,1);} };
const cv = document.getElementById('fx-sierpinski');
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
