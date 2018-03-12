/**
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
export default function(a, b) {

  let aXSpan = a.left + a.width;
  let aYSpan = a.top + a.height;
  let bXSpan = b.left + b.width;
  let bYSpan = b.top + b.height;

  if (aXSpan <= b.left) return 'left'; // a is fully left of b
  if (a.left >= bXSpan) return 'right'; // a is fully right of b
  if (aYSpan <= b.top) return 'above'; // a is fully above b
  if (a.top >= bYSpan) return 'below'; // a is fully below b

  return 'overlap'; // boxes overlap
}
