# EKG Monitor (canvas)

> Green heartbeat trace scrolls across a dark grid; tense clinical EKG monitor simulation.

- **id**: `ekg` · **kind**: canvas · **section**: screen-and-signal
- **tags**: oscilloscope, grid, lines, canvas2d, inline, overlay · **vibe**: technical, dramatic, minimal
- **culture**: signal / medical
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: ekg — EKG Monitor (canvas) · license MIT -->
<canvas id="fx-ekg" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function ekg(ctx,w,h,t){ ctx.fillStyle='#04100a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(60,140,90,0.25)';ctx.lineWidth=1;for(let x=0;x<w;x+=18){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}ctx.strokeStyle='#5fff90';ctx.lineWidth=2;ctx.shadowBlur=8;ctx.shadowColor='#5fff90';ctx.beginPath();for(let x=0;x<=w;x+=2){const p=((x/w*3-t*0.5)%1+1)%1;let y=h/2;if(p>=0.5&&p<0.55)y-=h*0.02;else if(p>=0.55&&p<0.59)y-=h*0.33;else if(p>=0.59&&p<0.63)y+=h*0.17;else if(p>=0.63&&p<0.69)y-=h*0.04;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.shadowBlur=0;};
const cv = document.getElementById('fx-ekg');
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
