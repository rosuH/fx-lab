# Neon Pipes (canvas)

> Six glowing neon sine waves undulate in cyan, magenta, and lime; retro, energetic background.

- **id**: `neonpipes` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: neon, waves, lines, glow, canvas2d, background · **vibe**: retro, energetic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: neonpipes — Neon Pipes (canvas) · license MIT -->
<canvas id="fx-neonpipes" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function neonpipes(ctx,w,h,t){ ctx.fillStyle='#08040f';ctx.fillRect(0,0,w,h);const cols=['#00fff0','#ff00aa','#aaff00','#00aaff'];ctx.lineWidth=3;ctx.lineCap='round';for(let i=0;i<6;i++){ctx.strokeStyle=cols[i%4];ctx.shadowBlur=10;ctx.shadowColor=cols[i%4];ctx.beginPath();for(let x=0;x<=w;x+=8){const y=h*(i+1)/7+Math.sin(x*0.03+t*1.5+i)*18;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.shadowBlur=0; };
const cv = document.getElementById('fx-neonpipes');
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
