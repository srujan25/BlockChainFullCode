/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('links.html', function() {
  // Default
  screenshot('body', 'links/default', 'md');

  // Hover
  screenshot(function() {
    casper.mouse.move('.spark-link:first-child');
  }, 'body', 'links/hovered', 'md');

  // Active
  screenshot(function() {
    casper.mouse.down('.spark-link:first-child');
  }, 'body', 'links/active', 'md');

  // Focus state not available due to bug in PhantomJS
});
