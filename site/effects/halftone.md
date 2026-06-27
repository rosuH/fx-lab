# Halftone CMYK (canvas)

> Warm CMYK halftone dots bloom from cursor position; editorial print-design feel.

- **id**: `halftone` · **kind**: canvas · **section**: post-and-print
- **tags**: halftone, dots, canvas2d, geometry · **vibe**: elegant, retro
- **culture**: print / design
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: halftone — Halftone CMYK (canvas) · license MIT -->
<canvas id="fx-halftone" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function halftone(ctx,w,h,t,mx,my){ ctx.fillStyle='#f4f1ea';ctx.fillRect(0,0,w,h); const cx=mx>=0?mx:w*0.5+Math.sin(t*0.5)*w*0.25, cy=my>=0?my:h*0.5+Math.cos(t*0.4)*h*0.25; const screens=[['rgba(0,170,235,0.8)',2,1],['rgba(236,0,140,0.72)',6,4],['rgba(255,210,0,0.78)',4,7]]; const S=10,maxd=Math.hypot(w,h)*0.62;
      ctx.globalCompositeOperation='multiply'; for(const sc of screens){ ctx.fillStyle=sc[0]; for(let y=sc[2];y<h;y+=S)for(let x=sc[1];x<w;x+=S){ const v=Math.max(0,1-Math.hypot(x-cx,y-cy)/maxd); const rad=v*S*0.62; if(rad>0.3){ctx.beginPath();ctx.arc(x,y,rad,0,7);ctx.fill();} } } ctx.globalCompositeOperation='source-over'; };
const cv = document.getElementById('fx-halftone');
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
