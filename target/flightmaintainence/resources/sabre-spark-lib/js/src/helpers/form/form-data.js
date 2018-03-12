/**
 * # Form Data
 * Store and restore the data of form fields inline so it can be reverted.
 *
 * @example
 * formData.store(el);
 * formData.revert(el);
 *
 * @module helpers/form/form-data.js
 */

import each from '../util/each';

/**
 * Find all the form elements inside a given element and run a callback on each.
 * @param  {Element} el
 * @param  {Function} cb
 */
function findAll(el, cb) {
  each(el.querySelectorAll('input, select, textarea'), (i) => {
    cb(i);
  });
}


/**
 * Find all the form elements inside a given element and store their current
 * value as a data attribute.
 * @param {Element} el
 */
function store(el) {

  findAll(el, function(input) {

    let name = input.nodeName.toLowerCase();
    let value;

    switch (name) {
      case 'select':
        value = input.selectedIndex;
        break;
      default:
        value = encodeURI(input.value);
        break;
    }

    input.setAttribute('data-stored-value', value);
  });
}


/**
 * Revert all the form elements inside of a given element.
 * @param {Element} el
 */
function restore(el) {

  findAll(el, function(input) {

    let name = input.nodeName.toLowerCase();
    let value = input.getAttribute('data-stored-value');

    // No stored value
    if (!value && value !== '') {
      return;
    }

    switch (name) {
      case 'select':
        input.options[value].selected = true;
        break;
      default:
        input.value = decodeURI(value);
        break;
    }

    input.removeAttribute('data-stored-value');
  });
}


/**
 * Clear the stored data on all the form elements inside of a given element.
 * @param {Element} el
 */
function clear(el) {
  findAll(el, function(input) {
    input.removeAttribute('data-stored-value');
  });
}

export {
  store,
  restore,
  clear
};
