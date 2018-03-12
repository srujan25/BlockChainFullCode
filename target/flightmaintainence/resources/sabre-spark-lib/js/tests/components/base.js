var test = require('tape');
var Base = require('../../src/components/base');
var el = document.createElement('div');

test('should set only whitelisted params unless forced to', function(t) {

  var inst = new Base();

  inst._whitelistedParams = ['a', 'b', 'd'];

  inst.setParams({
    a: true,
    b: true,
    c: true
  });

  t.equal(inst.a, true, 'sets a parameter to true');
  t.equal(inst.b, true, 'sets b parameter to true');
  t.equal(inst.c, undefined, 'does not set c to true');

  inst.setParams({
    d: true
  }, true);

  t.equal(inst.d, true, 'sets d parameter to true when forced');

  t.end();
});

test('should unset params from an object', function(t) {

  var inst = new Base();

  inst.testKey = 42;

  inst.unsetParams(['testKey']);
  t.notOk(inst.testKey, 'key is deleted when passed as an array');

  inst.anotherTest = 'string';
  inst.test3 = 24;
  inst.unsetParams({
    'anotherTest': null,
    'test3': null
  });
  t.notOk(inst.anotherTest && inst.test3, 'keys are deleted when an object is passed');

  var obj = {
    a: 1,
    b: true,
    c: 'name',
    d: {}
  };
  inst.unsetParams(['a', 'b', 'c'], obj);
  t.notOk(obj.a && obj.b && obj.c, 'keys are deleted from a passed scope object');
  t.ok(obj.d, 'key remains untouched if not passed');

  t.end();
});

test('should clean itself up on remove', function(t) {

  var inst = new Base(el);
  inst._removeEventListeners = function() {};
  inst.el = el;
  inst._unsetParams = inst.unsetParams;
  inst.defaults = {
    el: null
  };

  t.equal(inst.el, el, 'element is the passed element');
  inst.remove();
  t.notOk(inst.el, 'element is unset');

  t.end();
});
