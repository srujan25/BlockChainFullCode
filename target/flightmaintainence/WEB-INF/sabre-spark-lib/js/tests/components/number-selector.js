var test = require('tape');
var NumberSelector = require('../../src/components/number-selector');

var markup = '<div class="spark-number-selector"><button class="spark-number-selector__down"></button><input type="number" value="0"><button class="spark-number-selector__up"></button></div>';

test('should create a new instance with the proper elements', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  new NumberSelector(el);
  t.end();
});

test('should get the current value as a number', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);

  t.equal(inst.getValue(), parseInt(inst.inputEl.value, 10), 'value call matches input value');

  t.end();
});

test('should set the current value as a number', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);

  inst.setValue(10);
  t.equal(inst.getValue(), 10, 'value call sets the value to 10 and returns the new value');

  inst.inputEl.setAttribute('max', 15);
  inst.setValue(20);
  t.equal(inst.getValue(), 15, 'value call returns the current value even if the value set was higher than max');

  inst.inputEl.setAttribute('min', 0);
  inst.setValue(-10);
  t.equal(inst.getValue(), 0, 'value call returns the current value even if the value set was lower than min');

  t.end();
});

test('should increment the number input', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);
  inst.inputEl.setAttribute('min', 0);
  inst.inputEl.setAttribute('max', 100);

  t.equal(inst.getValue(), 0, 'value defaults to 0');
  inst.increment();
  t.equal(inst.getValue(), 1, 'value is raised by 1');

  inst.inputEl.setAttribute('step', 10);

  inst.increment();
  t.equal(inst.getValue(), 10, 'value is raised by `step`(10)');

  t.end();
});

test('should increment the number input by a fraction', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);
  inst.inputEl.setAttribute('max', .5);
  inst.inputEl.setAttribute('min', 0);
  inst.inputEl.setAttribute('step', .5);

  t.equal(inst.getValue(), 0, 'value defaults to 0');
  inst.increment();
  t.equal(inst.getValue(), .5, 'value is raised by .5');
  inst.increment();
  t.equal(inst.getValue(), .5, 'value cannot be raised by .5 since value is at MAX');

  inst.inputEl.setAttribute('value', .3)
  inst.increment();
  t.equal(inst.getValue(), .5, 'value is raised to next valid value');

  t.end();
});

test('should decrement the number input', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);
  inst.inputEl.setAttribute('min', -20);
  inst.inputEl.setAttribute('max', 20);

  t.equal(inst.getValue(), 0, 'value defaults to 0');
  inst.decrement();
  t.equal(inst.getValue(), -1, 'value is lowered by 1');

  inst.inputEl.setAttribute('step', 10);

  inst.decrement();
  t.equal(inst.getValue(), -10, 'value is lowered by `step`(10)');

  t.end();
});

test('should decrement the number input by a fraction', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);
  inst.inputEl.setAttribute('min', -.5);
  inst.inputEl.setAttribute('step', .5);

  t.equal(inst.getValue(), 0, 'value defaults to 0');
  inst.decrement();
  t.equal(inst.getValue(), -.5, 'value is lowered by .5');
  inst.decrement();
  t.equal(inst.getValue(), -.5, 'value cannot be lowered by .5 since value is at MIN');

  inst.inputEl.setAttribute('value', -.3)
  inst.decrement();
  t.equal(inst.getValue(), -.5, 'value is lowered to next valid value');

  t.end();
});

test('should clear the value of a number selector', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);
  inst.setValue(10);

  t.equal(inst.getValue(), 10, 'value is set');

  inst.clearValue();
  t.equal(inst.getValue(), 0, 'value is cleared');

  t.end();
});

test('should disable and enable a number selector', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);

  inst.disable();

  t.ok(inst.inputEl.disabled, 'input is disabled');
  t.ok(el.querySelectorAll('button')[0].disabled, 'button is disabled');
  t.ok(el.querySelectorAll('button')[1].disabled, 'button is disabled');

  inst.enable();

  t.notOk(inst.inputEl.disabled, 'input is enabled');
  t.notOk(el.querySelectorAll('button')[0].disabled, 'button is enabled');
  t.notOk(el.querySelectorAll('button')[1].disabled, 'button is enabled');

  t.end();
});

test('should take onChange, onFocus and onBlur callbacks', function(t) {

  var count = 0;

  var el = document.createElement('div');
  el.innerHTML = markup;

  function cb() {
    count++;
    if (count === 3) t.end();
  }

  var inst = new NumberSelector(el, {
    onChange: cb,
    onFocus: cb,
    onBlur: cb
  });

  inst.setValue(5);
  inst._onInputFocus();
  inst._onInputBlur();
});

test('should set and clear an error', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new NumberSelector(el);

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

  var inst = new NumberSelector(el);

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

  var inst = new NumberSelector(el);

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

  var inst = new NumberSelector(el);

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

test('should update to use a new number selector component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new NumberSelector(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
