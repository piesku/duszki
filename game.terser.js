(()=>{function t(t,i){let h=t.i.t();for(let n of i)n(t,h);return h}function i(t,i,h){let n=t.createShader(i);return t.shaderSource(n,h),t.compileShader(n),n}function h(t,i,h,n,e,o,s){return t[0]=i,t[1]=h,t[2]=n,t[3]=e,t[4]=o,t[5]=s,t}function n(t,i){let h=i[0],n=i[1],e=i[2],o=i[3],s=i[4],r=i[5],g=h*o-n*e;return g?(g=1/g,t[0]=o*g,t[1]=-n*g,t[2]=-e*g,t[3]=h*g,t[4]=(e*r-o*s)*g,t[5]=(n*s-h*r)*g,t):null}function e(t,i,h){let n=i[0],e=i[1],o=i[2],s=i[3],r=i[4],g=i[5],u=h[0],l=h[1],c=h[2],d=h[3],a=h[4],f=h[5];return t[0]=n*u+o*l,t[1]=e*u+s*l,t[2]=n*c+o*d,t[3]=e*c+s*d,t[4]=n*a+o*f+r,t[5]=e*a+s*f+g,t}function o(t,i,h,n){let e=Math.sin(h),o=Math.cos(h);return t[0]=o*n[0],t[1]=e*n[0],t[2]=-e*n[1],t[3]=o*n[1],t[4]=i[0],t[5]=i[1],t}function s(t,i){return t[0]=i[4],t[1]=i[5],t}function r(t,i,n){return h(t,1/i,0,0,1/n,0,0),t}function g(t,i){s(i.h,t),i.o[0]=i.h[0]-i.g[0]/2,i.o[1]=i.h[1]-i.g[1]/2,i.u[0]=i.h[0]+i.g[0]/2,i.u[1]=i.h[1]+i.g[1]/2}function u(t,i){let h=t.h[0]-i.h[0],n=t.g[0]/2+i.g[0]/2-Math.abs(h),e=t.h[1]-i.h[1],o=t.g[1]/2+i.g[1]/2-Math.abs(e);return n<o?[n*Math.sign(h),0]:[0,o*Math.sign(e)]}function l(t,i,h){for(let o=0;o<h;o++){let h=i[o],s=t.l&h.Layers,r=h.l&t.Layers;if((s||r)&&(n=t).o[0]<(e=h).u[0]&&n.u[0]>e.o[0]&&n.o[1]<e.u[1]&&n.u[1]>e.o[1]){let i=u(t,h);s&&t.p.push({v:h.m,M:i}),r&&h.p.push({v:t.m,M:[-i[0],-i[1]]})}}var n,e}function c(){return((rt=16807*rt%2147483647)-1)/2147483646}function d(t=0,i=1){return c()*(i-t)+t}function a(t){return t[function(t=0,i=1){return~~(c()*(i-t+1)+t)}(0,t.length-1)]}function f(t,i){let h=t.i._[i],n=t.i.T[i];h.S&&(n.S[0]=h.S[0],n.S[1]=h.S[1],t.i.k[i]|=128),h.F&&(n.F=h.F,t.i.k[i]|=128)}function p(t,i){let h=t.i.T[i],n=t.i.$[i];t.A.ArrowLeft&&(h.S[0]-=1,t.i.k[i]|=128),t.A.ArrowRight&&(h.S[0]+=1,t.i.k[i]|=128),t.A.ArrowUp&&n.P&&(n.D[1]=500)}function w(t,i,h){return t[0]=i[0]+h[0],t[1]=i[1]+h[1],t}function y(t,i){let h=i[0],n=i[1],e=h*h+n*n;return e>0&&(e=1/Math.sqrt(e)),t[0]=i[0]*e,t[1]=i[1]*e,t}function x(t,i,h){let n=i[0],e=i[1];return t[0]=h[0]*n+h[2]*e+h[4],t[1]=h[1]*n+h[3]*e+h[5],t}function v(t){return Math.hypot(t[0],t[1])}function m(t,i){let h=i[0]-t[0],n=i[1]-t[1];return h*h+n*n}function M(t=[0,0],i=0,h=[1,1]){return(n,e)=>{n.i.k[e]|=1152,n.i.R[e]={X:t,F:i,Y:h}}}function _(t,i){return(h,n)=>{let e=h.i.R[n];e.X[0]=t,e.X[1]=i}}function T(t){return(i,h)=>{var n,e;(n=i.i.R[h].X)[0]=(e=t)[0],n[1]=e[1]}}function S(t,i,h,n=[1,1]){return(e,o)=>{e.i.k[o]|=4,e.i.C[o]={m:o,V:!0,W:t,Layers:i,l:h,g:n,o:[0,0],u:[0,0],h:[0,0],p:[]}}}function z(t,i=[1,1,1,1]){return(h,n)=>{let e=n*ot;h.H[e+6]=0,h.H[e+7]=8192,h.H[e+8]=i[0],h.H[e+9]=i[1],h.H[e+10]=i[2],h.H[e+11]=i[3],h.H[e+12]=ut[t].x,h.H[e+13]=ut[t].y,h.H[e+14]=ut[t].width,h.H[e+15]=ut[t].height,h.i.k[n]|=8192,h.i.I[n]={G:h.H.subarray(e+6,e+8),L:h.H.subarray(e+8,e+12),U:h.H.subarray(e+12,e+16)}}}function b(t){return(i,h)=>{i.H[h*ot+6]=Math.max(-1,Math.min(1,t))}}function k(t,i,h){let n=i*ot;t.H[n+12]=ut[h].x,t.H[n+13]=ut[h].y,t.H[n+14]=ut[h].width,t.H[n+15]=ut[h].height}function F(t,i=1,h=.001){return(n,e)=>{n.i.k[e]|=16384,n.i.$[e]={j:t,N:h,O:i,D:[0,0],q:[0,0],B:[0,0],K:0,P:!1}}}function $(t=!1){return(i,h)=>{i.i.k[h]|=65664,i.i.J[h]={i:i.H.subarray(h*ot,h*ot+6),Z:[1,0,0,1,0,0],tt:t}}}function A(t,i){if(64&t.k[i])for(let h of t.it[i].it)A(t,h);0===t.k[i]||t.ht(i)}function P(t,i,h){let n=t.i.nt[i];n.et-=h,n.et<0&&A(t.i,i)}function D(t,i,h){let n=t.i.R[i],e=t.i.T[i];if(e.S[0]||e.S[1]){dt[0]=e.S[0],dt[1]=e.S[1];let g=Math.min(1,v(dt));if(65536&t.i.k[i]){let h=t.i.J[i];!function(t,i,h){let n=i[0],e=i[1];t[0]=h[0]*n+h[2]*e,t[1]=h[1]*n+h[3]*e}(dt,dt,void 0!==h.ot?t.i.J[h.ot].Z:h.i)}else!function(t,i,h){let n=Math.cos(h),e=Math.sin(h);t[0]=n*i[0]-e*i[1],t[1]=e*i[0]+n*i[1]}(dt,dt,n.F);y(dt,dt),(o=dt)[0]=(s=dt)[0]*(r=g*e.st*h),o[1]=s[1]*r,w(n.X,n.X,dt),e.S[0]=0,e.S[1]=0}var o,s,r;e.F&&(n.F+=e.F*e.rt*h,e.F=0)}function R(t,i){if(64&t.k[i]){let h=t.it[i];for(let i of h.it)if(262144&t.k[i])return!0}return!1}function X(t,i){let h=t.gt,n=t.ut;t.lt.useProgram(h.ct),t.lt.uniformMatrix3x2fv(h.ft.dt,!1,i.dt),t.lt.activeTexture(33984),t.lt.bindTexture(Z,n.wt),t.lt.uniform1i(h.ft.yt,0),t.lt.uniform2f(h.ft.xt,n.Width,n.Height),t.lt.bindBuffer(Q,t.vt),t.lt.bufferData(Q,t.H,35040),t.lt.drawArraysInstanced(h.Mt,0,4,t.i.k.length)}function Y(t,i,h){let n=t.i._t[i];for(let h in n.Tt)if(n.St<n.Tt[h]){k(t,i,h);break}n.St+=h,n.St>=n.zt&&(n.St-=n.zt)}function C(t,i){let h=t.i.bt[i];h.kt=t.kt,h.Ft=t.Ft;let e=h.$t,o=t.kt/t.Ft;if(0===e.At[0]&&0===e.At[1]){let i=t.Ft/32/2;r(e.$t,i*o,i)}else o<e.At[0]/e.At[1]?r(e.$t,e.At[0],e.At[0]/o):r(e.$t,e.At[1]*o,e.At[1]);n(e.Pt,e.$t)}function V(t,i){let h=t.i.Dt[i],n=t.i.R[i];n.X[0]=(Math.random()-.5)*h.At*2,n.X[1]=(Math.random()-.5)*h.At*2,t.i.k[i]|=128}function W(i,h,n){let e=i.i.Rt[h];e.Xt+=n,e.Xt>e.Yt&&(e.Xt=0,s(pt,i.i.J[h].i),i.i.k.length-i.i.Ct.length<i.i.Vt&&t(i,[...e.Wt(i),T(pt)]))}function H(t,i,h){let n=t.i.Ht[i];n.Xt+=h,n.Xt>n.It&&(n.Xt=0,(t.i.k[i]&n.l)===n.l?t.i.k[i]&=~n.l:t.i.k[i]|=n.l)}function I(t,i){t.i.k[i]&=-129;let h=t.i.R[i],n=i*ot;t.H[n+0]=h.Y[0],t.H[n+1]=h.Y[1],t.H[n+2]=h.F*xt,t.H[n+4]=h.X[0],t.H[n+5]=h.X[1]}function E(t,i,h){t.i.k[i]&=-129;let r=t.i.R[i],g=t.i.J[i];if(o(g.i,r.X,r.F*xt,r.Y),void 0!==h&&(g.ot=h),void 0!==g.ot&&(e(g.i,t.i.J[g.ot].i,g.i),g.tt&&(s(vt,g.i),o(g.i,vt,r.F*xt,r.Y))),n(g.Z,g.i),64&t.i.k[i]){let h=t.i.it[i];for(let n=0;n<h.it.length;n++){let e=h.it[n];66560==(66560&t.i.k[e])&&E(t,e,i)}}}function G(t,i){let h=t.i.C[i];for(let t of h.p);}function L(t,...i){return t.reduce(((t,h)=>t+function(t){let i=t.shift();return"boolean"==typeof i||null==i?"":Array.isArray(i)?i.join(""):i}(i)+h))}function U(t,i){let h=L` <div style="margin: 10px;">Duszki</div> `;h!==J&&(t.Et.innerHTML=J=h)}function j(t,i){let h=0;for(let n=0;n<t.length;n++)i[t[n]]+yt<i[t[h]]&&(h=n);return h}function*N(t,i){for(;void 0!==i;)yield i,i=t[i]}function O(t,i){let h=t.i.Navigation,n=t.i.Gt[i];var e,o,s,r;if(void 0===n.Lt&&(n.Lt=(e=t.i.R[i].X)[1]*t.i.Width+e[0]),null!==n.Ut){let t=function(t,i,h){let n=[],e=[];e[i]=0;let o=[];o[i]=0;let s=[];s[i]=0;let r=[i];for(;r.length>0;){let i=j(r,s),g=r.splice(i,1)[0];if(g===h)return[...N(n,h)];for(let i=0;i<t.jt[g].length;i++){let u=t.jt[g][i][0],l=e[g]+t.jt[g][i][1];void 0===e[u]?(o[u]=m(t.Nt[u],t.Nt[h]),e[u]=l,s[u]=l+o[u],n[u]=g,r.push(u)):l+yt<e[u]&&(e[u]=l,s[u]=l+o[u],n[u]=g)}}return!1}(h,n.Ut,n.Lt);t&&(n.Ot=t.slice(1)),n.Ut=null}if(n.Ot.length>0){let e=n.Ot[0],g=[0,0];if((o=g)[0]=(s=h.Nt[e])[0]-(r=t.i.R[i].X)[0],o[1]=s[1]-r[1],v(g)<.1)n.Ot.shift(),0==n.Ot.length&&(n.Lt=e,n.Ut=null);else{let h=t.i.T[i];y(g,g),w(h.S,h.S,g),t.i.k[i]|=128}}}function q(i,h,n,e){for(let o=0;o<h.length;o++){let s=h[o],r=268435455&s;if(0==r)continue;let g,u=o%n,l=Math.floor(o/n);g=1610612736==(1610612736&s)?M([u,l],90):-1610612736==(-1610612736&s)?M([u,l],-90):-1073741824==(-1073741824&s)?M([u,l],180):-2147483648&s?M([u,l],0,[-1,1]):1073741824&s?M([u,l],0,[1,-1]):M([u,l]),t(i,[g,z((r-1+".png").padStart(7,"0")),b(e)])}}function B(t){return[$(),M(),(i=[t.i.Width/2+1,t.i.Height/2+1],(t,h)=>{t.i.k[h]|=2,t.i.bt[h]={$t:{At:i,$t:[1/i[0],0,0,1/i[1],0,0],Pt:[i[0],0,0,i[1],0,0]},dt:[1,0,0,1,0,0],i:[1,0,0,1,0,0],kt:0,Ft:0}})];var i}function K(t){return[M(),z("121.png"),b(.5),(t,i)=>{t.i.k[i]|=8,t.i.qt[i]={}},(t,i)=>{t.i.k[i]|=2097152,t.i.Gt[i]={Ut:null,Ot:[]}},(i=d(2,4),(t,h)=>{t.i.k[h]|=2048,t.i.T[h]={st:i,rt:0,S:[0,0],F:0}})];var i}var J,Q=34962,Z=3553,tt=5126,it=document.getElementById("update"),ht=document.getElementById("delta"),nt=document.getElementById("fps"),et=1/60,ot=16,st=class extends class{constructor(t=1e4){this.k=[],this.Ct=[],this.Vt=t}t(){return this.Ct.length>0?this.Ct.pop():this.k.push(0)-1}ht(t){this.k[t]=0,this.Ct.push(t)}}{constructor(){super(...arguments),this.Width=32,this.Height=20,this.Navigation={jt:[],Nt:[]},this._t=[],this.bt=[],this.C=[],this.qt=[],this._=[],this.Bt=[],this.it=[],this.Kt=[],this.nt=[],this.R=[],this.T=[],this.Jt=[],this.I=[],this.$=[],this.Dt=[],this.J=[],this.Rt=[],this.Qt=[],this.Ht=[],this.Zt=[],this.Gt=[]}},rt=1,gt=2097160,ut={"000.png":{x:0,y:0,width:16,height:16},"001.png":{x:17,y:0,width:16,height:16},"002.png":{x:0,y:17,width:16,height:16},"003.png":{x:17,y:17,width:16,height:16},"004.png":{x:34,y:0,width:16,height:16},"005.png":{x:34,y:17,width:16,height:16},"006.png":{x:0,y:34,width:16,height:16},"007.png":{x:17,y:34,width:16,height:16},"008.png":{x:34,y:34,width:16,height:16},"009.png":{x:51,y:0,width:16,height:16},"010.png":{x:51,y:17,width:16,height:16},"011.png":{x:51,y:34,width:16,height:16},"012.png":{x:0,y:51,width:16,height:16},"013.png":{x:17,y:51,width:16,height:16},"014.png":{x:34,y:51,width:16,height:16},"015.png":{x:51,y:51,width:16,height:16},"016.png":{x:68,y:0,width:16,height:16},"017.png":{x:68,y:17,width:16,height:16},"018.png":{x:68,y:34,width:16,height:16},"019.png":{x:68,y:51,width:16,height:16},"020.png":{x:0,y:68,width:16,height:16},"021.png":{x:17,y:68,width:16,height:16},"022.png":{x:34,y:68,width:16,height:16},"023.png":{x:51,y:68,width:16,height:16},"024.png":{x:68,y:68,width:16,height:16},"025.png":{x:85,y:0,width:16,height:16},"026.png":{x:85,y:17,width:16,height:16},"027.png":{x:85,y:34,width:16,height:16},"028.png":{x:85,y:51,width:16,height:16},"029.png":{x:85,y:68,width:16,height:16},"030.png":{x:0,y:85,width:16,height:16},"031.png":{x:17,y:85,width:16,height:16},"032.png":{x:34,y:85,width:16,height:16},"033.png":{x:51,y:85,width:16,height:16},"034.png":{x:68,y:85,width:16,height:16},"035.png":{x:85,y:85,width:16,height:16},"036.png":{x:102,y:0,width:16,height:16},"037.png":{x:102,y:17,width:16,height:16},"038.png":{x:102,y:34,width:16,height:16},"039.png":{x:102,y:51,width:16,height:16},"040.png":{x:102,y:68,width:16,height:16},"041.png":{x:102,y:85,width:16,height:16},"042.png":{x:0,y:102,width:16,height:16},"043.png":{x:17,y:102,width:16,height:16},"044.png":{x:34,y:102,width:16,height:16},"045.png":{x:51,y:102,width:16,height:16},"046.png":{x:68,y:102,width:16,height:16},"047.png":{x:85,y:102,width:16,height:16},"048.png":{x:102,y:102,width:16,height:16},"049.png":{x:119,y:0,width:16,height:16},"050.png":{x:119,y:17,width:16,height:16},"051.png":{x:119,y:34,width:16,height:16},"052.png":{x:119,y:51,width:16,height:16},"053.png":{x:119,y:68,width:16,height:16},"054.png":{x:119,y:85,width:16,height:16},"055.png":{x:119,y:102,width:16,height:16},"056.png":{x:0,y:119,width:16,height:16},"057.png":{x:17,y:119,width:16,height:16},"058.png":{x:34,y:119,width:16,height:16},"059.png":{x:51,y:119,width:16,height:16},"060.png":{x:68,y:119,width:16,height:16},"061.png":{x:85,y:119,width:16,height:16},"062.png":{x:102,y:119,width:16,height:16},"063.png":{x:119,y:119,width:16,height:16},"064.png":{x:136,y:0,width:16,height:16},"065.png":{x:136,y:17,width:16,height:16},"066.png":{x:136,y:34,width:16,height:16},"067.png":{x:136,y:51,width:16,height:16},"068.png":{x:136,y:68,width:16,height:16},"069.png":{x:136,y:85,width:16,height:16},"070.png":{x:136,y:102,width:16,height:16},"071.png":{x:136,y:119,width:16,height:16},"072.png":{x:0,y:136,width:16,height:16},"073.png":{x:17,y:136,width:16,height:16},"074.png":{x:34,y:136,width:16,height:16},"075.png":{x:51,y:136,width:16,height:16},"076.png":{x:68,y:136,width:16,height:16},"077.png":{x:85,y:136,width:16,height:16},"078.png":{x:102,y:136,width:16,height:16},"079.png":{x:119,y:136,width:16,height:16},"080.png":{x:136,y:136,width:16,height:16},"081.png":{x:153,y:0,width:16,height:16},"082.png":{x:153,y:17,width:16,height:16},"083.png":{x:153,y:34,width:16,height:16},"084.png":{x:153,y:51,width:16,height:16},"085.png":{x:153,y:68,width:16,height:16},"086.png":{x:153,y:85,width:16,height:16},"087.png":{x:153,y:102,width:16,height:16},"088.png":{x:153,y:119,width:16,height:16},"089.png":{x:153,y:136,width:16,height:16},"090.png":{x:0,y:153,width:16,height:16},"091.png":{x:17,y:153,width:16,height:16},"092.png":{x:34,y:153,width:16,height:16},"093.png":{x:51,y:153,width:16,height:16},"094.png":{x:68,y:153,width:16,height:16},"095.png":{x:85,y:153,width:16,height:16},"096.png":{x:102,y:153,width:16,height:16},"097.png":{x:119,y:153,width:16,height:16},"098.png":{x:136,y:153,width:16,height:16},"099.png":{x:153,y:153,width:16,height:16},"100.png":{x:170,y:0,width:16,height:16},"101.png":{x:170,y:17,width:16,height:16},"102.png":{x:170,y:34,width:16,height:16},"103.png":{x:170,y:51,width:16,height:16},"104.png":{x:170,y:68,width:16,height:16},"105.png":{x:170,y:85,width:16,height:16},"106.png":{x:170,y:102,width:16,height:16},"107.png":{x:170,y:119,width:16,height:16},"108.png":{x:170,y:136,width:16,height:16},"109.png":{x:170,y:153,width:16,height:16},"110.png":{x:0,y:170,width:16,height:16},"111.png":{x:17,y:170,width:16,height:16},"112.png":{x:34,y:170,width:16,height:16},"113.png":{x:51,y:170,width:16,height:16},"114.png":{x:68,y:170,width:16,height:16},"115.png":{x:85,y:170,width:16,height:16},"116.png":{x:102,y:170,width:16,height:16},"117.png":{x:119,y:170,width:16,height:16},"118.png":{x:136,y:170,width:16,height:16},"119.png":{x:153,y:170,width:16,height:16},"120.png":{x:170,y:170,width:16,height:16},"121.png":{x:187,y:0,width:16,height:16},"122.png":{x:187,y:17,width:16,height:16},"123.png":{x:187,y:34,width:16,height:16},"124.png":{x:187,y:51,width:16,height:16},"125.png":{x:187,y:68,width:16,height:16},"126.png":{x:187,y:85,width:16,height:16},"127.png":{x:187,y:102,width:16,height:16},"128.png":{x:187,y:119,width:16,height:16},"129.png":{x:187,y:136,width:16,height:16},"130.png":{x:187,y:153,width:16,height:16},"131.png":{x:187,y:170,width:16,height:16}},lt=[0,0],ct=0,dt=[0,0],at=262144,ft=196608,pt=[0,0],wt=524288,yt=1e-6,xt=Math.PI/180,vt=[0,0],mt=1048580,Mt=2100224,_t=32,Tt=[[1,14,1610612787,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,3758096434,49,1,14,1610612787,3758096434,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,43,49,51,51,51,51,51,54,49,49,49,1,14,1610612789,52,51,54,49,49,2147483698,42,49,51,51,51,51,54,43,49,49,49,49,49,49,58,41,41,41,60,1610612787,49,49,49,1,14,41,41,60,1610612789,54,49,49,51,51,58,41,41,60,1610612787,49,43,49,49,49,49,49,17,3,3,3,18,1610612787,49,49,49,1,2,3,3,18,60,1610612787,49,49,58,41,17,3,3,18,1610612789,32,51,51,33,51,54,2147483698,16,1,1,1,14,1610612789,51,51,51,1,1,1,1,2,18,1610612787,49,49,17,3,4,1,1,14,41,20,41,41,21,60,1610612787,49,16,1,1,1073741837,14,41,11,12,41,27,27,27,28,3221225485,14,1610612787,49,49,5,27,27,27,28,2,3,3,3,3,3,18,1610612787,49,16,1,1,1,2,3,3,3,3,49,49,49,16,1,14,1610612787,49,49,49,49,49,49,5,27,27,27,27,27,27,6,1610612790,49,16,1,1,1,1,1,1,1,1,49,49,49,5,27,6,1610612790,49,49,2147483698,49,49,49,49,49,49,49,49,49,49,49,49,49,5,27,27,27,27,27,27,27,27,49,43,49,49,49,49,49,49,49,49,49,49,49,51,52,51,51,54,49,49,49,49,51,52,54,49,49,49,49,49,49,51,51,54,51,51,54,43,49,50,49,49,49,49,49,58,41,41,60,1610612787,49,49,43,49,58,60,37,38,38,38,38,38,39,58,60,1610612787,58,60,1610612787,49,49,49,51,51,51,51,51,17,3,3,18,1610612787,49,43,49,3221225522,17,18,1610612787,49,49,49,49,49,2684354610,17,18,1610612787,17,18,1610612789,51,52,51,58,41,41,22,41,16,2684354573,1,14,1610612787,51,31,51,51,16,14,1610612787,49,49,49,49,49,49,16,14,1610612787,16,14,41,41,41,41,17,3,3,3,3,4,1,1,14,1610612787,58,19,41,41,16,14,1610612787,49,49,49,49,49,49,16,14,1610612787,16,2,3,3,3,3,4,26,27,27,27,27,27,28,14,1610612787,17,7,3,3,4,14,1610612787,49,49,49,49,49,49,16,14,1610612787,5,27,27,28,1,1073741837,1,14,1610612787,49,49,49,49,16,14,1610612789,16,1,1,1,1073741837,14,1610612789,31,51,51,52,31,51,16,14,1610612787,51,52,51,16,1,1,1,14,1610612787,49,3221225522,49,49,16,14,41,16,1,1,536870925,1,14,41,19,41,30,41,19,41,16,14,1610612787,58,41,41,16,25,1,1,14,1610612789,51,51,52,51,16,2,3,4,1,1,1,1,2,3,7,3,3,3,7,3,4,14,1610612787,17,3,3,4,1,1,1,14,41,41,41,41,41,16,1,1,1,1,1,25,1,1,1,1,1,1,1,1,1073741837,1,14,1610612787,16,1,1,3221225485,1,1,1,2,3,3,3,3,3,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,82,0,0,0,76,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,71,71,71,71,71,72,0,0,0,64,0,0,0,0,0,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,0,0,2147483773,0,0,0,0,0,0,0,0,2147483749,0,0,0,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,124,0,0,0,0,0,0,0,0,0,90,0,0,0,0,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,0,0,124,0,0,0,0,0,0,0,0,0,83,0,0,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,1,1,1,2,3,3,3,0,0,64,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,99,0,0,0,0,0,0,0,0,0,0,123,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,0,0,0,0,0,0,85,0,0,0,2147483758,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,0,119,0,0,0,0,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,0,0,0,0,0,0,0,0,0,0,0,0,74,0,73,0,0,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,121,0,0,109,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,67,0,67,0,67,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,65,0,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,75,0,0,0,0,1073741932,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,87,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,76,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],St=[0,0,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,0,0,49,49,49,49,49,49,49,49,49,49,49,49,49,0,0,49,49,49,49,49,49,49,49,0,0,49,49,49,49,49,49,49,49,49,49,49,49,49,49,0,49,49,49,49,49,0,0,49,49,49,49,49,49,49,0,49,49,49,49,49,49,49,49,49,49,49,49,49,0,0,0,0,0,49,49,49,49,0,0,0,0,0,49,49,0,49,49,49,0,0,0,0,49,49,49,49,49,49,49,49,0,0,0,0,0,49,49,49,49,0,0,0,0,0,0,49,49,49,0,0,0,0,0,0,49,0,49,49,0,49,49,49,0,0,0,0,0,49,49,49,0,0,0,0,0,0,0,49,49,49,0,0,0,0,0,0,0,0,0,0,0,0,49,49,0,0,0,0,0,0,49,49,0,0,0,0,0,0,0,49,49,49,0,0,0,0,0,0,0,0,0,0,0,0,49,49,49,49,49,49,49,49,49,49,0,49,0,0,0,0,0,49,49,49,49,49,49,49,0,0,0,0,0,0,0,0,49,49,0,0,0,0,0,0,0,0,0,49,49,0,0,0,0,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,0,0,0,0,0,0,0,0,0,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,0,0,0,0,49,49,49,49,49,0,0,49,49,49,49,49,49,49,0,0,49,0,0,49,49,49,49,49,49,49,49,49,0,0,0,0,49,49,49,0,49,0,0,49,49,49,49,49,49,49,0,0,49,0,0,49,49,49,49,0,0,0,49,0,0,0,0,0,49,49,49,49,49,0,0,49,49,49,49,49,49,49,0,0,49,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,49,0,0,0,0,0,0,49,49,49,49,49,49,49,0,0,49,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,49,0,0,0,0,0,0,49,0,49,0,49,0,49,0,0,49,0,0,0,0,0,0,0,0,49,49,0,49,49,0,0,49,0,0,0,0,0,0,49,49,49,49,49,49,49,0,0,49,49,49,49,0,0,0,0,0,49,49,49,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,0,0,0,49,49,49,0,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],zt=new class extends class extends class{constructor(){this.ti=0,this.ii=0,this.kt=window.innerWidth,this.Ft=window.innerHeight,this.hi=!0,this.A={MouseX:0,MouseY:0},this.ni={MouseX:0,MouseY:0},this.ei={Mouse:0,Mouse0:0,Mouse1:0,Mouse2:0,Touch0:0,Touch1:0},this.oi={},this.Et=document.querySelector("main"),document.addEventListener("visibilitychange",(()=>document.hidden?this.si():this.ri())),this.Et.addEventListener("contextmenu",(t=>t.preventDefault())),this.Et.addEventListener("mousedown",(t=>{this.A["Mouse"+t.button]=1,this.ni["Mouse"+t.button]=1})),this.Et.addEventListener("mouseup",(t=>{this.A["Mouse"+t.button]=0,this.ni["Mouse"+t.button]=-1})),this.Et.addEventListener("mousemove",(t=>{this.A.MouseX=t.clientX,this.A.MouseY=t.clientY,this.ni.MouseX=t.movementX,this.ni.MouseY=t.movementY})),this.Et.addEventListener("wheel",(t=>{t.preventDefault(),this.ni.WheelY=t.deltaY})),this.Et.addEventListener("touchstart",(t=>{t.target===this.Et&&t.preventDefault(),1===t.touches.length&&(this.oi={});for(let i=0;i<t.touches.length;i++)this.oi[t.touches[i].identifier]=i;for(let i=0;i<t.changedTouches.length;i++){let h=t.changedTouches[i],n=this.oi[h.identifier];this.A["Touch"+n]=1,this.A[`Touch${n}X`]=h.clientX,this.A[`Touch${n}Y`]=h.clientY,this.ni["Touch"+n]=1,this.ni[`Touch${n}X`]=0,this.ni[`Touch${n}Y`]=0}})),this.Et.addEventListener("touchmove",(t=>{t.target===this.Et&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let h=t.changedTouches[i],n=this.oi[h.identifier];this.ni[`Touch${n}X`]=h.clientX-this.A[`Touch${n}X`],this.ni[`Touch${n}Y`]=h.clientY-this.A[`Touch${n}Y`],this.A[`Touch${n}X`]=h.clientX,this.A[`Touch${n}Y`]=h.clientY}})),this.Et.addEventListener("touchend",(t=>{t.target===this.Et&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let h=this.oi[t.changedTouches[i].identifier];this.A["Touch"+h]=0,this.ni["Touch"+h]=-1}})),this.Et.addEventListener("touchcancel",(t=>{for(let i=0;i<t.changedTouches.length;i++){let h=this.oi[t.changedTouches[i].identifier];this.A["Touch"+h]=0,this.ni["Touch"+h]=-1}})),window.addEventListener("keydown",(t=>{t.repeat||(this.A[t.code]=1,this.ni[t.code]=1)})),window.addEventListener("keyup",(t=>{this.A[t.code]=0,this.ni[t.code]=-1}))}ri(){let t=0,i=performance.now(),h=n=>{let e=(n-i)/1e3;for(i=n,this.ti=requestAnimationFrame(h),this.gi(e),t+=e;t>=et;)t-=et,this.ui(et);this.li(e),this.ci(e)};this.si(),h(i)}si(){cancelAnimationFrame(this.ti),this.ti=0}gi(t){this.ii=performance.now();let i=Math.abs(this.ni.MouseX)+Math.abs(this.ni.MouseY);this.ei.Mouse+=i,1===this.A.Mouse0&&(this.ei.Mouse0+=i),1===this.A.Mouse1&&(this.ei.Mouse1+=i),1===this.A.Mouse2&&(this.ei.Mouse2+=i),1===this.A.Touch0&&(this.ei.Touch0+=Math.abs(this.ni.Touch0X)+Math.abs(this.ni.Touch0Y)),1===this.A.Touch1&&(this.ei.Touch1+=Math.abs(this.ni.Touch1X)+Math.abs(this.ni.Touch1Y))}ui(t){}li(t){}ci(t){this.hi=!1,-1===this.ni.Mouse0&&(this.ei.Mouse0=0),-1===this.ni.Mouse1&&(this.ei.Mouse1=0),-1===this.ni.Mouse2&&(this.ei.Mouse2=0),-1===this.ni.Touch0&&(this.ei.Touch0=0),-1===this.ni.Touch1&&(this.ei.Touch1=0);for(let t in this.ni)this.ni[t]=0;let i=performance.now()-this.ii;it&&(it.textContent=i.toFixed(1)),ht&&(ht.textContent=(1e3*t).toFixed(1)),nt&&(nt.textContent=(1/t).toFixed())}}{constructor(){super(...arguments),this.di=document.querySelector("#background"),this.ai=this.di.getContext("2d"),this.fi=document.querySelector("#foreground"),this.pi=this.fi.getContext("2d"),this.wi=document.querySelector("#scene"),this.lt=this.wi.getContext("webgl2"),this.Audio=new AudioContext,this.yi=[],this.xi={}}}{constructor(){super(),this.i=new st(65536),this.gt=function(t,h,n){let e=function(t,h,n){let e=t.createProgram();return t.attachShader(e,i(t,35633,h)),t.attachShader(e,i(t,35632,"#version 300 es\n\nprecision mediump float;\n\nuniform sampler2D sheet_texture;\n\nin vec2 vert_texcoord;\nin vec4 vert_color;\n\nout vec4 frag_color;\n\nvoid main() {\nfrag_color = vert_color * texture(sheet_texture, vert_texcoord);\nif (frag_color.a == 0.0) {\ndiscard;\n}\n}\n")),t.linkProgram(e),e}(t,"#version 300 es\n\nuniform mat3x2 pv;\nuniform vec2 sheet_size;\n\n\nlayout(location=0) in vec2 attr_position;\nlayout(location=1) in vec2 attr_texcoord;\n\n\nlayout(location=2) in vec4 attr_rotation; \nlayout(location=3) in vec4 attr_translation; \nlayout(location=4) in vec4 attr_color;\nlayout(location=5) in vec4 attr_sprite;\n\nout vec2 vert_texcoord;\nout vec4 vert_color;\nout vec4 vert_sprite;\n\nvoid main() {\nint signature = int(attr_translation.w);\nif ((signature & 8192) == 8192) {\nmat3x2 world;\nif ((signature & 65536) == 65536) {\nworld = mat3x2(\nattr_rotation.xy,\nattr_rotation.zw,\nattr_translation.xy\n);\n} else {\nvec2 scale = attr_rotation.xy;\nfloat rotation = attr_rotation.z;\nworld = mat3x2(\ncos(rotation) * scale.x, sin(rotation) * scale.x,\n-sin(rotation) * scale.y, cos(rotation) * scale.y,\nattr_translation.xy\n);\n}\n\nvec3 world_position = mat3(world) * vec3(attr_position, 1);\nvec3 clip_position = mat3(pv) * world_position;\ngl_Position = vec4(clip_position.xy, -attr_translation.z, 1);\n\n\nvert_texcoord = (attr_sprite.xy + attr_sprite.zw * attr_texcoord) / sheet_size;\nvert_color = attr_color;\n} else {\n\ngl_Position.z = 2.0;\n}\n}");return{Mt:5,ct:e,ft:{dt:t.getUniformLocation(e,"pv"),i:t.getUniformLocation(e,"world"),yt:t.getUniformLocation(e,"sheet_texture"),xt:t.getUniformLocation(e,"sheet_size")}}}(this.lt),this.ut=function(t,i){let h=t.createTexture();return t.bindTexture(Z,h),t.texImage2D(Z,0,6408,6408,5121,i),t.texParameteri(Z,10241,9728),t.texParameteri(Z,10240,9728),t.texParameteri(Z,10242,10497),t.texParameteri(Z,10243,10497),{wt:h,Width:i.width,Height:i.height}}(this.lt,document.querySelector("img")),this.H=new Float32Array(this.i.Vt*ot),this.vt=this.lt.createBuffer(),this.vi="#763b36",this.lt.clearColor(0,0,0,0),this.lt.enable(2929),this.lt.enable(3042),this.lt.blendFunc(770,771),function(t,i){let h=Float32Array.from([-.51,-.51,0,1,.51,-.51,1,1,-.51,.51,0,0,.51,.51,1,0]);t.bindBuffer(Q,t.createBuffer()),t.bufferData(Q,h,35044),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,tt,!1,16,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,2,tt,!1,16,8),t.bindBuffer(Q,i),t.enableVertexAttribArray(2),t.vertexAttribDivisor(2,1),t.vertexAttribPointer(2,4,tt,!1,64,0),t.enableVertexAttribArray(3),t.vertexAttribDivisor(3,1),t.vertexAttribPointer(3,4,tt,!1,64,16),t.enableVertexAttribArray(4),t.vertexAttribDivisor(4,1),t.vertexAttribPointer(4,4,tt,!1,64,32),t.enableVertexAttribArray(5),t.vertexAttribDivisor(5,1),t.vertexAttribPointer(5,4,tt,!1,64,48)}(this.lt,this.vt)}li(i){!function(t,i){let h=[];for(let n=0;n<t.i.k.length;n++)if((t.i.k[n]&at)===at){if(R(t.i,n))continue;let e=t.i.Qt[n];switch(e.j){case 0:e.mi(n)&&h.push(n);break;case 1:e.et-=i,e.et<0&&h.push(n);break;case 2:h.push(n)}}for(let i of h){let h=t.i.Qt[i];switch(h.j){case 2:h.Mi(i);case 0:case 1:t.i.ht(i)}delete t.i.Qt[i]}}(this,i),function(t,i){if(t.kt==window.innerWidth&&t.Ft==window.innerHeight||(t.hi=!0),t.hi){t.kt=t.di.width=t.wi.width=t.fi.width=window.innerWidth,t.Ft=t.di.height=t.wi.height=t.fi.height=window.innerHeight;for(let i=0;i<t.i.k.length;i++)2==(2&t.i.k[i])&&C(t,i)}}(this),function(t,i){t.yi=[];for(let i=0;i<t.i.k.length;i++)if(65538==(65538&t.i.k[i])){let o=t.i.bt[i],s=t.i.J[i];e(o.dt,o.$t.$t,s.Z),h(o.i,(n=s.i)[0],n[1],n[2],n[3],n[4],n[5]),t.yi.push(i)}var n}(this),function(t,i){for(let i=0;i<t.i.k.length;i++)18464==(18464&t.i.k[i])&&p(t,i)}(this),function(i,h){if(ct+=h,!function(t,i){return 1===t.A.Touch0||-1===t.ni.Touch0?(i[0]=t.A.Touch0X,i[1]=t.A.Touch0Y,!0):t.ei.Mouse>0&&(i[0]=t.A.MouseX,i[1]=t.A.MouseY,!0)}(i,lt))return;let n=i.yi[0];if(void 0!==n){(e=lt)[0]=(s=lt)[0]/(o=i.i.bt[n]).kt*2-1,e[1]=-s[1]/o.Ft*2+1,x(e,e,o.$t.Pt),x(e,e,o.i);for(let t=0;t<i.i.k.length;t++)if(1056==(1056&i.i.k[t])){let h=i.i.R[t];h.X[0]=Math.round(lt[0]),h.X[1]=Math.round(lt[1]),i.i.k[t]|=128}ct>.1&&function(t,i,h=i){return t.A["Mouse"+i]>0||t.A["Touch"+h]>0}(i,0)&&(t(i,[$(),M(),S(!0,2,3),F(1,.3),z("082.png"),b(.9),(t,i)=>{t.i.k[i]|=512,t.i.nt[i]={et:10,_i:void 0}},T(lt)]),ct=0)}var e,o,s}(this,i),function(t,i){let h=[];for(let i=0;i<t.i.Navigation.jt.length;i++)t.i.Navigation.jt[i]&&h.push(i);for(let i=0;i<t.i.k.length;i++)if((t.i.k[i]&gt)==gt){let n=t.i.Gt[i];null===n.Ut&&0===n.Ot.length&&(n.Ut=a(h))}}(this),function(t,i){for(let i=0;i<t.i.k.length;i++)2064==(2064&t.i.k[i])&&f(t,i)}(this),function(t,i){for(let i=0;i<t.i.k.length;i++)(t.i.k[i]&Mt)==Mt&&O(t,i)}(this),function(t,i){for(let h=0;h<t.i.k.length;h++)3200==(3200&t.i.k[h])&&D(t,h,i)}(this,i),function(t,i){for(let h=0;h<t.i.k.length;h++)512==(512&t.i.k[h])&&P(t,h,i)}(this,i),function(t,i){for(let i=0;i<t.i.k.length;i++)33792==(33792&t.i.k[i])&&V(t,i)}(this),function(t,i){for(let h=0;h<t.i.k.length;h++)(t.i.k[h]&wt)==wt&&H(t,h,i)}(this,i),function(t,i){for(let h=0;h<t.i.k.length;h++)(t.i.k[h]&ft)==ft&&W(t,h,i)}(this,i),function(t,i){for(let i=0;i<t.i.k.length;i++)1152==(1152&t.i.k[i])&&(65536&t.i.k[i]?E(t,i):I(t,i))}(this),function(t,i){let h=[],n=[];for(let i=0;i<t.i.k.length;i++)if(65540==(65540&t.i.k[i])){let e=t.i.J[i],o=t.i.C[i];o.p=[],o.V?(o.V=!1,g(e.i,o)):o.W?(g(e.i,o),n.push(o)):h.push(o)}for(let t=0;t<n.length;t++)l(n[t],h,h.length),l(n[t],n,t)}(this),function(t,i){for(let i=0;i<t.i.k.length;i++)(t.i.k[i]&mt)===mt&&G(t,i)}(this),function(t,i){let h=t.yi[0];if(void 0===h)return;let n=t.i.bt[h],e=t.ai;e.fillStyle=t.vi,e.fillRect(0,0,t.kt,t.Ft),e=t.pi,e.resetTransform(),e.clearRect(0,0,t.kt,t.Ft),e.transform(n.dt[0]*t.kt/2,-n.dt[1]*t.Ft/2,-n.dt[2]*t.kt/2,n.dt[3]*t.Ft/2,(1+n.dt[4])*t.kt/2,(1-n.dt[5])*t.Ft/2);for(let i=0;i<t.i.k.length;i++)if(65792==(65792&t.i.k[i])){let h=t.i.J[i];e.save(),e.transform(h.i[0],-h.i[1],-h.i[2],h.i[3],h.i[4],-h.i[5]);let n=t.i.Kt[i];switch(n.j){case 1:e.fillStyle=n.L,e.fillRect(-n.Width/2,-n.Height/2,n.Width,n.Height);break;case 2:e.fillStyle=n.L,e.beginPath(),e.arc(0,0,n.At,n.Ti,n.Si),e.fill()}e.restore()}}(this),function(t,i){for(let h=0;h<t.i.k.length;h++)8193==(8193&t.i.k[h])&&Y(t,h,i)}(this,i),function(t,i){for(let i=0;i<t.i.k.length;i++){let h=73728&t.i.k[i],n=i*ot+7;t.H[n]!==h&&(t.H[n]=h)}for(let i of t.yi){let h=t.i.bt[i];t.lt.bindFramebuffer(36160,null),t.lt.viewport(0,0,t.kt,t.Ft),t.lt.clear(16640),X(t,h);break}}(this),U(this)}};!function(i){i.i=new st(65536),i.hi=!0,t(i,[...B(i),_(i.i.Width/2-.5,i.i.Height/2-.5)]),t(i,[M(),(t,i)=>{t.i.k[i]|=32,t.i.Bt[i]={}},z("060.png"),b(1),_(i.i.Width/2,i.i.Height/2)]),q(i,Tt[0],_t,.1),q(i,Tt[1],_t,.6),q(i,Tt[2],_t,.7);let h=St;for(let t=0;t<h.length;t++){if(0==h[t])continue;i.i.Navigation.Nt[t]=[(e=t)%(n=i.i).Width,Math.floor(e/n.Width)],i.i.Navigation.jt[t]=[];let o=i.i.Navigation.jt[t];t>0&&h[t-1]>0&&o.push([t-1,1]),t<h.length-1&&h[t+1]>0&&o.push([t+1,1]),t<h.length-_t&&h[t+_t]>0&&o.push([t+_t,1]),t>_t&&h[t-_t]>0&&o.push([t-_t,1])}var n,e;{let h=[];for(let t=0;t<i.i.Navigation.jt.length;t++)i.i.Navigation.jt[t]&&h.push(t);let n=100;for(let e=0;e<n;e++){let n=a(h);t(i,[...K(),T(i.i.Navigation.Nt[n])])}}}(zt),zt.ri(),window.$=function(t,i,h){}.bind(null,zt),window.game=zt})();
