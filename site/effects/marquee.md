# Marquee Ticker (dom)

> 无缝跑马灯

- **id**: `marquee` · **kind**: dom · **section**: interaction
- **tags**: — · **vibe**: —
- **culture**: UI / editorial
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: marquee — Marquee Ticker (dom) · license MIT -->
<div id="fx-root-marquee"><div style="overflow:hidden;white-space:nowrap;width:320px;color:#fff;font-family:ui-monospace,monospace;padding:.6rem 0"><div data-marquee style="display:inline-block">FX LAB · ZERO-DEP WEB EFFECTS · PASTE ANYWHERE · FX LAB · ZERO-DEP WEB EFFECTS · PASTE ANYWHERE · </div></div></div>
<script type="module">
const init = ({ init(root) {
    const tr = root.querySelector('[data-marquee]');
    if (!tr) return { stop() {} };
    let x = 0;
    return {
      step() { const wdt = tr.scrollWidth / 2 || tr.offsetWidth; x -= 1.3; if (x <= -wdt) x += wdt; tr.style.transform = 'translateX(' + x.toFixed(1) + 'px)'; },
      stop() {},
    };
  } }).init;
const root = document.getElementById('fx-root-marquee');
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
