"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Range
 * Create a range of numbers.
 *
 * @param {Number} start
 * @param {Number} stop
 * @param {Number} step Optional
 * @return {Array}
 *
 * @module helpers/util/range.js
 */
function createRange(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = new Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}

exports.default = createRange;
module.exports = exports["default"];
//# sourceMappingURL=range.js.map
