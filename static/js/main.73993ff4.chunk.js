(this.webpackJsonphablaba=this.webpackJsonphablaba||[]).push([[0],{71:function(e,t,n){"use strict";n.r(t);var c,r,a=n(26),i=n(6),o=n(8),s=n(43),d=n(11),u=Object(d.a)(new Set(["cat","key","comb","catch","coin","cub","cone","carrot","corn","cold","cool","cop","cake","car","kid","cave","coat","cow","cut","cart","candy","card","color","kite","racquet","breakfast","baking","chicken","donkey","soccer","sucker","vacation","biking","turkey","cooking","weekend","uncle","napkin","bacon","checkers","jacket","pocket","pumpkin","raincoat","taco","looking","helicopter","apricot","vacuum","bike","lock","cheek","hawk","leak","rake","rock","shake","music","book","back","pack","cook","hike","sick","check","hook","lick","neck","snack","stick","truck","walk","pick","goose","gate","gas","gift","go","gulp","good","gone","guess","give","ghost","guitar","garbage","goodbye","goat","game","gum","girl","golf","guy","goal","gallon","gold","garage","gorilla","dragon","luggage","cougar","tiger","eagle","merry-go-round","tugboat","pigpen","again","wagon","sugar","dugout","foggy","magnet","hamburger","jogging","juggle","pigtail","magazine","yoga","seagull","alligator","August","bigger","doggy","bug","dog","leg","bag","mug","big","rag","pig","Doug","frog","fog","twig","slug","fig","dig","log","hug","rug","tag","wag","wig","egg","tug","flag","jug","teeth","tire","toast","toy","teacher","two","toad","tiger","turkey","taco","tool","tooth","toe","talk","towel","turtle","team","take","tall","taste","tub","touch","top","tongue","time","button","guitar","kitten","mittens","potato","eighteen","rotten","hotel","cotton","motel","beauty","better","city","butter","little","butterfly","tomatoe","biting","Saturday","water","bat","boat","cat","fruit","goat","hat","coat","light","nut","chocolate","eat","bite","cut","cute","feet","get","sit","right","not","late","kite","hot","hat","wet","white","dad","dark","day","dime","do","done","dust","dot","dive","dance","desk","dish","dog","doll","duck","door","dentist","doctor","dinner","down","dig","dove","dear","does","date","medicine","ladder","radio","reading","wedding","lady","spider","daddy","feeding","body","kindergarten","birthday","riding","Thursday","baby doll","calendar","Canada","idea","ready","shadow","Tuesday","louder","hidden","hiding","speeding","food","hand","mud","bed","sand","add","bad","bread","did","dad","cried","glad","grade","good","hide","kid","loud","mad","read","wood","sad","ride","red","played","side"])),j=function(e){for(var t,n,c=Object(d.a)(e),r=c.length;r;)n=c[t=Math.floor(Math.random()*r--)],c[t]=c[r],c[r]=n;return c},l="remaining",b="passed",g="failed",f=function(e){var t=localStorage.getItem(e);if(t)try{return JSON.parse(t)}catch(n){}},O={isRecording:!1,audioSource:"",duration:0,subject:"remaining",remaining:[],passed:[],failed:[],status:"ready"},h=function(e){return function(t){t.subject=e,t[e]=j(t[e]),t.status="ready",t.audioSource=""}},p=Object(s.b)({name:"speech",initialState:O,reducers:{start:function(e){e.isRecording=!0,e.audioSource="",e.duration=0},stop:function(e,t){var n=t.payload;e.isRecording=!1,e.duration=n},pass:function(e){e.audioSource="";var t=e[e.subject].shift();t&&e.passed.push(t)},fail:function(e){e.audioSource="";var t=e[e.subject].shift();t&&e.failed.push(t)},save:function(e,t){var n=t.payload;e.audioSource=n},doFailedList:h("failed"),doPassedList:h("passed"),doRemainingList:h("remaining"),resetLists:function(e){e.subject="remaining",e.remaining=j(u),e.passed=[],e.failed=[],e.status="ready",e.audioSource=""},changeStatus:function(e,t){var n=t.payload;e.status=n}}}),x=p.reducer,m=p.actions,v=Object(s.a)({reducer:x,preloadedState:function(){var e={remaining:f(l),passed:f(b),failed:f(g)},t=e.remaining,n=e.passed,c=e.failed;return t||n||c?Object(o.a)(Object(o.a)({},O),{},{remaining:t?j(t):O.remaining,passed:n?j(n):O.passed,failed:c?j(c):O.failed}):Object(o.a)(Object(o.a)({},O),{},{remaining:j(u)})}()}),y=function(){return Object(i.b)()},k=function(e){return e.subject},w=function(e){return e.remaining},S=function(e){return e.passed},E=function(e){return e.failed},L=function(e){return e[e.subject][0]},R=function(e){return e.audioSource},C=function(e){return e.isRecording},F=function(e){return e.duration},T=function(e){return e.status},M=function(e){return"ready"===e.status},I=n(7),P=n(44),D=n(2),J=n(9),N=n(3),U=Object(D.createContext)({}),X=function(e){var t=e.children,n=e.recorder,c=y(),r=Object(D.useRef)(0),a=function(){"inactive"!==n.state&&(n.stop(),c(m.stop((performance.now()-r.current)/1e3)))},i=function(){"recording"!==n.state&&(n.start(),r.current=performance.now(),c(m.start()))},o=function(e){switch(n.state){case"recording":return void("stop"===e&&a());case"paused":return void function(e){"stop"===e&&a()}(e);default:return void function(e){"start"===e&&i()}(e)}};Object(D.useEffect)((function(){n.ondataavailable=function(e){var t=e.data,n=URL.createObjectURL(new Blob([t],{type:"audio/mpeg"}));c(m.save(n))}}),[n,c]);var s={start:function(){o("start")},stop:function(){o("stop")}};return Object(N.jsx)(U.Provider,{value:s,children:t})},z=function(e){var t=Object(D.useRef)(void 0);return Object(i.c)((function(n){t.current=e(n)})),t},B="ontouchstart"in window||navigator.maxTouchPoints,W=[],Y=function(e){return W.push(e),function(){return function(e){var t=W.indexOf(e);W.splice(t,1)}(e)}},A=function(e){W.length||e()},q=function(e){W.forEach((function(t){return t.current(e)}))},G=n(56),H=0,K=!1,Q=Object(G.throttle)((function(e){var t,n=e.deltaY,c=e.deltaX,r=Math.abs(c),a=Math.abs(n),i=r>=a?r:a;if(H<i)t=!0;else{if(!(H>i))return;t=!1}!1===K&&!0===t&&q(r>=a?c>=0?"left":"right":n>=0?"up":"down");K=t,H=i}),333,{leading:!0}),V=0,Z=0,$=0,_=!0,ee=!1,te=function(e,t){var n=c-e,a=r-t;$?1===$?(V=n,Z=a):(V=(V*$+n)/($+1),Z=(Z*$+a)/($+1)):(V=0,Z=0),c=e,r=t,++$},ne=function(e){$=0,_=!1,ee=!1;var t=e.changedTouches[0],n=t.screenX,c=t.screenY;te(n,c),setTimeout((function(){if(!_){var e=Math.abs(V),t=Math.abs(Z);(t>=e?t:e)<5&&(q("pressed"),_=!0,ee=!0)}}),200)},ce=function(e){if(!_){var t=e.changedTouches[0],n=t.screenX,c=t.screenY;te(n,c)}},re=function(e){if(!_){var t=e.changedTouches[0],n=t.screenX,c=t.screenY;te(n,c);var r=Math.abs(V),a=Math.abs(Z);if((a>=r?a:r)>=5)q(a>=r?Z>0?"up":"down":V>0?"left":"right")}ee&&q("released"),_=!0},ae=function(e){var t=Object(D.useRef)(e);Object(D.useEffect)((function(){t.current=e}),[e]),Object(D.useEffect)((function(){A((function(){document.addEventListener("wheel",Q),B&&(document.addEventListener("touchstart",ne),document.addEventListener("touchmove",ce),document.addEventListener("touchend",re))}));var e=Y(t);return function(){e(),A((function(){document.removeEventListener("wheel",Q),B&&(document.removeEventListener("touchstart",ne),document.removeEventListener("touchmove",ce),document.removeEventListener("touchend",re))}))}}),[])},ie=function(){var e=Object(D.useContext)(U),t=e.start,n=e.stop,c=z(M),r=Object(D.useCallback)((function(e){if(c.current)switch(e){case"pressed":return void t();case"released":return void n()}}),[c,t,n]);ae(r),Object(D.useEffect)((function(){var e=function(e){c.current&&" "===e.key&&(e.preventDefault(),t())},r=function(e){c.current&&" "===e.key&&(e.preventDefault(),n())};return document.addEventListener("keydown",e),document.addEventListener("keyup",r),function(){document.removeEventListener("keydown",e),document.removeEventListener("keyup",r)}}),[c,t,n])},oe=n(21),se=J.a.div({display:"flex",justifyContent:"center",alignItems:"flex-end",height:"120px",marginBottom:"7px"}),de=Object(J.a)(oe.animated.span)({backgroundClip:"text",WebkitTextStroke:"1px black",WebkitTextFillColor:"transparent",backgroundImage:"linear-gradient(to right, black 50%, white 50%)",backgroundSize:"200%"}),ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=(100-e).toFixed(0)+"%";return{backgroundPosition:t}},je=function(e){var t=e.percent,n=Object(i.c)(L),c=Object(oe.useSpring)((function(){return ue()})),r=Object(I.a)(c,2),a=r[0],s=r[1];Number.isFinite(t)?s.start(ue(t)):s.start(ue());var d=n.length>7?"3em":"4em";return Object(N.jsx)(se,{children:Object(N.jsx)(de,{style:Object(o.a)(Object(o.a)({},a),{},{fontSize:d}),children:n})})},le=Object(D.forwardRef)((function(e,t){var n=Object(i.c)(R),c=Object(D.useState)(100),r=Object(I.a)(c,2),a=r[0],o=r[1],s=z(F),d=Object(D.useCallback)((function(){var e=function(e){return!!e.current}(t)&&t.current;if(e)if(0!==e.readyState){var n=e.currentTime,c=e.duration,r=Number.isFinite(c)?c:s.current;o(n/r*100)}else o(100)}),[t,s]),u=Object(D.useCallback)((function(){o(100)}),[]);return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)("audio",{ref:t,autoPlay:!0,src:n,onTimeUpdate:d,onEnded:u}),Object(N.jsx)(je,{percent:a})]})})),be=function(){var e=y();return Object(i.c)((function(e){return!L(e)}))&&e(m.changeStatus("completed")),Object(N.jsx)(N.Fragment,{})},ge=function(){var e=Object(i.c)(w),t=Object(i.c)(S),n=Object(i.c)(E);return Object(D.useEffect)((function(){!function(e){var t=e.remaining,n=e.passed,c=e.failed;t&&localStorage.setItem(l,JSON.stringify(t)),n&&localStorage.setItem(b,JSON.stringify(n)),c&&localStorage.setItem(g,JSON.stringify(c))}({remaining:e,passed:t,failed:n})}),[e,t,n]),Object(N.jsx)(N.Fragment,{children:Object(N.jsx)(be,{})})},fe=n(57),Oe=J.a.div({position:"absolute",top:"7px",right:"14px"}),he=Object(J.a)(fe.a)({height:"3em",width:"auto"}),pe=function(){var e=Object(i.c)(C),t=Object(oe.useSpring)({reset:e,cancel:!e,loop:!0,from:{x:0},x:e?1:0,config:{duration:1e3}}).x;return Object(N.jsx)(Oe,{children:Object(N.jsx)(oe.animated.div,{style:{transform:t.to({range:[0,.25,.35,.45,.55,.65,.75,1],output:[1,.97,.9,1.1,.9,1.1,1.03,1]}).to((function(e){return"scale(".concat(e,")")}))},children:Object(N.jsx)(he,{style:{color:e?"IndianRed":"#fdfdfd"}})})})},xe=n(16),me=n(37),ve=n(58),ye=["children"],ke=J.a.ul({listStyleType:"none"}),we=Object(J.a)(oe.animated.li)({}),Se=J.a.span({verticalAlign:"middle"}),Ee=function(e){var t=e.children,n=Object(P.a)(e,ye),c=Object(oe.useSpring)(n.style);return Object(N.jsx)(we,{style:c,children:t})},Le=function(e){var t=e.children,n=e.style,c=1===D.Children.count(t)?D.Children.toArray(t)[0].props.children:t,r=D.Children.map(c,(function(e,t){return 0===t?Object(N.jsx)(Se,{children:e}):Object(N.jsx)(N.Fragment,{children:e})}));return n?Object(N.jsx)(Ee,{style:n,children:r}):Object(N.jsx)(we,{children:r})},Re=J.a.span({fontWeight:"bold"}),Ce=J.a.div({marginTop:"3px"}),Fe=J.a.div({marginTop:"1em"}),Te=function(e){return e?{style:{color:"black"}}:{style:{color:"#f4f4f4"},"aria-hidden":!0}},Me=B?function(e){var t=e.isRecording;return Object(N.jsx)(Le,{children:t?Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(xe.e,{})," let go to stop"]}):Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(xe.e,{})," ",Object(N.jsx)(Re,{children:"long press"})," to record"]})})}:function(e){var t=e.isRecording;return Object(N.jsx)(Le,{children:t?Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(xe.d,{})," let go of ",Object(N.jsx)(Re,{children:"space"})," to stop"]}):Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(xe.d,{})," hold ",Object(N.jsx)(Re,{children:"space"})," to record"]})})},Ie=function(e){var t=e.audioRef,n=!!Object(i.c)(R),c=Object(i.c)(C),r=y();ae((function(e){n&&function(e){switch(e){case"up":var n=t.current;return void(n&&(n.paused?n.play():n.currentTime=0));case"left":return void r(m.fail());case"right":r(m.pass())}}(e)}));var a=Te(n);return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(Me,{isRecording:c}),Object(N.jsx)(Ce,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},a),{},{children:[Object(N.jsx)(xe.a,{})," ",Object(N.jsx)(Re,{children:"swipe right"})," to pass"]})),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},a),{},{children:[Object(N.jsx)(xe.b,{})," ",Object(N.jsx)(Re,{children:"swipe left"})," to fail"]})),Object(N.jsx)(Ce,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},a),{},{children:[Object(N.jsx)(me.b,{})," ",Object(N.jsx)(Re,{children:"swipe up"})," to replay recording"]}))]})},Pe=function(){var e=Object(i.c)(S).length,t=Object(i.c)(E).length,n=y();return ae((function(c){switch(c){case"left":return void(t&&n(m.doFailedList()));case"right":return void(e&&n(m.doPassedList()));case"up":return void n(m.resetLists())}})),Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(Le,{children:[Object(N.jsx)(ve.a,{style:{backgroundColor:"yellow",borderRadius:"1px"}})," ",Object(N.jsx)(Re,{children:"finished!"})]}),Object(N.jsx)(Fe,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},Te(t)),{},{children:[Object(N.jsx)(xe.b,{})," ",Object(N.jsx)(Re,{children:"swipe left"})," to retry ",t," failed words"]})),Object(N.jsx)(Ce,{}),Object(N.jsxs)(Le,{children:[Object(N.jsx)(xe.f,{})," ",Object(N.jsx)(Re,{children:"swipe up"})," to restart"]}),Object(N.jsx)(Ce,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},Te(e)),{},{children:[Object(N.jsx)(xe.a,{})," ",Object(N.jsx)(Re,{children:"swipe right"})," to retry ",e," passed words"]}))]})},De=function(){var e=Object(i.c)(S).length,t=Object(i.c)(E).length,n=Object(i.c)(w).length,c=Object(i.c)(k),r=y(),a=t&&"failed"!==c,s=e&&"passed"!==c,d=n&&"remaining"!==c,u=!(!e&&!t);return ae((function(e){switch(e){case"left":return void(a&&r(m.doFailedList()));case"right":return void(s&&r(m.doPassedList()));case"up":return void(u&&r(m.resetLists()));case"down":return void(d&&r(m.doRemainingList()))}})),Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(Le,{children:[Object(N.jsx)(me.a,{style:{color:"#EE851C",borderRadius:"1px"}})," ",Object(N.jsx)(Re,{children:"settings"})]}),Object(N.jsx)(Fe,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},Te(a)),{},{children:[Object(N.jsx)(xe.b,{})," ",Object(N.jsx)(Re,{children:"swipe left"})," to retry ",t," failed words"]})),Object(N.jsx)(Ce,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},Te(u)),{},{children:[Object(N.jsx)(xe.f,{})," ",Object(N.jsx)(Re,{children:"swipe up"})," to restart"]})),Object(N.jsx)(Ce,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},Te(s)),{},{children:[Object(N.jsx)(xe.a,{})," ",Object(N.jsx)(Re,{children:"swipe right"})," to retry ",e," passed words"]})),Object(N.jsx)(Ce,{}),Object(N.jsxs)(Le,Object(o.a)(Object(o.a)({},Te(d)),{},{children:[Object(N.jsx)(xe.c,{})," ",Object(N.jsx)(Re,{children:"swipe down"})," to return to main list,"," ",n," words"]}))]})},Je=function(e){var t;switch(Object(i.c)(T)){case"ready":t=Object(N.jsx)(Ie,Object(o.a)({},e));break;case"completed":t=Object(N.jsx)(Pe,{});break;case"settings":t=Object(N.jsx)(De,{})}return Object(N.jsx)(ke,{"aria-label":"app controls",children:t})},Ne=J.a.div({display:"flex",justifyContent:"center"}),Ue={display:"flex",fontWeight:"bold",width:"50%"},Xe=J.a.span(Ue,{justifyContent:"flex-end",color:"red"}),ze=J.a.span(Ue,{display:"flex",color:"green"}),Be=J.a.span({margin:"0 5px",backgroundColor:"gray",width:"2px"}),We=function(){var e=Object(i.c)(S),t=Object(i.c)(E),n=Object(i.c)(k),c={textDecoration:"underline"},r="failed"===n?c:void 0,a="passed"===n?c:void 0;return Object(N.jsxs)(Ne,{children:[Object(N.jsx)(Xe,{"aria-label":"fail count",style:r,children:t.length}),Object(N.jsx)(Be,{}),Object(N.jsx)(ze,{"aria-label":"pass count",style:a,children:e.length})]})},Ye=n(82),Ae=J.a.div({position:"absolute",top:"3px",left:"3px"}),qe=Object(oe.animated)(me.a),Ge=Object(oe.animated)(xe.b),He=function(e){return e?"none":"inline-flex"},Ke=function(){var e=y(),t=Object(i.c)(T),n="settings"===t,c=Object(D.useRef)(t);Object(D.useEffect)((function(){"settings"!==t&&(c.current=t)}),[t]);var r=Object(oe.useSpring)({display:He(n),opacity:n?0:1,transform:"perspective(600px) rotateX(".concat(n?180:0,"deg)"),config:{mass:5,tension:500,friction:80}}),a=r.transform,o=r.display,s=r.opacity;return Object(N.jsx)(Ae,{children:Object(N.jsxs)(Ye.a,{onClick:function(){e(m.changeStatus(n?c.current:"settings"))},children:[Object(N.jsx)(qe,{style:{opacity:s,display:o,transform:a}}),Object(N.jsx)(Ge,{style:{display:o.to((function(){return He(!n)})),opacity:s.to((function(e){return 1-e})),transform:a}})]})})},Qe=J.a.div({display:"flex",flexDirection:"column",position:"relative"}),Ve=function(){Object(D.useEffect)((function(){document.body.style.overscrollBehavior="none",document.body.style.overflow="hidden",B&&(document.body.style.webkitUserSelect="none")}),[]),ie();var e=Object(D.createRef)();return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(Qe,{children:[Object(N.jsx)(Ke,{}),Object(N.jsx)(pe,{}),Object(N.jsx)(le,{ref:e}),Object(N.jsx)(We,{}),Object(N.jsx)(Je,{audioRef:e})]}),Object(N.jsx)(ge,{})]})},Ze=["children"],$e=J.a.div({margin:"0 auto",backgroundColor:"white",width:"390px",height:"100vh"}),_e=J.a.div({margin:"1em"}),et=function(e){var t=e.children,n=Object(P.a)(e,Ze);return Object(N.jsx)("span",Object(o.a)(Object(o.a)({},n),{},{role:"img",children:t}))},tt=function(){var e=y(),t=Object(D.useState)(),n=Object(I.a)(t,2),c=n[0],r=n[1],a=Object(D.useState)("loading"),i=Object(I.a)(a,2),o=i[0],s=i[1];switch(Object(D.useEffect)((function(){try{navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){var t=new MediaRecorder(e);r(t),s("ready")})).catch((function(e){console.error(e),s("declined")}))}catch(e){s("unsupported")}}),[e]),o){case"loading":return Object(N.jsx)(N.Fragment,{});case"ready":return Object(N.jsx)(X,{recorder:c,children:Object(N.jsx)(Ve,{})});case"declined":return Object(N.jsxs)(_e,{children:["Oi ",Object(N.jsx)(et,{"aria-hidden":!0,children:"\ud83e\udd0c"})," why would you be here and not allow mic"]});default:return Object(N.jsxs)(_e,{children:[Object(N.jsx)(et,{"aria-label":"shrugs",children:"\ud83e\udd37"})," are you on Chrome? Cuz it only works on Chrome, sorta..."]})}},nt=function(){return Object(N.jsx)($e,{children:Object(N.jsx)(tt,{})})},ct=document.getElementById("root");Object(a.render)(Object(N.jsx)(i.a,{store:v,children:Object(N.jsx)(nt,{})}),ct)}},[[71,1,2]]]);
//# sourceMappingURL=main.73993ff4.chunk.js.map