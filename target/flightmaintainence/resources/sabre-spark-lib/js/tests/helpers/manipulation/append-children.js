var test = require('tape');
var appendChildren = require('../../../src/helpers/manipulation/append-children');

test('should append multiple children to a node', function(t) {

  var defaultHTML = '<span></span><p></p><p></p>';
  var el = document.createElement('div');
  el.innerHTML = defaultHTML;

  var children = [document.createElement('span'), document.createElement('ul')];

  appendChildren(el, children);

  t.notEqual(el.children[0], children[0], 'first child of node is not the first element in the appended list');
  t.equal(el.children[3], children[0], 'forth child of node is the first element in the appended list');

  el.innerHTML = defaultHTML;

  appendChildren(el, children, true);
  t.equal(el.children[0], children[0], 'first child of node is the first element in the appended list because clear was passed');

  var anotherEl = el.cloneNode(true);
  appendChildren(el, anotherEl.children);
  t.notEqual(el.children[0], anotherEl.children[0], 'moves elements of an HTMLCollection');

  t.end();
});
