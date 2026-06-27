export default {
  meta: {
    "id": "ripplewater",
    "kind": "canvas",
    "name": "Water Ripple",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Blue water ripples spread from cursor touch across a CPU-simulated height field; calm, fluid.",
    "description": "A 2D wave-propagation height field simulates water ripples from the cursor position, rendered as tinted blue pixels. Two Float32Array grids swap each frame with 0.95 damping to sustain oscillation. Best used as a confined interactive panel; skip on mobile due to CPU cost.",
    "descriptionZh": "水波高度场",
    "tags": ["ripple", "waves", "fluid", "canvas2d", "overlay"],
    "vibe": ["calm", "organic"],
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
    "state": {"persistent": true, "notes": "Two Float32Array height field buffers s.a and s.b swap and accumulate wave energy across frames"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function ripplewater(ctx,w,h,t,mx,my,s){ const C=6,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.a||s.gw!==gw){s.gw=gw;s.gh=gh;s.a=new Float32Array(gw*gh);s.b=new Float32Array(gw*gh);}const di=mx>=0?Math.floor(my/C)*gw+Math.floor(mx/C):(Math.floor(gh/2+Math.sin(t*2)*gh*0.3))*gw+Math.floor(gw/2+Math.cos(t*2)*gw*0.3);if(di>=0&&di<s.a.length)s.a[di]=320;for(let y=1;y<gh-1;y++)for(let x=1;x<gw-1;x++){const i=y*gw+x;s.b[i]=((s.a[i-1]+s.a[i+1]+s.a[i-gw]+s.a[i+gw])/2-s.b[i])*0.95;}const tmp=s.a;s.a=s.b;s.b=tmp;ctx.fillStyle='#04101c';ctx.fillRect(0,0,w,h);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.a[y*gw+x];if(Math.abs(v)>2){const c=Math.min(255,128+v);ctx.fillStyle='rgb('+(c*0.3|0)+','+(c*0.7|0)+','+(c|0)+')';ctx.fillRect(x*C,y*C,C,C);}} },
};
