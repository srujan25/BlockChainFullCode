/**
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
import BaseComponent from './base';
import animateHeight from '../helpers/animation/height';
import transform from '../helpers/css/transform';
import addClass from '../helpers/dom/add-class';
import removeClass from '../helpers/dom/remove-class';
import hasClass from '../helpers/dom/has-class';
import hasParent from '../helpers/traversal/has-parent';
import getParent from '../helpers/traversal/get-parent';
import getParents from '../helpers/traversal/get-parents';
import getChild from '../helpers/traversal/get-child';
import wrapElement from '../helpers/manipulation/wrap-element';

const noop = function() {};

class Menu extends BaseComponent {

  /**
   * Menu constructor.
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
    this._checkAnimation();
  }


  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-menu__toggle');
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('focus', this._onFocusBound, true);
    this.el.addEventListener('blur', this._onBlurBound, true);
    this.el.addEventListener('keydown', this._onKeydownBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('focus', this._onFocusBound);
    this.el.removeEventListener('blur', this._onBlurBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
  }

  /**
   * Toggle the open state of an item.
   * @param {Element} item
   */
  _toggleItem(item) {

    if (hasClass(item, 'open')) {
      this._closeItem(item);
    } else {
      this._openItem(item);
    }
  }

  /**
   * Toggle aria-checked state of the Expand/Collapse toggle carets
   * @param {Element} item
   */
  _toggleAriaCheckedState(item) {
    if (item.hasAttribute('aria-checked')) {
      let ariaState = item.getAttribute('aria-checked') === 'true';
      item.setAttribute('aria-checked', String(!ariaState));
    }
  }

  /**
   * Check for a nested list and create the wrappers needed
   * for animating the lists
   *
   */
  _checkAnimation() {
    if (this.el.querySelector('.spark-menu__list-next')) {
      this.cachedList = this.cachedList || [];
      this._createMenuAnimationWrapper();
      this._animateListChange();
    }
  }

  /**
   * Create wrapper class to help with animation of sliding lists
   *
   */
  _createMenuAnimationWrapper() {
    if (this.wrapperEl) {
      return;
    }

    var wrapperEl = document.createElement('div');
    addClass(wrapperEl, 'spark-menu__animation-wrapper');
    wrapElement(this.el.querySelector('.spark-menu__list'), wrapperEl);
    this.wrapperEl = wrapperEl;
  }


  /**
   * Animate the position of the animation wrapper. Optionally, do
   * so immediately without waiting for an animation.
   * @param {Boolean} noAnimate
   */
  _animateListChange(noAnimate) {

    if (noAnimate) {
      addClass(this.wrapperEl, 'no-animate');
    }

    this.wrapperEl.setAttribute('style', transform('translateX', '-' + (this.cachedList.length * 100) + '%'));

    if (noAnimate) {
      setTimeout(function() {
        removeClass(this.wrapperEl, 'no-animate');
      }.bind(this), 1);
    }
  }

  /**
   * Append list to menu element
   * @param {Element} list
   * @param {Boolean} noAnimate
   */
  _appendList(item, noAnimate) {

    // Create wrapper
    this._createMenuAnimationWrapper();

    var newList = item.cloneNode(true);
    addClass(newList, 'nestedList');
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
  }

  /**
   * Remove list to nav
   *
   */
  _removeLastList() {
    // If there are any items to remove
    if (this.cachedList.length) {
      // Retrieve last item from list
      var removeElement = this.cachedList.pop();
      if (this.wrapperEl) {
        // Slide navigation
        this._animateListChange();
      }
      window.setTimeout(function() {
        // Remove itself from DOM
        removeElement.parentNode.removeChild(removeElement);
      }, 250);
    }
  }

  /**
   * Remove all lists from panel menu
   *
   */
  _removeAllCachedLists() {
    if (this.cachedList) {
      // If there are any items to remove
      while (this.cachedList.length) {
        // While there are still items, remove them
        this._removeLastList();
      }
    }
  }

  /**
   * Finds and returns the next nested list
   * @param {Object} item
   * @return {Object}
   */
  _getNextList(item) {
    return item.querySelector('.spark-menu__list-next') ? document.querySelector(item.querySelector('.spark-menu__list-next').getAttribute('data-menu')) : null;
  }


  /**
   * Open an item by animating it.
   * @param {Object} item
   */
  _openItem(item) {

    // Item is already open
    if (hasClass(item, 'open')) {
      return;
    }

    animateHeight({
      el: item,
      toggleEl: '.spark-menu__list'
    });

    addClass(item, 'open');
  }


  /**
   * Close an item by animating it shut.
   * @param {Object} item
   */
  _closeItem(item) {

    // Item is already closed
    if (!hasClass(item, 'open')) {
      return;
    }

    animateHeight({
      el: item,
      toggleEl: '.spark-menu__list',
      toggleValue: 'none',
      action: 'collapse'
    });

    removeClass(item, 'open');
  }


  /**
   * Make an item active.
   * @param {Element} item
   */
  _activateItem(item) {

    // Item is already active
    if (hasClass(item, 'active')) {
      return;
    }

    // Deactivate any active items
    var parents = getParents(item, '.spark-menu__list', this.el);
    this._deactivateItems(parents[parents.length - 1]);
    this._deactivateItemSiblings(item);

    // Add the active class
    addClass(item, 'active');

    // If there is a parent that is also a list item, open it.
    this._activateItemParents(item, this.el);
  }


  /**
   * Activate parent items.
   * @param {Element} el
   * @param {Element} limitEl
   */
  _activateItemParents(el, limitEl) {

    var parents = getParents(el.parentNode, '[class*="list-item"]', limitEl);

    var i = 0;
    var len = parents.length;

    // Add the active class
    for (; i < len; i++) {
      this._openItem(parents[i]);
      addClass(parents[i], 'child-active');
    }
  }


  /**
   * Deactivate items.
   * @param {Element} el
   */
  _deactivateItems(el) {

    var actives = el.querySelectorAll('[class*="list-item"].active');
    var i = 0;
    var len = actives.length;

    // Remove the active class
    for (; i < len; i++) {
      removeClass(actives.item(i), 'active');
    }
  }

  /**
   * Deactivate siblings items.
   * @param {Element} el
   */
  _deactivateItemSiblings(el) {

    var actives = el.parentNode.querySelectorAll('[class*="list-item"].child-active');
    var i = 0;
    var len = actives.length;

    // Remove the active class
    for (; i < len; i++) {
      removeClass(actives[i], 'child-active');
      removeClass(actives[i], 'open');
    }
  }


  /**
   * Open the parents of the active item.
   *
   */
  _openActiveParents() {

    var activeItem = this.el.querySelector('.active');
    if (activeItem) {
      var parentItems = getParents(activeItem, '.spark-menu__list-item', this.el);
      var itemLinks;
      var nextList;

      for (var i = parentItems.length - 1; i >= 0; i--) {
        itemLinks = getChild(parentItems[i], '.spark-menu__list-links');
        if (itemLinks && itemLinks.querySelector('.spark-menu__list-next')) {
          nextList = this._getNextList(parentItems[i]);
          if (nextList && !this._cachedListContainsID(nextList.getAttribute('id'))) {
            this._appendList(nextList, true);
          }
        } else {
          addClass(parentItems[i], 'open');
        }
      }
    }
  }


  /**
   * Check if the cached list contains a certain ID
   * @param {String} id
   * @return {Boolean}
   */
  _cachedListContainsID(id) {
    var i = this.cachedList.length;
    while (i--) {
      if (this.cachedList[i].getAttribute('data-nested-list-id') === id) {
        return true;
      }
    }
    return false;
  }

  /**
   * When an item is clicked, make it active. Determine if the click was on an expand
   * button and open the list if so.
   * @todo: It should be possible to opt out of this behavior.
   * @param {Object} e
   */
  _onClick(e) {

    // Don't make forms active
    if (getParent(e.target, 'form', this.el)) {
      return;
    }

    // Toggle the visibility of the menu?
    var toggle = e.target === this.toggleEl || hasParent(e.target, this.toggleEl);
    if (toggle) {
      return (this.onToggle || noop)(e, this);
    }

    // Is there a parent to open and an item?
    var open = getParent(e.target, '.spark-menu__list-expand', this.el);
    var item = getParent(e.target, '.spark-menu__list-item', this.el);

    // If we have no item or have been told to ignore the item
    if (!item || getParent(e.target, '.spark-menu__ignore', this.el)) {
      return;
    }
    if (open) {
      this._toggleAriaCheckedState(open);
      return this._toggleItem(item);
    }

    // Check if we have a valid item and we aren't inside the expanded header
    if (item && !hasParent(e.target, document.querySelector('.spark-header--visible'))) {

      var next = this._getNextList(item);

      if (next && hasClass(e.target, 'spark-menu__list-next')) {
        // Active item
        this._activateItem(item);
        this._appendList(next);
        return;
      }

      var back = getParent(e.target, '.spark-menu__list-back', item);

      if (back && hasClass(e.target, 'spark-menu__list-back')) {
        this._removeLastList();
        return;
      }
    }

    // Active item
    this._activateItem(item);
  }


  /**
   * When the space or enter key is pressed on a focused item, make it active.
   * Determine if the click was on an expand button or link and open the list if so.
   * @todo: It should be possible to opt out of this behavior.
   * @param {Object} e
   */
  _onKeydown(e) {
    var code = e.keyCode || e.which;

    // Don't make forms active
    if (getParent(e.target, 'form', this.el)) {
      return;
    }

    // Toggle the visibility of the menu?
    var toggle = e.target === this.toggleEl || hasParent(e.target, this.toggleEl);
    if (toggle) {
      return (this.onToggle || noop)(e, this);
    }

    // Is there a parent to open and an item?
    var open = getParent(e.target, '.spark-menu__list-expand', this.el);
    var item = getParent(e.target, '.spark-menu__list-item', this.el);

    // If we have no item or have been told to ignore the item
    if (!item || getParent(e.target, '.spark-menu__ignore', this.el)) {
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
    if (item && !hasParent(e.target, document.querySelector('.spark-header--visible'))) {

      var next = this._getNextList(item);

      if (next && hasClass(e.target, 'spark-menu__list-next')) {
        if (code === 32 || code === 13) {
          e.preventDefault();
          // Active item
          this._activateItem(item);
          this._appendList(next);
          return;
        }
      }

      var back = getParent(e.target, '.spark-menu__list-back', item);

      if (back && hasClass(e.target, 'spark-menu__list-back')) {
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
  }

  /**
   * Keep track of when items have focus.
   * @param {Object} e
   */
  _onFocus(e) {

    var parent = e.target;
    var lastParent = parent;

    while(parent) {
      parent = getParent(lastParent.parentNode, '.spark-menu__list-item', this.el);
      if (!parent || parent === lastParent) break;
      addClass(parent, 'has-focus');
      lastParent = parent;
    }
  }


  /**
   * Keep track of when items lose focus.
   * @param {Object} e
   */
  _onBlur(e) {

    var parent = e.target;
    var lastParent = parent;

    while(parent) {
      parent = getParent(lastParent.parentNode, '.spark-menu__list-item', this.el);
      if (!parent || parent === lastParent) break;
      removeClass(parent, 'has-focus');
      lastParent = parent;
    }
  }
}


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

export default Menu;
