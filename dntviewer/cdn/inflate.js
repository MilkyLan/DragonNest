/**
 * Minified by jsDelivr using UglifyJS v3.1.10.
 * Original file: /npm/inflate@0.0.7/index.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function inflate(){function n(){i(null,function(u,i){u?t.emit("error",u):void 0!==i?(t.queue(i),n()):t.queue(null)})}var u,t=through(function(n){if(r.push(n),u)for(;r.length;)u(null,r.shift())},function(){}),i=min(function(n,i){n?!0===n?t.queue(null):t.emit("error",n):u=i}),r=[];return n(),t}function pushToPull(n){return function(u){function t(){for(;r.length&&e.length;)e.shift().apply(null,r.shift());!l&&e.length&&(l=!0,u(null,i))}function i(n,u){l=!1,o(n,u),t()}var r=[],e=[],l=!1,o=n(function(){r.push(arguments),t()});return function(n,i){if(n)return u(n,i);e.push(i),t()}}}module.exports=inflate;var min=pushToPull(require("./min")),through=require("through");
//# sourceMappingURL=/sm/fe075fda534163a72b2101e94c204965ee38942d95a471389a1cc0ff85242e07.map