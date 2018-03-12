/**
 * # Get Children
 * See if an element has children which match a query.
 *
 * @param {Element} el
 * @param {String} query
 * @return {List}
 *
 * @module helpers/traversal/get-children.js
 */

import matches from './matches';

function getChildren(el, query) {

  var list = [];
  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if (matches(el.children[i], query)) {
      list.push(el.children[i]);
    }
  }

  return list;
}

export default getChildren;
