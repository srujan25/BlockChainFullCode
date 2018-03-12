'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Set Caret
 * Set the caret position in an input.
 *
 * @param {Element} el
 * @param {Number} start
 * @param {Number} end
 *
 * @example
 * setCaret(el, -1);
 * setCaret(el, 2);
 *
 * @module helpers/form/set-caret.js
 */
function setCaret(el, start, end) {

  var originalActiveElement = document.activeElement;

  start = start < 0 ? el.value.length + start + 1 : start;
  end = end < 0 ? el.value.length + end + 1 : end;

  // IE support
  if (document.selection) {
    el.focus();
    var sel = document.selection.createRange();
    sel.moveStart('character', -el.value.length);
    sel.moveStart('character', start);
    sel.moveEnd('character', end !== undefined ? end : start);
    sel.select();
  } else if (el.selectionStart || el.selectionStart === 0) {
    el.selectionStart = start;
    el.selectionEnd = end !== undefined ? end : start;
  }

  // If we didn't have focus, go back to focusing on the original
  if (originalActiveElement !== el) {
    el.blur();
    originalActiveElement.focus();
  }

  return {
    start: start,
    end: end
  };
}

exports.default = setCaret;
module.exports = exports['default'];
//# sourceMappingURL=set-caret.js.map
