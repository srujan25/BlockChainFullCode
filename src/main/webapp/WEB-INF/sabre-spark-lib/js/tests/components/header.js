var test = require('tape');
var Header = require('../../src/components/header');

var headerMarkup = '<button class="spark-header__toggle"></button><nav class="spark-header__nav"><div class="spark-header__menu"><ul class="spark-header__list"></ul></div></nav>';
var headerMarkupHasList = '<button class="spark-header__toggle"></button><nav class="spark-header__nav"><div class="spark-header__menu"><ul class="spark-header__list"><li class="spark-header__list-item"></li><li class="spark-header__list-item"></li><li class="spark-header__list-item"></li><li class="spark-header__list-item"></li><li class="spark-header__list-item"></li></ul></div></nav>';

test('should create header component with or without nav, menu, list and toggle', function(t) {

  var el = document.createElement('div');
  new Header(el);

  var el2 = document.createElement('div');
  el2.innerHTML = headerMarkup;
  new Header(el2);

  var el3 = document.createElement('div');
  el3.innerHTML = headerMarkupHasList;
  new Header(el3);

  t.end();
});

// @todo: make this more robust. right now it's just checking to make sure no errors are thrown.
test('should handle resize events', function(t) {

  var el = document.createElement('div');
  el.innerHTML = headerMarkupHasList;

  var inst = new Header(el);
  inst._onResize();

  t.end();
});

// @todo: make this more robust. right now it's just checking to make sure no errors are thrown.
test('should handle more button click events', function(t) {

  var el = document.createElement('div');
  el.innerHTML = headerMarkupHasList;

  var inst = new Header(el);

  // A noop because we're collapsed
  inst._onMoreClick();

  // Force a non-collapsed state
  inst.isCollapsed = false;

  inst._onMoreClick({
    target: inst.listMoreListEl.children[0]
  });

  t.end();
});

test('should handle passed or parsed params', function(t) {

  var el = document.createElement('div');
  el.innerHTML = headerMarkupHasList;

  var inst = new Header(el, {
    fixed: true,
    fixedDistance: 100
  });

  t.equal(inst.fixed, true);
  t.equal(inst.fixedDistance, 100);

  el.className += ' spark-header--fixed';
  el.setAttribute('data-fixed-distance', 200);
  inst = new Header(el);

  t.equal(inst.fixed, true);
  t.equal(inst.fixedDistance, 200);

  t.end();
});

test('should handle a click on a toggle button', function(t) {

  var el = document.createElement('div');
  el.innerHTML = headerMarkupHasList;

  var inst = new Header(el);

  t.equal(inst.isActive, false, 'defaults to not "active"');
  inst._onToggleClick({
    preventDefault: function() {},
    stopPropagation: function() {}
  });
  t.equal(inst.isActive, true, 'makes the nav active');

  t.end();
});

test('should handle a click on the nav when collapsed', function(t) {

  var el = document.createElement('div');
  el.innerHTML = headerMarkupHasList;

  var inst = new Header(el);

  inst.navEl.className = 'active';

  inst._onNavClick({
    target: inst.navEl
  });

  t.equal(inst.navEl.className.indexOf('active'), -1, 'nav is not active');

  t.end();
});

test('should update its cached elements', function(t) {

  var el = document.createElement('div');
  el.innerHTML = headerMarkupHasList;
  var newEl = el.cloneNode(true);

  var inst = new Header(el);

  var originalPlaceholder = inst.placeholder;
  var originalListEls = inst.listEls;

  el.querySelector('.spark-header__list').innerHTML += '<li class="spark-header__list-item"></li>';

  inst.update();

  t.notEqual(originalPlaceholder, inst.placeholder, 'placeholder element has changed');
  t.notEqual(originalListEls.length, inst.listEls.length, 'length of list elements has changed');

  inst.update(newEl);
  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});

test('should fix the element when the scroll is past the fixedDistance variable', function(t) {

  var el = document.createElement('div');
  el.innerHTML = headerMarkupHasList;
  el.className += ' spark-header--fixed';

  var inst = new Header(el);

  window.scrollTo(0, 0);
  inst.checkFixed();

  t.equal(inst.navEl.className.indexOf('spark-header--condensed'), -1, 'header has not condensed');
  t.equal(document.body.className.indexOf('spark-header-condensed'), -1, 'header has not condensed');

  window.scrollTo(20, 0);
  inst.checkFixed();

  // @todo fix this test because setting pageYOffset doesn't work properly
  // t.notEqual(inst.navEl.className.indexOf('spark-header--condensed'), -1 ,'header has condensed');
  // t.notEqual(document.body.className.indexOf('spark-header-condensed'), -1 ,'header has condensed');

  t.end();
});
