var test = require('tape');
var tween = require('../../../src/helpers/animation/tween');

test('should tween a parameter from one value to another', function(t) {

  var obj = {
    val: 0
  };

  tween({
    target: obj,
    prop: 'val',
    start: 0,
    end: 100,
    duration: 10,
    callback: function() {

      t.equal(obj.val, 100, 'tweens a value');

      tween({
        target: obj,
        prop: 'val',
        start: [50, 100, 600],
        end: [0, -150, 800],
        duration: 10,
        callback: function() {
          t.equal(obj.val[0], 0, 'tweens a value');
          t.equal(obj.val[1], -150, 'tweens a value');
          t.equal(obj.val[2], 800, 'tweens a value');
          t.end();
        }
      });
    }
  });
});
