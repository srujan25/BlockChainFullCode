/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processStepIndicatorStates(step, name) {
  // Step Indicator Hover states
  screenshot(function(){
    casper.mouse.move('.spark-step-indicator__list a:nth-child(' + step + ')');
  }, '.spark-step-indicator', 'step-indicator/' + name + '-step-' + step + '--hover', ['xs', 'md', 'lg']);

  // Step Indicator Active states
  screenshot(function(){
    casper.mouse.down('.spark-step-indicator__list a:nth-child(' + step + ')');
  }, '.spark-step-indicator', 'step-indicator/' + name + '-step-' + step + '--active', ['xs', 'md', 'lg']);

  // Focus states not available due to bug in PhantomJS

  // Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-step-indicator__list a:nth-child(' + step + ')');
    casper.mouse.move('body', 300, 300);
  });
}

loadExample('step-indicator.html', function() {
  // Default
  screenshot('.spark-step-indicator', 'step-indicator/default', ['xs', 'md', 'lg']);

  // Hover and Active states
  var numSteps = casper.getElementsInfo('.spark-step-indicator__list a').length;

  for (var count = 1; count <= numSteps; count++) {
    processStepIndicatorStates(count, 'default');
  }
});

loadExample('step-indicator--condensed.html', function() {
  // Default
  screenshot('.spark-step-indicator', 'step-indicator/condensed', ['xs', 'md', 'lg']);

  // Hover and Active states
  var numSteps = casper.getElementsInfo('.spark-step-indicator__list a').length;

  for (var count = 1; count <= numSteps; count++) {
    processStepIndicatorStates(count, 'condensed');
  }
});

loadExample('step-indicator--header.html', function() {
  // Default
  screenshot('.spark-step-indicator', 'step-indicator/header', ['xs', 'md', 'lg']);

  // Hover and Active states
  var numSteps = casper.getElementsInfo('.spark-step-indicator__list a').length;

  for (var count = 1; count <= numSteps; count++) {
    processStepIndicatorStates(count, 'header');
  }
});

loadExample('step-indicator--large.html', function() {
  // Default
  screenshot('.spark-step-indicator', 'step-indicator/large', ['xs', 'md', 'lg']);

  // Hover and Active states
  var numSteps = casper.getElementsInfo('.spark-step-indicator__list a').length;

  for (var count = 1; count <= numSteps; count++) {
    processStepIndicatorStates(count, 'large');
  }
});

loadExample('step-indicator--dropdown.html', function() {
  // Default
  screenshot('body', 'step-indicator/dropdown', ['md']);

  // Expanded Dropdown
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-step-indicator__body > a');
    }, 'body', 'step-indicator/dropdown--expanded', ['md']);
  });

  // Hover over select items
  screenshot(function(){
    casper.mouse.move('.spark-step-indicator__list a:nth-child(2)');
  }, 'body', 'step-indicator/dropdown--expanded-step-2--hover', ['md']);

  screenshot(function(){
    casper.mouse.move('.spark-step-indicator__list a:nth-child(3)');
  }, 'body', 'step-indicator/dropdown--expanded-step-2--hover', ['md']);

  screenshot(function(){
    casper.mouse.move('.spark-step-indicator__list a:nth-child(4)');
  }, 'body', 'step-indicator/dropdown--expanded-step-2--hover', ['md']);

  // Click on a new item
  screenshot(function(){
    casper.mouse.click('.spark-step-indicator__list a:nth-child(4)');
  }, 'body', 'step-indicator/dropdown--expanded-step-2--hover', ['md']);
});

loadExample('step-indicator--standard-dropdown.html', function() {
  // Default
  screenshot('body', 'step-indicator/standard-dropdown', ['xs', 'sm', 'md', 'lg']);
});
