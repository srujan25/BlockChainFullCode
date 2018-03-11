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

var _getIndex = require('../helpers/traversal/get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # RangeSlider
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A dual slider for number inputs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @todo : probably a lot of refactoring that could happen between this and slider.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new RangeSlider(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Slide along the x or y-axis?
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   isX: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onChange: function(inst, index, value){},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/range-slider.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var RangeSlider = function (_BaseComponent) {
  _inherits(RangeSlider, _BaseComponent);

  /**
   * RangeSlider constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function RangeSlider(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RangeSlider);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._updateDisabledClasses();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Start the slider moving.
   * @param {Number} index The index of the handle or input element.
   * @param {Number} position The position of the pointer.
   * @param {String} type Optional Which type of events to listen for.
   */


  RangeSlider.prototype.start = function start(index, position, type) {

    // Noop if we're disabled or an invalid index was passed
    if (index < 0 || this.inputEls[index].getAttribute('disabled') !== null) {
      return this;
    }

    this._addMoveEventListeners(type || 'mouse');
    this._cacheSize();

    this.isActive = this.isActive || [];
    this.isActive[index] = true;

    this.currentIndex = index;
    this._updateActiveClasses(index);
    this._updateDisabledClasses();
    this._oldVal = this.values[index];
    this.move(position);

    return this;
  };

  /**
   * Move the value to a given position
   * @param {Number} position
   * @param {Boolean} force Force the move Optional
   */


  RangeSlider.prototype.move = function move(position, force) {

    // Noop if an invalid index was passed we haven't yet started dragging
    if ((!position || !this.isActive || !this.isActive[this.currentIndex]) && !force) {
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
    this.setValue(this.currentIndex, Math.round((percentage - this.handleSizePercentage / 2) * (this.highestMax - this.lowestMin)) + this.lowestMin);

    return this;
  };

  /**
   * Stop listening to movements.
   * @param {Number} index Optional The index of the handle or input element.
   * @param {String} type Optional Which type of events to listen for.
   */


  RangeSlider.prototype.stop = function stop(index, type) {

    if (index !== null && index !== undefined && this.currentIndex !== index) {
      return this;
    }

    this.isActive[this.currentIndex] = false;
    this.lastIndex = this.currentIndex;

    if (this._oldVal !== this.values[this.currentIndex]) {
      (this.onChange || noop)(this.currentIndex, this.values[this.currentIndex], this);
    }

    this.currentIndex = null;
    this._updateActiveClasses(index);
    this._removeMoveEventListeners(type || 'mouse');

    return this;
  };

  /**
   * Set the value of the handle.
   * @param {Number} index The index of the input element.
   * @param {Number} value
   */


  RangeSlider.prototype.setValue = function setValue(index, value) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index]) {
      throw new Error('Cannot set value on a slider input element with an index of ' + index + '. That element does not exist.');
    }

    // Move in increments if we have a defined step size
    if (this.steps[index]) {
      value = value - value % this.steps[index];
    }

    this.values = this.values || [];

    // Check bounds of the new value
    if (value > this.maxes[index]) {
      value = this.maxes[index];
    } else if (value < this.mins[index]) {
      value = this.mins[index];
    }

    // If there is an input that comes after this, make sure we aren't going beyond it
    if (this.values[index + 1] !== undefined && value >= this.values[index + 1]) {
      value = this.values[index + 1] - (this.steps[index] || 1);
    }
    // If there is an input that comes before this, make sure we aren't going below it
    else if (this.values[index - 1] !== undefined && value <= this.values[index - 1]) {
        value = this.values[index - 1] + (this.steps[index] || 1);
      }

    // If there is an onWillChange callback, run it. If it returns
    // false, then this new value should be considered invalid.
    if (typeof this.onWillChange === 'function') {
      var change = this.onWillChange(index, value, this);
      if (typeof change === 'number') {
        value = change;
      }
    }

    // Store value
    this.values[index] = value;

    // Update elements
    this.inputEls[index].value = this.values[index];
    this.handleEls[index].setAttribute('data-value', this.values[index]);
    this.handleEls[index].setAttribute('aria-valuenow', this.values[index]);
    this.handleEls[index].setAttribute('aria-valuetext', this.values[index]);

    // Set the percentage
    this.percentages = this.percentages || [];
    this.percentages[index] = (this.values[index] - this.lowestMin) / (this.highestMax - this.lowestMin);

    // Update the position of the handle
    this._updateHandlePosition(index);

    return this;
  };

  /**
   * Get the value.
   * @param {Number} index
   * @return {Number}
   */


  RangeSlider.prototype.getValue = function getValue(index) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index]) {
      throw new Error('Cannot get value from a slider input element with an index of ' + index + '. That element does not exist.');
    }

    return this.values[index];
  };

  /**
   * Clear the value.
   * @param {Number} index
   */


  RangeSlider.prototype.clearValue = function clearValue(index) {
    return this.setValue(index, 0);
  };

  /**
   * Enable the input.
   * @param {Number} index
   */


  RangeSlider.prototype.enable = function enable(index) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index] || !this.handleEls[index]) {
      throw new Error('Cannot get value from a slider input element with an index of ' + index + '. That element does not exist.');
    }

    this.inputEls[index].removeAttribute('disabled');
    this.inputEls[index].removeAttribute('tabindex');
    this.handleEls[index].removeAttribute('disabled');
    this.handleEls[index].removeAttribute('tabindex');
    this._updateDisabledClasses();

    return this;
  };

  /**
   * Disable the input.
   * @param {Number} index
   */


  RangeSlider.prototype.disable = function disable(index) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index] || !this.handleEls[index]) {
      throw new Error('Cannot get value from a slider input element with an index of ' + index + '. That element does not exist.');
    }

    this.inputEls[index].setAttribute('disabled', '');
    this.inputEls[index].setAttribute('tabindex', '-1');
    this.handleEls[index].setAttribute('disabled', '');
    this.handleEls[index].setAttribute('tabindex', '-1');
    this._updateDisabledClasses();

    return this;
  };

  /**
   * Increment the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  RangeSlider.prototype.increment = function increment(useMultiplier) {
    return this.setValue(this.currentIndex, this.values[this.currentIndex] + this.steps[this.currentIndex] * (useMultiplier ? 10 : 1));
  };

  /**
   * Decrement the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  RangeSlider.prototype.decrement = function decrement(useMultiplier) {
    return this.setValue(this.currentIndex, this.values[this.currentIndex] - this.steps[this.currentIndex] * (useMultiplier ? 10 : 1));
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  RangeSlider.prototype.remove = function remove(leaveElement) {
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


  RangeSlider.prototype.update = function update(el) {

    this._removeEventListeners();
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');

    this._cacheElements(el);
    this._addEventListeners();
    this._updateDisabledClasses();

    for (var i = 0; i < this.handleEls.length; i++) {
      this._updateHandlePosition(i);
    }

    return this;
  };

  /**
   * Store a reference to the whole slider, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */


  RangeSlider.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.controlsEl = this.el.querySelector('.spark-slider__controls');
    this.inputEls = this.el.querySelectorAll('input[type="number"]');
    this.handleEls = this.el.querySelectorAll('.spark-slider__handle');
    this.trackEl = this.el.querySelector('.spark-slider__track');
    this.trackFillEl = this.trackEl.querySelector('.spark-slider__track-fill');

    this.messageEl = this.el.querySelector('.spark-slider__message') || (0, _makeElement2.default)('<span class="spark-slider__message"></span>');

    if (!this.inputEls || this.inputEls.length <= 1) {
      throw new Error('Tried to create a slider instance without two number inputs.');
    }

    if (!this.handleEls || this.handleEls.length <= 1) {
      throw new Error('Tried to create a slider instance without two handle buttons.');
    }

    var lowestMin = Infinity;
    var highestMax = -Infinity;
    var i = 0;
    var len = this.inputEls.length;
    var values = [];
    this.mins = [];
    this.maxes = [];
    this.steps = [];

    // Cache the size of the element so that we can properly set values on handles.
    this._cacheSize();

    // Set the minimum and max values for each element. Also set any predefined value.
    for (; i < len; i++) {
      var parsedMin = parseInt(this.inputEls[i].getAttribute('min'), 10);
      this.mins[i] = parsedMin === 0 ? parsedMin : parsedMin || null; // Ternary operator to prevent null when we have actual 0 value

      var parsedMax = parseInt(this.inputEls[i].getAttribute('max'), 10);
      this.maxes[i] = parsedMax === 0 ? parsedMax : parsedMax || null; // Ternary operator to prevent null when we have actual 0 value

      this.steps[i] = parseInt(this.inputEls[i].getAttribute('step'), 10) || 1;

      if (this.mins[i] < lowestMin) {
        lowestMin = this.mins[i];
      }

      if (this.maxes[i] > highestMax) {
        highestMax = this.maxes[i];
      }
    }

    this.lowestMin = lowestMin;
    this.highestMax = highestMax;

    i = 0;

    // If we have a default value, set it.
    for (; i < len; i++) {

      values[i] = parseInt(this.inputEls[i].getAttribute('value'), 10);

      // It's a number
      if (!isNaN(values[i])) {
        this.setValue(i, values[i]);
      } else {

        // Set as the minimum unless this is the last handle.
        if (i + 1 === len) {
          this.setValue(i, this.maxes[i] !== null ? this.maxes[i] : 0);
        } else {
          this.setValue(i, this.mins[i] !== null ? this.mins[i] : 0);
        }
      }
    }
  };

  /**
   * Save the element dimensions.
   */


  RangeSlider.prototype._cacheSize = function _cacheSize() {
    this.width = this.trackEl.offsetWidth;
    this.height = this.trackEl.offsetHeight;

    this.handleSize = this.isX ? this.handleEls[0].offsetWidth : this.handleEls[0].offsetHeight;
    this.handleSizePercentage = this.isX ? this.handleEls[0].offsetWidth / this.width : this.handleEls[0].offsetHeight / this.height;

    var offset = (0, _offset2.default)(this.controlsEl);
    this.offsetLeft = offset.left;
    this.offsetTop = offset.top;
  };

  /**
   * Set the position of the handle.
   * @param {Number} index The index of the handle element to update.
   */


  RangeSlider.prototype._updateHandlePosition = function _updateHandlePosition(index) {
    // Track and Track-Fill elements
    var firstPercentage = this.percentages[0];
    var lastPercentage = this.percentages[this.percentages.length - 1];
    this.trackFillEl.setAttribute('style', 'width: ' + (lastPercentage - firstPercentage) * 100 + '%; left: ' + firstPercentage * 100 + '%;');

    // Handle position
    var handlePos = this.handleSize / 2 + (this.values[index] - this.lowestMin) * ((this.width - this.handleSize) / (this.highestMax - this.lowestMin));
    var handlePosPercentage = handlePos / this.width * 100;
    this.handleEls[index].setAttribute('style', 'left: ' + handlePosPercentage + '%;');
  };

  /**
   * Update the active class on the handle.
   * @param {Number} index The index of the handle element to update.
   */


  RangeSlider.prototype._updateActiveClasses = function _updateActiveClasses(index) {

    (0, _toggleClass2.default)(this.handleEls, 'active', false);
    (0, _toggleClass2.default)(this.handleEls[index], 'active', this.isActive[index]);

    if (this.isActive.indexOf(true) !== -1) {
      this.el.setAttribute('data-active-index', this.isActive.indexOf(true));
    } else {
      this.el.removeAttribute('data-active-index');
    }
  };

  /**
   * Update which handles are disabled.
   */


  RangeSlider.prototype._updateDisabledClasses = function _updateDisabledClasses() {

    var disabledCount = 0;

    for (var i = 0, len = this.inputEls.length; i < len; i++) {

      if (this.inputEls[i].getAttribute('disabled') !== null) {
        (0, _toggleClass2.default)(this.handleEls[i], 'disabled', true);
        disabledCount++;
      } else {
        (0, _toggleClass2.default)(this.handleEls[i], 'disabled', false);
      }
    }

    (0, _toggleClass2.default)(this.el, 'all-disabled', disabledCount === this.handleEls.length);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  RangeSlider.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onTouchStartBound = this._onTouchStart.bind(this);
    this._onTouchMoveBound = this._onTouchMove.bind(this);
    this._onTouchEndBound = this._onTouchEnd.bind(this);

    this._onClickBound = this._onClick.bind(this);
    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);

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


  RangeSlider.prototype._addEventListeners = function _addEventListeners() {

    this.controlsEl.addEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.addEventListener('mousedown', this._onMouseDownBound);

    for (var i = 0, len = this.inputEls.length; i < len; i++) {
      this.inputEls[i].addEventListener('change', this._onChangeBound);
    }

    for (var j = 0, len2 = this.handleEls.length; j < len2; j++) {
      this.handleEls[j].addEventListener('focus', this._onFocusBound);
      this.handleEls[j].addEventListener('click', this._onClickBound);
    }

    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  RangeSlider.prototype._removeEventListeners = function _removeEventListeners() {

    this.controlsEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.removeEventListener('mousedown', this._onMouseDownBound);

    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound);

    for (var i = 0, len = this.inputEls.length; i < len; i++) {
      this.inputEls[i].removeEventListener('change', this._onChangeBound);
    }

    for (var j = 0, len2 = this.handleEls.length; i < len2; i++) {
      this.handleEls[j].removeEventListener('focus', this._onFocusBound);
      this.handleEls[j].removeEventListener('click', this._onClickBound);
    }

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);
  };

  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the slider handle. Otherwise it's really hard to
   * use the slider unless it's massive.
   * @param {String} type Which type of listeners to add
   */


  RangeSlider.prototype._addMoveEventListeners = function _addMoveEventListeners(type) {

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
        for (var i = 0, len = this.handleEls.length; i < len; i++) {
          this.handleEls[i].addEventListener('blur', this._onBlurBound);
        }
        break;
    }
  };

  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to add
   */


  RangeSlider.prototype._removeMoveEventListeners = function _removeMoveEventListeners(type) {

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
        for (var i = 0, len = this.handleEls.length; i < len; i++) {
          this.handleEls[i].removeEventListener('blur', this._onBlurBound);
        }
        break;
    }
  };

  /**
   * When the touch starts, start the slider.
   * @param {Object} e
   */


  RangeSlider.prototype._onTouchStart = function _onTouchStart(e) {
    this.start((0, _getIndex2.default)(this.handleEls, e.target), this.isX ? e.touches[0].pageX : e.touches[0].pageY, 'touch');
  };

  /**
   * When the window fires a touchmove event, adjust our value accordingly
   * @param {Object} e
   */


  RangeSlider.prototype._onTouchMove = function _onTouchMove(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.touches[0].pageX : e.touches[0].pageY);
  };

  /**
   * When the window fires a touchend event, stop tracking touches
   * @param {Object} e
   */


  RangeSlider.prototype._onTouchEnd = function _onTouchEnd(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.stop((0, _getIndex2.default)(this.handleEls, e.target), 'touch');
  };

  /**
   * When the mouse presses down, start the slider.
   * @param {Object} e
   */


  RangeSlider.prototype._onMouseDown = function _onMouseDown(e) {
    this.start((0, _getIndex2.default)(this.handleEls, e.target), this.isX ? e.pageX : e.pageY, 'mouse');
  };

  /**
   * When the window fires a mousemove event, adjust our value accordingly
   * @param {Object} e
   */


  RangeSlider.prototype._onMouseMove = function _onMouseMove(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.pageX : e.pageY);
  };

  /**
   * When the window fires a mouseup event, stop tracking
   * @param {Object} e
   */


  RangeSlider.prototype._onMouseUp = function _onMouseUp() {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    this.stop(null, 'mouse');
  };

  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */


  RangeSlider.prototype._onVisibleChildren = function _onVisibleChildren(e) {
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


  RangeSlider.prototype._onResize = function _onResize() {
    this._cacheSize();
    this._updateDisabledClasses();
    for (var i = 0; i < this.handleEls.length; i++) {
      this._updateHandlePosition(i);
    }
  };

  /**
   * When the element receives focus, start listening for keyboard events
   * @param {Object} e
   */


  RangeSlider.prototype._onFocus = function _onFocus(e) {
    this.start((0, _getIndex2.default)(this.handleEls, e.target), null, 'keyboard');
  };

  /**
   * When a key is pressed, see if it's one of the Arrow, Page up, Page down, Home
   * or End keys move the handle accordingly. If the shift key is pressed in combination
   * with the arrow keys, we'll increment and decrement by bigger values.
   * @param {Object} e
   */


  RangeSlider.prototype._onKeydown = function _onKeydown(e) {

    if ((0, _getIndex2.default)(this.inputEls, e.target) !== -1) {
      return;
    }

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


  RangeSlider.prototype._onBlur = function _onBlur(e) {
    this.stop((0, _getIndex2.default)(this.handleEls, e.target), 'keyboard');
  };

  /**
   * When the input value changes, set our interal value if it's not already our value.
   * @param {Object} e
   */


  RangeSlider.prototype._onChange = function _onChange(e) {

    var index = (0, _getIndex2.default)(this.inputEls, e.target);

    this._updateDisabledClasses();

    if (e.target.value !== this.values[index]) {
      this.setValue(index, e.target.value);
    }
    (this.onChange || noop)(index, this.values[index], this);
  };

  /**
   * Prevent click events on the button. This way we don't accidentally submit the form.
   * @param {Object} e
   */


  RangeSlider.prototype._onClick = function _onClick(e) {
    e.preventDefault();
  };

  return RangeSlider;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


RangeSlider.prototype._whitelistedParams = ['isX', 'validate', 'onValidate', 'onChange', 'onWillChange'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
RangeSlider.prototype.defaults = {
  el: null,
  messageEl: null,
  controlsEl: null,
  inputEls: null,
  handleEls: null,
  trackEl: null,
  trackFillEl: null,
  isActive: null,
  isX: true,
  onValidate: null,
  onChange: null,
  onWillChange: null,
  position: 0,
  width: 0,
  height: 0,
  mins: null,
  maxes: null,
  steps: null,
  values: null,
  percentages: null,
  offsetLeft: 0,
  offsetTop: 0,
  handleSizePercentage: 0,
  currentIndex: null,
  lastIndex: null,
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

(0, _mixin2.default)(RangeSlider.prototype, _messaging2.default, _validation2.default);

exports.default = RangeSlider;
module.exports = exports['default'];
//# sourceMappingURL=range-slider.js.map
