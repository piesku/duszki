(()=>{function t(t,i){let n=t.i.t();for(let e of i)e(t,n);return n}function i(t,i,n){let e=t.createShader(i);return t.shaderSource(e,n),t.compileShader(e),e}function n(t,i,n,e,o,s,r){return t[0]=i,t[1]=n,t[2]=e,t[3]=o,t[4]=s,t[5]=r,t}function e(t,i){let n=i[0],e=i[1],o=i[2],s=i[3],r=i[4],h=i[5],c=n*s-e*o;return c?(c=1/c,t[0]=s*c,t[1]=-e*c,t[2]=-o*c,t[3]=n*c,t[4]=(o*h-s*r)*c,t[5]=(e*r-n*h)*c,t):null}function o(t,i,n){let e=i[0],o=i[1],s=i[2],r=i[3],h=i[4],c=i[5],u=n[0],l=n[1],a=n[2],f=n[3],d=n[4],v=n[5];return t[0]=e*u+s*l,t[1]=o*u+r*l,t[2]=e*a+s*f,t[3]=o*a+r*f,t[4]=e*d+s*v+h,t[5]=o*d+r*v+c,t}function s(t,i,n,e){let o=Math.sin(n),s=Math.cos(n);return t[0]=s*e[0],t[1]=o*e[0],t[2]=-o*e[1],t[3]=s*e[1],t[4]=i[0],t[5]=i[1],t}function r(t,i){return t[0]=i[4],t[1]=i[5],t}function h(t,i,e){return n(t,i,0,0,e,0,0),t}function c(t,i){r(i.o,t),i.h[0]=i.o[0]-i.u[0]/2,i.h[1]=i.o[1]-i.u[1]/2,i.l[0]=i.o[0]+i.u[0]/2,i.l[1]=i.o[1]+i.u[1]/2}function u(t,i){let n=t.o[0]-i.o[0],e=t.u[0]/2+i.u[0]/2-Math.abs(n),o=t.o[1]-i.o[1],s=t.u[1]/2+i.u[1]/2-Math.abs(o);return e<s?[e*Math.sign(n),0]:[0,s*Math.sign(o)]}function l(t,i,n){for(let s=0;s<n;s++){let n=i[s],r=t.v&n.p,h=n.v&t.p;if((r||h)&&(e=t).h[0]<(o=n).l[0]&&e.l[0]>o.h[0]&&e.h[1]<o.l[1]&&e.l[1]>o.h[1]){let i=u(t,n);r&&t._.push({m:n.g,M:i}),h&&n._.push({m:t.g,M:[-i[0],-i[1]]})}}var e,o}function a(t,i){let n=t.i.T[i],e=t.i.k[i];n.F&&(e.F[0]=n.F[0],e.F[1]=n.F[1],t.i.A[i]|=64),n.S&&(e.S=n.S,t.i.A[i]|=64)}function f(t,i){let n=t.i.k[i],e=t.i.$[i];t.C.ArrowLeft&&(n.F[0]-=1,t.i.A[i]|=64),t.C.ArrowRight&&(n.F[0]+=1,t.i.A[i]|=64),t.C.ArrowUp&&e.D&&(e.R[1]=500)}function d(t,i){return t[0]=i[0],t[1]=i[1],t}function v(t,i,n){return t[0]=i[0]+n[0],t[1]=i[1]+n[1],t}function w(t,i,n){return t[0]=i[0]*n,t[1]=i[1]*n,t}function p(t,i){let n=i[0],e=i[1],o=n*n+e*e;return o>0&&(o=1/Math.sqrt(o)),t[0]=i[0]*o,t[1]=i[1]*o,t}function _(t,i,n){let e=i[0],o=i[1];return t[0]=n[0]*e+n[2]*o+n[4],t[1]=n[1]*e+n[3]*o+n[5],t}function m(t=[0,0],i=0,n=[1,1]){return(e,o)=>{e.i.A[o]|=576,e.i.P[o]={X:t,S:i,Y:n}}}function g(t){return(i,n)=>{d(i.i.P[n].X,t)}}function x(t,i,n,e=[1,1]){return(o,s)=>{o.i.A[s]|=4,o.i.W[s]={g:s,H:!0,U:t,p:i,v:n,u:e,h:[0,0],l:[0,0],o:[0,0],_:[]}}}function y(t,i=1,n=1){return(e,o)=>{e.i.A[o]|=128,e.i.V[o]={q:1,I:t,j:i,K:n}}}function M(t,i,n=0,e=2*Math.PI){return(o,s)=>{o.i.A[s]|=128,o.i.V[s]={q:2,I:t,L:i,G:n,N:e}}}function T(t,i){return(n,e)=>{n.i.A[e]|=1024,n.i.k[e]={O:t,B:i,F:[0,0],S:0}}}function k(t,i=1,n=.001){return(e,o)=>{e.i.A[o]|=8192,e.i.$[o]={q:t,J:n,Z:i,R:[0,0],tt:[0,0],it:[0,0],nt:0,D:!1}}}function F(t=!1){return(i,n)=>{i.i.A[n]|=32832,i.i.et[n]={i:i.ot.subarray(n*et,n*et+6),st:[1,0,0,1,0,0],rt:t}}}function A(t){return[F(),m(),x(!0,2,3),k(1,.3),(t,i)=>{t.i.A[i]|=16,t.i.ht[i]={}},T(7,0),y("red"),(t,i)=>{t.i.A[i]|=256,t.i.ct[i]={ut:10,lt:void 0}}]}function S(...i){return(n,e)=>{32&n.i.A[e]||(n.i.A[e]|=32,n.i.ft[e]={ft:[]});let o=n.i.ft[e].ft;for(let e of i){let i=t(n,e);o.push(i)}}}function $(t,i){if(32&t.A[i])for(let n of t.ft[i].ft)$(t,n);0===t.A[i]||t.dt(i)}function b(t,i,n){let e=t.i.ct[i];e.ut-=n,e.ut<0&&$(t.i,i)}function z(t,i,n){let e=t.i.P[i],o=t.i.k[i];if(o.F[0]||o.F[1]){ht[0]=o.F[0],ht[1]=o.F[1];let r=Math.min(1,Math.hypot((s=ht)[0],s[1]));if(32768&t.i.A[i]){let n=t.i.et[i];!function(t,i,n){let e=i[0],o=i[1];t[0]=n[0]*e+n[2]*o,t[1]=n[1]*e+n[3]*o}(ht,ht,void 0!==n.vt?t.i.et[n.vt].st:n.i)}else!function(t,i,n){let e=Math.cos(n),o=Math.sin(n);t[0]=e*i[0]-o*i[1],t[1]=o*i[0]+e*i[1]}(ht,ht,e.S);p(ht,ht),w(ht,ht,r*o.O*n),v(e.X,e.X,ht),o.F[0]=0,o.F[1]=0}var s;o.S&&(e.S+=o.S*o.B*n,o.S=0)}function C(t,i,n){let e=t.i.P[i],o=t.i.$[i];if(1===o.q){let i=t.wt/2,n=t._t/2;e.X[1]>i&&(e.X[1]=i,o.tt[1]*=-o.Z),e.X[1]<-i&&(e.X[1]=-i,o.tt[1]*=-o.Z),e.X[0]<-n&&(e.X[0]=-n,o.tt[0]*=-o.Z),e.X[0]>n&&(e.X[0]=n,o.tt[0]*=-o.Z)}}function D(t,i,n){let e=t.i.P[i],o=t.i.$[i];var s;1===o.q&&(o.tt[1]+=-9.8*n,w(o.R,o.R,n),v(o.tt,o.tt,o.R),w(o.tt,o.tt,1-o.J),w(ct,o.tt,n),v(e.X,e.X,ct),e.S+=o.nt*n,t.i.A[i]|=64,(s=o.R)[0]=0,s[1]=0)}function R(t,i){let n=t.i.P[i],e=t.i.$[i],o=t.i.W[i];if(1===e.q){e.D=!1;let h=!1;for(let c=0;c<o._.length;c++){let u=o._[c];if(8192&t.i.A[u.m]){h=!0,v(n.X,n.X,u.M),t.i.A[i]|=64;let o=t.i.$[u.m];switch(o.q){case 0:p(lt,u.M),w(lt,lt,-2*((s=e.tt)[0]*(r=lt)[0]+s[1]*r[1])),v(e.it,e.tt,lt);break;case 1:d(e.it,o.tt)}w(e.it,e.it,e.Z),u.M[1]>0&&e.it[1]<1&&(e.it[1]=0,e.D=!0)}}h||d(e.it,e.tt)}var s,r}function P(t,i){if(32&t.A[i]){let n=t.ft[i];for(let i of n.ft)if(131072&t.A[i])return!0}return!1}function E(t,i){let n=t.gt,e=t.xt;t.yt.useProgram(n.Mt),t.yt.uniformMatrix3x2fv(n.kt.Tt,!1,i.Tt),t.yt.activeTexture(33984),t.yt.bindTexture(J,e.Ft),t.yt.uniform1i(n.kt.At,0),t.yt.uniform2f(n.kt.St,e.j,e.K),t.yt.bindBuffer(B,t.$t),t.yt.bufferData(B,t.ot,35040),t.yt.drawArraysInstanced(n.bt,0,4,t.i.A.length)}function X(t,i,n){let e=i*et;t.ot[e+12]=ft[n].x,t.ot[e+13]=ft[n].y,t.ot[e+14]=ft[n].width,t.ot[e+15]=ft[n].height}function Y(t,i,n){let e=t.i.zt[i];for(let n in e.Ct)if(e.Dt<e.Ct[n]){X(t,i,n);break}e.Dt+=n,e.Dt>=e.Rt&&(e.Dt-=e.Rt)}function W(t,i){let n=t.i.Pt[i];n.Et=t.Et,n.Xt=t.Xt;let o=n.Yt,s=t.Et/t.Xt;if(0===o.L[0]&&0===o.L[1]){let i=t.Xt/32/2;h(o.Wt,i*s,i)}else s<o.L[0]/o.L[1]?h(o.Wt,o.L[0],o.L[0]/s):h(o.Wt,o.L[1]*s,o.L[1]);e(o.Yt,o.Wt)}function H(t,i){let n=t.i.Ht[i],e=t.i.P[i];e.X[0]=(Math.random()-.5)*n.L*2,e.X[1]=(Math.random()-.5)*n.L*2,t.i.A[i]|=64}function U(i,n,e){let o=i.i.Ut[n];o.Vt+=e,o.Vt>o.qt&&(o.Vt=0,r(dt,i.i.et[n].i),i.i.A.length-i.i.It.length<i.i.jt&&t(i,[...o.Kt(i),g(dt)]))}function V(t,i,n){let e=t.i.Lt[i];e.Vt+=n,e.Vt>e.Gt&&(e.Vt=0,(t.i.A[i]&e.v)===e.v?t.i.A[i]&=~e.v:t.i.A[i]|=e.v)}function q(t,i){for(let i=0;i<t.i.A.length;i++)576==(576&t.i.A[i])&&(32768&t.i.A[i]?j(t,i):I(t,i))}function I(t,i){t.i.A[i]&=-65;let n=t.i.P[i],e=i*et;t.ot[e+0]=n.Y[0],t.ot[e+1]=n.Y[1],t.ot[e+2]=n.S*wt,t.ot[e+4]=n.X[0],t.ot[e+5]=n.X[1]}function j(t,i,n){t.i.A[i]&=-65;let h=t.i.P[i],c=t.i.et[i];if(s(c.i,h.X,h.S*wt,h.Y),void 0!==n&&(c.vt=n),void 0!==c.vt&&(o(c.i,t.i.et[c.vt].i,c.i),c.rt&&(r(pt,c.i),s(c.i,pt,h.S*wt,h.Y))),e(c.st,c.i),32&t.i.A[i]){let n=t.i.ft[i];for(let e=0;e<n.ft.length;e++){let o=n.ft[e];33280==(33280&t.i.A[o])&&j(t,o,i)}}}function K(t,i){let n=t.i.W[i];for(let t of n._);}function L(t,...i){return t.reduce(((t,n)=>t+function(t){let i=t.shift();return"boolean"==typeof i||null==i?"":Array.isArray(i)?i.join(""):i}(i)+n))}function G(t,i){let n=L`
<div style="margin: 10px;">
<h1 style="float: left; margin-right: 10px;">NewProject2D</h1>
<div>Click to spawn new squares.</div>
<div>Use the arrow keys to move all squares at once.</div>
<div>A square lives for ${10} seconds.</div>
</div>
`;n!==O&&(t.Nt.innerHTML=O=n)}function N(t=0,i=1){return((mt=16807*mt%2147483647)-1)/2147483646*(i-t)+t}var O,B=34962,J=3553,Q=5126,Z=document.getElementById("update"),tt=document.getElementById("delta"),it=document.getElementById("fps"),nt=1/60,et=16,ot=class extends class{constructor(t=1e4){this.A=[],this.It=[],this.jt=t}t(){return this.It.length>0?this.It.pop():this.A.push(0)-1}dt(t){this.A[t]=0,this.It.push(t)}}{constructor(){super(...arguments),this.zt=[],this.Pt=[],this.W=[],this.T=[],this.ht=[],this.ft=[],this.V=[],this.ct=[],this.P=[],this.k=[],this.Ot=[],this.Bt=[],this.$=[],this.Ht=[],this.et=[],this.Ut=[],this.Jt=[],this.Lt=[],this.Qt=[]}},st=0,rt=[0,0],ht=[0,0],ct=[0,0],ut=8708,lt=[0,0],at=131072,ft={"carrot_peeled.png":{x:0,y:192,width:32,height:32},"carrot_raw.png":{x:32,y:192,width:32,height:32},"cooking_pot1.png":{x:0,y:0,width:128,height:96},"cooking_pot2.png":{x:128,y:0,width:128,height:96},"cooking_pot3.png":{x:0,y:96,width:128,height:96},"cooking_pot4.png":{x:128,y:96,width:128,height:96},"potato_peeled.png":{x:64,y:192,width:32,height:32},"potato_raw.png":{x:96,y:192,width:32,height:32}},dt=[0,0],vt=262144,wt=Math.PI/180,pt=[0,0],_t=524292,mt=1,gt=new class extends class extends class{constructor(){this.Zt=0,this.ti=0,this.Et=window.innerWidth,this.Xt=window.innerHeight,this.ii=!0,this.C={MouseX:0,MouseY:0},this.ni={MouseX:0,MouseY:0},this.ei={Mouse:0,Mouse0:0,Mouse1:0,Mouse2:0,Touch0:0,Touch1:0},this.oi={},this.Nt=document.querySelector("main"),document.addEventListener("visibilitychange",(()=>document.hidden?this.si():this.ri())),this.Nt.addEventListener("contextmenu",(t=>t.preventDefault())),this.Nt.addEventListener("mousedown",(t=>{this.C["Mouse"+t.button]=1,this.ni["Mouse"+t.button]=1})),this.Nt.addEventListener("mouseup",(t=>{this.C["Mouse"+t.button]=0,this.ni["Mouse"+t.button]=-1})),this.Nt.addEventListener("mousemove",(t=>{this.C.MouseX=t.clientX,this.C.MouseY=t.clientY,this.ni.MouseX=t.movementX,this.ni.MouseY=t.movementY})),this.Nt.addEventListener("wheel",(t=>{t.preventDefault(),this.ni.WheelY=t.deltaY})),this.Nt.addEventListener("touchstart",(t=>{t.target===this.Nt&&t.preventDefault(),1===t.touches.length&&(this.oi={});for(let i=0;i<t.touches.length;i++)this.oi[t.touches[i].identifier]=i;for(let i=0;i<t.changedTouches.length;i++){let n=t.changedTouches[i],e=this.oi[n.identifier];this.C["Touch"+e]=1,this.C[`Touch${e}X`]=n.clientX,this.C[`Touch${e}Y`]=n.clientY,this.ni["Touch"+e]=1,this.ni[`Touch${e}X`]=0,this.ni[`Touch${e}Y`]=0}})),this.Nt.addEventListener("touchmove",(t=>{t.target===this.Nt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let n=t.changedTouches[i],e=this.oi[n.identifier];this.ni[`Touch${e}X`]=n.clientX-this.C[`Touch${e}X`],this.ni[`Touch${e}Y`]=n.clientY-this.C[`Touch${e}Y`],this.C[`Touch${e}X`]=n.clientX,this.C[`Touch${e}Y`]=n.clientY}})),this.Nt.addEventListener("touchend",(t=>{t.target===this.Nt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let n=this.oi[t.changedTouches[i].identifier];this.C["Touch"+n]=0,this.ni["Touch"+n]=-1}})),this.Nt.addEventListener("touchcancel",(t=>{for(let i=0;i<t.changedTouches.length;i++){let n=this.oi[t.changedTouches[i].identifier];this.C["Touch"+n]=0,this.ni["Touch"+n]=-1}})),window.addEventListener("keydown",(t=>{t.repeat||(this.C[t.code]=1,this.ni[t.code]=1)})),window.addEventListener("keyup",(t=>{this.C[t.code]=0,this.ni[t.code]=-1}))}ri(){let t=0,i=performance.now(),n=e=>{let o=(e-i)/1e3;for(i=e,this.Zt=requestAnimationFrame(n),this.hi(o),t+=o;t>=nt;)t-=nt,this.ci(nt);this.ui(o),this.li(o)};this.si(),n(i)}si(){cancelAnimationFrame(this.Zt),this.Zt=0}hi(t){this.ti=performance.now();let i=Math.abs(this.ni.MouseX)+Math.abs(this.ni.MouseY);this.ei.Mouse+=i,1===this.C.Mouse0&&(this.ei.Mouse0+=i),1===this.C.Mouse1&&(this.ei.Mouse1+=i),1===this.C.Mouse2&&(this.ei.Mouse2+=i),1===this.C.Touch0&&(this.ei.Touch0+=Math.abs(this.ni.Touch0X)+Math.abs(this.ni.Touch0Y)),1===this.C.Touch1&&(this.ei.Touch1+=Math.abs(this.ni.Touch1X)+Math.abs(this.ni.Touch1Y))}ci(t){}ui(t){}li(t){this.ii=!1,-1===this.ni.Mouse0&&(this.ei.Mouse0=0),-1===this.ni.Mouse1&&(this.ei.Mouse1=0),-1===this.ni.Mouse2&&(this.ei.Mouse2=0),-1===this.ni.Touch0&&(this.ei.Touch0=0),-1===this.ni.Touch1&&(this.ei.Touch1=0);for(let t in this.ni)this.ni[t]=0;let i=performance.now()-this.ti;Z&&(Z.textContent=i.toFixed(1)),tt&&(tt.textContent=(1e3*t).toFixed(1)),it&&(it.textContent=(1/t).toFixed())}}{constructor(){super(),this.ai=document.querySelector("#background"),this.fi=this.ai.getContext("2d"),this.di=document.querySelector("#foreground"),this.vi=this.di.getContext("2d"),this.wi=document.querySelector("#scene"),this.yt=this.wi.getContext("webgl2"),this.Audio=new AudioContext,this.pi=[],this._i={},this.yt.enable(2929),this.yt.enable(2884),this.yt.blendFunc(770,771)}}{constructor(){super(),this.i=new ot(65536),this.gt=function(t,n,e){let o=function(t,n,e){let o=t.createProgram();return t.attachShader(o,i(t,35633,n)),t.attachShader(o,i(t,35632,"#version 300 es\n\nprecision mediump float;\n\nuniform sampler2D sheet_texture;\n\nin vec2 vert_texcoord;\nin vec4 vert_color;\n\nout vec4 frag_color;\n\nvoid main() {\nfrag_color = vert_color * texture(sheet_texture, vert_texcoord);\nif (frag_color.a == 0.0) {\ndiscard;\n}\n}\n")),t.linkProgram(o),o}(t,"#version 300 es\n\nuniform mat3x2 pv;\nuniform vec2 sheet_size;\n\n\nlayout(location=0) in vec2 attr_position;\nlayout(location=1) in vec2 attr_texcoord;\n\n\nlayout(location=2) in vec4 attr_rotation; \nlayout(location=3) in vec4 attr_translation; \nlayout(location=4) in vec4 attr_color;\nlayout(location=5) in vec4 attr_sprite;\n\nout vec2 vert_texcoord;\nout vec4 vert_color;\nout vec4 vert_sprite;\n\nvoid main() {\nint signature = int(attr_translation.w);\nif ((signature & 4096) == 4096) {\nmat3x2 world;\nif ((signature & 32768) == 32768) {\nworld = mat3x2(\nattr_rotation.xy,\nattr_rotation.zw,\nattr_translation.xy\n);\n} else {\nvec2 scale = attr_rotation.xy;\nfloat rotation = attr_rotation.z;\nworld = mat3x2(\ncos(rotation) * scale.x, sin(rotation) * scale.x,\n-sin(rotation) * scale.y, cos(rotation) * scale.y,\nattr_translation.xy\n);\n}\n\nvec3 world_position = mat3(world) * vec3(attr_position, 1);\nvec3 clip_position = mat3(pv) * world_position;\ngl_Position = vec4(clip_position.xy, -attr_translation.z, 1);\n\n\nvert_texcoord = (attr_sprite.xy + attr_sprite.zw * attr_texcoord) / sheet_size;\nvert_color = attr_color;\n} else {\n\ngl_Position.z = 2.0;\n}\n}");return{bt:5,Mt:o,kt:{Tt:t.getUniformLocation(o,"pv"),i:t.getUniformLocation(o,"world"),At:t.getUniformLocation(o,"sheet_texture"),St:t.getUniformLocation(o,"sheet_size")}}}(this.yt),this.xt=function(t,i){let n=t.createTexture();return t.bindTexture(J,n),t.texImage2D(J,0,6408,6408,5121,i),t.texParameteri(J,10241,9728),t.texParameteri(J,10240,9728),t.texParameteri(J,10242,10497),t.texParameteri(J,10243,10497),{Ft:n,j:i.width,K:i.height}}(this.yt,document.querySelector("img")),this.ot=new Float32Array(this.i.jt*et),this.$t=this.yt.createBuffer(),this._t=32,this.wt=32,this.yt.clearColor(0,0,0,0),this.yt.disable(2929),this.yt.enable(3042),function(t,i){let n=Float32Array.from([-.5,-.5,0,1,.5,-.5,1,1,-.5,.5,0,0,.5,.5,1,0]);t.bindBuffer(B,t.createBuffer()),t.bufferData(B,n,35044),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,Q,!1,16,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,2,Q,!1,16,8),t.bindBuffer(B,i),t.enableVertexAttribArray(2),t.vertexAttribDivisor(2,1),t.vertexAttribPointer(2,4,Q,!1,64,0),t.enableVertexAttribArray(3),t.vertexAttribDivisor(3,1),t.vertexAttribPointer(3,4,Q,!1,64,16),t.enableVertexAttribArray(4),t.vertexAttribDivisor(4,1),t.vertexAttribPointer(4,4,Q,!1,64,32),t.enableVertexAttribArray(5),t.vertexAttribDivisor(5,1),t.vertexAttribPointer(5,4,Q,!1,64,48)}(this.yt,this.$t)}ci(t){!function(t,i){for(let n=0;n<t.i.A.length;n++)8704==(8704&t.i.A[n])&&D(t,n,i)}(this,t),function(t,i){for(let i=0;i<t.i.A.length;i++)8704==(8704&t.i.A[i])&&C(t,i)}(this),q(this),function(t,i){let n=[],e=[];for(let i=0;i<t.i.A.length;i++)if(32772==(32772&t.i.A[i])){let o=t.i.et[i],s=t.i.W[i];s._=[],s.H?(s.H=!1,c(o.i,s)):s.U?(c(o.i,s),e.push(s)):n.push(s)}for(let t=0;t<e.length;t++)l(e[t],n,n.length),l(e[t],e,t)}(this),function(t,i){for(let i=0;i<t.i.A.length;i++)(t.i.A[i]&ut)===ut&&R(t,i);for(let i=0;i<t.i.A.length;i++)if((t.i.A[i]&ut)===ut){let n=t.i.$[i];1===n.q&&d(n.tt,n.it)}}(this),function(t,i){for(let i=0;i<t.i.A.length;i++)(t.i.A[i]&_t)===_t&&K(t,i)}(this)}ui(i){!function(t,i){let n=[];for(let e=0;e<t.i.A.length;e++)if((t.i.A[e]&at)===at){if(P(t.i,e))continue;let o=t.i.Jt[e];switch(o.q){case 0:o.mi(e)&&n.push(e);break;case 1:o.ut-=i,o.ut<0&&n.push(e);break;case 2:n.push(e)}}for(let i of n){let n=t.i.Jt[i];switch(n.q){case 2:n.gi(i);case 0:case 1:t.i.dt(i)}delete t.i.Jt[i]}}(this,i),function(t,i){if(t.Et==window.innerWidth&&t.Xt==window.innerHeight||(t.ii=!0),t.ii){t.Et=t.ai.width=t.wi.width=t.di.width=window.innerWidth,t.Xt=t.ai.height=t.wi.height=t.di.height=window.innerHeight;for(let i=0;i<t.i.A.length;i++)2==(2&t.i.A[i])&&W(t,i)}}(this),function(t,i){t.pi=[];for(let i=0;i<t.i.A.length;i++)if(32770==(32770&t.i.A[i])){let s=t.i.Pt[i],r=t.i.et[i];o(s.Tt,s.Yt.Yt,r.st),n(s.i,(e=r.i)[0],e[1],e[2],e[3],e[4],e[5]),t.pi.push(i)}var e}(this),function(t,i){for(let i=0;i<t.i.A.length;i++)9232==(9232&t.i.A[i])&&f(t,i)}(this),function(i,n){let e=i.pi[0];var o,s,r;void 0!==e&&(st+=n)>.1&&function(t,i){return 1===t.C.Touch0||-1===t.ni.Touch0?(i[0]=t.C.Touch0X,i[1]=t.C.Touch0Y,!0):t.ei.Mouse>0&&(i[0]=t.C.MouseX,i[1]=t.C.MouseY,!0)}(i,rt)&&function(t,i,n=i){return t.C["Mouse"+i]>0||t.C["Touch"+n]>0}(i,0)&&((o=rt)[0]=(r=rt)[0]/(s=i.i.Pt[e]).Et*2-1,o[1]=-r[1]/s.Xt*2+1,_(o,o,s.Yt.Wt),_(o,o,s.i),t(i,[...A(),g(rt)]),st=0)}(this,i),function(t,i){for(let i=0;i<t.i.A.length;i++)1032==(1032&t.i.A[i])&&a(t,i)}(this),function(t,i){for(let n=0;n<t.i.A.length;n++)1600==(1600&t.i.A[n])&&z(t,n,i)}(this,i),function(t,i){for(let n=0;n<t.i.A.length;n++)256==(256&t.i.A[n])&&b(t,n,i)}(this,i),function(t,i){for(let i=0;i<t.i.A.length;i++)16896==(16896&t.i.A[i])&&H(t,i)}(this),function(t,i){for(let n=0;n<t.i.A.length;n++)(t.i.A[n]&vt)==vt&&V(t,n,i)}(this,i),function(t,i){for(let n=0;n<t.i.A.length;n++)98304==(98304&t.i.A[n])&&U(t,n,i)}(this,i),q(this),function(t,i){let n=t.pi[0];if(void 0===n)return;let e=t.i.Pt[n],o=t.fi;o.resetTransform(),o.fillStyle="#EEE",o.fillRect(0,0,t.Et,t.Xt),o.transform(e.Tt[0]/2*t.Et,-e.Tt[1]/2*t.Et,-e.Tt[2]/2*t.Xt,e.Tt[3]/2*t.Xt,(e.Tt[4]+1)/2*t.Et,(e.Tt[5]+1)/2*t.Xt);for(let i=0;i<t.i.A.length;i++)if(32896==(32896&t.i.A[i])){let n=t.i.et[i];o.save(),o.transform(n.i[0],-n.i[1],-n.i[2],n.i[3],n.i[4],-n.i[5]);let e=t.i.V[i];switch(e.q){case 1:o.fillStyle=e.I,o.fillRect(-e.j/2,-e.K/2,e.j,e.K);break;case 2:o.fillStyle=e.I,o.beginPath(),o.arc(0,0,e.L,e.G,e.N),o.fill()}o.restore()}}(this),function(t,i){for(let n=0;n<t.i.A.length;n++)4097==(4097&t.i.A[n])&&Y(t,n,i)}(this,i),function(t,i){for(let i=0;i<t.i.A.length;i++){let n=36864&t.i.A[i],e=i*et+7;t.ot[e]!==n&&(t.ot[e]=n)}for(let i of t.pi){let n=t.i.Pt[i];t.yt.bindFramebuffer(36160,null),t.yt.viewport(0,0,t.Et,t.Xt),t.yt.clear(16640),E(t,n);break}}(this),G(this)}};!function(i){var n;i.i=new ot(65536),i.ii=!0,t(i,[F(),m([0,0]),(n=[i._t/2+1,i.wt/2+1],(t,i)=>{t.i.A[i]|=2,t.i.Pt[i]={Yt:{L:n,Yt:[1/n[0],0,0,1/n[1],0,0],Wt:[n[0],0,0,n[1],0,0]},Tt:[1,0,0,1,0,0],i:[1,0,0,1,0,0],Et:0,Xt:0}})]),t(i,[F(),m(),y("#FFD6D5",i._t,i.wt)]),t(i,[F(),m([-5,3],0),M("#D4FCA9",7)]),t(i,[F(),m([0,0],-30,[4,1]),T(0,5),(t,i)=>{t.i.A[i]|=8,t.i.T[i]={F:null,S:1}},S([F(),m([0,0],30),y("#FFAA79",5,5)])]);for(let n=0;n<10;n++){let n=N(-i._t/2,i._t/2),e=N(-i.wt/2,i.wt/2);t(i,[F(),m([n,e],0,[4,1]),x(!1,1,0,[4,1]),k(0),y("green")])}t(i,[...A(),(t,i)=>{let n=t.i.P[i];n.X[0]=0,n.X[1]=5}])}(gt),gt.ri(),window.$=function(t,i,n){}.bind(null,gt),window.game=gt})();
