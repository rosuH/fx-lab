export default {
  meta: {
    "id": "houndstooth",
    "kind": "canvas",
    "name": "Houndstooth",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Classic black-and-white houndstooth check slowly scrolling; crisp tailoring pattern.",
    "description": "Tiles the traditional houndstooth check in pure black and white, with the pattern scrolling diagonally over time. Each tile uses the characteristic interlocking angular comma-shapes. Sharp and graphic; suits fashion-forward or editorial backgrounds.",
    "descriptionZh": "千鸟格",
    "tags": ["geometry", "tiling", "stripes", "grid", "canvas2d", "background"],
    "vibe": ["elegant", "retro", "minimal"],
    "culture": null,
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
  draw: function houndstooth(ctx,w,h,t){ ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.fillStyle='#111';const S=20,off=(t*10)%S; for(let y=-S;y<h+S;y+=S)for(let x=-S;x<w+S;x+=S){const px=x+off;ctx.fillRect(px,y,S/2,S/2);ctx.beginPath();ctx.moveTo(px+S/2,y);ctx.lineTo(px+S,y);ctx.lineTo(px+S/2,y+S/2);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(px,y+S/2);ctx.lineTo(px+S/2,y+S);ctx.lineTo(px,y+S);ctx.closePath();ctx.fill();} },
};
