# Boids Flocking (canvas)

> 60 pale-blue flecks flock and steer toward the cursor; fluid organic swarm with motion trails.

- **id**: `boids` · **kind**: canvas · **section**: cellular-and-physics
- **tags**: flocking, particles, flow, trail, canvas2d, background, overlay · **vibe**: hypnotic, organic, ambient
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: boids — Boids Flocking (canvas) · license MIT -->
<canvas id="fx-boids" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function boids(ctx,w,h,t,mx,my,s){ if(!s.b){s.b=[];for(let i=0;i<60;i++)s.b.push({x:Math.random()*w,y:Math.random()*h,vx:Math.random()-.5,vy:Math.random()-.5});}ctx.fillStyle='rgba(8,10,16,0.3)';ctx.fillRect(0,0,w,h);for(const b of s.b){let ax=0,ay=0,cx=0,cy=0,sx=0,sy=0,n=0;for(const o of s.b){const dx=o.x-b.x,dy=o.y-b.y,d=Math.hypot(dx,dy);if(o!==b&&d<40){ax+=o.vx;ay+=o.vy;cx+=o.x;cy+=o.y;if(d<18){sx-=dx;sy-=dy;}n++;}}if(n){b.vx+=(ax/n-b.vx)*0.05+(cx/n-b.x)*0.0008+sx*0.004;b.vy+=(ay/n-b.vy)*0.05+(cy/n-b.y)*0.0008+sy*0.004;}if(mx>=0){b.vx+=(mx-b.x)*0.001;b.vy+=(my-b.y)*0.001;}const sp=Math.hypot(b.vx,b.vy)||1;b.vx=b.vx/sp*1.6;b.vy=b.vy/sp*1.6;b.x=(b.x+b.vx+w)%w;b.y=(b.y+b.vy+h)%h;const a=Math.atan2(b.vy,b.vx);ctx.fillStyle='#9fe0ff';ctx.beginPath();ctx.moveTo(b.x+Math.cos(a)*5,b.y+Math.sin(a)*5);ctx.lineTo(b.x+Math.cos(a+2.5)*4,b.y+Math.sin(a+2.5)*4);ctx.lineTo(b.x+Math.cos(a-2.5)*4,b.y+Math.sin(a-2.5)*4);ctx.closePath();ctx.fill();} };
const cv = document.getElementById('fx-boids');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Canvas not fully cleared each frame; motion trail fades at 30% opacity overlay per tick. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Canvas not fully cleared each frame; motion trail fades at 30% opacity overlay per tick.; remount to reset.
