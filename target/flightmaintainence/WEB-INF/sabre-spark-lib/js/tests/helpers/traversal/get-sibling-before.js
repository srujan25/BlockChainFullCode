var test = require('tape');
var getSiblingBefore = require('../../../src/helpers/traversal/get-sibling-before');

test('should get a child node that matches a query', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<span></span><a></a><div></div><textarea></textarea><span></span>';
  var spanEl = el.children[4];

  t.equal(el.children[3], getSiblingBefore(spanEl, 'textarea'), 'finds a matching sibling');
  t.notOk(getSiblingBefore(spanEl, 'select'), 'does not find a matching sibling');

  t.end();
});
