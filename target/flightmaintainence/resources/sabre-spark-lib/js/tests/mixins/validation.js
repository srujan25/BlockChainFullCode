var test = require('tape');
var Base = require('../../src/components/base');
var mixin = require('../../src/helpers/util/mixin');
var validation = require('../../src/mixins/validation');

var Component = function() {return Base.apply(this, arguments); };
Component.prototype = Object.create(Base.prototype);
Component.prototype._cacheElements = function(el) {
  this.el = el;
  this.messageEl = document.createElement('span');
};
Component.prototype.getValue = function() {
  return this.value;
};

mixin(Component.prototype, validation);

test('should validate an input', function(t) {

  var el = document.createElement('label');

  var shouldBeValid = false;

  var inst = new Component(el);

  inst.validatePattern = '([^@]{1,})(@)([^\.]{1,})(\.)([^\.]{1,})';
  inst.onValidate = function(valid, value) {
    t.equal(value, inst.value, 'value passed on onValidate matches the input value');
    t.equal(valid, shouldBeValid, 'is appropriately valid or invalid.');
  };

  inst.value = 'test@.com';
  inst.validate();
  inst.value = 'test@test.com';
  shouldBeValid = true;
  inst.validate();

  t.end();
});

test('should validate a non-empty input', function(t) {

  var el = document.createElement('label');

  var shouldBeValid = false;

  var inst = new Component(el);

  inst.validatePattern = '.+';
  inst.onValidate = function(valid, value) {
    t.equal(value, inst.value, 'value passed on onValidate matches the input value');
    t.equal(valid, shouldBeValid, 'is appropriately valid or invalid.');
  };

  inst.value = '';
  inst.validate();
  inst.value = 'xcvxcv';
  shouldBeValid = true;
  inst.validate();

  t.end();
});
