!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n=document.getElementById("region-radio-wrapper"),r=document.getElementById("product-radio-wrapper");function i(e,t){let n=[];n.push("<input type='checkbox' checkbox-type='all'>全选"),t.forEach(function(e){n.push("<input type='checkbox' checkobx-type='son' value="+e.text+">"+e.text)}),e.innerHTML=n.join(""),e.index=0,e.onclick=function(e){if("input"===e.target.tagName.toLowerCase())if(!0===e.target.checked?this.index+=1:this.index-=1,"all"===e.target.attributes[1].value){!0===e.target.checked?(bol=!0,this.index=4):(bol=!1,this.index=0);let t=e.target.parentNode.children;[].forEach.call(t,function(e,t){0!==t&&(e.checked=bol)})}else!1===e.target.checked&&0===this.index&&(e.target.checked=!0,this.index+=1),!1===e.target.checked&&3===this.index&&(e.target.parentNode.firstChild.checked=!1,this.index-=1),!1===e.target.parentNode.firstChild.checked&&3===this.index&&(e.target.parentNode.firstChild.checked=!0,this.index+=1)}}i(n,[{value:1,text:"华东"},{value:2,text:"华南"},{value:3,text:"华北"}]),i(r,[{value:1,text:"手机"},{value:2,text:"笔记本"},{value:3,text:"智能音箱"}])}]);