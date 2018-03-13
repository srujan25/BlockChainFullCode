var test = require('tape');
var Expand = require('../../src/components/expand');

test('should create expand component', function(t) {
  var el = document.createElement('div');
  new Expand(el);
  t.end();
});

test('should expand, collapse and toggle state', function(t) {

  var el = document.createElement('div');
  var inst = new Expand(el);

  t.equal(inst.isExpanded, false, 'isExpanded defaults to false');

  inst.expand();
  t.equal(inst.isExpanded, true, 'isExpanded is true after expand() is called');

  inst.collapse();
  t.equal(inst.isExpanded, false, 'isExpand is false after collapse() is called');

  inst.toggle();
  t.equal(inst.isExpanded, true, 'isExpand is inverted after toggle() is called');
  inst.toggle();
  t.equal(inst.isExpanded, false, 'isExpand is interveted after toggle() is called again');

  t.end();
});

test('should handle click events', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<p>some body copy</p><a class="spark-expand__toggle">Toggle Button</a>';

  var inst = new Expand(el);

  t.equal(inst.isExpanded, false, 'isExpanded defaults to false');

  inst._onClick({
    target: el.children[0],
    preventDefault: function() {}
  });

  t.equal(inst.isExpanded, false, 'isExpanded remains false when a non-toggle element is clicked');

  inst._onClick({
    target: el.children[1],
    preventDefault: function() {}
  });

  t.equal(inst.isExpanded, true, 'isExpanded becomes true when a toggle element is clicked');

  t.end();
});

test('should accept onBeforeExpand, onAfterExpand, onBeforeCollapse and onAfterCollapse callbacks', function(t) {

  var i = 0;

  function increment() {
    i++;
  }

  var el = document.createElement('div');
  var inst = new Expand(el, {
    onBeforeExpand: increment,
    onAfterExpand: increment,
    onBeforeCollapse: increment,
    onAfterCollapse: increment
  });

  inst.expand();
  t.equal(i, 2, 'before and after expand callbacks are fired');

  inst.collapse();
  t.equal(i, 4, 'before and after collapse callbacks are fired');

  t.end();
});

test('should update to use a new expand component', function(t) {

  var el = document.createElement('label');
  var inst = new Expand(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
