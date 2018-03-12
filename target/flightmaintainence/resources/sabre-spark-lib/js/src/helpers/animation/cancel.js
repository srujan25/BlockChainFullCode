/**
 * # Cancel Animation
 * Cancel animation frame polyfill.
 * @module helpers/animation/cancel.js
 */
const cancel =
  window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.cancelRequestAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  function cancelAnimationFrame(id) {
    window.clearTimeout(id);
  };

export default cancel;
