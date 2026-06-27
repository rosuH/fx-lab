export default {
  meta: {
    "id": "glitch",
    "kind": "shader",
    "name": "Chromatic Glitch",
    "nameLocal": null,
    "section": "post-and-print",
    "summary": "Horizontal RGB bands jitter and split over CRT scanlines; aggressive retro glitch.",
    "description": "Hash-based band selection randomly shifts the R and B channels horizontally, creating chromatic aberration bursts. A scanline multiply darkens every other row for a CRT feel. Use as an aggressive overlay for retro or cyberpunk themes.",
    "descriptionZh": "RGB 分离 + 扫描线",
    "tags": ["glitch", "scanlines", "noise", "neon", "webgl2", "overlay"],
    "vibe": ["aggressive", "retro", "dramatic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "med",
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
  glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=gl_FragCoord.xy/res; float t=iTime;
      float band=step(0.85,hash(vec2(floor(uv.y*18.0),floor(t*9.0)))); float sh=(hash(vec2(floor(uv.y*18.0),floor(t*9.0)))-0.5)*0.08*band;
      float r=step(0.5,fract((uv.x+sh)*9.0+sin(uv.y*4.0+t))); float g=step(0.5,fract(uv.x*9.0+sin(uv.y*4.0+t))); float b=step(0.5,fract((uv.x-sh)*9.0+sin(uv.y*4.0+t)));
      vec3 col=vec3(r,g,b)*vec3(0.9,0.4,0.9)+vec3(0.05,0.1,0.15); col=mix(col,col.bgr,band*0.5); col*=0.65+0.35*step(0.5,fract(uv.y*140.0)); o=vec4(col,1.0); }`,
};
