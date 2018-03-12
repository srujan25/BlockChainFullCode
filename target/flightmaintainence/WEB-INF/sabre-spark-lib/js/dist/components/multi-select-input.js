'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Multiple SelectInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A multiple select input container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new MultiSelectInput(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/multi-select-input.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var MultiSelectInput = function (_BaseComponent) {
  _inherits(MultiSelectInput, _BaseComponent);

  /**
   * MultiSelectInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function MultiSelectInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MultiSelectInput);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Get the value.
   * @return {Array}
   */


  MultiSelectInput.prototype.getValue = function getValue() {

    var vals = [];

    (0, _each2.default)(this._isNative ? this.selectEl.options : this.checkboxEls, function (o) {
      if (o.checked || o.selected) {
        vals.push(o.value);
      }
    });

    return vals;
  };

  /**
   * Set the value.
   * @param {Array} vals
   */


  MultiSelectInput.prototype.setValue = function setValue(vals) {

    var setVals = [];
    var propName = this._isNative ? 'selected' : 'checked';

    (0, _each2.default)(this._isNative ? this.selectEl.options : this.checkboxEls, function (o) {

      if (vals.indexOf(o.value) !== -1) {
        o[propName] = true;
        setVals.push(o.value);
      } else {
        o[propName] = false;
      }
    });

    (this.onChange || noop)(setVals, this);

    return this;
  };

  /**
   * Clear the selected value.
   */


  MultiSelectInput.prototype.clearValue = function clearValue() {
    return this.setValue([]);
  };

  /**
   * Disable entry into the input.
   */


  MultiSelectInput.prototype.disable = function disable() {
    (this.selectEl || this.el).setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable entry into the input.
   */


  MultiSelectInput.prototype.enable = function enable() {
    (this.selectEl || this.el).removeAttribute('disabled');
    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  MultiSelectInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.selectEl = this.el.querySelector('select');
    this.checkboxEls = this.el.querySelectorAll('[type="checkbox"]');

    if (!this.selectEl && !this.checkboxEls.length) throw new Error('Multi select needs either a select input or a series of checkboxes.');

    this.messageEl = this.el.querySelector('.spark-select__message') || (0, _makeElement2.default)('<span class="spark-select__message"></span>');
  };

  /**
   * Parse parameters.
   */


  MultiSelectInput.prototype._parseParams = function _parseParams() {
    this._isNative = this.selectEl ? true : false;
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  MultiSelectInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onInputBound = this._onInput.bind(this);
  };

  /**
   * Add event listeners for focus, blur and input.
   */


  MultiSelectInput.prototype._addEventListeners = function _addEventListeners() {

    if (this._isNative) {
      this.selectEl.addEventListener('change', this._onInputBound);
    } else {
      this.el.addEventListener('change', this._onInputBound, true);
    }
  };

  /**
   * Remove event listeners for focus, blur and input.
   */


  MultiSelectInput.prototype._removeEventListeners = function _removeEventListeners() {

    if (this._isNative) {
      this.selectEl.removeEventListener('change', this._onInputBound);
    } else {
      this.el.removeEventListener('change', this._onInputBound, true);
    }
  };

  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */


  MultiSelectInput.prototype._onInput = function _onInput() {

    var value = this.getValue();

    if (value !== this.previousValue) {
      this.previousValue = value;
      (this.onChange || noop)(value, this);
    }
  };

  return MultiSelectInput;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


MultiSelectInput.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
MultiSelectInput.prototype.defaults = {
  el: null,
  messageEl: null,
  selectEl: null,
  labelEl: null,
  onChange: null,
  previousValue: null,
  _isNative: false,
  _onFocusBound: null,
  _onBlurBound: null,
  _onInputBound: null
};

(0, _mixin2.default)(MultiSelectInput.prototype, _messaging2.default, _validation2.default);

exports.default = MultiSelectInput;
module.exports = exports['default'];
//# sourceMappingURL=multi-select-input.js.map
