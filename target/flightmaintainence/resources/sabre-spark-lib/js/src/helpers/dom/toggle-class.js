/**
 * # Toggle Class
 * Toggle a class on an element given a condition.
 *
 * @param {Element|Array} el An element or array of elements to update.
 * @param {String} name
 * @param {Boolean} enable
 * @return {Element}
 *
 * @module  helpers/dom/toggle-class.js
 */

import hasClass from './has-class';
import addClass from './add-class';
import removeClass from './remove-class';

function toggleClass(el, name, enable) {

  if (!el) {
    return;
  }

  // If we're passed an array, toggle the class on each.
  if (el instanceof NodeList || el instanceof Array) {

    for (let i = 0, len = el.length; i < len; i++) {
      toggleClass(el[i], name, enable);
    }

    return;
  }

  let action;
  if (enable !== undefined) {
    enable = typeof enable === 'function' ? enable.call(null, el) : enable;
    action = enable ? 'add' : 'remove';
  } else {
    action = hasClass(el, name) ? 'remove' : 'add';
  }

  return (action === 'add' ? addClass : removeClass)(el, name);
}

export default toggleClass;
