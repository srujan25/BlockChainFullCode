var test = require('tape');
var Filter = require('../../src/components/filter');
var noop = function() {};

var filterHeader = '<div class="spark-filter__header"><div class="spark-filter__toggle-container spark-clearfix"><span class="spark-filter__result-label">128 Results</span><button class="spark-filter__toggle-button spark-btn spark-btn--text"><span>Show</span> Filters</button></div><div class="spark-filter__tags-container"><div class="spark-filter__applied-filters-counter hide"><span>0</span> Filters</div><a tabindex="0" class="spark-filter__clear-all spark-eta hide">Clear all</a></div></div>';
var filterContent = '<div class="spark-filter__content hide"><div class="spark-filter__modules-container"><div class="spark-filter-module" data-filter-module="module-1"><div class="spark-filter-module__wrapper"><div class="spark-filter-module__header"><h4 class="spark-filter-module__title">Filter Module 1</h4></div><div class="spark-filter-module__body"><div class="spark-filter-module__clear-container"><button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button></div><fieldset class="row"><label class="col-xs-12 spark-checkbox"><input class="spark-checkbox__input" type="checkbox"><span class="spark-checkbox__box"></span><span class="spark-label">Checkbox 1</span><span class="spark-checkbox__right-label">112</span></label><label class="col-xs-12 spark-checkbox"><input class="spark-checkbox__input" type="checkbox"><span class="spark-checkbox__box"></span><span class="spark-label">Checkbox 2</span><span class="spark-checkbox__right-label">112</span></label><label class="col-xs-12 spark-checkbox"><input class="spark-checkbox__input" type="checkbox"><span class="spark-checkbox__box"></span><span class="spark-label">Checkbox 3</span><span class="spark-checkbox__right-label">112</span></label><label class="col-xs-12 spark-checkbox"><input class="spark-checkbox__input" type="checkbox"><span class="spark-checkbox__box"></span><span class="spark-label">Checkbox 4</span><span class="spark-checkbox__right-label">112</span></label><label class="col-xs-12 spark-checkbox"><input class="spark-checkbox__input" type="checkbox"><span class="spark-checkbox__box"></span><span class="spark-label">Checkbox 5</span><span class="spark-checkbox__right-label">112</span></label></fieldset><a tabindex="0" class="spark-filter-module__show-all spark-eta">Show <span>more</span> filters</a></div></div></div></div><div class="spark-filter__footer"><button class="spark-btn spark-btn--text spark-filter__view-more-filters">View More<span class="spark-filter__toggle-caret"></span></button><button class="spark-btn spark-btn--text spark-filter__view-less-filters hide">View Less<span class="spark-filter__toggle-caret"></span></button><nav class="spark-btn-group spark-filter__apply-btn-container"><button class="spark-btn spark-btn--sm spark-filter__btn-apply">Apply</button></nav></div></div>';
var filterExtraContent = ' <div class="spark-filter__content hide"> <div class="spark-filter__modules-container"> <div class="spark-filter-module" data-filter-module="module-1"> <div class="spark-filter-module__wrapper"> <div class="spark-filter-module__header"> <h4 class="spark-filter-module__title">Filter Module 1</h4> </div><div class="spark-filter-module__body"> <div class="spark-filter-module__clear-container"> <button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button> </div><fieldset class="row"> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 1</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 2</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 3</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 4</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 5</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> </div></div></div><div class="spark-filter-module" data-filter-module="module-2"> <div class="spark-filter-module__wrapper"> <div class="spark-filter-module__header"> <h4 class="spark-filter-module__title">Filter Module 2</h4> </div><div class="spark-filter-module__body"> <div class="spark-filter-module__clear-container"> <button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button> </div><fieldset class="row"> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 1</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 2</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 3</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 4</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 5</span> <span class="spark-checkbox__right-label">112</span> </label> <div class="spark-filter-module--hide"> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 6</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 7</span> <span class="spark-checkbox__right-label">112</span> </label> </div></fieldset> <a tabindex="0" class="spark-filter-module__show-all spark-eta">Show <span>more</span> filters</a> </div></div></div><div class="spark-filter-module" data-filter-module="module-3"> <div class="spark-filter-module__wrapper"> <div class="spark-filter-module__header"> <h4 class="spark-filter-module__title">Filter Module 3</h4> </div><div class="spark-filter-module__body"> <div class="spark-filter-module__clear-container"> <button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button> </div><fieldset class="row"> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 1</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 2</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 3</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 4</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 5</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> </div></div></div><div class="spark-filter-module" data-filter-module="module-4"> <div class="spark-filter-module__wrapper"> <div class="spark-filter-module__header"> <h4 class="spark-filter-module__title">Filter Module 4</h4> </div><div class="spark-filter-module__body"> <div class="spark-filter-module__clear-container"> <button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button> </div><fieldset class="row"> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 1</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 2</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 3</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 4</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 5</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> </div></div></div><div class="spark-filter-module" data-filter-module="module-5"> <div class="spark-filter-module__wrapper"> <div class="spark-filter-module__header"> <h4 class="spark-filter-module__title">Filter Module 5</h4> </div><div class="spark-filter-module__body"> <div class="spark-filter-module__clear-container"> <button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button> </div><fieldset class="row"> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 1</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 2</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 3</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 4</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-radio"> <input class="spark-radio__input" type="radio" name="test-radio"> <span class="spark-radio__box"></span> <span class="spark-label">Radio 5</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> </div></div></div></div><div class="spark-filter__footer"> <button class="spark-btn spark-btn--text spark-filter__view-more-filters">View More<span class="spark-filter__toggle-caret"></span></button> <button class="spark-btn spark-btn--text spark-filter__view-less-filters hide">View Less<span class="spark-filter__toggle-caret"></span></button> <nav class="spark-btn-group spark-filter__apply-btn-container"> <button class="spark-btn spark-btn--sm spark-filter__btn-apply">Apply</button> </nav> </div></div>';
var filterWithModalContent = ' <div class="spark-filter__content hide"> <div class="spark-filter__modules-container"> <div class="spark-filter-module" data-filter-module="module-1"> <div class="spark-filter-module__wrapper"> <div class="spark-filter-module__header"> <h4 class="spark-filter-module__title">Filter Module 1</h4> </div><div class="spark-filter-module__body"> <div class="spark-filter-module__clear-container"> <button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button> </div><fieldset class="row"> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox" data-sync-master="cb1" name="checkbox1"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 1</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox" data-sync-master="cb2" name="checkbox2"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 2</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox" data-sync-master="cb3" name="checkbox3"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 3</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox" data-sync-master="cb4" name="checkbox4"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 4</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="col-xs-12 spark-checkbox"> <input class="spark-checkbox__input" type="checkbox" data-sync-master="cb5" name="checkbox5"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 5</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> <div class="spark-modal" id="simpleModal"> <div class="spark-modal__scroll"> <div class="spark-modal__content col-xs-12 col-sm-10"> <div class="spark-modal__body"> <a class="spark-modal__close spark-icon-close spark-filter-module__show-all__modal-close" title="Close Modal"></a> <h4 class="spark-filter-module__show-all__modal-title">Modal Title</h4> <div class="spark-filter-module__clear-container"> <button class="spark-btn spark-btn--text spark-filter-module__clear spark-filter-module__clear--disabled">Clear</button> </div><div class="row"> <fieldset class="col-md-12 col-lg-4 "> <label class="spark-checkbox spark-filter-module__show-all__duplicate"> <input class="spark-checkbox__input" type="checkbox" data-sync-dupe="cb1"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 1</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox spark-filter-module__show-all__duplicate"> <input class="spark-checkbox__input" type="checkbox" data-sync-dupe="cb2"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 2</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox spark-filter-module__show-all__duplicate"> <input class="spark-checkbox__input" type="checkbox" data-sync-dupe="cb3"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 3</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox spark-filter-module__show-all__duplicate"> <input class="spark-checkbox__input" type="checkbox" data-sync-dupe="cb4"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 4</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox spark-filter-module__show-all__duplicate"> <input class="spark-checkbox__input" type="checkbox" data-sync-dupe="cb5"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox 5</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> <fieldset class="col-md-12 col-lg-4"> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> <fieldset class="col-md-12 col-lg-4"> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> <label class="spark-checkbox"> <input class="spark-checkbox__input" type="checkbox"> <span class="spark-checkbox__box"></span> <span class="spark-label">Checkbox</span> <span class="spark-checkbox__right-label">112</span> </label> </fieldset> </div><nav class="spark-btn-group spark-filter-module__show-all__modal-button-container"> <button class="spark-btn spark-btn--sm spark-mar-l-0 spark-filter-module__show-all__modal-button">Save</button> </nav> </div></div></div></div><a tabindex="0" class="spark-filter-module__show-all spark-eta">Show <span>more</span> filters</a> </div></div></div></div><div class="spark-filter__footer"> <button class="spark-btn spark-btn--text spark-filter__view-more-filters">View More<span class="spark-filter__toggle-caret"></span></button> <button class="spark-btn spark-btn--text spark-filter__view-less-filters hide">View Less<span class="spark-filter__toggle-caret"></span></button> <nav class="spark-btn-group spark-filter__apply-btn-container"> <button class="spark-btn spark-btn--sm spark-filter__btn-apply">Apply</button> </nav> </div></div>';

test('should create filter component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterContent;
  new Filter(el);
  t.end();
});

test('should cache elements passed to it', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterContent;

  var inst = new Filter(el);

  t.equal(inst.el, el, 'element is cached');

  t.end();
});


test('should set whitelisted parameters', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterContent;

  var onClearAll = function() {};

  var inst = new Filter(el, {
    onClearAll: onClearAll,
  });

  t.equal(inst.onClearAll, onClearAll, 'onClearAll is set');
  t.end();
});

test('should open and close filter', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterContent;

  var inst = new Filter(el);

  t.equal(inst._isFilterExpanded, false, 'isFilterExpanded defaults to false');

  inst.toggleFilter('expand');
  t.equal(inst._isFilterExpanded, true, 'isFilterExpanded is true after toggleFilter("expand") is called');

  inst.toggleFilter('collapse');
  t.equal(inst._isFilterExpanded, false, 'isFilterExpanded is false after toggleFilter("collapse") is called');

  inst.toggleFilter();
  t.equal(inst._isFilterExpanded, true, 'isFilterExpanded is true after toggleFilter() is called without options');

  t.end();
});

test('should open and close extra filters', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterExtraContent;

  var inst = new Filter(el);

  inst.toggleFilter('expand');

  t.equal(inst.extraModulesExpanded, false, 'extraModulesExpanded defaults to false');

  inst._toggleView();
  t.equal(inst.extraModulesExpanded, true, 'extraModulesExpanded is true after toggling hidden modules');

  inst._toggleView();
  t.equal(inst.extraModulesExpanded, false, 'extraModulesExpanded is false after toggling hidden modules again');

  t.end();
});

test('should enable and disable clear button', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterContent;

  var inst = new Filter(el);

  inst.toggleFilter('expand');

  t.ok(inst.el.querySelector('.spark-filter-module__clear.spark-filter-module__clear--disabled'), 'clear button is disabled by default');

  inst.showModuleClearButton('module-1');

  t.notOk(inst.el.querySelector('.spark-filter-module__clear.spark-filter-module__clear--disabled'), 'clear button is not disabled after showModuleClearButton');

  t.notOk(inst.el.querySelector('.spark-filter-module__clear.spark-filter-module__clear--hidden'), 'clear button is not hidden after showModuleClearButton');

  inst.disableModuleClearButton('module-1');

  t.ok(inst.el.querySelector('.spark-filter-module__clear.spark-filter-module__clear--disabled'), 'clear button is disabled on disableModuleClearButton');

  inst.hideModuleClearButton('module-1');

  t.ok(inst.el.querySelector('.spark-filter-module__clear.spark-filter-module__clear--hidden'), 'clear button is hidden on hideModuleClearButton');

  t.end();
});

// should show tags when applied ---> optional and contains some custom code
test('should apply and remove tag', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterContent;

  var inst = new Filter(el);

  inst.toggleFilter('expand');

  inst.createTagEl('input', 'label', noop);

  t.ok(inst.el.querySelector('.spark-filter__tag'), 'filter tag is applied');

  inst.clearAllTagEls();

  t.notOk(inst.el.querySelector('.spark-filter__tag'), 'filter tag is no longer applied');

  t.end();
});

test('should show more filters inline', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterExtraContent;

  var inst = new Filter(el, {
    moduleOptions: [{}, {onShowAll: 'toggle'}]
  });

  inst.toggleFilter('expand');

  t.notOk(inst.el.querySelector('[data-filter-module="module-2"] .spark-filter-module--hide.show'), 'additional filters should be hidden by default');

  var eventClick = new Event('click');
  inst.el.querySelector('.spark-filter-module__show-all').dispatchEvent(eventClick);

  t.ok(inst.el.querySelector('[data-filter-module="module-2"] .spark-filter-module--hide.show'), 'additional filters should be displayed on show-all');

  t.end();
});

test('should show more filters in modal', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterWithModalContent;

  var inst = new Filter(el, {
    moduleOptions: [{onShowAll: 'modal'}]
  });

  inst.toggleFilter('expand');

  t.notOk(document.querySelector('body.spark-modal-open'), 'body should not have spark-modal-open class applied by default');
  t.notOk(inst.el.querySelector('.spark-modal.active'), 'modal should not have active class applied by default');

  var eventClick = new Event('click');
  inst.el.querySelector('.spark-filter-module__show-all').dispatchEvent(eventClick);

  t.ok(document.querySelector('body.spark-modal-open'), 'body should have spark-modal-open class applied on show-all');
  t.ok(inst.el.querySelector('.spark-modal.active'), 'modal should have active class applied on show-all');

  t.end();
});

// @todo: make this more robust. right now it's just checking to make sure no errors are thrown.
test('should handle resize events', function(t) {

  var el = document.createElement('div');
  el.innerHTML = filterHeader + filterContent;

  var inst = new Filter(el);
  inst._onResize();

  t.end();
});
