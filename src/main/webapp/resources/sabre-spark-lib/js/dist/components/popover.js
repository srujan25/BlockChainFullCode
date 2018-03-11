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

var _appendChildren = require('../helpers/manipulation/append-children');

var _appendChildren2 = _interopRequireDefault(_appendChildren);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _parseAttribute = require('../helpers/dom/parse-attribute');

var _affix = require('../helpers/position/affix');

var _affix2 = _interopRequireDefault(_affix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Popover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Show and hide a popover. Should do some sanity checks on positioning as well.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Popover(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Default anchoring of the content's x and y-axis relative to the button.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   defaultAnchorX: 'center', // 'left', 'center', 'right'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   defaultAnchorY: 'center' // 'left', 'center', 'right'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/popover.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Popover = function (_BaseComponent) {
  _inherits(Popover, _BaseComponent);

  function Popover(el) {
    var _ret;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Popover);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    if (!el) return _ret = _this, _possibleConstructorReturn(_this, _ret);
    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _this;
  }

  /**
   * Open.
   * @param {Object} params Optional
   */


  Popover.prototype.open = function open() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    // If there is a timer running for the close event, clear it so it
    // doesn't close stuff during open.
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    // If the element we anchor the popover to is fixed, we need to know
    // so that the affixed content can also be fixed.
    this._checkFixedPosition();

    // Update an existing affixed instance.
    if (this.affix) {
      this.affix.targetEl = params.affixTo || this.affix.targetEl;
      this.affix.update();
    }
    // Affix the content to the toggle
    else {
        this.affix = new _affix2.default({
          el: this.contentEl,
          targetEl: params.affixTo || this.el,
          caretEl: this.caretEl,
          anchorX: this.anchorX,
          anchorY: this.anchorY,
          isFixed: this.isFixed
        });
      }

    // Find all focusable elements in the Popover for navigation
    var popoverFocusableEls = this.contentEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

    if (popoverFocusableEls.length > 0) {
      this.popoverFocusableEls = Array.prototype.slice.call(popoverFocusableEls);
      this.firstPopoverFocusableEl = this.popoverFocusableEls[0];
      this.lastPopoverFocusableEl = this.popoverFocusableEls[this.popoverFocusableEls.length - 1];
    }

    // Listen for clicks on the window
    this._addWindowEventListeners();

    this.isActive = true;

    // Dispatch a custom event so content inside the popover can respond
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.contentEl.dispatchEvent(e);

    // Update bindings
    this._updateAttributes();

    // Set focus to first focusable element once Popover has been opened
    if (popoverFocusableEls.length > 0) {
      this.firstPopoverFocusableEl.focus();
    }

    // Callbacks
    (params.complete || noop)();
    (this.onOpen || noop)();

    return this;
  };

  /**
   * Close.
   * @param {Object} params Optional
   */


  Popover.prototype.close = function close() {
    var _this2 = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    // Not open, so don't close.
    if (!this.affix) return this;

    // If there is a timer running for the close event, clear it so we don't run close stuff twice.
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    // Stop listening to window clicks.
    this._removeWindowEventListeners();

    this.isActive = false;

    // Update bindings
    this._updateAttributes();

    // Close after the animation has completed
    this.closeTimer = setTimeout(function () {
      _this2._finishClose(params);
    }, 250);

    return this;
  };

  /**
   * Toggle the open state.
   */


  Popover.prototype.toggle = function toggle() {
    return this[this.isActive ? 'close' : 'open']();
  };

  /**
   * Set the content. Optionally append instead of replacing.
   * @param {Element|Array|NodeList} content
   * @param {Object} params Optional
   */


  Popover.prototype.setContent = function setContent(content, params) {
    params = params || {};
    (0, _appendChildren2.default)(this.contentEl, content.length ? content : [content], !(params.append || false));
    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Popover.prototype.update = function update(el) {

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._addEventListeners();

    if (this.affix) this.affix.update();

    return this;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Popover.prototype._cacheElements = function _cacheElements(el) {

    // If a content element was already passed, make sure it has a popover content class
    if (this.contentEl) {
      (0, _addClass2.default)(this.contentEl, 'spark-popover__content');
    }

    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-popover__toggle, [data-role="toggle"]') || this.el;
    this.contentEl = this.contentEl || this.el.querySelector('.spark-popover__content, [class*="spark-popover__content--"]') || this._createContentEl();
    this.caretEl = this.contentEl.querySelector('.spark-popover__caret') || this._createCaretEl();
    this.isActive = (0, _hasClass2.default)(this.toggleEl, 'popover-active');
  };

  /**
   * Parse config values from the element.
   */


  Popover.prototype._parseParams = function _parseParams() {

    this.anchorY = this.anchorY !== null ? this.anchorY : (0, _parseAttribute.string)(this.contentEl, 'data-anchor-y', null);
    this.anchorX = this.anchorX !== null ? this.anchorX : (0, _parseAttribute.string)(this.contentEl, 'data-anchor-x', null);

    // No anchors defined
    if (!this.anchorY && !this.anchorX) {

      // Left
      if ((0, _hasClass2.default)(this.contentEl, 'spark-popover__content--left')) {
        this.anchorY = 'middle';
        this.anchorX = 'left';
      }
      // Right
      else if ((0, _hasClass2.default)(this.contentEl, 'spark-popover__content--right')) {
          this.anchorY = 'middle';
          this.anchorX = 'right';
        }
        // Top
        else if ((0, _hasClass2.default)(this.contentEl, 'spark-popover__content--top')) {
            this.anchorY = 'top';
            this.anchorX = 'center';
          }
          // Bottom
          else {
              this.anchorY = 'bottom';
              this.anchorX = 'center';
            }
    }
  };

  /**
   * Check to see if the button triggering the popover is fixed.
   * If so, then popover needs to be fixed as well.
   */


  Popover.prototype._checkFixedPosition = function _checkFixedPosition() {

    var parent = this.el;

    while (parent && parent !== document) {
      var style = getComputedStyle(parent);
      if (style.position === 'fixed') {
        return this.isFixed = true;
      }
      parent = parent.parentNode;
    }

    return this.isFixed = false;
  };

  /**
   * Update classes for the open or close state.
   */


  Popover.prototype._updateAttributes = function _updateAttributes() {
    (0, _toggleClass2.default)(this.el, 'popover-active', this.isActive);
    (0, _toggleClass2.default)(this.contentEl, 'active', this.isActive);
    (0, _toggleClass2.default)(this.toggleEl, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Popover.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onContentClickBound = this._onContentClick.bind(this);
    this._onWindowClickBound = this._onWindowClick.bind(this);
    this._onKeyupBound = this._onKeyup.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Popover.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.contentEl.addEventListener('click', this._onContentClickBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Popover.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.contentEl.removeEventListener('click', this._onContentClickBound);
  };

  /**
   * Add event listeners to the window.
   */


  Popover.prototype._addWindowEventListeners = function _addWindowEventListeners() {
    this._removeWindowEventListeners();
    window.addEventListener('click', this._onWindowClickBound);
    window.addEventListener('keyup', this._onKeyupBound);
    window.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove window event listeners.
   */


  Popover.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('click', this._onWindowClickBound);
    window.removeEventListener('keyup', this._onKeyupBound);
    window.removeEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Create a content element.
   * @return {Element}
   */


  Popover.prototype._createContentEl = function _createContentEl() {
    var el = document.createElement('div');
    (0, _addClass2.default)(el, 'spark-popover__content');
    el.setAttribute('role', 'tooltip');
    return el;
  };

  /**
   * Create the caret element.
   * @return {Element}
   */


  Popover.prototype._createCaretEl = function _createCaretEl() {
    var el = document.createElement('div');
    el.className = 'spark-popover__caret';
    this.contentEl.appendChild(el);
    return el;
  };

  /**
   * Complete the close event by moving the element back and destroying the affix.
   * @param  {Object} params
   */


  Popover.prototype._finishClose = function _finishClose() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    this.closeTimer = null;

    // Move the content back to the parent
    this.el.appendChild(this.contentEl);

    this.affix.remove({ keepEl: true });
    this.affix = null;

    (params.complete || noop)();
    (this.onClose || noop)();
  };

  /**
   * When we are clicked, toggle the popover-active state.
   * @param {Object} e
   */


  Popover.prototype._onClick = function _onClick(e) {

    // If this is the toggle element, toggle.
    if (e.target === this.toggleEl || (0, _hasParent2.default)(e.target, this.toggleEl)) {
      e.preventDefault();
      this.toggle();
      return;
    }
  };

  /**
   * When a key is pressed on the window and it's an ESC, close the popover.
   * @param {Object} e
   */


  Popover.prototype._onKeyup = function _onKeyup(e) {
    if (e.keyCode === 27) {
      this.close();

      // Set focus back to toggle
      this.toggleEl.focus();
    }
  };

  /**
   * When a key is pressed in an active Popover and it is a Tab key, or Shift+Tab, navigate the popover
   * If it the Enter key, and focus is on the close button, close the Popover
   *
   * @param {Object} e
   */


  Popover.prototype._onKeydown = function _onKeydown(e) {
    if (e.keyCode === 9) {
      if (this.popoverFocusableEls.length === 1) {
        e.preventDefault();
      }

      if (e.shiftKey) {
        this._onBackwardTab(e);
      } else {
        this._onForwardTab(e);
      }
    }

    // Enter Key
    if (e.keyCode === 13) {
      if (e.target === document.querySelector('.spark-popover__close') || (0, _getParent2.default)(e.target, '.spark-popover__close', this.contentEl)) {
        e.preventDefault();
        this.close();

        // Set focus back to toggle
        this.toggleEl.focus();
      }
    }
  };

  /**
   * When tabbing backwards, localize traversal to Popover elements only
   * @param {Object} e
   */


  Popover.prototype._onBackwardTab = function _onBackwardTab(e) {
    if (document.activeElement === this.firstPopoverFocusableEl) {
      e.preventDefault();
      this.lastPopoverFocusableEl.focus();
    }
  };

  /**
   * When tabbing forwards, localize traversal to Popover elements only
   * @param {Object} e
   */


  Popover.prototype._onForwardTab = function _onForwardTab(e) {
    if (document.activeElement === this.lastPopoverFocusableEl) {
      e.preventDefault();
      this.firstPopoverFocusableEl.focus();
    }
  };

  /**
   * When the toggle is clicked, close if it's a link. If it's content, don't do anything but stop
   * the event from bubbling.
   * @param {Object} e
   */


  Popover.prototype._onContentClick = function _onContentClick(e) {

    // If this is a link, close.
    if ((0, _getParent2.default)(e.target, '.spark-popover__list-link', this.contentEl) || (0, _getParent2.default)(e.target, '.spark-popover__close', this.contentEl)) {
      this.close();
      return;
    }
  };

  /**
   * When the window is clicked and it's not part of the popover, close the popover.
   * @param {Objec} e
   */


  Popover.prototype._onWindowClick = function _onWindowClick(e) {
    if (e.target !== this.el && e.target !== this.contentEl && !(0, _hasParent2.default)(e.target, this.el) && !(0, _hasParent2.default)(e.target, this.contentEl)) {
      this.close();
    }
  };

  return Popover;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Popover.prototype._whitelistedParams = ['anchorX', 'anchorY', 'toggleEl', 'contentEl', 'onOpen', 'onClose'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Popover.prototype.defaults = {
  el: null,
  toggleEl: null,
  contentEl: null,
  caretEl: null,
  affix: null,
  isActive: false,
  isPaused: false,
  isFixed: false,
  anchorX: null,
  anchorY: null,
  closeTimer: null,
  onOpen: null,
  onClose: null,
  _onClickBound: null,
  _onKeyupBound: null,
  _onKeydownBound: null,
  _onContentClickBound: null,
  _onWindowClickBound: null,
  _onWindowResizeBound: null,
  _onWindowScrollBound: null
};

exports.default = Popover;
module.exports = exports['default'];
//# sourceMappingURL=popover.js.map
