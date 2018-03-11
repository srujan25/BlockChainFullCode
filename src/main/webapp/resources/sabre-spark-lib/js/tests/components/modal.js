var test = require('tape');
var Modal = require('../../src/components/modal');

test('should create modal component', function(t) {

  // Pass modal element directly
  var el = document.createElement('div');
  var modalEl = document.createElement('div');
  new Modal(el, {
    modalEl: modalEl
  });

  // Find the modal element
  el.setAttribute('data-modal', '#modal-el');
  modalEl.setAttribute('id', 'modal-el');
  document.body.appendChild(modalEl);
  new Modal(el);
  modalEl.parentNode.removeChild(modalEl);

  // Pass only the modal
  modalEl.className = 'spark-modal';
  new Modal(modalEl);

  t.end();
});

test('should open and close', function(t) {

  var el = document.createElement('div');
  var modalEl = document.createElement('div');
  var inst = new Modal(el, {
    modalEl: modalEl
  });

  t.equal(inst.isActive, false, 'isActive defaults to false');

  inst.open();
  t.equal(inst.isActive, true, 'isActive is true after open() is called');

  inst.close();
  t.equal(inst.isActive, false, 'isModal is false after close() is called');

  t.end();
});

test('should handle click events', function(t) {

  var el = document.createElement('div');

  var modalEl = document.createElement('div');
  modalEl.innerHTML = '<div class="spark-modal__scroll"><p>some body copy</p><a class="spark-modal__close">Close Button</a></div>';
  var scrollEl = modalEl.children[0];

  var inst = new Modal(el, {
    modalEl: modalEl
  });

  t.equal(inst.isActive, false, 'isActive defaults to false');

  inst._onClick();

  t.equal(inst.isActive, true, 'isActive becomes true when clicked');

  inst._onModalClick({
    target: scrollEl.children[0],
    preventDefault: function() {}
  });

  t.equal(inst.isActive, true, 'isActive remains true when a non-close element is clicked');

  inst._onModalClick({
    target: scrollEl.children[1],
    preventDefault: function() {}
  });
  t.equal(inst.isActive, false, 'isActive becomes false when a close element is clicked');

  inst.open();

  inst._onModalClick({
    target: scrollEl,
    preventDefault: function() {}
  });
  t.equal(inst.isActive, false, 'isActive becomes false when clicked outside of the content');

  t.end();
});

test('should update to use a new modal component', function(t) {

  var el = document.createElement('div');
  var modalEl = document.createElement('div');
  modalEl.innerHTML = '<div class="spark-modal__scroll"><p>some body copy</p><a class="spark-modal__close">Close Button</a></div>';

  var inst = new Modal(el, {modalEl: modalEl});
  var newEl = el.cloneNode(true);
  var newModalEl = modalEl.cloneNode(true);

  inst.update(newEl, {
    modalEl: newModalEl
  });

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');
  t.notEqual(inst.modalEl, modalEl, 'stores the new modal element');
  t.equal(inst.modalEl, newModalEl, 'stores the new modal element');

  t.end();
});
