export default {
  meta: {
    "id": "cloud",
    "kind": "canvas",
    "name": "Ruyi Cloud",
    "nameLocal": "云纹",
    "section": "world-patterns-ii",
    "summary": "Crimson field of pulsing five-lobed cloud medallions; festive and elegant Chinese folk pattern.",
    "description": "Each tile contains a star-shaped cloud outline whose radius oscillates via a five-lobe sinusoidal waveform, creating a slow pulsing ruyi-cloud medallion on a deep crimson ground. A small arc accents each centre. Use as a festive East Asian or Chinese New Year themed background.",
    "descriptionZh": "祥云回旋",
    "tags": ["curves", "geometry", "tiling", "canvas2d", "background"],
    "vibe": ["elegant", "cultural", "calm"],
    "culture": "China",
    "accuracyNote": "Procedural approximation of Chinese Ruyi cloud patterns; not a faithful reproduction of any specific historical motif.",
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
  draw: function cloud(ctx,w,h,t){ ctx.fillStyle='#7a1420';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffcf5a';ctx.lineWidth=2.5;const S=60;for(let y=S/2;y<h+S;y+=S)for(let x=S/2;x<w+S;x+=S){ctx.beginPath();for(let a=0;a<6.2831;a+=0.15){const r=S*0.3*(1+0.32*Math.sin(a*5+t*0.5));const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;a?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(x,y,S*0.1,0,7);ctx.stroke();}},
};
