/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('sign-in.html', function() {
  screenshot('body', 'sign-in/default', 'md');
});

loadExample('sign-in--with-progress-bar.html', function() {
  // Default
  screenshot('body', 'sign-in/progress-bar--default', 'md');

  // Progress bar
  screenshot(function(){
    casper.click('.spark-btn');
    casper.wait(6100); // Let progress bar animation complete
  }, 'body', 'sign-in/progress-bar--complete', 'md');
});
