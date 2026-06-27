export default {
  meta: {
    "id": "polka",
    "kind": "canvas",
    "name": "Polka Dots",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "White polka dots gently breathing on vivid hot-pink; cheerful and playful pop-art pattern.",
    "description": "Fills a hot-pink canvas with a staggered grid of white circles whose radii pulse with a slow sine wave. The breathing rhythm gives a light, bouncy energy. Great as a retro or pop-art background.",
    "descriptionZh": "波点 · 呼吸",
    "tags": ["dots", "geometry", "grid", "canvas2d", "background"],
    "vibe": ["playful", "energetic", "retro"],
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
  draw: function polka(ctx,w,h,t){ ctx.fillStyle='#e8366b';ctx.fillRect(0,0,w,h);ctx.fillStyle='#fff';const S=28; for(let row=0,y=0;y<h+S;row++,y+=S)for(let x=0;x<w+S;x+=S){const r=6+2*Math.sin(t*2+x*0.05+y*0.05);ctx.beginPath();ctx.arc(x+(row%2)*S/2,y,r,0,7);ctx.fill();} },
};
