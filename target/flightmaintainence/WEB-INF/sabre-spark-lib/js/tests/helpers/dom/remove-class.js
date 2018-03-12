var test = require('tape');
var addClass = require('../../../src/helpers/dom/add-class');
var removeClass = require('../../../src/helpers/dom/remove-class');

test('should remove a class from an element', function(t) {

  var el = document.createElement('div');

  addClass(el, 'added-class');
  t.ok(el.className.indexOf('added-class') !== -1, 'has the class');
  removeClass(el, 'added-class');
  t.ok(el.className.indexOf('added-class') === -1, 'removes the class');

  t.end();
});
