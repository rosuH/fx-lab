# Lightning (canvas)

> Jagged electric bolt crackles from top to cursor with blue glow flicker; dramatic, aggressive overlay.

- **id**: `lightning` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: lightning, lines, glow, canvas2d, overlay · **vibe**: dramatic, aggressive
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: lightning — Lightning (canvas) · license MIT -->
<canvas id="fx-lightning" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function lightning(ctx,w,h,t,mx,my,s){ ctx.fillStyle='#05060f';ctx.fillRect(0,0,w,h);s.acc=(s.acc||0)+1;if(!s.bolt||s.acc%30===0){s.bolt=[];let x=mx>=0?mx:w/2,y=0;while(y<h){s.bolt.push([x,y]);y+=h/14;x+=(Math.random()-0.5)*40;}}ctx.strokeStyle='rgba(150,190,255,'+(0.5+0.5*Math.sin(s.acc*0.5)).toFixed(2)+')';ctx.lineWidth=2;ctx.shadowBlur=12;ctx.shadowColor='#9bb8ff';ctx.beginPath();s.bolt.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.shadowBlur=0; };
const cv = document.getElementById('fx-lightning');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: low, mobileSafe: true. Persistent accumulator: Bolt path s.bolt and frame counter s.acc persist across frames Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Bolt path s.bolt and frame counter s.acc persist across frames; remount to reset.
