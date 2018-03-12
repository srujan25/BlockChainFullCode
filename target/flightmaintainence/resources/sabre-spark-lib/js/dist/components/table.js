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
//# sourceMappingURL=table.js.map
