# Quasicrystal (canvas)

> Shimmering five-fold crystal interference; blue-purple moiré tiles slowly pulse and breathe.

- **id**: `quasicrystal` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: moire, optical, geometry, noise, canvas2d, background · **vibe**: hypnotic, psychedelic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: quasicrystal — Quasicrystal (canvas) · license MIT -->
<canvas id="fx-quasicrystal" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function quasicrystal(ctx,w,h,t){ const S=3; for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ let v=0; for(let i=0;i<5;i++){const a=i*Math.PI/5; v+=Math.cos((x*Math.cos(a)+y*Math.sin(a))*0.07+t);} const c=Math.sin(v)*0.5+0.5; ctx.fillStyle='rgb('+(c*255|0)+','+(c*150|0)+','+((1-c)*255|0)+')'; ctx.fillRect(x,y,S,S);} };
const cv = document.getElementById('fx-quasicrystal');
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
