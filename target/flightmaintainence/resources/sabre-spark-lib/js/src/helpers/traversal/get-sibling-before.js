/**
 * # Get Sibling Before
 * Get a nearest sibling before the given element which matches
 * the given query selector.
 *
 * @param {Element} el
 * @param {String} query
 * @return {Element|Null}
 *
 * @module helpers/traversal/get-sibling-before.js
 */

import matches from './matches';

function getSiblingBefore(el, query) {

  while ((el = el.previousElementSibling)) {
    if (matches(el, query)) {
      return el;
    }
  }

  return null;
}

export default getSiblingBefore;
