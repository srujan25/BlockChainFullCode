/**
 * # Step Indicator
 * Set of indicators represent different steps
 *
 * @example
 * new StepIndicator(el, params);
 *
 * @module components/step-indicator.js
 */
import BaseComponent from './base';
import addClass from '../helpers/dom/add-class';
import removeClass from '../helpers/dom/remove-class';
import hasClass from '../helpers/dom/has-class';
import getParent from '../helpers/traversal/get-parent';
import debounce from '../helpers/util/debounce';

const noop = function() {};

class StepIndicator extends BaseComponent {

  /**
   * StepIndicator constructor.
   * @param {Element} el
   * @param {Object} params
   */
  constructor(el, params = {}) {

    if (!super(el, params)) {
      return;
    }

    this._bindEventListenerCallbacks();
    this._addEventListeners();
    this._calculateStyle();
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._parseParams();
    this._addEventListeners();
    this._calculateStyle();

    return this;
  }


  /**
   * Store a reference to the element.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.containerEl = this.containerEl || el.parentNode;
    this._body = this.el.querySelector('.spark-step-indicator__body');
    this._list = this.el.querySelector('.spark-step-indicator__list');
    this._items = this.el.querySelectorAll('.spark-step-indicator__item');
  }


  /**
   * Parse parameters from the element.
   */
  _parseParams() {
    this.type = this.type !== null ? this.type : (this.el.attributes['data-type'] && this.el.attributes['data-type'].value);
    this.header = this.header !== null ? this.header : (this.el.attributes['data-header'] && true);
    this.subtitle = this.subtitle !== null ? this.subtitle : (this.el.attributes['data-subtitle'] && true);
    this.dropdownLabel = this.dropdownLabel !== null ? this.dropdownLabel : (this.el.attributes['data-dropdownLabel'] && this.el.attributes['data-dropdownLabel'].value);

    if (!this.dropdownLabel) {
      this.dropdownLabel = 'Select a Step';
    }
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._onLoadBound = this._onLoad.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._toggleDropdownBound = this._toggleDropdown.bind(this);
    this._onKeydownBound = debounce(this._onKeydown.bind(this), 100);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);
    window.addEventListener('load', this._onLoadBound);
    this.el.addEventListener('keydown', this._onKeydownBound);
    document.addEventListener('spark.step-indicator', this._toggleDropdownBound, true);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);
    document.removeEventListener('click', this._toggleDropdownBound);
    window.removeEventListener('load', this._onLoadBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
    document.removeEventListener('spark.step-indicator', this._toggleDropdownBound, true);
  }


  /**
   * Change selected step state into incomplete
   * @param {Int} index of selected step
   */
  _resetStepState(stepIndex) {
    if( stepIndex < 0 || stepIndex >= this._items.length ) {
      return;
    }

    removeClass(this._items[stepIndex], ['spark-step-indicator__item--completed', 'spark-step-indicator__item--current', 'spark-step-indicator__item--disabled']);
    this._items[stepIndex].removeAttribute('tabindex');
  }


  /**
   * Set selected step state: completed/current/disabled/incomplete
   * For current step, will remove current step from other steps
   * @param {Int} index of selected step
   * @param {String} state to be set
   */
  setStepState(stepIndex, state) {
    if( stepIndex < 0 || stepIndex >= this._items.length ) {
      return this;
    }
    switch(state) {
      case 'completed':
        this._resetStepState(stepIndex);
        addClass(this._items[stepIndex], 'spark-step-indicator__item--completed');
        break;
      case 'current':
        var currentStep = this._list.querySelector('.spark-step-indicator__item--current');
        removeClass(currentStep, 'spark-step-indicator__item--current');
        addClass(this._items[stepIndex], 'spark-step-indicator__item--current');
        break;
      case 'disabled':
        this._resetStepState(stepIndex);
        addClass(this._items[stepIndex], 'spark-step-indicator__item--disabled');
        this._items[stepIndex].setAttribute('tabindex', '-1');
        break;
      case 'incomplete':
        this._resetStepState(stepIndex);
        break;
    }
    this._calculateStyle();
    return this;
  }


  /**
   * When the Enter key is pressed toggle the dropdown or update the selection if in dropdown mode
   * When the Tab key is pressed, navigate to the next element by default otherwise collapse the dropdown
   * @param {Object} Reference of DOM obj
   * @param {Object} Event of click
   */
  _onKeydown(e) {
    if (!getParent(e.target, '.spark-step-indicator__list', this.el) && !getParent(e.target, '.spark-step-indicator__body--dropdown', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    // Enter Key
    if (code === 13) {
      if ( hasClass(e.target, 'spark-step-indicator__item--dropdown__header') ) {
        e.preventDefault();
        this._toggleDropdown(e);
      }
    }

    // Tab Key - Check if focus has now shifted outside of the Step Indicator Dropdown
    if (code === 9) {
      hasClass(document.activeElement, 'spark-step-indicator__item') === false && this._dropdownExpand === true ? this._toggleDropdown(e) : null;
    }
  }


  /**
   * Provide a method to bind click callback function to certain step.
   * @param {Array} a set of step indices represent the target of callback
   * @param {Function} callback function
   */
  bindStepClickCallback(indexArr, callback) {
    callback = callback || noop;
    for(var i=0; i < indexArr.length; i++) {
      this._items[indexArr[i]].addEventListener('click', callback);
    }
    return this;
  }


  /**
   * Remove click callback from steps
   * @param {Array} a set of step indices represent the target of callback
   * @param {Function} callback function
   *
   */
  removeStepClickCallback(indexArr, callback) {
    callback = callback || noop;
    for(var i=0; i < indexArr.length; i++) {
      this._items[indexArr[i]].removeEventListener('click', callback);
    }
    return this;
  }


  /**
   * Work for _calculateStyle.
   * Comparing the width of list and total items, including padding
   * @return {Boolean}
   */
  _isOverWidth() {
    var listWidth = this._list.offsetWidth;
    var itemTotalWidth = this._listPaddingTotal;
    for (var i = 0; i < this._items.length; i++) {
      itemTotalWidth += this._items[i].offsetWidth;
    }
    if( listWidth < itemTotalWidth ) {
      return true;
    }
    return false;
  }


  /**
   * Calcuate different style based settings
   */
  _calculateStyle() {
    if(!this.header) {
      var titleEl = this.el.querySelector('.spark-step-indicator__title');
      titleEl.style.display = 'none';
      addClass(this._body, 'spark-step-indicator__body--no-border');
    }
    if(!this.subtitle) {
      var subtitleEl = this.el.querySelector('.spark-step-indicator__subtitle');
      subtitleEl.style.display = 'none';
    }
    // Remove special DOM and Class of dropdown variation
    this._switchFromDropdown();
    switch(this.type) {
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
    if(isIE11) {
      this._addItemWidth();
    }
  }


  /**
   * For IE11 ONLY, Add width: 100% to work around IE11 bug
   * IE11 will have incorrect position with flex-grow max-width and justify-content when items hit max-width
   * Sometimes after calculating, even itemTotalWidth is less 1px than listWidth,
   * it also means items are fit in the list, not hit the max-width
   * So add 2px to list width when comparing to avoid this.
   */
  _addItemWidth() {
    if( !hasClass(this._list, 'spark-step-indicator__list--condensed') &&
       !hasClass(this._body, 'spark-step-indicator__body--dropdown') ) {
      var listWidth = this._list.offsetWidth;
      var itemTotalWidth = this._listPaddingTotal;
      for (var i = 0; i < this._items.length; i++) {
        itemTotalWidth += this._items[i].offsetWidth;
      }
      if(listWidth - itemTotalWidth > 2) {
        this._switchWidthForIe11(0, true);
      }
      else {
        this._switchWidthForIe11(0, false);
      }
    }
    else {
      this._switchWidthForIe11(0, false);
    }
  }


  /**
   * Switch spark-step-indicator__item style width: 100% to work around IE11 bug
   * @param {Number} start index of step
   * @param {Boolean} whether add width: 100%
   */
  _switchWidthForIe11(index, val) {
    for (var i = index; i < this._items.length; i++) {
      this._items[i].style.width = val ? '100%' : '';
    }
  }


  /**
   * Fix on large variation
   * Calculate node and list length remove connect line of each end
   * Sometimes after calculating, even itemTotalWidth is bigger 1px than listWidth,
   * it also means items are fit in the list, not over width.
   * So add 2px to list width when comparing to avoid this.
   * Dependency of _calculateCondensedStyle() and _calculateStandardStyle()
   *
   */
  _calculateLargeStyle() {
    this._list.style['flex-wrap'] = 'wrap';
    var listWidth = this._list.offsetWidth;
    var itemTotalWidth = this._listPaddingTotal;
    for (var i = 0; i < this._items.length; i++) {
      removeClass(this._items[i], 'noline');
      itemTotalWidth += this._items[i].offsetWidth;

      if(listWidth < itemTotalWidth && i > 0) {
        addClass(this._items[i-1], 'noline');
        itemTotalWidth = this._items[i].offsetWidth + this._listPaddingTotal;
      }
    }
  }


  /**
   * Fix on condensed variation
   * Same as fix large variation except CSS class
   */
  _calculateCondensedStyle(){
    addClass(this._list, 'spark-step-indicator__list--condensed');
    this._calculateLargeStyle();
  }


  /**
   * Fix on dropdown variation
   */
  _calculateDropdownStyle(){
    this._switchToDropdown();
  }


  /**
   * Change only between large and condensed variation
   * no dropdown variation
   */
  _calculateStandardStyle() {
    this._list.style.visibility = 'hidden';
    for (var i = 0; i < this._items.length; i++) {
      removeClass(this._items[i], 'noline');
    }
    removeClass(this._list, 'spark-step-indicator__list--condensed');
    if(this._isOverWidth()) {
      addClass(this._list, 'spark-step-indicator__list--condensed');
      this._calculateLargeStyle();
    }
    this._list.style.visibility = 'visible';
  }


  /**
   * Make list invisible and change it into large variation at first.
   * Switch variation from top to bottom to find the fit one
   */
  _calculateRespStyle() {
    this._list.style.visibility = 'hidden';
    removeClass(this._list, 'spark-step-indicator__list--condensed');
    if(this._isOverWidth()) {
      addClass(this._list, 'spark-step-indicator__list--condensed');
      if(this._isOverWidth()) {
        removeClass(this._list, 'spark-step-indicator__list--condensed');
        this._switchToDropdown();
      }
    }
    this._list.style.visibility = 'visible';
  }


  /**
   * Create header element for dropdown variation
   * Try to find the current step of indicator and show it on the header
   * if not found, show the first step
   * @return {Object} header element of dropdown variation
   */
  _createDropdownHeader() {
    var el = document.createElement('a');
    var currentStep = this._list.querySelector('.spark-step-indicator__item--current');
    // Can not find current step
    if(!currentStep) {
      currentStep = this._items[0];
    }

    // Set ARIA roles and attributes
    el.setAttribute('role', 'button');
    el.setAttribute('aria-expanded', 'false');
    let listID = (this._list.getAttribute('id') !== null && this._list.getAttribute('id') !== '') ? this._list.getAttribute('id') : '';
    el.setAttribute('aria-controls', listID);

    el.innerHTML = currentStep.innerHTML;
    el.innerHTML += '<span class="spark-step-indicator__notice">' + this.dropdownLabel + '</span>';

    // Create label element like '2 of 7'
    var stepNotice = document.createElement('span');
    var currentIndex = Array.prototype.indexOf.call(this._items, currentStep);
    stepNotice.innerHTML = (currentIndex + 1) + ' of ' + this._items.length;
    stepNotice.className = 'spark-step-indicator__label--dropdown';

    el.appendChild(stepNotice);
    el.className = currentStep.className;
    el.setAttribute('tabindex', '0');

    addClass(el,'spark-step-indicator__item--dropdown__header');
    this._dropdownHeader = el;
  }


  /**
   * Some extra event binder and DOM of dropdown variation need to be set
   */
  _switchToDropdown() {
    addClass(this._body, 'spark-step-indicator__body--dropdown');
    this._createDropdownHeader();
    this._list.parentNode.insertBefore(this._dropdownHeader, this._list);
    document.removeEventListener('click', this._toggleDropdownBound);
    document.addEventListener('click', this._toggleDropdownBound);
    addClass(this._list, 'collapse');

    for( let i = 0; i < this._items.length; i++) {
      if( !hasClass(this._items[i], 'spark-step-indicator__item--disabled') ){
        this._items[i].setAttribute('tabindex', '-1');
      }
    }
  }


  /**
   * Remove extra event and DOM when switch variation from dropdown
   */
  _switchFromDropdown() {
    removeClass(this._body, 'spark-step-indicator__body--dropdown');
    var header = this._list.parentNode.querySelector('.spark-step-indicator__item--dropdown__header');
    document.removeEventListener('click', this._toggleDropdownBound);
    if(header) {
      this._list.parentNode.removeChild(header);
    }
    removeClass(this._list, 'collapse');

    for( let i = 0; i < this._items.length; i++) {
      if( !hasClass(this._items[i], 'spark-step-indicator__item--disabled') ){
        this._items[i].removeAttribute('tabindex');
      }
    }
  }


  /**
   * Allow programmatic toggling of Dropdown version of Step Indicator.
   * This becomes desirable particularly in the case of single page applications
   */
  toggle() {
    if ( this._dropdownHeader ) {
      let e = document.createEvent('Event');
      e.initEvent('spark.step-indicator', true, true);
      this._dropdownHeader.dispatchEvent(e);
    }
  }


  /**
   * Toggle collapse/expand state of step list in dropdown variation
   * If there is a scroll in dropdown variation, scroll to 'current' node
   * @param {Object} Reference of DOM obj
   * @param {Object} Event of click
   */
  _toggleDropdown(e) {
    var target = e.target || e.srcElement;
    if( this._dropdownHeader.contains(target) ) {
      if(!this._dropdownExpand) {
        removeClass(this._list, 'collapse');
        addClass(this._dropdownHeader , 'expand');
        this._dropdownExpand = true;
        this._dropdownHeader.setAttribute('aria-expanded', 'true');

        for( let i = 0; i < this._items.length; i++) {
          if( !hasClass(this._items[i], 'spark-step-indicator__item--disabled') ){
            this._items[i].removeAttribute('tabindex');
          }
        }
      }
      else {
        addClass(this._list, 'collapse');
        removeClass(this._dropdownHeader , 'expand');
        this._dropdownExpand = false;
        this._dropdownHeader.setAttribute('aria-expanded', 'false');

        for( let i = 0; i < this._items.length; i++) {
          if( !hasClass(this._items[i], 'spark-step-indicator__item--disabled') ){
            this._items[i].setAttribute('tabindex', '-1');
          }
        }
      }
    }
    else {
      addClass(this._list, 'collapse');
      removeClass(this._dropdownHeader , 'expand');
      this._dropdownExpand = false;
      this._dropdownHeader.setAttribute('aria-expanded', 'false');

      for( let i = 0; i < this._items.length; i++) {
        if( !hasClass(this._items[i], 'spark-step-indicator__item--disabled') ){
          this._items[i].setAttribute('tabindex', '-1');
        }
      }
    }
    if(this._list.offsetHeight > 0) {
      var scrollMove = 0;
      for( let i = 0; i < this._items.length; i ++) {
        if( hasClass(this._items[i], 'spark-step-indicator__item--current') ){
          this._list.scrollTop = scrollMove;
          break;
        }
        scrollMove += this._items[i].offsetHeight;
      }
    }
  }


  /**
   * When the window finish loading
   */
  _onLoad() {
    this._checkPadding();
    this._calculateStyle();
  }


  /**
   * When the window is resized, base on params make some reponsive change.
   */
  _onResize() {
    this._checkPadding();
    this._calculateStyle();
  }


  /**
   * Padding is applied to condensed step indicators but not large step indicators.
   * Therefore as large indicators transition to condensed ones and vice versa, verify
   * the padding values in order to properly calculate positioning of divider line classes
   */
  _checkPadding() {
    // Cache list left + right padding for width calculating
    var listStyles = getComputedStyle(this._list);
    var listPaddingLeft = parseInt(listStyles.getPropertyValue('padding-left'), 10);
    var listPaddingRight = parseInt(listStyles.getPropertyValue('padding-right'), 10);
    this._listPaddingTotal = listPaddingLeft + listPaddingRight;
  }


  /**
   * When a parent container shows its children and our element
   * is inside of it, resize
   * @param  {Object} e
   */
  _onVisible(e) {
    if(e.target.contains(this.el)) {
      window.setTimeout(function() {
        this._calculateStyle();
      }.bind(this),0);
    }
  }
}


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

export default StepIndicator;
