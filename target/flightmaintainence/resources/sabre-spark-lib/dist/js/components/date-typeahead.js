/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).DateTypeahead = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _typeahead = require('./typeahead');

var _typeahead2 = _interopRequireDefault(_typeahead);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # DateTypeahead
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Listen to an input element and format it as the user types.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new DateTypeahead(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/date-typeahead.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

function createDefaultElement() {
  var el = document.createElement('span');
  el.className = 'spark-input';
  return el;
}

var DateTypeahead = function (_BaseComponent) {
  _inherits(DateTypeahead, _BaseComponent);

  /**
   * DateTypeahead constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  function DateTypeahead(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DateTypeahead);

    // If only one arg passed, assume it was a parameters
    // object since the user MUST provide those but the element
    // is optional. Doing it this way to keep the arity the same
    // as other components.
    if (arguments.length < 2) {
      params = el || {};
      el = createDefaultElement();
    }

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    _this._bindEventListenerCallbacks();
    _this._createTypeahead(el, params);
    return _this;
  }

  /**
   * Get the value.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {Mixed}
   */


  DateTypeahead.prototype.getValue = function getValue(asInt) {
    return this.typeahead.getValue(asInt);
  };

  /**
   * Set the value.
   * @param {Mixed} val
   */


  DateTypeahead.prototype.setValue = function setValue(val) {
    return this.typeahead.setValue(val);
  };

  /**
   * Clear the value.
   */


  DateTypeahead.prototype.clearValue = function clearValue() {
    return this.typeahead.clearValue();
  };

  /**
   * Enable the input.
   */


  DateTypeahead.prototype.enable = function enable() {
    return this.typeahead.enable();
  };

  /**
   * Disable the input.
   */


  DateTypeahead.prototype.disable = function disable() {
    return this.typeahead.disable();
  };

  /**
   * Run the typeahead calculations.
   */


  DateTypeahead.prototype.run = function run() {
    return this.typeahead.run();
  };

  /**
   * Pause the typeahead events.
   */


  DateTypeahead.prototype.pause = function pause() {
    return this.typeahead.pause();
  };

  /**
   * Reseume typeahead events.
   */


  DateTypeahead.prototype.resume = function resume() {
    return this.typeahead.resume();
  };

  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateTypeahead.prototype.remove = function remove(leaveElement) {
    this.typeahead.remove(leaveElement);
    _BaseComponent.prototype.remove.call(this, leaveElement);
    return this;
  };

  /**
   * Cache elements.
   * @param {Element} el
   */


  DateTypeahead.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
  };

  /**
   * Parse parameters from the elements.
   */


  DateTypeahead.prototype._parseParams = function _parseParams() {

    this.type = this.type !== null ? this.type : (0, _parseAttribute.string)(this.el, 'data-type', 'day');
    this.format = this.format !== null ? this.format : (0, _parseAttribute.string)(this.el, 'data-format', null);
    this.placeholder = this.placeholder !== null ? this.placeholder : (0, _parseAttribute.string)(this.el, 'data-placeholder', null);
    this.len = this.len !== null ? this.len : (0, _parseAttribute.number)(this.el, 'length', null);
    this.ariaLabelPrefix = this.ariaLabelPrefix !== null ? this.ariaLabelPrefix : null;

    if (!this.placeholder) {
      throw new Error('You must provide a placeholder value for a DateTypeahead.');
    }

    if (this.len !== null) {
      this.format = this._lengthToFormat(this.len);
    }

    if (!this.format) {
      throw new Error('You must provide a format value for a DateTypeahead.');
    }
  };

  /**
   * Create a typeahead with the given format.
   * @param {Object} el
   */


  DateTypeahead.prototype._createTypeahead = function _createTypeahead(el) {

    this.typeahead = new _typeahead2.default(el, {
      placeholder: this.placeholder,
      format: this.format,
      matchPlaceholderSize: true,
      onChange: this._onTypeaheadChangeBound,
      onInput: this._onTypeaheadInputBound,
      onFocus: this._onTypeaheadFocusBound,
      onBlur: this._onTypeaheadBlurBound,
      onBackspace: this._onTypeaheadBackspaceBound,
      onEnd: this._onTypeaheadEndBound
    });

    // Ensure we have an ARIA label
    var input = el.querySelector('input');
    if (input && !input.getAttribute('aria-label')) {
      input.setAttribute('aria-label', this.ariaLabelPrefix + ' ' + this.type);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  DateTypeahead.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onTypeaheadChangeBound = this._onTypeaheadChange.bind(this);
    this._onTypeaheadInputBound = this._onTypeaheadInput.bind(this);
    this._onTypeaheadFocusBound = this._onTypeaheadFocus.bind(this);
    this._onTypeaheadBlurBound = this._onTypeaheadBlur.bind(this);
    this._onTypeaheadBackspaceBound = this._onTypeaheadBackspace.bind(this);
    this._onTypeaheadEndBound = this._onTypeaheadEnd.bind(this);
  };

  /**
   * Take a length and return a format string with that many digits.
   * @param {Number} length
   * @return {String}
   */


  DateTypeahead.prototype._lengthToFormat = function _lengthToFormat(length) {

    var i = 0;
    var ret = '';

    for (; i < length; i++) {
      ret += '\\d';
    }

    return ret;
  };

  /**
   * Check to see if an input value is valid.
   * @param {Mixed} val
   * @param {Boolean} allowEmpty All the value to be empty instead of 0.
   */


  DateTypeahead.prototype._checkValidity = function _checkValidity(val, allowEmpty) {

    val = parseInt(val, 10);

    var origVal = val;
    var isNumber = !isNaN(val);

    // If we were passed an empty string or something, don't try to validate.
    // Treat zeros as a non-entry for days and months.
    if (isNumber) {

      if (this.type === 'year') {
        val = val === 0 ? allowEmpty ? '' : 0 : Math.max(val, 0);
      } else if (this.type === 'month') {
        val = val ? Math.min(Math.max(val, 1), 12) : allowEmpty ? '' : 0;
      } else {
        val = val ? Math.min(Math.max(val, 1), 31) : allowEmpty ? '' : 0;
      }
    }

    // Need to make sure we aren't looping forever on these updates.
    if (isNumber && val !== origVal) {
      this.typeahead.setValue(val + '');
      return false;
    }

    return true;
  };

  /**
   * When the typeahead changes, make sure the value is valid. This
   * is very basic validation. More complex validation like the number
   * of days in a specific month should be handled by the callback.
   * And run our callback.
   * @param {String} val The value of the input
   * @param {String} oldVal The previous value
   */


  DateTypeahead.prototype._onTypeaheadChange = function _onTypeaheadChange(val) {
    if (this._checkValidity(val)) {
      (this.onChange || noop)(val, this);
    }
  };

  /**
   * Callback for `input` event
   * @param {String} val The value of the input
   * @param {String} oldVal The previous value
   *
   */


  DateTypeahead.prototype._onTypeaheadInput = function _onTypeaheadInput(val) {
    (this.onInput || noop)(val, this);
  };

  /**
   * When the typeahead gains focus, let anyone who is interested know.
   * @param {String} val
   */


  DateTypeahead.prototype._onTypeaheadFocus = function _onTypeaheadFocus(val) {
    (this.onFocus || noop)(val, this);
  };

  /**
   * When the typeahead loses focus, let anyone who is interested know.
   * @param {String} val
   */


  DateTypeahead.prototype._onTypeaheadBlur = function _onTypeaheadBlur(val) {
    this._checkValidity(val, true);
    (this.onBlur || noop)(val, this);
  };

  /**
   * When the typeahead fires a backspace event because it's empty and
   * the user is hitting backspace, let anyone who is interested know.
   * @param {String} val
   */


  DateTypeahead.prototype._onTypeaheadBackspace = function _onTypeaheadBackspace(val) {
    (this.onBackspace || noop)(val, this);
  };

  /**
   * When the typeahead is full and at its end, let anyone who is interested know.
   * @param {Object} typeahead
   * @param {String} character Optional The character to pass to the next input.
   */


  DateTypeahead.prototype._onTypeaheadEnd = function _onTypeaheadEnd(typeahead, character) {
    (this.onEnd || noop)(this, character);
  };

  return DateTypeahead;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


DateTypeahead.prototype._whitelistedParams = ['type', 'format', 'ariaLabelPrefix', 'placeholder', 'len', 'onChange', 'onInput', 'onFocus', 'onBlur', 'onBackspace', 'onEnd'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
DateTypeahead.prototype.defaults = {
  el: null,
  type: null,
  ariaLabelPrefix: null,
  typeahead: null,
  format: null,
  placeholder: null,
  len: null,
  onChange: null,
  onInput: null,
  onFocus: null,
  onBlur: null,
  onBackspace: null,
  onEnd: null,
  _onTypeaheadChangeBound: null,
  _onTypeaheadInputBound: null,
  _onTypeaheadFocusBound: null,
  _onTypeaheadBlurBound: null,
  _onTypeaheadBackspaceBound: null,
  _onTypeaheadEndBound: null
};

exports.default = DateTypeahead;
module.exports = exports['default'];


},{"../helpers/dom/parse-attribute":4,"./base":1,"./typeahead":3}],3:[function(require,module,exports){
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


},{"../helpers/dom/parse-attribute":4,"../helpers/dom/trigger-event":5,"./base":1}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
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


},{}],6:[function(require,module,exports){
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


},{}]},{},[2])(2)
});

//# sourceMappingURL=date-typeahead.js.map
