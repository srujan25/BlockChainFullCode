'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Show content in a modal.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Modal(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/modal.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Modal = function (_BaseComponent) {
  _inherits(Modal, _BaseComponent);

  /**
   * Modal constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Modal(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Modal);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Open
   */


  Modal.prototype.open = function open() {

    this.isActive = true;
    this._addWindowEventListeners();
    this._updateClasses();
    (0, _addClass2.default)(document.body, 'spark-modal-open');

    return this;
  };

  /**
   * Close
   */


  Modal.prototype.close = function close() {

    this.isActive = false;
    this._removeWindowEventListeners();
    this._updateClasses();
    (0, _removeClass2.default)(document.body, 'spark-modal-open');

    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   * @param {Object} params
   */


  Modal.prototype.update = function update(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    this._removeEventListeners();
    this._cacheElements(el || this.el, params);
    this._addEventListeners();
    this._updateClasses();
    this._removeWindowEventListeners();

    if (this.isActive) {
      this._addWindowEventListeners();
    }

    return this;
  };

  /**
   * Store a reference to the element. Either a modal itself
   * or a button referencing a modal may be passed.
   * @param {Element} el
   * @param {Element} params @optional
   */


  Modal.prototype._cacheElements = function _cacheElements(el, params) {

    var modalPassed = (0, _hasClass2.default)(el, 'spark-modal');
    var modalEl = params.modalEl;

    if (modalPassed) {
      this.modalEl = el;
    } else {
      this.el = el;
      this.modalEl = modalEl || document.querySelector(el.getAttribute('data-modal'));
    }

    this.scrollEl = this.modalEl.querySelector('.spark-modal__scroll') || this.modalEl;

    this.isActive = (0, _hasClass2.default)(this.el || this.modalEl, 'active');
  };

  /**
   * Update classes for the open or close state.
   */


  Modal.prototype._updateClasses = function _updateClasses() {
    (0, _toggleClass2.default)(this.modalEl, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Modal.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onKeyupBound = this._onKeyup.bind(this);
    this._onModalClickBound = this._onModalClick.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Modal.prototype._addEventListeners = function _addEventListeners() {
    if (this.el) this.el.addEventListener('click', this._onClickBound);
    if (this.modalEl) this.modalEl.addEventListener('click', this._onModalClickBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Modal.prototype._removeEventListeners = function _removeEventListeners() {
    if (this.el) this.el.removeEventListener('click', this._onClickBound);
    if (this.modalEl) this.modalEl.removeEventListener('click', this._onModalClickBound);
  };

  /**
   * Add event listeners for DOM events.
   */


  Modal.prototype._addWindowEventListeners = function _addWindowEventListeners() {
    this._removeWindowEventListeners();
    window.addEventListener('keyup', this._onKeyupBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Modal.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('keyup', this._onKeyupBound);
  };

  /**
   * When the button is clicked.
   * @param {Object} e
   */


  Modal.prototype._onClick = function _onClick() {
    this.open();
  };

  /**
   * When we are clicked, toggle the opened state.
   * @param {Object} e
   */


  Modal.prototype._onModalClick = function _onModalClick(e) {

    // The close button is clicked or the actual modal (gray area)
    if (e.target === this.scrollEl || e.target === this.modalEl || (0, _getParent2.default)(e.target, '.spark-modal__close, .spark-modal__dismiss', this.scrollEl)) {
      e.preventDefault();
      this.close();
    }
  };

  /**
   * When a key is pressed on the window and it's an ESC, close the modal.
   * @param {Object} e
   */


  Modal.prototype._onKeyup = function _onKeyup(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  };

  return Modal;
}(_base2.default);

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */


Modal.prototype.defaults = {
  el: null,
  modalEl: null,
  scrollEl: null,
  isActive: false,
  _onClickBound: null,
  _onKeyupBound: null,
  _onModalClickBound: null
};

exports.default = Modal;
module.exports = exports['default'];
//# sourceMappingURL=modal.js.map
