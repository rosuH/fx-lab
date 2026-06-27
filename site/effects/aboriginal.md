# Dot Painting (canvas)

> Warm earth-tone concentric dot rings orbit fixed anchors on dark brown; organic and meditative.

- **id**: `aboriginal` · **kind**: canvas · **section**: world-patterns
- **tags**: dots, geometry, canvas2d, background · **vibe**: meditative, organic, cultural
- **culture**: Aboriginal Australian
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: aboriginal — Dot Painting (canvas) · license MIT
     accuracy: Procedural approximation of Aboriginal Australian dot painting; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-aboriginal" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function aboriginal(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.c=[];for(let i=0;i<6;i++)s.c.push({x:Math.random()*w,y:Math.random()*h});} ctx.fillStyle='#2a1a0f';ctx.fillRect(0,0,w,h); const cols=['#e8b04b','#d9763a','#ece0cf','#b5472a','#7a3b1f'];
      for(const c of s.c){ for(let ring=0;ring<6;ring++){ const rad=7+ring*9; const n=Math.max(6,Math.floor(rad*0.7)); for(let i=0;i<n;i++){ const a=i/n*6.2831+ring*0.3+t*0.12*(ring%2?1:-1); ctx.fillStyle=cols[(ring+i)%cols.length]; ctx.beginPath();ctx.arc(c.x+Math.cos(a)*rad,c.y+Math.sin(a)*rad,2.0,0,7);ctx.fill(); } } } };
const cv = document.getElementById('fx-aboriginal');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Dot centre positions generated once on first frame via Math.random. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Procedural approximation of Aboriginal Australian dot painting; not a faithful reproduction of any specific historical motif.
- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Dot centre positions generated once on first frame via Math.random.; remount to reset.
