/**
 * # Get Parents
 * See if an element has parents which match a query.
 *
 * @param {Element} parent
 * @param {String} query
 * @param {Element} limitEl The last element we should check.
 * @return {Boolean|Array}
 *
 * @module helpers/traversal/get-parents.js
 */

import getParent from './get-parent';

function getParents(parent, query, limitEl) {

  let list = [];

  while ((parent = getParent(parent.parentNode, query, limitEl))) {
    list.push(parent);
  }

  return list;
}

export default getParents;
