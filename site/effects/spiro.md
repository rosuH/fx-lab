# Spirograph (canvas)

> Electric-blue spirograph tracing a hypotrochoid; intricate lace-like winding slowly rotates.

- **id**: `spiro` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: curves, spiral, geometry, rings, canvas2d, inline · **vibe**: elegant, hypnotic, geometric
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: spiro — Spirograph (canvas) · license MIT -->
<canvas id="fx-spiro" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function spiro(ctx,w,h,t){ ctx.fillStyle='#08101a';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,R=Math.min(w,h)*0.34,r=R*0.55,d=R*0.72; ctx.strokeStyle='#6fd0ff';ctx.lineWidth=1;ctx.beginPath(); for(let a=0;a<37.7;a+=0.03){const x=cx+(R-r)*Math.cos(a)+d*Math.cos((R-r)/r*a+t),y=cy+(R-r)*Math.sin(a)-d*Math.sin((R-r)/r*a+t);a?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); };
const cv = document.getElementById('fx-spiro');
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
