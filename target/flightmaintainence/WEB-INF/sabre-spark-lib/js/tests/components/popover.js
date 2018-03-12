var test = require('tape');
var Popover = require('../../src/components/popover');

var noop = function() {};
var popoverMarkup = '<button class="spark-popover__toggle"></button><div class="spark-popover__content--top">stuff<span class="spark-popover__caret"></span></div>';

test('should create popover component', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  new Popover(el);

  t.end();
});

test('should handle passed or parsed params', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;

  var inst = new Popover(el, {
    anchorX: 'left',
    anchorY: 'top'
  });

  t.equal(inst.anchorX, 'left');
  t.equal(inst.anchorY, 'top');

  inst.contentEl.setAttribute('data-anchor-x', 'right');
  inst.contentEl.setAttribute('data-anchor-y', 'bottom');

  inst = new Popover(el);

  t.equal(inst.anchorX, 'right');
  t.equal(inst.anchorY, 'bottom');

  t.end();
});

test('should open a popover', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var inst = new Popover(el);

  t.equal(inst.isActive, false, 'inactive by default');
  inst.open();
  t.equal(inst.isActive, true, 'active after open');

  t.end();
});

test('should close a popover', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var inst = new Popover(el);

  inst.open();
  t.equal(inst.isActive, true, 'active after open');
  inst.close();
  t.equal(inst.isActive, false, 'inactive after close');

  t.end();
});

test('should toggle the state of a popover', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var inst = new Popover(el);

  inst.toggle();
  t.equal(inst.isActive, true, 'active after toggle');
  inst.toggle();
  t.equal(inst.isActive, false, 'inactive after toggle');

  t.end();
});

test('should set the content of the popover', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var inst = new Popover(el);

  var content = document.createElement('div');
  content.innerHTML = '<div>first</div><div>second</div><div>third></div>';

  inst.setContent(content);
  t.equal(inst.contentEl.children.length, 1, 'sets a single element');
  t.equal(inst.contentEl.children[0], content, 'sets a single element');

  inst.setContent(content.cloneNode(true).querySelectorAll('div'));
  t.equal(inst.contentEl.children.length, 3, 'sets a NodeList of elements');
  t.equal(inst.contentEl.children[2].innerHTML, content.children[2].innerHTML, 'sets a NodeList of elements');

  inst.setContent([content.querySelectorAll('div')[1].cloneNode(true), content.querySelectorAll('div')[2].cloneNode(true)]);
  t.equal(inst.contentEl.children.length, 2, 'sets an Array of elements');
  t.equal(inst.contentEl.children[1].innerHTML, content.children[2].innerHTML, 'sets an Array of elements');

  t.end();
});

test('should open when the toggle element is clicked', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var inst = new Popover(el);

  t.equal(inst.isActive, false, 'inactive by default');
  inst._onClick({
    target: inst.toggleEl,
    preventDefault: noop
  });
  t.equal(inst.isActive, true, 'active after toggle click');
  inst.close();

  inst._onClick({
    target: inst.el,
    preventDefault: noop
  });
  t.equal(inst.isActive, false, 'still inactive after non-toggle click');

  t.end();
});

test('should handle clicks on the content', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var listLink = document.createElement('a');
  listLink.className = 'spark-popover__list-link';

  var inst = new Popover(el);

  inst.open();

  inst._onContentClick({
    target: listLink,
    preventDefault: noop,
    stopPropagation: noop
  });

  t.equal(inst.isActive, false, 'inactive after content link clicked');

  inst.open();

  inst._onContentClick({
    target: inst.contentEl,
    preventDefault: noop,
    stopPropagation: noop
  });

  t.equal(inst.isActive, true, 'still active after content clicked');

  t.end();
});

test('should handle clicks on the window', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var inst = new Popover(el);

  inst.open();

  inst._onWindowClick({
    target: document.createElement('div')
  });

  t.equal(inst.isActive, false, 'inactive after window clicked');

  t.end();
});

test('should take an onOpen or onClose callback', function(t) {

  var opened = false;
  var closed = false;
  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;

  var inst = new Popover(el, {
    onOpen: function() {
      opened = true;
      t.ok(opened, 'popover open callback has run');
    },
    onClose: function() {
      closed = true;
      t.ok(closed, 'popover close callback has run');
      t.end();
    }
  });

  inst.open();
  inst.close();
});

test('should update to use a new popover component', function(t) {

  var el = document.createElement('div');
  el.innerHTML = popoverMarkup;
  var inst = new Popover(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
