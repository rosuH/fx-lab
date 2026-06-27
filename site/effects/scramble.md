# Decode Text (dom)

> 乱码归位

- **id**: `scramble` · **kind**: dom · **section**: interaction
- **tags**: — · **vibe**: —
- **culture**: UI / typography
- **perf**: gpu low / cpu low / mobileSafe true
- **interactive**: followsCursor false, trigger auto
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: scramble — Decode Text (dom) · license MIT -->
<div id="fx-root-scramble"><p data-scramble style="font-family:ui-monospace,monospace;font-size:2rem;letter-spacing:.1em;color:#CDE85A;margin:0">DECODE</p></div>
<script type="module">
const init = ({ init(root) {
    const el = root.querySelector('[data-scramble]');
    if (!el) return { stop() {} };
    const words = ['CANVAS', 'SHADER', 'EFFECT', 'MOTION'], chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ#%@&/<>*0123456789';
    let wi = 0, scrTimer = 0;
    const setWord = (target) => {
      let frame = 0; const len = target.length; clearInterval(scrTimer);
      scrTimer = setInterval(() => {
        let s = '';
        for (let i = 0; i < len; i++) { s += i < frame / 2.4 ? target[i] : chars[Math.floor(Math.random() * chars.length)]; }
        el.textContent = s; frame++; if (frame / 2.4 > len) clearInterval(scrTimer);
      }, 42);
    };
    setWord(words[0]);
    const scrCycle = setInterval(() => { wi = (wi + 1) % words.length; setWord(words[wi]); }, 2200);
    return { stop() { clearInterval(scrTimer); clearInterval(scrCycle); } };
  } }).init;
const root = document.getElementById('fx-root-scramble');
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
