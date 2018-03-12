/* global casper */
module.exports = function(selector, cls) {
  casper.thenEvaluate(function(selector, cls) {
    var el = document.querySelector(selector);
    el.classList.remove(cls);
  }, selector, cls);
};
