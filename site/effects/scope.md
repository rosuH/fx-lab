# Oscilloscope (canvas)

> Phosphor-green oscilloscope waveform glows on a dim CRT grid; calm technical atmosphere.

- **id**: `scope` · **kind**: canvas · **section**: data-and-system
- **tags**: oscilloscope, canvas2d, waves, glow, grid · **vibe**: calm, technical, retro
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: scope — Oscilloscope (canvas) · license MIT -->
<canvas id="fx-scope" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function scope(ctx,w,h,t){ ctx.fillStyle='#04140a';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(40,120,70,0.3)';ctx.lineWidth=1; for(let x=0;x<w;x+=w/8){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();} for(let y=0;y<h;y+=h/6){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
      ctx.strokeStyle='#7CFFB0';ctx.lineWidth=2;ctx.shadowBlur=8;ctx.shadowColor='#7CFFB0';ctx.beginPath(); for(let x=0;x<=w;x+=2){const u=x/w;const y=h/2+Math.sin(u*12+t*3)*h*0.18*Math.sin(t*0.7)+Math.sin(u*30+t*5)*h*0.07;x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke();ctx.shadowBlur=0; };
const cv = document.getElementById('fx-scope');
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
