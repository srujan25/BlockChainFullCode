var test = require('tape');
var matches = require('../../../src/helpers/traversal/matches');

test('should determine if a given element matches a query selector', function(t) {

  var el = document.createElement('div');

  t.ok(matches(el, 'div'), 'matches the proper query selector');
  t.notOk(matches(el, 'span'), 'does not match an incorrect query selector');

  t.end();
});
