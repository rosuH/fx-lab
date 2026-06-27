export default {
  meta: {
    "id": "kaleido",
    "kind": "shader",
    "name": "Kaleidoscope",
    "nameLocal": null,
    "section": "generative",
    "summary": "8-fold FBM kaleidoscope blooms with shifting hues; cursor tilts the mandala in real time.",
    "description": "UV coordinates are folded into 8 symmetric segments before sampling layered FBM noise. Colour cycles slowly over time; mouse position shifts the noise anchor for live pattern control. Lush and hypnotic as a fullscreen hero or overlay.",
    "descriptionZh": "万花筒 · 曼陀罗",
    "tags": ["kaleidoscope", "mandala", "fractal", "noise", "webgl2", "background"],
    "vibe": ["hypnotic", "psychedelic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "med",
      "cpu": "low",
      "mobileSafe": true
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
  glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec2 m=(iMouse.xy-0.5*res)/res.y; float a=atan(uv.y,uv.x); float r=length(uv);
      float seg=6.2831/8.0; a=mod(a,seg); a=abs(a-seg*0.5); vec2 ku=vec2(cos(a),sin(a))*r+iTime*0.1; float n=fbm(ku*3.0+m);
      vec3 col=0.5+0.5*cos(6.2831*(n+vec3(0.0,0.3,0.6)+iTime*0.05)); col*=smoothstep(1.2,0.1,r); o=vec4(col,1.0); }`,
};
