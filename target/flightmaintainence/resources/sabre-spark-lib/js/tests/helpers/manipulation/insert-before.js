var test = require('tape');
var insertBefore = require('../../../src/helpers/manipulation/insert-before');

test('should insert multiple children to a node before a given node', function(t) {

  var defaultHTML = '<span></span><p></p><p></p>';
  var el = document.createElement('div');
  el.innerHTML = defaultHTML;

  var beforeEl = el.children[1];

  var children = [document.createElement('span'), document.createElement('ul')];

  insertBefore(el, beforeEl, children);

  t.equal(el.children[1], children[0], 'appended elements are in front of element to insert before');
  t.equal(el.children[3], beforeEl, 'element to insert before is now after the appended elements');

  t.end();
});
