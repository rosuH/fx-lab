// JS noise helpers bound as `this` for canvas effects (verbatim from FX Lab.dc.html).
export function vhash(x,y){ let n=Math.sin(x*127.1+y*311.7)*43758.5453; return n-Math.floor(n); }
export function vnoise(x,y){ const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi; const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf); const a=this.vhash(xi,yi),b=this.vhash(xi+1,yi),c=this.vhash(xi,yi+1),d=this.vhash(xi+1,yi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
export const NOISE = { vhash, vnoise };
