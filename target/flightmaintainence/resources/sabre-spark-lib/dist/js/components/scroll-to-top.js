/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).ScrollToTop = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _scrollTo = require('../helpers/animation/scroll-to');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _offset = require('../helpers/dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Scroll To Top
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Provide a way to scroll back to the top of a component.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new ScrollToTop(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/scroll-to-top.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};
var canObserve = typeof MutationObserver !== 'undefined' ? true : false;

var ScrollToTop = function (_BaseComponent) {
  _inherits(ScrollToTop, _BaseComponent);

  /**
   * ScrollToTop constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function ScrollToTop(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ScrollToTop);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._cacheSizes();

    _this._clearRecomputeDebounced = (0, _debounce2.default)(_this._clearRecompute.bind(_this), 50);
    _this._recomputeDebounced = (0, _debounce2.default)(_this._recompute.bind(_this), 50);

    _this._checkScrollPosition();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Scroll to the top of the containing element.
   * @param {Function} callback
   */


  ScrollToTop.prototype.scrollToTop = function scrollToTop(callback) {
    (0, _scrollTo2.default)(this.scrollToEl || 0, {
      callback: callback || noop
    });
    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  ScrollToTop.prototype.update = function update(el) {

    this._removeEventListeners();
    this._cacheElements(el);
    this._addEventListeners();
    this._cacheSizes();
    this._checkScrollPosition();

    return this;
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  ScrollToTop.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.containerEl = this.containerEl || el.parentNode;
  };

  /**
   * Cache element sizes.
   */


  ScrollToTop.prototype._cacheSizes = function _cacheSizes() {

    var containerOffset = (0, _offset2.default)(this.containerEl);
    var windowWidth = document.body.clientWidth;
    var windowHeight = window.innerHeight;
    var containerOffsetTop = containerOffset.top;
    var containerOffsetLeft = containerOffset.left;
    var containerOffsetRight = windowWidth - containerOffsetLeft - this.containerEl.offsetWidth;

    this._windowHeight = windowHeight;
    this._containerBottom = this.containerEl.offsetHeight + containerOffsetTop;
    this._visibleThreshold = containerOffsetTop + windowHeight * 1.5;

    // Reset button styles
    var isAtBottom = this._isAtBottom;
    this._isAtBottom = false;
    this._right = 0;
    this._updateBindings();

    // Default right position of the element plus the right edge of the container
    this._right = windowWidth - this.el.offsetLeft - this.el.offsetWidth + containerOffsetRight;
    this._isAtBottom = isAtBottom;
    this._updateBindings();
  };

  /**
   * Check the scroll position. If we're far enough from the top,
   * make visible. If the bottom of our container element is past the bottom
   * of the screen, make us fixed.
   */


  ScrollToTop.prototype._checkScrollPosition = function _checkScrollPosition() {

    var isVisible = this._isVisible;
    var isAtBottom = this._isAtBottom;
    var scrollTop = typeof window.scrollY !== 'undefined' ? window.scrollY : window.pageYOffset;
    var bottomThreshold = scrollTop + this._windowHeight;

    this._isVisible = scrollTop + this._windowHeight >= this._visibleThreshold ? true : false;
    this._isAtBottom = this._containerBottom <= bottomThreshold ? true : false;

    if (this._isAtBottom !== isAtBottom || this._isVisible !== isVisible) {
      this._updateBindings();
    }
  };

  /**
   * Update bindings.
   */


  ScrollToTop.prototype._updateBindings = function _updateBindings() {
    (0, _toggleClass2.default)(this.el, 'visible', this._isVisible);
    (0, _toggleClass2.default)(this.el, 'at-bottom', this._isAtBottom);
    this.el.style.right = this._isAtBottom || !this._right ? '' : this._right + 'px';
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  ScrollToTop.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    this._onResizeBound = this._onResize.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._onMutateBound = this._onMutate.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  ScrollToTop.prototype._addEventListeners = function _addEventListeners() {

    this.el.addEventListener('click', this._onClickBound);
    window.addEventListener('scroll', this._onScrollBound);
    window.addEventListener('orientationchange', this._onScrollBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve) this._addMutationObserver();else window.addEventListener('resize', this._onResizeBound, false);
  };

  /**
   * Remove event listeners for DOM events..
   */


  ScrollToTop.prototype._removeEventListeners = function _removeEventListeners() {

    this.el.removeEventListener('click', this._onClickBound);
    window.removeEventListener('scroll', this._onScrollBound);
    window.removeEventListener('orientationchange', this._onScrollBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve) this._removeMutationObserver();else window.removeEventListener('resize', this._onResizeBound);
  };

  /**
   * Setup a mutation observer to know when the DOM has changed so we can recache.
   */


  ScrollToTop.prototype._addMutationObserver = function _addMutationObserver() {
    this._observer = new MutationObserver(this._onMutateBound);
    this._observer.observe(this.containerEl, { childList: true, attributes: true, characterData: true, subtree: true });
  };

  /**
   * Remove a mutation observer.
   */


  ScrollToTop.prototype._removeMutationObserver = function _removeMutationObserver() {
    if (this._observer) this._observer.disconnect();
  };

  /**
   * Recompute the position.
   */


  ScrollToTop.prototype._recompute = function _recompute() {
    this._cacheSizes();
    this._checkScrollPosition();
  };

  /**
   * Recompute styles, but only so often.
   */


  ScrollToTop.prototype._recomputeThrottled = function _recomputeThrottled() {

    if (!this._recomputeRun) {
      this._recompute();
      this._recomputeRun = true;
    }

    this._clearRecomputeDebounced();
  };

  /**
   * Clear the recompute run state.
   */


  ScrollToTop.prototype._clearRecompute = function _clearRecompute() {
    this._recomputeRun = false;
  };

  /**
   * When the window is scrolled, compute the position of the scroll-to-top.
   * @param {Object} e
   */


  ScrollToTop.prototype._onScroll = function _onScroll() {
    this._recomputeThrottled();
    this._checkScrollPosition();
  };

  /**
   * When the window is resized, re-cache element sizes.
   * @param {Object} e
   */


  ScrollToTop.prototype._onResize = function _onResize() {
    this._recomputeDebounced();
  };

  /**
   * When the button is clicked, scroll to the top.
   * @param {Object} e
   */


  ScrollToTop.prototype._onClick = function _onClick() {
    this.scrollToTop();
  };

  /**
   * When a parent container shows its children and our element
   * is inside of it, resize
   * @param  {Object} e
   */


  ScrollToTop.prototype._onVisible = function _onVisible(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._cacheSizes();
        this._checkScrollPosition();
      }.bind(this), 0);
    }
  };

  /**
   * When the DOM changes, recache our values because we might be in the wrong spot.
   */


  ScrollToTop.prototype._onMutate = function _onMutate(mutations) {
    (0, _each2.default)(mutations, function (m) {
      if (m.target !== this.el) this._recomputeDebounced();
    }.bind(this));
  };

  return ScrollToTop;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


ScrollToTop.prototype._whitelistedParams = ['containerEl', 'scrollToEl'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
ScrollToTop.prototype.defaults = {
  el: null,
  containerEl: null,
  scrollToEl: null,
  _isVisible: false,
  _isAtBottom: false,
  _containerBottom: 0,
  _visibleThreshold: 0,
  _windowHeight: 0,
  _right: 0,
  _recomputeRun: false,
  _observer: null,
  _onClickBound: null,
  _onScrollBound: null,
  _onVisibleBound: null,
  _onResizeBound: null,
  _onMutateBound: null
};

exports.default = ScrollToTop;
module.exports = exports['default'];


},{"../helpers/animation/scroll-to":4,"../helpers/dom/offset":8,"../helpers/dom/toggle-class":10,"../helpers/util/debounce":11,"../helpers/util/each":12,"./base":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Request Animation
 * Request animation frame polyfill.
 * @module helpers/animation/request.js
 */
var request = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function () {

  var fps = 60;
  var del = 1000 / fps;
  var start = Date.now();
  var prev = start;

  return function requestAnimationFrame(callback) {

    var requestTime = Date.now();
    var timeout = Math.max(0, del - (requestTime - prev));
    var timeToCall = requestTime + timeout;

    prev = timeToCall;

    return window.setTimeout(function onAnimationFrame() {
      callback(timeToCall - start);
    }, timeout);
  };
}();

exports.default = request;
module.exports = exports["default"];


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _offset = require('../dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Scroll To
 * Scroll the window to a specific element or position.
 * @param {Object} params
 *
 * @module helpers/animation/scroll-to.js
 */

function scrollTo(params) {

  params = params || {};

  var offset = void 0;
  var x = void 0;
  var y = void 0;
  var target = params.target || window;
  var startX = target !== window ? target.scrollLeft : target.pageXOffset;
  var startY = target !== window ? target.scrollTop : target.pageYOffset;

  if (params instanceof HTMLElement) {
    offset = (0, _offset2.default)(params);
    x = offset.left;
    y = offset.top;
    params = arguments[1] || {};
  } else {
    x = params.x || 0;
    y = params.y || 0;
  }

  (0, _tween2.default)({
    target: target,
    prop: 'scrollTo',
    start: [startX, startY],
    end: [x, y],
    duration: params.duration,
    callback: params.callback
  });
}

exports.default = scrollTo;
module.exports = exports['default'];


},{"../dom/offset":8,"./tween":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

/**
 * Tween from one value to another.
 * @param {Object} params
 * @return {Long}
 */
/**
 * # Tween
 * Tween between two values.
 * @module helpers/animation/tween.js
 */

function tween(params) {

  params = params || {};

  var begin;
  var obj = params.target;

  if (!obj) {
    throw new Error('Cannot tween without a target!');
  }

  var prop = typeof params.prop === 'string' ? [params.prop] : params.prop;
  var start = typeof params.start === 'number' ? [params.start] : params.start;
  var end = typeof params.end === 'number' ? [params.end] : params.end;
  var duration = params.duration || 250;
  var callback = params.callback || noop;

  // Ensure we have the same number of start and end properties.
  if (start.length !== end.length) {
    throw new Error('Cannot tween two different sets of parameters!');
  }

  var f = function f(ts) {

    // Keep track of when we start
    if (!begin) begin = ts;

    // Progress
    var prog = ts - begin;

    // Percentage complete
    var per = Math.min(prog / duration, 1);

    // Adjust the values for the percentage complete.
    var args = [];
    var i = 0;
    var len = start.length;
    for (; i < len; i++) {
      args[i] = start[i] + (end[i] - start[i]) * per;
    }

    // Apply the values for each property.
    i = 0;
    len = prop.length;
    var arg;
    for (; i < len; i++) {

      // If this is the last property but we have more arguments, set them all.
      arg = i + 1 === len && args.length - 1 > i ? args.slice(i) : args[i];

      if (typeof obj[prop[i]] === 'function') {
        obj[prop[i]].apply(obj, arg);
      } else {
        obj[prop[i]] = arg;
      }
    }

    // Keep going if we have more to do.
    if (prog < duration) (0, _request2.default)(f);else callback();
  };

  return (0, _request2.default)(f);
}

exports.default = tween;
module.exports = exports['default'];


},{"./request":3}],6:[function(require,module,exports){
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


},{"../util/trim":13,"./has-class":7}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Offset Position
 * Get the offset position of the element.
 *
 * @param {Element} el
 * @param {Boolean} viewPortOffset The offset relative to the viewport, not page.
 * @return {Object}
 *
 * @module helpers/dom/offset.js
 */
function offset(el, viewPortOffset) {

  var rect = {
    top: 0,
    left: 0
  };

  // Native implementation
  if (el.getBoundingClientRect) {

    var bounding = el.getBoundingClientRect();
    rect.left = bounding.left;
    rect.top = bounding.top;

    if (!viewPortOffset) {
      rect.left += typeof window.scrollX !== 'undefined' ? window.scrollX : window.pageXOffset;
      rect.top += typeof window.scrollY !== 'undefined' ? window.scrollY : window.pageYOffset;
    }
  } else {
    var x = 0,
        y = 0;
    do {
      x += el.offsetLeft - (!viewPortOffset ? el.scrollLeft : 0);
      y += el.offsetTop - (!viewPortOffset ? el.scrollTop : 0);
    } while (el = el.offsetParent);

    rect.left = x;
    rect.top = y;
  }

  return rect;
}

exports.default = offset;
module.exports = exports['default'];


},{}],9:[function(require,module,exports){
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


},{"../util/trim":13}],10:[function(require,module,exports){
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


},{"./add-class":6,"./has-class":7,"./remove-class":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Debounce
 * Debounce a function call
 *
 * @param {Function} func
 * @param {Integer} delay
 *
 * @module helpers/util/debounce.js
 */
function debounce(func, delay) {

  var timer = void 0;

  return function () {
    var args = arguments;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      func.apply(this, args);
    }, delay);
  };
}

exports.default = debounce;
module.exports = exports["default"];


},{}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){
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

//# sourceMappingURL=scroll-to-top.js.map
