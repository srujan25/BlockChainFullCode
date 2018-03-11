var test = require('tape');
var transform = require('../../../src/helpers/css/transform');

test('should create a cross-browser CSS transform string', function(t) {
  t.equal(transform('translate', '0px'), '-webkit-transform: translate(0px); -moz-transform: translate(0px); -o-transform: translate(0px); -ms-transform: translate(0px); transform: translate(0px); ');
  t.end();
});
