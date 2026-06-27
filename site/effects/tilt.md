# 3D Tilt Card (dom)

> 透视倾斜 · 跟手

- **id**: `tilt` · **kind**: dom · **section**: interaction
- **tags**: — · **vibe**: —
- **culture**: UI / 3D perspective
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: tilt — 3D Tilt Card (dom) · license MIT -->
<div id="fx-root-tilt"><div data-tilt style="width:300px;height:200px;perspective:600px"><div data-tiltcard style="width:100%;height:100%;background:linear-gradient(135deg,#1f6feb,#CDE85A);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#0a0b0d;font-weight:700;font-family:system-ui">Tilt me</div></div></div>
<script type="module">
const init = ({ init(root) {
    const tile = root.querySelector('[data-tilt]');
    if (!tile) return { stop() {} };
    const card = tile.querySelector('[data-tiltcard]');
    const onMove = (e) => { const r = tile.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; card.style.transform = 'perspective(600px) rotateY(' + (px * 24).toFixed(1) + 'deg) rotateX(' + (-py * 24).toFixed(1) + 'deg)'; };
    const onLeave = () => { card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)'; };
    tile.addEventListener('pointermove', onMove, { passive: true });
    tile.addEventListener('pointerleave', onLeave);
    return { stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', onLeave); } };
  } }).init;
const root = document.getElementById('fx-root-tilt');
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
