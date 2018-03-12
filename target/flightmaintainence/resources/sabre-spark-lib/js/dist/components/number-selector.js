'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # NumberSelector
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An increment/decrement for number inputs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new NumberSelector(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/number-selector.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var NumberSelector = function (_BaseComponent) {
  _inherits(NumberSelector, _BaseComponent);

  /**
   * NumberSelector constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function NumberSelector(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NumberSelector);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Get the current value of the number selector.
   * @return {Number} The current value
   */


  NumberSelector.prototype.getValue = function getValue() {
    return parseFloat(this.inputEl.value);
  };

  /**
   * Set the current value of the number selector.
   * @param {Number} val
   */


  NumberSelector.prototype.setValue = function setValue(val) {
    if (isNaN(val)) {
      val = this._getMin();
    }

    var newVal = this._getConformedNumber(val);
    if (newVal !== this.inputEl.value) {
      this.inputEl.value = newVal;
      (this.onChange || noop)(newVal, this);
    }
    return this;
  };

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */


  NumberSelector.prototype.setErrorState = function setErrorState(opt) {
    if (opt) {
      this.el.setAttribute('data-error', '');
    } else {
      this.el.removeAttribute('data-error');
    }
  };

  /**
   * Clear the value.
   */


  NumberSelector.prototype.clearValue = function clearValue() {
    return this.setValue(0);
  };

  /**
   * Increment by the step value.
   */


  NumberSelector.prototype.increment = function increment() {
    return this.setValue(this.getValue() + this._getStep());
  };

  /**
   * Decrement by the step value.
   */


  NumberSelector.prototype.decrement = function decrement() {
    return this.setValue(this.getValue() - this._getStep());
  };

  /**
   * Get number of digits after the decimal point (fractional part)
   * @param {Number} val
   * @return {Number}
   */


  NumberSelector.prototype._countDecimals = function _countDecimals(val) {
    return !val || isNaN(val) || Math.floor(val) === val ? 0 : val.toString().split(".")[1].length || 0;
  };

  /**
   * Enable the input and buttons.
   */


  NumberSelector.prototype.enable = function enable() {

    var btns = this.el.querySelectorAll('.spark-number-selector__up, .spark-number-selector__down');
    var i = 0;
    var len = btns.length;

    for (; i < len; i++) {
      btns[i].removeAttribute('disabled');
    }

    this.inputEl.removeAttribute('disabled');

    return this;
  };

  /**
   * Disable the input and buttons.
   */


  NumberSelector.prototype.disable = function disable() {

    var btns = this.el.querySelectorAll('.spark-number-selector__up, .spark-number-selector__down');
    var i = 0;
    var len = btns.length;

    for (; i < len; i++) {
      btns[i].setAttribute('disabled', '');
    }

    this.inputEl.setAttribute('disabled', '');

    return this;
  };

  /**
   * Store a reference to the whole number-selector, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */


  NumberSelector.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.inputEl = el.querySelector('input');

    this.messageEl = this.el.querySelector('.spark-number-selector__message') || (0, _makeElement2.default)('<span class="spark-number-selector__message"></span>');

    if (!this.inputEl) {
      throw new Error('NumberSelector must include an `<input>` element!');
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  NumberSelector.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onInputFocusBound = this._onInputFocus.bind(this);
    this._onInputBlurBound = this._onInputBlur.bind(this);
    this._onInputInputBound = this._onInputInput.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  NumberSelector.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('change', this._onInputChangeBound);
    this.el.addEventListener('focus', this._onInputFocusBound);
    this.el.addEventListener('blur', this._onInputBlurBound);
    this.inputEl.addEventListener('input', this._onInputInputBound);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  NumberSelector.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('change', this._onInputChangeBound);
    this.el.removeEventListener('focus', this._onInputFocusBound);
    this.el.removeEventListener('blur', this._onInputBlurBound);
    this.inputEl.removeEventListener('input', this._onInputInputBound);
  };

  /**
   * Get the current value of the min property.
   * @return {Number}
   */


  NumberSelector.prototype._getMin = function _getMin() {
    return this._getInputPropAsNumber('min');
  };

  /**
   * Get the current value of the max property.
   * @return {Number}
   */


  NumberSelector.prototype._getMax = function _getMax() {
    return this._getInputPropAsNumber('max');
  };

  /**
   * Get the current value of the step property.
   * @return {Number}
   */


  NumberSelector.prototype._getStep = function _getStep() {
    return this._getInputPropAsNumber('step') || 1;
  };

  /**
   * Get a property as a number.
   * @param {String} key
   * @return {Number}
   */


  NumberSelector.prototype._getInputPropAsNumber = function _getInputPropAsNumber(key) {
    return parseFloat(this.inputEl.getAttribute(key));
  };

  /**
   * Get the given number within the min/max range of the input element.
   * @param {Number} num
   * @return {Number}
   */


  NumberSelector.prototype._getConformedNumber = function _getConformedNumber(num) {
    var max = this._getMax();
    var min = this._getMin();
    var step = this._getStep();

    // Move in increments if we have a defined step size
    if (step) {
      var diff = num % step;
      var halfStep = step / 2;
      var overHalf = diff >= halfStep;
      num = overHalf ? num + (step - diff) : num - diff;

      // only use toPrecision if we have fractions
      var stepFractional = this._countDecimals(this._getStep());

      if (stepFractional > 0) {
        // get number of digits to left of decimal in num if it is greater than 1
        var absNum = Math.abs(num);

        var integral = absNum > 1 ? absNum.toString().split(".")[0].length : 0;

        // number of significant digits is sum of integral and step fraction
        var precisionValue = stepFractional + integral;

        num = Number.isInteger(num) ? num : num.toPrecision(precisionValue);
      }
    }

    return max !== undefined && num > max ? max : min !== undefined && num < min ? min : num;
  };

  /**
   * When either of the buttons are clicked, update the value.
   * @param {Object} e
   */


  NumberSelector.prototype._onClick = function _onClick(e) {
    // IE 11 has a bug where click events for disabled buttons still propagate.
    // Add a check to ensure that we are not incrementing/decrementing in this scenario
    if (!e.target.hasAttribute('disabled')) {
      // The increment button is clicked
      if ((0, _getParent2.default)(e.target, '.spark-number-selector__up', this.el)) {
        e.preventDefault();
        this.increment();
      }
      // The decrement button is clicked
      else if ((0, _getParent2.default)(e.target, '.spark-number-selector__down', this.el)) {
          e.preventDefault();
          this.decrement();
        }
    }
  };

  /**
   * When the input value changes, max sure we are in bounds.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputChange = function _onInputChange() {
    this.setValue(parseFloat(this.inputEl.value));
  };

  /**
   * When the input gains focus.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputFocus = function _onInputFocus() {
    if (this.onFocus) this.onFocus(this.getValue(), this);
  };

  /**
   * When the input loses focus.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputBlur = function _onInputBlur() {
    if (this.onBlur) this.onBlur(this.getValue(), this);
  };

  /**
   * When the input loses focus.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputInput = function _onInputInput() {
    if (this.onInput) this.onInput(this.getValue(), this);
  };

  return NumberSelector;
}(_base2.default);

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

(0, _mixin2.default)(NumberSelector.prototype, _messaging2.default, _validation2.default);

exports.default = NumberSelector;
module.exports = exports['default'];
//# sourceMappingURL=number-selector.js.map
