/**
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
import BaseComponent from './base';
import addClass from '../helpers/dom/add-class';
import removeClass from '../helpers/dom/remove-class';
import hasClass from '../helpers/dom/has-class';
import toggleClass from '../helpers/dom/toggle-class';
import hasParent from '../helpers/traversal/has-parent';
import {string as parseStringAttribute} from '../helpers/dom/parse-attribute';
import Affix from '../helpers/position/affix';
import makeElement from '../helpers/dom/make-element';

class Tooltip extends BaseComponent {

  constructor(el, params = {}) {

    params.elRequired = true;

    if (!super(el, params)) {
      return;
    }

    this._bindEventListenerCallbacks();
    this._addEventListeners();
  }


  /**
   * Open.
   */
  open() {

    if (this.affix) return this;

    this.affix = new Affix({
      el: this.contentEl,
      targetEl: this.toggleEl,
      caretEl: this.caretEl,
      anchorX: this.anchorX,
      anchorY: this.anchorY
    });

    addClass(this.contentEl, 'active');

    this.isActive = true;
    this.toggleEl.setAttribute('aria-expanded', 'true');

    return this;
  }


  /**
   * Close.
   */
  close() {

    if (!this.affix) return this;

    removeClass(this.contentEl, 'active');
    this.el.appendChild(this.contentEl);

    this.affix.remove({keepEl: true});
    this.affix = null;

    this.isActive = false;
    this.toggleEl.setAttribute('aria-expanded', 'false');

    return this;
  }


  /**
   * Toggle the open state.
   */
  toggle() {
    return this[this.isActive ? 'close' : 'open']();
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

    if (this.affix) this.affix.update();

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._addEventListeners();

    return this;
  }


  /**
   * Close on remove.
   * @param {Boolean} leaveElement
   */
  remove(leaveElement) {
    this.close();
    removeClass(this.el, 'tooltip-initialized');
    return super.remove(leaveElement);
  }


  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-tooltip__toggle, [data-role="toggle"]') || this.el;
    this.contentEl = this.contentEl || this.el.querySelector('[class*="spark-tooltip__content--"]') || this._createContentEl();
    this.caretEl = this.el.querySelector('.spark-tooltip__caret') || this._createCaretEl();
    this.isActive = hasClass(this.toggleEl, 'tooltip-active');

    addClass(this.el, 'tooltip-initialized');
  }


  /**
   * Parse config values from the element.
   */
  _parseParams() {

    this.anchorY = this.anchorY !== null ? this.anchorY : parseStringAttribute(this.el, 'data-anchor-y', null);
    this.anchorX = this.anchorX !== null ? this.anchorX : parseStringAttribute(this.el, 'data-anchor-x', null);

    // No anchors defined
    if (!this.anchorY && !this.anchorX) {

      // Left
      if (hasClass(this.contentEl, 'spark-tooltip__content--left')) {
        this.anchorY = 'middle';
        this.anchorX = 'left';
      }
      // Right
      else if (hasClass(this.contentEl, 'spark-tooltip__content--right')) {
        this.anchorY = 'middle';
        this.anchorX = 'right';
      }
      // Top
      else if (hasClass(this.contentEl, 'spark-tooltip__content--top')) {
        this.anchorY = 'top';
        this.anchorX = 'center';
      }
      // Bottom
      else if (hasClass(this.contentEl, 'spark-tooltip__content--bottom')) {
        this.anchorY = 'bottom';
        this.anchorX = 'center';
      }
    }
  }


  /**
   * Update classes for the open or close state.
   */
  _updateAttributes() {
    toggleClass(this.el, 'tooltip-active', this.isActive);
    toggleClass(this.contentEl, 'tooltip-active', this.isActive);
    toggleClass(this.toggleEl, 'active', this.isActive);
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onMouseoverBound = this._onMouseover.bind(this);
    this._onMouseoutBound = this._onMouseout.bind(this);
    this._onWindowMouseoverBound = this._onWindowMouseover.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    this.toggleEl.addEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.addEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.addEventListener('focus', this._onFocusBound);
    this.toggleEl.addEventListener('blur', this._onBlurBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    this.toggleEl.removeEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.removeEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.removeEventListener('focus', this._onFocusBound);
    this.toggleEl.removeEventListener('blur', this._onBlurBound);
  }


  /**
   * Add window listeners.
   */
  _addWindowEventListeners() {
    window.addEventListener('mouseover', this._onWindowMouseoverBound);
  }


  /**
   * Remove window listeners.
   */
  _removeWindowEventListeners() {
    window.removeEventListener('mouseover', this._onWindowMouseoverBound);
  }


  /**
   * Create a content element.
   * @return {Element}
   */
  _createContentEl() {
    return makeElement('<div class="spark-tooltip__content"></div>');
  }


  /**
   * Create the caret element.
   * @return {Element}
   */
  _createCaretEl() {
    return makeElement('<div class="spark-tooltip__caret"></div>');
  }


  /**
   * Open the tooltip on mouseover.
   */
  _onMouseover() {
    this._addWindowEventListeners();
    this.open();
  }


  /**
   * Close the tooltip on mouseout.
   */
  _onMouseout() {
    this._removeWindowEventListeners();
    this.close();
  }


  /**
   * Open the tooltip on focus.
   */
  _onFocus() {
    this._addWindowEventListeners();
    this.open();
  }


  /**
   * Close the tooltip on blur.
   */
  _onBlur() {
    this._removeWindowEventListeners();
    this.close();
  }


  /**
   * Close the tooltip if we mouse over another element.
   * @param {Object} e
   */
  _onWindowMouseover(e) {
    if (e.target === this.el || hasParent(e.target, this.el)) return;
    this._onMouseout();
  }
}

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

export default Tooltip;
