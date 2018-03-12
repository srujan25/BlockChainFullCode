var test = require('tape');
var ToggleSwitch = require('../../src/components/toggle-switch');
var ToggleSwitchMarkup = '<label class="spark-toggle-switch"><input class="spark-toggle__input" type="checkbox"><span class="spark-toggle-switch__handle"></span><span class="spark-toggle-switch__track"></span></label>';

test('should create ToggleSwitch component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  new ToggleSwitch(el);

  var el2 = document.createElement('div');
  new ToggleSwitch(el2);

  t.end();
});

test('should activate component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el);

  inst.activate();
  t.equal(inst.input.checked, true, 'inst checked property is true after activateToggle() is called');

  t.end();
});

test('should deactive component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el);

  inst.deactivate();
  t.equal(inst.input.checked, false, 'inst checked property is false after deactivateToggle() is called');

  t.end();
});

test('should toggle component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el);

  inst.deactivate();
  inst.toggle();
  t.equal(inst.input.checked, true, 'inst checked property is true after deactivateToggle() and then toggle() is called');

  inst.toggle();
  t.equal(inst.input.checked, false, 'inst checked property is false after toggle() is called again');

  t.end();
});

test('should get and set the toggle value', function(t) {

  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el);

  inst.setValue(true);
  t.ok(inst.getValue(), 'value is true');

  inst.setValue(false);
  t.notOk(inst.getValue(), 'value is false');

  t.end();
});

test('should clear the toggle value', function(t) {

  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el);

  inst.setValue(true);
  t.ok(inst.getValue(), 'value is true');

  inst.clearValue();
  t.notOk(inst.getValue(), 'value is false');

  t.end();
});

test('should disable and enable the toggle', function(t) {

  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el);

  inst.disable();
  t.ok(inst.input.disabled, 'input is disabled');

  inst.enable();
  t.notOk(inst.input.disabled, 'input is enabled');

  t.end();
});

test('should call the onChange callback for the toggle', function(t) {

  var el = document.createElement('div');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el, {
    onChange: function(val, i) {
      t.equal(val, true);
      t.equal(i, inst);
      t.end();
    }
  });

  inst.activate();
});

test('should update to use a new toggle switch component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = ToggleSwitchMarkup;
  var inst = new ToggleSwitch(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
