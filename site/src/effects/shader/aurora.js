export default {
  meta: {
    "id": "aurora",
    "kind": "shader",
    "name": "Aurora Ribbons",
    "nameLocal": null,
    "section": "generative",
    "summary": "Shimmering green-and-purple aurora curtains stream down a starry night sky; serene fullscreen background.",
    "description": "Three fbm-driven aurora curtains with vertical rays sway over a faint starfield, fading into a horizon glow and cycling through green-to-purple hues on a near-black sky. The cursor's vertical position nudges the curtains. Slow and meditative; ideal as a dark-mode hero background.",
    "descriptionZh": "极光丝带",
    "tags": ["aurora", "waves", "glow", "noise", "webgl2", "background"],
    "vibe": ["calm", "meditative", "ambient"],
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
  glsl: `void main(){ vec2 uv=gl_FragCoord.xy/iResolution.xy; vec2 m=iMouse.xy/iResolution.xy; float t=iTime*0.12;
      vec3 col=vec3(0.015,0.02,0.05)+vec3(0.0,0.02,0.05)*uv.y;
      float sp=hash(floor(gl_FragCoord.xy*0.5)); col+=smoothstep(0.992,1.0,sp)*smoothstep(0.25,1.0,uv.y)*vec3(0.7,0.8,1.0);
      for(int i=0;i<3;i++){ float fi=float(i);
        float base=0.45+0.13*fi+0.10*sin(uv.x*2.0+t*1.3+fi)+(fbm(vec2(uv.x*1.5+fi*4.0,t))-0.5)*0.30+(m.y-0.5)*0.2;
        float d=uv.y-base; float curtain=exp(-d*d*9.0);
        float rays=fbm(vec2(uv.x*22.0+fi*13.0,uv.y*3.0-t*3.0)); curtain*=0.35+0.9*rays*rays; curtain*=smoothstep(0.0,0.3,uv.y);
        vec3 c=mix(vec3(0.15,0.95,0.55),vec3(0.55,0.20,0.95),0.5+0.5*sin(t+fi*2.0+uv.x*2.5)); col+=curtain*c*1.3; }
      col+=vec3(0.04,0.10,0.07)*smoothstep(0.35,0.0,uv.y);
      col=col/(col+0.6); o=vec4(col,1.0); }`,
};
