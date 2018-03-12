'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _typeahead = require('./typeahead');

var _typeahead2 = _interopRequireDefault(_typeahead);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # DateTypeahead
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Listen to an input element and format it as the user types.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new DateTypeahead(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/date-typeahead.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

function createDefaultElement() {
  var el = document.createElement('span');
  el.className = 'spark-input';
  return el;
}

var DateTypeahead = function (_BaseComponent) {
  _inherits(DateTypeahead, _BaseComponent);

  /**
   * DateTypeahead constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  function DateTypeahead(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DateTypeahead);

    // If only one arg passed, assume it was a parameters
    // object since the user MUST provide those but the element
    // is optional. Doing it this way to keep the arity the same
    // as other components.
    if (arguments.length < 2) {
      params = el || {};
      el = createDefaultElement();
    }

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    _this._bindEventListenerCallbacks();
    _this._createTypeahead(el, params);
    return _this;
  }

  /**
   * Get the value.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {Mixed}
   */


  DateTypeahead.prototype.getValue = function getValue(asInt) {
    return this.typeahead.getValue(asInt);
  };

  /**
   * Set the value.
   * @param {Mixed} val
   */


  DateTypeahead.prototype.setValue = function setValue(val) {
    return this.typeahead.setValue(val);
  };

  /**
   * Clear the value.
   */


  DateTypeahead.prototype.clearValue = function clearValue() {
    return this.typeahead.clearValue();
  };

  /**
   * Enable the input.
   */


  DateTypeahead.prototype.enable = function enable() {
    return this.typeahead.enable();
  };

  /**
   * Disable the input.
   */


  DateTypeahead.prototype.disable = function disable() {
    return this.typeahead.disable();
  };

  /**
   * Run the typeahead calculations.
   */


  DateTypeahead.prototype.run = function run() {
    return this.typeahead.run();
  };

  /**
   * Pause the typeahead events.
   */


  DateTypeahead.prototype.pause = function pause() {
    return this.typeahead.pause();
  };

  /**
   * Reseume typeahead events.
   */


  DateTypeahead.prototype.resume = function resume() {
    return this.typeahead.resume();
  };

  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateTypeahead.prototype.remove = function remove(leaveElement) {
    this.typeahead.remove(leaveElement);
    _BaseComponent.prototype.remove.call(this, leaveElement);
    return this;
  };

  /**
   * Cache elements.
   * @param {Element} el
   */


  DateTypeahead.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
  };

  /**
   * Parse parameters from the elements.
   */


  DateTypeahead.prototype._parseParams = function _parseParams() {

    this.type = this.type !== null ? this.type : (0, _parseAttribute.string)(this.el, 'data-type', 'day');
    this.format = this.format !== null ? this.format : (0, _parseAttribute.string)(this.el, 'data-format', null);
    this.placeholder = this.placeholder !== null ? this.placeholder : (0, _parseAttribute.string)(this.el, 'data-placeholder', null);
    this.len = this.len !== null ? this.len : (0, _parseAttribute.number)(this.el, 'length', null);
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
  };

  /**
   * Create a typeahead with the given format.
   * @param {Object} el
   */


  DateTypeahead.prototype._createTypeahead = function _createTypeahead(el) {

    this.typeahead = new _typeahead2.default(el, {
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
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  DateTypeahead.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onTypeaheadChangeBound = this._onTypeaheadChange.bind(this);
    this._onTypeaheadInputBound = this._onTypeaheadInput.bind(this);
    this._onTypeaheadFocusBound = this._onTypeaheadFocus.bind(this);
    this._onTypeaheadBlurBound = this._onTypeaheadBlur.bind(this);
    this._onTypeaheadBackspaceBound = this._onTypeaheadBackspace.bind(this);
    this._onTypeaheadEndBound = this._onTypeaheadEnd.bind(this);
  };

  /**
   * Take a length and return a format string with that many digits.
   * @param {Number} length
   * @return {String}
   */


  DateTypeahead.prototype._lengthToFormat = function _lengthToFormat(length) {

    var i = 0;
    var ret = '';

    for (; i < length; i++) {
      ret += '\\d';
    }

    return ret;
  };

  /**
   * Check to see if an input value is valid.
   * @param {Mixed} val
   * @param {Boolean} allowEmpty All the value to be empty instead of 0.
   */


  DateTypeahead.prototype._checkValidity = function _checkValidity(val, allowEmpty) {

    val = parseInt(val, 10);

    var origVal = val;
    var isNumber = !isNaN(val);

    // If we were passed an empty string or something, don't try to validate.
    // Treat zeros as a non-entry for days and months.
    if (isNumber) {

      if (this.type === 'year') {
        val = val === 0 ? allowEmpty ? '' : 0 : Math.max(val, 0);
      } else if (this.type === 'month') {
        val = val ? Math.min(Math.max(val, 1), 12) : allowEmpty ? '' : 0;
      } else {
        val = val ? Math.min(Math.max(val, 1), 31) : allowEmpty ? '' : 0;
      }
    }

    // Need to make sure we aren't looping forever on these updates.
    if (isNumber && val !== origVal) {
      this.typeahead.setValue(val + '');
      return false;
    }

    return true;
  };

  /**
   * When the typeahead changes, make sure the value is valid. This
   * is very basic validation. More complex validation like the number
   * of days in a specific month should be handled by the callback.
   * And run our callback.
   * @param {String} val The value of the input
   * @param {String} oldVal The previous value
   */


  DateTypeahead.prototype._onTypeaheadChange = function _onTypeaheadChange(val) {
    if (this._checkValidity(val)) {
      (this.onChange || noop)(val, this);
    }
  };

  /**
   * Callback for `input` event
   * @param {String} val The value of the input
   * @param {String} oldVal The previous value
   *
   */


  DateTypeahead.prototype._onTypeaheadInput = function _onTypeaheadInput(val) {
    (this.onInput || noop)(val, this);
  };

  /**
   * When the typeahead gains focus, let anyone who is interested know.
   * @param {String} val
   */


  DateTypeahead.prototype._onTypeaheadFocus = function _onTypeaheadFocus(val) {
    (this.onFocus || noop)(val, this);
  };

  /**
   * When the typeahead loses focus, let anyone who is interested know.
   * @param {String} val
   */


  DateTypeahead.prototype._onTypeaheadBlur = function _onTypeaheadBlur(val) {
    this._checkValidity(val, true);
    (this.onBlur || noop)(val, this);
  };

  /**
   * When the typeahead fires a backspace event because it's empty and
   * the user is hitting backspace, let anyone who is interested know.
   * @param {String} val
   */


  DateTypeahead.prototype._onTypeaheadBackspace = function _onTypeaheadBackspace(val) {
    (this.onBackspace || noop)(val, this);
  };

  /**
   * When the typeahead is full and at its end, let anyone who is interested know.
   * @param {Object} typeahead
   * @param {String} character Optional The character to pass to the next input.
   */


  DateTypeahead.prototype._onTypeaheadEnd = function _onTypeaheadEnd(typeahead, character) {
    (this.onEnd || noop)(this, character);
  };

  return DateTypeahead;
}(_base2.default);

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

exports.default = DateTypeahead;
module.exports = exports['default'];
//# sourceMappingURL=date-typeahead.js.map
