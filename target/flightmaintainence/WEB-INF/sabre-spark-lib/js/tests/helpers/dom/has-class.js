var test = require('tape');
var hasClass = require('../../../src/helpers/dom/has-class');

test('should determine if a class exists on an element or string', function(t) {

  var el = document.createElement('div');
  el.className = 'test-class another-test-class';

  t.equal(hasClass(el, 'test-class'), true, 'has a class of "test-class"');
  t.equal(hasClass(el, 'another-test-class'), true, 'has a class of "another-test-class"');
  t.equal(hasClass(el, 'third-test-class'), false, 'has no class of "third-test-class"');

  t.equal(hasClass('string-class another-class', 'string-class'), true, 'has a class of "string-class"');
  t.equal(hasClass('string-class another-class', 'another-string-class'), false, 'has no class of "another-string-class"');

  t.end();
});
