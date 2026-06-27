# Concentric (canvas)

> Rainbow concentric squares scrolling outward from center; bold, cycling hue tunnel effect.

- **id**: `concentric` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: geometry, rings, optical, grid, canvas2d, background · **vibe**: psychedelic, energetic, hypnotic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: concentric — Concentric (canvas) · license MIT -->
<canvas id="fx-concentric" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function concentric(ctx,w,h,t){ ctx.fillStyle='#120a0a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,M=Math.max(w,h); for(let i=0;i<26;i++){const s=(i*14+t*20)%M; ctx.strokeStyle='hsl('+((i*12+t*30)%360)+',65%,58%)';ctx.lineWidth=4;ctx.strokeRect(cx-s/2,cy-s/2,s,s);} };
const cv = document.getElementById('fx-concentric');
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
