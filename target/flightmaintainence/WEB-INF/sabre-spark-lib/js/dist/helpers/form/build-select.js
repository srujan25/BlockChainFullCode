'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * # Build Select
 * Build a select input.
 *
 * @param {Object} params
 *
 * @example
 * buildSelect({
 *   attributes: {
 *     name: 'test',
 *     class: 'spark-select__field'
 *   },
 *   options: [1, 2, 3, 4, 5, 6]
 * });
 *
 * @example
 * buildSelect({
 *   attributes: {
 *     name: 'test',
 *     class: 'spark-select__field',
 *     'data-attr': 'thing',
 *      multiple: true
 *   },
 *   selected: [2, 4],
 *   options: [
 *     {text: 'One', value: 1},
 *     {text: 'Two', value: 2},
 *     {text: 'Three', value: 3},
 *     {text: 'Four', value: 4},
 *     {text: 'Five', value: 5},
 *   ]
 * });
 *
 * @module helpers/form/build-select.js
 */

function buildSelect(params) {

  var el = document.createElement('select');
  var html = '';
  var attrs = params.attributes;
  var selected = params.selected instanceof Array ? params.selected : params.selected ? [params.selected] : [];
  var opts = params.options;

  var i = void 0;
  var len = opts.length;

  // Set attributes
  for (i in attrs) {
    el.setAttribute(i, attrs[i]);
  }

  // Add options
  for (i = 0; i < len; i++) {
    if (_typeof(opts[i]) === 'object') {
      html += '<option value="' + opts[i].value + '" ' + (selected.indexOf(opts[i].value) !== -1 ? 'selected' : '') + '>' + opts[i].text + '</option>';
    } else {
      html += '<option value="' + opts[i] + '" ' + (selected.indexOf(opts[i]) !== -1 ? 'selected' : '') + '>' + opts[i] + '</option>';
    }
  }

  el.innerHTML = html;

  return el;
}

exports.default = buildSelect;
module.exports = exports['default'];
//# sourceMappingURL=build-select.js.map
