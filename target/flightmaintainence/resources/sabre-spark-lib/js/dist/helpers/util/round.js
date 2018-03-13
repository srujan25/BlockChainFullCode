"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Round
 * Round to a given number of decimal places.
 *
 * @param {Number} num
 * @param {Number} len
 * @return {Number}
 *
 * @module helpers/util/round.js
 */
function round(num, len) {
  len = len !== undefined ? len : 2;
  var x = Math.pow(10, len);
  return Math.round(num * x) / x;
}

exports.default = round;
module.exports = exports["default"];
//# sourceMappingURL=round.js.map
