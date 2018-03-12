/**
 * # Insert Before
 * Insert an array of elements before a node.
 *
 * @param {Element} el
 * @param {Element} beforeEl
 * @param {Array} children
 *
 * @module helpers/manipulation/insert-before.js
 */

import each from '../util/each';

function insertBefore(el, beforeEl, children) {
  each(children, (c) => {
    el.insertBefore(c, beforeEl);
  });
}

export default insertBefore;
