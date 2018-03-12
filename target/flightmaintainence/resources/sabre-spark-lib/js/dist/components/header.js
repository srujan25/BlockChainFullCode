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
//# sourceMappingURL=header.js.map
