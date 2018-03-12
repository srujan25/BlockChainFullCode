var test = require('tape');
var StepIndicator = require('../../src/components/step-indicator');

var markup = '<div class="spark-step-indicator"><h4 class="spark-step-indicator__title">Default</h4><div class="spark-step-indicator__body"><div class="spark-step-indicator__subtitle">2. Choose a Flight</div><div class="spark-step-indicator__list"><a href="#" class="spark-step-indicator__item spark-step-indicator__item--completed"><span class="spark-step-indicator__icon">1</span><span class="spark-step-indicator__text">Step 1</span></a><a href="#" class="spark-step-indicator__item spark-step-indicator__item--current"><span class="spark-step-indicator__icon">2</span><span class="spark-step-indicator__text">Step 2</span></a><a href="#" class="spark-step-indicator__item"><span class="spark-step-indicator__icon">3</span><span class="spark-step-indicator__text">Step 3<small class="spark-step-indicator__subtext">(Sublabel)</small></span></a><a href="#" class="spark-step-indicator__item"><span class="spark-step-indicator__icon">4</span><span class="spark-step-indicator__text">Step 4</span></a><a href="#" class="spark-step-indicator__item"><span class="spark-step-indicator__icon">5</span><span class="spark-step-indicator__text">Step 5</span></a><a href="#" class="spark-step-indicator__item spark-step-indicator__item--disabled"><span class="spark-step-indicator__icon">6</span><span class="spark-step-indicator__text">Step 6</span></a></div></div></div>';

test('should create step indicator component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  new StepIndicator(el.children[0]);
  t.end();
});

test('should cache correct element: body, list and items', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new StepIndicator(el.children[0]);

  t.equal(el.querySelector('.spark-step-indicator__body'), inst._body, 'cache element body correct');

  t.equal(el.querySelector('.spark-step-indicator__list'), inst._list, 'cache element list correct');

  t.equal(el.querySelectorAll('.spark-step-indicator__item')[3], inst._items[3], 'cache element itmes correct');

  t.equal(inst._items.length, 6, 'cache element itmes number correct');

  t.end();
});


test('should able to set correct fixed standard variation', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  el.children[0].setAttribute('data-type','standard');
  var inst = new StepIndicator(el.children[0], {type:'standard'});

  t.equal(inst.type, 'standard', 'Have correct standard config');

  t.end();
});

test('should able to set correct fixed condensed variation', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  el.children[0].setAttribute('data-type','condensed');
  var inst = new StepIndicator(el.children[0]);

  t.equal(inst.type, 'condensed', 'Have correct condensed config');
  t.equal(inst._list.className, 'spark-step-indicator__list spark-step-indicator__list--condensed', 'list have correct class');

  t.end();
});

test('should able to set correct fixed dropdown variation', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  el.children[0].setAttribute('data-type','dropdown');
  var inst = new StepIndicator(el.children[0]);

  t.equal(inst.type, 'dropdown', 'Have correct dropdown config');
  t.equal(inst._body.className, 'spark-step-indicator__body spark-step-indicator__body--no-border spark-step-indicator__body--dropdown', 'body has correct class');

  t.end();
});

test('should able to set correct fixed standard-condensed variation', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  el.children[0].setAttribute('data-type','standard-condensed');
  var inst = new StepIndicator(el.children[0]);

  t.equal(inst.type, 'standard-condensed', 'Have correct standard-condensed config');

  t.end();
});

test('Configuartion via JS should have higher priority', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  el.children[0].setAttribute('data-type','standard');
  var inst = new StepIndicator(el.children[0], {type: 'condensed'});

  t.equal(inst.type, 'condensed', 'Configuartion via JS should have higher priority');

  t.end();
});

test('update() should work correctly', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  el.children[0].setAttribute('data-type','dropdown');
  var inst = new StepIndicator(el.children[0]);

  t.equal(inst.type, 'dropdown', 'Have correct dropdown config');
  t.equal(inst._body.className, 'spark-step-indicator__body spark-step-indicator__body--no-border spark-step-indicator__body--dropdown', 'body has correct class');

  inst.type = 'condensed';
  inst.update();

  t.equal(inst.type, 'condensed', 'Have correct condensed config');
  t.equal(inst._list.className, 'spark-step-indicator__list spark-step-indicator__list--condensed', 'list have correct class');

  t.end();
});

test('should able to set correct current state', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new StepIndicator(el.children[0]);
  inst.setStepState(4, 'current');

  t.equal(el.querySelectorAll('.spark-step-indicator__item')[1].className, 'spark-step-indicator__item', 'previous current step should not have current state');
  t.equal(el.querySelectorAll('.spark-step-indicator__item')[4].className, 'spark-step-indicator__item spark-step-indicator__item--current', 'set current state correct');

  t.end();
});

test('should able to set correct completed and disabled state', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new StepIndicator(el.children[0]);
  inst.setStepState(4, 'completed');
  inst.setStepState(5, 'disabled');

  t.equal(el.querySelectorAll('.spark-step-indicator__item')[4].className, 'spark-step-indicator__item spark-step-indicator__item--completed', 'set completed state correct');
  t.equal(el.querySelectorAll('.spark-step-indicator__item')[5].className, 'spark-step-indicator__item spark-step-indicator__item--disabled', 'set disabled state correct');

  t.end();
});

test('should collapse and expand correct of dropdown variation', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  el.children[0].setAttribute('data-type','dropdown');
  var inst = new StepIndicator(el.children[0]);

  t.equal(inst._list.className, 'spark-step-indicator__list collapse', 'list collapse at beginning');
  // Cannot stimulate mouse click at cmd line

  //inst._toggleDropdown(el.querySelector('.spark-step-indicator__item--dropdown__header'));

  //t.equal(inst._list.className, 'spark-step-indicator__list', 'list will expand when click');
  //t.equal(el.querySelector('.spark-step-indicator__item--dropdown__header').className, 'spark-step-indicator__item spark-step-indicator__item--current spark-step-indicator__item--dropdown__header expand', 'header of dropdown will change when expand');

  t.end();
});

test('should update to use a new step indicator component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new StepIndicator(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
