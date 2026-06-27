export default {
  meta: {
    "id": "dots",
    "kind": "shader",
    "name": "Dot-Matrix Wave",
    "nameLocal": null,
    "section": "generative",
    "summary": "Blue-teal dot grid pulses in rolling waves; cursor pushes dots outward in a satisfying bulge.",
    "description": "A 24×24 grid of round dots ripples with a traveling sine wave keyed to each cell's distance from the origin. Moving the cursor creates a localized bulge that expands nearby dots. Works as a subtle animated overlay or panel background.",
    "descriptionZh": "点阵波动 + 光标隆起",
    "tags": ["dots", "grid", "waves", "noise", "webgl2", "background"],
    "vibe": ["calm", "playful", "geometric"],
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
  glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec2 m=(iMouse.xy-0.5*res)/res.y;
      float N=24.0; vec2 g=uv*N; vec2 id=floor(g); vec2 cell=fract(g)-0.5;
      float dM=length(uv-m); float wave=0.5+0.5*sin(length(id)*0.5-iTime*2.0); float bulge=smoothstep(0.55,0.0,dM)*0.95;
      float rad=0.10+0.26*wave+bulge; float d=length(cell); float c=smoothstep(rad,rad-0.09,d);
      vec3 base=mix(vec3(0.10,0.55,0.96),vec3(0.2,0.96,0.78),wave); o=vec4(base*c,1.0); }`,
};
