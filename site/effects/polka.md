# Polka Dots (canvas)

> White polka dots gently breathing on vivid hot-pink; cheerful and playful pop-art pattern.

- **id**: `polka` · **kind**: canvas · **section**: geometry-and-curves
- **tags**: dots, geometry, grid, canvas2d, background · **vibe**: playful, energetic, retro
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: polka — Polka Dots (canvas) · license MIT -->
<canvas id="fx-polka" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function polka(ctx,w,h,t){ ctx.fillStyle='#e8366b';ctx.fillRect(0,0,w,h);ctx.fillStyle='#fff';const S=28; for(let row=0,y=0;y<h+S;row++,y+=S)for(let x=0;x<w+S;x+=S){const r=6+2*Math.sin(t*2+x*0.05+y*0.05);ctx.beginPath();ctx.arc(x+(row%2)*S/2,y,r,0,7);ctx.fill();} };
const cv = document.getElementById('fx-polka');
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
