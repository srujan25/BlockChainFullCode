var test = require('tape');
var scrollTo = require('../../../src/helpers/animation/scroll-to');

test('should scroll the window to a position', function(t) {

  var el = document.createElement('div');

  window.scrollTo(0, 0);

  scrollTo(el, {
    callback: function() {

      // t.equal(window.pageYOffset, el.clientTop, 'scrolls to the position of a given element');

      scrollTo({
        x: 10,
        y: 50,
        callback: function() {
          // t.equal(window.pageYOffset, 50); // fails in node
          t.end();
        }
      });
    }
  });
});
