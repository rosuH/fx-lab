# Loaders (canvas)

> Six loading spinner variants — arc, tick, pulse, ring, bar, fade — minimal, technical demo.

- **id**: `spinners` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: loader, dots, geometry, canvas2d · **vibe**: minimal, technical
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: spinners — Loaders (canvas) · license MIT -->
<canvas id="fx-spinners" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function spinners(ctx,w,h,t){ ctx.fillStyle='#0c0d12';ctx.fillRect(0,0,w,h);const pts=[[0.25,0.32],[0.5,0.32],[0.75,0.32],[0.25,0.68],[0.5,0.68],[0.75,0.68]];ctx.lineCap='round';pts.forEach((p,i)=>{const cx=p[0]*w,cy=p[1]*h,R=Math.min(w,h)*0.09;ctx.strokeStyle='#7fd0ff';ctx.lineWidth=3;if(i===0){ctx.beginPath();ctx.arc(cx,cy,R,t*3,t*3+4);ctx.stroke();}else if(i===1){for(let k=0;k<8;k++){ctx.globalAlpha=((k+Math.floor(t*8))%8)/8;ctx.beginPath();ctx.moveTo(cx+Math.cos(k*0.785)*R*0.5,cy+Math.sin(k*0.785)*R*0.5);ctx.lineTo(cx+Math.cos(k*0.785)*R,cy+Math.sin(k*0.785)*R);ctx.stroke();}ctx.globalAlpha=1;}else if(i===2){ctx.fillStyle='#7fd0ff';for(let k=0;k<3;k++){ctx.globalAlpha=0.5+0.5*Math.sin(t*4-k*0.6);ctx.beginPath();ctx.arc(cx+(k-1)*12,cy,4,0,7);ctx.fill();}ctx.globalAlpha=1;}else if(i===3){ctx.strokeStyle='rgba(127,208,255,0.2)';ctx.beginPath();ctx.arc(cx,cy,R,0,6.28);ctx.stroke();ctx.strokeStyle='#7fd0ff';ctx.beginPath();ctx.arc(cx,cy,R,t*3,t*3+1.8);ctx.stroke();}else if(i===4){ctx.save();ctx.translate(cx,cy);ctx.rotate(t*3);ctx.fillStyle='#7fd0ff';ctx.fillRect(-R*0.6,-3,R*1.2,6);ctx.restore();}else{ctx.fillStyle='#7fd0ff';ctx.globalAlpha=Math.abs(Math.sin(t*3));ctx.beginPath();ctx.arc(cx,cy,R*0.7,0,7);ctx.fill();ctx.globalAlpha=1;}}); };
const cv = document.getElementById('fx-spinners');
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
