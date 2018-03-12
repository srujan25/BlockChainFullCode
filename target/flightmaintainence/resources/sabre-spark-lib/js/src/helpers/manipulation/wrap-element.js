/**
 * # Wrap Element
 * Wrap an element with another element.
 *
 * @param {Element} el
 * @param {Element} wrapper
 * @return {Element}
 *
 * @module helpers/manipulation/wrap-element.js
 */
function wrapElement(el, wrapper) {

  wrapper = wrapper || document.createElement('div');

  if (el.nextSibling) {
    el.parentNode.insertBefore(wrapper, el.nextSibling);
  }
  else {
    el.parentNode.appendChild(wrapper);
  }

  return wrapper.appendChild(el);
}

export default wrapElement;
