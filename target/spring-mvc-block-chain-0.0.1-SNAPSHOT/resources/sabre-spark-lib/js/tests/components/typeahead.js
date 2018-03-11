'use strict';

var test = require('tape');
var Typeahead = require('../../src/components/typeahead');

test('should create an instance of the typeahead', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<label class="spark-input"><input type="phone" class="spark-input__field" name="example1" placeholder="(555) 555-5555" data-typeahead data-typeahead-format="(\\d\\d\\d) \\d\\d\\d-\\d\\d\\d\\d" role="textbox"><span class="spark-input__placeholder"></span><span class="spark-label">What is your phone number?</span></label>';

  new Typeahead(el);

  t.end();
});

// @todo: write a bunch of other tests!

test('should call change when the input is updated', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<label class="spark-input"><input type="phone" class="spark-input__field" name="example1" placeholder="(555) 555-5555" data-typeahead data-typeahead-format="(\\d\\d\\d) \\d\\d\\d-\\d\\d\\d\\d" role="textbox"><span class="spark-input__placeholder"></span><span class="spark-label">What is your phone number?</span></label>';

  document.body.appendChild(el);

  var inst = new Typeahead(el);

  el.addEventListener('change', function(e) {
    t.equal(el.querySelector('input'), e.target, 'change event target and input element match');
    document.body.removeChild(el);
    t.end();
  });

  inst.setValue('3');
  inst._onBlur();
});

test('should call input when the input is updated', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<label class="spark-input"><input type="phone" class="spark-input__field" name="example1" placeholder="(555) 555-5555" data-typeahead data-typeahead-format="(\\d\\d\\d) \\d\\d\\d-\\d\\d\\d\\d" role="textbox"><span class="spark-input__placeholder"></span><span class="spark-label">What is your phone number?</span></label>';

  document.body.appendChild(el);

  var inst = new Typeahead(el);

  el.addEventListener('input', function(e) {
    t.equal(el.querySelector('input'), e.target, 'input event target and input element match');
    document.body.removeChild(el);
    t.end();
  });

  inst.setValue('3');
});

test('should clear the value', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<label class="spark-input"><input type="phone" class="spark-input__field" name="example1" placeholder="(555) 555-5555" data-typeahead data-typeahead-format="(\\d\\d\\d) \\d\\d\\d-\\d\\d\\d\\d" role="textbox" value="2487676835"><span class="spark-input__placeholder"></span><span class="spark-label">What is your phone number?</span></label>';

  var inst = new Typeahead(el);
  t.equal(inst.getValue(), '2487676835', 'has a value');

  inst.clearValue();
  t.equal(inst.getValue(), '', 'has no value');

  t.end();
});

test('should update the value', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<label class="spark-input"><input type="phone" class="spark-input__field" name="example1" placeholder="(555) 555-5555" data-typeahead data-typeahead-format="(\\d\\d\\d) \\d\\d\\d-\\d\\d\\d\\d" role="textbox" value=""><span class="spark-input__placeholder"></span><span class="spark-label">What is your phone number?</span></label>';

  var inst = new Typeahead(el);
  inst.inputEl.value = '2487676835';

  inst.updateValue();
  t.equal(inst.getValue(), '(248) 767-6835', 'has no value');

  t.end();
});

test('should enable and disable the input', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<label class="spark-input"><input type="phone" class="spark-input__field" name="example1" placeholder="(555) 555-5555" data-typeahead data-typeahead-format="(\\d\\d\\d) \\d\\d\\d-\\d\\d\\d\\d" role="textbox" value=""><span class="spark-input__placeholder"></span><span class="spark-label">What is your phone number?</span></label>';

  var inst = new Typeahead(el);

  inst.disable();
  t.ok(inst.inputEl.disabled, 'is disabled');

  inst.enable();
  t.notOk(inst.inputEl.disabled, 'is enabled');

  t.end();
});
