"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Cancel Animation
 * Cancel animation frame polyfill.
 * @module helpers/animation/cancel.js
 */
var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || function cancelAnimationFrame(id) {
  window.clearTimeout(id);
};

exports.default = cancel;
module.exports = exports["default"];
//# sourceMappingURL=cancel.js.map
