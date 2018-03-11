var test = require('tape');
var MultiSelectInput = require('../../src/components/multi-select-input');

var markupNative = '<select class="spark-multi-select__input" multiple size="5">  <option value="1">Don\'t pick this one.</option>  <optgroup label="Group 1">    <option value="a">Don\'t pick this one.</option>    <option value="b">A decent choice.</option>    <option value="c">The best option.</option>  </optgroup>  <optgroup label="Group 2">    <option value="2">Still more options.</option>    <option value="3">You have a choice.</option>    <option value="test">The power is yours.</option>  </optgroup>  <option value="yes">Pick this one.</option></select><span class="spark-multi-select__label">Select Options <span class="spark-multi-select__label--small">(Choose 5 Options)</span></span>';
var markup = '<span class="spark-multi-select__label">Select Options <span class="spark-multi-select__label--small">(Choose 5 Options)</span></span><fieldset class="spark-multi-select__container">  <div class="spark-multi-select__group" aria-label="Some Group">    <span class="spark-multi-select__group__label">Some Group</span>    <label class="spark-checkbox">      <input class="spark-checkbox__input" type="checkbox" value="1">      <!-- This has to be before .spark-checkbox__box! -->      <span class="spark-checkbox__box"></span>      <span class="spark-label">Check one...</span>    </label>    <label class="spark-checkbox">      <input class="spark-checkbox__input" type="checkbox">      <!-- This has to be before .spark-checkbox__box! -->      <span class="spark-checkbox__box"></span>      <span class="spark-label">Check one...</span>    </label>    <label class="spark-checkbox">      <input class="spark-checkbox__input" type="checkbox" value="a">      <!-- This has to be before .spark-checkbox__box! -->      <span class="spark-checkbox__box"></span>      <span class="spark-label">Check one...</span>    </label>  </div>';

test('should create multi select input component', function(t) {

  var el = document.createElement('label');

  t.throws(function() {
    new MultiSelectInput(el);
  }, 'Multi select needs either a select input or a series of checkboxes.', 'should throw an error message about no select elements being present.');

  el.innerHTML = markupNative;
  new MultiSelectInput(el);

  el.innerHTML = markup;
  new MultiSelectInput(el);

  t.end();
});

test('should get and set the value of a native multi select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markupNative;
  var inst = new MultiSelectInput(el);

  inst.setValue(['1', 'a']);

  t.equal(inst.getValue()[0], '1', 'value retrieved is equal to the selected index');
  t.equal(inst.getValue()[1], 'a', 'value retrieved is equal to the selected index');

  t.end();
});

test('should get and set the value of a custom multi select input', function(t) {

  var el = document.createElement('fieldset');
  el.innerHTML = markup;
  var inst = new MultiSelectInput(el);

  inst.setValue(['1', 'a']);

  t.equal(inst.getValue()[0], '1', 'value retrieved is equal to the selected index');
  t.equal(inst.getValue()[1], 'a', 'value retrieved is equal to the selected index');

  t.end();
});

test('should clear the value of a multi select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new MultiSelectInput(el);

  inst.setValue(['1']);
  t.equal(inst.getValue()[0], '1', 'value is set');

  inst.clearValue();
  t.notOk(inst.getValue().length, 'value is cleared');

  t.end();
});

test('should enable and disable a custom multi select input', function(t) {

  var el = document.createElement('fieldset');
  el.innerHTML = markup;

  var inst = new MultiSelectInput(el);

  inst.disable();
  t.ok(inst.el.attributes.disabled, 'input is disabled');

  inst.enable();
  t.notOk(inst.el.attributes.disabled, 'input is enabled');

  t.end();
});

test('should enable and disable a native multi select input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markupNative;

  var inst = new MultiSelectInput(el);

  inst.disable();
  t.ok(inst.selectEl.disabled, 'input is disabled');

  inst.enable();
  t.notOk(inst.selectEl.disabled, 'input is enabled');

  t.end();
});

test('should set and clear an error', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new MultiSelectInput(el);

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

  var inst = new MultiSelectInput(el);

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

  var inst = new MultiSelectInput(el);

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

  var inst = new MultiSelectInput(el);

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

test('should update to use a new multi select component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new MultiSelectInput(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
