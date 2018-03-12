/**
 * # Append Children
 * Append an array of children to a node.
 *
 * @param {Element} el
 * @param {Array} children
 * @param {Boolean} empty Empty the node before adding children?
 *
 * @module helpers/manipulation/append-children.js
 */

import each from '../util/each';

function appendChildren(el, children, empty) {

  empty = empty === undefined ? false : empty;

  if (empty) {
    el.textContent = '';
  }

  let domList = children instanceof window.HTMLCollection;

  if (domList) {
    while (children.length) {
      el.appendChild(children[0]);
    }
  }
  else {
    each(children, (c) => {
      if (c) {
        el.appendChild(c);
      }
    });
  }
}

export default appendChildren;
