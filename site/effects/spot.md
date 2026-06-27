# Spotlight Mask (dom)

> 光标聚光揭示

- **id**: `spot` · **kind**: dom · **section**: interaction
- **tags**: — · **vibe**: —
- **culture**: UI / reveal
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: spot — Spotlight Mask (dom) · license MIT -->
<div id="fx-root-spot"><div data-spot style="position:relative;width:320px;height:200px;background:#111;color:#fff;overflow:hidden;-webkit-mask-image:radial-gradient(160px circle at var(--mx,50%) var(--my,50%),#000 0,transparent 72%);mask-image:radial-gradient(160px circle at var(--mx,50%) var(--my,50%),#000 0,transparent 72%)"><div style="padding:1.2rem;font-size:1.1rem;line-height:1.5">Move the cursor across this panel to reveal the spotlight mask. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></div></div>
<script type="module">
const init = ({ init(root) {
    const tile = root.querySelector('[data-spot]');
    if (!tile) return { stop() {} };
    const set = (x, y) => { tile.style.setProperty('--mx', x + 'px'); tile.style.setProperty('--my', y + 'px'); };
    const onMove = (e) => { const r = tile.getBoundingClientRect(); set(e.clientX - r.left, e.clientY - r.top); };
    const onLeave = () => { const r = tile.getBoundingClientRect(); set(r.width / 2, r.height / 2); };
    tile.addEventListener('pointermove', onMove, { passive: true });
    tile.addEventListener('pointerleave', onLeave);
    const r = tile.getBoundingClientRect(); set(r.width / 2, r.height / 2);
    return { stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', onLeave); } };
  } }).init;
const root = document.getElementById('fx-root-spot');
const inst = init(root) || {};
if (inst.step) {
  const t0 = performance.now();
  (function loop() { inst.step((performance.now() - t0) / 1000); requestAnimationFrame(loop); })();
}
</script>
```

## Runtime notes

DOM: init(root) wires listeners/timers and returns { step?(t), stop() }; stop() releases everything for leak-free remounts. Perf budget — gpu: low, cpu: low, mobileSafe: true. Reduced motion: freeze.

## Known limitations

- None noted.
