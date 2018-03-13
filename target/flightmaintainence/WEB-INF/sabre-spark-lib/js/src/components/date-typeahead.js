/**
 * # DateTypeahead
 * Listen to an input element and format it as the user types.
 *
 * @example
 * new DateTypeahead(el);
 *
 * @module components/date-typeahead.js
 */
import BaseComponent from './base';
import Typeahead from './typeahead';
import {string as parseStringAttribute, number as parseNumberAttribute} from '../helpers/dom/parse-attribute';

const noop = function() {};

function createDefaultElement() {
  var el = document.createElement('span');
  el.className = 'spark-input';
  return el;
}

class DateTypeahead extends BaseComponent {

  /**
   * DateTypeahead constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  constructor(el, params = {}) {

    // If only one arg passed, assume it was a parameters
    // object since the user MUST provide those but the element
    // is optional. Doing it this way to keep the arity the same
    // as other components.
    if (arguments.length < 2) {
      params = el || {};
      el = createDefaultElement();
    }

    super(el, params);

    this._bindEventListenerCallbacks();
    this._createTypeahead(el, params);
  }


  /**
   * Get the value.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {Mixed}
   */
  getValue(asInt) {
    return this.typeahead.getValue(asInt);
  }


  /**
   * Set the value.
   * @param {Mixed} val
   */
  setValue(val) {
    return this.typeahead.setValue(val);
  }


  /**
   * Clear the value.
   */
  clearValue() {
    return this.typeahead.clearValue();
  }


  /**
   * Enable the input.
   */
  enable() {
    return this.typeahead.enable();
  }


  /**
   * Disable the input.
   */
  disable() {
    return this.typeahead.disable();
  }


  /**
   * Run the typeahead calculations.
   */
  run() {
    return this.typeahead.run();
  }


  /**
   * Pause the typeahead events.
   */
  pause() {
    return this.typeahead.pause();
  }


  /**
   * Reseume typeahead events.
   */
  resume() {
    return this.typeahead.resume();
  }


  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  remove(leaveElement) {
    this.typeahead.remove(leaveElement);
    super.remove(leaveElement);
    return this;
  }


  /**
   * Cache elements.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
  }


  /**
   * Parse parameters from the elements.
   */
  _parseParams() {

    this.type = this.type !== null ? this.type : parseStringAttribute(this.el, 'data-type', 'day');
    this.format = this.format !== null ? this.format : parseStringAttribute(this.el, 'data-format', null);
    this.placeholder = this.placeholder !== null ? this.placeholder : parseStringAttribute(this.el, 'data-placeholder', null);
    this.len = this.len !== null ? this.len : parseNumberAttribute(this.el, 'length', null);
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
  }


  /**
   * Create a typeahead with the given format.
   * @param {Object} el
   */
  _createTypeahead(el) {

    this.typeahead = new Typeahead(el, {
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
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onTypeaheadChangeBound = this._onTypeaheadChange.bind(this);
    this._onTypeaheadInputBound = this._onTypeaheadInput.bind(this);
    this._onTypeaheadFocusBound = this._onTypeaheadFocus.bind(this);
    this._onTypeaheadBlurBound = this._onTypeaheadBlur.bind(this);
    this._onTypeaheadBackspaceBound = this._onTypeaheadBackspace.bind(this);
    this._onTypeaheadEndBound = this._onTypeaheadEnd.bind(this);
  }


  /**
   * Take a length and return a format string with that many digits.
   * @param {Number} length
   * @return {String}
   */
  _lengthToFormat(length) {

    var i = 0;
    var ret = '';

    for (; i < length; i++) {
      ret += '\\d';
    }

    return ret;
  }


  /**
   * Check to see if an input value is valid.
   * @param {Mixed} val
   * @param {Boolean} allowEmpty All the value to be empty instead of 0.
   */
  _checkValidity(val, allowEmpty) {

    val = parseInt(val, 10);

    var origVal = val;
    var isNumber = !isNaN(val);

    // If we were passed an empty string or something, don't try to validate.
    // Treat zeros as a non-entry for days and months.
    if (isNumber) {

      if (this.type === 'year') {
        val = val === 0 ? (allowEmpty ? '' : 0) : Math.max(val, 0);
      } else if (this.type === 'month') {
        val = val ? Math.min(Math.max(val, 1), 12) : (allowEmpty ? '' : 0);
      } else {
        val = val ? Math.min(Math.max(val, 1), 31) : (allowEmpty ? '' : 0);
      }
    }

    // Need to make sure we aren't looping forever on these updates.
    if (isNumber && val !== origVal) {
      this.typeahead.setValue(val + '');
      return false;
    }

    return true;
  }


  /**
   * When the typeahead changes, make sure the value is valid. This
   * is very basic validation. More complex validation like the number
   * of days in a specific month should be handled by the callback.
   * And run our callback.
   * @param {String} val The value of the input
   * @param {String} oldVal The previous value
   */
  _onTypeaheadChange(val) {
    if (this._checkValidity(val)) {
      (this.onChange || noop)(val, this);
    }
  }

  /**
   * Callback for `input` event
   * @param {String} val The value of the input
   * @param {String} oldVal The previous value
   *
   */
  _onTypeaheadInput(val) {
    (this.onInput || noop)(val, this);
  }


  /**
   * When the typeahead gains focus, let anyone who is interested know.
   * @param {String} val
   */
  _onTypeaheadFocus(val) {
    (this.onFocus || noop)(val, this);
  }


  /**
   * When the typeahead loses focus, let anyone who is interested know.
   * @param {String} val
   */
  _onTypeaheadBlur(val) {
    this._checkValidity(val, true);
    (this.onBlur || noop)(val, this);
  }


  /**
   * When the typeahead fires a backspace event because it's empty and
   * the user is hitting backspace, let anyone who is interested know.
   * @param {String} val
   */
  _onTypeaheadBackspace(val) {
    (this.onBackspace || noop)(val, this);
  }


  /**
   * When the typeahead is full and at its end, let anyone who is interested know.
   * @param {Object} typeahead
   * @param {String} character Optional The character to pass to the next input.
   */
  _onTypeaheadEnd(typeahead, character) {
    (this.onEnd || noop)(this, character);
  }
}


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

export default DateTypeahead;
