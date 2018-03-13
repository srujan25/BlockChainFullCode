var test = require('tape');
var getIndex = require('../../../src/helpers/traversal/get-index');

test('should get the index of an item in a NodeList', function(t) {

  var el = document.createElement('div');
  var child1 = document.createElement('span');
  var child2 = document.createElement('span');

  el.appendChild(child1);
  el.appendChild(child2);

  t.equal(getIndex(el.children, child1), 0, 'finds the index of the first child');
  t.equal(getIndex(el.children, child2), 1, 'finds the index of the second child');
  t.equal(getIndex(el.children, document.createElement('span')), -1, 'does not find the index when an element is not a child');

  t.end();
});
