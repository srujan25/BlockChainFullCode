/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('toggle1.html', function() {
  screenshot('body', 'toggle/default', 'md');

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-toggle-group:nth-child(1) .spark-toggle:nth-child(2)');
      casper.mouse.click('.spark-toggle-group:nth-child(2) .spark-toggle:nth-child(2)');
    }, 'body', 'toggle/default--clicked', 'md');
  });
});

//loadExample('toggle2.html', function() {
   // NO DIFFERENCE FROM toggle1.html
//});

//loadExample('toggle3.html', function() {
   // NO DIFFERENCE FROM toggle1.html
//});

loadExample('toggle--switches.html', function() {
  screenshot('body', 'toggle/switches', 'md');

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-toggle-switch:nth-child(1)');
    }, 'body', 'toggle/switches--clicked', 'md');
  });
});

loadExample('toggle--icons1.html', function() {
  screenshot('body', 'toggle/icons', 'md');

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-toggle:nth-child(2)');
    }, 'body', 'toggle/icons--clicked', 'md');
  });
});

//loadExample('toggle--icons2.html', function() {
  // NO DIFFERENCE FROM toggle--icons1.html
//});
