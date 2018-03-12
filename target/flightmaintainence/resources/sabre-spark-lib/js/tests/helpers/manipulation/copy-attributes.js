var test = require('tape');
var copyAttributes = require('../../../src/helpers/manipulation/copy-attributes');

test('should copy attributes from one element to another', function(t) {

  var a = document.createElement('div');
  var b = document.createElement('div');

  a.id = 'test';
  a.className = 'one two three six';
  a.setAttribute('data-test', 'a test value');

  copyAttributes(a, b);

  t.equal(b.id, 'test', 'copies an id');
  t.equal(b.className, 'one two three six', 'copies a class');
  t.equal(a.getAttribute('data-test'), 'a test value', 'copies an arbitrary attribute');

  t.end();
});
