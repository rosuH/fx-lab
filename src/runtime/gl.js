// WebGL2 renderer for shader effects. PRE + glsl, full-screen triangle.
// Module-level live-context counter refuses creation beyond the cap (returns null + console.error,
// never throws) and decrements on stop / webglcontextlost.

import { PRE } from './preamble.js';

// Browsers allow ~16 live WebGL2 contexts before evicting the oldest. The gallery lazy-unmounts
// off-screen tiles, so concurrent contexts stay bounded by the viewport regardless. Override per-mount via opts.glCap.
// ponytail: 16 fits all 11 shaders on screen at once; single-context virtualization is the path past dozens.
const GL_CAP = 16;
let liveContexts = 0;

const VS_SRC = `#version 300 es
in vec2 p;
void main(){ gl_Position=vec4(p,0,1); }`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('fx-lab: shader compile error:\n' + gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

// makeGL(canvas, glsl, opts?) -> { resize(w,h,dpr), render(t, mxCss, myCss), dispose() } | null
export function makeGL(canvas, glsl, opts = {}) {
  const cap = opts.glCap ?? GL_CAP;
  if (liveContexts >= cap) {
    console.error(`fx-lab: WebGL2 context cap (${cap}) reached — refusing to create another. Mount fewer shader effects per page.`);
    return null;
  }
  const gl = canvas.getContext('webgl2', {
    antialias: false, depth: false, stencil: false, premultipliedAlpha: false, powerPreference: 'low-power',
  });
  if (!gl) { console.error('fx-lab: WebGL2 is not available in this browser.'); return null; }

  const lose = () => { const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); };

  const vs = compile(gl, gl.VERTEX_SHADER, VS_SRC);
  const fs = compile(gl, gl.FRAGMENT_SHADER, PRE + glsl);
  if (!vs || !fs) { lose(); return null; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('fx-lab: shader link error:\n' + gl.getProgramInfoLog(prog));
    lose();
    return null;
  }

  // Success — count this live context.
  liveContexts++;
  let released = false;
  const release = () => { if (released) return; released = true; liveContexts--; };

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // full-screen triangle
  const pLoc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(pLoc);
  gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'iResolution');
  const uTime = gl.getUniformLocation(prog, 'iTime');
  const uMouse = gl.getUniformLocation(prog, 'iMouse');

  let dpr = 1;
  const onLost = (e) => { e.preventDefault(); release(); };
  canvas.addEventListener('webglcontextlost', onLost);

  return {
    resize(w, h, _dpr) {
      dpr = _dpr;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    },
    render(t, mxCss, myCss) {
      if (released) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);
      gl.bindVertexArray(vao);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      // iMouse: physical px, Y-flipped, centered when not hovering (mxCss < 0).
      let mpx, mpy;
      if (mxCss < 0) { mpx = canvas.width * 0.5; mpy = canvas.height * 0.5; }
      else { mpx = mxCss * dpr; mpy = canvas.height - myCss * dpr; }
      gl.uniform2f(uMouse, mpx, mpy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      canvas.removeEventListener('webglcontextlost', onLost);
      if (!released) {
        try { gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(buf); gl.deleteVertexArray(vao); } catch {}
      }
      release();
      lose();
    },
  };
}
