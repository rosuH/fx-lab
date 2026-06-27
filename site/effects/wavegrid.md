# Wave Grid (canvas)

> Perspective dot grid ripples with sine waves receding into depth; geometric, hypnotic background.

- **id**: `wavegrid` · **kind**: canvas · **section**: interaction-and-generative
- **tags**: grid, dots, waves, geometry, canvas2d, background · **vibe**: geometric, hypnotic
- **culture**: —
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: wavegrid — Wave Grid (canvas) · license MIT -->
<canvas id="fx-wavegrid" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const draw = function wavegrid(ctx,w,h,t){ ctx.fillStyle='#060810';ctx.fillRect(0,0,w,h);const cols=14,rows=10;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const px=(c/(cols-1)-0.5),pz=r/(rows-1),sc=0.4+pz*0.9,x=w/2+px*w*sc,y=h*0.35+pz*h*0.5+Math.sin(c*0.6+r*0.4-t*2)*8*pz,sz=1+pz*2.5;ctx.fillStyle='hsl('+((200+pz*120)%360)+',80%,'+(40+pz*30|0)+'%)';ctx.beginPath();ctx.arc(x,y,sz,0,7);ctx.fill();} };
const cv = document.getElementById('fx-wavegrid');
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
