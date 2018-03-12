/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

loadExample('tooltips.html', function() {
  // Default
  screenshot('body', 'tooltip/default', 'md');

  // Individual hover states - to simulate positioning of tooltips
  screenshot(function() {
    casper.mouse.move('.spark-tooltip:nth-child(1)');
  }, 'body', 'tooltip/first-child-hovered', 'md');

  screenshot(function() {
    casper.mouse.move('.spark-tooltip:nth-child(2)');
  }, 'body', 'tooltip/second-child-hovered', 'md');

  screenshot(function() {
    casper.mouse.move('.spark-tooltip:nth-child(3)');
  }, 'body', 'tooltip/third-child-hovered', 'md');

  screenshot(function() {
    casper.mouse.move('.spark-tooltip:nth-child(4)');
  }, 'body', 'tooltip/fourth-child-hovered', 'md');

  // Button States
  screenshot(function() {
    casper.mouse.move('body', 300, 300);
    addClass('.spark-tooltip:nth-child(2)', 'focus');
    addClass('.spark-tooltip:nth-child(3)', 'hover');
    addClass('.spark-tooltip:nth-child(4)', 'active');
    addClass('.spark-tooltip:nth-child(4)', 'spark-icon--fill');
  }, 'body', 'tooltip/active', 'md');
});
