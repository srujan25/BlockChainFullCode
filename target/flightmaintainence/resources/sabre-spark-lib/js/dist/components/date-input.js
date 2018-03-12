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
//# sourceMappingURL=date-input.js.map
