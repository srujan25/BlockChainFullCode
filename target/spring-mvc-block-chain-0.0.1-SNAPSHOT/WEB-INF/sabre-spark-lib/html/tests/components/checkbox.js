/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

// Default Checkbox
loadExample('checkbox.html', function() {

  // Default
  screenshot('.spark-checkbox', 'checkbox/default', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/hovered', 'md');

  // Checked
  screenshot(function() {
    casper.click('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/checked', 'md');
});

// Small Checkbox
loadExample('checkbox--sm.html', function() {

  // Default
  screenshot('.spark-checkbox', 'checkbox/default', 'sm');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/hovered', 'sm');

  // Checked
  screenshot(function() {
    casper.click('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/checked', 'sm');
});

// Error state
loadExample('checkbox--with-error.html', function() {

  // Default
  screenshot('.spark-checkbox', 'checkbox/with-error', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/with-error-hovered', 'md');

  // Checked
  screenshot(function() {
    casper.click('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/with-error-checked', 'md');
});

// Error state - Small
loadExample('checkbox--with-error.html', function() {

  // Default
  screenshot(function() {
    addClass('.spark-checkbox', 'spark-checkbox--sm');
  }, '.spark-checkbox', 'checkbox/with-error', 'sm');

  // Hovered
  screenshot(function() {
    addClass('.spark-checkbox', 'spark-checkbox--sm');
    casper.mouse.move('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/with-error-hovered', 'sm');

  // Checked
  screenshot(function() {
    addClass('.spark-checkbox', 'spark-checkbox--sm');
    casper.click('.spark-checkbox');
  }, '.spark-checkbox', 'checkbox/with-error-checked', 'sm');
});
