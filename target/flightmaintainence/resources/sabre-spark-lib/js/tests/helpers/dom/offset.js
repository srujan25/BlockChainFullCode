var test = require('tape');
var offset = require('../../../src/helpers/dom/offset');

test('should get the offset pixel values of an element', function(t) {

  var el = document.createElement('div');
  var offsets = offset(el);

  window.scrollTo(0, 0);
  // t.equal(offsets.left, 0, 'has a correct left offset');
  // t.equal(offsets.top, 0, 'has a correct top offset');

  // @todo: this doesn't provide much value because we don't really test the viewport offset
  window.scrollTo(0, 0);

  offsets = offset(el);

  // t.equal(offsets.left, 0, 'has a correct left offset');
  // t.equal(offsets.top, 0, 'has a correct top offset');

  t.end();
});
