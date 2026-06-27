# Doom Fire (canvas)

> Roiling orange-red fire climbs from a white-hot base; retro demoscene flame in warm pixel blocks.

- **id**: `doomfire` · **kind**: canvas · **section**: cellular-and-physics
- **tags**: fire, particles, noise, trail, pixel, canvas2d, background · **vibe**: dramatic, aggressive, retro, energetic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: doomfire — Doom Fire (canvas) · license MIT -->
<canvas id="fx-doomfire" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function doomfire(ctx,w,h,t,mx,my,s){ const C=4,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.p||s.gw!==gw){s.gw=gw;s.gh=gh;s.p=new Uint8Array(gw*gh);for(let x=0;x<gw;x++)s.p[(gh-1)*gw+x]=36;s.pal=[];for(let i=0;i<37;i++){const f=i/36;s.pal.push('rgb('+Math.min(255,f*510|0)+','+Math.min(255,f*f*400|0)+','+(f>0.7?(f-0.7)*600|0:0)+')');}}for(let x=0;x<gw;x++)for(let y=1;y<gh;y++){const src=y*gw+x,r=Math.random(),dst=src-gw+(r<0.5?-1:r<0.66?1:0),nv=Math.max(0,s.p[src]-(r<0.4?1:0));if(dst>=0)s.p[dst]=nv;}ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.p[y*gw+x];if(v>0){ctx.fillStyle=s.pal[v];ctx.fillRect(x*C,y*C,C,C);}} };
const cv = document.getElementById('fx-doomfire');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Persistent accumulator: Uint8Array heat-propagation grid accumulates upward each frame; bottom row stays at max heat. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Uint8Array heat-propagation grid accumulates upward each frame; bottom row stays at max heat.; remount to reset.
