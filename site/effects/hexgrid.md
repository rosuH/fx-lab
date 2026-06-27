# Hex Grid (canvas)

> Pulsing blue honeycomb grid; a rippling brightness wave sweeps across hex cells.

- **id**: `hexgrid` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: hexgrid, geometry, grid, waves, canvas2d, background · **vibe**: technical, futuristic, ambient
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: hexgrid — Hex Grid (canvas) · license MIT -->
<canvas id="fx-hexgrid" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function hexgrid(ctx,w,h,t){ ctx.fillStyle='#0a0d12';ctx.fillRect(0,0,w,h);const R=17,SQ=Math.sqrt(3); ctx.lineWidth=1.2; for(let row=0,y=0;y<h+R;row++,y+=R*1.5)for(let x=0;x<w+R;x+=R*SQ){const cx=x+(row%2)*R*SQ/2,cy=y,ph=0.5+0.5*Math.sin(t*2-(cx+cy)*0.02); ctx.strokeStyle='rgba(100,210,255,'+(0.2+ph*0.6).toFixed(2)+')';ctx.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6;i?ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R):ctx.moveTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);}ctx.closePath();ctx.stroke();} };
const cv = document.getElementById('fx-hexgrid');
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

- None noted.
