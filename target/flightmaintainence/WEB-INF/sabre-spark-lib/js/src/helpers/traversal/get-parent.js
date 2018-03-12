/**
 * # Get Parent
 * See if an element has another element for a parent.
 *
 * @param {Element} parent
 * @param {String} query
 * @param {Array|Element} limitEl The last element we should check.
 * @return {Boolean|Element}
 *
 * @module helpers/traversal/get-parent.js
 */

import matches from './matches';

function getParent(parent, query, limitEl) {

  limitEl = limitEl instanceof Array ? limitEl : [limitEl || document.body];

  while (parent) {

    if (matches(parent, query)) {
      return parent;
    }

    if (limitEl.indexOf(parent) !== -1) {
      return false;
    }

    parent = parent.parentNode;
  }

  return false;
}

export default getParent;
