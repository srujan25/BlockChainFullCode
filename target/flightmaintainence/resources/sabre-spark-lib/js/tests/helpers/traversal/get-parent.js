var test = require('tape');
var getParent = require('../../../src/helpers/traversal/get-parent');

test('should get a parent based on a query string', function(t) {

  var el = document.createElement('div');
  var child1 = document.createElement('span');
  var sibling1 = document.createElement('span');
  var child1child1 = document.createElement('span');

  child1.appendChild(child1child1);
  el.appendChild(child1);
  el.appendChild(sibling1);

  t.ok(getParent(child1child1, 'div'), 'matches the proper query selector');
  t.notOk(getParent(child1child1, 'section'), 'does not match an incorrect query selector');
  t.notOk(getParent(child1child1, 'div', child1), 'optionally limits the search for a matching parent');
  t.ok(getParent(child1child1, 'span', [child1, sibling1]), 'optionally limits the search for a matching parent');

  t.end();
});
