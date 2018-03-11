var test = require('tape');
var DateTypeahead = require('../../src/components/date-typeahead');

test('should create date input component with or without an element', function(t) {

  new DateTypeahead({
    placeholder: 'DD',
    format: '\\d\\d'
  });

  var el = document.createElement('label');
  new DateTypeahead(el, {
    placeholder: 'DD',
    format: '\\d\\d'
  });

  t.end();
});

test('should handle passed or parsed parameters', function(t) {

  var count = 0;
  function cb() {
    count++;
    if (count === 5) t.end();
  }

  var inst = new DateTypeahead({
    type: 'day',
    placeholder: 'DD',
    len: 2
  });

  t.equal(inst.format, '\\d\\d');

  inst = new DateTypeahead({
    type: 'day',
    placeholder: 'DD',
    format: '\\d\\d',
    onChange: cb,
    onFocus: cb,
    onBlur: cb,
    onBackspace: cb,
    onEnd: cb
  });

  inst._onTypeaheadChange(2);
  inst._onTypeaheadFocus(2);
  inst._onTypeaheadBlur(2);
  inst._onTypeaheadBackspace(2);
  inst._onTypeaheadEnd(inst.typeahead, '3');
});

test('should allow for a length to be specified instead of a format', function(t) {

  var inst = new DateTypeahead({
    type: 'day',
    placeholder: 'DD',
    len: 2
  });

  t.equal(inst.typeahead.format[0], '\\d', 'format is set based on a length');

  t.end();
});

test('should create a day input', function(t) {

  var inst = new DateTypeahead({
    type: 'day',
    placeholder: 'DD',
    format: '\\d\\d'
  });

  inst.typeahead.run();
  t.equal(inst.typeahead.placeholderEl.innerHTML, 'DD', 'day input has the right placeholder');

  inst.typeahead.setValue(32);
  t.equal(inst.typeahead.inputEl.value, '31', 'day input corrects out-of-bounds ');

  t.end();
});

test('should create a month input', function(t) {

  var inst = new DateTypeahead({
    type: 'month',
    placeholder: 'MM',
    format: '\\d\\d'
  });

  inst.typeahead.run();
  t.equal(inst.typeahead.placeholderEl.innerHTML, 'MM', 'month input has the right placeholder');

  inst.typeahead.setValue(22);
  t.equal(inst.typeahead.inputEl.value, '12', 'month input corrects out-of-bounds ');

  t.end();
});

test('should create a year input', function(t) {

  var inst = new DateTypeahead({
    type: 'year',
    placeholder: 'YY',
    format: '\\d\\d'
  });

  inst.typeahead.run();
  t.equal(inst.typeahead.placeholderEl.innerHTML, 'YY', 'year input has the right placeholder');

  inst.typeahead.setValue(-10);
  t.equal(inst.typeahead.inputEl.value, '0', 'year input corrects out-of-bounds ');

  t.end();
});

test('should set the value', function(t) {

  var inst = new DateTypeahead({
    type: 'year',
    placeholder: 'YY',
    format: '\\d\\d'
  });

  inst.setValue('23');

  t.equal(inst.typeahead.inputEl.value, '23', 'value is properly set');

  t.end();
});

test('should get the value', function(t) {

  var inst = new DateTypeahead({
    type: 'year',
    placeholder: 'YY',
    format: '\\d\\d'
  });

  inst.typeahead.setValue('19');

  t.equal(inst.getValue(), '19', 'gets the value after setting on the typeahead');

  t.end();
});
