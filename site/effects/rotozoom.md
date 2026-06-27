# Rotozoom (canvas)

> Pink-and-dark checkerboard spins and zooms in and out; retro demoscene rotozoom.

- **id**: `rotozoom` · **kind**: canvas · **section**: screen-and-signal
- **tags**: geometry, grid, tiling, optical, canvas2d, background · **vibe**: hypnotic, retro, playful
- **culture**: demoscene
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: rotozoom — Rotozoom (canvas) · license MIT -->
<canvas id="fx-rotozoom" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function rotozoom(ctx,w,h,t){ const S=4,zoom=1.5+Math.sin(t*0.5)*0.8,ca=Math.cos(t*0.3)*zoom,sa=Math.sin(t*0.3)*zoom;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const u=((x-w/2)*ca-(y-h/2)*sa)|0,v=((x-w/2)*sa+(y-h/2)*ca)|0,c=((u>>4)+(v>>4))&1;ctx.fillStyle=c?'#ff5a8a':'#1a1030';ctx.fillRect(x,y,S,S);}};
const cv = document.getElementById('fx-rotozoom');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Reduced motion: freeze.

## Known limitations

- None noted.
