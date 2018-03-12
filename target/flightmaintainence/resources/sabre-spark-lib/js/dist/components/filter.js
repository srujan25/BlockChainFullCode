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

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _filterModule = require('./filter-module');

var _filterModule2 = _interopRequireDefault(_filterModule);

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

var _breakpoint = require('../helpers/dom/breakpoint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Filter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A container for a set of form fields used to filter a data set or search results
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Filter(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/filter.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Filter = function (_BaseComponent) {
  _inherits(Filter, _BaseComponent);

  /**
   * Filter constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Filter(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Filter);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._initFilterDisplay();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the needed elements
   * @param {Element} el
   */


  Filter.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.moduleEls = this.el.querySelectorAll('.spark-filter-module');

    // These options are here so that the modules can communicate with the filter to do certain tasks
    var defaultOption = {
      onAfterExpand: this._onAfterExpand.bind(this),
      onAfterCollapse: this._onAfterCollapse.bind(this)
      //onShowAllComplete: this._onShowAllComplete.bind(this),
    };

    if (this.moduleEls.length > 0) {
      for (var i = 0; i < this.moduleEls.length; i++) {
        if (typeof this.moduleOptions[i] !== 'undefined') {
          for (var key in defaultOption) {
            this.moduleOptions[i][key] = defaultOption[key];
          }
          this.moduleInsts[i] = new _filterModule2.default(this.moduleEls[i], this.moduleOptions[i]);
        } else {
          this.moduleInsts[i] = new _filterModule2.default(this.moduleEls[i], defaultOption);
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
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Filter.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._toggleViewBound = this._toggleView.bind(this);
    this._toggleFilterClickBound = this.toggleFilterClick.bind(this);
    this._onClearAllBound = this._onClearAll.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
  };

  /**
   * Add event listeners
   */


  Filter.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.addEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.addEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.addEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.addEventListener('click', this._onClearAllBound);
  };

  /**
   * Remove event listeners
   */


  Filter.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.removeEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.removeEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.removeEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.removeEventListener('click', this._onClearAllBound);
  };

  /**
   * Initialize filter
   */


  Filter.prototype._initFilterDisplay = function _initFilterDisplay() {
    this.initializingFilter = true;

    if (this.moduleEls.length > 0) {
      this.extraModulesExpanded = false;
    }

    (0, _addClass2.default)(this.el, 'spark-filter--initializing');

    this._determineFilterLayout();
  };

  /**
   * Determine which filter layout should be displayed i.e. Expand/Collapse view or Wide view
   */


  Filter.prototype._determineFilterLayout = function _determineFilterLayout() {
    this.currentBreakpoint = (0, _breakpoint.get)(window.innerWidth);

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
      if (!this._isDropdownState) {
        this._applyExpandCollapseLayout();
        this._showModule();
      }
    } else {
      // Display wide-screen filter
      if (this._expandCollapseState) {
        this._removeExpandCollapseLayout();
      }

      if ((0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
        clearTimeout(this._timeout);
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
      }

      this._showModule();

      if (!this.extraModulesExpanded) {
        this._hideModule(this._curCol, this._maxCol - 1);
      }
    }

    // Determine whether to show or hide View More/Less buttons
    if (!this._isDropdownState) {
      var hiddenModules = document.querySelectorAll('.spark-filter-module.hide');

      if (!this.extraModulesExpanded && hiddenModules.length === 0) {
        (0, _addClass2.default)(this._viewMoreButton, 'hide');
      } else if (!this.extraModulesExpanded && hiddenModules.length > 0) {
        (0, _removeClass2.default)(this._viewMoreButton, 'hide');
      }
    }
  };

  /**
   * Update the filter layout as necessary
   */


  Filter.prototype._updateFilterLayout = function _updateFilterLayout() {
    this._determineFilterLayout();
  };

  /**
   * Expand or collapse extra filters
   */


  Filter.prototype._toggleView = function _toggleView() {
    if (this._isFilterExpanded && !this.extraModulesExpanded) {
      this._showModule();
      this._dispatchVisibilityEvent();
    } else if (this._isFilterExpanded && this.extraModulesExpanded) {
      this._hideModule(this._curCol, this._maxCol - 1);
    }

    this.extraModulesExpanded = !this.extraModulesExpanded;
    (0, _toggleClass2.default)(this._viewMoreButton, 'hide');
    (0, _toggleClass2.default)(this._viewLessButton, 'hide');
  };

  /**
   * Handle click event when filter toggles are clicked
   */


  Filter.prototype.toggleFilterClick = function toggleFilterClick() {
    if (this.initializingFilter) {
      this.initializingFilter = false;
    }

    this.toggleFilter();
  };

  /**
   * To hide or show filter module
   * @params {String} toggle; collapse; expand;
   * @params {Boolean} Change the value of `this._isFilterExpanded` based on the boolean value
   */


  Filter.prototype.toggleFilter = function toggleFilter(option, noStateChange) {
    if ((0, _hasClass2.default)(this.el, 'spark-filter--initializing') && !this.initializingFilter) {
      (0, _removeClass2.default)(this.el, 'spark-filter--initializing');
      (0, _addClass2.default)(this.el, 'spark-filter--initialized');
    }

    if (option === 'expand') {
      if (!this.initializingFilter) {
        (0, _removeClass2.default)(this._filterContent, 'hide');

        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand'
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      } else {
        (0, _removeClass2.default)(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = true;
      }
    } else if (option === 'collapse') {
      if (!this.initializingFilter) {
        (0, _addClass2.default)(this._filterContent, 'hide');

        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse'
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      } else {
        (0, _addClass2.default)(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = false;
      }
    } else {
      (0, _toggleClass2.default)(this._filterContent, 'hide');

      if ((0, _hasClass2.default)(this.el, 'filter-expanded')) {
        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse'
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      } else {
        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand'
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      }

      if (!noStateChange) {
        this._isFilterExpanded = !this._isFilterExpanded;

        if ((0, _hasClass2.default)(this.el, 'spark-filter--dropdown') && !(0, _hasClass2.default)(this._filterContent, 'hide')) {
          this._calculateApplyBtnPosition();
        }
      }
    }

    if (!(0, _hasClass2.default)(this.el, 'spark-filter--dropdown') && (0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
      clearTimeout(this._timeout);
      this._filterFooter.removeAttribute('style');
      this._buttonGroupEl.removeAttribute('style');
      (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
    }

    this._dispatchVisibilityEvent();
  };

  /**
   * On-resize handler that updates layout as needed based on screen dimensions
   */


  Filter.prototype._onResize = function _onResize() {
    this._updateFilterLayout();
  };

  /**
   * On-scroll handler that determines Apply button positioning at the xs breakpoint
   */


  Filter.prototype._onScroll = function _onScroll() {
    if (this._isDropdownState) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  };

  /**
   * Callback triggered after the expansion of a module at the xs breakpoint
   */


  Filter.prototype._onAfterExpand = function _onAfterExpand() {
    if (!(0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  };

  /**
   * Callback triggered after the collapse of a module at the xs breakpoint
   */


  Filter.prototype._onAfterCollapse = function _onAfterCollapse() {
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  };

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


  Filter.prototype._dispatchVisibilityEvent = function _dispatchVisibilityEvent() {
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.el.dispatchEvent(e);
  };

  /**
   * Calculate the position of the Apply button at the xs breakpoint
   */


  Filter.prototype._calculateApplyBtnPosition = function _calculateApplyBtnPosition() {

    var filterOffsets = this.el.getBoundingClientRect();

    if (filterOffsets.height > 255) {
      // 3 collapsed module heights + filter header height = 255
      var windowHeight = window.innerHeight;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var filterHiddenBefore = scrollTop - (filterOffsets.top + document.body.scrollTop);
      var filterHiddenAfter = filterOffsets.top + document.body.scrollTop + filterOffsets.height - (scrollTop + windowHeight);

      if (!(scrollTop > filterOffsets.top + document.body.scrollTop + filterOffsets.height || filterOffsets.top + document.body.scrollTop > scrollTop + window.innerHeight)) {
        var percentInView = 100;
        var inViewport;
        var hiddenBefore = 0;
        var hiddenAfter = 0;

        if (filterHiddenBefore > 0) {
          percentInView -= filterHiddenBefore * 100 / filterOffsets.height;
          hiddenBefore = filterHiddenBefore;
        }

        if (filterHiddenAfter > 0) {
          percentInView -= filterHiddenAfter * 100 / filterOffsets.height;
          hiddenAfter = filterHiddenAfter;
        }

        inViewport = (filterOffsets.height - (hiddenAfter + hiddenBefore)) / windowHeight * 100;
      }

      if (filterOffsets.bottom > (window.innerHeight || document.documentElement.clientHeight) && (percentInView > 45 || inViewport > 50)) {
        var buttonGroupHeight = this._buttonGroupEl.offsetHeight;
        var filterWidth = filterOffsets.width;

        this._filterFooter.style.height = buttonGroupHeight + 'px';
        (0, _addClass2.default)(this._buttonGroupEl, 'is-fixed');
        this._buttonGroupEl.style.width = filterWidth - 2 + 'px'; // accounting for border width
        this._buttonGroupEl.style.left = filterOffsets.left + 1 + 'px'; // accounting for left border

        this._applyBtnPositionFixed();
      } else {
        this._applyBtnPositionRelative();
      }
    }
  };

  /**
   * Set position:relative for the Apply button
   */


  Filter.prototype._applyBtnPositionRelative = function _applyBtnPositionRelative() {

    //function attachApplyBtn(){
    var currentButtonPosition = parseInt(getComputedStyle(this._buttonGroupEl).bottom);
    var listBottom = this._modulesContainer.getBoundingClientRect().bottom;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var buttonGroupHeight = this._buttonGroupEl.getBoundingClientRect().height;
    var distanceToMove = viewportHeight - (listBottom + buttonGroupHeight);

    if (!isNaN(currentButtonPosition)) {
      var animationListener = function animationListener() {
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
        (0, _removeClass2.default)(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
        this._buttonGroupEl.removeEventListener('animationend', animationListener);
      };

      this._buttonGroupEl.addEventListener('animationend', animationListener.bind(this), false);

      var keyframe = '-webkit-transform: translateY(-' + distanceToMove + 'px); transform: translateY(-' + distanceToMove + 'px);';

      this._buttonGroupEl.setAttribute('style', this._buttonGroupEl.getAttribute('style') + ' ' + keyframe);
      (0, _addClass2.default)(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
    }
  };

  /**
   * Set position:fixed for the Apply button
   */


  Filter.prototype._applyBtnPositionFixed = function _applyBtnPositionFixed() {
    var requestID = requestAnimationFrame(moveApplyBtn.bind(this));
    var incrementer = .1;

    function moveApplyBtn() {
      incrementer += .01;
      var currentButtonPosition = parseInt(getComputedStyle(this._buttonGroupEl).bottom);
      var buttonHeight = parseInt(getComputedStyle(this._buttonGroupEl).height);

      if (currentButtonPosition < buttonHeight * -1) {
        currentButtonPosition = buttonHeight * -1;
      }

      if (currentButtonPosition > -1) {
        this._buttonGroupEl.style.bottom = '0px';
        cancelAnimationFrame(requestID);
      } else if (currentButtonPosition < 0) {
        currentButtonPosition += 1 / incrementer;
        this._buttonGroupEl.style.bottom = currentButtonPosition + 'px';
        requestAnimationFrame(moveApplyBtn.bind(this));
      }
    }
  };

  /**
   * Callback for Clear all
   */


  Filter.prototype._onClearAll = function _onClearAll() {
    (this.onClearAll || noop)();
  };

  /**
   * Show all modules
   */


  Filter.prototype._showModule = function _showModule() {
    for (var i = 0; i < this.moduleEls.length; i++) {
      (0, _removeClass2.default)(this.moduleEls[i], 'hide');
    }
  };

  /**
   * Hide certain modules
   * @param {Number} start index
   * @param {Number} end index
   */


  Filter.prototype._hideModule = function _hideModule(start, end) {
    end = end || this.moduleEls.length - 1;
    for (var i = start; i <= end; i++) {
      (0, _addClass2.default)(this.moduleEls[i], 'hide');
    }
  };

  /**
   * Apply Expand/Collapse layout for the filter
   * Used when the filter gets to the xs breakpoint
   */


  Filter.prototype._applyExpandCollapseLayout = function _applyExpandCollapseLayout() {
    (0, _addClass2.default)(this.el, 'spark-filter--dropdown');
    this._expandCollapseState = true;

    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        (0, _addClass2.default)(tags[i], 'hide');
      }
      (0, _removeClass2.default)(this._tagsCounter, 'hide');
    }

    (0, _addClass2.default)(this._viewMoreButton, 'hide');
    (0, _addClass2.default)(this._viewLessButton, 'hide');

    if (this._applyFiltersButton) {
      (0, _removeClass2.default)(this._applyFiltersButton, 'spark-btn--sm');
      (0, _addClass2.default)(this._applyFiltersButton, 'spark-btn--block');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._applyExpand();
    }

    this._isDropdownState = true;
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  };

  /**
   * Remove Expand/Collapse layout and apply the horizontal layout for the filter
   * Used when the screen size is larger than the xs breakpoint
   */


  Filter.prototype._removeExpandCollapseLayout = function _removeExpandCollapseLayout() {

    (0, _removeClass2.default)(this.el, 'spark-filter--dropdown');
    this._expandCollapseState = false;
    this._filterFooter.removeAttribute('style');
    this._buttonGroupEl.removeAttribute('style');
    (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');

    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        (0, _removeClass2.default)(tags[i], 'hide');
      }
      (0, _addClass2.default)(this._tagsCounter, 'hide');
    }

    if (this.extraModulesExpanded) {
      (0, _removeClass2.default)(this._viewLessButton, 'hide');
    } else {
      (0, _removeClass2.default)(this._viewMoreButton, 'hide');
    }

    if (this._applyFiltersButton) {
      (0, _addClass2.default)(this._applyFiltersButton, 'spark-btn--sm');
      (0, _removeClass2.default)(this._applyFiltersButton, 'spark-btn--block');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._disapplyExpand();
    }
    this._isDropdownState = false;
  };

  /**
   * Generate a tag element in filter, which will be directly posted inside `.spark-filter__tags-container`
   * @param {string} input name - Name of the input to allow any callbacks to target input specifically
   * @param {string} tag label - The label to be displayed in the tag. This could be the input's label or another user defined label
   * @param {function} callback function for `X` button
   */


  Filter.prototype.createTagEl = function createTagEl(input, label, clearCallback) {
    var tagEl = document.createElement('div');
    tagEl.className = (0, _hasClass2.default)(this.el, 'spark-filter--dropdown') ? 'spark-filter__tag hide' : 'spark-filter__tag';
    tagEl.setAttribute('data-filter-name', input);
    tagEl.innerHTML = '<span class="spark-filter__tag__label">' + label + '</span><i class="spark-icon spark-filter__tag__close"></i>';

    this._tagsContainer.insertBefore(tagEl, this._clearAllButton);

    // create event listener after adding element to DOM
    tagEl.querySelector('.spark-filter__tag__close').addEventListener('click', clearCallback || noop);

    (0, _removeClass2.default)(this._clearAllButton, 'hide');

    // Show tag count if on small screen and this is initial application of filters
    if ((0, _hasClass2.default)(this.el, 'spark-filter--dropdown')) (0, _removeClass2.default)(this._tagsCounter, 'hide');
  };

  /**
   * Remove all tags
   */


  Filter.prototype.clearAllTagEls = function clearAllTagEls() {
    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    for (var i = 0; i < tags.length; i++) {
      this._tagsContainer.removeChild(tags[i]);
    }

    // Reset counter
    var counter = this._tagsContainer.querySelector('span');
    counter.innerHTML = '0';

    (0, _addClass2.default)(this._clearAllButton, 'hide');
    (0, _addClass2.default)(this._tagsCounter, 'hide');
  };

  /**
   * Show Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.showModuleClearButton = function showModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].enableClearBtn();
      }
    }
  };

  /**
   * Disable Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.disableModuleClearButton = function disableModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].disableClearBtn();
      }
    }
  };

  /**
   * Hide Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.hideModuleClearButton = function hideModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].hideClearBtn();
      }
    }
  };

  /**
   * Get Module Clear button status
   *  @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.moduleClearButtonStatus = function moduleClearButtonStatus(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        return this.moduleInsts[i].getClearButtonStatus();
      }
    }
  };

  return Filter;
}(_base2.default);

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
  _onScrollBound: null
};

exports.default = Filter;
module.exports = exports['default'];
//# sourceMappingURL=filter.js.map
