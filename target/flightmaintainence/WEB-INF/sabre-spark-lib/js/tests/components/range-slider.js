var test = require('tape');
var RangeSlider = require('../../src/components/range-slider');
var noop = function() {};

var rsMarkup = '<input type="number" min="-20" max="30" value="10"><span class="spark-range-slider__input-divider"></span><input type="number" min="-20" max="30" value="20"><div class="spark-slider__controls" data-role="controls">  <button class="spark-slider__handle" data-role="handle"></button>  <button class="spark-slider__handle" data-role="handle"></button>  <span class="spark-slider__track" data-role="track"><span class="spark-slider__track-fill" data-role="track-fill"></span></span></div>';
var rsMarkupOneInputs = '<input type="number" min="-20" max="30" value="20"><div class="spark-slider__controls" data-role="controls">  <button class="spark-slider__handle" data-role="handle"></button>  <button class="spark-slider__handle" data-role="handle"></button>  <span class="spark-slider__track" data-role="track"><span class="spark-slider__track-fill" data-role="track-fill"></span></span></div>';
var rsMarkupNoInputs = '<div class="spark-slider__controls" data-role="controls">  <button class="spark-slider__handle" data-role="handle"></button>  <button class="spark-slider__handle" data-role="handle"></button>  <span class="spark-slider__track" data-role="track"><span class="spark-slider__track-fill" data-role="track-fill"></span></span></div>';
var rsMarkupOneHandle = '<input type="number" min="-20" max="30" value="10"><span class="spark-range-slider__input-divider"></span><input type="number" min="-20" max="30" value="20"><div class="spark-slider__controls" data-role="controls">  <button class="spark-slider__handle" data-role="handle"></button>  <span class="spark-slider__track" data-role="track"><span class="spark-slider__track-fill" data-role="track-fill"></span></span></div>';
var rsMarkupNoHandle = '<input type="number" min="-20" max="30" value="10"><span class="spark-range-slider__input-divider"></span><input type="number" min="-20" max="30" value="20"><div class="spark-slider__controls" data-role="controls">  <span class="spark-slider__track" data-role="track"><span class="spark-slider__track-fill" data-role="track-fill"></span></span></div>';
var rsMarkupNoValues = '<input type="number" min="-20" max="30"><span class="spark-range-slider__input-divider"></span><input type="number" min="-20" max="30"><div class="spark-slider__controls" data-role="controls">  <button class="spark-slider__handle" data-role="handle"></button>  <button class="spark-slider__handle" data-role="handle"></button>  <span class="spark-slider__track" data-role="track"><span class="spark-slider__track-fill" data-role="track-fill"></span></span></div>';
var rsMarkupStepped = '<input type="number" min="-20" max="30" step="5" value="10"><span class="spark-range-slider__input-divider"></span><input type="number" min="-20" max="30" step="5" value="20"><div class="spark-slider__controls" data-role="controls">  <button class="spark-slider__handle" data-role="handle"></button>  <button class="spark-slider__handle" data-role="handle"></button>  <span class="spark-slider__track" data-role="track"><span class="spark-slider__track-fill" data-role="track-fill"></span></span></div>';

test('should create a new instance with the proper elements', function(t) {
  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  new RangeSlider(el);
  t.end();
});

test('should fail to create a new instance without two `<input>` elements and two `.spark-slider__handle` elements', function(t) {

  var oneEl = document.createElement('div');
  oneEl.innerHTML = rsMarkupOneInputs;
  t.throws(function() {
    new RangeSlider(oneEl);
  }, 'catches when there is only one input');

  var noEl = document.createElement('div');
  noEl.innerHTML = rsMarkupNoInputs;
  t.throws(function() {
    new RangeSlider(noEl);
  }, 'catches when there is no input');

  oneEl.innerHTML = rsMarkupOneHandle;
  t.throws(function() {
    new RangeSlider(oneEl);
  }, 'catches when there is only one handle');

  noEl.innerHTML = rsMarkupNoHandle;
  t.throws(function() {
    new RangeSlider(noEl);
  }, 'catches when there is no handle');

  t.end();
});

test('should handle setting default values', function(t) {

  var valsEl = document.createElement('div');
  valsEl.innerHTML = rsMarkup;
  var valsSlider = new RangeSlider(valsEl);
  t.equal(valsSlider.values[0], 10, 'has the correct value (10) of the first input');
  t.equal(valsSlider.values[1], 20, 'has the correct value (20) of the second input');

  var noValsEl = document.createElement('div');
  noValsEl.innerHTML = rsMarkupNoValues;
  var noValsSlider = new RangeSlider(noValsEl);
  t.equal(noValsSlider.values[0], -20, 'has the correct default value (-20) for the first input');
  t.equal(noValsSlider.values[1], 30, 'has the correct default value (30) for the second input');

  t.end();
});

test('should have cached size values', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  el.querySelector('[data-role="track"]').style.width = '100px';
  el.height = '10px';
  var slider = new RangeSlider(el);

  t.not(slider.width, null, 'caches the width');
  t.not(slider.height, null, 'caches the height');
  t.not(slider.handleSize, null, 'caches the handleSize');
  t.not(slider.handleSizePercentage, null, 'caches the handleSizePercentage');
  t.not(slider.offsetLeft, null, 'caches the offsetLeft');
  t.not(slider.offsetTop, null, 'caches the offsetTop');

  t.end();
});

test('should set the proper state when start and stop are called', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  slider.start(0, 10);
  t.ok(slider.isActive[0], 'sets the active index');
  t.equal(slider.currentIndex, 0, 'sets the currently touched index');

  slider.start(-1, 10);
  t.notOk(slider.isActive[-1], 'does not set an invalid index to be active');

  slider.stop(0);
  t.notOk(slider.isActive[0], 'unsets the active index');
  t.equal(slider.currentIndex, null, 'unsets the currently touched index');

  el.querySelector('input').setAttribute('disabled', true);
  slider.start(0, 'touch');
  t.notOk(slider.isActive[0], 'does not set a disabled index to be active');

  t.end();
});

test('should set the proper state when move is called', function(t) {

  // @todo: this is hard to test because we have no actual element dimensions
  /*var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);
  slider.width = 100;
  slider.height = 100;

  slider.start(0, 10);

  slider.move(null);
  t.equal(slider.values[0], 10);

  slider.move(20);
  t.equal(slider.values[0], 20);*/

  t.end();
});

test('should set the value directly', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  t.equal(slider.values[0], 10, 'default first value is 10');
  slider.setValue(0, 3);
  t.equal(slider.values[0], 3, 'value is 3 after set');
  slider.setValue(1, 5);
  slider.setValue(0, 5);
  t.equal(slider.values[0], 4, 'value is 4 after setting 5 because we can\'t go past the next handle');
  slider.setValue(1, 3);
  t.equal(slider.values[1], 5, 'value is 5 after setting 3 because we can\'t go past the previous handle');
  slider.setValue(1, 35);
  t.equal(slider.values[1], 30, 'value is 30 after setting 35 because we can\'t go higher than max');
  slider.setValue(0, -35);
  t.equal(slider.values[0], -20, 'value is -20 after setting -35 because we can\'t go lower than min');

  t.throws(function() {
    slider.setValue(5, 10);
  }, 'catches error when setting value on non-existent input');

  t.end();
});

test('should set the value directly w/ steps', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkupStepped;
  var slider = new RangeSlider(el);

  t.equal(slider.values[0], 10, 'default first value is 10');
  slider.setValue(0, 3);
  t.equal(slider.values[0], 0, 'value is 0 after 3 is set because of steps');
  slider.setValue(0, 6);
  t.equal(slider.values[0], 5, 'value is 5 after 6 is set because of steps');

  t.end();
});

test('should increment and decrement the input', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  t.equal(slider.values[0], 10, 'default first value is 10');
  slider.currentIndex = 0;
  slider.increment();
  t.equal(slider.values[0], 11, 'value is incremented by 1 to 11');
  slider.setValue(0, -10);
  slider.increment(true);
  t.equal(slider.values[0], 0, 'value is incremented by 10 to 0');

  slider.decrement();
  t.equal(slider.values[0], -1, 'value is decremented by 1 to -1');
  slider.decrement(true);
  t.equal(slider.values[0], -11, 'value is decremented by 10 to -11');

  t.end();
});

test('should start on touchstart, move on touchmove and end on touchend', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  t.notOk(slider.isActive, 'nothing is active by default');
  slider._onTouchStart({
    target: el.querySelector('.spark-slider__handle'),
    touches: [{
      pageX: 100,
      pageY: 10
    }]
  });
  t.ok(slider.isActive[0], 'first index is active after start');

  slider._onTouchMove({
    stopPropagation: noop,
    preventDefault: noop,
    touches: [{
      pageX: 120,
      pageY: 12
    }]
  });
  // t.equal(slider.values[0], NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  slider._onTouchEnd({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop
  });
  t.notOk(slider.isActive[0], 'first index is inactive after end');

  t.end();
});

test('should start on mousedown, move on mousemove and end on mouseup', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  t.notOk(slider.isActive, 'nothing is active by default');
  slider._onMouseDown({
    target: el.querySelector('.spark-slider__handle'),
    pageX: 100,
    pageY: 10
  });
  t.ok(slider.isActive[0], 'first index is active after mousedown');

  slider._onMouseMove({
    stopPropagation: noop,
    preventDefault: noop,
    pageX: 120,
    pageY: 12
  });
  // t.equal(slider.values[0], NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  slider._onMouseUp({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop
  });
  t.notOk(slider.isActive[0], 'first index is inactive after mouseup');

  t.end();
});

test('should start on focus, increment on keydown and end on blur', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  t.notOk(slider.isActive, 'nothing is active by default');
  slider._onFocus({
    target: el.querySelector('.spark-slider__handle')
  });
  t.ok(slider.isActive[0], 'first index is active after focus');

  slider._onKeydown({
    target: el.querySelector('.spark-slider__handle'),
    keyCode: 39,
    shiftKey: true
  });
  // t.equal(slider.values[0], NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution
  slider._onKeydown({
    target: el.querySelector('.spark-slider__handle'),
    keyCode: 37
  });
  // t.equal(slider.values[0], NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  slider._onBlur({
    target: el.querySelector('.spark-slider__handle')
  });
  t.notOk(slider.isActive[0], 'first index is inactive after blur');

  t.end();
});

test('should update a value on input', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  var input = el.querySelector('input');
  input.value = -3;

  slider._onChange({
    target: input
  });

  // t.equal(slider.values[0], NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  t.end();
});

test('should config a custom onChange callback', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var testData = 0;
  var slider = new RangeSlider(el, {
    onChange: function() {
      testData = 100;
    }
  });

  slider._onMouseDown({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop,
    pageX: 100,
    pageY: 10
  });

  slider._onMouseMove({
    stopPropagation: noop,
    preventDefault: noop,
    pageX: 120,
    pageY: 12
  });

  slider._onMouseUp({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop
  });

  t.equal(testData, 100, 'onChange callback trigger correctly');

  t.end();

});

test('should accept on onWillChange callback to potentially invalidate new values', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el, {
    onWillChange: function(i, val) {
      if (i === 0 && val > 10) return 10;
      else if (i === 1 && val > 19) return 19;
    }
  });

  slider.setValue(0, 1);
  t.equal(slider.values[0], 1, 'slider value is set properly');

  slider.setValue(0, 11);
  t.equal(slider.values[0], 10, 'setting slider value is constrained');

  slider.setValue(1, 11);
  t.equal(slider.values[1], 11, 'slider value is set properly');

  slider.setValue(1, 20);
  t.equal(slider.values[1], 19, 'setting a slider value is aborted');

  t.end();
});

test('should get the value of the range slider', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  slider.setValue(0, 5);
  t.equal(slider.getValue(0), 5, 'gets the range slider value');

  t.end();
});

test('should clear the value of the range slider', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  slider.setValue(0, 5);
  slider.clearValue(0);
  t.equal(slider.getValue(0), 0, 'clears the range slider value');

  slider.setValue(0, 15);
  slider.mins[0] = 10;
  slider.clearValue(0);
  t.equal(slider.getValue(0), 10, 'clears the range slider to the min value');

  t.end();
});

test('should disable and enable the range slider', function(t) {

  var el = document.createElement('div');
  el.innerHTML = rsMarkup;
  var slider = new RangeSlider(el);

  slider.disable(0);
  t.ok(slider.inputEls[0].disabled, 'input is disabled');
  t.ok(slider.handleEls[0].disabled, 'handle is disabled');
  t.notEqual(slider.handleEls[0].className.indexOf('disabled'), -1, 'handle has disabled class');

  slider.enable(0);
  t.notOk(slider.inputEls[0].disabled, 'input is enabled');
  t.notOk(slider.handleEls[0].disabled, 'handle is enabled');
  t.equal(slider.handleEls[0].className.indexOf('disabled'), -1, 'handle has disabled class');

  t.end();
});

test('should set and clear an error', function(t) {

  var el = document.createElement('label');
  el.innerHTML = rsMarkup;

  var inst = new RangeSlider(el);

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
  el.innerHTML = rsMarkup;

  var inst = new RangeSlider(el);

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
  el.innerHTML = rsMarkup;

  var inst = new RangeSlider(el);

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
  el.innerHTML = rsMarkup;

  var inst = new RangeSlider(el);

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

test('should update to use a new range slider component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = rsMarkup;
  var inst = new RangeSlider(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
