export default {
  meta: {
    "id": "herringbone",
    "kind": "canvas",
    "name": "Herringbone",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Warm gold herringbone tile weave on dark brown; a rich static textile pattern.",
    "description": "Renders interlocking diagonal rectangular tiles in the classic herringbone arrangement — gold on dark brown. The geometry is fully static with no animation. A warm, tactile textile backdrop suited to cozy or editorial layouts.",
    "descriptionZh": "鱼骨拼贴",
    "tags": ["geometry", "tiling", "weave", "stripes", "canvas2d", "background"],
    "vibe": ["elegant", "cozy", "retro"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": false,
      "trigger": "none"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function herringbone(ctx,w,h,t){ ctx.fillStyle='#16140f';ctx.fillRect(0,0,w,h);const L=22,W=8; ctx.fillStyle='#c9a86a'; for(let y=-L,r=0;y<h+L;y+=W*2,r++)for(let x=-L;x<w+L;x+=L){ctx.save();ctx.translate(x+(r%2)*L/2,y);ctx.rotate(((Math.floor(x/L)+r)%2?1:-1)*Math.PI/4);ctx.fillRect(0,0,L,W);ctx.restore();} },
};
