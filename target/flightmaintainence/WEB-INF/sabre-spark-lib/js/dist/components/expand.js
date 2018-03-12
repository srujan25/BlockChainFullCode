'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Expand
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Expand and collapse an element.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Expand(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/expand.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Expand = function (_BaseComponent) {
  _inherits(Expand, _BaseComponent);

  /**
   * Expand constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Expand(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Expand);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Expand
   */


  Expand.prototype.expand = function expand() {

    (this.onBeforeExpand || noop)();

    (0, _height2.default)({
      el: this.el,
      toggleClass: 'expanded',
      toggleEl: '.spark-expand__content, .spark-panel__content'
    });

    this.isExpanded = true;
    this._updateClasses();
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.el.dispatchEvent(e);

    // If the expand element have input, focus on the first one.
    if (this.el.querySelector('input')) {
      this.el.querySelector('input').focus();
    }

    (this.onAfterExpand || noop)();

    return this;
  };

  /**
   * Collapse
   */


  Expand.prototype.collapse = function collapse() {

    (this.onBeforeCollapse || noop)();

    (0, _height2.default)({
      el: this.el,
      toggleEl: '.spark-expand__content, .spark-panel__content',
      toggleValue: 'none',
      action: 'collapse'
    });

    this.isExpanded = false;
    this._updateClasses();

    (this.onAfterCollapse || noop)();

    return this;
  };

  /**
   * Toggle the expand state.
   */


  Expand.prototype.toggle = function toggle() {
    return this[this.isExpanded ? 'collapse' : 'expand']();
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  Expand.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.isExpanded = (0, _hasClass2.default)(this.el, 'expanded');

    this.accordionHeading = this.el.querySelector('[role="heading"]');
    this.accordionContent = this.el.querySelector('.spark-panel__content');

    this.panelContent = this.el.querySelector('.spark-expand__content');
    this.panelCollapsedButton = this.el.querySelector('.spark-expand__hide--expanded');
    this.panelExpandedButton = this.el.querySelector('.spark-expand__show--expanded');
  };

  /**
   * Update classes for the expand or collapse state.
   */


  Expand.prototype._updateClasses = function _updateClasses() {
    (0, _toggleClass2.default)(this.el, 'expanded', this.isExpanded);
    this._updateAriaAttributes();
  };

  /**
   * Update aria attributes for the expand or collapse state.
   */


  Expand.prototype._updateAriaAttributes = function _updateAriaAttributes() {
    if (this.isExpanded) {
      this.accordionHeading ? this.accordionHeading.setAttribute('aria-expanded', 'true') : null;
      this.accordionContent ? this.accordionContent.setAttribute('aria-hidden', 'false') : null;

      this.panelContent ? this.panelContent.setAttribute('aria-hidden', 'false') : null;
      this.panelCollapsedButton ? this.panelCollapsedButton.setAttribute('aria-hidden', 'true') : null;
      this.panelExpandedButton ? this.panelExpandedButton.setAttribute('aria-hidden', 'false') : null;
    } else {
      this.accordionHeading ? this.accordionHeading.setAttribute('aria-expanded', 'false') : null;
      this.accordionContent ? this.accordionContent.setAttribute('aria-hidden', 'true') : null;

      this.panelContent ? this.panelContent.setAttribute('aria-hidden', 'true') : null;
      this.panelCollapsedButton ? this.panelCollapsedButton.setAttribute('aria-hidden', 'false') : null;
      this.panelExpandedButton ? this.panelExpandedButton.setAttribute('aria-hidden', 'true') : null;
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Expand.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Expand.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Expand.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
  };

  /**
   * When we are clicked, toggle the expanded state.
   * @param {Object} e
   */


  Expand.prototype._onClick = function _onClick(e) {

    if (!(0, _getParent2.default)(e.target, '.spark-expand__toggle, [data-role="toggle"], [role="heading"]', this.el)) {
      return;
    }

    e.preventDefault();
    this.toggle();
  };

  /**
   * When the space or enter key is pressed on the toggle, toggle!
   * @param {Object} e
   */


  Expand.prototype._onKeydown = function _onKeydown(e) {

    if (!(0, _getParent2.default)(e.target, '.spark-expand__toggle, [data-role="toggle"], [role="heading"]', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    // Space or enter
    if (code === 32 || code === 13) {
      e.preventDefault();
      this.toggle();
    }
  };

  return Expand;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Expand.prototype._whitelistedParams = ['onBeforeExpand', 'onAfterExpand', 'onBeforeCollapse', 'onAfterCollapse'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Expand.prototype.defaults = {
  el: null,
  isExpanded: false,
  onBeforeExpand: null,
  onAfterExpand: null,
  onBeforeCollapse: null,
  onAfterCollapse: null,
  _onClickBound: null,
  _onKeydownBound: null
};

exports.default = Expand;
module.exports = exports['default'];
//# sourceMappingURL=expand.js.map
