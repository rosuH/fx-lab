# Seigaiha (canvas)

> Serene overlapping blue-white wave fans tile the screen; calm Japanese oceanic elegance.

- **id**: `seigaiha` · **kind**: canvas · **section**: world-patterns
- **tags**: waves, tiling, geometry, canvas2d, background · **vibe**: calm, elegant, cultural
- **culture**: Japan
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: seigaiha — Seigaiha (canvas) · license MIT
     accuracy: Procedural approximation of Japanese Seigaiha wave tiling; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-seigaiha" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function seigaiha(ctx,w,h,t){ ctx.fillStyle='#0d1b2a';ctx.fillRect(0,0,w,h); const R=26,sx=R,sy=R*0.62,ph=t*0.4; ctx.lineWidth=2;
      for(let row=0,y=0;y<h+R;row++,y+=sy){ const off=(row%2)*sx; for(let x=-R;x<w+R;x+=sx*2){ const cx=x+off,cy=y+Math.sin(x*0.02+ph)*2;
        for(let k=4;k>=1;k--){ const rr=R*k/4; ctx.strokeStyle=(k%2)?'rgba(120,190,230,0.95)':'rgba(225,238,247,0.85)'; ctx.beginPath();ctx.arc(cx,cy,rr,Math.PI,Math.PI*2);ctx.stroke(); } } } };
const cv = document.getElementById('fx-seigaiha');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Reduced motion: freeze.

## Known limitations

- Procedural approximation of Japanese Seigaiha wave tiling; not a faithful reproduction of any specific historical motif.
