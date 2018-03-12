var test = require('tape');
var addClass = require('../../../src/helpers/dom/add-class');

test('should add a class to an element', function(t) {

  var el = document.createElement('div');

  addClass(el, 'added-class');
  t.ok(el.className.indexOf('added-class') !== -1, 'adds the class');
  addClass(el, 'added-class');
  t.ok(el.className.match(/added\-class/gi).length === 1, 'doesn\'t add the test class more than once');

  t.end();
});
