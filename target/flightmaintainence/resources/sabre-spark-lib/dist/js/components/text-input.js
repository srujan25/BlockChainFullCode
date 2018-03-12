/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).TextInput = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":13}],2:[function(require,module,exports){
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


},{"../helpers/dom/make-element":7,"../helpers/dom/toggle-class":11,"../helpers/util/mixin":14,"../mixins/messaging":16,"../mixins/validation":17,"./base":1,"./typeahead":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _triggerEvent = require('../helpers/dom/trigger-event');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Typeahead
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Listen to an input element and format it as the user types.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Typeahead(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/typeahead.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var noop = function noop() {};

var Typeahead = function (_BaseComponent) {
  _inherits(Typeahead, _BaseComponent);

  /**
   * Typeahead constructor
   * @param {Element} el
   * @param {Object} params
   */
  function Typeahead(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Typeahead);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._maintainFocus(function () {
      this._parseParams();
      this._bindEventListenerCallbacks();
      this._addEventListeners();
    });
    return _possibleConstructorReturn(_this);
  }

  /**
   * Run the formatting.
   * @param {Number} cursorIndex
   */


  Typeahead.prototype.run = function run(cursorIndex) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (this.isRunning) return this;

    this.isRunning = true;

    var oldVal = this.inputEl.value;
    var val = '';
    var placeholder = '';
    var i = 0;
    var len = this.format.length;
    var skipCount = 0;
    var valDone = false;

    for (; i < len; i++) {

      // Add numbers
      if (this.format[i] === '\\d') {

        if (this.characters[i - skipCount]) {
          val += this.characters[i - skipCount];
        } else {
          valDone = true;
        }

        placeholder += valDone ? this.placeholder[i] : '&nbsp;';
      }
      // Placeholder characters
      else {

          if (!valDone) {
            val += this.format[i];
          }

          placeholder += this.format[i];

          skipCount++;
        }
    }

    if (this.isFocused) {
      cursorIndex = cursorIndex === undefined ? this._getCaretEnd() : cursorIndex;
    }

    // If there are no characters, set the cursorIndex to be the last placeholder entry.
    if (this.isFocused && !this.characters.length) {
      cursorIndex = val.length;
    }

    // No characters and we shouldn't use just placeholder values
    if (!this.characters.length && params.notOnlyPlaceholders) {
      val = '';
    }

    this.inputEl.value = val;
    this.placeholderEl.innerHTML = placeholder;

    this._updateWidth();

    if (this.isFocused) {
      this._setCaretPositionTranslated(cursorIndex);
    }

    if (val !== oldVal) {
      (0, _triggerEvent2.default)(this.inputEl, 'input');
    }

    this.isRunning = false;

    if (val !== oldVal) {
      (this.onChange || noop)(val, oldVal, this);
    }

    if (!this._atEnd && this.isFocused && this.characters.length === this.maxLength && this._caretIsAtEnd()) {
      this._atEnd = true;
      (this.onEnd || noop)(this);
    } else {
      this._atEnd = false;
    }

    return this;
  };

  /**
   * Add a character to the characters array at a given index.
   * @param {String} character
   * @param {Number} start
   * @param {Number} end
   * @param {Boolean} skipCheck
   */


  Typeahead.prototype.addCharacterAtIndex = function addCharacterAtIndex(character, start, end, skipCheck) {

    // Don't add at an index beyond what we can support.
    if (this.maxLength && start >= this.maxLength) {
      return this;
    }

    if (!skipCheck) {

      var re;

      // Try to build a regex for this format character.
      try {
        re = new RegExp(this.format[start]);
      } catch (e) {
        //
      }

      if (!re || !re.exec(character)) {
        return this;
      }
    }

    this.characters.splice(start, end - start, character);

    // If we've added at an index that pushes the length beyond what we support,
    // remove the trailing characters.
    if (this.maxLength && this.characters.length > this.maxLength) {
      this.characters.splice(this.maxLength, this.characters.length);
    }

    this.run(start + 1);

    return this;
  };

  /**
   * Add a character at the position of the caret.
   * @param {String} character
   */


  Typeahead.prototype.addCharacterAtCaret = function addCharacterAtCaret(character) {

    var pos = this._getCaretStart();
    var re;

    // If we're beyond the bounds of the format, stop.
    if (this.format[pos] === undefined) {
      (this.onEnd || noop)(this, character);
      return this;
    }

    // Try to build a regex for this format character.
    try {
      re = new RegExp(this.format[pos]);
    } catch (e) {}
    //


    // We couldn't build a regex (so it's invalid) or the regex failed (so it's invalid)
    if (!re || !re.exec(character)) {
      if (this._moveCaret('right')) {
        this.addCharacterAtCaret(character);
      }
      return this;
    }

    this.addCharacterAtIndex(character, this._getCaretStartTranslated(), this._getCaretEndTranslated(), true);

    return this;
  };

  /**
   * Remove a character from the character array by index.
   * @param {Number} index
   * @param {Number} length Optional
   * @param {Number} offset Optional
   */


  Typeahead.prototype.removeCharacterAtIndex = function removeCharacterAtIndex(index, length, offset) {

    // Don't want a negative splice length or else we start
    // removing characters from the end.
    if (index + offset < 0) {
      return this;
    }

    length = length !== undefined ? length : 1;
    this.characters.splice(index + offset, length);
    this.run(index + (offset || 1));

    return this;
  };

  /**
   * Remove the character at the caret.
   * @param {Number} offset Optional An offset from the current position.
   */


  Typeahead.prototype.removeCharacterAtCaret = function removeCharacterAtCaret(offset) {

    var start = this._getCaretStartTranslated();
    var end = this._getCaretEndTranslated();
    var length = 1;
    var tmp;

    if (start !== end) {

      // If the end is less than the start, the user dragged from right to left.
      // Just swap them to make it easier to handle.
      if (end < start) {
        tmp = start;
        start = end;
        end = tmp;
      }

      // The length of characters removed
      length = end - start;

      // Bump the start position @todo: haven't thought through why this is, but it's needed.
      start++;
    }

    this.removeCharacterAtIndex(start, length, offset);

    return this;
  };

  /**
   * Remove the character in the current range.
   */


  Typeahead.prototype.removeCharactersInRange = function removeCharactersInRange() {
    this.removeCharacterAtIndex(this._getCaretStartTranslated(), this._getCaretEndTranslated());
    return this;
  };

  /**
   * Set the value of the typeahead. Maintain the position of the caret.
   * @param {String} value
   */


  Typeahead.prototype.setValue = function setValue(value) {

    this.settingValue = true;
    this.pause();

    this.characters = (value + '').split('');
    this.run();

    if (this.isFocused) this._setCaretPosition(this._getCaretStart());

    this.resume();
    this.settingValue = false;

    return this;
  };

  /**
   * Get the value of the typeahead.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {String|Number}
   */


  Typeahead.prototype.getValue = function getValue(asInt) {
    return asInt && this.inputEl.value ? parseInt(this.inputEl.value, 10) : this.inputEl.value;
  };

  /**
   * Clear the selected value.
   */


  Typeahead.prototype.clearValue = function clearValue() {
    this.pause();
    this.characters = [];
    this.run(0, { notOnlyPlaceholders: true });
    return this.resume();
  };

  /**
   * Take the date values from the inputs and set them as dates on the calendar.
   */


  Typeahead.prototype.updateValue = function updateValue() {
    return this.setValue(this.inputEl.value);
  };

  /**
   * Move the caret position.
   * @param {Number} pos
   */


  Typeahead.prototype.moveCaret = function moveCaret(pos) {
    this._setCaretPositionTranslated(pos);
    return this;
  };

  /**
   * Move the caret to the end of the input.
   */


  Typeahead.prototype.moveCaretToEnd = function moveCaretToEnd() {
    return this.moveCaret(this.characters.length);
  };

  /**
   * Move the caret to the start of the input.
   */


  Typeahead.prototype.moveCaretToStart = function moveCaretToStart() {
    return this.moveCaret(0);
  };

  /**
   * Pause events.
   */


  Typeahead.prototype.pause = function pause() {
    this.pauseBlurFocus++;
    return this;
  };

  /**
   * Resume events.
   */


  Typeahead.prototype.resume = function resume() {
    this.pauseBlurFocus--;
    return this;
  };

  /**
   * Disable entry into the input.
   */


  Typeahead.prototype.disable = function disable() {
    this.inputEl.setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable entry into the input.
   */


  Typeahead.prototype.enable = function enable() {
    this.inputEl.removeAttribute('disabled');
    return this;
  };

  /**
   * Clear the value.
   * Changed to clearValue in v2.0.0.
   */


  Typeahead.prototype.clear = function clear() {
    return this.clearValue();
  };

  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Typeahead.prototype.remove = function remove(leaveElement) {
    _BaseComponent.prototype.remove.call(this, leaveElement);
    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Object} el
   */


  Typeahead.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.inputEl = this.el.querySelector('[type="text"], [type="email"], [type="phone"], textarea') || this._createDefaultInputElement();
    this.placeholderEl = this.el.querySelector('.spark-input__placeholder') || this._createDefaultPlaceholderElement();
  };

  /**
   * Parse parameters from the elements.
   */


  Typeahead.prototype._parseParams = function _parseParams() {

    // Store the value characters
    this.characters = this._parseCharacters(this.inputEl.value);

    // Store format
    this.format = this._parseFormat(this.format ? this.format : this.inputEl.getAttribute('data-typeahead-format'));

    // Store the original placeholder
    this.placeholder = this.placeholder ? this.placeholder : this.inputEl.getAttribute('placeholder').split('');

    // Get the total number of characters we can have
    this.maxLength = this._getCharactersAllowedCount(this.format);

    this.matchPlaceholderSize = this.matchPlaceholderSize !== null ? this.matchPlaceholderSize : (0, _parseAttribute.boolean)(this.inputEl, 'data-match-placeholder-size', false);
  };

  /**
   * Parse the format string into an array.
   * @param  {String} format
   * @return {Array}
   */


  Typeahead.prototype._parseFormat = function _parseFormat(format) {

    var i = 0;
    var len = format.length;
    var arr = [];
    var lastWasEscape = false;

    for (; i < len; i++) {
      if (format[i] === '\\' && !lastWasEscape) {
        lastWasEscape = true;
      } else {
        arr.push((lastWasEscape ? '\\' : '') + format[i]);
        lastWasEscape = false;
      }
    }

    return arr;
  };

  /**
   * Parse the characters string into an array, ignoring characters which don't
   * match the format requirements.
   * @param {String} characters
   * @return {Array}
   */


  Typeahead.prototype._parseCharacters = function _parseCharacters(characters) {

    var chars = characters.split('');
    var i = 0;
    var len = characters.length;
    var regexes = [];
    var arr = [];

    for (; i < len; i++) {

      // Try to build a regex for this format character.
      try {
        // Make sure this format starts with an escape character.
        regexes[i] = this.format[i][0] === '\\' ? new RegExp(this.format[i]) : null;
      } catch (e) {}
      //


      // If we were able to create a regex and our char passes, add it to the array
      // of characters to return.
      if (regexes[i] && regexes[i].exec(chars[i])) {
        arr.push(chars[i]);
      }
    }

    return arr;
  };

  /**
   * Create the default input element.
   * @return {Element}
   */


  Typeahead.prototype._createDefaultInputElement = function _createDefaultInputElement() {

    var el = document.createElement('input');
    el.className = 'spark-input__field';
    el.setAttribute('data-typeahead', '');
    el.setAttribute('type', 'tel');

    this.el.appendChild(el);

    return el;
  };

  /**
   * Create the default input element.
   * @return {Element}
   */


  Typeahead.prototype._createDefaultPlaceholderElement = function _createDefaultPlaceholderElement() {
    var el = document.createElement('span');
    el.className = 'spark-input__placeholder';
    this.el.appendChild(el);
    return el;
  };

  /**
   * Get the maximum number of characters allowed.
   * @param {Array} format
   * @return {Number}
   */


  Typeahead.prototype._getCharactersAllowedCount = function _getCharactersAllowedCount(format) {

    var i = 0;
    var len = format.length;
    var allowed = 0;

    for (; i < len; i++) {
      if (format[i] === '\\d') {
        allowed++;
      }
    }

    return allowed;
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Typeahead.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onKeypressBound = this._onKeypress.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onPlaceholderClickBound = this._onPlaceholderClick.bind(this);
  };

  /**
   * Add event listeners to keypress and keydown.
   */


  Typeahead.prototype._addEventListeners = function _addEventListeners() {
    this.inputEl.addEventListener('keydown', this._onKeydownBound, false);
    this.inputEl.addEventListener('keypress', this._onKeypressBound, false);
    this.inputEl.addEventListener('focus', this._onFocusBound, false);
    this.placeholderEl.addEventListener('click', this._onPlaceholderClickBound, false);
  };

  /**
   * Add event listeners to keypress and keydown.
   */


  Typeahead.prototype._removeEventListeners = function _removeEventListeners() {

    this.inputEl.removeEventListener('keydown', this._onKeydownBound);
    this.inputEl.removeEventListener('keypress', this._onKeypressBound);
    this.inputEl.removeEventListener('focus', this._onFocusBound);
    this.placeholderEl.removeEventListener('click', this._onPlaceholderClickBound);

    window.removeEventListener('blur', this._onBlurBound);
    this.inputEl.removeEventListener('blur', this._onBlurBound);
  };

  /**
   * Get the position of the caret in the element.
   * @return {Number} The index
   */


  Typeahead.prototype._getCaretStart = function _getCaretStart() {

    return this._maintainFocus(function () {

      var caretPosition;

      // IE support
      if (document.selection) {
        this.inputEl.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -this.inputEl.value.length);
        caretPosition = sel.text.length;
      } else if (this.inputEl.selectionStart || this.inputEl.selectionStart === 0) {
        caretPosition = this.inputEl.selectionStart;
      }

      return caretPosition;
    });
  };

  /**
   * Get the end position of the caret in the element.
   * @return {Number} The index
   */


  Typeahead.prototype._getCaretEnd = function _getCaretEnd() {

    return this._maintainFocus(function () {

      var caretPosition;

      // IE support
      if (document.selection) {
        this.inputEl.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -this.inputEl.value.length);
        caretPosition = sel.text.length;
      } else if (this.inputEl.selectionEnd || this.inputEl.selectionEnd === 0) {
        caretPosition = this.inputEl.selectionEnd;
      }

      return caretPosition;
    });
  };

  /**
   * Is the caret at the end of the input?
   * @return {Boolean}
   */


  Typeahead.prototype._caretIsAtEnd = function _caretIsAtEnd() {
    return this._getCaretStart() === this.maxLength;
  };

  /**
   * Set the position of the caret in the element.
   * @return {Number} The index
   */


  Typeahead.prototype._setCaretPosition = function _setCaretPosition(pos) {

    return this._maintainFocus(function () {

      // IE support
      if (document.selection) {
        this.inputEl.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -this.inputEl.value.length);
        sel.moveStart('character', pos);
        sel.moveEnd('character', 0);
        sel.select();
      } else if (this.inputEl.selectionStart || this.inputEl.selectionStart === 0) {
        this.inputEl.selectionStart = pos;
        this.inputEl.selectionEnd = pos;
      }
    });
  };

  /**
   * Get the position of the caret translated to the corresponding index in the
   * characters array. This means ignoring format characters.
   * @param {Number} pos
   * @return {Number}
   */


  Typeahead.prototype._getCaretPositionTranslated = function _getCaretPositionTranslated(pos) {

    var i = 0;
    var skipCount = 0;

    for (; i < pos; i++) {

      // Count non-numbers as a skip.
      // @todo: this needs to work with more than numbers.
      if (this.format[i] !== '\\d') {
        skipCount++;
      }
    }

    return pos - skipCount;
  };

  /**
   * Get the starting position of the caret translated.
   * @return {Number}
   */


  Typeahead.prototype._getCaretStartTranslated = function _getCaretStartTranslated() {
    return this._getCaretPositionTranslated(this._getCaretStart());
  };

  /**
   * Get the ending position of the caret translated.
   * @return {Number}
   */


  Typeahead.prototype._getCaretEndTranslated = function _getCaretEndTranslated() {
    return this._getCaretPositionTranslated(this._getCaretEnd());
  };

  /**
   * Set the position of the caret translated to the corresponding index in the
   * characters array. This means ignoring format characters.
   * @param {Number} pos
   */


  Typeahead.prototype._setCaretPositionTranslated = function _setCaretPositionTranslated(pos) {

    var i = 0;
    var skipCount = 0;

    for (; i < pos + skipCount; i++) {

      // Count non-numbers as a skip.
      // @todo: this needs to work with more than numbers.
      if (this.format[i] !== undefined && this.format[i] !== '\\d') {
        skipCount++;
      }
    }

    this._setCaretPosition(pos + skipCount);
  };

  /**
   * Move the caret position
   * @param  {String} direction The direction of the movement
   * @return {Boolean}           Was the caret actually moved?
   */


  Typeahead.prototype._moveCaret = function _moveCaret(direction) {

    var curPos = this._getCaretStart();

    if (direction === 'left') {
      this._setCaretPosition(curPos - 1);
    } else if (direction === 'right') {
      this._setCaretPosition(curPos + 1);
    }

    return curPos !== this._getCaretStart();
  };

  /**
   * Empty the input when we only have placeholders.
   */


  Typeahead.prototype._emptyWhenOnlyPlaceholders = function _emptyWhenOnlyPlaceholders() {
    if (!this.characters.length) {
      this.clear();
    }
  };

  /**
   * Run a callback function that may change the focus of the document, but
   * make sure focus goes back to where it needs to be. Also, set the state
   * so that blur/focus events don't fire from this instance.
   * @param {Function} callback
   */


  Typeahead.prototype._maintainFocus = function _maintainFocus(callback) {

    this.pause();

    var originalActiveElement = document.activeElement;

    //For IE
    if (!originalActiveElement) {
      originalActiveElement = document.body;
    }

    var output = (callback || noop).call(this);

    // If we didn't have focus, go back to focusing on the original
    if (originalActiveElement !== this.inputEl) {
      this.inputEl.blur();
      originalActiveElement ? originalActiveElement.focus() : null;
    }

    this.resume();

    return output;
  };

  /**
   * Update the width of the typeahead. If we should be matching the width
   * of the placeholder, do so. Otherwise, take no action.
   */


  Typeahead.prototype._updateWidth = function _updateWidth() {

    if (this.matchPlaceholderSize) {
      this.placeholderEl.style.width = 'auto';
      // Add 2px to account for caret width in IE...
      this.inputEl.style.width = 'auto';
      this.inputEl.style.width = this.placeholderEl.offsetWidth + 2 + 'px';
      this.placeholderEl.style.width = '';
    }
  };

  /**
   * Listen for delete and arrows.
   * @param  {Object} e
   */


  Typeahead.prototype._onKeydown = function _onKeydown(e) {

    var code = e.keyCode || e.which;

    if (code === this.pasteCode && (e.metaKey || e.ctrlKey)) {
      return;
    }

    if (code === this.actionCodes.BACKSPACE) {
      this.removeCharacterAtCaret(-1);
      this._onBackspace();
      e.preventDefault();
    } else if (code === this.actionCodes.DELETE) {
      this.removeCharacterAtCaret(0);
      e.preventDefault();
    } else if (code === this.actionCodes.LEFT) {
      if (!this._getCaretStart()) {
        (this.onBackspace || noop)();
      }
    } else if (code === this.actionCodes.RIGHT) {
      if (this._getCaretStart() === this.characters.length) {
        (this.onEnd || noop)();
      }
    } else {
      if (this.ignoreCodes.indexOf(code) === -1) {
        e.preventDefault();

        // Account for Numpad keys
        if (code >= 96 && code <= 105) {
          code -= 48;
        }

        this.addCharacterAtCaret(String.fromCharCode(code));
      }
    }
  };

  /**
   * When the keypress event fires, validate.
   * @param {Object} e
   */


  Typeahead.prototype._onKeypress = function _onKeypress(e) {
    var code = e.keyCode || e.which;

    if (this.ignoreCodes.indexOf(code) === -1) {
      e.preventDefault();
      this.characters = this._parseCharacters(this.inputEl.value);
      this.run();
      (this.onChange || noop)(this.getValue(), this);
    }
  };

  /**
   * When the input event fires, validate. This happens
   * with a copy+paste.
   * @param {Object} e
   */


  Typeahead.prototype._onInput = function _onInput(e) {
    e.preventDefault();
    this.characters = this._parseCharacters(this.inputEl.value);
    this.run();
    (this.onInput || noop)(this.getValue(), this);
  };

  /**
   * When we focus, run the formatting.
   * @param {Object} e
   */


  Typeahead.prototype._onFocus = function _onFocus() {

    window.removeEventListener('blur', this._onBlurBound);
    window.addEventListener('blur', this._onBlurBound, false);
    this.inputEl.removeEventListener('blur', this._onBlurBound);
    this.inputEl.addEventListener('blur', this._onBlurBound, false);

    if (this.isFocused || this.pauseBlurFocus || this.isRunning) return;

    this.run();
    (this.onFocus || noop)(this.getValue(), this);
    this.isFocused = true;
    this._oldVal = this.inputEl.value;
  };

  /**
   * When we blur, if we have no characters, remove the placeholders.
   * @param {Object} e
   */


  Typeahead.prototype._onBlur = function _onBlur() {

    window.removeEventListener('blur', this._onBlurBound);
    this.inputEl.removeEventListener('blur', this._onBlurBound);

    this.isFocused = false;

    if (this.pauseBlurFocus || this.isRunning) return;

    this._emptyWhenOnlyPlaceholders();

    if (this._oldVal !== this.inputEl.value) {
      (0, _triggerEvent2.default)(this.inputEl, 'change');
    }

    (this.onBlur || noop)(this.getValue(), this);
  };

  /**
   * When the placeholder receives a click event, focus on the input. This happens in IE10 for some
   * reason that I cannot fully fathom, but it has something to do with the explicit width being
   * set on an empty element.
   * @param {Object} e
   */


  Typeahead.prototype._onPlaceholderClick = function _onPlaceholderClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputEl.focus();
  };

  /**
   * When we backspace, if we have no characters left let listeners know.
   * @param {Object} e
   */


  Typeahead.prototype._onBackspace = function _onBackspace() {
    if (!this._getCaretStart()) (this.onBackspace || noop)();
  };

  return Typeahead;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Typeahead.prototype._whitelistedParams = ['format', 'placeholder', 'matchPlaceholderSize', 'onChange', 'onFocus', 'onBlur', 'onInput', 'onBackspace', 'onEnd'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Typeahead.prototype.defaults = {
  el: null,
  inputEl: null,
  placeholderEl: null,
  placeholder: null,
  characters: null,
  format: null,
  ignoreCodes: [9, // Tab
  16, // Shift
  17, // Ctrl
  18, // Alt
  20, // CAPS
  91, // Meta
  93, // Alt
  112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 // F1-F12
  ],
  actionCodes: {
    BACKSPACE: 8,
    DELETE: 46,
    LEFT: 37,
    RIGHT: 39
  },
  pasteCode: 86, // v
  pauseBlurFocus: 0,
  matchPlaceholderSize: null,
  maxLength: null,
  isFocused: false,
  isRunning: false,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onInput: null,
  onBackspace: null,
  onEnd: null,
  _atEnd: false,
  _oldVal: null,
  _onKeydownBound: null,
  _onKeypressBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onPlaceholderClickBound: null
};

exports.default = Typeahead;
module.exports = exports['default'];


},{"../helpers/dom/parse-attribute":9,"../helpers/dom/trigger-event":12,"./base":1}],4:[function(require,module,exports){
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


},{"../dom/add-class":5,"../dom/has-class":6,"../dom/outer-height":8,"../dom/remove-class":10,"../dom/toggle-class":11}],5:[function(require,module,exports){
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


},{"../util/trim":15,"./has-class":6}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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


},{"../util/each":13}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Parse DOM attributes
 * Given an element and an attribute name, parse that attribute
 * if it exists or return a default.
 *
 * @module helpers/dom/parse-attribute.js
 */

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function boolean(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val === 'true' || val === '' ? true : false;
}

/**
 * Get the numeric value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function number(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return parseInt(val, 10);
}

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function string(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val;
}

exports.boolean = boolean;
exports.number = number;
exports.string = string;


},{}],10:[function(require,module,exports){
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


},{"../util/trim":15}],11:[function(require,module,exports){
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


},{"./add-class":5,"./has-class":6,"./remove-class":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Trigger Event
 * Trigger a DOM event on an element.
 *
 * @param {Element} el
 * @param {String} name
 *
 * @module helpers/dom/trigger-event.js
 */
function triggerEvent(el, name) {

  var event = void 0;

  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
    event.eventName = name;
    el.dispatchEvent(event);
  } else {
    event = document.createEventObject();
    event.eventType = name;
    event.eventName = name;
    el.fireEvent('on' + event.eventType, event);
  }
}

exports.default = triggerEvent;
module.exports = exports['default'];


},{}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
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


},{"./each":13}],15:[function(require,module,exports){
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


},{}],16:[function(require,module,exports){
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


},{"../helpers/animation/height":4}],17:[function(require,module,exports){
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

//# sourceMappingURL=text-input.js.map
