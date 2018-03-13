/**
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
import BaseComponent from './base';
import toggleClass from '../helpers/dom/toggle-class';
import getOffset from '../helpers/dom/offset';
import hasParent from '../helpers/traversal/has-parent';
import messaging from '../mixins/messaging';
import mixin from '../helpers/util/mixin';
import validation from '../mixins/validation';
import makeElement from '../helpers/dom/make-element';

const noop = function() {};

class Slider extends BaseComponent {

  /**
   * Slider constructor.
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
  }


  /**
   * Start the slider moving.
   * @param {Number} position The position of the pointer.
   * @param {String} type Optional Which type of events to listen for.
   */
  start(position, type) {

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
  }


  /**
   * Move the value to a given position
   * @param {Number} position
   * @param {Boolean} force Force the move Optional
   */
  move(position, force) {

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
  }


  /**
   * Stop listening to movements.
   * @param {String} type Optional Which type of events to listen for.
   */
  stop(type) {

    this.isActive = false;

    if(this._oldVal !== this.value) {
      (this.onChange || noop)(this.value, this);
    }

    this._updateActiveClasses();
    this._removeMoveEventListeners(type || 'mouse');

    return this;
  }


  /**
   * Set the value of the handle.
   * @param {Number} value
   */
  setValue(value) {

    // Move in increments if we have a defined step size
    if (this.step) {
      value = value - (value % this.step);
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
  }


  /**
   * Get the value.
   * @return {Number}
   */
  getValue() {
    return this.value;
  }


  /**
   * Clear the value.
   */
  clearValue() {
    return this.setValue(0);
  }

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */
  setErrorState(opt) {
    if(opt){
      this.el.setAttribute('data-error', '');
    }
    else {
      this.el.removeAttribute('data-error');
    }
  }

  /**
   * Enable the input.
   */
  enable() {
    this.inputEl.removeAttribute('disabled');
    this.inputEl.removeAttribute('tabindex');
    this.handleEl.removeAttribute('disabled');
    this.handleEl.removeAttribute('tabindex');
    return this;
  }


  /**
   * Disable the input.
   */
  disable() {
    this.inputEl.setAttribute('disabled', '');
    this.inputEl.setAttribute('tabindex', '-1');
    this.handleEl.setAttribute('disabled', '');
    this.handleEl.setAttribute('tabindex', '-1');
    return this;
  }


  /**
   * Increment the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */
  increment(useMultiplier) {
    return this.setValue(this.value + this.step * (useMultiplier ? 10 : 1));
  }


  /**
   * Decrement the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */
  decrement(useMultiplier) {
    return this.setValue(this.value - this.step * (useMultiplier ? 10 : 1));
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
    this._updateHandlePosition();

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
    this.inputEl = this.el.querySelector('input[type="number"]');
    this.handleEl = this.el.querySelector('.spark-slider__handle');
    this.trackEl = this.el.querySelector('.spark-slider__track');
    this.trackFillEl = this.trackEl.querySelector('.spark-slider__track-fill');

    this.messageEl = this.el.querySelector('.spark-slider__message') || makeElement('<span class="spark-slider__message"></span>');

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
  }


  /**
   * Save the element dimensions.
   */
  _cacheSize() {

    this.width = this.trackEl.offsetWidth;
    this.height = this.trackEl.offsetHeight;

    this.handleSize = this.isX ? this.handleEl.offsetWidth : this.handleEl.offsetHeight;
    this.handleSizePercentage = this.isX ? this.handleEl.offsetWidth / this.width : this.handleEl.offsetHeight / this.height;

    var offset = getOffset(this.controlsEl);
    this.offsetLeft = offset.left;
    this.offsetTop = offset.top;
  }


  /**
   * Set the position of the handle.
   */
  _updateHandlePosition() {

    // Track and Track-Fill elements
    let trackPercentage = Math.round(Math.min(this.percentage, 1) * 100);
    this.trackEl.setAttribute('data-percentage', trackPercentage);
    this.trackFillEl.setAttribute('style', 'width: ' + trackPercentage + '%;');

    // Handle position
    let handlePos = ( this.handleSize / 2 ) + ( ( this.value - this.min ) * ( ( this.width - this.handleSize ) / ( this.max - this.min ) ) );
    let handlePosPercentage = (handlePos / this.width) * 100;
    this.handleEl.setAttribute('style', 'left: ' + handlePosPercentage + '%;');
  }


  /**
   * Update the active class on the handle.
   */
  _updateActiveClasses() {
    toggleClass(this.handleEl, 'active', this.isActive);
    toggleClass(this.el, 'active', this.isActive);
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
    this._onMouseOutBound = this._onMouseOut.bind(this);

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

    this.inputEl.addEventListener('change', this._onChangeBound);

    this.handleEl.addEventListener('focus', this._onFocusBound);
    this.handleEl.addEventListener('click', this._onClickBound);

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  }


  /**
   * Remove event listeners for touchstart and mouse click.
   */
  _removeEventListeners() {

    this.controlsEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.removeEventListener('mousedown', this._onMouseDownBound);

    this.inputEl.removeEventListener('change', this._onChangeBound);

    this.handleEl.removeEventListener('focus', this._onFocusBound);
    this.handleEl.removeEventListener('click', this._onClickBound);

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound);
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
        this.handleEl.addEventListener('blur', this._onBlurBound);
        break;
    }
  }


  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to remove
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
        this.handleEl.removeEventListener('blur', this._onBlurBound);
        break;
    }
  }


  /**
   * Truncate value text to fit.
   * @param {String} value
   * @return {String}
   */
  _truncateValueText(value, precision, characters) {

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
        if ((value === 1000) && (i < characters.length - 1)) {
          value = 1;
          i++;
        }

        value += characters[i];

        break;
      }
    }

    return (isNegative ? '-' : '') + value;
  }


  /**
   * When the touch starts, start the slider.
   * @param {Object} e
   */
  _onTouchStart(e) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return;
    }

    e.preventDefault();

    this.start(this.isX ? e.touches[0].pageX : e.touches[0].pageY, 'touch');
  }


  /**
   * When the window fires a touchmove event, adjust our value accordingly
   * @param {Object} e
   */
  _onTouchMove(e) {

    if (!this.isActive) {
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

    if (!this.isActive) {
      return;
    }

    e.preventDefault();

    this.stop('touch');
  }


  /**
   * When the mouse presses down, start the slider.
   * @param {Object} e
   */
  _onMouseDown(e) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return;
    }

    e.preventDefault();

    this.start(this.isX ? e.pageX : e.pageY, 'mouse');
  }


  /**
   * When the window fires a mousemove event, adjust our value accordingly
   * @param {Object} e
   */
  _onMouseMove(e) {

    if (!this.isActive) {
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

    if (!this.isActive) {
      return;
    }

    this.stop('mouse');
  }


  /**
   * When the window fires a mouseout event, stop tracking if it was the html element.
   * @param {Object} e
   */
  _onMouseOut() {
    // @todo: make this work
    // if (e.relatedTarget === doc.body.parentNode) {
    //   this.stop('mouse');
    // }
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
    this._updateHandlePosition();
  }


  /**
   * When the element receives focus, start listening for keyboard events
   * @param {Object} e
   */
  _onFocus() {
    this.start(null, 'keyboard');
  }


  /**
   * When a key is pressed, see if it's one of the Arrow, Page up, Page down, Home
   * or End keys move the handle accordingly. If the shift key is pressed in combination
   * with the arrow keys, we'll increment and decrement by bigger values.
   * @param {Object} e
   */
  _onKeydown(e) {
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
  _onBlur() {
    this.stop('keyboard');
  }


  /**
   * When the input value changes, set our internal value if it's not already our value.
   * @param {Object} e
   */
  _onChange(e) {
    if (e.target.value !== this.value) {
      this.setValue(e.target.value);
    }
    (this.onChange || noop)(this.value, this);
  }


  /**
   * Prevent click events on the button. This way we don't accidentally submit the form.
   * @param {Object} e
   */
  _onClick(e) {
    e.preventDefault();
  }


  /**
   * When the window is clicked and the element isn't part of the slider, trigger a blur.
   * @param {Object} e
   */
  _onWindowClick(e) {

    if (hasParent(e.target, this.el)) {
      this._onBlur();
    }
  }
}


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

mixin(Slider.prototype, messaging, validation);

export default Slider;
