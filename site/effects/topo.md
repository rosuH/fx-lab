# Topographic (canvas)

> Animated teal contour lines map slowly shifting noise terrain; cursor warps the topology.

- **id**: `topo` · **kind**: canvas · **section**: data-and-system
- **tags**: terrain, canvas2d, noise, flow, lines · **vibe**: calm, ambient, organic
- **culture**: —
- **perf**: gpu low / cpu high / mobileSafe false
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: topo — Topographic (canvas) · license MIT -->
<canvas id="fx-topo" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function topo(ctx,w,h,t,mx,my){ ctx.fillStyle='#0b1a18';ctx.fillRect(0,0,w,h); const warp=mx>=0?(mx/w-0.5):Math.sin(t*0.2)*0.3; const S=5;
      for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ const vv=this.vnoise(x*0.012+warp,y*0.012+t*0.05); const band=Math.abs((vv*10)%1-0.5); if(band<0.05){const c=80+vv*120|0;ctx.fillStyle='rgba('+c+',220,180,0.85)';ctx.fillRect(x,y,S,S);} else {ctx.fillStyle='rgba(20,60,55,'+(0.08+vv*0.12).toFixed(2)+')';ctx.fillRect(x,y,S,S);} } };
function vhash(x,y){ let n=Math.sin(x*127.1+y*311.7)*43758.5453; return n-Math.floor(n); }
function vnoise(x,y){ const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi; const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf); const a=this.vhash(xi,yi),b=this.vhash(xi+1,yi),c=this.vhash(xi,yi+1),d=this.vhash(xi+1,yi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
const NOISE = { vhash, vnoise };
const cv = document.getElementById('fx-topo');
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
  draw.call(NOISE, ctx, w, h, t, mx, my, state);
  requestAnimationFrame(frame);
})();
</script>
```

## Runtime notes

Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio). Perf budget — gpu: low, cpu: high, mobileSafe: false. Reduced motion: freeze.

## Known limitations

- None noted.
