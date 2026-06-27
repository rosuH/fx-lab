# Tunnel (canvas)

> Hypnotic blue checkerboard rushes toward you in an infinite demoscene tunnel flythrough.

- **id**: `tunnel` · **kind**: canvas · **section**: screen-and-signal
- **tags**: tunnel, geometry, grid, optical, canvas2d, background · **vibe**: hypnotic, retro
- **culture**: demoscene
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: tunnel — Tunnel (canvas) · license MIT -->
<canvas id="fx-tunnel" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function tunnel(ctx,w,h,t){ const S=4;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const dx=x-w/2,dy=y-h/2,a=Math.atan2(dy,dx),r=Math.hypot(dx,dy)||1,u=a/Math.PI*8,v=320/r+t*2,c=((Math.floor(u)+Math.floor(v))&1)?1:0.25,sh=Math.min(1,r/(w*0.5));ctx.fillStyle='rgb('+(c*120*sh|0)+','+(c*200*sh|0)+','+(c*255*sh|0)+')';ctx.fillRect(x,y,S,S);}};
const cv = document.getElementById('fx-tunnel');
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
