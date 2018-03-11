var test = require('tape');
var Tabs = require('../../src/components/tabs');
var noop = function() {};

var markup = '<div class="spark-tabs"><nav class="spark-tabs__nav" role="menubar"><div class="spark-tabs__scroll"><ul class="spark-tabs__list" role="tablist"><li class="spark-tabs__tab" role="tab"><a href="#">This Title Really Long And Needs To Be Truncated</a></li><li class="spark-tabs__tab" role="tab"><i class="spark-icon-airplane"></i><a href="#">Also long and has an icon.</a></li><li class="spark-tabs__tab" role="tab"><a href="#">Normal</a></li><li class="spark-tabs__tab" role="tab"><a href="#">Normal 4</a></li></ul></div><div class="spark-tabs__btns"><button class="spark-tabs__btn spark-icon-arrow-chevron-left spark-tabs__btn--left"></button><button class="spark-tabs__btn spark-icon-arrow-chevron-right spark-tabs__btn--right"></button></div></nav><div class="spark-tabs__panels"><div role="tabpanel" class="spark-tabs__panel">Tab 1 content</div><div role="tabpanel" class="spark-tabs__panel">Tab 2 content</div><div role="tabpanel" class="spark-tabs__panel">Tab 3 content</div><div role="tabpanel" class="spark-tabs__panel" id="panel4">Tab 4 content</div></div></div>';

test('should create tabs component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  new Tabs(el);
  t.end();
});

test('should throw an error when there are no tabs passed', function(t) {

  var el = document.createElement('div');

  t.throws(function() {
    new Tabs(el);
  }, 'pitches a fit');

  t.end();
});

test('should set the active tab', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  t.equal(inst.activeTabEl, el.querySelector('.spark-tabs__tab'), 'defaults to the first tab as active');

  inst.setActive('panel4');
  t.equal(inst.activeTabEl, el.querySelectorAll('.spark-tabs__tab').item(3), 'sets a tab active by the name of the panel');
  inst.setActive('badpanelname');
  t.equal(inst.activeTabEl, el.querySelectorAll('.spark-tabs__tab').item(3), 'does not set a tab to be active w/ a non-existent panel name');

  inst.setActive(2);
  t.equal(inst.activeTabEl, el.querySelectorAll('.spark-tabs__tab').item(2), 'sets a tab active w/ an index');

  t.end();
});

test('should start, move and stop dragging the tab list', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  t.notOk(inst.isDragging, 'isDragging defaults to false');
  inst.start({});
  t.ok(inst.isDragging, 'isDragging is true after start');

  inst.move({
    x: 10
  });
  t.equal(inst.scrollDistance, 10, 'sets the scroll distance');

  inst.stop({});
  t.notOk(inst.isDragging, 'isDragging is false after stop');

  t.end();
});

test('should bring a tab into focus', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  inst.x = 10;
  inst.focus(el.querySelectorAll('.spark-tabs__tab').item(2));
  t.equal(inst.x, 0, 'focus changes the x value of the tab list'); // @todo: this should test for a real number

  t.end();
});

test('should make a tab active on click', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  t.equal(inst.activeTabEl, el.querySelector('.spark-tabs__tab'), 'defaults to the first tab as active');
  inst._onTabListClick({
    target: el.querySelectorAll('.spark-tabs__tab').item(2),
    preventDefault: noop,
    stopPropagation: noop
  });
  t.equal(inst.activeTabEl, el.querySelectorAll('.spark-tabs__tab').item(2), 'sets active on click');

  inst.scrollDistance = 10;
  inst._onTabListClick({
    target: el.querySelectorAll('.spark-tabs__tab').item(0),
    preventDefault: noop,
    stopPropagation: noop
  });
  t.notEqual(inst.activeTabEl, el.querySelectorAll('.spark-tabs__tab').item(0), 'does not set a tab to be active if the scrollDistance is too high');

  var bogusEl = document.createElement('div');
  inst._onTabListClick({
    target: bogusEl,
    preventDefault: noop,
    stopPropagation: noop
  });
  t.notEqual(inst.activeTabEl, bogusEl, 'does not set a tab to be active if it is not found');

  t.end();
});

test('should refocus the active tab on resize', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);
  inst._onResize();
  // @todo: compare the x value before and after the resize or something

  t.end();
});

test('should handle touchstart, touchmove and touchend events to move the tab list', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  inst._onTouchStart();
  t.notOk(inst.isDragging, 'touchstart has no effect if the tabs are not scrollable');

  inst.isScrollable = true;
  inst._onTouchStart({
    touches: [{
      clientX: 100,
      clientY: 90
    }]
  });
  t.ok(inst.isDragging, 'touchstart begins moving');

  inst._onTouchMove({
    preventDefault: noop,
    stopPropagation: noop,
    touches: [{
      clientX: 120,
      clientY: 93
    }]
  });
  // @todo: test the move

  inst._onTouchEnd();
  setTimeout(function() {
    t.notOk(inst.isDragging, 'touchend stops moving');
    t.end();
  }, 1);
});

test('should handle mousedown, touchmove and touchend events to move the tab list', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  inst._onMouseDown();
  t.notOk(inst.isDragging, 'mousedown has no effect if the tabs are not scrollable');

  inst.isScrollable = true;
  inst._onMouseDown({
    clientX: 100,
    clientY: 90
  });
  t.ok(inst.isDragging, 'mousedown begins moving');

  inst._onMouseMove({
    preventDefault: noop,
    stopPropagation: noop,
    clientX: 120,
    clientY: 93
  });
  // @todo: test the move

  inst._onMouseUp();
  setTimeout(function() {
    t.notOk(inst.isDragging, 'touchend stops moving');
    t.end();
  }, 1);
});

test('should handle scroll events to move the tab list', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  inst._onScroll();
  t.notOk(inst.x, 'scroll has no effect if the tabs are not scrollable');

  inst.isScrollable = true;
  inst._onScroll({
    wheelDeltaX: 100,
    preventDefault: noop,
    stopPropagation: noop
  });
  t.equal(inst.x, 0, 'scroll begins moving'); // @todo: test the move

  setTimeout(function() {
    t.notOk(inst.isDragging, 'scrollend stops moving'); // @todo: test the stop
    t.end();
  }, 101);
});

test('should handle a click on the left or right button', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);
  inst._onLeftClick();
  inst._onRightClick();
  // @todo: test for these changes somehow

  t.end();
});

test('should update its cached elements', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Tabs(el);

  var originalTabEls = inst.tabEls;

  el.querySelector('.spark-tabs__list').innerHTML += '<li class="spark-tabs__tab"></li>';

  inst.update();

  t.notEqual(originalTabEls.length, inst.tabEls.length, 'length of list elements has changed');

  t.end();
});

test('should update to use a new tabs component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new Tabs(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
