# Vortex (canvas)

> Colourful particles spiral into the cursor in an accelerating vortex; hypnotic, energetic overlay.

- **id**: `vortex` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: particles, spiral, orbit, cursor, overlay, canvas2d · **vibe**: hypnotic, energetic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: vortex — Vortex (canvas) · license MIT -->
<canvas id="fx-vortex" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function vortex(ctx,w,h,t,mx,my,s){ if(!s.p){s.p=[];for(let i=0;i<140;i++)s.p.push({x:Math.random()*w,y:Math.random()*h});}ctx.fillStyle='rgba(8,6,14,0.2)';ctx.fillRect(0,0,w,h);const cx=mx>=0?mx:w/2,cy=my>=0?my:h/2;for(const p of s.p){const dx=p.x-cx,dy=p.y-cy,d=Math.hypot(dx,dy)||1,a=Math.atan2(dy,dx)+0.1;p.x=cx+Math.cos(a)*(d-0.6);p.y=cy+Math.sin(a)*(d-0.6);if(d<6){p.x=Math.random()*w;p.y=Math.random()*h;}ctx.fillStyle='hsla('+((d+t*40)%360)+',90%,65%,0.9)';ctx.fillRect(p.x,p.y,2,2);} };
const cv = document.getElementById('fx-vortex');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Particle positions in s.p accumulate motion each frame; canvas fades partially (alpha 0.2 fill) Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Particle positions in s.p accumulate motion each frame; canvas fades partially (alpha 0.2 fill); remount to reset.
