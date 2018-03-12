/**
 * # Add Class
 * Add a class on an element.
 *
 * @param {Element|Array} el An element or array of elements to update.
 * @param {String} name
 * @return {Element}
 *
 * @module helpers/dom/add-class.js
 */

import trim from '../util/trim';
import hasClass from './has-class';

let ws = /\s+/;
let cleanup = /\s{2,}/g;

function addClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = trim(name).split(ws);
  }
  else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) {
      el.classList.add(name[0]);
    }
    return el;
  }

  let toAdd = [];
  let i = 0;
  let l = name.length;
  let item;
  let clsName = typeof el.className === 'string' ? el.className : (el.getAttribute ? el.getAttribute('class') : '');

  // see if we have anything to add
  for (; i < l; i++) {
    item = name[i];
    if (item && !hasClass(clsName, item)) {
      toAdd.push(item);
    }
  }

  if (toAdd.length) {
    if (typeof el.className === 'string') {
      el.className = trim((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' '));
    }
    else if (el.setAttribute) {
      el.setAttribute('class', trim((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' ')));
    }
  }

  return el;
}

export default addClass;
