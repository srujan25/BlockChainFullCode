/**
 * # Trim
 * Trim whitespace on a string.
 *
 * @param {String} str
 *
 * @module helpers/util/trim.js
 */

const trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

function trim(str) {
  return str.replace(trimRE, '');
}

export default trim;
