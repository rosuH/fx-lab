# Flow Field (canvas)

> Dim constellation of drifting particles draws faint connecting lines; cursor repels the swarm.

- **id**: `field` · **kind**: canvas · **section**: data-and-system
- **tags**: particles, canvas2d, flow, trail, lines · **vibe**: calm, ambient, elegant
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: field — Flow Field (canvas) · license MIT -->
<canvas id="fx-field" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function field(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.p=[];for(let i=0;i<60;i++)s.p.push({x:Math.random()*w,y:Math.random()*h,vx:Math.random()-.5,vy:Math.random()-.5});}
      ctx.fillStyle='rgba(12,13,16,0.32)';ctx.fillRect(0,0,w,h); const ps=s.p;
      for(const p of ps){ const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy)||1; if(mx>=0&&d<130){const f=(1-d/130)*0.8;p.vx+=dx/d*f;p.vy+=dy/d*f;} p.vx+=(Math.random()-.5)*0.06;p.vy+=(Math.random()-.5)*0.06;p.vx*=0.95;p.vy*=0.95;p.x+=p.vx;p.y+=p.vy; if(p.x<0)p.x+=w;else if(p.x>w)p.x-=w; if(p.y<0)p.y+=h;else if(p.y>h)p.y-=h; }
      ctx.lineWidth=1; for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;if(d2<8100){ctx.strokeStyle='rgba(127,200,255,'+((1-Math.sqrt(d2)/90)*0.22).toFixed(3)+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
      ctx.fillStyle='rgba(190,225,255,0.9)'; for(const p of ps){ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,7);ctx.fill();} };
const cv = document.getElementById('fx-field');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Particle positions and connecting-line trails accumulate via partial alpha clear Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Particle positions and connecting-line trails accumulate via partial alpha clear; remount to reset.
