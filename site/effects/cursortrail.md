# Cursor Trail (canvas)

> Flowing rainbow streak follows the cursor across a dark canvas; playful, energetic overlay.

- **id**: `cursortrail` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: trail, particles, cursor, overlay, canvas2d · **vibe**: playful, energetic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: cursortrail — Cursor Trail (canvas) · license MIT -->
<canvas id="fx-cursortrail" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function cursortrail(ctx,w,h,t,mx,my,s){ if(!s.tr)s.tr=[];s.tr.push(mx>=0?[mx,my]:[w/2+Math.cos(t)*w*0.3,h/2+Math.sin(t*1.3)*h*0.3]);if(s.tr.length>40)s.tr.shift();ctx.fillStyle='#0a0b10';ctx.fillRect(0,0,w,h);ctx.lineCap='round';for(let i=1;i<s.tr.length;i++){const a=i/s.tr.length;ctx.strokeStyle='hsla('+((t*60+i*6)%360)+',90%,60%,'+a.toFixed(2)+')';ctx.lineWidth=a*8;ctx.beginPath();ctx.moveTo(s.tr[i-1][0],s.tr[i-1][1]);ctx.lineTo(s.tr[i][0],s.tr[i][1]);ctx.stroke();} };
const cv = document.getElementById('fx-cursortrail');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Trail point array s.tr accumulates cursor positions across frames Reduced motion: freeze.

## Known limitations

- Accumulates state across frames — Trail point array s.tr accumulates cursor positions across frames; remount to reset.
