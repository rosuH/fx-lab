# Ink Wash (canvas)

> Soft ink blobs drift on cream paper; hover to drop a brushstroke wash at the cursor.

- **id**: `inkwash` · **kind**: canvas · **section**: world-patterns
- **tags**: ink, canvas2d, background, overlay · **vibe**: calm, meditative, cultural, minimal
- **culture**: China
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: inkwash — Ink Wash (canvas) · license MIT
     accuracy: Procedural approximation of Chinese ink wash painting; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-inkwash" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function inkwash(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.b=[];for(let i=0;i<5;i++)s.b.push({x:Math.random()*w,y:Math.random()*h,r:24+Math.random()*40,p:Math.random()*6});} ctx.fillStyle='#f3efe6';ctx.fillRect(0,0,w,h);
      for(const b of s.b){ const cx=b.x+Math.sin(t*0.2+b.p)*22,cy=b.y+Math.cos(t*0.17+b.p)*16; const g=ctx.createRadialGradient(cx,cy,0,cx,cy,b.r); g.addColorStop(0,'rgba(18,18,22,0.5)');g.addColorStop(0.6,'rgba(28,28,34,0.2)');g.addColorStop(1,'rgba(40,40,46,0)'); ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,b.r,0,7);ctx.fill(); }
      if(mx>=0){ const g=ctx.createRadialGradient(mx,my,0,mx,my,42);g.addColorStop(0,'rgba(8,8,12,0.55)');g.addColorStop(1,'rgba(8,8,12,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(mx,my,42,0,7);ctx.fill(); } };
const cv = document.getElementById('fx-inkwash');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Ink blob positions generated once on first frame via Math.random. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Procedural approximation of Chinese ink wash painting; not a faithful reproduction of any specific historical motif.
- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Ink blob positions generated once on first frame via Math.random.; remount to reset.
