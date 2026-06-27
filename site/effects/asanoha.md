# Asanoha (canvas)

> Crisp blue-white hemp-leaf hexagonal lattice on indigo; serene Japanese textile geometry.

- **id**: `asanoha` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: geometry, tiling, grid, canvas2d, background · **vibe**: minimal, elegant, cultural
- **culture**: Japan
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: asanoha — Asanoha (canvas) · license MIT
     accuracy: Procedural approximation of Japanese Asanoha hemp-leaf tiling; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-asanoha" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function asanoha(ctx,w,h,t){ ctx.fillStyle='#10243a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(150,200,235,0.7)';ctx.lineWidth=1;const R=24,SQ=Math.sqrt(3);for(let row=0,y=0;y<h+R;row++,y+=R*1.5)for(let x=0;x<w+R;x+=R*SQ){const cx=x+(row%2)*R*SQ/2,cy=y;for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.lineTo(cx+Math.cos(a+Math.PI/3)*R,cy+Math.sin(a+Math.PI/3)*R);ctx.stroke();}}};
const cv = document.getElementById('fx-asanoha');
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

- Procedural approximation of Japanese Asanoha hemp-leaf tiling; not a faithful reproduction of any specific historical motif.
