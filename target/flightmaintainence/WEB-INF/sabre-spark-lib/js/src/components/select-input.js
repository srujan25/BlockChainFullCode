/**
 * # SelectInput
 * A select input container.
 *
 * @example
 * new SelectInput(el);
 *
 * @module components/select-input.js
 */
import BaseComponent from './base';
import toggleClass from '../helpers/dom/toggle-class';
import mixin from '../helpers/util/mixin';
import messaging from '../mixins/messaging';
import validation from '../mixins/validation';
import makeElement from '../helpers/dom/make-element';

const noop = function() {};

class SelectInput extends BaseComponent {

  /**
   * SelectInput constructor.
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
   * @return {String}
   */
  getValue() {
    return this.selectEl.value;
  }


  /**
   * Set the value.
   * @param {String|Number} val
   */
  setValue(val) {

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
  }


  /**
   * Clear the selected value.
   */
  clearValue() {

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
  }


  /**
   * Set the options.
   * @param {Array} opts
   */
  setOptions(opts) {

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
  }


  /**
   * Set the value of the label.
   * @param {String} text
   */
  setLabel(text) {
    if (!this.labelEl) return this;
    this.labelEl.innerHTML = text;
    return this;
  }


  /**
   * Disable entry into the input.
   */
  disable() {
    this.selectEl.setAttribute('disabled', '');
    return this;
  }


  /**
   * Enable entry into the input.
   */
  enable() {
    this.selectEl.removeAttribute('disabled');
    return this;
  }


  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.selectEl = this.el.querySelector('select');
    this.labelEl = this.el.querySelector('.spark-label');

    this.messageEl = this.el.querySelector('.spark-select__message') || makeElement('<span class="spark-select__message"></span>');

    if (!this.selectEl) {
      throw new Error('A <select> element must be present!', this.el);
    }

    this._updateClass();
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onInputBound = this._onInput.bind(this);
  }


  /**
   * Add event listeners for focus, blur and input.
   */
  _addEventListeners() {
    this.selectEl.addEventListener('focus', this._onFocusBound);
    this.selectEl.addEventListener('blur', this._onBlurBound);
    this.selectEl.addEventListener('input', this._onInputBound);
  }


  /**
   * Remove event listeners for focus, blur and input.
   */
  _removeEventListeners() {
    this.selectEl.removeEventListener('focus', this._onFocusBound);
    this.selectEl.removeEventListener('blur', this._onBlurBound);
    this.selectEl.removeEventListener('input', this._onInputBound);
  }


  /**
   * Update the active class.
   */
  _updateClass() {
    this.hasValue = this.selectEl.value ? true : false;
    toggleClass(this.el, 'has-value', this.hasValue);
    toggleClass(this.el, 'active', this.isActive);
  }


  /**
   * When the input element gains focus.
   * @param {Object} e
   */
  _onFocus() {
    this.isActive = true;
    this._updateClass();
    var value = this.getValue();
    (this.onFocus || noop)(value, this);
  }


  /**
   * When the input element loses focus.
   * @param {Object} e
   */
  _onBlur() {
    this.isActive = false;
    this._updateClass();
    var value = this.getValue();
    (this.onBlur || noop)(value, this);
  }


  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */
  _onInput() {

    this._updateClass();

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

mixin(SelectInput.prototype, messaging, validation);

export default SelectInput;
