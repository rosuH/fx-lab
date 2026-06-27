export default {
  meta: {
    "id": "bauhaus",
    "kind": "canvas",
    "name": "Bauhaus",
    "nameLocal": null,
    "section": "design-movements",
    "summary": "Bold Bauhaus shapes — blue circle, red arc, yellow triangle — slow-turn in primary colours.",
    "description": "Draws a Bauhaus-inspired geometric composition: a blue circle, a slowly rotating red half-disc, and a yellow triangle on a warm grey field, anchored by two horizontal black bars. Minimal and rhythmic — works well as a design-movement background or splash screen.",
    "descriptionZh": "三原色几何构成",
    "tags": ["geometry", "canvas2d", "curves", "lines"],
    "vibe": ["elegant", "geometric", "minimal"],
    "culture": "Bauhaus / design movement",
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": false,
      "trigger": "auto"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function bauhaus(ctx,w,h,t){ ctx.fillStyle='#e8e2d4';ctx.fillRect(0,0,w,h); const a=t*0.3,M=Math.min(w,h);
      ctx.fillStyle='#2b4a9b';ctx.beginPath();ctx.arc(w*0.32,h*0.4,M*0.26,0,7);ctx.fill();
      ctx.save();ctx.translate(w*0.7,h*0.62);ctx.rotate(a);ctx.fillStyle='#d23b2a';ctx.beginPath();ctx.arc(0,0,M*0.2,0,Math.PI);ctx.fill();ctx.restore();
      ctx.fillStyle='#e8b53a';ctx.beginPath();ctx.moveTo(w*0.55,h*0.08);ctx.lineTo(w*0.82,h*0.08);ctx.lineTo(w*0.55,h*0.42);ctx.closePath();ctx.fill();
      ctx.fillStyle='#1a1a1a';ctx.fillRect(w*0.1,h*0.76,w*0.8,6);ctx.fillRect(w*0.12,h*0.86,w*0.46,6); },
};
