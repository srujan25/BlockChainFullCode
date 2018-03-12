var test = require('tape');
var getSiblingAfter = require('../../../src/helpers/traversal/get-sibling-after');

test('should get a child node that matches a query', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<span></span><a></a><div></div><textarea></textarea><span></span>';
  var spanEl = el.children[0];

  t.equal(el.children[3], getSiblingAfter(spanEl, 'textarea'), 'finds a matching sibling');
  t.notOk(getSiblingAfter(spanEl, 'select'), 'does not find a matching sibling');

  t.end();
});
