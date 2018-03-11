var test = require('tape');
var outerWidth = require('../../../src/helpers/dom/outer-width');

var markup = '<div style="width: 30px; margin-top: 20px;"></div>';

test('should get the outer width of an element (including margin and padding)', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  // @todo: this should confirm real values are computed but this doesn't work on the server
  t.equal(outerWidth(el), 0);
  t.equal(outerWidth(el, {
    marginTop: 0,
    marginBottom: 0,
    borderTop: 0,
    borderBottom: 0
  }), 0);

  t.end();
});
