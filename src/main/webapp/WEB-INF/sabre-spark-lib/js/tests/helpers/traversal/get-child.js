var test = require('tape');
var getChild = require('../../../src/helpers/traversal/get-child');

test('should get a child node that matches a query', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<span><input></span><textarea></textarea><span></span>';

  t.equal(el.children[0], getChild(el, 'span'), 'finds a matching child');
  t.notOk(getChild(el, 'input'), 'does not find a matching child');

  t.end();
});
