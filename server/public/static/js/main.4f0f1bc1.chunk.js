(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{100:function(e,t,n){},108:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),c=n.n(o),i=(n(99),n(100),n(41)),l=n(76),u=n(14),s=n(62),m=n(77),p=n(151),d=n(146),f=n(159),h=n(15),E=n(158),O=n(47),v=n.n(O),b=n(59);function g(e){return{type:"TODO_REPLACE_LIST",payload:e}}function w(){return function(){var e=Object(b.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"TODO_SET_LOADING"}),e.next=3,fetch("/todo/all");case 3:if(200!==(n=e.sent).status){e.next=14;break}return e.t0=t,e.t1=g,e.next=9,n.json();case 9:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),(0,e.t0)(e.t3),e.next=15;break;case 14:t({type:"TODO_SET_ERROR"});case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}function y(e,t,n,a){return D(e,n,{method:t,headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})}function D(e,t,n){return function(){var a=Object(b.a)(v.a.mark((function a(r){return v.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r({type:"TODO_SET_LOADING"}),a.next=3,fetch(t,n);case 3:a.sent.status===e?r(w()):r({type:"TODO_SET_ERROR"});case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}var j=Object(d.a)((function(e){return{root:{"& > *":{margin:e.spacing(1),width:"25ch"}}}})),T=Object(i.b)(null,(function(e){return{submit:function(t){var n=t.what,a=t.when;return e(function(e,t,n){return y(201,"post","/todo",{who:e,what:t,when:n})}("ron",n,a))}}}))((function(e){var t=e.submit,n=Object(a.useState)(""),o=Object(s.a)(n,2),c=o[0],i=o[1],l=Object(a.useState)(new Date),u=Object(s.a)(l,2),d=u[0],O=u[1],v=j();return r.a.createElement(h.a,{utils:m.a},r.a.createElement("form",{className:v.root,noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),t({what:c,when:d}),i(""),O(new Date)}},r.a.createElement("div",null,r.a.createElement(f.a,{id:"filled-basic",label:"What",variant:"filled",value:c,onChange:function(e){var t=e.target.value;return i(t)}})),r.a.createElement("div",null,r.a.createElement(E.a,{value:d,onChange:O})),r.a.createElement("div",null,r.a.createElement(p.a,{type:"submit",variant:"contained",color:"primary"},"Add"))))}));var _=n(150),S=n(153),R=n(157),k=n(156),x=n(152),L=n(154),C=n(155),A=(n(106),Object(d.a)({table:{minWidth:650}})),N=Object(i.b)((function(e){return{todo:e.todo}}),(function(e){return{updateList:function(){return e(w())},setDone:function(t,n){return e(function(e,t){return y(200,"patch","/todo/".concat(e),{done:t})}(t,n))}}}))((function(e){var t=e.todo,n=e.updateList,o=e.setDone;Object(a.useEffect)((function(){n()}),[n]);var c=A();return r.a.createElement(x.a,{component:_.a},r.a.createElement(S.a,{className:c.table,"aria-label":"simple table"},r.a.createElement(L.a,null,r.a.createElement(C.a,null,r.a.createElement(k.a,null,"What"),r.a.createElement(k.a,{align:"right"},"When"),r.a.createElement(k.a,{align:"right"},"Done"))),r.a.createElement(R.a,null,t.list.map((function(e){var t=e.id,n=e.what,a=e.when,c=e.done;return r.a.createElement(C.a,{key:t,style:{backgroundColor:c?"palegreen":"white"}},r.a.createElement(k.a,{component:"th",scope:"row",style:{textDecoration:c?"line-through":"none"}},n),r.a.createElement(k.a,{align:"right"},a.toString()),r.a.createElement(k.a,{align:"right"},r.a.createElement(p.a,{variant:"contained",onClick:function(){return o(t,!c)}},"Done")))})))))})),W=n(30),I=n(74),G=n(75),J=n(48);var B=Object(W.combineReducers)({todo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{list:[],loading:!0,error:!1},t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"TODO_SET_LOADING":return Object(J.a)(Object(J.a)({},e),{},{loading:!0,error:!1});case"TODO_REPLACE_LIST":return{list:a,loading:!1,error:!1};case"TODO_SET_ERROR":return Object(J.a)(Object(J.a)({},e),{},{loading:!1,error:!0});default:return e}}});var M=function(e){var t=[G.a],n=[W.applyMiddleware.apply(void 0,t)],a=I.composeWithDevTools.apply(void 0,n);return Object(W.createStore)(B,a)}();var P=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(i.a,{store:M},r.a.createElement(l.a,null,r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/signin"}),r.a.createElement(u.a,{path:"/signup"}),r.a.createElement(u.a,{path:"/"},r.a.createElement(T,null),r.a.createElement(N,null))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},94:function(e,t,n){e.exports=n(108)},99:function(e,t,n){}},[[94,1,2]]]);
//# sourceMappingURL=main.4f0f1bc1.chunk.js.map