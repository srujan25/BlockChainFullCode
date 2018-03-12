var test = require('tape');
var Slider = require('../../src/components/slider');
var noop = function() {};

var markup = '<input type="number" min="-20" max="30" value="10"><div class="spark-slider__controls">  <button class="spark-slider__handle"></button>    <span class="spark-slider__track"><span class="spark-slider__track-fill"></span></span></div>';
var markupNoInput = '<div class="spark-slider__controls">    <button class="spark-slider__handle"></button>  <span class="spark-slider__track"><span class="spark-slider__track-fill"></span></span></div>';
var markupNoHandle = '<input type="number" min="-20" max="30" value="10"><div class="spark-slider__controls">  <span class="spark-slider__track"><span class="spark-slider__track-fill"></span></span></div>';
var markupNoValue = '<input type="number" min="-20" max="30"><div class="spark-slider__controls">  <button class="spark-slider__handle"></button> <span class="spark-slider__track"><span class="spark-slider__track-fill"></span></span></div>';
var markupStepped = '<input type="number" min="-20" max="30" step="5" value="10"><div class="spark-slider__controls"> <button class="spark-slider__handle"></button>  <span class="spark-slider__track"><span class="spark-slider__track-fill"></span></span></div>';

test('should create a new instance with the proper elements', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  new Slider(el);
  t.end();
});

test('should fail to create a new instance without an `<input>` element and a `.spark-slider__handle` element', function(t) {

  var noEl = document.createElement('div');
  noEl.innerHTML = markupNoInput;
  t.throws(function() {
    new Slider(noEl);
  }, 'catches when there is no input');

  noEl.innerHTML = markupNoHandle;
  t.throws(function() {
    new Slider(noEl);
  }, 'catches when there is no handle');

  t.end();
});

test('should handle setting a default value', function(t) {

  var valsEl = document.createElement('div');
  valsEl.innerHTML = markup;
  var valsSlider = new Slider(valsEl);
  t.equal(valsSlider.value, 10, 'has the correct value (10) of the input');

  var noValsEl = document.createElement('div');
  noValsEl.innerHTML = markupNoValue;
  var noValsSlider = new Slider(noValsEl);
  t.equal(noValsSlider.value, -20, 'has the correct default value (-20) for the input');

  t.end();
});

test('should have cached size values', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  el.querySelector('.spark-slider__track').style.width = '100px';
  el.height = '10px';
  var slider = new Slider(el);

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
  el.innerHTML = markup;
  var slider = new Slider(el);

  slider.start(10);
  t.ok(slider.isActive, 'sets the active state');

  slider.stop();
  t.notOk(slider.isActive, 'unsets the active state');

  el.querySelector('input').setAttribute('disabled', true);
  slider.start('touch');
  t.notOk(slider.isActive, 'does not set a disabled state to be active');

  t.end();
});

test('should set the proper state when move is called', function(t) {

  // @todo: this is hard to test because we have no actual element dimensions
  /*var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);
  slider.width = 100;
  slider.height = 100;

  slider.start( 10);

  slider.move(null);
  t.equal(slider.value, 10);

  slider.move(20);
  t.equal(slider.value, 20);*/

  t.end();
});

test('should set the value directly', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  t.equal(slider.value, 10, 'default first value is 10');
  slider.setValue(3);
  t.equal(slider.value, 3, 'value is 3 after set');
  slider.setValue(-35);
  t.equal(slider.value, -20, 'value is -20 after setting -35 because we can\'t go lower than min');

  t.end();
});

test('should set the value directly w/ steps', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupStepped;
  var slider = new Slider(el);

  t.equal(slider.value, 10, 'default first value is 10');
  slider.setValue(3);
  t.equal(slider.value, 0, 'value is 0 after 3 is set because of steps');
  slider.setValue(6);
  t.equal(slider.value, 5, 'value is 5 after 6 is set because of steps');

  t.end();
});

test('should increment and decrement the input', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  t.equal(slider.value, 10, 'default first value is 10');
  slider.increment();
  t.equal(slider.value, 11, 'value is incremented by 1 to 11');
  slider.setValue(-10);
  slider.increment(true);
  t.equal(slider.value, 0, 'value is incremented by 10 to 0');

  slider.decrement();
  t.equal(slider.value, -1, 'value is decremented by 1 to -1');
  slider.decrement(true);
  t.equal(slider.value, -11, 'value is decremented by 10 to -11');

  t.end();
});

test('should start on touchstart, move on touchmove and end on touchend', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  t.notOk(slider.isActive, 'not active by default');
  slider._onTouchStart({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop,
    touches: [{
      pageX: 100,
      pageY: 10
    }]
  });
  t.ok(slider.isActive, 'is active after start');

  slider._onTouchMove({
    stopPropagation: noop,
    preventDefault: noop,
    touches: [{
      pageX: 120,
      pageY: 12
    }]
  });
  // t.equal(slider.value, NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  slider._onTouchEnd({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop
  });
  t.notOk(slider.isActive, 'is inactive after end');

  t.end();
});

test('should start on mousedown, move on mousemove and end on mouseup', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  t.notOk(slider.isActive, 'not active by default');
  slider._onMouseDown({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop,
    pageX: 100,
    pageY: 10
  });
  t.ok(slider.isActive, 'is active after mousedown');

  slider._onMouseMove({
    stopPropagation: noop,
    preventDefault: noop,
    pageX: 120,
    pageY: 12
  });
  // t.equal(slider.value, NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  slider._onMouseUp({
    target: el.querySelector('.spark-slider__handle'),
    stopPropagation: noop,
    preventDefault: noop
  });
  t.notOk(slider.isActive, 'is inactive after mouseup');

  t.end();
});

test('should start on focus, increment on keydown and end on blur', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  t.notOk(slider.isActive, 'not active by default');
  slider._onFocus({
    target: el.querySelector('.spark-slider__handle')
  });
  t.ok(slider.isActive, 'first index is active after focus');

  slider._onKeydown({
    target: el.querySelector('.spark-slider__handle'),
    keyCode: 39,
    shiftKey: true
  });
  // t.equal(slider.values, NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution
  slider._onKeydown({
    target: el.querySelector('.spark-slider__handle'),
    keyCode: 37
  });
  // t.equal(slider.values, NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  slider._onBlur({
    target: el.querySelector('.spark-slider__handle')
  });
  t.notOk(slider.isActive, 'first index is inactive after blur');

  t.end();
});

test('should update a value on input', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  var input = el.querySelector('input');
  input.value = -3;

  slider._onChange({
    target: input
  });

  // t.equal(slider.value, NaN, 'slider value is NaN'); // @todo update this after we come up with a move solution

  t.end();
});

test('should config a custom onChange callback', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var testData = 0;
  var slider = new Slider(el, {
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
  el.innerHTML = markup;
  var slider = new Slider(el, {
    onWillChange: function(val) {
      if (val > 10) return 10;
      else if (val < -10) return -10;
    }
  });

  slider.setValue(1);
  t.equal(slider.value, 1, 'slider value is set properly');

  slider.setValue(11);
  t.equal(slider.value, 10, 'setting slider value is constrained');

  slider.setValue(-11);
  t.equal(slider.value, -10, 'setting a slider value is constrained');

  t.end();
});

test('should get the value of the slider', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  slider.setValue(5);
  t.equal(slider.getValue(), 5, 'gets the slider value');

  t.end();
});

test('should clear the value of the slider', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  slider.setValue(5);
  slider.clearValue();
  t.equal(slider.getValue(), 0, 'clears the slider value');

  slider.setValue(15);
  slider.min = 10;
  slider.clearValue();
  t.equal(slider.getValue(), 10, 'clears the slider to the min value');

  t.end();
});

test('should disable and enable the slider', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var slider = new Slider(el);

  slider.disable();
  t.ok(slider.inputEl.disabled, 'input is disabled');
  t.ok(slider.handleEl.disabled, 'handle is disabled');

  slider.enable();
  t.notOk(slider.inputEl.disabled, 'input is enabled');
  t.notOk(slider.handleEl.disabled, 'handle is enabled');

  t.end();
});

test('should set and clear an error', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;

  var inst = new Slider(el);

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

  var inst = new Slider(el);

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

  var inst = new Slider(el);

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

  var inst = new Slider(el);

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

test('should update to use a new slider component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new Slider(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
