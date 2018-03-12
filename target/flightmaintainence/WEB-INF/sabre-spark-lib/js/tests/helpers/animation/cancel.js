var test = require('tape');
var cancel = require('../../../src/helpers/animation/cancel');

test('cancel animation frame is a method', function(t) {
  t.ok(typeof cancel === 'function');
  t.end();
});
