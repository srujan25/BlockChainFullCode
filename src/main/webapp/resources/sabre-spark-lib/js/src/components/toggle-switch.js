/**
 * # ToggleSwitch
 * ToggleSwitch and collapse an element.
 *
 * @example
 * new ToggleSwitch(el);
 *
 * @module components/ToggleSwitch.js
 */
import BaseComponent from './base';
import getParent from '../helpers/traversal/get-parent';
import debounce from '../helpers/util/debounce';

const noop = function() {};

class ToggleSwitch extends BaseComponent {

  /**
   * ToggleSwitch constructor.
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
   * Toggle the ToggleSwitch state.
   */
  toggle() {
    if (!this.input) return this;
    return this.input.checked ? this.deactivate() : this.activate();
  }


  /**
   * Activate toggle state
   */
  activate() {
    return this.setValue(true);
  }


  /**
   * Deactivate toggle state
   */
  deactivate() {
    return this.setValue(false);
  }


  /**
   * Set the value.
   * @param {Boolean} check
   */
  setValue(check) {
    if (this.input) {
      if (this.input.checked !== check) {
        this.input.checked = check;
        (this.onChange || noop)(check, this);
      }
    }
    return this;
  }


  /**
   * Get the value.
   * @return {Boolean}
   */
  getValue() {
    return this.input && this.input.checked;
  }


  /**
   * Clear the checked value. Not very helpful but here for parity.
   */
  clearValue() {
    return this.deactivate();
  }


  /**
   * Enable the input.
   */
  enable() {
    if (this.input) this.input.removeAttribute('disabled');
    return this;
  }


  /**
   * Disable the input.
   */
  disable() {
    if (this.input) this.input.setAttribute('disabled', '');
    return this;
  }


  /**
   * Store a reference to the element.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.input = el.querySelector('.spark-toggle__input');
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onKeyupBound = debounce(this._onKeyup.bind(this), 100);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    this.el.addEventListener('keydown', this._onKeydownBound);
    this.el.addEventListener('keyup', this._onKeyupBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    this.el.removeEventListener('keydown', this._onKeydownBound);
    this.el.removeEventListener('keyup', this._onKeyupBound);
  }


  /**
   * Allow onChange when the space key is pressed
   * @param {Object} e
   */
  _onKeyup(e) {
    if (!getParent(e.target, '.spark-toggle-switch, spark-toggle-switch__handle', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    if (code === 32) {
      let check = this.getValue();
      (this.onChange || noop)(check, this);
    }
  }


  /**
   * When the space or enter key is pressed on the toggle, toggle!
   * @param {Object} e
   */
  _onKeydown(e) {

    if (!getParent(e.target, '.spark-toggle-switch, spark-toggle-switch__handle', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    switch (code) {
      case 32:
        // space
        // Skip, native works as expected
        break;
      case 13:
        // enter
        e.preventDefault();
        this.toggle();
        break;
      case 39:
      case 40:
        // right
        // down
        e.preventDefault();
        this.activate();
        break;
      case 37:
      case 38:
        // left
        // up
        e.preventDefault();
        this.deactivate();
        break;
    }
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
ToggleSwitch.prototype._whitelistedParams = ['onChange'];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
ToggleSwitch.prototype.defaults = {
  el: null,
  input: null,
  onChange: null,
  _onKeydownBound: null
};

export default ToggleSwitch;
