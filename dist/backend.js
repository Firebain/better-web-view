!function(r){var e={};function n(t){if(e[t])return e[t].exports;var o=e[t]={i:t,l:!1,exports:{}};return r[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=r,n.c=e,n.d=function(r,e,t){n.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:t})},n.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},n.t=function(r,e){if(1&e&&(r=n(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)n.d(t,o,function(e){return r[e]}.bind(null,o));return t},n.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(e,"a",e),e},n.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},n.p="/",n(n.s=1)}([function(r,e,n){var t=n(3),o=n(4);r.exports=function(r,e,n){var i=e&&n||0;"string"==typeof r&&(e="binary"===r?new Array(16):null,r=null);var a=(r=r||{}).random||(r.rng||t)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,e)for(var u=0;u<16;++u)e[i+u]=a[u];return e||o(a)}},function(r,e,n){r.exports=n(2)},function(r,e,n){"use strict";n.r(e);var t=n(0),o=n.n(t);window.backend={resolvers:{},invoke:function(r){for(var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=o()();t in this.resolvers;)t=o()();return external.invoke(JSON.stringify({hash:t,route:r,data:n})),new Promise(function(r,n){e.resolvers[t]={res:r,rej:n}})},handle:function(r){var e=this.resolvers[r.hash];void 0===e&&alert("Something went wrong"),"Ok"in r.data&&e.res(r.data.Ok),"Err"in r.data&&e.rej(r.data.Err),delete this.resolvers[r.hash]}}},function(r,e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var t=new Uint8Array(16);r.exports=function(){return n(t),t}}else{var o=new Array(16);r.exports=function(){for(var r,e=0;e<16;e++)0==(3&e)&&(r=4294967296*Math.random()),o[e]=r>>>((3&e)<<3)&255;return o}}},function(r,e){for(var n=[],t=0;t<256;++t)n[t]=(t+256).toString(16).substr(1);r.exports=function(r,e){var t=e||0,o=n;return[o[r[t++]],o[r[t++]],o[r[t++]],o[r[t++]],"-",o[r[t++]],o[r[t++]],"-",o[r[t++]],o[r[t++]],"-",o[r[t++]],o[r[t++]],"-",o[r[t++]],o[r[t++]],o[r[t++]],o[r[t++]],o[r[t++]],o[r[t++]]].join("")}}]);