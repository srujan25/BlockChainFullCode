var test = require('tape');
var make = require('../../../src/helpers/dom/make-element');


test('takes a string and returns an element', function(t) {
  var el = make('<div><span></span></div>');
  t.equal(el.innerHTML, '<span></span>', 'has the proper innerHTML');
  t.end();
});

test('throws an error when no element is passed', function(t) {
  t.throws(function() {
    make('');
  });
  t.end();
});
