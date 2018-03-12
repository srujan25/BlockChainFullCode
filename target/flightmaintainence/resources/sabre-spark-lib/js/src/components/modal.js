/**
 * # Modal
 * Show content in a modal.
 *
 * @example
 * new Modal(el);
 *
 * @module components/modal.js
 */
import BaseComponent from './base';
import toggleClass from '../helpers/dom/toggle-class';
import addClass from '../helpers/dom/add-class';
import removeClass from '../helpers/dom/remove-class';
import hasClass from '../helpers/dom/has-class';
import getParent from '../helpers/traversal/get-parent';

class Modal extends BaseComponent {

  /**
   * Modal constructor.
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
   * Open
   */
  open() {

    this.isActive = true;
    document.activeElement ? this.focusedElBeforeOpen = document.activeElement : null;

    let modalFocusableEls = this.modalEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    if ( modalFocusableEls.length > 0 ) {
      this.modalFocusableEls = Array.prototype.slice.call(modalFocusableEls);
      this.firstModalFocusableEl = this.modalFocusableEls[0];
      this.lastModalFocusableEl = this.modalFocusableEls[ this.modalFocusableEls.length - 1 ];
    }

    this._addWindowEventListeners();
    this._updateClasses();
    addClass(document.body, 'spark-modal-open');

    // Set focus to close button once modal has been displayed
    if ( modalFocusableEls.length > 0 ) {
      this.firstModalFocusableEl.focus();
    }

    return this;
  }


  /**
   * Close
   */
  close() {

    this.isActive = false;
    this.focusedElBeforeOpen ? this.focusedElBeforeOpen.focus() : null;
    this._removeWindowEventListeners();
    this._updateClasses();
    removeClass(document.body, 'spark-modal-open');

    return this;
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   * @param {Object} params
   */
  update(el, params = {}) {

    this._removeEventListeners();
    this._cacheElements(el || this.el, params);
    this._addEventListeners();
    this._updateClasses();
    this._removeWindowEventListeners();

    if (this.isActive) {
      this._addWindowEventListeners();
    }

    return this;
  }


  /**
   * Store a reference to the element. Either a modal itself
   * or a button referencing a modal may be passed.
   * @param {Element} el
   * @param {Element} params @optional
   */
  _cacheElements(el, params) {

    var modalPassed = hasClass(el, 'spark-modal');
    var modalEl = params.modalEl;

    if (modalPassed) {
      this.modalEl = el;
    }
    else {
      this.el = el;
      this.modalEl = modalEl || document.querySelector(el.getAttribute('data-modal'));
    }

    this.scrollEl = this.modalEl.querySelector('.spark-modal__scroll') || this.modalEl;

    this.isActive = hasClass(this.el || this.modalEl, 'active');
  }


  /**
   * Update classes for the open or close state.
   */
  _updateClasses() {
    toggleClass(this.modalEl, 'active', this.isActive);
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onKeyupBound = this._onKeyup.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onModalClickBound = this._onModalClick.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    if (this.el) this.el.addEventListener('click', this._onClickBound);
    if (this.modalEl) this.modalEl.addEventListener('click', this._onModalClickBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    if (this.el) this.el.removeEventListener('click', this._onClickBound);
    if (this.modalEl) this.modalEl.removeEventListener('click', this._onModalClickBound);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addWindowEventListeners() {
    this._removeWindowEventListeners();
    window.addEventListener('keyup', this._onKeyupBound);
    window.addEventListener('keydown', this._onKeydownBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeWindowEventListeners() {
    window.removeEventListener('keyup', this._onKeyupBound);
    window.removeEventListener('keydown', this._onKeydownBound);
  }


  /**
   * When the button is clicked.
   * @param {Object} e
   */
  _onClick() {
    this.open();
  }


  /**
   * When we are clicked, toggle the opened state.
   * @param {Object} e
   */
  _onModalClick(e) {

    // The close button is clicked or the actual modal (gray area)
    if (e.target === this.scrollEl || e.target === this.modalEl || getParent(e.target, '.spark-modal__close, .spark-modal__dismiss', this.scrollEl)) {
      e.preventDefault();
      this.close();
    }
  }


  /**
   * When tabbing backwards, localize traversal to modal elements only
   * @param {Object} e
   */
  _onBackwardTab(e) {
    if ( document.activeElement === this.firstModalFocusableEl ) {
      e.preventDefault();
      this.lastModalFocusableEl.focus();
    }
  }


  /**
   * When tabbing forwards, localize traversal to modal elements only
   * @param {Object} e
   */
  _onForwardTab(e) {
    if ( document.activeElement === this.lastModalFocusableEl ) {
      e.preventDefault();
      this.firstModalFocusableEl.focus();
    }
  }


  /**
   * When a key is pressed on the window and it's an ESC, close the modal.
   * @param {Object} e
   */
  _onKeyup(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }


  /**
   * When a key is pressed and it is the Tab key or Shift+Tab keys, determine whether to adjust focus
   * @param {Object} e
   */
  _onKeydown(e) {
    if (e.keyCode === 9) {
      if ( this.modalFocusableEls.length === 1 ) {
        e.preventDefault();
      }

      if (e.shiftKey) {
        this._onBackwardTab(e);
      }
      else {
        this._onForwardTab(e);
      }
    }

    if (e.keyCode === 13) {
      if (e.target === document.querySelector('.spark-modal__close') || e.target === document.querySelector('.spark-modal__dismiss')) {
        e.preventDefault();
        this.close();
      }
    }
  }
}


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

export default Modal;
