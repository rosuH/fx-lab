export default {
  meta: {
    "id": "orbits",
    "kind": "canvas",
    "name": "Orbits",
    "nameLocal": null,
    "section": "cellular-and-physics",
    "summary": "Four colored planets orbit a golden sun on deep space; calm, minimal cosmic loop.",
    "description": "Four planets with distinct colors and angular speeds orbit a central yellow star, with faint circular orbital rings drawn each frame. Positions are computed analytically from elapsed time — fully deterministic and zero-accumulation. A calm, minimal background for space or science themes.",
    "descriptionZh": "行星轨道",
    "tags": ["orbit", "rings", "stars", "dots", "geometry", "canvas2d", "background"],
    "vibe": ["calm", "ambient", "meditative"],
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
  draw: function orbits(ctx,w,h,t){ ctx.fillStyle='#05060e';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2;ctx.fillStyle='#ffd23f';ctx.beginPath();ctx.arc(cx,cy,8,0,7);ctx.fill();const pl=[[28,1.2,'#7fd0ff',3],[50,0.8,'#ff8f6a',5],[74,0.5,'#9fe0a0',4],[98,0.34,'#c79bff',6]];for(const p of pl){const a=t*p[1];ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.arc(cx,cy,p[0],0,7);ctx.stroke();ctx.fillStyle=p[2];ctx.beginPath();ctx.arc(cx+Math.cos(a)*p[0],cy+Math.sin(a)*p[0],p[3],0,7);ctx.fill();} },
};
