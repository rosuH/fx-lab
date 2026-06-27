# Girih (canvas)

> Dark ground of slowly rotating golden octagram lattice; elegant Islamic geometric meditation.

- **id**: `girih` · **kind**: canvas · **section**: world-patterns
- **tags**: geometry, tiling, mosaic, canvas2d, background · **vibe**: elegant, hypnotic, cultural
- **culture**: Islamic
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: girih — Girih (canvas) · license MIT
     accuracy: Procedural approximation of Islamic girih tiling; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-girih" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function girih(ctx,w,h,t){ ctx.fillStyle='#10130f';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(212,175,90,0.85)';ctx.lineWidth=1.3; const R=30,rot=t*0.06,S=R*1.7;
      for(let gy=0;gy<h+S;gy+=S)for(let gx=0;gx<w+S;gx+=S){ for(let q=0;q<2;q++){ ctx.beginPath(); for(let i=0;i<4;i++){const a=rot+q*Math.PI/4+i*Math.PI/2;const x=gx+Math.cos(a)*R,y=gy+Math.sin(a)*R;i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.closePath();ctx.stroke(); }
        ctx.beginPath(); for(let i=0;i<8;i++){const a=rot+i*Math.PI/4+Math.PI/8;const x=gx+Math.cos(a)*R*0.46,y=gy+Math.sin(a)*R*0.46;i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.closePath();ctx.stroke(); } };
const cv = document.getElementById('fx-girih');
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

- Procedural approximation of Islamic girih tiling; not a faithful reproduction of any specific historical motif.
