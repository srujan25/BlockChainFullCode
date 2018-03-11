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
//# sourceMappingURL=date-select.js.map
