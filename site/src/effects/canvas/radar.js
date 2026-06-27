export default {
  meta: {
    "id": "radar",
    "kind": "canvas",
    "name": "Radar Sweep",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Phosphor-green radar sweep rotates over range rings on dark; tense sci-fi monitor.",
    "description": "Draws four concentric range rings and a rotating sweep arm in phosphor green on a near-black field. The arm leaves a fading wedge trail behind it as it advances clockwise with time. Use as a sci-fi dashboard background or dramatic overlay.",
    "descriptionZh": "雷达扫描",
    "tags": ["radar", "geometry", "rings", "canvas2d", "background", "overlay"],
    "vibe": ["technical", "futuristic", "dramatic"],
    "culture": "signal / military / sci-fi",
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
  draw: function radar(ctx,w,h,t){ ctx.fillStyle='#04140a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,R=Math.min(w,h)*0.46;ctx.strokeStyle='rgba(80,255,140,0.3)';for(let i=1;i<=4;i++){ctx.beginPath();ctx.arc(cx,cy,R*i/4,0,7);ctx.stroke();}const a=t*1.2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,a-0.85,a);ctx.closePath();ctx.fillStyle='rgba(80,255,140,0.16)';ctx.fill();ctx.strokeStyle='#5fff90';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();},
};
