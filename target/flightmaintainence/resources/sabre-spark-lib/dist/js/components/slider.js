/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Slider = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

var _offset = require('../helpers/dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Slider
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A slider for number inputs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Slider(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Slide along the x or y-axis?
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   isX: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // onChange callback
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onChange: function(inst, val){},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/slider.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Slider = function (_BaseComponent) {
  _inherits(Slider, _BaseComponent);

  /**
   * Slider constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Slider(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Slider);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Start the slider moving.
   * @param {Number} position The position of the pointer.
   * @param {String} type Optional Which type of events to listen for.
   */


  Slider.prototype.start = function start(position, type) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return this;
    }

    this._addMoveEventListeners(type || 'mouse');
    this._cacheSize();
    this.isActive = true;
    this._updateActiveClasses();
    this._oldVal = this.value;
    this.move(position);

    return this;
  };

  /**
   * Move the value to a given position
   * @param {Number} position
   * @param {Boolean} force Force the move Optional
   */


  Slider.prototype.move = function move(position, force) {

    // Noop if we haven't yet started dragging
    if ((!position || !this.isActive) && !force) {
      return this;
    }

    // Treat positions beyond the boundaries as the boundaries
    if (this.isX) {

      // Too far left
      if (position < this.offsetLeft) {
        position = this.offsetLeft;
      }
      // Too far right
      else if (position > this.offsetLeft + this.width) {
          position = this.offsetLeft + this.width;
        }
    } else {

      // Too far top
      if (position < this.offsetTop) {
        position = this.offsetTop;
      }
      // Too far bottom
      else if (position > this.offsetTop + this.height) {
          position = this.offsetTop + this.height;
        }
    }

    // The percentage of the new position relative to slider-container width or height.
    var percentage = this.isX ? (position - this.offsetLeft) / (this.width - this.handleSize) : (position - this.offsetTop) / this.height;

    // The value of the input as a percentage of the value range.
    return this.setValue(Math.round((percentage - this.handleSizePercentage / 2) * (this.max - this.min)) + this.min);
  };

  /**
   * Stop listening to movements.
   * @param {String} type Optional Which type of events to listen for.
   */


  Slider.prototype.stop = function stop(type) {

    this.isActive = false;

    if (this._oldVal !== this.value) {
      (this.onChange || noop)(this.value, this);
    }

    this._updateActiveClasses();
    this._removeMoveEventListeners(type || 'mouse');

    return this;
  };

  /**
   * Set the value of the handle.
   * @param {Number} value
   */


  Slider.prototype.setValue = function setValue(value) {

    // Move in increments if we have a defined step size
    if (this.step) {
      value = value - value % this.step;
    }

    // Check bounds of the new value
    if (value > this.max) {
      value = this.max;
    } else if (value < this.min) {
      value = this.min;
    }

    // If there is an onWillChange callback, run it. If it returns
    // false, then this new value should be considered invalid.
    if (typeof this.onWillChange === 'function') {
      var change = this.onWillChange(value, this);
      if (typeof change === 'number') {
        value = change;
      }
    }

    // Store value
    this.value = value;

    // Update elements
    this.inputEl.value = this.value;
    this.handleEl.setAttribute('data-value', this._truncateValueText(this.value));
    this.handleEl.setAttribute('aria-valuenow', this._truncateValueText(this.value));
    this.handleEl.setAttribute('aria-valuetext', this._truncateValueText(this.value));

    // Set the percentage
    this.percentage = (this.value - this.min) / (this.max - this.min);

    // Update the position of the handle
    this._updateHandlePosition();

    return this;
  };

  /**
   * Get the value.
   * @return {Number}
   */


  Slider.prototype.getValue = function getValue() {
    return this.value;
  };

  /**
   * Clear the value.
   */


  Slider.prototype.clearValue = function clearValue() {
    return this.setValue(0);
  };

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */


  Slider.prototype.setErrorState = function setErrorState(opt) {
    if (opt) {
      this.el.setAttribute('data-error', '');
    } else {
      this.el.removeAttribute('data-error');
    }
  };

  /**
   * Enable the input.
   */


  Slider.prototype.enable = function enable() {
    this.inputEl.removeAttribute('disabled');
    this.inputEl.removeAttribute('tabindex');
    this.handleEl.removeAttribute('disabled');
    this.handleEl.removeAttribute('tabindex');
    return this;
  };

  /**
   * Disable the input.
   */


  Slider.prototype.disable = function disable() {
    this.inputEl.setAttribute('disabled', '');
    this.inputEl.setAttribute('tabindex', '-1');
    this.handleEl.setAttribute('disabled', '');
    this.handleEl.setAttribute('tabindex', '-1');
    return this;
  };

  /**
   * Increment the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  Slider.prototype.increment = function increment(useMultiplier) {
    return this.setValue(this.value + this.step * (useMultiplier ? 10 : 1));
  };

  /**
   * Decrement the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  Slider.prototype.decrement = function decrement(useMultiplier) {
    return this.setValue(this.value - this.step * (useMultiplier ? 10 : 1));
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Slider.prototype.remove = function remove(leaveElement) {
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Slider.prototype.update = function update(el) {

    this._removeEventListeners();
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');

    this._cacheElements(el);
    this._addEventListeners();
    this._updateHandlePosition();

    return this;
  };

  /**
   * Store a reference to the whole slider, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */


  Slider.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.controlsEl = this.el.querySelector('.spark-slider__controls');
    this.inputEl = this.el.querySelector('input[type="number"]');
    this.handleEl = this.el.querySelector('.spark-slider__handle');
    this.trackEl = this.el.querySelector('.spark-slider__track');
    this.trackFillEl = this.trackEl.querySelector('.spark-slider__track-fill');

    this.messageEl = this.el.querySelector('.spark-slider__message') || (0, _makeElement2.default)('<span class="spark-slider__message"></span>');

    if (!this.inputEl) {
      throw new Error('Tried to create a slider instance without a number input.');
    }

    if (!this.handleEl) {
      throw new Error('Tried to create a slider instance without a handle button.');
    }

    this.min = parseInt(this.inputEl.getAttribute('min'), 10) || this.min;
    this.max = parseInt(this.inputEl.getAttribute('max'), 10) || this.max;
    this.step = parseInt(this.inputEl.getAttribute('step'), 10) || this.step;

    // If we have a default value, set it after we cache the size of the element.
    // We have to do that first so we know the bounds of the slider.
    var value = parseInt(this.inputEl.getAttribute('value'), 10) || parseInt(this.inputEl.getAttribute('min'), 10);
    if (!isNaN(value)) {
      this._cacheSize();
      this.setValue(value);
    }
  };

  /**
   * Save the element dimensions.
   */


  Slider.prototype._cacheSize = function _cacheSize() {

    this.width = this.trackEl.offsetWidth;
    this.height = this.trackEl.offsetHeight;

    this.handleSize = this.isX ? this.handleEl.offsetWidth : this.handleEl.offsetHeight;
    this.handleSizePercentage = this.isX ? this.handleEl.offsetWidth / this.width : this.handleEl.offsetHeight / this.height;

    var offset = (0, _offset2.default)(this.controlsEl);
    this.offsetLeft = offset.left;
    this.offsetTop = offset.top;
  };

  /**
   * Set the position of the handle.
   */


  Slider.prototype._updateHandlePosition = function _updateHandlePosition() {

    // Track and Track-Fill elements
    var trackPercentage = Math.round(Math.min(this.percentage, 1) * 100);
    this.trackEl.setAttribute('data-percentage', trackPercentage);
    this.trackFillEl.setAttribute('style', 'width: ' + trackPercentage + '%;');

    // Handle position
    var handlePos = this.handleSize / 2 + (this.value - this.min) * ((this.width - this.handleSize) / (this.max - this.min));
    var handlePosPercentage = handlePos / this.width * 100;
    this.handleEl.setAttribute('style', 'left: ' + handlePosPercentage + '%;');
  };

  /**
   * Update the active class on the handle.
   */


  Slider.prototype._updateActiveClasses = function _updateActiveClasses() {
    (0, _toggleClass2.default)(this.handleEl, 'active', this.isActive);
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Slider.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onTouchStartBound = this._onTouchStart.bind(this);
    this._onTouchMoveBound = this._onTouchMove.bind(this);
    this._onTouchEndBound = this._onTouchEnd.bind(this);

    this._onClickBound = this._onClick.bind(this);
    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);
    this._onMouseOutBound = this._onMouseOut.bind(this);

    this._onFocusBound = this._onFocus.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onBlurBound = this._onBlur.bind(this);

    this._onChangeBound = this._onChange.bind(this);

    this._onResizeBound = this._onResize.bind(this);

    this._onVisibleChildrenBound = this._onVisibleChildren.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  Slider.prototype._addEventListeners = function _addEventListeners() {

    this.controlsEl.addEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.addEventListener('mousedown', this._onMouseDownBound);

    this.inputEl.addEventListener('change', this._onChangeBound);

    this.handleEl.addEventListener('focus', this._onFocusBound);
    this.handleEl.addEventListener('click', this._onClickBound);

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  Slider.prototype._removeEventListeners = function _removeEventListeners() {

    this.controlsEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.removeEventListener('mousedown', this._onMouseDownBound);

    this.inputEl.removeEventListener('change', this._onChangeBound);

    this.handleEl.removeEventListener('focus', this._onFocusBound);
    this.handleEl.removeEventListener('click', this._onClickBound);

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound);
  };

  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the slider handle. Otherwise it's really hard to
   * use the slider unless it's massive.
   * @param {String} type Which type of listeners to add
   */


  Slider.prototype._addMoveEventListeners = function _addMoveEventListeners(type) {

    // Only listen for events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.addEventListener('mousemove', this._onMouseMoveBound);
        window.addEventListener('mouseout', this._onMouseOutBound);
        window.addEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.addEventListener('touchmove', this._onTouchMoveBound);
        window.addEventListener('touchend', this._onTouchEndBound);
        break;
      case 'keyboard':
        window.addEventListener('keydown', this._onKeydownBound);
        this.handleEl.addEventListener('blur', this._onBlurBound);
        break;
    }
  };

  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to remove
   */


  Slider.prototype._removeMoveEventListeners = function _removeMoveEventListeners(type) {

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
      case 'keyboard':
        window.removeEventListener('keydown', this._onKeydownBound);
        this.handleEl.removeEventListener('blur', this._onBlurBound);
        break;
    }
  };

  /**
   * Truncate value text to fit.
   * @param {String} value
   * @return {String}
   */


  Slider.prototype._truncateValueText = function _truncateValueText(value, precision, characters) {

    if (value.length < 5) {
      return value;
    }

    var isNegative = value < 0 ? true : false;

    value = Math.abs(value);
    precision = precision || this.truncatePrecision;
    characters = characters || this.truncateCharacters;

    var i = characters.length - 1;

    precision = Math.pow(10, precision);

    for (i; i >= 0; i--) {

      var size = Math.pow(10, (i + 1) * 3);

      if (size <= value) {

        value = Math.round(value * precision / size) / precision;

        // @todo: what is this doing? i can't remember how we would ever
        // end up inside this condition.
        if (value === 1000 && i < characters.length - 1) {
          value = 1;
          i++;
        }

        value += characters[i];

        break;
      }
    }

    return (isNegative ? '-' : '') + value;
  };

  /**
   * When the touch starts, start the slider.
   * @param {Object} e
   */


  Slider.prototype._onTouchStart = function _onTouchStart(e) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return;
    }

    e.preventDefault();

    this.start(this.isX ? e.touches[0].pageX : e.touches[0].pageY, 'touch');
  };

  /**
   * When the window fires a touchmove event, adjust our value accordingly
   * @param {Object} e
   */


  Slider.prototype._onTouchMove = function _onTouchMove(e) {

    if (!this.isActive) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.touches[0].pageX : e.touches[0].pageY);
  };

  /**
   * When the window fires a touchend event, stop tracking touches
   * @param {Object} e
   */


  Slider.prototype._onTouchEnd = function _onTouchEnd(e) {

    if (!this.isActive) {
      return;
    }

    e.preventDefault();

    this.stop('touch');
  };

  /**
   * When the mouse presses down, start the slider.
   * @param {Object} e
   */


  Slider.prototype._onMouseDown = function _onMouseDown(e) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return;
    }

    e.preventDefault();

    this.start(this.isX ? e.pageX : e.pageY, 'mouse');
  };

  /**
   * When the window fires a mousemove event, adjust our value accordingly
   * @param {Object} e
   */


  Slider.prototype._onMouseMove = function _onMouseMove(e) {

    if (!this.isActive) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.pageX : e.pageY);
  };

  /**
   * When the window fires a mouseup event, stop tracking
   * @param {Object} e
   */


  Slider.prototype._onMouseUp = function _onMouseUp() {

    if (!this.isActive) {
      return;
    }

    this.stop('mouse');
  };

  /**
   * When the window fires a mouseout event, stop tracking if it was the html element.
   * @param {Object} e
   */


  Slider.prototype._onMouseOut = function _onMouseOut() {}
  // @todo: make this work
  // if (e.relatedTarget === doc.body.parentNode) {
  //   this.stop('mouse');
  // }


  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */
  ;

  Slider.prototype._onVisibleChildren = function _onVisibleChildren(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._onResize();
      }.bind(this), 0);
    }
  };

  /**
   * When the window resizes, cache size values for the slider.
   * @param {Object} e
   */


  Slider.prototype._onResize = function _onResize() {
    this._cacheSize();
    this._updateHandlePosition();
  };

  /**
   * When the element receives focus, start listening for keyboard events
   * @param {Object} e
   */


  Slider.prototype._onFocus = function _onFocus() {
    this.start(null, 'keyboard');
  };

  /**
   * When a key is pressed, see if it's one of the Arrow, Page up, Page down, Home
   * or End keys move the handle accordingly. If the shift key is pressed in combination
   * with the arrow keys, we'll increment and decrement by bigger values.
   * @param {Object} e
   */


  Slider.prototype._onKeydown = function _onKeydown(e) {
    if (e.keyCode === 39 || e.keyCode === 38) {
      // Right or Up arrow
      this.increment(e.shiftKey);
    } else if (e.keyCode === 37 || e.keyCode === 40) {
      // Left or down arrow
      this.decrement(e.shiftKey);
    } else if (e.keyCode === 33) {
      // Page Up
      this.increment(true);
    } else if (e.keyCode === 34) {
      // Page Down
      this.decrement(true);
    } else if (e.keyCode === 35) {
      // End
      this.setValue(this.max);
    } else if (e.keyCode === 36) {
      // Home
      this.setValue(this.min);
    }
  };

  /**
   * When the element loses focus, stop listening for keyboard events
   * @param {Object} e
   */


  Slider.prototype._onBlur = function _onBlur() {
    this.stop('keyboard');
  };

  /**
   * When the input value changes, set our internal value if it's not already our value.
   * @param {Object} e
   */


  Slider.prototype._onChange = function _onChange(e) {
    if (e.target.value !== this.value) {
      this.setValue(e.target.value);
    }
    (this.onChange || noop)(this.value, this);
  };

  /**
   * Prevent click events on the button. This way we don't accidentally submit the form.
   * @param {Object} e
   */


  Slider.prototype._onClick = function _onClick(e) {
    e.preventDefault();
  };

  /**
   * When the window is clicked and the element isn't part of the slider, trigger a blur.
   * @param {Object} e
   */


  Slider.prototype._onWindowClick = function _onWindowClick(e) {

    if ((0, _hasParent2.default)(e.target, this.el)) {
      this._onBlur();
    }
  };

  return Slider;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Slider.prototype._whitelistedParams = ['isX', 'validate', 'onValidate', 'onChange', 'onWillChange'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Slider.prototype.defaults = {
  el: null,
  messageEl: null,
  controlsEl: null,
  inputEl: null,
  handleEl: null,
  trackEl: null,
  trackFillEl: null,
  isActive: false,
  isX: true,
  onValidate: null,
  onChange: null,
  onWillChange: null,
  position: 0,
  width: 0,
  height: 0,
  min: 0,
  max: 0,
  step: 1,
  value: 0,
  percentage: 0,
  offsetLeft: 0,
  offsetTop: 0,
  handleSizePercentage: 0,
  truncatePrecision: 0,
  truncateCharacters: ['k', 'm', 'b', 't'],
  _oldVal: null,
  _onTouchStartBound: null,
  _onTouchMoveBound: null,
  _onTouchEndBound: null,
  _onMouseDownBound: null,
  _onMouseMoveBound: null,
  _onMouseUpBound: null,
  _onMouseOutBound: null,
  _onFocusBound: null,
  _onKeydownBound: null,
  _onBlurBound: null,
  _onChangeBound: null,
  _onResizeBound: null,
  _onClickBound: null,
  _onVisibleChildrenBound: null
};

(0, _mixin2.default)(Slider.prototype, _messaging2.default, _validation2.default);

exports.default = Slider;
module.exports = exports['default'];


},{"../helpers/dom/make-element":6,"../helpers/dom/offset":7,"../helpers/dom/toggle-class":10,"../helpers/traversal/has-parent":11,"../helpers/util/mixin":13,"../mixins/messaging":15,"../mixins/validation":16,"./base":1}],3:[function(require,module,exports){
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


},{"../dom/add-class":4,"../dom/has-class":5,"../dom/outer-height":8,"../dom/remove-class":9,"../dom/toggle-class":10}],4:[function(require,module,exports){
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


},{"../util/trim":14,"./has-class":5}],5:[function(require,module,exports){
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


},{}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
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


},{"../util/each":12}],9:[function(require,module,exports){
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


},{"../util/trim":14}],10:[function(require,module,exports){
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


},{"./add-class":4,"./has-class":5,"./remove-class":9}],11:[function(require,module,exports){
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

exports.default = function (proto) {
  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }

  (0, _each2.default)(mixins, function (mixin) {
    for (var i in mixin) {
      if (mixin.hasOwnProperty(i) && !proto[i]) proto[i] = mixin[i];
    }
  });
};

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Mixin
 * Apply a mixin, or mixins, to an Object
 *
 * @example
 * mixin(proto, mix, mix2)
 *
 * @module helpers/util/mixin.js
 */
module.exports = exports['default'];


},{"./each":12}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  /**
   * Set the error state.
   * @param {String} message Optional
   */
  setError: function setError(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearWarning();
    this.clearSuccess();

    this.el.setAttribute('data-error', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the error state.
   */
  clearError: function clearError() {
    this.el.removeAttribute('data-error', true);
    return this;
  },


  /**
   * Set the warning state.
   * @param {String} message Optional
   */
  setWarning: function setWarning(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearError();
    this.clearSuccess();

    this.el.setAttribute('data-warning', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the error state.
   */
  clearWarning: function clearWarning() {
    this.el.removeAttribute('data-warning', true);
    return this;
  },


  /**
   * Set the success state.
   * @param {String} message Optional
   */
  setSuccess: function setSuccess(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearError();
    this.clearWarning();

    this.el.setAttribute('data-success', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the success state.
   */
  clearSuccess: function clearSuccess() {
    this.el.removeAttribute('data-success', true);
    return this;
  },


  /**
   * Clear all messages.
   */
  clearMessages: function clearMessages() {
    this._hideMessage(function () {
      this.clearError();
      this.clearWarning();
      this.clearSuccess();
    }.bind(this));
    return this;
  },


  /**
   * Set the message text.
   * @param {String} message
   */
  setMessage: function setMessage(message) {
    this.messageEl.innerHTML = message;
    return this;
  },


  /**
   * Show the message
   */
  _showMessage: function _showMessage() {

    if (!this.messageEl.parentNode) {
      this.el.appendChild(this.messageEl);
    }

    (0, _height2.default)({
      el: this.el,
      toggleEl: this.messageEl
    });
  },


  /**
   * Hide the message.
   * @param {Function} callback
   */
  _hideMessage: function _hideMessage(callback) {

    (0, _height2.default)({
      el: this.el,
      toggleEl: this.messageEl,
      toggleValue: 'none',
      action: 'collapse',
      onComplete: callback
    });
  },


  /**
   * Is the message currently visible?
   * @return {Boolean}
   */
  _isMessageVisible: function _isMessageVisible() {
    return this.el.getAttribute('data-error') || this.el.getAttribute('data-warning') || this.el.getAttribute('data-success');
  }
}; /**
    * # Messaging Mixin
    * Add functionality for showing messages related to a form field.
    *
    * @example
    * mixin(Component, messaging);
    *
    * @module mixin/messaging.js
    */

module.exports = exports['default'];


},{"../helpers/animation/height":3}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Validation Mixin
 * Add functionality for validating a form field's value.
 *
 * @example
 * mixin(Component, validation);
 *
 * @module mixin/validation.js
 */

exports.default = {

  /**
   * Default validate function. This can be overridden by passing a
   * custom validate method as a parameter. This really only helps out
   * of the box for text inputs.
   */
  validate: function validate() {

    var validate = this.validatePattern;

    // Nothing to validate.
    if (!this.onValidate || !validate) {
      return this;
    }

    var re = new RegExp(validate);

    this.onValidate(re.test(this.getValue()), this.getValue(), this);

    return this;
  }
};
module.exports = exports["default"];


},{}]},{},[2])(2)
});

//# sourceMappingURL=slider.js.map
