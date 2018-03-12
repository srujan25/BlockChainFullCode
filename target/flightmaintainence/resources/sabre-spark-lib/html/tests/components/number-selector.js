/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('number-selector.html', function() {
  // Default state
  screenshot('.spark-number-selector', 'number-selector/default', 'md');

  // Up button: +2
  screenshot(function(){
    casper.click('.spark-number-selector__up');
    casper.click('.spark-number-selector__up');
  }, '.spark-number-selector', 'number-selector/up', 'md');

  // Down button: -1
  screenshot(function(){
    casper.click('.spark-number-selector__down');
  }, '.spark-number-selector', 'number-selector/down', 'md');
});

loadExample('number-selector--error.html', function() {
  // Default
  screenshot('.spark-number-selector', 'number-selector/error', 'md');

  // Up button: +2
  screenshot(function(){
    casper.click('.spark-number-selector__up');
    casper.click('.spark-number-selector__up');
  }, '.spark-number-selector', 'number-selector/error--up', 'md');

  // Down button: -1
  screenshot(function(){
    casper.click('.spark-number-selector__down');
  }, '.spark-number-selector', 'number-selector/error--down', 'md');
});
