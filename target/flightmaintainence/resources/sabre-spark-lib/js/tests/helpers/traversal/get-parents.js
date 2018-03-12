var test = require('tape');
var getParents = require('../../../src/helpers/traversal/get-parents');

test('should get an array of parents based on a query string', function(t) {

  var el = document.createElement('div');
  var child1 = document.createElement('div');
  var child1child1 = document.createElement('span');

  child1.appendChild(child1child1);
  el.appendChild(child1);

  t.equal(getParents(child1child1, 'div').length, 2, 'finds a list of parents');
  t.equal(getParents(child1, 'div').length, 1, 'finds a list of parents');
  t.notOk(getParents(child1child1, 'section').length, 'does not match an incorrect query selector');

  t.end();
});
