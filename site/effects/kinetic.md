# Kinetic Type (dom)

> 可变字重波动

- **id**: `kinetic` · **kind**: dom · **section**: interaction
- **tags**: — · **vibe**: —
- **culture**: typography / variable font
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: kinetic — Kinetic Type (dom) · license MIT -->
<div id="fx-root-kinetic"><div data-kinetic style="color:#fff;font-family:system-ui,sans-serif"></div></div>
<script type="module">
const init = ({ init(root) {
    const el = root.querySelector('[data-kinetic]');
    if (!el) return { stop() {} };
    const word = 'MOTION'; el.innerHTML = '';
    const spans = [...word].map((ch) => { const s = document.createElement('span'); s.textContent = ch; s.style.cssText = 'display:inline-block;font-weight:400;font-size:clamp(28px,5vw,46px)'; el.appendChild(s); return s; });
    return {
      step(t) {
        spans.forEach((s, i) => { const ph = t * 2 - i * 0.5; s.style.fontWeight = Math.round(400 + 300 * (0.5 + 0.5 * Math.sin(ph))); s.style.transform = 'translateY(' + (Math.sin(ph) * 8).toFixed(1) + 'px)'; });
      },
      stop() { el.innerHTML = ''; },
    };
  } }).init;
const root = document.getElementById('fx-root-kinetic');
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
