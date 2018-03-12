'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Pad
 * Pad a number with leading zeros
 *
 * @param {Number} n
 * @param {Number} w
 * @param {String} c Optional String to pad with
 *
 * @example
 * pad(4, 2);
 *
 * @module helpers/util/pad.js
 */
function pad(n, w, c) {
  c = c || '0';
  n = n + '';
  return n.length >= w ? n : new Array(w - n.length + 1).join(c) + n;
}

exports.default = pad;
module.exports = exports['default'];
//# sourceMappingURL=pad.js.map
