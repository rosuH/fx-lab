# Celtic Knot (canvas)

> Glowing green interlace arcs weave across a dark field with a flowing animated dash; hypnotic.

- **id**: `celtic` · **kind**: canvas · **section**: world-patterns
- **tags**: knot, weave, geometry, canvas2d, background · **vibe**: hypnotic, elegant, cultural
- **culture**: Celtic
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: celtic — Celtic Knot (canvas) · license MIT
     accuracy: Procedural approximation of Celtic knotwork interlace; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-celtic" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function celtic(ctx,w,h,t){ ctx.fillStyle='#0c1410';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(120,225,170,0.9)';ctx.lineWidth=3.2;ctx.lineCap='round'; ctx.setLineDash([15,9]);ctx.lineDashOffset=-t*22; const C=34;
      for(let y=0;y<h+C;y+=C)for(let x=0;x<w+C;x+=C){ const o=(((x/C)+(y/C))%2===0); ctx.beginPath(); if(o){ctx.arc(x,y,C*0.5,0,Math.PI*0.5);ctx.moveTo(x+C,y+C);ctx.arc(x+C,y+C,C*0.5,Math.PI,Math.PI*1.5);} else {ctx.arc(x+C,y,C*0.5,Math.PI*0.5,Math.PI);ctx.moveTo(x,y+C);ctx.arc(x,y+C,C*0.5,Math.PI*1.5,Math.PI*2);} ctx.stroke(); } ctx.setLineDash([]); };
const cv = document.getElementById('fx-celtic');
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

- Procedural approximation of Celtic knotwork interlace; not a faithful reproduction of any specific historical motif.
