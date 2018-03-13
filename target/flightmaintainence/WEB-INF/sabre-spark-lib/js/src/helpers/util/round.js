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
  let x = Math.pow(10, len);
  return Math.round(num * x) / x;
}

export default round;
