/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).DateInput = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":20}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _dateTypeahead = require('./date-typeahead');

var _dateTypeahead2 = _interopRequireDefault(_dateTypeahead);

var _dateSelect = require('./date-select');

var _dateSelect2 = _interopRequireDefault(_dateSelect);

var _parseFormat = require('../helpers/date/parse-format');

var _parseFormat2 = _interopRequireDefault(_parseFormat);

var _pad = require('../helpers/util/pad');

var _pad2 = _interopRequireDefault(_pad);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _appendChildren = require('../helpers/manipulation/append-children');

var _appendChildren2 = _interopRequireDefault(_appendChildren);

var _triggerEvent = require('../helpers/dom/trigger-event');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _copyAttributes = require('../helpers/manipulation/copy-attributes');

var _copyAttributes2 = _interopRequireDefault(_copyAttributes);

var _date = require('../helpers/date/date');

var _date2 = _interopRequireDefault(_date);

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

var _parseAttribute = require('../helpers/dom/parse-attribute');

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # DateInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A date input container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new DateInput(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Callback for when the input value changes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onChange(value, inputInstance) {}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/date-input.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var domDateFormat = 'YYYY-MM-DD';
var parsedDomFormat = (0, _parseFormat2.default)(domDateFormat);
var noop = function noop() {};

var DateInput = function (_Base) {
  _inherits(DateInput, _Base);

  /**
   * DateInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function DateInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DateInput);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _Base.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._convertLabel();
    _this._initializeInputs();
    _this._updateClass();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Show the input by adding the active state and setting character counts (if necessary).
   */


  DateInput.prototype.show = function show() {

    if (!this.isActive) {
      this._runTypeaheads();
      this.isActive = true;
      this._updateClass();
    }

    return this;
  };

  /**
   * Hide the input by removing the active state.
   */


  DateInput.prototype.hide = function hide() {
    if (!this.isActive) return this;
    this.isActive = false;
    this._updateClass();
    return this;
  };

  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateInput.prototype.remove = function remove(leaveElement) {

    this._removeTypeaheads(leaveElement);
    this._removeSelects(leaveElement);
    this._removeInputPieces();

    _Base.prototype.remove.call(this, leaveElement);

    return this;
  };

  /**
   * Given an object with day, month and year, set the value of the input.
   * @param {Object} values
   */


  DateInput.prototype.setValue = function setValue(values) {

    values = values || {
      day: '',
      month: '',
      year: ''
    };
    var i = void 0;
    var hadValue = void 0;

    for (i in this.typeaheads) {
      if (values[i] !== undefined) {
        this.typeaheads[i].setValue(values[i]);
        hadValue = hadValue || (values[i] ? true : false);
      }
    }

    for (i in this.selects) {
      if (values[i] !== undefined) {
        this.selects[i].setValue(values[i]);
        hadValue = hadValue || (values[i] ? true : false);
      }
    }

    if (!this.isActive && hadValue) {
      this.isActive = true;
    }

    this._padTypeaheads();
    this._updateClass();
    this.updateInput();

    return this;
  };

  /**
   * Get the value of the input.
   * @return {String}
   */


  DateInput.prototype.getValue = function getValue() {
    return this.inputEl.value;
  };

  /**
   * Clear the values.
   */


  DateInput.prototype.clearValue = function clearValue() {

    (0, _each2.default)(this.isTypeahead ? this.typeaheads : this.selects, function (k, v) {
      v.clearValue();
    });

    this.inputEl.value = '';

    return this;
  };

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */


  DateInput.prototype.setErrorState = function setErrorState(opt) {
    if (opt) {
      this.el.setAttribute('data-error', '');
    } else {
      this.el.removeAttribute('data-error');
    }
  };

  /**
   * Enable the inputs
   */


  DateInput.prototype.enable = function enable() {

    (0, _each2.default)(this.isTypeahead ? this.typeaheads : this.selects, function (k, v) {
      v.enable();
    });

    this.inputEl.removeAttribute('disabled');

    (0, _toggleClass2.default)(this.el, 'disabled', false);

    return this;
  };

  /**
   * Clear the values.
   */


  DateInput.prototype.disable = function disable() {

    (0, _each2.default)(this.isTypeahead ? this.typeaheads : this.selects, function (k, v) {
      v.disable();
    });

    this.inputEl.setAttribute('disabled', '');

    (0, _toggleClass2.default)(this.el, 'disabled', true);

    return this;
  };

  /**
   * Update the input values to match the typeaheads.
   */


  DateInput.prototype.updateInput = function updateInput() {

    var inputs = void 0;

    if (this.isTypeahead && this.typeaheads) {
      inputs = this.typeaheads;
    } else if (this.isSelect) {
      inputs = this.selects;
    }

    if (inputs) {

      var day = inputs.day && inputs.day.getValue(true) || 0;
      var month = inputs.month && inputs.month.getValue(true) || 0;
      var year = inputs.year && inputs.year.getValue(true) || 0;

      var val = this.inputEl.value;

      this.inputEl.value = [day, month, year].indexOf(0) === -1 ? (0, _pad2.default)(year, 4) + '-' + (0, _pad2.default)(month, 2) + '-' + (0, _pad2.default)(day, 2) : '';

      if (val !== this.inputEl.value) {
        this._pauseInputChange = true;
        (0, _triggerEvent2.default)(this.inputEl, 'change');
        (this.onChange || noop)(this.inputEl.value, this);
        this._pauseInputChange = false;
      }
    }

    this.currValue = this.inputEl.value;

    return this;
  };

  /**
   * Get current typing value
   *
   */


  DateInput.prototype.getTypingValue = function getTypingValue() {

    var inputs = void 0;
    var result = '';

    if (this.isTypeahead && this.typeaheads) {
      inputs = this.typeaheads;
    } else if (this.isSelect) {
      inputs = this.selects;
    }

    if (inputs) {

      var day = inputs.day && inputs.day.getValue(true);
      var month = inputs.month && inputs.month.getValue(true);
      var year = inputs.year && inputs.year.getValue(true);

      result = month.toString() + day.toString() + year.toString();
    }

    return result;
  };

  /**
   * Move the focus to a typeahead element.
   * @param {Number} i
   * @param {String} character Optional A character to add
   */


  DateInput.prototype.focus = function focus(i, character) {

    if (!this.isActive || !this.inFocus) {
      return this;
    }

    var index = this.typeaheadEls.indexOf(this.inFocus.typeahead.el);
    var sib = this.typeaheadEls[index + i];
    var typeahead = void 0;

    // If we were passed a character to prepend, find the typeahead for this element
    if (character) {
      typeahead = this._getTypeaheadByElement(sib);
      if (typeahead) {
        typeahead.typeahead.addCharacterAtIndex(character, 0);
      }
    }

    if (!sib) {
      return false;
    }

    var sibInput = sib.querySelector('input');

    if (sibInput) {
      sibInput.focus();

      // If we have a typeahead (because we needed to prepend a character), move the caret.
      if (typeahead) {
        typeahead.typeahead.moveCaret(1);
      }
    }

    return this;
  };

  /**
   * Move the focus to the next element.
   * @param {String} character Optional A character to add
   */


  DateInput.prototype.focusNext = function focusNext(character) {

    if (this.focus(1, character)) {
      if (this.inFocus && !character) this.inFocus.typeahead.moveCaretToStart();
    }

    return this;
  };

  /**
   * Move the focus to the next element.
   * @param {String} character Optional A character to add
   */


  DateInput.prototype.focusPrevious = function focusPrevious(character) {

    if (this.focus(-1, character)) {
      if (this.inFocus) this.inFocus.typeahead.moveCaretToEnd();
    }

    return this;
  };

  /**
   * Do we have any values?
   * @return {Boolean}
   */


  DateInput.prototype.hasPartialValue = function hasPartialValue() {

    var i = void 0;

    for (i in this.typeaheads) {
      if (this.typeaheads[i].getValue()) {
        return true;
      }
    }

    for (i in this.selects) {
      if (this.selects[i].getValue()) {
        return true;
      }
    }

    return false;
  };

  /**
   * Resize the elements, to account for any changed display property.
   * @param {Element} el Optional
   */


  DateInput.prototype.update = function update(el) {

    if (el) {

      this._removeTypeaheads();
      this._removeSelects();
      this._removeInputPieces();

      this._removeEventListeners();

      this._cacheElements(el);
      this._convertLabel();
      this._initializeInputs();
      this._updateClass();

      this._addEventListeners();
    } else {
      this._runTypeaheads();
    }

    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  DateInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.inputEl = this.el.querySelector('[type="date"]');
    this.inputLabel = this.el.querySelector('.spark-label').innerHTML;
    this.selectLabelPrefix = this.el.querySelector('.spark-label').getAttribute('id');

    if (!this.inputEl) {
      throw new Error('No <input type="date"> element present in date input container!', this.el);
    }

    this.toggleEl = this.el.querySelector('.spark-date__toggle');

    this.messageEl = this.el.querySelector('.spark-input__message') || (0, _makeElement2.default)('<span class="spark-input__message"></span>');
  };

  /**
   * Parse parameters from the elements.
   */


  DateInput.prototype._parseParams = function _parseParams() {

    this.isActive = this.isActive !== null ? this.isActive : this.inputEl.value ? true : false;
    this.isSelect = this.isSelect !== null ? this.isSelect : (0, _hasClass2.default)(this.el, 'spark-date--select') ? true : false;
    this.isTypeahead = this.isTypeahead !== null ? this.isTypeahead : !this.isSelect ? true : false;
    this.format = this.format !== null ? this.format : (0, _parseAttribute.string)(this.inputEl, 'data-format', 'MM-DD-YYYY');
    this.textFormat = this.textFormat !== null ? this.textFormat : (0, _parseAttribute.string)(this.inputEl, 'data-text-format', 'MM DD YYYY');
    this.showDateAsText = this.showDateAsText !== null ? this.showDateAsText : (0, _parseAttribute.boolean)(this.inputEl, 'data-show-date-as-text', false);

    this.parsedFormat = (0, _parseFormat2.default)(this.format);
    this.parsedTextFormat = (0, _parseFormat2.default)(this.textFormat);
    this.min = this.min !== null ? this.min : this.inputEl.getAttribute('min');
    this.max = this.max !== null ? this.max : this.inputEl.getAttribute('max');
    this.min = this.min && parsedDomFormat.getValues(this.min);
    this.max = this.max && parsedDomFormat.getValues(this.max);

    this.currValue = this.inputEl.value !== null ? this.inputEl.value : null;
  };

  /**
   * Setup the proper inputs. This could mean creating a typeahead, or creating selects.
   */


  DateInput.prototype._initializeInputs = function _initializeInputs() {

    if (this.isTypeahead) {
      this._initializeInputPieces();
      this._runTypeaheads();
    } else if (this.isSelect) {
      (0, _removeClass2.default)(this.el, 'spark-input');
      this._initializeInputPieces();
    }
  };

  /**
   * Replace the date input with a group of typeaheads or select inputs.
   * Keep the date input around and store the typeahead data in there in an ISO date format.
   */


  DateInput.prototype._initializeInputPieces = function _initializeInputPieces() {

    // Hide the original element. This will be updated as the typeahead values change
    this.inputEl.style.display = 'none';

    var els = [];
    var label = void 0;

    // Create a new typeahead for each part of the parsed format. Also add placeholder elements.
    this.parsedFormat.parts.forEach(function (part) {
      // Something weird with Node that makes us have to specify what `this` is here.
      (this.isTypeahead ? this._initializeTypeaheadPiece : this._initializeSelectPiece).call(this, els, part);
    }.bind(this));

    // Create a holder for all the pieces
    this.piecesEl = document.createElement('span');
    this.piecesEl.className = this.isTypeahead ? 'spark-input__fields' : 'spark-select-group';

    // Add all the necessary elements
    (0, _appendChildren2.default)(this.piecesEl, els);

    // If this is a select group, move the label element.
    if (this.isSelect && (label = this.el.querySelector('.spark-label'))) {
      this.piecesEl.appendChild(label);
    }

    // Add the pieces holder
    this.el.insertBefore(this.piecesEl, this.inputEl);

    // Set the value
    if (this.inputEl.value) {
      this.setValue(parsedDomFormat.getValues(this.inputEl.value));
      this.isActive = true;
    }
  };

  /**
   * Remove the input pieces.
   */


  DateInput.prototype._removeInputPieces = function _removeInputPieces() {

    this.inputEl.style.display = '';

    // Remove elements we inserted into the DOM
    if (this.piecesEl) {
      this.piecesEl.parentNode.removeChild(this.piecesEl);
    }
  };

  /**
   * Remove typeaheads.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateInput.prototype._removeTypeaheads = function _removeTypeaheads(leaveElement) {

    // Remove typeaheads
    if (this.typeaheads) {
      for (var i in this.typeaheads) {
        this.typeaheads[i].remove(leaveElement);
      }
    }
  };

  /**
   * Remove selects.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateInput.prototype._removeSelects = function _removeSelects(leaveElement) {

    var label = void 0;

    // Remove selects
    if (this.selects) {

      for (var i in this.selects) {
        this.selects[i].remove(leaveElement);
      }

      // If this is a select group, move the label element.
      if (label = this.piecesEl.querySelector('.spark-label')) {
        this.el.appendChild(label);
      }

      (0, _addClass2.default)(this.el, 'spark-input');
    }
  };

  /**
   * Create a typeahead or placeholder piece.
   * @param {Array} els
   * @param {Object} part
   */


  DateInput.prototype._initializeTypeaheadPiece = function _initializeTypeaheadPiece(els, part) {

    this.typeaheads = this.typeaheads || {};
    this.typeaheadEls = this.typeaheadEls || [];

    var el = void 0;

    switch (part.name) {
      case 'day':
      case 'month':
      case 'year':
        this.typeaheads[part.name] = new _dateTypeahead2.default({
          type: part.name,
          ariaLabelPrefix: this.inputLabel,
          len: part.length,
          placeholder: part.value,
          onFocus: this._onTypeaheadFocusBound,
          onBlur: this._onTypeaheadBlurBound,
          onChange: this._onPieceChangeBound,
          onInput: this._onTypeaheadInputBound,
          onBackspace: this._onTypeaheadBackspaceBound,
          onEnd: this._onTypeaheadEndBound
        });
        el = this.typeaheads[part.name].typeahead.el;
        this.typeaheadEls.push(el);
        break;
      default:
        el = document.createElement('span');
        el.innerHTML = part.value;
        el.className = 'spark-input__divider';
        break;
    }

    els.push(el);
  };

  /**
   * Replace the date input with three date dropdowns. Keep the date input around and store the
   * select data in there.
   */


  DateInput.prototype._initializeSelectPiece = function _initializeSelectPiece(els, part) {

    this.selects = this.selects || {};
    this.selectEls = this.selectEls || [];

    if (['day', 'month', 'year'].indexOf(part.name) === -1) {
      return;
    }

    var el = void 0;

    switch (part.name) {
      case 'day':
      case 'month':
        this.selects[part.name] = new _dateSelect2.default({
          type: part.name,
          ariaLabelPrefix: this.selectLabelPrefix,
          onChange: this._onPieceChangeBound
        });
        el = this.selects[part.name].select.el;
        break;
      case 'year':
        {
          var minYear = this.inputEl.min ? parsedDomFormat.getValues(this.inputEl.min).year : null;
          var maxYear = this.inputEl.max ? parsedDomFormat.getValues(this.inputEl.max).year : null;

          this.selects[part.name] = new _dateSelect2.default({
            min: minYear,
            max: maxYear,
            type: part.name,
            ariaLabelPrefix: this.selectLabelPrefix,
            onChange: this._onPieceChangeBound
          });
          el = this.selects[part.name].select.el;
          break;
        }
    }

    els.push(el);
    this.selectEls.push(el);
  };

  /**
   * If our element is a label, convert it to a div so that
   * we are semantically correct. Can't have more than one
   * input inside of a label!
   */


  DateInput.prototype._convertLabel = function _convertLabel() {

    if (this.isTypeahead || this.el.nodeName.toLowerCase() !== 'label') {
      return;
    }

    var newEl = document.createElement('fieldset');

    (0, _copyAttributes2.default)(this.el, newEl);
    (0, _appendChildren2.default)(newEl, this.el.children);

    if (this.el.parentNode) {
      this.el.parentNode.replaceChild(newEl, this.el);
    }

    this.el = newEl;
  };

  /**
   * Validate the date values.
   */


  DateInput.prototype._validate = function _validate() {

    if (this.isTypeahead) {
      this._validateTypeaheads();
    } else if (this.isSelect) {
      this._validateSelects();
    }
  };

  /**
   * Validate the typeahead values.
   */


  DateInput.prototype._validateTypeaheads = function _validateTypeaheads() {

    if (!this.typeaheads) {
      return;
    }

    var month = this.typeaheads.month ? this.typeaheads.month.getValue(true) : null;
    var year = this.typeaheads.year ? this.typeaheads.year.getValue(true) : null;
    var day = this.typeaheads.day ? this.typeaheads.day.getValue(true) : null;
    var maxDay = void 0;

    if (this.format === 'DD-MM-YYYY') {
      var selectedDate = new Date(this.inputEl.value); // this is in format YYYY-MM-DD
      var selectedMonth = selectedDate.getMonth() + 1;

      if (month === null || month === '') {
        maxDay = this._getMaxDaysInMonth(selectedMonth);
      } else {
        var oldVal = new Date(this.currValue);
        var oldMonth = oldVal.getMonth() + 1;

        if (selectedMonth !== oldMonth) {
          maxDay = this._getMaxDaysInMonth(selectedMonth);
        } else {
          maxDay = month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate() || this._getMaxDaysInMonth(month);
        }
      }
    } else {
      maxDay = month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate() || this._getMaxDaysInMonth(month);
    }

    if (maxDay < day) {
      this.typeaheads.day.setValue(maxDay);
      this.updateInput();
    }
  };

  /**
   * Validate the boundaries of the typeahead values relative to the min and max values.
   */


  DateInput.prototype._validateTypeaheadBounds = function _validateTypeaheadBounds() {

    var year = this.typeaheads.year ? this.typeaheads.year.getValue(true) : null;
    var month = this.typeaheads.month ? this.typeaheads.month.getValue(true) : null;
    var day = this.typeaheads.day ? this.typeaheads.day.getValue(true) : null;

    if (!year || !month || !day) {
      return;
    }

    var date = new Date(year, month - 1, day);
    var set = '';

    if (this.min && date < new Date(this.min.year, this.min.month - 1, this.min.day)) {
      set = 'min';
    } else if (this.max && date > new Date(this.max.year, this.max.month - 1, this.max.day)) {
      set = 'max';
    }

    if (set) {
      this.typeaheads.year.setValue((0, _pad2.default)(this[set].year, this.typeaheads.year.typeahead.format.length));
      this.typeaheads.month.setValue((0, _pad2.default)(this[set].month, this.typeaheads.month.typeahead.format.length));
      this.typeaheads.day.setValue((0, _pad2.default)(this[set].day, this.typeaheads.day.typeahead.format.length));
      this.updateInput();
    }
  };

  /**
   * Pad the typeahead input values.
   */


  DateInput.prototype._padTypeaheads = function _padTypeaheads() {

    if (this._pauseInputChange) return;

    this._pauseInputChange = true;

    for (var i in this.typeaheads) {
      this._padTypeahead(this.typeaheads[i]);
    }

    this._pauseInputChange = false;
  };

  /**
   * Pad the typeahead input values.
   * @param {Typeahead} typeahead
   */


  DateInput.prototype._padTypeahead = function _padTypeahead(typeahead) {

    var value = typeahead.getValue();

    if (value) {
      var padded = (0, _pad2.default)(value, typeahead.typeahead.format.length);
      if (value !== padded) typeahead.setValue((0, _pad2.default)(value, typeahead.typeahead.format.length));
    }
  };

  /**
   * Do any of the typeaheads have a value?
   * @return {Boolean}
   */


  DateInput.prototype._hasTypeaheadValue = function _hasTypeaheadValue() {

    for (var i in this.typeaheads) {
      if (this.typeaheads[i].getValue(true)) {
        return true;
      }
    }

    return false;
  };

  /**
   * Validate select input values.
   */


  DateInput.prototype._validateSelects = function _validateSelects() {

    if (!this.selects) {
      return;
    }

    var month = this.selects.month ? this.selects.month.getValue(true) : null;
    var year = this.selects.year ? this.selects.year.getValue(true) : null;

    var maxDay = month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate() || this._getMaxDaysInMonth(month);
    var day = this.selects.day ? this.selects.day.getValue(true) : null;

    this.selects.day.setOptions({
      max: maxDay
    });
    if (maxDay < day) {
      this.selects.day.setValue(maxDay);
    }

    this.updateInput();
  };

  /**
   * Get the maximum number of days for a given month.
   * @param {Number} month The month's number. 1-12.
   * @return {Number} The maximum number of days. 28-31.
   */


  DateInput.prototype._getMaxDaysInMonth = function _getMaxDaysInMonth(month) {
    if (month === 2) return 29;else if ([4, 6, 9, 11].indexOf(month) !== -1) return 30;
    return 31;
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because them.
   */


  DateInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onTypeaheadBlurBound = this._onTypeaheadBlur.bind(this);
    this._onTypeaheadInputBound = this._onTypeaheadInput.bind(this);
    this._onTypeaheadFocusBound = this._onTypeaheadFocus.bind(this);
    this._onPieceChangeBound = this._onPieceChange.bind(this);
    this._onTypeaheadBackspaceBound = this._onTypeaheadBackspace.bind(this);
    this._onTypeaheadEndBound = this._onTypeaheadEnd.bind(this);
    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onVisibleChildrenBound = this._onVisibleChildren.bind(this);
  };

  /**
   * Add event listeners.
   */


  DateInput.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.inputEl.addEventListener('change', this._onInputChangeBound);
    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  };

  /**
   * Remove event listeners.
   */


  DateInput.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.inputEl.removeEventListener('change', this._onInputChangeBound);
    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  };

  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */


  DateInput.prototype._onVisibleChildren = function _onVisibleChildren(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this.update();
      }.bind(this), 0);
    }
  };

  /**
   * Run all typeaheads so they have placeholder values.
   */


  DateInput.prototype._runTypeaheads = function _runTypeaheads() {

    // Make sure we don't get into an infinite loop. Even though the logic
    // in the typeaheads should be stopping this from happening, there is
    // something in Safari where the focus and blur events fire in different
    // order than other browsers so those failsafes do not work.
    if (this.runningTypeaheads) {
      return;
    }

    this.runningTypeaheads = true;

    if (this.inFocus) {
      this.inFocus.pause();
    }

    for (var i in this.typeaheads) {
      if (this.typeaheads[i] !== this.inFocus) {
        this.typeaheads[i].run();
      }
    }

    if (this.inFocus) {
      this.inFocus.resume();
      this.inFocus.run();
    }

    this.runningTypeaheads = false;
  };

  /**
   * Update the active and focus classes.
   */


  DateInput.prototype._updateClass = function _updateClass() {
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
    (0, _toggleClass2.default)(this.el, 'has-partial-value', this.hasPartialValue());
    (0, _toggleClass2.default)(this.el, 'focus', this.inFocus ? true : false);
  };

  /**
   * Get the typeahead that corresponds to the given element.
   * @param {Element} el
   * @return {Object}
   */


  DateInput.prototype._getTypeaheadByElement = function _getTypeaheadByElement(el) {
    for (var i in this.typeaheads) {
      if (this.typeaheads[i].typeahead.el === el) {
        return this.typeaheads[i];
      }
    }
  };

  /**
   * Show the date as text.
   */


  DateInput.prototype._showDateText = function _showDateText() {

    var text = this._getDateText();

    if (!text || !this.showDateAsText) {
      return;
    }

    if (!this.dateTextEl) {
      this._createDateTextEl();
    }

    this.dateTextEl.innerHTML = text;
    this.dateTextEl.style.display = '';
  };

  /**
   * Hide the date as text.
   */


  DateInput.prototype._hideDateText = function _hideDateText() {

    if (!this.showDateAsText || !this.dateTextEl) {
      return;
    }

    this.dateTextEl.style.display = 'none';
  };

  /**
   * Create the date text element.
   */


  DateInput.prototype._createDateTextEl = function _createDateTextEl() {

    var el = document.createElement('div');
    el.className = 'spark-input__overlay';
    el.style.display = 'none';

    this.el.appendChild(el);
    this.dateTextEl = el;
  };

  /**
   * Get the date as text.
   */


  DateInput.prototype._getDateText = function _getDateText() {

    var parts = this.parsedTextFormat.parts;
    var i = 0;
    var len = parts.length;
    var str = '';
    var isValid = true;
    var val;

    for (; i < len; i++) {

      val = this.typeaheads[parts[i].name] && this.typeaheads[parts[i].name].getValue();

      switch (parts[i].name) {
        case 'month':
          str += _date2.default.getMonthNameShort(val);
          if (!val) {
            isValid = false;
            break;
          }
          break;
        case 'day':
        case 'year':
          str += val;
          if (!val) {
            isValid = false;
            break;
          }
          break;
        default:
          str += parts[i].value;
          break;
      }
    }

    return isValid ? str : false;
  };

  /**
   * When the value of a typeahead or select changes, validate.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onPieceChange = function _onPieceChange() {

    this._validate();

    if (this.isTypeahead && this.showDateAsText && !this._hasFocus) {

      if (this._showTextTimer) {
        clearTimeout(this._showTextTimer);
      }

      this._showTextTimer = setTimeout(function () {
        this._showDateText();
      }.bind(this), 0);
    }
  };

  /**
   * When the typeahead gains focus.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onTypeaheadFocus = function _onTypeaheadFocus(val, typeahead) {

    if (this.runningTypeaheads) return;

    this._hideDateText();

    if (!this._hasFocus) {
      this._hasFocus = true;
      (this.onFocus || noop)(this.inputEl.value, this);
    }

    (0, _triggerEvent2.default)(this.inputEl, 'focus');
    this.inFocus = typeahead;
    this.show();
    this._updateClass();

    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }
  };

  /**
   * When the typeahead loses focus, make sure numbers are padded properly.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onTypeaheadBlur = function _onTypeaheadBlur(val, typeahead) {

    if (this.runningTypeaheads) return;

    this.inFocus = null;

    this._padTypeahead(typeahead);
    this.updateInput();
    this._updateClass();

    if (!this.inputEl.value && !this._hasTypeaheadValue()) {
      this.hide();
    } else {
      this._validateTypeaheadBounds();
    }

    this._blurTimer = setTimeout(function () {
      this._hasFocus = false;
      (this.onBlur || noop)(this.inputEl.value, this);
      this._showDateText();
    }.bind(this), 1);
  };

  /**
   * `input` event callback for typeahead
   */


  DateInput.prototype._onTypeaheadInput = function _onTypeaheadInput() {
    (this.onInput || noop)(this.getTypingValue(), this);
  };

  /**
   * When the typeahead fires a backspace event, move back to the previous input.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onTypeaheadBackspace = function _onTypeaheadBackspace() {
    this.focusPrevious();
  };

  /**
   * When the typeahead is at its maximum length and the caret is at the end,
   * focus on the next input field.
   * @param {Object} typeahead
   * @param {String} character Optional
   */


  DateInput.prototype._onTypeaheadEnd = function _onTypeaheadEnd(typeahead, character) {
    this.focusNext(character);
  };

  /**
   * When the input that corresponds to this instance changes. Allows us to listen
   * and respond to changes made by other components (Calendar Popover, for example).
   * @param {Object} e
   */


  DateInput.prototype._onInputChange = function _onInputChange(e) {

    if (this.isTypeahead) {
      this.isActive = e.target.value ? true : false;
      this._updateClass();
    }

    if (this._pauseInputChange) return;
    this.setValue(parsedDomFormat.getValues(e.target.value));
    (this.onChange || noop)(this.inputEl.value, this);
  };

  /**
   * When the input group is clicked, focus on the first typeahead
   * if we don't already have focus.
   * @todo : we should still replace the label on typeaheads and use this,
   * but we need a way to focus on the closest element to a click.
   * @param {Object} e
   */


  DateInput.prototype._onClick = function _onClick() /*e*/{

    /*if (this.isTypeahead || this.inFocus || this.isActive || getParent(e.target, '.spark-input__addon')) {
      return;
    }
     let input = this.typeaheadEls[0].querySelector('input');
     if (input) {
      input.focus();
    }*/
  };

  return DateInput;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


DateInput.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange', 'onInput', 'onFocus', 'onBlur', 'isTypeahead', 'isSelect', 'format', 'textFormat', 'showDateAsText', 'min', 'max'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
DateInput.prototype.defaults = {
  el: null,
  inputEl: null,
  messageEl: null,
  piecesEl: null,
  toggleEl: null,
  inFocus: null,
  isActive: null,
  isSelect: null,
  isTypeahead: null,
  typeaheads: null,
  typeaheadEls: null,
  selects: null,
  selectEls: null,
  format: null,
  parsedFormat: null,
  showDateAsText: null,
  textFormat: null,
  runningTypeaheads: false,
  onValidate: null,
  onChange: null,
  onInput: null,
  onFocus: null,
  onBlur: null,
  _hasFocus: false,
  _pauseInputChange: false,
  _onClickBound: null,
  _onPieceChangeBound: null,
  _onTypeaheadFocusBound: null,
  _onTypeaheadBlurBound: null,
  _onTypeaheadInputBound: null,
  _onTypeaheadBackspaceBound: null,
  _onTypeaheadEndBound: null,
  _onInputChangeBound: null
};

(0, _mixin2.default)(DateInput.prototype, _messaging2.default, _validation2.default);

exports.default = DateInput;
module.exports = exports['default'];


},{"../helpers/date/date":8,"../helpers/date/parse-format":9,"../helpers/dom/add-class":10,"../helpers/dom/has-class":11,"../helpers/dom/make-element":12,"../helpers/dom/parse-attribute":14,"../helpers/dom/remove-class":15,"../helpers/dom/toggle-class":16,"../helpers/dom/trigger-event":17,"../helpers/manipulation/append-children":18,"../helpers/manipulation/copy-attributes":19,"../helpers/util/each":20,"../helpers/util/mixin":21,"../helpers/util/pad":22,"../mixins/messaging":24,"../mixins/validation":25,"./base":1,"./date-select":3,"./date-typeahead":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _selectInput = require('./select-input');

var _selectInput2 = _interopRequireDefault(_selectInput);

var _date = require('../helpers/date/date');

var _date2 = _interopRequireDefault(_date);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # DateSelect
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Create a select list of days, months or years.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new DateSelect(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/date-select.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

function createDefaultElement() {
  var el = document.createElement('span');
  el.className = 'spark-select';
  el.innerHTML = '<select class="spark-select__input"></select><span class="spark-label"></span>';
  return el;
}

var DateSelect = function (_BaseComponent) {
  _inherits(DateSelect, _BaseComponent);

  /**
   * DateSelect constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  function DateSelect(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DateSelect);

    // If the first argument is a plain object, create a default element
    // since the user MUST provide additional params but the element
    // is optional. Doing it this way to keep the arity the same
    // as other components.
    if (!(el instanceof HTMLElement)) {
      params = el || {};
      el = createDefaultElement();
    }

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    _this._bindEventListenerCallbacks();
    _this._createSelect(el);
    return _this;
  }

  /**
   * Get the value.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {Mixed}
   */


  DateSelect.prototype.getValue = function getValue(asInt) {
    return asInt ? parseInt(this.select.getValue(), 10) : this.select.getValue();
  };

  /**
   * Set the value.
   * @param {Mixed} val
   */


  DateSelect.prototype.setValue = function setValue(val) {
    return this.select.setValue(val);
  };

  /**
   * Clear the value.
   */


  DateSelect.prototype.clearValue = function clearValue() {
    return this.select.clearValue();
  };

  /**
   * Enable the input.
   */


  DateSelect.prototype.enable = function enable() {
    return this.select.enable();
  };

  /**
   * Disable the input.
   */


  DateSelect.prototype.disable = function disable() {
    return this.select.disable();
  };

  /**
   * Update the date select's options.
   * @param {Object|Array} params
   */


  DateSelect.prototype.setOptions = function setOptions(params) {

    params = params || {};

    this.min = params.min || this.min;
    this.max = params.max || this.max;
    this.monthNames = params.monthNames || this.monthNames;
    this.numericMonth = params.numericMonth || this.numericMonth;

    if (this.type === 'year') {
      if (params.min && !params.max) {
        this.max = this.min + 100;
      } else if (params.max && !params.min) {
        this.min = this.max - 100;
      }
    }

    var i = this.min ? this.min - 1 : 0;
    var len = this.max || this.monthNames.length;
    var opts = [{}];

    for (; i < len; i++) {
      opts.push({
        value: i + 1,
        text: this.monthNames ? this.monthNames[i] : i + 1
      });
    }

    this.select.setOptions(opts);

    return this;
  };

  /**
   * Set the label text for the select input.
   * @param {String} text Optional
   */


  DateSelect.prototype.setLabel = function setLabel(text) {
    this.select.setLabel(text !== undefined ? text : this._getTypeText());
    return this;
  };

  /**
   * Create a select input helper.
   * @param {Object} el
   */


  DateSelect.prototype._createSelect = function _createSelect(el) {

    this.select = new _selectInput2.default(el, {
      onChange: this._onSelectChangeBound,
      onFocus: this._onSelectFocusBound,
      onBlur: this._onSelectBlurBound
    });

    this.setOptions();
    this.setLabel();

    // Ensure we have an ARIA labelledby attribute
    var select = el.querySelector('select');
    if (select && !select.getAttribute('aria-labelledby')) {
      var selectLabel = el.querySelector('.spark-label');
      var labelID = 'spark-aria__' + this.ariaLabelPrefix + '--suffix-' + this.type;

      if (selectLabel !== null && labelID !== null) {
        selectLabel.setAttribute('id', labelID);
        select.setAttribute('aria-labelledby', this.ariaLabelPrefix + ' ' + labelID);
      }
    }
  };

  /**
   * Cache elements.
   * @param {Element} el
   */


  DateSelect.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.selectEl = this.el.querySelector('select');
  };

  /**
   * Parse parameters from the elements.
   */


  DateSelect.prototype._parseParams = function _parseParams() {

    this.type = this.type !== null ? this.type : (0, _parseAttribute.string)(this.selectEl, 'data-type', 'day');

    this.ariaLabelPrefix = this.ariaLabelPrefix !== null ? this.ariaLabelPrefix : null;

    if (this.type === 'year') {
      var date = new Date();
      this.min = this.min !== null ? this.min : (0, _parseAttribute.number)(this.selectEl, 'min', date.getFullYear() - 100);
      this.max = this.max !== null ? this.max : (0, _parseAttribute.number)(this.selectEl, 'max', (this.min || date.getFullYear()) + 100);
    } else if (this.type === 'month') {

      this.monthNames = this.monthNames !== null ? this.monthNames : (0, _parseAttribute.string)(this.selectEl, 'data-month-names', null);
      this.numericMonth = this.numericMonth !== null ? this.numericMonth : (0, _parseAttribute.boolean)(this.selectEl, 'data-numeric-month', false);
      this.min = this.min !== null ? this.min : (0, _parseAttribute.number)(this.selectEl, 'min', null);
      this.max = this.max !== null ? this.max : (0, _parseAttribute.number)(this.selectEl, 'max', null);

      // No monthNames yet and no min or max
      if (!this.monthNames && !this.numericMonth && !this.min && !this.max) {
        this.monthNames = this._getDefaultMonthNames();
      } else if (!this.min && !this.max) {
        this.min = 1;
        this.max = 12;
      }

      if (typeof this.monthNames === 'string') {
        this.monthNames = this.monthNames.split(',');
      }
    } else {
      this.min = this.min !== null ? this.min : (0, _parseAttribute.number)(this.selectEl, 'min', 1);
      this.max = this.max !== null ? this.max : (0, _parseAttribute.number)(this.selectEl, 'max', 31);
    }
  };

  /**
   * Make a list of month options.
   * @return {Array}
   */


  DateSelect.prototype._getDefaultMonthNames = function _getDefaultMonthNames() {
    return _date2.default.getMonthNamesShort();
  };

  /**
   * Get the text for this type of date select.
   * @return {String}
   */


  DateSelect.prototype._getTypeText = function _getTypeText() {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  DateSelect.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onSelectChangeBound = this._onSelectChange.bind(this);
    this._onSelectFocusBound = this._onSelectFocus.bind(this);
    this._onSelectBlurBound = this._onSelectBlur.bind(this);
  };

  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */


  DateSelect.prototype._onSelectChange = function _onSelectChange(val) {
    (this.onChange || noop)(val, this);
  };

  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */


  DateSelect.prototype._onSelectFocus = function _onSelectFocus(val) {
    (this.onFocus || noop)(val, this);
  };

  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */


  DateSelect.prototype._onSelectBlur = function _onSelectBlur(val) {
    (this.onBlur || noop)(val, this);
  };

  return DateSelect;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


DateSelect.prototype._whitelistedParams = ['type', 'ariaLabelPrefix', 'monthNames', 'numericMonth', 'min', 'max', 'onChange', 'onFocus', 'onBlur'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
DateSelect.prototype.defaults = {
  el: null,
  selectEl: null,
  type: null,
  monthNames: null,
  min: null,
  max: null,
  select: null,
  numericMonth: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  _onChangeBound: null,
  _onFocusBound: null,
  _onBlurBound: null
};

exports.default = DateSelect;
module.exports = exports['default'];


},{"../helpers/date/date":8,"../helpers/dom/parse-attribute":14,"./base":1,"./select-input":5}],4:[function(require,module,exports){
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


},{"../helpers/dom/parse-attribute":14,"./base":1,"./typeahead":6}],5:[function(require,module,exports){
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


},{"../helpers/dom/make-element":12,"../helpers/dom/toggle-class":16,"../helpers/util/mixin":21,"../mixins/messaging":24,"../mixins/validation":25,"./base":1}],6:[function(require,module,exports){
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


},{"../helpers/dom/parse-attribute":14,"../helpers/dom/trigger-event":17,"./base":1}],7:[function(require,module,exports){
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


},{"../dom/add-class":10,"../dom/has-class":11,"../dom/outer-height":13,"../dom/remove-class":15,"../dom/toggle-class":16}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Date helper
 * General helpers for working with dates.
 *
 * @module helpers/date/date.js
 */

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayNamesShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
var adjustedDayNames = [];
var adjustedDayNamesShort = [];
var weekStartsOn = 0;

var dateHelper = {

  /**
   * Transform a date into an object of date values.
   * @param {Date} date
   * @return {Object}
   */
  create: function create(date) {

    date = date instanceof Date ? date : new Date(date.year, date.month - 1, date.day);

    var inst = Object.create(dateHelper);
    inst._date = date;
    inst._cache = {};

    return inst;
  },

  /**
   * Get a year.
   * @return {Number}
   */
  get year() {
    this._instanceCheck('year');
    return this._date.getFullYear();
  },

  /**
   * Set a year.
   * @param {Number} y
   */
  set year(y) {
    this._instanceCheck('year');
    this._clearCache();
    return this._date.setFullYear(y);
  },

  /**
   * Get a month.
   * @return {Number} 1-12
   */
  get month() {
    this._instanceCheck('month');
    return this._date.getMonth() + 1;
  },

  /**
   * Set a month.
   * @param {Number} m 1-12
   */
  set month(m) {
    this._instanceCheck('month');
    this._clearCache();
    return this._date.setMonth(m - 1);
  },

  /**
   * Get a day.
   * @return {Number} 1-31
   */
  get day() {
    this._instanceCheck('day');
    return this._date.getDate();
  },

  /**
   * Set a day.
   * @param {Number} d 1-31
   */
  set day(d) {
    this._instanceCheck('day');
    this._clearCache();
    return this._date.setDate(d);
  },

  /**
   * Sets the day, month and year values at once.
   * @param {Object} params
   */
  set: function set(params) {
    params = params || {};
    this.year = params.year || this.year;
    this.month = params.month || this.month;
    this.day = params.day || this.day;
  },

  /**
   * Get the full name of the month.
   * @param {Number} num
   * @return {String}
   */
  getMonthName: function getMonthName(num) {
    return monthNames[num - 1];
  },

  /**
   * Get the month name.
   * @return {String}
   */
  get monthName() {
    this._instanceCheck('monthName');
    return dateHelper.getMonthName(this.month);
  },

  /**
   * Get the list of month names.
   * @return {Array}
   */
  getMonthNames: function getMonthNames() {
    return monthNames;
  },

  /**
   * Get the short name of the month.
   * @param {Number} num
   * @return {String}
   */
  getMonthNameShort: function getMonthNameShort(num) {
    return monthNamesShort[num - 1];
  },

  /**
   * Get the month name.
   * @return {String}
   */
  get monthNameShort() {
    this._instanceCheck('monthName');
    return dateHelper.getMonthNameShort(this.month);
  },

  /**
   * Get the list of short month names.
   * @return {Array}
   */
  getMonthNamesShort: function getMonthNamesShort() {
    return monthNamesShort;
  },

  /**
   * Set the month names.
   * @param {Array} names
   */
  setMonthNames: function setMonthNames(names) {
    if (names.length === 12) monthNames = names;
  },

  /**
   * Set the short month names.
   * @param {Array} names
   */
  setMonthNamesShort: function setMonthNamesShort(names) {
    if (names.length === 12) monthNamesShort = names;
  },

  /**
   * Get the day of the week for a given day.
   * @param {Object} date
   * @return {Number} 1-7
   */
  getDayOfWeek: function getDayOfWeek(date) {
    var day = (date instanceof Date ? date : new Date(date.year, date.month - 1, date.day)).getDay() - weekStartsOn;
    return (day < 0 ? 7 - Math.abs(day) : day) + 1;
  },

  /**
   * Get the day of the week.
   * @return {Number}
   */
  get dayOfWeek() {
    return dateHelper.getDayOfWeek(this._date);
  },

  /**
   * Get the full name of a day of the week.
   * @param {Number} num
   * @return {String}
   */
  getDayName: function getDayName(num) {
    return dayNames[num - 1 + weekStartsOn] || dayNames[dayNames.length - num - 1 + weekStartsOn];
  },

  /**
   * Get the day name.
   * @return {String}
   */
  get dayName() {
    this._instanceCheck('dayName');
    return dateHelper.getDayName(this.dayOfWeek);
  },

  /**
   * Get the full name of the days of the week.
   * @return {Array}
   */
  getDayNames: function getDayNames() {
    return adjustedDayNames.length ? adjustedDayNames : dayNames;
  },

  /**
   * Get the short name of the day.
   * @param {Number} num
   * @return {String}
   */
  getDayNameShort: function getDayNameShort(num) {
    return dayNamesShort[num - 1 + weekStartsOn] || dayNames[dayNames.length - num - 1 + weekStartsOn];
  },

  /**
   * Get the short day name.
   * @return {String}
   */
  get dayNameShort() {
    this._instanceCheck('dayNameShort');
    return dateHelper.getDayNameShort(this.dayOfWeek);
  },

  /**
   * Get the full name of the days of the week.
   * @return {Array}
   */
  getDayNamesShort: function getDayNamesShort() {
    return adjustedDayNamesShort.length ? adjustedDayNamesShort : dayNamesShort;
  },

  /**
   * Set the day names.
   * @param {Array} names
   */
  setDayNames: function setDayNames(names) {
    if (names.length === 7) dayNames = names;
  },

  /**
   * Set the short day names.
   * @param {Array} names
   */
  setDayNamesShort: function setDayNamesShort(names) {
    if (names.length === 7) dayNamesShort = names;
  },

  /**
   * Get the index of the first day of the week.
   * @return {Number}
   */
  getWeekStartsOn: function getWeekStartsOn() {
    return weekStartsOn;
  },

  /**
   * Set the index of the first day of the week.
   * @param {Number} index
   * @return {String}
   */
  setWeekStartsOn: function setWeekStartsOn(number) {

    weekStartsOn = number;

    if (number) {
      adjustedDayNames = dayNames.slice(weekStartsOn);
      adjustedDayNames = adjustedDayNames.concat(dayNames.slice(0, weekStartsOn));
      adjustedDayNamesShort = dayNamesShort.slice(weekStartsOn);
      adjustedDayNamesShort = adjustedDayNamesShort.concat(dayNamesShort.slice(0, weekStartsOn));
    } else {
      adjustedDayNames = [];
      adjustedDayNamesShort = [];
    }
  },

  /**
   * Get the current date.
   * @return {Object}
   */
  now: function now() {
    return dateHelper.create(new Date());
  },

  /**
   * Get the next year after the given date.
   * This obviously isn't very complicated, but it exists
   * for parity with how we get the week, day and month.
   * @param {Object} date
   * @return {Object}
   */
  getNextYear: function getNextYear(date) {
    return dateHelper.create(new Date(date.year + 1, date.month - 1, date.day));
  },

  /**
   * Get the year following this.
   * @return {Object}
   */
  get nextYear() {
    this._instanceCheck('nextYear');
    return this._cache.nextYear || (this._cache.nextYear = dateHelper.getNextYear(this));
  },

  /**
   * Get the first day of the week for a given date.
   * @param {Object} date
   * @return {Object}
   */
  getWeekStart: function getWeekStart(date) {
    var inst = dateHelper.create(new Date(date.year, date.month - 1, date.day - dateHelper.getDayOfWeek(date) + 1));
    inst.weekStartsOn = weekStartsOn;
    return inst;
  },

  /**
   * Get the start of the week for this date.
   * @return {Object}
   */
  get weekStart() {
    this._instanceCheck('weekStart');
    return this._cache.weekStart && this._cache.weekStart.weekStartsOn === weekStartsOn ? this._cache.weekStart : this._cache.weekStart = dateHelper.getWeekStart(this);
  },

  /**
   * Get the first day of the month for a given date.
   * @param {Object} date
   * @return {Object}
   */
  getMonthStart: function getMonthStart(date) {
    var inst = dateHelper.create(new Date(date.year, date.month - 1, 1));
    return inst;
  },

  /**
   * Get the start of the month for this date.
   * @return {Object}
   */
  get monthStart() {
    this._instanceCheck('monthStart');
    return this._cache.monthStart || (this._cache.monthStart = dateHelper.getMonthStart(this));
  },

  /**
   * Get the next week after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getNextWeek: function getNextWeek(date) {
    var start = dateHelper.getWeekStart(date);
    return dateHelper.create(new Date(start.year, start.month - 1, start.day + 7));
  },

  /**
   * Get the week following this.
   * @return {Object}
   */
  get nextWeek() {
    this._instanceCheck('nextWeek');
    return this._cache.nextWeek || (this._cache.nextWeek = dateHelper.getNextWeek(this));
  },

  /**
   * Get the next day after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getNextDay: function getNextDay(date) {
    return dateHelper.create(new Date(date.year, date.month - 1, date.day + 1));
  },

  /**
   * Get the day following this.
   * @return {Object}
   */
  get nextDay() {
    this._instanceCheck('nextDay');
    return this._cache.nextDay || (this._cache.nextDay = dateHelper.getNextDay(this));
  },

  /**
   * Get the next month after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getNextMonth: function getNextMonth(date) {
    // Date() has a *bug/feature* if last day of month is 31 when calculating the next month.
    // Need to account for that so that it doesn't round up the date/month.

    if (date.day === 31 && date.month !== 1 && date.month !== 7 && date.month !== 12) {
      // Adjust for months ending in 31 followed by months ending in 30
      return dateHelper.create(new Date(date.year, date.month, date.day - 1));
    } else if (date.day > 28 && date.month === 1) {
      // fix for last day of February
      return dateHelper.create(new Date(date.year, date.month + 1, 0));
    } else {
      return dateHelper.create(new Date(date.year, date.month, date.day));
    }
  },

  /**
   * Get the month following this.
   * @return {Object}
   */
  get nextMonth() {
    this._instanceCheck('nextMonth');
    return this._cache.nextMonth || (this._cache.nextMonth = dateHelper.getNextMonth(this));
  },

  /**
   * Get the previous year after the given date.
   * This obviously isn't very complicated, but it exists
   * for parity with how we get the week, day and month.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousYear: function getPreviousYear(date) {
    return dateHelper.create(new Date(date.year - 1, date.month - 1, date.day));
  },

  /**
   * Get the year preceding this.
   * @return {Object}
   */
  get previousYear() {
    this._instanceCheck('previousYear');
    return this._cache.previousYear || (this._cache.previousYear = dateHelper.getPreviousYear(this));
  },

  /**
   * Get the previous week after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousWeek: function getPreviousWeek(date) {
    var start = dateHelper.getWeekStart(date);
    var inst = dateHelper.create(new Date(start.year, start.month - 1, start.day - 7));
    inst.weekStartsOn = weekStartsOn;
    return inst;
  },

  /**
   * Get the week preceding this.
   * @return {Object}
   */
  get previousWeek() {
    this._instanceCheck('previousWeek');
    return this._cache.previousWeek || (this._cache.previousWeek = dateHelper.getPreviousWeek(this));
  },

  /**
   * Get the previous day after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousDay: function getPreviousDay(date) {
    return dateHelper.create(new Date(date.year, date.month - 1, date.day - 1));
  },

  /**
   * Get the day preceding this.
   * @return {Object}
   */
  get previousDay() {
    this._instanceCheck('previousDay');
    return this._cache.previousDay || (this._cache.previousDay = dateHelper.getPreviousDay(this));
  },

  /**
   * Get the previous month after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousMonth: function getPreviousMonth(date) {
    // Date() has a *bug/feature* if last day of month is 31 when calculating the previous month.
    // Need to account for that so that it doesn't round up the date/month.

    if (date.day === 31 && date.month !== 1 && date.month !== 3 && date.month !== 8) {
      // Adjust for months ending in 31 that follow months ending in 30
      return dateHelper.create(new Date(date.year, date.month - 2, date.day - 1));
    } else if (date.day > 28 && date.month === 3) {
      // Adjust for last day of February
      return dateHelper.create(new Date(date.year, date.month - 1, 0));
    } else {
      return dateHelper.create(new Date(date.year, date.month - 2, date.day));
    }
  },

  /**
   * Get the month preceding this.
   * @return {Object}
   */
  get previousMonth() {
    this._instanceCheck('previousMonth');
    return this._cache.previousMonth || (this._cache.previousMonth = dateHelper.getPreviousMonth(this));
  },

  /**
   * Get the last day of the month.
   * @param {Object} date
   * @return {Object}
   */
  getMonthEnd: function getMonthEnd(date) {
    return dateHelper.create(new Date(date.year, date.month, 0));
  },

  /**
   * Get the last day of the month.
   * @return {Object}
   */
  get monthEnd() {
    this._instanceCheck('monthEnd');
    return this._cache.monthEnd || (this._cache.monthEnd = dateHelper.getMonthEnd(this));
  },

  /**
   * Does a given day equal another? Or is it present in a list of others?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equal: function equal(date, compare, full) {
    return this.equalDay(date, compare, full);
  },

  /**
   * Does a given day equal another? Or is it present in a list of others?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalDay: function equalDay(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (compare[i] && date.year === compare[i].year && date.month === compare[i].month && date.day === compare[i].day) matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a week equal to another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalWeek: function equalWeek(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || !date.weekStart.equalDay(compare[i].weekStart)) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a month equal to another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalMonth: function equalMonth(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year !== compare[i].year || date.year === compare[i].year && date.month !== compare[i].month) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a year equal to another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalYear: function equalYear(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year !== compare[i].year) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a date before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  before: function before(date, compare, full) {
    return this.beforeDay(date, compare, full);
  },

  /**
   * Is a given date before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeDay: function beforeDay(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date._date >= compare[i]._date) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a week before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeWeek: function beforeWeek(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || !date.weekStart.beforeDay(compare[i].weekStart)) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a month before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeMonth: function beforeMonth(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year > compare[i].year || date.year === compare[i].year && date.month >= compare[i].month) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a year before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeYear: function beforeYear(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year >= compare[i].year) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a date after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  after: function after(date, compare, full) {
    return this.afterDay(date, compare, full);
  },

  /**
   * Is a given date after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterDay: function afterDay(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date._date <= compare[i]._date) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a week after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterWeek: function afterWeek(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || !date.weekStart.afterDay(compare[i].weekStart)) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a month after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterMonth: function afterMonth(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year < compare[i].year || date.year === compare[i].year && date.month <= compare[i].month) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a year after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterYear: function afterYear(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year <= compare[i].year) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Get the earliest date in an array.
   * @return {Object}
   */
  earliest: function earliest(arr) {

    var i = 0;
    var len = arr.length;
    var e = void 0;

    for (; i < len; i++) {
      if (!e || arr[i].before(e)) e = arr[i];
    }

    return e;
  },

  /**
   * Get the latest date in an array.
   * @return {Object}
   */
  latest: function latest(arr) {

    var i = 0;
    var len = arr.length;
    var l = void 0;

    for (; i < len; i++) {
      if (!l || arr[i].after(l)) l = arr[i];
    }

    return l;
  },

  /**
   * Clone a date instance.
   * @param {Object} date
   * @return {Object}
   */
  clone: function clone(date) {

    // If we weren't passed a date, use this instance.
    if (!date && this._date && this._date instanceof Date && dateHelper.isPrototypeOf(this)) {
      date = this;
    }

    // No date, can't clone.
    if (!date) {
      throw new Error('Must pass a date to clone or call on an instance.');
    }

    return dateHelper.create(new Date(date._date.valueOf()));
  },

  /**
   * If a comparison function is called on an instance, properly
   * assign the vars.
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full
   */
  _checkComparisonArgs: function _checkComparisonArgs(date, compare, full) {

    if (compare === undefined || typeof compare === 'boolean') {

      if (!dateHelper.isPrototypeOf(this)) {
        throw new Error('Cannot compare only one date!');
      }

      full = compare;
      compare = date;
      date = this;
    }

    compare = compare instanceof Array ? compare : [compare];

    return [date, compare, full];
  },

  /**
   * Check to see if we have an instance of the date object.
   * @param  {String} prop
   */
  _instanceCheck: function _instanceCheck(prop) {
    if (!this._date || !(this._date instanceof Date) || !dateHelper.isPrototypeOf(this)) throw new Error('Cannot access the property "' + prop + '" of the date helper with creating an instance!');
  },

  /**
   * Clear the cache.
   */
  _clearCache: function _clearCache() {
    this._instanceCheck('clearCache');
    this._cache = {};
  }
};

exports.default = dateHelper;
module.exports = exports['default'];


},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pad = require('../util/pad');

var _pad2 = _interopRequireDefault(_pad);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Map characters to their special meanings.
 * @type {Object}
 */
/**
 * # Parse Date Format
 * Given a date format string, break it down into pieces.
 *
 * @example
 * parseDateFormat('MM-DD-YYYY');
 *
 * @module helpers/date/parse-format.js
 */

var map = {
  d: 'day',
  m: 'month',
  y: 'year',
  '-': 'divider',
  '/': 'divider',
  ' ': 'space'
};

/**
 * Given a format and a string, get the day, month and year values from that string.
 * @param {Object} format
 * @return {Function}
 */
function getValues(format) {

  return function (value) {

    var i = 0;
    var index = 0;
    var len = format.length;
    var values = {};

    // Loop through all format pieces
    for (; i < len; i++) {

      // Only worry about date values
      if (['day', 'month', 'year'].indexOf(format[i].name) !== -1) {

        // If the passed value doesn't contain a format piece, it's invalid.
        if (value.length < index + format[i].length) return;

        values[format[i].name] = parseInt(value.substr(index, format[i].length), 10);
      }
      index += format[i].length;
    }

    return _date2.default.create(values);
  };
}

/**
 * Create a formatted date string given an object of values.
 * @param {Object} format
 * @return {Function}
 */
function getString(format) {

  /**
   * @param {Object} vals
   * @return {String}
   */
  return function (vals) {

    var i = 0;
    var len = format.length;
    var str = '';

    for (; i < len; i++) {

      // Numbers
      if (vals[format[i].name]) {
        str += (0, _pad2.default)(vals[format[i].name], format[i].length);
      }
      // Dividers
      else {
          str += format[i].value;
        }
    }

    return str;
  };
}

/**
 * @param {String} format
 * @return {Object}
 */
function parseDateFormat(format) {

  var f = format.toLowerCase();
  var i = 0;
  var len = f.length;

  var obj = {
    parts: []
  };

  for (; i < len; i++) {

    // If there is a matching character mapping and the last part was of the same name, increment its length
    // and add to its content.
    if (map[f[i]] && obj.parts.length && obj.parts[obj.parts.length - 1].name === map[f[i]]) {
      obj.parts[obj.parts.length - 1].length++;
      obj.parts[obj.parts.length - 1].value += format[i];
      continue;
    }

    obj.parts.push({
      name: map[f[i]] ? map[f[i]] : '',
      value: format[i],
      length: 1
    });
  }

  // Add a way to convert the parsed date into a regex-ish string that works with the Typeahead implementation.
  obj.getValues = getValues(obj.parts);
  obj.getString = getString(obj.parts);

  return obj;
}

exports.default = parseDateFormat;
module.exports = exports['default'];


},{"../util/pad":22,"./date":8}],10:[function(require,module,exports){
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


},{"../util/trim":23,"./has-class":11}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){
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


},{"../util/each":20}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
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


},{"../util/trim":23}],16:[function(require,module,exports){
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


},{"./add-class":10,"./has-class":11,"./remove-class":15}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendChildren(el, children, empty) {

  empty = empty === undefined ? false : empty;

  if (empty) {
    el.textContent = '';
  }

  var domList = children instanceof window.HTMLCollection;

  if (domList) {
    while (children.length) {
      el.appendChild(children[0]);
    }
  } else {
    (0, _each2.default)(children, function (c) {
      if (c) {
        el.appendChild(c);
      }
    });
  }
} /**
   * # Append Children
   * Append an array of children to a node.
   *
   * @param {Element} el
   * @param {Array} children
   * @param {Boolean} empty Empty the node before adding children?
   *
   * @module helpers/manipulation/append-children.js
   */

exports.default = appendChildren;
module.exports = exports['default'];


},{"../util/each":20}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyAttributes(a, b) {
  (0, _each2.default)(a.attributes, function (attr) {
    b.setAttribute(attr.name, attr.value);
  });
} /**
   * # Copy Attributes
   * Copy all of the attributes from one element to another.
   *
   * @param {Element} a
   * @param {Element} b
   *
   * @module helpers/manipulation/copy-attributes.js
   */

exports.default = copyAttributes;
module.exports = exports['default'];


},{"../util/each":20}],20:[function(require,module,exports){
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


},{}],21:[function(require,module,exports){
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


},{"./each":20}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Pad
 * Pad a number with leading zeros
 *
 * @param {Number} n
 * @param {Number} w
 * @param {String} c Optional String to pad with
 *
 * @example
 * pad(4, 2);
 *
 * @module helpers/util/pad.js
 */
function pad(n, w, c) {
  c = c || '0';
  n = n + '';
  return n.length >= w ? n : new Array(w - n.length + 1).join(c) + n;
}

exports.default = pad;
module.exports = exports['default'];


},{}],23:[function(require,module,exports){
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


},{}],24:[function(require,module,exports){
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


},{"../helpers/animation/height":7}],25:[function(require,module,exports){
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

//# sourceMappingURL=date-input.js.map
