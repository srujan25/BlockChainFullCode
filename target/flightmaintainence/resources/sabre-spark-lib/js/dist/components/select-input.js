'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # SelectInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A select input container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new SelectInput(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/select-input.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var SelectInput = function (_BaseComponent) {
  _inherits(SelectInput, _BaseComponent);

  /**
   * SelectInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function SelectInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SelectInput);

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
   * @return {String}
   */


  SelectInput.prototype.getValue = function getValue() {
    return this.selectEl.value;
  };

  /**
   * Set the value.
   * @param {String|Number} val
   */


  SelectInput.prototype.setValue = function setValue(val) {

    // Cast to a string for comparison
    val = val + '';

    var i = 0;
    var len = this.selectEl.children.length;

    for (; i < len; i++) {
      if (this.selectEl.children[i].value === val) {
        this.selectEl.children[i].selected = true;
        this._updateClass();
        (this.onChange || noop)(val, this);
        return this;
      }
    }

    return this;
  };

  /**
   * Clear the selected value.
   */


  SelectInput.prototype.clearValue = function clearValue() {

    var i = 0;
    var len = this.selectEl.children.length;

    for (; i < len; i++) {
      if (this.selectEl.children[i].selected === true) {
        this.selectEl.children[i].selected = false;
        this._updateClass();
        (this.onChange || noop)('', this);
        return this;
      }
    }

    return this;
  };

  /**
   * Set the options.
   * @param {Array} opts
   */


  SelectInput.prototype.setOptions = function setOptions(opts) {

    var i = 0;
    var len = opts.length;
    var str = '';

    // Store the index of the currently selected option so we can set
    // it when we're all done.
    var curIndex = this.selectEl.selectedIndex;

    for (; i < len; i++) {
      str += '<option ' + (opts[i].value !== undefined ? 'value="' + (opts[i].value || '') + '"' : '') + '>' + (opts[i].text || '') + '</option>';
    }

    this.selectEl.innerHTML = str;
    this.selectEl.selectedIndex = Math.min(len - 1, curIndex);

    return this;
  };

  /**
   * Set the value of the label.
   * @param {String} text
   */


  SelectInput.prototype.setLabel = function setLabel(text) {
    if (!this.labelEl) return this;
    this.labelEl.innerHTML = text;
    return this;
  };

  /**
   * Disable entry into the input.
   */


  SelectInput.prototype.disable = function disable() {
    this.selectEl.setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable entry into the input.
   */


  SelectInput.prototype.enable = function enable() {
    this.selectEl.removeAttribute('disabled');
    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  SelectInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.selectEl = this.el.querySelector('select');
    this.labelEl = this.el.querySelector('.spark-label');

    this.messageEl = this.el.querySelector('.spark-select__message') || (0, _makeElement2.default)('<span class="spark-select__message"></span>');

    if (!this.selectEl) {
      throw new Error('A <select> element must be present!', this.el);
    }

    this._updateClass();
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  SelectInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onInputBound = this._onInput.bind(this);
  };

  /**
   * Add event listeners for focus, blur and input.
   */


  SelectInput.prototype._addEventListeners = function _addEventListeners() {
    this.selectEl.addEventListener('focus', this._onFocusBound);
    this.selectEl.addEventListener('blur', this._onBlurBound);
    this.selectEl.addEventListener('input', this._onInputBound);
  };

  /**
   * Remove event listeners for focus, blur and input.
   */


  SelectInput.prototype._removeEventListeners = function _removeEventListeners() {
    this.selectEl.removeEventListener('focus', this._onFocusBound);
    this.selectEl.removeEventListener('blur', this._onBlurBound);
    this.selectEl.removeEventListener('input', this._onInputBound);
  };

  /**
   * Update the active class.
   */


  SelectInput.prototype._updateClass = function _updateClass() {
    this.hasValue = this.selectEl.value ? true : false;
    (0, _toggleClass2.default)(this.el, 'has-value', this.hasValue);
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
  };

  /**
   * When the input element gains focus.
   * @param {Object} e
   */


  SelectInput.prototype._onFocus = function _onFocus() {
    this.isActive = true;
    this._updateClass();
    var value = this.getValue();
    (this.onFocus || noop)(value, this);
  };

  /**
   * When the input element loses focus.
   * @param {Object} e
   */


  SelectInput.prototype._onBlur = function _onBlur() {
    this.isActive = false;
    this._updateClass();
    var value = this.getValue();
    (this.onBlur || noop)(value, this);
  };

  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */


  SelectInput.prototype._onInput = function _onInput() {

    this._updateClass();

    var value = this.getValue();

    if (value !== this.previousValue) {
      this.previousValue = value;
      (this.onChange || noop)(value, this);
    }
  };

  return SelectInput;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


SelectInput.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange', 'onFocus', 'onBlur'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
SelectInput.prototype.defaults = {
  el: null,
  messageEl: null,
  selectEl: null,
  labelEl: null,
  hasValue: false,
  isActive: false,
  onChange: null,
  onFocus: null,
  onBlur: null,
  previousValue: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onInputBound: null
};

(0, _mixin2.default)(SelectInput.prototype, _messaging2.default, _validation2.default);

exports.default = SelectInput;
module.exports = exports['default'];
//# sourceMappingURL=select-input.js.map
