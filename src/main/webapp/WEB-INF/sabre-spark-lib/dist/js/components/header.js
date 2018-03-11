/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Header = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * # Base Component
                                                                                                                                                           * The base class for Spark JS components. This class should never be
                                                                                                                                                           * instantiated directly.
                                                                                                                                                           *
                                                                                                                                                           * @param {Element} el
                                                                                                                                                           * @param {Object} params
                                                                                                                                                           *
                                                                                                                                                           * @module components/base.js
                                                                                                                                                           */

var noop = function noop() {};

var Base = function () {

  /**
   * Set parameters and cache elements.
   */
  function Base(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Base);

    if (params.elRequired && !el) {
      return;
    }

    this.setParams(this.defaults || {}, true);
    this.setParams(params);
    (this._cacheElements || noop).call(this, el, params);
    (this._parseParams || noop).call(this);
  }

  /**
   * Remove the component from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Base.prototype.remove = function remove(leaveElement) {

    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    if (!leaveElement && this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }

    this.unsetParams(this.defaults);

    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   * @param {Object} params Optional
   */


  Base.prototype.update = function update(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    (this._cacheElements || noop).call(this, el || this.el, params);
    (this._parseParams || noop).call(this);

    if (this._addEventListeners) {
      this._addEventListeners();
    }

    return this;
  };

  /**
   * Set a hash of parameters if they're whitelisted or we're told to force the set.
   * This is used to set initial values as well as set passed parameters.
   * @param {Object} params
   * @param {Boolean} force Force setting even if the param is not whitelisted.
   */


  Base.prototype.setParams = function setParams(params, force) {
    var _this = this;

    (0, _each2.default)(params, function (k, v) {
      if (_this._whitelistedParams.indexOf(k) !== -1 || force) {
        _this[k] = v;
      }
    });

    return this;
  };

  /**
   * Unset all parameters.
   * @param {Array|Object} keys
   * @param {Object} scope The object to unset the params from. Defaults to `this`.
   */


  Base.prototype.unsetParams = function unsetParams(keys, scope) {

    keys = keys instanceof Array ? keys : Object.keys(keys);
    scope = scope || this;
    (0, _each2.default)(keys, function (k) {
      delete scope[k];
    });

    return this;
  };

  return Base;
}();

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Base.prototype._whitelistedParams = [];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Base.prototype.defaults = {};

exports.default = Base;
module.exports = exports['default'];


},{"../helpers/util/each":22}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getIndex = require('../helpers/traversal/get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

var _appendChildren = require('../helpers/manipulation/append-children');

var _appendChildren2 = _interopRequireDefault(_appendChildren);

var _insertBefore = require('../helpers/manipulation/insert-before');

var _insertBefore2 = _interopRequireDefault(_insertBefore);

var _breakpoint = require('../helpers/dom/breakpoint');

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _getParents = require('../helpers/traversal/get-parents');

var _getParents2 = _interopRequireDefault(_getParents);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Header
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A primary page header/navigation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Header(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Alternate breakpoint values.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   breakpoints: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    xs: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      min: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      max: 639
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    // ...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/header.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Header = function (_BaseComponent) {
  _inherits(Header, _BaseComponent);

  /**
   * Header constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Header(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Header);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._determineInitialSize();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Update the elements used.
   * @param {Element} el Optional
   */


  Header.prototype.update = function update(el) {

    this._removeEventListeners();
    this._removePlaceholder();
    this._cacheElements(el || this.el);
    this._parseParams();
    this._addEventListeners();
    this._ensureActiveAtMoreSwapIndex();
    this.checkFixed();

    // Run on the next frame so sizes have updated
    setTimeout(function () {
      this._determineMenuSize();
    }.bind(this), 0);

    return this;
  };

  /**
   * Check of we should be fixed.
   */


  Header.prototype.checkFixed = function checkFixed() {

    if (!this.fixed) {
      return this;
    }

    var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : window.document.body.scrollTop;
    var isCondensed = scrollTop > this.fixedDistance;
    (0, _toggleClass2.default)(this.el, 'spark-header--condensed', isCondensed);
    (0, _toggleClass2.default)(document.body, 'spark-header-condensed', isCondensed);

    return this;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Header.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.navEl = this.el.querySelector('.spark-header__nav');
    this.menuEl = this.navEl && this.navEl.querySelector('.spark-header__menu');
    this.listEl = this.menuEl && this.menuEl.querySelector('.spark-header__list');
    this.toggleEl = this.el.querySelector('.spark-header__toggle');

    // Create a new instance of the menu component
    if (this.menuEl) {
      this.menu = new _menu2.default(this.menuEl, {
        onToggle: this._onToggleClickBound = this._onToggleClick.bind(this)
      });
    }

    // The items in the list need to show/hide based on the width of the container.
    // Cache these items so we can manipulate their display independent of what is
    // currently in the DOM. Also, create the "More" dropdown which will be shown
    // and hidden based on availabile space.
    if (this.listEl && this.listEl.children.length) {
      this.listEls = Array.prototype.slice.call(this.listEl.children, 0);
      this._createListMore();
    }

    // Create a clone of the header which will NOT be affected by changes in breakpoint.
    // This lets us continue to measure how many list elements will fit. Since we go to the
    // "condensed" view when we are at the sm/xs breakpoint OR only one item will fit in the nav,
    // we can't rely on breakpoints alone to determine what to show. Without a cloned placeholder
    // it is impossible to continue to measure the available space once we show the condensed view.
    if (this.listEl) {
      this._createPlaceholder();
    }
  };

  /**
   * Parse parameters from the elements.
   */


  Header.prototype._parseParams = function _parseParams() {
    this.fixed = this.fixed !== null ? this.fixed : (0, _hasClass2.default)(this.el, 'spark-header--fixed');
    this.fixedDistance = this.fixedDistance !== null ? this.fixedDistance : (0, _parseAttribute.number)(this.el, 'data-fixed-distance', 10);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Header.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._determineInitialSizeBound = this._determineInitialSize.bind(this);
    this._onResizeBound = this._onResize.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    this._onMoreClickBound = this._onMoreClick.bind(this);
    this._onNavClickBound = this._onNavClick.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Header.prototype._addEventListeners = function _addEventListeners() {

    if (!this.listEl) {
      return;
    }

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    if (this.listMoreEl) {
      this.listMoreListEl.addEventListener('click', this._onMoreClickBound);
    }

    if (this.toggleEl) {
      this.toggleEl.addEventListener('click', this._onToggleClickBound);
    }

    if (this.navEl) {
      this.navEl.addEventListener('click', this._onNavClickBound);
    }

    if (this.fixed) {
      window.addEventListener('scroll', this._onScrollBound);
    }
  };

  /**
   * Remove event listeners for DOM events..
   */


  Header.prototype._removeEventListeners = function _removeEventListeners() {

    if (!this.listEl) {
      return;
    }

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    if (this.listMoreEl) {
      this.listMoreListEl.removeEventListener('click', this._onMoreClickBound);
    }

    if (this.toggleEl) {
      this.toggleEl.removeEventListener('click', this._onToggleClickBound);
    }

    if (this.navEl) {
      this.navEl.removeEventListener('click', this._onNavClickBound);
    }

    if (this.fixed) {
      window.removeEventListener('scroll', this._onScrollBound);
    }
  };

  /**
   * Get the current breakpoint for the header.
   */


  Header.prototype._getCurrentBreakpoint = function _getCurrentBreakpoint() {
    this.lastBreakpoint = this.currentBreakpoint;
    this.currentBreakpoint = (0, _breakpoint.get)(this.el.clientWidth, this.breakpoints);
    this.el.setAttribute('data-breakpoint', this.currentBreakpoint);
  };

  /**
   * Create a placeholder for the whole header so that we can keep track
   * of the width of each child element regardless of whether or not we're
   * condensed. Condensed styles do not apply to instances of the element
   * with the placeholder class.
   */


  Header.prototype._createPlaceholder = function _createPlaceholder() {

    var div = document.createElement('div');
    div.innerHTML = this.navEl.outerHTML;

    var el = div.children[0];
    el.setAttribute('aria-hidden', true);

    (0, _addClass2.default)(el, 'spark-header__placeholder');

    this.el.appendChild(el);

    // Cache the common elements
    this.placeholder = {
      el: el,
      menuEl: el.querySelector('.spark-header__menu'),
      listEl: el.querySelector('.spark-header__list')
    };

    // Add a copy of the "more" button to the list so we always know what size it would be
    if (this.listMoreEl) {
      this.placeholder.listEl.innerHTML += this.listMoreEl.outerHTML;
      this.placeholder.listMoreEl = this.placeholder.listEl.querySelector('.spark-header__more');
    }

    this._disablePlaceholderLinkTab(el);
  };

  /**
   * Remove the placeholder
   */


  Header.prototype._removePlaceholder = function _removePlaceholder() {

    if (this.placeholder) {
      this.placeholder.el.parentNode.removeChild(this.placeholder.el);
      this.placeholder.menuEl.parentNode.removeChild(this.placeholder.menuEl);
      this.placeholder.listEl.parentNode.removeChild(this.placeholder.listEl);
    }

    if (this.listMoreEl) {
      this.placeholder.listMoreEl.parentNode.removeChild(this.placeholder.listMoreEl);
    }
  };

  /**
   * Disable tabbing for items in the placeholder.
   * @param {Element} el
   */


  Header.prototype._disablePlaceholderLinkTab = function _disablePlaceholderLinkTab(el) {

    // Set a negative tab index on each link in the placeholder
    var links = el.querySelectorAll('.spark-menu__list-link, .spark-menu__list-expand');
    var i = 0;
    var len = links.length;

    for (; i < len; i++) {
      links.item(i).setAttribute('tabindex', -1);
    }

    // Set a negative tab index on each button in the placeholder
    var buttons = el.querySelectorAll('button');
    var k = 0;
    len = buttons.length;

    for (; k < len; k++) {
      buttons.item(k).setAttribute('tabindex', -1);
    }
  };

  /**
   * Create a place to store overflow items of the list.
   * Also add this item to the placeholder element so we always know
   * which size it would be.
   */


  Header.prototype._createListMore = function _createListMore() {

    var div = document.createElement('div');
    div.innerHTML = '<li><a class="spark-menu__list-link spark-menu__ignore" tabindex="0" title="More Items"><i class="spark-icon-menu-ellipsis-horizontal spark-icon--fill"></i></a><ul class="spark-menu__list"></ul></li>';

    var li = div.children[0];
    (0, _addClass2.default)(li, 'spark-menu__list-item spark-header__more');

    this.listMoreEl = li;
    this.listMoreListEl = li.querySelector('ul');
  };

  /**
   * Determine the menu size..
   */


  Header.prototype._determineInitialSize = function _determineInitialSize() {
    (0, _addClass2.default)(this.el, 'spark-header--visible');
    this._ensureActiveAtMoreSwapIndex();
    this._determineMenuSize();
  };

  /**
   * Determine how many nav items can fit.
   * @param {Boolean} isSwap Optional Is this a swapping event? If so, ignore redundancy checks.
   */


  Header.prototype._determineMenuSize = function _determineMenuSize(isSwap) {

    // Don't do anything w/o primary nav.
    if (!this.listEls || !this.listEls.length) {
      return;
    }

    // If we're at the XS or SM breakpoint, don't worry about this stuff.
    if (this._isMenuBreakpoint(['xs', 'sm'])) {
      this._removeListMore();
      return this._toggleCollapsed(true);
    }

    // Get the items to show and hide
    var items = this._getItemsToShowAndHide();

    // Add a class saying that the size has been determined. This removes the overflow:hidden
    // so that dropdowns will appear.
    (0, _addClass2.default)(this.el, 'spark-header--overflow-checked');

    // If there are less than two elements to show and we have hidden elements, collapse the nav.
    if (items.show.length < 2 && items.hide.length) {
      this._removeListMore();
      return this._toggleCollapsed(true);
    }

    // We aren't at the XS breakpoint and there aren't too few items to show, so disable collapsing
    this._toggleCollapsed(false);

    // If the number of children to hide is the same as those already hidden, stop.
    if (items.hide.length === this.listMoreListEl.children.length && !isSwap) {

      if (!items.hide.length) {
        this._removeListMore();
      }

      return;
    }

    // Add the elements we're supposed to show before the "more element"
    (0, _insertBefore2.default)(this.listEl, this.listMoreEl, items.show);

    // If we have items to hide, append them to the more element
    if (items.hide.length) {
      (0, _appendChildren2.default)(this.listMoreListEl, items.hide);
    }
    // Otherwise, remove the more element
    else {
        this._removeListMore();
      }
  };

  /**
   * Listen for the ready state change and rerun the menu size determination.
   */


  Header.prototype._listenForReadyStateChange = function _listenForReadyStateChange() {

    // Already loaded
    if (document.readyState === 'complete' || document.readyState === 'loaded') {
      return;
    }

    // Bound listener
    var run = function () {
      if (document.readyState === 'complete' || document.readyState === 'loaded') {
        this._determineMenuSize();
        document.removeEventListener('readystatechange', run);
      }
    }.bind(this);

    // Only run once
    document.addEventListener('readystatechange', run);
  };

  /**
   * Check the primary nav breakpoint.
   * @param {String|Array} name A string or array of string names of breakpoints to check for
   */


  Header.prototype._isMenuBreakpoint = function _isMenuBreakpoint(name) {
    this._getCurrentBreakpoint();
    return name instanceof Array ? name.indexOf(this.currentBreakpoint) !== -1 : this.currentBreakpoint === 'xs';
  };

  /**
   * Get the items to show and hide.
   * @return {Object}
   */


  Header.prototype._getItemsToShowAndHide = function _getItemsToShowAndHide() {

    var width = this.placeholder.listEl.clientWidth;
    var children = this.placeholder.listEl.children;
    var i = 0;
    var len = children.length;
    var hideIndex = -1;

    this._addListMore();

    // Always include the width of the more button.
    var childrenWidth = this.placeholder.listMoreEl.clientWidth || 0;

    // Loop through the children until we hit a point where they don't fit anymore
    for (; i < len && hideIndex === -1; i++) {
      childrenWidth += children[i].clientWidth;
      if (childrenWidth > width) {
        hideIndex = i;
      }
    }

    // Find all the children that fit and don't fit
    var items = {
      show: hideIndex !== -1 ? Array.prototype.slice.call(this.listEls, 0, hideIndex) : this.listEls,
      hide: hideIndex !== -1 ? Array.prototype.slice.call(this.listEls, hideIndex) : []
    };

    // If we have an index to swap for the last "show" element, replace that element
    if (this.moreSwapIndex > -1 && this.moreSwapIndex >= items.show.length) {

      // Remove the last element from the show array
      var toHide = items.show.splice(items.show.length - 1, 1)[0];

      // Get the index to remove from the hide array. Account for the offset.
      var toShowIndex = this.moreSwapIndex - hideIndex;

      // Remove the desired element from the hide array
      var toShow = items.hide.splice(toShowIndex, 1)[0];

      // Add the toShow element to the end of the show array
      items.show.push(toShow);

      // Insert the toHide element into the hide array at the position of
      // the element we just removed from the hide array.
      items.hide.splice(toShowIndex, 0, toHide);
    }

    return items;
  };

  /**
   * Ensure that any active item is set to the more swap index. This ensures
   * that the active item is always visible on the screen.
   */


  Header.prototype._ensureActiveAtMoreSwapIndex = function _ensureActiveAtMoreSwapIndex() {

    if (!this.listEls || !this.listEls.length) {
      return;
    }

    var el = this.el.querySelector('[class*="list-item"].active');
    if (el) {
      var parents = (0, _getParents2.default)(el, '.spark-menu__list-item', this.el);

      if (parents && parents[parents.length - 1]) {
        el = parents[parents.length - 1];
      }

      var index = (0, _getIndex2.default)(this.listEls, el);

      if (index !== this.moreSwapIndex) {
        this.moreSwapIndex = index;
      }
    }
  };

  /**
   * Add a placeholder for overflow items to the list.
   */


  Header.prototype._addListMore = function _addListMore() {
    if (this.listMoreEl.parentNode !== this.listEl) {
      this.listEl.appendChild(this.listMoreEl);
    }
  };

  /**
   * Remove a placeholder for overflow items from the primary nav.
   */


  Header.prototype._removeListMore = function _removeListMore() {
    if (this.listMoreEl.parentNode) {
      this.listMoreEl.parentNode.removeChild(this.listMoreEl);
    }
  };

  /**
   * Reset the children of the primary navigation.
   */


  Header.prototype._resetMenuChildren = function _resetMenuChildren() {
    this.moreSwapIndex = -1;
    (0, _removeClass2.default)(this.el, 'spark-header--overflow-checked');
    (0, _appendChildren2.default)(this.listEl, this.listEls);
  };

  /**
   * Toggle the collapsed nav style.
   * @param {Boolean} enable
   */


  Header.prototype._toggleCollapsed = function _toggleCollapsed(enable) {

    // Same collapsed state is already set
    if (enable === this.isCollapsed) {
      return;
    }

    // Reset children and remove a special no-animate class to top-level items when we collapse
    if (enable) {
      this._enableTopLevelToggling();
      this._resetMenuChildren();
    } else {
      if (this.menu) {
        this.menu._removeAllCachedLists();
      }
      this._disableTopLevelToggling();
    }

    this.isCollapsed = enable;
    (0, _toggleClass2.default)(this.el, 'spark-header--collapsed', enable);
    (0, _toggleClass2.default)(this.el, 'spark-header--visible', !enable);
  };

  /**
   * Enable toggling on top-level items.
   */


  Header.prototype._enableTopLevelToggling = function _enableTopLevelToggling() {

    var i = 0;
    var len = this.listEls.length;

    for (; i < len; i++) {
      (0, _removeClass2.default)(this.listEls[i], 'spark-no-animate');
    }
  };

  /**
   * Disable toggling on top-level items.
   */


  Header.prototype._disableTopLevelToggling = function _disableTopLevelToggling() {

    var i = 0;
    var len = this.listEls.length;

    for (; i < len; i++) {
      (0, _addClass2.default)(this.listEls[i], 'spark-no-animate');
    }
  };

  /**
   * When the window resizes, redetermine the size of the primary nav elements.
   */


  Header.prototype._onResize = function _onResize() {

    // Ensure that any active item we may have is at the swap index
    this._ensureActiveAtMoreSwapIndex();
    this._determineMenuSize();

    // If we are fixed, do the scroll check
    if (this.fixed) {
      this.checkFixed();
    }
  };

  /**
   * Check to see if the header should be fixed.
   * @param {Object} e
   */


  Header.prototype._onScroll = function _onScroll() {
    this.checkFixed();
  };

  /**
   * When a link in the more list is clicked, swap it with the last element in the visible list.
   * @param {Object} e
   */


  Header.prototype._onMoreClick = function _onMoreClick(e) {

    // Don't do any swapping if we're in a collapsed state
    if (this.isCollapsed) {
      return;
    }

    // Get the index of the clicked element
    var li = (0, _getParent2.default)(e.target, 'li', this.listMoreListEl);

    // Save the index of the element to be swapped
    this.moreSwapIndex = (0, _getIndex2.default)(this.listEls, li);

    // Redetermine the primary nav size
    this._determineMenuSize(true);
  };

  /**
   * When the toggle is clicked, toggle the active state on the nav
   * @param {Object} e
   */


  Header.prototype._onToggleClick = function _onToggleClick(e) {
    e.preventDefault();
    this.isActive = !this.isActive;
    (0, _toggleClass2.default)(this.navEl, 'active', this.isActive);
    this.menu._openActiveParents();
  };

  /**
   * When the nav is clicked, set to inactive.
   * @param {Object} e
   */


  Header.prototype._onNavClick = function _onNavClick(e) {
    if (e.target === this.navEl && this.isCollapsed) {
      this.isActive = !this.isActive;
      (0, _removeClass2.default)(this.navEl, 'active');
    }
  };

  return Header;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Header.prototype._whitelistedParams = ['breakpoints', 'fixed', 'fixedDistance'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Header.prototype.defaults = {
  el: null,
  fixed: null,
  fixedDistance: null,
  navEl: null,
  menuEl: null,
  listEl: null,
  listEls: null,
  listMoreEl: null,
  listMoreListEl: null,
  placeholder: null,
  toggleEl: null,
  lastBreakpoint: null,
  currentBreakpoint: null,
  isActive: false,
  isCollapsed: null,
  moreSwapIndex: -1,
  menu: null,
  breakpoints: null,
  _onResizeBound: null,
  _onScrollBound: null,
  _onMoreClickBound: null,
  _onToggleClickBound: null,
  _onNavClickBound: null
};

exports.default = Header;
module.exports = exports['default'];


},{"../helpers/dom/add-class":6,"../helpers/dom/breakpoint":7,"../helpers/dom/has-class":8,"../helpers/dom/parse-attribute":10,"../helpers/dom/remove-class":11,"../helpers/dom/toggle-class":12,"../helpers/manipulation/append-children":13,"../helpers/manipulation/insert-before":14,"../helpers/traversal/get-index":17,"../helpers/traversal/get-parent":18,"../helpers/traversal/get-parents":19,"./base":1,"./menu":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

var _transform = require('../helpers/css/transform');

var _transform2 = _interopRequireDefault(_transform);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _getParents = require('../helpers/traversal/get-parents');

var _getParents2 = _interopRequireDefault(_getParents);

var _getChild = require('../helpers/traversal/get-child');

var _getChild2 = _interopRequireDefault(_getChild);

var _wrapElement = require('../helpers/manipulation/wrap-element');

var _wrapElement2 = _interopRequireDefault(_wrapElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Menu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Menu(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Callback method for when the menu toggles.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onToggle: function(){}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/menu.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Menu = function (_BaseComponent) {
  _inherits(Menu, _BaseComponent);

  /**
   * Menu constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Menu(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Menu);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._checkAnimation();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Menu.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-menu__toggle');
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Menu.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Menu.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('focus', this._onFocusBound, true);
    this.el.addEventListener('blur', this._onBlurBound, true);
    this.el.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Menu.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('focus', this._onFocusBound);
    this.el.removeEventListener('blur', this._onBlurBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Toggle the open state of an item.
   * @param {Element} item
   */


  Menu.prototype._toggleItem = function _toggleItem(item) {

    if ((0, _hasClass2.default)(item, 'open')) {
      this._closeItem(item);
    } else {
      this._openItem(item);
    }
  };

  /**
   * Toggle aria-checked state of the Expand/Collapse toggle carets
   * @param {Element} item
   */


  Menu.prototype._toggleAriaCheckedState = function _toggleAriaCheckedState(item) {
    if (item.hasAttribute('aria-checked')) {
      var ariaState = item.getAttribute('aria-checked') === 'true';
      item.setAttribute('aria-checked', String(!ariaState));
    }
  };

  /**
   * Check for a nested list and create the wrappers needed
   * for animating the lists
   *
   */


  Menu.prototype._checkAnimation = function _checkAnimation() {
    if (this.el.querySelector('.spark-menu__list-next')) {
      this.cachedList = this.cachedList || [];
      this._createMenuAnimationWrapper();
      this._animateListChange();
    }
  };

  /**
   * Create wrapper class to help with animation of sliding lists
   *
   */


  Menu.prototype._createMenuAnimationWrapper = function _createMenuAnimationWrapper() {
    if (this.wrapperEl) {
      return;
    }

    var wrapperEl = document.createElement('div');
    (0, _addClass2.default)(wrapperEl, 'spark-menu__animation-wrapper');
    (0, _wrapElement2.default)(this.el.querySelector('.spark-menu__list'), wrapperEl);
    this.wrapperEl = wrapperEl;
  };

  /**
   * Animate the position of the animation wrapper. Optionally, do
   * so immediately without waiting for an animation.
   * @param {Boolean} noAnimate
   */


  Menu.prototype._animateListChange = function _animateListChange(noAnimate) {

    if (noAnimate) {
      (0, _addClass2.default)(this.wrapperEl, 'no-animate');
    }

    this.wrapperEl.setAttribute('style', (0, _transform2.default)('translateX', '-' + this.cachedList.length * 100 + '%'));

    if (noAnimate) {
      setTimeout(function () {
        (0, _removeClass2.default)(this.wrapperEl, 'no-animate');
      }.bind(this), 1);
    }
  };

  /**
   * Append list to menu element
   * @param {Element} list
   * @param {Boolean} noAnimate
   */


  Menu.prototype._appendList = function _appendList(item, noAnimate) {

    // Create wrapper
    this._createMenuAnimationWrapper();

    var newList = item.cloneNode(true);
    (0, _addClass2.default)(newList, 'nestedList');
    newList.setAttribute('data-nested-list-id', newList.getAttribute('id'));
    newList.removeAttribute('id');

    if (this.wrapperEl) {
      // Add child node to wrapper
      this.wrapperEl.appendChild(newList);
      // Add to cached Array to keep track of all added lists
      this.cachedList.push(newList);
      // Slide navigation
      this._animateListChange(noAnimate);
    }
  };

  /**
   * Remove list to nav
   *
   */


  Menu.prototype._removeLastList = function _removeLastList() {
    // If there are any items to remove
    if (this.cachedList.length) {
      // Retrieve last item from list
      var removeElement = this.cachedList.pop();
      if (this.wrapperEl) {
        // Slide navigation
        this._animateListChange();
      }
      window.setTimeout(function () {
        // Remove itself from DOM
        removeElement.parentNode.removeChild(removeElement);
      }, 250);
    }
  };

  /**
   * Remove all lists from panel menu
   *
   */


  Menu.prototype._removeAllCachedLists = function _removeAllCachedLists() {
    if (this.cachedList) {
      // If there are any items to remove
      while (this.cachedList.length) {
        // While there are still items, remove them
        this._removeLastList();
      }
    }
  };

  /**
   * Finds and returns the next nested list
   * @param {Object} item
   * @return {Object}
   */


  Menu.prototype._getNextList = function _getNextList(item) {
    return item.querySelector('.spark-menu__list-next') ? document.querySelector(item.querySelector('.spark-menu__list-next').getAttribute('data-menu')) : null;
  };

  /**
   * Open an item by animating it.
   * @param {Object} item
   */


  Menu.prototype._openItem = function _openItem(item) {

    // Item is already open
    if ((0, _hasClass2.default)(item, 'open')) {
      return;
    }

    (0, _height2.default)({
      el: item,
      toggleEl: '.spark-menu__list'
    });

    (0, _addClass2.default)(item, 'open');
  };

  /**
   * Close an item by animating it shut.
   * @param {Object} item
   */


  Menu.prototype._closeItem = function _closeItem(item) {

    // Item is already closed
    if (!(0, _hasClass2.default)(item, 'open')) {
      return;
    }

    (0, _height2.default)({
      el: item,
      toggleEl: '.spark-menu__list',
      toggleValue: 'none',
      action: 'collapse'
    });

    (0, _removeClass2.default)(item, 'open');
  };

  /**
   * Make an item active.
   * @param {Element} item
   */


  Menu.prototype._activateItem = function _activateItem(item) {

    // Item is already active
    if ((0, _hasClass2.default)(item, 'active')) {
      return;
    }

    // Deactivate any active items
    var parents = (0, _getParents2.default)(item, '.spark-menu__list', this.el);
    this._deactivateItems(parents[parents.length - 1]);
    this._deactivateItemSiblings(item);

    // Add the active class
    (0, _addClass2.default)(item, 'active');

    // If there is a parent that is also a list item, open it.
    this._activateItemParents(item, this.el);
  };

  /**
   * Activate parent items.
   * @param {Element} el
   * @param {Element} limitEl
   */


  Menu.prototype._activateItemParents = function _activateItemParents(el, limitEl) {

    var parents = (0, _getParents2.default)(el.parentNode, '[class*="list-item"]', limitEl);

    var i = 0;
    var len = parents.length;

    // Add the active class
    for (; i < len; i++) {
      this._openItem(parents[i]);
      (0, _addClass2.default)(parents[i], 'child-active');
    }
  };

  /**
   * Deactivate items.
   * @param {Element} el
   */


  Menu.prototype._deactivateItems = function _deactivateItems(el) {

    var actives = el.querySelectorAll('[class*="list-item"].active');
    var i = 0;
    var len = actives.length;

    // Remove the active class
    for (; i < len; i++) {
      (0, _removeClass2.default)(actives.item(i), 'active');
    }
  };

  /**
   * Deactivate siblings items.
   * @param {Element} el
   */


  Menu.prototype._deactivateItemSiblings = function _deactivateItemSiblings(el) {

    var actives = el.parentNode.querySelectorAll('[class*="list-item"].child-active');
    var i = 0;
    var len = actives.length;

    // Remove the active class
    for (; i < len; i++) {
      (0, _removeClass2.default)(actives[i], 'child-active');
      (0, _removeClass2.default)(actives[i], 'open');
    }
  };

  /**
   * Open the parents of the active item.
   *
   */


  Menu.prototype._openActiveParents = function _openActiveParents() {

    var activeItem = this.el.querySelector('.active');
    if (activeItem) {
      var parentItems = (0, _getParents2.default)(activeItem, '.spark-menu__list-item', this.el);
      var itemLinks;
      var nextList;

      for (var i = parentItems.length - 1; i >= 0; i--) {
        itemLinks = (0, _getChild2.default)(parentItems[i], '.spark-menu__list-links');
        if (itemLinks && itemLinks.querySelector('.spark-menu__list-next')) {
          nextList = this._getNextList(parentItems[i]);
          if (nextList && !this._cachedListContainsID(nextList.getAttribute('id'))) {
            this._appendList(nextList, true);
          }
        } else {
          (0, _addClass2.default)(parentItems[i], 'open');
        }
      }
    }
  };

  /**
   * Check if the cached list contains a certain ID
   * @param {String} id
   * @return {Boolean}
   */


  Menu.prototype._cachedListContainsID = function _cachedListContainsID(id) {
    var i = this.cachedList.length;
    while (i--) {
      if (this.cachedList[i].getAttribute('data-nested-list-id') === id) {
        return true;
      }
    }
    return false;
  };

  /**
   * When an item is clicked, make it active. Determine if the click was on an expand
   * button and open the list if so.
   * @todo: It should be possible to opt out of this behavior.
   * @param {Object} e
   */


  Menu.prototype._onClick = function _onClick(e) {

    // Don't make forms active
    if ((0, _getParent2.default)(e.target, 'form', this.el)) {
      return;
    }

    // Toggle the visibility of the menu?
    var toggle = e.target === this.toggleEl || (0, _hasParent2.default)(e.target, this.toggleEl);
    if (toggle) {
      return (this.onToggle || noop)(e, this);
    }

    // Is there a parent to open and an item?
    var open = (0, _getParent2.default)(e.target, '.spark-menu__list-expand', this.el);
    var item = (0, _getParent2.default)(e.target, '.spark-menu__list-item', this.el);

    // If we have no item or have been told to ignore the item
    if (!item || (0, _getParent2.default)(e.target, '.spark-menu__ignore', this.el)) {
      return;
    }
    if (open) {
      this._toggleAriaCheckedState(open);
      return this._toggleItem(item);
    }

    // Check if we have a valid item and we aren't inside the expanded header
    if (item && !(0, _hasParent2.default)(e.target, document.querySelector('.spark-header--visible'))) {

      var next = this._getNextList(item);

      if (next && (0, _hasClass2.default)(e.target, 'spark-menu__list-next')) {
        // Active item
        this._activateItem(item);
        this._appendList(next);
        return;
      }

      var back = (0, _getParent2.default)(e.target, '.spark-menu__list-back', item);

      if (back && (0, _hasClass2.default)(e.target, 'spark-menu__list-back')) {
        this._removeLastList();
        return;
      }
    }

    // Active item
    this._activateItem(item);
  };

  /**
   * When the space or enter key is pressed on a focused item, make it active.
   * Determine if the click was on an expand button or link and open the list if so.
   * @todo: It should be possible to opt out of this behavior.
   * @param {Object} e
   */


  Menu.prototype._onKeydown = function _onKeydown(e) {
    var code = e.keyCode || e.which;

    // Don't make forms active
    if ((0, _getParent2.default)(e.target, 'form', this.el)) {
      return;
    }

    // Toggle the visibility of the menu?
    var toggle = e.target === this.toggleEl || (0, _hasParent2.default)(e.target, this.toggleEl);
    if (toggle) {
      return (this.onToggle || noop)(e, this);
    }

    // Is there a parent to open and an item?
    var open = (0, _getParent2.default)(e.target, '.spark-menu__list-expand', this.el);
    var item = (0, _getParent2.default)(e.target, '.spark-menu__list-item', this.el);

    // If we have no item or have been told to ignore the item
    if (!item || (0, _getParent2.default)(e.target, '.spark-menu__ignore', this.el)) {
      return;
    }
    if (open) {
      if (code === 32 || code === 13) {
        e.preventDefault();
        this._toggleAriaCheckedState(open);
        return this._toggleItem(item);
      }
    }

    // Check if we have a valid item and we aren't inside the expanded header
    if (item && !(0, _hasParent2.default)(e.target, document.querySelector('.spark-header--visible'))) {

      var next = this._getNextList(item);

      if (next && (0, _hasClass2.default)(e.target, 'spark-menu__list-next')) {
        if (code === 32 || code === 13) {
          e.preventDefault();
          // Active item
          this._activateItem(item);
          this._appendList(next);
          return;
        }
      }

      var back = (0, _getParent2.default)(e.target, '.spark-menu__list-back', item);

      if (back && (0, _hasClass2.default)(e.target, 'spark-menu__list-back')) {
        if (code === 32 || code === 13) {
          e.preventDefault();

          this._removeLastList();
          return;
        }
      }
    }

    if (code === 32 || code === 13) {
      this._activateItem(item);
    }
  };

  /**
   * Keep track of when items have focus.
   * @param {Object} e
   */


  Menu.prototype._onFocus = function _onFocus(e) {

    var parent = e.target;
    var lastParent = parent;

    while (parent) {
      parent = (0, _getParent2.default)(lastParent.parentNode, '.spark-menu__list-item', this.el);
      if (!parent || parent === lastParent) break;
      (0, _addClass2.default)(parent, 'has-focus');
      lastParent = parent;
    }
  };

  /**
   * Keep track of when items lose focus.
   * @param {Object} e
   */


  Menu.prototype._onBlur = function _onBlur(e) {

    var parent = e.target;
    var lastParent = parent;

    while (parent) {
      parent = (0, _getParent2.default)(lastParent.parentNode, '.spark-menu__list-item', this.el);
      if (!parent || parent === lastParent) break;
      (0, _removeClass2.default)(parent, 'has-focus');
      lastParent = parent;
    }
  };

  return Menu;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Menu.prototype._whitelistedParams = ['onToggle'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Menu.prototype.defaults = {
  cachedList: null,
  el: null,
  toggleEl: null,
  wrapperEl: null,
  onToggle: null,
  _onClickBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onKeydownBound: null
};

exports.default = Menu;
module.exports = exports['default'];


},{"../helpers/animation/height":4,"../helpers/css/transform":5,"../helpers/dom/add-class":6,"../helpers/dom/has-class":8,"../helpers/dom/remove-class":11,"../helpers/manipulation/wrap-element":15,"../helpers/traversal/get-child":16,"../helpers/traversal/get-parent":18,"../helpers/traversal/get-parents":19,"../helpers/traversal/has-parent":20,"./base":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _outerHeight = require('../dom/outer-height');

var _outerHeight2 = _interopRequireDefault(_outerHeight);

var _addClass = require('../dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {}; /**
                                * # Animate Height
                                * Animate the height of an element since we can't do this w/ pure CSS. Sigh.
                                *
                                * @example
                                * animateHeight({
                                *   el: ...,
                                *   toggleEl: ...,
                                *   // Optional params
                                *   action: 'collapse'|'expand',
                                *   heightAnimationClass: 'spark-animate-height',
                                *   opacityAnimationClass: 'spark-animate-opacity',
                                *   toggleProperty: 'display'|'overflow'|'visibility',
                                *   toggleValue: 'block'|'none'|'visible'|'hidden',
                                *   animationDuration: 250
                                * });
                                *
                                * @module helpers/animation/height.js
                                */

var runningAnimations = {
  els: [],
  completeCallbacks: []
};

/**
 * Get the inverse toggle value
 * @param  {String} property
 * @param  {String} originalValue
 * @return {String}
 */
function getInverseToggleValue(el, property, originalValue) {

  // Get the value to toggle to for the given property
  switch (property) {
    case 'overflow':
    case 'visibility':
      return originalValue === 'visible' ? 'hidden' : 'visible';
    default:
      return originalValue === 'block' || originalValue === 'inline-block' ? 'none' : 'block';
  }
}

/**
 * When an animation is complete, clean up and run the callback.
 * @param  {Object} params
 */
function onComplete(params) {

  // Reset toggle el visibility
  if (params.toggleClassName) {
    (0, _toggleClass2.default)(params.el, params.toggleClassName, !params.collapse);
  } else {
    params.toggleEl.style[params.toggleProperty] = '';
  }

  // Remove the height property
  params.el.style.height = '';
  params.toggleEl.style.height = '';
  params.toggleEl.style.marginBottom = '';
  params.toggleEl.style.marginTop = '';

  // Remove the spark-animate-height class so the transitions no longer apply
  (0, _removeClass2.default)(params.el, params.heightAnimationClass);
  (0, _removeClass2.default)(params.toggleEl, params.heightAnimationClass);

  // Run the callback
  params.onComplete();

  // Remove the element and callback from their respective arrays
  var runningIndex = runningAnimations.els.indexOf(params.el);
  runningAnimations.els.splice(runningIndex, 1);
  runningAnimations.completeCallbacks.splice(runningIndex, 1);
}

/**
 * @param {Object} params
 */
function animateHeight(params) {

  params = params || {};

  var el = params.el;

  if (!el) {
    return;
  }

  var collapse = params.action && params.action === 'collapse';
  var heightAnimationClass = params.heightAnimationClass || 'spark-animate-height';

  // Allow for elements to be passed or selector strings
  var toggleEl = typeof params.toggleEl === 'string' ? el.querySelector(params.toggleEl) : params.toggleEl;

  // No element to be switching with toggling so we can't determine the desired height to animate to.
  if (!toggleEl || (0, _hasClass2.default)(el, 'spark-no-animate')) {
    return;
  }

  var toggleClassName = params.toggleClass;

  // The style property to use when toggling visibility
  var toggleProperty = params.toggleProperty || 'display';
  var toggleStyles = window.getComputedStyle(toggleEl);
  var originalToggleValue = toggleStyles[toggleProperty];
  var toggleValue = params.toggleValue || getInverseToggleValue(toggleProperty, originalToggleValue);

  // If we are already animating, stop now.
  var runningIndex = runningAnimations.els.indexOf(el);
  if (runningIndex !== -1) {

    var completeCallback = runningAnimations.completeCallbacks[runningIndex];
    if (completeCallback) {
      clearTimeout(completeCallback);
    }

    onComplete({
      el: el,
      toggleEl: toggleEl,
      onComplete: params.onComplete || noop,
      collapse: collapse,
      toggleProperty: toggleProperty,
      toggleClassName: toggleClassName,
      toggleValue: toggleValue,
      heightAnimationClass: heightAnimationClass
    });
  }

  // Store the current height
  var originalHeight = (0, _outerHeight2.default)(el);

  // Toggle the visible property
  if (toggleClassName) {
    (0, _toggleClass2.default)(el, toggleClassName, !collapse);
  } else {
    toggleEl.style[toggleProperty] = toggleValue;
  }

  // When measuring the size for a collapse, we have to wait a tic for it to be
  // accurate. Not sure why. Ugh.
  if (collapse) {
    setTimeout(runAnimation, 0);
  } else {
    runAnimation();
  }

  function runAnimation() {

    // Now that the toggle el is taking up space, get the new height which we will be animating to
    var targetElHeight = (0, _outerHeight2.default)(el);

    // We need to store the original and target toggle element heights. They differ depending on
    // whether we are going to expand or collapse.
    var targetToggleElHeight = void 0;
    var originalToggleElHeight = void 0;

    // If we are collapsing, reset the toggle style and set it when we're done. Set the height so
    // that we can animate down to 0 or up to the target height.
    if (collapse) {

      if (toggleClassName) {
        (0, _removeClass2.default)(el, toggleClassName);
      } else {
        toggleEl.style[toggleProperty] = originalToggleValue;
      }

      originalToggleElHeight = (0, _outerHeight2.default)(toggleEl, toggleStyles);
      targetToggleElHeight = 0;
    } else {
      targetToggleElHeight = (0, _outerHeight2.default)(toggleEl, toggleStyles);
      originalToggleElHeight = 0;
    }

    // Set the original height
    el.style.height = originalHeight + 'px';
    toggleEl.style.height = originalToggleElHeight + 'px';
    toggleEl.style.marginBottom = '0px';
    toggleEl.style.marginTop = '0px';

    // Add the spark-animate-height class which will setup the transition-property and duration
    (0, _addClass2.default)(el, heightAnimationClass);
    (0, _addClass2.default)(toggleEl, heightAnimationClass);

    runningAnimations.els.push(el);

    // We need to wait a tick to toggle the height or else the animation class won't function
    setTimeout(function () {

      // Set the height to the target height
      el.style.height = targetElHeight + 'px';
      toggleEl.style.height = targetToggleElHeight + 'px';

      // Remove inline styles after the animation is complete
      runningAnimations.completeCallbacks.push(setTimeout(function () {
        onComplete({
          el: el,
          toggleEl: toggleEl,
          onComplete: params.onComplete || noop,
          collapse: collapse,
          toggleProperty: toggleProperty,
          toggleClassName: toggleClassName,
          toggleValue: toggleValue,
          heightAnimationClass: heightAnimationClass
        });
      }, params.animationDuration !== undefined ? params.animationDuration : 201));
    }, 0);
  }
}

exports.default = animateHeight;
module.exports = exports['default'];


},{"../dom/add-class":6,"../dom/has-class":8,"../dom/outer-height":9,"../dom/remove-class":11,"../dom/toggle-class":12}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * # Transform
                                                                                                                                                                                                                                                                               * Apply a cross-browser transform style.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @example
                                                                                                                                                                                                                                                                               * transform('translateX', '-100px');
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @param {String} type
                                                                                                                                                                                                                                                                               * @param {String} val
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @module helpers/css/transform.js
                                                                                                                                                                                                                                                                               */

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', ''];

function transform(type, val) {

  var str = '';

  (0, _each2.default)(prefixes, function (p) {

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      str += p + 'transform: ';

      for (var j in val) {
        str += j + '(' + val[j] + '); ';
      }
    } else {
      str += p + 'transform: ' + type + '(' + val + '); ';
    }
  });

  return str;
}

exports.default = transform;
module.exports = exports['default'];


},{"../util/each":22}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

var _hasClass = require('./has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Add Class
 * Add a class on an element.
 *
 * @param {Element|Array} el An element or array of elements to update.
 * @param {String} name
 * @return {Element}
 *
 * @module helpers/dom/add-class.js
 */

var ws = /\s+/;
var cleanup = /\s{2,}/g;

function addClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) {
      el.classList.add(name[0]);
    }
    return el;
  }

  var toAdd = [];
  var i = 0;
  var l = name.length;
  var item = void 0;
  var clsName = typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '';

  // see if we have anything to add
  for (; i < l; i++) {
    item = name[i];
    if (item && !(0, _hasClass2.default)(clsName, item)) {
      toAdd.push(item);
    }
  }

  if (toAdd.length) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = addClass;
module.exports = exports['default'];


},{"../util/trim":23,"./has-class":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Breakpoint Helpers
 * Find the active breakpoint.
 *
 * @param {Number} width
 *
 * @module helpers/dom/breakpoint.js
 */

/**
 * Breakpoints being used in the CSS.
 * @type {Object}
 */
var defaultBreakpoints = {
  xs: {
    min: 0,
    max: 543
  },
  sm: {
    min: 544,
    max: 795
  },
  md: {
    min: 796,
    max: 1047
  },
  lg: {
    min: 1048,
    max: 1799
  },
  xl: {
    min: 1800,
    max: Infinity
  }
};

function get(width, breakpoints) {

  breakpoints = breakpoints || defaultBreakpoints;

  var i = void 0;

  for (i in breakpoints) {
    if (width >= breakpoints[i].min && width <= breakpoints[i].max) {
      return i;
    }
  }
}

exports.get = get;


},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * # Has Class
 * See if an element has a class.
 *
 * @param {Element|String} el
 * @param {String} name
 * @return {Boolean}
 *
 * @module helpers/dom/has-class.js
 */
function hasClass(el, name) {
  var cName = ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' ? el.className || el.getAttribute && el.getAttribute('class') || '' : el || '').replace(/[\t\r\n\f]/g, ' ');
  return (' ' + cName + ' ').indexOf(' ' + name + ' ') !== -1;
}

exports.default = hasClass;
module.exports = exports['default'];


},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = ['marginTop', 'marginBottom', 'borderTop', 'borderBottom']; /**
                                                                         * # Outer Height
                                                                         * Get the outer height of an element (including margin and border)
                                                                         *
                                                                         * @param {Element} el
                                                                         * @param {Object} styles Optional Already have computed styles? Pass them in.
                                                                         *
                                                                         * @example
                                                                         * outerHeight(el, computedStyles);
                                                                         *
                                                                         * @module helpers/outer-height.js
                                                                         */


function outerHeight(el, styles) {

  styles = styles || window.getComputedStyle(el);

  var height = el.clientHeight;

  (0, _each2.default)(props, function (prop) {
    height += parseInt(styles[prop] || 0, 10);
  });

  return height;
}

exports.default = outerHeight;
module.exports = exports['default'];


},{"../util/each":22}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Parse DOM attributes
 * Given an element and an attribute name, parse that attribute
 * if it exists or return a default.
 *
 * @module helpers/dom/parse-attribute.js
 */

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function boolean(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val === 'true' || val === '' ? true : false;
}

/**
 * Get the numeric value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function number(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return parseInt(val, 10);
}

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function string(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val;
}

exports.boolean = boolean;
exports.number = number;
exports.string = string;


},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = /\s+/; /**
                 * # Remove Class
                 * Remove a class on an element.
                 *
                 * @param {Element|Array} el An element or array of elements to update.
                 * @param {String} name
                 * @return {Element}
                 *
                 * @module helpers/dom/remove-class.js
                 */

var cleanup = /\s{2,}/g;

function removeClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) el.classList.remove(name[0]);
    return el;
  }

  // store two copies
  var clsName = ' ' + (typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '') + ' ';
  var result = clsName;
  var current = void 0;
  var start = void 0;
  for (var i = 0, l = name.length; i < l; i++) {
    current = name[i];
    start = current ? result.indexOf(' ' + current + ' ') : -1;
    if (start !== -1) {
      start += 1;
      result = result.slice(0, start) + result.slice(start + current.length);
    }
  }

  // only write if modified
  if (clsName !== result) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)(result.replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)(result.replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = removeClass;
module.exports = exports['default'];


},{"../util/trim":23}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasClass = require('./has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _addClass = require('./add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('./remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toggleClass(el, name, enable) {

  if (!el) {
    return;
  }

  // If we're passed an array, toggle the class on each.
  if (el instanceof NodeList || el instanceof Array) {

    for (var i = 0, len = el.length; i < len; i++) {
      toggleClass(el[i], name, enable);
    }

    return;
  }

  var action = void 0;
  if (enable !== undefined) {
    enable = typeof enable === 'function' ? enable.call(null, el) : enable;
    action = enable ? 'add' : 'remove';
  } else {
    action = (0, _hasClass2.default)(el, name) ? 'remove' : 'add';
  }

  return (action === 'add' ? _addClass2.default : _removeClass2.default)(el, name);
} /**
   * # Toggle Class
   * Toggle a class on an element given a condition.
   *
   * @param {Element|Array} el An element or array of elements to update.
   * @param {String} name
   * @param {Boolean} enable
   * @return {Element}
   *
   * @module  helpers/dom/toggle-class.js
   */

exports.default = toggleClass;
module.exports = exports['default'];


},{"./add-class":6,"./has-class":8,"./remove-class":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendChildren(el, children, empty) {

  empty = empty === undefined ? false : empty;

  if (empty) {
    el.textContent = '';
  }

  var domList = children instanceof window.HTMLCollection;

  if (domList) {
    while (children.length) {
      el.appendChild(children[0]);
    }
  } else {
    (0, _each2.default)(children, function (c) {
      if (c) {
        el.appendChild(c);
      }
    });
  }
} /**
   * # Append Children
   * Append an array of children to a node.
   *
   * @param {Element} el
   * @param {Array} children
   * @param {Boolean} empty Empty the node before adding children?
   *
   * @module helpers/manipulation/append-children.js
   */

exports.default = appendChildren;
module.exports = exports['default'];


},{"../util/each":22}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertBefore(el, beforeEl, children) {
  (0, _each2.default)(children, function (c) {
    el.insertBefore(c, beforeEl);
  });
} /**
   * # Insert Before
   * Insert an array of elements before a node.
   *
   * @param {Element} el
   * @param {Element} beforeEl
   * @param {Array} children
   *
   * @module helpers/manipulation/insert-before.js
   */

exports.default = insertBefore;
module.exports = exports['default'];


},{"../util/each":22}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Wrap Element
 * Wrap an element with another element.
 *
 * @param {Element} el
 * @param {Element} wrapper
 * @return {Element}
 *
 * @module helpers/manipulation/wrap-element.js
 */
function wrapElement(el, wrapper) {

  wrapper = wrapper || document.createElement('div');

  if (el.nextSibling) {
    el.parentNode.insertBefore(wrapper, el.nextSibling);
  } else {
    el.parentNode.appendChild(wrapper);
  }

  return wrapper.appendChild(el);
}

exports.default = wrapElement;
module.exports = exports['default'];


},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChild(el, query) {

  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if ((0, _matches2.default)(el.children[i], query)) {
      return el.children[i];
    }
  }

  return null;
} /**
   * # Get Child
   * Get a child that matches the selector.
   *
   * @param {Element} el
   * @param {String} query
   * @return {Element|Null}
   *
   * @module helpers/traversal/get-child.js
   */

exports.default = getChild;
module.exports = exports['default'];


},{"./matches":21}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Get Index
 * Get the index of an element in a nodelist.
 *
 * @param {NodeList} els
 * @param {Node} el
 * @return {Number}
 *
 * @module helpers/traversal/get-index.js
 */
function getIndex(els, el) {
  return Array.prototype.indexOf.call(els, el);
}

exports.default = getIndex;
module.exports = exports["default"];


},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParent(parent, query, limitEl) {

  limitEl = limitEl instanceof Array ? limitEl : [limitEl || document.body];

  while (parent) {

    if ((0, _matches2.default)(parent, query)) {
      return parent;
    }

    if (limitEl.indexOf(parent) !== -1) {
      return false;
    }

    parent = parent.parentNode;
  }

  return false;
} /**
   * # Get Parent
   * See if an element has another element for a parent.
   *
   * @param {Element} parent
   * @param {String} query
   * @param {Array|Element} limitEl The last element we should check.
   * @return {Boolean|Element}
   *
   * @module helpers/traversal/get-parent.js
   */

exports.default = getParent;
module.exports = exports['default'];


},{"./matches":21}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getParent = require('./get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParents(parent, query, limitEl) {

  var list = [];

  while (parent = (0, _getParent2.default)(parent.parentNode, query, limitEl)) {
    list.push(parent);
  }

  return list;
} /**
   * # Get Parents
   * See if an element has parents which match a query.
   *
   * @param {Element} parent
   * @param {String} query
   * @param {Element} limitEl The last element we should check.
   * @return {Boolean|Array}
   *
   * @module helpers/traversal/get-parents.js
   */

exports.default = getParents;
module.exports = exports['default'];


},{"./get-parent":18}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Has Parent
 * See if an element has another element for a parent.
 *
 * @param {Element} child
 * @param {Element} possibleParent
 * @return {Boolean}
 *
 * @module helpers/traversal/has-parent.js
 */
function hasParent(child, possibleParent) {

  var parent = child.parentNode;

  while (parent) {

    if (parent === possibleParent) {
      return true;
    }

    parent = parent.parentNode;
  }

  return false;
}

exports.default = hasParent;
module.exports = exports["default"];


},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Matches
 * See if an element matches a query selector.
 *
 * @param {Element} el
 * @param {String} query
 * @return {Boolean}
 *
 * @module helpers/traversal/matches.js
 */
var vendorMatch = typeof Element !== 'undefined' && (Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector);

function matches(el, query) {

  if (vendorMatch) return vendorMatch.call(el, query);

  var nodes = el.parentNode ? el.parentNode.querySelectorAll(query) : [];

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] === el) return true;
  }

  return false;
}

exports.default = matches;
module.exports = exports['default'];


},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Each
 * Apply a callback function to a list of any kind: Array, NodeList, HTMLCollection or Object.
 *
 * @param {Array|NodeList|HTMLCollection|Object} list
 * @param {Function} cb
 *
 * @example
 * each([], callback);
 * each(el.children, callback);
 * each(el.childNodes, callback);
 * each({}, callback);
 *
 * @module helpers/util/each.js
 */
function each(list, cb) {

  if (!list) {
    return;
  }

  if (typeof cb !== 'function') {
    throw new Error('Cannot invoke `each` without a callback!');
  }

  var i = 0;
  var len = list.length;

  // Object
  if (len === undefined) {
    for (i in list) {
      if (i !== 'prototype' && list.hasOwnProperty(i)) {
        cb(i, list[i]);
      }
    }
  }
  // Array-like
  else {
      for (; i < len; i++) {
        cb(list[i]);
      }
    }
}

exports.default = each;
module.exports = exports['default'];


},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Trim
 * Trim whitespace on a string.
 *
 * @param {String} str
 *
 * @module helpers/util/trim.js
 */

var trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

function trim(str) {
  return str.replace(trimRE, '');
}

exports.default = trim;
module.exports = exports['default'];


},{}]},{},[2])(2)
});

//# sourceMappingURL=header.js.map
