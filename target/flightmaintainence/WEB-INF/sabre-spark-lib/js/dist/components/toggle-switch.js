'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # ToggleSwitch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ToggleSwitch and collapse an element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new ToggleSwitch(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/ToggleSwitch.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var ToggleSwitch = function (_BaseComponent) {
  _inherits(ToggleSwitch, _BaseComponent);

  /**
   * ToggleSwitch constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function ToggleSwitch(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ToggleSwitch);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Toggle the ToggleSwitch state.
   */


  ToggleSwitch.prototype.toggle = function toggle() {
    if (!this.input) return this;
    return this.input.checked ? this.deactivate() : this.activate();
  };

  /**
   * Activate toggle state
   */


  ToggleSwitch.prototype.activate = function activate() {
    return this.setValue(true);
  };

  /**
   * Deactivate toggle state
   */


  ToggleSwitch.prototype.deactivate = function deactivate() {
    return this.setValue(false);
  };

  /**
   * Set the value.
   * @param {Boolean} check
   */


  ToggleSwitch.prototype.setValue = function setValue(check) {
    if (this.input) {
      if (this.input.checked !== check) {
        this.input.checked = check;
        (this.onChange || noop)(check, this);
      }
    }
    return this;
  };

  /**
   * Get the value.
   * @return {Boolean}
   */


  ToggleSwitch.prototype.getValue = function getValue() {
    return this.input && this.input.checked;
  };

  /**
   * Clear the checked value. Not very helpful but here for parity.
   */


  ToggleSwitch.prototype.clearValue = function clearValue() {
    return this.deactivate();
  };

  /**
   * Enable the input.
   */


  ToggleSwitch.prototype.enable = function enable() {
    if (this.input) this.input.removeAttribute('disabled');
    return this;
  };

  /**
   * Disable the input.
   */


  ToggleSwitch.prototype.disable = function disable() {
    if (this.input) this.input.setAttribute('disabled', '');
    return this;
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  ToggleSwitch.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.input = el.querySelector('.spark-toggle__input');
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  ToggleSwitch.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onKeyupBound = (0, _debounce2.default)(this._onKeyup.bind(this), 100);
  };

  /**
   * Add event listeners for DOM events.
   */


  ToggleSwitch.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('keydown', this._onKeydownBound);
    this.el.addEventListener('keyup', this._onKeyupBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  ToggleSwitch.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('keydown', this._onKeydownBound);
    this.el.removeEventListener('keyup', this._onKeyupBound);
  };

  /**
   * Allow onChange when the space key is pressed
   * @param {Object} e
   */


  ToggleSwitch.prototype._onKeyup = function _onKeyup(e) {
    if (!(0, _getParent2.default)(e.target, '.spark-toggle-switch, spark-toggle-switch__handle', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    if (code === 32) {
      var check = this.getValue();
      (this.onChange || noop)(check, this);
    }
  };

  /**
   * When the space or enter key is pressed on the toggle, toggle!
   * @param {Object} e
   */


  ToggleSwitch.prototype._onKeydown = function _onKeydown(e) {

    if (!(0, _getParent2.default)(e.target, '.spark-toggle-switch, spark-toggle-switch__handle', this.el)) {
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
  };

  return ToggleSwitch;
}(_base2.default);

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

exports.default = ToggleSwitch;
module.exports = exports['default'];
//# sourceMappingURL=toggle-switch.js.map
