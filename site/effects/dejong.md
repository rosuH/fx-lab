# De Jong (canvas)

> Pink dust drifts into strange alien loops; a De Jong attractor slowly builds on dark violet.

- **id**: `dejong` · **kind**: canvas · **section**: fractal-and-chaos
- **tags**: attractor, geometry, curves, particles · **vibe**: hypnotic, ambient, technical
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: dejong — De Jong (canvas) · license MIT -->
<canvas id="fx-dejong" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function dejong(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0;s.y=0;ctx.fillStyle='#0a060c';ctx.fillRect(0,0,w,h);}else{ctx.fillStyle='rgba(10,6,12,0.05)';ctx.fillRect(0,0,w,h);} const a=1.4+Math.sin(t*0.07),b=-2.3,c=2.4,d=-2.1;ctx.fillStyle='rgba(255,150,200,0.5)';for(let i=0;i<2200;i++){const nx=Math.sin(a*s.y)-Math.cos(b*s.x),ny=Math.sin(c*s.x)-Math.cos(d*s.y);s.x=nx;s.y=ny;ctx.fillRect(w/2+nx*w*0.2,h/2+ny*h*0.2,1,1);} };
const cv = document.getElementById('fx-dejong');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Persistent accumulator: Accumulates 2200 dots per frame; canvas only partially erased each frame (alpha fade, not full clear). Reduced motion: freeze.

## Known limitations

- Accumulates state across frames — Accumulates 2200 dots per frame; canvas only partially erased each frame (alpha fade, not full clear).; remount to reset.
