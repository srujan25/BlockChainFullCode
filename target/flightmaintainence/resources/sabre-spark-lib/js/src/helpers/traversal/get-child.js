/**
 * # Get Child
 * Get a child that matches the selector.
 *
 * @param {Element} el
 * @param {String} query
 * @return {Element|Null}
 *
 * @module helpers/traversal/get-child.js
 */

import matches from './matches';

function getChild(el, query) {

  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if (matches(el.children[i], query)) {
      return el.children[i];
    }
  }

  return null;
}

export default getChild;
