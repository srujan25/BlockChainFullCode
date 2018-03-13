/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('expand-collapse.html', function() {
  // Default state
  screenshot('.spark-panel', 'expand/default', 'md');

  // Expanded state
  screenshot(function(){
    casper.click('.spark-expand__hide--expanded');
    casper.wait(300);
  }, '.spark-panel', 'expand/expanded', 'md');
});

loadExample('expand-collapse--accordion.html', function() {
  // Default
  screenshot('.spark-panel', 'expand/accordion', 'md');

  // Hover
  screenshot(function(){
    casper.mouse.move('.spark-panel');
  }, '.spark-panel', 'expand/accordion--hover', 'md');

  // Active -- Will not show focus state of pseudo element (focus state bug)
  screenshot(function(){
    casper.mouse.down('.spark-panel__header');
  }, '.spark-panel', 'expand/accordion--active', 'md');

  // Expanded
  screenshot(function(){
    casper.mouse.up('.spark-panel');
    casper.mouse.move('body', 300, 300);
  }, '.spark-panel', 'expand/accordion--expanded', 'md');
});
