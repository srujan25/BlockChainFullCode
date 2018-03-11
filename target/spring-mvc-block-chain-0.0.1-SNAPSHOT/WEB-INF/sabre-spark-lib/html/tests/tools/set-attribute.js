/* global casper */
module.exports = function(selector, name, val) {
  casper.thenEvaluate(function(selector, name, val) {
    var el = document.querySelector(selector);
    el.setAttribute(name, val !== undefined ? val : true);
  }, selector, name, val);
};
