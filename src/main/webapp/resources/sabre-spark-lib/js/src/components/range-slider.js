/**
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
import BaseComponent from './base';
import toggleClass from '../helpers/dom/toggle-class';
import getOffset from '../helpers/dom/offset';
import getIndex from '../helpers/traversal/get-index';
import messaging from '../mixins/messaging';
import mixin from '../helpers/util/mixin';
import validation from '../mixins/validation';
import makeElement from '../helpers/dom/make-element';

const noop = function(){};

class RangeSlider extends BaseComponent {

  /**
   * RangeSlider constructor.
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
    this._updateDisabledClasses();
  }


  /**
   * Start the slider moving.
   * @param {Number} index The index of the handle or input element.
   * @param {Number} position The position of the pointer.
   * @param {String} type Optional Which type of events to listen for.
   */
  start(index, position, type) {

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
  }


  /**
   * Move the value to a given position
   * @param {Number} position
   * @param {Boolean} force Force the move Optional
   */
  move(position, force) {

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
  }


  /**
   * Stop listening to movements.
   * @param {Number} index Optional The index of the handle or input element.
   * @param {String} type Optional Which type of events to listen for.
   */
  stop(index, type) {

    if (index !== null && index !== undefined && this.currentIndex !== index) {
      return this;
    }

    this.isActive[this.currentIndex] = false;
    this.lastIndex = this.currentIndex;

    if(this._oldVal !== this.values[this.currentIndex]) {
      (this.onChange || noop)(this.currentIndex, this.values[this.currentIndex], this);
    }

    this.currentIndex = null;
    this._updateActiveClasses(index);
    this._removeMoveEventListeners(type || 'mouse');

    return this;
  }


  /**
   * Set the value of the handle.
   * @param {Number} index The index of the input element.
   * @param {Number} value
   */
  setValue(index, value) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index]) {
      throw new Error('Cannot set value on a slider input element with an index of ' + index + '. That element does not exist.');
    }

    // Move in increments if we have a defined step size
    if (this.steps[index]) {
      value = value - (value % this.steps[index]);
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
  }


  /**
   * Get the value.
   * @param {Number} index
   * @return {Number}
   */
  getValue(index) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index]) {
      throw new Error('Cannot get value from a slider input element with an index of ' + index + '. That element does not exist.');
    }

    return this.values[index];
  }


  /**
   * Clear the value.
   * @param {Number} index
   */
  clearValue(index) {
    return this.setValue(index, 0);
  }


  /**
   * Enable the input.
   * @param {Number} index
   */
  enable(index) {

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
  }


  /**
   * Disable the input.
   * @param {Number} index
   */
  disable(index) {

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
  }


  /**
   * Increment the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */
  increment(useMultiplier) {
    return this.setValue(this.currentIndex, this.values[this.currentIndex] + this.steps[this.currentIndex] * (useMultiplier ? 10 : 1));
  }


  /**
   * Decrement the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */
  decrement(useMultiplier) {
    return this.setValue(this.currentIndex, this.values[this.currentIndex] - this.steps[this.currentIndex] * (useMultiplier ? 10 : 1));
  }


  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  remove(leaveElement) {
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');
    return super.remove(leaveElement);
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

    this._removeEventListeners();
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');

    this._cacheElements(el);
    this._addEventListeners();
    this._updateDisabledClasses();

    for(var i = 0; i < this.handleEls.length; i++) {
      this._updateHandlePosition(i);
    }

    return this;
  }


  /**
   * Store a reference to the whole slider, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.controlsEl = this.el.querySelector('.spark-slider__controls');
    this.inputEls = this.el.querySelectorAll('input[type="number"]');
    this.handleEls = this.el.querySelectorAll('.spark-slider__handle');
    this.trackEl = this.el.querySelector('.spark-slider__track');
    this.trackFillEl = this.trackEl.querySelector('.spark-slider__track-fill');

    this.messageEl = this.el.querySelector('.spark-slider__message') || makeElement('<span class="spark-slider__message"></span>');

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
      let parsedMin = parseInt(this.inputEls[i].getAttribute('min'), 10);
      this.mins[i] = parsedMin === 0 ? parsedMin : (parsedMin || null); // Ternary operator to prevent null when we have actual 0 value

      let parsedMax = parseInt(this.inputEls[i].getAttribute('max'), 10);
      this.maxes[i] = parsedMax === 0 ? parsedMax : (parsedMax || null); // Ternary operator to prevent null when we have actual 0 value

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
  }


  /**
   * Save the element dimensions.
   */
  _cacheSize() {
    this.width = this.trackEl.offsetWidth;
    this.height = this.trackEl.offsetHeight;

    this.handleSize = this.isX ? this.handleEls[0].offsetWidth : this.handleEls[0].offsetHeight;
    this.handleSizePercentage = this.isX ? this.handleEls[0].offsetWidth / this.width : this.handleEls[0].offsetHeight / this.height;

    var offset = getOffset(this.controlsEl);
    this.offsetLeft = offset.left;
    this.offsetTop = offset.top;
  }


  /**
   * Set the position of the handle.
   * @param {Number} index The index of the handle element to update.
   */
  _updateHandlePosition(index) {
    // Track and Track-Fill elements
    var firstPercentage = this.percentages[0];
    var lastPercentage = this.percentages[this.percentages.length - 1];
    this.trackFillEl.setAttribute('style', 'width: ' + ((lastPercentage - firstPercentage) * 100) + '%; left: ' + (firstPercentage * 100) + '%;');

    // Handle position
    let handlePos = ( this.handleSize / 2 ) + ( ( this.values[index] - this.lowestMin ) * ( ( this.width - this.handleSize ) / ( this.highestMax - this.lowestMin ) ) );
    let handlePosPercentage = (handlePos / this.width) * 100;
    this.handleEls[index].setAttribute('style', 'left: ' + handlePosPercentage + '%;');
  }


  /**
   * Update the active class on the handle.
   * @param {Number} index The index of the handle element to update.
   */
  _updateActiveClasses(index) {

    toggleClass(this.handleEls, 'active', false);
    toggleClass(this.handleEls[index], 'active', this.isActive[index]);

    if (this.isActive.indexOf(true) !== -1) {
      this.el.setAttribute('data-active-index', this.isActive.indexOf(true));
    } else {
      this.el.removeAttribute('data-active-index');
    }
  }


  /**
   * Update which handles are disabled.
   */
  _updateDisabledClasses() {

    var disabledCount = 0;

    for (var i = 0, len = this.inputEls.length; i < len; i++) {

      if (this.inputEls[i].getAttribute('disabled') !== null) {
        toggleClass(this.handleEls[i], 'disabled', true);
        disabledCount++;
      } else {
        toggleClass(this.handleEls[i], 'disabled', false);
      }
    }

    toggleClass(this.el, 'all-disabled', disabledCount === this.handleEls.length);
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {

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
  }


  /**
   * Add event listeners for touchstart and mouse click.
   */
  _addEventListeners() {

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
  }


  /**
   * Remove event listeners for touchstart and mouse click.
   */
  _removeEventListeners() {

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
  }


  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the slider handle. Otherwise it's really hard to
   * use the slider unless it's massive.
   * @param {String} type Which type of listeners to add
   */
  _addMoveEventListeners(type) {

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
  }


  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to add
   */
  _removeMoveEventListeners(type) {

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
  }


  /**
   * When the touch starts, start the slider.
   * @param {Object} e
   */
  _onTouchStart(e) {
    this.start(getIndex(this.handleEls, e.target), this.isX ? e.touches[0].pageX : e.touches[0].pageY, 'touch');
  }


  /**
   * When the window fires a touchmove event, adjust our value accordingly
   * @param {Object} e
   */
  _onTouchMove(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.touches[0].pageX : e.touches[0].pageY);
  }


  /**
   * When the window fires a touchend event, stop tracking touches
   * @param {Object} e
   */
  _onTouchEnd(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.stop(getIndex(this.handleEls, e.target), 'touch');
  }


  /**
   * When the mouse presses down, start the slider.
   * @param {Object} e
   */
  _onMouseDown(e) {
    this.start(getIndex(this.handleEls, e.target), this.isX ? e.pageX : e.pageY, 'mouse');
  }


  /**
   * When the window fires a mousemove event, adjust our value accordingly
   * @param {Object} e
   */
  _onMouseMove(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.pageX : e.pageY);
  }


  /**
   * When the window fires a mouseup event, stop tracking
   * @param {Object} e
   */
  _onMouseUp() {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    this.stop(null, 'mouse');
  }

  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */
  _onVisibleChildren(e) {
    if(e.target.contains(this.el)) {
      window.setTimeout(function() {
        this._onResize();
      }.bind(this),0);
    }
  }


  /**
   * When the window resizes, cache size values for the slider.
   * @param {Object} e
   */
  _onResize() {
    this._cacheSize();
    this._updateDisabledClasses();
    for(var i = 0; i < this.handleEls.length; i++) {
      this._updateHandlePosition(i);
    }
  }


  /**
   * When the element receives focus, start listening for keyboard events
   * @param {Object} e
   */
  _onFocus(e) {
    this.start(getIndex(this.handleEls, e.target), null, 'keyboard');
  }


  /**
   * When a key is pressed, see if it's one of the Arrow, Page up, Page down, Home
   * or End keys move the handle accordingly. If the shift key is pressed in combination
   * with the arrow keys, we'll increment and decrement by bigger values.
   * @param {Object} e
   */
  _onKeydown(e) {

    if (getIndex(this.inputEls, e.target) !== -1) {
      return;
    }

    if (e.keyCode === 39 || e.keyCode === 38) { // Right or Up arrow
      this.increment(e.shiftKey);
    }
    else if (e.keyCode === 37 || e.keyCode === 40) { // Left or down arrow
      this.decrement(e.shiftKey);
    }
    else if (e.keyCode === 33) { // Page Up
      this.increment(true);
    }
    else if (e.keyCode === 34) { // Page Down
      this.decrement(true);
    }
    else if (e.keyCode === 35) { // End
      this.setValue(this.max);
    }
    else if (e.keyCode === 36) { // Home
      this.setValue(this.min);
    }
  }


  /**
   * When the element loses focus, stop listening for keyboard events
   * @param {Object} e
   */
  _onBlur(e) {
    this.stop(getIndex(this.handleEls, e.target), 'keyboard');
  }


  /**
   * When the input value changes, set our interal value if it's not already our value.
   * @param {Object} e
   */
  _onChange(e) {

    var index = getIndex(this.inputEls, e.target);

    this._updateDisabledClasses();

    if (e.target.value !== this.values[index]) {
      this.setValue(index, e.target.value);
    }
    (this.onChange || noop)(index, this.values[index], this);
  }


  /**
   * Prevent click events on the button. This way we don't accidentally submit the form.
   * @param {Object} e
   */
  _onClick(e) {
    e.preventDefault();
  }
}


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

mixin(RangeSlider.prototype, messaging, validation);

export default RangeSlider;
