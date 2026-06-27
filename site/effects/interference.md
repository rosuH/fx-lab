# Interference (canvas)

> Blue interference fringes from two point-sources pulsing across canvas; hypnotic wave moiré.

- **id**: `interference` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: moire, waves, optical, noise, canvas2d, background · **vibe**: hypnotic, technical, psychedelic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: interference — Interference (canvas) · license MIT -->
<canvas id="fx-interference" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function interference(ctx,w,h,t){ const S=4,s1x=w*0.35,s1y=h*0.5,s2x=w*0.65+Math.sin(t)*20,s2y=h*0.5; for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const v=Math.sin(Math.hypot(x-s1x,y-s1y)*0.2-t*3)+Math.sin(Math.hypot(x-s2x,y-s2y)*0.2-t*3),c=(v*0.25+0.5)*255|0; ctx.fillStyle='rgb('+(c*0.3|0)+','+(c*0.7|0)+','+c+')';ctx.fillRect(x,y,S,S);} };
const cv = document.getElementById('fx-interference');
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
