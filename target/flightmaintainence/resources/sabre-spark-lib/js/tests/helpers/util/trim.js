var test = require('tape');
var trim = require('../../../src/helpers/util/trim');

test('should trim the whitespace at the start and end of a string', function(t) {
  t.equal(trim('   space at front'), 'space at front', 'trims space at the front');
  t.equal(trim('space at back   '), 'space at back', 'trims space at the back');
  t.equal(trim('   space at front and back   '), 'space at front and back', 'trims space at the front and back');
  t.end();
});
