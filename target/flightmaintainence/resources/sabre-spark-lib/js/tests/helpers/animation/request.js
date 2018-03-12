var test = require('tape');
var request = require('../../../src/helpers/animation/request');

test('request animation frame is a method', function(t) {
  t.ok(typeof request === 'function');
  t.end();
});
