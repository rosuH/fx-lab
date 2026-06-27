# Iron Filings (canvas)

> Tiny iron filings snap to magnetic field lines emanating from the cursor; geometric, hypnotic.

- **id**: `ironfilings` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: lines, geometry, flow, cursor, overlay, canvas2d · **vibe**: geometric, hypnotic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: ironfilings — Iron Filings (canvas) · license MIT -->
<canvas id="fx-ironfilings" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function ironfilings(ctx,w,h,t,mx,my){ ctx.fillStyle='#0c0c0e';ctx.fillRect(0,0,w,h);const cx=mx>=0?mx:w/2+Math.cos(t)*w*0.2,cy=my>=0?my:h/2;ctx.strokeStyle='rgba(200,210,230,0.6)';ctx.lineWidth=1.2;const S=16;for(let y=S/2;y<h;y+=S)for(let x=S/2;x<w;x+=S){const a=Math.atan2(y-cy,x-cx)+Math.PI/2;ctx.beginPath();ctx.moveTo(x-Math.cos(a)*6,y-Math.sin(a)*6);ctx.lineTo(x+Math.cos(a)*6,y+Math.sin(a)*6);ctx.stroke();} };
const cv = document.getElementById('fx-ironfilings');
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
