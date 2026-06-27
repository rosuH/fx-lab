# LED Matrix (canvas)

> Amber LED dot grid ripples with a traveling sine wave; warm retro electronics glow.

- **id**: `ledmatrix` · **kind**: canvas · **section**: screen-and-signal
- **tags**: dots, grid, waves, neon, canvas2d, background · **vibe**: retro, technical, ambient
- **culture**: signal / electronics / display
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: ledmatrix — LED Matrix (canvas) · license MIT -->
<canvas id="fx-ledmatrix" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function ledmatrix(ctx,w,h,t){ ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);const C=9,gw=Math.ceil(w/C),gh=Math.ceil(h/C);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const on=0.5+0.5*Math.sin((x-gw/2)*0.3+(y-gh/2)*0.2-t*3);ctx.fillStyle='rgba(255,'+(80+on*120|0)+',20,'+(0.15+on*0.8).toFixed(2)+')';ctx.beginPath();ctx.arc(x*C+C/2,y*C+C/2,C*0.35,0,7);ctx.fill();}};
const cv = document.getElementById('fx-ledmatrix');
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
