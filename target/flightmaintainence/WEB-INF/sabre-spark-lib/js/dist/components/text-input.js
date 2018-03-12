'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _typeahead = require('./typeahead');

var _typeahead2 = _interopRequireDefault(_typeahead);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # TextInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A text input container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new TextInput(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Callback for when the input value changes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onChange(value, inputInstance) {}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/text-input.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var TextInput = function (_BaseComponent) {
  _inherits(TextInput, _BaseComponent);

  /**
   * TextInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function TextInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextInput);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._createTypeahead();

    if (_this.inputEl.value) {
      _this.show();
      _this._onInput();
    }
    return _possibleConstructorReturn(_this);
  }

  /**
   * Show the input by adding the active state and setting character counts (if necessary).
   */


  TextInput.prototype.show = function show() {
    this.isActive = true;
    this._updateClass();
    return this;
  };

  /**
   * Hide the input by removing the active state.
   */


  TextInput.prototype.hide = function hide() {
    this.isActive = false;
    this._updateClass();
    return this;
  };

  /**
   * Set the value of the input.
   * @param {Mixed} value
   */


  TextInput.prototype.setValue = function setValue(value) {

    if (this.typeahead) {
      this.typeahead.setValue(value);
    } else {
      this.inputEl.value = value;
      if (value) {
        this.show();
      } else {
        this.hide();
      }
    }

    return this;
  };

  /**
   * Get the value of the input.
   * @return {String}
   */


  TextInput.prototype.getValue = function getValue() {
    return this.inputEl.value;
  };

  /**
   * Clear the value of the input.
   */


  TextInput.prototype.clearValue = function clearValue() {
    if (this.typeahead) this.typeahead.clear();else this.inputEl.value = '';
    return this;
  };

  /**
   * Disable the input.
   */


  TextInput.prototype.disable = function disable() {
    if (this.typeahead) this.typeahead.disable();else this.inputEl.setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable the input.
   */


  TextInput.prototype.enable = function enable() {
    if (this.typeahead) this.typeahead.enable();else this.inputEl.removeAttribute('disabled');
    return this;
  };

  /**
   * Remove.
   * @param {Boolean} leaveElement
   */


  TextInput.prototype.remove = function remove(leaveElement) {
    if (this.typeahead) this.typeahead.remove(leaveElement);
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the element in use and the position.
   * @param {Element} el
   */


  TextInput.prototype.update = function update(el) {
    if (this.typeahead) this.typeahead.remove();
    return _BaseComponent.prototype.update.call(this, el);
  };

  /**
   * Create the typeahead instance.
   */


  TextInput.prototype._createTypeahead = function _createTypeahead() {

    if (this.typeahead === true || this.inputEl.getAttribute('data-typeahead') !== null) {
      this.typeahead = new _typeahead2.default(this.el, {
        onBlur: this._onBlurBound
      });
    }
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  TextInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.inputEl = this.el.querySelector('input, textarea');
    this.passwordToggleEl = this.el.querySelector('.spark-input__password-toggle');

    if (!this.inputEl) {
      throw new Error('No <input> or <textarea> element present in input container!', this.el);
    }

    this.messageEl = this.el.querySelector('.spark-input__message') || (0, _makeElement2.default)('<span class="spark-input__message"></span>');

    this.clearEl = this.el.querySelector('.spark-input__clear');
  };

  /**
   * Parse parameters from the elements.
   */


  TextInput.prototype._parseParams = function _parseParams() {

    this.validatePattern = this.validatePattern || this.inputEl.getAttribute('data-validate');
    this.type = this.inputEl.getAttribute('type') || 'text';
    this.showCharacters = this.el.getAttribute('data-characters') !== null ? true : false;
    this.showCharactersRemaining = this.el.getAttribute('data-characters-remaining') !== null ? true : false;
    this.maxlength = this.inputEl.getAttribute('maxlength') || this.inputEl.getAttribute('data-maxlength-soft') || null;
    this.isTextarea = this.inputEl.nodeName.toLowerCase() === 'textarea' ? true : false;
    this.isActive = this.inputEl.value ? true : false;
  };

  /**
   * Set the characters count attribute.
   */


  TextInput.prototype._setCharactersCount = function _setCharactersCount() {

    if (this.showCharacters) {
      this.el.setAttribute('data-characters', this.inputEl.value.length);
    } else if (this.showCharactersRemaining) {

      var remaining = this.maxlength - this.inputEl.value.length;

      this.el.setAttribute('data-characters-remaining', remaining);

      if (remaining < 1) {
        this.el.setAttribute('data-characters-remaining-danger', true);
      } else {
        this.el.removeAttribute('data-characters-remaining-danger');
      }
    }
  };

  /**
   * Set the height of the textarea so that it doesn't scroll.
   */


  TextInput.prototype._setTextareaHeight = function _setTextareaHeight() {

    var style = window.getComputedStyle(this.inputEl);
    var borders = parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10);

    this.inputEl.style.height = null;

    var height = this.inputEl.scrollHeight;
    var lines;

    // No height, most likely the element is invisible. Get a rough
    // approximation of height so we have something.
    if (!height) {
      lines = this.inputEl.innerHTML.split('\n');
      height = Math.max(parseFloat(style.lineHeight)) * lines.length + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    }

    this.inputEl.style.height = height + borders + 'px';
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  TextInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onInputBound = this._onInput.bind(this);
    this._onTogglePasswordViewHideBound = this._onTogglePasswordViewHide.bind(this);
    this._onClearClickBound = this._onClearClick.bind(this);
  };

  /**
   * Add event listeners for focus, blur, input, and click.
   */


  TextInput.prototype._addEventListeners = function _addEventListeners() {

    this.inputEl.addEventListener('focus', this._onFocusBound);
    this.inputEl.addEventListener('blur', this._onBlurBound);
    this.inputEl.addEventListener('input', this._onInputBound);

    if (this.passwordToggleEl) {
      this.passwordToggleEl.addEventListener('click', this._onTogglePasswordViewHideBound);
    }

    if (this.clearEl) {
      this.clearEl.addEventListener('click', this._onClearClickBound);
    }
  };

  /**
   * Remove event listeners for focus, blur and input.
   */


  TextInput.prototype._removeEventListeners = function _removeEventListeners() {

    this.inputEl.removeEventListener('focus', this._onFocusBound);
    this.inputEl.removeEventListener('blur', this._onBlurBound);
    this.inputEl.removeEventListener('input', this._onInputBound);

    if (this.passwordToggleEl) {
      this.passwordToggleEl.removeEventListener('click', this._onTogglePasswordViewHideBound);
    }

    if (this.clearEl) {
      this.clearEl.removeEventListener('click', this._onClearClickBound);
    }
  };

  /**
   * Update the active class.
   */


  TextInput.prototype._updateClass = function _updateClass() {
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
  };

  /**
   * When the input element gains focus.
   * @param {Object} e
   */


  TextInput.prototype._onFocus = function _onFocus() {
    this.show();
    this._setCharactersCount();
    (0, _toggleClass2.default)(this.el, 'focus', true);
    (this.onFocus || noop)(this.inputEl.value, this);
  };

  /**
   * When the input element loses focus.
   * @param {Object} e
   */


  TextInput.prototype._onBlur = function _onBlur() {
    if (!this.inputEl.value) {
      this.hide();
    }
    (0, _toggleClass2.default)(this.el, 'focus', false);
    (this.onBlur || noop)(this.inputEl.value, this);
  };

  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */


  TextInput.prototype._onInput = function _onInput() {

    this.validate();
    this._setCharactersCount();

    if (this.isTextarea) {
      this._setTextareaHeight();
    }

    (this.onChange || noop)(this.inputEl.value, this);
  };

  /**
   * When a clear button is clicked, empty the field.
   * @param {Object} e
   */


  TextInput.prototype._onClearClick = function _onClearClick() {
    this.inputEl.value = '';
    this.hide();
    (this.onChange || noop)(this.inputEl.value, this);
  };

  /**
   * Toggle the current type value (text/password) of password input.
   * @param {Object} e
   */


  TextInput.prototype._onTogglePasswordViewHide = function _onTogglePasswordViewHide(e) {
    e.preventDefault();
    this.inputEl.setAttribute('type', this.inputEl.getAttribute('type') === 'password' ? 'text' : 'password');
  };

  return TextInput;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


TextInput.prototype._whitelistedParams = ['validate', 'validatePattern', 'onValidate', 'onChange', 'onFocus', 'onBlur'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
TextInput.prototype.defaults = {
  el: null,
  messageEl: null,
  inputEl: null,
  passwordToggleEl: null,
  clearEl: null,
  isActive: false,
  isTextarea: false,
  validatePattern: false,
  type: null,
  showCharacters: false,
  showCharactersRemaining: false,
  maxlength: null,
  typeahead: null,
  onValidate: noop,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  _onFocusBound: null,
  _onBlurBound: null,
  _onInputBound: null,
  _onTogglePasswordViewHideBound: null,
  _onClearClickBound: null
};

(0, _mixin2.default)(TextInput.prototype, _messaging2.default, _validation2.default);

exports.default = TextInput;
module.exports = exports['default'];
//# sourceMappingURL=text-input.js.map
