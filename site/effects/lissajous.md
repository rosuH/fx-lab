# Lissajous (canvas)

> Glowing green Lissajous figure cycling through phase; oscilloscope curve on dark background.

- **id**: `lissajous` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: curves, oscilloscope, geometry, lines, canvas2d, background · **vibe**: hypnotic, technical, minimal
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: lissajous — Lissajous (canvas) · license MIT -->
<canvas id="fx-lissajous" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function lissajous(ctx,w,h,t){ ctx.fillStyle='#0a0e0a';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,A=w*0.4,B=h*0.4; ctx.strokeStyle='#9CFF6A';ctx.lineWidth=1.5;ctx.shadowBlur=6;ctx.shadowColor='#9CFF6A';ctx.beginPath(); for(let i=0;i<=600;i++){const u=i/600*6.2831;i?ctx.lineTo(cx+Math.sin(u*3+t)*A,cy+Math.sin(u*4)*B):ctx.moveTo(cx+Math.sin(u*3+t)*A,cy+Math.sin(u*4)*B);} ctx.stroke();ctx.shadowBlur=0; };
const cv = document.getElementById('fx-lissajous');
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
