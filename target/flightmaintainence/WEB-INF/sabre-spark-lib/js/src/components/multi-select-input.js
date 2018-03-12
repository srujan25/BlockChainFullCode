/**
 * # Multiple SelectInput
 * A multiple select input container.
 *
 * @example
 * new MultiSelectInput(el);
 *
 * @module components/multi-select-input.js
 */
import BaseComponent from './base';
import mixin from '../helpers/util/mixin';
import messaging from '../mixins/messaging';
import validation from '../mixins/validation';
import makeElement from '../helpers/dom/make-element';
import each from '../helpers/util/each';

const noop = function() {};

class MultiSelectInput extends BaseComponent {

  /**
   * MultiSelectInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  constructor(el, params = {}) {

    params.elRequired = true;

    if (!super(el, params)) {
      return;
    }

    this._bindEventListenerCallbacks();
    this._addEventListeners();
  }


  /**
   * Get the value.
   * @return {Array}
   */
  getValue() {

    var vals = [];

    each(this._isNative ? this.selectEl.options : this.checkboxEls, (o) => {
      if (o.checked || o.selected) {
        vals.push(o.value);
      }
    });

    return vals;
  }


  /**
   * Set the value.
   * @param {Array} vals
   */
  setValue(vals) {

    var setVals = [];
    var propName = this._isNative ? 'selected' : 'checked';

    each(this._isNative ? this.selectEl.options : this.checkboxEls, (o) => {

      if (vals.indexOf(o.value) !== -1) {
        o[propName] = true;
        setVals.push(o.value);
      }
      else {
        o[propName] = false;
      }
    });

    (this.onChange || noop)(setVals, this);

    return this;
  }


  /**
   * Clear the selected value.
   */
  clearValue() {
    return this.setValue([]);
  }


  /**
   * Disable entry into the input.
   */
  disable() {
    (this.selectEl || this.el).setAttribute('disabled', '');
    return this;
  }


  /**
   * Enable entry into the input.
   */
  enable() {
    (this.selectEl || this.el).removeAttribute('disabled');
    return this;
  }


  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.selectEl = this.el.querySelector('select');
    this.checkboxEls = this.el.querySelectorAll('[type="checkbox"]');

    if (!this.selectEl && !this.checkboxEls.length) throw new Error('Multi select needs either a select input or a series of checkboxes.');

    this.messageEl = this.el.querySelector('.spark-select__message') || makeElement('<span class="spark-select__message"></span>');
  }


  /**
   * Parse parameters.
   */
  _parseParams() {
    this._isNative = this.selectEl ? true : false;
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onInputBound = this._onInput.bind(this);
  }


  /**
   * Add event listeners for focus, blur and input.
   */
  _addEventListeners() {

    if (this._isNative) {
      this.selectEl.addEventListener('change', this._onInputBound);
    }
    else {
      this.el.addEventListener('change', this._onInputBound, true);
    }
  }


  /**
   * Remove event listeners for focus, blur and input.
   */
  _removeEventListeners() {

    if (this._isNative) {
      this.selectEl.removeEventListener('change', this._onInputBound);
    }
    else {
      this.el.removeEventListener('change', this._onInputBound, true);
    }
  }


  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */
  _onInput() {

    var value = this.getValue();

    if (value !== this.previousValue) {
      this.previousValue = value;
      (this.onChange || noop)(value, this);
    }
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
MultiSelectInput.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange'];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
MultiSelectInput.prototype.defaults = {
  el: null,
  messageEl: null,
  selectEl: null,
  labelEl: null,
  onChange: null,
  previousValue: null,
  _isNative: false,
  _onFocusBound: null,
  _onBlurBound: null,
  _onInputBound: null
};

mixin(MultiSelectInput.prototype, messaging, validation);

export default MultiSelectInput;
