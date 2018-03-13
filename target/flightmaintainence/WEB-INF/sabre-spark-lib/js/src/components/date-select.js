/**
 * # DateSelect
 * Create a select list of days, months or years.
 *
 * @example
 * new DateSelect(el);
 *
 * @module components/date-select.js
 */
import BaseComponent from './base';
import SelectInput from './select-input';
import dateHelper from '../helpers/date/date';
import {number as parseNumberAttribute, boolean as parseBooleanAttribute, string as parseStringAttribute} from '../helpers/dom/parse-attribute';

const noop = function() {};

function createDefaultElement() {
  var el = document.createElement('span');
  el.className = 'spark-select';
  el.innerHTML = '<select class="spark-select__input"></select><span class="spark-label"></span>';
  return el;
}

class DateSelect extends BaseComponent {

  /**
   * DateSelect constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  constructor (el, params = {}) {

    // If the first argument is a plain object, create a default element
    // since the user MUST provide additional params but the element
    // is optional. Doing it this way to keep the arity the same
    // as other components.
    if (!(el instanceof HTMLElement)) {
      params = el || {};
      el = createDefaultElement();
    }

    super(el, params);

    this._bindEventListenerCallbacks();
    this._createSelect(el);
  }


  /**
   * Get the value.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {Mixed}
   */
  getValue(asInt) {
    return asInt ? parseInt(this.select.getValue(), 10) : this.select.getValue();
  }


  /**
   * Set the value.
   * @param {Mixed} val
   */
  setValue(val) {
    return this.select.setValue(val);
  }


  /**
   * Clear the value.
   */
  clearValue() {
    return this.select.clearValue();
  }


  /**
   * Enable the input.
   */
  enable() {
    return this.select.enable();
  }


  /**
   * Disable the input.
   */
  disable() {
    return this.select.disable();
  }


  /**
   * Update the date select's options.
   * @param {Object|Array} params
   */
  setOptions(params) {

    params = params || {};

    this.min = params.min || this.min;
    this.max = params.max || this.max;
    this.monthNames = params.monthNames || this.monthNames;
    this.numericMonth = params.numericMonth || this.numericMonth;

    if (this.type === 'year') {
      if (params.min && !params.max) {
        this.max = this.min + 100;
      }
      else if (params.max && !params.min) {
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
  }


  /**
   * Set the label text for the select input.
   * @param {String} text Optional
   */
  setLabel(text) {
    this.select.setLabel(text !== undefined ? text : this._getTypeText());
    return this;
  }


  /**
   * Create a select input helper.
   * @param {Object} el
   */
  _createSelect(el) {

    this.select = new SelectInput(el, {
      onChange: this._onSelectChangeBound,
      onFocus: this._onSelectFocusBound,
      onBlur: this._onSelectBlurBound
    });

    this.setOptions();
    this.setLabel();

    // Ensure we have an ARIA labelledby attribute
    let select = el.querySelector('select');
    if (select && !select.getAttribute('aria-labelledby')) {
      let selectLabel = el.querySelector('.spark-label');
      let labelID = 'spark-aria__' + this.ariaLabelPrefix + '--suffix-' + this.type;

      if (selectLabel !== null && labelID !== null) {
        selectLabel.setAttribute('id', labelID);
        select.setAttribute('aria-labelledby', this.ariaLabelPrefix + ' ' + labelID);
      }
    }
  }


  /**
   * Cache elements.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.selectEl = this.el.querySelector('select');
  }


  /**
   * Parse parameters from the elements.
   */
  _parseParams() {

    this.type = this.type !== null ? this.type : parseStringAttribute(this.selectEl, 'data-type', 'day');

    this.ariaLabelPrefix = this.ariaLabelPrefix !== null ? this.ariaLabelPrefix : null;

    if (this.type === 'year') {
      var date = new Date();
      this.min = this.min !== null ? this.min : parseNumberAttribute(this.selectEl, 'min', date.getFullYear() - 100);
      this.max = this.max !== null ? this.max : parseNumberAttribute(this.selectEl, 'max', (this.min || date.getFullYear()) + 100);
    }
    else if (this.type === 'month') {

      this.monthNames = this.monthNames !== null ? this.monthNames : parseStringAttribute(this.selectEl, 'data-month-names', null);
      this.numericMonth = this.numericMonth !== null ? this.numericMonth : parseBooleanAttribute(this.selectEl, 'data-numeric-month', false);
      this.min = this.min !== null ? this.min : parseNumberAttribute(this.selectEl, 'min', null);
      this.max = this.max !== null ? this.max : parseNumberAttribute(this.selectEl, 'max', null);

      // No monthNames yet and no min or max
      if (!this.monthNames && !this.numericMonth && !this.min && !this.max) {
        this.monthNames = this._getDefaultMonthNames();
      }
      else if (!this.min && !this.max) {
        this.min = 1;
        this.max = 12;
      }

      if (typeof this.monthNames === 'string') {
        this.monthNames = this.monthNames.split(',');
      }
    }
    else {
      this.min = this.min !== null ? this.min : parseNumberAttribute(this.selectEl, 'min', 1);
      this.max = this.max !== null ? this.max : parseNumberAttribute(this.selectEl, 'max', 31);
    }
  }


  /**
   * Make a list of month options.
   * @return {Array}
   */
  _getDefaultMonthNames() {
    return dateHelper.getMonthNamesShort();
  }


  /**
   * Get the text for this type of date select.
   * @return {String}
   */
  _getTypeText() {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onSelectChangeBound = this._onSelectChange.bind(this);
    this._onSelectFocusBound = this._onSelectFocus.bind(this);
    this._onSelectBlurBound = this._onSelectBlur.bind(this);
  }


  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */
  _onSelectChange(val) {
    (this.onChange || noop)(val, this);
  }


  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */
  _onSelectFocus(val) {
    (this.onFocus || noop)(val, this);
  }



  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */
  _onSelectBlur(val) {
    (this.onBlur || noop)(val, this);
  }
}

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

export default DateSelect;
