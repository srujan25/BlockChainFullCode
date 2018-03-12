/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('pagination.html', function() {
  // Default
  screenshot('body', 'pagination/default', ['xs', 'sm', 'md']);

  // Page number link hover state
  screenshot(function() {
    casper.mouse.move('.spark-pagination__item:nth-child(3)');
  }, 'body', 'pagination/hovered', ['xs', 'sm', 'md']);

  // Page number link active state
  screenshot(function() {
    casper.mouse.down('.spark-pagination__item:nth-child(3)');
  }, 'body', 'pagination/active', ['xs', 'sm', 'md']);

  // Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-pagination__item:nth-child(3)');
    casper.mouse.move('body', 300, 300);
  });

  // Next link hover state
  screenshot(function() {
    casper.mouse.move('.spark-pagination__pages a:last-child');
  }, 'body', 'pagination/next--hovered', 'md');

  // Next link active state
  screenshot(function() {
    casper.mouse.down('.spark-pagination__pages a:last-child');
  }, 'body', 'pagination/next--active', 'md');

  // Focus state not available due to bug in PhantomJS

  // Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-pagination__pages:last-child');
    casper.mouse.move('body', 300, 300);
  });

  // Select hover state
  screenshot(function() {
    casper.mouse.move('.spark-select');
  }, 'body', 'pagination/select--hovered', ['xs', 'md']);

  // Select option chosen
  screenshot(function() {
    casper.evaluate(function() {
      document.querySelector('.spark-select__input').selectedIndex = 2;
    });
  }, 'body', 'pagination/select--clicked', ['xs', 'md']);
});


loadExample('pagination--truncated.html', function() {
  // Default
  screenshot('body', 'pagination/truncated-default', ['xs', 'sm', 'md']);

  // Page number link hover state
  screenshot(function() {
    casper.mouse.move('.spark-pagination__item:nth-child(2)');
  }, 'body', 'pagination/truncated-hovered', ['xs', 'sm', 'md']);

  // Page number link active state
  screenshot(function() {
    casper.mouse.down('.spark-pagination__item:nth-child(2)');
  }, 'body', 'pagination/truncated-active', ['xs', 'sm', 'md']);

  // Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-pagination__item:nth-child(2)');
    casper.mouse.move('body', 300, 300);
  });

  // Previous link hover state
  screenshot(function() {
    casper.mouse.move('.spark-pagination__pages a:first-child');
  }, 'body', 'pagination/truncated-previous--hovered', 'md');

  // Previous link active state
  screenshot(function() {
    casper.mouse.down('.spark-pagination__pages a:first-child');
  }, 'body', 'pagination/truncated-previous--active', 'md');

  // Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-pagination__pages a:first-child');
    casper.mouse.move('body', 300, 300);
  });

  // Next link hover state
  screenshot(function() {
    casper.mouse.move('.spark-pagination__pages a:last-child');
  }, 'body', 'pagination/truncated-next--hovered', 'md');

  // Next link active state
  screenshot(function() {
    casper.mouse.down('.spark-pagination__pages a:last-child');
  }, 'body', 'pagination/truncated-next--active', 'md');

  // Focus state not available due to bug in PhantomJS

  // Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-pagination__pages:last-child');
    casper.mouse.move('body', 300, 300);
  });

  // Select hover state
  screenshot(function() {
    casper.mouse.move('.spark-select');
  }, 'body', 'pagination/truncated-select--hovered', ['xs', 'md']);

  // Select option chosen
  screenshot(function() {
    casper.evaluate(function() {
      document.querySelector('.spark-select__input').selectedIndex = 2;
    });
  }, 'body', 'pagination/truncated-select--clicked', ['xs', 'md']);
});
