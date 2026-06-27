export default {
  meta: {
    "id": "topo",
    "kind": "canvas",
    "name": "Topographic",
    "nameLocal": null,
    "section": "data-and-system",
    "summary": "Animated teal contour lines map slowly shifting noise terrain; cursor warps the topology.",
    "description": "Uses value noise to generate a scrolling height field and draws teal isolines wherever the field crosses fixed level thresholds. The cursor horizontally warps the noise domain in real time. Best as a calm ambient background for data or nature-themed UIs.",
    "descriptionZh": "等高线地形 · 跟手",
    "tags": ["terrain", "canvas2d", "noise", "flow", "lines"],
    "vibe": ["calm", "ambient", "organic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "high",
      "mobileSafe": false
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
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function topo(ctx,w,h,t,mx,my){ ctx.fillStyle='#0b1a18';ctx.fillRect(0,0,w,h); const warp=mx>=0?(mx/w-0.5):Math.sin(t*0.2)*0.3; const S=5;
      for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ const vv=this.vnoise(x*0.012+warp,y*0.012+t*0.05); const band=Math.abs((vv*10)%1-0.5); if(band<0.05){const c=80+vv*120|0;ctx.fillStyle='rgba('+c+',220,180,0.85)';ctx.fillRect(x,y,S,S);} else {ctx.fillStyle='rgba(20,60,55,'+(0.08+vv*0.12).toFixed(2)+')';ctx.fillRect(x,y,S,S);} } },
};
