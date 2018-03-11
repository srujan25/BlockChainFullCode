/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processBadgeStates(selector, name, count) {
  // Hovered
  screenshot(function() {
    casper.mouse.move(selector);
  }, 'body', 'badges/' + name + '--hovered', 'xs');

  if (count < 4) {
    // Active
    screenshot(function() {
      casper.mouse.down(selector);
    }, 'body', 'badges/' + name + '--active', 'xs');

    // Release mousedown
    casper.then(function(){
      casper.mouse.up(selector);
      casper.mouse.move('body', 300, 300);
    });
  }
  else {
    screenshot(function(){
      casper.mouse.click(selector);
    }, 'body', 'badges/' + name + '--active', 'xs');

    // Close popover
    casper.then(function(){
      casper.mouse.click('body', 300, 300);
    });
  }

  // PhantomJS currently doesn't support focus states
}

loadExample('badges.html', function() {
  screenshot('body', 'badges/default', 'xs');
});

loadExample('badges--user-notifications.html', function() {
  screenshot('body', 'badges/user-notifications', 'xs');
});

loadExample('badges--user-notifications.html', function() {
  screenshot('body', 'badges/user-notifications-with-icon-buttons', 'xs');
});

loadExample('badges--tally.html', function() {
  screenshot('body', 'badges/tally', 'xs');
});

loadExample('badges--informational.html', function() {
  // Default
  screenshot('body', 'badges/informational', 'xs');

  var numRows = casper.getElementsInfo('.row').length;

  // Skip the first two badges as they have no states
  for (var count = 2; count <= numRows; count++) {
    var el = '.row:nth-child(' + count + ') .spark-badge';
    processBadgeStates(el, 'informational-' + count, count);
  }
});

loadExample('badges--in-context--informational.html', function() {
  screenshot('body', 'badges/in-context-informational', ['lg']);
});

loadExample('badges--in-context--tally-with-standard-badge.html', function() {
  screenshot('body', 'badges/in-context-tally-with-standard-badge', ['lg']);
});

loadExample('badges--in-context--tally-with-text.html', function() {
  screenshot('body', 'badges/in-context-tally-with-text', ['lg']);
});
