export default {
  meta: {
    "id": "spiro",
    "kind": "canvas",
    "name": "Spirograph",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Electric-blue spirograph tracing a hypotrochoid; intricate lace-like winding slowly rotates.",
    "description": "Animates a hypotrochoid — the path of a point on a smaller gear rolling inside a larger gear — producing an interlocking lace-like loop. The inner gear rotates continuously over time, shifting the winding. Crisp blue stroke on dark navy; works as a centered inline ornament or calm background.",
    "descriptionZh": "万花尺 · 内旋轮线",
    "tags": ["curves", "spiral", "geometry", "rings", "canvas2d", "inline"],
    "vibe": ["elegant", "hypnotic", "geometric"],
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
  draw: function spiro(ctx,w,h,t){ ctx.fillStyle='#08101a';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,R=Math.min(w,h)*0.34,r=R*0.55,d=R*0.72; ctx.strokeStyle='#6fd0ff';ctx.lineWidth=1;ctx.beginPath(); for(let a=0;a<37.7;a+=0.03){const x=cx+(R-r)*Math.cos(a)+d*Math.cos((R-r)/r*a+t),y=cy+(R-r)*Math.sin(a)-d*Math.sin((R-r)/r*a+t);a?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); },
};
