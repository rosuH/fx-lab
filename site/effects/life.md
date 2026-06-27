# Game of Life (canvas)

> Glowing green cells flicker on a dark grid; Conway's Game of Life evolves hypnotic patterns.

- **id**: `life` · **kind**: canvas · **section**: cellular-and-physics
- **tags**: cellular, grid, dots, geometry, canvas2d, background · **vibe**: hypnotic, technical, geometric
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: false
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: life — Game of Life (canvas) · license MIT -->
<canvas id="fx-life" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function life(ctx,w,h,t,mx,my,s){ const C=8,gw=Math.ceil(w/C),gh=Math.ceil(h/C),N=gw*gh;if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(N);for(let i=0;i<N;i++)s.g[i]=Math.random()<0.3?1:0;s.acc=0;}s.acc++;if(s.acc%4===0){const n=new Uint8Array(N);let alive=0;for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){let c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy){c+=s.g[((y+dy+gh)%gh)*gw+(x+dx+gw)%gw];}const a=s.g[y*gw+x],v=(a&&(c===2||c===3))||(!a&&c===3)?1:0;n[y*gw+x]=v;alive+=v;}for(let k=0;k<3;k++)n[(Math.random()*N)|0]=1;if(alive<N*0.06){const bx=(Math.random()*gw)|0,by=(Math.random()*gh)|0;for(let dy=0;dy<8;dy++)for(let dx=0;dx<8;dx++)if(Math.random()<0.5)n[((by+dy)%gh)*gw+(bx+dx)%gw]=1;}s.g=n;}ctx.fillStyle='#070b07';ctx.fillRect(0,0,w,h);ctx.fillStyle='#6bf08a';for(let y=0;y<gh;y++)for(let x=0;x<gw;x++)if(s.g[y*gw+x])ctx.fillRect(x*C,y*C,C-1,C-1); };
const cv = document.getElementById('fx-life');
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

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Persistent accumulator: Uint8Array cell grid accumulates across frames; never cleared between generation steps. Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run. Reduced motion: freeze.

## Known limitations

- Non-deterministic (unseeded random / wall-clock): pixels differ run to run.
- Accumulates state across frames — Uint8Array cell grid accumulates across frames; never cleared between generation steps.; remount to reset.
