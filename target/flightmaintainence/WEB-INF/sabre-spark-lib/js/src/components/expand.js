/**
 * # Expand
 * Expand and collapse an element.
 *
 * @example
 * new Expand(el);
 *
 * @module components/expand.js
 */
import BaseComponent from './base';
import animateHeight from '../helpers/animation/height';
import toggleClass from '../helpers/dom/toggle-class';
import hasClass from '../helpers/dom/has-class';
import getParent from '../helpers/traversal/get-parent';

const noop = function() {};

class Expand extends BaseComponent {

  /**
   * Expand constructor.
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
  }


  /**
   * Expand
   */
  expand() {

    (this.onBeforeExpand || noop)();

    animateHeight({
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
    if(this.el.querySelector('input')) {
      this.el.querySelector('input').focus();
    }

    (this.onAfterExpand || noop)();

    return this;
  }


  /**
   * Collapse
   */
  collapse() {

    (this.onBeforeCollapse || noop)();

    animateHeight({
      el: this.el,
      toggleEl: '.spark-expand__content, .spark-panel__content',
      toggleValue: 'none',
      action: 'collapse'
    });

    this.isExpanded = false;
    this._updateClasses();

    (this.onAfterCollapse || noop)();

    return this;
  }


  /**
   * Toggle the expand state.
   */
  toggle() {
    return this[this.isExpanded ? 'collapse' : 'expand']();
  }


  /**
   * Store a reference to the element.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.isExpanded = hasClass(this.el, 'expanded');

    this.accordionHeading = this.el.querySelector('[role="heading"]');
    this.accordionContent = this.el.querySelector('.spark-panel__content');

    this.panelContent = this.el.querySelector('.spark-expand__content');
    this.panelCollapsedButton = this.el.querySelector('.spark-expand__hide--expanded');
    this.panelExpandedButton = this.el.querySelector('.spark-expand__show--expanded');
  }


  /**
   * Update classes for the expand or collapse state.
   */
  _updateClasses() {
    toggleClass(this.el, 'expanded', this.isExpanded);
    this._updateAriaAttributes();
  }


  /**
   * Update aria attributes for the expand or collapse state.
   */
  _updateAriaAttributes() {
    if (this.isExpanded) {
      this.accordionHeading ? this.accordionHeading.setAttribute('aria-expanded', 'true') : null;
      this.accordionContent ? this.accordionContent.setAttribute('aria-hidden', 'false') : null;

      this.panelContent ? this.panelContent.setAttribute('aria-hidden', 'false') : null;
      this.panelCollapsedButton ? this.panelCollapsedButton.setAttribute('aria-hidden', 'true') : null;
      this.panelExpandedButton ? this.panelExpandedButton.setAttribute('aria-hidden', 'false') : null;
    }
    else {
      this.accordionHeading ? this.accordionHeading.setAttribute('aria-expanded', 'false') : null;
      this.accordionContent ? this.accordionContent.setAttribute('aria-hidden', 'true') : null;

      this.panelContent ? this.panelContent.setAttribute('aria-hidden', 'true') : null;
      this.panelCollapsedButton ? this.panelCollapsedButton.setAttribute('aria-hidden', 'false') : null;
      this.panelExpandedButton ? this.panelExpandedButton.setAttribute('aria-hidden', 'true') : null;
    }
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('keydown', this._onKeydownBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
  }


  /**
   * When we are clicked, toggle the expanded state.
   * @param {Object} e
   */
  _onClick(e) {

    if (!getParent(e.target, '.spark-expand__toggle, [data-role="toggle"], [role="heading"]', this.el)) {
      return;
    }

    e.preventDefault();
    this.toggle();
  }


  /**
   * When the space or enter key is pressed on the toggle, toggle!
   * @param {Object} e
   */
  _onKeydown(e) {

    if (!getParent(e.target, '.spark-expand__toggle, [data-role="toggle"], [role="heading"]', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    // Space or enter
    if (code === 32 || code === 13) {
      e.preventDefault();
      this.toggle();
    }
  }
}


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

export default Expand;
