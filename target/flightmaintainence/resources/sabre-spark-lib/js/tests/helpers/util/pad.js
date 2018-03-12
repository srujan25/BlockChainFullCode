var test = require('tape');
var pad = require('../../../src/helpers/util/pad');

test('should add leading padding to a number', function(t) {
  t.equal(pad(4, 3), '004', 'pads with the default 0');
  t.equal(pad(4, 3, '-'), '--4', 'pads with a -');
  t.end();
});
