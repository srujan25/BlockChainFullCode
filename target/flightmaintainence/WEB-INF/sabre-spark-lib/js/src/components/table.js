/**
 * # Table
 *
 * @example
 * new Table(el);
 *
 * @module components/table.js
 */
import BaseComponent from './base';
import Expand from './expand';
import setCaret from '../helpers/form/set-caret';
import {clear as clearFormData, store as storeFormData, restore as restoreFormData} from '../helpers/form/form-data';
import each from '../helpers/util/each';
import hasClass from '../helpers/dom/has-class';
import toggleClass from '../helpers/dom/toggle-class';
import addClass from '../helpers/dom/add-class';
import removeClass from '../helpers/dom/remove-class';
import getParent from '../helpers/traversal/get-parent';
import getIndex from '../helpers/traversal/get-index';
import getSiblingBefore from '../helpers/traversal/get-sibling-before';
import getSiblingAfter from '../helpers/traversal/get-sibling-after';
import matches from '../helpers/traversal/matches';

const noop = function() {};

class Table extends BaseComponent {

  /**
   * Table constructor.
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

    this._initRows();

    if (this.isSpreadsheet || this.isEditRows) {
      this._deactivateAllInputs();
    }

    if (this.isResizable) {
      this._initResize();
    }

    this._disableRowsColumnsCells();

    this._initExpands();
  }


  /**
   * Disable the form field in a table cell.
   * @param {Element} el
   */
  disableCell(el) {
    el.disabled = true;
    addClass(getParent(el, 'td'), 'spark-table__disabled-cell');
    return this;
  }


  /**
   * Enable the form field in a table cell.
   * @param {Element} el
   */
  enableCell(el) {
    el.disabled = false;
    removeClass(getParent(el, 'td'), 'spark-table__disabled-cell');
    return this;
  }


  /**
   * Disable a row and all the cells inside of it.
   * @param {Element} el
   */
  disableRow(el) {
    addClass(el, 'spark-table__disabled-row');
    each(el.querySelectorAll('input, button, a'), function(i) {
      i.disabled = true;
    });
    return this;
  }


  /**
   * Enable a row and all the cells inside of it.
   * @param {Element} el
   */
  enableRow(el) {
    removeClass(el, 'spark-table__disabled-row');
    each(el.querySelectorAll('input, button, a'), function(i) {
      i.disabled = false;
    });
    return this;
  }


  /**
   * Disable a column and all the cells inside of it.
   * @param {Element} el
   */
  disableColumn(el) {

    var index = getIndex(el.parentNode.children, el);

    each(this.tableEl.querySelectorAll('tbody tr'), function(row) {
      this.disableCell(row.children[index].querySelector('input'));
    }.bind(this));

    addClass(el, 'spark-table__disabled-column');

    return this;
  }


  /**
   * Enable a column and all the cells inside of it.
   * @param {Element} el
   */
  enableColumn(el) {

    var index = getIndex(el.parentNode.children, el);

    each(this.tableEl.querySelectorAll('tbody tr'), function(row) {
      this.enableCell(row.children[index].querySelector('input'));
    }.bind(this));

    removeClass(el, 'spark-table__disabled-column');

    return this;
  }


  /**
   * Remove the table anc cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  remove(leaveElement) {
    each(this._expands, function(e) {
      e.remove(leaveElement);
    });
    return super.remove(leaveElement);
  }


  /**
   * Activate a row.
   * @param {Number|Element} row
   */
  activateRow(row) {
    row = typeof row === 'number' ? this.tableEl.querySelectorAll('tbody tr')[row] : row;
    if (row) this._makeRowActive(row);
    return this;
  }


  /**
   * Activate multiple rows.
   * @param {Array} rows
   */
  activateRows(rows) {
    each(rows, this.activateRow.bind(this));
    return this;
  }


  /**
   * Deactivate a row.
   * @param {Number|Element} row
   */
  deactivateRow(row) {
    row = typeof row === 'number' ? this.tableEl.querySelectorAll('tbody tr')[row] : row;
    if (row) this._makeRowInActive(row);
    return this;
  }


  /**
   * Deactivate multiple rows.
   * @param {Array} rows
   */
  deactivateRows(rows) {
    each(rows, this.deactivateRow.bind(this));
    return this;
  }


  /**
   * Get an array of currently active rows.
   * @return {Array}
   */
  getActiveRows() {

    var arr = [];

    each(this.el.querySelectorAll('tbody tr.active'), function(tr) {
      arr.push(tr);
    });

    return arr;
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

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
  }


  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */
  _cacheElements(el) {
    this.el = el;
    this.tableEl = el.querySelector('table');
  }


  /**
   * Parse parameters from the elements.
   */
  _parseParams() {

    if (!this.tableEl) {
      return;
    }

    this.isSpreadsheet = this.isSpreadsheet !== null ? this.isSpreadsheet : (hasClass(this.el, 'spark-table--spreadsheet') ? true : false);
    this.isEditRows = this.isEditRows !== null ? this.isEditRows : (hasClass(this.el, 'spark-table--edit-rows') ? true : false);
    this.isResizable = this.isResizable !== null ? this.isResizable : (hasClass(this.el, 'spark-table--resizable') ? true : false);
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {

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
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {

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
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {

    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('change', this._onChangeBound);
    this.el.removeEventListener('focus', this._onFocusBound);
    this.el.removeEventListener('blur', this._onBlurBound);

    this.el.removeEventListener('touchstart', this._onTouchstartBound);
    this.el.removeEventListener('touchend', this._onTouchendBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);

    this.tableEl.removeEventListener('mousedown', this._onMouseDownBound);

    this._removeResizeListeners();
  }

  /**
   * Add listeners for mousemove and mouseup events.
   */
  _addResizeListeners() {
    window.addEventListener('mousemove', this._onMouseMoveBound, false);
    window.addEventListener('mouseup', this._onMouseUpBound, false);
  }


  /**
   * Remove listeners for mosuemove and mouseup.
   */
  _removeResizeListeners() {
    window.removeEventListener('mousemove', this._onMouseMoveBound);
    window.removeEventListener('mouseup', this._onMouseUpBound);
  }


  /**
   * Toggle the active state on a row.
   * @param {Object} row
   */
  _toggleRowActive(row) {

    if (hasClass(row, 'active')) {
      this._makeRowInActive(row);
      this._uncheckSelectAll();
    } else {
      this._makeRowActive(row);
    }
  }


  /**
   * Make a row active
   * @param {Element} row
   */
  _makeRowActive(row) {
    addClass(row, 'active');
    (row.querySelector('.spark-table__checkbox input[type="checkbox"]:not([disabled])') || {}).checked = true;
  }


  /**
   * Make a row active
   * @param  {Element} row
   */
  _makeRowInActive(row) {
    removeClass(row, 'active');
    (row.querySelector('.spark-table__checkbox input[type="checkbox"]:not([disabled])') || {}).checked = false;
  }


  /**
   * Toggle active on each row.
   * @param {NodeList} rows
   * @param {Boolean} active
   */
  _toggleRowsActive(rows, active) {

    var func = active ? '_makeRowActive' : '_makeRowInActive';
    var i = 0;
    var len = rows.length;

    for (; i < len; i++) {
      this[func](rows[i]);
    }
  }


  /**
   * Toggle whether everything should be selected. Find the checkbox input inside of the
   * given element and invert its state.
   * @param {Element} el
   */
  _toggleSelectAll(el) {

    var checkbox = el.querySelector('.spark-table__select-all input[type="checkbox"]');

    if (!checkbox) {
      return;
    }

    this._toggleRowsActive(this.el.querySelectorAll('tbody tr'), !checkbox.checked);

    checkbox.checked = !checkbox.checked;
  }


  /**
   * Uncheck the select all checkboxes.
   */
  _uncheckSelectAll() {

    var checkboxes = this.el.querySelectorAll('.spark-table__select-all input[type="checkbox"]');
    var i = 0;
    var len = checkboxes.length;

    for (; i < len; i++) {
      checkboxes[i].checked = false;
    }
  }


  /**
   * Deactivate editing in all input fields.
   */
  _deactivateAllInputs() {

    if (!this.tableEl) {
      return;
    }

    this._deactivateInputs(this.tableEl);
  }


  /**
   * Deactivate all the inputs inside an element
   * @param {Element} el
   */
  _deactivateInputs(el) {

    var inputs = el.querySelectorAll('input:not([type="checkbox"])');
    var i = 0;

    var len = inputs.length;

    for (; i < len; i++) {
      this._deactivateInput(inputs[i]);
    }
  }


  /**
   * Make an input field readonly.
   * @param {Element} input
   */
  _deactivateInput(input) {
    input.setAttribute('readonly', '');
    removeClass(input.parentNode, 'editing');
  }


  /**
   * Activate all the inputs inside an element
   * @param {Element} el
   */
  _activateInputs(el) {

    var inputs = el.querySelectorAll('input:not([type="checkbox"])');
    var i = 0;

    var len = inputs.length;

    for (; i < len; i++) {
      this._activateInput(inputs[i]);
    }
  }


  /**
   * Make an input field readable.
   * @param {Element} input
   */
  _activateInput(input) {
    input.removeAttribute('readonly');
    addClass(input.parentNode, 'editing');
    if (input.type !== 'checkbox' && input.type !== 'radio') {
      setCaret(input, -1);
    }
  }


  /**
   * Activate an input, unless it's already enabled in which case
   * the focus should move down a row.
   * @param {Element} input
   */
  _activateInputOrFocusDown(input) {

    // Currently readonly
    if (input.getAttribute('readonly') === '') {
      this._activateInput(input);
      return;
    }

    this._focusDown(input, true);
  }


  /**
   * Find all the rows, columns and cells that should be disabled.
   */
  _disableRowsColumnsCells() {
    each(this.tableEl.querySelectorAll('td input[disabled]'), this.disableCell.bind(this));
    each(this.tableEl.querySelectorAll('.spark-table__disabled-row'), this.disableRow.bind(this));
    each(this.tableEl.querySelectorAll('.spark-table__disabled-column'), this.disableColumn.bind(this));
  }


  /**
   * Move our focus up a row from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */
  _focusUp(input, force) {
    return this._focusUpDown(input, 'up', force);
  }


  /**
   * Move our focus down a row from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */
  _focusDown(input, force) {
    return this._focusUpDown(input, 'down', force);
  }


  /**
   * Focus on a row up or down from the given element.
   * @param {Element} input
   * @param {String} direction up|down
   * @param {Boolean} force Force the move even if the element is active.
   */
  _focusUpDown(input, direction, force) {

    // If we're not being told to force and the item is not read only
    if (!force && input.getAttribute('readonly') === null) {
      return;
    }

    this._deactivateInput(input);
    var td = getParent(input, 'td', this.el);

    if (!td) {
      return;
    }

    var index = getIndex(td.parentNode.children, td);
    var nextRow = (direction === 'up' ? getSiblingBefore : getSiblingAfter)(td.parentNode, 'tr');

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
  }


  /**
   * Move our focus left a cell from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */
  _focusLeft(input, force) {
    return this._focusLeftRight(input, 'left', force);
  }


  /**
   * Move our focus right a cell from the given element.
   * @param {Element} input
   * @param {Boolean} force Force the move even if the element is active.
   */
  _focusRight(input, force) {
    return this._focusLeftRight(input, 'right', force);
  }


  /**
   * Focus on a cell left or down from the given element.
   * @param {Element} input
   * @param {String} direction up|down
   * @param {Boolean} force Force the move even if the element is active.
   */
  _focusLeftRight(input, direction, force) {

    // If we're not being told to force and the item is not read only
    if (!force && input.getAttribute('readonly') === null) {
      return;
    }

    this._deactivateInput(input);
    var td = getParent(input, 'td', this.el);

    if (!td) {
      return;
    }

    var newTd = (direction === 'left' ? getSiblingBefore : getSiblingAfter)(td, 'td');

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
  }


  /**
   * Check for two click events on the same element in short succession.
   * @param {Element} el
   */
  _checkDoubleClick(el) {

    var now = Date.now();
    var lastTime = this._lastClickTime;
    var lastEl = this._lastClickEl;

    this._lastClickTime = now;
    this._lastClickEl = el;

    if (el === lastEl && now - 500 < lastTime) {
      return true;
    }

    return false;
  }


  /**
   * Unset the last clicked element.
   */
  _clearClicked() {
    this._lastClickEl = null;
  }


  /**
   * Enable editing on a row.
   * @param {Element} row
   */
  _editRow(row) {

    if (!row) {
      return;
    }

    this._editingCount++;

    this._activateInputs(row);
    storeFormData(row);
    addClass(row, 'editing');
    this._updateBindings();
  }


  /**
   * Cancel editing a row.
   * @param {Element} row
   */
  _cancelRow(row) {

    if (!row) {
      return;
    }

    this._editingCount--;

    this._deactivateInputs(row);
    restoreFormData(row);
    removeClass(row, 'editing');
    this._updateBindings();
  }


  /**
   * Save a row.
   * @param {Element} row
   */
  _saveRow(row) {

    if (!row) {
      return;
    }

    this._editingCount--;

    this._deactivateInputs(row);
    clearFormData(row);
    removeClass(row, 'editing');
    this._updateBindings();

    (this.onRowSave || noop)(getIndex(row.parentNode.children, row), row);
  }


  /**
   * Delete a row.
   * @param {Element} row
   */
  _deleteRow(row) {

    if (!row) {
      return;
    }

    (this.onRowDelete || noop)(getIndex(row.parentNode.children, row), row);
    row.parentNode.removeChild(row);
  }


  /**
   * Confirm the deletion of a row.
   * @param {Element} row
   */
  _confirmDelete(row) {

    if (!this.confirmDelete || typeof this.confirmDelete !== 'function') {
      this._deleteRow(row);
    } else {
      this.confirmDelete(row, this._deleteRow);
    }
  }


  /**
   * Update data bindings.
   */
  _updateBindings() {
    toggleClass(this.el, 'editing', this._editingCount);
  }


  /**
   * Add handles to the header that can be grabbed for resizing.
   */
  _initResize() {

    this._resizeEls = [];

    var ths = this.tableEl.querySelectorAll('thead th');

    each(ths, function(th) {
      th.innerHTML = '<span class="spark-table__resize spark-table__resize--left"></span>' + th.innerHTML + '<span class="spark-table__resize spark-table__resize--right"></span>';
      this._resizeEls.push(th);
    }.bind(this));
  }


  /**
   * Initialize rows active states.
   */
  _initRows() {

    each(this.tableEl.querySelectorAll('td.spark-table__checkbox input:checked'), function(c) {
      this._makeRowActive(getParent(c, 'tr'));
    }.bind(this));
  }


  /**
   * Set the size of each column as a percentage so it can be adjusted
   * while cells are resized.
   * @param {String} unit Optional
   * @param {Boolean} force Optional
   */
  _sizeColumns(unit, force) {

    unit = unit || '%';

    if (this._sizeColumnsRun && !force) {
      return;
    }

    var width = this.tableEl.offsetWidth;

    each(this.tableEl.querySelectorAll('thead th'), function(th) {
      if (unit === '%')
        th.style.width = (Math.round(th.offsetWidth / width * 100000) / 100000) * 100 + '%';
      else
        th.style.width = th.offsetWidth + 'px';
    }.bind(this));

    this._sizeColumnsRun = true;
  }


  /**
   * Initialize expand/collapse rows.
   */
  _initExpands() {

    var expands = this.tableEl.querySelectorAll('.spark-table-expand');

    this._expands = [];

    each(expands, function(e) {
      this._expands.push(new Expand(e, {
        onBeforeExpand: this._onBeforeExpand.bind(this)
      }));
    }.bind(this));
  }


  /**
   * Before an expand is called, size all the columns so that
   * the expand does cause width changes.
   */
  _onBeforeExpand() {
    this._sizeColumns();
  }


  /**
   * When we are clicked determine the proper action to take.
   * @param  {Object} e
   */
  _onClick(e) {

    var target = e.target || e.srcElement;
    var row;
    var selectAll;
    var actionTaken = false;
    var clearClicked = true;

    // Select all rows checkbox
    if ((selectAll = getParent(target, '.spark-table__select-all', this.el)) && !matches(target, 'input[type="checkbox"]')) {
      this._toggleSelectAll(selectAll);
      actionTaken = true;
    }
    // Editable field
    else if (matches(target, 'input:not([type="checkbox"]):not([type="file"]), select')) {

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
    else if (matches(target, '.spark-table__edit-row')) {
      this._editRow(getParent(target, 'tr', this.el));
      actionTaken = true;
    }
    // Delete button
    else if (matches(target, '.spark-table__delete-row')) {
      this._confirmDelete(getParent(target, 'tr', this.el));
      actionTaken = true;
    }
    // Save button
    else if (matches(target, '.spark-table__edit-row-save')) {
      this._saveRow(getParent(target, 'tr', this.el));
      actionTaken = true;
    }
    // Cancel button
    else if (matches(target, '.spark-table__edit-row-cancel')) {
      this._cancelRow(getParent(target, 'tr', this.el));
      actionTaken = true;
    }
    // Select a row
    else if (!getParent(target, 'button, a, .spark-toggle-switch', this.el) && !matches(target, '.spark-table__checkbox input[type="checkbox"], select') && (row = getParent(target, 'tbody tr', this.el))) {
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
  }


  /**
   * When the change event fires on our element.
   * @param {Object} e
   */
  _onChange(e) {

    var target = e.target || e.srcElement;
    var row;
    var selectAll;

    // Select all rows checkbox. We have to invert the checked value here because it
    // get toggled back in the select all call.
    if ((selectAll = getParent(target, '.spark-table__select-all', this.el))) {
      target.checked = !target.checked;
      this._toggleSelectAll(selectAll);
    }
    // Checkbox for a row
    else if (matches(target, '.spark-table__checkbox input[type="checkbox"]') && (row = getParent(target, 'tbody tr', this.el))) {
      this._toggleRowActive(row);
    }
  }


  /**
   * If this is a spreadsheet, whenever a field gains focus, highlight its parent.
   * @param {Object} e
   */
  _onFocus(e) {

    var target = e.target || e.srcElement;

    if (!this.isSpreadsheet || !matches(target, 'input:not([type="checkbox"]), select')) {
      return;
    }

    var td = getParent(target, 'td', this.el);
    addClass(td, 'focus');
  }


  /**
   * If this is a spreadsheet, whenever a field gains focus, highlight its parent.
   * @param {Object} e
   */
  _onBlur(e) {

    if (!this.isSpreadsheet) {
      return;
    }

    var target = e.target || e.srcElement;
    var td = getParent(target, 'td', this.el);
    removeClass(td, 'focus');
    this._deactivateInput(target);
  }


  /**
   * When a key is pressed, if this is a spreadsheet then we should detect
   * enter or arrow keys.
   * @param {Object} e
   */
  _onKeydown(e) {

    var target = e.target || e.srcElement;

    if (!this.isSpreadsheet || !matches(target, 'input:not([type="checkbox"]), select')) {
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
  }


  /**
   * Listen for a touch and hold on an input.
   * @param {Object} e
   */
  _onTouchstart(e) {

    var target = e.target || e.srcElement;

    if (!this.isSpreadsheet || !matches(target, 'input:not([type="checkbox"])')) {
      return;
    }

    this._touchStartEl = target;
    this._touchStartTime = Date.now();
    this._touchStartTimer = setTimeout(this._onTouchHold.bind(this), 1000);
  }


  /**
   * Listen for the end of a touch to cancel the hold timer.
   * @param {Object} e
   */
  _onTouchend(e) {

    var target = e.target || e.srcElement;

    if (!this._touchStartEl || target !== this._touchStartEl) {
      return;
    }

    this._touchStartEl = null;
    this._touchStartTime = null;
    clearTimeout(this._touchStartTimer);
  }


  /**
   * When the user has held on an input for the defined amount of time.
   */
  _onTouchHold() {

    this._activateInput(this._touchStartEl);

    this._touchStartEl = null;
    this._touchStartTime = null;
    clearTimeout(this._touchStartTimer);
  }


  /**
   * When the mouse is depressed.
   * @param {Object} e
   */
  _onMouseDown(e) {

    var target = e.target || e.srcElement;

    if (!this.isResizable || !matches(target, '.spark-table__resize')) {
      return;
    }

    e.preventDefault();

    this._lastScreenX = e.screenX;

    this._sizeColumns('px', true);

    this._resizingEl = target.parentNode;
    var index = this._resizeEls.indexOf(this._resizingEl);

    if (hasClass(target, 'spark-table__resize--left')) {
      this._resizingEl = this._resizeEls[index - 1];
    }

    if (!this._resizingEl) {
      return;
    }

    this._addResizeListeners();
  }


  /**
   * When the mouse moves after being depressed, resize the columns.
   * @param {Object} e
   */
  _onMouseMove(e) {

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
  }


  /**
   * When the mouse is released, stop tracking mouse move events and
   * convert table sizes to percentages.
   * @param {Object} e
   */
  _onMouseUp() {
    this._sizeColumns('%', true);
    this.tableEl.style.width = (this.tableEl.offsetWidth / this.tableEl.parentNode.offsetWidth * 100) + '%';
    this._removeResizeListeners();
  }
}


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

export default Table;
