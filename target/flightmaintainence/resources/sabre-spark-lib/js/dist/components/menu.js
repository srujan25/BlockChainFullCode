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
//# sourceMappingURL=menu.js.map
