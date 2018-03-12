'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _scrollTo = require('../helpers/animation/scroll-to');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _offset = require('../helpers/dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Scroll To Top
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Provide a way to scroll back to the top of a component.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new ScrollToTop(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/scroll-to-top.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};
var canObserve = typeof MutationObserver !== 'undefined' ? true : false;

var ScrollToTop = function (_BaseComponent) {
  _inherits(ScrollToTop, _BaseComponent);

  /**
   * ScrollToTop constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function ScrollToTop(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ScrollToTop);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._cacheSizes();

    _this._clearRecomputeDebounced = (0, _debounce2.default)(_this._clearRecompute.bind(_this), 50);
    _this._recomputeDebounced = (0, _debounce2.default)(_this._recompute.bind(_this), 50);

    _this._checkScrollPosition();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Scroll to the top of the containing element.
   * @param {Function} callback
   */


  ScrollToTop.prototype.scrollToTop = function scrollToTop(callback) {
    (0, _scrollTo2.default)(this.scrollToEl || 0, {
      callback: callback || noop
    });
    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  ScrollToTop.prototype.update = function update(el) {

    this._removeEventListeners();
    this._cacheElements(el);
    this._addEventListeners();
    this._cacheSizes();
    this._checkScrollPosition();

    return this;
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  ScrollToTop.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.containerEl = this.containerEl || el.parentNode;
  };

  /**
   * Cache element sizes.
   */


  ScrollToTop.prototype._cacheSizes = function _cacheSizes() {

    var containerOffset = (0, _offset2.default)(this.containerEl);
    var windowWidth = document.body.clientWidth;
    var windowHeight = window.innerHeight;
    var containerOffsetTop = containerOffset.top;
    var containerOffsetLeft = containerOffset.left;
    var containerOffsetRight = windowWidth - containerOffsetLeft - this.containerEl.offsetWidth;

    this._windowHeight = windowHeight;
    this._containerBottom = this.containerEl.offsetHeight + containerOffsetTop;
    this._visibleThreshold = containerOffsetTop + windowHeight * 1.5;

    // Reset button styles
    var isAtBottom = this._isAtBottom;
    this._isAtBottom = false;
    this._right = 0;
    this._updateBindings();

    // Default right position of the element plus the right edge of the container
    this._right = windowWidth - this.el.offsetLeft - this.el.offsetWidth + containerOffsetRight;
    this._isAtBottom = isAtBottom;
    this._updateBindings();
  };

  /**
   * Check the scroll position. If we're far enough from the top,
   * make visible. If the bottom of our container element is past the bottom
   * of the screen, make us fixed.
   */


  ScrollToTop.prototype._checkScrollPosition = function _checkScrollPosition() {

    var isVisible = this._isVisible;
    var isAtBottom = this._isAtBottom;
    var scrollTop = typeof window.scrollY !== 'undefined' ? window.scrollY : window.pageYOffset;
    var bottomThreshold = scrollTop + this._windowHeight;

    this._isVisible = scrollTop + this._windowHeight >= this._visibleThreshold ? true : false;
    this._isAtBottom = this._containerBottom <= bottomThreshold ? true : false;

    if (this._isAtBottom !== isAtBottom || this._isVisible !== isVisible) {
      this._updateBindings();
    }
  };

  /**
   * Update bindings.
   */


  ScrollToTop.prototype._updateBindings = function _updateBindings() {
    (0, _toggleClass2.default)(this.el, 'visible', this._isVisible);
    (0, _toggleClass2.default)(this.el, 'at-bottom', this._isAtBottom);
    this.el.style.right = this._isAtBottom || !this._right ? '' : this._right + 'px';
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  ScrollToTop.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    this._onResizeBound = this._onResize.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._onMutateBound = this._onMutate.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  ScrollToTop.prototype._addEventListeners = function _addEventListeners() {

    this.el.addEventListener('click', this._onClickBound);
    window.addEventListener('scroll', this._onScrollBound);
    window.addEventListener('orientationchange', this._onScrollBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve) this._addMutationObserver();else window.addEventListener('resize', this._onResizeBound, false);
  };

  /**
   * Remove event listeners for DOM events..
   */


  ScrollToTop.prototype._removeEventListeners = function _removeEventListeners() {

    this.el.removeEventListener('click', this._onClickBound);
    window.removeEventListener('scroll', this._onScrollBound);
    window.removeEventListener('orientationchange', this._onScrollBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve) this._removeMutationObserver();else window.removeEventListener('resize', this._onResizeBound);
  };

  /**
   * Setup a mutation observer to know when the DOM has changed so we can recache.
   */


  ScrollToTop.prototype._addMutationObserver = function _addMutationObserver() {
    this._observer = new MutationObserver(this._onMutateBound);
    this._observer.observe(this.containerEl, { childList: true, attributes: true, characterData: true, subtree: true });
  };

  /**
   * Remove a mutation observer.
   */


  ScrollToTop.prototype._removeMutationObserver = function _removeMutationObserver() {
    if (this._observer) this._observer.disconnect();
  };

  /**
   * Recompute the position.
   */


  ScrollToTop.prototype._recompute = function _recompute() {
    this._cacheSizes();
    this._checkScrollPosition();
  };

  /**
   * Recompute styles, but only so often.
   */


  ScrollToTop.prototype._recomputeThrottled = function _recomputeThrottled() {

    if (!this._recomputeRun) {
      this._recompute();
      this._recomputeRun = true;
    }

    this._clearRecomputeDebounced();
  };

  /**
   * Clear the recompute run state.
   */


  ScrollToTop.prototype._clearRecompute = function _clearRecompute() {
    this._recomputeRun = false;
  };

  /**
   * When the window is scrolled, compute the position of the scroll-to-top.
   * @param {Object} e
   */


  ScrollToTop.prototype._onScroll = function _onScroll() {
    this._recomputeThrottled();
    this._checkScrollPosition();
  };

  /**
   * When the window is resized, re-cache element sizes.
   * @param {Object} e
   */


  ScrollToTop.prototype._onResize = function _onResize() {
    this._recomputeDebounced();
  };

  /**
   * When the button is clicked, scroll to the top.
   * @param {Object} e
   */


  ScrollToTop.prototype._onClick = function _onClick() {
    this.scrollToTop();
  };

  /**
   * When a parent container shows its children and our element
   * is inside of it, resize
   * @param  {Object} e
   */


  ScrollToTop.prototype._onVisible = function _onVisible(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._cacheSizes();
        this._checkScrollPosition();
      }.bind(this), 0);
    }
  };

  /**
   * When the DOM changes, recache our values because we might be in the wrong spot.
   */


  ScrollToTop.prototype._onMutate = function _onMutate(mutations) {
    (0, _each2.default)(mutations, function (m) {
      if (m.target !== this.el) this._recomputeDebounced();
    }.bind(this));
  };

  return ScrollToTop;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


ScrollToTop.prototype._whitelistedParams = ['containerEl', 'scrollToEl'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
ScrollToTop.prototype.defaults = {
  el: null,
  containerEl: null,
  scrollToEl: null,
  _isVisible: false,
  _isAtBottom: false,
  _containerBottom: 0,
  _visibleThreshold: 0,
  _windowHeight: 0,
  _right: 0,
  _recomputeRun: false,
  _observer: null,
  _onClickBound: null,
  _onScrollBound: null,
  _onVisibleBound: null,
  _onResizeBound: null,
  _onMutateBound: null
};

exports.default = ScrollToTop;
module.exports = exports['default'];
//# sourceMappingURL=scroll-to-top.js.map
