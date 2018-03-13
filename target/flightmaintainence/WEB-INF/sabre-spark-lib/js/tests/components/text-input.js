var test = require('tape');
var TextInput = require('../../src/components/text-input');
var markup = '<input class="spark-input__field" type="email" name="example1" placeholder="you@address.com" value="" required role="textbox"><span class="spark-label">What is your email?</span><span class="spark-input__message"></span>';

test('should create text input component', function(t) {
  var el = document.createElement('label');

  t.throws(function() {
    new TextInput(el);
  }, 'needs an input or textarea element to be constructed');

  el.innerHTML = markup;
  new TextInput(el);

  t.end();
});

test('should be active by default if there is an existing value', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  el.querySelector('input').value = 'default value text';

  var inst = new TextInput(el);
  t.notEqual(inst.el.className.indexOf('active'), -1, 'active by default');

  t.end();
});

test('should show and hide by toggling the active class', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el);

  t.equal(inst.el.className.indexOf('active'), -1, 'not active by default');
  inst.show();
  t.notEqual(inst.el.className.indexOf('active'), -1, 'active after show');
  inst.hide();
  t.equal(inst.el.className.indexOf('active'), -1, 'not active after hide');

  t.end();
});

test('should validate an input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var shouldBeValid = false;

  var inst = new TextInput(el, {
    validatePattern: '([^@]{1,})(@)([^\.]{1,})(\.)([^\.]{1,})',
    onValidate: function(valid, value) {
      t.equal(value, inst.inputEl.value, 'value passed on onValidate matches the input value');
      t.equal(valid, shouldBeValid, 'is appropriately valid or invalid.');
    }
  });

  inst.validate();
  inst.inputEl.value = 'test@test.com';
  shouldBeValid = true;
  inst.validate();

  t.end();
});

test('should show on focus and hide on blur', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el);

  t.equal(inst.el.className.indexOf('active'), -1, 'not active by default');
  inst._onFocus();
  t.notEqual(inst.el.className.indexOf('active'), -1, 'active after focus');

  inst._onBlur();
  t.equal(inst.el.className.indexOf('active'), -1, 'not active after blur');
  inst._onFocus();
  inst.inputEl.value = 'test@test.com';
  t.notEqual(inst.el.className.indexOf('active'), -1, 'active after blur with value');

  t.end();
});

test('should call the onChange callback', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el);

  inst.inputEl.value = 'vallll';
  inst._onClearClick();
  t.notOk(inst.inputEl.value, 'inputEl is cleared');

  inst.inputEl.value = 'vall';
  inst.onChange = function(value) {
    t.equal(value, '', 'value passed to onChange is empty after clear');
    t.end();
  };
  inst._onClearClick();
});

test('should call the onBlur callback', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el, {
    onBlur: function(value) {
      t.equal(inst.inputEl.value, value, 'value is passed to onBlur');
    }
  });

  inst.inputEl.value = 'vallll';
  inst._onBlur();

  t.end();
});

test('should call the onFocus callback', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el, {
    onFocus: function(value) {
      t.equal(inst.inputEl.value, value, 'value is passed to onFocus');
    }
  });

  inst.inputEl.value = 'vallll';
  inst._onFocus();

  t.end();
});

test('should get the value of the input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el);

  inst.setValue('Test');
  t.equal(inst.getValue(), 'Test', 'gets the text input value');

  t.end();
});

test('should clear the value of the input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el);

  inst.setValue('Test');
  t.equal(inst.getValue(), 'Test', 'gets the text input value');

  inst.clearValue();
  t.notOk(inst.getValue(), 'value is cleared');

  t.end();
});

test('should disable and enable the input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el);

  inst.disable();
  t.ok(inst.inputEl.disabled, 'input is disabled');

  inst.enable();
  t.notOk(inst.inputEl.disabled, 'input is inabled');

  t.end();
});

test('should set and clear an error', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new TextInput(el);

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

  var inst = new TextInput(el);

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

  var inst = new TextInput(el);

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

  var inst = new TextInput(el);

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

test('should update to use a new text input component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new TextInput(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
