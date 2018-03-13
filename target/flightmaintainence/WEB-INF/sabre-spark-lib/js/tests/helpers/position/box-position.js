var test = require('tape');
var boxPosition = require('../../../src/helpers/position/box-position');

test('should detect when the dimensions of one element are atop another', function(t) {

  var a = {
    left: 10,
    top: 100,
    width: 50,
    height: 25
  };

  var b = {
    left: 0,
    top: 50,
    height: 10,
    width: 75
  };

  t.equal(boxPosition(a, b), 'below', 'one element to be below another');

  b = {
    left: 0,
    top: 100,
    height: 10,
    width: 75
  };

  t.equal(boxPosition(a, b), 'overlap', 'one element covers another');

  t.end();
});
