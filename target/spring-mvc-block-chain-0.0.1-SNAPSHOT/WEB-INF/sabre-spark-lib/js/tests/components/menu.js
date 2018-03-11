var test = require('tape');
var Menu = require('../../src/components/menu');

var markup = '<nav class="spark-menu spark-panel col-xs-12 col-sm-8 col-col-md-6 col-lg-5 col-xl-4"><div class="spark-menu__header"><form><input></form><button class="spark-menu__toggle" title="Hide Navigation"><i class="spark-icon-close"></i></button><a class="spark-menu__title"><i class="spark-logo spark-logo--sabre spark-logo--sm"></i></a></div><div class="spark-panel__header"><h4>Design Principles</h4></div><ul class="spark-menu__list"><li class="spark-menu__list-item"><a class="spark-menu__list-link">Animation</a></li><li class="spark-menu__list-item" id="nestedList"><span class="spark-menu__list-links"><a class="spark-menu__list-link">Color Palette</a><a class="spark-menu__list-expand" role="menuitemcheckbox"></a></span><ul class="spark-menu__list"><li class="spark-menu__list-item"><a class="spark-menu__list-link">Animation</a></li></ul></li></ul></nav>';

test('should create menu component', function(t) {
  var el = document.createElement('div');
  new Menu(el);
  t.end();
});

test('should handle making an item active when clicked and all associated edge cases', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var inst = new Menu(el);

  // Clicking a link
  t.notOk(inst.el.querySelector('.active'), 'no active item by default');
  inst._onClick({
    target: inst.el.querySelector('.spark-menu__list-link')
  });
  t.ok(inst.el.querySelector('.active'), 'active item set after link clicked');

  // Expand button
  t.notOk(inst.el.querySelector('.open'), 'no open menu item by default');
  inst._onClick({
    target: inst.el.querySelector('.spark-menu__list-expand')
  });
  t.ok(inst.el.querySelector('.open'), 'open item set after expand clicked');

  // Non-item clicked
  var activeItem = inst.el.querySelector('.active');
  inst._onClick({
    target: inst.el.querySelector('nav')
  });
  t.equal(inst.el.querySelector('.active'), activeItem, 'active item unchanged after non-item click');

  // Forms shouldn't be active
  inst._onClick({
    target: inst.el.querySelector('form input')
  });
  t.equal(inst.el.querySelector('.active'), activeItem, 'active item unchanged after form item click');

  // Toggle button
  inst.onToggle = function() {
    t.end();
  };
  inst._onClick({
    target: inst.toggleEl
  });
});

test('should add the has-focus class to items (and their parents) that gain focus', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var nestedList = el.querySelector('#nestedList');
  var nestedItem = nestedList.querySelector('.spark-menu__list-item');

  var inst = new Menu(el);

  inst._onFocus({
    target: nestedList.querySelector('.spark-menu__list-link')
  });

  t.notEqual(nestedList.className.indexOf('has-focus'), -1, 'adds the has-focus class to a top-level item');

  inst._onBlur({
    target: nestedList.querySelector('.spark-menu__list-link')
  });

  t.equal(nestedList.className.indexOf('has-focus'), -1, 'removes the has-focus class from a top-level item');

  inst._onFocus({
    target: nestedItem.querySelector('.spark-menu__list-link')
  });

  t.notEqual(nestedList.className.indexOf('has-focus'), -1, 'adds the has-focus class to a top-level item when a child is focused');
  t.notEqual(nestedItem.className.indexOf('has-focus'), -1, 'adds the has-focus class to a child when it is focused');

  inst._onBlur({
    target: nestedItem.querySelector('.spark-menu__list-link')
  });

  t.equal(nestedList.className.indexOf('has-focus'), -1, 'removes the has-focus class to a top-level item when a child is blurred');
  t.equal(nestedItem.className.indexOf('has-focus'), -1, 'removes the has-focus class to a child when it is blurred');

  t.end();
});

test('should update to use a new menu component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new Menu(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
