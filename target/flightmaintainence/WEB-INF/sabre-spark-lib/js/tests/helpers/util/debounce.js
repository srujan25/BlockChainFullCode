var test = require('tape');
var debounce = require('../../../src/helpers/util/debounce');

test('should debounce a function call', function(t) {

  var func = function() {
    t.end();
  };

  var debounced = debounce(func, 10);

  debounced();
  debounced();
  debounced();
  debounced();
});
