# Ruyi Cloud (canvas)

> Crimson field of pulsing five-lobed cloud medallions; festive and elegant Chinese folk pattern.

- **id**: `cloud` · **kind**: canvas · **section**: world-patterns-ii
- **tags**: curves, geometry, tiling, canvas2d, background · **vibe**: elegant, cultural, calm
- **culture**: China
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: cloud — Ruyi Cloud (canvas) · license MIT
     accuracy: Procedural approximation of Chinese Ruyi cloud patterns; not a faithful reproduction of any specific historical motif. -->
<canvas id="fx-cloud" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function cloud(ctx,w,h,t){ ctx.fillStyle='#7a1420';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffcf5a';ctx.lineWidth=2.5;const S=60;for(let y=S/2;y<h+S;y+=S)for(let x=S/2;x<w+S;x+=S){ctx.beginPath();for(let a=0;a<6.2831;a+=0.15){const r=S*0.3*(1+0.32*Math.sin(a*5+t*0.5));const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;a?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(x,y,S*0.1,0,7);ctx.stroke();}};
const cv = document.getElementById('fx-cloud');
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

- Procedural approximation of Chinese Ruyi cloud patterns; not a faithful reproduction of any specific historical motif.
