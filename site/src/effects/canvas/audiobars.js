export default {
  meta: {
    "id": "audiobars",
    "kind": "canvas",
    "name": "Audio Bars",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Simulated spectrum bars pulse in blue-green gradient (no mic); energetic audio-visualiser look.",
    "description": "32 vertical bars whose heights are driven by Math.sin combinations simulate a frequency-spectrum visualiser without any microphone or Web Audio API — the audio is entirely fake. Bar colours cycle from blue to green across the 32 bins. Use as a decorative audio-aesthetic background or loader.",
    "descriptionZh": "频谱律动",
    "tags": ["oscilloscope", "lines", "geometry", "canvas2d"],
    "vibe": ["energetic", "technical"],
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
  draw: function audiobars(ctx,w,h,t){ ctx.fillStyle='#0a0a0f';ctx.fillRect(0,0,w,h);const n=32,bw=w/n;for(let i=0;i<n;i++){const v=(0.25+0.75*Math.abs(Math.sin(i*0.5+t*4)*Math.sin(i*0.13+t)))*h*0.8;ctx.fillStyle='hsl('+(i/n*120+200|0)+',85%,60%)';ctx.fillRect(i*bw+1,h-v,bw-2,v);} },
};
