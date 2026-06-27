export default {
  meta: {
    "id": "ripple",
    "kind": "shader",
    "name": "Ripple Grid",
    "nameLocal": null,
    "section": "generative",
    "summary": "Teal grid lines bend under expanding ripple rings that emanate from the cursor.",
    "description": "An 18×18 cell grid is distorted by a sine ripple that decays exponentially away from the mouse pointer. Far cells remain crisp while near cells warp dramatically. Use as an interactive background for demos or landing pages.",
    "descriptionZh": "光标涟漪位移",
    "tags": ["ripple", "grid", "waves", "noise", "webgl2", "background"],
    "vibe": ["hypnotic", "technical", "geometric"],
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
  glsl: `void main(){ vec2 uv=gl_FragCoord.xy/iResolution.xy; vec2 m=iMouse.xy/iResolution.xy; float asp=iResolution.x/iResolution.y;
      float d=length((uv-m)*vec2(asp,1.0)); float ripple=sin(d*34.0-iTime*4.0)*exp(-d*5.0)*0.045; vec2 duv=uv+normalize(uv-m+vec2(0.0001))*ripple;
      vec2 gr=abs(fract(duv*18.0)-0.5); float line=smoothstep(0.44,0.5,max(gr.x,gr.y));
      vec3 col=mix(vec3(0.04,0.05,0.08),vec3(0.3,0.82,0.92),line); col+=exp(-d*6.0)*vec3(0.1,0.32,0.42); o=vec4(col,1.0); }`,
};
