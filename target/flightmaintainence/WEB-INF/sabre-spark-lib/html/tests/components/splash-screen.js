/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('splash-screen.html', function() {
  screenshot('body', 'splash-screen/default', 'md');
});

loadExample('splash-screen--content.html', function() {
  screenshot('body', 'splash-screen/content', 'md');
});
