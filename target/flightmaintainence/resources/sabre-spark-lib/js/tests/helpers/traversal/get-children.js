var test = require('tape');
var getChildren = require('../../../src/helpers/traversal/get-children');

test('should get a list of child nodes that match a query', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<span><input></span><textarea></textarea><span></span>';

  t.equal(el.children[0], getChildren(el, 'span')[0], 'finds a matching child');
  t.equal(el.children[2], getChildren(el, 'span')[1], 'finds a matching child');
  t.notOk(getChildren(el, 'input')[0], 'does not find a matching child');

  t.end();
});
