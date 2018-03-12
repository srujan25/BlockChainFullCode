var test = require('tape');
var SelectInput = require('../../src/components/select-input');

var markup = '<select class="spark-select__input"><option></option><option>a</option><option>b</option><option>c</option></select><span class="spark-label">Choose</span>';

test('should create select-input component', function(t) {

  var el = document.createElement('label');

  t.throws(function() {
    new SelectInput(el);
  }, 'A <select> element must be present!', 'should throw an error message about no select elements being present.');

  el.innerHTML = markup;
  new SelectInput(el);

  t.end();
});

test('should become active on focus and inactive on blur', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new SelectInput(el);

  t.notOk(inst.isActive, 'defaults to inactive');
  inst._onFocus();
  t.ok(inst.isActive, 'becomes active on focus');
  inst._onBlur();
  t.notOk(inst.isActive, 'becomes inactive on blur');

  t.end();
});

test('should update the has-value class when the input event fires', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new SelectInput(el);

  t.equal(el.className.indexOf('has-value'), -1, 'no has-value class by default');
  inst._onInput();
  t.equal(el.className.indexOf('has-value'), -1, 'no has-value class after input event w/ no value');
  inst.selectEl.children[1].selected = true;
  inst._onInput();
  t.notEqual(el.className.indexOf('has-value'), -1, 'has-value class added after input event w/ value');

  t.end();
});

test('should set the options of a select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new SelectInput(el);

  inst.setOptions([{
    value: 1,
    text: 'hi'
  }, {
    value: 2,
    text: 'bye'
  }]);
  t.equal(inst.selectEl.children[0].value, '1', 'first value is equal to what was set');
  t.equal(inst.selectEl.children[0].innerHTML, 'hi', 'first text is equal to what was set');
  t.equal(inst.selectEl.lastElementChild.value, '2', 'last value is equal to what was set');
  t.equal(inst.selectEl.lastElementChild.innerHTML, 'bye', 'last text is equal to what was set');

  t.end();
});

test('should get the value of a select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new SelectInput(el);

  inst.selectEl.selectedIndex = 1;

  t.equal(inst.getValue(), 'a', 'value retrieved is equal to the selected index');

  t.end();
});

test('should set the value of a select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new SelectInput(el);

  inst.setValue('c');
  t.equal(inst.getValue(), 'c', 'value retrieved is equal to the set value');

  inst.setValue('z');
  t.equal(inst.getValue(), 'c', 'value is not set if it doesn\'t exist in the list');

  t.end();
});

test('should set the label of a select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new SelectInput(el);

  inst.setLabel('test label text');
  t.equal(inst.labelEl.innerHTML, 'test label text', 'sets the label text');

  t.end();
});

test('should clear the value of the select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new SelectInput(el);

  inst.setValue('b');
  t.equal(inst.getValue(), 'b', 'value is set');

  inst.clearValue();
  t.notOk(inst.getValue(), 'value is cleared');

  t.end();
});

test('should enable and disable a select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new SelectInput(el);

  inst.disable();
  t.ok(inst.selectEl.disabled, 'input is disabled');

  inst.enable();
  t.notOk(inst.selectEl.disabled, 'input is enabled');

  t.end();
});

test('should set and clear an error', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new SelectInput(el);

  t.notOk(inst.el.getAttribute('data-error'), 'no error by default');
  t.equal(inst.messageEl.innerHTML, '', 'no default message text');
  inst.setError('bad input, son.');
  t.ok(inst.el.getAttribute('data-error'), 'error state set');
  t.equal(inst.messageEl.innerHTML, 'bad input, son.', 'message text set');

  inst.clearError();
  t.notOk(inst.el.getAttribute('data-error'), 'error state cleared');

  t.end();
});

test('should set and clear a warning', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new SelectInput(el);

  t.notOk(inst.el.getAttribute('data-warning'), 'no warning by default');
  t.equal(inst.messageEl.innerHTML, '', 'no default message text');
  inst.setWarning('bad input, son.');
  t.ok(inst.el.getAttribute('data-warning'), 'warning state set');
  t.equal(inst.messageEl.innerHTML, 'bad input, son.', 'message text set');

  inst.clearWarning();
  t.notOk(inst.el.getAttribute('data-warning'), 'warning state cleared');

  t.end();
});

test('should set and clear a success', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new SelectInput(el);

  t.notOk(inst.el.getAttribute('data-success'), 'no success by default');
  t.equal(inst.messageEl.innerHTML, '', 'no default message text');
  inst.setSuccess('bad input, son.');
  t.ok(inst.el.getAttribute('data-success'), 'success state set');
  t.equal(inst.messageEl.innerHTML, 'bad input, son.', 'message text set');

  inst.clearSuccess();
  t.notOk(inst.el.getAttribute('data-success'), 'success state cleared');

  t.end();
});

test('should clear all messages', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new SelectInput(el);

  t.notOk(inst.el.getAttribute('data-error'), 'no error by default');
  t.notOk(inst.el.getAttribute('data-warning'), 'no warning by default');
  t.notOk(inst.el.getAttribute('data-success'), 'no success by default');

  inst.setError('error');
  t.ok(inst.el.getAttribute('data-error'), 'error after set');
  inst.clearMessages();
  t.notOk(inst.el.getAttribute('data-error'), 'no error after clear');

  inst.setWarning('warning');
  t.ok(inst.el.getAttribute('data-warning'), 'warning after set');
  inst.clearMessages();
  t.notOk(inst.el.getAttribute('data-warning'), 'no warning after clear');

  inst.setSuccess('success');
  t.ok(inst.el.getAttribute('data-success'), 'success after set');
  inst.clearMessages();
  t.notOk(inst.el.getAttribute('data-success'), 'no success after clear');

  t.end();
});

test('should update to use a new select input component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new SelectInput(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
