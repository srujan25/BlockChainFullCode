'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Step Indicator
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Set of indicators represent different steps
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new StepIndicator(el, params);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/step-indicator.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var StepIndicator = function (_BaseComponent) {
  _inherits(StepIndicator, _BaseComponent);

  /**
   * StepIndicator constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function StepIndicator(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, StepIndicator);

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._calculateStyle();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  StepIndicator.prototype.update = function update(el) {

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._parseParams();
    this._addEventListeners();
    this._calculateStyle();

    return this;
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  StepIndicator.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.containerEl = this.containerEl || el.parentNode;
    this._body = this.el.querySelector('.spark-step-indicator__body');
    this._list = this.el.querySelector('.spark-step-indicator__list');
    this._items = this.el.querySelectorAll('.spark-step-indicator__item');
  };

  /**
   * Parse parameters from the element.
   */


  StepIndicator.prototype._parseParams = function _parseParams() {
    this.type = this.type !== null ? this.type : this.el.attributes['data-type'] && this.el.attributes['data-type'].value;
    this.header = this.header !== null ? this.header : this.el.attributes['data-header'] && true;
    this.subtitle = this.subtitle !== null ? this.subtitle : this.el.attributes['data-subtitle'] && true;
    this.dropdownLabel = this.dropdownLabel !== null ? this.dropdownLabel : this.el.attributes['data-dropdownLabel'] && this.el.attributes['data-dropdownLabel'].value;

    if (!this.dropdownLabel) {
      this.dropdownLabel = 'Select a Step';
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  StepIndicator.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._onLoadBound = this._onLoad.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._toggleDropdownBound = this._toggleDropdown.bind(this);
    this._onKeydownBound = (0, _debounce2.default)(this._onKeydown.bind(this), 100);
  };

  /**
   * Add event listeners for DOM events.
   */


  StepIndicator.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);
    window.addEventListener('load', this._onLoadBound);
    this.el.addEventListener('keydown', this._onKeydownBound);
    document.addEventListener('spark.step-indicator', this._toggleDropdownBound, true);
  };

  /**
   * Remove event listeners for DOM events..
   */


  StepIndicator.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);
    document.removeEventListener('click', this._toggleDropdownBound);
    window.removeEventListener('load', this._onLoadBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
    document.removeEventListener('spark.step-indicator', this._toggleDropdownBound, true);
  };

  /**
   * Change selected step state into incomplete
   * @param {Int} index of selected step
   */


  StepIndicator.prototype._resetStepState = function _resetStepState(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this._items.length) {
      return;
    }

    (0, _removeClass2.default)(this._items[stepIndex], ['spark-step-indicator__item--completed', 'spark-step-indicator__item--current', 'spark-step-indicator__item--disabled']);
    this._items[stepIndex].removeAttribute('tabindex');
  };

  /**
   * Set selected step state: completed/current/disabled/incomplete
   * For current step, will remove current step from other steps
   * @param {Int} index of selected step
   * @param {String} state to be set
   */


  StepIndicator.prototype.setStepState = function setStepState(stepIndex, state) {
    if (stepIndex < 0 || stepIndex >= this._items.length) {
      return this;
    }
    switch (state) {
      case 'completed':
        this._resetStepState(stepIndex);
        (0, _addClass2.default)(this._items[stepIndex], 'spark-step-indicator__item--completed');
        break;
      case 'current':
        var currentStep = this._list.querySelector('.spark-step-indicator__item--current');
        (0, _removeClass2.default)(currentStep, 'spark-step-indicator__item--current');
        (0, _addClass2.default)(this._items[stepIndex], 'spark-step-indicator__item--current');
        break;
      case 'disabled':
        this._resetStepState(stepIndex);
        (0, _addClass2.default)(this._items[stepIndex], 'spark-step-indicator__item--disabled');
        this._items[stepIndex].setAttribute('tabindex', '-1');
        break;
      case 'incomplete':
        this._resetStepState(stepIndex);
        break;
    }
    this._calculateStyle();
    return this;
  };

  /**
   * When the Enter key is pressed toggle the dropdown or update the selection if in dropdown mode
   * When the Tab key is pressed, navigate to the next element by default otherwise collapse the dropdown
   * @param {Object} Reference of DOM obj
   * @param {Object} Event of click
   */


  StepIndicator.prototype._onKeydown = function _onKeydown(e) {
    if (!(0, _getParent2.default)(e.target, '.spark-step-indicator__list', this.el) && !(0, _getParent2.default)(e.target, '.spark-step-indicator__body--dropdown', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    // Enter Key
    if (code === 13) {
      if ((0, _hasClass2.default)(e.target, 'spark-step-indicator__item--dropdown__header')) {
        e.preventDefault();
        this._toggleDropdown(e);
      }
    }

    // Tab Key - Check if focus has now shifted outside of the Step Indicator Dropdown
    if (code === 9) {
      (0, _hasClass2.default)(document.activeElement, 'spark-step-indicator__item') === false && this._dropdownExpand === true ? this._toggleDropdown(e) : null;
    }
  };

  /**
   * Provide a method to bind click callback function to certain step.
   * @param {Array} a set of step indices represent the target of callback
   * @param {Function} callback function
   */


  StepIndicator.prototype.bindStepClickCallback = function bindStepClickCallback(indexArr, callback) {
    callback = callback || noop;
    for (var i = 0; i < indexArr.length; i++) {
      this._items[indexArr[i]].addEventListener('click', callback);
    }
    return this;
  };

  /**
   * Remove click callback from steps
   * @param {Array} a set of step indices represent the target of callback
   * @param {Function} callback function
   *
   */


  StepIndicator.prototype.removeStepClickCallback = function removeStepClickCallback(indexArr, callback) {
    callback = callback || noop;
    for (var i = 0; i < indexArr.length; i++) {
      this._items[indexArr[i]].removeEventListener('click', callback);
    }
    return this;
  };

  /**
   * Work for _calculateStyle.
   * Comparing the width of list and total items, including padding
   * @return {Boolean}
   */


  StepIndicator.prototype._isOverWidth = function _isOverWidth() {
    var listWidth = this._list.offsetWidth;
    var itemTotalWidth = this._listPaddingTotal;
    for (var i = 0; i < this._items.length; i++) {
      itemTotalWidth += this._items[i].offsetWidth;
    }
    if (listWidth < itemTotalWidth) {
      return true;
    }
    return false;
  };

  /**
   * Calcuate different style based settings
   */


  StepIndicator.prototype._calculateStyle = function _calculateStyle() {
    if (!this.header) {
      var titleEl = this.el.querySelector('.spark-step-indicator__title');
      titleEl.style.display = 'none';
      (0, _addClass2.default)(this._body, 'spark-step-indicator__body--no-border');
    }
    if (!this.subtitle) {
      var subtitleEl = this.el.querySelector('.spark-step-indicator__subtitle');
      subtitleEl.style.display = 'none';
    }
    // Remove special DOM and Class of dropdown variation
    this._switchFromDropdown();
    switch (this.type) {
      case 'standard-dropdown':
        this._calculateRespStyle();
        break;
      case 'large':
        this._calculateLargeStyle();
        break;
      case 'condensed':
        this._calculateCondensedStyle();
        break;
      case 'dropdown':
        this._calculateDropdownStyle();
        break;
      default:
        this._calculateStandardStyle();
    }
    // Work for IE11, detect IE11 via userAgent
    // userAgent: Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv 11.0) like Gecko
    var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
    if (isIE11) {
      this._addItemWidth();
    }
  };

  /**
   * For IE11 ONLY, Add width: 100% to work around IE11 bug
   * IE11 will have incorrect position with flex-grow max-width and justify-content when items hit max-width
   * Sometimes after calculating, even itemTotalWidth is less 1px than listWidth,
   * it also means items are fit in the list, not hit the max-width
   * So add 2px to list width when comparing to avoid this.
   */


  StepIndicator.prototype._addItemWidth = function _addItemWidth() {
    if (!(0, _hasClass2.default)(this._list, 'spark-step-indicator__list--condensed') && !(0, _hasClass2.default)(this._body, 'spark-step-indicator__body--dropdown')) {
      var listWidth = this._list.offsetWidth;
      var itemTotalWidth = this._listPaddingTotal;
      for (var i = 0; i < this._items.length; i++) {
        itemTotalWidth += this._items[i].offsetWidth;
      }
      if (listWidth - itemTotalWidth > 2) {
        this._switchWidthForIe11(0, true);
      } else {
        this._switchWidthForIe11(0, false);
      }
    } else {
      this._switchWidthForIe11(0, false);
    }
  };

  /**
   * Switch spark-step-indicator__item style width: 100% to work around IE11 bug
   * @param {Number} start index of step
   * @param {Boolean} whether add width: 100%
   */


  StepIndicator.prototype._switchWidthForIe11 = function _switchWidthForIe11(index, val) {
    for (var i = index; i < this._items.length; i++) {
      this._items[i].style.width = val ? '100%' : '';
    }
  };

  /**
   * Fix on large variation
   * Calculate node and list length remove connect line of each end
   * Sometimes after calculating, even itemTotalWidth is bigger 1px than listWidth,
   * it also means items are fit in the list, not over width.
   * So add 2px to list width when comparing to avoid this.
   * Dependency of _calculateCondensedStyle() and _calculateStandardStyle()
   *
   */


  StepIndicator.prototype._calculateLargeStyle = function _calculateLargeStyle() {
    this._list.style['flex-wrap'] = 'wrap';
    var listWidth = this._list.offsetWidth;
    var itemTotalWidth = this._listPaddingTotal;
    for (var i = 0; i < this._items.length; i++) {
      (0, _removeClass2.default)(this._items[i], 'noline');
      itemTotalWidth += this._items[i].offsetWidth;

      if (listWidth < itemTotalWidth && i > 0) {
        (0, _addClass2.default)(this._items[i - 1], 'noline');
        itemTotalWidth = this._items[i].offsetWidth + this._listPaddingTotal;
      }
    }
  };

  /**
   * Fix on condensed variation
   * Same as fix large variation except CSS class
   */


  StepIndicator.prototype._calculateCondensedStyle = function _calculateCondensedStyle() {
    (0, _addClass2.default)(this._list, 'spark-step-indicator__list--condensed');
    this._calculateLargeStyle();
  };

  /**
   * Fix on dropdown variation
   */


  StepIndicator.prototype._calculateDropdownStyle = function _calculateDropdownStyle() {
    this._switchToDropdown();
  };

  /**
   * Change only between large and condensed variation
   * no dropdown variation
   */


  StepIndicator.prototype._calculateStandardStyle = function _calculateStandardStyle() {
    this._list.style.visibility = 'hidden';
    for (var i = 0; i < this._items.length; i++) {
      (0, _removeClass2.default)(this._items[i], 'noline');
    }
    (0, _removeClass2.default)(this._list, 'spark-step-indicator__list--condensed');
    if (this._isOverWidth()) {
      (0, _addClass2.default)(this._list, 'spark-step-indicator__list--condensed');
      this._calculateLargeStyle();
    }
    this._list.style.visibility = 'visible';
  };

  /**
   * Make list invisible and change it into large variation at first.
   * Switch variation from top to bottom to find the fit one
   */


  StepIndicator.prototype._calculateRespStyle = function _calculateRespStyle() {
    this._list.style.visibility = 'hidden';
    (0, _removeClass2.default)(this._list, 'spark-step-indicator__list--condensed');
    if (this._isOverWidth()) {
      (0, _addClass2.default)(this._list, 'spark-step-indicator__list--condensed');
      if (this._isOverWidth()) {
        (0, _removeClass2.default)(this._list, 'spark-step-indicator__list--condensed');
        this._switchToDropdown();
      }
    }
    this._list.style.visibility = 'visible';
  };

  /**
   * Create header element for dropdown variation
   * Try to find the current step of indicator and show it on the header
   * if not found, show the first step
   * @return {Object} header element of dropdown variation
   */


  StepIndicator.prototype._createDropdownHeader = function _createDropdownHeader() {
    var el = document.createElement('a');
    var currentStep = this._list.querySelector('.spark-step-indicator__item--current');
    // Can not find current step
    if (!currentStep) {
      currentStep = this._items[0];
    }

    // Set ARIA roles and attributes
    el.setAttribute('role', 'button');
    el.setAttribute('aria-expanded', 'false');
    var listID = this._list.getAttribute('id') !== null && this._list.getAttribute('id') !== '' ? this._list.getAttribute('id') : '';
    el.setAttribute('aria-controls', listID);

    el.innerHTML = currentStep.innerHTML;
    el.innerHTML += '<span class="spark-step-indicator__notice">' + this.dropdownLabel + '</span>';

    // Create label element like '2 of 7'
    var stepNotice = document.createElement('span');
    var currentIndex = Array.prototype.indexOf.call(this._items, currentStep);
    stepNotice.innerHTML = currentIndex + 1 + ' of ' + this._items.length;
    stepNotice.className = 'spark-step-indicator__label--dropdown';

    el.appendChild(stepNotice);
    el.className = currentStep.className;
    el.setAttribute('tabindex', '0');

    (0, _addClass2.default)(el, 'spark-step-indicator__item--dropdown__header');
    this._dropdownHeader = el;
  };

  /**
   * Some extra event binder and DOM of dropdown variation need to be set
   */


  StepIndicator.prototype._switchToDropdown = function _switchToDropdown() {
    (0, _addClass2.default)(this._body, 'spark-step-indicator__body--dropdown');
    this._createDropdownHeader();
    this._list.parentNode.insertBefore(this._dropdownHeader, this._list);
    document.removeEventListener('click', this._toggleDropdownBound);
    document.addEventListener('click', this._toggleDropdownBound);
    (0, _addClass2.default)(this._list, 'collapse');

    for (var i = 0; i < this._items.length; i++) {
      if (!(0, _hasClass2.default)(this._items[i], 'spark-step-indicator__item--disabled')) {
        this._items[i].setAttribute('tabindex', '-1');
      }
    }
  };

  /**
   * Remove extra event and DOM when switch variation from dropdown
   */


  StepIndicator.prototype._switchFromDropdown = function _switchFromDropdown() {
    (0, _removeClass2.default)(this._body, 'spark-step-indicator__body--dropdown');
    var header = this._list.parentNode.querySelector('.spark-step-indicator__item--dropdown__header');
    document.removeEventListener('click', this._toggleDropdownBound);
    if (header) {
      this._list.parentNode.removeChild(header);
    }
    (0, _removeClass2.default)(this._list, 'collapse');

    for (var i = 0; i < this._items.length; i++) {
      if (!(0, _hasClass2.default)(this._items[i], 'spark-step-indicator__item--disabled')) {
        this._items[i].removeAttribute('tabindex');
      }
    }
  };

  /**
   * Allow programmatic toggling of Dropdown version of Step Indicator.
   * This becomes desirable particularly in the case of single page applications
   */


  StepIndicator.prototype.toggle = function toggle() {
    if (this._dropdownHeader) {
      var e = document.createEvent('Event');
      e.initEvent('spark.step-indicator', true, true);
      this._dropdownHeader.dispatchEvent(e);
    }
  };

  /**
   * Toggle collapse/expand state of step list in dropdown variation
   * If there is a scroll in dropdown variation, scroll to 'current' node
   * @param {Object} Reference of DOM obj
   * @param {Object} Event of click
   */


  StepIndicator.prototype._toggleDropdown = function _toggleDropdown(e) {
    var target = e.target || e.srcElement;
    if (this._dropdownHeader.contains(target)) {
      if (!this._dropdownExpand) {
        (0, _removeClass2.default)(this._list, 'collapse');
        (0, _addClass2.default)(this._dropdownHeader, 'expand');
        this._dropdownExpand = true;
        this._dropdownHeader.setAttribute('aria-expanded', 'true');

        for (var i = 0; i < this._items.length; i++) {
          if (!(0, _hasClass2.default)(this._items[i], 'spark-step-indicator__item--disabled')) {
            this._items[i].removeAttribute('tabindex');
          }
        }
      } else {
        (0, _addClass2.default)(this._list, 'collapse');
        (0, _removeClass2.default)(this._dropdownHeader, 'expand');
        this._dropdownExpand = false;
        this._dropdownHeader.setAttribute('aria-expanded', 'false');

        for (var _i = 0; _i < this._items.length; _i++) {
          if (!(0, _hasClass2.default)(this._items[_i], 'spark-step-indicator__item--disabled')) {
            this._items[_i].setAttribute('tabindex', '-1');
          }
        }
      }
    } else {
      (0, _addClass2.default)(this._list, 'collapse');
      (0, _removeClass2.default)(this._dropdownHeader, 'expand');
      this._dropdownExpand = false;
      this._dropdownHeader.setAttribute('aria-expanded', 'false');

      for (var _i2 = 0; _i2 < this._items.length; _i2++) {
        if (!(0, _hasClass2.default)(this._items[_i2], 'spark-step-indicator__item--disabled')) {
          this._items[_i2].setAttribute('tabindex', '-1');
        }
      }
    }
    if (this._list.offsetHeight > 0) {
      var scrollMove = 0;
      for (var _i3 = 0; _i3 < this._items.length; _i3++) {
        if ((0, _hasClass2.default)(this._items[_i3], 'spark-step-indicator__item--current')) {
          this._list.scrollTop = scrollMove;
          break;
        }
        scrollMove += this._items[_i3].offsetHeight;
      }
    }
  };

  /**
   * When the window finish loading
   */


  StepIndicator.prototype._onLoad = function _onLoad() {
    this._checkPadding();
    this._calculateStyle();
  };

  /**
   * When the window is resized, base on params make some reponsive change.
   */


  StepIndicator.prototype._onResize = function _onResize() {
    this._checkPadding();
    this._calculateStyle();
  };

  /**
   * Padding is applied to condensed step indicators but not large step indicators.
   * Therefore as large indicators transition to condensed ones and vice versa, verify
   * the padding values in order to properly calculate positioning of divider line classes
   */


  StepIndicator.prototype._checkPadding = function _checkPadding() {
    // Cache list left + right padding for width calculating
    var listStyles = getComputedStyle(this._list);
    var listPaddingLeft = parseInt(listStyles.getPropertyValue('padding-left'), 10);
    var listPaddingRight = parseInt(listStyles.getPropertyValue('padding-right'), 10);
    this._listPaddingTotal = listPaddingLeft + listPaddingRight;
  };

  /**
   * When a parent container shows its children and our element
   * is inside of it, resize
   * @param  {Object} e
   */


  StepIndicator.prototype._onVisible = function _onVisible(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._calculateStyle();
      }.bind(this), 0);
    }
  };

  return StepIndicator;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


StepIndicator.prototype._whitelistedParams = ['type', 'header', 'subtitle', 'dropdownLabel'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
StepIndicator.prototype.defaults = {
  el: null,
  containerEl: null,
  header: null,
  subtitle: null,
  dropdownLabel: null,
  type: null,
  _body: null,
  _list: null,
  _listPaddingTotal: 0,
  _dropdownExpand: false,
  _dropdownHeader: null,
  _items: null,
  _onResizeBound: null,
  _onVisibleBound: null
};

exports.default = StepIndicator;
module.exports = exports['default'];
//# sourceMappingURL=step-indicator.js.map
