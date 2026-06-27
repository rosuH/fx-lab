# Water Ripple (canvas)

> Blue water ripples spread from cursor touch across a CPU-simulated height field; calm, fluid.

- **id**: `ripplewater` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: ripple, waves, fluid, canvas2d, overlay · **vibe**: calm, organic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: ripplewater — Water Ripple (canvas) · license MIT -->
<canvas id="fx-ripplewater" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function ripplewater(ctx,w,h,t,mx,my,s){ const C=6,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.a||s.gw!==gw){s.gw=gw;s.gh=gh;s.a=new Float32Array(gw*gh);s.b=new Float32Array(gw*gh);}const di=mx>=0?Math.floor(my/C)*gw+Math.floor(mx/C):(Math.floor(gh/2+Math.sin(t*2)*gh*0.3))*gw+Math.floor(gw/2+Math.cos(t*2)*gw*0.3);if(di>=0&&di<s.a.length)s.a[di]=320;for(let y=1;y<gh-1;y++)for(let x=1;x<gw-1;x++){const i=y*gw+x;s.b[i]=((s.a[i-1]+s.a[i+1]+s.a[i-gw]+s.a[i+gw])/2-s.b[i])*0.95;}const tmp=s.a;s.a=s.b;s.b=tmp;ctx.fillStyle='#04101c';ctx.fillRect(0,0,w,h);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.a[y*gw+x];if(Math.abs(v)>2){const c=Math.min(255,128+v);ctx.fillStyle='rgb('+(c*0.3|0)+','+(c*0.7|0)+','+(c|0)+')';ctx.fillRect(x*C,y*C,C,C);}} };
const cv = document.getElementById('fx-ripplewater');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Persistent accumulator: Two Float32Array height field buffers s.a and s.b swap and accumulate wave energy across frames Reduced motion: freeze.

## Known limitations

- Accumulates state across frames — Two Float32Array height field buffers s.a and s.b swap and accumulate wave energy across frames; remount to reset.
