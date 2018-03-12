/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).ProgressIndicator = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _round = require('../helpers/util/round');

var _round2 = _interopRequireDefault(_round);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # ProgressIndicator
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new ProgressIndicator(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. The precision of the progress percentage.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   precision: 10 // 10 decimal places
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/progress-indicator.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var sizes = {
  large: {
    diameter: 264,
    stroke: 12,
    track: 'M132 6c69.588 0 126 56.412 126 126s-56.412 126-126 126S6 201.588 6 132 62.412 6 132 6z',
    fill: '',
    border: 'M132 252c-66.274 0-120-53.726-120-120S65.726 12 132 12s120 53.726 120 120-53.726 120-120 120z'
  },
  small: {
    diameter: 60,
    stroke: 6,
    track: 'M30 3c14.912 0 27 12.088 27 27S44.912 57 30 57 3 44.912 3 30 15.088 3 30 3z',
    fill: '',
    border: 'M30 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24z'
  },
  extraSmall: {
    diameter: 24,
    stroke: 3,
    track: 'M22.5 12c0 5.8-4.7 10.5-10.5 10.5S1.5 17.8 1.5 12 6.2 1.5 12 1.5 22.5 6.2 22.5 12z',
    fill: '',
    border: ''
  }
};

var ProgressIndicator = function (_BaseComponent) {
  _inherits(ProgressIndicator, _BaseComponent);

  /**
   * ProgressIndicator constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function ProgressIndicator(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ProgressIndicator);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Set the value of the indicator.
   * @param {Number} val
   */


  ProgressIndicator.prototype.set = function set(val) {

    if (val === this.value) {
      return this;
    }

    if (val > 1) {
      val = 1;
    }

    this.value = val;

    if (this.isDeterminate && this.progressEl) {
      this.progressEl.setAttribute('value', Math.round(val * 100) / 100);
    }

    this._updateDOM();

    return this;
  };

  /**
   * Store a reference to all the needed elements.
   * @param {Element} el
   */


  ProgressIndicator.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.progressEl = this.el.querySelector('progress');
    this.statusEl = this.el.querySelector('.spark-progress__value-status, [role="status"]');
    this.noteEl = this.el.querySelector('.spark-progress__states');
    this.meterEl = this.el.querySelector('.spark-progress__meter');

    this.isDeterminate = this.progressEl.getAttribute('value') !== null;
    this.size = this._determineSize();

    // If this is a determinate value, replace the meter with the SVG.
    if (this.isDeterminate) {

      var svg = this._buildSVG();
      svg.setAttribute('class', this.meterEl.className);

      this.meterEl.parentNode.replaceChild(svg, this.meterEl);
      this.meterEl = svg;
      this.fillEl = this.meterEl.querySelector('.spark-progress__fill');
    }

    if (this.noteEl) {
      this._parseNotes(this.noteEl);
    }

    if (this.progressEl) {
      this.value = this.progressEl.value;
    }

    this._cacheSize();

    this._updateDOM();
  };

  /**
   * Cache the size of the meter.
   */


  ProgressIndicator.prototype._cacheSize = function _cacheSize() {
    this.meterHeight = this.meterEl.clientHeight;
    this.meterWidth = this.meterEl.clientWidth;
  };

  /**
   * Determine the size of the indicator.
   * @return {String}
   */


  ProgressIndicator.prototype._determineSize = function _determineSize() {

    if (this.el.className.indexOf('progress--sm') !== -1) {
      return 'small';
    } else if (this.el.className.indexOf('progress--xs') !== -1) {
      return 'extraSmall';
    }

    return 'large';
  };

  /**
   * Build the proper SVG element for this size indicator.
   * @return {Element}
   */


  ProgressIndicator.prototype._buildSVG = function _buildSVG() {
    var size = sizes[this.size];
    var template = '<svg viewBox="0 0 ' + size.diameter + ' ' + size.diameter + '" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="' + size.track + '" stroke-width="' + size.stroke + '" class="spark-progress__track"/><path d="' + (size.fill || size.track) + '" stroke-width="' + size.stroke + '" class="spark-progress__fill"/><path d="' + size.border + '" class="spark-progress__border"/></g></g></svg>';
    var div = document.createElement('div');
    div.innerHTML = template;
    return div.children[0];
  };

  /**
   * Take an unordered list of notes and determine the ranges for
   * when to show a given note.
   * @param  {Element} el
   * @return {Array}
   */


  ProgressIndicator.prototype._parseNotes = function _parseNotes(el) {

    this.notes = this.notes || [];

    var len = el.children.length;
    var i = len - 1;

    for (; i >= 0; i--) {
      this.notes.push({
        min: parseInt(el.children[i].getAttribute('data-value'), 10),
        max: el.children[i + 1] ? parseInt(el.children[i + 1].getAttribute('data-value'), 10) - 1 : 100,
        el: el.children[i]
      });
    }
  };

  /**
   * Update the text visible based on the value. Also adjust the SVG.
   */


  ProgressIndicator.prototype._updateDOM = function _updateDOM() {

    if (!this.isDeterminate) {
      return;
    }

    var updateTime = Date.now();
    var val = (0, _round2.default)(this.value * 100, this.precision);

    // Don't animate if we're animating back to 0 or it's been less than 150ms since our last update.
    var noAnimation = val === 0 || this.lastDOMUpdateTime + 150 > updateTime;
    (0, _toggleClass2.default)(this.fillEl, 'no-animation', noAnimation);

    this.statusEl.innerHTML = val + '%';

    var dashArray = (sizes[this.size].diameter - sizes[this.size].stroke) * Math.PI;
    var dashOffset = dashArray - dashArray * (val / 100);

    this.fillEl.setAttribute('style', 'stroke-dasharray: ' + dashArray + '; stroke-dashoffset: ' + dashOffset);

    this.lastDOMUpdateTime = updateTime;

    if (!this.notes) {
      return;
    }

    var i = 0;
    var len = this.notes.length;

    for (; i < len; i++) {
      (0, _toggleClass2.default)(this.notes[i].el, 'active', this.notes[i].min <= val && this.notes[i].max >= val);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  ProgressIndicator.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  ProgressIndicator.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  ProgressIndicator.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
  };

  /**
   * When the window resizes, cache the dimensions.
   * @param {Object} e
   */


  ProgressIndicator.prototype._onResize = function _onResize() {
    this._cacheSize();
  };

  return ProgressIndicator;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


ProgressIndicator.prototype._whitelistedParams = ['precision'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
ProgressIndicator.prototype.defaults = {
  el: null,
  progressEl: null,
  statusEl: null,
  noteEls: null,
  meterEl: null,
  fillEl: null,
  meterHeight: 0,
  meterWidth: 0,
  notes: null,
  isDeterminate: false,
  value: null,
  precision: 0,
  lastDOMUpdateTime: 0,
  _onResizeBound: null
};

exports.default = ProgressIndicator;
module.exports = exports['default'];


},{"../helpers/dom/toggle-class":6,"../helpers/util/round":8,"./base":1}],3:[function(require,module,exports){
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


},{"../util/trim":9,"./has-class":4}],4:[function(require,module,exports){
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


},{"../util/trim":9}],6:[function(require,module,exports){
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


},{"./add-class":3,"./has-class":4,"./remove-class":5}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Round
 * Round to a given number of decimal places.
 *
 * @param {Number} num
 * @param {Number} len
 * @return {Number}
 *
 * @module helpers/util/round.js
 */
function round(num, len) {
  len = len !== undefined ? len : 2;
  var x = Math.pow(10, len);
  return Math.round(num * x) / x;
}

exports.default = round;
module.exports = exports["default"];


},{}],9:[function(require,module,exports){
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

//# sourceMappingURL=progress-indicator.js.map
