/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Table = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * # Base Component
                                                                                                                                                           * The base class for Spark JS components. This class should never be
                                                                                                                                                           * instantiated directly.
                                                                                                                                                           *
                                                                                                                                                           * @param {Element} el
                                                                                                                                                           * @param {Object} params
                                                                                                                                                           *
                                                                                                                                                           * @module components/base.js
                                                                                                                                                           */

var noop = function noop() {};

var Base = function () {

  /**
   * Set parameters and cache elements.
   */
  function Base(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Base);

    if (params.elRequired && !el) {
      return;
    }

    this.setParams(this.defaults || {}, true);
    this.setParams(params);
    (this._cacheElements || noop).call(this, el, params);
    (this._parseParams || noop).call(this);
  }

  /**
   * Remove the component from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Base.prototype.remove = function remove(leaveElement) {

    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    if (!leaveElement && this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }

    this.unsetParams(this.defaults);

    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   * @param {Object} params Optional
   */


  Base.prototype.update = function update(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    (this._cacheElements || noop).call(this, el || this.el, params);
    (this._parseParams || noop).call(this);

    if (this._addEventListeners) {
      this._addEventListeners();
    }

    return this;
  };

  /**
   * Set a hash of parameters if they're whitelisted or we're told to force the set.
   * This is used to set initial values as well as set passed parameters.
   * @param {Object} params
   * @param {Boolean} force Force setting even if the param is not whitelisted.
   */


  Base.prototype.setParams = function setParams(params, force) {
    var _this = this;

    (0, _each2.default)(params, function (k, v) {
      if (_this._whitelistedParams.indexOf(k) !== -1 || force) {
        _this[k] = v;
      }
    });

    return this;
  };

  /**
   * Unset all parameters.
   * @param {Array|Object} keys
   * @param {Object} scope The object to unset the params from. Defaults to `this`.
   */


  Base.prototype.unsetParams = function unsetParams(keys, scope) {

    keys = keys instanceof Array ? keys : Object.keys(keys);
    scope = scope || this;
    (0, _each2.default)(keys, function (k) {
      delete scope[k];
    });

    return this;
  };

  return Base;
}();

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Base.prototype._whitelistedParams = [];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Base.prototype.defaults = {};

exports.default = Base;
module.exports = exports['default'];


},{"../helpers/util/each":17}],2:[function(require,module,exports){
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


},{"../helpers/animation/height":4,"../helpers/dom/has-class":6,"../helpers/dom/toggle-class":9,"../helpers/traversal/get-parent":13,"./base":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _expand = require('./expand');

var _expand2 = _interopRequireDefault(_expand);

var _setCaret = require('../helpers/form/set-caret');

var _setCaret2 = _interopRequireDefault(_setCaret);

var _formData = require('../helpers/form/form-data');

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _getIndex = require('../helpers/traversal/get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

var _getSiblingBefore = require('../helpers/traversal/get-sibling-before');

var _getSiblingBefore2 = _interopRequireDefault(_getSiblingBefore);

var _getSiblingAfter = require('../helpers/traversal/get-sibling-after');

var _getSiblingAfter2 = _interopRequireDefault(_getSiblingAfter);

var _matches = require('../helpers/traversal/matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Table
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Table(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/table.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Table = function (_BaseComponent) {
  _inherits(Table, _BaseComponent);

  /**
   * Table constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Table(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Table);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();

    _this._initRows();

    if (_this.isSpreadsheet || _this.isEditRows) {
      _this._deactivateAllInputs();
    }

    if (_this.isResizable) {
      _this._initResize();
    }

    _this._disableRowsColumnsCells();

    _this._initExpands();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Disable the form field in a table cell.
   * @param {Element} el
   */


  Table.prototype.disableCell = function disableCell(el) {
    el.disabled = true;
    (0, _addClass2.default)((0, _getParent2.default)(el, 'td'), 'spark-table__disabled-cell');
    return this;
  };

  /**
   * Enable the form field in a table cell.
   * @param {Element} el
   */


  Table.prototype.enableCell = function enableCell(el) {
    el.disabled = false;
    (0, _removeClass2.default)((0, _getParent2.default)(el, 'td'), 'spark-table__disabled-cell');
    return this;
  };

  /**
   * Disable a row and all the cells inside of it.
   * @param {Element} el
   */


  Table.prototype.disableRow = function disableRow(el) {
    (0, _addClass2.default)(el, 'spark-table__disabled-row');
    (0, _each2.default)(el.querySelectorAll('input, button, a'), function (i) {
      i.disabled = true;
    });
    return this;
  };

  /**
   * Enable a row and all the cells inside of it.
   * @param {Element} el
   */


  Table.prototype.enableRow = function enableRow(el) {
    (0, _removeClass2.default)(el, 'spark-table__disabled-row');
    (0, _each2.default)(el.querySelectorAll('input, button, a'), function (i) {
      i.disabled = false;
    });
    return this;
  };

  /**
   * Disable a column and all the cells inside of it.
   * @param {Element} el
   */


  Table.prototype.disableColumn = function disableColumn(el) {

    var index = (0, _getIndex2.default)(el.parentNode.children, el);

    (0, _each2.default)(this.tableEl.querySelectorAll('tbody tr'), function (row) {
      this.disableCell(row.children[index].querySelector('input'));
    }.bind(this));

    (0, _addClass2.default)(el, 'spark-table__disabled-column');

    return this;
  };

  /**
   * Enable a column and all the cells inside of it.
   * @param {Element} el
   */


  Table.prototype.enableColumn = function enableColumn(el) {

    var index = (0, _getIndex2.default)(el.parentNode.children, el);

    (0, _each2.default)(this.tableEl.querySelectorAll('tbody tr'), function (row) {
      this.enableCell(row.children[index].querySelector('input'));
    }.bind(this));

    (0, _removeClass2.default)(el, 'spark-table__disabled-column');

    return this;
  };

  /**
   * Remove the table anc cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Table.prototype.remove = function remove(leaveElement) {
    (0, _each2.default)(this._expands, function (e) {
      e.remove(leaveElement);
    });
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Activate a row.
   * @param {Number|Element} row
   */


  Table.prototype.activateRow = function activateRow(row) {
    row = typeof row === 'number' ? this.tableEl.querySelectorAll('tbody tr')[row] : row;
    if (row) this._makeRowActive(row);
    return this;
  };

  /**
   * Activate multiple rows.
   * @param {Array} rows
   */


  Table.prototype.activateRows = function activateRows(rows) {
    (0, _each2.default)(rows, this.activateRow.bind(this));
    return this;
  };

  /**
   * Deactivate a row.
   * @param {Number|Element} row
   */


  Table.prototype.deactivateRow = function deactivateRow(row) {
    row = typeof row === 'number' ? this.tableEl.querySelectorAll('tbody tr')[row] : row;
    if (row) this._makeRowInActive(row);
    return this;
  };

  /**
   * Deactivate multiple rows.
   * @param {Array} rows
   */


  Table.prototype.deactivateRows = function deactivateRows(rows) {
    (0, _each2.default)(rows, this.deactivateRow.bind(this));
    return this;
  };

  /**
   * Get an array of currently active rows.
   * @return {Array}
   */


  Table.prototype.getActiveRows = function getActiveRows() {

    var arr = [];

    (0, _each2.default)(this.el.querySelectorAll('tbody tr.active'), function (tr) {
      arr.push(tr);
    });

    return arr;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Table.prototype.update = function update(el) {

    this._removeEventListeners();

    this._cacheElements(el || this.el);
    this._parseParams();

    this._addEventListeners();

    this._initRows();

    if (this.isSpreadsheet || this.isEditRows) {
      this._deactivateAllInputs();
    }

    if (this.isResizable) {
      this._initResize();
    }

    this._disableRowsColumnsCells();

    this._initExpands();

    return this;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Table.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.tableEl = el.querySelector('table');
  };

  /**
   * Parse parameters from the elements.
   */


  Table.prototype._parseParams = function _parseParams() {

    if (!this.tableEl) {
      return;
    }

    this.isSpreadsheet = this.isSpreadsheet !== null ? this.isSpreadsheet : (0, _hasClass2.default)(this.el, 'spark-table--spreadsheet') ? true : false;
    this.isEditRows = this.isEditRows !== null ? this.isEditRows : (0, _hasClass2.default)(this.el, 'spark-table--edit-rows') ? true : false;
    this.isResizable = this.isResizable !== null ? this.isResizable : (0, _hasClass2.default)(this.el, 'spark-table--resizable') ? true : false;
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Table.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onClickBound = this._onClick.bind(this);
    this._onChangeBound = this._onChange.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);

    this._onTouchstartBound = this._onTouchstart.bind(this);
    this._onTouchendBound = this._onTouchend.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);

    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Table.prototype._addEventListeners = function _addEventListeners() {

    this.el.addEventListener('click', this._onClickBound, false);
    this.el.addEventListener('change', this._onChangeBound, false);
    this.el.addEventListener('focus', this._onFocusBound, true);
    this.el.addEventListener('blur', this._onBlurBound, true);

    if (this.isSpreadsheet) {
      this.el.addEventListener('touchstart', this._onTouchstartBound, false);
      this.el.addEventListener('touchend', this._onTouchendBound, false);
      this.el.addEventListener('keydown', this._onKeydownBound, false);
    }

    if (this.isResizable) {
      this.tableEl.addEventListener('mousedown', this._onMouseDownBound, false);
    }
  };

  /**
   * Remove event listeners for DOM events..
   */


  Table.prototype._removeEventListeners = function _removeEventListeners() {

    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('change', this._onChangeBound);
    this.el.removeEventListener('focus', this._onFocusBound);
    this.el.removeEventListener('blur', this._onBlurBound);

    this.el.removeEventListener('touchstart', this._onTouchstartBound);
    this.el.removeEventListener('touchend', this._onTouchendBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);

    this.tableEl.removeEventListener('mousedown', this._onMouseDownBound);

    this._removeResizeListeners();
  };

  /**
   * Add listeners for mousemove and mouseup events.
   */


  Table.prototype._addResizeListeners = function _addResizeListeners() {
    window.addEventListener('mousemove', this._onMouseMoveBound, false);
    window.addEventListener('mouseup', this._onMouseUpBound, false);
  };

  /**
   * Remove listeners for mosuemove and mouseup.
   */


  Table.prototype._removeResizeListeners = function _removeResizeListeners() {
    window.removeEventListener('mousemove', this._onMouseMoveBound);
    window.removeEventListener('mouseup', this._onMouseUpBound);
  };

  /**
   * Toggle the active state on a row.
   * @param {Object} row
   */


  Table.prototype._toggleRowActive = function _toggleRowActive(row) {

    if ((0, _hasClass2.default)(row, 'active')) {
      this._makeRowInActive(row);
      this._uncheckSelectAll();
    } else {
      this._makeRowActive(row);
    }
  };

  /**
   * Make a row active
   * @param {Element} row
   */


  Table.prototype._makeRowActive = function _makeRowActive(row) {
    (0, _addClass2.default)(row, 'active');
    (row.querySelector('.spark-table__checkbox input[type="checkbox"]:not([disabled])') || {}).checked = true;
  };

  /**
   * Make a row active
   * @param  {Element} row
   */


  Table.prototype._makeRowInActive = function _makeRowInActive(row) {
    (0, _removeClass2.default)(row, 'active');
    (row.querySelector('.spark-table__checkbox input[type="checkbox"]:not([disabled])') || {}).checked = false;
  };

  /**
   * Toggle active on each row.
   * @param {NodeList} rows
   * @param {Boolean} active
   */


  Table.prototype._toggleRowsActive = function _toggleRowsActive(rows, active) {

    var func = active ? '_makeRowActive' : '_makeRowInActive';
    var i = 0;
    var len = rows.length;

    for (; i < len; i++) {
      this[func](rows[i]);
    }
  };

  /**
   * Toggle whether everything should be selected. Find the checkbox input inside of the
   * given element and invert its state.
   * @param {Element} el
   */


  Table.prototype._toggleSelectAll = function _toggleSelectAll(el) {

    var checkbox = el.querySelector('.spark-table__select-all input[type="checkbox"]');

    if (!checkbox) {
      return;
    }

    this._toggleRowsActive(this.el.querySelectorAll('tbody tr'), !checkbox.checked);

    checkbox.checked = !checkbox.checked;
  };

  /**
   * Uncheck the select all checkboxes.
   */


  Table.prototype._uncheckSelectAll = function _uncheckSelectAll() {

    var checkboxes = this.el.querySelectorAll('.spark-table__select-all input[type="checkbox"]');
    var i = 0;
    var len = checkboxes.length;

    for (; i < len; i++) {
      checkboxes[i].checked = false;
    }
  };

  /**
   * Deactivate editing in all input fields.
   */


  Table.prototype._deactivateAllInputs = function _deactivateAllInputs() {

    if (!this.tableEl) {
      return;
    }

    this._deactivateInputs(this.tableEl);
  };

  /**
   * Deactivate all the inputs inside an element
   * @param {Element} el
   */


  Table.prototype._deactivateInputs = function _deactivateInputs(el) {

    var inputs = el.querySelectorAll('input:not([type="checkbox"])');
    var i = 0;

    var len = inputs.length;

    for (; i < len; i++) {
      this._deactivateInput(inputs[i]);
    }
  };

  /**
   * Make an input field readonly.
   * @param {Element} input
   */


  Table.prototype._deactivateInput = function _deactivateInput(input) {
    input.setAttribute('readonly', '');
    (0, _removeClass2.default)(input.parentNode, 'editing');
  };

  /**
   * Activate all the inputs inside an element
   * @param {Element} el
   */


  Table.prototype._activateInputs = function _activateInputs(el) {

    var inputs = el.querySelectorAll('input:not([type="checkbox"])');
    var i = 0;

    var len = inputs.length;

    for (; i < len; i++) {
      this._activateInput(inputs[i]);
    }
  };

  /**
   * Make an input field readable.
   * @param {Element} input
   */


  Table.prototype._activateInput = function _activateInput(input) {
    input.removeAttribute('readonly');
    (0, _addClass2.default)(input.parentNode, 'editing');
    if (input.type !== 'checkbox' && input.type !== 'radio') {
      (0, _setCaret2.default)(input, -1);
    }
  };

  /**
   * Activate an input, unless it's already enabled in which case
   * the focus should move down a row.
   * @param {Element} input
   */


  Table.prototype._activateInputOrFocusDown = function _activateInputOrFocusDown(input) {

    // Currently readonly
    if (input.getAttribute('readonly') === '') {
      this._activateInput(input);
      return;
    }

    this._focusDown(input, true);
  };

  /**
   * Find all the rows, columns and cells that should be disabled.
   */


  Table.prototype._disableRowsColumnsCells = function _disableRowsColumnsCells() {
    (0, _each2.default)(this.tableEl.querySelectorAll('td input[disabled]'), this.disableCell.bind(this));
    (0, _each2.default)(this.tableEl.querySelectorAll('.spark-table__disabled-row'), this.disableRow.bind(this));
    (0, _each2.default)(this.tableEl.querySelectorAll('.spark-table__disabled-column'), this.disableColumn.bind(this));
  };

  /**
   * Move our focus up a row from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */


  Table.prototype._focusUp = function _focusUp(input, force) {
    return this._focusUpDown(input, 'up', force);
  };

  /**
   * Move our focus down a row from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */


  Table.prototype._focusDown = function _focusDown(input, force) {
    return this._focusUpDown(input, 'down', force);
  };

  /**
   * Focus on a row up or down from the given element.
   * @param {Element} input
   * @param {String} direction up|down
   * @param {Boolean} force Force the move even if the element is active.
   */


  Table.prototype._focusUpDown = function _focusUpDown(input, direction, force) {

    // If we're not being told to force and the item is not read only
    if (!force && input.getAttribute('readonly') === null) {
      return;
    }

    this._deactivateInput(input);
    var td = (0, _getParent2.default)(input, 'td', this.el);

    if (!td) {
      return;
    }

    var index = (0, _getIndex2.default)(td.parentNode.children, td);
    var nextRow = (direction === 'up' ? _getSiblingBefore2.default : _getSiblingAfter2.default)(td.parentNode, 'tr');

    if (!nextRow) {
      return;
    }

    var newTd = nextRow.children[index];

    if (!newTd) {
      return;
    }

    var newInput = newTd.querySelector('input:not([type="checkbox"]), select');

    if (newInput) {
      if (newInput.disabled) {
        this._focusUpDown(newInput, direction, force);
      } else {
        newInput.focus();
      }
    }
  };

  /**
   * Move our focus left a cell from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */


  Table.prototype._focusLeft = function _focusLeft(input, force) {
    return this._focusLeftRight(input, 'left', force);
  };

  /**
   * Move our focus right a cell from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */


  Table.prototype._focusRight = function _focusRight(input, force) {
    return this._focusLeftRight(input, 'right', force);
  };

  /**
   * Focus on a cell left or down from the given element.
   * @param {Element} input
   * @param {String} direction up|down
   * @param {Boolean} force Force the move even if the element is active.
   */


  Table.prototype._focusLeftRight = function _focusLeftRight(input, direction, force) {

    // If we're not being told to force and the item is not read only
    if (!force && input.getAttribute('readonly') === null) {
      return;
    }

    this._deactivateInput(input);
    var td = (0, _getParent2.default)(input, 'td', this.el);

    if (!td) {
      return;
    }

    var newTd = (direction === 'left' ? _getSiblingBefore2.default : _getSiblingAfter2.default)(td, 'td');

    if (!newTd) {
      return;
    }

    var newInput = newTd.querySelector('input:not([type="checkbox"]), select');

    if (newInput) {
      if (newInput.disabled) {
        this._focusLeftRight(newInput, direction, force);
      } else {
        newInput.focus();
      }
    }
  };

  /**
   * Check for two click events on the same element in short succession.
   * @param {Element} el
   */


  Table.prototype._checkDoubleClick = function _checkDoubleClick(el) {

    var now = Date.now();
    var lastTime = this._lastClickTime;
    var lastEl = this._lastClickEl;

    this._lastClickTime = now;
    this._lastClickEl = el;

    if (el === lastEl && now - 500 < lastTime) {
      return true;
    }

    return false;
  };

  /**
   * Unset the last clicked element.
   */


  Table.prototype._clearClicked = function _clearClicked() {
    this._lastClickEl = null;
  };

  /**
   * Enable editing on a row.
   * @param {Element} row
   */


  Table.prototype._editRow = function _editRow(row) {

    if (!row) {
      return;
    }

    this._editingCount++;

    this._activateInputs(row);
    (0, _formData.store)(row);
    (0, _addClass2.default)(row, 'editing');
    this._updateBindings();
  };

  /**
   * Cancel editing a row.
   * @param {Element} row
   */


  Table.prototype._cancelRow = function _cancelRow(row) {

    if (!row) {
      return;
    }

    this._editingCount--;

    this._deactivateInputs(row);
    (0, _formData.restore)(row);
    (0, _removeClass2.default)(row, 'editing');
    this._updateBindings();
  };

  /**
   * Save a row.
   * @param {Element} row
   */


  Table.prototype._saveRow = function _saveRow(row) {

    if (!row) {
      return;
    }

    this._editingCount--;

    this._deactivateInputs(row);
    (0, _formData.clear)(row);
    (0, _removeClass2.default)(row, 'editing');
    this._updateBindings();

    (this.onRowSave || noop)((0, _getIndex2.default)(row.parentNode.children, row), row);
  };

  /**
   * Delete a row.
   * @param {Element} row
   */


  Table.prototype._deleteRow = function _deleteRow(row) {

    if (!row) {
      return;
    }

    (this.onRowDelete || noop)((0, _getIndex2.default)(row.parentNode.children, row), row);
    row.parentNode.removeChild(row);
  };

  /**
   * Confirm the deletion of a row.
   * @param {Element} row
   */


  Table.prototype._confirmDelete = function _confirmDelete(row) {

    if (!this.confirmDelete || typeof this.confirmDelete !== 'function') {
      this._deleteRow(row);
    } else {
      this.confirmDelete(row, this._deleteRow);
    }
  };

  /**
   * Update data bindings.
   */


  Table.prototype._updateBindings = function _updateBindings() {
    (0, _toggleClass2.default)(this.el, 'editing', this._editingCount);
  };

  /**
   * Add handles to the header that can be grabbed for resizing.
   */


  Table.prototype._initResize = function _initResize() {

    this._resizeEls = [];

    var ths = this.tableEl.querySelectorAll('thead th');

    (0, _each2.default)(ths, function (th) {
      th.innerHTML = '<span class="spark-table__resize spark-table__resize--left"></span>' + th.innerHTML + '<span class="spark-table__resize spark-table__resize--right"></span>';
      this._resizeEls.push(th);
    }.bind(this));
  };

  /**
   * Initialize rows active states.
   */


  Table.prototype._initRows = function _initRows() {

    (0, _each2.default)(this.tableEl.querySelectorAll('td.spark-table__checkbox input:checked'), function (c) {
      this._makeRowActive((0, _getParent2.default)(c, 'tr'));
    }.bind(this));
  };

  /**
   * Set the size of each column as a percentage so it can be adjusted
   * while cells are resized.
   * @param {String} unit Optional
   * @param {Boolean} force Optional
   */


  Table.prototype._sizeColumns = function _sizeColumns(unit, force) {

    unit = unit || '%';

    if (this._sizeColumnsRun && !force) {
      return;
    }

    var width = this.tableEl.offsetWidth;

    (0, _each2.default)(this.tableEl.querySelectorAll('thead th'), function (th) {
      if (unit === '%') th.style.width = Math.round(th.offsetWidth / width * 100000) / 100000 * 100 + '%';else th.style.width = th.offsetWidth + 'px';
    }.bind(this));

    this._sizeColumnsRun = true;
  };

  /**
   * Initialize expand/collapse rows.
   */


  Table.prototype._initExpands = function _initExpands() {

    var expands = this.tableEl.querySelectorAll('.spark-table-expand');

    this._expands = [];

    (0, _each2.default)(expands, function (e) {
      this._expands.push(new _expand2.default(e, {
        onBeforeExpand: this._onBeforeExpand.bind(this)
      }));
    }.bind(this));
  };

  /**
   * Before an expand is called, size all the columns so that
   * the expand does cause width changes.
   */


  Table.prototype._onBeforeExpand = function _onBeforeExpand() {
    this._sizeColumns();
  };

  /**
   * When we are clicked determine the proper action to take.
   * @param  {Object} e
   */


  Table.prototype._onClick = function _onClick(e) {

    var target = e.target || e.srcElement;
    var row;
    var selectAll;
    var actionTaken = false;
    var clearClicked = true;

    // Select all rows checkbox
    if ((selectAll = (0, _getParent2.default)(target, '.spark-table__select-all', this.el)) && !(0, _matches2.default)(target, 'input[type="checkbox"]')) {
      this._toggleSelectAll(selectAll);
      actionTaken = true;
    }
    // Editable field
    else if ((0, _matches2.default)(target, 'input:not([type="checkbox"]):not([type="file"]), select')) {

        if (!target.disabled) {

          // Listen for double clicks on a spreadsheet
          if (this.isSpreadsheet) {
            clearClicked = false;
            if (this._checkDoubleClick(target)) {
              clearClicked = true;
              this._activateInput(target);
            }
          }

          actionTaken = true;
        }
      }
      // Edit button
      else if ((0, _matches2.default)(target, '.spark-table__edit-row')) {
          this._editRow((0, _getParent2.default)(target, 'tr', this.el));
          actionTaken = true;
        }
        // Delete button
        else if ((0, _matches2.default)(target, '.spark-table__delete-row')) {
            this._confirmDelete((0, _getParent2.default)(target, 'tr', this.el));
            actionTaken = true;
          }
          // Save button
          else if ((0, _matches2.default)(target, '.spark-table__edit-row-save')) {
              this._saveRow((0, _getParent2.default)(target, 'tr', this.el));
              actionTaken = true;
            }
            // Cancel button
            else if ((0, _matches2.default)(target, '.spark-table__edit-row-cancel')) {
                this._cancelRow((0, _getParent2.default)(target, 'tr', this.el));
                actionTaken = true;
              }
              // Select a row
              else if (!(0, _getParent2.default)(target, 'button, a, .spark-toggle-switch', this.el) && !(0, _matches2.default)(target, '.spark-table__checkbox input[type="checkbox"], select') && (row = (0, _getParent2.default)(target, 'tbody tr', this.el))) {
                  if (!(row.querySelector('.spark-table__checkbox input[type="checkbox"]') || {}).disabled) {
                    this._toggleRowActive(row);
                    actionTaken = true;
                  }
                }

    if (clearClicked) {
      this._clearClicked();
    }

    if (actionTaken) {
      e.preventDefault();
    }
  };

  /**
   * When the change event fires on our element.
   * @param {Object} e
   */


  Table.prototype._onChange = function _onChange(e) {

    var target = e.target || e.srcElement;
    var row;
    var selectAll;

    // Select all rows checkbox. We have to invert the checked value here because it
    // get toggled back in the select all call.
    if (selectAll = (0, _getParent2.default)(target, '.spark-table__select-all', this.el)) {
      target.checked = !target.checked;
      this._toggleSelectAll(selectAll);
    }
    // Checkbox for a row
    else if ((0, _matches2.default)(target, '.spark-table__checkbox input[type="checkbox"]') && (row = (0, _getParent2.default)(target, 'tbody tr', this.el))) {
        this._toggleRowActive(row);
      }
  };

  /**
   * If this is a spreadsheet, whenever a field gains focus, highlight its parent.
   * @param {Object} e
   */


  Table.prototype._onFocus = function _onFocus(e) {

    var target = e.target || e.srcElement;

    if (!this.isSpreadsheet || !(0, _matches2.default)(target, 'input:not([type="checkbox"]), select')) {
      return;
    }

    var td = (0, _getParent2.default)(target, 'td', this.el);
    (0, _addClass2.default)(td, 'focus');
  };

  /**
   * If this is a spreadsheet, whenever a field gains focus, highlight its parent.
   * @param {Object} e
   */


  Table.prototype._onBlur = function _onBlur(e) {

    if (!this.isSpreadsheet) {
      return;
    }

    var target = e.target || e.srcElement;
    var td = (0, _getParent2.default)(target, 'td', this.el);
    (0, _removeClass2.default)(td, 'focus');
    this._deactivateInput(target);
  };

  /**
   * When a key is pressed, if this is a spreadsheet then we should detect
   * enter or arrow keys.
   * @param {Object} e
   */


  Table.prototype._onKeydown = function _onKeydown(e) {

    var target = e.target || e.srcElement;

    if (!this.isSpreadsheet || !(0, _matches2.default)(target, 'input:not([type="checkbox"]), select')) {
      return;
    }

    var code = e.keyCode || e.which;

    switch (code) {
      case this._keyCodes.ENTER:
        this._activateInputOrFocusDown(target);
        break;
      case this._keyCodes.ESCAPE:
        this._deactivateInput(target);
        break;
      case this._keyCodes.DOWN:
        this._focusDown(target);
        break;
      case this._keyCodes.UP:
        this._focusUp(target);
        break;
      case this._keyCodes.LEFT:
        this._focusLeft(target);
        break;
      case this._keyCodes.RIGHT:
        this._focusRight(target);
        break;
    }
  };

  /**
   * Listen for a touch and hold on an input.
   * @param {Object} e
   */


  Table.prototype._onTouchstart = function _onTouchstart(e) {

    var target = e.target || e.srcElement;

    if (!this.isSpreadsheet || !(0, _matches2.default)(target, 'input:not([type="checkbox"])')) {
      return;
    }

    this._touchStartEl = target;
    this._touchStartTime = Date.now();
    this._touchStartTimer = setTimeout(this._onTouchHold.bind(this), 1000);
  };

  /**
   * Listen for the end of a touch to cancel the hold timer.
   * @param {Object} e
   */


  Table.prototype._onTouchend = function _onTouchend(e) {

    var target = e.target || e.srcElement;

    if (!this._touchStartEl || target !== this._touchStartEl) {
      return;
    }

    this._touchStartEl = null;
    this._touchStartTime = null;
    clearTimeout(this._touchStartTimer);
  };

  /**
   * When the user has held on an input for the defined amount of time.
   */


  Table.prototype._onTouchHold = function _onTouchHold() {

    this._activateInput(this._touchStartEl);

    this._touchStartEl = null;
    this._touchStartTime = null;
    clearTimeout(this._touchStartTimer);
  };

  /**
   * When the mouse is depressed.
   * @param {Object} e
   */


  Table.prototype._onMouseDown = function _onMouseDown(e) {

    var target = e.target || e.srcElement;

    if (!this.isResizable || !(0, _matches2.default)(target, '.spark-table__resize')) {
      return;
    }

    e.preventDefault();

    this._lastScreenX = e.screenX;

    this._sizeColumns('px', true);

    this._resizingEl = target.parentNode;
    var index = this._resizeEls.indexOf(this._resizingEl);

    if ((0, _hasClass2.default)(target, 'spark-table__resize--left')) {
      this._resizingEl = this._resizeEls[index - 1];
    }

    if (!this._resizingEl) {
      return;
    }

    this._addResizeListeners();
  };

  /**
   * When the mouse moves after being depressed, resize the columns.
   * @param {Object} e
   */


  Table.prototype._onMouseMove = function _onMouseMove(e) {

    var x = e.screenX;
    var d = x - this._lastScreenX;

    // No delta change
    if (!d) {
      return;
    }

    e.preventDefault();

    var w = this._resizingEl.offsetWidth;
    var tW = this.tableEl.offsetWidth;
    var newW = w + d;
    var newTW = tW + d;

    this._resizingEl.style.width = newW + 'px';
    this.tableEl.style.width = newTW + 'px';

    // Size was not affected because we're too small
    if (this._resizingEl.offsetWidth === w || this.tableEl.offsetWidth < this.tableEl.parentNode.offsetWidth) {
      this._resizingEl.style.width = w + 'px';
      this.tableEl.style.width = tW + 'px';
    }

    this._lastScreenX = x;
  };

  /**
   * When the mouse is released, stop tracking mouse move events and
   * convert table sizes to percentages.
   * @param {Object} e
   */


  Table.prototype._onMouseUp = function _onMouseUp() {
    this._sizeColumns('%', true);
    this.tableEl.style.width = this.tableEl.offsetWidth / this.tableEl.parentNode.offsetWidth * 100 + '%';
    this._removeResizeListeners();
  };

  return Table;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Table.prototype._whitelistedParams = ['isSpreadsheet', 'isEditRows', 'isResizable', 'confirmDelete', 'onRowSave', 'onRowDelete'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Table.prototype.defaults = {
  el: null,
  tableEl: null,
  isSpreadsheet: null,
  isEditRows: null,
  isResizable: null,
  onRowSave: null,
  onRowDelete: null,
  confirmDelete: null,
  _expands: null,
  _keyCodes: {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ESCAPE: 27
  },
  _editingCount: 0,
  _lastClickTime: 0,
  _lastClickEl: null,
  _lastScreenX: 0,
  _touchStartTime: 0,
  _touchStartEl: null,
  _resizeEls: null,
  _resizingEl: null,
  _sizeColumnsRun: false,
  _onClickBound: null,
  _onChangeBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onKeydownBound: null,
  _onTouchstartBound: null,
  _onTouchendBound: null,
  _onMouseDownBound: null,
  _onMouseMoveBound: null,
  _onMouseUpBound: null
};

exports.default = Table;
module.exports = exports['default'];


},{"../helpers/dom/add-class":5,"../helpers/dom/has-class":6,"../helpers/dom/remove-class":8,"../helpers/dom/toggle-class":9,"../helpers/form/form-data":10,"../helpers/form/set-caret":11,"../helpers/traversal/get-index":12,"../helpers/traversal/get-parent":13,"../helpers/traversal/get-sibling-after":14,"../helpers/traversal/get-sibling-before":15,"../helpers/traversal/matches":16,"../helpers/util/each":17,"./base":1,"./expand":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _outerHeight = require('../dom/outer-height');

var _outerHeight2 = _interopRequireDefault(_outerHeight);

var _addClass = require('../dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {}; /**
                                * # Animate Height
                                * Animate the height of an element since we can't do this w/ pure CSS. Sigh.
                                *
                                * @example
                                * animateHeight({
                                *   el: ...,
                                *   toggleEl: ...,
                                *   // Optional params
                                *   action: 'collapse'|'expand',
                                *   heightAnimationClass: 'spark-animate-height',
                                *   opacityAnimationClass: 'spark-animate-opacity',
                                *   toggleProperty: 'display'|'overflow'|'visibility',
                                *   toggleValue: 'block'|'none'|'visible'|'hidden',
                                *   animationDuration: 250
                                * });
                                *
                                * @module helpers/animation/height.js
                                */

var runningAnimations = {
  els: [],
  completeCallbacks: []
};

/**
 * Get the inverse toggle value
 * @param  {String} property
 * @param  {String} originalValue
 * @return {String}
 */
function getInverseToggleValue(el, property, originalValue) {

  // Get the value to toggle to for the given property
  switch (property) {
    case 'overflow':
    case 'visibility':
      return originalValue === 'visible' ? 'hidden' : 'visible';
    default:
      return originalValue === 'block' || originalValue === 'inline-block' ? 'none' : 'block';
  }
}

/**
 * When an animation is complete, clean up and run the callback.
 * @param  {Object} params
 */
function onComplete(params) {

  // Reset toggle el visibility
  if (params.toggleClassName) {
    (0, _toggleClass2.default)(params.el, params.toggleClassName, !params.collapse);
  } else {
    params.toggleEl.style[params.toggleProperty] = '';
  }

  // Remove the height property
  params.el.style.height = '';
  params.toggleEl.style.height = '';
  params.toggleEl.style.marginBottom = '';
  params.toggleEl.style.marginTop = '';

  // Remove the spark-animate-height class so the transitions no longer apply
  (0, _removeClass2.default)(params.el, params.heightAnimationClass);
  (0, _removeClass2.default)(params.toggleEl, params.heightAnimationClass);

  // Run the callback
  params.onComplete();

  // Remove the element and callback from their respective arrays
  var runningIndex = runningAnimations.els.indexOf(params.el);
  runningAnimations.els.splice(runningIndex, 1);
  runningAnimations.completeCallbacks.splice(runningIndex, 1);
}

/**
 * @param {Object} params
 */
function animateHeight(params) {

  params = params || {};

  var el = params.el;

  if (!el) {
    return;
  }

  var collapse = params.action && params.action === 'collapse';
  var heightAnimationClass = params.heightAnimationClass || 'spark-animate-height';

  // Allow for elements to be passed or selector strings
  var toggleEl = typeof params.toggleEl === 'string' ? el.querySelector(params.toggleEl) : params.toggleEl;

  // No element to be switching with toggling so we can't determine the desired height to animate to.
  if (!toggleEl || (0, _hasClass2.default)(el, 'spark-no-animate')) {
    return;
  }

  var toggleClassName = params.toggleClass;

  // The style property to use when toggling visibility
  var toggleProperty = params.toggleProperty || 'display';
  var toggleStyles = window.getComputedStyle(toggleEl);
  var originalToggleValue = toggleStyles[toggleProperty];
  var toggleValue = params.toggleValue || getInverseToggleValue(toggleProperty, originalToggleValue);

  // If we are already animating, stop now.
  var runningIndex = runningAnimations.els.indexOf(el);
  if (runningIndex !== -1) {

    var completeCallback = runningAnimations.completeCallbacks[runningIndex];
    if (completeCallback) {
      clearTimeout(completeCallback);
    }

    onComplete({
      el: el,
      toggleEl: toggleEl,
      onComplete: params.onComplete || noop,
      collapse: collapse,
      toggleProperty: toggleProperty,
      toggleClassName: toggleClassName,
      toggleValue: toggleValue,
      heightAnimationClass: heightAnimationClass
    });
  }

  // Store the current height
  var originalHeight = (0, _outerHeight2.default)(el);

  // Toggle the visible property
  if (toggleClassName) {
    (0, _toggleClass2.default)(el, toggleClassName, !collapse);
  } else {
    toggleEl.style[toggleProperty] = toggleValue;
  }

  // When measuring the size for a collapse, we have to wait a tic for it to be
  // accurate. Not sure why. Ugh.
  if (collapse) {
    setTimeout(runAnimation, 0);
  } else {
    runAnimation();
  }

  function runAnimation() {

    // Now that the toggle el is taking up space, get the new height which we will be animating to
    var targetElHeight = (0, _outerHeight2.default)(el);

    // We need to store the original and target toggle element heights. They differ depending on
    // whether we are going to expand or collapse.
    var targetToggleElHeight = void 0;
    var originalToggleElHeight = void 0;

    // If we are collapsing, reset the toggle style and set it when we're done. Set the height so
    // that we can animate down to 0 or up to the target height.
    if (collapse) {

      if (toggleClassName) {
        (0, _removeClass2.default)(el, toggleClassName);
      } else {
        toggleEl.style[toggleProperty] = originalToggleValue;
      }

      originalToggleElHeight = (0, _outerHeight2.default)(toggleEl, toggleStyles);
      targetToggleElHeight = 0;
    } else {
      targetToggleElHeight = (0, _outerHeight2.default)(toggleEl, toggleStyles);
      originalToggleElHeight = 0;
    }

    // Set the original height
    el.style.height = originalHeight + 'px';
    toggleEl.style.height = originalToggleElHeight + 'px';
    toggleEl.style.marginBottom = '0px';
    toggleEl.style.marginTop = '0px';

    // Add the spark-animate-height class which will setup the transition-property and duration
    (0, _addClass2.default)(el, heightAnimationClass);
    (0, _addClass2.default)(toggleEl, heightAnimationClass);

    runningAnimations.els.push(el);

    // We need to wait a tick to toggle the height or else the animation class won't function
    setTimeout(function () {

      // Set the height to the target height
      el.style.height = targetElHeight + 'px';
      toggleEl.style.height = targetToggleElHeight + 'px';

      // Remove inline styles after the animation is complete
      runningAnimations.completeCallbacks.push(setTimeout(function () {
        onComplete({
          el: el,
          toggleEl: toggleEl,
          onComplete: params.onComplete || noop,
          collapse: collapse,
          toggleProperty: toggleProperty,
          toggleClassName: toggleClassName,
          toggleValue: toggleValue,
          heightAnimationClass: heightAnimationClass
        });
      }, params.animationDuration !== undefined ? params.animationDuration : 201));
    }, 0);
  }
}

exports.default = animateHeight;
module.exports = exports['default'];


},{"../dom/add-class":5,"../dom/has-class":6,"../dom/outer-height":7,"../dom/remove-class":8,"../dom/toggle-class":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

var _hasClass = require('./has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Add Class
 * Add a class on an element.
 *
 * @param {Element|Array} el An element or array of elements to update.
 * @param {String} name
 * @return {Element}
 *
 * @module helpers/dom/add-class.js
 */

var ws = /\s+/;
var cleanup = /\s{2,}/g;

function addClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) {
      el.classList.add(name[0]);
    }
    return el;
  }

  var toAdd = [];
  var i = 0;
  var l = name.length;
  var item = void 0;
  var clsName = typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '';

  // see if we have anything to add
  for (; i < l; i++) {
    item = name[i];
    if (item && !(0, _hasClass2.default)(clsName, item)) {
      toAdd.push(item);
    }
  }

  if (toAdd.length) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = addClass;
module.exports = exports['default'];


},{"../util/trim":18,"./has-class":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * # Has Class
 * See if an element has a class.
 *
 * @param {Element|String} el
 * @param {String} name
 * @return {Boolean}
 *
 * @module helpers/dom/has-class.js
 */
function hasClass(el, name) {
  var cName = ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' ? el.className || el.getAttribute && el.getAttribute('class') || '' : el || '').replace(/[\t\r\n\f]/g, ' ');
  return (' ' + cName + ' ').indexOf(' ' + name + ' ') !== -1;
}

exports.default = hasClass;
module.exports = exports['default'];


},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = ['marginTop', 'marginBottom', 'borderTop', 'borderBottom']; /**
                                                                         * # Outer Height
                                                                         * Get the outer height of an element (including margin and border)
                                                                         *
                                                                         * @param {Element} el
                                                                         * @param {Object} styles Optional Already have computed styles? Pass them in.
                                                                         *
                                                                         * @example
                                                                         * outerHeight(el, computedStyles);
                                                                         *
                                                                         * @module helpers/outer-height.js
                                                                         */


function outerHeight(el, styles) {

  styles = styles || window.getComputedStyle(el);

  var height = el.clientHeight;

  (0, _each2.default)(props, function (prop) {
    height += parseInt(styles[prop] || 0, 10);
  });

  return height;
}

exports.default = outerHeight;
module.exports = exports['default'];


},{"../util/each":17}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = /\s+/; /**
                 * # Remove Class
                 * Remove a class on an element.
                 *
                 * @param {Element|Array} el An element or array of elements to update.
                 * @param {String} name
                 * @return {Element}
                 *
                 * @module helpers/dom/remove-class.js
                 */

var cleanup = /\s{2,}/g;

function removeClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) el.classList.remove(name[0]);
    return el;
  }

  // store two copies
  var clsName = ' ' + (typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '') + ' ';
  var result = clsName;
  var current = void 0;
  var start = void 0;
  for (var i = 0, l = name.length; i < l; i++) {
    current = name[i];
    start = current ? result.indexOf(' ' + current + ' ') : -1;
    if (start !== -1) {
      start += 1;
      result = result.slice(0, start) + result.slice(start + current.length);
    }
  }

  // only write if modified
  if (clsName !== result) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)(result.replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)(result.replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = removeClass;
module.exports = exports['default'];


},{"../util/trim":18}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasClass = require('./has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _addClass = require('./add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('./remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toggleClass(el, name, enable) {

  if (!el) {
    return;
  }

  // If we're passed an array, toggle the class on each.
  if (el instanceof NodeList || el instanceof Array) {

    for (var i = 0, len = el.length; i < len; i++) {
      toggleClass(el[i], name, enable);
    }

    return;
  }

  var action = void 0;
  if (enable !== undefined) {
    enable = typeof enable === 'function' ? enable.call(null, el) : enable;
    action = enable ? 'add' : 'remove';
  } else {
    action = (0, _hasClass2.default)(el, name) ? 'remove' : 'add';
  }

  return (action === 'add' ? _addClass2.default : _removeClass2.default)(el, name);
} /**
   * # Toggle Class
   * Toggle a class on an element given a condition.
   *
   * @param {Element|Array} el An element or array of elements to update.
   * @param {String} name
   * @param {Boolean} enable
   * @return {Element}
   *
   * @module  helpers/dom/toggle-class.js
   */

exports.default = toggleClass;
module.exports = exports['default'];


},{"./add-class":5,"./has-class":6,"./remove-class":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = exports.restore = exports.store = undefined;

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find all the form elements inside a given element and run a callback on each.
 * @param  {Element} el
 * @param  {Function} cb
 */
function findAll(el, cb) {
  (0, _each2.default)(el.querySelectorAll('input, select, textarea'), function (i) {
    cb(i);
  });
}

/**
 * Find all the form elements inside a given element and store their current
 * value as a data attribute.
 * @param {Element} el
 */
/**
 * # Form Data
 * Store and restore the data of form fields inline so it can be reverted.
 *
 * @example
 * formData.store(el);
 * formData.revert(el);
 *
 * @module helpers/form/form-data.js
 */

function store(el) {

  findAll(el, function (input) {

    var name = input.nodeName.toLowerCase();
    var value = void 0;

    switch (name) {
      case 'select':
        value = input.selectedIndex;
        break;
      default:
        value = encodeURI(input.value);
        break;
    }

    input.setAttribute('data-stored-value', value);
  });
}

/**
 * Revert all the form elements inside of a given element.
 * @param {Element} el
 */
function restore(el) {

  findAll(el, function (input) {

    var name = input.nodeName.toLowerCase();
    var value = input.getAttribute('data-stored-value');

    // No stored value
    if (!value && value !== '') {
      return;
    }

    switch (name) {
      case 'select':
        input.options[value].selected = true;
        break;
      default:
        input.value = decodeURI(value);
        break;
    }

    input.removeAttribute('data-stored-value');
  });
}

/**
 * Clear the stored data on all the form elements inside of a given element.
 * @param {Element} el
 */
function clear(el) {
  findAll(el, function (input) {
    input.removeAttribute('data-stored-value');
  });
}

exports.store = store;
exports.restore = restore;
exports.clear = clear;


},{"../util/each":17}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Set Caret
 * Set the caret position in an input.
 *
 * @param {Element} el
 * @param {Number} start
 * @param {Number} end
 *
 * @example
 * setCaret(el, -1);
 * setCaret(el, 2);
 *
 * @module helpers/form/set-caret.js
 */
function setCaret(el, start, end) {

  var originalActiveElement = document.activeElement;

  start = start < 0 ? el.value.length + start + 1 : start;
  end = end < 0 ? el.value.length + end + 1 : end;

  // IE support
  if (document.selection) {
    el.focus();
    var sel = document.selection.createRange();
    sel.moveStart('character', -el.value.length);
    sel.moveStart('character', start);
    sel.moveEnd('character', end !== undefined ? end : start);
    sel.select();
  } else if (el.selectionStart || el.selectionStart === 0) {
    el.selectionStart = start;
    el.selectionEnd = end !== undefined ? end : start;
  }

  // If we didn't have focus, go back to focusing on the original
  if (originalActiveElement !== el) {
    el.blur();
    originalActiveElement.focus();
  }

  return {
    start: start,
    end: end
  };
}

exports.default = setCaret;
module.exports = exports['default'];


},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Get Index
 * Get the index of an element in a nodelist.
 *
 * @param {NodeList} els
 * @param {Node} el
 * @return {Number}
 *
 * @module helpers/traversal/get-index.js
 */
function getIndex(els, el) {
  return Array.prototype.indexOf.call(els, el);
}

exports.default = getIndex;
module.exports = exports["default"];


},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParent(parent, query, limitEl) {

  limitEl = limitEl instanceof Array ? limitEl : [limitEl || document.body];

  while (parent) {

    if ((0, _matches2.default)(parent, query)) {
      return parent;
    }

    if (limitEl.indexOf(parent) !== -1) {
      return false;
    }

    parent = parent.parentNode;
  }

  return false;
} /**
   * # Get Parent
   * See if an element has another element for a parent.
   *
   * @param {Element} parent
   * @param {String} query
   * @param {Array|Element} limitEl The last element we should check.
   * @return {Boolean|Element}
   *
   * @module helpers/traversal/get-parent.js
   */

exports.default = getParent;
module.exports = exports['default'];


},{"./matches":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSiblingAfter(el, query) {

  while (el = el.nextElementSibling) {
    if ((0, _matches2.default)(el, query)) {
      return el;
    }
  }

  return null;
} /**
   * # Get Sibling After
   * Get a nearest sibling after the given element which matches
   * the given query selector.
   *
   * @param {Element} el
   * @param {String} query
   * @return {Element|Null}
   *
   * @module helpers/traversal/get-sibling-after.js
   */

exports.default = getSiblingAfter;
module.exports = exports['default'];


},{"./matches":16}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSiblingBefore(el, query) {

  while (el = el.previousElementSibling) {
    if ((0, _matches2.default)(el, query)) {
      return el;
    }
  }

  return null;
} /**
   * # Get Sibling Before
   * Get a nearest sibling before the given element which matches
   * the given query selector.
   *
   * @param {Element} el
   * @param {String} query
   * @return {Element|Null}
   *
   * @module helpers/traversal/get-sibling-before.js
   */

exports.default = getSiblingBefore;
module.exports = exports['default'];


},{"./matches":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Matches
 * See if an element matches a query selector.
 *
 * @param {Element} el
 * @param {String} query
 * @return {Boolean}
 *
 * @module helpers/traversal/matches.js
 */
var vendorMatch = typeof Element !== 'undefined' && (Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector);

function matches(el, query) {

  if (vendorMatch) return vendorMatch.call(el, query);

  var nodes = el.parentNode ? el.parentNode.querySelectorAll(query) : [];

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] === el) return true;
  }

  return false;
}

exports.default = matches;
module.exports = exports['default'];


},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Each
 * Apply a callback function to a list of any kind: Array, NodeList, HTMLCollection or Object.
 *
 * @param {Array|NodeList|HTMLCollection|Object} list
 * @param {Function} cb
 *
 * @example
 * each([], callback);
 * each(el.children, callback);
 * each(el.childNodes, callback);
 * each({}, callback);
 *
 * @module helpers/util/each.js
 */
function each(list, cb) {

  if (!list) {
    return;
  }

  if (typeof cb !== 'function') {
    throw new Error('Cannot invoke `each` without a callback!');
  }

  var i = 0;
  var len = list.length;

  // Object
  if (len === undefined) {
    for (i in list) {
      if (i !== 'prototype' && list.hasOwnProperty(i)) {
        cb(i, list[i]);
      }
    }
  }
  // Array-like
  else {
      for (; i < len; i++) {
        cb(list[i]);
      }
    }
}

exports.default = each;
module.exports = exports['default'];


},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Trim
 * Trim whitespace on a string.
 *
 * @param {String} str
 *
 * @module helpers/util/trim.js
 */

var trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

function trim(str) {
  return str.replace(trimRE, '');
}

exports.default = trim;
module.exports = exports['default'];


},{}]},{},[3])(3)
});

//# sourceMappingURL=table.js.map
