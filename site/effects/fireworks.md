# Fireworks (canvas)

> Glittering firework bursts erupt automatically across a dark sky with gravity fade; dramatic.

- **id**: `fireworks` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: particles, stars, fire, canvas2d, overlay · **vibe**: energetic, dramatic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: fireworks — Fireworks (canvas) · license MIT -->
<canvas id="fx-fireworks" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function fireworks(ctx,w,h,t,mx,my,s){ if(!s.p){s.p=[];s.acc=0;}s.acc++;if(s.acc%40===0){const ox=mx>=0?mx:Math.random()*w,oy=my>=0?my:Math.random()*h*0.6,hue=Math.random()*360;for(let i=0;i<50;i++){const a=Math.random()*6.28,sp=Math.random()*3+1;s.p.push({x:ox,y:oy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,hue});}}ctx.fillStyle='rgba(6,6,14,0.22)';ctx.fillRect(0,0,w,h);s.p=s.p.filter(p=>p.life>0);for(const p of s.p){p.x+=p.vx;p.y+=p.vy;p.vy+=0.04;p.life-=0.012;ctx.fillStyle='hsla('+p.hue+',90%,65%,'+p.life.toFixed(2)+')';ctx.fillRect(p.x,p.y,2.4,2.4);} };
const cv = document.getElementById('fx-fireworks');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Particle array s.p and frame counter s.acc persist; bursts fire automatically every 40 frames; canvas fades partially each frame Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Particle array s.p and frame counter s.acc persist; bursts fire automatically every 40 frames; canvas fades partially each frame; remount to reset.
