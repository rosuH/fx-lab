# Fractal Tree (canvas)

> Wind-blown fractal tree sways gently; organic green branches on dark, calm and alive.

- **id**: `fractaltree` · **kind**: canvas · **section**: fractal-and-chaos
- **tags**: fractal, curves, geometry, lines · **vibe**: calm, organic, ambient
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: fractaltree — Fractal Tree (canvas) · license MIT -->
<canvas id="fx-fractaltree" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function fractaltree(ctx,w,h,t){ ctx.fillStyle='#0a0c0a';ctx.fillRect(0,0,w,h);const ang=0.35+Math.sin(t*0.6)*0.25;const br=(x,y,len,a,d)=>{if(d>9||len<2)return;const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;ctx.strokeStyle='hsl('+(110+d*8)+','+(50+d*4)+'%,'+(30+d*5)+'%)';ctx.lineWidth=10-d;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke();br(x2,y2,len*0.74,a-ang,d+1);br(x2,y2,len*0.74,a+ang,d+1);};br(w/2,h-6,h*0.22,-1.5708,0); };
const cv = document.getElementById('fx-fractaltree');
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
