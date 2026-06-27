export default {
  meta: {
    "id": "metaballs",
    "kind": "shader",
    "name": "Metaballs",
    "nameLocal": null,
    "section": "generative",
    "summary": "Five glowing purple-magenta blobs orbit and merge organically; cursor draws in a sixth.",
    "description": "Five metaballs travel sine-path orbits and merge via a smooth potential-field threshold. The cursor injects a sixth ball, pulling the fluid mass toward the pointer. Good for psychedelic loading states or dark hero backgrounds.",
    "descriptionZh": "有机融合光球",
    "tags": ["metaballs", "plasma", "glow", "fluid", "webgl2", "background"],
    "vibe": ["hypnotic", "psychedelic", "organic"],
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
  glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec2 m=(iMouse.xy-0.5*res)/res.y; float t=iTime; float v=0.0;
      for(int i=0;i<5;i++){ float fi=float(i); vec2 c=0.55*vec2(sin(t*0.6+fi*1.7),cos(t*0.5+fi*2.3)); v+=0.055/(length(uv-c)+0.001); }
      v+=0.085/(length(uv-m)+0.001); float s=smoothstep(1.0,1.7,v);
      vec3 col=mix(vec3(0.03,0.02,0.07),mix(vec3(0.5,0.1,0.92),vec3(0.96,0.26,0.6),s),s); col+=s*vec3(0.18,0.05,0.32); o=vec4(col,1.0); }`,
};
