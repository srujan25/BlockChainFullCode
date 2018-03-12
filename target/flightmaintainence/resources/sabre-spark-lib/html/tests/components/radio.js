/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
//const addClass = require('../tools/add-class');

// Default Radio Buttons
loadExample('radio-buttons.html', function() {

  // Default
  screenshot('.spark-radio', 'radio-button/default', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-radio');
  }, '.spark-radio', 'radio-button/hovered', 'md');

  // Checked
  screenshot(function() {
    casper.click('.spark-radio');
  }, '.spark-radio', 'radio-button/checked', 'md');
});

// Radio Buttons with Error
loadExample('radio-buttons--with-error.html', function() {

  // Default
  screenshot('.spark-radio', 'radio-button/with-error-default', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-radio');
  }, '.spark-radio', 'radio-button/with-error-hovered', 'md');

  // Checked
  screenshot(function() {
    casper.click('.spark-radio');
  }, '.spark-radio', 'radio-button/with-error-checked', 'md');
});
