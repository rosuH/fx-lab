# Bokeh (canvas)

> Soft luminous circles drift upward like out-of-focus lights; calm, elegant background.

- **id**: `bokeh` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: dots, glow, particles, canvas2d, background · **vibe**: calm, elegant
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: bokeh — Bokeh (canvas) · license MIT -->
<canvas id="fx-bokeh" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function bokeh(ctx,w,h,t,mx,my,s){ if(!s.c){s.c=[];for(let i=0;i<24;i++)s.c.push({x:Math.random()*w,y:Math.random()*h,r:10+Math.random()*40,hue:Math.random()*60+180,sp:0.2+Math.random()*0.5,ph:Math.random()*6});}ctx.fillStyle='#06080f';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';for(const c of s.c){const y=(c.y+t*c.sp*20)%(h+80)-40,g=ctx.createRadialGradient(c.x,y,0,c.x,y,c.r),al=0.12+0.08*Math.sin(t+c.ph);g.addColorStop(0,'hsla('+c.hue+',80%,70%,'+al.toFixed(2)+')');g.addColorStop(1,'hsla('+c.hue+',80%,70%,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(c.x,y,c.r,0,7);ctx.fill();}ctx.globalCompositeOperation='source-over'; };
const cv = document.getElementById('fx-bokeh');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
