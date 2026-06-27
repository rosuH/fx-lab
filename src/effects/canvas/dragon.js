export default {
  meta: {
    "id": "dragon",
    "kind": "canvas",
    "name": "Dragon Curve",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Purple dragon-curve fractal slowly rotates; clean self-similar line on dark violet.",
    "description": "Precomputes an 11-generation dragon curve sequence and renders it as a connected line that slowly rotates over time. The self-similar L-system fold produces a space-filling dragon shape in lavender-purple. Low CPU; ideal as a subtle decorative background.",
    "descriptionZh": "龙形曲线",
    "tags": ["fractal", "curves", "geometry", "lines"],
    "vibe": ["minimal", "geometric", "hypnotic"],
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
  draw: function dragon(ctx,w,h,t,mx,my,s){ if(!s.seq){let seq=[1];for(let g=0;g<11;g++){const rev=seq.slice().reverse().map(v=>v?0:1);seq=seq.concat([1],rev);}s.seq=seq;} ctx.fillStyle='#0b0a14';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#a98bff';ctx.lineWidth=1;let x=w*0.62,y=h*0.42,dir=Math.PI+t*0.05;ctx.beginPath();ctx.moveTo(x,y);for(const turn of s.seq){dir+=turn?1.5708:-1.5708;x+=Math.cos(dir)*3.2;y+=Math.sin(dir)*3.2;ctx.lineTo(x,y);}ctx.stroke(); },
};
