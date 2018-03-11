/**
 * # Debounce
 * Debounce a function call
 *
 * @param {Function} func
 * @param {Integer} delay
 *
 * @module helpers/util/debounce.js
 */
function debounce(func, delay) {

  let timer;

  return function() {
    let args = arguments;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(function() {
    func.apply(this, args);
    }, delay);
  };
}

export default debounce;
