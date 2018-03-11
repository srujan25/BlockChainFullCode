/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).DateSelect = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/date/date":5,"../helpers/dom/parse-attribute":10,"./base":1,"./select-input":3}],3:[function(require,module,exports){
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


},{"../helpers/dom/make-element":8,"../helpers/dom/toggle-class":12,"../helpers/util/mixin":14,"../mixins/messaging":16,"../mixins/validation":17,"./base":1}],4:[function(require,module,exports){
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


},{"../dom/add-class":6,"../dom/has-class":7,"../dom/outer-height":9,"../dom/remove-class":11,"../dom/toggle-class":12}],5:[function(require,module,exports){
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


},{}],6:[function(require,module,exports){
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


},{"../util/trim":15,"./has-class":7}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
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


},{}],9:[function(require,module,exports){
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


},{"../util/each":13}],10:[function(require,module,exports){
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


},{}],11:[function(require,module,exports){
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


},{"../util/trim":15}],12:[function(require,module,exports){
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


},{"./add-class":6,"./has-class":7,"./remove-class":11}],13:[function(require,module,exports){
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

//# sourceMappingURL=date-select.js.map
