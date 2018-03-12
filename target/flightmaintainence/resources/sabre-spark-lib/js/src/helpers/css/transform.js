/**
 * # Transform
 * Apply a cross-browser transform style.
 *
 * @example
 * transform('translateX', '-100px');
 *
 * @param {String} type
 * @param {String} val
 *
 * @module helpers/css/transform.js
 */

import each from '../util/each';

const prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', ''];

function transform(type, val) {

  var str = '';

  each(prefixes, (p) => {

    if (typeof val === 'object') {
      str += p + 'transform: ';

      for (var j in val) {
        str += j + '(' + val[j] + '); ';
      }
    } else {
      str += p + 'transform: ' + type + '(' + val + '); ';
    }
  });

  return str;
}

export default transform;
