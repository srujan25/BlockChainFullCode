/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Filter = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * # Base Component
                                                                                                                                                           * The base class for Spark JS components. This class should never be
                                                                                                                                                           * instantiated directly.
                                                                                                                                                           *
                                                                                                                                                           * @param {Element} el
                                                                                                                                                           * @param {Object} params
                                                                                                                                                           *
                                                                                                                                                           * @module components/base.js
                                                                                                                                                           */

var noop = function noop() {};

var Base = function () {

  /**
   * Set parameters and cache elements.
   */
  function Base(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Base);

    if (params.elRequired && !el) {
      return;
    }

    this.setParams(this.defaults || {}, true);
    this.setParams(params);
    (this._cacheElements || noop).call(this, el, params);
    (this._parseParams || noop).call(this);
  }

  /**
   * Remove the component from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Base.prototype.remove = function remove(leaveElement) {

    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    if (!leaveElement && this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }

    this.unsetParams(this.defaults);

    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   * @param {Object} params Optional
   */


  Base.prototype.update = function update(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    (this._cacheElements || noop).call(this, el || this.el, params);
    (this._parseParams || noop).call(this);

    if (this._addEventListeners) {
      this._addEventListeners();
    }

    return this;
  };

  /**
   * Set a hash of parameters if they're whitelisted or we're told to force the set.
   * This is used to set initial values as well as set passed parameters.
   * @param {Object} params
   * @param {Boolean} force Force setting even if the param is not whitelisted.
   */


  Base.prototype.setParams = function setParams(params, force) {
    var _this = this;

    (0, _each2.default)(params, function (k, v) {
      if (_this._whitelistedParams.indexOf(k) !== -1 || force) {
        _this[k] = v;
      }
    });

    return this;
  };

  /**
   * Unset all parameters.
   * @param {Array|Object} keys
   * @param {Object} scope The object to unset the params from. Defaults to `this`.
   */


  Base.prototype.unsetParams = function unsetParams(keys, scope) {

    keys = keys instanceof Array ? keys : Object.keys(keys);
    scope = scope || this;
    (0, _each2.default)(keys, function (k) {
      delete scope[k];
    });

    return this;
  };

  return Base;
}();

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Base.prototype._whitelistedParams = [];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Base.prototype.defaults = {};

exports.default = Base;
module.exports = exports['default'];


},{"../helpers/util/each":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Expand
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Expand and collapse an element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Expand(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/expand.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Expand = function (_BaseComponent) {
  _inherits(Expand, _BaseComponent);

  /**
   * Expand constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Expand(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Expand);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Expand
   */


  Expand.prototype.expand = function expand() {

    (this.onBeforeExpand || noop)();

    (0, _height2.default)({
      el: this.el,
      toggleClass: 'expanded',
      toggleEl: '.spark-expand__content, .spark-panel__content'
    });

    this.isExpanded = true;
    this._updateClasses();
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.el.dispatchEvent(e);

    // If the expand element have input, focus on the first one.
    if (this.el.querySelector('input')) {
      this.el.querySelector('input').focus();
    }

    (this.onAfterExpand || noop)();

    return this;
  };

  /**
   * Collapse
   */


  Expand.prototype.collapse = function collapse() {

    (this.onBeforeCollapse || noop)();

    (0, _height2.default)({
      el: this.el,
      toggleEl: '.spark-expand__content, .spark-panel__content',
      toggleValue: 'none',
      action: 'collapse'
    });

    this.isExpanded = false;
    this._updateClasses();

    (this.onAfterCollapse || noop)();

    return this;
  };

  /**
   * Toggle the expand state.
   */


  Expand.prototype.toggle = function toggle() {
    return this[this.isExpanded ? 'collapse' : 'expand']();
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  Expand.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.isExpanded = (0, _hasClass2.default)(this.el, 'expanded');

    this.accordionHeading = this.el.querySelector('[role="heading"]');
    this.accordionContent = this.el.querySelector('.spark-panel__content');

    this.panelContent = this.el.querySelector('.spark-expand__content');
    this.panelCollapsedButton = this.el.querySelector('.spark-expand__hide--expanded');
    this.panelExpandedButton = this.el.querySelector('.spark-expand__show--expanded');
  };

  /**
   * Update classes for the expand or collapse state.
   */


  Expand.prototype._updateClasses = function _updateClasses() {
    (0, _toggleClass2.default)(this.el, 'expanded', this.isExpanded);
    this._updateAriaAttributes();
  };

  /**
   * Update aria attributes for the expand or collapse state.
   */


  Expand.prototype._updateAriaAttributes = function _updateAriaAttributes() {
    if (this.isExpanded) {
      this.accordionHeading ? this.accordionHeading.setAttribute('aria-expanded', 'true') : null;
      this.accordionContent ? this.accordionContent.setAttribute('aria-hidden', 'false') : null;

      this.panelContent ? this.panelContent.setAttribute('aria-hidden', 'false') : null;
      this.panelCollapsedButton ? this.panelCollapsedButton.setAttribute('aria-hidden', 'true') : null;
      this.panelExpandedButton ? this.panelExpandedButton.setAttribute('aria-hidden', 'false') : null;
    } else {
      this.accordionHeading ? this.accordionHeading.setAttribute('aria-expanded', 'false') : null;
      this.accordionContent ? this.accordionContent.setAttribute('aria-hidden', 'true') : null;

      this.panelContent ? this.panelContent.setAttribute('aria-hidden', 'true') : null;
      this.panelCollapsedButton ? this.panelCollapsedButton.setAttribute('aria-hidden', 'false') : null;
      this.panelExpandedButton ? this.panelExpandedButton.setAttribute('aria-hidden', 'true') : null;
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Expand.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Expand.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Expand.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
  };

  /**
   * When we are clicked, toggle the expanded state.
   * @param {Object} e
   */


  Expand.prototype._onClick = function _onClick(e) {

    if (!(0, _getParent2.default)(e.target, '.spark-expand__toggle, [data-role="toggle"], [role="heading"]', this.el)) {
      return;
    }

    e.preventDefault();
    this.toggle();
  };

  /**
   * When the space or enter key is pressed on the toggle, toggle!
   * @param {Object} e
   */


  Expand.prototype._onKeydown = function _onKeydown(e) {

    if (!(0, _getParent2.default)(e.target, '.spark-expand__toggle, [data-role="toggle"], [role="heading"]', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    // Space or enter
    if (code === 32 || code === 13) {
      e.preventDefault();
      this.toggle();
    }
  };

  return Expand;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Expand.prototype._whitelistedParams = ['onBeforeExpand', 'onAfterExpand', 'onBeforeCollapse', 'onAfterCollapse'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Expand.prototype.defaults = {
  el: null,
  isExpanded: false,
  onBeforeExpand: null,
  onAfterExpand: null,
  onBeforeCollapse: null,
  onAfterCollapse: null,
  _onClickBound: null,
  _onKeydownBound: null
};

exports.default = Expand;
module.exports = exports['default'];


},{"../helpers/animation/height":6,"../helpers/dom/has-class":9,"../helpers/dom/toggle-class":12,"../helpers/traversal/get-parent":13,"./base":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _expand = require('./expand');

var _expand2 = _interopRequireDefault(_expand);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Filter Module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module that contains an individual (or related) filters such as checkboxes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new FilterModule(el, params);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/filter-module.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var FilterModule = function (_BaseComponent) {
  _inherits(FilterModule, _BaseComponent);

  /**
   * Filter Module constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function FilterModule(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FilterModule);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the need elements
   * @param {Element} el
   */


  FilterModule.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this._showAllEl = this.el.querySelector('.spark-filter-module__show-all');
    if (this._showAllEl) {
      this._showAllToggleable = this._showAllEl.querySelector('span');
    }

    this._clearEls = this.el.querySelectorAll('.spark-filter-module__clear');
    this._hiddenEls = Array.prototype.slice.call(this.el.querySelectorAll('.spark-filter-module--hide'));
    this._headerEl = this.el.querySelector('.spark-filter-module__header');
    this._bodyEl = this.el.querySelector('.spark-filter-module__body');
    this._modalEl = this.el.querySelector('.spark-modal');
    this._modalSaveBtn = this.el.querySelector('.spark-filter-module__show-all__modal-button');
    this._modalClasses = [];

    if (this.onShowAll === 'modal') {
      this.modalInst = new _modal2.default(this._modalEl);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  FilterModule.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onShowAllBound = this._onShowAll.bind(this);
    this._onClearBound = this._onClear.bind(this);
    this._onCloseModalBound = this._onCloseModal.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  FilterModule.prototype._addEventListeners = function _addEventListeners() {
    !this._showAllEl || this._showAllEl.addEventListener('click', this._onShowAllBound);
    !this._modalSaveBtn || this._modalSaveBtn.addEventListener('click', this._onCloseModalBound);

    for (var i = 0; i < this._clearEls.length; i++) {
      !this._clearEls[i] || this._clearEls[i].addEventListener('click', this._onClearBound);
    }
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  FilterModule.prototype._removeEventListeners = function _removeEventListeners() {
    if (this._showAllEl) {
      this._showAllEl.removeEventListener('click', this._onShowAllBound);
      this._modalSaveBtn.removeEventListener('click', this._onCloseModalBound);

      for (var i = 0; i < this._clearEls.length; i++) {
        !this._clearEls[i] || this._clearEls[i].removeEventListener('click', this._onClearBound);
      }
    }
  };

  /**
   * Show any hidden filters within a module or run provided function if available
   */


  FilterModule.prototype._onShowAll = function _onShowAll() {
    if (typeof this.onShowAll === 'function') {
      (this.onShowAll || noop)(this);
    } else {
      if (this.onShowAll === 'toggle' || this.onShowAll === 'modal' && this._isExpand) {
        this._toggleShowAllLabel();
        this.toggleHiddenContent();
      } else if (this.onShowAll === 'modal' && !this._isExpand) {
        this.modalInst.open();
      }

      (this.onShowAllComplete || noop)();
    }
  };

  /**
   * Toggle Show More label text
   */


  FilterModule.prototype._toggleShowAllLabel = function _toggleShowAllLabel() {
    this._showAllToggleable.innerHTML = this._showAllToggleable.innerHTML === 'more' ? 'fewer' : 'more';
  };

  /**
   * Callback after clicking `Clear` button
   */


  FilterModule.prototype._onClear = function _onClear() {
    (this.onClear || noop)(this);
  };

  /**
   * Callback after clicking `Save` button
   */


  FilterModule.prototype._onCloseModal = function _onCloseModal() {
    (this.onModalClose || noop)();

    this.modalInst.close();
  };

  /**
   * Enable clear button
   */


  FilterModule.prototype.enableClearBtn = function enableClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      (0, _removeClass2.default)(this._clearEls[i], 'spark-filter-module__clear--disabled');
      (0, _removeClass2.default)(this._clearEls[i], 'spark-filter-module__clear--hidden');
    }
  };

  /**
   * Disable clear button
   */


  FilterModule.prototype.disableClearBtn = function disableClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      (0, _addClass2.default)(this._clearEls[i], 'spark-filter-module__clear--disabled');
    }
  };

  /**
   * Hide clear button
   */


  FilterModule.prototype.hideClearBtn = function hideClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      (0, _addClass2.default)(this._clearEls[i], 'spark-filter-module__clear--hidden');
    }
  };

  /**
   * Determine if Clear button is hidden or disabled
   */


  FilterModule.prototype.getClearButtonStatus = function getClearButtonStatus() {
    var buttonEnabled = false;

    for (var i = 0; i < this._clearEls.length; i++) {
      if ((0, _hasClass2.default)(this._clearEls[i], 'spark-filter-module__clear--hidden') || (0, _hasClass2.default)(this._clearEls[i], 'spark-filter-module__clear--disabled')) {
        buttonEnabled = false;
      } else {
        buttonEnabled = true;
      }
    }

    return buttonEnabled;
  };

  /**
   * Hide or show extra filters elements as triggered by Show more/fewer
   */


  FilterModule.prototype.toggleHiddenContent = function toggleHiddenContent() {
    for (var i = 0; i < this._hiddenEls.length; i++) {
      (0, _toggleClass2.default)(this._hiddenEls[i], 'show');
    }
  };

  /**
   * Change filter-module to expand/collapse variation
   * This occurs when the filter is at the xs breakpoint
   */


  FilterModule.prototype._applyExpand = function _applyExpand() {
    if (this._modalEl) {
      var modalClsNames = ['spark-filter-module--hide', '', '', ''];

      this._hiddenEls.push(this._modalEl);
      var curEl = this._modalEl;

      for (var i = 0; i < modalClsNames.length; i++) {
        this._modalClasses[i] = curEl.className;
        curEl.className = modalClsNames[i];
        curEl = curEl.firstElementChild;
      }

      if ((0, _hasClass2.default)(document.body, 'spark-modal-open')) {
        (0, _removeClass2.default)(document.body, 'spark-modal-open');
      }

      this.modalInst.remove(true);
    }

    (0, _addClass2.default)(this.el, 'spark-panel', 'spark-panel--expand');
    (0, _addClass2.default)(this._headerEl, 'spark-panel__header');
    this._headerEl.setAttribute('role', 'heading');
    this._headerEl.setAttribute('tabindex', '0');
    (0, _addClass2.default)(this._bodyEl, 'spark-panel__content');

    this._expandInst = new _expand2.default(this.el, {
      onAfterExpand: this.onAfterExpand,
      onAfterCollapse: this.onAfterCollapse
    });

    this._isExpand = true;
  };

  /**
   * Change filter-module from expand/collapse to horizontal variation
   */


  FilterModule.prototype._disapplyExpand = function _disapplyExpand() {
    if (this._modalEl) {

      if ((0, _hasClass2.default)(this._modalEl, 'show')) {
        this._toggleShowAllLabel();
      }

      this._hiddenEls.pop();
      var curEl = this._modalEl;

      for (var i = 0; i < this._modalClasses.length; i++) {
        curEl.className = this._modalClasses[i];
        curEl = curEl.firstElementChild;
      }

      this.modalInst = new _modal2.default(this._modalEl);
    }

    (0, _removeClass2.default)(this.el, 'spark-panel', 'spark-panel--expand');
    (0, _removeClass2.default)(this._headerEl, 'spark-panel__header');
    this._headerEl.removeAttribute('role');
    this._headerEl.removeAttribute('tabindex');
    (0, _removeClass2.default)(this._bodyEl, 'spark-panel__content');
    this._expandInst.remove(true);
    this._isExpand = false;
  };

  return FilterModule;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


FilterModule.prototype._whitelistedParams = ['onShowAll', 'onShowAllComplete', 'onModalClose', 'onClear', 'onAfterExpand', 'onAfterCollapse'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
FilterModule.prototype.defaults = {
  el: null,
  onShowAll: noop,
  onShowAllComplete: noop,
  onModalClose: noop,
  onClear: noop,
  onAfterExpand: noop,
  onAfterCollapse: noop,
  modalInst: null,
  _onShowAllBound: null,
  _onClearBound: null,
  _showAllEl: null,
  _clearEl: null,
  _hiddenEls: [],
  _headerEl: null,
  _bodyEl: null,
  _modalEl: null,
  _expandInst: null,
  _isExpand: false,
  dataSet: {}
};

exports.default = FilterModule;
module.exports = exports['default'];


},{"../helpers/dom/add-class":7,"../helpers/dom/has-class":9,"../helpers/dom/remove-class":11,"../helpers/dom/toggle-class":12,"./base":1,"./expand":2,"./modal":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _filterModule = require('./filter-module');

var _filterModule2 = _interopRequireDefault(_filterModule);

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

var _breakpoint = require('../helpers/dom/breakpoint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Filter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A container for a set of form fields used to filter a data set or search results
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Filter(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/filter.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Filter = function (_BaseComponent) {
  _inherits(Filter, _BaseComponent);

  /**
   * Filter constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Filter(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Filter);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._initFilterDisplay();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the needed elements
   * @param {Element} el
   */


  Filter.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.moduleEls = this.el.querySelectorAll('.spark-filter-module');

    // These options are here so that the modules can communicate with the filter to do certain tasks
    var defaultOption = {
      onAfterExpand: this._onAfterExpand.bind(this),
      onAfterCollapse: this._onAfterCollapse.bind(this)
      //onShowAllComplete: this._onShowAllComplete.bind(this),
    };

    if (this.moduleEls.length > 0) {
      for (var i = 0; i < this.moduleEls.length; i++) {
        if (typeof this.moduleOptions[i] !== 'undefined') {
          for (var key in defaultOption) {
            this.moduleOptions[i][key] = defaultOption[key];
          }
          this.moduleInsts[i] = new _filterModule2.default(this.moduleEls[i], this.moduleOptions[i]);
        } else {
          this.moduleInsts[i] = new _filterModule2.default(this.moduleEls[i], defaultOption);
        }
      }
    }

    this._filterToggleContainer = this.el.querySelector('.spark-filter__toggle-container');
    this._toggleFilterButton = this.el.querySelector('.spark-filter__toggle-button');
    this._toggleFilterLabel = this.el.querySelector('.spark-filter__toggle-button span');
    this._tagsContainer = this.el.querySelector('.spark-filter__tags-container');
    this._tagsCounter = this.el.querySelector('.spark-filter__applied-filters-counter');
    this._clearAllButton = this.el.querySelector('.spark-filter__clear-all');
    this._filterContent = this.el.querySelector('.spark-filter__content');
    this._modulesContainer = this.el.querySelector('.spark-filter__modules-container');
    this._viewMoreButton = this.el.querySelector('.spark-filter__view-more-filters');
    this._viewLessButton = this.el.querySelector('.spark-filter__view-less-filters');
    this._filterFooter = this.el.querySelector('.spark-filter__footer');
    this._buttonGroupEl = this.el.querySelector('.spark-filter__apply-btn-container');
    this._applyFiltersButton = this.el.querySelector('.spark-filter__btn-apply');
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Filter.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._toggleViewBound = this._toggleView.bind(this);
    this._toggleFilterClickBound = this.toggleFilterClick.bind(this);
    this._onClearAllBound = this._onClearAll.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
  };

  /**
   * Add event listeners
   */


  Filter.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.addEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.addEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.addEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.addEventListener('click', this._onClearAllBound);
  };

  /**
   * Remove event listeners
   */


  Filter.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.removeEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.removeEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.removeEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.removeEventListener('click', this._onClearAllBound);
  };

  /**
   * Initialize filter
   */


  Filter.prototype._initFilterDisplay = function _initFilterDisplay() {
    this.initializingFilter = true;

    if (this.moduleEls.length > 0) {
      this.extraModulesExpanded = false;
    }

    (0, _addClass2.default)(this.el, 'spark-filter--initializing');

    this._determineFilterLayout();
  };

  /**
   * Determine which filter layout should be displayed i.e. Expand/Collapse view or Wide view
   */


  Filter.prototype._determineFilterLayout = function _determineFilterLayout() {
    this.currentBreakpoint = (0, _breakpoint.get)(window.innerWidth);

    switch (this.currentBreakpoint) {
      case 'xs':
        this._curCol = 1;
        break;
      case 'sm':
        this._curCol = 2;
        break;
      case 'md':
        this._curCol = 3;
        break;
      default:
        this._curCol = 4;
        break;
    }

    if (this._curCol <= 1) {
      // Display expand-collapse filter
      if (!this._isDropdownState) {
        this._applyExpandCollapseLayout();
        this._showModule();
      }
    } else {
      // Display wide-screen filter
      if (this._expandCollapseState) {
        this._removeExpandCollapseLayout();
      }

      if ((0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
        clearTimeout(this._timeout);
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
      }

      this._showModule();

      if (!this.extraModulesExpanded) {
        this._hideModule(this._curCol, this._maxCol - 1);
      }
    }

    // Determine whether to show or hide View More/Less buttons
    if (!this._isDropdownState) {
      var hiddenModules = document.querySelectorAll('.spark-filter-module.hide');

      if (!this.extraModulesExpanded && hiddenModules.length === 0) {
        (0, _addClass2.default)(this._viewMoreButton, 'hide');
      } else if (!this.extraModulesExpanded && hiddenModules.length > 0) {
        (0, _removeClass2.default)(this._viewMoreButton, 'hide');
      }
    }
  };

  /**
   * Update the filter layout as necessary
   */


  Filter.prototype._updateFilterLayout = function _updateFilterLayout() {
    this._determineFilterLayout();
  };

  /**
   * Expand or collapse extra filters
   */


  Filter.prototype._toggleView = function _toggleView() {
    if (this._isFilterExpanded && !this.extraModulesExpanded) {
      this._showModule();
      this._dispatchVisibilityEvent();
    } else if (this._isFilterExpanded && this.extraModulesExpanded) {
      this._hideModule(this._curCol, this._maxCol - 1);
    }

    this.extraModulesExpanded = !this.extraModulesExpanded;
    (0, _toggleClass2.default)(this._viewMoreButton, 'hide');
    (0, _toggleClass2.default)(this._viewLessButton, 'hide');
  };

  /**
   * Handle click event when filter toggles are clicked
   */


  Filter.prototype.toggleFilterClick = function toggleFilterClick() {
    if (this.initializingFilter) {
      this.initializingFilter = false;
    }

    this.toggleFilter();
  };

  /**
   * To hide or show filter module
   * @params {String} toggle; collapse; expand;
   * @params {Boolean} Change the value of `this._isFilterExpanded` based on the boolean value
   */


  Filter.prototype.toggleFilter = function toggleFilter(option, noStateChange) {
    if ((0, _hasClass2.default)(this.el, 'spark-filter--initializing') && !this.initializingFilter) {
      (0, _removeClass2.default)(this.el, 'spark-filter--initializing');
      (0, _addClass2.default)(this.el, 'spark-filter--initialized');
    }

    if (option === 'expand') {
      if (!this.initializingFilter) {
        (0, _removeClass2.default)(this._filterContent, 'hide');

        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand'
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      } else {
        (0, _removeClass2.default)(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = true;
      }
    } else if (option === 'collapse') {
      if (!this.initializingFilter) {
        (0, _addClass2.default)(this._filterContent, 'hide');

        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse'
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      } else {
        (0, _addClass2.default)(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = false;
      }
    } else {
      (0, _toggleClass2.default)(this._filterContent, 'hide');

      if ((0, _hasClass2.default)(this.el, 'filter-expanded')) {
        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse'
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      } else {
        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand'
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      }

      if (!noStateChange) {
        this._isFilterExpanded = !this._isFilterExpanded;

        if ((0, _hasClass2.default)(this.el, 'spark-filter--dropdown') && !(0, _hasClass2.default)(this._filterContent, 'hide')) {
          this._calculateApplyBtnPosition();
        }
      }
    }

    if (!(0, _hasClass2.default)(this.el, 'spark-filter--dropdown') && (0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
      clearTimeout(this._timeout);
      this._filterFooter.removeAttribute('style');
      this._buttonGroupEl.removeAttribute('style');
      (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
    }

    this._dispatchVisibilityEvent();
  };

  /**
   * On-resize handler that updates layout as needed based on screen dimensions
   */


  Filter.prototype._onResize = function _onResize() {
    this._updateFilterLayout();
  };

  /**
   * On-scroll handler that determines Apply button positioning at the xs breakpoint
   */


  Filter.prototype._onScroll = function _onScroll() {
    if (this._isDropdownState) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  };

  /**
   * Callback triggered after the expansion of a module at the xs breakpoint
   */


  Filter.prototype._onAfterExpand = function _onAfterExpand() {
    if (!(0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  };

  /**
   * Callback triggered after the collapse of a module at the xs breakpoint
   */


  Filter.prototype._onAfterCollapse = function _onAfterCollapse() {
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  };

  /**
   * Callback triggered after Show all is complete at the xs breakpoint
   */

  /* TODO: This is not required anymore as show all is not available at the xs breakpoint anymore
  _onShowAllComplete() {
    if(this._isDropdownState) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  }
  */

  /**
   * Dispatch a custom event so content inside the Filter can respond
   */


  Filter.prototype._dispatchVisibilityEvent = function _dispatchVisibilityEvent() {
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.el.dispatchEvent(e);
  };

  /**
   * Calculate the position of the Apply button at the xs breakpoint
   */


  Filter.prototype._calculateApplyBtnPosition = function _calculateApplyBtnPosition() {

    var filterOffsets = this.el.getBoundingClientRect();

    if (filterOffsets.height > 255) {
      // 3 collapsed module heights + filter header height = 255
      var windowHeight = window.innerHeight;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var filterHiddenBefore = scrollTop - (filterOffsets.top + document.body.scrollTop);
      var filterHiddenAfter = filterOffsets.top + document.body.scrollTop + filterOffsets.height - (scrollTop + windowHeight);

      if (!(scrollTop > filterOffsets.top + document.body.scrollTop + filterOffsets.height || filterOffsets.top + document.body.scrollTop > scrollTop + window.innerHeight)) {
        var percentInView = 100;
        var inViewport;
        var hiddenBefore = 0;
        var hiddenAfter = 0;

        if (filterHiddenBefore > 0) {
          percentInView -= filterHiddenBefore * 100 / filterOffsets.height;
          hiddenBefore = filterHiddenBefore;
        }

        if (filterHiddenAfter > 0) {
          percentInView -= filterHiddenAfter * 100 / filterOffsets.height;
          hiddenAfter = filterHiddenAfter;
        }

        inViewport = (filterOffsets.height - (hiddenAfter + hiddenBefore)) / windowHeight * 100;
      }

      if (filterOffsets.bottom > (window.innerHeight || document.documentElement.clientHeight) && (percentInView > 45 || inViewport > 50)) {
        var buttonGroupHeight = this._buttonGroupEl.offsetHeight;
        var filterWidth = filterOffsets.width;

        this._filterFooter.style.height = buttonGroupHeight + 'px';
        (0, _addClass2.default)(this._buttonGroupEl, 'is-fixed');
        this._buttonGroupEl.style.width = filterWidth - 2 + 'px'; // accounting for border width
        this._buttonGroupEl.style.left = filterOffsets.left + 1 + 'px'; // accounting for left border

        this._applyBtnPositionFixed();
      } else {
        this._applyBtnPositionRelative();
      }
    }
  };

  /**
   * Set position:relative for the Apply button
   */


  Filter.prototype._applyBtnPositionRelative = function _applyBtnPositionRelative() {

    //function attachApplyBtn(){
    var currentButtonPosition = parseInt(getComputedStyle(this._buttonGroupEl).bottom);
    var listBottom = this._modulesContainer.getBoundingClientRect().bottom;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var buttonGroupHeight = this._buttonGroupEl.getBoundingClientRect().height;
    var distanceToMove = viewportHeight - (listBottom + buttonGroupHeight);

    if (!isNaN(currentButtonPosition)) {
      var animationListener = function animationListener() {
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
        (0, _removeClass2.default)(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
        this._buttonGroupEl.removeEventListener('animationend', animationListener);
      };

      this._buttonGroupEl.addEventListener('animationend', animationListener.bind(this), false);

      var keyframe = '-webkit-transform: translateY(-' + distanceToMove + 'px); transform: translateY(-' + distanceToMove + 'px);';

      this._buttonGroupEl.setAttribute('style', this._buttonGroupEl.getAttribute('style') + ' ' + keyframe);
      (0, _addClass2.default)(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
    }
  };

  /**
   * Set position:fixed for the Apply button
   */


  Filter.prototype._applyBtnPositionFixed = function _applyBtnPositionFixed() {
    var requestID = requestAnimationFrame(moveApplyBtn.bind(this));
    var incrementer = .1;

    function moveApplyBtn() {
      incrementer += .01;
      var currentButtonPosition = parseInt(getComputedStyle(this._buttonGroupEl).bottom);
      var buttonHeight = parseInt(getComputedStyle(this._buttonGroupEl).height);

      if (currentButtonPosition < buttonHeight * -1) {
        currentButtonPosition = buttonHeight * -1;
      }

      if (currentButtonPosition > -1) {
        this._buttonGroupEl.style.bottom = '0px';
        cancelAnimationFrame(requestID);
      } else if (currentButtonPosition < 0) {
        currentButtonPosition += 1 / incrementer;
        this._buttonGroupEl.style.bottom = currentButtonPosition + 'px';
        requestAnimationFrame(moveApplyBtn.bind(this));
      }
    }
  };

  /**
   * Callback for Clear all
   */


  Filter.prototype._onClearAll = function _onClearAll() {
    (this.onClearAll || noop)();
  };

  /**
   * Show all modules
   */


  Filter.prototype._showModule = function _showModule() {
    for (var i = 0; i < this.moduleEls.length; i++) {
      (0, _removeClass2.default)(this.moduleEls[i], 'hide');
    }
  };

  /**
   * Hide certain modules
   * @param {Number} start index
   * @param {Number} end index
   */


  Filter.prototype._hideModule = function _hideModule(start, end) {
    end = end || this.moduleEls.length - 1;
    for (var i = start; i <= end; i++) {
      (0, _addClass2.default)(this.moduleEls[i], 'hide');
    }
  };

  /**
   * Apply Expand/Collapse layout for the filter
   * Used when the filter gets to the xs breakpoint
   */


  Filter.prototype._applyExpandCollapseLayout = function _applyExpandCollapseLayout() {
    (0, _addClass2.default)(this.el, 'spark-filter--dropdown');
    this._expandCollapseState = true;

    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        (0, _addClass2.default)(tags[i], 'hide');
      }
      (0, _removeClass2.default)(this._tagsCounter, 'hide');
    }

    (0, _addClass2.default)(this._viewMoreButton, 'hide');
    (0, _addClass2.default)(this._viewLessButton, 'hide');

    if (this._applyFiltersButton) {
      (0, _removeClass2.default)(this._applyFiltersButton, 'spark-btn--sm');
      (0, _addClass2.default)(this._applyFiltersButton, 'spark-btn--block');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._applyExpand();
    }

    this._isDropdownState = true;
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  };

  /**
   * Remove Expand/Collapse layout and apply the horizontal layout for the filter
   * Used when the screen size is larger than the xs breakpoint
   */


  Filter.prototype._removeExpandCollapseLayout = function _removeExpandCollapseLayout() {

    (0, _removeClass2.default)(this.el, 'spark-filter--dropdown');
    this._expandCollapseState = false;
    this._filterFooter.removeAttribute('style');
    this._buttonGroupEl.removeAttribute('style');
    (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');

    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        (0, _removeClass2.default)(tags[i], 'hide');
      }
      (0, _addClass2.default)(this._tagsCounter, 'hide');
    }

    if (this.extraModulesExpanded) {
      (0, _removeClass2.default)(this._viewLessButton, 'hide');
    } else {
      (0, _removeClass2.default)(this._viewMoreButton, 'hide');
    }

    if (this._applyFiltersButton) {
      (0, _addClass2.default)(this._applyFiltersButton, 'spark-btn--sm');
      (0, _removeClass2.default)(this._applyFiltersButton, 'spark-btn--block');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._disapplyExpand();
    }
    this._isDropdownState = false;
  };

  /**
   * Generate a tag element in filter, which will be directly posted inside `.spark-filter__tags-container`
   * @param {string} input name - Name of the input to allow any callbacks to target input specifically
   * @param {string} tag label - The label to be displayed in the tag. This could be the input's label or another user defined label
   * @param {function} callback function for `X` button
   */


  Filter.prototype.createTagEl = function createTagEl(input, label, clearCallback) {
    var tagEl = document.createElement('div');
    tagEl.className = (0, _hasClass2.default)(this.el, 'spark-filter--dropdown') ? 'spark-filter__tag hide' : 'spark-filter__tag';
    tagEl.setAttribute('data-filter-name', input);
    tagEl.innerHTML = '<span class="spark-filter__tag__label">' + label + '</span><i class="spark-icon spark-filter__tag__close"></i>';

    this._tagsContainer.insertBefore(tagEl, this._clearAllButton);

    // create event listener after adding element to DOM
    tagEl.querySelector('.spark-filter__tag__close').addEventListener('click', clearCallback || noop);

    (0, _removeClass2.default)(this._clearAllButton, 'hide');

    // Show tag count if on small screen and this is initial application of filters
    if ((0, _hasClass2.default)(this.el, 'spark-filter--dropdown')) (0, _removeClass2.default)(this._tagsCounter, 'hide');
  };

  /**
   * Remove all tags
   */


  Filter.prototype.clearAllTagEls = function clearAllTagEls() {
    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    for (var i = 0; i < tags.length; i++) {
      this._tagsContainer.removeChild(tags[i]);
    }

    // Reset counter
    var counter = this._tagsContainer.querySelector('span');
    counter.innerHTML = '0';

    (0, _addClass2.default)(this._clearAllButton, 'hide');
    (0, _addClass2.default)(this._tagsCounter, 'hide');
  };

  /**
   * Show Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.showModuleClearButton = function showModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].enableClearBtn();
      }
    }
  };

  /**
   * Disable Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.disableModuleClearButton = function disableModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].disableClearBtn();
      }
    }
  };

  /**
   * Hide Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.hideModuleClearButton = function hideModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].hideClearBtn();
      }
    }
  };

  /**
   * Get Module Clear button status
   *  @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.moduleClearButtonStatus = function moduleClearButtonStatus(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        return this.moduleInsts[i].getClearButtonStatus();
      }
    }
  };

  return Filter;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Filter.prototype._whitelistedParams = ['onClearAll', 'moduleOptions'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Filter.prototype.defaults = {
  el: null,
  moduleEls: [],
  _filterToggleContainer: null,
  _toggleFilterButton: null,
  _toggleFilterLabel: null,
  _tagsContainer: null,
  _tagsCounter: null,
  _clearAllButton: null,
  _filterContent: null,
  _modulesContainer: null,
  _viewMoreButton: null,
  _viewLessButton: null,
  _filterFooter: null,
  _buttonGroupEl: null,
  _applyFiltersButton: null,
  moduleInsts: [],
  moduleOptions: [],
  maxCol: 4,
  onClearAll: noop,
  extraModulesExpanded: false,
  _isFilterExpanded: false,
  _isDropdownState: false,
  _isModuleExpand: true,
  _curCol: 4,
  _onResizeBound: null,
  _toggleViewBound: null,
  _toggleFilterClickBound: null,
  _onClearAllBound: null,
  _onScrollBound: null
};

exports.default = Filter;
module.exports = exports['default'];


},{"../helpers/animation/height":6,"../helpers/dom/add-class":7,"../helpers/dom/breakpoint":8,"../helpers/dom/has-class":9,"../helpers/dom/remove-class":11,"../helpers/dom/toggle-class":12,"./base":1,"./filter-module":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Show content in a modal.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Modal(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/modal.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Modal = function (_BaseComponent) {
  _inherits(Modal, _BaseComponent);

  /**
   * Modal constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Modal(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Modal);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Open
   */


  Modal.prototype.open = function open() {

    this.isActive = true;
    document.activeElement ? this.focusedElBeforeOpen = document.activeElement : null;

    var modalFocusableEls = this.modalEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    if (modalFocusableEls.length > 0) {
      this.modalFocusableEls = Array.prototype.slice.call(modalFocusableEls);
      this.firstModalFocusableEl = this.modalFocusableEls[0];
      this.lastModalFocusableEl = this.modalFocusableEls[this.modalFocusableEls.length - 1];
    }

    this._addWindowEventListeners();
    this._updateClasses();
    (0, _addClass2.default)(document.body, 'spark-modal-open');

    // Set focus to close button once modal has been displayed
    if (modalFocusableEls.length > 0) {
      this.firstModalFocusableEl.focus();
    }

    return this;
  };

  /**
   * Close
   */


  Modal.prototype.close = function close() {

    this.isActive = false;
    this.focusedElBeforeOpen ? this.focusedElBeforeOpen.focus() : null;
    this._removeWindowEventListeners();
    this._updateClasses();
    (0, _removeClass2.default)(document.body, 'spark-modal-open');

    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   * @param {Object} params
   */


  Modal.prototype.update = function update(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    this._removeEventListeners();
    this._cacheElements(el || this.el, params);
    this._addEventListeners();
    this._updateClasses();
    this._removeWindowEventListeners();

    if (this.isActive) {
      this._addWindowEventListeners();
    }

    return this;
  };

  /**
   * Store a reference to the element. Either a modal itself
   * or a button referencing a modal may be passed.
   * @param {Element} el
   * @param {Element} params @optional
   */


  Modal.prototype._cacheElements = function _cacheElements(el, params) {

    var modalPassed = (0, _hasClass2.default)(el, 'spark-modal');
    var modalEl = params.modalEl;

    if (modalPassed) {
      this.modalEl = el;
    } else {
      this.el = el;
      this.modalEl = modalEl || document.querySelector(el.getAttribute('data-modal'));
    }

    this.scrollEl = this.modalEl.querySelector('.spark-modal__scroll') || this.modalEl;

    this.isActive = (0, _hasClass2.default)(this.el || this.modalEl, 'active');
  };

  /**
   * Update classes for the open or close state.
   */


  Modal.prototype._updateClasses = function _updateClasses() {
    (0, _toggleClass2.default)(this.modalEl, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Modal.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onKeyupBound = this._onKeyup.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onModalClickBound = this._onModalClick.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Modal.prototype._addEventListeners = function _addEventListeners() {
    if (this.el) this.el.addEventListener('click', this._onClickBound);
    if (this.modalEl) this.modalEl.addEventListener('click', this._onModalClickBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Modal.prototype._removeEventListeners = function _removeEventListeners() {
    if (this.el) this.el.removeEventListener('click', this._onClickBound);
    if (this.modalEl) this.modalEl.removeEventListener('click', this._onModalClickBound);
  };

  /**
   * Add event listeners for DOM events.
   */


  Modal.prototype._addWindowEventListeners = function _addWindowEventListeners() {
    this._removeWindowEventListeners();
    window.addEventListener('keyup', this._onKeyupBound);
    window.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Modal.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('keyup', this._onKeyupBound);
    window.removeEventListener('keydown', this._onKeydownBound);
  };

  /**
   * When the button is clicked.
   * @param {Object} e
   */


  Modal.prototype._onClick = function _onClick() {
    this.open();
  };

  /**
   * When we are clicked, toggle the opened state.
   * @param {Object} e
   */


  Modal.prototype._onModalClick = function _onModalClick(e) {

    // The close button is clicked or the actual modal (gray area)
    if (e.target === this.scrollEl || e.target === this.modalEl || (0, _getParent2.default)(e.target, '.spark-modal__close, .spark-modal__dismiss', this.scrollEl)) {
      e.preventDefault();
      this.close();
    }
  };

  /**
   * When tabbing backwards, localize traversal to modal elements only
   * @param {Object} e
   */


  Modal.prototype._onBackwardTab = function _onBackwardTab(e) {
    if (document.activeElement === this.firstModalFocusableEl) {
      e.preventDefault();
      this.lastModalFocusableEl.focus();
    }
  };

  /**
   * When tabbing forwards, localize traversal to modal elements only
   * @param {Object} e
   */


  Modal.prototype._onForwardTab = function _onForwardTab(e) {
    if (document.activeElement === this.lastModalFocusableEl) {
      e.preventDefault();
      this.firstModalFocusableEl.focus();
    }
  };

  /**
   * When a key is pressed on the window and it's an ESC, close the modal.
   * @param {Object} e
   */


  Modal.prototype._onKeyup = function _onKeyup(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  };

  /**
   * When a key is pressed and it is the Tab key or Shift+Tab keys, determine whether to adjust focus
   * @param {Object} e
   */


  Modal.prototype._onKeydown = function _onKeydown(e) {
    if (e.keyCode === 9) {
      if (this.modalFocusableEls.length === 1) {
        e.preventDefault();
      }

      if (e.shiftKey) {
        this._onBackwardTab(e);
      } else {
        this._onForwardTab(e);
      }
    }

    if (e.keyCode === 13) {
      if (e.target === document.querySelector('.spark-modal__close') || e.target === document.querySelector('.spark-modal__dismiss')) {
        e.preventDefault();
        this.close();
      }
    }
  };

  return Modal;
}(_base2.default);

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */


Modal.prototype.defaults = {
  el: null,
  modalEl: null,
  scrollEl: null,
  isActive: false,
  _onClickBound: null,
  _onKeyupBound: null,
  _onKeydownBound: null,
  _onModalClickBound: null
};

exports.default = Modal;
module.exports = exports['default'];


},{"../helpers/dom/add-class":7,"../helpers/dom/has-class":9,"../helpers/dom/remove-class":11,"../helpers/dom/toggle-class":12,"../helpers/traversal/get-parent":13,"./base":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _outerHeight = require('../dom/outer-height');

var _outerHeight2 = _interopRequireDefault(_outerHeight);

var _addClass = require('../dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {}; /**
                                * # Animate Height
                                * Animate the height of an element since we can't do this w/ pure CSS. Sigh.
                                *
                                * @example
                                * animateHeight({
                                *   el: ...,
                                *   toggleEl: ...,
                                *   // Optional params
                                *   action: 'collapse'|'expand',
                                *   heightAnimationClass: 'spark-animate-height',
                                *   opacityAnimationClass: 'spark-animate-opacity',
                                *   toggleProperty: 'display'|'overflow'|'visibility',
                                *   toggleValue: 'block'|'none'|'visible'|'hidden',
                                *   animationDuration: 250
                                * });
                                *
                                * @module helpers/animation/height.js
                                */

var runningAnimations = {
  els: [],
  completeCallbacks: []
};

/**
 * Get the inverse toggle value
 * @param  {String} property
 * @param  {String} originalValue
 * @return {String}
 */
function getInverseToggleValue(el, property, originalValue) {

  // Get the value to toggle to for the given property
  switch (property) {
    case 'overflow':
    case 'visibility':
      return originalValue === 'visible' ? 'hidden' : 'visible';
    default:
      return originalValue === 'block' || originalValue === 'inline-block' ? 'none' : 'block';
  }
}

/**
 * When an animation is complete, clean up and run the callback.
 * @param  {Object} params
 */
function onComplete(params) {

  // Reset toggle el visibility
  if (params.toggleClassName) {
    (0, _toggleClass2.default)(params.el, params.toggleClassName, !params.collapse);
  } else {
    params.toggleEl.style[params.toggleProperty] = '';
  }

  // Remove the height property
  params.el.style.height = '';
  params.toggleEl.style.height = '';
  params.toggleEl.style.marginBottom = '';
  params.toggleEl.style.marginTop = '';

  // Remove the spark-animate-height class so the transitions no longer apply
  (0, _removeClass2.default)(params.el, params.heightAnimationClass);
  (0, _removeClass2.default)(params.toggleEl, params.heightAnimationClass);

  // Run the callback
  params.onComplete();

  // Remove the element and callback from their respective arrays
  var runningIndex = runningAnimations.els.indexOf(params.el);
  runningAnimations.els.splice(runningIndex, 1);
  runningAnimations.completeCallbacks.splice(runningIndex, 1);
}

/**
 * @param {Object} params
 */
function animateHeight(params) {

  params = params || {};

  var el = params.el;

  if (!el) {
    return;
  }

  var collapse = params.action && params.action === 'collapse';
  var heightAnimationClass = params.heightAnimationClass || 'spark-animate-height';

  // Allow for elements to be passed or selector strings
  var toggleEl = typeof params.toggleEl === 'string' ? el.querySelector(params.toggleEl) : params.toggleEl;

  // No element to be switching with toggling so we can't determine the desired height to animate to.
  if (!toggleEl || (0, _hasClass2.default)(el, 'spark-no-animate')) {
    return;
  }

  var toggleClassName = params.toggleClass;

  // The style property to use when toggling visibility
  var toggleProperty = params.toggleProperty || 'display';
  var toggleStyles = window.getComputedStyle(toggleEl);
  var originalToggleValue = toggleStyles[toggleProperty];
  var toggleValue = params.toggleValue || getInverseToggleValue(toggleProperty, originalToggleValue);

  // If we are already animating, stop now.
  var runningIndex = runningAnimations.els.indexOf(el);
  if (runningIndex !== -1) {

    var completeCallback = runningAnimations.completeCallbacks[runningIndex];
    if (completeCallback) {
      clearTimeout(completeCallback);
    }

    onComplete({
      el: el,
      toggleEl: toggleEl,
      onComplete: params.onComplete || noop,
      collapse: collapse,
      toggleProperty: toggleProperty,
      toggleClassName: toggleClassName,
      toggleValue: toggleValue,
      heightAnimationClass: heightAnimationClass
    });
  }

  // Store the current height
  var originalHeight = (0, _outerHeight2.default)(el);

  // Toggle the visible property
  if (toggleClassName) {
    (0, _toggleClass2.default)(el, toggleClassName, !collapse);
  } else {
    toggleEl.style[toggleProperty] = toggleValue;
  }

  // When measuring the size for a collapse, we have to wait a tic for it to be
  // accurate. Not sure why. Ugh.
  if (collapse) {
    setTimeout(runAnimation, 0);
  } else {
    runAnimation();
  }

  function runAnimation() {

    // Now that the toggle el is taking up space, get the new height which we will be animating to
    var targetElHeight = (0, _outerHeight2.default)(el);

    // We need to store the original and target toggle element heights. They differ depending on
    // whether we are going to expand or collapse.
    var targetToggleElHeight = void 0;
    var originalToggleElHeight = void 0;

    // If we are collapsing, reset the toggle style and set it when we're done. Set the height so
    // that we can animate down to 0 or up to the target height.
    if (collapse) {

      if (toggleClassName) {
        (0, _removeClass2.default)(el, toggleClassName);
      } else {
        toggleEl.style[toggleProperty] = originalToggleValue;
      }

      originalToggleElHeight = (0, _outerHeight2.default)(toggleEl, toggleStyles);
      targetToggleElHeight = 0;
    } else {
      targetToggleElHeight = (0, _outerHeight2.default)(toggleEl, toggleStyles);
      originalToggleElHeight = 0;
    }

    // Set the original height
    el.style.height = originalHeight + 'px';
    toggleEl.style.height = originalToggleElHeight + 'px';
    toggleEl.style.marginBottom = '0px';
    toggleEl.style.marginTop = '0px';

    // Add the spark-animate-height class which will setup the transition-property and duration
    (0, _addClass2.default)(el, heightAnimationClass);
    (0, _addClass2.default)(toggleEl, heightAnimationClass);

    runningAnimations.els.push(el);

    // We need to wait a tick to toggle the height or else the animation class won't function
    setTimeout(function () {

      // Set the height to the target height
      el.style.height = targetElHeight + 'px';
      toggleEl.style.height = targetToggleElHeight + 'px';

      // Remove inline styles after the animation is complete
      runningAnimations.completeCallbacks.push(setTimeout(function () {
        onComplete({
          el: el,
          toggleEl: toggleEl,
          onComplete: params.onComplete || noop,
          collapse: collapse,
          toggleProperty: toggleProperty,
          toggleClassName: toggleClassName,
          toggleValue: toggleValue,
          heightAnimationClass: heightAnimationClass
        });
      }, params.animationDuration !== undefined ? params.animationDuration : 201));
    }, 0);
  }
}

exports.default = animateHeight;
module.exports = exports['default'];


},{"../dom/add-class":7,"../dom/has-class":9,"../dom/outer-height":10,"../dom/remove-class":11,"../dom/toggle-class":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

var _hasClass = require('./has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Add Class
 * Add a class on an element.
 *
 * @param {Element|Array} el An element or array of elements to update.
 * @param {String} name
 * @return {Element}
 *
 * @module helpers/dom/add-class.js
 */

var ws = /\s+/;
var cleanup = /\s{2,}/g;

function addClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) {
      el.classList.add(name[0]);
    }
    return el;
  }

  var toAdd = [];
  var i = 0;
  var l = name.length;
  var item = void 0;
  var clsName = typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '';

  // see if we have anything to add
  for (; i < l; i++) {
    item = name[i];
    if (item && !(0, _hasClass2.default)(clsName, item)) {
      toAdd.push(item);
    }
  }

  if (toAdd.length) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = addClass;
module.exports = exports['default'];


},{"../util/trim":16,"./has-class":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Breakpoint Helpers
 * Find the active breakpoint.
 *
 * @param {Number} width
 *
 * @module helpers/dom/breakpoint.js
 */

/**
 * Breakpoints being used in the CSS.
 * @type {Object}
 */
var defaultBreakpoints = {
  xs: {
    min: 0,
    max: 543
  },
  sm: {
    min: 544,
    max: 795
  },
  md: {
    min: 796,
    max: 1047
  },
  lg: {
    min: 1048,
    max: 1799
  },
  xl: {
    min: 1800,
    max: Infinity
  }
};

function get(width, breakpoints) {

  breakpoints = breakpoints || defaultBreakpoints;

  var i = void 0;

  for (i in breakpoints) {
    if (width >= breakpoints[i].min && width <= breakpoints[i].max) {
      return i;
    }
  }
}

exports.get = get;


},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * # Has Class
 * See if an element has a class.
 *
 * @param {Element|String} el
 * @param {String} name
 * @return {Boolean}
 *
 * @module helpers/dom/has-class.js
 */
function hasClass(el, name) {
  var cName = ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' ? el.className || el.getAttribute && el.getAttribute('class') || '' : el || '').replace(/[\t\r\n\f]/g, ' ');
  return (' ' + cName + ' ').indexOf(' ' + name + ' ') !== -1;
}

exports.default = hasClass;
module.exports = exports['default'];


},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = ['marginTop', 'marginBottom', 'borderTop', 'borderBottom']; /**
                                                                         * # Outer Height
                                                                         * Get the outer height of an element (including margin and border)
                                                                         *
                                                                         * @param {Element} el
                                                                         * @param {Object} styles Optional Already have computed styles? Pass them in.
                                                                         *
                                                                         * @example
                                                                         * outerHeight(el, computedStyles);
                                                                         *
                                                                         * @module helpers/outer-height.js
                                                                         */


function outerHeight(el, styles) {

  styles = styles || window.getComputedStyle(el);

  var height = el.clientHeight;

  (0, _each2.default)(props, function (prop) {
    height += parseInt(styles[prop] || 0, 10);
  });

  return height;
}

exports.default = outerHeight;
module.exports = exports['default'];


},{"../util/each":15}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = /\s+/; /**
                 * # Remove Class
                 * Remove a class on an element.
                 *
                 * @param {Element|Array} el An element or array of elements to update.
                 * @param {String} name
                 * @return {Element}
                 *
                 * @module helpers/dom/remove-class.js
                 */

var cleanup = /\s{2,}/g;

function removeClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) el.classList.remove(name[0]);
    return el;
  }

  // store two copies
  var clsName = ' ' + (typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '') + ' ';
  var result = clsName;
  var current = void 0;
  var start = void 0;
  for (var i = 0, l = name.length; i < l; i++) {
    current = name[i];
    start = current ? result.indexOf(' ' + current + ' ') : -1;
    if (start !== -1) {
      start += 1;
      result = result.slice(0, start) + result.slice(start + current.length);
    }
  }

  // only write if modified
  if (clsName !== result) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)(result.replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)(result.replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = removeClass;
module.exports = exports['default'];


},{"../util/trim":16}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasClass = require('./has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _addClass = require('./add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('./remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toggleClass(el, name, enable) {

  if (!el) {
    return;
  }

  // If we're passed an array, toggle the class on each.
  if (el instanceof NodeList || el instanceof Array) {

    for (var i = 0, len = el.length; i < len; i++) {
      toggleClass(el[i], name, enable);
    }

    return;
  }

  var action = void 0;
  if (enable !== undefined) {
    enable = typeof enable === 'function' ? enable.call(null, el) : enable;
    action = enable ? 'add' : 'remove';
  } else {
    action = (0, _hasClass2.default)(el, name) ? 'remove' : 'add';
  }

  return (action === 'add' ? _addClass2.default : _removeClass2.default)(el, name);
} /**
   * # Toggle Class
   * Toggle a class on an element given a condition.
   *
   * @param {Element|Array} el An element or array of elements to update.
   * @param {String} name
   * @param {Boolean} enable
   * @return {Element}
   *
   * @module  helpers/dom/toggle-class.js
   */

exports.default = toggleClass;
module.exports = exports['default'];


},{"./add-class":7,"./has-class":9,"./remove-class":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParent(parent, query, limitEl) {

  limitEl = limitEl instanceof Array ? limitEl : [limitEl || document.body];

  while (parent) {

    if ((0, _matches2.default)(parent, query)) {
      return parent;
    }

    if (limitEl.indexOf(parent) !== -1) {
      return false;
    }

    parent = parent.parentNode;
  }

  return false;
} /**
   * # Get Parent
   * See if an element has another element for a parent.
   *
   * @param {Element} parent
   * @param {String} query
   * @param {Array|Element} limitEl The last element we should check.
   * @return {Boolean|Element}
   *
   * @module helpers/traversal/get-parent.js
   */

exports.default = getParent;
module.exports = exports['default'];


},{"./matches":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Matches
 * See if an element matches a query selector.
 *
 * @param {Element} el
 * @param {String} query
 * @return {Boolean}
 *
 * @module helpers/traversal/matches.js
 */
var vendorMatch = typeof Element !== 'undefined' && (Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector);

function matches(el, query) {

  if (vendorMatch) return vendorMatch.call(el, query);

  var nodes = el.parentNode ? el.parentNode.querySelectorAll(query) : [];

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] === el) return true;
  }

  return false;
}

exports.default = matches;
module.exports = exports['default'];


},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Each
 * Apply a callback function to a list of any kind: Array, NodeList, HTMLCollection or Object.
 *
 * @param {Array|NodeList|HTMLCollection|Object} list
 * @param {Function} cb
 *
 * @example
 * each([], callback);
 * each(el.children, callback);
 * each(el.childNodes, callback);
 * each({}, callback);
 *
 * @module helpers/util/each.js
 */
function each(list, cb) {

  if (!list) {
    return;
  }

  if (typeof cb !== 'function') {
    throw new Error('Cannot invoke `each` without a callback!');
  }

  var i = 0;
  var len = list.length;

  // Object
  if (len === undefined) {
    for (i in list) {
      if (i !== 'prototype' && list.hasOwnProperty(i)) {
        cb(i, list[i]);
      }
    }
  }
  // Array-like
  else {
      for (; i < len; i++) {
        cb(list[i]);
      }
    }
}

exports.default = each;
module.exports = exports['default'];


},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Trim
 * Trim whitespace on a string.
 *
 * @param {String} str
 *
 * @module helpers/util/trim.js
 */

var trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

function trim(str) {
  return str.replace(trimRE, '');
}

exports.default = trim;
module.exports = exports['default'];


},{}]},{},[4])(4)
});

//# sourceMappingURL=filter.js.map
