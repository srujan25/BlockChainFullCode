/**
 * # Filter Module
 * Module that contains an individual (or related) filters such as checkboxes
 *
 * @example
 * new FilterModule(el, params);
 *
 * @module components/filter-module.js
 */
import BaseComponent from './base';
import toggleClass from '../helpers/dom/toggle-class';
import removeClass from '../helpers/dom/remove-class';
import addClass from '../helpers/dom/add-class';
import hasClass from '../helpers/dom/has-class';
import Expand from './expand';
import Modal from './modal';

const noop = function() {};

class FilterModule extends BaseComponent {

  /**
   * Filter Module constructor.
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
   * Store a reference to the need elements
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this._showAllEl = this.el.querySelector('.spark-filter-module__show-all');
    if (this._showAllEl) {
      this._showAllToggleable = this._showAllEl.querySelector('span');
    }

    this._clearEls = this.el.querySelectorAll('.spark-filter-module__clear');
    this._hiddenEls = Array.prototype.slice.call(this.el.querySelectorAll('.spark-filter-module--hide'));
    this._headerEl = this.el.querySelector('.spark-filter-module__header');
    this._bodyEl = this.el.querySelector('.spark-filter-module__body');
    this._modalEl = this.el.querySelector('.spark-modal');
    this._modalSaveBtn = this.el.querySelector('.spark-filter-module__show-all__modal-button');
    this._modalClasses = [];

    if(this.onShowAll === 'modal') {
      this.modalInst = new Modal(this._modalEl);
    }
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onShowAllBound = this._onShowAll.bind(this);
    this._onClearBound = this._onClear.bind(this);
    this._onCloseModalBound = this._onCloseModal.bind(this);
  }


  /**
   * Add event listeners for touchstart and mouse click.
   */
  _addEventListeners() {
    !this._showAllEl || this._showAllEl.addEventListener('click', this._onShowAllBound);
    !this._modalSaveBtn || this._modalSaveBtn.addEventListener('click', this._onCloseModalBound);

    for (var i = 0; i < this._clearEls.length; i++) {
      !this._clearEls[i] || this._clearEls[i].addEventListener('click', this._onClearBound);
    }
  }


  /**
   * Remove event listeners for touchstart and mouse click.
   */
  _removeEventListeners() {
    if(this._showAllEl) {
      this._showAllEl.removeEventListener('click', this._onShowAllBound);
      this._modalSaveBtn.removeEventListener('click', this._onCloseModalBound);

      for (var i = 0; i < this._clearEls.length; i++) {
        !this._clearEls[i] || this._clearEls[i].removeEventListener('click', this._onClearBound);
      }
    }
  }


  /**
   * Show any hidden filters within a module or run provided function if available
   */
  _onShowAll() {
    if(typeof this.onShowAll === 'function') {
      (this.onShowAll || noop)(this);
    }
    else {
      if(this.onShowAll === 'toggle' || (this.onShowAll === 'modal' && this._isExpand)) {
        this._toggleShowAllLabel();
        this.toggleHiddenContent();
      }
      else if (this.onShowAll === 'modal' && !this._isExpand) {
        this.modalInst.open();
      }

      (this.onShowAllComplete || noop)();
    }
  }


  /**
   * Toggle Show More label text
   */
  _toggleShowAllLabel() {
    this._showAllToggleable.innerHTML = this._showAllToggleable.innerHTML === 'more' ? 'fewer' : 'more';
  }


  /**
   * Callback after clicking `Clear` button
   */
  _onClear() {
    (this.onClear || noop)(this);
  }


  /**
   * Callback after clicking `Save` button
   */
  _onCloseModal() {
    (this.onModalClose || noop)();

    this.modalInst.close();
  }


  /**
   * Enable clear button
   */
  enableClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      removeClass(this._clearEls[i], 'spark-filter-module__clear--disabled');
      removeClass(this._clearEls[i], 'spark-filter-module__clear--hidden');
    }
  }


  /**
   * Disable clear button
   */
  disableClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      addClass(this._clearEls[i], 'spark-filter-module__clear--disabled');
    }
  }


  /**
   * Hide clear button
   */
  hideClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      addClass(this._clearEls[i], 'spark-filter-module__clear--hidden');
    }
  }


  /**
   * Determine if Clear button is hidden or disabled
   */
  getClearButtonStatus() {
    let buttonEnabled = false;

    for (var i = 0; i < this._clearEls.length; i++) {
      if (hasClass(this._clearEls[i], 'spark-filter-module__clear--hidden') || hasClass(this._clearEls[i], 'spark-filter-module__clear--disabled')) {
        buttonEnabled = false;
      }
      else {
        buttonEnabled = true;
      }
    }

    return buttonEnabled;
  }


  /**
   * Hide or show extra filters elements as triggered by Show more/fewer
   */
  toggleHiddenContent() {
    for(var i = 0; i < this._hiddenEls.length; i ++) {
      toggleClass(this._hiddenEls[i], 'show');
    }
  }


  /**
   * Change filter-module to expand/collapse variation
   * This occurs when the filter is at the xs breakpoint
   */
  _applyExpand() {
    if(this._modalEl) {
      var modalClsNames = [
        'spark-filter-module--hide',
        '',
        '',
        '',
      ];

      this._hiddenEls.push(this._modalEl);
      var curEl = this._modalEl;

      for(var i = 0; i < modalClsNames.length; i++) {
        this._modalClasses[i] = curEl.className;
        curEl.className = modalClsNames[i];
        curEl = curEl.firstElementChild;
      }

      if (hasClass(document.body, 'spark-modal-open')) {
        removeClass(document.body, 'spark-modal-open');
      }

      this.modalInst.remove(true);
    }

    addClass(this.el, 'spark-panel', 'spark-panel--expand');
    addClass(this._headerEl, 'spark-panel__header');
    this._headerEl.setAttribute('role','heading');
    this._headerEl.setAttribute('tabindex','0');
    addClass(this._bodyEl, 'spark-panel__content');

    this._expandInst = new Expand(this.el, {
      onAfterExpand: this.onAfterExpand,
      onAfterCollapse: this.onAfterCollapse,
    });

    this._isExpand = true;
  }


  /**
   * Change filter-module from expand/collapse to horizontal variation
   */
  _disapplyExpand() {
    if(this._modalEl) {

      if (hasClass(this._modalEl, 'show')) {
        this._toggleShowAllLabel();
      }

      this._hiddenEls.pop();
      var curEl = this._modalEl;

      for(var i = 0; i < this._modalClasses.length; i++) {
        curEl.className = this._modalClasses[i];
        curEl = curEl.firstElementChild;
      }

      this.modalInst = new Modal(this._modalEl);
    }

    removeClass(this.el, 'spark-panel', 'spark-panel--expand');
    removeClass(this._headerEl, 'spark-panel__header');
    this._headerEl.removeAttribute('role');
    this._headerEl.removeAttribute('tabindex');
    removeClass(this._bodyEl, 'spark-panel__content');
    this._expandInst.remove(true);
    this._isExpand = false;
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
FilterModule.prototype._whitelistedParams = ['onShowAll', 'onShowAllComplete', 'onModalClose', 'onClear', 'onAfterExpand', 'onAfterCollapse'];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
FilterModule.prototype.defaults = {
  el: null,
  onShowAll: noop,
  onShowAllComplete: noop,
  onModalClose: noop,
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
  dataSet: {},
};

export default FilterModule;
