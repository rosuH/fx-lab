# ASCII Field (canvas)

> Blue-purple ASCII characters pulse in sine-wave brightness waves; retro terminal glow.

- **id**: `ascii` · **kind**: canvas · **section**: post-and-print
- **tags**: ascii, canvas2d, waves, neon · **vibe**: retro, energetic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: ascii — ASCII Field (canvas) · license MIT -->
<canvas id="fx-ascii" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function ascii(ctx,w,h,t){ ctx.fillStyle='#0a0b0d';ctx.fillRect(0,0,w,h); const ramp=' .:-=+*#%@';ctx.font='12px monospace';ctx.textBaseline='top'; const S=11;
      for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ const u=x/w,v=y/h; const n=0.5+0.5*Math.sin(u*8+t)*Math.cos(v*8-t*0.7)+0.3*Math.sin((u+v)*12+t*1.4); const b=Math.max(0,Math.min(1,n)); ctx.fillStyle='rgba(120,'+(180+b*60|0)+',255,'+(0.3+b*0.7).toFixed(2)+')'; ctx.fillText(ramp[Math.floor(b*(ramp.length-1))],x,y); } };
const cv = document.getElementById('fx-ascii');
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
