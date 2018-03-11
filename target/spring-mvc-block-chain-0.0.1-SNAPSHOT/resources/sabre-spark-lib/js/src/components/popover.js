/**
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
import BaseComponent from './base';
import addClass from '../helpers/dom/add-class';
import hasClass from '../helpers/dom/has-class';
import toggleClass from '../helpers/dom/toggle-class';
import appendChildren from '../helpers/manipulation/append-children';
import hasParent from '../helpers/traversal/has-parent';
import getParent from '../helpers/traversal/get-parent';
import {string as parseStringAttribute} from '../helpers/dom/parse-attribute';
import Affix from '../helpers/position/affix';

const noop = function() {};

class Popover extends BaseComponent {

  constructor(el, params = {}) {
    super(el, params);
    if (!el) return this;
    this._bindEventListenerCallbacks();
    this._addEventListeners();
  }

  /**
   * Open.
   * @param {Object} params Optional
   */
  open(params = {}) {

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
      this.affix = new Affix({
        el: this.contentEl,
        targetEl: params.affixTo || this.el,
        caretEl: this.caretEl,
        anchorX: this.anchorX,
        anchorY: this.anchorY,
        isFixed: this.isFixed
      });
    }

    // Find all focusable elements in the Popover for navigation
    let popoverFocusableEls = this.contentEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

    if ( popoverFocusableEls.length > 0 ) {
      this.popoverFocusableEls = Array.prototype.slice.call(popoverFocusableEls);
      this.firstPopoverFocusableEl = this.popoverFocusableEls[0];
      this.lastPopoverFocusableEl = this.popoverFocusableEls[ this.popoverFocusableEls.length - 1 ];
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
    if ( popoverFocusableEls.length > 0 ) {
      this.firstPopoverFocusableEl.focus();
    }

    // Callbacks
    (params.complete || noop)();
    (this.onOpen || noop)();

    return this;
  }


  /**
   * Close.
   * @param {Object} params Optional
   */
  close(params = {}) {

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
    this.closeTimer = setTimeout(() => {
      this._finishClose(params);
    }, 250);

    return this;
  }


  /**
   * Toggle the open state.
   */
  toggle() {
    return this[this.isActive ? 'close' : 'open']();
  }


  /**
   * Set the content. Optionally append instead of replacing.
   * @param {Element|Array|NodeList} content
   * @param {Object} params Optional
   */
  setContent(content, params) {
    params = params || {};
    appendChildren(this.contentEl, content.length ? content : [content], !(params.append || false));
    return this;
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._addEventListeners();

    if (this.affix) this.affix.update();

    return this;
  }


  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */
  _cacheElements(el) {

    // If a content element was already passed, make sure it has a popover content class
    if (this.contentEl) {
      addClass(this.contentEl, 'spark-popover__content');
    }

    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-popover__toggle, [data-role="toggle"]') || this.el;
    this.contentEl = this.contentEl || this.el.querySelector('.spark-popover__content, [class*="spark-popover__content--"]') || this._createContentEl();
    this.caretEl = this.contentEl.querySelector('.spark-popover__caret') || this._createCaretEl();
    this.isActive = hasClass(this.toggleEl, 'popover-active');
  }


  /**
   * Parse config values from the element.
   */
  _parseParams() {

    this.anchorY = this.anchorY !== null ? this.anchorY : parseStringAttribute(this.contentEl, 'data-anchor-y', null);
    this.anchorX = this.anchorX !== null ? this.anchorX : parseStringAttribute(this.contentEl, 'data-anchor-x', null);

    // No anchors defined
    if (!this.anchorY && !this.anchorX) {

      // Left
      if (hasClass(this.contentEl, 'spark-popover__content--left')) {
        this.anchorY = 'middle';
        this.anchorX = 'left';
      }
      // Right
      else if (hasClass(this.contentEl, 'spark-popover__content--right')) {
        this.anchorY = 'middle';
        this.anchorX = 'right';
      }
      // Top
      else if (hasClass(this.contentEl, 'spark-popover__content--top')) {
        this.anchorY = 'top';
        this.anchorX = 'center';
      }
      // Bottom
      else {
        this.anchorY = 'bottom';
        this.anchorX = 'center';
      }
    }
  }


  /**
   * Check to see if the button triggering the popover is fixed.
   * If so, then popover needs to be fixed as well.
   */
  _checkFixedPosition() {

    let parent = this.el;

    while (parent && parent !== document) {
      let style = getComputedStyle(parent);
      if (style.position === 'fixed') {
        return this.isFixed = true;
      }
      parent = parent.parentNode;
    }

    return this.isFixed = false;
  }


  /**
   * Update classes for the open or close state.
   */
  _updateAttributes() {
    toggleClass(this.el, 'popover-active', this.isActive);
    toggleClass(this.contentEl, 'active', this.isActive);
    toggleClass(this.toggleEl, 'active', this.isActive);
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onContentClickBound = this._onContentClick.bind(this);
    this._onWindowClickBound = this._onWindowClick.bind(this);
    this._onKeyupBound = this._onKeyup.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.contentEl.addEventListener('click', this._onContentClickBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.contentEl.removeEventListener('click', this._onContentClickBound);
  }


  /**
   * Add event listeners to the window.
   */
  _addWindowEventListeners() {
    this._removeWindowEventListeners();
    window.addEventListener('click', this._onWindowClickBound);
    window.addEventListener('keyup', this._onKeyupBound);
    window.addEventListener('keydown', this._onKeydownBound);
  }


  /**
   * Remove window event listeners.
   */
  _removeWindowEventListeners() {
    window.removeEventListener('click', this._onWindowClickBound);
    window.removeEventListener('keyup', this._onKeyupBound);
    window.removeEventListener('keydown', this._onKeydownBound);
  }


  /**
   * Create a content element.
   * @return {Element}
   */
  _createContentEl() {
    var el = document.createElement('div');
    addClass(el, 'spark-popover__content');
    el.setAttribute('role', 'tooltip');
    return el;
  }


  /**
   * Create the caret element.
   * @return {Element}
   */
  _createCaretEl() {
    var el = document.createElement('div');
    el.className = 'spark-popover__caret';
    this.contentEl.appendChild(el);
    return el;
  }


  /**
   * Complete the close event by moving the element back and destroying the affix.
   * @param  {Object} params
   */
  _finishClose(params = {}) {

    this.closeTimer = null;

    // Move the content back to the parent
    this.el.appendChild(this.contentEl);

    this.affix.remove({keepEl: true});
    this.affix = null;

    (params.complete || noop)();
    (this.onClose || noop)();
  }


  /**
   * When we are clicked, toggle the popover-active state.
   * @param {Object} e
   */
  _onClick(e) {

    // If this is the toggle element, toggle.
    if (e.target === this.toggleEl || hasParent(e.target, this.toggleEl)) {
      e.preventDefault();
      this.toggle();
      return;
    }
  }


  /**
   * When a key is pressed on the window and it's an ESC, close the popover.
   * @param {Object} e
   */
  _onKeyup(e) {
    if (e.keyCode === 27) {
      this.close();

      // Set focus back to toggle
      this.toggleEl.focus();
    }
  }


  /**
   * When a key is pressed in an active Popover and it is a Tab key, or Shift+Tab, navigate the popover
   * If it the Enter key, and focus is on the close button, close the Popover
   *
   * @param {Object} e
   */
  _onKeydown(e) {
    if (e.keyCode === 9) {
      if ( this.popoverFocusableEls.length === 1 ) {
        e.preventDefault();
      }

      if (e.shiftKey) {
        this._onBackwardTab(e);
      }
      else {
        this._onForwardTab(e);
      }
    }

    // Enter Key
    if (e.keyCode === 13) {
      if (e.target === document.querySelector('.spark-popover__close') || getParent(e.target, '.spark-popover__close', this.contentEl)) {
        e.preventDefault();
        this.close();

        // Set focus back to toggle
        this.toggleEl.focus();
      }
    }
  }


  /**
   * When tabbing backwards, localize traversal to Popover elements only
   * @param {Object} e
   */
  _onBackwardTab(e) {
    if ( document.activeElement === this.firstPopoverFocusableEl ) {
      e.preventDefault();
      this.lastPopoverFocusableEl.focus();
    }
  }


  /**
   * When tabbing forwards, localize traversal to Popover elements only
   * @param {Object} e
   */
  _onForwardTab(e) {
    if ( document.activeElement === this.lastPopoverFocusableEl ) {
      e.preventDefault();
      this.firstPopoverFocusableEl.focus();
    }
  }


  /**
   * When the toggle is clicked, close if it's a link. If it's content, don't do anything but stop
   * the event from bubbling.
   * @param {Object} e
   */
  _onContentClick(e) {

    // If this is a link, close.
    if (getParent(e.target, '.spark-popover__list-link', this.contentEl) || getParent(e.target, '.spark-popover__close', this.contentEl)) {
      this.close();
      return;
    }
  }


  /**
   * When the window is clicked and it's not part of the popover, close the popover.
   * @param {Objec} e
   */
  _onWindowClick(e) {
    if (e.target !== this.el && e.target !== this.contentEl && !hasParent(e.target, this.el) && !hasParent(e.target, this.contentEl)) {
      this.close();
    }
  }
}

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

export default Popover;
