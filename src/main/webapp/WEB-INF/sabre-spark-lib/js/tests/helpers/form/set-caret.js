var test = require('tape');
var setCaret = require('../../../src/helpers/form/set-caret');

test('should set the caret position on an input', function(t) {

  var el = document.createElement('input');
  el.value = 'asad dad as a lad';

  // @todo: this should test with el.selectionStart but that doesn't work in node
  t.equal(setCaret(el, 1).start, 1, 'sets the caret position to be 1');
  t.equal(setCaret(el, -1).start, 17, 'sets the caret position to be at the end');

  var test = setCaret(el, -3, -1);
  t.equal(test.start, 15, 'sets the start of a caret range');
  t.equal(test.end, 17, 'sets the end of a caret range');

  t.end();
});
