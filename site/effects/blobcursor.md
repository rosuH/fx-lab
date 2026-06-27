# Gooey Blob (canvas)

> Pulsing purple gooey blob clings to the cursor with orbiting metaball satellites; playful, organic.

- **id**: `blobcursor` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: metaballs, fluid, cursor, overlay, canvas2d · **vibe**: playful, organic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: blobcursor — Gooey Blob (canvas) · license MIT -->
<canvas id="fx-blobcursor" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function blobcursor(ctx,w,h,t,mx,my,s){ if(!s.b){s.b=[];for(let i=0;i<6;i++)s.b.push({a:Math.random()*6,r:14+Math.random()*10});}const cx=mx>=0?mx:w/2+Math.cos(t)*40,cy=my>=0?my:h/2+Math.sin(t)*40,S=5;ctx.fillStyle='#0a0a12';ctx.fillRect(0,0,w,h);for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){let v=400/((x-cx)*(x-cx)+(y-cy)*(y-cy)+40);for(const b of s.b){const bx=cx+Math.cos(b.a+t)*b.r*2,by=cy+Math.sin(b.a+t*1.2)*b.r*2;v+=300/((x-bx)*(x-bx)+(y-by)*(y-by)+40);}if(v>1){const e=Math.min(1,(v-1)*3);ctx.fillStyle='rgb('+(120+e*130|0)+',60,'+(200+e*55|0)+')';ctx.fillRect(x,y,S,S);}} };
const cv = document.getElementById('fx-blobcursor');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
