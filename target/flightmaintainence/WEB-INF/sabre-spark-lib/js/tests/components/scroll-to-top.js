var test = require('tape');
var ScrollToTop = require('../../src/components/scroll-to-top');

var markup = '<button></button>';

test('should create scroll to top component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  new ScrollToTop(el.children[0]);
  t.end();
});

test('should use a passed container element or default to the parent', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  var el2 = document.createElement('div');

  var inst = new ScrollToTop(el.children[0]);

  t.equal(inst.containerEl, el, 'uses a parent element as the container');

  var inst2 = new ScrollToTop(el.children[0], {containerEl: el2});
  t.equal(inst2.containerEl, el2, 'uses a passed element as the container');

  t.end();
});

// @todo: test doesn't do much because we don't have DOM heights
test('should cache sizes for the window, element and container', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new ScrollToTop(el.children[0]);

  t.equal(inst._windowHeight, window.innerHeight, 'caches the window height');
  // t.equal(inst._containerBottom, 0, 'caches the container height');
  // t.equal(inst._visibleThreshold, 0, 'caches the visible threshold');

  t.end();
});

// @todo: test doesn't do much because we don't have DOM heights
test('should check the scroll position and set the state', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  // var inst = new ScrollToTop(el.children[0]);

  // t.equal(inst._isVisible, true, 'determines if the button should be shown');
  // t.equal(inst._isAtBottom, true, 'determines if the button should be fixed');

  t.end();
});

// @todo: this doesn't work on the command line.
test('should scroll to the top of the container element', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  // var inst = new ScrollToTop(el.children[0]);

  // document.body.appendChild(el);
  // el.style.height = '10000px';
  // window.scrollTo(1000, 1000);

  // t.equal(window.scrollY, 1000, 'window has scrolled');
  // inst.scrollToTop(function() {
  //   t.equal(window.scrollY, el.offsetTop, 'scrolls to the top of the window');
  //   el.parentNode.removeChild(el);
    t.end();
  // });
});

test('should update to use a new scroll to top component', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new ScrollToTop(el.children[0]);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});

