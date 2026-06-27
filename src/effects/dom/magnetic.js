export default {
  meta: {
    "id": "magnetic",
    "kind": "dom",
    "name": "Magnetic Cursor",
    "nameLocal": null,
    "section": "interaction",
    "summary": "",
    "description": "",
    "descriptionZh": "磁吸自定义光标",
    "tags": [],
    "vibe": [],
    "culture": "UI / interaction",
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "hover"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  selector: "[data-magnetic]",
  init(root) {
    const tile = root.querySelector('[data-magnetic]');
    if (!tile) return { stop() {} };
    const cursor = tile.querySelector('[data-magcursor]'), chips = [...tile.querySelectorAll('[data-magchip]')];
    let tx = 0, ty = 0, cx = 0, cy = 0, scale = 1;
    const center = () => { const r = tile.getBoundingClientRect(); tx = r.width / 2; ty = r.height / 2; };
    center(); cx = tx; cy = ty;
    const onMove = (e) => { const r = tile.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; };
    tile.addEventListener('pointermove', onMove, { passive: true });
    tile.addEventListener('pointerleave', center);
    return {
      step() {
        const r = tile.getBoundingClientRect(); let best = null, bd = 1e9;
        chips.forEach((ch) => { const cr = ch.getBoundingClientRect(); const ccx = cr.left - r.left + cr.width / 2, ccy = cr.top - r.top + cr.height / 2; const d = Math.hypot(tx - ccx, ty - ccy); if (d < bd) { bd = d; best = { x: ccx, y: ccy, el: ch }; } });
        const active = best && bd < 64; let gx = tx, gy = ty, ts = 1; if (active) { gx = best.x; gy = best.y; ts = 2.5; }
        chips.forEach((ch) => { const on = active && ch === best.el; ch.style.color = on ? '#0a0b0d' : ''; ch.style.background = on ? '#CDE85A' : ''; ch.style.borderColor = on ? '#CDE85A' : ''; });
        cx += (gx - cx) * 0.2; cy += (gy - cy) * 0.2; scale += (ts - scale) * 0.2;
        cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%) scale(' + scale.toFixed(3) + ')';
      },
      stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', center); },
    };
  },
};
