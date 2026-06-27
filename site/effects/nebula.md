# Nebula (canvas)

> Drifting cloud wisps and twinkling stars form a deep-space nebula; ambient, meditative background.

- **id**: `nebula` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: nebula, stars, starfield, glow, canvas2d, background · **vibe**: ambient, meditative
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: nebula — Nebula (canvas) · license MIT -->
<canvas id="fx-nebula" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function nebula(ctx,w,h,t,mx,my,s){ if(!s.c){s.c=[];for(let i=0;i<14;i++)s.c.push({x:Math.random()*w,y:Math.random()*h,r:30+Math.random()*60,hue:Math.random()*120+200,ph:Math.random()*6});}ctx.fillStyle='#04040a';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';for(const c of s.c){const x=c.x+Math.sin(t*0.2+c.ph)*20,y=c.y+Math.cos(t*0.15+c.ph)*16,g=ctx.createRadialGradient(x,y,0,x,y,c.r);g.addColorStop(0,'hsla('+c.hue+',80%,60%,0.16)');g.addColorStop(1,'hsla('+c.hue+',80%,60%,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,c.r,0,7);ctx.fill();}ctx.globalCompositeOperation='source-over';for(let i=0;i<40;i++){ctx.fillStyle='rgba(255,255,255,'+(0.2+0.3*Math.sin(t+i)).toFixed(2)+')';ctx.fillRect((i*97)%w,(i*53)%h,1,1);} };
const cv = document.getElementById('fx-nebula');
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
