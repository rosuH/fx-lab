# Lorenz (canvas)

> Electric-blue butterfly trace of the Lorenz attractor; calm chaotic orbit on dark navy.

- **id**: `lorenz` · **kind**: canvas · **section**: fractal-and-chaos
- **tags**: attractor, curves, geometry, trail · **vibe**: calm, ambient, technical, hypnotic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: lorenz — Lorenz (canvas) · license MIT -->
<canvas id="fx-lorenz" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function lorenz(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0.1;s.y=0;s.z=0;s.pts=[];} for(let i=0;i<8;i++){const dx=10*(s.y-s.x),dy=s.x*(28-s.z)-s.y,dz=s.x*s.y-8/3*s.z;s.x+=dx*0.008;s.y+=dy*0.008;s.z+=dz*0.008;s.pts.push([s.x,s.z]);} if(s.pts.length>900)s.pts.splice(0,s.pts.length-900); ctx.fillStyle='#05060a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#7fd0ff';ctx.lineWidth=1;ctx.globalAlpha=0.7;ctx.beginPath();for(let i=0;i<s.pts.length;i++){const p=s.pts[i],x=w/2+p[0]*w*0.018,y=h*0.92-p[1]*h*0.026;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.globalAlpha=1; };
const cv = document.getElementById('fx-lorenz');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Accumulates up to 900 XZ path points across frames. Reduced motion: freeze.

## Known limitations

- Accumulates state across frames — Accumulates up to 900 XZ path points across frames.; remount to reset.
