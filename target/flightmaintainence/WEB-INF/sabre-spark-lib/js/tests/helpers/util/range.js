var test = require('tape');
var range = require('../../../src/helpers/util/range');

test('should create a range of numbers', function(t) {

  var arr = range(0, 100);
  t.equal(arr[99], 99);

  arr = range(0, 1000, 100);
  t.equal(arr[9], 900);

  t.end();
});
