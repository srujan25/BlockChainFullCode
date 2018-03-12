/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processAvatarStates(name, selector) {

  // Default
  screenshot(selector, 'avatar/' + name + '', 'xs');

  // Hovered
  screenshot(function() {
    casper.mouse.move(selector);
  }, selector, 'avatar/' + name + '--hovered', 'xs');

  // Active
  screenshot(function() {
    casper.mouse.down(selector);
  }, selector, 'avatar/' + name + '--active', 'xs');

  // Release mousedown
  casper.then(function(){
    casper.mouse.up(selector);
    casper.mouse.move('body', 300, 300);
  });

  // PhantomJS currently doesn't support focus states
}

loadExample('avatar--text.html', function() {
  processAvatarStates('text', '.spark-avatar');
});

loadExample('avatar--text-with-notification.html', function() {
  processAvatarStates('text--with-notification', '.spark-avatar');
});

loadExample('avatar--text--static.html', function() {
  screenshot('body', 'avatar/text--static', 'xs');
});

loadExample('avatar--text--light.html', function() {
  processAvatarStates('text--light', '.spark-avatar');
});

loadExample('avatar--sizes.html', function() {
  screenshot('body', 'avatar/sizes', 'xs');
});

loadExample('avatar--photo.html', function() {
  processAvatarStates('photo', '.spark-avatar');
});

loadExample('avatar--photo-with-notification.html', function() {
  processAvatarStates('photo--with-notification', '.spark-avatar');
});

loadExample('avatar--photo--static.html', function() {
  screenshot('body', 'avatar/photo--static', 'xs');
});

loadExample('avatar--photo--light.html', function() {
  processAvatarStates('photo--light', '.spark-avatar');
});
