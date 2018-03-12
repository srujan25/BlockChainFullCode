/* global casper */
module.exports = function(selector, name) {
  casper.thenEvaluate(function(selector, name) {
    var el = document.querySelector(selector);
    el.removeAttribute(name);
  }, selector, name);
};
