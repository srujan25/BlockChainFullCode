/* global casper */
module.exports = function(selector, html) {
  casper.thenEvaluate(function(selector, html) {
    var el = document.querySelector(selector);
    el.innerHTML = html;
  }, selector, html);
};
