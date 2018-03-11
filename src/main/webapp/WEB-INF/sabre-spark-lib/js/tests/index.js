/*
// Allow tests to define global vars and have them exposed to
// components on the window global.
global.window = global;*/

// PhantomJS doesn't support bind yet
Function.prototype.bind = Function.prototype.bind || function(thisp) {
  var fn = this;
  return function() {
    return fn.apply(thisp, arguments);
  };
};

if (typeof Object.create !== 'function') {
  Object.create = (function() {
    var Temp = function() {};
    return function(prototype) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (prototype !== Object(prototype) && prototype !== null) {
        throw new TypeError('Argument must be an object or null');
      }
      if (prototype === null) {
        throw new Error('null [[Prototype]] not supported');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}

require('./components');
require('./helpers');
require('./mixins');
