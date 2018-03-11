var test = require('tape');
var DateInput = require('../../src/components/date-input');

var markup = '<input class="spark-date__field" type="date" name="example1" value="2015-02-02" role="datebox"><span class="spark-label">DOB</span>';
var toggleMarkup = '<div class="spark-date__toggle"></div>';
var messageMarkup = '<div class="spark-input__message"></div>';

test('should create date input component', function(t) {
  var el = document.createElement('label');

  t.throws(function() {
    new DateInput(el);
  }, 'needs a date input element to be constructed');

  el.innerHTML = markup;
  new DateInput(el);

  t.end();
});

test('should cache elements passed to it', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup + toggleMarkup + messageMarkup;

  var inputEl = el.querySelector('input');

  var inst = new DateInput(el);

  t.equal(inst.el, el, 'element is cached');
  t.equal(inst.inputEl, inputEl, 'input element is cached');
  t.equal(inst.toggleEl, el.querySelector('.spark-date__toggle'), 'toggle is cached');
  t.equal(inst.messageEl, el.querySelector('.spark-input__message'), 'message container is cached');

  t.end();
});

test('should set whitelisted parameters', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var onChange = function() {};
  var onFocus = function() {};
  var onBlur = function() {};

  var inst = new DateInput(el, {
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    isTypeahead: true
  });

  t.equal(inst.onChange, onChange, 'onChange is set');
  t.equal(inst.onFocus, onFocus, 'onFocus is set');
  t.equal(inst.onBlur, onBlur, 'onBlur is set');
  t.ok(inst.isTypeahead, 'isTypeahead is set');

  inst = new DateInput(el, {
    isSelect: true
  });

  t.ok(inst.isSelect, 'isSelect is set');
  t.notOk(inst.isTypeahead, 'isTypeahead is false if isSelect is set to true');

  t.end();
});

test('should update the active class when shown/hidden', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  el.querySelector('input').value = '';

  var inst = new DateInput(el);

  t.notOk(inst.isActive, 'isActive is false');
  t.equal(el.className.indexOf('active'), -1, 'active class is not set');

  inst.show();

  t.ok(inst.isActive, 'isActive is true');
  t.notEqual(el.className.indexOf('active'), -1, 'active class is set');

  inst.hide();

  t.notOk(inst.isActive, 'isActive is false');
  t.equal(el.className.indexOf('active'), -1, 'active class is not set');

  t.end();
});

test('should parse params from the markup or passed in the config', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);
  t.ok(inst.isActive, 'active by default because of an existing value');
  t.notOk(inst.isSelect, 'no select inputs without passing a special class');
  t.ok(inst.isTypeahead, 'defaults to being a typeahead');

  el = document.createElement('label');
  el.innerHTML = markup;

  el.querySelector('input').removeAttribute('value');
  el.innerHTML += '<span class="spark-date__toggle"></span>';
  inst = new DateInput(el);
  t.notOk(inst.isActive, 'not active by default because of no existing value');
  t.ok(inst.isTypeahead, 'defaults to being a typeahead');

  el = document.createElement('label');
  el.innerHTML = markup;

  el.innerHTML = markup;
  el.className += ' spark-date--select';
  inst = new DateInput(el);
  t.ok(inst.isSelect, 'is a select input because of an existing select class');
  t.notOk(inst.isTypeahead, 'not a typeahead by default because it is a select');

  el = document.createElement('label');
  el.innerHTML = markup;

  el.querySelector('input').setAttribute('data-format', 'DD-MM-YY');
  inst = new DateInput(el);
  t.equal(inst.parsedFormat.parts[0].name, 'day', 'first format part is a day');

  t.end();
});

test('should set the value of the input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);
  inst.setValue({
    day: 12,
    month: 8,
    year: 1999
  });

  t.equal(inst.inputEl.value, '1999-08-12', 'sets the value properly');
  t.equal(inst.typeaheads.day.getValue(), '12', 'sets the day typeahead value properly');
  t.equal(inst.typeaheads.month.getValue(), '08', 'sets the month typeahead value properly');
  t.equal(inst.typeaheads.year.getValue(), '1999', 'sets the year typeahead value properly');

  t.end();
});

test('should get the value of the input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);
  inst.setValue({
    day: 12,
    month: 8,
    year: 1999
  });

  t.equal(inst.getValue(), '1999-08-12', 'gets the value properly');

  t.end();
});

test('should validate day values', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);
  inst.setValue({
    day: 30,
    month: 2,
    year: 1999
  });

  t.equal(inst.typeaheads.day.getValue(true), 28, 'constrains day values');

  inst.setValue({
    year: 2016
  });
  inst.setValue({
    day: 30
  });

  t.equal(inst.typeaheads.day.getValue(true), 29, 'constrains day values for a leap year');

  t.end();
});

test('should pad short values', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);
  inst.setValue({
    day: 3,
    month: 2,
    year: 1999
  });

  t.equal(inst.typeaheads.day.getValue(), '03', 'pads a short day');
  t.equal(inst.typeaheads.month.getValue(), '02', 'pads a month day');

  t.end();
});

test('should run onBlur, onFocus and onChange callbacks', function(t) {

  var count = 0;
  var el = document.createElement('label');
  el.innerHTML = markup;

  function cb() {
    count++;
    if (count === 3) {
      t.end();
    }
  }

  var inst = new DateInput(el, {
    onChange: cb,
    onBlur: cb,
    onFocus: cb
  });

  inst.inputEl.value = '2014-02-02';
  inst._onTypeaheadFocus(10, inst.typeaheads.month);
  inst._onPieceChange();
  inst._onTypeaheadBlur(10, inst.typeaheads.month);
});

test('should clear all values of a date input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);

  inst.setValue({
    day: 3,
    month: 2,
    year: 1999
  });
  t.equal(inst.getValue(), '1999-02-03', 'value is set');

  inst.clearValue();
  t.equal(inst.getValue(), '', 'value is cleared');

  inst = new DateInput(el, {isSelect: true});

  inst.setValue({
    day: 3,
    month: 2,
    year: 1999
  });
  t.equal(inst.getValue(), '1999-02-03', 'value is set');

  inst.clearValue();
  t.equal(inst.getValue(), '', 'value is cleared');

  t.end();
});

test('should disable and enable a date input', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);

  inst.disable();
  t.ok(inst.inputEl.disabled, 'input is disabled');
  t.ok(inst.typeaheads.day.typeahead.inputEl.disabled, 'day input is disabled');
  t.ok(inst.typeaheads.month.typeahead.inputEl.disabled, 'month input is disabled');
  t.ok(inst.typeaheads.year.typeahead.inputEl.disabled, 'year input is disabled');

  inst.enable();
  t.notOk(inst.inputEl.disabled, 'input is enabled');
  t.notOk(inst.typeaheads.day.typeahead.inputEl.disabled, 'day input is enabled');
  t.notOk(inst.typeaheads.month.typeahead.inputEl.disabled, 'month input is enabled');
  t.notOk(inst.typeaheads.year.typeahead.inputEl.disabled, 'year input is enabled');

  inst = new DateInput(el, {isSelect: true});

  inst.disable();
  t.ok(inst.inputEl.disabled, 'input is disabled');
  t.ok(inst.selects.day.select.selectEl.disabled, 'day select is disabled');
  t.ok(inst.selects.month.select.selectEl.disabled, 'month select is disabled');
  t.ok(inst.selects.year.select.selectEl.disabled, 'year select is disabled');

  inst.enable();
  t.notOk(inst.inputEl.disabled, 'select is enabled');
  t.notOk(inst.selects.day.select.selectEl.disabled, 'day select is enabled');
  t.notOk(inst.selects.month.select.selectEl.disabled, 'month select is enabled');
  t.notOk(inst.selects.year.select.selectEl.disabled, 'year select is enabled');

  t.end();
});

test('should set and clear an error', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new DateInput(el);

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

  var inst = new DateInput(el);

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

  var inst = new DateInput(el);

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

  var inst = new DateInput(el);

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

test('should update to use a new dateInput component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new DateInput(el);
  var newEl = el.cloneNode(true);

  inst.show();

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
