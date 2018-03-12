/**
 * # Scroll To Top
 * Provide a way to scroll back to the top of a component.
 *
 * @example
 * new ScrollToTop(el);
 *
 * @module components/scroll-to-top.js
 */
import BaseComponent from './base';
import toggleClass from '../helpers/dom/toggle-class';
import scrollTo from '../helpers/animation/scroll-to';
import offset from '../helpers/dom/offset';
import debounce from '../helpers/util/debounce';
import each from '../helpers/util/each';

const noop = function() {};
const canObserve = typeof MutationObserver !== 'undefined' ? true : false;

class ScrollToTop extends BaseComponent {

  /**
   * ScrollToTop constructor.
   * @param {Element} el
   * @param {Object} params
   */
  constructor(el, params = {}) {

    params.elRequired = true;

    if (!super(el, params)) {
      return;
    }

    this._bindEventListenerCallbacks();
    this._addEventListeners();
    this._cacheSizes();

    this._clearRecomputeDebounced = debounce(this._clearRecompute.bind(this), 50);
    this._recomputeDebounced = debounce(this._recompute.bind(this), 50);

    this._checkScrollPosition();
  }


  /**
   * Scroll to the top of the containing element.
   * @param {Function} callback
   */
  scrollToTop(callback) {
    scrollTo(this.scrollToEl || 0, {
      callback: callback || noop
    });
    return this;
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

    this._removeEventListeners();
    this._cacheElements(el);
    this._addEventListeners();
    this._cacheSizes();
    this._checkScrollPosition();

    return this;
  }


  /**
   * Store a reference to the element.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.containerEl = this.containerEl || el.parentNode;
  }


  /**
   * Cache element sizes.
   */
  _cacheSizes() {

    var containerOffset = offset(this.containerEl);
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
    this._right = (windowWidth - this.el.offsetLeft - this.el.offsetWidth) + containerOffsetRight;
    this._isAtBottom = isAtBottom;
    this._updateBindings();
  }


  /**
   * Check the scroll position. If we're far enough from the top,
   * make visible. If the bottom of our container element is past the bottom
   * of the screen, make us fixed.
   */
  _checkScrollPosition() {

    var isVisible = this._isVisible;
    var isAtBottom = this._isAtBottom;
    var scrollTop = typeof window.scrollY !== 'undefined' ? window.scrollY : window.pageYOffset;
    var bottomThreshold = scrollTop + this._windowHeight;

    this._isVisible = scrollTop + this._windowHeight >= this._visibleThreshold ? true : false;
    this._isAtBottom = this._containerBottom <= bottomThreshold ? true : false;

    if (this._isAtBottom !== isAtBottom || this._isVisible !== isVisible) {
      this._updateBindings();
    }
  }


  /**
   * Update bindings.
   */
  _updateBindings() {
    toggleClass(this.el, 'visible', this._isVisible);
    toggleClass(this.el, 'at-bottom', this._isAtBottom);
    this.el.style.right = this._isAtBottom || !this._right ? '' : this._right + 'px';
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    this._onResizeBound = this._onResize.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._onMutateBound = this._onMutate.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {

    this.el.addEventListener('click', this._onClickBound);
    window.addEventListener('scroll', this._onScrollBound);
    window.addEventListener('orientationchange', this._onScrollBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve)
      this._addMutationObserver();
    else
      window.addEventListener('resize', this._onResizeBound, false);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {

    this.el.removeEventListener('click', this._onClickBound);
    window.removeEventListener('scroll', this._onScrollBound);
    window.removeEventListener('orientationchange', this._onScrollBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve)
      this._removeMutationObserver();
    else
      window.removeEventListener('resize', this._onResizeBound);
  }


  /**
   * Setup a mutation observer to know when the DOM has changed so we can recache.
   */
  _addMutationObserver() {
    this._observer = new MutationObserver(this._onMutateBound);
    this._observer.observe(this.containerEl, {childList: true, attributes: true, characterData: true, subtree: true});
  }


  /**
   * Remove a mutation observer.
   */
  _removeMutationObserver() {
    if (this._observer) this._observer.disconnect();
  }


  /**
   * Recompute the position.
   */
  _recompute() {
    this._cacheSizes();
    this._checkScrollPosition();
  }


  /**
   * Recompute styles, but only so often.
   */
  _recomputeThrottled() {

    if (!this._recomputeRun) {
      this._recompute();
      this._recomputeRun = true;
    }

    this._clearRecomputeDebounced();
  }


  /**
   * Clear the recompute run state.
   */
  _clearRecompute() {
    this._recomputeRun = false;
  }

  /**
   * When the window is scrolled, compute the position of the scroll-to-top.
   * @param {Object} e
   */
  _onScroll() {
    this._recomputeThrottled();
    this._checkScrollPosition();
  }


  /**
   * When the window is resized, re-cache element sizes.
   * @param {Object} e
   */
  _onResize() {
    this._recomputeDebounced();
  }


  /**
   * When the button is clicked, scroll to the top.
   * @param {Object} e
   */
  _onClick() {
    this.scrollToTop();
  }


  /**
   * When a parent container shows its children and our element
   * is inside of it, resize
   * @param  {Object} e
   */
  _onVisible(e) {
    if(e.target.contains(this.el)) {
      window.setTimeout(function() {
        this._cacheSizes();
        this._checkScrollPosition();
      }.bind(this),0);
    }
  }


  /**
   * When the DOM changes, recache our values because we might be in the wrong spot.
   */
  _onMutate(mutations) {
    each(mutations, function(m) {
      if (m.target !== this.el) this._recomputeDebounced();
    }.bind(this));
  }
}


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

export default ScrollToTop;
