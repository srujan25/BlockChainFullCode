var test = require('tape');
var formData = require('../../../src/helpers/form/form-data');

test('should store, retrieve and clear data on a form\'s elements', function(t) {

  var el = document.createElement('form');
  el.innerHTML = '<input name="test" value="asdf"><input name="test2"><select name="test3"><option>1</option><option>2</option></select><textarea name="test4">sss</textarea>';

  formData.store(el);

  t.equal(el.querySelector('[name=test]').getAttribute('data-stored-value'), 'asdf', 'values are stored on an input');
  t.notOk(el.querySelector('[name=test2]').getAttribute('data-stored-value'), 'no value stored on an empty input');
  t.equal(el.querySelector('[name=test3]').getAttribute('data-stored-value'), '0', 'values are stored on a select');
  t.equal(el.querySelector('[name=test4]').getAttribute('data-stored-value'), 'sss', 'values are stored on a textarea');

  formData.restore(el);

  t.equal(el.querySelector('[name=test]').value, 'asdf', 'values are stored on an input');
  t.notOk(el.querySelector('[name=test2]').value, 'no value restored on an empty input');
  t.equal(el.querySelector('[name=test3]').selectedIndex, 0, 'values are stored on a select');
  t.equal(el.querySelector('[name=test4]').value, 'sss', 'values are stored on a textarea');

  formData.store(el);
  formData.clear(el);

  t.notOk(el.querySelector('[name=test]').getAttribute('data-stored-value'), 'values are cleared on an input');
  t.notOk(el.querySelector('[name=test2]').getAttribute('data-stored-value'), 'values are cleared on an empty input');
  t.notOk(el.querySelector('[name=test3]').getAttribute('data-stored-value'), 'values are cleared on a select');
  t.notOk(el.querySelector('[name=test4]').getAttribute('data-stored-value'), 'values are cleared on a textarea');

  t.end();
});
