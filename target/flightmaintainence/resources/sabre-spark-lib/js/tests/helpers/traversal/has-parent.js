var test = require('tape');
var hasParent = require('../../../src/helpers/traversal/has-parent');

test('should determine if a given element has another for a parent', function(t) {

  var el = document.createElement('div');
  var child1 = document.createElement('span');
  var child2 = document.createElement('span');
  var child1child1 = document.createElement('span');

  child1.appendChild(child1child1);
  el.appendChild(child1);

  t.ok(hasParent(child1, el), 'finds an immediate parent');
  t.ok(hasParent(child1child1, el), 'finds a grandparent');
  t.notOk(hasParent(child2, el), 'does not find an non-existent parent');

  t.end();
});
