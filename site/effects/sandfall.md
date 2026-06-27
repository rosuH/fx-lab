# Falling Sand (canvas)

> Colorful sand grains pour from the cursor and settle into dunes; playful particle physics.

- **id**: `sandfall` · **kind**: canvas · **section**: cellular-and-physics
- **tags**: particles, cellular, grid, dots, canvas2d, background · **vibe**: playful, organic, ambient
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor true, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: sandfall — Falling Sand (canvas) · license MIT -->
<canvas id="fx-sandfall" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function sandfall(ctx,w,h,t,mx,my,s){ const C=4,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(gw*gh);}const sx=mx>=0?Math.floor(mx/C):gw>>1;for(let k=-1;k<=1;k++){const xx=sx+k;if(xx>=0&&xx<gw)s.g[xx]=1+Math.floor(Math.random()*5);}for(let y=gh-2;y>=0;y--)for(let x=0;x<gw;x++){const i=y*gw+x;if(s.g[i]){if(!s.g[(y+1)*gw+x])s.g[(y+1)*gw+x]=s.g[i],s.g[i]=0;else{const dir=Math.random()<0.5?-1:1,bx=x+dir;if(bx>=0&&bx<gw&&!s.g[(y+1)*gw+bx]){s.g[(y+1)*gw+bx]=s.g[i];s.g[i]=0;}}}}ctx.fillStyle='#0a0a0c';ctx.fillRect(0,0,w,h);const cols=['','#ff6b5a','#ffd23f','#34d1c4','#7b6cf6','#ff8f3f'];for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.g[y*gw+x];if(v){ctx.fillStyle=cols[v];ctx.fillRect(x*C,y*C,C,C);}} };
const cv = document.getElementById('fx-sandfall');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Persistent accumulator: Uint8Array particle grid accumulates settled grains each frame; dunes grow until canvas is full. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Uint8Array particle grid accumulates settled grains each frame; dunes grow until canvas is full.; remount to reset.
