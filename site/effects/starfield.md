# Starfield Warp (canvas)

> Stars streak inward at warp speed from a deep-space vanishing point; hypnotic forward pull.

- **id**: `starfield` · **kind**: canvas · **section**: data-and-system
- **tags**: starfield, canvas2d, stars, trail, tunnel · **vibe**: futuristic, hypnotic, energetic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: starfield — Starfield Warp (canvas) · license MIT -->
<canvas id="fx-starfield" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function starfield(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.st=[];for(let i=0;i<150;i++)s.st.push({x:(Math.random()-.5)*w,y:(Math.random()-.5)*h,z:Math.random()*w});} ctx.fillStyle='rgba(4,5,12,0.4)';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2;
      for(const p of s.st){ p.z-=4; if(p.z<1){p.z=w;p.x=(Math.random()-.5)*w;p.y=(Math.random()-.5)*h;} const k=128/p.z,k2=128/(p.z+5); const x=cx+p.x*k,y=cy+p.y*k,px=cx+p.x*k2,py=cy+p.y*k2; const b=Math.min(1,(1-p.z/w)*1.6); ctx.strokeStyle='rgba('+(180+b*60|0)+','+(200+b*40|0)+',255,'+b.toFixed(2)+')';ctx.lineWidth=b*1.6;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x,y);ctx.stroke(); } };
const cv = document.getElementById('fx-starfield');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Star positions and warp-streak trails accumulate via partial alpha clear Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Star positions and warp-streak trails accumulate via partial alpha clear; remount to reset.
