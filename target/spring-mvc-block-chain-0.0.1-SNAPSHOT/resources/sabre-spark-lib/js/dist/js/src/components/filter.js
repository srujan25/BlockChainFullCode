'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _filterModule = require('./filter-module');

var _filterModule2 = _interopRequireDefault(_filterModule);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Filter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A filter for search result or table etc.
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
    _this._calculateStyle();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the whole filter
   * @param {Element} el
   */


  Filter.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.moduleEls = this.el.querySelectorAll('.spark-filter-module');
    var defaultOption = {
      onAfterExpand: this._onAfterExpand.bind(this),
      onAfterCollapse: this._onAfterCollapse.bind(this)
    };
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
    this._listEl = this.el.querySelector('.spark-filter__list');
    this._btnGroupEl = this.el.querySelector('.spark-filter__btn-group');
    this._viewMoreEl = this.el.querySelector('.spark-filter__view-more');
    this._viewLessEl = this.el.querySelector('.spark-filter__view-less');
    this._viewGrpEl = this.el.querySelector('.spark-filter__view-group');
    this._toggleHideEl = this.el.querySelector('.spark-filter__toggle-hide');
    this._toggleShowEl = this.el.querySelector('.spark-filter__toggle-show');
    this._tagSectionEl = this.el.querySelector('.spark-filter__tag-section');
    this._clearAllEl = this.el.querySelector('.spark-filter__clear-all');
    this._headerEl = this.el.querySelector('.spark-filter__header');
    this._headerExpandEl = this.el.querySelector('.spark-filter__header--expand');
    this._headerCollapseEl = this.el.querySelector('.spark-filter__header--collapse');
    this._applyBtnEl = this.el.querySelector('.spark-filter__btn-apply');
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Filter.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._toggleViewBound = this._toggleView.bind(this);
    this._toggleModuleBound = this.toggleModule.bind(this);
    this._onClearAllBound = this._onClearAll.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  Filter.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);
    !this._viewMoreEl || this._viewMoreEl.addEventListener('click', this._toggleViewBound);
    !this._viewLessEl || this._viewLessEl.addEventListener('click', this._toggleViewBound);
    !this._toggleHideEl || this._toggleHideEl.addEventListener('click', this._toggleModuleBound);
    !this._toggleShowEl || this._toggleShowEl.addEventListener('click', this._toggleModuleBound);
    !this._clearAllEl || this._clearAllEl.addEventListener('click', this._onClearAllBound);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  Filter.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);
    !this._viewMoreEl || this._viewMoreEl.removeEventListener('click', this._toggleViewBound);
    !this._viewLessEl || this._viewLessEl.removeEventListener('click', this._toggleViewBound);
    !this._toggleHideEl || this._toggleHideEl.removeEventListener('click', this._toggleModuleBound);
    !this._toggleShowEl || this._toggleShowEl.removeEventListener('click', this._toggleModuleBound);
    !this._clearAllEl || this._clearAllEl.removeEventListener('click', this._onClearAllBound);
  };

  /**
   * Calculate style
   */


  Filter.prototype._calculateStyle = function _calculateStyle() {
    if (this._dropdownState) {
      this._disapplyListDropdown();
    }
    this.toggleModule('expand', true);
    this._showModule();
    this._listEl.style['flex-wrap'] = 'nowrap';
    this._listEl.style['justify-content'] = 'center';
    this._resetModuleStyle();
    this._curCol = this.maxCol;
    this._hideModule(this.maxCol);
    var modulesLength = 0;
    var listLength = this._listEl.offsetWidth;
    for (var i = 0; i < this._curCol; i++) {
      modulesLength += this.moduleEls[i].offsetWidth;
      if (modulesLength > listLength + 2) {
        this._curCol = i;
        break;
      }
    }
    if (this._curCol <= 1) {
      this._applyListDropdown();
      this._showModule();
    } else {
      this._hideModule(this._curCol, this._maxCol - 1);
      if (this.moduleEls.length) {
        this._setModuleWidth(100 / this._curCol);
      }
      if (this._isExpand) {
        this._listEl.style['flex-wrap'] = 'wrap';
        this._listEl.style['justify-content'] = 'flex-start';
        this._showModule();
      }

      // Hide border line of ends module of each line
      for (var j = this._curCol - 1; j < this.moduleEls.length; j += this._curCol) {
        (0, _addClass2.default)(this.moduleEls[j], 'noline');
      }
    }
    this._updateModuleExpand();
  };

  /**
   * Callback for event `spark.visible-children`
   */


  Filter.prototype._onVisible = function _onVisible() {}
  //this._calculateStyle();


  /**
   * To expand or collapse extra filters
   *
   */
  ;

  Filter.prototype._toggleView = function _toggleView() {
    this._isExpand = !this._isExpand;
    this._calculateStyle();
    (0, _toggleClass2.default)(this._viewMoreEl, 'hide');
    (0, _toggleClass2.default)(this._viewLessEl, 'hide');
  };

  /**
   * To hide or show filter module
   * @params {String} toggle; collapse; expand;
   * @params {String} whether change value of `this._isModuleExpand`, default is to change
   */


  Filter.prototype.toggleModule = function toggleModule(option, noStateChange) {
    if (option === 'expand') {
      (0, _removeClass2.default)(this._listEl, 'hide');
      (0, _removeClass2.default)(this._headerExpandEl, 'hide');
      (0, _addClass2.default)(this._headerCollapseEl, 'hide');
      (0, _removeClass2.default)(this._btnGroupEl, 'hide');
      if (!noStateChange) {
        this._isModuleExpand = true;
      }
    } else if (option === 'collapse') {
      (0, _addClass2.default)(this._listEl, 'hide');
      (0, _addClass2.default)(this._headerExpandEl, 'hide');
      (0, _removeClass2.default)(this._headerCollapseEl, 'hide');
      (0, _addClass2.default)(this._btnGroupEl, 'hide');
      if (!noStateChange) {
        this._isModuleExpand = false;
      }
    } else {
      (0, _toggleClass2.default)(this._listEl, 'hide');
      (0, _toggleClass2.default)(this._headerExpandEl, 'hide');
      (0, _toggleClass2.default)(this._headerCollapseEl, 'hide');
      (0, _toggleClass2.default)(this._btnGroupEl, 'hide');
      if (!noStateChange) {
        this._isModuleExpand = !this._isModuleExpand;
      }
    }
  };

  /**
   * Update/toggle Module based on this._isModuleExpand
   */


  Filter.prototype._updateModuleExpand = function _updateModuleExpand() {
    if (this._isModuleExpand) {
      this.toggleModule('expand');
    } else {
      this.toggleModule('collapse');
    }
  };

  /**
   * When the window is resized, base on params make some reponsive change.
   */


  Filter.prototype._onResize = function _onResize() {
    this._calculateStyle();
  };

  /**
   * When the window scroll. Implement for dropdown fixed button
   *
   */


  Filter.prototype._onScroll = function _onScroll() {
    if (this._isDropdownState && this._isModuleExpand) {
      this._calDropdownBtn();
    }
  };

  /*
   * Callback of expand, when after expand in dropdown variation
   */


  Filter.prototype._onAfterExpand = function _onAfterExpand() {
    setTimeout(this._calDropdownBtn.bind(this), 300);
  };

  /*
   * Callback of collapse, when after collapse in dropdown variation
   */


  Filter.prototype._onAfterCollapse = function _onAfterCollapse() {
    setTimeout(this._calDropdownBtn.bind(this), 300);
  };

  /**
   * calculate dropdown button position
   */


  Filter.prototype._calDropdownBtn = function _calDropdownBtn() {
    var viewportOffset = this.el.getBoundingClientRect();
    var innerHeight = window.innerHeight;
    var offsetHeight = this.el.offsetHeight;
    var headerHeight = this._headerEl.offsetHeight;
    var x = viewportOffset.x;
    var y = viewportOffset.y;
    if (y > innerHeight - headerHeight || y + offsetHeight < innerHeight) {
      (0, _removeClass2.default)(this._btnGroupEl, 'fixed');
      this._btnGroupEl.style.left = '';
      this._btnGroupEl.style.width = '';
    } else {
      (0, _addClass2.default)(this._btnGroupEl, 'fixed');
      this._btnGroupEl.style.left = x + 'px';
      this._btnGroupEl.style.width = this.el.offsetWidth + 'px';
    }
  };

  /**
   * Callback for button clear-all
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
   * Set width of all filter module
   * @param {Number} percentage
   */


  Filter.prototype._setModuleWidth = function _setModuleWidth(percentage) {
    for (var i = 0; i < this.moduleEls.length; i++) {
      this.moduleEls[i].style['flex-basis'] = percentage + '%';
      this.moduleEls[i].style['flex-grow'] = 0;
    }
  };

  /**
   * Reset style of filter module
   */


  Filter.prototype._resetModuleStyle = function _resetModuleStyle() {
    for (var i = 0; i < this.moduleEls.length; i++) {
      this.moduleEls[i].style['flex-basis'] = '';
      this.moduleEls[i].style['flex-grow'] = 1;
      (0, _removeClass2.default)(this.moduleEls[i], 'noline');
    }
  };

  /**
   * Apply dropdown style of filter list
   * Use when switch variation from large -> xs
   */


  Filter.prototype._applyListDropdown = function _applyListDropdown() {
    (0, _addClass2.default)(this.el, 'spark-filter--dropdown');
    this._dropdownState = true;

    var clearAllEl = this._clearAllEl.cloneNode(true);
    clearAllEl.addEventListener('click', this._onClearAllBound);
    (0, _removeClass2.default)(clearAllEl, 'hide');
    this._headerExpandEl.appendChild(clearAllEl);

    if (this._toggleShowEl) {
      //this.toggleModule('collapse');
      (0, _addClass2.default)(this._viewGrpEl, 'hide');
      (0, _addClass2.default)(this._tagSectionEl, 'hide');
    }

    if (this._applyBtnEl) {
      (0, _removeClass2.default)(this._applyBtnEl, 'spark-btn--sm');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._applyExpand();
    }
    this._isDropdownState = true;
    this._calDropdownBtn();
  };

  /**
   * Disapply dropdown style for filter list
   * Use when switch from xs -> large
   */


  Filter.prototype._disapplyListDropdown = function _disapplyListDropdown() {
    (0, _removeClass2.default)(this.el, 'spark-filter--dropdown');
    this._dropdownState = false;

    var clearAllEl = this._headerExpandEl.querySelector('.spark-filter__clear-all');
    this._headerExpandEl.removeChild(clearAllEl);

    if (this._toggleShowEl) {
      (0, _removeClass2.default)(this._viewGrpEl, 'hide');
      (0, _removeClass2.default)(this._tagSectionEl, 'hide');
    }

    if (this._applyBtnEl) {
      (0, _addClass2.default)(this._applyBtnEl, 'spark-btn--sm');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._disapplyExpand();
    }
    this._isDropdownState = false;
  };

  /**
   * Generate tag element in filter, will directly post content under `.spark-filter__tag-section`
   * @param {string} tag title
   * @param {string} tag value
   * @param {function} callback function for `X` button
   */


  Filter.prototype.createTagEl = function createTagEl(title, value, clearCallback) {
    var tagEl = document.createElement('div');
    tagEl.className = 'spark-filter__tag';
    tagEl.innerHTML = '<span class="spark-filter__tag__title">' + title + ': </span><span class="spark-filter__tag__value">' + value + '</span><i class="spark-icon spark-filter__tag__close"></i>';
    tagEl.querySelector('.spark-filter__tag__close').addEventListener('click', clearCallback || noop);
    this._tagSectionEl.insertBefore(tagEl, this._clearAllEl);
    (0, _removeClass2.default)(this._clearAllEl, 'hide');
  };

  /**
   * Clear All tags
   */


  Filter.prototype.clearAllTagEls = function clearAllTagEls() {
    var tags = this._tagSectionEl.querySelectorAll('.spark-filter__tag');
    for (var i = 0; i < tags.length; i++) {
      this._tagSectionEl.removeChild(tags[i]);
    }
    (0, _addClass2.default)(this._clearAllEl, 'hide');
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
  dataSet: {},
  moduleEls: [],
  moduleInsts: [],
  moduleOptions: [],
  maxCol: 4,
  onClearAll: noop,
  _dropdownState: false,
  _curCol: 4,
  _curModuleWidth: null,
  _isExpand: false,
  _listEl: null,
  _listModalInst: null,
  _btnGroupEl: null,
  _viewMoreEl: null,
  _viewLessEl: null,
  _viewGrpEl: null,
  _headerEl: null,
  _headerExpandEl: null,
  _headerCollapseEl: null,
  _toggleEl: null,
  _tagSectionEl: null,
  _clearAllEl: null,
  _applyBtnEl: null,
  _toggleViewMoreBound: null,
  _toggleModuleBound: null,
  _onResizeBound: null,
  _onVisibleBound: null,
  _onScrollBound: null,
  _onClearAllBound: null,
  _isDropdownState: false,
  _isModuleExpand: true
};

exports.default = Filter;
module.exports = exports['default'];
//# sourceMappingURL=filter.js.map
