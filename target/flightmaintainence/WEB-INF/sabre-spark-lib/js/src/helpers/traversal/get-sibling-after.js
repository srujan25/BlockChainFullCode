/**
 * # Get Sibling After
 * Get a nearest sibling after the given element which matches
 * the given query selector.
 *
 * @param {Element} el
 * @param {String} query
 * @return {Element|Null}
 *
 * @module helpers/traversal/get-sibling-after.js
 */

import matches from './matches';

function getSiblingAfter(el, query) {

  while ((el = el.nextElementSibling)) {
    if (matches(el, query)) {
      return el;
    }
  }

  return null;
}

export default getSiblingAfter;
