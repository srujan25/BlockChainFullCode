/**
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
import BaseComponent from './base';
import Menu from './menu';
import toggleClass from '../helpers/dom/toggle-class';
import addClass from '../helpers/dom/add-class';
import removeClass from '../helpers/dom/remove-class';
import hasClass from '../helpers/dom/has-class';
import getIndex from '../helpers/traversal/get-index';
import appendChildren from '../helpers/manipulation/append-children';
import insertBefore from '../helpers/manipulation/insert-before';
import {get as getBreakpoint} from '../helpers/dom/breakpoint';
import getParent from '../helpers/traversal/get-parent';
import getParents from '../helpers/traversal/get-parents';
import {number as parseNumberAttribute} from '../helpers/dom/parse-attribute';

class Header extends BaseComponent {

  /**
   * Header constructor.
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
    this._determineInitialSize();
  }

  /**
   * Update the elements used.
   * @param {Element} el Optional
   */
  update(el) {

    this._removeEventListeners();
    this._removePlaceholder();
    this._cacheElements(el || this.el);
    this._parseParams();
    this._addEventListeners();
    this._ensureActiveAtMoreSwapIndex();
    this.checkFixed();

    // Run on the next frame so sizes have updated
    setTimeout(function() {
      this._determineMenuSize();
    }.bind(this), 0);

    return this;
  }


  /**
   * Check of we should be fixed.
   */
  checkFixed() {

    if (!this.fixed) {
      return this;
    }

    var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : window.document.body.scrollTop;
    var isCondensed = scrollTop > this.fixedDistance;
    toggleClass(this.el, 'spark-header--condensed', isCondensed);
    toggleClass(document.body, 'spark-header-condensed', isCondensed);

    return this;
  }


  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.navEl = this.el.querySelector('.spark-header__nav');
    this.menuEl = this.navEl && this.navEl.querySelector('.spark-header__menu');
    this.listEl = this.menuEl && this.menuEl.querySelector('.spark-header__list');
    this.toggleEl = this.el.querySelector('.spark-header__toggle');

    // Create a new instance of the menu component
    if (this.menuEl) {
      this.menu = new Menu(this.menuEl, {
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
  }


  /**
   * Parse parameters from the elements.
   */
  _parseParams() {
    this.fixed = this.fixed !== null ? this.fixed : hasClass(this.el, 'spark-header--fixed');
    this.fixedDistance = this.fixedDistance !== null ? this.fixedDistance : parseNumberAttribute(this.el, 'data-fixed-distance', 10);
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {

    this._determineInitialSizeBound = this._determineInitialSize.bind(this);
    this._onResizeBound = this._onResize.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    this._onMoreClickBound = this._onMoreClick.bind(this);
    this._onNavClickBound = this._onNavClick.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {

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
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {

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
  }


  /**
   * Get the current breakpoint for the header.
   */
  _getCurrentBreakpoint() {
    this.lastBreakpoint = this.currentBreakpoint;
    this.currentBreakpoint = getBreakpoint(this.el.clientWidth, this.breakpoints);
    this.el.setAttribute('data-breakpoint', this.currentBreakpoint);
  }


  /**
   * Create a placeholder for the whole header so that we can keep track
   * of the width of each child element regardless of whether or not we're
   * condensed. Condensed styles do not apply to instances of the element
   * with the placeholder class.
   */
  _createPlaceholder() {

    var div = document.createElement('div');
    div.innerHTML = this.navEl.outerHTML;

    var el = div.children[0];
    el.setAttribute('aria-hidden', true);

    addClass(el, 'spark-header__placeholder');

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
  }


  /**
   * Remove the placeholder
   */
  _removePlaceholder() {

    if (this.placeholder) {
      this.placeholder.el.parentNode.removeChild(this.placeholder.el);
      this.placeholder.menuEl.parentNode.removeChild(this.placeholder.menuEl);
      this.placeholder.listEl.parentNode.removeChild(this.placeholder.listEl);
    }

    if (this.listMoreEl) {
      this.placeholder.listMoreEl.parentNode.removeChild(this.placeholder.listMoreEl);
    }
  }


  /**
   * Disable tabbing for items in the placeholder.
   * @param {Element} el
   */
  _disablePlaceholderLinkTab(el) {

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
  }


  /**
   * Create a place to store overflow items of the list.
   * Also add this item to the placeholder element so we always know
   * which size it would be.
   */
  _createListMore() {

    var div = document.createElement('div');
    div.innerHTML = '<li><a class="spark-menu__list-link spark-menu__ignore" tabindex="0" title="More Items"><i class="spark-icon-menu-ellipsis-horizontal spark-icon--fill"></i></a><ul class="spark-menu__list"></ul></li>';

    var li = div.children[0];
    addClass(li, 'spark-menu__list-item spark-header__more');

    this.listMoreEl = li;
    this.listMoreListEl = li.querySelector('ul');
  }


  /**
   * Determine the menu size..
   */
  _determineInitialSize() {
    addClass(this.el, 'spark-header--visible');
    this._ensureActiveAtMoreSwapIndex();
    this._determineMenuSize();
  }


  /**
   * Determine how many nav items can fit.
   * @param {Boolean} isSwap Optional Is this a swapping event? If so, ignore redundancy checks.
   */
  _determineMenuSize(isSwap) {

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
    addClass(this.el, 'spark-header--overflow-checked');

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
    insertBefore(this.listEl, this.listMoreEl, items.show);

    // If we have items to hide, append them to the more element
    if (items.hide.length) {
      appendChildren(this.listMoreListEl, items.hide);
    }
    // Otherwise, remove the more element
    else {
      this._removeListMore();
    }
  }


  /**
   * Listen for the ready state change and rerun the menu size determination.
   */
  _listenForReadyStateChange() {

    // Already loaded
    if (document.readyState === 'complete' || document.readyState === 'loaded') {
      return;
    }

    // Bound listener
    var run = function() {
      if (document.readyState === 'complete' || document.readyState === 'loaded') {
        this._determineMenuSize();
        document.removeEventListener('readystatechange', run);
      }
    }.bind(this);

    // Only run once
    document.addEventListener('readystatechange', run);
  }


  /**
   * Check the primary nav breakpoint.
   * @param {String|Array} name A string or array of string names of breakpoints to check for
   */
  _isMenuBreakpoint(name) {
    this._getCurrentBreakpoint();
    return name instanceof Array ? name.indexOf(this.currentBreakpoint) !== -1 : this.currentBreakpoint === 'xs';
  }


  /**
   * Get the items to show and hide.
   * @return {Object}
   */
  _getItemsToShowAndHide() {

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
  }


  /**
   * Ensure that any active item is set to the more swap index. This ensures
   * that the active item is always visible on the screen.
   */
  _ensureActiveAtMoreSwapIndex() {

    if (!this.listEls || !this.listEls.length) {
      return;
    }

    var el = this.el.querySelector('[class*="list-item"].active');
    if (el) {
      var parents = getParents(el, '.spark-menu__list-item', this.el);

      if (parents && parents[parents.length - 1]) {
        el = parents[parents.length - 1];
      }

      var index = getIndex(this.listEls, el);

      if (index !== this.moreSwapIndex) {
        this.moreSwapIndex = index;
      }
    }
  }

  /**
   * Add a placeholder for overflow items to the list.
   */
  _addListMore() {
    if (this.listMoreEl.parentNode !== this.listEl) {
      this.listEl.appendChild(this.listMoreEl);
    }
  }


  /**
   * Remove a placeholder for overflow items from the primary nav.
   */
  _removeListMore() {
    if (this.listMoreEl.parentNode) {
      this.listMoreEl.parentNode.removeChild(this.listMoreEl);
    }
  }


  /**
   * Reset the children of the primary navigation.
   */
  _resetMenuChildren() {
    this.moreSwapIndex = -1;
    removeClass(this.el, 'spark-header--overflow-checked');
    appendChildren(this.listEl, this.listEls);
  }


  /**
   * Toggle the collapsed nav style.
   * @param {Boolean} enable
   */
  _toggleCollapsed(enable) {

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
    toggleClass(this.el, 'spark-header--collapsed', enable);
    toggleClass(this.el, 'spark-header--visible', !enable);
  }


  /**
   * Enable toggling on top-level items.
   */
  _enableTopLevelToggling() {

    var i = 0;
    var len = this.listEls.length;

    for (; i < len; i++) {
      removeClass(this.listEls[i], 'spark-no-animate');
    }
  }


  /**
   * Disable toggling on top-level items.
   */
  _disableTopLevelToggling() {

    var i = 0;
    var len = this.listEls.length;

    for (; i < len; i++) {
      addClass(this.listEls[i], 'spark-no-animate');
    }
  }


  /**
   * When the window resizes, redetermine the size of the primary nav elements.
   */
  _onResize() {

    // Ensure that any active item we may have is at the swap index
    this._ensureActiveAtMoreSwapIndex();
    this._determineMenuSize();

    // If we are fixed, do the scroll check
    if (this.fixed) {
      this.checkFixed();
    }
  }


  /**
   * Check to see if the header should be fixed.
   * @param {Object} e
   */
  _onScroll() {
    this.checkFixed();
  }


  /**
   * When a link in the more list is clicked, swap it with the last element in the visible list.
   * @param {Object} e
   */
  _onMoreClick(e) {

    // Don't do any swapping if we're in a collapsed state
    if (this.isCollapsed) {
      return;
    }

    // Get the index of the clicked element
    var li = getParent(e.target, 'li', this.listMoreListEl);

    // Save the index of the element to be swapped
    this.moreSwapIndex = getIndex(this.listEls, li);

    // Redetermine the primary nav size
    this._determineMenuSize(true);
  }


  /**
   * When the toggle is clicked, toggle the active state on the nav
   * @param {Object} e
   */
  _onToggleClick(e) {
    e.preventDefault();
    this.isActive = !this.isActive;
    toggleClass(this.navEl, 'active', this.isActive);
    this.menu._openActiveParents();
  }


  /**
   * When the nav is clicked, set to inactive.
   * @param {Object} e
   */
  _onNavClick(e) {
    if (e.target === this.navEl && this.isCollapsed) {
      this.isActive = !this.isActive;
      removeClass(this.navEl, 'active');
    }
  }
}


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

export default Header;
