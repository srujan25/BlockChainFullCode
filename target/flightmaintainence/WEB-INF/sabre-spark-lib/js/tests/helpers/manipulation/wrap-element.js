var test = require('tape');
var wrapElement = require('../../../src/helpers/manipulation/wrap-element');

test('should wrap an element inside another', function(t) {

  var parentEl = document.createElement('div');
  var el = document.createElement('span');
  var wrapEl = document.createElement('section');

  parentEl.appendChild(el);

  t.equal(el, wrapElement(el, wrapEl));
  t.equal(el.parentNode, wrapEl);

  t.end();
});
