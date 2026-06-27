# Koru (canvas)

> Cream fern spirals slowly uncoil across a dark forest ground; meditative Māori koru motif.

- **id**: `koru` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: spiral, geometry, canvas2d, background · **vibe**: meditative, organic, cultural
- **culture**: Maori
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: koru — Koru (canvas) · license MIT
     accuracy: Procedural approximation of Māori Koru spiral motif; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-koru" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function koru(ctx,w,h,t){ ctx.fillStyle='#0a1410';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#e8e0cf';ctx.lineWidth=3;ctx.lineCap='round';const S=78;for(let y=0;y<h+S;y+=S)for(let x=0;x<w+S;x+=S){ctx.beginPath();for(let a=0;a<6.5;a+=0.1){const r=a*3+2,px=x+Math.cos(a+t*0.3)*r,py=y+Math.sin(a+t*0.3)*r;a?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();}};
const cv = document.getElementById('fx-koru');
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

- Procedural approximation of Māori Koru spiral motif; not a faithful reproduction of any specific historical motif.
