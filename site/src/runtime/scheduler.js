// One rAF loop for every mounted effect. Visibility-gated, per-draw try/catch,
// DPR-aware resize, prefers-reduced-motion honoring each effect's meta.reducedMotion.
// No DOM/global access at module top-level (Node can import this file).

let rafId = null;
let origin = 0;
const items = new Set();
const byTarget = new Map(); // target element -> item (for shared IO/RO callbacks)
let io = null, ro = null, reduceMQ = null;

function ensureObservers() {
  if (io) return;
  reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  // Toggling reduce off should resume frozen effects; toggling on draws one more frame then freezes.
  reduceMQ.addEventListener('change', () => { for (const it of items) it.framesDrawn = 0; });
  io = new IntersectionObserver((entries) => {
    for (const e of entries) { e.target.__vis = e.isIntersecting; }
  }, { rootMargin: '100px' });
  ro = new ResizeObserver((entries) => {
    for (const e of entries) { const it = byTarget.get(e.target); if (it) doResize(it); }
  });
  // Pause the entire loop when the tab/page is hidden (rAF throttles but doesn't fully stop).
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; } }
    else { ensureLoop(); }
  });
}

// Start the loop iff there's work to do and the page is visible. Idempotent.
function ensureLoop() {
  if (rafId == null && items.size > 0 && !(typeof document !== 'undefined' && document.hidden)) {
    if (origin === 0) origin = performance.now();
    rafId = requestAnimationFrame(frame);
  }
}

function doResize(item) {
  if (!item.resize) return;
  const r = item.target.getBoundingClientRect();
  const w = Math.max(1, Math.round(r.width));
  const h = Math.max(1, Math.round(r.height));
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  try { item.resize(w, h, dpr); } catch (e) { logOnce(item, e); }
  item.framesDrawn = 0; // redraw at least one frame at the new size (matters under freeze)
}

function logOnce(item, e) {
  if (item.errored) return;
  item.errored = true;
  console.error('fx-lab: effect error (suppressing further logs for this mount):', e);
}

function frame(now) {
  rafId = requestAnimationFrame(frame);
  const t = (now - origin) / 1000;
  const reduce = reduceMQ.matches;
  for (const item of items) {
    if (reduce && item.reducedMotion !== 'animate' && item.framesDrawn >= 1) continue;
    if (item.target.__vis === false) continue; // off-screen
    try { item.draw(t); item.framesDrawn++; }
    catch (e) { logOnce(item, e); }
  }
}

// opts: { target (Element observed for visibility/resize), draw(t), reducedMotion, resize?(w,h,dpr) }
// Returns an unschedule() that fully detaches this item. Idempotent.
export function schedule(opts) {
  ensureObservers();
  const item = { ...opts, framesDrawn: 0, errored: false, dead: false };
  item.reducedMotion = item.reducedMotion || 'freeze';
  items.add(item);
  byTarget.set(item.target, item);
  item.target.__vis = true; // optimistic until IO reports
  io.observe(item.target);
  if (item.resize) { ro.observe(item.target); doResize(item); }
  ensureLoop();
  return function unschedule() {
    if (item.dead) return;
    item.dead = true;
    items.delete(item);
    byTarget.delete(item.target);
    try { io.unobserve(item.target); } catch {}
    try { if (item.resize) ro.unobserve(item.target); } catch {}
    delete item.target.__vis;
    if (items.size === 0 && rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
  };
}
