/**
 * # Make Element
 * Make en element using a string of HTML.
 *
 * @example
 * makeElement('<div></div>');
 *
 * @module helpers/make-element.js
 *
 * @param {String} html
 * @return {Element}
 */
export default function(html) {

  if (!html) {
    throw new Error('Cannot create element with no HTML!');
  }

  let el = document.createElement('div');
  el.innerHTML = html;
  let el2 = el.children[0];
  el2.parentNode.removeChild(el2);
  return el2;
}
