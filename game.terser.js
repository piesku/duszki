(()=>{function t(t,i){let h=t.i.t();for(let n of i)n(t,h);return h}function i(t,i,h){let n=t.createShader(i);return t.shaderSource(n,h),t.compileShader(n),n}function h(t,i,h,n,e,o,s){return t[0]=i,t[1]=h,t[2]=n,t[3]=e,t[4]=o,t[5]=s,t}function n(t,i){let h=i[0],n=i[1],e=i[2],o=i[3],s=i[4],r=i[5],g=h*o-n*e;return g?(g=1/g,t[0]=o*g,t[1]=-n*g,t[2]=-e*g,t[3]=h*g,t[4]=(e*r-o*s)*g,t[5]=(n*s-h*r)*g,t):null}function e(t,i,h){let n=i[0],e=i[1],o=i[2],s=i[3],r=i[4],g=i[5],d=h[0],c=h[1],u=h[2],l=h[3],a=h[4],w=h[5];return t[0]=n*d+o*c,t[1]=e*d+s*c,t[2]=n*u+o*l,t[3]=e*u+s*l,t[4]=n*a+o*w+r,t[5]=e*a+s*w+g,t}function o(t,i,h,n){let e=Math.sin(h),o=Math.cos(h);return t[0]=o*n[0],t[1]=e*n[0],t[2]=-e*n[1],t[3]=o*n[1],t[4]=i[0],t[5]=i[1],t}function s(t,i){return t[0]=i[4],t[1]=i[5],t}function r(t,i,n){return h(t,i,0,0,n,0,0),t}function g(t,i){s(i.h,t),i.o[0]=i.h[0]-i.g[0]/2,i.o[1]=i.h[1]-i.g[1]/2,i.u[0]=i.h[0]+i.g[0]/2,i.u[1]=i.h[1]+i.g[1]/2}function d(t,i){let h=t.h[0]-i.h[0],n=t.g[0]/2+i.g[0]/2-Math.abs(h),e=t.h[1]-i.h[1],o=t.g[1]/2+i.g[1]/2-Math.abs(e);return n<o?[n*Math.sign(h),0]:[0,o*Math.sign(e)]}function c(t,i,h){for(let o=0;o<h;o++){let h=i[o],s=t.l&h.p,r=h.l&t.p;if((s||r)&&(n=t).o[0]<(e=h).u[0]&&n.u[0]>e.o[0]&&n.o[1]<e.u[1]&&n.u[1]>e.o[1]){let i=d(t,h);s&&t.v.push({m:h._,M:i}),r&&h.v.push({m:t._,M:[-i[0],-i[1]]})}}var n,e}function u(t,i){let h=t.i.T[i],n=t.i.F[i];h.A&&(n.A[0]=h.A[0],n.A[1]=h.A[1],t.i.k[i]|=64),h.S&&(n.S=h.S,t.i.k[i]|=64)}function l(t,i){let h=t.i.F[i],n=t.i.$[i];t.C.ArrowLeft&&(h.A[0]-=1,t.i.k[i]|=64),t.C.ArrowRight&&(h.A[0]+=1,t.i.k[i]|=64),t.C.ArrowUp&&n.D&&(n.R[1]=500)}function a(t,i){return t[0]=i[0],t[1]=i[1],t}function w(t,i,h){return t[0]=i[0]+h[0],t[1]=i[1]+h[1],t}function p(t,i,h){return t[0]=i[0]*h,t[1]=i[1]*h,t}function f(t,i){let h=i[0],n=i[1],e=h*h+n*n;return e>0&&(e=1/Math.sqrt(e)),t[0]=i[0]*e,t[1]=i[1]*e,t}function x(t,i,h){let n=i[0],e=i[1];return t[0]=h[0]*n+h[2]*e+h[4],t[1]=h[1]*n+h[3]*e+h[5],t}function y(t=[0,0],i=0,h=[1,1]){return(n,e)=>{n.i.k[e]|=576,n.i.P[e]={X:t,S:i,Y:h}}}function v(t){return(i,h)=>{a(i.i.P[h].X,t)}}function m(t,i,h,n=[1,1]){return(e,o)=>{e.i.k[o]|=4,e.i.W[o]={_:o,H:!0,U:t,p:i,l:h,g:n,o:[0,0],u:[0,0],h:[0,0],v:[]}}}function _(t,i=1,h=1){return(n,e)=>{n.i.k[e]|=128,n.i.V[e]={q:1,I:t,j:i,K:h}}}function M(t,i,h=0,n=2*Math.PI){return(e,o)=>{e.i.k[o]|=128,e.i.V[o]={q:2,I:t,L:i,G:h,N:n}}}function T(t,i){return(h,n)=>{h.i.k[n]|=1024,h.i.F[n]={O:t,B:i,A:[0,0],S:0}}}function F(t,i=1,h=.001){return(n,e)=>{n.i.k[e]|=8192,n.i.$[e]={q:t,J:h,Z:i,R:[0,0],tt:[0,0],it:[0,0],ht:0,D:!1}}}function A(t=!1){return(i,h)=>{i.i.k[h]|=32832,i.i.nt[h]={i:i.et.subarray(h*nt,h*nt+6),ot:[1,0,0,1,0,0],st:t}}}function k(t){return[A(),y(),m(!0,2,3),F(1,.3),(t,i)=>{t.i.k[i]|=16,t.i.rt[i]={}},T(7,0),_("red"),(t,i)=>{t.i.k[i]|=256,t.i.gt[i]={dt:10,ct:void 0}}]}function S(...i){return(h,n)=>{32&h.i.k[n]||(h.i.k[n]|=32,h.i.ut[n]={ut:[]});let e=h.i.ut[n].ut;for(let n of i){let i=t(h,n);e.push(i)}}}function $(t,i){if(32&t.k[i])for(let h of t.ut[i].ut)$(t,h);0===t.k[i]||t.lt(i)}function b(t,i,h){let n=t.i.gt[i];n.dt-=h,n.dt<0&&$(t.i,i)}function z(t,i,h){let n=t.i.P[i],e=t.i.F[i];if(e.A[0]||e.A[1]){rt[0]=e.A[0],rt[1]=e.A[1];let s=Math.min(1,Math.hypot((o=rt)[0],o[1]));if(32768&t.i.k[i]){let h=t.i.nt[i];!function(t,i,h){let n=i[0],e=i[1];t[0]=h[0]*n+h[2]*e,t[1]=h[1]*n+h[3]*e}(rt,rt,void 0!==h.wt?t.i.nt[h.wt].ot:h.i)}else!function(t,i,h){let n=Math.cos(h),e=Math.sin(h);t[0]=n*i[0]-e*i[1],t[1]=e*i[0]+n*i[1]}(rt,rt,n.S);f(rt,rt),p(rt,rt,s*e.O*h),w(n.X,n.X,rt),e.A[0]=0,e.A[1]=0}var o;e.S&&(n.S+=e.S*e.B*h,e.S=0)}function C(t,i,h){let n=t.i.P[i],e=t.i.$[i];if(1===e.q){let i=t.ft/2,h=t.xt/2;n.X[1]>i&&(n.X[1]=i,e.tt[1]*=-e.Z),n.X[1]<-i&&(n.X[1]=-i,e.tt[1]*=-e.Z),n.X[0]<-h&&(n.X[0]=-h,e.tt[0]*=-e.Z),n.X[0]>h&&(n.X[0]=h,e.tt[0]*=-e.Z)}}function D(t,i,h){let n=t.i.P[i],e=t.i.$[i];var o;1===e.q&&(e.tt[1]+=-9.8*h,p(e.R,e.R,h),w(e.tt,e.tt,e.R),p(e.tt,e.tt,1-e.J),p(gt,e.tt,h),w(n.X,n.X,gt),n.S+=e.ht*h,t.i.k[i]|=64,(o=e.R)[0]=0,o[1]=0)}function R(t,i){let h=t.i.P[i],n=t.i.$[i],e=t.i.W[i];if(1===n.q){n.D=!1;let r=!1;for(let g=0;g<e.v.length;g++){let d=e.v[g];if(8192&t.i.k[d.m]){r=!0,w(h.X,h.X,d.M),t.i.k[i]|=64;let e=t.i.$[d.m];switch(e.q){case 0:f(ct,d.M),p(ct,ct,-2*((o=n.tt)[0]*(s=ct)[0]+o[1]*s[1])),w(n.it,n.tt,ct);break;case 1:a(n.it,e.tt)}p(n.it,n.it,n.Z),d.M[1]>0&&n.it[1]<1&&(n.it[1]=0,n.D=!0)}}r||a(n.it,n.tt)}var o,s}function P(t,i){if(32&t.k[i]){let h=t.ut[i];for(let i of h.ut)if(131072&t.k[i])return!0}return!1}function E(t,i){let h=t.yt,n=t.vt;t._t.useProgram(h.Mt),t._t.uniformMatrix3x2fv(h.Ft.Tt,!1,i.Tt),t._t.activeTexture(33984),t._t.bindTexture(J,n.At),t._t.uniform1i(h.Ft.kt,0),t._t.uniform2f(h.Ft.St,n.j,n.K),t._t.bindBuffer(B,t.$t),t._t.bufferData(B,t.et,35040),t._t.drawArraysInstanced(h.bt,0,4,t.i.k.length)}function X(t,i,h){let n=i*nt;t.et[n+12]=lt[h].x,t.et[n+13]=lt[h].y,t.et[n+14]=lt[h].width,t.et[n+15]=lt[h].height}function Y(t,i,h){let n=t.i.zt[i];for(let h in n.Ct)if(n.Dt<n.Ct[h]){X(t,i,h);break}n.Dt+=h,n.Dt>=n.Rt&&(n.Dt-=n.Rt)}function W(t,i){let h=t.i.Pt[i];h.Et=t.Et,h.Xt=t.Xt;let e=h.Yt,o=t.Et/t.Xt;if(0===e.L[0]&&0===e.L[1]){let i=t.Xt/32/2;r(e.Wt,i*o,i)}else o<e.L[0]/e.L[1]?r(e.Wt,e.L[0],e.L[0]/o):r(e.Wt,e.L[1]*o,e.L[1]);n(e.Yt,e.Wt)}function H(t,i){let h=t.i.Ht[i],n=t.i.P[i];n.X[0]=(Math.random()-.5)*h.L*2,n.X[1]=(Math.random()-.5)*h.L*2,t.i.k[i]|=64}function U(i,h,n){let e=i.i.Ut[h];e.Vt+=n,e.Vt>e.qt&&(e.Vt=0,s(at,i.i.nt[h].i),i.i.k.length-i.i.It.length<i.i.jt&&t(i,[...e.Kt(i),v(at)]))}function V(t,i,h){let n=t.i.Lt[i];n.Vt+=h,n.Vt>n.Gt&&(n.Vt=0,(t.i.k[i]&n.l)===n.l?t.i.k[i]&=~n.l:t.i.k[i]|=n.l)}function q(t,i){for(let i=0;i<t.i.k.length;i++)576==(576&t.i.k[i])&&(32768&t.i.k[i]?j(t,i):I(t,i))}function I(t,i){t.i.k[i]&=-65;let h=t.i.P[i],n=i*nt;t.et[n+0]=h.Y[0],t.et[n+1]=h.Y[1],t.et[n+2]=h.S*pt,t.et[n+4]=h.X[0],t.et[n+5]=h.X[1]}function j(t,i,h){t.i.k[i]&=-65;let r=t.i.P[i],g=t.i.nt[i];if(o(g.i,r.X,r.S*pt,r.Y),void 0!==h&&(g.wt=h),void 0!==g.wt&&(e(g.i,t.i.nt[g.wt].i,g.i),g.st&&(s(ft,g.i),o(g.i,ft,r.S*pt,r.Y))),n(g.ot,g.i),32&t.i.k[i]){let h=t.i.ut[i];for(let n=0;n<h.ut.length;n++){let e=h.ut[n];33280==(33280&t.i.k[e])&&j(t,e,i)}}}function K(t,i){let h=t.i.W[i];for(let t of h.v);}function L(t,...i){return t.reduce(((t,h)=>t+function(t){let i=t.shift();return"boolean"==typeof i||null==i?"":Array.isArray(i)?i.join(""):i}(i)+h))}function G(t,i){let h=L`
<div style="margin: 10px;">
<h1 style="float: left; margin-right: 10px;">NewProject2D</h1>
<div>Click to spawn new squares.</div>
<div>Use the arrow keys to move all squares at once.</div>
<div>A square lives for ${10} seconds.</div>
</div>
`;h!==O&&(t.Nt.innerHTML=O=h)}function N(t=0,i=1){return((yt=16807*yt%2147483647)-1)/2147483646*(i-t)+t}var O,B=34962,J=3553,Q=5126,Z=document.getElementById("update"),tt=document.getElementById("delta"),it=document.getElementById("fps"),ht=1/60,nt=16,et=class extends class{constructor(t=1e4){this.k=[],this.It=[],this.jt=t}t(){return this.It.length>0?this.It.pop():this.k.push(0)-1}lt(t){this.k[t]=0,this.It.push(t)}}{constructor(){super(...arguments),this.zt=[],this.Pt=[],this.W=[],this.T=[],this.rt=[],this.ut=[],this.V=[],this.gt=[],this.P=[],this.F=[],this.Ot=[],this.Bt=[],this.$=[],this.Ht=[],this.nt=[],this.Ut=[],this.Jt=[],this.Lt=[],this.Qt=[]}},ot=0,st=[0,0],rt=[0,0],gt=[0,0],dt=8708,ct=[0,0],ut=131072,lt={"000.png":{x:0,y:0,width:16,height:16},"001.png":{x:16,y:0,width:16,height:16},"002.png":{x:0,y:16,width:16,height:16},"003.png":{x:16,y:16,width:16,height:16},"004.png":{x:32,y:0,width:16,height:16},"005.png":{x:32,y:16,width:16,height:16},"006.png":{x:0,y:32,width:16,height:16},"007.png":{x:16,y:32,width:16,height:16},"008.png":{x:32,y:32,width:16,height:16},"009.png":{x:48,y:0,width:16,height:16},"010.png":{x:48,y:16,width:16,height:16},"011.png":{x:48,y:32,width:16,height:16},"012.png":{x:0,y:48,width:16,height:16},"013.png":{x:16,y:48,width:16,height:16},"014.png":{x:32,y:48,width:16,height:16},"015.png":{x:48,y:48,width:16,height:16},"016.png":{x:64,y:0,width:16,height:16},"017.png":{x:64,y:16,width:16,height:16},"018.png":{x:64,y:32,width:16,height:16},"019.png":{x:64,y:48,width:16,height:16},"020.png":{x:0,y:64,width:16,height:16},"021.png":{x:16,y:64,width:16,height:16},"022.png":{x:32,y:64,width:16,height:16},"023.png":{x:48,y:64,width:16,height:16},"024.png":{x:64,y:64,width:16,height:16},"025.png":{x:80,y:0,width:16,height:16},"026.png":{x:80,y:16,width:16,height:16},"027.png":{x:80,y:32,width:16,height:16},"028.png":{x:80,y:48,width:16,height:16},"029.png":{x:80,y:64,width:16,height:16},"030.png":{x:0,y:80,width:16,height:16},"031.png":{x:16,y:80,width:16,height:16},"032.png":{x:32,y:80,width:16,height:16},"033.png":{x:48,y:80,width:16,height:16},"034.png":{x:64,y:80,width:16,height:16},"035.png":{x:80,y:80,width:16,height:16},"036.png":{x:96,y:0,width:16,height:16},"037.png":{x:96,y:16,width:16,height:16},"038.png":{x:96,y:32,width:16,height:16},"039.png":{x:96,y:48,width:16,height:16},"040.png":{x:96,y:64,width:16,height:16},"041.png":{x:96,y:80,width:16,height:16},"042.png":{x:0,y:96,width:16,height:16},"043.png":{x:16,y:96,width:16,height:16},"044.png":{x:32,y:96,width:16,height:16},"045.png":{x:48,y:96,width:16,height:16},"046.png":{x:64,y:96,width:16,height:16},"047.png":{x:80,y:96,width:16,height:16},"048.png":{x:96,y:96,width:16,height:16},"049.png":{x:112,y:0,width:16,height:16},"050.png":{x:112,y:16,width:16,height:16},"051.png":{x:112,y:32,width:16,height:16},"052.png":{x:112,y:48,width:16,height:16},"053.png":{x:112,y:64,width:16,height:16},"054.png":{x:112,y:80,width:16,height:16},"055.png":{x:112,y:96,width:16,height:16},"056.png":{x:0,y:112,width:16,height:16},"057.png":{x:16,y:112,width:16,height:16},"058.png":{x:32,y:112,width:16,height:16},"059.png":{x:48,y:112,width:16,height:16},"060.png":{x:64,y:112,width:16,height:16},"061.png":{x:80,y:112,width:16,height:16},"062.png":{x:96,y:112,width:16,height:16},"063.png":{x:112,y:112,width:16,height:16},"064.png":{x:128,y:0,width:16,height:16},"065.png":{x:128,y:16,width:16,height:16},"066.png":{x:128,y:32,width:16,height:16},"067.png":{x:128,y:48,width:16,height:16},"068.png":{x:128,y:64,width:16,height:16},"069.png":{x:128,y:80,width:16,height:16},"070.png":{x:128,y:96,width:16,height:16},"071.png":{x:128,y:112,width:16,height:16},"072.png":{x:0,y:128,width:16,height:16},"073.png":{x:16,y:128,width:16,height:16},"074.png":{x:32,y:128,width:16,height:16},"075.png":{x:48,y:128,width:16,height:16},"076.png":{x:64,y:128,width:16,height:16},"077.png":{x:80,y:128,width:16,height:16},"078.png":{x:96,y:128,width:16,height:16},"079.png":{x:112,y:128,width:16,height:16},"080.png":{x:128,y:128,width:16,height:16},"081.png":{x:144,y:0,width:16,height:16},"082.png":{x:144,y:16,width:16,height:16},"083.png":{x:144,y:32,width:16,height:16},"084.png":{x:144,y:48,width:16,height:16},"085.png":{x:144,y:64,width:16,height:16},"086.png":{x:144,y:80,width:16,height:16},"087.png":{x:144,y:96,width:16,height:16},"088.png":{x:144,y:112,width:16,height:16},"089.png":{x:144,y:128,width:16,height:16},"090.png":{x:0,y:144,width:16,height:16},"091.png":{x:16,y:144,width:16,height:16},"092.png":{x:32,y:144,width:16,height:16},"093.png":{x:48,y:144,width:16,height:16},"094.png":{x:64,y:144,width:16,height:16},"095.png":{x:80,y:144,width:16,height:16},"096.png":{x:96,y:144,width:16,height:16},"097.png":{x:112,y:144,width:16,height:16},"098.png":{x:128,y:144,width:16,height:16},"099.png":{x:144,y:144,width:16,height:16},"100.png":{x:160,y:0,width:16,height:16},"101.png":{x:160,y:16,width:16,height:16},"102.png":{x:160,y:32,width:16,height:16},"103.png":{x:160,y:48,width:16,height:16},"104.png":{x:160,y:64,width:16,height:16},"105.png":{x:160,y:80,width:16,height:16},"106.png":{x:160,y:96,width:16,height:16},"107.png":{x:160,y:112,width:16,height:16},"108.png":{x:160,y:128,width:16,height:16},"109.png":{x:160,y:144,width:16,height:16},"110.png":{x:0,y:160,width:16,height:16},"111.png":{x:16,y:160,width:16,height:16},"112.png":{x:32,y:160,width:16,height:16},"113.png":{x:48,y:160,width:16,height:16},"114.png":{x:64,y:160,width:16,height:16},"115.png":{x:80,y:160,width:16,height:16},"116.png":{x:96,y:160,width:16,height:16},"117.png":{x:112,y:160,width:16,height:16},"118.png":{x:128,y:160,width:16,height:16},"119.png":{x:144,y:160,width:16,height:16},"120.png":{x:160,y:160,width:16,height:16},"121.png":{x:176,y:0,width:16,height:16},"122.png":{x:176,y:16,width:16,height:16},"123.png":{x:176,y:32,width:16,height:16},"124.png":{x:176,y:48,width:16,height:16},"125.png":{x:176,y:64,width:16,height:16},"126.png":{x:176,y:80,width:16,height:16},"127.png":{x:176,y:96,width:16,height:16},"128.png":{x:176,y:112,width:16,height:16},"129.png":{x:176,y:128,width:16,height:16},"130.png":{x:176,y:144,width:16,height:16},"131.png":{x:176,y:160,width:16,height:16}},at=[0,0],wt=262144,pt=Math.PI/180,ft=[0,0],xt=524292,yt=1,vt=new class extends class extends class{constructor(){this.Zt=0,this.ti=0,this.Et=window.innerWidth,this.Xt=window.innerHeight,this.ii=!0,this.C={MouseX:0,MouseY:0},this.hi={MouseX:0,MouseY:0},this.ni={Mouse:0,Mouse0:0,Mouse1:0,Mouse2:0,Touch0:0,Touch1:0},this.ei={},this.Nt=document.querySelector("main"),document.addEventListener("visibilitychange",(()=>document.hidden?this.oi():this.si())),this.Nt.addEventListener("contextmenu",(t=>t.preventDefault())),this.Nt.addEventListener("mousedown",(t=>{this.C["Mouse"+t.button]=1,this.hi["Mouse"+t.button]=1})),this.Nt.addEventListener("mouseup",(t=>{this.C["Mouse"+t.button]=0,this.hi["Mouse"+t.button]=-1})),this.Nt.addEventListener("mousemove",(t=>{this.C.MouseX=t.clientX,this.C.MouseY=t.clientY,this.hi.MouseX=t.movementX,this.hi.MouseY=t.movementY})),this.Nt.addEventListener("wheel",(t=>{t.preventDefault(),this.hi.WheelY=t.deltaY})),this.Nt.addEventListener("touchstart",(t=>{t.target===this.Nt&&t.preventDefault(),1===t.touches.length&&(this.ei={});for(let i=0;i<t.touches.length;i++)this.ei[t.touches[i].identifier]=i;for(let i=0;i<t.changedTouches.length;i++){let h=t.changedTouches[i],n=this.ei[h.identifier];this.C["Touch"+n]=1,this.C[`Touch${n}X`]=h.clientX,this.C[`Touch${n}Y`]=h.clientY,this.hi["Touch"+n]=1,this.hi[`Touch${n}X`]=0,this.hi[`Touch${n}Y`]=0}})),this.Nt.addEventListener("touchmove",(t=>{t.target===this.Nt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let h=t.changedTouches[i],n=this.ei[h.identifier];this.hi[`Touch${n}X`]=h.clientX-this.C[`Touch${n}X`],this.hi[`Touch${n}Y`]=h.clientY-this.C[`Touch${n}Y`],this.C[`Touch${n}X`]=h.clientX,this.C[`Touch${n}Y`]=h.clientY}})),this.Nt.addEventListener("touchend",(t=>{t.target===this.Nt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let h=this.ei[t.changedTouches[i].identifier];this.C["Touch"+h]=0,this.hi["Touch"+h]=-1}})),this.Nt.addEventListener("touchcancel",(t=>{for(let i=0;i<t.changedTouches.length;i++){let h=this.ei[t.changedTouches[i].identifier];this.C["Touch"+h]=0,this.hi["Touch"+h]=-1}})),window.addEventListener("keydown",(t=>{t.repeat||(this.C[t.code]=1,this.hi[t.code]=1)})),window.addEventListener("keyup",(t=>{this.C[t.code]=0,this.hi[t.code]=-1}))}si(){let t=0,i=performance.now(),h=n=>{let e=(n-i)/1e3;for(i=n,this.Zt=requestAnimationFrame(h),this.ri(e),t+=e;t>=ht;)t-=ht,this.gi(ht);this.di(e),this.ci(e)};this.oi(),h(i)}oi(){cancelAnimationFrame(this.Zt),this.Zt=0}ri(t){this.ti=performance.now();let i=Math.abs(this.hi.MouseX)+Math.abs(this.hi.MouseY);this.ni.Mouse+=i,1===this.C.Mouse0&&(this.ni.Mouse0+=i),1===this.C.Mouse1&&(this.ni.Mouse1+=i),1===this.C.Mouse2&&(this.ni.Mouse2+=i),1===this.C.Touch0&&(this.ni.Touch0+=Math.abs(this.hi.Touch0X)+Math.abs(this.hi.Touch0Y)),1===this.C.Touch1&&(this.ni.Touch1+=Math.abs(this.hi.Touch1X)+Math.abs(this.hi.Touch1Y))}gi(t){}di(t){}ci(t){this.ii=!1,-1===this.hi.Mouse0&&(this.ni.Mouse0=0),-1===this.hi.Mouse1&&(this.ni.Mouse1=0),-1===this.hi.Mouse2&&(this.ni.Mouse2=0),-1===this.hi.Touch0&&(this.ni.Touch0=0),-1===this.hi.Touch1&&(this.ni.Touch1=0);for(let t in this.hi)this.hi[t]=0;let i=performance.now()-this.ti;Z&&(Z.textContent=i.toFixed(1)),tt&&(tt.textContent=(1e3*t).toFixed(1)),it&&(it.textContent=(1/t).toFixed())}}{constructor(){super(),this.ui=document.querySelector("#background"),this.li=this.ui.getContext("2d"),this.ai=document.querySelector("#foreground"),this.wi=this.ai.getContext("2d"),this.pi=document.querySelector("#scene"),this._t=this.pi.getContext("webgl2"),this.Audio=new AudioContext,this.fi=[],this.xi={},this._t.enable(2929),this._t.enable(2884),this._t.blendFunc(770,771)}}{constructor(){super(),this.i=new et(65536),this.yt=function(t,h,n){let e=function(t,h,n){let e=t.createProgram();return t.attachShader(e,i(t,35633,h)),t.attachShader(e,i(t,35632,"#version 300 es\n\nprecision mediump float;\n\nuniform sampler2D sheet_texture;\n\nin vec2 vert_texcoord;\nin vec4 vert_color;\n\nout vec4 frag_color;\n\nvoid main() {\nfrag_color = vert_color * texture(sheet_texture, vert_texcoord);\nif (frag_color.a == 0.0) {\ndiscard;\n}\n}\n")),t.linkProgram(e),e}(t,"#version 300 es\n\nuniform mat3x2 pv;\nuniform vec2 sheet_size;\n\n\nlayout(location=0) in vec2 attr_position;\nlayout(location=1) in vec2 attr_texcoord;\n\n\nlayout(location=2) in vec4 attr_rotation; \nlayout(location=3) in vec4 attr_translation; \nlayout(location=4) in vec4 attr_color;\nlayout(location=5) in vec4 attr_sprite;\n\nout vec2 vert_texcoord;\nout vec4 vert_color;\nout vec4 vert_sprite;\n\nvoid main() {\nint signature = int(attr_translation.w);\nif ((signature & 4096) == 4096) {\nmat3x2 world;\nif ((signature & 32768) == 32768) {\nworld = mat3x2(\nattr_rotation.xy,\nattr_rotation.zw,\nattr_translation.xy\n);\n} else {\nvec2 scale = attr_rotation.xy;\nfloat rotation = attr_rotation.z;\nworld = mat3x2(\ncos(rotation) * scale.x, sin(rotation) * scale.x,\n-sin(rotation) * scale.y, cos(rotation) * scale.y,\nattr_translation.xy\n);\n}\n\nvec3 world_position = mat3(world) * vec3(attr_position, 1);\nvec3 clip_position = mat3(pv) * world_position;\ngl_Position = vec4(clip_position.xy, -attr_translation.z, 1);\n\n\nvert_texcoord = (attr_sprite.xy + attr_sprite.zw * attr_texcoord) / sheet_size;\nvert_color = attr_color;\n} else {\n\ngl_Position.z = 2.0;\n}\n}");return{bt:5,Mt:e,Ft:{Tt:t.getUniformLocation(e,"pv"),i:t.getUniformLocation(e,"world"),kt:t.getUniformLocation(e,"sheet_texture"),St:t.getUniformLocation(e,"sheet_size")}}}(this._t),this.vt=function(t,i){let h=t.createTexture();return t.bindTexture(J,h),t.texImage2D(J,0,6408,6408,5121,i),t.texParameteri(J,10241,9728),t.texParameteri(J,10240,9728),t.texParameteri(J,10242,10497),t.texParameteri(J,10243,10497),{At:h,j:i.width,K:i.height}}(this._t,document.querySelector("img")),this.et=new Float32Array(this.i.jt*nt),this.$t=this._t.createBuffer(),this.xt=32,this.ft=32,this._t.clearColor(0,0,0,0),this._t.disable(2929),this._t.enable(3042),function(t,i){let h=Float32Array.from([-.5,-.5,0,1,.5,-.5,1,1,-.5,.5,0,0,.5,.5,1,0]);t.bindBuffer(B,t.createBuffer()),t.bufferData(B,h,35044),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,Q,!1,16,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,2,Q,!1,16,8),t.bindBuffer(B,i),t.enableVertexAttribArray(2),t.vertexAttribDivisor(2,1),t.vertexAttribPointer(2,4,Q,!1,64,0),t.enableVertexAttribArray(3),t.vertexAttribDivisor(3,1),t.vertexAttribPointer(3,4,Q,!1,64,16),t.enableVertexAttribArray(4),t.vertexAttribDivisor(4,1),t.vertexAttribPointer(4,4,Q,!1,64,32),t.enableVertexAttribArray(5),t.vertexAttribDivisor(5,1),t.vertexAttribPointer(5,4,Q,!1,64,48)}(this._t,this.$t)}gi(t){!function(t,i){for(let h=0;h<t.i.k.length;h++)8704==(8704&t.i.k[h])&&D(t,h,i)}(this,t),function(t,i){for(let i=0;i<t.i.k.length;i++)8704==(8704&t.i.k[i])&&C(t,i)}(this),q(this),function(t,i){let h=[],n=[];for(let i=0;i<t.i.k.length;i++)if(32772==(32772&t.i.k[i])){let e=t.i.nt[i],o=t.i.W[i];o.v=[],o.H?(o.H=!1,g(e.i,o)):o.U?(g(e.i,o),n.push(o)):h.push(o)}for(let t=0;t<n.length;t++)c(n[t],h,h.length),c(n[t],n,t)}(this),function(t,i){for(let i=0;i<t.i.k.length;i++)(t.i.k[i]&dt)===dt&&R(t,i);for(let i=0;i<t.i.k.length;i++)if((t.i.k[i]&dt)===dt){let h=t.i.$[i];1===h.q&&a(h.tt,h.it)}}(this),function(t,i){for(let i=0;i<t.i.k.length;i++)(t.i.k[i]&xt)===xt&&K(t,i)}(this)}di(i){!function(t,i){let h=[];for(let n=0;n<t.i.k.length;n++)if((t.i.k[n]&ut)===ut){if(P(t.i,n))continue;let e=t.i.Jt[n];switch(e.q){case 0:e.yi(n)&&h.push(n);break;case 1:e.dt-=i,e.dt<0&&h.push(n);break;case 2:h.push(n)}}for(let i of h){let h=t.i.Jt[i];switch(h.q){case 2:h.vi(i);case 0:case 1:t.i.lt(i)}delete t.i.Jt[i]}}(this,i),function(t,i){if(t.Et==window.innerWidth&&t.Xt==window.innerHeight||(t.ii=!0),t.ii){t.Et=t.ui.width=t.pi.width=t.ai.width=window.innerWidth,t.Xt=t.ui.height=t.pi.height=t.ai.height=window.innerHeight;for(let i=0;i<t.i.k.length;i++)2==(2&t.i.k[i])&&W(t,i)}}(this),function(t,i){t.fi=[];for(let i=0;i<t.i.k.length;i++)if(32770==(32770&t.i.k[i])){let o=t.i.Pt[i],s=t.i.nt[i];e(o.Tt,o.Yt.Yt,s.ot),h(o.i,(n=s.i)[0],n[1],n[2],n[3],n[4],n[5]),t.fi.push(i)}var n}(this),function(t,i){for(let i=0;i<t.i.k.length;i++)9232==(9232&t.i.k[i])&&l(t,i)}(this),function(i,h){let n=i.fi[0];var e,o,s;void 0!==n&&(ot+=h)>.1&&function(t,i){return 1===t.C.Touch0||-1===t.hi.Touch0?(i[0]=t.C.Touch0X,i[1]=t.C.Touch0Y,!0):t.ni.Mouse>0&&(i[0]=t.C.MouseX,i[1]=t.C.MouseY,!0)}(i,st)&&function(t,i,h=i){return t.C["Mouse"+i]>0||t.C["Touch"+h]>0}(i,0)&&((e=st)[0]=(s=st)[0]/(o=i.i.Pt[n]).Et*2-1,e[1]=-s[1]/o.Xt*2+1,x(e,e,o.Yt.Wt),x(e,e,o.i),t(i,[...k(),v(st)]),ot=0)}(this,i),function(t,i){for(let i=0;i<t.i.k.length;i++)1032==(1032&t.i.k[i])&&u(t,i)}(this),function(t,i){for(let h=0;h<t.i.k.length;h++)1600==(1600&t.i.k[h])&&z(t,h,i)}(this,i),function(t,i){for(let h=0;h<t.i.k.length;h++)256==(256&t.i.k[h])&&b(t,h,i)}(this,i),function(t,i){for(let i=0;i<t.i.k.length;i++)16896==(16896&t.i.k[i])&&H(t,i)}(this),function(t,i){for(let h=0;h<t.i.k.length;h++)(t.i.k[h]&wt)==wt&&V(t,h,i)}(this,i),function(t,i){for(let h=0;h<t.i.k.length;h++)98304==(98304&t.i.k[h])&&U(t,h,i)}(this,i),q(this),function(t,i){let h=t.fi[0];if(void 0===h)return;let n=t.i.Pt[h],e=t.li;e.resetTransform(),e.fillStyle="#EEE",e.fillRect(0,0,t.Et,t.Xt),e.transform(n.Tt[0]/2*t.Et,-n.Tt[1]/2*t.Et,-n.Tt[2]/2*t.Xt,n.Tt[3]/2*t.Xt,(n.Tt[4]+1)/2*t.Et,(n.Tt[5]+1)/2*t.Xt);for(let i=0;i<t.i.k.length;i++)if(32896==(32896&t.i.k[i])){let h=t.i.nt[i];e.save(),e.transform(h.i[0],-h.i[1],-h.i[2],h.i[3],h.i[4],-h.i[5]);let n=t.i.V[i];switch(n.q){case 1:e.fillStyle=n.I,e.fillRect(-n.j/2,-n.K/2,n.j,n.K);break;case 2:e.fillStyle=n.I,e.beginPath(),e.arc(0,0,n.L,n.G,n.N),e.fill()}e.restore()}}(this),function(t,i){for(let h=0;h<t.i.k.length;h++)4097==(4097&t.i.k[h])&&Y(t,h,i)}(this,i),function(t,i){for(let i=0;i<t.i.k.length;i++){let h=36864&t.i.k[i],n=i*nt+7;t.et[n]!==h&&(t.et[n]=h)}for(let i of t.fi){let h=t.i.Pt[i];t._t.bindFramebuffer(36160,null),t._t.viewport(0,0,t.Et,t.Xt),t._t.clear(16640),E(t,h);break}}(this),G(this)}};!function(i){var h;i.i=new et(65536),i.ii=!0,t(i,[A(),y([0,0]),(h=[i.xt/2+1,i.ft/2+1],(t,i)=>{t.i.k[i]|=2,t.i.Pt[i]={Yt:{L:h,Yt:[1/h[0],0,0,1/h[1],0,0],Wt:[h[0],0,0,h[1],0,0]},Tt:[1,0,0,1,0,0],i:[1,0,0,1,0,0],Et:0,Xt:0}})]),t(i,[A(),y(),_("#FFD6D5",i.xt,i.ft)]),t(i,[A(),y([-5,3],0),M("#D4FCA9",7)]),t(i,[A(),y([0,0],-30,[4,1]),T(0,5),(t,i)=>{t.i.k[i]|=8,t.i.T[i]={A:null,S:1}},S([A(),y([0,0],30),_("#FFAA79",5,5)])]);for(let h=0;h<10;h++){let h=N(-i.xt/2,i.xt/2),n=N(-i.ft/2,i.ft/2);t(i,[A(),y([h,n],0,[4,1]),m(!1,1,0,[4,1]),F(0),_("green")])}t(i,[...k(),(t,i)=>{let h=t.i.P[i];h.X[0]=0,h.X[1]=5}])}(vt),vt.si(),window.$=function(t,i,h){}.bind(null,vt),window.game=vt})();
