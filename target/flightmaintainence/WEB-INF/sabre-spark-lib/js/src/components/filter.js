/**
 * # Filter
 * A container for a set of form fields used to filter a data set or search results
 *
 * @example
 * new Filter(el);
 *
 * @module components/filter.js
 */
import BaseComponent from './base';
import addClass from '../helpers/dom/add-class';
import hasClass from '../helpers/dom/has-class';
import toggleClass from '../helpers/dom/toggle-class';
import removeClass from '../helpers/dom/remove-class';
import FilterModule from './filter-module';
import animateHeight from '../helpers/animation/height';
import {get as getBreakpoint} from '../helpers/dom/breakpoint';

const noop = function() {};

class Filter extends BaseComponent {

  /**
   * Filter constructor.
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
    this._initFilterDisplay();
  }


  /**
   * Store a reference to the needed elements
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.moduleEls = this.el.querySelectorAll('.spark-filter-module');

    // These options are here so that the modules can communicate with the filter to do certain tasks
    var defaultOption = {
      onAfterExpand: this._onAfterExpand.bind(this),
      onAfterCollapse: this._onAfterCollapse.bind(this),
      //onShowAllComplete: this._onShowAllComplete.bind(this),
    };

    if (this.moduleEls.length > 0) {
      for(var i = 0; i < this.moduleEls.length; i ++) {
        if(typeof this.moduleOptions[i] !== 'undefined') {
          for(var key in defaultOption) {
            this.moduleOptions[i][key] = defaultOption[key];
          }
          this.moduleInsts[i] = new FilterModule(this.moduleEls[i], this.moduleOptions[i]);
        }
        else {
          this.moduleInsts[i] = new FilterModule(this.moduleEls[i], defaultOption);
        }
      }
    }

    this._filterToggleContainer = this.el.querySelector('.spark-filter__toggle-container');
    this._toggleFilterButton = this.el.querySelector('.spark-filter__toggle-button');
    this._toggleFilterLabel = this.el.querySelector('.spark-filter__toggle-button span');
    this._tagsContainer = this.el.querySelector('.spark-filter__tags-container');
    this._tagsCounter = this.el.querySelector('.spark-filter__applied-filters-counter');
    this._clearAllButton = this.el.querySelector('.spark-filter__clear-all');
    this._filterContent = this.el.querySelector('.spark-filter__content');
    this._modulesContainer = this.el.querySelector('.spark-filter__modules-container');
    this._viewMoreButton = this.el.querySelector('.spark-filter__view-more-filters');
    this._viewLessButton = this.el.querySelector('.spark-filter__view-less-filters');
    this._filterFooter = this.el.querySelector('.spark-filter__footer');
    this._buttonGroupEl = this.el.querySelector('.spark-filter__apply-btn-container');
    this._applyFiltersButton = this.el.querySelector('.spark-filter__btn-apply');
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._toggleViewBound = this._toggleView.bind(this);
    this._toggleFilterClickBound = this.toggleFilterClick.bind(this);
    this._onClearAllBound = this._onClearAll.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
  }


  /**
   * Add event listeners
   */
  _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.addEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.addEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.addEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.addEventListener('click', this._onClearAllBound);
  }


  /**
   * Remove event listeners
   */
  _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.removeEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.removeEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.removeEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.removeEventListener('click', this._onClearAllBound);
  }


  /**
   * Initialize filter
   */
   _initFilterDisplay() {
     this.initializingFilter = true;

     if (this.moduleEls.length > 0) {
       this.extraModulesExpanded = false;
     }

     addClass(this.el, 'spark-filter--initializing');

     this._determineFilterLayout();
   }


  /**
   * Determine which filter layout should be displayed i.e. Expand/Collapse view or Wide view
   */
  _determineFilterLayout() {
    this.currentBreakpoint = getBreakpoint(window.innerWidth);

    switch (this.currentBreakpoint) {
      case 'xs':
        this._curCol = 1;
        break;
      case 'sm':
        this._curCol = 2;
        break;
      case 'md':
        this._curCol = 3;
        break;
      default:
        this._curCol = 4;
        break;
    }

    if (this._curCol <= 1) {
      // Display expand-collapse filter
      if(!this._isDropdownState) {
        this._applyExpandCollapseLayout();
        this._showModule();
      }
    }
    else {
      // Display wide-screen filter
      if(this._expandCollapseState) {
        this._removeExpandCollapseLayout();
      }

      if ( hasClass(this._buttonGroupEl, 'is-fixed') ) {
        clearTimeout(this._timeout);
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        removeClass(this._buttonGroupEl, 'is-fixed');
      }

      this._showModule();

      if (!this.extraModulesExpanded) {
        this._hideModule(this._curCol, this._maxCol - 1);
      }
    }

    // Determine whether to show or hide View More/Less buttons
    if (!this._isDropdownState) {
      let hiddenModules = document.querySelectorAll('.spark-filter-module.hide');

      if (!this.extraModulesExpanded && hiddenModules.length === 0) {
        addClass(this._viewMoreButton, 'hide');
      }
      else if (!this.extraModulesExpanded && hiddenModules.length > 0) {
        removeClass(this._viewMoreButton, 'hide');
      }
    }
  }


  /**
   * Update the filter layout as necessary
   */
  _updateFilterLayout() {
    this._determineFilterLayout();
  }


  /**
   * Expand or collapse extra filters
   */
  _toggleView() {
    if (this._isFilterExpanded && !this.extraModulesExpanded) {
      this._showModule();
      this._dispatchVisibilityEvent();
    }
    else if (this._isFilterExpanded && this.extraModulesExpanded) {
      this._hideModule(this._curCol, this._maxCol - 1);
    }

    this.extraModulesExpanded = !this.extraModulesExpanded;
    toggleClass(this._viewMoreButton, 'hide');
    toggleClass(this._viewLessButton, 'hide');
  }


  /**
   * Handle click event when filter toggles are clicked
   */
  toggleFilterClick(){
    if (this.initializingFilter) {
      this.initializingFilter = false;
    }

    this.toggleFilter();
  }


  /**
   * To hide or show filter module
   * @params {String} toggle; collapse; expand;
   * @params {Boolean} Change the value of `this._isFilterExpanded` based on the boolean value
   */
  toggleFilter(option, noStateChange) {
    if (hasClass(this.el, 'spark-filter--initializing') && !this.initializingFilter) {
      removeClass(this.el, 'spark-filter--initializing');
      addClass(this.el, 'spark-filter--initialized');
    }

    if (option === 'expand') {
      if (!this.initializingFilter) {
        removeClass(this._filterContent, 'hide');

        animateHeight({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand'
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      }
      else {
        removeClass(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = true;
      }
    }
    else if(option === 'collapse'){
      if (!this.initializingFilter) {
        addClass(this._filterContent, 'hide');

        animateHeight({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse'
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      }
      else {
        addClass(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = false;
      }
    }
    else {
      toggleClass(this._filterContent, 'hide');

      if (hasClass(this.el, 'filter-expanded')) {
        animateHeight({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse',
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      }
      else {
        animateHeight({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand',
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      }

      if (!noStateChange) {
        this._isFilterExpanded = !this._isFilterExpanded;

        if ( hasClass(this.el, 'spark-filter--dropdown') && ( !(hasClass(this._filterContent, 'hide')) ) ) {
          this._calculateApplyBtnPosition();
        }
      }
    }

    if ( !(hasClass(this.el, 'spark-filter--dropdown')) && hasClass(this._buttonGroupEl, 'is-fixed') ){
      clearTimeout(this._timeout);
      this._filterFooter.removeAttribute('style');
      this._buttonGroupEl.removeAttribute('style');
      removeClass(this._buttonGroupEl, 'is-fixed');
    }

    this._dispatchVisibilityEvent();
  }


  /**
   * On-resize handler that updates layout as needed based on screen dimensions
   */
  _onResize() {
    this._updateFilterLayout();
  }


  /**
   * On-scroll handler that determines Apply button positioning at the xs breakpoint
   */
  _onScroll() {
    if(this._isDropdownState) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  }


  /**
   * Callback triggered after the expansion of a module at the xs breakpoint
   */
  _onAfterExpand() {
    if ( !(hasClass(this._buttonGroupEl, 'is-fixed')) ) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  }


  /**
   * Callback triggered after the collapse of a module at the xs breakpoint
   */
  _onAfterCollapse() {
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  }


  /**
   * Callback triggered after Show all is complete at the xs breakpoint
   */

  /* TODO: This is not required anymore as show all is not available at the xs breakpoint anymore
  _onShowAllComplete() {
    if(this._isDropdownState) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  }
  */


  /**
   * Dispatch a custom event so content inside the Filter can respond
   */
  _dispatchVisibilityEvent() {
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.el.dispatchEvent(e);
  }

  /**
   * Calculate the position of the Apply button at the xs breakpoint
   */
  _calculateApplyBtnPosition() {

    let filterOffsets = this.el.getBoundingClientRect();

    if ( filterOffsets.height > 255 ) { // 3 collapsed module heights + filter header height = 255
      let windowHeight = window.innerHeight;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      let filterHiddenBefore = scrollTop - (filterOffsets.top + document.body.scrollTop);
      let filterHiddenAfter = (filterOffsets.top + document.body.scrollTop + filterOffsets.height) - (scrollTop + windowHeight);

      if (!((scrollTop > (filterOffsets.top + document.body.scrollTop) + filterOffsets.height) || ((filterOffsets.top + document.body.scrollTop) > scrollTop + window.innerHeight))) {
        var percentInView = 100;
        var inViewport;
        var hiddenBefore = 0;
        var hiddenAfter = 0;

        if (filterHiddenBefore > 0) {
            percentInView -= (filterHiddenBefore * 100) / filterOffsets.height;
            hiddenBefore = filterHiddenBefore;
        }

        if (filterHiddenAfter > 0) {
            percentInView -= (filterHiddenAfter * 100) / filterOffsets.height;
            hiddenAfter = filterHiddenAfter;
        }

        inViewport = ((filterOffsets.height - (hiddenAfter + hiddenBefore)) / windowHeight)*100;
      }

      if (( filterOffsets.bottom > (window.innerHeight || document.documentElement.clientHeight) ) && (percentInView > 45 || inViewport > 50)) {
        let buttonGroupHeight = this._buttonGroupEl.offsetHeight;
        let filterWidth = filterOffsets.width;

        this._filterFooter.style.height = buttonGroupHeight + 'px';
        addClass(this._buttonGroupEl, 'is-fixed');
        this._buttonGroupEl.style.width = (filterWidth - 2) + 'px'; // accounting for border width
        this._buttonGroupEl.style.left = (filterOffsets.left + 1) + 'px'; // accounting for left border

        this._applyBtnPositionFixed();
      }
      else {
        this._applyBtnPositionRelative();
      }
    }
  }


  /**
   * Set position:relative for the Apply button
   */
  _applyBtnPositionRelative() {

    //function attachApplyBtn(){
    let currentButtonPosition = parseInt( getComputedStyle(this._buttonGroupEl).bottom );
    let listBottom = this._modulesContainer.getBoundingClientRect().bottom;
    let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    let buttonGroupHeight = this._buttonGroupEl.getBoundingClientRect().height;
    let distanceToMove = viewportHeight - (listBottom + buttonGroupHeight);

    if ( !(isNaN(currentButtonPosition)) ) {
      var animationListener = function(){
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        removeClass(this._buttonGroupEl, 'is-fixed');
        removeClass(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
        this._buttonGroupEl.removeEventListener('animationend', animationListener);
      };

      this._buttonGroupEl.addEventListener('animationend', animationListener.bind(this), false);

      let keyframe = '-webkit-transform: translateY(-' + distanceToMove + 'px); transform: translateY(-' + distanceToMove + 'px);';

      this._buttonGroupEl.setAttribute('style', this._buttonGroupEl.getAttribute('style') + ' ' + keyframe);
      addClass(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
    }
  }


  /**
   * Set position:fixed for the Apply button
   */
  _applyBtnPositionFixed() {
    var requestID = requestAnimationFrame( moveApplyBtn.bind(this) );
    var incrementer = .1;

    function moveApplyBtn() {
      incrementer += .01;
      var currentButtonPosition = parseInt( getComputedStyle(this._buttonGroupEl).bottom );
      var buttonHeight = parseInt( getComputedStyle(this._buttonGroupEl).height );

      if (currentButtonPosition < (buttonHeight * -1)) {
        currentButtonPosition = (buttonHeight * -1);
      }

      if ( currentButtonPosition > -1 ) {
        this._buttonGroupEl.style.bottom = '0px';
        cancelAnimationFrame(requestID);
      }
      else if (currentButtonPosition < 0) {
        currentButtonPosition += (1 / incrementer);
        this._buttonGroupEl.style.bottom = currentButtonPosition + 'px';
        requestAnimationFrame( moveApplyBtn.bind(this) );
      }
    }
  }


  /**
   * Callback for Clear all
   */
  _onClearAll() {
    (this.onClearAll || noop)();
  }


  /**
   * Show all modules
   */
  _showModule() {
    for(var i = 0; i < this.moduleEls.length; i++) {
      removeClass(this.moduleEls[i], 'hide');
    }
  }


  /**
   * Hide certain modules
   * @param {Number} start index
   * @param {Number} end index
   */
  _hideModule(start, end) {
    end = end || this.moduleEls.length - 1;
    for(var i = start; i <= end; i++) {
      addClass(this.moduleEls[i], 'hide');
    }
  }


  /**
   * Apply Expand/Collapse layout for the filter
   * Used when the filter gets to the xs breakpoint
   */
  _applyExpandCollapseLayout() {
    addClass(this.el,'spark-filter--dropdown');
    this._expandCollapseState = true;

    let tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for(var i = 0; i < tags.length; i++) {
        addClass(tags[i], 'hide');
      }
      removeClass(this._tagsCounter, 'hide');
    }

    addClass(this._viewMoreButton, 'hide');
    addClass(this._viewLessButton, 'hide');

    if (this._applyFiltersButton) {
      removeClass(this._applyFiltersButton, 'spark-btn--sm');
      addClass(this._applyFiltersButton, 'spark-btn--block');
    }

    for(var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._applyExpand();
    }

    this._isDropdownState = true;
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  }


  /**
   * Remove Expand/Collapse layout and apply the horizontal layout for the filter
   * Used when the screen size is larger than the xs breakpoint
   */
  _removeExpandCollapseLayout() {

    removeClass(this.el,'spark-filter--dropdown');
    this._expandCollapseState = false;
    this._filterFooter.removeAttribute('style');
    this._buttonGroupEl.removeAttribute('style');
    removeClass(this._buttonGroupEl, 'is-fixed');

    let tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for(var i = 0; i < tags.length; i++) {
        removeClass(tags[i], 'hide');
      }
      addClass(this._tagsCounter, 'hide');
    }

    if (this.extraModulesExpanded) {
      removeClass(this._viewLessButton, 'hide');
    }
    else {
      removeClass(this._viewMoreButton, 'hide');
    }

    if(this._applyFiltersButton) {
      addClass(this._applyFiltersButton, 'spark-btn--sm');
      removeClass(this._applyFiltersButton, 'spark-btn--block');
    }

    for(var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._disapplyExpand();
    }
    this._isDropdownState = false;
  }


  /**
   * Generate a tag element in filter, which will be directly posted inside `.spark-filter__tags-container`
   * @param {string} input name - Name of the input to allow any callbacks to target input specifically
   * @param {string} tag label - The label to be displayed in the tag. This could be the input's label or another user defined label
   * @param {function} callback function for `X` button
   */
  createTagEl(input, label, clearCallback) {
    var tagEl = document.createElement('div');
    tagEl.className = hasClass(this.el,'spark-filter--dropdown') ? 'spark-filter__tag hide' : 'spark-filter__tag';
    tagEl.setAttribute('data-filter-name', input);
    tagEl.innerHTML = '<span class="spark-filter__tag__label">'+ label +
                      '</span><i class="spark-icon spark-filter__tag__close"></i>';

    this._tagsContainer.insertBefore(tagEl, this._clearAllButton);

    // create event listener after adding element to DOM
    tagEl.querySelector('.spark-filter__tag__close').addEventListener('click', (clearCallback || noop));

    removeClass(this._clearAllButton, 'hide');

    // Show tag count if on small screen and this is initial application of filters
    if ( hasClass(this.el,'spark-filter--dropdown') ) removeClass(this._tagsCounter, 'hide');
  }


  /**
   * Remove all tags
   */
  clearAllTagEls() {
    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    for(var i=0; i < tags.length; i ++) {
      this._tagsContainer.removeChild(tags[i]);
    }

    // Reset counter
    var counter = this._tagsContainer.querySelector('span');
    counter.innerHTML = '0';

    addClass(this._clearAllButton, 'hide');
    addClass(this._tagsCounter, 'hide');
  }


  /**
   * Show Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */
  showModuleClearButton(moduleName) {
    for(var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].enableClearBtn();
      }
    }
  }


  /**
   * Disable Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */
  disableModuleClearButton(moduleName) {
    for(var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].disableClearBtn();
      }
    }
  }


  /**
   * Hide Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */
   hideModuleClearButton(moduleName) {
     for(var i = 0; i < this.moduleInsts.length; i++) {
       if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
         this.moduleInsts[i].hideClearBtn();
       }
     }
   }


  /**
   * Get Module Clear button status
   *  @param {Element} moduleName An identifier for the module being targeted
   */
  moduleClearButtonStatus(moduleName) {
    for(var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        return this.moduleInsts[i].getClearButtonStatus();
      }
    }
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
Filter.prototype._whitelistedParams = ['onClearAll', 'moduleOptions'];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Filter.prototype.defaults = {
  el: null,
  moduleEls: [],
  _filterToggleContainer: null,
  _toggleFilterButton: null,
  _toggleFilterLabel: null,
  _tagsContainer: null,
  _tagsCounter: null,
  _clearAllButton: null,
  _filterContent: null,
  _modulesContainer: null,
  _viewMoreButton: null,
  _viewLessButton: null,
  _filterFooter: null,
  _buttonGroupEl: null,
  _applyFiltersButton: null,
  moduleInsts: [],
  moduleOptions: [],
  maxCol: 4,
  onClearAll: noop,
  extraModulesExpanded: false,
  _isFilterExpanded: false,
  _isDropdownState: false,
  _isModuleExpand: true,
  _curCol: 4,
  _onResizeBound: null,
  _toggleViewBound: null,
  _toggleFilterClickBound: null,
  _onClearAllBound: null,
  _onScrollBound: null,
};

export default Filter;
