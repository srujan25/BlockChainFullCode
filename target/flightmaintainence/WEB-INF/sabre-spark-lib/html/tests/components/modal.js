/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processModalStates(name) {
  // Open Modal
  casper.mouse.click('button[data-modal]');

  casper.then(function(){
    screenshot('body', 'modal/' + name, ['xs', 'md']);
  });

  // Hover over Close Button
  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('.spark-modal__close');
    }, 'body', 'modal/' + name + '__close-button--hover', ['xs', 'md']);
  });

  // Close Modal using Close Button
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-modal__close');
    }, 'body', 'modal/' + name + '__close-button--click', ['xs', 'md']);
  });

  // Re-open Modal
  casper.then(function(){
    casper.mouse.click('button[data-modal]');
  });

  casper.then(function(){
    screenshot('body', 'modal/' + name + '--reopened', ['xs', 'md']);
  });

  // Close Modal using Overlay
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-modal', 10, 10);
    }, 'body', 'modal/' + name + '__overlay--clicked', ['xs', 'md']);
  });
}

loadExample('modal.html', function() {
  processModalStates('default');
});

loadExample('modal--message.html', function() {
  processModalStates('message');
});

loadExample('modal--single-form-element.html', function() {
  processModalStates('single-form-element');
});

loadExample('modal--multiple-form-elements.html', function() {
  processModalStates('multiple-form-elements');
});

loadExample('modal--multiple-form-elements-and-accordians.html', function() {
  processModalStates('multiple-form-elements-and-accordions');
});
