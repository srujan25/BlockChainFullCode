/**
 * # DateInput
 * A date input container.
 *
 * @example
 * new DateInput(el, {
 *   // Optional. Callback for when the input value changes.
 *   onChange(value, inputInstance) {}
 * });
 *
 * @module components/date-input.js
 */
import Base from './base';
import DateTypeahead from './date-typeahead';
import DateSelect from './date-select';
import parseDateFormat from '../helpers/date/parse-format';
import padNumber from '../helpers/util/pad';
import toggleClass from '../helpers/dom/toggle-class';
import removeClass from '../helpers/dom/remove-class';
import addClass from '../helpers/dom/add-class';
import hasClass from '../helpers/dom/has-class';
import appendChildren from '../helpers/manipulation/append-children';
import triggerEvent from '../helpers/dom/trigger-event';
import copyAttributes from '../helpers/manipulation/copy-attributes';
import date from '../helpers/date/date';
import each from '../helpers/util/each';
import {string as parseStringAttribute, boolean as parseBooleanAttribute} from '../helpers/dom/parse-attribute';
import mixin from '../helpers/util/mixin';
import messaging from '../mixins/messaging';
import makeElement from '../helpers/dom/make-element';
import validation from '../mixins/validation';

const domDateFormat = 'YYYY-MM-DD';
const parsedDomFormat = parseDateFormat(domDateFormat);
const noop = function() {};

class DateInput extends Base {

  /**
   * DateInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  constructor(el, params = {}) {

    params.elRequired = true;

    if (!super(el, params)) {
      return;
    }

    this._bindEventListenerCallbacks();
    this._convertLabel();
    this._initializeInputs();
    this._updateClass();
    this._addEventListeners();
  }


  /**
   * Show the input by adding the active state and setting character counts (if necessary).
   */
  show() {

    if (!this.isActive) {
      this._runTypeaheads();
      this.isActive = true;
      this._updateClass();
    }

    return this;
  }


  /**
   * Hide the input by removing the active state.
   */
  hide() {
    if (!this.isActive) return this;
    this.isActive = false;
    this._updateClass();
    return this;
  }


  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  remove(leaveElement) {

    this._removeTypeaheads(leaveElement);
    this._removeSelects(leaveElement);
    this._removeInputPieces();

    super.remove(leaveElement);

    return this;
  }


  /**
   * Given an object with day, month and year, set the value of the input.
   * @param {Object} values
   */
  setValue(values) {

    values = values || {
      day: '',
      month: '',
      year: ''
    };
    let i;
    let hadValue;

    for (i in this.typeaheads) {
      if (values[i] !== undefined) {
        this.typeaheads[i].setValue(values[i]);
        hadValue = hadValue || (values[i] ? true : false);
      }
    }

    for (i in this.selects) {
      if (values[i] !== undefined) {
        this.selects[i].setValue(values[i]);
        hadValue = hadValue || (values[i] ? true : false);
      }
    }

    if (!this.isActive && hadValue) {
      this.isActive = true;
    }

    this._padTypeaheads();
    this._updateClass();
    this.updateInput();

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
   * Clear the values.
   */
  clearValue() {

    each(this.isTypeahead ? this.typeaheads : this.selects, (k, v) => {
      v.clearValue();
    });

    this.inputEl.value = '';

    return this;
  }

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */
  setErrorState(opt) {
    if(opt){
      this.el.setAttribute('data-error', '');
    }
    else {
      this.el.removeAttribute('data-error');
    }
  }

  /**
   * Enable the inputs
   */
  enable() {

    each(this.isTypeahead ? this.typeaheads : this.selects, (k, v) => {
      v.enable();
    });

    this.inputEl.removeAttribute('disabled');

    toggleClass(this.el, 'disabled', false);

    return this;
  }


  /**
   * Clear the values.
   */
  disable() {

    each(this.isTypeahead ? this.typeaheads : this.selects, (k, v) => {
      v.disable();
    });

    this.inputEl.setAttribute('disabled', '');

    toggleClass(this.el, 'disabled', true);

    return this;
  }


  /**
   * Update the input values to match the typeaheads.
   */
  updateInput() {

    let inputs;

    if (this.isTypeahead && this.typeaheads) {
      inputs = this.typeaheads;
    }
    else if (this.isSelect) {
      inputs = this.selects;
    }

    if (inputs) {

      let day = (inputs.day && inputs.day.getValue(true)) || 0;
      let month = (inputs.month && inputs.month.getValue(true)) || 0;
      let year = (inputs.year && inputs.year.getValue(true)) || 0;

      let val = this.inputEl.value;

      this.inputEl.value = [day, month, year].indexOf(0) === -1 ? padNumber(year, 4) + '-' + padNumber(month, 2) + '-' + padNumber(day, 2) : '';

      if (val !== this.inputEl.value) {
        this._pauseInputChange = true;
        triggerEvent(this.inputEl, 'change');
        (this.onChange || noop)(this.inputEl.value, this);
        this._pauseInputChange = false;
      }
    }

    this.currValue = this.inputEl.value;

    return this;
  }

  /**
   * Get current typing value
   *
   */
  getTypingValue() {

    let inputs;
    let result = '';

    if (this.isTypeahead && this.typeaheads) {
      inputs = this.typeaheads;
    }
    else if (this.isSelect) {
      inputs = this.selects;
    }

    if (inputs) {

      let day = (inputs.day && inputs.day.getValue(true));
      let month = (inputs.month && inputs.month.getValue(true));
      let year = (inputs.year && inputs.year.getValue(true));

      result = month.toString() + day.toString() + year.toString();
    }

    return result;
  }


  /**
   * Move the focus to a typeahead element.
   * @param {Number} i
   * @param {String} character Optional A character to add
   */
  focus(i, character) {

    if (!this.isActive || !this.inFocus) {
      return this;
    }

    let index = this.typeaheadEls.indexOf(this.inFocus.typeahead.el);
    let sib = this.typeaheadEls[index + i];
    let typeahead;

    // If we were passed a character to prepend, find the typeahead for this element
    if (character) {
      typeahead = this._getTypeaheadByElement(sib);
      if (typeahead) {
        typeahead.typeahead.addCharacterAtIndex(character, 0);
      }
    }

    if (!sib) {
      return false;
    }

    let sibInput = sib.querySelector('input');

    if (sibInput) {
      sibInput.focus();

      // If we have a typeahead (because we needed to prepend a character), move the caret.
      if (typeahead) {
        typeahead.typeahead.moveCaret(1);
      }
    }

    return this;
  }


  /**
   * Move the focus to the next element.
   * @param {String} character Optional A character to add
   */
  focusNext(character) {

    if (this.focus(1, character)) {
      if (this.inFocus && !character)
        this.inFocus.typeahead.moveCaretToStart();
    }

    return this;
  }


  /**
   * Move the focus to the next element.
   * @param {String} character Optional A character to add
   */
  focusPrevious(character) {

    if (this.focus(-1, character)) {
      if (this.inFocus)
        this.inFocus.typeahead.moveCaretToEnd();
    }

    return this;
  }


  /**
   * Do we have any values?
   * @return {Boolean}
   */
  hasPartialValue() {

    let i;

    for (i in this.typeaheads) {
      if (this.typeaheads[i].getValue()) {
        return true;
      }
    }

    for (i in this.selects) {
      if (this.selects[i].getValue()) {
        return true;
      }
    }

    return false;
  }


  /**
   * Resize the elements, to account for any changed display property.
   * @param {Element} el Optional
   */
  update(el) {

    if (el) {

      this._removeTypeaheads();
      this._removeSelects();
      this._removeInputPieces();

      this._removeEventListeners();

      this._cacheElements(el);
      this._convertLabel();
      this._initializeInputs();
      this._updateClass();

      this._addEventListeners();
    }
    else {
      this._runTypeaheads();
    }

    return this;
  }


  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.inputEl = this.el.querySelector('[type="date"]');
    this.inputLabel = this.el.querySelector('.spark-label').innerHTML;
    this.selectLabelPrefix = this.el.querySelector('.spark-label').getAttribute('id');

    if (!this.inputEl) {
      throw new Error('No <input type="date"> element present in date input container!', this.el);
    }

    this.toggleEl = this.el.querySelector('.spark-date__toggle');

    this.messageEl = this.el.querySelector('.spark-input__message') || makeElement('<span class="spark-input__message"></span>');
  }


  /**
   * Parse parameters from the elements.
   */
  _parseParams() {

    this.isActive = this.isActive !== null ? this.isActive : (this.inputEl.value ? true : false);
    this.isSelect = this.isSelect !== null ? this.isSelect : (hasClass(this.el, 'spark-date--select') ? true : false);
    this.isTypeahead = this.isTypeahead !== null ? this.isTypeahead : (!this.isSelect ? true : false);
    this.format = this.format !== null ? this.format : parseStringAttribute(this.inputEl, 'data-format', 'MM-DD-YYYY');
    this.textFormat = this.textFormat !== null ? this.textFormat : parseStringAttribute(this.inputEl, 'data-text-format', 'MM DD YYYY');
    this.showDateAsText = this.showDateAsText !== null ? this.showDateAsText : parseBooleanAttribute(this.inputEl, 'data-show-date-as-text', false);

    this.parsedFormat = parseDateFormat(this.format);
    this.parsedTextFormat = parseDateFormat(this.textFormat);
    this.min = this.min !== null ? this.min : this.inputEl.getAttribute('min');
    this.max = this.max !== null ? this.max : this.inputEl.getAttribute('max');
    this.min = this.min && parsedDomFormat.getValues(this.min);
    this.max = this.max && parsedDomFormat.getValues(this.max);

    this.currValue = this.inputEl.value !== null ? this.inputEl.value : null;
  }


  /**
   * Setup the proper inputs. This could mean creating a typeahead, or creating selects.
   */
  _initializeInputs() {

    if (this.isTypeahead) {
      this._initializeInputPieces();
      this._runTypeaheads();
    }
    else if (this.isSelect) {
      removeClass(this.el, 'spark-input');
      this._initializeInputPieces();
    }
  }


  /**
   * Replace the date input with a group of typeaheads or select inputs.
   * Keep the date input around and store the typeahead data in there in an ISO date format.
   */
  _initializeInputPieces() {

    // Hide the original element. This will be updated as the typeahead values change
    this.inputEl.style.display = 'none';

    let els = [];
    let label;

    // Create a new typeahead for each part of the parsed format. Also add placeholder elements.
    this.parsedFormat.parts.forEach(function(part) {
      // Something weird with Node that makes us have to specify what `this` is here.
      (this.isTypeahead ? this._initializeTypeaheadPiece : this._initializeSelectPiece).call(this, els, part);
    }.bind(this));

    // Create a holder for all the pieces
    this.piecesEl = document.createElement('span');
    this.piecesEl.className = this.isTypeahead ? 'spark-input__fields' : 'spark-select-group';

    // Add all the necessary elements
    appendChildren(this.piecesEl, els);

    // If this is a select group, move the label element.
    if (this.isSelect && (label = this.el.querySelector('.spark-label'))) {
      this.piecesEl.appendChild(label);
    }

    // Add the pieces holder
    this.el.insertBefore(this.piecesEl, this.inputEl);

    // Set the value
    if (this.inputEl.value) {
      this.setValue(parsedDomFormat.getValues(this.inputEl.value));
      this.isActive = true;
    }
  }


  /**
   * Remove the input pieces.
   */
  _removeInputPieces() {

    this.inputEl.style.display = '';

    // Remove elements we inserted into the DOM
    if (this.piecesEl) {
      this.piecesEl.parentNode.removeChild(this.piecesEl);
    }
  }


  /**
   * Remove typeaheads.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  _removeTypeaheads(leaveElement) {

    // Remove typeaheads
    if (this.typeaheads) {
      for (let i in this.typeaheads) {
        this.typeaheads[i].remove(leaveElement);
      }
    }
  }


  /**
   * Remove selects.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  _removeSelects(leaveElement) {

    let label;

    // Remove selects
    if (this.selects) {

      for (let i in this.selects) {
        this.selects[i].remove(leaveElement);
      }

      // If this is a select group, move the label element.
      if ((label = this.piecesEl.querySelector('.spark-label'))) {
        this.el.appendChild(label);
      }

      addClass(this.el, 'spark-input');
    }
  }


  /**
   * Create a typeahead or placeholder piece.
   * @param {Array} els
   * @param {Object} part
   */
  _initializeTypeaheadPiece(els, part) {

    this.typeaheads = this.typeaheads || {};
    this.typeaheadEls = this.typeaheadEls || [];

    let el;

    switch (part.name) {
      case 'day':
      case 'month':
      case 'year':
        this.typeaheads[part.name] = new DateTypeahead({
          type: part.name,
          ariaLabelPrefix: this.inputLabel,
          len: part.length,
          placeholder: part.value,
          onFocus: this._onTypeaheadFocusBound,
          onBlur: this._onTypeaheadBlurBound,
          onChange: this._onPieceChangeBound,
          onInput: this._onTypeaheadInputBound,
          onBackspace: this._onTypeaheadBackspaceBound,
          onEnd: this._onTypeaheadEndBound
        });
        el = this.typeaheads[part.name].typeahead.el;
        this.typeaheadEls.push(el);
        break;
      default:
        el = document.createElement('span');
        el.innerHTML = part.value;
        el.className = 'spark-input__divider';
        break;
    }

    els.push(el);
  }


  /**
   * Replace the date input with three date dropdowns. Keep the date input around and store the
   * select data in there.
   */
  _initializeSelectPiece(els, part) {

    this.selects = this.selects || {};
    this.selectEls = this.selectEls || [];

    if (['day', 'month', 'year'].indexOf(part.name) === -1) {
      return;
    }

    let el;

    switch (part.name) {
      case 'day':
      case 'month':
        this.selects[part.name] = new DateSelect({
          type: part.name,
          ariaLabelPrefix: this.selectLabelPrefix,
          onChange: this._onPieceChangeBound
        });
        el = this.selects[part.name].select.el;
        break;
      case 'year': {
        let minYear = this.inputEl.min ? parsedDomFormat.getValues(this.inputEl.min).year : null;
        let maxYear = this.inputEl.max ? parsedDomFormat.getValues(this.inputEl.max).year : null;

        this.selects[part.name] = new DateSelect({
          min: minYear,
          max: maxYear,
          type: part.name,
          ariaLabelPrefix: this.selectLabelPrefix,
          onChange: this._onPieceChangeBound
        });
        el = this.selects[part.name].select.el;
        break;
      }
    }

    els.push(el);
    this.selectEls.push(el);
  }


  /**
   * If our element is a label, convert it to a div so that
   * we are semantically correct. Can't have more than one
   * input inside of a label!
   */
  _convertLabel() {

    if (this.isTypeahead || this.el.nodeName.toLowerCase() !== 'label') {
      return;
    }

    let newEl = document.createElement('fieldset');

    copyAttributes(this.el, newEl);
    appendChildren(newEl, this.el.children);

    if (this.el.parentNode) {
      this.el.parentNode.replaceChild(newEl, this.el);
    }

    this.el = newEl;
  }


  /**
   * Validate the date values.
   */
  _validate() {

    if (this.isTypeahead) {
      this._validateTypeaheads();
    }
    else if (this.isSelect) {
      this._validateSelects();
    }
  }


  /**
   * Validate the typeahead values.
   */
  _validateTypeaheads() {

    if (!this.typeaheads) {
      return;
    }

    let month = this.typeaheads.month ? this.typeaheads.month.getValue(true) : null;
    let year = this.typeaheads.year ? this.typeaheads.year.getValue(true) : null;
    let day = this.typeaheads.day ? this.typeaheads.day.getValue(true) : null;
    let maxDay;

    if (this.format === 'DD-MM-YYYY') {
      let selectedDate = new Date(this.inputEl.value); // this is in format YYYY-MM-DD
      let selectedMonth = selectedDate.getMonth() + 1;

      if (month === null || month === '') {
        maxDay = this._getMaxDaysInMonth(selectedMonth);
      }
      else {
        let oldVal = new Date(this.currValue);
        let oldMonth = oldVal.getMonth() + 1;

        if (selectedMonth !== oldMonth) {
          maxDay = this._getMaxDaysInMonth(selectedMonth);
        }
        else {
          maxDay = (month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate()) || this._getMaxDaysInMonth(month);
        }
      }
    }
    else {
      maxDay = (month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate()) || this._getMaxDaysInMonth(month);
    }

    if (maxDay < day) {
      this.typeaheads.day.setValue(maxDay);
      this.updateInput();
    }
  }


  /**
   * Validate the boundaries of the typeahead values relative to the min and max values.
   */
  _validateTypeaheadBounds() {

    let year = this.typeaheads.year ? this.typeaheads.year.getValue(true) : null;
    let month = this.typeaheads.month ? this.typeaheads.month.getValue(true) : null;
    let day = this.typeaheads.day ? this.typeaheads.day.getValue(true) : null;

    if (!year || !month || !day) {
      return;
    }

    let date = new Date(year, month - 1, day);
    let set = '';

    if (this.min && date < new Date(this.min.year, this.min.month - 1, this.min.day)) {
      set = 'min';
    }
    else if (this.max && date > new Date(this.max.year, this.max.month - 1, this.max.day)) {
      set = 'max';
    }

    if (set) {
      this.typeaheads.year.setValue(padNumber(this[set].year, this.typeaheads.year.typeahead.format.length));
      this.typeaheads.month.setValue(padNumber(this[set].month, this.typeaheads.month.typeahead.format.length));
      this.typeaheads.day.setValue(padNumber(this[set].day, this.typeaheads.day.typeahead.format.length));
      this.updateInput();
    }
  }


  /**
   * Pad the typeahead input values.
   */
  _padTypeaheads() {

    if (this._pauseInputChange) return;

    this._pauseInputChange = true;

    for (let i in this.typeaheads) {
      this._padTypeahead(this.typeaheads[i]);
    }

    this._pauseInputChange = false;
  }

  /**
   * Pad the typeahead input values.
   * @param {Typeahead} typeahead
   */
  _padTypeahead(typeahead) {

    let value = typeahead.getValue();

    if (value) {
      let padded = padNumber(value, typeahead.typeahead.format.length);
      if (value !== padded) typeahead.setValue(padNumber(value, typeahead.typeahead.format.length));
    }
  }


  /**
   * Do any of the typeaheads have a value?
   * @return {Boolean}
   */
  _hasTypeaheadValue() {

    for (let i in this.typeaheads) {
      if (this.typeaheads[i].getValue(true)) {
        return true;
      }
    }

    return false;
  }


  /**
   * Validate select input values.
   */
  _validateSelects() {

    if (!this.selects) {
      return;
    }

    let month = this.selects.month ? this.selects.month.getValue(true) : null;
    let year = this.selects.year ? this.selects.year.getValue(true) : null;

    let maxDay = (month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate()) || this._getMaxDaysInMonth(month);
    let day = this.selects.day ? this.selects.day.getValue(true) : null;

    this.selects.day.setOptions({
      max: maxDay
    });
    if (maxDay < day) {
      this.selects.day.setValue(maxDay);
    }

    this.updateInput();
  }


  /**
   * Get the maximum number of days for a given month.
   * @param {Number} month The month's number. 1-12.
   * @return {Number} The maximum number of days. 28-31.
   */
  _getMaxDaysInMonth(month) {
    if (month === 2) return 29;
    else if ([4, 6, 9, 11].indexOf(month) !== -1) return 30;
    return 31;
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because them.
   */
  _bindEventListenerCallbacks() {
    this._onTypeaheadBlurBound = this._onTypeaheadBlur.bind(this);
    this._onTypeaheadInputBound = this._onTypeaheadInput.bind(this);
    this._onTypeaheadFocusBound = this._onTypeaheadFocus.bind(this);
    this._onPieceChangeBound = this._onPieceChange.bind(this);
    this._onTypeaheadBackspaceBound = this._onTypeaheadBackspace.bind(this);
    this._onTypeaheadEndBound = this._onTypeaheadEnd.bind(this);
    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onVisibleChildrenBound = this._onVisibleChildren.bind(this);
  }


  /**
   * Add event listeners.
   */
  _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.inputEl.addEventListener('change', this._onInputChangeBound);
    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  }


  /**
   * Remove event listeners.
   */
  _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.inputEl.removeEventListener('change', this._onInputChangeBound);
    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  }

  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */
  _onVisibleChildren(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function() {
        this.update();
      }.bind(this), 0);
    }
  }

  /**
   * Run all typeaheads so they have placeholder values.
   */
  _runTypeaheads() {

    // Make sure we don't get into an infinite loop. Even though the logic
    // in the typeaheads should be stopping this from happening, there is
    // something in Safari where the focus and blur events fire in different
    // order than other browsers so those failsafes do not work.
    if (this.runningTypeaheads) {
      return;
    }

    this.runningTypeaheads = true;

    if (this.inFocus) {
      this.inFocus.pause();
    }

    for (let i in this.typeaheads) {
      if (this.typeaheads[i] !== this.inFocus) {
        this.typeaheads[i].run();
      }
    }

    if (this.inFocus) {
      this.inFocus.resume();
      this.inFocus.run();
    }

    this.runningTypeaheads = false;
  }


  /**
   * Update the active and focus classes.
   */
  _updateClass() {
    toggleClass(this.el, 'active', this.isActive);
    toggleClass(this.el, 'has-partial-value', this.hasPartialValue());
    toggleClass(this.el, 'focus', this.inFocus ? true : false);
  }


  /**
   * Get the typeahead that corresponds to the given element.
   * @param {Element} el
   * @return {Object}
   */
  _getTypeaheadByElement(el) {
    for (let i in this.typeaheads) {
      if (this.typeaheads[i].typeahead.el === el) {
        return this.typeaheads[i];
      }
    }
  }


  /**
   * Show the date as text.
   */
  _showDateText() {

    var text = this._getDateText();

    if (!text || !this.showDateAsText) {
      return;
    }

    if (!this.dateTextEl) {
      this._createDateTextEl();
    }

    this.dateTextEl.innerHTML = text;
    this.dateTextEl.style.display = '';
  }


  /**
   * Hide the date as text.
   */
  _hideDateText() {

    if (!this.showDateAsText || !this.dateTextEl) {
      return;
    }

    this.dateTextEl.style.display = 'none';
  }


  /**
   * Create the date text element.
   */
  _createDateTextEl() {

    var el = document.createElement('div');
    el.className = 'spark-input__overlay';
    el.style.display = 'none';

    this.el.appendChild(el);
    this.dateTextEl = el;
  }


  /**
   * Get the date as text.
   */
  _getDateText() {

    var parts = this.parsedTextFormat.parts;
    var i = 0;
    var len = parts.length;
    var str = '';
    var isValid = true;
    var val;

    for(; i < len; i++) {

      val = this.typeaheads[parts[i].name] && this.typeaheads[parts[i].name].getValue();

      switch(parts[i].name) {
        case 'month':
          str += date.getMonthNameShort(val);
          if (!val) {
            isValid = false;
            break;
          }
          break;
        case 'day':
        case 'year':
          str += val;
          if (!val) {
            isValid = false;
            break;
          }
          break;
        default:
          str += parts[i].value;
          break;
      }
    }

    return (isValid ? str : false);
  }


  /**
   * When the value of a typeahead or select changes, validate.
   * @param {Number} val
   * @param {Object} typeahead
   */
  _onPieceChange() {

    this._validate();

    if (this.isTypeahead && this.showDateAsText && !this._hasFocus) {

      if (this._showTextTimer) {
        clearTimeout(this._showTextTimer);
      }

      this._showTextTimer = setTimeout(function() {
        this._showDateText();
      }.bind(this), 0);
    }
  }


  /**
   * When the typeahead gains focus.
   * @param {Number} val
   * @param {Object} typeahead
   */
  _onTypeaheadFocus(val, typeahead) {

    if (this.runningTypeaheads) return;

    this._hideDateText();

    if (!this._hasFocus) {
      this._hasFocus = true;
      (this.onFocus || noop)(this.inputEl.value, this);
    }

    triggerEvent(this.inputEl, 'focus');
    this.inFocus = typeahead;
    this.show();
    this._updateClass();

    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }
  }


  /**
   * When the typeahead loses focus, make sure numbers are padded properly.
   * @param {Number} val
   * @param {Object} typeahead
   */
  _onTypeaheadBlur(val, typeahead) {

    if (this.runningTypeaheads) return;

    this.inFocus = null;

    this._padTypeahead(typeahead);
    this.updateInput();
    this._updateClass();

    if (!this.inputEl.value && !this._hasTypeaheadValue()) {
      this.hide();
    }
    else {
      this._validateTypeaheadBounds();
    }

    this._blurTimer = setTimeout(function() {
      this._hasFocus = false;
      (this.onBlur || noop)(this.inputEl.value, this);
      this._showDateText();
    }.bind(this), 1);
  }

  /**
   * `input` event callback for typeahead
   */
  _onTypeaheadInput() {
    (this.onInput || noop)(this.getTypingValue(), this);
  }

  /**
   * When the typeahead fires a backspace event, move back to the previous input.
   * @param {Number} val
   * @param {Object} typeahead
   */
  _onTypeaheadBackspace() {
    this.focusPrevious();
  }


  /**
   * When the typeahead is at its maximum length and the caret is at the end,
   * focus on the next input field.
   * @param {Object} typeahead
   * @param {String} character Optional
   */
  _onTypeaheadEnd(typeahead, character) {
    this.focusNext(character);
  }


  /**
   * When the input that corresponds to this instance changes. Allows us to listen
   * and respond to changes made by other components (Calendar Popover, for example).
   * @param {Object} e
   */
  _onInputChange(e) {

    if (this.isTypeahead) {
      this.isActive = e.target.value ? true : false;
      this._updateClass();
    }

    if (this._pauseInputChange) return;
    this.setValue(parsedDomFormat.getValues(e.target.value));
    (this.onChange || noop)(this.inputEl.value, this);
  }


  /**
   * When the input group is clicked, focus on the first typeahead
   * if we don't already have focus.
   * @todo : we should still replace the label on typeaheads and use this,
   * but we need a way to focus on the closest element to a click.
   * @param {Object} e
   */
  _onClick(/*e*/) {

    /*if (this.isTypeahead || this.inFocus || this.isActive || getParent(e.target, '.spark-input__addon')) {
      return;
    }

    let input = this.typeaheadEls[0].querySelector('input');

    if (input) {
      input.focus();
    }*/
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
DateInput.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange', 'onInput', 'onFocus', 'onBlur', 'isTypeahead', 'isSelect', 'format', 'textFormat', 'showDateAsText', 'min', 'max'];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
DateInput.prototype.defaults = {
  el: null,
  inputEl: null,
  messageEl: null,
  piecesEl: null,
  toggleEl: null,
  inFocus: null,
  isActive: null,
  isSelect: null,
  isTypeahead: null,
  typeaheads: null,
  typeaheadEls: null,
  selects: null,
  selectEls: null,
  format: null,
  parsedFormat: null,
  showDateAsText: null,
  textFormat: null,
  runningTypeaheads: false,
  onValidate: null,
  onChange: null,
  onInput: null,
  onFocus: null,
  onBlur: null,
  _hasFocus: false,
  _pauseInputChange: false,
  _onClickBound: null,
  _onPieceChangeBound: null,
  _onTypeaheadFocusBound: null,
  _onTypeaheadBlurBound: null,
  _onTypeaheadInputBound: null,
  _onTypeaheadBackspaceBound: null,
  _onTypeaheadEndBound: null,
  _onInputChangeBound: null
};

mixin(DateInput.prototype, messaging, validation);

export default DateInput;
