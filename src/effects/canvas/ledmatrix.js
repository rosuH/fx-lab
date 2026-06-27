export default {
  meta: {
    "id": "ledmatrix",
    "kind": "canvas",
    "name": "LED Matrix",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Amber LED dot grid ripples with a traveling sine wave; warm retro electronics glow.",
    "description": "Fills the canvas with a tight grid of circular dot-matrix LEDs whose brightness ripples as a diagonal traveling wave. Dots glow amber-orange against near-black, fading to dim at the trough. Works as a warm retro background or ambient overlay.",
    "descriptionZh": "点阵屏波动",
    "tags": ["dots", "grid", "waves", "neon", "canvas2d", "background"],
    "vibe": ["retro", "technical", "ambient"],
    "culture": "signal / electronics / display",
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
  draw: function ledmatrix(ctx,w,h,t){ ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);const C=9,gw=Math.ceil(w/C),gh=Math.ceil(h/C);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const on=0.5+0.5*Math.sin((x-gw/2)*0.3+(y-gh/2)*0.2-t*3);ctx.fillStyle='rgba(255,'+(80+on*120|0)+',20,'+(0.15+on*0.8).toFixed(2)+')';ctx.beginPath();ctx.arc(x*C+C/2,y*C+C/2,C*0.35,0,7);ctx.fill();}},
};
