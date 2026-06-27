# Confetti (canvas)

> Colourful confetti flakes drift down with gentle sine sway; celebratory, playful overlay.

- **id**: `confetti` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: confetti, particles, trail, canvas2d, overlay · **vibe**: playful, energetic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: confetti — Confetti (canvas) · license MIT -->
<canvas id="fx-confetti" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function confetti(ctx,w,h,t,mx,my,s){ if(!s.p)s.p=[];if(s.p.length<120&&Math.random()<0.6){const cols=['#ff5a8a','#ffd23f','#34d1c4','#7b6cf6','#ff8f3f'];s.p.push({x:Math.random()*w,y:-10,vy:1+Math.random()*2,vx:(Math.random()-.5)*2,r:2+Math.random()*5,c:cols[Math.floor(Math.random()*5)],rot:Math.random()*6,vr:(Math.random()-.5)*0.3});}ctx.fillStyle='#0a0a12';ctx.fillRect(0,0,w,h);s.p=s.p.filter(p=>p.y<h+10);for(const p of s.p){p.y+=p.vy;p.x+=p.vx+Math.sin(t+p.y*0.05);p.rot+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);ctx.restore();} };
const cv = document.getElementById('fx-confetti');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Particle array s.p grows each frame up to cap; particles removed when off-screen Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Particle array s.p grows each frame up to cap; particles removed when off-screen; remount to reset.
