/**
 * # NumberSelector
 * An increment/decrement for number inputs.
 *
 * @example
 * new NumberSelector(el);
 *
 * @module components/number-selector.js
 */
import BaseComponent from './base';
import getParent from '../helpers/traversal/get-parent';
import messaging from '../mixins/messaging';
import mixin from '../helpers/util/mixin';
import validation from '../mixins/validation';
import makeElement from '../helpers/dom/make-element';

const noop = function() {};

class NumberSelector extends BaseComponent {

  /**
   * NumberSelector constructor.
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
   * Get the current value of the number selector.
   * @return {Number} The current value
   */
  getValue() {
    return parseFloat(this.inputEl.value);
  }


  /**
   * Set the current value of the number selector.
   * @param {Number} val
   */
  setValue(val) {
    if ( isNaN(val) ) {
      val = this._getMin();
    }

    let newVal = this._getConformedNumber(val);
    if (newVal !== this.inputEl.value) {
      this.inputEl.value = newVal;
      (this.onChange || noop)(newVal, this);
    }
    return this;
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
   * Clear the value.
   */
  clearValue() {
    return this.setValue(0);
  }


  /**
   * Increment by the step value.
   */
  increment() {
    return this.setValue( this.getValue() + this._getStep() );
  }


  /**
   * Decrement by the step value.
   */
  decrement() {
    return this.setValue( this.getValue() - this._getStep() );
  }


  /**
   * Get number of digits after the decimal point (fractional part)
   * @param {Number} val
   * @return {Number}
   */
  _countDecimals(val) {
    return (!val || isNaN(val) || Math.floor(val) === val) ? 0 : (val.toString().split(".")[1].length || 0);
  }


  /**
   * Enable the input and buttons.
   */
  enable() {

    let btns = this.el.querySelectorAll('.spark-number-selector__up, .spark-number-selector__down');
    let i = 0;
    let len = btns.length;

    for(; i < len; i++) {
      btns[i].removeAttribute('disabled');
    }

    this.inputEl.removeAttribute('disabled');

    return this;
  }


  /**
   * Disable the input and buttons.
   */
  disable() {

    let btns = this.el.querySelectorAll('.spark-number-selector__up, .spark-number-selector__down');
    let i = 0;
    let len = btns.length;

    for(; i < len; i++) {
      btns[i].setAttribute('disabled', '');
    }

    this.inputEl.setAttribute('disabled', '');

    return this;
  }


  /**
   * Store a reference to the whole number-selector, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.inputEl = el.querySelector('input');

    this.messageEl = this.el.querySelector('.spark-number-selector__message') || makeElement('<span class="spark-number-selector__message"></span>');

    if (!this.inputEl) {
      throw new Error('NumberSelector must include an `<input>` element!');
    }
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onInputFocusBound = this._onInputFocus.bind(this);
    this._onInputBlurBound = this._onInputBlur.bind(this);
    this._onInputInputBound = this._onInputInput.bind(this);
  }


  /**
   * Add event listeners for touchstart and mouse click.
   */
  _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('change', this._onInputChangeBound);
    this.el.addEventListener('focus', this._onInputFocusBound);
    this.el.addEventListener('blur', this._onInputBlurBound);
    this.inputEl.addEventListener('input', this._onInputInputBound);
  }


  /**
   * Remove event listeners for touchstart and mouse click.
   */
  _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('change', this._onInputChangeBound);
    this.el.removeEventListener('focus', this._onInputFocusBound);
    this.el.removeEventListener('blur', this._onInputBlurBound);
    this.inputEl.removeEventListener('input', this._onInputInputBound);
  }


  /**
   * Get the current value of the min property.
   * @return {Number}
   */
  _getMin() {
    return this._getInputPropAsNumber('min');
  }


  /**
   * Get the current value of the max property.
   * @return {Number}
   */
  _getMax() {
    return this._getInputPropAsNumber('max');
  }


  /**
   * Get the current value of the step property.
   * @return {Number}
   */
  _getStep() {
    return this._getInputPropAsNumber('step') || 1;
  }


  /**
   * Get a property as a number.
   * @param {String} key
   * @return {Number}
   */
  _getInputPropAsNumber(key) {
    return parseFloat(this.inputEl.getAttribute(key));
  }


  /**
   * Get the given number within the min/max range of the input element.
   * @param {Number} num
   * @return {Number}
   */
  _getConformedNumber(num) {
    let max = this._getMax();
    let min = this._getMin();
    let step = this._getStep();

    // Move in increments if we have a defined step size
    if (step) {
      let diff = num % step;
      let halfStep = step / 2;
      let overHalf = diff >= halfStep;
      num = overHalf ? (num + (step - diff)) : (num - diff);

      // only use toPrecision if we have fractions
      let stepFractional = this._countDecimals(this._getStep());

      if (stepFractional > 0) {
        // get number of digits to left of decimal in num if it is greater than 1
        let absNum = Math.abs(num);

        let integral = absNum > 1 ? absNum.toString().split(".")[0].length : 0;

        // number of significant digits is sum of integral and step fraction
        let precisionValue = stepFractional + integral;

        num = Number.isInteger(num) ? num : num.toPrecision(precisionValue);
      }
    }

    return max !== undefined && num > max ? max : (min !== undefined && num < min ? min : num);
  }


  /**
   * When either of the buttons are clicked, update the value.
   * @param {Object} e
   */
  _onClick(e) {
    // IE 11 has a bug where click events for disabled buttons still propagate.
    // Add a check to ensure that we are not incrementing/decrementing in this scenario
    if (!e.target.hasAttribute('disabled')) {
      // The increment button is clicked
      if (getParent(e.target, '.spark-number-selector__up', this.el)) {
        e.preventDefault();
        this.increment();
      }
      // The decrement button is clicked
      else if (getParent(e.target, '.spark-number-selector__down', this.el)) {
        e.preventDefault();
        this.decrement();
      }
    }
  }


  /**
   * When the input value changes, max sure we are in bounds.
   * @param {Object} e
   */
  _onInputChange() {
    this.setValue(parseFloat(this.inputEl.value));
  }


  /**
   * When the input gains focus.
   * @param {Object} e
   */
  _onInputFocus() {
    if (this.onFocus) this.onFocus(this.getValue(), this);
  }


  /**
   * When the input loses focus.
   * @param {Object} e
   */
  _onInputBlur() {
    if (this.onBlur) this.onBlur(this.getValue(), this);
  }

  /**
   * When the input loses focus.
   * @param {Object} e
   */
  _onInputInput() {
    if (this.onInput) this.onInput(this.getValue(), this);
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
NumberSelector.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange', 'onFocus', 'onBlur', 'onInput'];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
NumberSelector.prototype.defaults = {
  el: null,
  inputEl: null,
  onValidate: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onInput: null,
  _onInputChangeBound: null,
  _onClickBound: null
};

mixin(NumberSelector.prototype, messaging, validation);

export default NumberSelector;
