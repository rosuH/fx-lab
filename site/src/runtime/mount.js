// mount(el, id, opts) -> { stop() }. stop() releases EVERYTHING (rAF dereg, GL context + counter,
// observers, listeners, timers) with no leaks across repeated mount/stop. Routes by meta.kind.

import { REGISTRY } from '../registry.js';
import { schedule } from './scheduler.js';
import { makeGL } from './gl.js';
import { makeCanvas2D } from './canvas.js';
import { makeDom } from './dom.js';

const handles = new Set();

function track(stopFn) {
  const handle = {
    stop() {
      if (!handles.has(handle)) return; // idempotent
      handles.delete(handle);
      try { stopFn(); } catch (e) { console.error('fx-lab: error during stop():', e); }
    },
  };
  handles.add(handle);
  return handle;
}

function makeCanvasEl(el) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%';
  el.appendChild(canvas);
  return canvas;
}

// Pointer tracking shared by shader + canvas mounts. mx,my in CSS px relative to canvas; -9999 when not hovering.
function trackPointer(canvas) {
  const p = { mx: -9999, my: -9999 };
  const onMove = (e) => { const r = canvas.getBoundingClientRect(); p.mx = e.clientX - r.left; p.my = e.clientY - r.top; };
  const onLeave = () => { p.mx = -9999; p.my = -9999; };
  canvas.addEventListener('pointermove', onMove, { passive: true });
  canvas.addEventListener('pointerleave', onLeave);
  p.detach = () => { canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerleave', onLeave); };
  return p;
}

function mountRendered(el, module, opts, makeRenderer) {
  const canvas = makeCanvasEl(el);
  const renderer = makeRenderer(canvas);
  if (!renderer) { el.removeChild(canvas); return track(() => {}); } // cap reached / no context — already logged
  const p = trackPointer(canvas);
  const unschedule = schedule({
    target: canvas,
    reducedMotion: module.meta.reducedMotion,
    resize: (w, h, dpr) => renderer.resize(w, h, dpr),
    draw: (t) => renderer.render(t, p.mx, p.my),
  });
  return track(() => {
    unschedule();
    p.detach();
    renderer.dispose();
    if (canvas.parentNode === el) el.removeChild(canvas);
  });
}

function mountDom(el, module) {
  const handle = makeDom(el, module);
  let unschedule = null;
  if (handle.step) {
    unschedule = schedule({
      target: el,
      reducedMotion: module.meta.reducedMotion,
      draw: (t) => handle.step(t),
    });
  }
  return track(() => {
    if (unschedule) unschedule();
    handle.stop();
  });
}

export function mount(el, id, opts = {}) {
  if (typeof el === 'string') el = document.querySelector(el);
  const module = REGISTRY[id];
  if (!module || !el) { console.error(`fx-lab: cannot mount "${id}" (unknown id or missing element).`); return { stop() {} }; }
  switch (module.meta.kind) {
    case 'shader': return mountRendered(el, module, opts, (c) => makeGL(c, module.glsl, opts));
    case 'canvas': return mountRendered(el, module, opts, (c) => makeCanvas2D(c, module));
    case 'dom': return mountDom(el, module);
    default: console.error(`fx-lab: unknown kind "${module.meta.kind}" for "${id}".`); return { stop() {} };
  }
}

export function stopAll() {
  for (const h of [...handles]) h.stop();
}
