var test = require('tape');
var Affix = require('../../../src/helpers/position/affix');

test('should create a new affixed element pair', function(t) {

  var el = document.createElement('div');
  var el2 = document.createElement('div');
  var caretEl = document.createElement('span');

  var inst = new Affix({
    el: el,
    targetEl: el2,
    caretEl: caretEl,
    anchorY: 'middle',
    anchorX: 'left'
  });

  t.equal(inst.el, el, 'el param set');
  t.equal(inst.targetEl, el2, 'targetEl param set');
  t.equal(inst.caretEl, caretEl, 'caretEl param set');
  t.equal(inst.anchorY, 'middle', 'anchorY param set');
  t.equal(inst.anchorX, 'left', 'anchorX param set');

  t.end();
});

// @todo: there are like 50 variants for positioning here. we should probably
// have even more tests than this, but that's going to take a long time.
test('should calculate the position of on affixed element relative to another', function(t) {

  var el = document.createElement('div');
  var el2 = document.createElement('div');
  var caretEl = document.createElement('span');

  var inst = new Affix({
    el: el,
    targetEl: el2,
    caretEl: caretEl
  });

  var config = {
    anchorX: 'center',
    anchorY: 'top',
    targetTop: 150,
    targetLeft: 300,
    elHeight: 40,
    elWidth: 200,
    targetHeight: 20,
    targetWidth: 30,
    minX: 0,
    minY: 20,
    maxX: 800 - 200,
    maxY: 900 - 40
  };

  var pos = inst._calculatePosition(config);

  t.equal(pos.elLeft, 215, 'centers on the target');
  t.equal(pos.elTop, 110, 'is placed above the target');

  config.targetTop = 0;
  config.targetLeft = 0;
  pos = inst._calculatePosition(config);

  t.equal(pos.elLeft, 0, 'aligns to the elLeft when out of room');
  t.equal(pos.elTop, 20, 'aligns to the bottom when out of room');

  config.targetTop = 100;
  config.targetLeft = 370;
  config.maxX = 400;
  config.maxY = 100;
  pos = inst._calculatePosition(config);

  t.equal(pos.elLeft, 200, 'aligns to the right when out of room');
  t.equal(pos.elTop, 120, 'stays aligned to the bottom even when out of room');

  t.end();
});
