# Dragon Curve (canvas)

> Purple dragon-curve fractal slowly rotates; clean self-similar line on dark violet.

- **id**: `dragon` · **kind**: canvas · **section**: fractal-and-chaos
- **tags**: fractal, curves, geometry, lines · **vibe**: minimal, geometric, hypnotic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: dragon — Dragon Curve (canvas) · license MIT -->
<canvas id="fx-dragon" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function dragon(ctx,w,h,t,mx,my,s){ if(!s.seq){let seq=[1];for(let g=0;g<11;g++){const rev=seq.slice().reverse().map(v=>v?0:1);seq=seq.concat([1],rev);}s.seq=seq;} ctx.fillStyle='#0b0a14';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#a98bff';ctx.lineWidth=1;let x=w*0.62,y=h*0.42,dir=Math.PI+t*0.05;ctx.beginPath();ctx.moveTo(x,y);for(const turn of s.seq){dir+=turn?1.5708:-1.5708;x+=Math.cos(dir)*3.2;y+=Math.sin(dir)*3.2;ctx.lineTo(x,y);}ctx.stroke(); };
const cv = document.getElementById('fx-dragon');
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
