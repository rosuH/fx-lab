# Langton's Ant (canvas)

> A lone ant traces deterministic yellow highways on a black grid, growing complex structure from nothing.

- **id**: `langton` · **kind**: canvas · **section**: cellular-and-physics
- **tags**: cellular, grid, geometry, attractor, canvas2d, background · **vibe**: hypnotic, technical, geometric
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: langton — Langton's Ant (canvas) · license MIT -->
<canvas id="fx-langton" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function langton(ctx,w,h,t,mx,my,s){ const C=5,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(gw*gh);s.ax=gw>>1;s.ay=gh>>1;s.dir=0;ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);}for(let k=0;k<40;k++){const i=s.ay*gw+s.ax;if(s.g[i]){s.dir=(s.dir+3)%4;s.g[i]=0;}else{s.dir=(s.dir+1)%4;s.g[i]=1;}ctx.fillStyle=s.g[i]?'#ffcf5a':'#0a0a0a';ctx.fillRect(s.ax*C,s.ay*C,C,C);s.ax=(s.ax+[0,1,0,-1][s.dir]+gw)%gw;s.ay=(s.ay+[-1,0,1,0][s.dir]+gh)%gh;}ctx.fillStyle='#ff4a6a';ctx.fillRect(s.ax*C,s.ay*C,C,C); };
const cv = document.getElementById('fx-langton');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Persistent accumulator: Uint8Array cell grid and ant position accumulate; canvas is only partially redrawn each frame (no full clear). Reduced motion: freeze.

## Known limitations

- Accumulates state across frames — Uint8Array cell grid and ant position accumulate; canvas is only partially redrawn each frame (no full clear).; remount to reset.
