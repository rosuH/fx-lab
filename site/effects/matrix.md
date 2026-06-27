# Matrix Rain (canvas)

> Green Katakana glyphs cascade in columns on black; iconic hacker-terminal rain effect.

- **id**: `matrix` · **kind**: canvas · **section**: data-and-system
- **tags**: ascii, canvas2d, rain, trail, neon · **vibe**: retro, dramatic, technical
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: matrix — Matrix Rain (canvas) · license MIT -->
<canvas id="fx-matrix" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function matrix(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.cols=Math.floor(w/12);s.y=[];for(let i=0;i<s.cols;i++)s.y[i]=Math.random()*h;} ctx.fillStyle='rgba(2,8,4,0.16)';ctx.fillRect(0,0,w,h); ctx.font='13px monospace';
      for(let i=0;i<s.cols;i++){ const x=i*12; ctx.fillStyle='rgba(190,255,205,0.95)';ctx.fillText(String.fromCharCode(0x30A0+Math.floor(Math.random()*92)),x,s.y[i]); ctx.fillStyle='rgba(60,220,120,0.4)';ctx.fillText(String.fromCharCode(0x30A0+Math.floor(Math.random()*92)),x,s.y[i]-15); s.y[i]+=8; if(s.y[i]>h&&Math.random()>0.975)s.y[i]=0; } };
const cv = document.getElementById('fx-matrix');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Column y-positions and character trails accumulate via partial alpha clear Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Column y-positions and character trails accumulate via partial alpha clear; remount to reset.
