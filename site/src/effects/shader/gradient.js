export default {
  meta: {
    "id": "gradient",
    "kind": "shader",
    "name": "Gradient Flow",
    "nameLocal": null,
    "section": "generative",
    "summary": "Silky domain-warped color field in deep blue, purple and teal; slow hypnotic drift.",
    "description": "Layered FBM domain-warp generates a continuously morphing gradient across the frame. Mouse position subtly shifts the warp anchor, making the color field breathe toward the cursor. Ideal as a calm animated background behind text or UI.",
    "descriptionZh": "域扭曲 FBM · 跟随光标",
    "tags": ["noise", "flow", "plasma", "glow", "webgl2", "background"],
    "vibe": ["calm", "ambient", "meditative"],
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
  glsl: `void main(){ vec2 uv=gl_FragCoord.xy/iResolution.xy; vec2 m=iMouse.xy/iResolution.xy; float t=iTime*0.09;
      vec2 q=vec2(fbm(uv*3.0+t),fbm(uv*3.0+vec2(5.2,1.3)-t));
      vec2 r=vec2(fbm(uv*3.0+4.0*q+vec2(1.7,9.2)+m*1.2),fbm(uv*3.0+4.0*q+vec2(8.3,2.8)));
      float f=fbm(uv*3.0+4.0*r);
      vec3 col=mix(vec3(0.04,0.05,0.13),vec3(0.28,0.5,0.96),clamp(f*f*2.2,0.0,1.0));
      col=mix(col,vec3(0.86,0.34,0.72),clamp(length(r)*0.55,0.0,1.0));
      col=mix(col,vec3(0.10,0.82,0.62),clamp(q.x*0.5,0.0,1.0)); o=vec4(col,1.0); }`,
};
