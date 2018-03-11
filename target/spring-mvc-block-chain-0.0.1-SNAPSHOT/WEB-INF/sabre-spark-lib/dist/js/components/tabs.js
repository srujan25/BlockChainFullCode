/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Tabs = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _transform = require('../helpers/css/transform');

var _transform2 = _interopRequireDefault(_transform);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _getIndex = require('../helpers/traversal/get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _getChildren = require('../helpers/traversal/get-children');

var _getChildren2 = _interopRequireDefault(_getChildren);

var _breakpoint = require('../helpers/dom/breakpoint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Tabs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Tabbed navigation
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Tabs(el, {
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/tabs.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tabs = function (_BaseComponent) {
  _inherits(Tabs, _BaseComponent);

  /**
   * Tabs constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Tabs(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tabs);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._determineSize();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Set the active item.
   * @param {String|Number|Object} el
   */


  Tabs.prototype.setActive = function setActive(el) {

    var panel;

    // If we're passed a string instead of an element or number,
    // get the panel with that id.
    if (typeof el === 'string') {
      panel = this._findPanelByName(el);

      // If we've found a panel, find the corresponding tab.
      if (panel) {
        el = this._findTabByPanel(panel);
      }
    }

    // If we're passed a number instead of an element,
    // get that item from the tabEls NodeList
    if (typeof el === 'number') {
      el = this.tabEls.item(el);
    }

    // If we couldn't find the element or it's already active, stop.
    if (!el || (typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || el === this.activeTabEl) {
      return false;
    }

    // Remove the active class from the currently active tab
    if (this.activeTabEl) {
      (0, _toggleClass2.default)(this.activeTabEl, 'active', false);

      // Remove the aria-selected attribute from the old tab
      this.activeTabEl.querySelector('a').removeAttribute('aria-selected');
      this.previousTabEl = this.activeTabEl;
    }

    // Add the active class and store.
    (0, _toggleClass2.default)(el, 'active', true);

    // Add the aria-selected attribute to the new tab
    el.querySelector('a').setAttribute('aria-selected', 'true');
    this.activeTabEl = el;

    // Focus the tab on the left side if it's to the left of the frame.
    if (-el.offsetLeft > this.x) {
      this.focus(el, 'left');
    }
    // Focus the tab on the right side if it's to the right of the frame.
    else if (el.offsetLeft + el.clientWidth > this.tabListScrollEl.clientWidth - this.x) {
        this.focus(el, 'right');
      }

    // If we don't already have a panel, find the panel that corresponds to this tab.
    if (!panel) {
      panel = this._findPanelByTab(el);
    }

    // Set the new panel to be active.
    (0, _toggleClass2.default)(panel, 'active', true);

    // Set aria-hidden attribute to false for this panel
    panel.setAttribute('aria-hidden', 'false');

    // Remove the active class from the currently active panel.
    if (this.activePanelEl) {
      (0, _toggleClass2.default)(this.activePanelEl, 'active', false);

      // Set aria-hidden attribute to true for this panel
      this.activePanelEl.setAttribute('aria-hidden', 'true');
    }

    // Store the new active panel
    this.activePanelEl = panel;

    // Set the hash
    if (this.useHash) {
      window.location.hash = this.activePanelEl.getAttribute('id') || '';
    }
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.activePanelEl.dispatchEvent(e);

    return this;
  };

  /**
   * Start the drag
   * @param {Object} params
   */


  Tabs.prototype.start = function start(params) {

    params = params || {};

    // Start dragging
    this.isDragging = true;

    // Stash the element and its position
    this.lastX = params.lastX;
    this.lastY = params.lastY;

    // Stash the min and max values
    this._determineMinMax();

    // Add listeners to the body so we can drag this thing anywhere and still get events
    this._addMoveEventListeners(params.type || 'mouse');

    return this;
  };

  /**
   * Stop the drag
   * @param {Object} params
   */


  Tabs.prototype.stop = function stop(params) {

    params = params || {};

    // Make sure we're in bounds
    this._checkX();

    // Stop dragging
    this.isDragging = false;
    this.scrollDistance = 0;

    // Reset the scroll direction
    this.scrollDirection = '';

    // Unbind event listeners on the body
    this._removeMoveEventListeners(params.type);

    return this;
  };

  /**
   * Move the drag point
   * @param {Object} params
   */


  Tabs.prototype.move = function move(params) {

    // Make sure we're currently dragging
    if (!this.isDragging && !params.scroll && !params.force) {
      return this;
    }

    // If we're beyond the bounds, add some resistance to the scroll.
    if (!params.force && (this.x + params.x > this.maxX || this.x + params.x < this.minX)) {
      this.x += params.x / 4;
    } else {
      this.x += params.x;
    }

    this.scrollDistance += Math.abs(params.x);

    if (params.scroll) {
      this._checkX();
    }

    this._updatePosition();

    return this;
  };

  /**
   * Focus on a specific element by bringing it to the middle of the scroller.
   * @param {Element} el
   * @param {String} align Which side to align with.
   */


  Tabs.prototype.focus = function focus(el, align) {

    align = align || 'left';

    this.x = align === 'left' ? -el.offsetLeft : -(el.offsetLeft - this.tabListScrollEl.clientWidth + el.offsetWidth);

    this._checkX();
    this._updatePosition();

    return this;
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Tabs.prototype.remove = function remove(leaveElement) {
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the elements used.
   * @param {Element} el Optional
   */


  Tabs.prototype.update = function update(el) {

    _BaseComponent.prototype.update.call(this, el);

    // Run on the next frame so sizes have updated
    setTimeout(function () {
      this._determineSize();
      this.focus(this.activeTabEl);
    }.bind(this), 0);

    return this;
  };

  /**
   * Find a panel element by name.
   * @param {String} name
   * @return {Object|Null}
   */


  Tabs.prototype._findPanelByName = function _findPanelByName(name) {

    name = name.replace('#', '');

    var i = 0;
    var len = this.panelEls.length;
    var found = null;
    var el;

    for (; i < len && !found; i++) {
      if (this.panelEls[i].getAttribute('id') === name) {
        el = this.panelEls[i];
        found = true;
      }
    }

    return found && el;
  };

  /**
   * Find a panel given its corresponding tab. Try to match based on the
   * id attribute, but fall back to matching based on index.
   * @param {Object} tab
   * @return {Object|Null}
   */


  Tabs.prototype._findPanelByTab = function _findPanelByTab(tab) {

    var anchorChild = tab.querySelector('a');
    var id = anchorChild && anchorChild.getAttribute('href');
    var index = (0, _getIndex2.default)(tab.parentNode.children, tab);
    var i = 0;
    var len = this.panelEls.length;
    var foundById = null;
    var idMatch = null;
    var indexMatch = null;

    id = id ? id.replace('#', '') : id;

    for (; i < len && !foundById; i++) {
      if (id && this.panelEls[i].getAttribute('id') === id) {
        foundById = true;
        idMatch = this.panelEls[i];
      } else if (i === index) {
        indexMatch = this.panelEls[i];
      }
    }

    return foundById && idMatch || indexMatch;
  };

  /**
   * Find a tab given its corresponding panel. Try to match based on the
   * [href] attribute, but fall back to matching based on index.
   * @param {Object} panel
   * @return {Object|Null}
   */


  Tabs.prototype._findTabByPanel = function _findTabByPanel(panel) {

    var id = panel.getAttribute('id');
    var index = (0, _getIndex2.default)(panel.parentNode.children, panel);
    var i = 0;
    var len = this.tabEls.length;
    var foundById = null;
    var idMatch = null;
    var indexMatch = null;

    for (; i < len && !foundById; i++) {
      if (id && (this.tabEls.item(i).querySelector('a').getAttribute('href') === '#' + id || this.tabEls.item(i).getAttribute('href') === '#' + id)) {
        foundById = true;
        idMatch = this.tabEls.item(i);
      } else if (i === index) {
        indexMatch = this.tabEls.item(i);
      }
    }

    return foundById && idMatch || indexMatch;
  };

  /**
   * Find the tab which an element lives inside.
   * @param {Element} el
   * @return {Object}
   */


  Tabs.prototype._findTabByChildElement = function _findTabByChildElement(el) {

    var i = 0;
    var len = this.tabEls.length;
    var found;
    var tab;

    for (; i < len && !found; i++) {

      // There is a chance that the element passed IS a tab. Or maybe a tab is its parent.
      if (this.tabEls.item(i) === el || (0, _hasParent2.default)(el, this.tabEls.item(i))) {
        found = true;
        tab = this.tabEls.item(i);
      }
    }

    return found && tab;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Tabs.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.tabListEl = this.el.querySelector('.spark-tabs__list');
    this.tabListScrollEl = this.tabListEl.parentNode;
    this.tabEls = this.tabListEl.querySelectorAll('.spark-tabs__tab');
    this.panelEls = (0, _getChildren2.default)(this.el.querySelector('.spark-tabs__panels'), '[role="tabpanel"]');
    this.navEl = this.el.querySelector('.spark-tabs__nav');
    this.leftEl = this.navEl.querySelector('.spark-tabs__btn--left');
    this.rightEl = this.navEl.querySelector('.spark-tabs__btn--right');

    // Make sure we have the elements we need
    if (!this.tabListEl || !this.tabEls.length || !this.panelEls.length) {
      throw new Error('Tab element missing either a .spark-tabs__list, or elements with .spark-tabs__tab and .spark-tabs__panel!', this.el);
    }

    // If there is a hash set, use that to try and set the active panel
    var hashSet = window.location.hash && this.setActive(window.location.hash);

    // If we weren't able to set with a hash, find the tab marked active or default to the first tab
    if (!hashSet) {
      this.setActive(this.tabListEl.querySelector('.spark-tabs__tab.active') || 0);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Tabs.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onResizeBound = this._onResize.bind(this);

    this._onTabListClickBound = this._onTabListClick.bind(this);

    this._onRightClickBound = this._onRightClick.bind(this);
    this._onLeftClickBound = this._onLeftClick.bind(this);

    this._onTouchStartBound = this._onTouchStart.bind(this);
    this._onTouchMoveBound = this._onTouchMove.bind(this);
    this._onTouchEndBound = this._onTouchEnd.bind(this);

    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);

    this._onScrollBound = this._onScroll.bind(this);

    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Tabs.prototype._addEventListeners = function _addEventListeners() {

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    this.tabListEl.addEventListener('click', this._onTabListClickBound);

    this.tabListEl.addEventListener('touchstart', this._onTouchStartBound);
    this.tabListEl.addEventListener('mousedown', this._onMouseDownBound);
    this.tabListEl.addEventListener('mousewheel', this._onScrollBound);
    this.tabListEl.addEventListener('DOMMouseScroll', this._onScrollBound);

    this.tabListEl.addEventListener('focus', this._onFocusBound, true);
    this.tabListEl.addEventListener('blur', this._onBlurBound, true);

    if (this.leftEl) {
      this.leftEl.addEventListener('click', this._onLeftClickBound);
    }

    if (this.rightEl) {
      this.rightEl.addEventListener('click', this._onRightClickBound);
    }
  };

  /**
   * Remove event listeners for DOM events..
   */


  Tabs.prototype._removeEventListeners = function _removeEventListeners() {

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    this.tabListEl.removeEventListener('click', this._onTabListClickBound);

    this.tabListEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.tabListEl.removeEventListener('mousedown', this._onMouseDownBound);
    this.tabListEl.removeEventListener('mousewheel', this._onScrollBound);
    this.tabListEl.removeEventListener('DOMMouseScroll', this._onScrollBound);

    this.tabListEl.removeEventListener('focus', this._onFocusBound);
    this.tabListEl.removeEventListener('blur', this._onBlurBound);

    if (this.leftEl) {
      this.leftEl.removeEventListener('click', this._onLeftClickBound);
    }

    if (this.rightEl) {
      this.rightEl.removeEventListener('click', this._onRightClickBound);
    }
  };

  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the tabs.
   * @param {String} type Which type of listeners to add
   */


  Tabs.prototype._addMoveEventListeners = function _addMoveEventListeners(type) {

    // Only listen for events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.addEventListener('mousemove', this._onMouseMoveBound);
        window.addEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.addEventListener('touchmove', this._onTouchMoveBound);
        window.addEventListener('touchend', this._onTouchEndBound);
        break;
    }
  };

  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to remove
   */


  Tabs.prototype._removeMoveEventListeners = function _removeMoveEventListeners(type) {

    // Only unbind events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.removeEventListener('mousemove', this._onMouseMoveBound);
        window.removeEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.removeEventListener('touchmove', this._onTouchMoveBound);
        window.removeEventListener('touchend', this._onTouchEndBound);
        break;
    }
  };

  /**
   * Determine which size class to set on the element. This is a way of using breakpoint-like
   * logic for the tabs. We can't rely on real breakpoints because there is no guarantee that
   * the tabs will be the width of the window.
   * Also determine if we should be showing navigation arrows.
   */


  Tabs.prototype._determineSize = function _determineSize() {

    var width = this.el.clientWidth;
    var bp = (0, _breakpoint.get)(width, this.breakpoints);

    // If the found breakpoint is different than the current breakpoint, set the proper state.
    if (this.currentBreakpoint !== bp) {
      (0, _toggleClass2.default)(this.el, this.currentBreakpoint, false);
      this.currentBreakpoint = bp;
      (0, _toggleClass2.default)(this.el, this.currentBreakpoint, true);
    }

    // If the tab list is wider than the scroll container, set the scrollable class.
    this.isScrollable = this.tabListEl.clientWidth > this.tabListScrollEl.clientWidth;
    (0, _toggleClass2.default)(this.navEl, 'scrollable', this.isScrollable);
    this._determineMinMax();
  };

  /**
   * Determine the min and max values for the slider.
   */


  Tabs.prototype._determineMinMax = function _determineMinMax() {

    if (!this.tabListEl || !this.tabListScrollEl) {
      return;
    }

    this.maxX = 0;
    this.minX = this.tabListScrollEl.clientWidth - this.tabListEl.clientWidth - this.maxX;
  };

  /**
   * Enable the animation state.
   */


  Tabs.prototype._enableAnimation = function _enableAnimation() {
    this.isAnimatable = true;
    (0, _toggleClass2.default)(this.navEl, 'no-animation', !this.isAnimatable);
  };

  /**
   * Disable the animation state.
   */


  Tabs.prototype._disableAnimation = function _disableAnimation() {
    this.isAnimatable = false;
    (0, _toggleClass2.default)(this.navEl, 'no-animation', !this.isAnimatable);
  };

  /**
   * Update the position of the tabs.
   */


  Tabs.prototype._updatePosition = function _updatePosition() {
    this.tabListEl.setAttribute('style', (0, _transform2.default)('translate', this.x + 'px'));
  };

  /**
   * Check the x position
   */


  Tabs.prototype._checkX = function _checkX() {

    if (this.x < this.minX) {
      this.x = this.minX;
      this._updatePosition();
    }

    if (this.x > 0) {
      this.x = 0;
      this._updatePosition();
    }
  };

  /**
   * When the user clicks on a tab, make it active.
   * @param {Object} e
   */


  Tabs.prototype._onTabListClick = function _onTabListClick(e) {

    // Make sure we haven't scrolled.
    if (this.scrollDistance > 5) {
      e.preventDefault();
      return;
    }

    var tab;

    // Find if one of our tab elements is in the path
    if (tab = this._findTabByChildElement(e.target)) {
      e.preventDefault();
      this.setActive(tab);
    }
  };

  /**
   * When the window resizes, determine the size we should be using for tabs.
   * @param {Object} e
   */


  Tabs.prototype._onResize = function _onResize() {
    this._determineSize();
    this.focus(this.activeTabEl);
  };

  /**
   * When the touchstart event fires, start the scrolling process
   * @param {Object} e
   */


  Tabs.prototype._onTouchStart = function _onTouchStart(e) {

    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    this.start({
      lastX: e.touches[0].clientX,
      lastY: e.touches[0].clientY,
      type: 'touch'
    });
  };

  /**
   * As the user continues moving the touch, determine
   * if we should move.
   * @param {Object} e
   */


  Tabs.prototype._onTouchMove = function _onTouchMove(e) {

    var xDistance = e.touches[0].clientX - this.lastX;
    var yDistance = e.touches[0].clientY - this.lastY;

    // If we haven't yet determined a scroll direction
    if (!this.scrollDirection) {

      // Moving up and down
      if (Math.abs(yDistance) > Math.abs(xDistance)) {
        this.scrollDirection = 'ns';
      }
      // Moving side to side
      else {
          this.scrollDirection = 'ew';
        }
    }

    // If We're moving left to right, start the move.
    if (this.scrollDirection === 'ew') {

      e.preventDefault();

      this.move({
        x: xDistance
      });
    }

    this.lastX = e.touches[0].clientX;
    this.lastY = e.touches[0].clientY;
  };

  /**
   * When the touch is over.
   * @param {Object} e
   */


  Tabs.prototype._onTouchEnd = function _onTouchEnd() {

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'touch'
      });
    }.bind(this), 1);
  };

  /**
   * When the mousedown event fires, start the scrolling process
   * @param {Object} e
   */


  Tabs.prototype._onMouseDown = function _onMouseDown(e) {

    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    this.start({
      lastX: e.clientX,
      lastY: e.clientY,
      type: 'mouse'
    });
  };

  /**
   * As the user continues moving the mouse, determine
   * if we should move.
   * @param {Object} e
   */


  Tabs.prototype._onMouseMove = function _onMouseMove(e) {

    var xDistance = e.clientX - this.lastX;
    var yDistance = e.clientY - this.lastY;

    // If we haven't yet determined a scroll direction
    if (!this.scrollDirection) {

      // Moving up and down
      if (Math.abs(yDistance) > Math.abs(xDistance)) {
        this.scrollDirection = 'ns';
      }
      // Moving side to side
      else {
          this.scrollDirection = 'ew';
        }
    }

    // If We're moving left to right, start the move.
    if (this.scrollDirection === 'ew') {

      e.preventDefault();

      this.move({
        x: xDistance
      });
    }

    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  /**
   * When the mouse move is complete.
   * @param {Object} e
   */


  Tabs.prototype._onMouseUp = function _onMouseUp() {

    // If we haven't been dragging, get outta here!
    if (!this.isDragging) {
      return;
    }

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'mouse'
      });
    }.bind(this), 1);
  };

  /**
   * When the user scrolls horizontally on the tabs, slide.
   * @param {Object} e
   */


  Tabs.prototype._onScroll = function _onScroll(e) {

    // Don't bother if we aren't scrollable
    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    // Allow for Firefox's wheel detail
    var val = e.wheelDeltaX || -e.detail * 40;

    // If the scroll has moved...
    if (val) {

      // Supress native
      e.preventDefault();

      // Move us to the new position
      this.move({
        x: val,
        scroll: true
      });
    }

    // Cancel an existing scroll timer
    if (this.scrollTimer) {
      window.clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }

    // The scroll is considered "done" after 100ms
    this.scrollTimer = window.setTimeout(this._onScrollEnd.bind(this), 100);
  };

  /**
   * When the scrolling ends, reset the scrollTop
   */


  Tabs.prototype._onScrollEnd = function _onScrollEnd() {

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'scroll'
      });
    }.bind(this), 1);
  };

  /**
   * When the left button is clicked, slide the tabs to the right.
   */


  Tabs.prototype._onLeftClick = function _onLeftClick() {
    this.move({
      x: this.tabListScrollEl.clientWidth,
      force: true
    });
    this.stop({
      type: 'force'
    });
  };

  /**
   * When the right button is clicked, slide the tabs to the left.
   */


  Tabs.prototype._onRightClick = function _onRightClick() {
    this.move({
      x: -this.tabListScrollEl.clientWidth,
      force: true
    });
    this.stop({
      type: 'force'
    });
  };

  /**
   * When focus is gained on a tab.
   * @param {Object} e
   */


  Tabs.prototype._onFocus = function _onFocus(e) {
    var target = e.target || e.srcElement;
    var parent = (0, _getParent2.default)(target, '.spark-tabs__tab', this.tabListEl);
    if (parent) (0, _addClass2.default)(parent, 'focus');
  };

  /**
   * When focus is lost on a tab.
   * @param {Object} e
   */


  Tabs.prototype._onBlur = function _onBlur(e) {
    var target = e.target || e.srcElement;
    var parent = (0, _getParent2.default)(target, '.spark-tabs__tab', this.tabListEl);
    if (parent) (0, _removeClass2.default)(parent, 'focus');
  };

  return Tabs;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Tabs.prototype._whitelistedParams = ['useHash', 'breakpoints'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Tabs.prototype.defaults = {
  el: null,
  tabListEl: null,
  tabListScrollEl: null,
  tabEls: null,
  panelEls: null,
  activeTabEl: null,
  activePanelEl: null,
  navEl: null,
  leftEl: null,
  rightEl: null,
  useHash: false,
  isScrollable: false,
  isDragging: false,
  isAnimatable: false,
  scrollDirection: '',
  scrollDistance: 0,
  lastX: 0,
  lastY: 0,
  minX: 0,
  maxX: 0,
  x: 0,
  _onFocusBound: null,
  _onBlurBound: null,
  _onTabListClickBound: null,
  _onLeftClickBound: null,
  _onRightClickBound: null,
  _onResizeBound: null,
  _onTouchStartBound: null,
  _onTouchMoveBound: null,
  _onTouchEndBound: null,
  _onMouseDownBound: null,
  _onMouseMoveBound: null,
  _onMouseUpBound: null,
  _onScrollBound: null
};

exports.default = Tabs;
module.exports = exports['default'];


},{"../helpers/css/transform":3,"../helpers/dom/add-class":4,"../helpers/dom/breakpoint":5,"../helpers/dom/remove-class":7,"../helpers/dom/toggle-class":8,"../helpers/traversal/get-children":9,"../helpers/traversal/get-index":10,"../helpers/traversal/get-parent":11,"../helpers/traversal/has-parent":12,"./base":1}],3:[function(require,module,exports){
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


},{"../util/each":14}],4:[function(require,module,exports){
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


},{"../util/trim":15,"./has-class":6}],5:[function(require,module,exports){
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


},{}],6:[function(require,module,exports){
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


},{"../util/trim":15}],8:[function(require,module,exports){
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


},{"./add-class":4,"./has-class":6,"./remove-class":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildren(el, query) {

  var list = [];
  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if ((0, _matches2.default)(el.children[i], query)) {
      list.push(el.children[i]);
    }
  }

  return list;
} /**
   * # Get Children
   * See if an element has children which match a query.
   *
   * @param {Element} el
   * @param {String} query
   * @return {List}
   *
   * @module helpers/traversal/get-children.js
   */

exports.default = getChildren;
module.exports = exports['default'];


},{"./matches":13}],10:[function(require,module,exports){
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


},{}],11:[function(require,module,exports){
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


},{"./matches":13}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
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

//# sourceMappingURL=tabs.js.map
