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

  let el = document.createElement('select');
  let html = '';
  let attrs = params.attributes;
  let selected = params.selected instanceof Array ? params.selected : (params.selected ? [params.selected] : []);
  let opts = params.options;

  let i;
  let len = opts.length;

  // Set attributes
  for (i in attrs) {
    el.setAttribute(i, attrs[i]);
  }

  // Add options
  for (i = 0; i < len; i++) {
    if (typeof opts[i] === 'object') {
      html += '<option value="' + opts[i].value + '" ' + (selected.indexOf(opts[i].value) !== -1 ? 'selected' : '') + '>' + opts[i].text + '</option>';
    } else {
      html += '<option value="' + opts[i] + '" ' + (selected.indexOf(opts[i]) !== -1 ? 'selected' : '') + '>' + opts[i] + '</option>';
    }
  }

  el.innerHTML = html;

  return el;
}

export default buildSelect;
