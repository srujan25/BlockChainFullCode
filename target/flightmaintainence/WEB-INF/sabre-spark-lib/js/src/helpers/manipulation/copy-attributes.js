/**
 * # Copy Attributes
 * Copy all of the attributes from one element to another.
 *
 * @param {Element} a
 * @param {Element} b
 *
 * @module helpers/manipulation/copy-attributes.js
 */

import each from '../util/each';

function copyAttributes(a, b) {
  each(a.attributes, (attr) => {
    b.setAttribute(attr.name, attr.value);
  });
}

export default copyAttributes;
