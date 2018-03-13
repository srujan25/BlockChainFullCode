'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = exports.restore = exports.store = undefined;

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find all the form elements inside a given element and run a callback on each.
 * @param  {Element} el
 * @param  {Function} cb
 */
function findAll(el, cb) {
  (0, _each2.default)(el.querySelectorAll('input, select, textarea'), function (i) {
    cb(i);
  });
}

/**
 * Find all the form elements inside a given element and store their current
 * value as a data attribute.
 * @param {Element} el
 */
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

function store(el) {

  findAll(el, function (input) {

    var name = input.nodeName.toLowerCase();
    var value = void 0;

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

  findAll(el, function (input) {

    var name = input.nodeName.toLowerCase();
    var value = input.getAttribute('data-stored-value');

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
  findAll(el, function (input) {
    input.removeAttribute('data-stored-value');
  });
}

exports.store = store;
exports.restore = restore;
exports.clear = clear;
//# sourceMappingURL=form-data.js.map
