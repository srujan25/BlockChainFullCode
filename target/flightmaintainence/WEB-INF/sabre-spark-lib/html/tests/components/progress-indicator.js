/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

loadExample('progress-indicator--extra-small-indeterminate.html', function() {
  screenshot('body', 'progress-indicator/extra-small-indeterminate', 'md');
});

loadExample('progress-indicator--lazy-load.html', function() {
  screenshot('body', 'progress-indicator/lazy-load', 'md');

  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('.spark-btn');
    }, 'body', 'progress-indicator/lazy-load__button--hover', 'md');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.down('.spark-btn');
    }, 'body', 'progress-indicator/lazy-load__button--active', 'md');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.up('.spark-btn');
      casper.mouse.move('body', 1, 1);
      addClass('.spark-btn', 'focus');
    }, 'body', 'progress-indicator/lazy-load__button--focus', 'md');
  });
});

loadExample('progress-indicator--large-determinate.html', function() {
  screenshot('body', 'progress-indicator/large-determinate--start', 'md');

  casper.wait(5000);

  casper.then(function(){
    screenshot('body', 'progress-indicator/large-determinate--end', 'md');
  });
});

loadExample('progress-indicator--small-determinate.html', function() {
  screenshot('body', 'progress-indicator/small-determinate--start', 'md');

  casper.wait(5000);

  casper.then(function(){
    screenshot('body', 'progress-indicator/small-determinate--end', 'md');
  });
});

loadExample('progress-indicator--large-indeterminate.html', function() {
  screenshot('body', 'progress-indicator/large-indeterminate', 'md');
});

loadExample('progress-indicator--small-indeterminate.html', function() {
  screenshot('body', 'progress-indicator/small-indeterminate', 'md');
});
