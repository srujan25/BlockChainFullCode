'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (a, b) {

  var aXSpan = a.left + a.width;
  var aYSpan = a.top + a.height;
  var bXSpan = b.left + b.width;
  var bYSpan = b.top + b.height;

  if (aXSpan <= b.left) return 'left'; // a is fully left of b
  if (a.left >= bXSpan) return 'right'; // a is fully right of b
  if (aYSpan <= b.top) return 'above'; // a is fully above b
  if (a.top >= bYSpan) return 'below'; // a is fully below b

  return 'overlap'; // boxes overlap
};

module.exports = exports['default']; /**
                                      * # Box Position
                                      * How is one element positioned relative to another?
                                      *
                                      * @example
                                      * boxPosition(
                                      * {width: 100, height: 300, left: 0, top: 0},
                                      * {width: 200, height: 50, left: 100, top: 40}
                                      * )
                                      *
                                      * @module helpers/position/box-position.js
                                      *
                                      * @param {Object} a
                                      * @param {Object} b
                                      * @return {String}
                                      */
//# sourceMappingURL=box-position.js.map
