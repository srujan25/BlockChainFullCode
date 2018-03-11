"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Request Animation
 * Request animation frame polyfill.
 * @module helpers/animation/request.js
 */
var request = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function () {

  var fps = 60;
  var del = 1000 / fps;
  var start = Date.now();
  var prev = start;

  return function requestAnimationFrame(callback) {

    var requestTime = Date.now();
    var timeout = Math.max(0, del - (requestTime - prev));
    var timeToCall = requestTime + timeout;

    prev = timeToCall;

    return window.setTimeout(function onAnimationFrame() {
      callback(timeToCall - start);
    }, timeout);
  };
}();

exports.default = request;
module.exports = exports["default"];
//# sourceMappingURL=request.js.map
