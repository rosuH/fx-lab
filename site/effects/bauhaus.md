# Bauhaus (canvas)

> Bold Bauhaus shapes — blue circle, red arc, yellow triangle — slow-turn in primary colours.

- **id**: `bauhaus` · **kind**: canvas · **section**: design-movements
- **tags**: geometry, canvas2d, curves, lines · **vibe**: elegant, geometric, minimal
- **culture**: Bauhaus / design movement
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: bauhaus — Bauhaus (canvas) · license MIT -->
<canvas id="fx-bauhaus" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function bauhaus(ctx,w,h,t){ ctx.fillStyle='#e8e2d4';ctx.fillRect(0,0,w,h); const a=t*0.3,M=Math.min(w,h);
      ctx.fillStyle='#2b4a9b';ctx.beginPath();ctx.arc(w*0.32,h*0.4,M*0.26,0,7);ctx.fill();
      ctx.save();ctx.translate(w*0.7,h*0.62);ctx.rotate(a);ctx.fillStyle='#d23b2a';ctx.beginPath();ctx.arc(0,0,M*0.2,0,Math.PI);ctx.fill();ctx.restore();
      ctx.fillStyle='#e8b53a';ctx.beginPath();ctx.moveTo(w*0.55,h*0.08);ctx.lineTo(w*0.82,h*0.08);ctx.lineTo(w*0.55,h*0.42);ctx.closePath();ctx.fill();
      ctx.fillStyle='#1a1a1a';ctx.fillRect(w*0.1,h*0.76,w*0.8,6);ctx.fillRect(w*0.12,h*0.86,w*0.46,6); };
const cv = document.getElementById('fx-bauhaus');
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
