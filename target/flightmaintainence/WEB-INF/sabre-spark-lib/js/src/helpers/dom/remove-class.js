/**
 * # Remove Class
 * Remove a class on an element.
 *
 * @param {Element|Array} el An element or array of elements to update.
 * @param {String} name
 * @return {Element}
 *
 * @module helpers/dom/remove-class.js
 */

import trim from '../util/trim';

const ws = /\s+/;
const cleanup = /\s{2,}/g;

function removeClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = trim(name).split(ws);
  }
  else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) el.classList.remove(name[0]);
    return el;
  }

  // store two copies
  let clsName = ' ' + (typeof el.className === 'string' ? el.className : (el.getAttribute ? el.getAttribute('class') : '')) + ' ';
  let result = clsName;
  let current;
  let start;
  for (let i = 0, l = name.length; i < l; i++) {
    current = name[i];
    start = current ? result.indexOf(' ' + current + ' ') : -1;
    if (start !== -1) {
      start += 1;
      result = result.slice(0, start) + result.slice(start + current.length);
    }
  }

  // only write if modified
  if (clsName !== result) {
    if (typeof el.className === 'string') {
      el.className = trim(result.replace(cleanup, ' '));
    }
    else if (el.setAttribute) {
      el.setAttribute('class', trim(result.replace(cleanup, ' ')));
    }
  }

  return el;
}

export default removeClass;
