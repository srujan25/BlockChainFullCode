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

var _expand = require('./expand');

var _expand2 = _interopRequireDefault(_expand);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Filter Module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Major part of filter
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
   * Store a reference to the whole filter
   * @param {Element} el
   */


  FilterModule.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this._showAllEl = this.el.querySelector('.spark-filter-module__show-all');
    this._clearEl = this.el.querySelector('.spark-filter-module__clear');
    this._hiddenEls = Array.prototype.slice.call(this.el.querySelectorAll('.spark-filter-module--hide'));
    this._headerEl = this.el.querySelector('.spark-filter-module__header');
    this._bodyEl = this.el.querySelector('.spark-filter-module__body');
    this._modalEl = this.el.querySelector('.spark-modal');
    if (this.onShowAll === 'modal') {
      this.modalInst = new _modal2.default(this._showAllEl);
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
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  FilterModule.prototype._addEventListeners = function _addEventListeners() {
    !this._showAllEl || this._showAllEl.addEventListener('click', this._onShowAllBound);
    !this._clearEl || this._clearEl.addEventListener('click', this._onClearBound);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  FilterModule.prototype._removeEventListeners = function _removeEventListeners() {
    if (this._showAllEl) {
      this._showAllEl.removeEventListener('click', this._onShowAllBound);
      this._clearEl.removeEventListener('click', this._onClearBound);
    }
  };

  /*
   * Callback after clicking `show all` link
   */


  FilterModule.prototype._onShowAll = function _onShowAll() {
    if (typeof this.onShowAll === 'function') {
      (this.onShowAll || noop)(this);
    } else {
      if (this.onShowAll === 'toggle' || this.onShowAll === 'modal' && this._isExpand) {
        this.toggleHiddenContent();
      }
    }
  };

  /*
   * callback after clicking `clear` button
   */


  FilterModule.prototype._onClear = function _onClear() {
    (this.onClear || noop)(this);
  };

  /*
   * enable clear button
   */


  FilterModule.prototype.enableClarBtn = function enableClarBtn() {
    (0, _removeClass2.default)(this._clearEl, 'spark-filter-module__clear--disabled');
  };

  /*
   * disable clear button
   */


  FilterModule.prototype.disableClearBtn = function disableClearBtn() {
    (0, _addClass2.default)(this._clearEl, 'spark-filter-module__clear--disabled');
  };

  /*
   * Hide or show hidden element, basic for `show-all` link
   *
   */


  FilterModule.prototype.toggleHiddenContent = function toggleHiddenContent() {
    for (var i = 0; i < this._hiddenEls.length; i++) {
      (0, _toggleClass2.default)(this._hiddenEls[i], 'show');
    }
  };

  /*
   * Change filter-module to expand/collapse variation
   * Happens when filter change into modal variation
   */


  FilterModule.prototype._applyExpand = function _applyExpand() {
    if (this._modalEl) {
      var modalClsNames = ['spark-filter-module--hide', '', '', ''];
      this._hiddenEls.push(this._modalEl);
      var curEl = this._modalEl;
      for (var i = 0; i < modalClsNames.length; i++) {
        curEl.className = modalClsNames[i];
        curEl = curEl.firstElementChild;
      }
      this.modalInst.remove(true);
    }
    (0, _addClass2.default)(this.el, 'spark-panel', 'spark-panel--expand');
    (0, _addClass2.default)(this._headerEl, 'spark-panel__header');
    this._headerEl.setAttribute('role', 'heading');
    (0, _addClass2.default)(this._bodyEl, 'spark-panel__content');
    this._expandInst = new _expand2.default(this.el, {
      onAfterExpand: this.onAfterExpand,
      onAfterCollapse: this.onAfterCollapse
    });
    this._isExpand = true;
  };

  /*
   * Change filter-module from expand/collapse to normal variation
   *
   */


  FilterModule.prototype._disapplyExpand = function _disapplyExpand() {
    if (this._modalEl) {
      var modalClsNames = ['spark-modal', 'spark-modal__scroll', 'spark-modal__content col-xs-12 col-sm-10', 'spark-modal__body'];
      this._hiddenEls.pop();
      var curEl = this._modalEl;
      for (var i = 0; i < modalClsNames.length; i++) {
        curEl.className = modalClsNames[i];
        curEl = curEl.firstElementChild;
      }
      this.modalInst = new _modal2.default(this._showAllEl);
    }
    (0, _removeClass2.default)(this.el, 'spark-panel', 'spark-panel--expand');
    (0, _removeClass2.default)(this._headerEl, 'spark-panel__header');
    this._headerEl.removeAttribute('role');
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


FilterModule.prototype._whitelistedParams = ['onShowAll', 'onClear', 'onAfterExpand', 'onAfterCollapse'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
FilterModule.prototype.defaults = {
  el: null,
  onShowAll: noop,
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
//# sourceMappingURL=filter-module.js.map
