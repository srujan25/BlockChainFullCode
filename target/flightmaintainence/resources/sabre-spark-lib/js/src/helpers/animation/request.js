/**
 * # Request Animation
 * Request animation frame polyfill.
 * @module helpers/animation/request.js
 */
const request =
  window.requestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (function() {

    let fps = 60;
    let del = 1000 / fps;
    let start = Date.now();
    let prev = start;

    return function requestAnimationFrame(callback) {

      let requestTime = Date.now();
      let timeout = Math.max(0, del - (requestTime - prev));
      let timeToCall = requestTime + timeout;

      prev = timeToCall;

      return window.setTimeout(function onAnimationFrame() {
        callback(timeToCall - start);
      }, timeout);
    };
  })();

export default request;
