# Op-Art Moiré (canvas)

> Black-and-white concentric rings create a dizzying moiré illusion; cursor shifts the offset.

- **id**: `opart` · **kind**: canvas · **section**: design-movements
- **tags**: moire, canvas2d, optical, rings, geometry · **vibe**: hypnotic, geometric
- **culture**: Op-Art / optical illusion
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: opart — Op-Art Moiré (canvas) · license MIT -->
<canvas id="fx-opart" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function opart(ctx,w,h,t,mx,my){ ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h); const cx=mx>=0?mx:w*0.5+Math.sin(t*0.6)*w*0.22, cy=my>=0?my:h*0.5+Math.cos(t*0.5)*h*0.22; const R=Math.hypot(w,h);
      ctx.lineWidth=7;ctx.strokeStyle='#0a0a0a'; for(let r=4;r<R;r+=14){ctx.beginPath();ctx.arc(w*0.5,h*0.5,r,0,7);ctx.stroke();}
      ctx.globalCompositeOperation='difference';ctx.strokeStyle='#fff'; for(let r=4;r<R;r+=14){ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();} ctx.globalCompositeOperation='source-over'; };
const cv = document.getElementById('fx-opart');
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
