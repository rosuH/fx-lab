# Memphis 80s (canvas)

> Neon Memphis shapes drift and spin on dark; vibrant 80s pop-design energy.

- **id**: `memphis` · **kind**: canvas · **section**: design-movements
- **tags**: geometry, canvas2d, particles, lines · **vibe**: playful, energetic, retro
- **culture**: Memphis / pop design
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: memphis — Memphis 80s (canvas) · license MIT -->
<canvas id="fx-memphis" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function memphis(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.sh=[];for(let i=0;i<16;i++)s.sh.push({x:Math.random()*w,y:Math.random()*h,k:i%4,c:i%5,r:8+Math.random()*15,p:Math.random()*6});} ctx.fillStyle='#0f1020';ctx.fillRect(0,0,w,h); const cols=['#ff5a8a','#34d1c4','#ffd23f','#7b6cf6','#ff8f3f'];
      for(const o of s.sh){ const y=o.y+Math.sin(t*0.6+o.p)*6; ctx.fillStyle=cols[o.c];ctx.strokeStyle=cols[o.c];ctx.lineWidth=3; ctx.save();ctx.translate(o.x,y);ctx.rotate(t*0.2+o.p);
        if(o.k===0){ctx.beginPath();ctx.arc(0,0,o.r,0,7);ctx.fill();} else if(o.k===1){ctx.beginPath();ctx.moveTo(-o.r,o.r);ctx.lineTo(0,-o.r);ctx.lineTo(o.r,o.r);ctx.closePath();ctx.fill();} else if(o.k===2){ctx.beginPath();ctx.arc(0,0,o.r,0,7);ctx.stroke();} else {ctx.beginPath();ctx.moveTo(-o.r,0);ctx.lineTo(o.r,0);ctx.moveTo(0,-o.r);ctx.lineTo(0,o.r);ctx.stroke();} ctx.restore(); } };
const cv = document.getElementById('fx-memphis');
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
