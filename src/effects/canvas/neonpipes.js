export default {
  meta: {
    "id": "neonpipes",
    "kind": "canvas",
    "name": "Neon Pipes",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Six glowing neon sine waves undulate in cyan, magenta, and lime; retro, energetic background.",
    "description": "Six horizontal sine-wave bands in cycling neon colours (cyan, magenta, lime, sky) undulate across a near-black canvas with canvas shadow glow. The waves are purely trigonometric with no random state. Use as a retro synth-wave background.",
    "descriptionZh": "发光管线",
    "tags": ["neon", "waves", "lines", "glow", "canvas2d", "background"],
    "vibe": ["retro", "energetic"],
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
  draw: function neonpipes(ctx,w,h,t){ ctx.fillStyle='#08040f';ctx.fillRect(0,0,w,h);const cols=['#00fff0','#ff00aa','#aaff00','#00aaff'];ctx.lineWidth=3;ctx.lineCap='round';for(let i=0;i<6;i++){ctx.strokeStyle=cols[i%4];ctx.shadowBlur=10;ctx.shadowColor=cols[i%4];ctx.beginPath();for(let x=0;x<=w;x+=8){const y=h*(i+1)/7+Math.sin(x*0.03+t*1.5+i)*18;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.shadowBlur=0; },
};
