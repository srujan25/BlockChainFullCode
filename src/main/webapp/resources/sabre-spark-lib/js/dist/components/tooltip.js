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

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _parseAttribute = require('../helpers/dom/parse-attribute');

var _affix = require('../helpers/position/affix');

var _affix2 = _interopRequireDefault(_affix);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Tooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Show and hide a tooltip.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Tooltip(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Default anchoring of the content's x and y-axis relative to the button.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   anchorX: 'center', // 'left', 'center', 'right'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   anchorY: 'center' // 'top', 'middle', 'bottom'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/popover.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tooltip = function (_BaseComponent) {
  _inherits(Tooltip, _BaseComponent);

  function Tooltip(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tooltip);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Open.
   */


  Tooltip.prototype.open = function open() {

    if (this.affix) return this;

    this.affix = new _affix2.default({
      el: this.contentEl,
      targetEl: this.toggleEl,
      caretEl: this.caretEl,
      anchorX: this.anchorX,
      anchorY: this.anchorY
    });

    (0, _addClass2.default)(this.contentEl, 'active');

    this.isActive = true;
    this.toggleEl.setAttribute('aria-expanded', 'true');

    return this;
  };

  /**
   * Close.
   */


  Tooltip.prototype.close = function close() {

    if (!this.affix) return this;

    (0, _removeClass2.default)(this.contentEl, 'active');
    this.el.appendChild(this.contentEl);

    this.affix.remove({ keepEl: true });
    this.affix = null;

    this.isActive = false;
    this.toggleEl.setAttribute('aria-expanded', 'false');

    return this;
  };

  /**
   * Toggle the open state.
   */


  Tooltip.prototype.toggle = function toggle() {
    return this[this.isActive ? 'close' : 'open']();
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Tooltip.prototype.update = function update(el) {

    if (this.affix) this.affix.update();

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._addEventListeners();

    return this;
  };

  /**
   * Close on remove.
   * @param {Boolean} leaveElement
   */


  Tooltip.prototype.remove = function remove(leaveElement) {
    this.close();
    (0, _removeClass2.default)(this.el, 'tooltip-initialized');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Tooltip.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-tooltip__toggle, [data-role="toggle"]') || this.el;
    this.contentEl = this.contentEl || this.el.querySelector('[class*="spark-tooltip__content--"]') || this._createContentEl();
    this.caretEl = this.el.querySelector('.spark-tooltip__caret') || this._createCaretEl();
    this.isActive = (0, _hasClass2.default)(this.toggleEl, 'tooltip-active');

    (0, _addClass2.default)(this.el, 'tooltip-initialized');
  };

  /**
   * Parse config values from the element.
   */


  Tooltip.prototype._parseParams = function _parseParams() {

    this.anchorY = this.anchorY !== null ? this.anchorY : (0, _parseAttribute.string)(this.el, 'data-anchor-y', null);
    this.anchorX = this.anchorX !== null ? this.anchorX : (0, _parseAttribute.string)(this.el, 'data-anchor-x', null);

    // No anchors defined
    if (!this.anchorY && !this.anchorX) {

      // Left
      if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--left')) {
        this.anchorY = 'middle';
        this.anchorX = 'left';
      }
      // Right
      else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--right')) {
          this.anchorY = 'middle';
          this.anchorX = 'right';
        }
        // Top
        else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--top')) {
            this.anchorY = 'top';
            this.anchorX = 'center';
          }
          // Bottom
          else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--bottom')) {
              this.anchorY = 'bottom';
              this.anchorX = 'center';
            }
    }
  };

  /**
   * Update classes for the open or close state.
   */


  Tooltip.prototype._updateAttributes = function _updateAttributes() {
    (0, _toggleClass2.default)(this.el, 'tooltip-active', this.isActive);
    (0, _toggleClass2.default)(this.contentEl, 'tooltip-active', this.isActive);
    (0, _toggleClass2.default)(this.toggleEl, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Tooltip.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onMouseoverBound = this._onMouseover.bind(this);
    this._onMouseoutBound = this._onMouseout.bind(this);
    this._onWindowMouseoverBound = this._onWindowMouseover.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Tooltip.prototype._addEventListeners = function _addEventListeners() {
    this.toggleEl.addEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.addEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.addEventListener('focus', this._onFocusBound);
    this.toggleEl.addEventListener('blur', this._onBlurBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Tooltip.prototype._removeEventListeners = function _removeEventListeners() {
    this.toggleEl.removeEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.removeEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.removeEventListener('focus', this._onFocusBound);
    this.toggleEl.removeEventListener('blur', this._onBlurBound);
  };

  /**
   * Add window listeners.
   */


  Tooltip.prototype._addWindowEventListeners = function _addWindowEventListeners() {
    window.addEventListener('mouseover', this._onWindowMouseoverBound);
  };

  /**
   * Remove window listeners.
   */


  Tooltip.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('mouseover', this._onWindowMouseoverBound);
  };

  /**
   * Create a content element.
   * @return {Element}
   */


  Tooltip.prototype._createContentEl = function _createContentEl() {
    return (0, _makeElement2.default)('<div class="spark-tooltip__content"></div>');
  };

  /**
   * Create the caret element.
   * @return {Element}
   */


  Tooltip.prototype._createCaretEl = function _createCaretEl() {
    return (0, _makeElement2.default)('<div class="spark-tooltip__caret"></div>');
  };

  /**
   * Open the tooltip on mouseover.
   */


  Tooltip.prototype._onMouseover = function _onMouseover() {
    this._addWindowEventListeners();
    this.open();
  };

  /**
   * Close the tooltip on mouseout.
   */


  Tooltip.prototype._onMouseout = function _onMouseout() {
    this._removeWindowEventListeners();
    this.close();
  };

  /**
   * Open the tooltip on focus.
   */


  Tooltip.prototype._onFocus = function _onFocus() {
    this._addWindowEventListeners();
    this.open();
  };

  /**
   * Close the tooltip on blur.
   */


  Tooltip.prototype._onBlur = function _onBlur() {
    this._removeWindowEventListeners();
    this.close();
  };

  /**
   * Close the tooltip if we mouse over another element.
   * @param {Object} e
   */


  Tooltip.prototype._onWindowMouseover = function _onWindowMouseover(e) {
    if (e.target === this.el || (0, _hasParent2.default)(e.target, this.el)) return;
    this._onMouseout();
  };

  return Tooltip;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Tooltip.prototype._whitelistedParams = ['anchorY', 'anchorX', 'contentEl', 'toggleEl'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Tooltip.prototype.defaults = {
  el: null,
  toggleEl: null,
  contentEl: null,
  caretEl: null,
  isActive: false,
  affix: null,
  anchorY: null,
  anchorX: null,
  _onMouseoverBound: null,
  _onMouseoutBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onWindowMouseoverBound: null
};

exports.default = Tooltip;
module.exports = exports['default'];
//# sourceMappingURL=tooltip.js.map
