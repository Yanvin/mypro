!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){mySave=function(){let e="getComputedStyle"in window;return{listToArray:function(t){if(e)return Array.prototype.slice.call(t,0);let n=[];for(let e=0;e<t.length;e++)n[n.length]=t[e];return n},prev:function(t){if(e)return t.previousElementSibling;let n=t.previousSibling;for(;n&&1!==n.nodeType;)n=n.previousSibling;return n},findInfo:function(e){let t=e.parentNode;for(;t&&"tr"!==t.tagName.toLowerCase();)t=t.parentNode;let n=t.children[0].innerHTML,r=t.children[0].innerHTML,o=t,i=t;for(;"手机"!==n&&"笔记本"!==n&&"智能音箱"!==n;)n=(o=mySave.prev(o)).children[0].innerHTML;if("华东"!==r&&"华南"!==r&&"华北"!==r)for(r=i.children[1].innerHTML;"华东"!==r&&"华南"!==r&&"华北"!==r;)r=(i=mySave.prev(i)).children[1].innerHTML;return[n,r]},saveInput:function(e){let t=this.listToArray(e.getElementsByTagName("td"));for(var n=0;n<t.length;n++)parseFloat(t[n].innerHTML)||(t.splice(n,1),n--);let r=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],o=null,i=[];for(let e=0;e<t.length;e++)i=e%12==0?[(o=this.findInfo(t[e]))[0],o[1],r[0]]:[o[0],o[1],r[e%12]],localStorage.setItem(i,t[e].innerHTML);alert("保存成功!")},getData:function(e){let t=[],n=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];for(let r in e[0])if("on"!==r)for(let o in e[1])if("on"!==o&&e[0][r]&&e[1][o]){if(!localStorage.getItem([e[0][r],e[1][o],n[0]]))return!1;let i=[],l={};for(let t=0;t<n.length;t++)i.push(parseFloat(localStorage.getItem([e[0][r],e[1][o],n[t]])));l.product=e[0][r],l.region=e[1][o],l.sale=i,t.push(l)}return t}}}()}]);