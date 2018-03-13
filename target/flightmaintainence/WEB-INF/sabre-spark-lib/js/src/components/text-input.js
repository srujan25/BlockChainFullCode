/**
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
import BaseComponent from './base';
import Typeahead from './typeahead';
import toggleClass from '../helpers/dom/toggle-class';
import mixin from '../helpers/util/mixin';
import messaging from '../mixins/messaging';
import validation from '../mixins/validation';
import makeElement from '../helpers/dom/make-element';

const noop = function() {};

class TextInput extends BaseComponent {

  /**
   * TextInput constructor.
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
    this._createTypeahead();

    if (this.inputEl.value) {
      this.show();
      this._onInput();
    }
  }


  /**
   * Show the input by adding the active state and setting character counts (if necessary).
   */
  show() {
    this.isActive = true;
    this._updateClass();
    return this;
  }


  /**
   * Hide the input by removing the active state.
   */
  hide() {
    this.isActive = false;
    this._updateClass();
    return this;
  }


  /**
   * Set the value of the input.
   * @param {Mixed} value
   */
  setValue(value) {

    if (this.typeahead) {
      this.typeahead.setValue(value);
    }
    else {
      this.inputEl.value = value;
      if (value) {
        this.show();
      }
      else {
        this.hide();
      }
    }

    return this;
  }


  /**
   * Get the value of the input.
   * @return {String}
   */
  getValue() {
    return this.inputEl.value;
  }


  /**
   * Clear the value of the input.
   */
  clearValue() {
    if (this.typeahead) this.typeahead.clear();
    else this.inputEl.value = '';
    return this;
  }


  /**
   * Disable the input.
   */
  disable() {
    if (this.typeahead) this.typeahead.disable();
    else this.inputEl.setAttribute('disabled', '');
    return this;
  }


  /**
   * Enable the input.
   */
  enable() {
    if (this.typeahead) this.typeahead.enable();
    else this.inputEl.removeAttribute('disabled');
    return this;
  }


  /**
   * Remove.
   * @param {Boolean} leaveElement
   */
  remove(leaveElement) {
    if (this.typeahead) this.typeahead.remove(leaveElement);
    return super.remove(leaveElement);
  }


  /**
   * Update the element in use and the position.
   * @param {Element} el
   */
  update(el) {
    if (this.typeahead) this.typeahead.remove();
    return super.update(el);
  }


  /**
   * Create the typeahead instance.
   */
  _createTypeahead() {

    if (this.typeahead === true || this.inputEl.getAttribute('data-typeahead') !== null) {
      this.typeahead = new Typeahead(this.el, {
        onBlur: this._onBlurBound
      });
    }
  }


  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.inputEl = this.el.querySelector('input, textarea');
    this.passwordToggleEl = this.el.querySelector('.spark-input__password-toggle');

    if (!this.inputEl) {
      throw new Error('No <input> or <textarea> element present in input container!', this.el);
    }

    this.messageEl = this.el.querySelector('.spark-input__message') || makeElement('<span class="spark-input__message"></span>');

    this.clearEl = this.el.querySelector('.spark-input__clear');
  }


  /**
   * Parse parameters from the elements.
   */
  _parseParams() {

    this.validatePattern = this.validatePattern || this.inputEl.getAttribute('data-validate');
    this.type = this.inputEl.getAttribute('type') || 'text';
    this.showCharacters = this.el.getAttribute('data-characters') !== null ? true : false;
    this.showCharactersRemaining = this.el.getAttribute('data-characters-remaining') !== null ? true : false;
    this.maxlength = this.inputEl.getAttribute('maxlength') || this.inputEl.getAttribute('data-maxlength-soft') || null;
    this.isTextarea = this.inputEl.nodeName.toLowerCase() === 'textarea' ? true : false;
    this.isActive = this.inputEl.value ? true : false;
  }


  /**
   * Set the characters count attribute.
   */
  _setCharactersCount() {

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
  }


  /**
   * Set the height of the textarea so that it doesn't scroll.
   */
  _setTextareaHeight() {

    var style = window.getComputedStyle(this.inputEl);
    var borders = parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10);

    this.inputEl.style.height = null;

    var height = this.inputEl.scrollHeight;
    var lines;

    // No height, most likely the element is invisible. Get a rough
    // approximation of height so we have something.
    if (!height) {
      lines = this.inputEl.innerHTML.split('\n');
      height = (Math.max(parseFloat(style.lineHeight)) * (lines.length)) + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    }

    this.inputEl.style.height = (height + borders) + 'px';
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
    this._onTogglePasswordViewHideBound = this._onTogglePasswordViewHide.bind(this);
    this._onClearClickBound = this._onClearClick.bind(this);
  }


  /**
   * Add event listeners for focus, blur, input, and click.
   */
  _addEventListeners() {

    this.inputEl.addEventListener('focus', this._onFocusBound);
    this.inputEl.addEventListener('blur', this._onBlurBound);
    this.inputEl.addEventListener('input', this._onInputBound);

    if (this.passwordToggleEl) {
      this.passwordToggleEl.addEventListener('click', this._onTogglePasswordViewHideBound);
    }

    if (this.clearEl) {
      this.clearEl.addEventListener('click', this._onClearClickBound);
    }
  }


  /**
   * Remove event listeners for focus, blur and input.
   */
  _removeEventListeners() {

    this.inputEl.removeEventListener('focus', this._onFocusBound);
    this.inputEl.removeEventListener('blur', this._onBlurBound);
    this.inputEl.removeEventListener('input', this._onInputBound);

    if (this.passwordToggleEl) {
      this.passwordToggleEl.removeEventListener('click', this._onTogglePasswordViewHideBound);
    }

    if (this.clearEl) {
      this.clearEl.removeEventListener('click', this._onClearClickBound);
    }
  }


  /**
   * Update the active class.
   */
  _updateClass() {
    toggleClass(this.el, 'active', this.isActive);
  }


  /**
   * When the input element gains focus.
   * @param {Object} e
   */
  _onFocus() {
    this.show();
    this._setCharactersCount();
    toggleClass(this.el, 'focus', true);
    (this.onFocus || noop)(this.inputEl.value, this);
  }


  /**
   * When the input element loses focus.
   * @param {Object} e
   */
  _onBlur() {
    if (!this.inputEl.value) {
      this.hide();
    }
    toggleClass(this.el, 'focus', false);
    (this.onBlur || noop)(this.inputEl.value, this);
  }


  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */
  _onInput() {

    this.validate();
    this._setCharactersCount();

    if (this.isTextarea) {
      this._setTextareaHeight();
    }

    (this.onChange || noop)(this.inputEl.value, this);
  }


  /**
   * When a clear button is clicked, empty the field.
   * @param {Object} e
   */
  _onClearClick() {
    this.inputEl.value = '';
    this.hide();
    (this.onChange || noop)(this.inputEl.value, this);
  }


  /**
   * Toggle the current type value (text/password) of password input.
   * @param {Object} e
   */
  _onTogglePasswordViewHide(e) {
    e.preventDefault();
    this.inputEl.setAttribute('type', this.inputEl.getAttribute('type') === 'password' ? 'text' : 'password');
  }
}


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

mixin(TextInput.prototype, messaging, validation);

export default TextInput;
