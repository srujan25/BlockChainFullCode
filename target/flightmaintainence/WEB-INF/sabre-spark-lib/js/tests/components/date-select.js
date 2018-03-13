var test = require('tape');
var DateSelect = require('../../src/components/date-select');

test('should create date select helper with or without an element', function(t) {

  new DateSelect({
    type: 'day'
  });

  var el = document.createElement('label');
  el.innerHTML = '<select class="spark-select__field"></select>';
  new DateSelect(el, {
    type: 'month'
  });

  t.end();
});

test('should take config properties directly', function(t) {

  var arr = ['Januuu', 'Febbb'];
  var inst = new DateSelect({
    type: 'day',
    monthNames: arr,
    min: 1,
    max: 19,
    numericMonth: true
  });

  t.equal(inst.type, 'day');
  t.equal(inst.monthNames, arr);
  t.equal(inst.min, 1);
  t.equal(inst.max, 19);
  t.ok(inst.numericMonth);

  t.end();
});

test('should take config properties on the element', function(t) {

  var el = document.createElement('label');
  el.innerHTML = '<select class="spark-select__field" data-type="month" data-month-names="Jan2,Feb2,Mar2,Apr2" min="1" max="19"></select>';

  var inst = new DateSelect(el);

  t.equal(inst.type, 'month');
  t.equal(inst.monthNames[0], 'Jan2');
  t.equal(inst.min, 1);
  t.equal(inst.max, 19);

  t.end();
});

test('should set and get the value of a date select input', function(t) {

  var inst = new DateSelect({
    type: 'day'
  });

  inst.setValue(10);
  t.equal(inst.getValue(), '10', 'gets the set value');
  t.equal(inst.getValue(true), 10, 'gets the set value as a number');

  t.end();
});

test('should handle setting a list of options or using default values', function(t) {

  var inst = new DateSelect({
    type: 'month'
  });

  t.equal(inst.monthNames[0], 'Jan', 'first month is Jan by default');

  inst.setOptions({
    monthNames: ['January', 'February']
  });
  t.equal(inst.monthNames[0], 'January', 'first month is January after setting');

  inst.type = 'day';
  inst.monthNames = null;
  inst.setOptions({
    max: 29
  });
  t.equal(inst.select.selectEl.lastElementChild.value, '29', 'last day is equal to what was set');

  inst.type = 'year';
  inst.setOptions({
    min: 1800
  });
  t.equal(inst.select.selectEl.children[1].value, '1800', 'first year is equal to the min set');

  t.end();
});

test('should take onChange, onFocus and onBlur callbacks', function(t) {

  var count = 0;

  function cb() {
    count++;
    if (count === 3) t.end();
  }

  var inst = new DateSelect({
    type: 'month',
    onChange: cb,
    onFocus: cb,
    onBlur: cb
  });

  inst.setValue(5);
  inst._onSelectFocus();
  inst._onSelectBlur();
});
