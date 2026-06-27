# Radar Sweep (canvas)

> Phosphor-green radar sweep rotates over range rings on dark; tense sci-fi monitor.

- **id**: `radar` · **kind**: canvas · **section**: screen-and-signal
- **tags**: radar, geometry, rings, canvas2d, background, overlay · **vibe**: technical, futuristic, dramatic
- **culture**: signal / military / sci-fi
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: radar — Radar Sweep (canvas) · license MIT -->
<canvas id="fx-radar" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function radar(ctx,w,h,t){ ctx.fillStyle='#04140a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,R=Math.min(w,h)*0.46;ctx.strokeStyle='rgba(80,255,140,0.3)';for(let i=1;i<=4;i++){ctx.beginPath();ctx.arc(cx,cy,R*i/4,0,7);ctx.stroke();}const a=t*1.2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,a-0.85,a);ctx.closePath();ctx.fillStyle='rgba(80,255,140,0.16)';ctx.fill();ctx.strokeStyle='#5fff90';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();};
const cv = document.getElementById('fx-radar');
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
