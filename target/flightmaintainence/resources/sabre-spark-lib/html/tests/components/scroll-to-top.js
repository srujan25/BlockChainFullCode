/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

loadExample('scroll-to-top.html', function() {
  // Default
  screenshot(function() {
    addClass('.spark-scroll-to-top', 'visible');
    addClass('.spark-scroll-to-top', 'at-bottom');
  }, '.spark-scroll-to-top', 'scroll-to-top/default', 'lg');


  // Hovered
  screenshot(function() {
    addClass('.spark-scroll-to-top', 'visible');
    addClass('.spark-scroll-to-top', 'at-bottom');
    casper.mouse.move('.spark-scroll-to-top');
  }, '.spark-scroll-to-top', 'scroll-to-top/hovered', 'lg');


  // Active
  screenshot(function() {
    addClass('.spark-scroll-to-top', 'visible');
    addClass('.spark-scroll-to-top', 'at-bottom');
    casper.mouse.down('.spark-scroll-to-top');
  }, '.spark-scroll-to-top', 'scroll-to-top/active', 'lg');

  /*
    Focus state:
    Styling for this state cannot be rendered by PhantomJS due to a bug
    Reference: https://github.com/ariya/phantomjs/issues/11432
  */

});
