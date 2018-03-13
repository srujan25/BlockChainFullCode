/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Menu = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":16}],2:[function(require,module,exports){
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


},{"../helpers/animation/height":3,"../helpers/css/transform":4,"../helpers/dom/add-class":5,"../helpers/dom/has-class":6,"../helpers/dom/remove-class":8,"../helpers/manipulation/wrap-element":10,"../helpers/traversal/get-child":11,"../helpers/traversal/get-parent":12,"../helpers/traversal/get-parents":13,"../helpers/traversal/has-parent":14,"./base":1}],3:[function(require,module,exports){
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


},{"../dom/add-class":5,"../dom/has-class":6,"../dom/outer-height":7,"../dom/remove-class":8,"../dom/toggle-class":9}],4:[function(require,module,exports){
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


},{"../util/each":16}],5:[function(require,module,exports){
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


},{"../util/trim":17,"./has-class":6}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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


},{"../util/each":16}],8:[function(require,module,exports){
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


},{"../util/trim":17}],9:[function(require,module,exports){
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


},{"./add-class":5,"./has-class":6,"./remove-class":8}],10:[function(require,module,exports){
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


},{}],11:[function(require,module,exports){
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


},{"./matches":15}],12:[function(require,module,exports){
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


},{"./matches":15}],13:[function(require,module,exports){
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


},{"./get-parent":12}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
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


},{}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
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

//# sourceMappingURL=menu.js.map
