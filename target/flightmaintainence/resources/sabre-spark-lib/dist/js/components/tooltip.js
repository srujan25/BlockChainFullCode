/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Tooltip = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _parseAttribute = require('../helpers/dom/parse-attribute');

var _affix = require('../helpers/position/affix');

var _affix2 = _interopRequireDefault(_affix);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Tooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Show and hide a tooltip.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Tooltip(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Default anchoring of the content's x and y-axis relative to the button.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   anchorX: 'center', // 'left', 'center', 'right'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   anchorY: 'center' // 'top', 'middle', 'bottom'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/popover.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tooltip = function (_BaseComponent) {
  _inherits(Tooltip, _BaseComponent);

  function Tooltip(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tooltip);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Open.
   */


  Tooltip.prototype.open = function open() {

    if (this.affix) return this;

    this.affix = new _affix2.default({
      el: this.contentEl,
      targetEl: this.toggleEl,
      caretEl: this.caretEl,
      anchorX: this.anchorX,
      anchorY: this.anchorY
    });

    (0, _addClass2.default)(this.contentEl, 'active');

    this.isActive = true;
    this.toggleEl.setAttribute('aria-expanded', 'true');

    return this;
  };

  /**
   * Close.
   */


  Tooltip.prototype.close = function close() {

    if (!this.affix) return this;

    (0, _removeClass2.default)(this.contentEl, 'active');
    this.el.appendChild(this.contentEl);

    this.affix.remove({ keepEl: true });
    this.affix = null;

    this.isActive = false;
    this.toggleEl.setAttribute('aria-expanded', 'false');

    return this;
  };

  /**
   * Toggle the open state.
   */


  Tooltip.prototype.toggle = function toggle() {
    return this[this.isActive ? 'close' : 'open']();
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Tooltip.prototype.update = function update(el) {

    if (this.affix) this.affix.update();

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._addEventListeners();

    return this;
  };

  /**
   * Close on remove.
   * @param {Boolean} leaveElement
   */


  Tooltip.prototype.remove = function remove(leaveElement) {
    this.close();
    (0, _removeClass2.default)(this.el, 'tooltip-initialized');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Tooltip.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-tooltip__toggle, [data-role="toggle"]') || this.el;
    this.contentEl = this.contentEl || this.el.querySelector('[class*="spark-tooltip__content--"]') || this._createContentEl();
    this.caretEl = this.el.querySelector('.spark-tooltip__caret') || this._createCaretEl();
    this.isActive = (0, _hasClass2.default)(this.toggleEl, 'tooltip-active');

    (0, _addClass2.default)(this.el, 'tooltip-initialized');
  };

  /**
   * Parse config values from the element.
   */


  Tooltip.prototype._parseParams = function _parseParams() {

    this.anchorY = this.anchorY !== null ? this.anchorY : (0, _parseAttribute.string)(this.el, 'data-anchor-y', null);
    this.anchorX = this.anchorX !== null ? this.anchorX : (0, _parseAttribute.string)(this.el, 'data-anchor-x', null);

    // No anchors defined
    if (!this.anchorY && !this.anchorX) {

      // Left
      if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--left')) {
        this.anchorY = 'middle';
        this.anchorX = 'left';
      }
      // Right
      else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--right')) {
          this.anchorY = 'middle';
          this.anchorX = 'right';
        }
        // Top
        else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--top')) {
            this.anchorY = 'top';
            this.anchorX = 'center';
          }
          // Bottom
          else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--bottom')) {
              this.anchorY = 'bottom';
              this.anchorX = 'center';
            }
    }
  };

  /**
   * Update classes for the open or close state.
   */


  Tooltip.prototype._updateAttributes = function _updateAttributes() {
    (0, _toggleClass2.default)(this.el, 'tooltip-active', this.isActive);
    (0, _toggleClass2.default)(this.contentEl, 'tooltip-active', this.isActive);
    (0, _toggleClass2.default)(this.toggleEl, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Tooltip.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onMouseoverBound = this._onMouseover.bind(this);
    this._onMouseoutBound = this._onMouseout.bind(this);
    this._onWindowMouseoverBound = this._onWindowMouseover.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Tooltip.prototype._addEventListeners = function _addEventListeners() {
    this.toggleEl.addEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.addEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.addEventListener('focus', this._onFocusBound);
    this.toggleEl.addEventListener('blur', this._onBlurBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Tooltip.prototype._removeEventListeners = function _removeEventListeners() {
    this.toggleEl.removeEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.removeEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.removeEventListener('focus', this._onFocusBound);
    this.toggleEl.removeEventListener('blur', this._onBlurBound);
  };

  /**
   * Add window listeners.
   */


  Tooltip.prototype._addWindowEventListeners = function _addWindowEventListeners() {
    window.addEventListener('mouseover', this._onWindowMouseoverBound);
  };

  /**
   * Remove window listeners.
   */


  Tooltip.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('mouseover', this._onWindowMouseoverBound);
  };

  /**
   * Create a content element.
   * @return {Element}
   */


  Tooltip.prototype._createContentEl = function _createContentEl() {
    return (0, _makeElement2.default)('<div class="spark-tooltip__content"></div>');
  };

  /**
   * Create the caret element.
   * @return {Element}
   */


  Tooltip.prototype._createCaretEl = function _createCaretEl() {
    return (0, _makeElement2.default)('<div class="spark-tooltip__caret"></div>');
  };

  /**
   * Open the tooltip on mouseover.
   */


  Tooltip.prototype._onMouseover = function _onMouseover() {
    this._addWindowEventListeners();
    this.open();
  };

  /**
   * Close the tooltip on mouseout.
   */


  Tooltip.prototype._onMouseout = function _onMouseout() {
    this._removeWindowEventListeners();
    this.close();
  };

  /**
   * Open the tooltip on focus.
   */


  Tooltip.prototype._onFocus = function _onFocus() {
    this._addWindowEventListeners();
    this.open();
  };

  /**
   * Close the tooltip on blur.
   */


  Tooltip.prototype._onBlur = function _onBlur() {
    this._removeWindowEventListeners();
    this.close();
  };

  /**
   * Close the tooltip if we mouse over another element.
   * @param {Object} e
   */


  Tooltip.prototype._onWindowMouseover = function _onWindowMouseover(e) {
    if (e.target === this.el || (0, _hasParent2.default)(e.target, this.el)) return;
    this._onMouseout();
  };

  return Tooltip;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Tooltip.prototype._whitelistedParams = ['anchorY', 'anchorX', 'contentEl', 'toggleEl'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Tooltip.prototype.defaults = {
  el: null,
  toggleEl: null,
  contentEl: null,
  caretEl: null,
  isActive: false,
  affix: null,
  anchorY: null,
  anchorX: null,
  _onMouseoverBound: null,
  _onMouseoutBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onWindowMouseoverBound: null
};

exports.default = Tooltip;
module.exports = exports['default'];


},{"../helpers/dom/add-class":3,"../helpers/dom/has-class":4,"../helpers/dom/make-element":5,"../helpers/dom/parse-attribute":7,"../helpers/dom/remove-class":8,"../helpers/dom/toggle-class":9,"../helpers/position/affix":10,"../helpers/traversal/has-parent":12,"./base":1}],3:[function(require,module,exports){
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


},{"../util/trim":15,"./has-class":4}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (html) {

  if (!html) {
    throw new Error('Cannot create element with no HTML!');
  }

  var el = document.createElement('div');
  el.innerHTML = html;
  var el2 = el.children[0];
  el2.parentNode.removeChild(el2);
  return el2;
};

module.exports = exports['default']; /**
                                      * # Make Element
                                      * Make en element using a string of HTML.
                                      *
                                      * @example
                                      * makeElement('<div></div>');
                                      *
                                      * @module helpers/make-element.js
                                      *
                                      * @param {String} html
                                      * @return {Element}
                                      */


},{}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
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


},{"../util/trim":15}],9:[function(require,module,exports){
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


},{"./add-class":3,"./has-class":4,"./remove-class":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _offset2 = require('../dom/offset');

var _offset3 = _interopRequireDefault(_offset2);

var _boxPosition = require('./box-position');

var _boxPosition2 = _interopRequireDefault(_boxPosition);

var _debounce = require('../util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * # Affix
                                                                                                                                                           * Affix one element to another.
                                                                                                                                                           *
                                                                                                                                                           * @example
                                                                                                                                                           * new Affix({
                                                                                                                                                           *   el: el,
                                                                                                                                                           *   targetEl: el2,
                                                                                                                                                           *   caretEl: el3,
                                                                                                                                                           *   anchorY: 'top', // 'middle', 'bottom'
                                                                                                                                                           *   anchorX: 'left', // 'center', 'right'
                                                                                                                                                           * })
                                                                                                                                                           *
                                                                                                                                                           * @module helpers/position/affix.js
                                                                                                                                                           */

var Affix = function () {

  /**
   * Store the reference elements and position.
   * @param  {Object} params
   */
  function Affix() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Affix);

    this.el = params.el;
    this.targetEl = params.targetEl;
    this.caretEl = params.caretEl;
    this.anchorY = params.anchorY || 'top';
    this.anchorX = params.anchorX || 'center';
    this.isFixed = params.isFixed || false;

    this._addEventListeners();
    this._insertEl();
    this._setPosition();
    this._updateDebounced = (0, _debounce2.default)(this.update.bind(this), 500);
  }

  /**
   * Stop listening and clean up event listeners
   * @param {Object} params Optional
   * @return {Object} this
   */


  Affix.prototype.remove = function remove() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!params.keepEl) this._removeEl();
    this._removeEventListeners();
    return this;
  };

  /**
   * Update the position.
   * @return {Object} this
   */


  Affix.prototype.update = function update() {
    this._setPosition();
    return this;
  };

  /**
   * Listen for window resizes to update the position.
   */


  Affix.prototype._addEventListeners = function _addEventListeners() {
    this._onResizeBound = this._onResize.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
  };

  /**
   * Remove event listeners
   */


  Affix.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
  };

  /**
   * Insert the element into the DOM.
   */


  Affix.prototype._insertEl = function _insertEl() {
    this.el.setAttribute('data-affixed', '');
    this._getRootEl().appendChild(this.el);
  };

  /**
   * Remove the element from the DOM.
   */


  Affix.prototype._removeEl = function _removeEl() {
    this.el.parentNode.removeChild(this.el);
    this.el.removeAttribute('data-affixed');
  };

  /**
   * Set the position of the target element.
   */


  Affix.prototype._setPosition = function _setPosition() {

    // Fixed position
    this.el.style.setProperty('position', this.isFixed ? 'fixed' : 'absolute', 'important');

    // Target element properties

    var _offset = (0, _offset3.default)(this.targetEl, this.isFixed),
        targetTop = _offset.top,
        targetLeft = _offset.left;

    var targetWidth = this.targetEl.offsetWidth;
    var targetHeight = this.targetEl.offsetHeight;

    // Element to affix properties
    var elWidth = this.el.offsetWidth;
    var elHeight = this.el.offsetHeight;

    // Maxes
    var docHeight = document.documentElement.offsetHeight;
    var docWidth = document.documentElement.offsetWidth;

    // Get the values

    var _calculatePosition2 = this._calculatePosition({
      anchorX: this.anchorX,
      anchorY: this.anchorY,
      targetTop: targetTop,
      targetLeft: targetLeft,
      elHeight: elHeight,
      elWidth: elWidth,
      targetHeight: targetHeight,
      targetWidth: targetWidth,
      minX: 0,
      minY: 0,
      maxX: docWidth - elWidth,
      maxY: Math.max(docHeight - elHeight, 0)
    }),
        elTop = _calculatePosition2.elTop,
        elLeft = _calculatePosition2.elLeft;

    // Position the caret


    var _positionCaret2 = this._positionCaret({
      elLeft: elLeft,
      elTop: elTop,
      elWidth: elWidth,
      elHeight: elHeight,
      targetHeight: targetHeight,
      targetWidth: targetWidth,
      targetLeft: targetLeft,
      targetTop: targetTop
    }),
        extraLeft = _positionCaret2.extraLeft,
        extraTop = _positionCaret2.extraTop;

    // Set the position


    this.el.style.left = elLeft + extraLeft + 'px';
    this.el.style.top = elTop + extraTop + 'px';
  };

  /**
   * Get the proper top position for an anchor direction.
   * @param  {Object} p
   * @return {Object}
   */


  Affix.prototype._calculatePosition = function _calculatePosition(p) {

    // Keep track of what we're trying to do here, so on subsequent, nested calls to this
    // method we can see what has already been tried.
    p.previousAttempts = (p.previousAttempts || 0) + 1;
    p.previousChecks = p.previousChecks || [];

    var finalCheck = p.previousAttempts > 3;
    var top = void 0;
    var left = void 0;

    // Y-axis check
    switch (p.anchorY) {
      case 'bottom':
        top = p.targetTop + p.targetHeight;
        break;
      case 'middle':
        top = p.targetTop - (p.elHeight - p.targetHeight) / 2;
        break;
      default:
        top = p.targetTop - p.elHeight;
        break;
    }

    // Under min
    if (top < p.minY) {

      if (!finalCheck && p.previousChecks.indexOf('overY') === -1) {
        p.previousChecks.push('underY');
        p.anchorY = this._getNewAnchorY(true, p.anchorY, p.anchorX);
        return this._calculatePosition(p);
      } else {
        top = p.minY;
      }
    }

    // Don't check for being too tall because causing a vertical scroll
    // bar down is okay and this saves us from some real positioning hell.
    /*if (top > p.maxY) {
       if (!finalCheck && p.previousChecks.indexOf('underY') === -1) {
        p.previousChecks.push('overY');
        p.anchorY = this._getNewAnchorY(false, p.anchorY, p.anchorX);
        return this._calculatePosition(p);
      }
      // On a final check, bottom wins because at least we can scroll
      else if (!(finalCheck && p.anchorY === 'bottom')) {
        top = p.maxY;
      }
    }*/

    // X-axis check
    switch (p.anchorX) {
      case 'right':
        left = p.targetLeft + (p.anchorY !== 'middle' && !p.isOverlapping ? 0 : p.targetWidth);
        break;
      case 'center':
        left = p.targetLeft - (p.elWidth - p.targetWidth) / 2;
        break;
      default:
        left = p.targetLeft - p.elWidth + (p.anchorY !== 'middle' ? p.targetWidth : 0);
        break;
    }

    // Under min
    if (left < p.minX) {

      if (!finalCheck && p.previousChecks.indexOf('overX') === -1) {
        p.previousChecks.push('underX');
        p.anchorX = this._getNewAnchorX(true, p.anchorX, p.anchorY);
        return this._calculatePosition(p);
      } else {
        left = p.minX;
      }
    }

    // Over max
    if (left > p.maxX) {

      if (!finalCheck && p.previousChecks.indexOf('underX') === -1) {
        p.previousChecks.push('overX');
        p.anchorX = this._getNewAnchorX(false, p.anchorX, p.anchorY);
        return this._calculatePosition(p);
      } else {
        left = p.maxX;
      }
    }

    // One element is covering another. Try to fix that, but bail out after four tries.
    if ((0, _boxPosition2.default)({ width: p.elWidth, height: p.elHeight, left: left, top: top }, { width: p.targetWidth, height: p.targetHeight, left: p.targetLeft, top: p.targetTop }) === 'overlap') {

      p.isOverlapping = true;

      // Try Y
      if (p.repositionY !== false) {

        // Will start undefined, then true, then false. This limits us to entering
        // this loop twice, once to try moving in each direction.
        p.repositionY = !p.repositionY;

        // First try to put above, then try to put below.
        p.anchorY = this._getNewAnchorY(p.repositionY, 'middle', p.anchorX);

        // Give us one more shot at positioning
        p.previousAttempts--;

        return this._calculatePosition(p);
      }
      // Try X
      else if (p.repositionX !== false) {

          // Will start undefined, then true, then false. This limits us to entering
          // this loop twice, once to try moving in each direction.
          p.repositionX = !p.repositionX;

          // First try to put above, then try to put below.
          p.anchorX = this._getNewAnchorX(p.repositionX, 'center', p.anchorY);

          // Give us one more shot at positioning
          p.previousAttempts--;

          return this._calculatePosition(p);
        }
    }

    return { elTop: top, elLeft: left, anchorX: p.anchorX, anchorY: p.anchorY };
  };

  /**
   * Determine the new y-axis anchor
   * @param  {Boolean} underMin Under the min?
   * @param  {String} anchorY
   * @param  {String} anchorX
   * @return {String}
   */


  Affix.prototype._getNewAnchorY = function _getNewAnchorY(underMin, anchorY, anchorX) {

    // If the x-axis is anchored in the center, skip
    // trying to anchor to the middle because then we'd
    // be overlaying the button.
    if (anchorX === 'center' || anchorY === 'middle') {
      return underMin ? 'bottom' : 'top';
    } else {
      return 'middle';
    }
  };

  /**
   * Determine the new y-axis anchor
   * @param  {Boolean} underMin Under the min?
   * @param  {String} anchorY
   * @param  {String} anchorX
   * @return {String}
   */


  Affix.prototype._getNewAnchorX = function _getNewAnchorX(underMin, anchorX, anchorY) {

    // If the y-axis is anchored in the center, skip
    // trying to anchor to the middle because then we'd
    // be overlaying the button.
    if (anchorY === 'middle' || anchorX === 'center') {
      return underMin ? 'left' : 'right';
    } else {
      return 'center';
    }
  };

  /**
   * Set the position of the caret.
   * @param {Object} p
   * @return {Object}
   */


  Affix.prototype._positionCaret = function _positionCaret() {
    var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    if (!this.caretEl) return;

    var caretPosition = (0, _boxPosition2.default)({ width: p.elWidth, height: p.elHeight, left: p.elLeft, top: p.elTop }, { width: p.targetWidth, height: p.targetHeight, left: p.targetLeft, top: p.targetTop });

    var caretDimensions = this.caretEl.getBoundingClientRect();
    var caretWidth = caretDimensions.width;
    var caretHeight = caretDimensions.height;
    var left = Math.min(p.elWidth, Math.max(0, p.targetLeft - p.elLeft + p.targetWidth / 2));
    var top = Math.min(p.elHeight, Math.max(0, p.targetTop - p.elTop + p.targetHeight / 2));

    this.caretEl.style.left = Math.round(left) + 'px';
    this.caretEl.style.top = Math.round(top) + 'px';

    var extraLeft = 0;
    var extraTop = 0;

    this.caretEl.setAttribute('data-position', caretPosition);

    switch (caretPosition) {
      case 'above':
        extraTop = -caretWidth / 2;
        break;
      case 'below':
        extraTop = caretWidth / 2;
        break;
      case 'left':
        extraLeft = -caretHeight / 2;
        break;
      default:
        extraLeft = caretHeight / 2;
        break;
    }

    return {
      extraLeft: extraLeft,
      extraTop: extraTop
    };
  };

  /**
   * Get the root element. Want to check if there's a top-level form for working
   * with ASP .NET pages.
   */


  Affix.prototype._getRootEl = function _getRootEl() {
    var form = document.querySelector('body > form');
    return form && form.getAttribute('data-affixed') === null ? form : document.body;
  };

  /**
   * On resize, update the position.
   */


  Affix.prototype._onResize = function _onResize() {
    this.update();
  };

  /**
   * When the window scrolls, ensure the proper position of the popover.
   */


  Affix.prototype._onScroll = function _onScroll() {
    this._updateDebounced();
  };

  return Affix;
}();

exports.default = Affix;
module.exports = exports['default'];


},{"../dom/offset":6,"../util/debounce":13,"./box-position":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (a, b) {

  var aXSpan = a.left + a.width;
  var aYSpan = a.top + a.height;
  var bXSpan = b.left + b.width;
  var bYSpan = b.top + b.height;

  if (aXSpan <= b.left) return 'left'; // a is fully left of b
  if (a.left >= bXSpan) return 'right'; // a is fully right of b
  if (aYSpan <= b.top) return 'above'; // a is fully above b
  if (a.top >= bYSpan) return 'below'; // a is fully below b

  return 'overlap'; // boxes overlap
};

module.exports = exports['default']; /**
                                      * # Box Position
                                      * How is one element positioned relative to another?
                                      *
                                      * @example
                                      * boxPosition(
                                      * {width: 100, height: 300, left: 0, top: 0},
                                      * {width: 200, height: 50, left: 100, top: 40}
                                      * )
                                      *
                                      * @module helpers/position/box-position.js
                                      *
                                      * @param {Object} a
                                      * @param {Object} b
                                      * @return {String}
                                      */


},{}],12:[function(require,module,exports){
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

//# sourceMappingURL=tooltip.js.map
