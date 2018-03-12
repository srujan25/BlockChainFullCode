/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

function processButtonStates(name, selector) {

  // Default
  screenshot(selector, 'button/' + name + '', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move(selector);
  }, selector, 'button/' + name + '--hovered', 'md');

  // Active
  screenshot(function() {
    casper.mouse.down(selector);
  }, selector, 'button/' + name + '--active', 'md');

  // Focused
  screenshot(function() {
    casper.mouse.up(selector);
    casper.mouse.move(selector, 300, 300);
    addClass(selector, 'focus');
  }, 'body', 'button/' + name + '--focused', 'md');
}

loadExample('button--default.html', function() {
  processButtonStates('default', '.spark-btn');
});

loadExample('button--default-brand.html', function() {
  processButtonStates('default-brand', '.spark-btn');
});

loadExample('button--icons.html', function() {
  processButtonStates('icons', '.spark-btn--icon');
});

// @todo: this might be trouble as the spinning animation is running
loadExample('button--loading.html', function() {
  processButtonStates('loading', '.spark-btn');
});

// @todo: this might be trouble as the spinning animation is running
loadExample('button--loading-with-input.html', function() {
  processButtonStates('loading-with-input', '.spark-btn');
});

loadExample('button--negative.html', function() {
  processButtonStates('negative', '.spark-btn--negative');
});

loadExample('button--secondary.html', function() {
  processButtonStates('secondary', '.spark-btn--secondary');
});

loadExample('button--text.html', function() {
  processButtonStates('text', '.spark-btn');
});

loadExample('button--sizes.html', function() {
  processButtonStates('lg', '.spark-btn--lg');
  processButtonStates('md', '.spark-btn--md');
  processButtonStates('sm', '.spark-btn--sm');
  processButtonStates('xs', '.spark-btn--xs');
});
