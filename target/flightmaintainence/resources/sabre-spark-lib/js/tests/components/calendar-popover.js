var test = require('tape');
var Calendar = require('../../src/components/calendar-popover');

var inputEl = document.createElement('label');
inputEl.className = 'spark-input';
inputEl.innerHTML = '<input class="spark-input__field" type="date">';

test('should create calendar helper with or without an element, and handle multiple inputs', function(t) {

  // Create with no elements
  new Calendar();

  // Create with one element
  new Calendar(inputEl);

  // Create with two elements
  new Calendar([inputEl, inputEl.cloneNode(true)]);

  // Create with three elements
  new Calendar([inputEl, inputEl.cloneNode(true), inputEl.cloneNode(true)]);

  t.end();
});

test('should handle passed parameters or parse parameters from the given elements', function(t) {

  var inst = new Calendar({
    visibleCount: 2,
    min: '2015-10-10',
    max: '2016-10-10',
    value: '2016-01-12'
  });

  t.equal(inst.visibleCounts[0], 2, 'visible count is set when passsed directly');
  t.equal(inst.mins[0].year, 2015, 'min is set when passsed directly');
  t.equal(inst.maxes[0].year, 2016, 'max is set when passsed directly');
  t.equal(inst.values[0].year, 2016, 'value is set when passsed directly');

  var el = inputEl.cloneNode(true);
  el.querySelector('input').setAttribute('type', 'date');
  el.querySelector('input').setAttribute('min', '2015-10-10');
  el.querySelector('input').setAttribute('max', '2016-10-10');
  el.querySelector('input').setAttribute('data-visible-count', 1);
  el.querySelector('input').value = '2016-01-12';
  el.setAttribute('data-auto-advance', false);
  el.setAttribute('data-auto-close', false);
  el.setAttribute('data-close-delay', 5000);
  el.setAttribute('data-quick-jump', true);
  el.setAttribute('data-view-range', 'week');
  el.setAttribute('data-animate', false);
  el.setAttribute('data-animation-duration', 1240);
  el.setAttribute('data-show-on-focus', true);

  inst = new Calendar(el);

  t.equal(inst.mins[0].year, 2015, 'min is set when on an element');
  t.equal(inst.maxes[0].year, 2016, 'max is set when on an element');
  t.equal(inst.values[0].year, 2016, 'value is set when on an element');
  t.equal(inst.visibleCounts[0], 1, 'visibleCount is set when on an element');
  t.notOk(inst.autoAdvance, 'autoAdvance is set when on an element');
  t.notOk(inst.autoClose, 'autoClose is set when on an element');
  t.equal(inst.closeDelay, 5000, 'closeDelay is set when on an element');
  t.ok(inst.quickJump, 'quickJump is set when on an element');
  t.equal(inst.viewRange, 'week', 'viewRange is set when on an element');
  t.notOk(inst.animate, 'animate is set when on an element');
  t.equal(inst.animationDuration, 1240, 'animationDuration is set when on an element');
  t.ok(inst.showOnFocus, 'showOnFocus is set when on an element');

  el.querySelector('input').removeAttribute('min');
  el.querySelector('input').removeAttribute('max');

  t.end();
});

test('should create a calendar element or use an existing one', function(t) {

  var el = document.createElement('div');
  var inst = new Calendar();

  t.notEqual(el, inst.calendarEl, 'creates a new calendar element');

  inst = new Calendar({
    calendarEl: el
  });

  t.equal(el, inst.calendarEl, 'uses a passed calendar element');

  t.end();
});

test('should set the value of inputs', function(t) {

  var inst = new Calendar();

  inst.setValue('2017-01-01');
  t.equal(inst.inputEls[0].value, '2017-01-01', 'sets the value as a string');

  inst.setValue({
    year: 1998,
    month: 11,
    day: 23
  });
  t.equal(inst.inputEls[0].value, '1998-11-23', 'sets the value as an object');

  inst = new Calendar([inputEl, inputEl.cloneNode(true), inputEl.cloneNode(true)]);
  inst.setValue('1994-03-23', 2);
  t.equal(inst.inputEls[2].value, '1994-03-23', 'set the value of a particular element given an index');

  inst.setValue('', 2);
  t.equal(inst.inputEls[2].value, '', 'value is empty when no value is passed to setValue');

  inst.setValue('2222-03-12', inst.inputEls[1]);
  t.equal(inst.inputEls[1].value, '2222-03-12', 'sets the value given a particular element');

  t.end();
});

test('should constrain the values which can be set based on being sequential, or mins and maxes', function(t) {

  var inst = new Calendar([inputEl, inputEl.cloneNode(true)], {
    visibleCount: 2,
    min: '2015-10-10',
    max: '2016-10-10',
    values: ['2015-12-12', '2016-01-12']
  });

  inst.setValue('2016-01-13');
  t.notOk(inst.getValue(1), 'second value becomes unset after setting the first after it');

  t.end();
});

test('should update calendar date values to match their corresponding inputs', function(t) {

  var inst = new Calendar([inputEl, inputEl.cloneNode(true), inputEl.cloneNode(true)]);

  inst.inputEls[0].value = '';
  inst.updateValues();
  t.equal(inst.values[0], null, 'values are null when the input is empty');

  inst.inputEls[1].value = '2016-12-25';
  inst.updateValue(1);
  t.equal(inst.values[1].year, 2016, 'values are updated given a key');
  t.equal(inst.values[1].month, 12, 'values are updated given a key');
  t.equal(inst.values[1].day, 25, 'values are updated given a key');


  t.end();
});

test('should render the calendar with the appropriate number or days, weeks, months or years', function(t) {

  var inst = new Calendar(inputEl, {
    visibleCount: 2,
    value: '2016-01-01'
  });

  inst.render();

  t.equal(inst.calendarEl.querySelectorAll('.spark-calendar__month').length, 2, 'renders two months');
  t.ok(inst.calendarEl.innerHTML.indexOf('January 2016') > -1, 'should use the given input\'s date as a heading');
  var selected = inst.calendarEl.querySelector('.spark-calendar__day--selected');
  t.equal(Array.prototype.indexOf.call(selected.parentNode.childNodes, selected), 5, 'selects the right date');

  // inst.viewRange = 'day';
  // inst.render();

  // inst.viewRange = 'week';
  // inst.render();

  // inst.viewRange = 'year';
  // inst.render();

  t.end();
});

test('should open and close the calendar element', function(t) {

  var inst = new Calendar();

  inst.open();
  t.equal(inst.activeIndex, 0, 'is active');

  inst.close();
  t.equal(inst.activeIndex, null, 'is not active');

  t.end();
});

test('should show the next and previous set of dates', function(t) {

  var inst = new Calendar({
    value: '2016-01-01'
  });

  t.equal(inst._datesToShow[0].month, 1, 'has the right default month');

  inst.next();
  t.equal(inst._datesToShow[0].month, 2, 'increments the month');
  inst.render();
  t.ok(inst.calendarEl.innerHTML.indexOf('February 2016') > -1, 'updates the month text');

  inst.previous();
  t.equal(inst._datesToShow[0].month, 1, 'decrements the month');
  inst.render();
  t.ok(inst.calendarEl.innerHTML.indexOf('January 2016') > -1, 'updates the month text');

  t.end();
});

test('should only allow dates within the min and max to be set', function(t) {

  var inst = new Calendar({
    min: '2016-01-01',
    max: '2016-12-31'
  });

  inst.setValue('2017-01-01');
  t.equal(inst.getValue().year, 2016, 'restricts a value set to the max value');
  t.equal(inst.getValue().month, 12, 'restricts a value set to the max value');
  t.equal(inst.getValue().day, 31, 'restricts a value set to the max value');

  inst.setValue('2015-01-01');
  t.equal(inst.getValue().year, 2016, 'restricts a value set to the min value');
  t.equal(inst.getValue().month, 1, 'restricts a value set to the min value');
  t.equal(inst.getValue().day, 1, 'restricts a value set to the min value');

  t.end();
});

test('should only allow dates within the min and max to be navigated to', function(t) {

  var inst = new Calendar({
    min: '2016-01-01',
    max: '2016-12-31'
  });

  t.ok(inst._atMin, 'when a min is passed, defaults to being at min');
  inst.setValue('2016-02-01');
  inst.open();
  t.notOk(inst._atMin, 'no longer at min after setting a value');
  inst.close();

  t.end();
});

test('should call the onChange callback', function(t) {

  var inst = new Calendar({
    onChange: function() {
      t.end();
    }
  });

  inst._onInputChange({target: inst.inputEls[0]});
});

test('should show a date', function(t) {

  var inst = new Calendar();
  inst.showDate({
    month: 1,
    year: 2014
  });

  t.ok(inst._currentContent[0].innerHTML.indexOf('January 2014') !== -1, 'shows a specific date');

  t.end();
});

test('should clear calendar values', function(t) {

  var inst = new Calendar([inputEl.cloneNode(true), inputEl.cloneNode(true)]);

  inst.setValue('2017-01-01');
  inst.setValue('2018-03-23', 1);
  t.equal(inst.inputEls[0].value, '2017-01-01', 'sets the value as a string');
  t.equal(inst.inputEls[1].value, '2018-03-23', 'set the value of a particular element given an index');

  inst.clearValue(0);
  t.equal(inst.inputEls[0].value, '', 'clears the value of one input');
  t.equal(inst.values[0], null, 'clears the stored value of one input');
  t.equal(inst.inputEls[1].value, '2018-03-23', 'does not touch the value of the unpassed index');

  inst.clearValues();
  t.equal(inst.inputEls[0].value, '', 'clears the value of both inputs');
  t.equal(inst.values[0], null, 'clears the stored value of both inputs');
  t.equal(inst.inputEls[1].value, '', 'clears the value of both inputs');
  t.equal(inst.values[1], null, 'clears the stored value of both inputs');

  t.end();
});

test('should disable and enable calendars', function(t) {

  var inst = new Calendar([inputEl.cloneNode(true), inputEl.cloneNode(true)]);

  inst.open();
  t.equal(inst.activeIndex, 0, 'opens when not disabled');

  inst.disable(0);
  t.equal(inst.activeIndex, null, 'closes when disabled');

  inst.open();
  t.equal(inst.activeIndex, null, 'does not open disabled');

  inst.open(1);
  t.equal(inst.activeIndex, 1, 'opens a non-disabled index');

  inst.disable();
  t.equal(inst.activeIndex, null, 'closes when all are disabled');
  inst.open(1);
  t.equal(inst.activeIndex, null, 'does not open when all are disabled');

  inst.enable();
  inst.open();
  t.equal(inst.activeIndex, 0, 'opens when not disabled');
  inst.open(1);
  t.equal(inst.activeIndex, 1, 'opens when not disabled');


  inst.els[0].querySelector('input').setAttribute('disabled', '');
  inst = new Calendar([inst.els[0], inst.els[1]]);

  inst.open();
  t.equal(inst.activeIndex, null, 'does not open disabled');

  t.end();
});

test('should update to use a new calendar component', function(t) {

  var el = inputEl.cloneNode(true);
  var inst = new Calendar(el);
  var newEl = inputEl.cloneNode(true);

  inst.open();

  inst.update(newEl);

  t.notEqual(inst.els[0], el, 'stores the new element');
  t.equal(inst.els[0], newEl, 'stores the new element');

  t.end();
});
