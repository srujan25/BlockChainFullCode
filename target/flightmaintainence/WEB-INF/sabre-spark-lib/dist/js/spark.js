/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Spark = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":65}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _popover = require('./popover');

var _popover2 = _interopRequireDefault(_popover);

var _parseFormat = require('../helpers/date/parse-format');

var _parseFormat2 = _interopRequireDefault(_parseFormat);

var _date = require('../helpers/date/date');

var _date2 = _interopRequireDefault(_date);

var _buildSelect = require('../helpers/form/build-select');

var _buildSelect2 = _interopRequireDefault(_buildSelect);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _appendChildren = require('../helpers/manipulation/append-children');

var _appendChildren2 = _interopRequireDefault(_appendChildren);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _triggerEvent = require('../helpers/dom/trigger-event');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _breakpoint = require('../helpers/dom/breakpoint');

var _scrollTo = require('../helpers/animation/scroll-to');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _getSiblingBefore = require('../helpers/traversal/get-sibling-before');

var _getSiblingBefore2 = _interopRequireDefault(_getSiblingBefore);

var _getSiblingAfter = require('../helpers/traversal/get-sibling-after');

var _getSiblingAfter2 = _interopRequireDefault(_getSiblingAfter);

var _range = require('../helpers/util/range');

var _range2 = _interopRequireDefault(_range);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Calendar Popover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Create a calendar from which dates can be selected.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new CalendarPopover(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/calendar-popover.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};
var domDateFormat = 'YYYY-MM-DD';
var parsedDomFormat = (0, _parseFormat2.default)(domDateFormat);

function createDefaultElement() {
  var el = document.createElement('span');
  el.className = 'spark-input spark-date';
  el.innerHTML = '<input class="spark-input__field" type="date"><span class="spark-label"></span>';
  return el;
}

/**
 * Parse the proper params for initialization
 * @param  {Element} el
 * @param  {Object} params
 * @return {Objec}
 */
function parseInitParams(el, params) {

  // If the first element is an array or array-like (NodeList),
  // we will be working with a range.
  if (el && el.hasOwnProperty('length')) {
    params.els = el;
  }
  // If the first argument is a plain object, create a default element
  // since the user MUST provide additional params but the element
  // is optional. Doing it this way to keep the arity the same
  // as other components.
  else if (!(el instanceof HTMLElement)) {
      params = el || {};
      params.els = [createDefaultElement()];
    }
    // A single element is passed.
    else {
        params.els = [el];
      }

  params.visibleCounts = params.visibleCounts || (params.visibleCount ? [params.visibleCount] : null);
  params.mins = params.mins || (params.min ? [params.min] : []);
  params.maxes = params.maxes || (params.max ? [params.max] : []);
  params.values = params.values || (params.value ? [params.value] : []);

  return params;
}

var CalendarPopover = function (_BaseComponent) {
  _inherits(CalendarPopover, _BaseComponent);

  /**
   * Calendar Popover constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  function CalendarPopover(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CalendarPopover);

    params = parseInitParams(el, params);

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    // Create a calendar element if we weren't passed one.
    (_this.calendarEl ? noop : _this._createCalendar).call(_this);
    _this._cacheCalendarElements();

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._initDatesToShow();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  CalendarPopover.prototype.update = function update(el) {

    if (el) {
      this._removeEventListeners();
      this.els = el instanceof Array ? el : [el];
      this._cacheElements();
      this._addEventListeners();
    }

    this._parseInputElsParams();
    this._initDatesToShow();

    if (this.activeIndex !== null) {
      this.render();
      this._checkSize();
    }

    return this;
  };

  /**
   * Open the calendar widget.
   * @param {Number} index Optional The index of the element to tie actions to
   * @param {Object} params Optional
   */


  CalendarPopover.prototype.open = function open() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (this._isDisabled[index]) {
      return this;
    }

    this._unfillToggle();

    // Allow for only params to be passed
    if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object') {
      params = index;
      index = 0;
    }

    // Already open
    if (this.activeIndex === index) {
      return this;
    }

    // We have an already active item, close it
    if (this.activeIndex !== null) {
      this._deactivateElement(this.activeIndex);
    }

    // Clear any timers which may be running to close or open this
    clearTimeout(this._openCloseTimer);

    // Set the new index
    this.activeIndex = index;

    // If we don't have a popover yet, create it.
    if (!this.popover) {
      this._createPopover();
    }

    // Get the list of dates to show for this view.
    this._initDatesToShow();

    // Ensure the cached values are in line with the input values.
    this.updateValues();

    // Create a calendar or calendars inside the popover
    this.render({
      clearCache: true
    });

    // Finally, show the popover after a delay or on the next tick.
    this._openCloseTimer = setTimeout(function () {
      this.popover.open({
        affixTo: this.els[index].querySelector('.spark-date__calendar-toggle')
      });
    }.bind(this), params.delay || 0);

    // Activate the corresponding element
    this._activateElement(index);

    return this;
  };

  /**
   * Close the calendar widget.
   * @param {Object} params
   */


  CalendarPopover.prototype.close = function close(params) {

    this._unfillToggle();

    params = params || {};

    // Can't close if we aren't or haven't yet opened.
    if (this.activeIndex === null || !this.popover) {
      return this;
    }

    // Deactive the corresponding element
    this._deactivateElement(this.activeIndex);

    // Clear any existing close or open events which are queued
    clearTimeout(this._openCloseTimer);

    // Close after a delay, or on the next tick
    this.activeIndex = null;
    this._openCloseTimer = setTimeout(function () {
      this.popover.close();
    }.bind(this), params.delay || 0);
  };

  /**
   * Get the value.
   * @param {Number|Element} index Optional
   * @return {Mixed}
   */


  CalendarPopover.prototype.getValue = function getValue(index) {
    return this.values[index || 0];
  };

  /**
   * Set the date for a given element.
   * @param {String|Object} value
   * @param {Number|Element} index
   * @param {Boolean} skipRangeCheck Optional Don't check for sequential range values.
   */


  CalendarPopover.prototype.setValue = function setValue(value, index, skipRangeCheck) {

    var obj = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : parsedDomFormat.getValues(value);
    var el = void 0;

    // If we are passed an element instead of an index, use that.
    if (index instanceof HTMLElement) {
      el = index;
      index = this.inputEls.indexOf(el);
    }
    // Otherwise, find the element in our list.
    else {
        index = index || 0;
        el = this.inputEls[index];
      }

    // Update the stored value
    this.values[index] = obj;

    // If we are working with a range, make sure that the values are in order.
    if (value) {
      this._checkValues(index, skipRangeCheck);
    }

    // Set the value on the input element. Make sure we don't get into an infinite
    // loop since we listen to the change event on the input. We have to trigger it
    // so that other components listening to it get the update.
    el.value = value && obj === value ? parsedDomFormat.getString(value) : value || '';

    this._inputsChanging = this._inputsChanging || [];
    if (this._inputsChanging.indexOf(index) === -1) {
      this._inputsChanging.push(index);

      (0, _triggerEvent2.default)(el, 'change');
      (this.onChange || noop)(el, el.value, this);

      var pos = this._inputsChanging.indexOf(index);
      this._inputsChanging.splice(pos, 1);
    }

    this.render({
      clearCache: true
    });

    return this;
  };

  /**
   * Clear the selected values.
   */


  CalendarPopover.prototype.clearValues = function clearValues() {

    var els = this.inputEls;
    var i = 0;
    var len = els.length;

    for (; i < len; i++) {
      this.clearValue(i);
    }

    return this;
  };

  /**
   * Clear the selected value.
   * @param {Number} index
   */


  CalendarPopover.prototype.clearValue = function clearValue() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this.values = this.values || [];
    if (!this.inputEls[index]) throw new Error('Cannot clear value at index ' + index + '. No input element exists with that index!');
    this.values[index] = this.inputEls[index].value = null;
    return this;
  };

  /**
   * Take the date values from the inputs and set them as dates on the calendar.
   */


  CalendarPopover.prototype.updateValues = function updateValues() {

    var els = this.inputEls;
    var i = 0;
    var len = els.length;

    for (; i < len; i++) {
      this.updateValue(i);
    }

    return this;
  };

  /**
   * Take the date values from the inputs and set them as dates on the calendar.
   * @param {Number} index
   */


  CalendarPopover.prototype.updateValue = function updateValue() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this.values = this.values || [];
    if (!this.inputEls[index]) throw new Error('Cannot update value at index ' + index + '. No input element exists with that index!');
    this.values[index] = this.inputEls[index].value ? parsedDomFormat.getValues(this.inputEls[index].value) : null;
    return this;
  };

  /**
   * Disable the calendar functionality.
   * @param {Number} index
   */


  CalendarPopover.prototype.disable = function disable(index) {

    var i = index || 0;
    var len = index !== undefined ? index + 1 : this.els.length;
    var toggle = void 0;

    for (; i < len; i++) {
      this._isDisabled[i] = true;
      this.els[i].setAttribute('disabled', '');
      toggle = this.els[i].querySelector('.spark-date__calendar-toggle');
      if (toggle) toggle.setAttribute('disabled', '');
    }

    this.close();

    return this;
  };

  /**
   * Enable the calendar functionality.
   * @param {Number} index
   */


  CalendarPopover.prototype.enable = function enable(index) {

    var i = index || 0;
    var len = index !== undefined ? index + 1 : this.els.length;
    var toggle = void 0;

    for (; i < len; i++) {
      this._isDisabled[i] = false;
      this.els[i].removeAttribute('disabled', '');
      toggle = this.els[i].querySelector('.spark-date__calendar-toggle');
      if (toggle) toggle.removeAttribute('disabled');
    }

    return this;
  };

  /**
   * Render the calendar or calendars into the popover.
   * @param {Object} params
   */


  CalendarPopover.prototype.render = function render(params) {

    params = params || {};

    // If we don't have a popover yet, create it.
    if (!this.popover) {
      this._createPopover();
    }

    var content = void 0;

    // Clear the cache so that we don't show out-of-date values.
    if (params.clearCache) {
      this._renderCache = {};
    }

    // Create the visible days, weeks, months or years
    if (this.viewRange === 'year') content = this._renderYears();else if (this.viewRange === 'week') content = this._renderWeeks();else if (this.viewRange === 'day') content = this._renderDays();else content = this._renderMonths();

    this._insertContent(content, params);

    // Update attributes
    this._updateAttributes();

    return this;
  };

  /**
   * Cleans up event listeners and removes helpers.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  CalendarPopover.prototype.remove = function remove(leaveElement) {
    this.popover && this.popover.remove();
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Move to the next set of dates.
   */


  CalendarPopover.prototype.next = function next() {
    if (this._atMax) return this;
    this._setDatesToShow(1);
    this.render({
      append: 1
    });
    return this;
  };

  /**
   * Move to the previous set of dates.
   */


  CalendarPopover.prototype.previous = function previous() {
    if (this._atMin) return this;
    this._setDatesToShow(-1);
    this.render({
      prepend: 1
    });
    return this;
  };

  /**
   * Show a specific date on the calendar.
   * @param {Object} params
   */


  CalendarPopover.prototype.showDate = function showDate(params) {

    // Open if we're closed.
    if (this.activeIndex === null) {
      this.open();
    }

    var month = params.month || null;
    var year = params.year || null;
    var day = params.day || null;

    // Nothing to do.
    if (!month && !year && !day) {
      return this;
    }

    var showing = this._datesToShow[this.activeIndex].clone();
    var noun = this.viewRange.charAt(0).toUpperCase() + this.viewRange.slice(1);

    // Only change the values we were given
    if (year) {
      showing.year = year;
    }
    if (month) {
      showing.month = month;
    }
    if (day) {
      showing.day = day;
    }

    // Check min
    var min = this.mins[this.activeIndex];
    if (min && showing['before' + noun](min)) {
      showing = min.clone();
    }

    // Check max
    var max = this.maxes[this.activeIndex];
    if (max && showing['after' + noun](max)) {
      showing = max.clone();
    }
    this._datesToShow[this.activeIndex] = showing;

    // Populate the rest of the dates
    this._setDatesToShow();

    return this.render();
  };

  /**
   * Render the appropriate number of years.
   * @return {Array}
   */


  CalendarPopover.prototype._renderYears = function _renderYears() {
    throw new Error('Displaying years in the calendar is not yet supported!');
  };

  /**
   * Render the appropriate number of weeks.
   * @return {Array}
   */


  CalendarPopover.prototype._renderWeeks = function _renderWeeks() {
    throw new Error('Displaying weeks in the calendar is not yet supported!');
  };

  /**
   * Render the appropriate number of days.
   * @return {Array}
   */


  CalendarPopover.prototype._renderDays = function _renderDays() {
    throw new Error('Displaying days in the calendar is not yet supported!');
  };

  /**
   * Render the appropriate number of months.
   * @return {Array}
   */


  CalendarPopover.prototype._renderMonths = function _renderMonths() {

    var months = [];
    var i = 0;
    var len = this._datesToShow.length;
    var current = _date2.default.now();

    for (; i < len; i++) {
      months.push(this._renderMonth(this._datesToShow[i], current));
    }

    return months;
  };

  /**
   * Render a month.
   * @param {Object} date
   * @param {Object} current
   * @return {Element}
   */


  CalendarPopover.prototype._renderMonth = function _renderMonth(date, current) {

    // A unique key for this month used for caching
    var key = date.year + '-' + date.month;

    // Ensure we have a cache
    this._renderCache = this._renderCache || {};

    // Return a cached instance
    if (this._renderCache[key]) {
      return this._renderCache[key];
    }

    // Create the element
    var el = document.createElement('div');
    var html = '';
    el.className = 'spark-calendar__month ' + this._getMonthClassNames(date);

    // Add the title or dropdowns.
    html += '<div class="spark-calendar__month-title">';
    if (this.quickJump && this.visibleCounts[this.activeIndex] === 1) {
      html += this._renderMonthQuickJump(date);
    } else {
      html += date.monthName + ' ' + date.year;
    }
    html += '</div>';

    // Add the days of the week headings
    html += this._renderMonthDaysOfWeek();

    // Add the days
    html += this._renderMonthDays(date, current);

    el.innerHTML = html;

    // Store in the cache and return
    return this._renderCache[key] = el;
  };

  /**
   * Render the select inputs used for jumping ahead/backward several months.
   * @param {Object} date
   */


  CalendarPopover.prototype._renderMonthQuickJump = function _renderMonthQuickJump(date) {

    var el = document.createElement('div');
    var years = void 0;
    var months = void 0;

    // Min and max year to show
    var min = this.mins[this.activeIndex] ? this.mins[this.activeIndex].clone() : null;
    var max = this.maxes[this.activeIndex] ? this.maxes[this.activeIndex].clone() : null;
    var quickJumpRange = typeof this.quickJumpRange === 'number' && this.quickJumpRange % 1 === 0 ? this.quickJumpRange : 50;

    // No min, go 50 years back
    if (!min) {
      min = date.clone();
      min.year = min.year - quickJumpRange;
    }

    // No max, go 50 years forward
    if (!max) {
      max = date.clone();
      max.year = max.year + quickJumpRange;
    }

    // Get the months to show.
    var monthOpts = _date2.default.getMonthNames().map(function (val, i) {

      // Don't show a month that is out of the valid range.
      if (min.year === max.year && (i + 1 < min.month || i + 1 > max.month)) {
        return null;
      }

      return {
        value: i + 1,
        text: val
      };
    }).filter(function (i) {
      return i;
    });

    // Min and max are the same month, so just show text.
    if (!monthOpts.length || monthOpts.length === 1) {
      months = document.createElement('span');
      months.innerHTML = date.monthName + ' ';
    } else {

      // Build a select list of months
      months = document.createElement('label');
      (0, _addClass2.default)(months, 'spark-select spark-calendar__select');
      months.appendChild((0, _buildSelect2.default)({
        selected: date.month,
        attributes: {
          class: 'spark-select__input',
          name: 'month'
        },
        options: monthOpts
      }));
    }

    // Min and max year are the same, so just show text.
    if (min.year === max.year) {
      years = document.createElement('span');
      years.innerHTML = date.year;
    } else {

      // Build a select list of years
      years = document.createElement('label');
      (0, _addClass2.default)(years, 'spark-select spark-calendar__select');
      years.appendChild((0, _buildSelect2.default)({
        selected: date.year,
        attributes: {
          class: 'spark-select__input',
          name: 'year'
        },
        options: (0, _range2.default)(max.year, min.year - 1)
      }));
    }

    (0, _appendChildren2.default)(el, [months, years]);

    return el.innerHTML;
  };

  /**
   * Render the days of week row for a month calendar.
   * @return {String}
   */


  CalendarPopover.prototype._renderMonthDaysOfWeek = function _renderMonthDaysOfWeek() {

    var daysOfWeek = _date2.default.getDayNames();
    var i = 0;
    var len = daysOfWeek.length;
    var str = '<div class="spark-calendar__days-of-week">';

    for (; i < len; i++) {
      str += '<span class="spark-calendar__day-of-week">' + daysOfWeek[i][0] + '</span>';
    }

    return str += '</div>';
  };

  /**
   * Render the days of week row for a month calendar.
   * @param {Object} date
   * @param {Object} current
   * @return {String}
   */


  CalendarPopover.prototype._renderMonthDays = function _renderMonthDays(date, current) {

    var dayOfWeek = date.monthStart.dayOfWeek;
    var startOfWeek = dayOfWeek > 1 ? date.monthStart.weekStart : null;
    var monthEnd = date.monthEnd;
    var weeks = 6;
    var i = 0;
    var j = 0;
    var str = '<div class="spark-calendar__days">';
    var day = 0;
    var month = startOfWeek ? startOfWeek.month : date.month;
    var year = startOfWeek ? startOfWeek.year : date.year;
    var isCurrentMonth = current.year === date.year && current.month === date.month;

    // If we have days that come before the first of the month, the days will start as
    // inactive. We use a 1 here to indicate the date is inactive and _before_
    // the start of the month.
    var inactive = startOfWeek ? 1 : null;

    for (; i < weeks; i++) {
      for (; j < 7; j++) {

        day = startOfWeek ? startOfWeek.day + j : day + 1;
        str += this._renderMonthDay(day, month, year, isCurrentMonth, current, inactive);

        if (startOfWeek && j + 1 >= dayOfWeek - 1) {
          startOfWeek = null;
          inactive = null;
          day = 0;
          month = date.month;
          year = date.year;
          isCurrentMonth = current.year === date.year && current.month === date.month;
        } else if (day >= monthEnd.day && i > 0) {

          // Inactive days that come _after_ the last of the month are denoted with a 2.
          // _renderMonthDay handles 1s and 2s differently, but both add the inactive class.
          inactive = 2;
          isCurrentMonth = false;

          day = 0;
          month++;

          if (month > 12) {
            year++;
            month = 1;
          }
        }
      }
      j = 0;
    }

    return str += '</div>';
  };

  /**
   * Render a day of the month.
   * @param {Number} day
   * @param {Number} month
   * @param {Number} year
   * @param {Boolean} isCurrentMonth
   * @param {Object} current
   * @param {Boolean} inactive
   */


  CalendarPopover.prototype._renderMonthDay = function _renderMonthDay(day, month, year, isCurrentMonth, current, inactive) {

    var date = _date2.default.create({
      year: year,
      month: month,
      day: day
    });
    var str = '<a';
    var disabled = inactive || this._isDayDisabled(date);

    str += !disabled ? ' data-date="' + parsedDomFormat.getString(date) + '"' : '';
    str += inactive ? ' data-direction="' + (inactive === 2 ? 'next' : 'previous') + '"' : '';
    str += ' class="spark-calendar__day';
    str += isCurrentMonth && current.day === day && current.month === month && current.year === year ? ' spark-calendar__day--today' : '';
    str += inactive ? ' spark-calendar__day--inactive' : '';
    str += disabled ? ' spark-calendar__day--disabled' : '';
    str += this._isDaySelected(date) ? ' spark-calendar__day--selected' : '';
    str += this._isDayRangeStart(date) ? ' spark-calendar__range-start' : '';
    str += this._isDayRangeMiddle(date) ? ' spark-calendar__range-middle' : '';
    str += this._isDayRangeEnd(date) ? ' spark-calendar__range-end' : '';
    str += this._isDayRangeLast(date) ? ' spark-calendar__range-last' : '';
    str += '"';
    str += ' href="#"><span>';
    str += day;
    str += this._getDayInfo(date);
    str += '</span></a>';

    return str;
  };

  /**
   * Render the children into the content.
   * @param {Array} content
   */


  CalendarPopover.prototype._insertContent = function _insertContent(content, params) {

    this._currentContent = this._currentContent || [];

    params = params || {};

    var keep = void 0;
    var i = 0;
    var len = void 0;

    // If we've been asked to prepend or append, add the new elements in front,
    // save the number of old elements we're sliding out, animate,
    // then clean up.
    if (this.animate) {

      if (params.prepend) {

        // Get the last elements to keep
        keep = this._currentContent.slice(-params.prepend);
        len = keep.length;
        for (; i < len; i++) {
          content.push(keep[i]);
        }

        this.calendarEl.setAttribute('data-prepend-count', len);

        this._animateContent(function () {

          this.calendarEl.removeAttribute('data-prepend-count');

          this._animateContent(function () {
            content = content.slice(0, -params.prepend);
            this._insertContent(content);
          }, this.animationDuration);
        }, 10);
      }
      // Same but appending
      else if (params.append) {

          // Get the first elements to keep
          keep = this._currentContent.slice(0, params.append);
          len = keep.length;
          for (; i < len; i++) {
            content.unshift(keep[i]);
          }

          this.calendarEl.setAttribute('data-append-count', len);

          this._animateContent(function () {

            (0, _addClass2.default)(this.calendarEl, 'no-animate');
            content = content.slice(params.append);
            this._insertContent(content);
            this.calendarEl.removeAttribute('data-append-count');

            this._animateContent(function () {
              (0, _removeClass2.default)(this.calendarEl, 'no-animate');
            }, 10);
          }, this.animationDuration);
        }
    }

    (0, _appendChildren2.default)(this.calendarContentEl, this._currentContent = content, true);
  };

  /**
   * Is a given day selected?
   * @param {Object} date
   * @return {Boolean}
   */


  CalendarPopover.prototype._isDaySelected = function _isDaySelected(date) {
    return this.values && date.equal(this.values);
  };

  /**
   * Is a given day the start of a range?
   * @param {Object} date
   * @return {Boolean}
   */


  CalendarPopover.prototype._isDayRangeStart = function _isDayRangeStart(date) {
    return this.inputEls.length > 1 && this.values && date.equal(this.values[0]);
  };

  /**
   * Is a given day the middle of a range?
   * @param {Object} date
   * @return {Boolean}
   */


  CalendarPopover.prototype._isDayRangeMiddle = function _isDayRangeMiddle(date) {
    return this.inputEls.length > 1 && this.values && this.values.length > 1 && date.equal(this.values.slice(1, -1));
  };

  /**
   * Is a given day the end of a range?
   * @param {Object} date
   * @return {Boolean}
   */


  CalendarPopover.prototype._isDayRangeEnd = function _isDayRangeEnd(date) {
    return this.inputEls.length > 1 && this.values && this.values.length > 1 && date.equal(this.values[this.values.length - 1]);
  };

  /**
   * Is a given day currently the last
   * @param {Object} date
   * @return {Boolean}
   */


  CalendarPopover.prototype._isDayRangeLast = function _isDayRangeLast(date) {

    var i = this.values.length - 1;

    for (; i > 0; i--) {

      // We have a value and it's not the same as the date.
      if (this.values[i]) {
        if (!date.equal(this.values[i])) {
          return false;
        }
        break;
      }
    }

    return true;
  };

  /**
   * Is a given day disabled?
   * @param {Object} date
   * @return {Boolean}
   */


  CalendarPopover.prototype._isDayDisabled = function _isDayDisabled(date) {
    return this.daysDisabled && this.daysDisabled[date.year] && this.daysDisabled[date.year][date.month] && this.daysDisabled[date.year][date.month].indexOf(date.day) !== -1 || this.mins[this.activeIndex] && date.before(this.mins[this.activeIndex], true) || this.maxes[this.activeIndex] && date.after(this.maxes[this.activeIndex], true);
  };

  /**
   * Get any "info" for a given day.
   * @param {Object} date
   * @return {String}
   */


  CalendarPopover.prototype._getDayInfo = function _getDayInfo(date) {
    return this.daysInfo && this.daysInfo[date.year] && this.daysInfo[date.year][date.month] && this.daysInfo[date.year][date.month][date.day] ? '<span class="spark-calendar__day-note">' + this.daysInfo[date.year][date.month][date.day] + '</span>' : '';
  };

  /**
   * Get the class names for a month.
   * @param {Object} date
   * @return {String}
   */


  CalendarPopover.prototype._getMonthClassNames = function _getMonthClassNames(date) {

    var cls = [];

    // Do we have a value in this month?
    if (date.equalMonth(this.values)) {
      cls.push('has-value');
    }

    // Does this month have the start, middle or end of a range?
    if (this._isRange && this.els.length > 1) {

      var start = date.equalMonth(this.values[0]);
      var end = date.equalMonth(this.values[this.values.length - 1]);
      var middle = date.equalMonth(this.values.slice(1, -1));
      var valBefore = date.afterMonth(this.values);
      var valAfter = date.beforeMonth(this.values);
      var afterEnd = this.values[this.values.length - 1] && date.after(this.values[this.values.length - 1]);

      if (start) {
        cls.push('range-start');
      }
      if (end) {
        cls.push('range-end');
      }
      if (middle) {
        cls.push('range-middle');
      }
      if (valBefore) {
        cls.push('value-before');
      }
      if (valAfter) {
        cls.push('value-after');
      }
      if (afterEnd) {
        cls.push('after-range-end');
      }
    }

    return cls.join(' ');
  };

  /**
   * Create the calendar.
   */


  CalendarPopover.prototype._createCalendar = function _createCalendar() {
    var el = document.createElement('div');
    (0, _addClass2.default)(el, 'spark-calendar');
    el.innerHTML = '<nav class="spark-calendar__nav"><button class="spark-calendar__previous spark-icon-chevron-left" title="Previous"></button><button class="spark-calendar__next spark-icon-chevron-right" title="Next"></button></nav><div class="spark-calendar__overflow"><div class="spark-calendar__content"></div></div>';
    this.calendarEl = el;
    this.calendarContentEl = el.querySelector('.spark-calendar__content');
    this.calendarOverflowEl = el.querySelector('.spark-calendar_overflow');
  };

  /**
   * Create the popover.
   */


  CalendarPopover.prototype._createPopover = function _createPopover() {

    this.popover = new _popover2.default(document.createElement('div'), {
      anchorX: 'center',
      anchorY: 'bottom',
      contentEl: this.calendarEl,
      onClose: this._onPopoverClose.bind(this),
      onOpen: this._onPopoverOpen.bind(this)
    });
  };

  /**
   * Cache elements.
   */


  CalendarPopover.prototype._cacheElements = function _cacheElements() {

    this.inputEls = [];

    var i = 0;
    var len = this.els.length;
    var input = void 0;

    for (; i < len; i++) {
      input = this.els[i].nodeName.toLowerCase() === 'input' ? this.els[i] : this.els[i].querySelector('input[type="date"]');
      this.inputEls[i] = input;
    }
  };

  /**
   * Cache elements specific to the calendar.
   */


  CalendarPopover.prototype._cacheCalendarElements = function _cacheCalendarElements() {
    this.nextButtonEl = this.calendarEl.querySelector('.spark-calendar__next');
    this.previousButtonEl = this.calendarEl.querySelector('.spark-calendar__previous');
  };

  /**
   * Parse parameters from the elements.
   */


  CalendarPopover.prototype._parseParams = function _parseParams() {

    this._parseInputElsParams();

    this._isRange = this.els.length > 1 ? true : false;
    this.autoAdvance = this.autoAdvance !== null ? this.autoAdvance : (0, _parseAttribute.boolean)(this.els[0], 'data-auto-advance', true);
    this.autoClose = this.autoClose !== null ? this.autoClose : (0, _parseAttribute.boolean)(this.els[0], 'data-auto-close', true);
    this.closeDelay = this.closeDelay !== null ? this.closeDelay : (0, _parseAttribute.number)(this.els[0], 'data-close-delay', 500);
    this.quickJump = this.quickJump !== null ? this.quickJump : (0, _parseAttribute.boolean)(this.els[0], 'data-quick-jump', false);
    this.viewRange = this.viewRange !== null ? this.viewRange : (0, _parseAttribute.string)(this.els[0], 'data-view-range', 'month');
    this.animate = this.animate !== null ? this.animate : (0, _parseAttribute.boolean)(this.els[0], 'data-animate', true);
    this.animationDuration = this.animationDuration !== null ? this.animationDuration : (0, _parseAttribute.number)(this.els[0], 'data-animation-duration', 100);
    this.showOnFocus = this.showOnFocus !== null ? this.showOnFocus : (0, _parseAttribute.boolean)(this.els[0], 'data-show-on-focus', false);
  };

  /**
   * Parse the min, max, value and visible counts from the elements if we can.
   * @return {Number|Boolean}
   */


  CalendarPopover.prototype._parseInputElsParams = function _parseInputElsParams() {

    var els = this.inputEls;

    if (!els) {
      return;
    }

    var i = 0;
    var len = els.length;
    var mins = [];
    var maxes = [];
    var values = [];
    var visibleCounts = [];
    var disableds = [];

    for (; i < len; i++) {

      if (!els[i]) {
        continue;
      }

      if (this.mins && this.mins[i]) mins[i] = _typeof(this.mins[i]) === 'object' ? this.mins[i] : parsedDomFormat.getValues(this.mins[i]);else if (els[i].getAttribute('min')) mins[i] = parsedDomFormat.getValues(els[i].getAttribute('min'));

      if (this.maxes && this.maxes[i]) maxes[i] = _typeof(this.maxes[i]) === 'object' ? this.maxes[i] : parsedDomFormat.getValues(this.maxes[i]);else if (els[i].getAttribute('max')) maxes[i] = parsedDomFormat.getValues(els[i].getAttribute('max'));

      if (this.values && this.values[i]) values[i] = _typeof(this.values[i]) === 'object' ? this.values[i] : parsedDomFormat.getValues(this.values[i]);else if (els[i].value) values[i] = parsedDomFormat.getValues(els[i].value);

      disableds[i] = (0, _parseAttribute.boolean)(els[i], 'disabled', false);

      if (!this.visibleCounts) visibleCounts[i] = parseInt(els[i].getAttribute('data-visible-count'), 10) || 1;
    }

    this.mins = mins;
    this.minVisible = _date2.default.earliest(mins);
    this.maxes = maxes;
    this.maxVisible = _date2.default.latest(maxes);
    this.values = values;
    this._isDisabled = disableds;
    if (visibleCounts.length) this.visibleCounts = visibleCounts;
  };

  /**
   * Get the dates we should be showing. Start with the first value or today's date.
   */


  CalendarPopover.prototype._initDatesToShow = function _initDatesToShow() {

    var arr = [];
    var i = 0;
    var len = this.values.length;

    // Get the date for the current index
    if (this.values[this.activeIndex]) {
      arr.push(this.values[this.activeIndex].clone());
    }

    // Get the first date
    for (; i < len && !arr.length; i++) {
      if (this.values[i]) {
        arr.push(this.values[i].clone());
      }
    }

    // If we didn't get a date, use the min
    for (i = 0, len = this.mins.length; i < len && !arr.length; i++) {
      if (this.mins[i]) {
        arr.push(this.mins[i].clone());
      }
    }

    // If we still didn't get a date, add today's date.
    if (!arr.length) {
      arr.push(_date2.default.now());
    }

    this._datesToShow = arr;

    this._setDatesToShow();
  };

  /**
   * Set the dates to show.
   * @param {Number} change Optional The direction to change
   */


  CalendarPopover.prototype._setDatesToShow = function _setDatesToShow(change) {

    var arr = this._datesToShow;
    var visibleCount = this._currentBreakpoint === 'xs' || this._currentBreakpoint === 'sm' ? 1 : this.visibleCounts[this.activeIndex] || this.visibleCounts[0] || 1;
    var i = 0;
    var noun = this.viewRange.charAt(0).toUpperCase() + this.viewRange.slice(1);

    // If we have more dates to show than we're supposed to show, remove the excess.
    // This happens when visible count changes between renders
    if (arr.length > visibleCount) {
      arr.splice(visibleCount);
    }

    // If we are incrementing or decrementing the starting month
    if (change) {

      // Empty the rest of the dates from the array
      arr = this._datesToShow = arr.splice(0, 1);

      // Decrement
      if (change < 0) {
        for (; i > change; i--) {
          arr[0] = arr[0]['previous' + noun];
        }
      } else {
        for (; i < change; i++) {
          arr[0] = arr[0]['next' + noun];
        }
      }
    }

    // Check bounds
    this._atMin = this._checkMinDateVisible(noun, arr);
    this._atMax = this._checkMaxDateVisible(noun, arr);

    var addDate = void 0;
    var lastSelected = void 0;
    var action = void 0;
    i = 0;

    // Add additional dates
    while (arr.length < visibleCount) {

      // If at the max, prepend
      // If we're in the last input and it has a value and it's a different month than the first value, prepend
      // If at the min, append
      // If an item we're adding is before the min, discard it and append an item after the last in the arr
      // If an item we're adding is after the max, discard it and prepend an item before the first in the arr

      lastSelected = !change && this.activeIndex === this.values.length - 1 && this.values[this.values.length - 1] && this.values[0] && !this.values[this.values.length - 1]['equal' + noun](this.values, true);

      // If we're showing the max date or we have the last input selected and it has a value, add dates before.
      if (this._atMax || lastSelected) {

        addDate = arr[i]['previous' + noun];
        action = 'unshift';

        if (addDate['before' + noun](this.minVisible)) {
          addDate = arr[i]['next' + noun];
          action = 'push';
        }
      } else {

        addDate = arr[i]['next' + noun];
        action = 'push';

        if (addDate['after' + noun](this.maxVisible)) {
          addDate = arr[i]['previous' + noun];
          action = 'unshift';
        }
      }

      if (action === 'push') {
        arr.push(addDate);
        i = arr.length - 1;
      } else {
        arr.unshift(addDate);
        i = 0;
      }
    }

    // Check bounds again
    this._atMin = this._checkMinDateVisible(noun, arr);
    this._atMax = this._checkMaxDateVisible(noun, arr);

    // Update the navigation to reflect the _atMin or _atMax state
    this._updateNav();
  };

  /**
   * Check for the min value in an array of values.
   * @param {Object} min
   * @param {String} noun The type of date to check
   * @param {Array} arr
   * @return {Boolean}
   */


  CalendarPopover.prototype._checkMinDateVisible = function _checkMinDateVisible(noun, arr) {

    if (!this.minVisible) {
      return;
    }

    var min = this.minVisible;

    if (min && (arr[0]['equal' + noun](min) || arr[0]['before' + noun](min))) {
      arr[0] = min;
      return true;
    }

    return false;
  };

  /**
   * Check for the max value in an array of values.
   * @param {Object} max
   * @param {String} noun The type of date to check
   * @param {Array} arr
   * @return {Boolean}
   */


  CalendarPopover.prototype._checkMaxDateVisible = function _checkMaxDateVisible(noun, arr) {

    if (!this.maxVisible) {
      return;
    }

    var max = this.maxVisible;

    if (max && arr[arr.length - 1] && (arr[arr.length - 1]['equal' + noun](max) || arr[arr.length - 1]['after' + noun](max))) {
      arr[arr.length - 1] = max;
      return true;
    }

    return false;
  };

  /**
   * Check that the values are in bounds and, optinoally, in sequential order.
   * If checking for sequence, remove those which aren't.
   * @param {Number} setIndex The index of the value most recently set. This shouldn't be removed.
   * @return {Boolean} Did any values change?
   */


  CalendarPopover.prototype._checkValues = function _checkValues(setIndex, skipRangeCheck) {

    // Check boundaries
    var changed = this._checkMinMaxValues();

    // Sequential range items check
    if (this._isRange && !skipRangeCheck) {

      var i = this.values.length - 1;

      for (; i >= 0; i--) {
        if (this.values[i] && this.values[i - 1] && this.values[i].beforeDay(this.values[i - 1], true)) {
          if (i === setIndex) {
            this.setValue(null, i - 1, true);
          } else {
            this.setValue(null, i, true);
          }
          changed = true;
        }
      }
    }

    return changed;
  };

  /**
   * Check minimum/maximum values.
   * @return {Boolean}
   */


  CalendarPopover.prototype._checkMinMaxValues = function _checkMinMaxValues() {

    var i = 0;
    var len = this.values.length;
    var changed = false;

    for (; i < len; i++) {
      if (this.maxes && this.maxes[i] && this.values[i] && this.values[i].after(this.maxes[i], true)) {
        this.values[i] = this.maxes[i].clone();
        changed = true;
      } else if (this.mins && this.mins[i] && this.values[i] && this.values[i].before(this.mins[i], true)) {
        this.values[i] = this.mins[i].clone();
        changed = true;
      }
    }

    return changed;
  };

  /**
   * Enqueue animations to be run. (Not really animations since those happen w/ CSS. More
   * of a manager of timeouts).
   * @param {Function} cb
   * @param {Number} duration
   */


  CalendarPopover.prototype._animateContent = function _animateContent(cb, duration) {
    this._animationQueue = this._animationQueue || [];
    this._animationQueue.push({
      cb: cb,
      d: duration
    });
    this._runAnimation();
  };

  /**
   * Run the first queued animation. When complete, run the next animation.
   */


  CalendarPopover.prototype._runAnimation = function _runAnimation() {

    if (!this._animationTimer) {

      var a = this._animationQueue.shift();

      if (a) {

        this._animationTimer = setTimeout(function () {
          a.cb.call(this);
          this._animationTimer = null;
          this._runAnimation();
        }.bind(this), a.d);
      }
    }
  };

  /**
   * Update attributes on the element and its children.
   */


  CalendarPopover.prototype._updateAttributes = function _updateAttributes() {
    this.calendarEl.setAttribute('data-visible-count', this._currentBreakpoint === 'xs' ? 1 : this.visibleCounts[this.activeIndex] || this.visibleCounts[0] || 1);
    this._updateNav();
  };

  /**
   * Update the navigation to reflect the ability to move forward and backward.
   */


  CalendarPopover.prototype._updateNav = function _updateNav() {

    if (this.previousButtonEl) {
      if (this._atMin) this.previousButtonEl.setAttribute('disabled', true);else this.previousButtonEl.removeAttribute('disabled');
    }

    if (this.nextButtonEl) {
      if (this._atMax) this.nextButtonEl.setAttribute('disabled', true);else this.nextButtonEl.removeAttribute('disabled');
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  CalendarPopover.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onSelectChangeBound = this._onSelectChange.bind(this);
    this._onInputFocusBound = this._onInputFocus.bind(this);
    this._onClickBound = this._onClick.bind(this);
    this._onCalendarClickBound = this._onCalendarClick.bind(this);

    this._onCalendarMouseOverBound = this._onCalendarMouseOver.bind(this);
    this._onCalendarMouseOutBound = this._onCalendarMouseOut.bind(this);

    this._onResizeBound = this._onResize.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  CalendarPopover.prototype._addEventListeners = function _addEventListeners() {

    var i = 0;
    var len = this.els.length;

    for (; i < len; i++) {
      this.els[i].addEventListener('click', this._onClickBound);
      this.inputEls[i].addEventListener('change', this._onInputChangeBound);
      this.inputEls[i].addEventListener('focus', this._onInputFocusBound);
    }

    this.calendarEl.addEventListener('mouseover', this._onCalendarMouseOverBound);
    this.calendarEl.addEventListener('mouseout', this._onCalendarMouseOutBound);
    this.calendarEl.addEventListener('click', this._onCalendarClickBound);

    this.calendarEl.addEventListener('change', this._onSelectChangeBound);

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  CalendarPopover.prototype._removeEventListeners = function _removeEventListeners() {

    var i = 0;
    var len = this.els.length;

    for (; i < len; i++) {
      this.els[i].removeEventListener('click', this._onClickBound);
      this.inputEls[i].removeEventListener('change', this._onInputChangeBound);
      this.inputEls[i].removeEventListener('focus', this._onInputFocusBound);
    }

    this.calendarEl.removeEventListener('mouseover', this._onCalendarMouseOverBound);
    this.calendarEl.removeEventListener('mouseout', this._onCalendarMouseOutBound);
    this.calendarEl.removeEventListener('click', this._onCalendarClickBound);

    this.calendarEl.removeEventListener('change', this._onSelectChangeBound);

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);
  };

  /**
   * Focus on the next input if there is one.
   */


  CalendarPopover.prototype._focusNext = function _focusNext() {

    var index = void 0;

    // If we don't have any null values, don't do anything.
    if ((index = this.values.indexOf(null)) === -1) {
      return;
    }

    if (this.activeIndex < this.els.length - 1) {
      this.open(this.activeIndex + 1);
    } else {
      this.open(index);
    }
  };

  /**
   * Close if we're on the last input and we have values.
   */


  CalendarPopover.prototype._closeOnLast = function _closeOnLast() {
    if (this.values.indexOf(null) === -1) {
      this.close({
        delay: this.closeDelay
      });
    }
  };

  /**
   * Make the toggle icon a fill icon.
   */


  CalendarPopover.prototype._fillToggle = function _fillToggle() {

    var toggle = void 0;

    if (this.els[this.activeIndex] && (toggle = this.els[this.activeIndex].querySelector('.spark-date__calendar-toggle [class*="spark-icon"]'))) {
      (0, _addClass2.default)(toggle, 'spark-icon--fill');
    }
  };

  /**
   * Make the toggle icon a line icon.
   */


  CalendarPopover.prototype._unfillToggle = function _unfillToggle() {

    var toggle = void 0;

    if (this.els[this.activeIndex] && (toggle = this.els[this.activeIndex].querySelector('.spark-date__calendar-toggle [class*="spark-icon"]'))) {
      (0, _removeClass2.default)(toggle, 'spark-icon--fill');
    }
  };

  /**
   * Activate the element associated with the calendar.
   * @param {Number} index
   */


  CalendarPopover.prototype._activateElement = function _activateElement(index) {
    var el = this.els[index];
    if (el) (0, _addClass2.default)(el, 'active');
  };

  /**
   * Deactivate the element associated with the calendar.
   * @param {Number} index
   */


  CalendarPopover.prototype._deactivateElement = function _deactivateElement(index) {
    var el = this.els[index];
    if (el && !this.values[index] && !(0, _hasClass2.default)(el, 'focus') && !(0, _hasClass2.default)(el, 'has-partial-value')) {
      (0, _removeClass2.default)(el, 'active');
    }
  };

  /**
   * Check the size of the popover and see if we should be showing the XS treatment.
   */


  CalendarPopover.prototype._checkSize = function _checkSize() {

    var bp = (0, _breakpoint.get)(window.outerWidth);

    // Don't do anything if the breakpoint hasn't changed.
    if (this._currentBreakpoint === bp) return;

    // Store the breakpoint
    this._currentBreakpoint = bp;

    // Re-render the date range
    this._setDatesToShow();
    this.render(true);
    this.popover.update();
  };

  /**
   * Scroll the active input element into view.
   */


  CalendarPopover.prototype._scrollToInput = function _scrollToInput() {
    var el = this.els[this.activeIndex];
    if (el) (0, _scrollTo2.default)(el);
  };

  /**
   * Update the hover classes.
   * @param {Element} hoverStarts
   * @param {Element} hoverEnds
   */


  CalendarPopover.prototype._updateHoverClasses = function _updateHoverClasses(hoverStarts, hoverEnds) {

    this._hoverStarts = this._hoverStarts || [];
    this._hoverEnds = this._hoverEnds || [];

    hoverStarts = hoverStarts instanceof Array ? hoverStarts : hoverStarts ? [hoverStarts] : [];
    hoverEnds = hoverEnds instanceof Array ? hoverEnds : hoverEnds ? [hoverEnds] : [];

    var allStarts = [];
    var curStarts = [];
    var newStarts = [];
    var allEnds = [];
    var curEnds = [];
    var newEnds = [];

    hoverStarts.forEach(function (el) {

      var index = this._hoverStarts.indexOf(el);

      // Already hovered.
      if (index !== -1) {
        curStarts.push(el);
      }
      // Not already hovered. Ready to add the class.
      else if (el) {
          newStarts.push(el);
          (0, _addClass2.default)(el, 'hover-start');
        }
    }, this);

    allStarts = Array.prototype.concat.call([], curStarts, newStarts);

    this._hoverStarts.forEach(function (el) {
      if (allStarts.indexOf(el) === -1) {
        (0, _removeClass2.default)(el, 'hover-start');
      }
    }, this);

    hoverEnds.forEach(function (el) {

      var index = this._hoverEnds.indexOf(el);

      // Already hovered.
      if (index !== -1) {
        curEnds.push(el);
      }
      // Not already hovered. Ready to add the class.
      else if (el) {
          newEnds.push(el);
          (0, _addClass2.default)(el, 'hover-end');
        }
    }, this);

    allEnds = Array.prototype.concat.call([], curEnds, newEnds);

    this._hoverEnds.forEach(function (el) {
      if (allEnds.indexOf(el) === -1) {
        (0, _removeClass2.default)(el, 'hover-end');
      }
    }, this);

    this._hoverStarts = allStarts;
    this._hoverEnds = allEnds;
  };

  /**
   * When an element is clicked, if the toggle was the target, open the popover.
   * @param {Object} e
   */


  CalendarPopover.prototype._onClick = function _onClick(e) {

    if ((0, _getParent2.default)(e.target, '.spark-date__calendar-toggle', this.els)) {

      var el = (0, _getParent2.default)(e.target, '.spark-date', this.els);
      var index = this.els.indexOf(el);

      e.preventDefault();

      // Open on the next tick. Otherwise we also receive the window click close event.
      this.open(index, {
        delay: 1
      });
    }
  };

  /**
   * When the calendar is hovered, do some highlighting if we're showing a range.
   * @param {Object} e
   */


  CalendarPopover.prototype._onCalendarMouseOver = function _onCalendarMouseOver(e) {
    if (this.viewRange === 'month') this._onCalendarMouseOverMonths(e.target);
  };

  /**
   * Set hover states for days.
   * @param  {Element} target
   */


  CalendarPopover.prototype._onCalendarMouseOverMonths = function _onCalendarMouseOverMonths(target) {

    if (!this._isRange) {
      return;
    }

    var day = (0, _getParent2.default)(target, '.spark-calendar__day');

    if (!day) {
      this._updateHoverClasses();
      return;
    }

    var month = (0, _getParent2.default)(target, '.spark-calendar__month');
    var mHasClass = function (c) {
      return (0, _hasClass2.default)(month, c);
    }.bind(this);
    var newStart = [];
    var newEnd = [];
    var daySel = void 0;

    // Only do highlights if we don't already have a value for this index.
    if (!this.values[this.activeIndex]) {

      // A month with a value before it but no value of its own, hover starts
      // from the first day to the hovered day.
      if (mHasClass('value-before') && !mHasClass('after-range-end') && !mHasClass('has-value') && !mHasClass('value-after')) {

        newStart.push(month.querySelector('.spark-calendar__day:not(.spark-calendar__day--inactive):not(.spark-calendar__day--disabled)'));
        newEnd.push(day);

        // Add a hover range to a previous month.
        var prevMonth = month;
        while ((prevMonth = (0, _getSiblingBefore2.default)(prevMonth, '.spark-calendar__month')) && !(0, _hasClass2.default)(prevMonth, 'value-after') && ((0, _hasClass2.default)(prevMonth, 'has-value') || (0, _hasClass2.default)(prevMonth, 'value-before'))) {

          daySel = prevMonth.querySelectorAll('.spark-calendar__day--selected');
          daySel = daySel[daySel.length - 1];
          daySel = daySel || prevMonth.querySelector('.spark-calendar__day');

          if (daySel) {
            newStart.push(daySel);
            daySel = prevMonth.querySelectorAll('.spark-calendar__day');
            daySel = daySel[daySel.length - 1];
            newEnd.push(daySel);
          }
        }
      }
      // A month with a value, highlight either from the hovered day to
      // the selection or from the selection to the day.
      else if (mHasClass('has-value') && !mHasClass('value-before') && !mHasClass('value-after') && ((newStart = (0, _getSiblingBefore2.default)(day, '.spark-calendar__day--selected')) || (newEnd = (0, _getSiblingAfter2.default)(day, '.spark-calendar__day--selected')))) {

          if (newStart) {
            newStart = [newStart];
            newEnd = [day];
          } else {
            newEnd = [newEnd];
            newStart = [day];
          }

          if ((0, _hasClass2.default)(newEnd[0], 'spark-calendar__range-start') || (0, _hasClass2.default)(newStart[0], 'spark-calendar__range-end')) {
            newStart = [];
            newEnd = [];
          }
        }
        // A month with a middle range should highlight before
        else if (mHasClass('has-value') && mHasClass('range-middle') && mHasClass('value-before')) {
            daySel = (0, _getSiblingBefore2.default)(day, '.spark-calendar__day--selected');
            if (daySel) {
              newStart = [daySel];
              newEnd = [day];
            }
          }
    }

    this._updateHoverClasses(newStart, newEnd);
  };

  /**
   * When the calendar is hovered, undo some highlighting if we're showing a range.
   * @param {Object} e
   */


  CalendarPopover.prototype._onCalendarMouseOut = function _onCalendarMouseOut(e) {
    if (this.viewRange === 'month') this._onCalendarMouseOutMonths(e.target);
  };

  /**
   * Clear hover states for days.
   * @param  {Element} target
   */


  CalendarPopover.prototype._onCalendarMouseOutMonths = function _onCalendarMouseOutMonths(target) {

    var day = (0, _getParent2.default)(target, '.spark-calendar__day');
    var days = (0, _getParent2.default)(target, '.spark-calendar__days');
    var month = (0, _getParent2.default)(target, '.spark-calendar__month');

    (0, _removeClass2.default)(day, 'hover');
    (0, _removeClass2.default)(days, 'hover');
    (0, _removeClass2.default)(month, 'hover');
    (0, _removeClass2.default)(this.calendarEl, 'hover');
  };

  /**
   * When the calendar is clicked, handle navigation clicks and date selections.
   * @param {Object} e
   */


  CalendarPopover.prototype._onCalendarClick = function _onCalendarClick(e) {

    var nav = (0, _getParent2.default)(e.target, '.spark-calendar__nav', this.calendarEl);
    var day = void 0;
    var dir = void 0;

    // Navigation clicks
    if (nav) {

      // Previous
      if ((0, _getParent2.default)(e.target, '.spark-calendar__previous', nav)) {
        this.previous();
      }
      // Next
      else if ((0, _getParent2.default)(e.target, '.spark-calendar__next', nav)) {
          this.next();
        }
    }
    // Day click
    else if (day = (0, _getParent2.default)(e.target, '.spark-calendar__day')) {

        e.preventDefault();
        e.stopPropagation();

        // Disabled day moves can move us to the next month
        if ((0, _hasClass2.default)(day, 'spark-calendar__day--disabled')) {
          dir = day.getAttribute('data-direction');
          if (dir === 'next') this.next();else if (dir === 'previous') this.previous();
        }
        // Enabled day sets the value
        else {
            this.setValue(day.getAttribute('data-date'), this.activeIndex);
            if (this.autoAdvance) this._focusNext();
            if (this.autoClose) this._closeOnLast();
          }
      }
  };

  /**
   * When the popover opens, set the toggle state.
   */


  CalendarPopover.prototype._onPopoverOpen = function _onPopoverOpen() {
    this._fillToggle();
    this._checkSize();
    if (this._currentBreakpoint === 'xs') this._scrollToInput();
  };

  /**
   * When the popover closes, reset the active state.
   */


  CalendarPopover.prototype._onPopoverClose = function _onPopoverClose() {
    this._unfillToggle();
    this._updateHoverClasses();
    this._deactivateElement(this.activeIndex);
    this.activeIndex = null;
  };

  /**
   * When the input that corresponds to this instance changes. Allows us to listen
   * and respond to changes made by other components (Calendar Popover, for example).
   * @param {Object} e
   */


  CalendarPopover.prototype._onInputChange = function _onInputChange(e) {

    var index = this.inputEls.indexOf(e.target);

    if (this._inputsChanging && this._inputsChanging.indexOf(index) !== -1) return;

    this.setValue(e.target.value, index);
  };

  /**
   * When an input receives focus, if we are supposed to automatically show
   * on focus do so.
   * @param {Object} e
   */


  CalendarPopover.prototype._onInputFocus = function _onInputFocus(e) {
    if (!this.showOnFocus) return;
    var index = this.inputEls.indexOf(e.target);
    if (index !== -1) this.open(index);
  };

  /**
   * When one of the calendar quick jump select inputs changes.
   * We have to set the value of the select input back to its original
   * value or else it will be out of sync when the currently active
   * month is shown again.
   * @param {Object} e
   */


  CalendarPopover.prototype._onSelectChange = function _onSelectChange(e) {

    var name = e.target.name;
    var val = e.target.value;
    var curVal = this._datesToShow[this.activeIndex][name];
    var obj = {};

    obj[name] = val;
    this.showDate(obj);
    e.target.value = curVal;
  };

  /**
   * When the window resizes, determine if we're at the XS breakpoint so we
   * can do some mobile-esque stuff!
   * @param {Object} e
   */


  CalendarPopover.prototype._onResize = function _onResize() {
    if (this.activeIndex !== null) this._checkSize();
  };

  return CalendarPopover;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


CalendarPopover.prototype._whitelistedParams = ['els', 'visibleCounts', 'autoAdvance', 'autoClose', 'closeDelay', 'mins', 'maxes', 'values', 'daysDisabled', 'daysInfo', 'quickJump', 'quickJumpRange', 'calendarEl', 'viewRange', 'animate', 'animationDuration', 'showOnFocus', 'onChange'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
CalendarPopover.prototype.defaults = {
  els: null,
  inputEls: null,
  calendarEl: null,
  calendarContentEl: null,
  calendarOverflowEl: null,
  visibleCounts: null,
  activeIndex: null,
  mins: null,
  minVisible: null,
  maxes: null,
  maxVisible: null,
  values: null,
  daysDisabled: null,
  daysInfo: null,
  viewRange: null,
  autoAdvance: null,
  autoClose: null,
  quickJump: null,
  closeDelay: null,
  nextButtonEl: null,
  previousButtonEl: null,
  animate: null,
  animationDuration: null,
  showOnFocus: null,
  onChange: null,
  _isDisabled: false,
  _isRange: null,
  _hoverStarts: null,
  _hoverEnds: null,
  _currentBreakpoint: null,
  _animationQueue: null,
  _currentContent: null,
  _datesToShow: null,
  _monthsShowing: null,
  _atMin: false,
  _atMax: false,
  _inputsChanging: false,
  _openCloseTimer: null,
  _renderCache: null,
  _onClickBound: null,
  _onCalendarMouseOverBound: null,
  _onCalendarMouseOutBound: null,
  _onCalendarClickBound: null,
  _onSelectChangeBound: null,
  _onInputChangeBound: null,
  _onInputFocusBound: null,
  _onResizeBound: null
};

exports.default = CalendarPopover;
module.exports = exports['default'];


},{"../helpers/animation/scroll-to":31,"../helpers/date/date":34,"../helpers/date/parse-format":35,"../helpers/dom/add-class":36,"../helpers/dom/breakpoint":37,"../helpers/dom/has-class":38,"../helpers/dom/parse-attribute":42,"../helpers/dom/remove-class":43,"../helpers/dom/trigger-event":45,"../helpers/form/build-select":46,"../helpers/manipulation/append-children":49,"../helpers/traversal/get-parent":58,"../helpers/traversal/get-sibling-after":60,"../helpers/traversal/get-sibling-before":61,"../helpers/util/range":68,"./base":1,"./popover":15}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _transform = require('../helpers/css/transform');

var _transform2 = _interopRequireDefault(_transform);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Carousel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Create a Carousel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Carousel(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/carousel.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Carousel = function (_BaseComponent) {
  _inherits(Carousel, _BaseComponent);

  /**
   * Carousel constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Carousel(el, params) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    params = params || {};

    if (!el) {
      return _possibleConstructorReturn(_this);
    }

    _this._init(el);
    return _this;
  }

  /**
   * Carousel Item Contructor, exposes access to functions setTransform, setSelected, and currentPosition
   * @param {Element} el Node to initalize as carouselItem
   * @param {Object} parent reference to the parent carousel
   * @param {Element} dot Node to use as dot element
   * @param {Number} order original order in the markup
   */


  Carousel.prototype._carouselItem = function _carouselItem(el, parent, dot, order) {
    var a = {};
    a.el = el;
    a.parent = parent;
    a.dot = dot;
    a.order = order;
    a.addTransform = function (x) {
      a.setTransform(a.transform.x + x);
    };
    a.setTransform = function (x) {
      x = x ? x : 0;
      a.transform = {
        'x': x
      };
      a.el.setAttribute('style', (0, _transform2.default)('translate3d', a.transform.x + 'px, 0px, 0px'));
    };
    a.setSelected = function (b) {
      if (a.setSelected.selected === b && typeof a.setSelected.selected !== 'undefined') {
        return;
      }
      if (b) {
        (0, _addClass2.default)(a.el, 'selected');
        (0, _addClass2.default)(a.dot, 'selected');
        a.setSelected.selected = true;
      } else {
        (0, _removeClass2.default)(a.el, 'selected');
        (0, _removeClass2.default)(a.dot, 'selected');
        a.setSelected.selected = false;
      }
    };
    a.currentPosition = function () {
      return parent.transform.x + a.transform.x + a.dims.left + a.width / 2 - parent.dims.left;
    };
    a.setTransform();
    a.dims = el.getBoundingClientRect();
    a.width = a.dims.width;
    a.el.sparkcarouselitem = a;
    a.dot.sparkcarouselitemdot = a;
    return a;
  };

  /**
   * Scans element and sets up or resets the carousel based on configuration
   * @param {Element} el Node to initalize as the carousel
   */


  Carousel.prototype._init = function _init(el) {
    //cache elements and controls
    this.el = el;
    this.el.sparkcarousel = this;
    this.backe = this.el.querySelector('.spark-carousel__back');
    this.forwarde = this.el.querySelector('.spark-carousel__forward');
    this.outerContainer = this.el.querySelector('.spark-carousel__outer-container');
    this.containerMask = this.el.querySelector('.spark-carousel__container-mask');
    this.container = this.el.querySelector('.spark-carousel__container');
    this.dots = this.el.querySelector('.spark-carousel__dots');
    this.pauseEl = this.el.querySelector('.spark-carousel__pause');
    //get the options from the element
    this.opts = {};
    this.opts.wrapItems = this.el.attributes['data-spark-carousel-wrap-items'] ? true : false;
    this.opts.startingVelocity = this.el.attributes['data-spark-carousel-scroll-velocity'] ? this.el.attributes['data-spark-carousel-scroll-velocity'].value : 10;
    this.opts.smoothScroll = this.el.attributes['data-spark-carousel-smooth-scroll'] ? true : false;
    this.opts.smoothScrollCenterItems = this.el.attributes['data-spark-carousel-smooth-scroll-center'] ? true : false;
    this.opts.panelScroll = this.el.attributes['data-spark-carousel-panel'] ? true : false;
    this.opts.edgeScroll = this.opts.panelScroll || this.el.attributes['data-spark-carousel-edge'] ? true : false;
    this.opts.autoAdvance = this.el.attributes['data-spark-carousel-auto-advance'] ? this.el.attributes['data-spark-carousel-auto-advance'].value : false;
    //setup autoAdvance
    if (this.opts.autoAdvance && !this.autoAdvance && !this.pause) {
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    }
    //conditionally bind pause handlers.
    //needs to be done here so that resetting the carousel will work correctly
    if (this.opts.autoAdvance && !this.pauseH) {
      this.pauseH = this._pause.bind(this);
      this.pauseEl.addEventListener('click', this.pauseH);
    }
    //collect items and cache sizing
    var a = this.el.querySelectorAll('.spark-carousel__item');
    this.items = [];
    this.totalItemWidth = 0;
    this.dims = this.containerMask.getBoundingClientRect();
    this.width = this.dims.width;
    this.height = this.dims.height;
    var dots = document.createDocumentFragment();
    var b;
    //create our carouselItems
    for (var i = 0; i < a.length; i++) {
      b = document.createElement('div');
      dots.appendChild(b);
      this.items.push(new this._carouselItem(a[i], this, b, i));
      this.totalItemWidth += this.items[i].width;
    }
    //if we're resetting we need to empty out the exisiting elements first
    while (this.dots.firstChild) {
      this.dots.removeChild(this.dots.firstChild);
    }
    this.dots.appendChild(dots);
    //this is to test if we're dealing with 2011 flexbox (IE10) and need to do an adjustment
    //this is because ms-flex-pack: center doesn't work like 2012 flexbox center-pack
    if (typeof this.container.style.msFlexAlign !== 'undefined') {
      this._transformItems(-(this.totalItemWidth - this.width) / 2);
    }
    //setup inital transform
    this._setTransform();
    //need to bind this event handler here as we are always going to need to be listening
    //for this event, in order to react to container visibility changing
    this._handleVisibleChildren = this._handleVisibleChildrenH.bind(this);
    document.addEventListener('spark.visible-children', this._handleVisibleChildren, true);
    if (!this._rafHandler) {
      this._rafHandler = this._rafHandlerH.bind(this);
    }
    //need to also listen to resize events, even if we don't have items overflowing
    if (!this.resizeH) {
      this.resizeH = (0, _debounce2.default)(this._resize.bind(this), 100);
      window.addEventListener('resize', this.resizeH);
    }
    //if we haven't already init'd event listerers, and we have items overflowing
    if (this.totalItemWidth > this.width) {
      if (!this.touchstartH) {
        (0, _removeClass2.default)(this.el, 'noscroll');
        this._setupListeners();
        //center the first item
        this._addTransform(-this.items[0].currentPosition() + this.width / 2);
      }
    }
    //if we don't have overflowing items, then disable scrolling and remove listeners
    else {
        (0, _addClass2.default)(this.el, 'noscroll');
        this._removeListeners();
      }
    //set the new selected item
    this._updateSelected();
    //finally, display the element
    (0, _addClass2.default)(this.el, 'ready');
  };

  /**
   * Tears down the component, removes listeners, and conditionally delete the DOM element
   * @param {Boolean} leaveElement Falsey value will remove the DOM element as well as the component instance
   */


  Carousel.prototype.remove = function remove(leaveElement) {
    window.removeEventListener('resize', this.resizeH);
    delete this.resizeH;
    document.removeEventListener('spark.visible-children', this._handleVisibleChildren, true);
    delete this._handleVisibleChildren;
    _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Pause/unpause the autoAdvance feature
   */


  Carousel.prototype._pause = function _pause() {
    if (this.pause) {
      delete this.moves;
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    } else {
      this._rafCancel();
      if (!this.opts.smoothScroll || this.opts.smoothScrollCenterItems) {
        this._scrollTo(this._selectedItem());
      }
      window.clearTimeout(this.autoAdvance);
      delete this.autoAdvance;
    }
    this._setPause(!this.pause);
  };

  /**
   * toggles the pause class on the element
   * @param {Boolean} b Truthy value will give the element the pause class
   */


  Carousel.prototype._setPause = function _setPause(b) {
    if (typeof b === 'undefined') {
      this.pause = typeof this.pause === 'undefined' ? false : this.pause;
      return this.pause;
    } else {
      if (b) {
        (0, _addClass2.default)(this.el, 'pause');
      } else {
        (0, _removeClass2.default)(this.el, 'pause');
      }
      this.pause = b;
      return this.pause;
    }
  };

  /**
   * function called by window.setTimeout, will check first to see if element is in use before triggering a slide advance
   */


  Carousel.prototype._autoAdvance = function _autoAdvance() {
    if (!this.moves && !this._laststart && !this.paused) {
      this._rafCancel();
      var a = this.items.indexOf(this._selectedItem());
      this._scrollToItem = true;
      this._scrollTo(this.items[a === this.items.length - 1 ? 0 : a + 1]);
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    }
  };

  /**
   * initalize and bind even listeners
   */


  Carousel.prototype._setupListeners = function _setupListeners() {
    this.touchstartH = this._touchstart.bind(this);
    this.container.addEventListener('touchstart', this.touchstartH);
    this.touchmoveH = this._touchmove.bind(this);
    window.addEventListener('touchmove', this.touchmoveH);
    this.touchendH = this._touchend.bind(this);
    window.addEventListener('touchend', this.touchendH);
    this.mousedownH = this._mousedown.bind(this);
    this.container.addEventListener('mousedown', this.mousedownH);
    this.mousemoveH = this._mousemove.bind(this);
    window.addEventListener('mousemove', this.mousemoveH);
    this.mouseupH = this._mouseup.bind(this);
    window.addEventListener('mouseup', this.mouseupH);
    this.forwardH = this._forward.bind(this);
    this.forwarde.addEventListener('click', this.forwardH);
    this.backH = this._back.bind(this);
    this.backe.addEventListener('click', this.backH);
    this.clickH = this._click.bind(this);
    this.el.addEventListener('click', this.clickH);
    this._focusHandler = this._scrollToClicked.bind(this);
    this.container.addEventListener('focus', this._focusHandler, true);
  };

  /**
   * Removes non-essential event listeners, called when tearing down the component, or our content
   * does not exceed the width of our element
   */


  Carousel.prototype._removeListeners = function _removeListeners() {
    this.el.removeEventListener('touchstart', this.touchstartH);
    delete this.touchstartH;
    window.removeEventListener('touchmove', this.touchmoveH);
    delete this.touchmoveH;
    window.removeEventListener('touchend', this.touchendH);
    delete this.touchendH;
    this.el.removeEventListener('mousedown', this.mousedownH);
    delete this.mousedownH;
    window.removeEventListener('mousemove', this.mousemoveH);
    delete this.mousemoveH;
    window.removeEventListener('mouseup', this.mouseupH);
    delete this.mouseupH;
    this.forwarde.removeEventListener('click', this.forwardH);
    delete this.forwardH;
    this.backe.removeEventListener('click', this.backH);
    delete this.backH;
    this.el.removeEventListener('click', this.clickH);
    delete this.clickH;
    this.container.removeEventListener('focus', this._focusHandler, true);
    delete this._focusHandler;
    if (this.pauseEl) {
      this.pauseEl.removeEventListener('click', this.pauseH);
      delete this.pauseH;
    }
  };

  /**
   * Event handler for the spark.visible-children event, just call the change function to handle any
   * visibility or sizing changes
   * @param {Event} e The spark.visible-children event
   */


  Carousel.prototype._handleVisibleChildrenH = function _handleVisibleChildrenH(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this.change();
      }.bind(this), 0);
    }
  };

  /**
   * Forward button click handler triggers a scrollTo to the "next" element
   * @param {Event} e The click event
   */


  Carousel.prototype._forward = function _forward(e) {
    var s = this.items.indexOf(this._selectedItem());
    s++;
    if (s > this.items.length - 1) {
      if (this.opts.wrapItems) {
        s = 0;
      } else {
        s--;
      }
    }
    delete this.moves;
    var a = this._startingVelocity;
    a = a < -this.opts.startingVelocity ? a : -this.opts.startingVelocity;
    this._rafCancel();
    this._scrollToItem = true;
    this._scrollTo(this.items[s], a);
    if (e) {
      e.preventDefault();
    }
  };

  /**
   * Back button click handler triggers a scrollTo to the "previous" element
   * @param {Event} e The click event
   */


  Carousel.prototype._back = function _back(e) {
    var s = this.items.indexOf(this._selectedItem());
    s--;
    if (s < 0) {
      if (this.opts.wrapItems) {
        s = this.items.length - 1;
      } else {
        s++;
      }
    }
    delete this.moves;
    var a = this._startingVelocity;
    a = a > this.opts.startingVelocity ? a : this.opts.startingVelocity;
    this._rafCancel();
    this._scrollToItem = true;
    this._scrollTo(this.items[s], a);
    if (e) {
      e.preventDefault();
    }
  };

  /**
   * Move start handler, handles both touchstart and mousedown events
   * @param {Object} e The start event
   */


  Carousel.prototype._movestart = function _movestart(e) {
    this._rafCancel();
    this.moves = [];
    this.moves.push(e);
  };

  /**
   * Move handler, handles internal move event objects
   * @param {Object} e The move event
   */


  Carousel.prototype._move = function _move(e) {
    if (this.moves && this.moves.length > 1) {
      this._addTransform(e.pageX - this.moves[this.moves.length - 1].pageX);
      this.moves.push(e);
      e.preventDefault = true;
    } else {
      if (this.moves && this.moves[0]) {
        if (Math.abs(this.moves[0].pageX - e.pageX) > Math.abs(this.moves[0].pageY - e.pageY) && Math.abs(this.moves[0].pageX - e.pageX) > 5 && e.cancelable) {
          this._addTransform(e.pageX - this.moves[0].pageX);
          this.moves.push(e);
          e.preventDefault = true;
        } else {
          if (Math.abs(this.moves[0].pageX - e.pageX) > 5) {
            this.moves[0] = e;
          }
        }
      }
      if (e.type === 'touchend' || e.type === 'mouseup') {
        delete this.moves;
      }
    }
  };

  /**
   * Move end handler, handles both touchend and mouseup events
   * @param {Object} e The moveend event
   */


  Carousel.prototype._moveend = function _moveend(e) {
    this._move(e);
    if (!this.opts.smoothScroll) {
      this._settle(this.moves);
    } else {
      this._interiaScroll(this.moves);
    }
    return e;
  };

  /**
   * Resize event handler, calls change to handle any element dimension changes
   */


  Carousel.prototype._resize = function _resize() {
    this.change();
  };

  /**
   * Calling the change function will handle updating the element to take into account
   * any styling, sizing, or visibility changes, and the addition or removal of any carouselItems
   */


  Carousel.prototype.change = function change() {
    var dims = this.el.getBoundingClientRect();
    if (dims.width !== this.width || dims.height !== this.height) {
      if (this.autoAdvance) {
        window.clearTimeout(this.autoAdvance);
        delete this.autoAdvance;
      }
      this._rafCancel();
      var c = this._selectedItem();
      this._setTransform(0);
      this._setTransformItems(0);
      this._init(this.el);
      if (this.items.indexOf(c.el.sparkcarouselitem) > -1 && this.totalItemWidth > this.width) {
        if (this.opts.wrapItems) {
          this._addTransform(-this.totalItemWidth + (-c.el.sparkcarouselitem.currentPosition() + this.width / 2));
        } else {
          this._addTransform(-c.el.sparkcarouselitem.currentPosition() + this.width / 2);
        }
      }
    }
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Carousel.prototype.update = function update(el) {

    el = el || this.el;

    this._removeListeners();
    window.removeEventListener('resize', this.resizeH);
    delete this.resizeH;
    document.removeEventListener('spark.visible-children', this._handleVisibleChildren, true);
    delete this._handleVisibleChildren;
    this._init(el);

    this.change();

    return this;
  };

  /**
   * Touchstart event handler, passes necessary data points to the movestart function
   * @param {Object} e The touchstart event
   */


  Carousel.prototype._touchstart = function _touchstart(e) {
    var a = {
      'type': e.type,
      'pageX': e.touches[0].pageX,
      'pageY': e.touches[0].pageY,
      'timeStamp': e.timeStamp
    };
    this._movestart(a);
  };

  /**
   * Touchmove event handler, passes necessary data points to the move function
   * @param {Object} e The touchmove event
   */


  Carousel.prototype._touchmove = function _touchmove(e) {
    var a = {
      'type': e.type,
      'pageX': e.touches[0].pageX,
      'pageY': e.touches[0].pageY,
      'timeStamp': e.timeStamp,
      'cancelable': e.cancelable
    };
    this._move(a);
    if (a.preventDefault) {
      e.preventDefault();
    }
  };

  /**
   * Touchend event handler, passes necessary data points to the moveend function
   * @param {Object} e The touchend event
   */


  Carousel.prototype._touchend = function _touchend(e) {
    if (this.moves && this.moves.length > 2 && e.cancelable) {
      var a = {
        'type': e.type,
        'pageX': this.moves[this.moves.length - 1].pageX,
        'pageY': this.moves[this.moves.length - 1].pageY,
        'timeStamp': e.timeStamp
      };
      this._moveend(a);
    } else {
      delete this.moves;
    }
  };

  /**
   * Mousedown event handler, passes necessary data points to the movestart function
   * @param {Object} e The mousedown event
   */


  Carousel.prototype._mousedown = function _mousedown(e) {
    if (e.button !== 0) {
      return e;
    }
    this.isMouseDown = true;
    var a = {
      'type': e.type,
      'pageX': e.pageX,
      'pageY': e.pageY,
      'timeStamp': e.timeStamp
    };
    this._movestart(a);
    e.preventDefault();
  };

  /**
   * Mousemove event handler, passes necessary data points to the move function
   * @param {Object} e The mousemove event
   */


  Carousel.prototype._mousemove = function _mousemove(e) {
    if (this.isMouseDown) {
      var a = {
        'type': e.type,
        'pageX': e.clientX,
        'pageY': e.clientY,
        'timeStamp': e.timeStamp,
        //this was changed to correct an issue in safari - it doesn't report cancelable correctly
        'cancelable': true
      };
      this._move(a);
      if (a.preventDefault) {
        e.preventDefault();
      }
    }
  };

  /**
   * Mouseup event handler, passes necessary data points to the moveend function
   * @param {Object} e The mouseup event
   */


  Carousel.prototype._mouseup = function _mouseup(e) {
    if (this.moves && this.moves.length > 2) {
      var a = {
        'type': e.type,
        'pageX': e.pageX,
        'pageY': e.pageY,
        'timeStamp': e.timeStamp
      };
      this._moveend(a);
      this.mouseUpHandled = true;
    } else {
      delete this.moves;
      this._scrollToClicked(e);
    }
    this.isMouseDown = false;
  };

  /**
   * Click event handler
   * @param {Object} e The click event
   */


  Carousel.prototype._click = function _click(e) {
    //if we are already tracking moves, then this will be handled by the mouseend event handler and we should prevent the default action
    if (this.moves) {
      e.preventDefault();
    }
    //if it has already been handled by mouseup handler, prevent the action
    if (this.mouseUpHandled) {
      e.preventDefault();
    }
    //reset our handled state
    delete this.mouseUpHandled;
    //checking both this.moves and this.mouseUpHandled ensures we capture events correctly in all browsers, where the order of the mouseup/click events can vary
  };

  /**
   * Calculate the user's recent cursor/finger velocity
   * @param {Array} moves The array of cursor positions
   */


  Carousel.prototype._velocity = function _velocity(moves) {
    var avg = 0;
    var m = Math.min(6, moves.length - 1);
    for (var i = 1; i < m; i++) {
      if (moves[moves.length - i].timeStamp === moves[moves.length - i - 1].timeStamp) {
        avg += avg / i;
      } else {
        avg += 10 * (moves[moves.length - i].pageX - moves[moves.length - i - 1].pageX) / (moves[moves.length - i].timeStamp - moves[moves.length - i - 1].timeStamp) / m;
      }
    }
    return avg;
  };

  /**
   * Handles click events on items and dots, scrolling to the clicked item
   * @param {Event} e The click event
   */


  Carousel.prototype._scrollToClicked = function _scrollToClicked(e) {
    var tar = e.target;
    if (this.el.contains(tar)) {
      while (!tar.sparkcarousel) {
        if (tar.sparkcarouselitem) {
          this.containerMask.scrollLeft = 0;
          delete this.moves;
          this._rafCancel();
          this._scrollTo(tar.sparkcarouselitem);
          e.preventDefault();
          break;
        }
        if (tar.sparkcarouselitemdot) {
          this.containerMask.scrollLeft = 0;
          delete this.moves;
          this._rafCancel();
          var v = tar.sparkcarouselitemdot.order < this._selectedItem().order ? this.opts.startingVelocity : -this.opts.startingVelocity;
          this._scrollTo(tar.sparkcarouselitemdot, v);
          e.preventDefault();
          break;
        }
        tar = tar.parentNode;
      }
    }
  };

  /**
   * Scroll to the carouselItem, with specified startingVelocity, auto determines default velocity if not specified
   * @param {Object} item The carouselItem to scroll to
   * @param {Number} startingVelocity The startingVelocity of the scroll animation
   */


  Carousel.prototype._scrollTo = function _scrollTo(item, startingVelocity) {
    var offset = this.width / 2;
    var currentPosition = item.currentPosition();
    if (!startingVelocity) {
      startingVelocity = offset - item.currentPosition() > 0 ? this.opts.startingVelocity : -this.opts.startingVelocity;
    }
    if (this.opts.wrapItems) {
      if (startingVelocity > 0) {
        //left
        if (currentPosition > offset) {
          this._totalDistance = offset + this.totalItemWidth - currentPosition;
        } else {
          this._totalDistance = offset - currentPosition;
        }
      } else {
        //right
        if (currentPosition < offset) {
          this._totalDistance = -(this.totalItemWidth + currentPosition - offset);
        } else {
          this._totalDistance = offset - currentPosition;
        }
      }
    } else {
      this._totalDistance = offset - currentPosition;
    }
    this._startingVelocity = startingVelocity;
    delete this.moves;
    this._scrollToItem = true;
    this._raf = window.requestAnimationFrame(this._rafHandler);
  };

  /**
   * This is the animator function, it examines the options set on the carousel object
   * and selectively adds transform and requests addtional animation frames if necesary
   * @param {Number} t The timestamp for the current animation frame
   */


  Carousel.prototype._rafHandlerH = function _rafHandlerH(t) {
    if (this.opts.autoAdvance && this.autoAdvance) {
      window.clearTimeout(this.autoAdvance);
      delete this.autoAdvance;
    }
    var frames;
    if (this.moves || !this._startingVelocity) {
      this._rafCancel();
      return;
    }
    if (!this._laststart) {
      this._laststart = t;
    }
    if (!this._remainingDistance) {
      this._remainingDistance = this._totalDistance;
    }
    if (!this._lastframe) {
      this._lastframe = t;
      frames = 1;
    } else {
      frames = (t - this._lastframe) / (1 / 60 * 1000);
    }
    var d = this._startingVelocity * frames;
    if (this.opts.smoothScroll && !this._scrollToItem) {
      this._addTransform(d);
      this._startingVelocity *= Math.pow(0.97, frames);
      if (this.opts.smoothScrollCenterItems && Math.abs(this._startingVelocity) < 1) {
        this._scrollTo(this._selectedItem());
      }
      if (Math.abs(this._startingVelocity) < 0.5) {
        if (this._startingVelocity > 0 && this.transform.x > this.totalItemWidth / 2 - this.items[0].width / 2 || this._startingVelocity < 0 && this.transform.x < -(this.totalItemWidth / 2 - this.items[this.items.length - 1].width / 2)) {
          this._scrollToItem = true;
          this._scrollTo(this._selectedItem());
        } else {
          this._rafCancel();
        }
      } else {
        this._raf = window.requestAnimationFrame(this._rafHandler);
      }
    } else {
      if (this._startingVelocity > 0) {
        if (d < this._remainingDistance) {
          this._addTransform(d);
          this._remainingDistance -= d;
          if (this._remainingDistance > this._totalDistance / 2) {
            this._startingVelocity *= Math.pow(1.15, frames);
          } else {
            this._startingVelocity *= Math.pow(0.9, frames);
            this._startingVelocity = this._startingVelocity > 2 ? this._startingVelocity : 2;
          }
          this._raf = window.requestAnimationFrame(this._rafHandler);
        } else {
          this._addTransform(this._remainingDistance);
          this._rafCancel();
        }
      } else {
        if (d > this._remainingDistance) {
          this._addTransform(d);
          this._remainingDistance -= d;
          if (this._remainingDistance < this._totalDistance / 2) {
            this._startingVelocity *= Math.pow(1.15, frames);
          } else {
            this._startingVelocity *= Math.pow(0.9, frames);
            this._startingVelocity = this._startingVelocity < -2 ? this._startingVelocity : -2;
          }
          this._raf = window.requestAnimationFrame(this._rafHandler);
        } else {
          this._addTransform(this._remainingDistance);
          this._rafCancel();
        }
      }
    }
    this._lastframe = t;
  };

  /**
   * This is the animator clearing function
   * it clears values used during animation, and selectively enables autoAdvance
   */


  Carousel.prototype._rafCancel = function _rafCancel() {
    if (this.opts.autoAdvance && !this.autoAdvance && !this.pause) {
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    }
    window.cancelAnimationFrame(this._raf);
    delete this._scrollToItem;
    delete this._laststart;
    delete this._startingVelocity;
    delete this._remainingDistance;
    delete this._totalDistance;
    delete this._lastframe;
  };

  /**
   * This computes values necessary to start an animation frame when the carousel is
   * configured to use smoothScroll
   * @param {Array} moves The captured move events
   */


  Carousel.prototype._interiaScroll = function _interiaScroll(moves) {
    if (moves[moves.length - 1].timeStamp - moves[moves.length - 2].timeStamp > 100 || moves.length < 3) {
      if (this.opts.smoothScrollCenterItems) {
        return this._scrollTo(this._selectedItem());
      }
      return;
    }
    this._startingVelocity = this._velocity(moves);
    delete this.moves;
    this._raf = window.requestAnimationFrame(this._rafHandler);
  };

  /**
   * This determines which carousel item should be focused based on the previous moves
   * made by the user
   * @param {Array} moves The captured move events
   */


  Carousel.prototype._settle = function _settle(moves) {
    if (moves && moves.length > 3) {
      if (moves[moves.length - 1].timeStamp - moves[moves.length - 2].timeStamp > 80) {
        return this._scrollTo(this._selectedItem());
      }
      var v1 = 10 * (moves[moves.length - 3].pageX - moves[moves.length - 4].pageX) / (moves[moves.length - 3].timeStamp - moves[moves.length - 4].timeStamp);
      var v2 = 10 * (moves[moves.length - 2].pageX - moves[moves.length - 3].pageX) / (moves[moves.length - 2].timeStamp - moves[moves.length - 3].timeStamp);
      if (Math.abs(v1) < Math.abs(v2) || Math.abs(v2) > 0.5 && Math.abs(v2) > 0.5) {
        //user is probably trying to go to next or prev item
        var s = this.items.indexOf(this._selectedItem());
        if (v2 > 0) {
          //prev
          if (s > 0) {
            this._scrollTo(this.items[s - 1], v2);
          } else {
            if (this.opts.wrapItems) {
              this._scrollTo(this.items[this.items.length - 1], v2);
            } else {
              this._scrollTo(this.items[0]);
            }
          }
        } else {
          //next
          if (s < this.items.length - 1) {
            this._scrollTo(this.items[s + 1], v2);
          } else {
            if (this.opts.wrapItems) {
              this._scrollTo(this.items[0], v2);
            } else {
              this._scrollTo(this.items[this.items.length - 1]);
            }
          }
        }
      } else {
        if (this._selectedItem().currentPosition() > this.width / 2) {
          this._scrollTo(this._selectedItem(), -this.opts.startingVelocity);
        } else {
          this._scrollTo(this._selectedItem(), this.opts.startingVelocity);
        }
      }
    }
  };

  /**
   * Transforms the position of all carouselItems
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._transformItems = function _transformItems(x) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].addTransform(x);
    }
  };

  /**
   * Sets the transform position of all carouselItems
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._setTransformItems = function _setTransformItems(x) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].setTransform(x);
    }
  };

  /**
   * Adds transform to the container element, does checking for bounds conditions and
   * wraps items if necessary and configured
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._addTransform = function _addTransform(x) {
    var a;
    if ((this.opts.smoothScrollCenterItems || !this.opts.smoothScroll) && !this.opts.wrapItems && !this.opts.edgeScroll) {
      var l = this.items.indexOf(this.selectedItem);
      if (l === this.items.length - 1) {
        this._leftbound(true);
      } else {
        this._leftbound(false);
      }
      if (l === 0) {
        this._rightbound(true);
      } else {
        this._rightbound(false);
      }
    } else {
      this._leftbound(false);
      this._rightbound(false);
    }
    if (this.transform.x + x < 0 && x < 0) {
      if (this.opts.wrapItems) {
        //wrap items until we have covered the visible area
        while (this.transform.x + x < -(this.totalItemWidth - this.width) / 2 && (this.totalItemWidth < this.width ? this.transform.x + x < -this.totalItemWidth / 2 : true)) {
          a = this.items.shift();
          this.items.push(a);
          a.addTransform(this.totalItemWidth);
          this._transformItems(-a.width);
          x += a.width;
        }
      } else {
        //there is a 1 pixel adjustment to account for some math rounding
        if (this.opts.edgeScroll && x < 0 && this.transform.x + x - 1 <= -(this.totalItemWidth - this.width) / 2) {
          this._leftbound(true);
          return this._setTransform(-(this.totalItemWidth - this.width) / 2);
        }
        //progressively reduce scrolling when no more items to the right
        if (x < 0 && this.transform.x + x < -(this.totalItemWidth / 2 - this.items[this.items.length - 1].width / 2)) {
          x = x * ((this.totalItemWidth / 2 + this.items[this.items.length - 1].width / 2 + (this.transform.x + x)) / this.items[this.items.length - 1].width);
          x = x > 0 ? 0 : x;
        }
      }
      return this._setTransform(this.transform.x + x);
    } else {
      if (this.transform.x + x > 0 && x > 0) {
        if (this.opts.wrapItems) {
          //wrap items until we have covered the visible area
          while (this.transform.x + x > -(this.width - this.totalItemWidth) / 2 && (this.totalItemWidth < this.width ? this.transform.x + x > this.totalItemWidth / 2 : true)) {
            a = this.items.pop();
            this.items.unshift(a);
            a.addTransform(-this.totalItemWidth);
            this._transformItems(a.width);
            x -= a.width;
          }
        } else {
          //there is a 1 pixel adjustment to account for some math rounding
          if (this.opts.edgeScroll && x > 0 && this.transform.x + x + 1 >= (this.totalItemWidth - this.width) / 2) {
            this._rightbound(true);
            return this._setTransform((this.totalItemWidth - this.width) / 2);
          }
          //progressively reduce scrolling when no more items to the left
          if (x > 0 && this.transform.x + x > this.totalItemWidth / 2 - this.items[0].width / 2) {
            x = x * ((this.totalItemWidth / 2 + this.items[0].width / 2 - (this.transform.x + x)) / this.items[0].width);
            x = x < 0 ? 0 : x;
          }
        }
      }
      return this._setTransform(this.transform.x + x);
    }
  };

  /**
   * Sets the leftbound class
   * @param {Boolean} b Set or unset the leftbound class
   */


  Carousel.prototype._leftbound = function _leftbound(b) {
    if (typeof b === 'undefined') {
      this.leftbound = typeof this.leftbound === 'undefined' ? false : this.leftbound;
      return this.leftbound;
    } else {
      if (b) {
        (0, _addClass2.default)(this.el, 'leftbound');
      } else {
        (0, _removeClass2.default)(this.el, 'leftbound');
      }
      this.leftbound = b;
      return this.leftbound;
    }
  };

  /**
   * Sets the rightbound class
   * @param {Boolean} b Set or unset the rightbound class
   */


  Carousel.prototype._rightbound = function _rightbound(b) {
    if (typeof b === 'undefined') {
      this.rightbound = typeof this.rightbound === 'undefined' ? false : this.rightbound;
      return this.rightbound;
    } else {
      if (b) {
        (0, _addClass2.default)(this.el, 'rightbound');
      } else {
        (0, _removeClass2.default)(this.el, 'rightbound');
      }
      this.rightbound = b;
      return this.rightbound;
    }
  };

  /**
   * Updates the selected item, by seeing which item has its center closest
   * to the center of the carousel
   */


  Carousel.prototype._updateSelected = function _updateSelected() {
    var tar = this.width / 2;
    var i = -1;
    var a = 1;
    var b = 0;
    while (a > b) {
      i++;
      if (i > this.items.length - 2) {
        break;
      }
      a = Math.abs(tar - this.items[i].currentPosition());
      b = Math.abs(tar - this.items[i + 1].currentPosition());
    }
    return this._selectedItem(this.items[i]);
  };

  /**
   * Stores the selected item for the carousel, and updates the previously
   * selected item and newly selected item to have the correct states
   * Conditionally sets the leftbound/rightbound states depending on configuration
   * @param {Object} item Optional: the new item select, if omitted it will
   * return the currently selected item.
   */


  Carousel.prototype._selectedItem = function _selectedItem(item) {
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
      if (this.selectedItem) {
        return this.selectedItem;
      } else {
        return this._updateSelected();
      }
    } else {
      if (this.selectedItem) {
        this.selectedItem.setSelected(false);
      }
      this.selectedItem = item;
      if ((this.opts.smoothScrollCenterItems || !this.opts.smoothScroll) && !this.opts.wrapItems && !this.opts.edgeScroll) {
        var l = this.items.indexOf(this.selectedItem);
        if (l === this.items.length - 1) {
          this._leftbound(true);
        } else {
          this._leftbound(false);
        }
        if (l === 0) {
          this._rightbound(true);
        } else {
          this._rightbound(false);
        }
      }
      this.selectedItem.setSelected(true);
    }
  };

  /**
   * Sets the transform for the carousel container
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._setTransform = function _setTransform(x) {
    x = x ? x : 0;
    this.transform = {
      'x': x
    };
    this.container.setAttribute('style', (0, _transform2.default)('translate3d', x + 'px, 0px, 0px'));
    this._updateSelected();
    return x;
  };

  return Carousel;
}(_base2.default);

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */


Carousel.prototype.defaults = {
  el: null
};

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
Carousel.prototype._whitelistedParams = [];

exports.default = Carousel;
module.exports = exports['default'];


},{"../helpers/css/transform":33,"../helpers/dom/add-class":36,"../helpers/dom/remove-class":43,"../helpers/util/debounce":64,"./base":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _dateTypeahead = require('./date-typeahead');

var _dateTypeahead2 = _interopRequireDefault(_dateTypeahead);

var _dateSelect = require('./date-select');

var _dateSelect2 = _interopRequireDefault(_dateSelect);

var _parseFormat = require('../helpers/date/parse-format');

var _parseFormat2 = _interopRequireDefault(_parseFormat);

var _pad = require('../helpers/util/pad');

var _pad2 = _interopRequireDefault(_pad);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _appendChildren = require('../helpers/manipulation/append-children');

var _appendChildren2 = _interopRequireDefault(_appendChildren);

var _triggerEvent = require('../helpers/dom/trigger-event');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _copyAttributes = require('../helpers/manipulation/copy-attributes');

var _copyAttributes2 = _interopRequireDefault(_copyAttributes);

var _date = require('../helpers/date/date');

var _date2 = _interopRequireDefault(_date);

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

var _parseAttribute = require('../helpers/dom/parse-attribute');

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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


var domDateFormat = 'YYYY-MM-DD';
var parsedDomFormat = (0, _parseFormat2.default)(domDateFormat);
var noop = function noop() {};

var DateInput = function (_Base) {
  _inherits(DateInput, _Base);

  /**
   * DateInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function DateInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DateInput);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _Base.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._convertLabel();
    _this._initializeInputs();
    _this._updateClass();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Show the input by adding the active state and setting character counts (if necessary).
   */


  DateInput.prototype.show = function show() {

    if (!this.isActive) {
      this._runTypeaheads();
      this.isActive = true;
      this._updateClass();
    }

    return this;
  };

  /**
   * Hide the input by removing the active state.
   */


  DateInput.prototype.hide = function hide() {
    if (!this.isActive) return this;
    this.isActive = false;
    this._updateClass();
    return this;
  };

  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateInput.prototype.remove = function remove(leaveElement) {

    this._removeTypeaheads(leaveElement);
    this._removeSelects(leaveElement);
    this._removeInputPieces();

    _Base.prototype.remove.call(this, leaveElement);

    return this;
  };

  /**
   * Given an object with day, month and year, set the value of the input.
   * @param {Object} values
   */


  DateInput.prototype.setValue = function setValue(values) {

    values = values || {
      day: '',
      month: '',
      year: ''
    };
    var i = void 0;
    var hadValue = void 0;

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
  };

  /**
   * Get the value of the input.
   * @return {String}
   */


  DateInput.prototype.getValue = function getValue() {
    return this.inputEl.value;
  };

  /**
   * Clear the values.
   */


  DateInput.prototype.clearValue = function clearValue() {

    (0, _each2.default)(this.isTypeahead ? this.typeaheads : this.selects, function (k, v) {
      v.clearValue();
    });

    this.inputEl.value = '';

    return this;
  };

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */


  DateInput.prototype.setErrorState = function setErrorState(opt) {
    if (opt) {
      this.el.setAttribute('data-error', '');
    } else {
      this.el.removeAttribute('data-error');
    }
  };

  /**
   * Enable the inputs
   */


  DateInput.prototype.enable = function enable() {

    (0, _each2.default)(this.isTypeahead ? this.typeaheads : this.selects, function (k, v) {
      v.enable();
    });

    this.inputEl.removeAttribute('disabled');

    (0, _toggleClass2.default)(this.el, 'disabled', false);

    return this;
  };

  /**
   * Clear the values.
   */


  DateInput.prototype.disable = function disable() {

    (0, _each2.default)(this.isTypeahead ? this.typeaheads : this.selects, function (k, v) {
      v.disable();
    });

    this.inputEl.setAttribute('disabled', '');

    (0, _toggleClass2.default)(this.el, 'disabled', true);

    return this;
  };

  /**
   * Update the input values to match the typeaheads.
   */


  DateInput.prototype.updateInput = function updateInput() {

    var inputs = void 0;

    if (this.isTypeahead && this.typeaheads) {
      inputs = this.typeaheads;
    } else if (this.isSelect) {
      inputs = this.selects;
    }

    if (inputs) {

      var day = inputs.day && inputs.day.getValue(true) || 0;
      var month = inputs.month && inputs.month.getValue(true) || 0;
      var year = inputs.year && inputs.year.getValue(true) || 0;

      var val = this.inputEl.value;

      this.inputEl.value = [day, month, year].indexOf(0) === -1 ? (0, _pad2.default)(year, 4) + '-' + (0, _pad2.default)(month, 2) + '-' + (0, _pad2.default)(day, 2) : '';

      if (val !== this.inputEl.value) {
        this._pauseInputChange = true;
        (0, _triggerEvent2.default)(this.inputEl, 'change');
        (this.onChange || noop)(this.inputEl.value, this);
        this._pauseInputChange = false;
      }
    }

    this.currValue = this.inputEl.value;

    return this;
  };

  /**
   * Get current typing value
   *
   */


  DateInput.prototype.getTypingValue = function getTypingValue() {

    var inputs = void 0;
    var result = '';

    if (this.isTypeahead && this.typeaheads) {
      inputs = this.typeaheads;
    } else if (this.isSelect) {
      inputs = this.selects;
    }

    if (inputs) {

      var day = inputs.day && inputs.day.getValue(true);
      var month = inputs.month && inputs.month.getValue(true);
      var year = inputs.year && inputs.year.getValue(true);

      result = month.toString() + day.toString() + year.toString();
    }

    return result;
  };

  /**
   * Move the focus to a typeahead element.
   * @param {Number} i
   * @param {String} character Optional A character to add
   */


  DateInput.prototype.focus = function focus(i, character) {

    if (!this.isActive || !this.inFocus) {
      return this;
    }

    var index = this.typeaheadEls.indexOf(this.inFocus.typeahead.el);
    var sib = this.typeaheadEls[index + i];
    var typeahead = void 0;

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

    var sibInput = sib.querySelector('input');

    if (sibInput) {
      sibInput.focus();

      // If we have a typeahead (because we needed to prepend a character), move the caret.
      if (typeahead) {
        typeahead.typeahead.moveCaret(1);
      }
    }

    return this;
  };

  /**
   * Move the focus to the next element.
   * @param {String} character Optional A character to add
   */


  DateInput.prototype.focusNext = function focusNext(character) {

    if (this.focus(1, character)) {
      if (this.inFocus && !character) this.inFocus.typeahead.moveCaretToStart();
    }

    return this;
  };

  /**
   * Move the focus to the next element.
   * @param {String} character Optional A character to add
   */


  DateInput.prototype.focusPrevious = function focusPrevious(character) {

    if (this.focus(-1, character)) {
      if (this.inFocus) this.inFocus.typeahead.moveCaretToEnd();
    }

    return this;
  };

  /**
   * Do we have any values?
   * @return {Boolean}
   */


  DateInput.prototype.hasPartialValue = function hasPartialValue() {

    var i = void 0;

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
  };

  /**
   * Resize the elements, to account for any changed display property.
   * @param {Element} el Optional
   */


  DateInput.prototype.update = function update(el) {

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
    } else {
      this._runTypeaheads();
    }

    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  DateInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.inputEl = this.el.querySelector('[type="date"]');
    this.inputLabel = this.el.querySelector('.spark-label').innerHTML;
    this.selectLabelPrefix = this.el.querySelector('.spark-label').getAttribute('id');

    if (!this.inputEl) {
      throw new Error('No <input type="date"> element present in date input container!', this.el);
    }

    this.toggleEl = this.el.querySelector('.spark-date__toggle');

    this.messageEl = this.el.querySelector('.spark-input__message') || (0, _makeElement2.default)('<span class="spark-input__message"></span>');
  };

  /**
   * Parse parameters from the elements.
   */


  DateInput.prototype._parseParams = function _parseParams() {

    this.isActive = this.isActive !== null ? this.isActive : this.inputEl.value ? true : false;
    this.isSelect = this.isSelect !== null ? this.isSelect : (0, _hasClass2.default)(this.el, 'spark-date--select') ? true : false;
    this.isTypeahead = this.isTypeahead !== null ? this.isTypeahead : !this.isSelect ? true : false;
    this.format = this.format !== null ? this.format : (0, _parseAttribute.string)(this.inputEl, 'data-format', 'MM-DD-YYYY');
    this.textFormat = this.textFormat !== null ? this.textFormat : (0, _parseAttribute.string)(this.inputEl, 'data-text-format', 'MM DD YYYY');
    this.showDateAsText = this.showDateAsText !== null ? this.showDateAsText : (0, _parseAttribute.boolean)(this.inputEl, 'data-show-date-as-text', false);

    this.parsedFormat = (0, _parseFormat2.default)(this.format);
    this.parsedTextFormat = (0, _parseFormat2.default)(this.textFormat);
    this.min = this.min !== null ? this.min : this.inputEl.getAttribute('min');
    this.max = this.max !== null ? this.max : this.inputEl.getAttribute('max');
    this.min = this.min && parsedDomFormat.getValues(this.min);
    this.max = this.max && parsedDomFormat.getValues(this.max);

    this.currValue = this.inputEl.value !== null ? this.inputEl.value : null;
  };

  /**
   * Setup the proper inputs. This could mean creating a typeahead, or creating selects.
   */


  DateInput.prototype._initializeInputs = function _initializeInputs() {

    if (this.isTypeahead) {
      this._initializeInputPieces();
      this._runTypeaheads();
    } else if (this.isSelect) {
      (0, _removeClass2.default)(this.el, 'spark-input');
      this._initializeInputPieces();
    }
  };

  /**
   * Replace the date input with a group of typeaheads or select inputs.
   * Keep the date input around and store the typeahead data in there in an ISO date format.
   */


  DateInput.prototype._initializeInputPieces = function _initializeInputPieces() {

    // Hide the original element. This will be updated as the typeahead values change
    this.inputEl.style.display = 'none';

    var els = [];
    var label = void 0;

    // Create a new typeahead for each part of the parsed format. Also add placeholder elements.
    this.parsedFormat.parts.forEach(function (part) {
      // Something weird with Node that makes us have to specify what `this` is here.
      (this.isTypeahead ? this._initializeTypeaheadPiece : this._initializeSelectPiece).call(this, els, part);
    }.bind(this));

    // Create a holder for all the pieces
    this.piecesEl = document.createElement('span');
    this.piecesEl.className = this.isTypeahead ? 'spark-input__fields' : 'spark-select-group';

    // Add all the necessary elements
    (0, _appendChildren2.default)(this.piecesEl, els);

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
  };

  /**
   * Remove the input pieces.
   */


  DateInput.prototype._removeInputPieces = function _removeInputPieces() {

    this.inputEl.style.display = '';

    // Remove elements we inserted into the DOM
    if (this.piecesEl) {
      this.piecesEl.parentNode.removeChild(this.piecesEl);
    }
  };

  /**
   * Remove typeaheads.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateInput.prototype._removeTypeaheads = function _removeTypeaheads(leaveElement) {

    // Remove typeaheads
    if (this.typeaheads) {
      for (var i in this.typeaheads) {
        this.typeaheads[i].remove(leaveElement);
      }
    }
  };

  /**
   * Remove selects.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  DateInput.prototype._removeSelects = function _removeSelects(leaveElement) {

    var label = void 0;

    // Remove selects
    if (this.selects) {

      for (var i in this.selects) {
        this.selects[i].remove(leaveElement);
      }

      // If this is a select group, move the label element.
      if (label = this.piecesEl.querySelector('.spark-label')) {
        this.el.appendChild(label);
      }

      (0, _addClass2.default)(this.el, 'spark-input');
    }
  };

  /**
   * Create a typeahead or placeholder piece.
   * @param {Array} els
   * @param {Object} part
   */


  DateInput.prototype._initializeTypeaheadPiece = function _initializeTypeaheadPiece(els, part) {

    this.typeaheads = this.typeaheads || {};
    this.typeaheadEls = this.typeaheadEls || [];

    var el = void 0;

    switch (part.name) {
      case 'day':
      case 'month':
      case 'year':
        this.typeaheads[part.name] = new _dateTypeahead2.default({
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
  };

  /**
   * Replace the date input with three date dropdowns. Keep the date input around and store the
   * select data in there.
   */


  DateInput.prototype._initializeSelectPiece = function _initializeSelectPiece(els, part) {

    this.selects = this.selects || {};
    this.selectEls = this.selectEls || [];

    if (['day', 'month', 'year'].indexOf(part.name) === -1) {
      return;
    }

    var el = void 0;

    switch (part.name) {
      case 'day':
      case 'month':
        this.selects[part.name] = new _dateSelect2.default({
          type: part.name,
          ariaLabelPrefix: this.selectLabelPrefix,
          onChange: this._onPieceChangeBound
        });
        el = this.selects[part.name].select.el;
        break;
      case 'year':
        {
          var minYear = this.inputEl.min ? parsedDomFormat.getValues(this.inputEl.min).year : null;
          var maxYear = this.inputEl.max ? parsedDomFormat.getValues(this.inputEl.max).year : null;

          this.selects[part.name] = new _dateSelect2.default({
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
  };

  /**
   * If our element is a label, convert it to a div so that
   * we are semantically correct. Can't have more than one
   * input inside of a label!
   */


  DateInput.prototype._convertLabel = function _convertLabel() {

    if (this.isTypeahead || this.el.nodeName.toLowerCase() !== 'label') {
      return;
    }

    var newEl = document.createElement('fieldset');

    (0, _copyAttributes2.default)(this.el, newEl);
    (0, _appendChildren2.default)(newEl, this.el.children);

    if (this.el.parentNode) {
      this.el.parentNode.replaceChild(newEl, this.el);
    }

    this.el = newEl;
  };

  /**
   * Validate the date values.
   */


  DateInput.prototype._validate = function _validate() {

    if (this.isTypeahead) {
      this._validateTypeaheads();
    } else if (this.isSelect) {
      this._validateSelects();
    }
  };

  /**
   * Validate the typeahead values.
   */


  DateInput.prototype._validateTypeaheads = function _validateTypeaheads() {

    if (!this.typeaheads) {
      return;
    }

    var month = this.typeaheads.month ? this.typeaheads.month.getValue(true) : null;
    var year = this.typeaheads.year ? this.typeaheads.year.getValue(true) : null;
    var day = this.typeaheads.day ? this.typeaheads.day.getValue(true) : null;
    var maxDay = void 0;

    if (this.format === 'DD-MM-YYYY') {
      var selectedDate = new Date(this.inputEl.value); // this is in format YYYY-MM-DD
      var selectedMonth = selectedDate.getMonth() + 1;

      if (month === null || month === '') {
        maxDay = this._getMaxDaysInMonth(selectedMonth);
      } else {
        var oldVal = new Date(this.currValue);
        var oldMonth = oldVal.getMonth() + 1;

        if (selectedMonth !== oldMonth) {
          maxDay = this._getMaxDaysInMonth(selectedMonth);
        } else {
          maxDay = month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate() || this._getMaxDaysInMonth(month);
        }
      }
    } else {
      maxDay = month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate() || this._getMaxDaysInMonth(month);
    }

    if (maxDay < day) {
      this.typeaheads.day.setValue(maxDay);
      this.updateInput();
    }
  };

  /**
   * Validate the boundaries of the typeahead values relative to the min and max values.
   */


  DateInput.prototype._validateTypeaheadBounds = function _validateTypeaheadBounds() {

    var year = this.typeaheads.year ? this.typeaheads.year.getValue(true) : null;
    var month = this.typeaheads.month ? this.typeaheads.month.getValue(true) : null;
    var day = this.typeaheads.day ? this.typeaheads.day.getValue(true) : null;

    if (!year || !month || !day) {
      return;
    }

    var date = new Date(year, month - 1, day);
    var set = '';

    if (this.min && date < new Date(this.min.year, this.min.month - 1, this.min.day)) {
      set = 'min';
    } else if (this.max && date > new Date(this.max.year, this.max.month - 1, this.max.day)) {
      set = 'max';
    }

    if (set) {
      this.typeaheads.year.setValue((0, _pad2.default)(this[set].year, this.typeaheads.year.typeahead.format.length));
      this.typeaheads.month.setValue((0, _pad2.default)(this[set].month, this.typeaheads.month.typeahead.format.length));
      this.typeaheads.day.setValue((0, _pad2.default)(this[set].day, this.typeaheads.day.typeahead.format.length));
      this.updateInput();
    }
  };

  /**
   * Pad the typeahead input values.
   */


  DateInput.prototype._padTypeaheads = function _padTypeaheads() {

    if (this._pauseInputChange) return;

    this._pauseInputChange = true;

    for (var i in this.typeaheads) {
      this._padTypeahead(this.typeaheads[i]);
    }

    this._pauseInputChange = false;
  };

  /**
   * Pad the typeahead input values.
   * @param {Typeahead} typeahead
   */


  DateInput.prototype._padTypeahead = function _padTypeahead(typeahead) {

    var value = typeahead.getValue();

    if (value) {
      var padded = (0, _pad2.default)(value, typeahead.typeahead.format.length);
      if (value !== padded) typeahead.setValue((0, _pad2.default)(value, typeahead.typeahead.format.length));
    }
  };

  /**
   * Do any of the typeaheads have a value?
   * @return {Boolean}
   */


  DateInput.prototype._hasTypeaheadValue = function _hasTypeaheadValue() {

    for (var i in this.typeaheads) {
      if (this.typeaheads[i].getValue(true)) {
        return true;
      }
    }

    return false;
  };

  /**
   * Validate select input values.
   */


  DateInput.prototype._validateSelects = function _validateSelects() {

    if (!this.selects) {
      return;
    }

    var month = this.selects.month ? this.selects.month.getValue(true) : null;
    var year = this.selects.year ? this.selects.year.getValue(true) : null;

    var maxDay = month && new Date(year !== null ? year : new Date().getFullYear(), month, 0).getDate() || this._getMaxDaysInMonth(month);
    var day = this.selects.day ? this.selects.day.getValue(true) : null;

    this.selects.day.setOptions({
      max: maxDay
    });
    if (maxDay < day) {
      this.selects.day.setValue(maxDay);
    }

    this.updateInput();
  };

  /**
   * Get the maximum number of days for a given month.
   * @param {Number} month The month's number. 1-12.
   * @return {Number} The maximum number of days. 28-31.
   */


  DateInput.prototype._getMaxDaysInMonth = function _getMaxDaysInMonth(month) {
    if (month === 2) return 29;else if ([4, 6, 9, 11].indexOf(month) !== -1) return 30;
    return 31;
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because them.
   */


  DateInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onTypeaheadBlurBound = this._onTypeaheadBlur.bind(this);
    this._onTypeaheadInputBound = this._onTypeaheadInput.bind(this);
    this._onTypeaheadFocusBound = this._onTypeaheadFocus.bind(this);
    this._onPieceChangeBound = this._onPieceChange.bind(this);
    this._onTypeaheadBackspaceBound = this._onTypeaheadBackspace.bind(this);
    this._onTypeaheadEndBound = this._onTypeaheadEnd.bind(this);
    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onVisibleChildrenBound = this._onVisibleChildren.bind(this);
  };

  /**
   * Add event listeners.
   */


  DateInput.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.inputEl.addEventListener('change', this._onInputChangeBound);
    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  };

  /**
   * Remove event listeners.
   */


  DateInput.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.inputEl.removeEventListener('change', this._onInputChangeBound);
    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  };

  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */


  DateInput.prototype._onVisibleChildren = function _onVisibleChildren(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this.update();
      }.bind(this), 0);
    }
  };

  /**
   * Run all typeaheads so they have placeholder values.
   */


  DateInput.prototype._runTypeaheads = function _runTypeaheads() {

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

    for (var i in this.typeaheads) {
      if (this.typeaheads[i] !== this.inFocus) {
        this.typeaheads[i].run();
      }
    }

    if (this.inFocus) {
      this.inFocus.resume();
      this.inFocus.run();
    }

    this.runningTypeaheads = false;
  };

  /**
   * Update the active and focus classes.
   */


  DateInput.prototype._updateClass = function _updateClass() {
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
    (0, _toggleClass2.default)(this.el, 'has-partial-value', this.hasPartialValue());
    (0, _toggleClass2.default)(this.el, 'focus', this.inFocus ? true : false);
  };

  /**
   * Get the typeahead that corresponds to the given element.
   * @param {Element} el
   * @return {Object}
   */


  DateInput.prototype._getTypeaheadByElement = function _getTypeaheadByElement(el) {
    for (var i in this.typeaheads) {
      if (this.typeaheads[i].typeahead.el === el) {
        return this.typeaheads[i];
      }
    }
  };

  /**
   * Show the date as text.
   */


  DateInput.prototype._showDateText = function _showDateText() {

    var text = this._getDateText();

    if (!text || !this.showDateAsText) {
      return;
    }

    if (!this.dateTextEl) {
      this._createDateTextEl();
    }

    this.dateTextEl.innerHTML = text;
    this.dateTextEl.style.display = '';
  };

  /**
   * Hide the date as text.
   */


  DateInput.prototype._hideDateText = function _hideDateText() {

    if (!this.showDateAsText || !this.dateTextEl) {
      return;
    }

    this.dateTextEl.style.display = 'none';
  };

  /**
   * Create the date text element.
   */


  DateInput.prototype._createDateTextEl = function _createDateTextEl() {

    var el = document.createElement('div');
    el.className = 'spark-input__overlay';
    el.style.display = 'none';

    this.el.appendChild(el);
    this.dateTextEl = el;
  };

  /**
   * Get the date as text.
   */


  DateInput.prototype._getDateText = function _getDateText() {

    var parts = this.parsedTextFormat.parts;
    var i = 0;
    var len = parts.length;
    var str = '';
    var isValid = true;
    var val;

    for (; i < len; i++) {

      val = this.typeaheads[parts[i].name] && this.typeaheads[parts[i].name].getValue();

      switch (parts[i].name) {
        case 'month':
          str += _date2.default.getMonthNameShort(val);
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

    return isValid ? str : false;
  };

  /**
   * When the value of a typeahead or select changes, validate.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onPieceChange = function _onPieceChange() {

    this._validate();

    if (this.isTypeahead && this.showDateAsText && !this._hasFocus) {

      if (this._showTextTimer) {
        clearTimeout(this._showTextTimer);
      }

      this._showTextTimer = setTimeout(function () {
        this._showDateText();
      }.bind(this), 0);
    }
  };

  /**
   * When the typeahead gains focus.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onTypeaheadFocus = function _onTypeaheadFocus(val, typeahead) {

    if (this.runningTypeaheads) return;

    this._hideDateText();

    if (!this._hasFocus) {
      this._hasFocus = true;
      (this.onFocus || noop)(this.inputEl.value, this);
    }

    (0, _triggerEvent2.default)(this.inputEl, 'focus');
    this.inFocus = typeahead;
    this.show();
    this._updateClass();

    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }
  };

  /**
   * When the typeahead loses focus, make sure numbers are padded properly.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onTypeaheadBlur = function _onTypeaheadBlur(val, typeahead) {

    if (this.runningTypeaheads) return;

    this.inFocus = null;

    this._padTypeahead(typeahead);
    this.updateInput();
    this._updateClass();

    if (!this.inputEl.value && !this._hasTypeaheadValue()) {
      this.hide();
    } else {
      this._validateTypeaheadBounds();
    }

    this._blurTimer = setTimeout(function () {
      this._hasFocus = false;
      (this.onBlur || noop)(this.inputEl.value, this);
      this._showDateText();
    }.bind(this), 1);
  };

  /**
   * `input` event callback for typeahead
   */


  DateInput.prototype._onTypeaheadInput = function _onTypeaheadInput() {
    (this.onInput || noop)(this.getTypingValue(), this);
  };

  /**
   * When the typeahead fires a backspace event, move back to the previous input.
   * @param {Number} val
   * @param {Object} typeahead
   */


  DateInput.prototype._onTypeaheadBackspace = function _onTypeaheadBackspace() {
    this.focusPrevious();
  };

  /**
   * When the typeahead is at its maximum length and the caret is at the end,
   * focus on the next input field.
   * @param {Object} typeahead
   * @param {String} character Optional
   */


  DateInput.prototype._onTypeaheadEnd = function _onTypeaheadEnd(typeahead, character) {
    this.focusNext(character);
  };

  /**
   * When the input that corresponds to this instance changes. Allows us to listen
   * and respond to changes made by other components (Calendar Popover, for example).
   * @param {Object} e
   */


  DateInput.prototype._onInputChange = function _onInputChange(e) {

    if (this.isTypeahead) {
      this.isActive = e.target.value ? true : false;
      this._updateClass();
    }

    if (this._pauseInputChange) return;
    this.setValue(parsedDomFormat.getValues(e.target.value));
    (this.onChange || noop)(this.inputEl.value, this);
  };

  /**
   * When the input group is clicked, focus on the first typeahead
   * if we don't already have focus.
   * @todo : we should still replace the label on typeaheads and use this,
   * but we need a way to focus on the closest element to a click.
   * @param {Object} e
   */


  DateInput.prototype._onClick = function _onClick() /*e*/{

    /*if (this.isTypeahead || this.inFocus || this.isActive || getParent(e.target, '.spark-input__addon')) {
      return;
    }
     let input = this.typeaheadEls[0].querySelector('input');
     if (input) {
      input.focus();
    }*/
  };

  return DateInput;
}(_base2.default);

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

(0, _mixin2.default)(DateInput.prototype, _messaging2.default, _validation2.default);

exports.default = DateInput;
module.exports = exports['default'];


},{"../helpers/date/date":34,"../helpers/date/parse-format":35,"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/make-element":39,"../helpers/dom/parse-attribute":42,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"../helpers/dom/trigger-event":45,"../helpers/manipulation/append-children":49,"../helpers/manipulation/copy-attributes":50,"../helpers/util/each":65,"../helpers/util/mixin":66,"../helpers/util/pad":67,"../mixins/messaging":71,"../mixins/validation":72,"./base":1,"./date-select":5,"./date-typeahead":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _selectInput = require('./select-input');

var _selectInput2 = _interopRequireDefault(_selectInput);

var _date = require('../helpers/date/date');

var _date2 = _interopRequireDefault(_date);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # DateSelect
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Create a select list of days, months or years.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new DateSelect(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/date-select.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

function createDefaultElement() {
  var el = document.createElement('span');
  el.className = 'spark-select';
  el.innerHTML = '<select class="spark-select__input"></select><span class="spark-label"></span>';
  return el;
}

var DateSelect = function (_BaseComponent) {
  _inherits(DateSelect, _BaseComponent);

  /**
   * DateSelect constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  function DateSelect(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DateSelect);

    // If the first argument is a plain object, create a default element
    // since the user MUST provide additional params but the element
    // is optional. Doing it this way to keep the arity the same
    // as other components.
    if (!(el instanceof HTMLElement)) {
      params = el || {};
      el = createDefaultElement();
    }

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    _this._bindEventListenerCallbacks();
    _this._createSelect(el);
    return _this;
  }

  /**
   * Get the value.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {Mixed}
   */


  DateSelect.prototype.getValue = function getValue(asInt) {
    return asInt ? parseInt(this.select.getValue(), 10) : this.select.getValue();
  };

  /**
   * Set the value.
   * @param {Mixed} val
   */


  DateSelect.prototype.setValue = function setValue(val) {
    return this.select.setValue(val);
  };

  /**
   * Clear the value.
   */


  DateSelect.prototype.clearValue = function clearValue() {
    return this.select.clearValue();
  };

  /**
   * Enable the input.
   */


  DateSelect.prototype.enable = function enable() {
    return this.select.enable();
  };

  /**
   * Disable the input.
   */


  DateSelect.prototype.disable = function disable() {
    return this.select.disable();
  };

  /**
   * Update the date select's options.
   * @param {Object|Array} params
   */


  DateSelect.prototype.setOptions = function setOptions(params) {

    params = params || {};

    this.min = params.min || this.min;
    this.max = params.max || this.max;
    this.monthNames = params.monthNames || this.monthNames;
    this.numericMonth = params.numericMonth || this.numericMonth;

    if (this.type === 'year') {
      if (params.min && !params.max) {
        this.max = this.min + 100;
      } else if (params.max && !params.min) {
        this.min = this.max - 100;
      }
    }

    var i = this.min ? this.min - 1 : 0;
    var len = this.max || this.monthNames.length;
    var opts = [{}];

    for (; i < len; i++) {
      opts.push({
        value: i + 1,
        text: this.monthNames ? this.monthNames[i] : i + 1
      });
    }

    this.select.setOptions(opts);

    return this;
  };

  /**
   * Set the label text for the select input.
   * @param {String} text Optional
   */


  DateSelect.prototype.setLabel = function setLabel(text) {
    this.select.setLabel(text !== undefined ? text : this._getTypeText());
    return this;
  };

  /**
   * Create a select input helper.
   * @param {Object} el
   */


  DateSelect.prototype._createSelect = function _createSelect(el) {

    this.select = new _selectInput2.default(el, {
      onChange: this._onSelectChangeBound,
      onFocus: this._onSelectFocusBound,
      onBlur: this._onSelectBlurBound
    });

    this.setOptions();
    this.setLabel();

    // Ensure we have an ARIA labelledby attribute
    var select = el.querySelector('select');
    if (select && !select.getAttribute('aria-labelledby')) {
      var selectLabel = el.querySelector('.spark-label');
      var labelID = 'spark-aria__' + this.ariaLabelPrefix + '--suffix-' + this.type;

      if (selectLabel !== null && labelID !== null) {
        selectLabel.setAttribute('id', labelID);
        select.setAttribute('aria-labelledby', this.ariaLabelPrefix + ' ' + labelID);
      }
    }
  };

  /**
   * Cache elements.
   * @param {Element} el
   */


  DateSelect.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.selectEl = this.el.querySelector('select');
  };

  /**
   * Parse parameters from the elements.
   */


  DateSelect.prototype._parseParams = function _parseParams() {

    this.type = this.type !== null ? this.type : (0, _parseAttribute.string)(this.selectEl, 'data-type', 'day');

    this.ariaLabelPrefix = this.ariaLabelPrefix !== null ? this.ariaLabelPrefix : null;

    if (this.type === 'year') {
      var date = new Date();
      this.min = this.min !== null ? this.min : (0, _parseAttribute.number)(this.selectEl, 'min', date.getFullYear() - 100);
      this.max = this.max !== null ? this.max : (0, _parseAttribute.number)(this.selectEl, 'max', (this.min || date.getFullYear()) + 100);
    } else if (this.type === 'month') {

      this.monthNames = this.monthNames !== null ? this.monthNames : (0, _parseAttribute.string)(this.selectEl, 'data-month-names', null);
      this.numericMonth = this.numericMonth !== null ? this.numericMonth : (0, _parseAttribute.boolean)(this.selectEl, 'data-numeric-month', false);
      this.min = this.min !== null ? this.min : (0, _parseAttribute.number)(this.selectEl, 'min', null);
      this.max = this.max !== null ? this.max : (0, _parseAttribute.number)(this.selectEl, 'max', null);

      // No monthNames yet and no min or max
      if (!this.monthNames && !this.numericMonth && !this.min && !this.max) {
        this.monthNames = this._getDefaultMonthNames();
      } else if (!this.min && !this.max) {
        this.min = 1;
        this.max = 12;
      }

      if (typeof this.monthNames === 'string') {
        this.monthNames = this.monthNames.split(',');
      }
    } else {
      this.min = this.min !== null ? this.min : (0, _parseAttribute.number)(this.selectEl, 'min', 1);
      this.max = this.max !== null ? this.max : (0, _parseAttribute.number)(this.selectEl, 'max', 31);
    }
  };

  /**
   * Make a list of month options.
   * @return {Array}
   */


  DateSelect.prototype._getDefaultMonthNames = function _getDefaultMonthNames() {
    return _date2.default.getMonthNamesShort();
  };

  /**
   * Get the text for this type of date select.
   * @return {String}
   */


  DateSelect.prototype._getTypeText = function _getTypeText() {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  DateSelect.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onSelectChangeBound = this._onSelectChange.bind(this);
    this._onSelectFocusBound = this._onSelectFocus.bind(this);
    this._onSelectBlurBound = this._onSelectBlur.bind(this);
  };

  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */


  DateSelect.prototype._onSelectChange = function _onSelectChange(val) {
    (this.onChange || noop)(val, this);
  };

  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */


  DateSelect.prototype._onSelectFocus = function _onSelectFocus(val) {
    (this.onFocus || noop)(val, this);
  };

  /**
   * When the select changes, run the callback.
   * @param {String} val The value of the input
   */


  DateSelect.prototype._onSelectBlur = function _onSelectBlur(val) {
    (this.onBlur || noop)(val, this);
  };

  return DateSelect;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


DateSelect.prototype._whitelistedParams = ['type', 'ariaLabelPrefix', 'monthNames', 'numericMonth', 'min', 'max', 'onChange', 'onFocus', 'onBlur'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
DateSelect.prototype.defaults = {
  el: null,
  selectEl: null,
  type: null,
  monthNames: null,
  min: null,
  max: null,
  select: null,
  numericMonth: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  _onChangeBound: null,
  _onFocusBound: null,
  _onBlurBound: null
};

exports.default = DateSelect;
module.exports = exports['default'];


},{"../helpers/date/date":34,"../helpers/dom/parse-attribute":42,"./base":1,"./select-input":19}],6:[function(require,module,exports){
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


},{"../helpers/dom/parse-attribute":42,"./base":1,"./typeahead":28}],7:[function(require,module,exports){
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


},{"../helpers/animation/height":29,"../helpers/dom/has-class":38,"../helpers/dom/toggle-class":44,"../helpers/traversal/get-parent":58,"./base":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _expand = require('./expand');

var _expand2 = _interopRequireDefault(_expand);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Filter Module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module that contains an individual (or related) filters such as checkboxes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new FilterModule(el, params);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/filter-module.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var FilterModule = function (_BaseComponent) {
  _inherits(FilterModule, _BaseComponent);

  /**
   * Filter Module constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function FilterModule(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FilterModule);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the need elements
   * @param {Element} el
   */


  FilterModule.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this._showAllEl = this.el.querySelector('.spark-filter-module__show-all');
    if (this._showAllEl) {
      this._showAllToggleable = this._showAllEl.querySelector('span');
    }

    this._clearEls = this.el.querySelectorAll('.spark-filter-module__clear');
    this._hiddenEls = Array.prototype.slice.call(this.el.querySelectorAll('.spark-filter-module--hide'));
    this._headerEl = this.el.querySelector('.spark-filter-module__header');
    this._bodyEl = this.el.querySelector('.spark-filter-module__body');
    this._modalEl = this.el.querySelector('.spark-modal');
    this._modalSaveBtn = this.el.querySelector('.spark-filter-module__show-all__modal-button');
    this._modalClasses = [];

    if (this.onShowAll === 'modal') {
      this.modalInst = new _modal2.default(this._modalEl);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  FilterModule.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onShowAllBound = this._onShowAll.bind(this);
    this._onClearBound = this._onClear.bind(this);
    this._onCloseModalBound = this._onCloseModal.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  FilterModule.prototype._addEventListeners = function _addEventListeners() {
    !this._showAllEl || this._showAllEl.addEventListener('click', this._onShowAllBound);
    !this._modalSaveBtn || this._modalSaveBtn.addEventListener('click', this._onCloseModalBound);

    for (var i = 0; i < this._clearEls.length; i++) {
      !this._clearEls[i] || this._clearEls[i].addEventListener('click', this._onClearBound);
    }
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  FilterModule.prototype._removeEventListeners = function _removeEventListeners() {
    if (this._showAllEl) {
      this._showAllEl.removeEventListener('click', this._onShowAllBound);
      this._modalSaveBtn.removeEventListener('click', this._onCloseModalBound);

      for (var i = 0; i < this._clearEls.length; i++) {
        !this._clearEls[i] || this._clearEls[i].removeEventListener('click', this._onClearBound);
      }
    }
  };

  /**
   * Show any hidden filters within a module or run provided function if available
   */


  FilterModule.prototype._onShowAll = function _onShowAll() {
    if (typeof this.onShowAll === 'function') {
      (this.onShowAll || noop)(this);
    } else {
      if (this.onShowAll === 'toggle' || this.onShowAll === 'modal' && this._isExpand) {
        this._toggleShowAllLabel();
        this.toggleHiddenContent();
      } else if (this.onShowAll === 'modal' && !this._isExpand) {
        this.modalInst.open();
      }

      (this.onShowAllComplete || noop)();
    }
  };

  /**
   * Toggle Show More label text
   */


  FilterModule.prototype._toggleShowAllLabel = function _toggleShowAllLabel() {
    this._showAllToggleable.innerHTML = this._showAllToggleable.innerHTML === 'more' ? 'fewer' : 'more';
  };

  /**
   * Callback after clicking `Clear` button
   */


  FilterModule.prototype._onClear = function _onClear() {
    (this.onClear || noop)(this);
  };

  /**
   * Callback after clicking `Save` button
   */


  FilterModule.prototype._onCloseModal = function _onCloseModal() {
    (this.onModalClose || noop)();

    this.modalInst.close();
  };

  /**
   * Enable clear button
   */


  FilterModule.prototype.enableClearBtn = function enableClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      (0, _removeClass2.default)(this._clearEls[i], 'spark-filter-module__clear--disabled');
      (0, _removeClass2.default)(this._clearEls[i], 'spark-filter-module__clear--hidden');
    }
  };

  /**
   * Disable clear button
   */


  FilterModule.prototype.disableClearBtn = function disableClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      (0, _addClass2.default)(this._clearEls[i], 'spark-filter-module__clear--disabled');
    }
  };

  /**
   * Hide clear button
   */


  FilterModule.prototype.hideClearBtn = function hideClearBtn() {
    for (var i = 0; i < this._clearEls.length; i++) {
      (0, _addClass2.default)(this._clearEls[i], 'spark-filter-module__clear--hidden');
    }
  };

  /**
   * Determine if Clear button is hidden or disabled
   */


  FilterModule.prototype.getClearButtonStatus = function getClearButtonStatus() {
    var buttonEnabled = false;

    for (var i = 0; i < this._clearEls.length; i++) {
      if ((0, _hasClass2.default)(this._clearEls[i], 'spark-filter-module__clear--hidden') || (0, _hasClass2.default)(this._clearEls[i], 'spark-filter-module__clear--disabled')) {
        buttonEnabled = false;
      } else {
        buttonEnabled = true;
      }
    }

    return buttonEnabled;
  };

  /**
   * Hide or show extra filters elements as triggered by Show more/fewer
   */


  FilterModule.prototype.toggleHiddenContent = function toggleHiddenContent() {
    for (var i = 0; i < this._hiddenEls.length; i++) {
      (0, _toggleClass2.default)(this._hiddenEls[i], 'show');
    }
  };

  /**
   * Change filter-module to expand/collapse variation
   * This occurs when the filter is at the xs breakpoint
   */


  FilterModule.prototype._applyExpand = function _applyExpand() {
    if (this._modalEl) {
      var modalClsNames = ['spark-filter-module--hide', '', '', ''];

      this._hiddenEls.push(this._modalEl);
      var curEl = this._modalEl;

      for (var i = 0; i < modalClsNames.length; i++) {
        this._modalClasses[i] = curEl.className;
        curEl.className = modalClsNames[i];
        curEl = curEl.firstElementChild;
      }

      if ((0, _hasClass2.default)(document.body, 'spark-modal-open')) {
        (0, _removeClass2.default)(document.body, 'spark-modal-open');
      }

      this.modalInst.remove(true);
    }

    (0, _addClass2.default)(this.el, 'spark-panel', 'spark-panel--expand');
    (0, _addClass2.default)(this._headerEl, 'spark-panel__header');
    this._headerEl.setAttribute('role', 'heading');
    this._headerEl.setAttribute('tabindex', '0');
    (0, _addClass2.default)(this._bodyEl, 'spark-panel__content');

    this._expandInst = new _expand2.default(this.el, {
      onAfterExpand: this.onAfterExpand,
      onAfterCollapse: this.onAfterCollapse
    });

    this._isExpand = true;
  };

  /**
   * Change filter-module from expand/collapse to horizontal variation
   */


  FilterModule.prototype._disapplyExpand = function _disapplyExpand() {
    if (this._modalEl) {

      if ((0, _hasClass2.default)(this._modalEl, 'show')) {
        this._toggleShowAllLabel();
      }

      this._hiddenEls.pop();
      var curEl = this._modalEl;

      for (var i = 0; i < this._modalClasses.length; i++) {
        curEl.className = this._modalClasses[i];
        curEl = curEl.firstElementChild;
      }

      this.modalInst = new _modal2.default(this._modalEl);
    }

    (0, _removeClass2.default)(this.el, 'spark-panel', 'spark-panel--expand');
    (0, _removeClass2.default)(this._headerEl, 'spark-panel__header');
    this._headerEl.removeAttribute('role');
    this._headerEl.removeAttribute('tabindex');
    (0, _removeClass2.default)(this._bodyEl, 'spark-panel__content');
    this._expandInst.remove(true);
    this._isExpand = false;
  };

  return FilterModule;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


FilterModule.prototype._whitelistedParams = ['onShowAll', 'onShowAllComplete', 'onModalClose', 'onClear', 'onAfterExpand', 'onAfterCollapse'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
FilterModule.prototype.defaults = {
  el: null,
  onShowAll: noop,
  onShowAllComplete: noop,
  onModalClose: noop,
  onClear: noop,
  onAfterExpand: noop,
  onAfterCollapse: noop,
  modalInst: null,
  _onShowAllBound: null,
  _onClearBound: null,
  _showAllEl: null,
  _clearEl: null,
  _hiddenEls: [],
  _headerEl: null,
  _bodyEl: null,
  _modalEl: null,
  _expandInst: null,
  _isExpand: false,
  dataSet: {}
};

exports.default = FilterModule;
module.exports = exports['default'];


},{"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"./base":1,"./expand":7,"./modal":12}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _filterModule = require('./filter-module');

var _filterModule2 = _interopRequireDefault(_filterModule);

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

var _breakpoint = require('../helpers/dom/breakpoint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Filter
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A container for a set of form fields used to filter a data set or search results
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Filter(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/filter.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Filter = function (_BaseComponent) {
  _inherits(Filter, _BaseComponent);

  /**
   * Filter constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Filter(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Filter);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._initFilterDisplay();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the needed elements
   * @param {Element} el
   */


  Filter.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.moduleEls = this.el.querySelectorAll('.spark-filter-module');

    // These options are here so that the modules can communicate with the filter to do certain tasks
    var defaultOption = {
      onAfterExpand: this._onAfterExpand.bind(this),
      onAfterCollapse: this._onAfterCollapse.bind(this)
      //onShowAllComplete: this._onShowAllComplete.bind(this),
    };

    if (this.moduleEls.length > 0) {
      for (var i = 0; i < this.moduleEls.length; i++) {
        if (typeof this.moduleOptions[i] !== 'undefined') {
          for (var key in defaultOption) {
            this.moduleOptions[i][key] = defaultOption[key];
          }
          this.moduleInsts[i] = new _filterModule2.default(this.moduleEls[i], this.moduleOptions[i]);
        } else {
          this.moduleInsts[i] = new _filterModule2.default(this.moduleEls[i], defaultOption);
        }
      }
    }

    this._filterToggleContainer = this.el.querySelector('.spark-filter__toggle-container');
    this._toggleFilterButton = this.el.querySelector('.spark-filter__toggle-button');
    this._toggleFilterLabel = this.el.querySelector('.spark-filter__toggle-button span');
    this._tagsContainer = this.el.querySelector('.spark-filter__tags-container');
    this._tagsCounter = this.el.querySelector('.spark-filter__applied-filters-counter');
    this._clearAllButton = this.el.querySelector('.spark-filter__clear-all');
    this._filterContent = this.el.querySelector('.spark-filter__content');
    this._modulesContainer = this.el.querySelector('.spark-filter__modules-container');
    this._viewMoreButton = this.el.querySelector('.spark-filter__view-more-filters');
    this._viewLessButton = this.el.querySelector('.spark-filter__view-less-filters');
    this._filterFooter = this.el.querySelector('.spark-filter__footer');
    this._buttonGroupEl = this.el.querySelector('.spark-filter__apply-btn-container');
    this._applyFiltersButton = this.el.querySelector('.spark-filter__btn-apply');
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Filter.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._toggleViewBound = this._toggleView.bind(this);
    this._toggleFilterClickBound = this.toggleFilterClick.bind(this);
    this._onClearAllBound = this._onClearAll.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
  };

  /**
   * Add event listeners
   */


  Filter.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.addEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.addEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.addEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.addEventListener('click', this._onClearAllBound);
  };

  /**
   * Remove event listeners
   */


  Filter.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
    !this._viewMoreButton || this._viewMoreButton.removeEventListener('click', this._toggleViewBound);
    !this._viewLessButton || this._viewLessButton.removeEventListener('click', this._toggleViewBound);
    !this._toggleFilterButton || this._toggleFilterButton.removeEventListener('click', this._toggleFilterClickBound);
    !this._clearAllButton || this._clearAllButton.removeEventListener('click', this._onClearAllBound);
  };

  /**
   * Initialize filter
   */


  Filter.prototype._initFilterDisplay = function _initFilterDisplay() {
    this.initializingFilter = true;

    if (this.moduleEls.length > 0) {
      this.extraModulesExpanded = false;
    }

    (0, _addClass2.default)(this.el, 'spark-filter--initializing');

    this._determineFilterLayout();
  };

  /**
   * Determine which filter layout should be displayed i.e. Expand/Collapse view or Wide view
   */


  Filter.prototype._determineFilterLayout = function _determineFilterLayout() {
    this.currentBreakpoint = (0, _breakpoint.get)(window.innerWidth);

    switch (this.currentBreakpoint) {
      case 'xs':
        this._curCol = 1;
        break;
      case 'sm':
        this._curCol = 2;
        break;
      case 'md':
        this._curCol = 3;
        break;
      default:
        this._curCol = 4;
        break;
    }

    if (this._curCol <= 1) {
      // Display expand-collapse filter
      if (!this._isDropdownState) {
        this._applyExpandCollapseLayout();
        this._showModule();
      }
    } else {
      // Display wide-screen filter
      if (this._expandCollapseState) {
        this._removeExpandCollapseLayout();
      }

      if ((0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
        clearTimeout(this._timeout);
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
      }

      this._showModule();

      if (!this.extraModulesExpanded) {
        this._hideModule(this._curCol, this._maxCol - 1);
      }
    }

    // Determine whether to show or hide View More/Less buttons
    if (!this._isDropdownState) {
      var hiddenModules = document.querySelectorAll('.spark-filter-module.hide');

      if (!this.extraModulesExpanded && hiddenModules.length === 0) {
        (0, _addClass2.default)(this._viewMoreButton, 'hide');
      } else if (!this.extraModulesExpanded && hiddenModules.length > 0) {
        (0, _removeClass2.default)(this._viewMoreButton, 'hide');
      }
    }
  };

  /**
   * Update the filter layout as necessary
   */


  Filter.prototype._updateFilterLayout = function _updateFilterLayout() {
    this._determineFilterLayout();
  };

  /**
   * Expand or collapse extra filters
   */


  Filter.prototype._toggleView = function _toggleView() {
    if (this._isFilterExpanded && !this.extraModulesExpanded) {
      this._showModule();
      this._dispatchVisibilityEvent();
    } else if (this._isFilterExpanded && this.extraModulesExpanded) {
      this._hideModule(this._curCol, this._maxCol - 1);
    }

    this.extraModulesExpanded = !this.extraModulesExpanded;
    (0, _toggleClass2.default)(this._viewMoreButton, 'hide');
    (0, _toggleClass2.default)(this._viewLessButton, 'hide');
  };

  /**
   * Handle click event when filter toggles are clicked
   */


  Filter.prototype.toggleFilterClick = function toggleFilterClick() {
    if (this.initializingFilter) {
      this.initializingFilter = false;
    }

    this.toggleFilter();
  };

  /**
   * To hide or show filter module
   * @params {String} toggle; collapse; expand;
   * @params {Boolean} Change the value of `this._isFilterExpanded` based on the boolean value
   */


  Filter.prototype.toggleFilter = function toggleFilter(option, noStateChange) {
    if ((0, _hasClass2.default)(this.el, 'spark-filter--initializing') && !this.initializingFilter) {
      (0, _removeClass2.default)(this.el, 'spark-filter--initializing');
      (0, _addClass2.default)(this.el, 'spark-filter--initialized');
    }

    if (option === 'expand') {
      if (!this.initializingFilter) {
        (0, _removeClass2.default)(this._filterContent, 'hide');

        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand'
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      } else {
        (0, _removeClass2.default)(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = true;
      }
    } else if (option === 'collapse') {
      if (!this.initializingFilter) {
        (0, _addClass2.default)(this._filterContent, 'hide');

        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse'
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      } else {
        (0, _addClass2.default)(this._filterContent, 'hide');
      }

      if (!noStateChange) {
        this._isFilterExpanded = false;
      }
    } else {
      (0, _toggleClass2.default)(this._filterContent, 'hide');

      if ((0, _hasClass2.default)(this.el, 'filter-expanded')) {
        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'collapse'
        });

        this._toggleFilterLabel.innerHTML = 'Show';
      } else {
        (0, _height2.default)({
          el: this.el,
          toggleEl: '.spark-filter__content',
          toggleClass: 'filter-expanded',
          action: 'expand'
        });

        this._toggleFilterLabel.innerHTML = 'Hide';
      }

      if (!noStateChange) {
        this._isFilterExpanded = !this._isFilterExpanded;

        if ((0, _hasClass2.default)(this.el, 'spark-filter--dropdown') && !(0, _hasClass2.default)(this._filterContent, 'hide')) {
          this._calculateApplyBtnPosition();
        }
      }
    }

    if (!(0, _hasClass2.default)(this.el, 'spark-filter--dropdown') && (0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
      clearTimeout(this._timeout);
      this._filterFooter.removeAttribute('style');
      this._buttonGroupEl.removeAttribute('style');
      (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
    }

    this._dispatchVisibilityEvent();
  };

  /**
   * On-resize handler that updates layout as needed based on screen dimensions
   */


  Filter.prototype._onResize = function _onResize() {
    this._updateFilterLayout();
  };

  /**
   * On-scroll handler that determines Apply button positioning at the xs breakpoint
   */


  Filter.prototype._onScroll = function _onScroll() {
    if (this._isDropdownState) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  };

  /**
   * Callback triggered after the expansion of a module at the xs breakpoint
   */


  Filter.prototype._onAfterExpand = function _onAfterExpand() {
    if (!(0, _hasClass2.default)(this._buttonGroupEl, 'is-fixed')) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  };

  /**
   * Callback triggered after the collapse of a module at the xs breakpoint
   */


  Filter.prototype._onAfterCollapse = function _onAfterCollapse() {
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  };

  /**
   * Callback triggered after Show all is complete at the xs breakpoint
   */

  /* TODO: This is not required anymore as show all is not available at the xs breakpoint anymore
  _onShowAllComplete() {
    if(this._isDropdownState) {
      this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
    }
  }
  */

  /**
   * Dispatch a custom event so content inside the Filter can respond
   */


  Filter.prototype._dispatchVisibilityEvent = function _dispatchVisibilityEvent() {
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.el.dispatchEvent(e);
  };

  /**
   * Calculate the position of the Apply button at the xs breakpoint
   */


  Filter.prototype._calculateApplyBtnPosition = function _calculateApplyBtnPosition() {

    var filterOffsets = this.el.getBoundingClientRect();

    if (filterOffsets.height > 255) {
      // 3 collapsed module heights + filter header height = 255
      var windowHeight = window.innerHeight;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var filterHiddenBefore = scrollTop - (filterOffsets.top + document.body.scrollTop);
      var filterHiddenAfter = filterOffsets.top + document.body.scrollTop + filterOffsets.height - (scrollTop + windowHeight);

      if (!(scrollTop > filterOffsets.top + document.body.scrollTop + filterOffsets.height || filterOffsets.top + document.body.scrollTop > scrollTop + window.innerHeight)) {
        var percentInView = 100;
        var inViewport;
        var hiddenBefore = 0;
        var hiddenAfter = 0;

        if (filterHiddenBefore > 0) {
          percentInView -= filterHiddenBefore * 100 / filterOffsets.height;
          hiddenBefore = filterHiddenBefore;
        }

        if (filterHiddenAfter > 0) {
          percentInView -= filterHiddenAfter * 100 / filterOffsets.height;
          hiddenAfter = filterHiddenAfter;
        }

        inViewport = (filterOffsets.height - (hiddenAfter + hiddenBefore)) / windowHeight * 100;
      }

      if (filterOffsets.bottom > (window.innerHeight || document.documentElement.clientHeight) && (percentInView > 45 || inViewport > 50)) {
        var buttonGroupHeight = this._buttonGroupEl.offsetHeight;
        var filterWidth = filterOffsets.width;

        this._filterFooter.style.height = buttonGroupHeight + 'px';
        (0, _addClass2.default)(this._buttonGroupEl, 'is-fixed');
        this._buttonGroupEl.style.width = filterWidth - 2 + 'px'; // accounting for border width
        this._buttonGroupEl.style.left = filterOffsets.left + 1 + 'px'; // accounting for left border

        this._applyBtnPositionFixed();
      } else {
        this._applyBtnPositionRelative();
      }
    }
  };

  /**
   * Set position:relative for the Apply button
   */


  Filter.prototype._applyBtnPositionRelative = function _applyBtnPositionRelative() {

    //function attachApplyBtn(){
    var currentButtonPosition = parseInt(getComputedStyle(this._buttonGroupEl).bottom);
    var listBottom = this._modulesContainer.getBoundingClientRect().bottom;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var buttonGroupHeight = this._buttonGroupEl.getBoundingClientRect().height;
    var distanceToMove = viewportHeight - (listBottom + buttonGroupHeight);

    if (!isNaN(currentButtonPosition)) {
      var animationListener = function animationListener() {
        this._filterFooter.removeAttribute('style');
        this._buttonGroupEl.removeAttribute('style');
        (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');
        (0, _removeClass2.default)(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
        this._buttonGroupEl.removeEventListener('animationend', animationListener);
      };

      this._buttonGroupEl.addEventListener('animationend', animationListener.bind(this), false);

      var keyframe = '-webkit-transform: translateY(-' + distanceToMove + 'px); transform: translateY(-' + distanceToMove + 'px);';

      this._buttonGroupEl.setAttribute('style', this._buttonGroupEl.getAttribute('style') + ' ' + keyframe);
      (0, _addClass2.default)(this._buttonGroupEl, 'spark-filter__apply-btn-container--animate');
    }
  };

  /**
   * Set position:fixed for the Apply button
   */


  Filter.prototype._applyBtnPositionFixed = function _applyBtnPositionFixed() {
    var requestID = requestAnimationFrame(moveApplyBtn.bind(this));
    var incrementer = .1;

    function moveApplyBtn() {
      incrementer += .01;
      var currentButtonPosition = parseInt(getComputedStyle(this._buttonGroupEl).bottom);
      var buttonHeight = parseInt(getComputedStyle(this._buttonGroupEl).height);

      if (currentButtonPosition < buttonHeight * -1) {
        currentButtonPosition = buttonHeight * -1;
      }

      if (currentButtonPosition > -1) {
        this._buttonGroupEl.style.bottom = '0px';
        cancelAnimationFrame(requestID);
      } else if (currentButtonPosition < 0) {
        currentButtonPosition += 1 / incrementer;
        this._buttonGroupEl.style.bottom = currentButtonPosition + 'px';
        requestAnimationFrame(moveApplyBtn.bind(this));
      }
    }
  };

  /**
   * Callback for Clear all
   */


  Filter.prototype._onClearAll = function _onClearAll() {
    (this.onClearAll || noop)();
  };

  /**
   * Show all modules
   */


  Filter.prototype._showModule = function _showModule() {
    for (var i = 0; i < this.moduleEls.length; i++) {
      (0, _removeClass2.default)(this.moduleEls[i], 'hide');
    }
  };

  /**
   * Hide certain modules
   * @param {Number} start index
   * @param {Number} end index
   */


  Filter.prototype._hideModule = function _hideModule(start, end) {
    end = end || this.moduleEls.length - 1;
    for (var i = start; i <= end; i++) {
      (0, _addClass2.default)(this.moduleEls[i], 'hide');
    }
  };

  /**
   * Apply Expand/Collapse layout for the filter
   * Used when the filter gets to the xs breakpoint
   */


  Filter.prototype._applyExpandCollapseLayout = function _applyExpandCollapseLayout() {
    (0, _addClass2.default)(this.el, 'spark-filter--dropdown');
    this._expandCollapseState = true;

    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        (0, _addClass2.default)(tags[i], 'hide');
      }
      (0, _removeClass2.default)(this._tagsCounter, 'hide');
    }

    (0, _addClass2.default)(this._viewMoreButton, 'hide');
    (0, _addClass2.default)(this._viewLessButton, 'hide');

    if (this._applyFiltersButton) {
      (0, _removeClass2.default)(this._applyFiltersButton, 'spark-btn--sm');
      (0, _addClass2.default)(this._applyFiltersButton, 'spark-btn--block');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._applyExpand();
    }

    this._isDropdownState = true;
    this._timeout = setTimeout(this._calculateApplyBtnPosition.bind(this), 300);
  };

  /**
   * Remove Expand/Collapse layout and apply the horizontal layout for the filter
   * Used when the screen size is larger than the xs breakpoint
   */


  Filter.prototype._removeExpandCollapseLayout = function _removeExpandCollapseLayout() {

    (0, _removeClass2.default)(this.el, 'spark-filter--dropdown');
    this._expandCollapseState = false;
    this._filterFooter.removeAttribute('style');
    this._buttonGroupEl.removeAttribute('style');
    (0, _removeClass2.default)(this._buttonGroupEl, 'is-fixed');

    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        (0, _removeClass2.default)(tags[i], 'hide');
      }
      (0, _addClass2.default)(this._tagsCounter, 'hide');
    }

    if (this.extraModulesExpanded) {
      (0, _removeClass2.default)(this._viewLessButton, 'hide');
    } else {
      (0, _removeClass2.default)(this._viewMoreButton, 'hide');
    }

    if (this._applyFiltersButton) {
      (0, _addClass2.default)(this._applyFiltersButton, 'spark-btn--sm');
      (0, _removeClass2.default)(this._applyFiltersButton, 'spark-btn--block');
    }

    for (var j = 0; j < this.moduleInsts.length; j++) {
      this.moduleInsts[j]._disapplyExpand();
    }
    this._isDropdownState = false;
  };

  /**
   * Generate a tag element in filter, which will be directly posted inside `.spark-filter__tags-container`
   * @param {string} input name - Name of the input to allow any callbacks to target input specifically
   * @param {string} tag label - The label to be displayed in the tag. This could be the input's label or another user defined label
   * @param {function} callback function for `X` button
   */


  Filter.prototype.createTagEl = function createTagEl(input, label, clearCallback) {
    var tagEl = document.createElement('div');
    tagEl.className = (0, _hasClass2.default)(this.el, 'spark-filter--dropdown') ? 'spark-filter__tag hide' : 'spark-filter__tag';
    tagEl.setAttribute('data-filter-name', input);
    tagEl.innerHTML = '<span class="spark-filter__tag__label">' + label + '</span><i class="spark-icon spark-filter__tag__close"></i>';

    this._tagsContainer.insertBefore(tagEl, this._clearAllButton);

    // create event listener after adding element to DOM
    tagEl.querySelector('.spark-filter__tag__close').addEventListener('click', clearCallback || noop);

    (0, _removeClass2.default)(this._clearAllButton, 'hide');

    // Show tag count if on small screen and this is initial application of filters
    if ((0, _hasClass2.default)(this.el, 'spark-filter--dropdown')) (0, _removeClass2.default)(this._tagsCounter, 'hide');
  };

  /**
   * Remove all tags
   */


  Filter.prototype.clearAllTagEls = function clearAllTagEls() {
    var tags = this._tagsContainer.querySelectorAll('.spark-filter__tag');
    for (var i = 0; i < tags.length; i++) {
      this._tagsContainer.removeChild(tags[i]);
    }

    // Reset counter
    var counter = this._tagsContainer.querySelector('span');
    counter.innerHTML = '0';

    (0, _addClass2.default)(this._clearAllButton, 'hide');
    (0, _addClass2.default)(this._tagsCounter, 'hide');
  };

  /**
   * Show Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.showModuleClearButton = function showModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].enableClearBtn();
      }
    }
  };

  /**
   * Disable Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.disableModuleClearButton = function disableModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].disableClearBtn();
      }
    }
  };

  /**
   * Hide Module Clear Button
   * @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.hideModuleClearButton = function hideModuleClearButton(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        this.moduleInsts[i].hideClearBtn();
      }
    }
  };

  /**
   * Get Module Clear button status
   *  @param {Element} moduleName An identifier for the module being targeted
   */


  Filter.prototype.moduleClearButtonStatus = function moduleClearButtonStatus(moduleName) {
    for (var i = 0; i < this.moduleInsts.length; i++) {
      if (this.moduleInsts[i].el.getAttribute('data-filter-module') === moduleName) {
        return this.moduleInsts[i].getClearButtonStatus();
      }
    }
  };

  return Filter;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Filter.prototype._whitelistedParams = ['onClearAll', 'moduleOptions'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Filter.prototype.defaults = {
  el: null,
  moduleEls: [],
  _filterToggleContainer: null,
  _toggleFilterButton: null,
  _toggleFilterLabel: null,
  _tagsContainer: null,
  _tagsCounter: null,
  _clearAllButton: null,
  _filterContent: null,
  _modulesContainer: null,
  _viewMoreButton: null,
  _viewLessButton: null,
  _filterFooter: null,
  _buttonGroupEl: null,
  _applyFiltersButton: null,
  moduleInsts: [],
  moduleOptions: [],
  maxCol: 4,
  onClearAll: noop,
  extraModulesExpanded: false,
  _isFilterExpanded: false,
  _isDropdownState: false,
  _isModuleExpand: true,
  _curCol: 4,
  _onResizeBound: null,
  _toggleViewBound: null,
  _toggleFilterClickBound: null,
  _onClearAllBound: null,
  _onScrollBound: null
};

exports.default = Filter;
module.exports = exports['default'];


},{"../helpers/animation/height":29,"../helpers/dom/add-class":36,"../helpers/dom/breakpoint":37,"../helpers/dom/has-class":38,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"./base":1,"./filter-module":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getIndex = require('../helpers/traversal/get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

var _appendChildren = require('../helpers/manipulation/append-children');

var _appendChildren2 = _interopRequireDefault(_appendChildren);

var _insertBefore = require('../helpers/manipulation/insert-before');

var _insertBefore2 = _interopRequireDefault(_insertBefore);

var _breakpoint = require('../helpers/dom/breakpoint');

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _getParents = require('../helpers/traversal/get-parents');

var _getParents2 = _interopRequireDefault(_getParents);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Header
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A primary page header/navigation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Header(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Alternate breakpoint values.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   breakpoints: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    xs: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      min: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      max: 639
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    // ...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/header.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Header = function (_BaseComponent) {
  _inherits(Header, _BaseComponent);

  /**
   * Header constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Header(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Header);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._determineInitialSize();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Update the elements used.
   * @param {Element} el Optional
   */


  Header.prototype.update = function update(el) {

    this._removeEventListeners();
    this._removePlaceholder();
    this._cacheElements(el || this.el);
    this._parseParams();
    this._addEventListeners();
    this._ensureActiveAtMoreSwapIndex();
    this.checkFixed();

    // Run on the next frame so sizes have updated
    setTimeout(function () {
      this._determineMenuSize();
    }.bind(this), 0);

    return this;
  };

  /**
   * Check of we should be fixed.
   */


  Header.prototype.checkFixed = function checkFixed() {

    if (!this.fixed) {
      return this;
    }

    var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : window.document.body.scrollTop;
    var isCondensed = scrollTop > this.fixedDistance;
    (0, _toggleClass2.default)(this.el, 'spark-header--condensed', isCondensed);
    (0, _toggleClass2.default)(document.body, 'spark-header-condensed', isCondensed);

    return this;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Header.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.navEl = this.el.querySelector('.spark-header__nav');
    this.menuEl = this.navEl && this.navEl.querySelector('.spark-header__menu');
    this.listEl = this.menuEl && this.menuEl.querySelector('.spark-header__list');
    this.toggleEl = this.el.querySelector('.spark-header__toggle');

    // Create a new instance of the menu component
    if (this.menuEl) {
      this.menu = new _menu2.default(this.menuEl, {
        onToggle: this._onToggleClickBound = this._onToggleClick.bind(this)
      });
    }

    // The items in the list need to show/hide based on the width of the container.
    // Cache these items so we can manipulate their display independent of what is
    // currently in the DOM. Also, create the "More" dropdown which will be shown
    // and hidden based on availabile space.
    if (this.listEl && this.listEl.children.length) {
      this.listEls = Array.prototype.slice.call(this.listEl.children, 0);
      this._createListMore();
    }

    // Create a clone of the header which will NOT be affected by changes in breakpoint.
    // This lets us continue to measure how many list elements will fit. Since we go to the
    // "condensed" view when we are at the sm/xs breakpoint OR only one item will fit in the nav,
    // we can't rely on breakpoints alone to determine what to show. Without a cloned placeholder
    // it is impossible to continue to measure the available space once we show the condensed view.
    if (this.listEl) {
      this._createPlaceholder();
    }
  };

  /**
   * Parse parameters from the elements.
   */


  Header.prototype._parseParams = function _parseParams() {
    this.fixed = this.fixed !== null ? this.fixed : (0, _hasClass2.default)(this.el, 'spark-header--fixed');
    this.fixedDistance = this.fixedDistance !== null ? this.fixedDistance : (0, _parseAttribute.number)(this.el, 'data-fixed-distance', 10);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Header.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._determineInitialSizeBound = this._determineInitialSize.bind(this);
    this._onResizeBound = this._onResize.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    this._onMoreClickBound = this._onMoreClick.bind(this);
    this._onNavClickBound = this._onNavClick.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Header.prototype._addEventListeners = function _addEventListeners() {

    if (!this.listEl) {
      return;
    }

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    if (this.listMoreEl) {
      this.listMoreListEl.addEventListener('click', this._onMoreClickBound);
    }

    if (this.toggleEl) {
      this.toggleEl.addEventListener('click', this._onToggleClickBound);
    }

    if (this.navEl) {
      this.navEl.addEventListener('click', this._onNavClickBound);
    }

    if (this.fixed) {
      window.addEventListener('scroll', this._onScrollBound);
    }
  };

  /**
   * Remove event listeners for DOM events..
   */


  Header.prototype._removeEventListeners = function _removeEventListeners() {

    if (!this.listEl) {
      return;
    }

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    if (this.listMoreEl) {
      this.listMoreListEl.removeEventListener('click', this._onMoreClickBound);
    }

    if (this.toggleEl) {
      this.toggleEl.removeEventListener('click', this._onToggleClickBound);
    }

    if (this.navEl) {
      this.navEl.removeEventListener('click', this._onNavClickBound);
    }

    if (this.fixed) {
      window.removeEventListener('scroll', this._onScrollBound);
    }
  };

  /**
   * Get the current breakpoint for the header.
   */


  Header.prototype._getCurrentBreakpoint = function _getCurrentBreakpoint() {
    this.lastBreakpoint = this.currentBreakpoint;
    this.currentBreakpoint = (0, _breakpoint.get)(this.el.clientWidth, this.breakpoints);
    this.el.setAttribute('data-breakpoint', this.currentBreakpoint);
  };

  /**
   * Create a placeholder for the whole header so that we can keep track
   * of the width of each child element regardless of whether or not we're
   * condensed. Condensed styles do not apply to instances of the element
   * with the placeholder class.
   */


  Header.prototype._createPlaceholder = function _createPlaceholder() {

    var div = document.createElement('div');
    div.innerHTML = this.navEl.outerHTML;

    var el = div.children[0];
    el.setAttribute('aria-hidden', true);

    (0, _addClass2.default)(el, 'spark-header__placeholder');

    this.el.appendChild(el);

    // Cache the common elements
    this.placeholder = {
      el: el,
      menuEl: el.querySelector('.spark-header__menu'),
      listEl: el.querySelector('.spark-header__list')
    };

    // Add a copy of the "more" button to the list so we always know what size it would be
    if (this.listMoreEl) {
      this.placeholder.listEl.innerHTML += this.listMoreEl.outerHTML;
      this.placeholder.listMoreEl = this.placeholder.listEl.querySelector('.spark-header__more');
    }

    this._disablePlaceholderLinkTab(el);
  };

  /**
   * Remove the placeholder
   */


  Header.prototype._removePlaceholder = function _removePlaceholder() {

    if (this.placeholder) {
      this.placeholder.el.parentNode.removeChild(this.placeholder.el);
      this.placeholder.menuEl.parentNode.removeChild(this.placeholder.menuEl);
      this.placeholder.listEl.parentNode.removeChild(this.placeholder.listEl);
    }

    if (this.listMoreEl) {
      this.placeholder.listMoreEl.parentNode.removeChild(this.placeholder.listMoreEl);
    }
  };

  /**
   * Disable tabbing for items in the placeholder.
   * @param {Element} el
   */


  Header.prototype._disablePlaceholderLinkTab = function _disablePlaceholderLinkTab(el) {

    // Set a negative tab index on each link in the placeholder
    var links = el.querySelectorAll('.spark-menu__list-link, .spark-menu__list-expand');
    var i = 0;
    var len = links.length;

    for (; i < len; i++) {
      links.item(i).setAttribute('tabindex', -1);
    }

    // Set a negative tab index on each button in the placeholder
    var buttons = el.querySelectorAll('button');
    var k = 0;
    len = buttons.length;

    for (; k < len; k++) {
      buttons.item(k).setAttribute('tabindex', -1);
    }
  };

  /**
   * Create a place to store overflow items of the list.
   * Also add this item to the placeholder element so we always know
   * which size it would be.
   */


  Header.prototype._createListMore = function _createListMore() {

    var div = document.createElement('div');
    div.innerHTML = '<li><a class="spark-menu__list-link spark-menu__ignore" tabindex="0" title="More Items"><i class="spark-icon-menu-ellipsis-horizontal spark-icon--fill"></i></a><ul class="spark-menu__list"></ul></li>';

    var li = div.children[0];
    (0, _addClass2.default)(li, 'spark-menu__list-item spark-header__more');

    this.listMoreEl = li;
    this.listMoreListEl = li.querySelector('ul');
  };

  /**
   * Determine the menu size..
   */


  Header.prototype._determineInitialSize = function _determineInitialSize() {
    (0, _addClass2.default)(this.el, 'spark-header--visible');
    this._ensureActiveAtMoreSwapIndex();
    this._determineMenuSize();
  };

  /**
   * Determine how many nav items can fit.
   * @param {Boolean} isSwap Optional Is this a swapping event? If so, ignore redundancy checks.
   */


  Header.prototype._determineMenuSize = function _determineMenuSize(isSwap) {

    // Don't do anything w/o primary nav.
    if (!this.listEls || !this.listEls.length) {
      return;
    }

    // If we're at the XS or SM breakpoint, don't worry about this stuff.
    if (this._isMenuBreakpoint(['xs', 'sm'])) {
      this._removeListMore();
      return this._toggleCollapsed(true);
    }

    // Get the items to show and hide
    var items = this._getItemsToShowAndHide();

    // Add a class saying that the size has been determined. This removes the overflow:hidden
    // so that dropdowns will appear.
    (0, _addClass2.default)(this.el, 'spark-header--overflow-checked');

    // If there are less than two elements to show and we have hidden elements, collapse the nav.
    if (items.show.length < 2 && items.hide.length) {
      this._removeListMore();
      return this._toggleCollapsed(true);
    }

    // We aren't at the XS breakpoint and there aren't too few items to show, so disable collapsing
    this._toggleCollapsed(false);

    // If the number of children to hide is the same as those already hidden, stop.
    if (items.hide.length === this.listMoreListEl.children.length && !isSwap) {

      if (!items.hide.length) {
        this._removeListMore();
      }

      return;
    }

    // Add the elements we're supposed to show before the "more element"
    (0, _insertBefore2.default)(this.listEl, this.listMoreEl, items.show);

    // If we have items to hide, append them to the more element
    if (items.hide.length) {
      (0, _appendChildren2.default)(this.listMoreListEl, items.hide);
    }
    // Otherwise, remove the more element
    else {
        this._removeListMore();
      }
  };

  /**
   * Listen for the ready state change and rerun the menu size determination.
   */


  Header.prototype._listenForReadyStateChange = function _listenForReadyStateChange() {

    // Already loaded
    if (document.readyState === 'complete' || document.readyState === 'loaded') {
      return;
    }

    // Bound listener
    var run = function () {
      if (document.readyState === 'complete' || document.readyState === 'loaded') {
        this._determineMenuSize();
        document.removeEventListener('readystatechange', run);
      }
    }.bind(this);

    // Only run once
    document.addEventListener('readystatechange', run);
  };

  /**
   * Check the primary nav breakpoint.
   * @param {String|Array} name A string or array of string names of breakpoints to check for
   */


  Header.prototype._isMenuBreakpoint = function _isMenuBreakpoint(name) {
    this._getCurrentBreakpoint();
    return name instanceof Array ? name.indexOf(this.currentBreakpoint) !== -1 : this.currentBreakpoint === 'xs';
  };

  /**
   * Get the items to show and hide.
   * @return {Object}
   */


  Header.prototype._getItemsToShowAndHide = function _getItemsToShowAndHide() {

    var width = this.placeholder.listEl.clientWidth;
    var children = this.placeholder.listEl.children;
    var i = 0;
    var len = children.length;
    var hideIndex = -1;

    this._addListMore();

    // Always include the width of the more button.
    var childrenWidth = this.placeholder.listMoreEl.clientWidth || 0;

    // Loop through the children until we hit a point where they don't fit anymore
    for (; i < len && hideIndex === -1; i++) {
      childrenWidth += children[i].clientWidth;
      if (childrenWidth > width) {
        hideIndex = i;
      }
    }

    // Find all the children that fit and don't fit
    var items = {
      show: hideIndex !== -1 ? Array.prototype.slice.call(this.listEls, 0, hideIndex) : this.listEls,
      hide: hideIndex !== -1 ? Array.prototype.slice.call(this.listEls, hideIndex) : []
    };

    // If we have an index to swap for the last "show" element, replace that element
    if (this.moreSwapIndex > -1 && this.moreSwapIndex >= items.show.length) {

      // Remove the last element from the show array
      var toHide = items.show.splice(items.show.length - 1, 1)[0];

      // Get the index to remove from the hide array. Account for the offset.
      var toShowIndex = this.moreSwapIndex - hideIndex;

      // Remove the desired element from the hide array
      var toShow = items.hide.splice(toShowIndex, 1)[0];

      // Add the toShow element to the end of the show array
      items.show.push(toShow);

      // Insert the toHide element into the hide array at the position of
      // the element we just removed from the hide array.
      items.hide.splice(toShowIndex, 0, toHide);
    }

    return items;
  };

  /**
   * Ensure that any active item is set to the more swap index. This ensures
   * that the active item is always visible on the screen.
   */


  Header.prototype._ensureActiveAtMoreSwapIndex = function _ensureActiveAtMoreSwapIndex() {

    if (!this.listEls || !this.listEls.length) {
      return;
    }

    var el = this.el.querySelector('[class*="list-item"].active');
    if (el) {
      var parents = (0, _getParents2.default)(el, '.spark-menu__list-item', this.el);

      if (parents && parents[parents.length - 1]) {
        el = parents[parents.length - 1];
      }

      var index = (0, _getIndex2.default)(this.listEls, el);

      if (index !== this.moreSwapIndex) {
        this.moreSwapIndex = index;
      }
    }
  };

  /**
   * Add a placeholder for overflow items to the list.
   */


  Header.prototype._addListMore = function _addListMore() {
    if (this.listMoreEl.parentNode !== this.listEl) {
      this.listEl.appendChild(this.listMoreEl);
    }
  };

  /**
   * Remove a placeholder for overflow items from the primary nav.
   */


  Header.prototype._removeListMore = function _removeListMore() {
    if (this.listMoreEl.parentNode) {
      this.listMoreEl.parentNode.removeChild(this.listMoreEl);
    }
  };

  /**
   * Reset the children of the primary navigation.
   */


  Header.prototype._resetMenuChildren = function _resetMenuChildren() {
    this.moreSwapIndex = -1;
    (0, _removeClass2.default)(this.el, 'spark-header--overflow-checked');
    (0, _appendChildren2.default)(this.listEl, this.listEls);
  };

  /**
   * Toggle the collapsed nav style.
   * @param {Boolean} enable
   */


  Header.prototype._toggleCollapsed = function _toggleCollapsed(enable) {

    // Same collapsed state is already set
    if (enable === this.isCollapsed) {
      return;
    }

    // Reset children and remove a special no-animate class to top-level items when we collapse
    if (enable) {
      this._enableTopLevelToggling();
      this._resetMenuChildren();
    } else {
      if (this.menu) {
        this.menu._removeAllCachedLists();
      }
      this._disableTopLevelToggling();
    }

    this.isCollapsed = enable;
    (0, _toggleClass2.default)(this.el, 'spark-header--collapsed', enable);
    (0, _toggleClass2.default)(this.el, 'spark-header--visible', !enable);
  };

  /**
   * Enable toggling on top-level items.
   */


  Header.prototype._enableTopLevelToggling = function _enableTopLevelToggling() {

    var i = 0;
    var len = this.listEls.length;

    for (; i < len; i++) {
      (0, _removeClass2.default)(this.listEls[i], 'spark-no-animate');
    }
  };

  /**
   * Disable toggling on top-level items.
   */


  Header.prototype._disableTopLevelToggling = function _disableTopLevelToggling() {

    var i = 0;
    var len = this.listEls.length;

    for (; i < len; i++) {
      (0, _addClass2.default)(this.listEls[i], 'spark-no-animate');
    }
  };

  /**
   * When the window resizes, redetermine the size of the primary nav elements.
   */


  Header.prototype._onResize = function _onResize() {

    // Ensure that any active item we may have is at the swap index
    this._ensureActiveAtMoreSwapIndex();
    this._determineMenuSize();

    // If we are fixed, do the scroll check
    if (this.fixed) {
      this.checkFixed();
    }
  };

  /**
   * Check to see if the header should be fixed.
   * @param {Object} e
   */


  Header.prototype._onScroll = function _onScroll() {
    this.checkFixed();
  };

  /**
   * When a link in the more list is clicked, swap it with the last element in the visible list.
   * @param {Object} e
   */


  Header.prototype._onMoreClick = function _onMoreClick(e) {

    // Don't do any swapping if we're in a collapsed state
    if (this.isCollapsed) {
      return;
    }

    // Get the index of the clicked element
    var li = (0, _getParent2.default)(e.target, 'li', this.listMoreListEl);

    // Save the index of the element to be swapped
    this.moreSwapIndex = (0, _getIndex2.default)(this.listEls, li);

    // Redetermine the primary nav size
    this._determineMenuSize(true);
  };

  /**
   * When the toggle is clicked, toggle the active state on the nav
   * @param {Object} e
   */


  Header.prototype._onToggleClick = function _onToggleClick(e) {
    e.preventDefault();
    this.isActive = !this.isActive;
    (0, _toggleClass2.default)(this.navEl, 'active', this.isActive);
    this.menu._openActiveParents();
  };

  /**
   * When the nav is clicked, set to inactive.
   * @param {Object} e
   */


  Header.prototype._onNavClick = function _onNavClick(e) {
    if (e.target === this.navEl && this.isCollapsed) {
      this.isActive = !this.isActive;
      (0, _removeClass2.default)(this.navEl, 'active');
    }
  };

  return Header;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Header.prototype._whitelistedParams = ['breakpoints', 'fixed', 'fixedDistance'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Header.prototype.defaults = {
  el: null,
  fixed: null,
  fixedDistance: null,
  navEl: null,
  menuEl: null,
  listEl: null,
  listEls: null,
  listMoreEl: null,
  listMoreListEl: null,
  placeholder: null,
  toggleEl: null,
  lastBreakpoint: null,
  currentBreakpoint: null,
  isActive: false,
  isCollapsed: null,
  moreSwapIndex: -1,
  menu: null,
  breakpoints: null,
  _onResizeBound: null,
  _onScrollBound: null,
  _onMoreClickBound: null,
  _onToggleClickBound: null,
  _onNavClickBound: null
};

exports.default = Header;
module.exports = exports['default'];


},{"../helpers/dom/add-class":36,"../helpers/dom/breakpoint":37,"../helpers/dom/has-class":38,"../helpers/dom/parse-attribute":42,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"../helpers/manipulation/append-children":49,"../helpers/manipulation/insert-before":51,"../helpers/traversal/get-index":57,"../helpers/traversal/get-parent":58,"../helpers/traversal/get-parents":59,"./base":1,"./menu":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

var _transform = require('../helpers/css/transform');

var _transform2 = _interopRequireDefault(_transform);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _getParents = require('../helpers/traversal/get-parents');

var _getParents2 = _interopRequireDefault(_getParents);

var _getChild = require('../helpers/traversal/get-child');

var _getChild2 = _interopRequireDefault(_getChild);

var _wrapElement = require('../helpers/manipulation/wrap-element');

var _wrapElement2 = _interopRequireDefault(_wrapElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Menu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Menu(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Callback method for when the menu toggles.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onToggle: function(){}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/menu.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Menu = function (_BaseComponent) {
  _inherits(Menu, _BaseComponent);

  /**
   * Menu constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Menu(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Menu);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._checkAnimation();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Menu.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-menu__toggle');
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Menu.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Menu.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('focus', this._onFocusBound, true);
    this.el.addEventListener('blur', this._onBlurBound, true);
    this.el.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Menu.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('focus', this._onFocusBound);
    this.el.removeEventListener('blur', this._onBlurBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Toggle the open state of an item.
   * @param {Element} item
   */


  Menu.prototype._toggleItem = function _toggleItem(item) {

    if ((0, _hasClass2.default)(item, 'open')) {
      this._closeItem(item);
    } else {
      this._openItem(item);
    }
  };

  /**
   * Toggle aria-checked state of the Expand/Collapse toggle carets
   * @param {Element} item
   */


  Menu.prototype._toggleAriaCheckedState = function _toggleAriaCheckedState(item) {
    if (item.hasAttribute('aria-checked')) {
      var ariaState = item.getAttribute('aria-checked') === 'true';
      item.setAttribute('aria-checked', String(!ariaState));
    }
  };

  /**
   * Check for a nested list and create the wrappers needed
   * for animating the lists
   *
   */


  Menu.prototype._checkAnimation = function _checkAnimation() {
    if (this.el.querySelector('.spark-menu__list-next')) {
      this.cachedList = this.cachedList || [];
      this._createMenuAnimationWrapper();
      this._animateListChange();
    }
  };

  /**
   * Create wrapper class to help with animation of sliding lists
   *
   */


  Menu.prototype._createMenuAnimationWrapper = function _createMenuAnimationWrapper() {
    if (this.wrapperEl) {
      return;
    }

    var wrapperEl = document.createElement('div');
    (0, _addClass2.default)(wrapperEl, 'spark-menu__animation-wrapper');
    (0, _wrapElement2.default)(this.el.querySelector('.spark-menu__list'), wrapperEl);
    this.wrapperEl = wrapperEl;
  };

  /**
   * Animate the position of the animation wrapper. Optionally, do
   * so immediately without waiting for an animation.
   * @param {Boolean} noAnimate
   */


  Menu.prototype._animateListChange = function _animateListChange(noAnimate) {

    if (noAnimate) {
      (0, _addClass2.default)(this.wrapperEl, 'no-animate');
    }

    this.wrapperEl.setAttribute('style', (0, _transform2.default)('translateX', '-' + this.cachedList.length * 100 + '%'));

    if (noAnimate) {
      setTimeout(function () {
        (0, _removeClass2.default)(this.wrapperEl, 'no-animate');
      }.bind(this), 1);
    }
  };

  /**
   * Append list to menu element
   * @param {Element} list
   * @param {Boolean} noAnimate
   */


  Menu.prototype._appendList = function _appendList(item, noAnimate) {

    // Create wrapper
    this._createMenuAnimationWrapper();

    var newList = item.cloneNode(true);
    (0, _addClass2.default)(newList, 'nestedList');
    newList.setAttribute('data-nested-list-id', newList.getAttribute('id'));
    newList.removeAttribute('id');

    if (this.wrapperEl) {
      // Add child node to wrapper
      this.wrapperEl.appendChild(newList);
      // Add to cached Array to keep track of all added lists
      this.cachedList.push(newList);
      // Slide navigation
      this._animateListChange(noAnimate);
    }
  };

  /**
   * Remove list to nav
   *
   */


  Menu.prototype._removeLastList = function _removeLastList() {
    // If there are any items to remove
    if (this.cachedList.length) {
      // Retrieve last item from list
      var removeElement = this.cachedList.pop();
      if (this.wrapperEl) {
        // Slide navigation
        this._animateListChange();
      }
      window.setTimeout(function () {
        // Remove itself from DOM
        removeElement.parentNode.removeChild(removeElement);
      }, 250);
    }
  };

  /**
   * Remove all lists from panel menu
   *
   */


  Menu.prototype._removeAllCachedLists = function _removeAllCachedLists() {
    if (this.cachedList) {
      // If there are any items to remove
      while (this.cachedList.length) {
        // While there are still items, remove them
        this._removeLastList();
      }
    }
  };

  /**
   * Finds and returns the next nested list
   * @param {Object} item
   * @return {Object}
   */


  Menu.prototype._getNextList = function _getNextList(item) {
    return item.querySelector('.spark-menu__list-next') ? document.querySelector(item.querySelector('.spark-menu__list-next').getAttribute('data-menu')) : null;
  };

  /**
   * Open an item by animating it.
   * @param {Object} item
   */


  Menu.prototype._openItem = function _openItem(item) {

    // Item is already open
    if ((0, _hasClass2.default)(item, 'open')) {
      return;
    }

    (0, _height2.default)({
      el: item,
      toggleEl: '.spark-menu__list'
    });

    (0, _addClass2.default)(item, 'open');
  };

  /**
   * Close an item by animating it shut.
   * @param {Object} item
   */


  Menu.prototype._closeItem = function _closeItem(item) {

    // Item is already closed
    if (!(0, _hasClass2.default)(item, 'open')) {
      return;
    }

    (0, _height2.default)({
      el: item,
      toggleEl: '.spark-menu__list',
      toggleValue: 'none',
      action: 'collapse'
    });

    (0, _removeClass2.default)(item, 'open');
  };

  /**
   * Make an item active.
   * @param {Element} item
   */


  Menu.prototype._activateItem = function _activateItem(item) {

    // Item is already active
    if ((0, _hasClass2.default)(item, 'active')) {
      return;
    }

    // Deactivate any active items
    var parents = (0, _getParents2.default)(item, '.spark-menu__list', this.el);
    this._deactivateItems(parents[parents.length - 1]);
    this._deactivateItemSiblings(item);

    // Add the active class
    (0, _addClass2.default)(item, 'active');

    // If there is a parent that is also a list item, open it.
    this._activateItemParents(item, this.el);
  };

  /**
   * Activate parent items.
   * @param {Element} el
   * @param {Element} limitEl
   */


  Menu.prototype._activateItemParents = function _activateItemParents(el, limitEl) {

    var parents = (0, _getParents2.default)(el.parentNode, '[class*="list-item"]', limitEl);

    var i = 0;
    var len = parents.length;

    // Add the active class
    for (; i < len; i++) {
      this._openItem(parents[i]);
      (0, _addClass2.default)(parents[i], 'child-active');
    }
  };

  /**
   * Deactivate items.
   * @param {Element} el
   */


  Menu.prototype._deactivateItems = function _deactivateItems(el) {

    var actives = el.querySelectorAll('[class*="list-item"].active');
    var i = 0;
    var len = actives.length;

    // Remove the active class
    for (; i < len; i++) {
      (0, _removeClass2.default)(actives.item(i), 'active');
    }
  };

  /**
   * Deactivate siblings items.
   * @param {Element} el
   */


  Menu.prototype._deactivateItemSiblings = function _deactivateItemSiblings(el) {

    var actives = el.parentNode.querySelectorAll('[class*="list-item"].child-active');
    var i = 0;
    var len = actives.length;

    // Remove the active class
    for (; i < len; i++) {
      (0, _removeClass2.default)(actives[i], 'child-active');
      (0, _removeClass2.default)(actives[i], 'open');
    }
  };

  /**
   * Open the parents of the active item.
   *
   */


  Menu.prototype._openActiveParents = function _openActiveParents() {

    var activeItem = this.el.querySelector('.active');
    if (activeItem) {
      var parentItems = (0, _getParents2.default)(activeItem, '.spark-menu__list-item', this.el);
      var itemLinks;
      var nextList;

      for (var i = parentItems.length - 1; i >= 0; i--) {
        itemLinks = (0, _getChild2.default)(parentItems[i], '.spark-menu__list-links');
        if (itemLinks && itemLinks.querySelector('.spark-menu__list-next')) {
          nextList = this._getNextList(parentItems[i]);
          if (nextList && !this._cachedListContainsID(nextList.getAttribute('id'))) {
            this._appendList(nextList, true);
          }
        } else {
          (0, _addClass2.default)(parentItems[i], 'open');
        }
      }
    }
  };

  /**
   * Check if the cached list contains a certain ID
   * @param {String} id
   * @return {Boolean}
   */


  Menu.prototype._cachedListContainsID = function _cachedListContainsID(id) {
    var i = this.cachedList.length;
    while (i--) {
      if (this.cachedList[i].getAttribute('data-nested-list-id') === id) {
        return true;
      }
    }
    return false;
  };

  /**
   * When an item is clicked, make it active. Determine if the click was on an expand
   * button and open the list if so.
   * @todo: It should be possible to opt out of this behavior.
   * @param {Object} e
   */


  Menu.prototype._onClick = function _onClick(e) {

    // Don't make forms active
    if ((0, _getParent2.default)(e.target, 'form', this.el)) {
      return;
    }

    // Toggle the visibility of the menu?
    var toggle = e.target === this.toggleEl || (0, _hasParent2.default)(e.target, this.toggleEl);
    if (toggle) {
      return (this.onToggle || noop)(e, this);
    }

    // Is there a parent to open and an item?
    var open = (0, _getParent2.default)(e.target, '.spark-menu__list-expand', this.el);
    var item = (0, _getParent2.default)(e.target, '.spark-menu__list-item', this.el);

    // If we have no item or have been told to ignore the item
    if (!item || (0, _getParent2.default)(e.target, '.spark-menu__ignore', this.el)) {
      return;
    }
    if (open) {
      this._toggleAriaCheckedState(open);
      return this._toggleItem(item);
    }

    // Check if we have a valid item and we aren't inside the expanded header
    if (item && !(0, _hasParent2.default)(e.target, document.querySelector('.spark-header--visible'))) {

      var next = this._getNextList(item);

      if (next && (0, _hasClass2.default)(e.target, 'spark-menu__list-next')) {
        // Active item
        this._activateItem(item);
        this._appendList(next);
        return;
      }

      var back = (0, _getParent2.default)(e.target, '.spark-menu__list-back', item);

      if (back && (0, _hasClass2.default)(e.target, 'spark-menu__list-back')) {
        this._removeLastList();
        return;
      }
    }

    // Active item
    this._activateItem(item);
  };

  /**
   * When the space or enter key is pressed on a focused item, make it active.
   * Determine if the click was on an expand button or link and open the list if so.
   * @todo: It should be possible to opt out of this behavior.
   * @param {Object} e
   */


  Menu.prototype._onKeydown = function _onKeydown(e) {
    var code = e.keyCode || e.which;

    // Don't make forms active
    if ((0, _getParent2.default)(e.target, 'form', this.el)) {
      return;
    }

    // Toggle the visibility of the menu?
    var toggle = e.target === this.toggleEl || (0, _hasParent2.default)(e.target, this.toggleEl);
    if (toggle) {
      return (this.onToggle || noop)(e, this);
    }

    // Is there a parent to open and an item?
    var open = (0, _getParent2.default)(e.target, '.spark-menu__list-expand', this.el);
    var item = (0, _getParent2.default)(e.target, '.spark-menu__list-item', this.el);

    // If we have no item or have been told to ignore the item
    if (!item || (0, _getParent2.default)(e.target, '.spark-menu__ignore', this.el)) {
      return;
    }
    if (open) {
      if (code === 32 || code === 13) {
        e.preventDefault();
        this._toggleAriaCheckedState(open);
        return this._toggleItem(item);
      }
    }

    // Check if we have a valid item and we aren't inside the expanded header
    if (item && !(0, _hasParent2.default)(e.target, document.querySelector('.spark-header--visible'))) {

      var next = this._getNextList(item);

      if (next && (0, _hasClass2.default)(e.target, 'spark-menu__list-next')) {
        if (code === 32 || code === 13) {
          e.preventDefault();
          // Active item
          this._activateItem(item);
          this._appendList(next);
          return;
        }
      }

      var back = (0, _getParent2.default)(e.target, '.spark-menu__list-back', item);

      if (back && (0, _hasClass2.default)(e.target, 'spark-menu__list-back')) {
        if (code === 32 || code === 13) {
          e.preventDefault();

          this._removeLastList();
          return;
        }
      }
    }

    if (code === 32 || code === 13) {
      this._activateItem(item);
    }
  };

  /**
   * Keep track of when items have focus.
   * @param {Object} e
   */


  Menu.prototype._onFocus = function _onFocus(e) {

    var parent = e.target;
    var lastParent = parent;

    while (parent) {
      parent = (0, _getParent2.default)(lastParent.parentNode, '.spark-menu__list-item', this.el);
      if (!parent || parent === lastParent) break;
      (0, _addClass2.default)(parent, 'has-focus');
      lastParent = parent;
    }
  };

  /**
   * Keep track of when items lose focus.
   * @param {Object} e
   */


  Menu.prototype._onBlur = function _onBlur(e) {

    var parent = e.target;
    var lastParent = parent;

    while (parent) {
      parent = (0, _getParent2.default)(lastParent.parentNode, '.spark-menu__list-item', this.el);
      if (!parent || parent === lastParent) break;
      (0, _removeClass2.default)(parent, 'has-focus');
      lastParent = parent;
    }
  };

  return Menu;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Menu.prototype._whitelistedParams = ['onToggle'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Menu.prototype.defaults = {
  cachedList: null,
  el: null,
  toggleEl: null,
  wrapperEl: null,
  onToggle: null,
  _onClickBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onKeydownBound: null
};

exports.default = Menu;
module.exports = exports['default'];


},{"../helpers/animation/height":29,"../helpers/css/transform":33,"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/remove-class":43,"../helpers/manipulation/wrap-element":52,"../helpers/traversal/get-child":55,"../helpers/traversal/get-parent":58,"../helpers/traversal/get-parents":59,"../helpers/traversal/has-parent":62,"./base":1}],12:[function(require,module,exports){
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
    document.activeElement ? this.focusedElBeforeOpen = document.activeElement : null;

    var modalFocusableEls = this.modalEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    if (modalFocusableEls.length > 0) {
      this.modalFocusableEls = Array.prototype.slice.call(modalFocusableEls);
      this.firstModalFocusableEl = this.modalFocusableEls[0];
      this.lastModalFocusableEl = this.modalFocusableEls[this.modalFocusableEls.length - 1];
    }

    this._addWindowEventListeners();
    this._updateClasses();
    (0, _addClass2.default)(document.body, 'spark-modal-open');

    // Set focus to close button once modal has been displayed
    if (modalFocusableEls.length > 0) {
      this.firstModalFocusableEl.focus();
    }

    return this;
  };

  /**
   * Close
   */


  Modal.prototype.close = function close() {

    this.isActive = false;
    this.focusedElBeforeOpen ? this.focusedElBeforeOpen.focus() : null;
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
    this._onKeydownBound = this._onKeydown.bind(this);
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
    window.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Modal.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('keyup', this._onKeyupBound);
    window.removeEventListener('keydown', this._onKeydownBound);
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
   * When tabbing backwards, localize traversal to modal elements only
   * @param {Object} e
   */


  Modal.prototype._onBackwardTab = function _onBackwardTab(e) {
    if (document.activeElement === this.firstModalFocusableEl) {
      e.preventDefault();
      this.lastModalFocusableEl.focus();
    }
  };

  /**
   * When tabbing forwards, localize traversal to modal elements only
   * @param {Object} e
   */


  Modal.prototype._onForwardTab = function _onForwardTab(e) {
    if (document.activeElement === this.lastModalFocusableEl) {
      e.preventDefault();
      this.firstModalFocusableEl.focus();
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

  /**
   * When a key is pressed and it is the Tab key or Shift+Tab keys, determine whether to adjust focus
   * @param {Object} e
   */


  Modal.prototype._onKeydown = function _onKeydown(e) {
    if (e.keyCode === 9) {
      if (this.modalFocusableEls.length === 1) {
        e.preventDefault();
      }

      if (e.shiftKey) {
        this._onBackwardTab(e);
      } else {
        this._onForwardTab(e);
      }
    }

    if (e.keyCode === 13) {
      if (e.target === document.querySelector('.spark-modal__close') || e.target === document.querySelector('.spark-modal__dismiss')) {
        e.preventDefault();
        this.close();
      }
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
  _onKeydownBound: null,
  _onModalClickBound: null
};

exports.default = Modal;
module.exports = exports['default'];


},{"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"../helpers/traversal/get-parent":58,"./base":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Multiple SelectInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A multiple select input container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new MultiSelectInput(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/multi-select-input.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var MultiSelectInput = function (_BaseComponent) {
  _inherits(MultiSelectInput, _BaseComponent);

  /**
   * MultiSelectInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function MultiSelectInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MultiSelectInput);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Get the value.
   * @return {Array}
   */


  MultiSelectInput.prototype.getValue = function getValue() {

    var vals = [];

    (0, _each2.default)(this._isNative ? this.selectEl.options : this.checkboxEls, function (o) {
      if (o.checked || o.selected) {
        vals.push(o.value);
      }
    });

    return vals;
  };

  /**
   * Set the value.
   * @param {Array} vals
   */


  MultiSelectInput.prototype.setValue = function setValue(vals) {

    var setVals = [];
    var propName = this._isNative ? 'selected' : 'checked';

    (0, _each2.default)(this._isNative ? this.selectEl.options : this.checkboxEls, function (o) {

      if (vals.indexOf(o.value) !== -1) {
        o[propName] = true;
        setVals.push(o.value);
      } else {
        o[propName] = false;
      }
    });

    (this.onChange || noop)(setVals, this);

    return this;
  };

  /**
   * Clear the selected value.
   */


  MultiSelectInput.prototype.clearValue = function clearValue() {
    return this.setValue([]);
  };

  /**
   * Disable entry into the input.
   */


  MultiSelectInput.prototype.disable = function disable() {
    (this.selectEl || this.el).setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable entry into the input.
   */


  MultiSelectInput.prototype.enable = function enable() {
    (this.selectEl || this.el).removeAttribute('disabled');
    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  MultiSelectInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.selectEl = this.el.querySelector('select');
    this.checkboxEls = this.el.querySelectorAll('[type="checkbox"]');

    if (!this.selectEl && !this.checkboxEls.length) throw new Error('Multi select needs either a select input or a series of checkboxes.');

    this.messageEl = this.el.querySelector('.spark-select__message') || (0, _makeElement2.default)('<span class="spark-select__message"></span>');
  };

  /**
   * Parse parameters.
   */


  MultiSelectInput.prototype._parseParams = function _parseParams() {
    this._isNative = this.selectEl ? true : false;
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  MultiSelectInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onInputBound = this._onInput.bind(this);
  };

  /**
   * Add event listeners for focus, blur and input.
   */


  MultiSelectInput.prototype._addEventListeners = function _addEventListeners() {

    if (this._isNative) {
      this.selectEl.addEventListener('change', this._onInputBound);
    } else {
      this.el.addEventListener('change', this._onInputBound, true);
    }
  };

  /**
   * Remove event listeners for focus, blur and input.
   */


  MultiSelectInput.prototype._removeEventListeners = function _removeEventListeners() {

    if (this._isNative) {
      this.selectEl.removeEventListener('change', this._onInputBound);
    } else {
      this.el.removeEventListener('change', this._onInputBound, true);
    }
  };

  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */


  MultiSelectInput.prototype._onInput = function _onInput() {

    var value = this.getValue();

    if (value !== this.previousValue) {
      this.previousValue = value;
      (this.onChange || noop)(value, this);
    }
  };

  return MultiSelectInput;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


MultiSelectInput.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
MultiSelectInput.prototype.defaults = {
  el: null,
  messageEl: null,
  selectEl: null,
  labelEl: null,
  onChange: null,
  previousValue: null,
  _isNative: false,
  _onFocusBound: null,
  _onBlurBound: null,
  _onInputBound: null
};

(0, _mixin2.default)(MultiSelectInput.prototype, _messaging2.default, _validation2.default);

exports.default = MultiSelectInput;
module.exports = exports['default'];


},{"../helpers/dom/make-element":39,"../helpers/util/each":65,"../helpers/util/mixin":66,"../mixins/messaging":71,"../mixins/validation":72,"./base":1}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # NumberSelector
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * An increment/decrement for number inputs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new NumberSelector(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/number-selector.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var NumberSelector = function (_BaseComponent) {
  _inherits(NumberSelector, _BaseComponent);

  /**
   * NumberSelector constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function NumberSelector(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NumberSelector);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Get the current value of the number selector.
   * @return {Number} The current value
   */


  NumberSelector.prototype.getValue = function getValue() {
    return parseFloat(this.inputEl.value);
  };

  /**
   * Set the current value of the number selector.
   * @param {Number} val
   */


  NumberSelector.prototype.setValue = function setValue(val) {
    if (isNaN(val)) {
      val = this._getMin();
    }

    var newVal = this._getConformedNumber(val);
    if (newVal !== this.inputEl.value) {
      this.inputEl.value = newVal;
      (this.onChange || noop)(newVal, this);
    }
    return this;
  };

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */


  NumberSelector.prototype.setErrorState = function setErrorState(opt) {
    if (opt) {
      this.el.setAttribute('data-error', '');
    } else {
      this.el.removeAttribute('data-error');
    }
  };

  /**
   * Clear the value.
   */


  NumberSelector.prototype.clearValue = function clearValue() {
    return this.setValue(0);
  };

  /**
   * Increment by the step value.
   */


  NumberSelector.prototype.increment = function increment() {
    return this.setValue(this.getValue() + this._getStep());
  };

  /**
   * Decrement by the step value.
   */


  NumberSelector.prototype.decrement = function decrement() {
    return this.setValue(this.getValue() - this._getStep());
  };

  /**
   * Get number of digits after the decimal point (fractional part)
   * @param {Number} val
   * @return {Number}
   */


  NumberSelector.prototype._countDecimals = function _countDecimals(val) {
    return !val || isNaN(val) || Math.floor(val) === val ? 0 : val.toString().split(".")[1].length || 0;
  };

  /**
   * Enable the input and buttons.
   */


  NumberSelector.prototype.enable = function enable() {

    var btns = this.el.querySelectorAll('.spark-number-selector__up, .spark-number-selector__down');
    var i = 0;
    var len = btns.length;

    for (; i < len; i++) {
      btns[i].removeAttribute('disabled');
    }

    this.inputEl.removeAttribute('disabled');

    return this;
  };

  /**
   * Disable the input and buttons.
   */


  NumberSelector.prototype.disable = function disable() {

    var btns = this.el.querySelectorAll('.spark-number-selector__up, .spark-number-selector__down');
    var i = 0;
    var len = btns.length;

    for (; i < len; i++) {
      btns[i].setAttribute('disabled', '');
    }

    this.inputEl.setAttribute('disabled', '');

    return this;
  };

  /**
   * Store a reference to the whole number-selector, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */


  NumberSelector.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.inputEl = el.querySelector('input');

    this.messageEl = this.el.querySelector('.spark-number-selector__message') || (0, _makeElement2.default)('<span class="spark-number-selector__message"></span>');

    if (!this.inputEl) {
      throw new Error('NumberSelector must include an `<input>` element!');
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  NumberSelector.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onInputFocusBound = this._onInputFocus.bind(this);
    this._onInputBlurBound = this._onInputBlur.bind(this);
    this._onInputInputBound = this._onInputInput.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  NumberSelector.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.el.addEventListener('change', this._onInputChangeBound);
    this.el.addEventListener('focus', this._onInputFocusBound);
    this.el.addEventListener('blur', this._onInputBlurBound);
    this.inputEl.addEventListener('input', this._onInputInputBound);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  NumberSelector.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.el.removeEventListener('change', this._onInputChangeBound);
    this.el.removeEventListener('focus', this._onInputFocusBound);
    this.el.removeEventListener('blur', this._onInputBlurBound);
    this.inputEl.removeEventListener('input', this._onInputInputBound);
  };

  /**
   * Get the current value of the min property.
   * @return {Number}
   */


  NumberSelector.prototype._getMin = function _getMin() {
    return this._getInputPropAsNumber('min');
  };

  /**
   * Get the current value of the max property.
   * @return {Number}
   */


  NumberSelector.prototype._getMax = function _getMax() {
    return this._getInputPropAsNumber('max');
  };

  /**
   * Get the current value of the step property.
   * @return {Number}
   */


  NumberSelector.prototype._getStep = function _getStep() {
    return this._getInputPropAsNumber('step') || 1;
  };

  /**
   * Get a property as a number.
   * @param {String} key
   * @return {Number}
   */


  NumberSelector.prototype._getInputPropAsNumber = function _getInputPropAsNumber(key) {
    return parseFloat(this.inputEl.getAttribute(key));
  };

  /**
   * Get the given number within the min/max range of the input element.
   * @param {Number} num
   * @return {Number}
   */


  NumberSelector.prototype._getConformedNumber = function _getConformedNumber(num) {
    var max = this._getMax();
    var min = this._getMin();
    var step = this._getStep();

    // Move in increments if we have a defined step size
    if (step) {
      var diff = num % step;
      var halfStep = step / 2;
      var overHalf = diff >= halfStep;
      num = overHalf ? num + (step - diff) : num - diff;

      // only use toPrecision if we have fractions
      var stepFractional = this._countDecimals(this._getStep());

      if (stepFractional > 0) {
        // get number of digits to left of decimal in num if it is greater than 1
        var absNum = Math.abs(num);

        var integral = absNum > 1 ? absNum.toString().split(".")[0].length : 0;

        // number of significant digits is sum of integral and step fraction
        var precisionValue = stepFractional + integral;

        num = Number.isInteger(num) ? num : num.toPrecision(precisionValue);
      }
    }

    return max !== undefined && num > max ? max : min !== undefined && num < min ? min : num;
  };

  /**
   * When either of the buttons are clicked, update the value.
   * @param {Object} e
   */


  NumberSelector.prototype._onClick = function _onClick(e) {
    // IE 11 has a bug where click events for disabled buttons still propagate.
    // Add a check to ensure that we are not incrementing/decrementing in this scenario
    if (!e.target.hasAttribute('disabled')) {
      // The increment button is clicked
      if ((0, _getParent2.default)(e.target, '.spark-number-selector__up', this.el)) {
        e.preventDefault();
        this.increment();
      }
      // The decrement button is clicked
      else if ((0, _getParent2.default)(e.target, '.spark-number-selector__down', this.el)) {
          e.preventDefault();
          this.decrement();
        }
    }
  };

  /**
   * When the input value changes, max sure we are in bounds.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputChange = function _onInputChange() {
    this.setValue(parseFloat(this.inputEl.value));
  };

  /**
   * When the input gains focus.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputFocus = function _onInputFocus() {
    if (this.onFocus) this.onFocus(this.getValue(), this);
  };

  /**
   * When the input loses focus.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputBlur = function _onInputBlur() {
    if (this.onBlur) this.onBlur(this.getValue(), this);
  };

  /**
   * When the input loses focus.
   * @param {Object} e
   */


  NumberSelector.prototype._onInputInput = function _onInputInput() {
    if (this.onInput) this.onInput(this.getValue(), this);
  };

  return NumberSelector;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


NumberSelector.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange', 'onFocus', 'onBlur', 'onInput'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
NumberSelector.prototype.defaults = {
  el: null,
  inputEl: null,
  onValidate: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onInput: null,
  _onInputChangeBound: null,
  _onClickBound: null
};

(0, _mixin2.default)(NumberSelector.prototype, _messaging2.default, _validation2.default);

exports.default = NumberSelector;
module.exports = exports['default'];


},{"../helpers/dom/make-element":39,"../helpers/traversal/get-parent":58,"../helpers/util/mixin":66,"../mixins/messaging":71,"../mixins/validation":72,"./base":1}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _appendChildren = require('../helpers/manipulation/append-children');

var _appendChildren2 = _interopRequireDefault(_appendChildren);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _parseAttribute = require('../helpers/dom/parse-attribute');

var _affix = require('../helpers/position/affix');

var _affix2 = _interopRequireDefault(_affix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Popover
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Show and hide a popover. Should do some sanity checks on positioning as well.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Popover(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Default anchoring of the content's x and y-axis relative to the button.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   defaultAnchorX: 'center', // 'left', 'center', 'right'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   defaultAnchorY: 'center' // 'left', 'center', 'right'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/popover.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Popover = function (_BaseComponent) {
  _inherits(Popover, _BaseComponent);

  function Popover(el) {
    var _ret;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Popover);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    if (!el) return _ret = _this, _possibleConstructorReturn(_this, _ret);
    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _this;
  }

  /**
   * Open.
   * @param {Object} params Optional
   */


  Popover.prototype.open = function open() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    // If there is a timer running for the close event, clear it so it
    // doesn't close stuff during open.
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    // If the element we anchor the popover to is fixed, we need to know
    // so that the affixed content can also be fixed.
    this._checkFixedPosition();

    // Update an existing affixed instance.
    if (this.affix) {
      this.affix.targetEl = params.affixTo || this.affix.targetEl;
      this.affix.update();
    }
    // Affix the content to the toggle
    else {
        this.affix = new _affix2.default({
          el: this.contentEl,
          targetEl: params.affixTo || this.el,
          caretEl: this.caretEl,
          anchorX: this.anchorX,
          anchorY: this.anchorY,
          isFixed: this.isFixed
        });
      }

    // Find all focusable elements in the Popover for navigation
    var popoverFocusableEls = this.contentEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

    if (popoverFocusableEls.length > 0) {
      this.popoverFocusableEls = Array.prototype.slice.call(popoverFocusableEls);
      this.firstPopoverFocusableEl = this.popoverFocusableEls[0];
      this.lastPopoverFocusableEl = this.popoverFocusableEls[this.popoverFocusableEls.length - 1];
    }

    // Listen for clicks on the window
    this._addWindowEventListeners();

    this.isActive = true;

    // Dispatch a custom event so content inside the popover can respond
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.contentEl.dispatchEvent(e);

    // Update bindings
    this._updateAttributes();

    // Set focus to first focusable element once Popover has been opened
    if (popoverFocusableEls.length > 0) {
      this.firstPopoverFocusableEl.focus();
    }

    // Callbacks
    (params.complete || noop)();
    (this.onOpen || noop)();

    return this;
  };

  /**
   * Close.
   * @param {Object} params Optional
   */


  Popover.prototype.close = function close() {
    var _this2 = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    // Not open, so don't close.
    if (!this.affix) return this;

    // If there is a timer running for the close event, clear it so we don't run close stuff twice.
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    // Stop listening to window clicks.
    this._removeWindowEventListeners();

    this.isActive = false;

    // Update bindings
    this._updateAttributes();

    // Close after the animation has completed
    this.closeTimer = setTimeout(function () {
      _this2._finishClose(params);
    }, 250);

    return this;
  };

  /**
   * Toggle the open state.
   */


  Popover.prototype.toggle = function toggle() {
    return this[this.isActive ? 'close' : 'open']();
  };

  /**
   * Set the content. Optionally append instead of replacing.
   * @param {Element|Array|NodeList} content
   * @param {Object} params Optional
   */


  Popover.prototype.setContent = function setContent(content, params) {
    params = params || {};
    (0, _appendChildren2.default)(this.contentEl, content.length ? content : [content], !(params.append || false));
    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Popover.prototype.update = function update(el) {

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._addEventListeners();

    if (this.affix) this.affix.update();

    return this;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Popover.prototype._cacheElements = function _cacheElements(el) {

    // If a content element was already passed, make sure it has a popover content class
    if (this.contentEl) {
      (0, _addClass2.default)(this.contentEl, 'spark-popover__content');
    }

    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-popover__toggle, [data-role="toggle"]') || this.el;
    this.contentEl = this.contentEl || this.el.querySelector('.spark-popover__content, [class*="spark-popover__content--"]') || this._createContentEl();
    this.caretEl = this.contentEl.querySelector('.spark-popover__caret') || this._createCaretEl();
    this.isActive = (0, _hasClass2.default)(this.toggleEl, 'popover-active');
  };

  /**
   * Parse config values from the element.
   */


  Popover.prototype._parseParams = function _parseParams() {

    this.anchorY = this.anchorY !== null ? this.anchorY : (0, _parseAttribute.string)(this.contentEl, 'data-anchor-y', null);
    this.anchorX = this.anchorX !== null ? this.anchorX : (0, _parseAttribute.string)(this.contentEl, 'data-anchor-x', null);

    // No anchors defined
    if (!this.anchorY && !this.anchorX) {

      // Left
      if ((0, _hasClass2.default)(this.contentEl, 'spark-popover__content--left')) {
        this.anchorY = 'middle';
        this.anchorX = 'left';
      }
      // Right
      else if ((0, _hasClass2.default)(this.contentEl, 'spark-popover__content--right')) {
          this.anchorY = 'middle';
          this.anchorX = 'right';
        }
        // Top
        else if ((0, _hasClass2.default)(this.contentEl, 'spark-popover__content--top')) {
            this.anchorY = 'top';
            this.anchorX = 'center';
          }
          // Bottom
          else {
              this.anchorY = 'bottom';
              this.anchorX = 'center';
            }
    }
  };

  /**
   * Check to see if the button triggering the popover is fixed.
   * If so, then popover needs to be fixed as well.
   */


  Popover.prototype._checkFixedPosition = function _checkFixedPosition() {

    var parent = this.el;

    while (parent && parent !== document) {
      var style = getComputedStyle(parent);
      if (style.position === 'fixed') {
        return this.isFixed = true;
      }
      parent = parent.parentNode;
    }

    return this.isFixed = false;
  };

  /**
   * Update classes for the open or close state.
   */


  Popover.prototype._updateAttributes = function _updateAttributes() {
    (0, _toggleClass2.default)(this.el, 'popover-active', this.isActive);
    (0, _toggleClass2.default)(this.contentEl, 'active', this.isActive);
    (0, _toggleClass2.default)(this.toggleEl, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Popover.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onContentClickBound = this._onContentClick.bind(this);
    this._onWindowClickBound = this._onWindowClick.bind(this);
    this._onKeyupBound = this._onKeyup.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Popover.prototype._addEventListeners = function _addEventListeners() {
    this.el.addEventListener('click', this._onClickBound);
    this.contentEl.addEventListener('click', this._onContentClickBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Popover.prototype._removeEventListeners = function _removeEventListeners() {
    this.el.removeEventListener('click', this._onClickBound);
    this.contentEl.removeEventListener('click', this._onContentClickBound);
  };

  /**
   * Add event listeners to the window.
   */


  Popover.prototype._addWindowEventListeners = function _addWindowEventListeners() {
    this._removeWindowEventListeners();
    window.addEventListener('click', this._onWindowClickBound);
    window.addEventListener('keyup', this._onKeyupBound);
    window.addEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Remove window event listeners.
   */


  Popover.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('click', this._onWindowClickBound);
    window.removeEventListener('keyup', this._onKeyupBound);
    window.removeEventListener('keydown', this._onKeydownBound);
  };

  /**
   * Create a content element.
   * @return {Element}
   */


  Popover.prototype._createContentEl = function _createContentEl() {
    var el = document.createElement('div');
    (0, _addClass2.default)(el, 'spark-popover__content');
    el.setAttribute('role', 'tooltip');
    return el;
  };

  /**
   * Create the caret element.
   * @return {Element}
   */


  Popover.prototype._createCaretEl = function _createCaretEl() {
    var el = document.createElement('div');
    el.className = 'spark-popover__caret';
    this.contentEl.appendChild(el);
    return el;
  };

  /**
   * Complete the close event by moving the element back and destroying the affix.
   * @param  {Object} params
   */


  Popover.prototype._finishClose = function _finishClose() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    this.closeTimer = null;

    // Move the content back to the parent
    this.el.appendChild(this.contentEl);

    this.affix.remove({ keepEl: true });
    this.affix = null;

    (params.complete || noop)();
    (this.onClose || noop)();
  };

  /**
   * When we are clicked, toggle the popover-active state.
   * @param {Object} e
   */


  Popover.prototype._onClick = function _onClick(e) {

    // If this is the toggle element, toggle.
    if (e.target === this.toggleEl || (0, _hasParent2.default)(e.target, this.toggleEl)) {
      e.preventDefault();
      this.toggle();
      return;
    }
  };

  /**
   * When a key is pressed on the window and it's an ESC, close the popover.
   * @param {Object} e
   */


  Popover.prototype._onKeyup = function _onKeyup(e) {
    if (e.keyCode === 27) {
      this.close();

      // Set focus back to toggle
      this.toggleEl.focus();
    }
  };

  /**
   * When a key is pressed in an active Popover and it is a Tab key, or Shift+Tab, navigate the popover
   * If it the Enter key, and focus is on the close button, close the Popover
   *
   * @param {Object} e
   */


  Popover.prototype._onKeydown = function _onKeydown(e) {
    if (e.keyCode === 9) {
      if (this.popoverFocusableEls.length === 1) {
        e.preventDefault();
      }

      if (e.shiftKey) {
        this._onBackwardTab(e);
      } else {
        this._onForwardTab(e);
      }
    }

    // Enter Key
    if (e.keyCode === 13) {
      if (e.target === document.querySelector('.spark-popover__close') || (0, _getParent2.default)(e.target, '.spark-popover__close', this.contentEl)) {
        e.preventDefault();
        this.close();

        // Set focus back to toggle
        this.toggleEl.focus();
      }
    }
  };

  /**
   * When tabbing backwards, localize traversal to Popover elements only
   * @param {Object} e
   */


  Popover.prototype._onBackwardTab = function _onBackwardTab(e) {
    if (document.activeElement === this.firstPopoverFocusableEl) {
      e.preventDefault();
      this.lastPopoverFocusableEl.focus();
    }
  };

  /**
   * When tabbing forwards, localize traversal to Popover elements only
   * @param {Object} e
   */


  Popover.prototype._onForwardTab = function _onForwardTab(e) {
    if (document.activeElement === this.lastPopoverFocusableEl) {
      e.preventDefault();
      this.firstPopoverFocusableEl.focus();
    }
  };

  /**
   * When the toggle is clicked, close if it's a link. If it's content, don't do anything but stop
   * the event from bubbling.
   * @param {Object} e
   */


  Popover.prototype._onContentClick = function _onContentClick(e) {

    // If this is a link, close.
    if ((0, _getParent2.default)(e.target, '.spark-popover__list-link', this.contentEl) || (0, _getParent2.default)(e.target, '.spark-popover__close', this.contentEl)) {
      this.close();
      return;
    }
  };

  /**
   * When the window is clicked and it's not part of the popover, close the popover.
   * @param {Objec} e
   */


  Popover.prototype._onWindowClick = function _onWindowClick(e) {
    if (e.target !== this.el && e.target !== this.contentEl && !(0, _hasParent2.default)(e.target, this.el) && !(0, _hasParent2.default)(e.target, this.contentEl)) {
      this.close();
    }
  };

  return Popover;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Popover.prototype._whitelistedParams = ['anchorX', 'anchorY', 'toggleEl', 'contentEl', 'onOpen', 'onClose'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Popover.prototype.defaults = {
  el: null,
  toggleEl: null,
  contentEl: null,
  caretEl: null,
  affix: null,
  isActive: false,
  isPaused: false,
  isFixed: false,
  anchorX: null,
  anchorY: null,
  closeTimer: null,
  onOpen: null,
  onClose: null,
  _onClickBound: null,
  _onKeyupBound: null,
  _onKeydownBound: null,
  _onContentClickBound: null,
  _onWindowClickBound: null,
  _onWindowResizeBound: null,
  _onWindowScrollBound: null
};

exports.default = Popover;
module.exports = exports['default'];


},{"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/parse-attribute":42,"../helpers/dom/toggle-class":44,"../helpers/manipulation/append-children":49,"../helpers/position/affix":53,"../helpers/traversal/get-parent":58,"../helpers/traversal/has-parent":62,"./base":1}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _round = require('../helpers/util/round');

var _round2 = _interopRequireDefault(_round);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # ProgressIndicator
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new ProgressIndicator(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. The precision of the progress percentage.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   precision: 10 // 10 decimal places
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/progress-indicator.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var sizes = {
  large: {
    diameter: 264,
    stroke: 12,
    track: 'M132 6c69.588 0 126 56.412 126 126s-56.412 126-126 126S6 201.588 6 132 62.412 6 132 6z',
    fill: '',
    border: 'M132 252c-66.274 0-120-53.726-120-120S65.726 12 132 12s120 53.726 120 120-53.726 120-120 120z'
  },
  small: {
    diameter: 60,
    stroke: 6,
    track: 'M30 3c14.912 0 27 12.088 27 27S44.912 57 30 57 3 44.912 3 30 15.088 3 30 3z',
    fill: '',
    border: 'M30 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24z'
  },
  extraSmall: {
    diameter: 24,
    stroke: 3,
    track: 'M22.5 12c0 5.8-4.7 10.5-10.5 10.5S1.5 17.8 1.5 12 6.2 1.5 12 1.5 22.5 6.2 22.5 12z',
    fill: '',
    border: ''
  }
};

var ProgressIndicator = function (_BaseComponent) {
  _inherits(ProgressIndicator, _BaseComponent);

  /**
   * ProgressIndicator constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function ProgressIndicator(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ProgressIndicator);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Set the value of the indicator.
   * @param {Number} val
   */


  ProgressIndicator.prototype.set = function set(val) {

    if (val === this.value) {
      return this;
    }

    if (val > 1) {
      val = 1;
    }

    this.value = val;

    if (this.isDeterminate && this.progressEl) {
      this.progressEl.setAttribute('value', Math.round(val * 100) / 100);
    }

    this._updateDOM();

    return this;
  };

  /**
   * Store a reference to all the needed elements.
   * @param {Element} el
   */


  ProgressIndicator.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.progressEl = this.el.querySelector('progress');
    this.statusEl = this.el.querySelector('.spark-progress__value-status, [role="status"]');
    this.noteEl = this.el.querySelector('.spark-progress__states');
    this.meterEl = this.el.querySelector('.spark-progress__meter');

    this.isDeterminate = this.progressEl.getAttribute('value') !== null;
    this.size = this._determineSize();

    // If this is a determinate value, replace the meter with the SVG.
    if (this.isDeterminate) {

      var svg = this._buildSVG();
      svg.setAttribute('class', this.meterEl.className);

      this.meterEl.parentNode.replaceChild(svg, this.meterEl);
      this.meterEl = svg;
      this.fillEl = this.meterEl.querySelector('.spark-progress__fill');
    }

    if (this.noteEl) {
      this._parseNotes(this.noteEl);
    }

    if (this.progressEl) {
      this.value = this.progressEl.value;
    }

    this._cacheSize();

    this._updateDOM();
  };

  /**
   * Cache the size of the meter.
   */


  ProgressIndicator.prototype._cacheSize = function _cacheSize() {
    this.meterHeight = this.meterEl.clientHeight;
    this.meterWidth = this.meterEl.clientWidth;
  };

  /**
   * Determine the size of the indicator.
   * @return {String}
   */


  ProgressIndicator.prototype._determineSize = function _determineSize() {

    if (this.el.className.indexOf('progress--sm') !== -1) {
      return 'small';
    } else if (this.el.className.indexOf('progress--xs') !== -1) {
      return 'extraSmall';
    }

    return 'large';
  };

  /**
   * Build the proper SVG element for this size indicator.
   * @return {Element}
   */


  ProgressIndicator.prototype._buildSVG = function _buildSVG() {
    var size = sizes[this.size];
    var template = '<svg viewBox="0 0 ' + size.diameter + ' ' + size.diameter + '" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="' + size.track + '" stroke-width="' + size.stroke + '" class="spark-progress__track"/><path d="' + (size.fill || size.track) + '" stroke-width="' + size.stroke + '" class="spark-progress__fill"/><path d="' + size.border + '" class="spark-progress__border"/></g></g></svg>';
    var div = document.createElement('div');
    div.innerHTML = template;
    return div.children[0];
  };

  /**
   * Take an unordered list of notes and determine the ranges for
   * when to show a given note.
   * @param  {Element} el
   * @return {Array}
   */


  ProgressIndicator.prototype._parseNotes = function _parseNotes(el) {

    this.notes = this.notes || [];

    var len = el.children.length;
    var i = len - 1;

    for (; i >= 0; i--) {
      this.notes.push({
        min: parseInt(el.children[i].getAttribute('data-value'), 10),
        max: el.children[i + 1] ? parseInt(el.children[i + 1].getAttribute('data-value'), 10) - 1 : 100,
        el: el.children[i]
      });
    }
  };

  /**
   * Update the text visible based on the value. Also adjust the SVG.
   */


  ProgressIndicator.prototype._updateDOM = function _updateDOM() {

    if (!this.isDeterminate) {
      return;
    }

    var updateTime = Date.now();
    var val = (0, _round2.default)(this.value * 100, this.precision);

    // Don't animate if we're animating back to 0 or it's been less than 150ms since our last update.
    var noAnimation = val === 0 || this.lastDOMUpdateTime + 150 > updateTime;
    (0, _toggleClass2.default)(this.fillEl, 'no-animation', noAnimation);

    this.statusEl.innerHTML = val + '%';

    var dashArray = (sizes[this.size].diameter - sizes[this.size].stroke) * Math.PI;
    var dashOffset = dashArray - dashArray * (val / 100);

    this.fillEl.setAttribute('style', 'stroke-dasharray: ' + dashArray + '; stroke-dashoffset: ' + dashOffset);

    this.lastDOMUpdateTime = updateTime;

    if (!this.notes) {
      return;
    }

    var i = 0;
    var len = this.notes.length;

    for (; i < len; i++) {
      (0, _toggleClass2.default)(this.notes[i].el, 'active', this.notes[i].min <= val && this.notes[i].max >= val);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  ProgressIndicator.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  ProgressIndicator.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  ProgressIndicator.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
  };

  /**
   * When the window resizes, cache the dimensions.
   * @param {Object} e
   */


  ProgressIndicator.prototype._onResize = function _onResize() {
    this._cacheSize();
  };

  return ProgressIndicator;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


ProgressIndicator.prototype._whitelistedParams = ['precision'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
ProgressIndicator.prototype.defaults = {
  el: null,
  progressEl: null,
  statusEl: null,
  noteEls: null,
  meterEl: null,
  fillEl: null,
  meterHeight: 0,
  meterWidth: 0,
  notes: null,
  isDeterminate: false,
  value: null,
  precision: 0,
  lastDOMUpdateTime: 0,
  _onResizeBound: null
};

exports.default = ProgressIndicator;
module.exports = exports['default'];


},{"../helpers/dom/toggle-class":44,"../helpers/util/round":69,"./base":1}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _offset = require('../helpers/dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _getIndex = require('../helpers/traversal/get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # RangeSlider
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A dual slider for number inputs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @todo : probably a lot of refactoring that could happen between this and slider.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new RangeSlider(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Slide along the x or y-axis?
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   isX: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onChange: function(inst, index, value){},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/range-slider.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var RangeSlider = function (_BaseComponent) {
  _inherits(RangeSlider, _BaseComponent);

  /**
   * RangeSlider constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function RangeSlider(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RangeSlider);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._updateDisabledClasses();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Start the slider moving.
   * @param {Number} index The index of the handle or input element.
   * @param {Number} position The position of the pointer.
   * @param {String} type Optional Which type of events to listen for.
   */


  RangeSlider.prototype.start = function start(index, position, type) {

    // Noop if we're disabled or an invalid index was passed
    if (index < 0 || this.inputEls[index].getAttribute('disabled') !== null) {
      return this;
    }

    this._addMoveEventListeners(type || 'mouse');
    this._cacheSize();

    this.isActive = this.isActive || [];
    this.isActive[index] = true;

    this.currentIndex = index;
    this._updateActiveClasses(index);
    this._updateDisabledClasses();
    this._oldVal = this.values[index];
    this.move(position);

    return this;
  };

  /**
   * Move the value to a given position
   * @param {Number} position
   * @param {Boolean} force Force the move Optional
   */


  RangeSlider.prototype.move = function move(position, force) {

    // Noop if an invalid index was passed we haven't yet started dragging
    if ((!position || !this.isActive || !this.isActive[this.currentIndex]) && !force) {
      return this;
    }

    // Treat positions beyond the boundaries as the boundaries
    if (this.isX) {

      // Too far left
      if (position < this.offsetLeft) {
        position = this.offsetLeft;
      }
      // Too far right
      else if (position > this.offsetLeft + this.width) {
          position = this.offsetLeft + this.width;
        }
    } else {

      // Too far top
      if (position < this.offsetTop) {
        position = this.offsetTop;
      }
      // Too far bottom
      else if (position > this.offsetTop + this.height) {
          position = this.offsetTop + this.height;
        }
    }

    // The percentage of the new position relative to slider-container width or height.
    var percentage = this.isX ? (position - this.offsetLeft) / (this.width - this.handleSize) : (position - this.offsetTop) / this.height;

    // The value of the input as a percentage of the value range.
    this.setValue(this.currentIndex, Math.round((percentage - this.handleSizePercentage / 2) * (this.highestMax - this.lowestMin)) + this.lowestMin);

    return this;
  };

  /**
   * Stop listening to movements.
   * @param {Number} index Optional The index of the handle or input element.
   * @param {String} type Optional Which type of events to listen for.
   */


  RangeSlider.prototype.stop = function stop(index, type) {

    if (index !== null && index !== undefined && this.currentIndex !== index) {
      return this;
    }

    this.isActive[this.currentIndex] = false;
    this.lastIndex = this.currentIndex;

    if (this._oldVal !== this.values[this.currentIndex]) {
      (this.onChange || noop)(this.currentIndex, this.values[this.currentIndex], this);
    }

    this.currentIndex = null;
    this._updateActiveClasses(index);
    this._removeMoveEventListeners(type || 'mouse');

    return this;
  };

  /**
   * Set the value of the handle.
   * @param {Number} index The index of the input element.
   * @param {Number} value
   */


  RangeSlider.prototype.setValue = function setValue(index, value) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index]) {
      throw new Error('Cannot set value on a slider input element with an index of ' + index + '. That element does not exist.');
    }

    // Move in increments if we have a defined step size
    if (this.steps[index]) {
      value = value - value % this.steps[index];
    }

    this.values = this.values || [];

    // Check bounds of the new value
    if (value > this.maxes[index]) {
      value = this.maxes[index];
    } else if (value < this.mins[index]) {
      value = this.mins[index];
    }

    // If there is an input that comes after this, make sure we aren't going beyond it
    if (this.values[index + 1] !== undefined && value >= this.values[index + 1]) {
      value = this.values[index + 1] - (this.steps[index] || 1);
    }
    // If there is an input that comes before this, make sure we aren't going below it
    else if (this.values[index - 1] !== undefined && value <= this.values[index - 1]) {
        value = this.values[index - 1] + (this.steps[index] || 1);
      }

    // If there is an onWillChange callback, run it. If it returns
    // false, then this new value should be considered invalid.
    if (typeof this.onWillChange === 'function') {
      var change = this.onWillChange(index, value, this);
      if (typeof change === 'number') {
        value = change;
      }
    }

    // Store value
    this.values[index] = value;

    // Update elements
    this.inputEls[index].value = this.values[index];
    this.handleEls[index].setAttribute('data-value', this.values[index]);
    this.handleEls[index].setAttribute('aria-valuenow', this.values[index]);
    this.handleEls[index].setAttribute('aria-valuetext', this.values[index]);

    // Set the percentage
    this.percentages = this.percentages || [];
    this.percentages[index] = (this.values[index] - this.lowestMin) / (this.highestMax - this.lowestMin);

    // Update the position of the handle
    this._updateHandlePosition(index);

    return this;
  };

  /**
   * Get the value.
   * @param {Number} index
   * @return {Number}
   */


  RangeSlider.prototype.getValue = function getValue(index) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index]) {
      throw new Error('Cannot get value from a slider input element with an index of ' + index + '. That element does not exist.');
    }

    return this.values[index];
  };

  /**
   * Clear the value.
   * @param {Number} index
   */


  RangeSlider.prototype.clearValue = function clearValue(index) {
    return this.setValue(index, 0);
  };

  /**
   * Enable the input.
   * @param {Number} index
   */


  RangeSlider.prototype.enable = function enable(index) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index] || !this.handleEls[index]) {
      throw new Error('Cannot get value from a slider input element with an index of ' + index + '. That element does not exist.');
    }

    this.inputEls[index].removeAttribute('disabled');
    this.inputEls[index].removeAttribute('tabindex');
    this.handleEls[index].removeAttribute('disabled');
    this.handleEls[index].removeAttribute('tabindex');
    this._updateDisabledClasses();

    return this;
  };

  /**
   * Disable the input.
   * @param {Number} index
   */


  RangeSlider.prototype.disable = function disable(index) {

    // We don't have an input element at that index, so something went wrong.
    if (!this.inputEls[index] || !this.handleEls[index]) {
      throw new Error('Cannot get value from a slider input element with an index of ' + index + '. That element does not exist.');
    }

    this.inputEls[index].setAttribute('disabled', '');
    this.inputEls[index].setAttribute('tabindex', '-1');
    this.handleEls[index].setAttribute('disabled', '');
    this.handleEls[index].setAttribute('tabindex', '-1');
    this._updateDisabledClasses();

    return this;
  };

  /**
   * Increment the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  RangeSlider.prototype.increment = function increment(useMultiplier) {
    return this.setValue(this.currentIndex, this.values[this.currentIndex] + this.steps[this.currentIndex] * (useMultiplier ? 10 : 1));
  };

  /**
   * Decrement the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  RangeSlider.prototype.decrement = function decrement(useMultiplier) {
    return this.setValue(this.currentIndex, this.values[this.currentIndex] - this.steps[this.currentIndex] * (useMultiplier ? 10 : 1));
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  RangeSlider.prototype.remove = function remove(leaveElement) {
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  RangeSlider.prototype.update = function update(el) {

    this._removeEventListeners();
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');

    this._cacheElements(el);
    this._addEventListeners();
    this._updateDisabledClasses();

    for (var i = 0; i < this.handleEls.length; i++) {
      this._updateHandlePosition(i);
    }

    return this;
  };

  /**
   * Store a reference to the whole slider, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */


  RangeSlider.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.controlsEl = this.el.querySelector('.spark-slider__controls');
    this.inputEls = this.el.querySelectorAll('input[type="number"]');
    this.handleEls = this.el.querySelectorAll('.spark-slider__handle');
    this.trackEl = this.el.querySelector('.spark-slider__track');
    this.trackFillEl = this.trackEl.querySelector('.spark-slider__track-fill');

    this.messageEl = this.el.querySelector('.spark-slider__message') || (0, _makeElement2.default)('<span class="spark-slider__message"></span>');

    if (!this.inputEls || this.inputEls.length <= 1) {
      throw new Error('Tried to create a slider instance without two number inputs.');
    }

    if (!this.handleEls || this.handleEls.length <= 1) {
      throw new Error('Tried to create a slider instance without two handle buttons.');
    }

    var lowestMin = Infinity;
    var highestMax = -Infinity;
    var i = 0;
    var len = this.inputEls.length;
    var values = [];
    this.mins = [];
    this.maxes = [];
    this.steps = [];

    // Cache the size of the element so that we can properly set values on handles.
    this._cacheSize();

    // Set the minimum and max values for each element. Also set any predefined value.
    for (; i < len; i++) {
      var parsedMin = parseInt(this.inputEls[i].getAttribute('min'), 10);
      this.mins[i] = parsedMin === 0 ? parsedMin : parsedMin || null; // Ternary operator to prevent null when we have actual 0 value

      var parsedMax = parseInt(this.inputEls[i].getAttribute('max'), 10);
      this.maxes[i] = parsedMax === 0 ? parsedMax : parsedMax || null; // Ternary operator to prevent null when we have actual 0 value

      this.steps[i] = parseInt(this.inputEls[i].getAttribute('step'), 10) || 1;

      if (this.mins[i] < lowestMin) {
        lowestMin = this.mins[i];
      }

      if (this.maxes[i] > highestMax) {
        highestMax = this.maxes[i];
      }
    }

    this.lowestMin = lowestMin;
    this.highestMax = highestMax;

    i = 0;

    // If we have a default value, set it.
    for (; i < len; i++) {

      values[i] = parseInt(this.inputEls[i].getAttribute('value'), 10);

      // It's a number
      if (!isNaN(values[i])) {
        this.setValue(i, values[i]);
      } else {

        // Set as the minimum unless this is the last handle.
        if (i + 1 === len) {
          this.setValue(i, this.maxes[i] !== null ? this.maxes[i] : 0);
        } else {
          this.setValue(i, this.mins[i] !== null ? this.mins[i] : 0);
        }
      }
    }
  };

  /**
   * Save the element dimensions.
   */


  RangeSlider.prototype._cacheSize = function _cacheSize() {
    this.width = this.trackEl.offsetWidth;
    this.height = this.trackEl.offsetHeight;

    this.handleSize = this.isX ? this.handleEls[0].offsetWidth : this.handleEls[0].offsetHeight;
    this.handleSizePercentage = this.isX ? this.handleEls[0].offsetWidth / this.width : this.handleEls[0].offsetHeight / this.height;

    var offset = (0, _offset2.default)(this.controlsEl);
    this.offsetLeft = offset.left;
    this.offsetTop = offset.top;
  };

  /**
   * Set the position of the handle.
   * @param {Number} index The index of the handle element to update.
   */


  RangeSlider.prototype._updateHandlePosition = function _updateHandlePosition(index) {
    // Track and Track-Fill elements
    var firstPercentage = this.percentages[0];
    var lastPercentage = this.percentages[this.percentages.length - 1];
    this.trackFillEl.setAttribute('style', 'width: ' + (lastPercentage - firstPercentage) * 100 + '%; left: ' + firstPercentage * 100 + '%;');

    // Handle position
    var handlePos = this.handleSize / 2 + (this.values[index] - this.lowestMin) * ((this.width - this.handleSize) / (this.highestMax - this.lowestMin));
    var handlePosPercentage = handlePos / this.width * 100;
    this.handleEls[index].setAttribute('style', 'left: ' + handlePosPercentage + '%;');
  };

  /**
   * Update the active class on the handle.
   * @param {Number} index The index of the handle element to update.
   */


  RangeSlider.prototype._updateActiveClasses = function _updateActiveClasses(index) {

    (0, _toggleClass2.default)(this.handleEls, 'active', false);
    (0, _toggleClass2.default)(this.handleEls[index], 'active', this.isActive[index]);

    if (this.isActive.indexOf(true) !== -1) {
      this.el.setAttribute('data-active-index', this.isActive.indexOf(true));
    } else {
      this.el.removeAttribute('data-active-index');
    }
  };

  /**
   * Update which handles are disabled.
   */


  RangeSlider.prototype._updateDisabledClasses = function _updateDisabledClasses() {

    var disabledCount = 0;

    for (var i = 0, len = this.inputEls.length; i < len; i++) {

      if (this.inputEls[i].getAttribute('disabled') !== null) {
        (0, _toggleClass2.default)(this.handleEls[i], 'disabled', true);
        disabledCount++;
      } else {
        (0, _toggleClass2.default)(this.handleEls[i], 'disabled', false);
      }
    }

    (0, _toggleClass2.default)(this.el, 'all-disabled', disabledCount === this.handleEls.length);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  RangeSlider.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onTouchStartBound = this._onTouchStart.bind(this);
    this._onTouchMoveBound = this._onTouchMove.bind(this);
    this._onTouchEndBound = this._onTouchEnd.bind(this);

    this._onClickBound = this._onClick.bind(this);
    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);

    this._onFocusBound = this._onFocus.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onBlurBound = this._onBlur.bind(this);

    this._onChangeBound = this._onChange.bind(this);

    this._onResizeBound = this._onResize.bind(this);

    this._onVisibleChildrenBound = this._onVisibleChildren.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  RangeSlider.prototype._addEventListeners = function _addEventListeners() {

    this.controlsEl.addEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.addEventListener('mousedown', this._onMouseDownBound);

    for (var i = 0, len = this.inputEls.length; i < len; i++) {
      this.inputEls[i].addEventListener('change', this._onChangeBound);
    }

    for (var j = 0, len2 = this.handleEls.length; j < len2; j++) {
      this.handleEls[j].addEventListener('focus', this._onFocusBound);
      this.handleEls[j].addEventListener('click', this._onClickBound);
    }

    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  RangeSlider.prototype._removeEventListeners = function _removeEventListeners() {

    this.controlsEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.removeEventListener('mousedown', this._onMouseDownBound);

    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound);

    for (var i = 0, len = this.inputEls.length; i < len; i++) {
      this.inputEls[i].removeEventListener('change', this._onChangeBound);
    }

    for (var j = 0, len2 = this.handleEls.length; i < len2; i++) {
      this.handleEls[j].removeEventListener('focus', this._onFocusBound);
      this.handleEls[j].removeEventListener('click', this._onClickBound);
    }

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);
  };

  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the slider handle. Otherwise it's really hard to
   * use the slider unless it's massive.
   * @param {String} type Which type of listeners to add
   */


  RangeSlider.prototype._addMoveEventListeners = function _addMoveEventListeners(type) {

    // Only listen for events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.addEventListener('mousemove', this._onMouseMoveBound);
        window.addEventListener('mouseout', this._onMouseOutBound);
        window.addEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.addEventListener('touchmove', this._onTouchMoveBound);
        window.addEventListener('touchend', this._onTouchEndBound);
        break;
      case 'keyboard':
        window.addEventListener('keydown', this._onKeydownBound);
        for (var i = 0, len = this.handleEls.length; i < len; i++) {
          this.handleEls[i].addEventListener('blur', this._onBlurBound);
        }
        break;
    }
  };

  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to add
   */


  RangeSlider.prototype._removeMoveEventListeners = function _removeMoveEventListeners(type) {

    // Only unbind events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.removeEventListener('mousemove', this._onMouseMoveBound);
        window.removeEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.removeEventListener('touchmove', this._onTouchMoveBound);
        window.removeEventListener('touchend', this._onTouchEndBound);
        break;
      case 'keyboard':
        window.removeEventListener('keydown', this._onKeydownBound);
        for (var i = 0, len = this.handleEls.length; i < len; i++) {
          this.handleEls[i].removeEventListener('blur', this._onBlurBound);
        }
        break;
    }
  };

  /**
   * When the touch starts, start the slider.
   * @param {Object} e
   */


  RangeSlider.prototype._onTouchStart = function _onTouchStart(e) {
    this.start((0, _getIndex2.default)(this.handleEls, e.target), this.isX ? e.touches[0].pageX : e.touches[0].pageY, 'touch');
  };

  /**
   * When the window fires a touchmove event, adjust our value accordingly
   * @param {Object} e
   */


  RangeSlider.prototype._onTouchMove = function _onTouchMove(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.touches[0].pageX : e.touches[0].pageY);
  };

  /**
   * When the window fires a touchend event, stop tracking touches
   * @param {Object} e
   */


  RangeSlider.prototype._onTouchEnd = function _onTouchEnd(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.stop((0, _getIndex2.default)(this.handleEls, e.target), 'touch');
  };

  /**
   * When the mouse presses down, start the slider.
   * @param {Object} e
   */


  RangeSlider.prototype._onMouseDown = function _onMouseDown(e) {
    this.start((0, _getIndex2.default)(this.handleEls, e.target), this.isX ? e.pageX : e.pageY, 'mouse');
  };

  /**
   * When the window fires a mousemove event, adjust our value accordingly
   * @param {Object} e
   */


  RangeSlider.prototype._onMouseMove = function _onMouseMove(e) {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.pageX : e.pageY);
  };

  /**
   * When the window fires a mouseup event, stop tracking
   * @param {Object} e
   */


  RangeSlider.prototype._onMouseUp = function _onMouseUp() {

    if (!this.isActive[this.currentIndex]) {
      return;
    }

    this.stop(null, 'mouse');
  };

  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */


  RangeSlider.prototype._onVisibleChildren = function _onVisibleChildren(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._onResize();
      }.bind(this), 0);
    }
  };

  /**
   * When the window resizes, cache size values for the slider.
   * @param {Object} e
   */


  RangeSlider.prototype._onResize = function _onResize() {
    this._cacheSize();
    this._updateDisabledClasses();
    for (var i = 0; i < this.handleEls.length; i++) {
      this._updateHandlePosition(i);
    }
  };

  /**
   * When the element receives focus, start listening for keyboard events
   * @param {Object} e
   */


  RangeSlider.prototype._onFocus = function _onFocus(e) {
    this.start((0, _getIndex2.default)(this.handleEls, e.target), null, 'keyboard');
  };

  /**
   * When a key is pressed, see if it's one of the Arrow, Page up, Page down, Home
   * or End keys move the handle accordingly. If the shift key is pressed in combination
   * with the arrow keys, we'll increment and decrement by bigger values.
   * @param {Object} e
   */


  RangeSlider.prototype._onKeydown = function _onKeydown(e) {

    if ((0, _getIndex2.default)(this.inputEls, e.target) !== -1) {
      return;
    }

    if (e.keyCode === 39 || e.keyCode === 38) {
      // Right or Up arrow
      this.increment(e.shiftKey);
    } else if (e.keyCode === 37 || e.keyCode === 40) {
      // Left or down arrow
      this.decrement(e.shiftKey);
    } else if (e.keyCode === 33) {
      // Page Up
      this.increment(true);
    } else if (e.keyCode === 34) {
      // Page Down
      this.decrement(true);
    } else if (e.keyCode === 35) {
      // End
      this.setValue(this.max);
    } else if (e.keyCode === 36) {
      // Home
      this.setValue(this.min);
    }
  };

  /**
   * When the element loses focus, stop listening for keyboard events
   * @param {Object} e
   */


  RangeSlider.prototype._onBlur = function _onBlur(e) {
    this.stop((0, _getIndex2.default)(this.handleEls, e.target), 'keyboard');
  };

  /**
   * When the input value changes, set our interal value if it's not already our value.
   * @param {Object} e
   */


  RangeSlider.prototype._onChange = function _onChange(e) {

    var index = (0, _getIndex2.default)(this.inputEls, e.target);

    this._updateDisabledClasses();

    if (e.target.value !== this.values[index]) {
      this.setValue(index, e.target.value);
    }
    (this.onChange || noop)(index, this.values[index], this);
  };

  /**
   * Prevent click events on the button. This way we don't accidentally submit the form.
   * @param {Object} e
   */


  RangeSlider.prototype._onClick = function _onClick(e) {
    e.preventDefault();
  };

  return RangeSlider;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


RangeSlider.prototype._whitelistedParams = ['isX', 'validate', 'onValidate', 'onChange', 'onWillChange'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
RangeSlider.prototype.defaults = {
  el: null,
  messageEl: null,
  controlsEl: null,
  inputEls: null,
  handleEls: null,
  trackEl: null,
  trackFillEl: null,
  isActive: null,
  isX: true,
  onValidate: null,
  onChange: null,
  onWillChange: null,
  position: 0,
  width: 0,
  height: 0,
  mins: null,
  maxes: null,
  steps: null,
  values: null,
  percentages: null,
  offsetLeft: 0,
  offsetTop: 0,
  handleSizePercentage: 0,
  currentIndex: null,
  lastIndex: null,
  _oldVal: null,
  _onTouchStartBound: null,
  _onTouchMoveBound: null,
  _onTouchEndBound: null,
  _onMouseDownBound: null,
  _onMouseMoveBound: null,
  _onMouseUpBound: null,
  _onMouseOutBound: null,
  _onFocusBound: null,
  _onKeydownBound: null,
  _onBlurBound: null,
  _onChangeBound: null,
  _onResizeBound: null,
  _onClickBound: null,
  _onVisibleChildrenBound: null
};

(0, _mixin2.default)(RangeSlider.prototype, _messaging2.default, _validation2.default);

exports.default = RangeSlider;
module.exports = exports['default'];


},{"../helpers/dom/make-element":39,"../helpers/dom/offset":40,"../helpers/dom/toggle-class":44,"../helpers/traversal/get-index":57,"../helpers/util/mixin":66,"../mixins/messaging":71,"../mixins/validation":72,"./base":1}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _scrollTo = require('../helpers/animation/scroll-to');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _offset = require('../helpers/dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _each = require('../helpers/util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Scroll To Top
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Provide a way to scroll back to the top of a component.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new ScrollToTop(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/scroll-to-top.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};
var canObserve = typeof MutationObserver !== 'undefined' ? true : false;

var ScrollToTop = function (_BaseComponent) {
  _inherits(ScrollToTop, _BaseComponent);

  /**
   * ScrollToTop constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function ScrollToTop(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ScrollToTop);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._cacheSizes();

    _this._clearRecomputeDebounced = (0, _debounce2.default)(_this._clearRecompute.bind(_this), 50);
    _this._recomputeDebounced = (0, _debounce2.default)(_this._recompute.bind(_this), 50);

    _this._checkScrollPosition();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Scroll to the top of the containing element.
   * @param {Function} callback
   */


  ScrollToTop.prototype.scrollToTop = function scrollToTop(callback) {
    (0, _scrollTo2.default)(this.scrollToEl || 0, {
      callback: callback || noop
    });
    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  ScrollToTop.prototype.update = function update(el) {

    this._removeEventListeners();
    this._cacheElements(el);
    this._addEventListeners();
    this._cacheSizes();
    this._checkScrollPosition();

    return this;
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  ScrollToTop.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.containerEl = this.containerEl || el.parentNode;
  };

  /**
   * Cache element sizes.
   */


  ScrollToTop.prototype._cacheSizes = function _cacheSizes() {

    var containerOffset = (0, _offset2.default)(this.containerEl);
    var windowWidth = document.body.clientWidth;
    var windowHeight = window.innerHeight;
    var containerOffsetTop = containerOffset.top;
    var containerOffsetLeft = containerOffset.left;
    var containerOffsetRight = windowWidth - containerOffsetLeft - this.containerEl.offsetWidth;

    this._windowHeight = windowHeight;
    this._containerBottom = this.containerEl.offsetHeight + containerOffsetTop;
    this._visibleThreshold = containerOffsetTop + windowHeight * 1.5;

    // Reset button styles
    var isAtBottom = this._isAtBottom;
    this._isAtBottom = false;
    this._right = 0;
    this._updateBindings();

    // Default right position of the element plus the right edge of the container
    this._right = windowWidth - this.el.offsetLeft - this.el.offsetWidth + containerOffsetRight;
    this._isAtBottom = isAtBottom;
    this._updateBindings();
  };

  /**
   * Check the scroll position. If we're far enough from the top,
   * make visible. If the bottom of our container element is past the bottom
   * of the screen, make us fixed.
   */


  ScrollToTop.prototype._checkScrollPosition = function _checkScrollPosition() {

    var isVisible = this._isVisible;
    var isAtBottom = this._isAtBottom;
    var scrollTop = typeof window.scrollY !== 'undefined' ? window.scrollY : window.pageYOffset;
    var bottomThreshold = scrollTop + this._windowHeight;

    this._isVisible = scrollTop + this._windowHeight >= this._visibleThreshold ? true : false;
    this._isAtBottom = this._containerBottom <= bottomThreshold ? true : false;

    if (this._isAtBottom !== isAtBottom || this._isVisible !== isVisible) {
      this._updateBindings();
    }
  };

  /**
   * Update bindings.
   */


  ScrollToTop.prototype._updateBindings = function _updateBindings() {
    (0, _toggleClass2.default)(this.el, 'visible', this._isVisible);
    (0, _toggleClass2.default)(this.el, 'at-bottom', this._isAtBottom);
    this.el.style.right = this._isAtBottom || !this._right ? '' : this._right + 'px';
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  ScrollToTop.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onClickBound = this._onClick.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    this._onResizeBound = this._onResize.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._onMutateBound = this._onMutate.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  ScrollToTop.prototype._addEventListeners = function _addEventListeners() {

    this.el.addEventListener('click', this._onClickBound);
    window.addEventListener('scroll', this._onScrollBound);
    window.addEventListener('orientationchange', this._onScrollBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve) this._addMutationObserver();else window.addEventListener('resize', this._onResizeBound, false);
  };

  /**
   * Remove event listeners for DOM events..
   */


  ScrollToTop.prototype._removeEventListeners = function _removeEventListeners() {

    this.el.removeEventListener('click', this._onClickBound);
    window.removeEventListener('scroll', this._onScrollBound);
    window.removeEventListener('orientationchange', this._onScrollBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);

    if (canObserve) this._removeMutationObserver();else window.removeEventListener('resize', this._onResizeBound);
  };

  /**
   * Setup a mutation observer to know when the DOM has changed so we can recache.
   */


  ScrollToTop.prototype._addMutationObserver = function _addMutationObserver() {
    this._observer = new MutationObserver(this._onMutateBound);
    this._observer.observe(this.containerEl, { childList: true, attributes: true, characterData: true, subtree: true });
  };

  /**
   * Remove a mutation observer.
   */


  ScrollToTop.prototype._removeMutationObserver = function _removeMutationObserver() {
    if (this._observer) this._observer.disconnect();
  };

  /**
   * Recompute the position.
   */


  ScrollToTop.prototype._recompute = function _recompute() {
    this._cacheSizes();
    this._checkScrollPosition();
  };

  /**
   * Recompute styles, but only so often.
   */


  ScrollToTop.prototype._recomputeThrottled = function _recomputeThrottled() {

    if (!this._recomputeRun) {
      this._recompute();
      this._recomputeRun = true;
    }

    this._clearRecomputeDebounced();
  };

  /**
   * Clear the recompute run state.
   */


  ScrollToTop.prototype._clearRecompute = function _clearRecompute() {
    this._recomputeRun = false;
  };

  /**
   * When the window is scrolled, compute the position of the scroll-to-top.
   * @param {Object} e
   */


  ScrollToTop.prototype._onScroll = function _onScroll() {
    this._recomputeThrottled();
    this._checkScrollPosition();
  };

  /**
   * When the window is resized, re-cache element sizes.
   * @param {Object} e
   */


  ScrollToTop.prototype._onResize = function _onResize() {
    this._recomputeDebounced();
  };

  /**
   * When the button is clicked, scroll to the top.
   * @param {Object} e
   */


  ScrollToTop.prototype._onClick = function _onClick() {
    this.scrollToTop();
  };

  /**
   * When a parent container shows its children and our element
   * is inside of it, resize
   * @param  {Object} e
   */


  ScrollToTop.prototype._onVisible = function _onVisible(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._cacheSizes();
        this._checkScrollPosition();
      }.bind(this), 0);
    }
  };

  /**
   * When the DOM changes, recache our values because we might be in the wrong spot.
   */


  ScrollToTop.prototype._onMutate = function _onMutate(mutations) {
    (0, _each2.default)(mutations, function (m) {
      if (m.target !== this.el) this._recomputeDebounced();
    }.bind(this));
  };

  return ScrollToTop;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


ScrollToTop.prototype._whitelistedParams = ['containerEl', 'scrollToEl'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
ScrollToTop.prototype.defaults = {
  el: null,
  containerEl: null,
  scrollToEl: null,
  _isVisible: false,
  _isAtBottom: false,
  _containerBottom: 0,
  _visibleThreshold: 0,
  _windowHeight: 0,
  _right: 0,
  _recomputeRun: false,
  _observer: null,
  _onClickBound: null,
  _onScrollBound: null,
  _onVisibleBound: null,
  _onResizeBound: null,
  _onMutateBound: null
};

exports.default = ScrollToTop;
module.exports = exports['default'];


},{"../helpers/animation/scroll-to":31,"../helpers/dom/offset":40,"../helpers/dom/toggle-class":44,"../helpers/util/debounce":64,"../helpers/util/each":65,"./base":1}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # SelectInput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A select input container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new SelectInput(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/select-input.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var SelectInput = function (_BaseComponent) {
  _inherits(SelectInput, _BaseComponent);

  /**
   * SelectInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function SelectInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SelectInput);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Get the value.
   * @return {String}
   */


  SelectInput.prototype.getValue = function getValue() {
    return this.selectEl.value;
  };

  /**
   * Set the value.
   * @param {String|Number} val
   */


  SelectInput.prototype.setValue = function setValue(val) {

    // Cast to a string for comparison
    val = val + '';

    var i = 0;
    var len = this.selectEl.children.length;

    for (; i < len; i++) {
      if (this.selectEl.children[i].value === val) {
        this.selectEl.children[i].selected = true;
        this._updateClass();
        (this.onChange || noop)(val, this);
        return this;
      }
    }

    return this;
  };

  /**
   * Clear the selected value.
   */


  SelectInput.prototype.clearValue = function clearValue() {

    var i = 0;
    var len = this.selectEl.children.length;

    for (; i < len; i++) {
      if (this.selectEl.children[i].selected === true) {
        this.selectEl.children[i].selected = false;
        this._updateClass();
        (this.onChange || noop)('', this);
        return this;
      }
    }

    return this;
  };

  /**
   * Set the options.
   * @param {Array} opts
   */


  SelectInput.prototype.setOptions = function setOptions(opts) {

    var i = 0;
    var len = opts.length;
    var str = '';

    // Store the index of the currently selected option so we can set
    // it when we're all done.
    var curIndex = this.selectEl.selectedIndex;

    for (; i < len; i++) {
      str += '<option ' + (opts[i].value !== undefined ? 'value="' + (opts[i].value || '') + '"' : '') + '>' + (opts[i].text || '') + '</option>';
    }

    this.selectEl.innerHTML = str;
    this.selectEl.selectedIndex = Math.min(len - 1, curIndex);

    return this;
  };

  /**
   * Set the value of the label.
   * @param {String} text
   */


  SelectInput.prototype.setLabel = function setLabel(text) {
    if (!this.labelEl) return this;
    this.labelEl.innerHTML = text;
    return this;
  };

  /**
   * Disable entry into the input.
   */


  SelectInput.prototype.disable = function disable() {
    this.selectEl.setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable entry into the input.
   */


  SelectInput.prototype.enable = function enable() {
    this.selectEl.removeAttribute('disabled');
    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  SelectInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.selectEl = this.el.querySelector('select');
    this.labelEl = this.el.querySelector('.spark-label');

    this.messageEl = this.el.querySelector('.spark-select__message') || (0, _makeElement2.default)('<span class="spark-select__message"></span>');

    if (!this.selectEl) {
      throw new Error('A <select> element must be present!', this.el);
    }

    this._updateClass();
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  SelectInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onInputBound = this._onInput.bind(this);
  };

  /**
   * Add event listeners for focus, blur and input.
   */


  SelectInput.prototype._addEventListeners = function _addEventListeners() {
    this.selectEl.addEventListener('focus', this._onFocusBound);
    this.selectEl.addEventListener('blur', this._onBlurBound);
    this.selectEl.addEventListener('input', this._onInputBound);
  };

  /**
   * Remove event listeners for focus, blur and input.
   */


  SelectInput.prototype._removeEventListeners = function _removeEventListeners() {
    this.selectEl.removeEventListener('focus', this._onFocusBound);
    this.selectEl.removeEventListener('blur', this._onBlurBound);
    this.selectEl.removeEventListener('input', this._onInputBound);
  };

  /**
   * Update the active class.
   */


  SelectInput.prototype._updateClass = function _updateClass() {
    this.hasValue = this.selectEl.value ? true : false;
    (0, _toggleClass2.default)(this.el, 'has-value', this.hasValue);
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
  };

  /**
   * When the input element gains focus.
   * @param {Object} e
   */


  SelectInput.prototype._onFocus = function _onFocus() {
    this.isActive = true;
    this._updateClass();
    var value = this.getValue();
    (this.onFocus || noop)(value, this);
  };

  /**
   * When the input element loses focus.
   * @param {Object} e
   */


  SelectInput.prototype._onBlur = function _onBlur() {
    this.isActive = false;
    this._updateClass();
    var value = this.getValue();
    (this.onBlur || noop)(value, this);
  };

  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */


  SelectInput.prototype._onInput = function _onInput() {

    this._updateClass();

    var value = this.getValue();

    if (value !== this.previousValue) {
      this.previousValue = value;
      (this.onChange || noop)(value, this);
    }
  };

  return SelectInput;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


SelectInput.prototype._whitelistedParams = ['validate', 'onValidate', 'onChange', 'onFocus', 'onBlur'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
SelectInput.prototype.defaults = {
  el: null,
  messageEl: null,
  selectEl: null,
  labelEl: null,
  hasValue: false,
  isActive: false,
  onChange: null,
  onFocus: null,
  onBlur: null,
  previousValue: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onInputBound: null
};

(0, _mixin2.default)(SelectInput.prototype, _messaging2.default, _validation2.default);

exports.default = SelectInput;
module.exports = exports['default'];


},{"../helpers/dom/make-element":39,"../helpers/dom/toggle-class":44,"../helpers/util/mixin":66,"../mixins/messaging":71,"../mixins/validation":72,"./base":1}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _offset = require('../helpers/dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Slider
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A slider for number inputs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Slider(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Slide along the x or y-axis?
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   isX: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // onChange callback
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onChange: function(inst, val){},
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/slider.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var Slider = function (_BaseComponent) {
  _inherits(Slider, _BaseComponent);

  /**
   * Slider constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Slider(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Slider);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Start the slider moving.
   * @param {Number} position The position of the pointer.
   * @param {String} type Optional Which type of events to listen for.
   */


  Slider.prototype.start = function start(position, type) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return this;
    }

    this._addMoveEventListeners(type || 'mouse');
    this._cacheSize();
    this.isActive = true;
    this._updateActiveClasses();
    this._oldVal = this.value;
    this.move(position);

    return this;
  };

  /**
   * Move the value to a given position
   * @param {Number} position
   * @param {Boolean} force Force the move Optional
   */


  Slider.prototype.move = function move(position, force) {

    // Noop if we haven't yet started dragging
    if ((!position || !this.isActive) && !force) {
      return this;
    }

    // Treat positions beyond the boundaries as the boundaries
    if (this.isX) {

      // Too far left
      if (position < this.offsetLeft) {
        position = this.offsetLeft;
      }
      // Too far right
      else if (position > this.offsetLeft + this.width) {
          position = this.offsetLeft + this.width;
        }
    } else {

      // Too far top
      if (position < this.offsetTop) {
        position = this.offsetTop;
      }
      // Too far bottom
      else if (position > this.offsetTop + this.height) {
          position = this.offsetTop + this.height;
        }
    }

    // The percentage of the new position relative to slider-container width or height.
    var percentage = this.isX ? (position - this.offsetLeft) / (this.width - this.handleSize) : (position - this.offsetTop) / this.height;

    // The value of the input as a percentage of the value range.
    return this.setValue(Math.round((percentage - this.handleSizePercentage / 2) * (this.max - this.min)) + this.min);
  };

  /**
   * Stop listening to movements.
   * @param {String} type Optional Which type of events to listen for.
   */


  Slider.prototype.stop = function stop(type) {

    this.isActive = false;

    if (this._oldVal !== this.value) {
      (this.onChange || noop)(this.value, this);
    }

    this._updateActiveClasses();
    this._removeMoveEventListeners(type || 'mouse');

    return this;
  };

  /**
   * Set the value of the handle.
   * @param {Number} value
   */


  Slider.prototype.setValue = function setValue(value) {

    // Move in increments if we have a defined step size
    if (this.step) {
      value = value - value % this.step;
    }

    // Check bounds of the new value
    if (value > this.max) {
      value = this.max;
    } else if (value < this.min) {
      value = this.min;
    }

    // If there is an onWillChange callback, run it. If it returns
    // false, then this new value should be considered invalid.
    if (typeof this.onWillChange === 'function') {
      var change = this.onWillChange(value, this);
      if (typeof change === 'number') {
        value = change;
      }
    }

    // Store value
    this.value = value;

    // Update elements
    this.inputEl.value = this.value;
    this.handleEl.setAttribute('data-value', this._truncateValueText(this.value));
    this.handleEl.setAttribute('aria-valuenow', this._truncateValueText(this.value));
    this.handleEl.setAttribute('aria-valuetext', this._truncateValueText(this.value));

    // Set the percentage
    this.percentage = (this.value - this.min) / (this.max - this.min);

    // Update the position of the handle
    this._updateHandlePosition();

    return this;
  };

  /**
   * Get the value.
   * @return {Number}
   */


  Slider.prototype.getValue = function getValue() {
    return this.value;
  };

  /**
   * Clear the value.
   */


  Slider.prototype.clearValue = function clearValue() {
    return this.setValue(0);
  };

  /**
   * Set/reset error state
   * @param {Boolean} true: set error state, false: reset
   */


  Slider.prototype.setErrorState = function setErrorState(opt) {
    if (opt) {
      this.el.setAttribute('data-error', '');
    } else {
      this.el.removeAttribute('data-error');
    }
  };

  /**
   * Enable the input.
   */


  Slider.prototype.enable = function enable() {
    this.inputEl.removeAttribute('disabled');
    this.inputEl.removeAttribute('tabindex');
    this.handleEl.removeAttribute('disabled');
    this.handleEl.removeAttribute('tabindex');
    return this;
  };

  /**
   * Disable the input.
   */


  Slider.prototype.disable = function disable() {
    this.inputEl.setAttribute('disabled', '');
    this.inputEl.setAttribute('tabindex', '-1');
    this.handleEl.setAttribute('disabled', '');
    this.handleEl.setAttribute('tabindex', '-1');
    return this;
  };

  /**
   * Increment the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  Slider.prototype.increment = function increment(useMultiplier) {
    return this.setValue(this.value + this.step * (useMultiplier ? 10 : 1));
  };

  /**
   * Decrement the value by the step size.
   * @param {Boolean} useMultiplier Optional Increment by a multiplied version of the step
   */


  Slider.prototype.decrement = function decrement(useMultiplier) {
    return this.setValue(this.value - this.step * (useMultiplier ? 10 : 1));
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Slider.prototype.remove = function remove(leaveElement) {
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Slider.prototype.update = function update(el) {

    this._removeEventListeners();
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');

    this._cacheElements(el);
    this._addEventListeners();
    this._updateHandlePosition();

    return this;
  };

  /**
   * Store a reference to the whole slider, as well as the
   * input element. Also, get some default values from the input
   * element (min, max, steps).
   * @param {Element} el
   */


  Slider.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.controlsEl = this.el.querySelector('.spark-slider__controls');
    this.inputEl = this.el.querySelector('input[type="number"]');
    this.handleEl = this.el.querySelector('.spark-slider__handle');
    this.trackEl = this.el.querySelector('.spark-slider__track');
    this.trackFillEl = this.trackEl.querySelector('.spark-slider__track-fill');

    this.messageEl = this.el.querySelector('.spark-slider__message') || (0, _makeElement2.default)('<span class="spark-slider__message"></span>');

    if (!this.inputEl) {
      throw new Error('Tried to create a slider instance without a number input.');
    }

    if (!this.handleEl) {
      throw new Error('Tried to create a slider instance without a handle button.');
    }

    this.min = parseInt(this.inputEl.getAttribute('min'), 10) || this.min;
    this.max = parseInt(this.inputEl.getAttribute('max'), 10) || this.max;
    this.step = parseInt(this.inputEl.getAttribute('step'), 10) || this.step;

    // If we have a default value, set it after we cache the size of the element.
    // We have to do that first so we know the bounds of the slider.
    var value = parseInt(this.inputEl.getAttribute('value'), 10) || parseInt(this.inputEl.getAttribute('min'), 10);
    if (!isNaN(value)) {
      this._cacheSize();
      this.setValue(value);
    }
  };

  /**
   * Save the element dimensions.
   */


  Slider.prototype._cacheSize = function _cacheSize() {

    this.width = this.trackEl.offsetWidth;
    this.height = this.trackEl.offsetHeight;

    this.handleSize = this.isX ? this.handleEl.offsetWidth : this.handleEl.offsetHeight;
    this.handleSizePercentage = this.isX ? this.handleEl.offsetWidth / this.width : this.handleEl.offsetHeight / this.height;

    var offset = (0, _offset2.default)(this.controlsEl);
    this.offsetLeft = offset.left;
    this.offsetTop = offset.top;
  };

  /**
   * Set the position of the handle.
   */


  Slider.prototype._updateHandlePosition = function _updateHandlePosition() {

    // Track and Track-Fill elements
    var trackPercentage = Math.round(Math.min(this.percentage, 1) * 100);
    this.trackEl.setAttribute('data-percentage', trackPercentage);
    this.trackFillEl.setAttribute('style', 'width: ' + trackPercentage + '%;');

    // Handle position
    var handlePos = this.handleSize / 2 + (this.value - this.min) * ((this.width - this.handleSize) / (this.max - this.min));
    var handlePosPercentage = handlePos / this.width * 100;
    this.handleEl.setAttribute('style', 'left: ' + handlePosPercentage + '%;');
  };

  /**
   * Update the active class on the handle.
   */


  Slider.prototype._updateActiveClasses = function _updateActiveClasses() {
    (0, _toggleClass2.default)(this.handleEl, 'active', this.isActive);
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Slider.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onTouchStartBound = this._onTouchStart.bind(this);
    this._onTouchMoveBound = this._onTouchMove.bind(this);
    this._onTouchEndBound = this._onTouchEnd.bind(this);

    this._onClickBound = this._onClick.bind(this);
    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);
    this._onMouseOutBound = this._onMouseOut.bind(this);

    this._onFocusBound = this._onFocus.bind(this);
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onBlurBound = this._onBlur.bind(this);

    this._onChangeBound = this._onChange.bind(this);

    this._onResizeBound = this._onResize.bind(this);

    this._onVisibleChildrenBound = this._onVisibleChildren.bind(this);
  };

  /**
   * Add event listeners for touchstart and mouse click.
   */


  Slider.prototype._addEventListeners = function _addEventListeners() {

    this.controlsEl.addEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.addEventListener('mousedown', this._onMouseDownBound);

    this.inputEl.addEventListener('change', this._onChangeBound);

    this.handleEl.addEventListener('focus', this._onFocusBound);
    this.handleEl.addEventListener('click', this._onClickBound);

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    document.addEventListener('spark.visible-children', this._onVisibleChildrenBound, true);
  };

  /**
   * Remove event listeners for touchstart and mouse click.
   */


  Slider.prototype._removeEventListeners = function _removeEventListeners() {

    this.controlsEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.controlsEl.removeEventListener('mousedown', this._onMouseDownBound);

    this.inputEl.removeEventListener('change', this._onChangeBound);

    this.handleEl.removeEventListener('focus', this._onFocusBound);
    this.handleEl.removeEventListener('click', this._onClickBound);

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    document.removeEventListener('spark.visible-children', this._onVisibleChildrenBound);
  };

  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the slider handle. Otherwise it's really hard to
   * use the slider unless it's massive.
   * @param {String} type Which type of listeners to add
   */


  Slider.prototype._addMoveEventListeners = function _addMoveEventListeners(type) {

    // Only listen for events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.addEventListener('mousemove', this._onMouseMoveBound);
        window.addEventListener('mouseout', this._onMouseOutBound);
        window.addEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.addEventListener('touchmove', this._onTouchMoveBound);
        window.addEventListener('touchend', this._onTouchEndBound);
        break;
      case 'keyboard':
        window.addEventListener('keydown', this._onKeydownBound);
        this.handleEl.addEventListener('blur', this._onBlurBound);
        break;
    }
  };

  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to remove
   */


  Slider.prototype._removeMoveEventListeners = function _removeMoveEventListeners(type) {

    // Only unbind events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.removeEventListener('mousemove', this._onMouseMoveBound);
        window.removeEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.removeEventListener('touchmove', this._onTouchMoveBound);
        window.removeEventListener('touchend', this._onTouchEndBound);
        break;
      case 'keyboard':
        window.removeEventListener('keydown', this._onKeydownBound);
        this.handleEl.removeEventListener('blur', this._onBlurBound);
        break;
    }
  };

  /**
   * Truncate value text to fit.
   * @param {String} value
   * @return {String}
   */


  Slider.prototype._truncateValueText = function _truncateValueText(value, precision, characters) {

    if (value.length < 5) {
      return value;
    }

    var isNegative = value < 0 ? true : false;

    value = Math.abs(value);
    precision = precision || this.truncatePrecision;
    characters = characters || this.truncateCharacters;

    var i = characters.length - 1;

    precision = Math.pow(10, precision);

    for (i; i >= 0; i--) {

      var size = Math.pow(10, (i + 1) * 3);

      if (size <= value) {

        value = Math.round(value * precision / size) / precision;

        // @todo: what is this doing? i can't remember how we would ever
        // end up inside this condition.
        if (value === 1000 && i < characters.length - 1) {
          value = 1;
          i++;
        }

        value += characters[i];

        break;
      }
    }

    return (isNegative ? '-' : '') + value;
  };

  /**
   * When the touch starts, start the slider.
   * @param {Object} e
   */


  Slider.prototype._onTouchStart = function _onTouchStart(e) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return;
    }

    e.preventDefault();

    this.start(this.isX ? e.touches[0].pageX : e.touches[0].pageY, 'touch');
  };

  /**
   * When the window fires a touchmove event, adjust our value accordingly
   * @param {Object} e
   */


  Slider.prototype._onTouchMove = function _onTouchMove(e) {

    if (!this.isActive) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.touches[0].pageX : e.touches[0].pageY);
  };

  /**
   * When the window fires a touchend event, stop tracking touches
   * @param {Object} e
   */


  Slider.prototype._onTouchEnd = function _onTouchEnd(e) {

    if (!this.isActive) {
      return;
    }

    e.preventDefault();

    this.stop('touch');
  };

  /**
   * When the mouse presses down, start the slider.
   * @param {Object} e
   */


  Slider.prototype._onMouseDown = function _onMouseDown(e) {

    if (this.inputEl.getAttribute('disabled') !== null) {
      return;
    }

    e.preventDefault();

    this.start(this.isX ? e.pageX : e.pageY, 'mouse');
  };

  /**
   * When the window fires a mousemove event, adjust our value accordingly
   * @param {Object} e
   */


  Slider.prototype._onMouseMove = function _onMouseMove(e) {

    if (!this.isActive) {
      return;
    }

    e.preventDefault();

    this.move(this.isX ? e.pageX : e.pageY);
  };

  /**
   * When the window fires a mouseup event, stop tracking
   * @param {Object} e
   */


  Slider.prototype._onMouseUp = function _onMouseUp() {

    if (!this.isActive) {
      return;
    }

    this.stop('mouse');
  };

  /**
   * When the window fires a mouseout event, stop tracking if it was the html element.
   * @param {Object} e
   */


  Slider.prototype._onMouseOut = function _onMouseOut() {}
  // @todo: make this work
  // if (e.relatedTarget === doc.body.parentNode) {
  //   this.stop('mouse');
  // }


  /**
   * Handle the spark.visible-children event
   * @param {Object} e
   */
  ;

  Slider.prototype._onVisibleChildren = function _onVisibleChildren(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._onResize();
      }.bind(this), 0);
    }
  };

  /**
   * When the window resizes, cache size values for the slider.
   * @param {Object} e
   */


  Slider.prototype._onResize = function _onResize() {
    this._cacheSize();
    this._updateHandlePosition();
  };

  /**
   * When the element receives focus, start listening for keyboard events
   * @param {Object} e
   */


  Slider.prototype._onFocus = function _onFocus() {
    this.start(null, 'keyboard');
  };

  /**
   * When a key is pressed, see if it's one of the Arrow, Page up, Page down, Home
   * or End keys move the handle accordingly. If the shift key is pressed in combination
   * with the arrow keys, we'll increment and decrement by bigger values.
   * @param {Object} e
   */


  Slider.prototype._onKeydown = function _onKeydown(e) {
    if (e.keyCode === 39 || e.keyCode === 38) {
      // Right or Up arrow
      this.increment(e.shiftKey);
    } else if (e.keyCode === 37 || e.keyCode === 40) {
      // Left or down arrow
      this.decrement(e.shiftKey);
    } else if (e.keyCode === 33) {
      // Page Up
      this.increment(true);
    } else if (e.keyCode === 34) {
      // Page Down
      this.decrement(true);
    } else if (e.keyCode === 35) {
      // End
      this.setValue(this.max);
    } else if (e.keyCode === 36) {
      // Home
      this.setValue(this.min);
    }
  };

  /**
   * When the element loses focus, stop listening for keyboard events
   * @param {Object} e
   */


  Slider.prototype._onBlur = function _onBlur() {
    this.stop('keyboard');
  };

  /**
   * When the input value changes, set our internal value if it's not already our value.
   * @param {Object} e
   */


  Slider.prototype._onChange = function _onChange(e) {
    if (e.target.value !== this.value) {
      this.setValue(e.target.value);
    }
    (this.onChange || noop)(this.value, this);
  };

  /**
   * Prevent click events on the button. This way we don't accidentally submit the form.
   * @param {Object} e
   */


  Slider.prototype._onClick = function _onClick(e) {
    e.preventDefault();
  };

  /**
   * When the window is clicked and the element isn't part of the slider, trigger a blur.
   * @param {Object} e
   */


  Slider.prototype._onWindowClick = function _onWindowClick(e) {

    if ((0, _hasParent2.default)(e.target, this.el)) {
      this._onBlur();
    }
  };

  return Slider;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Slider.prototype._whitelistedParams = ['isX', 'validate', 'onValidate', 'onChange', 'onWillChange'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Slider.prototype.defaults = {
  el: null,
  messageEl: null,
  controlsEl: null,
  inputEl: null,
  handleEl: null,
  trackEl: null,
  trackFillEl: null,
  isActive: false,
  isX: true,
  onValidate: null,
  onChange: null,
  onWillChange: null,
  position: 0,
  width: 0,
  height: 0,
  min: 0,
  max: 0,
  step: 1,
  value: 0,
  percentage: 0,
  offsetLeft: 0,
  offsetTop: 0,
  handleSizePercentage: 0,
  truncatePrecision: 0,
  truncateCharacters: ['k', 'm', 'b', 't'],
  _oldVal: null,
  _onTouchStartBound: null,
  _onTouchMoveBound: null,
  _onTouchEndBound: null,
  _onMouseDownBound: null,
  _onMouseMoveBound: null,
  _onMouseUpBound: null,
  _onMouseOutBound: null,
  _onFocusBound: null,
  _onKeydownBound: null,
  _onBlurBound: null,
  _onChangeBound: null,
  _onResizeBound: null,
  _onClickBound: null,
  _onVisibleChildrenBound: null
};

(0, _mixin2.default)(Slider.prototype, _messaging2.default, _validation2.default);

exports.default = Slider;
module.exports = exports['default'];


},{"../helpers/dom/make-element":39,"../helpers/dom/offset":40,"../helpers/dom/toggle-class":44,"../helpers/traversal/has-parent":62,"../helpers/util/mixin":66,"../mixins/messaging":71,"../mixins/validation":72,"./base":1}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Step Indicator
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Set of indicators represent different steps
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new StepIndicator(el, params);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/step-indicator.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var noop = function noop() {};

var StepIndicator = function (_BaseComponent) {
  _inherits(StepIndicator, _BaseComponent);

  /**
   * StepIndicator constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function StepIndicator(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, StepIndicator);

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._calculateStyle();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  StepIndicator.prototype.update = function update(el) {

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._parseParams();
    this._addEventListeners();
    this._calculateStyle();

    return this;
  };

  /**
   * Store a reference to the element.
   * @param {Element} el
   */


  StepIndicator.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.containerEl = this.containerEl || el.parentNode;
    this._body = this.el.querySelector('.spark-step-indicator__body');
    this._list = this.el.querySelector('.spark-step-indicator__list');
    this._items = this.el.querySelectorAll('.spark-step-indicator__item');
  };

  /**
   * Parse parameters from the element.
   */


  StepIndicator.prototype._parseParams = function _parseParams() {
    this.type = this.type !== null ? this.type : this.el.attributes['data-type'] && this.el.attributes['data-type'].value;
    this.header = this.header !== null ? this.header : this.el.attributes['data-header'] && true;
    this.subtitle = this.subtitle !== null ? this.subtitle : this.el.attributes['data-subtitle'] && true;
    this.dropdownLabel = this.dropdownLabel !== null ? this.dropdownLabel : this.el.attributes['data-dropdownLabel'] && this.el.attributes['data-dropdownLabel'].value;

    if (!this.dropdownLabel) {
      this.dropdownLabel = 'Select a Step';
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  StepIndicator.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
    this._onLoadBound = this._onLoad.bind(this);
    this._onVisibleBound = this._onVisible.bind(this);
    this._toggleDropdownBound = this._toggleDropdown.bind(this);
    this._onKeydownBound = (0, _debounce2.default)(this._onKeydown.bind(this), 100);
  };

  /**
   * Add event listeners for DOM events.
   */


  StepIndicator.prototype._addEventListeners = function _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
    document.addEventListener('spark.visible-children', this._onVisibleBound, true);
    window.addEventListener('load', this._onLoadBound);
    this.el.addEventListener('keydown', this._onKeydownBound);
    document.addEventListener('spark.step-indicator', this._toggleDropdownBound, true);
  };

  /**
   * Remove event listeners for DOM events..
   */


  StepIndicator.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    document.removeEventListener('spark.visible-children', this._onVisibleBound, true);
    document.removeEventListener('click', this._toggleDropdownBound);
    window.removeEventListener('load', this._onLoadBound);
    this.el.removeEventListener('keydown', this._onKeydownBound);
    document.removeEventListener('spark.step-indicator', this._toggleDropdownBound, true);
  };

  /**
   * Change selected step state into incomplete
   * @param {Int} index of selected step
   */


  StepIndicator.prototype._resetStepState = function _resetStepState(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this._items.length) {
      return;
    }

    (0, _removeClass2.default)(this._items[stepIndex], ['spark-step-indicator__item--completed', 'spark-step-indicator__item--current', 'spark-step-indicator__item--disabled']);
    this._items[stepIndex].removeAttribute('tabindex');
  };

  /**
   * Set selected step state: completed/current/disabled/incomplete
   * For current step, will remove current step from other steps
   * @param {Int} index of selected step
   * @param {String} state to be set
   */


  StepIndicator.prototype.setStepState = function setStepState(stepIndex, state) {
    if (stepIndex < 0 || stepIndex >= this._items.length) {
      return this;
    }
    switch (state) {
      case 'completed':
        this._resetStepState(stepIndex);
        (0, _addClass2.default)(this._items[stepIndex], 'spark-step-indicator__item--completed');
        break;
      case 'current':
        var currentStep = this._list.querySelector('.spark-step-indicator__item--current');
        (0, _removeClass2.default)(currentStep, 'spark-step-indicator__item--current');
        (0, _addClass2.default)(this._items[stepIndex], 'spark-step-indicator__item--current');
        break;
      case 'disabled':
        this._resetStepState(stepIndex);
        (0, _addClass2.default)(this._items[stepIndex], 'spark-step-indicator__item--disabled');
        this._items[stepIndex].setAttribute('tabindex', '-1');
        break;
      case 'incomplete':
        this._resetStepState(stepIndex);
        break;
    }
    this._calculateStyle();
    return this;
  };

  /**
   * When the Enter key is pressed toggle the dropdown or update the selection if in dropdown mode
   * When the Tab key is pressed, navigate to the next element by default otherwise collapse the dropdown
   * @param {Object} Reference of DOM obj
   * @param {Object} Event of click
   */


  StepIndicator.prototype._onKeydown = function _onKeydown(e) {
    if (!(0, _getParent2.default)(e.target, '.spark-step-indicator__list', this.el) && !(0, _getParent2.default)(e.target, '.spark-step-indicator__body--dropdown', this.el)) {
      return;
    }

    var code = e.keyCode || e.which;

    // Enter Key
    if (code === 13) {
      if ((0, _hasClass2.default)(e.target, 'spark-step-indicator__item--dropdown__header')) {
        e.preventDefault();
        this._toggleDropdown(e);
      }
    }

    // Tab Key - Check if focus has now shifted outside of the Step Indicator Dropdown
    if (code === 9) {
      (0, _hasClass2.default)(document.activeElement, 'spark-step-indicator__item') === false && this._dropdownExpand === true ? this._toggleDropdown(e) : null;
    }
  };

  /**
   * Provide a method to bind click callback function to certain step.
   * @param {Array} a set of step indices represent the target of callback
   * @param {Function} callback function
   */


  StepIndicator.prototype.bindStepClickCallback = function bindStepClickCallback(indexArr, callback) {
    callback = callback || noop;
    for (var i = 0; i < indexArr.length; i++) {
      this._items[indexArr[i]].addEventListener('click', callback);
    }
    return this;
  };

  /**
   * Remove click callback from steps
   * @param {Array} a set of step indices represent the target of callback
   * @param {Function} callback function
   *
   */


  StepIndicator.prototype.removeStepClickCallback = function removeStepClickCallback(indexArr, callback) {
    callback = callback || noop;
    for (var i = 0; i < indexArr.length; i++) {
      this._items[indexArr[i]].removeEventListener('click', callback);
    }
    return this;
  };

  /**
   * Work for _calculateStyle.
   * Comparing the width of list and total items, including padding
   * @return {Boolean}
   */


  StepIndicator.prototype._isOverWidth = function _isOverWidth() {
    var listWidth = this._list.offsetWidth;
    var itemTotalWidth = this._listPaddingTotal;
    for (var i = 0; i < this._items.length; i++) {
      itemTotalWidth += this._items[i].offsetWidth;
    }
    if (listWidth < itemTotalWidth) {
      return true;
    }
    return false;
  };

  /**
   * Calcuate different style based settings
   */


  StepIndicator.prototype._calculateStyle = function _calculateStyle() {
    if (!this.header) {
      var titleEl = this.el.querySelector('.spark-step-indicator__title');
      titleEl.style.display = 'none';
      (0, _addClass2.default)(this._body, 'spark-step-indicator__body--no-border');
    }
    if (!this.subtitle) {
      var subtitleEl = this.el.querySelector('.spark-step-indicator__subtitle');
      subtitleEl.style.display = 'none';
    }
    // Remove special DOM and Class of dropdown variation
    this._switchFromDropdown();
    switch (this.type) {
      case 'standard-dropdown':
        this._calculateRespStyle();
        break;
      case 'large':
        this._calculateLargeStyle();
        break;
      case 'condensed':
        this._calculateCondensedStyle();
        break;
      case 'dropdown':
        this._calculateDropdownStyle();
        break;
      default:
        this._calculateStandardStyle();
    }
    // Work for IE11, detect IE11 via userAgent
    // userAgent: Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv 11.0) like Gecko
    var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
    if (isIE11) {
      this._addItemWidth();
    }
  };

  /**
   * For IE11 ONLY, Add width: 100% to work around IE11 bug
   * IE11 will have incorrect position with flex-grow max-width and justify-content when items hit max-width
   * Sometimes after calculating, even itemTotalWidth is less 1px than listWidth,
   * it also means items are fit in the list, not hit the max-width
   * So add 2px to list width when comparing to avoid this.
   */


  StepIndicator.prototype._addItemWidth = function _addItemWidth() {
    if (!(0, _hasClass2.default)(this._list, 'spark-step-indicator__list--condensed') && !(0, _hasClass2.default)(this._body, 'spark-step-indicator__body--dropdown')) {
      var listWidth = this._list.offsetWidth;
      var itemTotalWidth = this._listPaddingTotal;
      for (var i = 0; i < this._items.length; i++) {
        itemTotalWidth += this._items[i].offsetWidth;
      }
      if (listWidth - itemTotalWidth > 2) {
        this._switchWidthForIe11(0, true);
      } else {
        this._switchWidthForIe11(0, false);
      }
    } else {
      this._switchWidthForIe11(0, false);
    }
  };

  /**
   * Switch spark-step-indicator__item style width: 100% to work around IE11 bug
   * @param {Number} start index of step
   * @param {Boolean} whether add width: 100%
   */


  StepIndicator.prototype._switchWidthForIe11 = function _switchWidthForIe11(index, val) {
    for (var i = index; i < this._items.length; i++) {
      this._items[i].style.width = val ? '100%' : '';
    }
  };

  /**
   * Fix on large variation
   * Calculate node and list length remove connect line of each end
   * Sometimes after calculating, even itemTotalWidth is bigger 1px than listWidth,
   * it also means items are fit in the list, not over width.
   * So add 2px to list width when comparing to avoid this.
   * Dependency of _calculateCondensedStyle() and _calculateStandardStyle()
   *
   */


  StepIndicator.prototype._calculateLargeStyle = function _calculateLargeStyle() {
    this._list.style['flex-wrap'] = 'wrap';
    var listWidth = this._list.offsetWidth;
    var itemTotalWidth = this._listPaddingTotal;
    for (var i = 0; i < this._items.length; i++) {
      (0, _removeClass2.default)(this._items[i], 'noline');
      itemTotalWidth += this._items[i].offsetWidth;

      if (listWidth < itemTotalWidth && i > 0) {
        (0, _addClass2.default)(this._items[i - 1], 'noline');
        itemTotalWidth = this._items[i].offsetWidth + this._listPaddingTotal;
      }
    }
  };

  /**
   * Fix on condensed variation
   * Same as fix large variation except CSS class
   */


  StepIndicator.prototype._calculateCondensedStyle = function _calculateCondensedStyle() {
    (0, _addClass2.default)(this._list, 'spark-step-indicator__list--condensed');
    this._calculateLargeStyle();
  };

  /**
   * Fix on dropdown variation
   */


  StepIndicator.prototype._calculateDropdownStyle = function _calculateDropdownStyle() {
    this._switchToDropdown();
  };

  /**
   * Change only between large and condensed variation
   * no dropdown variation
   */


  StepIndicator.prototype._calculateStandardStyle = function _calculateStandardStyle() {
    this._list.style.visibility = 'hidden';
    for (var i = 0; i < this._items.length; i++) {
      (0, _removeClass2.default)(this._items[i], 'noline');
    }
    (0, _removeClass2.default)(this._list, 'spark-step-indicator__list--condensed');
    if (this._isOverWidth()) {
      (0, _addClass2.default)(this._list, 'spark-step-indicator__list--condensed');
      this._calculateLargeStyle();
    }
    this._list.style.visibility = 'visible';
  };

  /**
   * Make list invisible and change it into large variation at first.
   * Switch variation from top to bottom to find the fit one
   */


  StepIndicator.prototype._calculateRespStyle = function _calculateRespStyle() {
    this._list.style.visibility = 'hidden';
    (0, _removeClass2.default)(this._list, 'spark-step-indicator__list--condensed');
    if (this._isOverWidth()) {
      (0, _addClass2.default)(this._list, 'spark-step-indicator__list--condensed');
      if (this._isOverWidth()) {
        (0, _removeClass2.default)(this._list, 'spark-step-indicator__list--condensed');
        this._switchToDropdown();
      }
    }
    this._list.style.visibility = 'visible';
  };

  /**
   * Create header element for dropdown variation
   * Try to find the current step of indicator and show it on the header
   * if not found, show the first step
   * @return {Object} header element of dropdown variation
   */


  StepIndicator.prototype._createDropdownHeader = function _createDropdownHeader() {
    var el = document.createElement('a');
    var currentStep = this._list.querySelector('.spark-step-indicator__item--current');
    // Can not find current step
    if (!currentStep) {
      currentStep = this._items[0];
    }

    // Set ARIA roles and attributes
    el.setAttribute('role', 'button');
    el.setAttribute('aria-expanded', 'false');
    var listID = this._list.getAttribute('id') !== null && this._list.getAttribute('id') !== '' ? this._list.getAttribute('id') : '';
    el.setAttribute('aria-controls', listID);

    el.innerHTML = currentStep.innerHTML;
    el.innerHTML += '<span class="spark-step-indicator__notice">' + this.dropdownLabel + '</span>';

    // Create label element like '2 of 7'
    var stepNotice = document.createElement('span');
    var currentIndex = Array.prototype.indexOf.call(this._items, currentStep);
    stepNotice.innerHTML = currentIndex + 1 + ' of ' + this._items.length;
    stepNotice.className = 'spark-step-indicator__label--dropdown';

    el.appendChild(stepNotice);
    el.className = currentStep.className;
    el.setAttribute('tabindex', '0');

    (0, _addClass2.default)(el, 'spark-step-indicator__item--dropdown__header');
    this._dropdownHeader = el;
  };

  /**
   * Some extra event binder and DOM of dropdown variation need to be set
   */


  StepIndicator.prototype._switchToDropdown = function _switchToDropdown() {
    (0, _addClass2.default)(this._body, 'spark-step-indicator__body--dropdown');
    this._createDropdownHeader();
    this._list.parentNode.insertBefore(this._dropdownHeader, this._list);
    document.removeEventListener('click', this._toggleDropdownBound);
    document.addEventListener('click', this._toggleDropdownBound);
    (0, _addClass2.default)(this._list, 'collapse');

    for (var i = 0; i < this._items.length; i++) {
      if (!(0, _hasClass2.default)(this._items[i], 'spark-step-indicator__item--disabled')) {
        this._items[i].setAttribute('tabindex', '-1');
      }
    }
  };

  /**
   * Remove extra event and DOM when switch variation from dropdown
   */


  StepIndicator.prototype._switchFromDropdown = function _switchFromDropdown() {
    (0, _removeClass2.default)(this._body, 'spark-step-indicator__body--dropdown');
    var header = this._list.parentNode.querySelector('.spark-step-indicator__item--dropdown__header');
    document.removeEventListener('click', this._toggleDropdownBound);
    if (header) {
      this._list.parentNode.removeChild(header);
    }
    (0, _removeClass2.default)(this._list, 'collapse');

    for (var i = 0; i < this._items.length; i++) {
      if (!(0, _hasClass2.default)(this._items[i], 'spark-step-indicator__item--disabled')) {
        this._items[i].removeAttribute('tabindex');
      }
    }
  };

  /**
   * Allow programmatic toggling of Dropdown version of Step Indicator.
   * This becomes desirable particularly in the case of single page applications
   */


  StepIndicator.prototype.toggle = function toggle() {
    if (this._dropdownHeader) {
      var e = document.createEvent('Event');
      e.initEvent('spark.step-indicator', true, true);
      this._dropdownHeader.dispatchEvent(e);
    }
  };

  /**
   * Toggle collapse/expand state of step list in dropdown variation
   * If there is a scroll in dropdown variation, scroll to 'current' node
   * @param {Object} Reference of DOM obj
   * @param {Object} Event of click
   */


  StepIndicator.prototype._toggleDropdown = function _toggleDropdown(e) {
    var target = e.target || e.srcElement;
    if (this._dropdownHeader.contains(target)) {
      if (!this._dropdownExpand) {
        (0, _removeClass2.default)(this._list, 'collapse');
        (0, _addClass2.default)(this._dropdownHeader, 'expand');
        this._dropdownExpand = true;
        this._dropdownHeader.setAttribute('aria-expanded', 'true');

        for (var i = 0; i < this._items.length; i++) {
          if (!(0, _hasClass2.default)(this._items[i], 'spark-step-indicator__item--disabled')) {
            this._items[i].removeAttribute('tabindex');
          }
        }
      } else {
        (0, _addClass2.default)(this._list, 'collapse');
        (0, _removeClass2.default)(this._dropdownHeader, 'expand');
        this._dropdownExpand = false;
        this._dropdownHeader.setAttribute('aria-expanded', 'false');

        for (var _i = 0; _i < this._items.length; _i++) {
          if (!(0, _hasClass2.default)(this._items[_i], 'spark-step-indicator__item--disabled')) {
            this._items[_i].setAttribute('tabindex', '-1');
          }
        }
      }
    } else {
      (0, _addClass2.default)(this._list, 'collapse');
      (0, _removeClass2.default)(this._dropdownHeader, 'expand');
      this._dropdownExpand = false;
      this._dropdownHeader.setAttribute('aria-expanded', 'false');

      for (var _i2 = 0; _i2 < this._items.length; _i2++) {
        if (!(0, _hasClass2.default)(this._items[_i2], 'spark-step-indicator__item--disabled')) {
          this._items[_i2].setAttribute('tabindex', '-1');
        }
      }
    }
    if (this._list.offsetHeight > 0) {
      var scrollMove = 0;
      for (var _i3 = 0; _i3 < this._items.length; _i3++) {
        if ((0, _hasClass2.default)(this._items[_i3], 'spark-step-indicator__item--current')) {
          this._list.scrollTop = scrollMove;
          break;
        }
        scrollMove += this._items[_i3].offsetHeight;
      }
    }
  };

  /**
   * When the window finish loading
   */


  StepIndicator.prototype._onLoad = function _onLoad() {
    this._checkPadding();
    this._calculateStyle();
  };

  /**
   * When the window is resized, base on params make some reponsive change.
   */


  StepIndicator.prototype._onResize = function _onResize() {
    this._checkPadding();
    this._calculateStyle();
  };

  /**
   * Padding is applied to condensed step indicators but not large step indicators.
   * Therefore as large indicators transition to condensed ones and vice versa, verify
   * the padding values in order to properly calculate positioning of divider line classes
   */


  StepIndicator.prototype._checkPadding = function _checkPadding() {
    // Cache list left + right padding for width calculating
    var listStyles = getComputedStyle(this._list);
    var listPaddingLeft = parseInt(listStyles.getPropertyValue('padding-left'), 10);
    var listPaddingRight = parseInt(listStyles.getPropertyValue('padding-right'), 10);
    this._listPaddingTotal = listPaddingLeft + listPaddingRight;
  };

  /**
   * When a parent container shows its children and our element
   * is inside of it, resize
   * @param  {Object} e
   */


  StepIndicator.prototype._onVisible = function _onVisible(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this._calculateStyle();
      }.bind(this), 0);
    }
  };

  return StepIndicator;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


StepIndicator.prototype._whitelistedParams = ['type', 'header', 'subtitle', 'dropdownLabel'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
StepIndicator.prototype.defaults = {
  el: null,
  containerEl: null,
  header: null,
  subtitle: null,
  dropdownLabel: null,
  type: null,
  _body: null,
  _list: null,
  _listPaddingTotal: 0,
  _dropdownExpand: false,
  _dropdownHeader: null,
  _items: null,
  _onResizeBound: null,
  _onVisibleBound: null
};

exports.default = StepIndicator;
module.exports = exports['default'];


},{"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/remove-class":43,"../helpers/traversal/get-parent":58,"../helpers/util/debounce":64,"./base":1}],22:[function(require,module,exports){
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


},{"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"../helpers/form/form-data":47,"../helpers/form/set-caret":48,"../helpers/traversal/get-index":57,"../helpers/traversal/get-parent":58,"../helpers/traversal/get-sibling-after":60,"../helpers/traversal/get-sibling-before":61,"../helpers/traversal/matches":63,"../helpers/util/each":65,"./base":1,"./expand":7}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _transform = require('../helpers/css/transform');

var _transform2 = _interopRequireDefault(_transform);

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

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _getChildren = require('../helpers/traversal/get-children');

var _getChildren2 = _interopRequireDefault(_getChildren);

var _breakpoint = require('../helpers/dom/breakpoint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Tabs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Tabbed navigation
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Tabs(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Alternate breakpoint values.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   breakpoints: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    xs: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      min: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      max: 639
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    // ...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/tabs.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tabs = function (_BaseComponent) {
  _inherits(Tabs, _BaseComponent);

  /**
   * Tabs constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Tabs(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tabs);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._determineSize();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Set the active item.
   * @param {String|Number|Object} el
   */


  Tabs.prototype.setActive = function setActive(el) {

    var panel;

    // If we're passed a string instead of an element or number,
    // get the panel with that id.
    if (typeof el === 'string') {
      panel = this._findPanelByName(el);

      // If we've found a panel, find the corresponding tab.
      if (panel) {
        el = this._findTabByPanel(panel);
      }
    }

    // If we're passed a number instead of an element,
    // get that item from the tabEls NodeList
    if (typeof el === 'number') {
      el = this.tabEls.item(el);
    }

    // If we couldn't find the element or it's already active, stop.
    if (!el || (typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || el === this.activeTabEl) {
      return false;
    }

    // Remove the active class from the currently active tab
    if (this.activeTabEl) {
      (0, _toggleClass2.default)(this.activeTabEl, 'active', false);

      // Remove the aria-selected attribute from the old tab
      this.activeTabEl.querySelector('a').removeAttribute('aria-selected');
      this.previousTabEl = this.activeTabEl;
    }

    // Add the active class and store.
    (0, _toggleClass2.default)(el, 'active', true);

    // Add the aria-selected attribute to the new tab
    el.querySelector('a').setAttribute('aria-selected', 'true');
    this.activeTabEl = el;

    // Focus the tab on the left side if it's to the left of the frame.
    if (-el.offsetLeft > this.x) {
      this.focus(el, 'left');
    }
    // Focus the tab on the right side if it's to the right of the frame.
    else if (el.offsetLeft + el.clientWidth > this.tabListScrollEl.clientWidth - this.x) {
        this.focus(el, 'right');
      }

    // If we don't already have a panel, find the panel that corresponds to this tab.
    if (!panel) {
      panel = this._findPanelByTab(el);
    }

    // Set the new panel to be active.
    (0, _toggleClass2.default)(panel, 'active', true);

    // Set aria-hidden attribute to false for this panel
    panel.setAttribute('aria-hidden', 'false');

    // Remove the active class from the currently active panel.
    if (this.activePanelEl) {
      (0, _toggleClass2.default)(this.activePanelEl, 'active', false);

      // Set aria-hidden attribute to true for this panel
      this.activePanelEl.setAttribute('aria-hidden', 'true');
    }

    // Store the new active panel
    this.activePanelEl = panel;

    // Set the hash
    if (this.useHash) {
      window.location.hash = this.activePanelEl.getAttribute('id') || '';
    }
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.activePanelEl.dispatchEvent(e);

    return this;
  };

  /**
   * Start the drag
   * @param {Object} params
   */


  Tabs.prototype.start = function start(params) {

    params = params || {};

    // Start dragging
    this.isDragging = true;

    // Stash the element and its position
    this.lastX = params.lastX;
    this.lastY = params.lastY;

    // Stash the min and max values
    this._determineMinMax();

    // Add listeners to the body so we can drag this thing anywhere and still get events
    this._addMoveEventListeners(params.type || 'mouse');

    return this;
  };

  /**
   * Stop the drag
   * @param {Object} params
   */


  Tabs.prototype.stop = function stop(params) {

    params = params || {};

    // Make sure we're in bounds
    this._checkX();

    // Stop dragging
    this.isDragging = false;
    this.scrollDistance = 0;

    // Reset the scroll direction
    this.scrollDirection = '';

    // Unbind event listeners on the body
    this._removeMoveEventListeners(params.type);

    return this;
  };

  /**
   * Move the drag point
   * @param {Object} params
   */


  Tabs.prototype.move = function move(params) {

    // Make sure we're currently dragging
    if (!this.isDragging && !params.scroll && !params.force) {
      return this;
    }

    // If we're beyond the bounds, add some resistance to the scroll.
    if (!params.force && (this.x + params.x > this.maxX || this.x + params.x < this.minX)) {
      this.x += params.x / 4;
    } else {
      this.x += params.x;
    }

    this.scrollDistance += Math.abs(params.x);

    if (params.scroll) {
      this._checkX();
    }

    this._updatePosition();

    return this;
  };

  /**
   * Focus on a specific element by bringing it to the middle of the scroller.
   * @param {Element} el
   * @param {String} align Which side to align with.
   */


  Tabs.prototype.focus = function focus(el, align) {

    align = align || 'left';

    this.x = align === 'left' ? -el.offsetLeft : -(el.offsetLeft - this.tabListScrollEl.clientWidth + el.offsetWidth);

    this._checkX();
    this._updatePosition();

    return this;
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Tabs.prototype.remove = function remove(leaveElement) {
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the elements used.
   * @param {Element} el Optional
   */


  Tabs.prototype.update = function update(el) {

    _BaseComponent.prototype.update.call(this, el);

    // Run on the next frame so sizes have updated
    setTimeout(function () {
      this._determineSize();
      this.focus(this.activeTabEl);
    }.bind(this), 0);

    return this;
  };

  /**
   * Find a panel element by name.
   * @param {String} name
   * @return {Object|Null}
   */


  Tabs.prototype._findPanelByName = function _findPanelByName(name) {

    name = name.replace('#', '');

    var i = 0;
    var len = this.panelEls.length;
    var found = null;
    var el;

    for (; i < len && !found; i++) {
      if (this.panelEls[i].getAttribute('id') === name) {
        el = this.panelEls[i];
        found = true;
      }
    }

    return found && el;
  };

  /**
   * Find a panel given its corresponding tab. Try to match based on the
   * id attribute, but fall back to matching based on index.
   * @param {Object} tab
   * @return {Object|Null}
   */


  Tabs.prototype._findPanelByTab = function _findPanelByTab(tab) {

    var anchorChild = tab.querySelector('a');
    var id = anchorChild && anchorChild.getAttribute('href');
    var index = (0, _getIndex2.default)(tab.parentNode.children, tab);
    var i = 0;
    var len = this.panelEls.length;
    var foundById = null;
    var idMatch = null;
    var indexMatch = null;

    id = id ? id.replace('#', '') : id;

    for (; i < len && !foundById; i++) {
      if (id && this.panelEls[i].getAttribute('id') === id) {
        foundById = true;
        idMatch = this.panelEls[i];
      } else if (i === index) {
        indexMatch = this.panelEls[i];
      }
    }

    return foundById && idMatch || indexMatch;
  };

  /**
   * Find a tab given its corresponding panel. Try to match based on the
   * [href] attribute, but fall back to matching based on index.
   * @param {Object} panel
   * @return {Object|Null}
   */


  Tabs.prototype._findTabByPanel = function _findTabByPanel(panel) {

    var id = panel.getAttribute('id');
    var index = (0, _getIndex2.default)(panel.parentNode.children, panel);
    var i = 0;
    var len = this.tabEls.length;
    var foundById = null;
    var idMatch = null;
    var indexMatch = null;

    for (; i < len && !foundById; i++) {
      if (id && (this.tabEls.item(i).querySelector('a').getAttribute('href') === '#' + id || this.tabEls.item(i).getAttribute('href') === '#' + id)) {
        foundById = true;
        idMatch = this.tabEls.item(i);
      } else if (i === index) {
        indexMatch = this.tabEls.item(i);
      }
    }

    return foundById && idMatch || indexMatch;
  };

  /**
   * Find the tab which an element lives inside.
   * @param {Element} el
   * @return {Object}
   */


  Tabs.prototype._findTabByChildElement = function _findTabByChildElement(el) {

    var i = 0;
    var len = this.tabEls.length;
    var found;
    var tab;

    for (; i < len && !found; i++) {

      // There is a chance that the element passed IS a tab. Or maybe a tab is its parent.
      if (this.tabEls.item(i) === el || (0, _hasParent2.default)(el, this.tabEls.item(i))) {
        found = true;
        tab = this.tabEls.item(i);
      }
    }

    return found && tab;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Tabs.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.tabListEl = this.el.querySelector('.spark-tabs__list');
    this.tabListScrollEl = this.tabListEl.parentNode;
    this.tabEls = this.tabListEl.querySelectorAll('.spark-tabs__tab');
    this.panelEls = (0, _getChildren2.default)(this.el.querySelector('.spark-tabs__panels'), '[role="tabpanel"]');
    this.navEl = this.el.querySelector('.spark-tabs__nav');
    this.leftEl = this.navEl.querySelector('.spark-tabs__btn--left');
    this.rightEl = this.navEl.querySelector('.spark-tabs__btn--right');

    // Make sure we have the elements we need
    if (!this.tabListEl || !this.tabEls.length || !this.panelEls.length) {
      throw new Error('Tab element missing either a .spark-tabs__list, or elements with .spark-tabs__tab and .spark-tabs__panel!', this.el);
    }

    // If there is a hash set, use that to try and set the active panel
    var hashSet = window.location.hash && this.setActive(window.location.hash);

    // If we weren't able to set with a hash, find the tab marked active or default to the first tab
    if (!hashSet) {
      this.setActive(this.tabListEl.querySelector('.spark-tabs__tab.active') || 0);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Tabs.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onResizeBound = this._onResize.bind(this);

    this._onTabListClickBound = this._onTabListClick.bind(this);

    this._onRightClickBound = this._onRightClick.bind(this);
    this._onLeftClickBound = this._onLeftClick.bind(this);

    this._onTouchStartBound = this._onTouchStart.bind(this);
    this._onTouchMoveBound = this._onTouchMove.bind(this);
    this._onTouchEndBound = this._onTouchEnd.bind(this);

    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);

    this._onScrollBound = this._onScroll.bind(this);

    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Tabs.prototype._addEventListeners = function _addEventListeners() {

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    this.tabListEl.addEventListener('click', this._onTabListClickBound);

    this.tabListEl.addEventListener('touchstart', this._onTouchStartBound);
    this.tabListEl.addEventListener('mousedown', this._onMouseDownBound);
    this.tabListEl.addEventListener('mousewheel', this._onScrollBound);
    this.tabListEl.addEventListener('DOMMouseScroll', this._onScrollBound);

    this.tabListEl.addEventListener('focus', this._onFocusBound, true);
    this.tabListEl.addEventListener('blur', this._onBlurBound, true);

    if (this.leftEl) {
      this.leftEl.addEventListener('click', this._onLeftClickBound);
    }

    if (this.rightEl) {
      this.rightEl.addEventListener('click', this._onRightClickBound);
    }
  };

  /**
   * Remove event listeners for DOM events..
   */


  Tabs.prototype._removeEventListeners = function _removeEventListeners() {

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    this.tabListEl.removeEventListener('click', this._onTabListClickBound);

    this.tabListEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.tabListEl.removeEventListener('mousedown', this._onMouseDownBound);
    this.tabListEl.removeEventListener('mousewheel', this._onScrollBound);
    this.tabListEl.removeEventListener('DOMMouseScroll', this._onScrollBound);

    this.tabListEl.removeEventListener('focus', this._onFocusBound);
    this.tabListEl.removeEventListener('blur', this._onBlurBound);

    if (this.leftEl) {
      this.leftEl.removeEventListener('click', this._onLeftClickBound);
    }

    if (this.rightEl) {
      this.rightEl.removeEventListener('click', this._onRightClickBound);
    }
  };

  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the tabs.
   * @param {String} type Which type of listeners to add
   */


  Tabs.prototype._addMoveEventListeners = function _addMoveEventListeners(type) {

    // Only listen for events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.addEventListener('mousemove', this._onMouseMoveBound);
        window.addEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.addEventListener('touchmove', this._onTouchMoveBound);
        window.addEventListener('touchend', this._onTouchEndBound);
        break;
    }
  };

  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to remove
   */


  Tabs.prototype._removeMoveEventListeners = function _removeMoveEventListeners(type) {

    // Only unbind events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.removeEventListener('mousemove', this._onMouseMoveBound);
        window.removeEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.removeEventListener('touchmove', this._onTouchMoveBound);
        window.removeEventListener('touchend', this._onTouchEndBound);
        break;
    }
  };

  /**
   * Determine which size class to set on the element. This is a way of using breakpoint-like
   * logic for the tabs. We can't rely on real breakpoints because there is no guarantee that
   * the tabs will be the width of the window.
   * Also determine if we should be showing navigation arrows.
   */


  Tabs.prototype._determineSize = function _determineSize() {

    var width = this.el.clientWidth;
    var bp = (0, _breakpoint.get)(width, this.breakpoints);

    // If the found breakpoint is different than the current breakpoint, set the proper state.
    if (this.currentBreakpoint !== bp) {
      (0, _toggleClass2.default)(this.el, this.currentBreakpoint, false);
      this.currentBreakpoint = bp;
      (0, _toggleClass2.default)(this.el, this.currentBreakpoint, true);
    }

    // If the tab list is wider than the scroll container, set the scrollable class.
    this.isScrollable = this.tabListEl.clientWidth > this.tabListScrollEl.clientWidth;
    (0, _toggleClass2.default)(this.navEl, 'scrollable', this.isScrollable);
    this._determineMinMax();
  };

  /**
   * Determine the min and max values for the slider.
   */


  Tabs.prototype._determineMinMax = function _determineMinMax() {

    if (!this.tabListEl || !this.tabListScrollEl) {
      return;
    }

    this.maxX = 0;
    this.minX = this.tabListScrollEl.clientWidth - this.tabListEl.clientWidth - this.maxX;
  };

  /**
   * Enable the animation state.
   */


  Tabs.prototype._enableAnimation = function _enableAnimation() {
    this.isAnimatable = true;
    (0, _toggleClass2.default)(this.navEl, 'no-animation', !this.isAnimatable);
  };

  /**
   * Disable the animation state.
   */


  Tabs.prototype._disableAnimation = function _disableAnimation() {
    this.isAnimatable = false;
    (0, _toggleClass2.default)(this.navEl, 'no-animation', !this.isAnimatable);
  };

  /**
   * Update the position of the tabs.
   */


  Tabs.prototype._updatePosition = function _updatePosition() {
    this.tabListEl.setAttribute('style', (0, _transform2.default)('translate', this.x + 'px'));
  };

  /**
   * Check the x position
   */


  Tabs.prototype._checkX = function _checkX() {

    if (this.x < this.minX) {
      this.x = this.minX;
      this._updatePosition();
    }

    if (this.x > 0) {
      this.x = 0;
      this._updatePosition();
    }
  };

  /**
   * When the user clicks on a tab, make it active.
   * @param {Object} e
   */


  Tabs.prototype._onTabListClick = function _onTabListClick(e) {

    // Make sure we haven't scrolled.
    if (this.scrollDistance > 5) {
      e.preventDefault();
      return;
    }

    var tab;

    // Find if one of our tab elements is in the path
    if (tab = this._findTabByChildElement(e.target)) {
      e.preventDefault();
      this.setActive(tab);
    }
  };

  /**
   * When the window resizes, determine the size we should be using for tabs.
   * @param {Object} e
   */


  Tabs.prototype._onResize = function _onResize() {
    this._determineSize();
    this.focus(this.activeTabEl);
  };

  /**
   * When the touchstart event fires, start the scrolling process
   * @param {Object} e
   */


  Tabs.prototype._onTouchStart = function _onTouchStart(e) {

    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    this.start({
      lastX: e.touches[0].clientX,
      lastY: e.touches[0].clientY,
      type: 'touch'
    });
  };

  /**
   * As the user continues moving the touch, determine
   * if we should move.
   * @param {Object} e
   */


  Tabs.prototype._onTouchMove = function _onTouchMove(e) {

    var xDistance = e.touches[0].clientX - this.lastX;
    var yDistance = e.touches[0].clientY - this.lastY;

    // If we haven't yet determined a scroll direction
    if (!this.scrollDirection) {

      // Moving up and down
      if (Math.abs(yDistance) > Math.abs(xDistance)) {
        this.scrollDirection = 'ns';
      }
      // Moving side to side
      else {
          this.scrollDirection = 'ew';
        }
    }

    // If We're moving left to right, start the move.
    if (this.scrollDirection === 'ew') {

      e.preventDefault();

      this.move({
        x: xDistance
      });
    }

    this.lastX = e.touches[0].clientX;
    this.lastY = e.touches[0].clientY;
  };

  /**
   * When the touch is over.
   * @param {Object} e
   */


  Tabs.prototype._onTouchEnd = function _onTouchEnd() {

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'touch'
      });
    }.bind(this), 1);
  };

  /**
   * When the mousedown event fires, start the scrolling process
   * @param {Object} e
   */


  Tabs.prototype._onMouseDown = function _onMouseDown(e) {

    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    this.start({
      lastX: e.clientX,
      lastY: e.clientY,
      type: 'mouse'
    });
  };

  /**
   * As the user continues moving the mouse, determine
   * if we should move.
   * @param {Object} e
   */


  Tabs.prototype._onMouseMove = function _onMouseMove(e) {

    var xDistance = e.clientX - this.lastX;
    var yDistance = e.clientY - this.lastY;

    // If we haven't yet determined a scroll direction
    if (!this.scrollDirection) {

      // Moving up and down
      if (Math.abs(yDistance) > Math.abs(xDistance)) {
        this.scrollDirection = 'ns';
      }
      // Moving side to side
      else {
          this.scrollDirection = 'ew';
        }
    }

    // If We're moving left to right, start the move.
    if (this.scrollDirection === 'ew') {

      e.preventDefault();

      this.move({
        x: xDistance
      });
    }

    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  /**
   * When the mouse move is complete.
   * @param {Object} e
   */


  Tabs.prototype._onMouseUp = function _onMouseUp() {

    // If we haven't been dragging, get outta here!
    if (!this.isDragging) {
      return;
    }

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'mouse'
      });
    }.bind(this), 1);
  };

  /**
   * When the user scrolls horizontally on the tabs, slide.
   * @param {Object} e
   */


  Tabs.prototype._onScroll = function _onScroll(e) {

    // Don't bother if we aren't scrollable
    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    // Allow for Firefox's wheel detail
    var val = e.wheelDeltaX || -e.detail * 40;

    // If the scroll has moved...
    if (val) {

      // Supress native
      e.preventDefault();

      // Move us to the new position
      this.move({
        x: val,
        scroll: true
      });
    }

    // Cancel an existing scroll timer
    if (this.scrollTimer) {
      window.clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }

    // The scroll is considered "done" after 100ms
    this.scrollTimer = window.setTimeout(this._onScrollEnd.bind(this), 100);
  };

  /**
   * When the scrolling ends, reset the scrollTop
   */


  Tabs.prototype._onScrollEnd = function _onScrollEnd() {

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'scroll'
      });
    }.bind(this), 1);
  };

  /**
   * When the left button is clicked, slide the tabs to the right.
   */


  Tabs.prototype._onLeftClick = function _onLeftClick() {
    this.move({
      x: this.tabListScrollEl.clientWidth,
      force: true
    });
    this.stop({
      type: 'force'
    });
  };

  /**
   * When the right button is clicked, slide the tabs to the left.
   */


  Tabs.prototype._onRightClick = function _onRightClick() {
    this.move({
      x: -this.tabListScrollEl.clientWidth,
      force: true
    });
    this.stop({
      type: 'force'
    });
  };

  /**
   * When focus is gained on a tab.
   * @param {Object} e
   */


  Tabs.prototype._onFocus = function _onFocus(e) {
    var target = e.target || e.srcElement;
    var parent = (0, _getParent2.default)(target, '.spark-tabs__tab', this.tabListEl);
    if (parent) (0, _addClass2.default)(parent, 'focus');
  };

  /**
   * When focus is lost on a tab.
   * @param {Object} e
   */


  Tabs.prototype._onBlur = function _onBlur(e) {
    var target = e.target || e.srcElement;
    var parent = (0, _getParent2.default)(target, '.spark-tabs__tab', this.tabListEl);
    if (parent) (0, _removeClass2.default)(parent, 'focus');
  };

  return Tabs;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Tabs.prototype._whitelistedParams = ['useHash', 'breakpoints'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Tabs.prototype.defaults = {
  el: null,
  tabListEl: null,
  tabListScrollEl: null,
  tabEls: null,
  panelEls: null,
  activeTabEl: null,
  activePanelEl: null,
  navEl: null,
  leftEl: null,
  rightEl: null,
  useHash: false,
  isScrollable: false,
  isDragging: false,
  isAnimatable: false,
  scrollDirection: '',
  scrollDistance: 0,
  lastX: 0,
  lastY: 0,
  minX: 0,
  maxX: 0,
  x: 0,
  _onFocusBound: null,
  _onBlurBound: null,
  _onTabListClickBound: null,
  _onLeftClickBound: null,
  _onRightClickBound: null,
  _onResizeBound: null,
  _onTouchStartBound: null,
  _onTouchMoveBound: null,
  _onTouchEndBound: null,
  _onMouseDownBound: null,
  _onMouseMoveBound: null,
  _onMouseUpBound: null,
  _onScrollBound: null
};

exports.default = Tabs;
module.exports = exports['default'];


},{"../helpers/css/transform":33,"../helpers/dom/add-class":36,"../helpers/dom/breakpoint":37,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"../helpers/traversal/get-children":56,"../helpers/traversal/get-index":57,"../helpers/traversal/get-parent":58,"../helpers/traversal/has-parent":62,"./base":1}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _typeahead = require('./typeahead');

var _typeahead2 = _interopRequireDefault(_typeahead);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _mixin = require('../helpers/util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _messaging = require('../mixins/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _validation = require('../mixins/validation');

var _validation2 = _interopRequireDefault(_validation);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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


var noop = function noop() {};

var TextInput = function (_BaseComponent) {
  _inherits(TextInput, _BaseComponent);

  /**
   * TextInput constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function TextInput(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextInput);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._createTypeahead();

    if (_this.inputEl.value) {
      _this.show();
      _this._onInput();
    }
    return _possibleConstructorReturn(_this);
  }

  /**
   * Show the input by adding the active state and setting character counts (if necessary).
   */


  TextInput.prototype.show = function show() {
    this.isActive = true;
    this._updateClass();
    return this;
  };

  /**
   * Hide the input by removing the active state.
   */


  TextInput.prototype.hide = function hide() {
    this.isActive = false;
    this._updateClass();
    return this;
  };

  /**
   * Set the value of the input.
   * @param {Mixed} value
   */


  TextInput.prototype.setValue = function setValue(value) {

    if (this.typeahead) {
      this.typeahead.setValue(value);
    } else {
      this.inputEl.value = value;
      if (value) {
        this.show();
      } else {
        this.hide();
      }
    }

    return this;
  };

  /**
   * Get the value of the input.
   * @return {String}
   */


  TextInput.prototype.getValue = function getValue() {
    return this.inputEl.value;
  };

  /**
   * Clear the value of the input.
   */


  TextInput.prototype.clearValue = function clearValue() {
    if (this.typeahead) this.typeahead.clear();else this.inputEl.value = '';
    return this;
  };

  /**
   * Disable the input.
   */


  TextInput.prototype.disable = function disable() {
    if (this.typeahead) this.typeahead.disable();else this.inputEl.setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable the input.
   */


  TextInput.prototype.enable = function enable() {
    if (this.typeahead) this.typeahead.enable();else this.inputEl.removeAttribute('disabled');
    return this;
  };

  /**
   * Remove.
   * @param {Boolean} leaveElement
   */


  TextInput.prototype.remove = function remove(leaveElement) {
    if (this.typeahead) this.typeahead.remove(leaveElement);
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the element in use and the position.
   * @param {Element} el
   */


  TextInput.prototype.update = function update(el) {
    if (this.typeahead) this.typeahead.remove();
    return _BaseComponent.prototype.update.call(this, el);
  };

  /**
   * Create the typeahead instance.
   */


  TextInput.prototype._createTypeahead = function _createTypeahead() {

    if (this.typeahead === true || this.inputEl.getAttribute('data-typeahead') !== null) {
      this.typeahead = new _typeahead2.default(this.el, {
        onBlur: this._onBlurBound
      });
    }
  };

  /**
   * Store a reference to the needed elements.
   * @param {Element} el
   */


  TextInput.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.inputEl = this.el.querySelector('input, textarea');
    this.passwordToggleEl = this.el.querySelector('.spark-input__password-toggle');

    if (!this.inputEl) {
      throw new Error('No <input> or <textarea> element present in input container!', this.el);
    }

    this.messageEl = this.el.querySelector('.spark-input__message') || (0, _makeElement2.default)('<span class="spark-input__message"></span>');

    this.clearEl = this.el.querySelector('.spark-input__clear');
  };

  /**
   * Parse parameters from the elements.
   */


  TextInput.prototype._parseParams = function _parseParams() {

    this.validatePattern = this.validatePattern || this.inputEl.getAttribute('data-validate');
    this.type = this.inputEl.getAttribute('type') || 'text';
    this.showCharacters = this.el.getAttribute('data-characters') !== null ? true : false;
    this.showCharactersRemaining = this.el.getAttribute('data-characters-remaining') !== null ? true : false;
    this.maxlength = this.inputEl.getAttribute('maxlength') || this.inputEl.getAttribute('data-maxlength-soft') || null;
    this.isTextarea = this.inputEl.nodeName.toLowerCase() === 'textarea' ? true : false;
    this.isActive = this.inputEl.value ? true : false;
  };

  /**
   * Set the characters count attribute.
   */


  TextInput.prototype._setCharactersCount = function _setCharactersCount() {

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
  };

  /**
   * Set the height of the textarea so that it doesn't scroll.
   */


  TextInput.prototype._setTextareaHeight = function _setTextareaHeight() {

    var style = window.getComputedStyle(this.inputEl);
    var borders = parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10);

    this.inputEl.style.height = null;

    var height = this.inputEl.scrollHeight;
    var lines;

    // No height, most likely the element is invisible. Get a rough
    // approximation of height so we have something.
    if (!height) {
      lines = this.inputEl.innerHTML.split('\n');
      height = Math.max(parseFloat(style.lineHeight)) * lines.length + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    }

    this.inputEl.style.height = height + borders + 'px';
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  TextInput.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onInputBound = this._onInput.bind(this);
    this._onTogglePasswordViewHideBound = this._onTogglePasswordViewHide.bind(this);
    this._onClearClickBound = this._onClearClick.bind(this);
  };

  /**
   * Add event listeners for focus, blur, input, and click.
   */


  TextInput.prototype._addEventListeners = function _addEventListeners() {

    this.inputEl.addEventListener('focus', this._onFocusBound);
    this.inputEl.addEventListener('blur', this._onBlurBound);
    this.inputEl.addEventListener('input', this._onInputBound);

    if (this.passwordToggleEl) {
      this.passwordToggleEl.addEventListener('click', this._onTogglePasswordViewHideBound);
    }

    if (this.clearEl) {
      this.clearEl.addEventListener('click', this._onClearClickBound);
    }
  };

  /**
   * Remove event listeners for focus, blur and input.
   */


  TextInput.prototype._removeEventListeners = function _removeEventListeners() {

    this.inputEl.removeEventListener('focus', this._onFocusBound);
    this.inputEl.removeEventListener('blur', this._onBlurBound);
    this.inputEl.removeEventListener('input', this._onInputBound);

    if (this.passwordToggleEl) {
      this.passwordToggleEl.removeEventListener('click', this._onTogglePasswordViewHideBound);
    }

    if (this.clearEl) {
      this.clearEl.removeEventListener('click', this._onClearClickBound);
    }
  };

  /**
   * Update the active class.
   */


  TextInput.prototype._updateClass = function _updateClass() {
    (0, _toggleClass2.default)(this.el, 'active', this.isActive);
  };

  /**
   * When the input element gains focus.
   * @param {Object} e
   */


  TextInput.prototype._onFocus = function _onFocus() {
    this.show();
    this._setCharactersCount();
    (0, _toggleClass2.default)(this.el, 'focus', true);
    (this.onFocus || noop)(this.inputEl.value, this);
  };

  /**
   * When the input element loses focus.
   * @param {Object} e
   */


  TextInput.prototype._onBlur = function _onBlur() {
    if (!this.inputEl.value) {
      this.hide();
    }
    (0, _toggleClass2.default)(this.el, 'focus', false);
    (this.onBlur || noop)(this.inputEl.value, this);
  };

  /**
   * When the value is about to change, run the validation, set the characters count
   * and resize if we're a textarea.
   * @param {Object} e
   */


  TextInput.prototype._onInput = function _onInput() {

    this.validate();
    this._setCharactersCount();

    if (this.isTextarea) {
      this._setTextareaHeight();
    }

    (this.onChange || noop)(this.inputEl.value, this);
  };

  /**
   * When a clear button is clicked, empty the field.
   * @param {Object} e
   */


  TextInput.prototype._onClearClick = function _onClearClick() {
    this.inputEl.value = '';
    this.hide();
    (this.onChange || noop)(this.inputEl.value, this);
  };

  /**
   * Toggle the current type value (text/password) of password input.
   * @param {Object} e
   */


  TextInput.prototype._onTogglePasswordViewHide = function _onTogglePasswordViewHide(e) {
    e.preventDefault();
    this.inputEl.setAttribute('type', this.inputEl.getAttribute('type') === 'password' ? 'text' : 'password');
  };

  return TextInput;
}(_base2.default);

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

(0, _mixin2.default)(TextInput.prototype, _messaging2.default, _validation2.default);

exports.default = TextInput;
module.exports = exports['default'];


},{"../helpers/dom/make-element":39,"../helpers/dom/toggle-class":44,"../helpers/util/mixin":66,"../mixins/messaging":71,"../mixins/validation":72,"./base":1,"./typeahead":28}],25:[function(require,module,exports){
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


},{"../helpers/traversal/get-parent":58,"../helpers/util/debounce":64,"./base":1}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * # Toolbar
                                                                                                                                                           * Setup a responsive toolbar
                                                                                                                                                           *
                                                                                                                                                           * @example
                                                                                                                                                           * new Toolbar(el);
                                                                                                                                                           *
                                                                                                                                                           * @module components/toolbar.js
                                                                                                                                                           */


var Toolbar = function () {

  /**
   * Toolbar constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Toolbar(el) {
    _classCallCheck(this, Toolbar);

    if (!el) return;
    this._init(el);
  }

  /**
   * This function will update cached sizing when an element in the toolbar is changed
   * or, when toolbar items are added or removed
   */


  Toolbar.prototype.change = function change() {
    this._closeAll();
    (0, _removeClass2.default)(this.el, ['ready', 'show-more', 'measured']);
    var v = document.createDocumentFragment();
    for (var i = 0; i < this.items.length; i++) {
      v.appendChild(this.items[i].el);
    }
    this.visibleContainer.appendChild(v);
    this._initItems();
    (0, _addClass2.default)(this.el, 'measured');
    this._calculateStyles();
    (0, _addClass2.default)(this.el, 'ready');
    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Toolbar.prototype.update = function update(el) {

    if (el) {
      this.remove(true);
      this._init(el);
    } else {
      this.change();
    }

    return this;
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Toolbar.prototype.remove = function remove(leaveElement) {
    this._removeListeners();
    delete this.el.sparktoolbarcon;
    delete this.showMoreButton.sparktoolbarshowmore;
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].remove();
    }
    if (!leaveElement && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      this.el = undefined;
    }
    return this;
  };

  /**
   * Setup a toolbarItem Instance to track the state of individual toolbar items
   * @param {Element} parent Reference to parent toolbar
   * @param {Element} el Node to initalize as toolbarItem
   * @param {Number} order The original index of the item in list of toolbarItems (used for maintaining order when sorting)
   */


  Toolbar.prototype.toolbarItem = function toolbarItem(parent, el, order) {
    //Setup and cache the values for this item
    var a = {};
    a.parent = parent;
    a.el = el;
    //cache the priority value present on the toolbar element if it is present, else default to 0
    a.priority = a.el.attributes['data-priority'] ? a.el.attributes['data-priority'].value : 0;
    a.order = a.el.attributes['data-order'] ? a.el.attributes['data-order'].value : order;
    a.hasContent = a.el.querySelector('.spark-toolbar__item--content') ? true : false;
    a.helper = a.el.querySelector('.spark-toolbar__item-helper');
    a.label = a.el.attributes.label ? a.el.attributes.label.value : false;
    a.closeOnClick = (0, _hasClass2.default)(a.el, 'spark-toolbar__item--close-more-on-click');
    a.width = a.el.offsetWidth;
    a.height = a.el.offsetHeight;
    a.dropdown = el.querySelector('.spark-toolbar__item--content');
    if (a.dropdown) {
      a.dropdown.sparktoolbardropdown = true;
    }
    /**
     * Call method to toggle the open state, optional param sets open state to value
     * Can get current state by referencing a.toggleDropdown.open
     * @param {Boolean} open Set state to this regardless of current state
     */
    a.toggleDropdown = function (open) {
      var o = typeof open !== 'undefined' ? !open : a.toggleDropdown.open;
      if (o) {
        a.toggleDropdown.open = false;
        (0, _removeClass2.default)(a.el, 'animate');
        window.setTimeout(function () {
          (0, _removeClass2.default)(a.el, 'open');
        }, 100);
      } else {
        if (a.hasContent) {
          a.toggleDropdown.open = true;
          (0, _addClass2.default)(a.el, 'open');
          a.positionDropdown();
          var e = document.createEvent('Event');
          e.initEvent('spark.visible-children', true, true);
          a.dropdown.dispatchEvent(e);
          window.setTimeout(function () {
            (0, _addClass2.default)(a.el, 'animate');
          }, 0);
        } else {
          a.parent._toggleShowMore(false);
        }
      }
    };
    /**
     * Click handler for local element - determines to close element
     * conditionally based on presence of spark-toolbar__item--close-on-click
     * closes parent's more dropdown conditionally as well
     * @param {Boolean} open Set state to this regardless of current state
     */
    a.handleClick = function (e) {

      if ((0, _parseAttribute.boolean)(a.el, 'disabled')) {
        e.preventDefault();
        return;
      }

      if (!a.toggleDropdown.open) {
        a.toggleDropdown(true);
      } else {
        if (e.target === a.el || e.target === a.helper) {
          a.toggleDropdown();
        } else {
          var b = e.target;
          while (b !== a.el) {
            if ((0, _hasClass2.default)(b, 'spark-toolbar__item--close-on-click')) {
              a.toggleDropdown(false);
              //close the mode section, as event originated inside a close-on-click area
              a.parent._toggleShowMore(false);
              break;
            }
            b = b.parentElement;
          }
        }
      }
      //e.preventDefault();
    };
    //perform bounds checking on dropdown open to position dropdown inside visual area
    //this is called each time a dropdown is opened, in case the state of the component has
    //changed since initialization
    a.positionDropdown = function () {
      if (a.dropdown) {
        a.dropdown.style.left = '';
        a.dropdown.style.right = '';
        var pos = a.dropdown.getBoundingClientRect();
        var left = window.pageXOffset;
        var right = window.pageXOffset + document.documentElement.clientWidth;
        if (pos.right > right) {
          a.dropdown.style.left = 'inherit';
          a.dropdown.style.right = 0;
        }
        if (pos.left < left) {
          a.dropdown.style.left = 0;
          a.dropdown.style.right = 'inherit';
        }
      }
    };
    a.remove = function () {
      if (a.el) {
        delete a.el.sparktoolbar;
      }
      if (a.dropdown) {
        delete a.dropdown.sparktoolbardropdown;
      }
    };
    a.el.sparktoolbar = a;
    return a;
  };

  /**
   * Close any open items, and more dropdown
   */


  Toolbar.prototype._closeAll = function _closeAll() {
    this._closeItems();
    this._toggleShowMore(false);
  };

  /**
   * Returns array of open toolbarItems
   */


  Toolbar.prototype._getOpenItems = function _getOpenItems() {
    var a = [];
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].toggleDropdown.open) {
        a.push(this.items[i]);
      }
    }
    return a;
  };

  /**
   * Close any open items
   * @param {Array} a Optional array of toolbarItems to close, defaults to all open items
   */


  Toolbar.prototype._closeItems = function _closeItems(a) {
    a = typeof a === 'undefined' ? this._getOpenItems() : a;
    for (var i = 0; i < a.length; i++) {
      a[i].toggleDropdown(false);
    }
  };

  /**
   * Setup the toolbar element, cache properties, and initalize styling
   * when complete, show toolbar
   * @param {Element} el The node to initalize on
   */


  Toolbar.prototype._init = function _init(el) {
    this.el = el;
    //store a reference to this on the node to expedite event handling
    this.el.sparktoolbarcon = this;
    this.visibleContainer = this.el.querySelector('.spark-toolbar__container--visible');
    this.hiddenContainer = this.el.querySelector('.spark-toolbar__container--hidden');
    this.showMoreButton = this.el.querySelector('.spark-toolbar__show-more');
    this.showMoreButton.sparktoolbarshowmore = true;
    this.isOpen = false;
    this.isFocus = false;
    this._setupListeners();
    this.el.style.width = '100%';
    this._initItems();
    (0, _addClass2.default)(this.el, 'measured');
    this._calculateStyles();
    this.tabindex = this.el.attributes.tabindex ? this.el.attributes.tabindex.value : 0;
    (0, _addClass2.default)(this.el, 'ready');
  };

  Toolbar.prototype._initItems = function _initItems() {
    var items = this.el.querySelectorAll('.spark-toolbar__item');
    this.items = [];
    for (var i = 0; i < items.length; i++) {
      this.items[i] = new this.toolbarItem(this, items[i], i);
    }
  };

  /**
   * Setup event listeners for clicks and resize events
   */


  Toolbar.prototype._setupListeners = function _setupListeners() {
    this._handleWindowClick = this._handleWindowClickH.bind(this);
    document.addEventListener('click', this._handleWindowClick);
    this._handleResize = (0, _debounce2.default)(this._handleResizeH.bind(this), 100);
    window.addEventListener('resize', this._handleResize);
    this._handleKeyDown = this._handleKeyDownH.bind(this);
    this.el.addEventListener('keydown', this._handleKeyDown);
    this._handleFocus = this._handleFocusH.bind(this);
    document.addEventListener('focus', this._handleFocus, true);
    this._handleBlur = this._handleBlurH.bind(this);
    document.addEventListener('blur', this._handleBlur, true);
    this._handleVisibleChildren = this._handleVisibleChildrenH.bind(this);
    document.addEventListener('spark.visible-children', this._handleVisibleChildren, true);
  };

  /**
   * Remove event listeners for clicks and resize events
   */


  Toolbar.prototype._removeListeners = function _removeListeners() {
    document.removeEventListener('click', this._handleWindowClick);
    window.removeEventListener('resize', this._handleResize);
    this.el.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('blur', this._handleBlur, true);
    document.removeEventListener('focus', this._handleFocus, true);
    document.removeEventListener('spark.visible-children', this._handleVisibleChildren, true);
  };

  /**
   * reset our tab index when user focuses outside of element (gets immediately reset to -1 if focus is placed back inside element)
   * @param {Event} e The FocusEvent
   */


  Toolbar.prototype._handleBlurH = function _handleBlurH(e) {
    if (this.el.contains(e.target)) {
      this.el.attributes.tabindex.value = this.tabindex;
    }
  };

  /**
   * focus handler, works in conjunction with blur handler to set correct tabindex value
   * @param {Event} e The FocusEvent
   */


  Toolbar.prototype._handleFocusH = function _handleFocusH(e) {
    //if we're not being focused, reset our tabindex so we are accessible again, and close anything open
    if (!this.el.contains(e.target)) {
      this._closeAll();
      this.el.attributes.tabindex.value = this.tabindex;
    } else {
      //set our tabindex to -1 so the user can shift-tab out of our element
      this.el.attributes.tabindex.value = -1;
      if (e.target.sparktoolbarcon) {
        this._focusLast();
        return;
      }
      //handle focusing an item
      if (e.target.sparktoolbar) {
        e.target.sparktoolbar.el.focus();
        return;
      }
      var a = e.target;
      //harder case - look up the tree to find if we're focusing inside content
      while (!a.sparktoolbarcon) {
        if (a.sparktoolbar) {
          break;
        }
        //if we are - give our parent element a tabindex so the user can refocus the menu using shift-tab
        if (a.sparktoolbardropdown) {
          this.el.attributes.tabindex.value = this.tabindex;
          return;
        }
        a = a.parentElement;
      }
    }
  };

  /**
   * reset our focus to the last menu item that was focused
   */


  Toolbar.prototype._focusLast = function _focusLast() {
    if (!this._lastFocus) {
      var a = this.visibleContainer.querySelector('.spark-toolbar__item') || this.hiddenContainer.querySelector('.spark-toolbar__item');
      this._lastFocus = a.sparktoolbar;
    }
    if (this.hiddenContainer.contains(this._lastFocus.el)) {
      this._toggleShowMore(true);
    }
    this._lastFocus.el.focus();
  };

  /**
   * keydown handler, used for keyboard navigation
   * @param {Event} e The KeyDown Event
   */


  Toolbar.prototype._handleKeyDownH = function _handleKeyDownH(e) {
    var a = e.target;
    //find the nearest toolbaritem
    while (!a.sparktoolbarcon) {
      if (a.sparktoolbar) {
        break;
      }
      if (a.sparktoolbardropdown) {
        return;
      }
      a = a.parentElement;
    }
    if (a.sparktoolbar) {
      //handle keys
      switch (e.keyCode) {
        //left arrow
        //up arrow
        case 37:
        case 38:
          if (a.previousSibling && a.previousSibling.sparktoolbar) {
            this._lastFocus = a.previousSibling.sparktoolbar;
            a.previousSibling.focus();
          } else {
            if (this.visibleContainer.querySelector('.spark-toolbar__item') !== a.sparktoolbar.el) {
              a = this.visibleContainer.querySelector('.spark-toolbar__item:last-of-type');
              if (a) {
                this._toggleShowMore(false);
                this._lastFocus = a.sparktoolbar;
                a.focus();
              }
            }
          }
          this._closeItems();
          e.preventDefault();
          break;
        //right arrow
        //down arrow
        case 39:
        case 40:
          if (a.nextSibling && a.nextSibling.sparktoolbar) {
            this._lastFocus = a.nextSibling.sparktoolbar;
            a.nextSibling.focus();
          } else {
            if (this.hiddenContainer.querySelector('.spark-toolbar__item:last-of-type') !== a.sparktoolbar.el) {
              a = this.hiddenContainer.querySelector('.spark-toolbar__item');
              if (a) {
                this._toggleShowMore(true);
                this._lastFocus = a.sparktoolbar;
                a.focus();
              }
            }
          }
          this._closeItems();
          e.preventDefault();
          break;
        //spacebar
        case 32:
          e.preventDefault();
          //we only want to toggle the toolbar if we are actually focused directly on it;
          if (e.target.sparktoolbar) {
            e.target.sparktoolbar.el.click();
          }
          break;
        //enter
        case 13:
          //we only want to toggle the toolbar if we are actually focused directly on it;
          if (e.target.sparktoolbar) {
            e.target.sparktoolbar.el.click();
          }
          break;
      }
    }
  };

  /**
   * Hanldes the spark.visible-children event to resize the component when it is made visible.
   * @param {Event} e The spark.visible-children event
   */


  Toolbar.prototype._handleVisibleChildrenH = function _handleVisibleChildrenH(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this.change();
      }.bind(this), 0);
    }
  };

  /**
   * Event handler for click events, handles window clicks, control element clicks,
   * and forwards events to toolbarItem click handlers as needed
   * @param {Event} e The click event
   */


  Toolbar.prototype._handleWindowClickH = function _handleWindowClickH(e) {

    if ((0, _parseAttribute.boolean)(e.target, 'disabled')) {
      e.preventDefault();
      return;
    }

    //Check to see if the click was outside of the toolbar
    if (!this.el.contains(e.target)) {
      this._closeItems();
      this._toggleShowMore(false);
    } else {
      var a = e.target;
      //traverse the dom node tree until we find an element that handles the event,
      //or we reach the toolbar root node
      if (a === this.visibleContainer || a === this.el) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      while (a !== this.el) {
        if (a.sparktoolbar) {
          var c = this._getOpenItems();
          if (c.indexOf(a.sparktoolbar) >= 0) {
            c.splice(c.indexOf(a.sparktoolbar), 1);
          }
          this._closeItems(c);
          if (!this.hiddenContainer.contains(e.target)) {
            this._toggleShowMore(false);
          }
          return a.sparktoolbar.handleClick(e);
        }
        if (a.sparktoolbarshowmore) {
          this._closeItems();
          this._toggleShowMore();
          return;
        }
        a = a.parentElement;
      }
      this._closeAll();
    }
  };

  /**
   * Toggle the state of the show more dropdown, optional parameter overrides toggle and
   * sets state to passed value
   * @param {Boolean} open The new state of the show more dropdown
   */


  Toolbar.prototype._toggleShowMore = function _toggleShowMore(open) {
    var o = typeof open !== 'undefined' ? !open : this.isOpen;
    if (o) {
      (0, _removeClass2.default)(this.el, 'animate');
      window.setTimeout(function () {
        (0, _removeClass2.default)(this.el, 'open');
        this.isOpen = false;
      }.bind(this), 100);
    } else {
      this.isOpen = true;
      (0, _addClass2.default)(this.el, 'open');
      this._positionShowMore();
      window.setTimeout(function () {
        (0, _addClass2.default)(this.el, 'animate');
      }.bind(this), 0);
    }
  };

  /**
  * Do bounds checking on show-more dropdown when it is opened, and position it accordingly
  */


  Toolbar.prototype._positionShowMore = function _positionShowMore() {
    this.hiddenContainer.style.right = '0px';
    var pos = this.hiddenContainer.getBoundingClientRect();
    var left = window.pageXOffset;
    var right = window.pageXOffset + document.documentElement.clientWidth;
    if (pos.right > right) {
      this.hiddenContainer.style.right = 'calc(' + (pos.right - right) + 'px + 1rem)';
    }
    if (pos.left < left) {
      this.hiddenContainer.style.right = 'calc(' + (pos.left - left) + 'px - 1rem)';
    }
  };

  /**
   * Resize event helper, closes items then triggers recalculation of styles
   */


  Toolbar.prototype._handleResizeH = function _handleResizeH() {
    this._closeAll();
    this._calculateStyles();
  };

  /**
   * Reevaluates the available area of the toolbar and places toolbarItems into
   * the hidden container, as necessary. Should not call with any specified value
   * for showMore (used internally)
   * @param {Boolean} showMore Used to conditionally evaluate styling when showMore area is used
   */


  Toolbar.prototype._calculateStyles = function _calculateStyles(showMore) {
    this.el.style.width = '100%';
    showMore = typeof showMore !== 'undefined' ? showMore : false;
    if (!showMore) {
      (0, _removeClass2.default)(this.el, 'show-more');
    }
    var visible = [];
    var hidden = [];
    var i;
    //sort items by their priority to ensure higher-priority items are always placed
    //into the visible area first
    this.items.sort(this._prioritySort);
    //get container width and start placing items into their containers
    var visibleWidth = this.visibleContainer.clientWidth;
    for (i = 0; i < this.items.length; i++) {
      if (visibleWidth - this.items[i].width >= 0) {
        visible.push(this.items[i]);
        visibleWidth -= this.items[i].width;
      } else {
        if (!showMore) {
          (0, _addClass2.default)(this.el, 'show-more');
          return this._calculateStyles(true);
        }
        hidden.push(this.items[i]);
      }
    }
    //sort items back into their original order before inserting them into the document
    visible.sort(this._orderSort);
    hidden.sort(this._orderSort);
    var v = document.createDocumentFragment();
    var h = document.createDocumentFragment();
    for (i = 0; i < visible.length; i++) {
      v.appendChild(visible[i].el);
    }
    for (i = 0; i < hidden.length; i++) {
      h.appendChild(hidden[i].el);
    }
    this.visibleContainer.appendChild(v);
    this.hiddenContainer.appendChild(h);
    this.el.style.width = '';
  };

  /**
   * Sorts toolbar items in descending order based on their priority value
   */


  Toolbar.prototype._prioritySort = function _prioritySort(l, r) {
    return r.priority - l.priority;
  };

  /**
   * Sorts toolbar items in ascending order based on their order value
   */


  Toolbar.prototype._orderSort = function _orderSort(l, r) {
    return l.order - r.order;
  };

  return Toolbar;
}();

exports.default = Toolbar;
module.exports = exports['default'];


},{"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/parse-attribute":42,"../helpers/dom/remove-class":43,"../helpers/util/debounce":64}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _parseAttribute = require('../helpers/dom/parse-attribute');

var _affix = require('../helpers/position/affix');

var _affix2 = _interopRequireDefault(_affix);

var _makeElement = require('../helpers/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Tooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Show and hide a tooltip.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Tooltip(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Default anchoring of the content's x and y-axis relative to the button.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   anchorX: 'center', // 'left', 'center', 'right'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   anchorY: 'center' // 'top', 'middle', 'bottom'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/popover.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tooltip = function (_BaseComponent) {
  _inherits(Tooltip, _BaseComponent);

  function Tooltip(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tooltip);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Open.
   */


  Tooltip.prototype.open = function open() {

    if (this.affix) return this;

    this.affix = new _affix2.default({
      el: this.contentEl,
      targetEl: this.toggleEl,
      caretEl: this.caretEl,
      anchorX: this.anchorX,
      anchorY: this.anchorY
    });

    (0, _addClass2.default)(this.contentEl, 'active');

    this.isActive = true;
    this.toggleEl.setAttribute('aria-expanded', 'true');

    return this;
  };

  /**
   * Close.
   */


  Tooltip.prototype.close = function close() {

    if (!this.affix) return this;

    (0, _removeClass2.default)(this.contentEl, 'active');
    this.el.appendChild(this.contentEl);

    this.affix.remove({ keepEl: true });
    this.affix = null;

    this.isActive = false;
    this.toggleEl.setAttribute('aria-expanded', 'false');

    return this;
  };

  /**
   * Toggle the open state.
   */


  Tooltip.prototype.toggle = function toggle() {
    return this[this.isActive ? 'close' : 'open']();
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Tooltip.prototype.update = function update(el) {

    if (this.affix) this.affix.update();

    this._removeEventListeners();
    this._cacheElements(el || this.el);
    this._addEventListeners();

    return this;
  };

  /**
   * Close on remove.
   * @param {Boolean} leaveElement
   */


  Tooltip.prototype.remove = function remove(leaveElement) {
    this.close();
    (0, _removeClass2.default)(this.el, 'tooltip-initialized');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Tooltip.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.toggleEl = this.el.querySelector('.spark-tooltip__toggle, [data-role="toggle"]') || this.el;
    this.contentEl = this.contentEl || this.el.querySelector('[class*="spark-tooltip__content--"]') || this._createContentEl();
    this.caretEl = this.el.querySelector('.spark-tooltip__caret') || this._createCaretEl();
    this.isActive = (0, _hasClass2.default)(this.toggleEl, 'tooltip-active');

    (0, _addClass2.default)(this.el, 'tooltip-initialized');
  };

  /**
   * Parse config values from the element.
   */


  Tooltip.prototype._parseParams = function _parseParams() {

    this.anchorY = this.anchorY !== null ? this.anchorY : (0, _parseAttribute.string)(this.el, 'data-anchor-y', null);
    this.anchorX = this.anchorX !== null ? this.anchorX : (0, _parseAttribute.string)(this.el, 'data-anchor-x', null);

    // No anchors defined
    if (!this.anchorY && !this.anchorX) {

      // Left
      if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--left')) {
        this.anchorY = 'middle';
        this.anchorX = 'left';
      }
      // Right
      else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--right')) {
          this.anchorY = 'middle';
          this.anchorX = 'right';
        }
        // Top
        else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--top')) {
            this.anchorY = 'top';
            this.anchorX = 'center';
          }
          // Bottom
          else if ((0, _hasClass2.default)(this.contentEl, 'spark-tooltip__content--bottom')) {
              this.anchorY = 'bottom';
              this.anchorX = 'center';
            }
    }
  };

  /**
   * Update classes for the open or close state.
   */


  Tooltip.prototype._updateAttributes = function _updateAttributes() {
    (0, _toggleClass2.default)(this.el, 'tooltip-active', this.isActive);
    (0, _toggleClass2.default)(this.contentEl, 'tooltip-active', this.isActive);
    (0, _toggleClass2.default)(this.toggleEl, 'active', this.isActive);
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Tooltip.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onMouseoverBound = this._onMouseover.bind(this);
    this._onMouseoutBound = this._onMouseout.bind(this);
    this._onWindowMouseoverBound = this._onWindowMouseover.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Tooltip.prototype._addEventListeners = function _addEventListeners() {
    this.toggleEl.addEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.addEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.addEventListener('focus', this._onFocusBound);
    this.toggleEl.addEventListener('blur', this._onBlurBound);
  };

  /**
   * Remove event listeners for DOM events..
   */


  Tooltip.prototype._removeEventListeners = function _removeEventListeners() {
    this.toggleEl.removeEventListener('mouseover', this._onMouseoverBound);
    this.toggleEl.removeEventListener('mouseout', this._onMouseoutBound);
    this.toggleEl.removeEventListener('focus', this._onFocusBound);
    this.toggleEl.removeEventListener('blur', this._onBlurBound);
  };

  /**
   * Add window listeners.
   */


  Tooltip.prototype._addWindowEventListeners = function _addWindowEventListeners() {
    window.addEventListener('mouseover', this._onWindowMouseoverBound);
  };

  /**
   * Remove window listeners.
   */


  Tooltip.prototype._removeWindowEventListeners = function _removeWindowEventListeners() {
    window.removeEventListener('mouseover', this._onWindowMouseoverBound);
  };

  /**
   * Create a content element.
   * @return {Element}
   */


  Tooltip.prototype._createContentEl = function _createContentEl() {
    return (0, _makeElement2.default)('<div class="spark-tooltip__content"></div>');
  };

  /**
   * Create the caret element.
   * @return {Element}
   */


  Tooltip.prototype._createCaretEl = function _createCaretEl() {
    return (0, _makeElement2.default)('<div class="spark-tooltip__caret"></div>');
  };

  /**
   * Open the tooltip on mouseover.
   */


  Tooltip.prototype._onMouseover = function _onMouseover() {
    this._addWindowEventListeners();
    this.open();
  };

  /**
   * Close the tooltip on mouseout.
   */


  Tooltip.prototype._onMouseout = function _onMouseout() {
    this._removeWindowEventListeners();
    this.close();
  };

  /**
   * Open the tooltip on focus.
   */


  Tooltip.prototype._onFocus = function _onFocus() {
    this._addWindowEventListeners();
    this.open();
  };

  /**
   * Close the tooltip on blur.
   */


  Tooltip.prototype._onBlur = function _onBlur() {
    this._removeWindowEventListeners();
    this.close();
  };

  /**
   * Close the tooltip if we mouse over another element.
   * @param {Object} e
   */


  Tooltip.prototype._onWindowMouseover = function _onWindowMouseover(e) {
    if (e.target === this.el || (0, _hasParent2.default)(e.target, this.el)) return;
    this._onMouseout();
  };

  return Tooltip;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Tooltip.prototype._whitelistedParams = ['anchorY', 'anchorX', 'contentEl', 'toggleEl'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Tooltip.prototype.defaults = {
  el: null,
  toggleEl: null,
  contentEl: null,
  caretEl: null,
  isActive: false,
  affix: null,
  anchorY: null,
  anchorX: null,
  _onMouseoverBound: null,
  _onMouseoutBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onWindowMouseoverBound: null
};

exports.default = Tooltip;
module.exports = exports['default'];


},{"../helpers/dom/add-class":36,"../helpers/dom/has-class":38,"../helpers/dom/make-element":39,"../helpers/dom/parse-attribute":42,"../helpers/dom/remove-class":43,"../helpers/dom/toggle-class":44,"../helpers/position/affix":53,"../helpers/traversal/has-parent":62,"./base":1}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _triggerEvent = require('../helpers/dom/trigger-event');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Typeahead
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Listen to an input element and format it as the user types.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Typeahead(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/typeahead.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var noop = function noop() {};

var Typeahead = function (_BaseComponent) {
  _inherits(Typeahead, _BaseComponent);

  /**
   * Typeahead constructor
   * @param {Element} el
   * @param {Object} params
   */
  function Typeahead(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Typeahead);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._maintainFocus(function () {
      this._parseParams();
      this._bindEventListenerCallbacks();
      this._addEventListeners();
    });
    return _possibleConstructorReturn(_this);
  }

  /**
   * Run the formatting.
   * @param {Number} cursorIndex
   */


  Typeahead.prototype.run = function run(cursorIndex) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (this.isRunning) return this;

    this.isRunning = true;

    var oldVal = this.inputEl.value;
    var val = '';
    var placeholder = '';
    var i = 0;
    var len = this.format.length;
    var skipCount = 0;
    var valDone = false;

    for (; i < len; i++) {

      // Add numbers
      if (this.format[i] === '\\d') {

        if (this.characters[i - skipCount]) {
          val += this.characters[i - skipCount];
        } else {
          valDone = true;
        }

        placeholder += valDone ? this.placeholder[i] : '&nbsp;';
      }
      // Placeholder characters
      else {

          if (!valDone) {
            val += this.format[i];
          }

          placeholder += this.format[i];

          skipCount++;
        }
    }

    if (this.isFocused) {
      cursorIndex = cursorIndex === undefined ? this._getCaretEnd() : cursorIndex;
    }

    // If there are no characters, set the cursorIndex to be the last placeholder entry.
    if (this.isFocused && !this.characters.length) {
      cursorIndex = val.length;
    }

    // No characters and we shouldn't use just placeholder values
    if (!this.characters.length && params.notOnlyPlaceholders) {
      val = '';
    }

    this.inputEl.value = val;
    this.placeholderEl.innerHTML = placeholder;

    this._updateWidth();

    if (this.isFocused) {
      this._setCaretPositionTranslated(cursorIndex);
    }

    if (val !== oldVal) {
      (0, _triggerEvent2.default)(this.inputEl, 'input');
    }

    this.isRunning = false;

    if (val !== oldVal) {
      (this.onChange || noop)(val, oldVal, this);
    }

    if (!this._atEnd && this.isFocused && this.characters.length === this.maxLength && this._caretIsAtEnd()) {
      this._atEnd = true;
      (this.onEnd || noop)(this);
    } else {
      this._atEnd = false;
    }

    return this;
  };

  /**
   * Add a character to the characters array at a given index.
   * @param {String} character
   * @param {Number} start
   * @param {Number} end
   * @param {Boolean} skipCheck
   */


  Typeahead.prototype.addCharacterAtIndex = function addCharacterAtIndex(character, start, end, skipCheck) {

    // Don't add at an index beyond what we can support.
    if (this.maxLength && start >= this.maxLength) {
      return this;
    }

    if (!skipCheck) {

      var re;

      // Try to build a regex for this format character.
      try {
        re = new RegExp(this.format[start]);
      } catch (e) {
        //
      }

      if (!re || !re.exec(character)) {
        return this;
      }
    }

    this.characters.splice(start, end - start, character);

    // If we've added at an index that pushes the length beyond what we support,
    // remove the trailing characters.
    if (this.maxLength && this.characters.length > this.maxLength) {
      this.characters.splice(this.maxLength, this.characters.length);
    }

    this.run(start + 1);

    return this;
  };

  /**
   * Add a character at the position of the caret.
   * @param {String} character
   */


  Typeahead.prototype.addCharacterAtCaret = function addCharacterAtCaret(character) {

    var pos = this._getCaretStart();
    var re;

    // If we're beyond the bounds of the format, stop.
    if (this.format[pos] === undefined) {
      (this.onEnd || noop)(this, character);
      return this;
    }

    // Try to build a regex for this format character.
    try {
      re = new RegExp(this.format[pos]);
    } catch (e) {}
    //


    // We couldn't build a regex (so it's invalid) or the regex failed (so it's invalid)
    if (!re || !re.exec(character)) {
      if (this._moveCaret('right')) {
        this.addCharacterAtCaret(character);
      }
      return this;
    }

    this.addCharacterAtIndex(character, this._getCaretStartTranslated(), this._getCaretEndTranslated(), true);

    return this;
  };

  /**
   * Remove a character from the character array by index.
   * @param {Number} index
   * @param {Number} length Optional
   * @param {Number} offset Optional
   */


  Typeahead.prototype.removeCharacterAtIndex = function removeCharacterAtIndex(index, length, offset) {

    // Don't want a negative splice length or else we start
    // removing characters from the end.
    if (index + offset < 0) {
      return this;
    }

    length = length !== undefined ? length : 1;
    this.characters.splice(index + offset, length);
    this.run(index + (offset || 1));

    return this;
  };

  /**
   * Remove the character at the caret.
   * @param {Number} offset Optional An offset from the current position.
   */


  Typeahead.prototype.removeCharacterAtCaret = function removeCharacterAtCaret(offset) {

    var start = this._getCaretStartTranslated();
    var end = this._getCaretEndTranslated();
    var length = 1;
    var tmp;

    if (start !== end) {

      // If the end is less than the start, the user dragged from right to left.
      // Just swap them to make it easier to handle.
      if (end < start) {
        tmp = start;
        start = end;
        end = tmp;
      }

      // The length of characters removed
      length = end - start;

      // Bump the start position @todo: haven't thought through why this is, but it's needed.
      start++;
    }

    this.removeCharacterAtIndex(start, length, offset);

    return this;
  };

  /**
   * Remove the character in the current range.
   */


  Typeahead.prototype.removeCharactersInRange = function removeCharactersInRange() {
    this.removeCharacterAtIndex(this._getCaretStartTranslated(), this._getCaretEndTranslated());
    return this;
  };

  /**
   * Set the value of the typeahead. Maintain the position of the caret.
   * @param {String} value
   */


  Typeahead.prototype.setValue = function setValue(value) {

    this.settingValue = true;
    this.pause();

    this.characters = (value + '').split('');
    this.run();

    if (this.isFocused) this._setCaretPosition(this._getCaretStart());

    this.resume();
    this.settingValue = false;

    return this;
  };

  /**
   * Get the value of the typeahead.
   * @param {Boolean} asInt Get the value as a parsed integer.
   * @return {String|Number}
   */


  Typeahead.prototype.getValue = function getValue(asInt) {
    return asInt && this.inputEl.value ? parseInt(this.inputEl.value, 10) : this.inputEl.value;
  };

  /**
   * Clear the selected value.
   */


  Typeahead.prototype.clearValue = function clearValue() {
    this.pause();
    this.characters = [];
    this.run(0, { notOnlyPlaceholders: true });
    return this.resume();
  };

  /**
   * Take the date values from the inputs and set them as dates on the calendar.
   */


  Typeahead.prototype.updateValue = function updateValue() {
    return this.setValue(this.inputEl.value);
  };

  /**
   * Move the caret position.
   * @param {Number} pos
   */


  Typeahead.prototype.moveCaret = function moveCaret(pos) {
    this._setCaretPositionTranslated(pos);
    return this;
  };

  /**
   * Move the caret to the end of the input.
   */


  Typeahead.prototype.moveCaretToEnd = function moveCaretToEnd() {
    return this.moveCaret(this.characters.length);
  };

  /**
   * Move the caret to the start of the input.
   */


  Typeahead.prototype.moveCaretToStart = function moveCaretToStart() {
    return this.moveCaret(0);
  };

  /**
   * Pause events.
   */


  Typeahead.prototype.pause = function pause() {
    this.pauseBlurFocus++;
    return this;
  };

  /**
   * Resume events.
   */


  Typeahead.prototype.resume = function resume() {
    this.pauseBlurFocus--;
    return this;
  };

  /**
   * Disable entry into the input.
   */


  Typeahead.prototype.disable = function disable() {
    this.inputEl.setAttribute('disabled', '');
    return this;
  };

  /**
   * Enable entry into the input.
   */


  Typeahead.prototype.enable = function enable() {
    this.inputEl.removeAttribute('disabled');
    return this;
  };

  /**
   * Clear the value.
   * Changed to clearValue in v2.0.0.
   */


  Typeahead.prototype.clear = function clear() {
    return this.clearValue();
  };

  /**
   * Augment default remove call w/ helper cleanup.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Typeahead.prototype.remove = function remove(leaveElement) {
    _BaseComponent.prototype.remove.call(this, leaveElement);
    return this;
  };

  /**
   * Store a reference to the needed elements.
   * @param {Object} el
   */


  Typeahead.prototype._cacheElements = function _cacheElements(el) {
    this.el = el;
    this.inputEl = this.el.querySelector('[type="text"], [type="email"], [type="phone"], textarea') || this._createDefaultInputElement();
    this.placeholderEl = this.el.querySelector('.spark-input__placeholder') || this._createDefaultPlaceholderElement();
  };

  /**
   * Parse parameters from the elements.
   */


  Typeahead.prototype._parseParams = function _parseParams() {

    // Store the value characters
    this.characters = this._parseCharacters(this.inputEl.value);

    // Store format
    this.format = this._parseFormat(this.format ? this.format : this.inputEl.getAttribute('data-typeahead-format'));

    // Store the original placeholder
    this.placeholder = this.placeholder ? this.placeholder : this.inputEl.getAttribute('placeholder').split('');

    // Get the total number of characters we can have
    this.maxLength = this._getCharactersAllowedCount(this.format);

    this.matchPlaceholderSize = this.matchPlaceholderSize !== null ? this.matchPlaceholderSize : (0, _parseAttribute.boolean)(this.inputEl, 'data-match-placeholder-size', false);
  };

  /**
   * Parse the format string into an array.
   * @param  {String} format
   * @return {Array}
   */


  Typeahead.prototype._parseFormat = function _parseFormat(format) {

    var i = 0;
    var len = format.length;
    var arr = [];
    var lastWasEscape = false;

    for (; i < len; i++) {
      if (format[i] === '\\' && !lastWasEscape) {
        lastWasEscape = true;
      } else {
        arr.push((lastWasEscape ? '\\' : '') + format[i]);
        lastWasEscape = false;
      }
    }

    return arr;
  };

  /**
   * Parse the characters string into an array, ignoring characters which don't
   * match the format requirements.
   * @param {String} characters
   * @return {Array}
   */


  Typeahead.prototype._parseCharacters = function _parseCharacters(characters) {

    var chars = characters.split('');
    var i = 0;
    var len = characters.length;
    var regexes = [];
    var arr = [];

    for (; i < len; i++) {

      // Try to build a regex for this format character.
      try {
        // Make sure this format starts with an escape character.
        regexes[i] = this.format[i][0] === '\\' ? new RegExp(this.format[i]) : null;
      } catch (e) {}
      //


      // If we were able to create a regex and our char passes, add it to the array
      // of characters to return.
      if (regexes[i] && regexes[i].exec(chars[i])) {
        arr.push(chars[i]);
      }
    }

    return arr;
  };

  /**
   * Create the default input element.
   * @return {Element}
   */


  Typeahead.prototype._createDefaultInputElement = function _createDefaultInputElement() {

    var el = document.createElement('input');
    el.className = 'spark-input__field';
    el.setAttribute('data-typeahead', '');
    el.setAttribute('type', 'tel');

    this.el.appendChild(el);

    return el;
  };

  /**
   * Create the default input element.
   * @return {Element}
   */


  Typeahead.prototype._createDefaultPlaceholderElement = function _createDefaultPlaceholderElement() {
    var el = document.createElement('span');
    el.className = 'spark-input__placeholder';
    this.el.appendChild(el);
    return el;
  };

  /**
   * Get the maximum number of characters allowed.
   * @param {Array} format
   * @return {Number}
   */


  Typeahead.prototype._getCharactersAllowedCount = function _getCharactersAllowedCount(format) {

    var i = 0;
    var len = format.length;
    var allowed = 0;

    for (; i < len; i++) {
      if (format[i] === '\\d') {
        allowed++;
      }
    }

    return allowed;
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Typeahead.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {
    this._onKeydownBound = this._onKeydown.bind(this);
    this._onKeypressBound = this._onKeypress.bind(this);
    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
    this._onPlaceholderClickBound = this._onPlaceholderClick.bind(this);
  };

  /**
   * Add event listeners to keypress and keydown.
   */


  Typeahead.prototype._addEventListeners = function _addEventListeners() {
    this.inputEl.addEventListener('keydown', this._onKeydownBound, false);
    this.inputEl.addEventListener('keypress', this._onKeypressBound, false);
    this.inputEl.addEventListener('focus', this._onFocusBound, false);
    this.placeholderEl.addEventListener('click', this._onPlaceholderClickBound, false);
  };

  /**
   * Add event listeners to keypress and keydown.
   */


  Typeahead.prototype._removeEventListeners = function _removeEventListeners() {

    this.inputEl.removeEventListener('keydown', this._onKeydownBound);
    this.inputEl.removeEventListener('keypress', this._onKeypressBound);
    this.inputEl.removeEventListener('focus', this._onFocusBound);
    this.placeholderEl.removeEventListener('click', this._onPlaceholderClickBound);

    window.removeEventListener('blur', this._onBlurBound);
    this.inputEl.removeEventListener('blur', this._onBlurBound);
  };

  /**
   * Get the position of the caret in the element.
   * @return {Number} The index
   */


  Typeahead.prototype._getCaretStart = function _getCaretStart() {

    return this._maintainFocus(function () {

      var caretPosition;

      // IE support
      if (document.selection) {
        this.inputEl.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -this.inputEl.value.length);
        caretPosition = sel.text.length;
      } else if (this.inputEl.selectionStart || this.inputEl.selectionStart === 0) {
        caretPosition = this.inputEl.selectionStart;
      }

      return caretPosition;
    });
  };

  /**
   * Get the end position of the caret in the element.
   * @return {Number} The index
   */


  Typeahead.prototype._getCaretEnd = function _getCaretEnd() {

    return this._maintainFocus(function () {

      var caretPosition;

      // IE support
      if (document.selection) {
        this.inputEl.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -this.inputEl.value.length);
        caretPosition = sel.text.length;
      } else if (this.inputEl.selectionEnd || this.inputEl.selectionEnd === 0) {
        caretPosition = this.inputEl.selectionEnd;
      }

      return caretPosition;
    });
  };

  /**
   * Is the caret at the end of the input?
   * @return {Boolean}
   */


  Typeahead.prototype._caretIsAtEnd = function _caretIsAtEnd() {
    return this._getCaretStart() === this.maxLength;
  };

  /**
   * Set the position of the caret in the element.
   * @return {Number} The index
   */


  Typeahead.prototype._setCaretPosition = function _setCaretPosition(pos) {

    return this._maintainFocus(function () {

      // IE support
      if (document.selection) {
        this.inputEl.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -this.inputEl.value.length);
        sel.moveStart('character', pos);
        sel.moveEnd('character', 0);
        sel.select();
      } else if (this.inputEl.selectionStart || this.inputEl.selectionStart === 0) {
        this.inputEl.selectionStart = pos;
        this.inputEl.selectionEnd = pos;
      }
    });
  };

  /**
   * Get the position of the caret translated to the corresponding index in the
   * characters array. This means ignoring format characters.
   * @param {Number} pos
   * @return {Number}
   */


  Typeahead.prototype._getCaretPositionTranslated = function _getCaretPositionTranslated(pos) {

    var i = 0;
    var skipCount = 0;

    for (; i < pos; i++) {

      // Count non-numbers as a skip.
      // @todo: this needs to work with more than numbers.
      if (this.format[i] !== '\\d') {
        skipCount++;
      }
    }

    return pos - skipCount;
  };

  /**
   * Get the starting position of the caret translated.
   * @return {Number}
   */


  Typeahead.prototype._getCaretStartTranslated = function _getCaretStartTranslated() {
    return this._getCaretPositionTranslated(this._getCaretStart());
  };

  /**
   * Get the ending position of the caret translated.
   * @return {Number}
   */


  Typeahead.prototype._getCaretEndTranslated = function _getCaretEndTranslated() {
    return this._getCaretPositionTranslated(this._getCaretEnd());
  };

  /**
   * Set the position of the caret translated to the corresponding index in the
   * characters array. This means ignoring format characters.
   * @param {Number} pos
   */


  Typeahead.prototype._setCaretPositionTranslated = function _setCaretPositionTranslated(pos) {

    var i = 0;
    var skipCount = 0;

    for (; i < pos + skipCount; i++) {

      // Count non-numbers as a skip.
      // @todo: this needs to work with more than numbers.
      if (this.format[i] !== undefined && this.format[i] !== '\\d') {
        skipCount++;
      }
    }

    this._setCaretPosition(pos + skipCount);
  };

  /**
   * Move the caret position
   * @param  {String} direction The direction of the movement
   * @return {Boolean}           Was the caret actually moved?
   */


  Typeahead.prototype._moveCaret = function _moveCaret(direction) {

    var curPos = this._getCaretStart();

    if (direction === 'left') {
      this._setCaretPosition(curPos - 1);
    } else if (direction === 'right') {
      this._setCaretPosition(curPos + 1);
    }

    return curPos !== this._getCaretStart();
  };

  /**
   * Empty the input when we only have placeholders.
   */


  Typeahead.prototype._emptyWhenOnlyPlaceholders = function _emptyWhenOnlyPlaceholders() {
    if (!this.characters.length) {
      this.clear();
    }
  };

  /**
   * Run a callback function that may change the focus of the document, but
   * make sure focus goes back to where it needs to be. Also, set the state
   * so that blur/focus events don't fire from this instance.
   * @param {Function} callback
   */


  Typeahead.prototype._maintainFocus = function _maintainFocus(callback) {

    this.pause();

    var originalActiveElement = document.activeElement;

    //For IE
    if (!originalActiveElement) {
      originalActiveElement = document.body;
    }

    var output = (callback || noop).call(this);

    // If we didn't have focus, go back to focusing on the original
    if (originalActiveElement !== this.inputEl) {
      this.inputEl.blur();
      originalActiveElement ? originalActiveElement.focus() : null;
    }

    this.resume();

    return output;
  };

  /**
   * Update the width of the typeahead. If we should be matching the width
   * of the placeholder, do so. Otherwise, take no action.
   */


  Typeahead.prototype._updateWidth = function _updateWidth() {

    if (this.matchPlaceholderSize) {
      this.placeholderEl.style.width = 'auto';
      // Add 2px to account for caret width in IE...
      this.inputEl.style.width = 'auto';
      this.inputEl.style.width = this.placeholderEl.offsetWidth + 2 + 'px';
      this.placeholderEl.style.width = '';
    }
  };

  /**
   * Listen for delete and arrows.
   * @param  {Object} e
   */


  Typeahead.prototype._onKeydown = function _onKeydown(e) {

    var code = e.keyCode || e.which;

    if (code === this.pasteCode && (e.metaKey || e.ctrlKey)) {
      return;
    }

    if (code === this.actionCodes.BACKSPACE) {
      this.removeCharacterAtCaret(-1);
      this._onBackspace();
      e.preventDefault();
    } else if (code === this.actionCodes.DELETE) {
      this.removeCharacterAtCaret(0);
      e.preventDefault();
    } else if (code === this.actionCodes.LEFT) {
      if (!this._getCaretStart()) {
        (this.onBackspace || noop)();
      }
    } else if (code === this.actionCodes.RIGHT) {
      if (this._getCaretStart() === this.characters.length) {
        (this.onEnd || noop)();
      }
    } else {
      if (this.ignoreCodes.indexOf(code) === -1) {
        e.preventDefault();

        // Account for Numpad keys
        if (code >= 96 && code <= 105) {
          code -= 48;
        }

        this.addCharacterAtCaret(String.fromCharCode(code));
      }
    }
  };

  /**
   * When the keypress event fires, validate.
   * @param {Object} e
   */


  Typeahead.prototype._onKeypress = function _onKeypress(e) {
    var code = e.keyCode || e.which;

    if (this.ignoreCodes.indexOf(code) === -1) {
      e.preventDefault();
      this.characters = this._parseCharacters(this.inputEl.value);
      this.run();
      (this.onChange || noop)(this.getValue(), this);
    }
  };

  /**
   * When the input event fires, validate. This happens
   * with a copy+paste.
   * @param {Object} e
   */


  Typeahead.prototype._onInput = function _onInput(e) {
    e.preventDefault();
    this.characters = this._parseCharacters(this.inputEl.value);
    this.run();
    (this.onInput || noop)(this.getValue(), this);
  };

  /**
   * When we focus, run the formatting.
   * @param {Object} e
   */


  Typeahead.prototype._onFocus = function _onFocus() {

    window.removeEventListener('blur', this._onBlurBound);
    window.addEventListener('blur', this._onBlurBound, false);
    this.inputEl.removeEventListener('blur', this._onBlurBound);
    this.inputEl.addEventListener('blur', this._onBlurBound, false);

    if (this.isFocused || this.pauseBlurFocus || this.isRunning) return;

    this.run();
    (this.onFocus || noop)(this.getValue(), this);
    this.isFocused = true;
    this._oldVal = this.inputEl.value;
  };

  /**
   * When we blur, if we have no characters, remove the placeholders.
   * @param {Object} e
   */


  Typeahead.prototype._onBlur = function _onBlur() {

    window.removeEventListener('blur', this._onBlurBound);
    this.inputEl.removeEventListener('blur', this._onBlurBound);

    this.isFocused = false;

    if (this.pauseBlurFocus || this.isRunning) return;

    this._emptyWhenOnlyPlaceholders();

    if (this._oldVal !== this.inputEl.value) {
      (0, _triggerEvent2.default)(this.inputEl, 'change');
    }

    (this.onBlur || noop)(this.getValue(), this);
  };

  /**
   * When the placeholder receives a click event, focus on the input. This happens in IE10 for some
   * reason that I cannot fully fathom, but it has something to do with the explicit width being
   * set on an empty element.
   * @param {Object} e
   */


  Typeahead.prototype._onPlaceholderClick = function _onPlaceholderClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputEl.focus();
  };

  /**
   * When we backspace, if we have no characters left let listeners know.
   * @param {Object} e
   */


  Typeahead.prototype._onBackspace = function _onBackspace() {
    if (!this._getCaretStart()) (this.onBackspace || noop)();
  };

  return Typeahead;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Typeahead.prototype._whitelistedParams = ['format', 'placeholder', 'matchPlaceholderSize', 'onChange', 'onFocus', 'onBlur', 'onInput', 'onBackspace', 'onEnd'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Typeahead.prototype.defaults = {
  el: null,
  inputEl: null,
  placeholderEl: null,
  placeholder: null,
  characters: null,
  format: null,
  ignoreCodes: [9, // Tab
  16, // Shift
  17, // Ctrl
  18, // Alt
  20, // CAPS
  91, // Meta
  93, // Alt
  112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 // F1-F12
  ],
  actionCodes: {
    BACKSPACE: 8,
    DELETE: 46,
    LEFT: 37,
    RIGHT: 39
  },
  pasteCode: 86, // v
  pauseBlurFocus: 0,
  matchPlaceholderSize: null,
  maxLength: null,
  isFocused: false,
  isRunning: false,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onInput: null,
  onBackspace: null,
  onEnd: null,
  _atEnd: false,
  _oldVal: null,
  _onKeydownBound: null,
  _onKeypressBound: null,
  _onFocusBound: null,
  _onBlurBound: null,
  _onPlaceholderClickBound: null
};

exports.default = Typeahead;
module.exports = exports['default'];


},{"../helpers/dom/parse-attribute":42,"../helpers/dom/trigger-event":45,"./base":1}],29:[function(require,module,exports){
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


},{"../dom/add-class":36,"../dom/has-class":38,"../dom/outer-height":41,"../dom/remove-class":43,"../dom/toggle-class":44}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Request Animation
 * Request animation frame polyfill.
 * @module helpers/animation/request.js
 */
var request = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function () {

  var fps = 60;
  var del = 1000 / fps;
  var start = Date.now();
  var prev = start;

  return function requestAnimationFrame(callback) {

    var requestTime = Date.now();
    var timeout = Math.max(0, del - (requestTime - prev));
    var timeToCall = requestTime + timeout;

    prev = timeToCall;

    return window.setTimeout(function onAnimationFrame() {
      callback(timeToCall - start);
    }, timeout);
  };
}();

exports.default = request;
module.exports = exports["default"];


},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _offset = require('../dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Scroll To
 * Scroll the window to a specific element or position.
 * @param {Object} params
 *
 * @module helpers/animation/scroll-to.js
 */

function scrollTo(params) {

  params = params || {};

  var offset = void 0;
  var x = void 0;
  var y = void 0;
  var target = params.target || window;
  var startX = target !== window ? target.scrollLeft : target.pageXOffset;
  var startY = target !== window ? target.scrollTop : target.pageYOffset;

  if (params instanceof HTMLElement) {
    offset = (0, _offset2.default)(params);
    x = offset.left;
    y = offset.top;
    params = arguments[1] || {};
  } else {
    x = params.x || 0;
    y = params.y || 0;
  }

  (0, _tween2.default)({
    target: target,
    prop: 'scrollTo',
    start: [startX, startY],
    end: [x, y],
    duration: params.duration,
    callback: params.callback
  });
}

exports.default = scrollTo;
module.exports = exports['default'];


},{"../dom/offset":40,"./tween":32}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

/**
 * Tween from one value to another.
 * @param {Object} params
 * @return {Long}
 */
/**
 * # Tween
 * Tween between two values.
 * @module helpers/animation/tween.js
 */

function tween(params) {

  params = params || {};

  var begin;
  var obj = params.target;

  if (!obj) {
    throw new Error('Cannot tween without a target!');
  }

  var prop = typeof params.prop === 'string' ? [params.prop] : params.prop;
  var start = typeof params.start === 'number' ? [params.start] : params.start;
  var end = typeof params.end === 'number' ? [params.end] : params.end;
  var duration = params.duration || 250;
  var callback = params.callback || noop;

  // Ensure we have the same number of start and end properties.
  if (start.length !== end.length) {
    throw new Error('Cannot tween two different sets of parameters!');
  }

  var f = function f(ts) {

    // Keep track of when we start
    if (!begin) begin = ts;

    // Progress
    var prog = ts - begin;

    // Percentage complete
    var per = Math.min(prog / duration, 1);

    // Adjust the values for the percentage complete.
    var args = [];
    var i = 0;
    var len = start.length;
    for (; i < len; i++) {
      args[i] = start[i] + (end[i] - start[i]) * per;
    }

    // Apply the values for each property.
    i = 0;
    len = prop.length;
    var arg;
    for (; i < len; i++) {

      // If this is the last property but we have more arguments, set them all.
      arg = i + 1 === len && args.length - 1 > i ? args.slice(i) : args[i];

      if (typeof obj[prop[i]] === 'function') {
        obj[prop[i]].apply(obj, arg);
      } else {
        obj[prop[i]] = arg;
      }
    }

    // Keep going if we have more to do.
    if (prog < duration) (0, _request2.default)(f);else callback();
  };

  return (0, _request2.default)(f);
}

exports.default = tween;
module.exports = exports['default'];


},{"./request":30}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * # Transform
                                                                                                                                                                                                                                                                               * Apply a cross-browser transform style.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @example
                                                                                                                                                                                                                                                                               * transform('translateX', '-100px');
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @param {String} type
                                                                                                                                                                                                                                                                               * @param {String} val
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @module helpers/css/transform.js
                                                                                                                                                                                                                                                                               */

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', ''];

function transform(type, val) {

  var str = '';

  (0, _each2.default)(prefixes, function (p) {

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      str += p + 'transform: ';

      for (var j in val) {
        str += j + '(' + val[j] + '); ';
      }
    } else {
      str += p + 'transform: ' + type + '(' + val + '); ';
    }
  });

  return str;
}

exports.default = transform;
module.exports = exports['default'];


},{"../util/each":65}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Date helper
 * General helpers for working with dates.
 *
 * @module helpers/date/date.js
 */

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayNamesShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
var adjustedDayNames = [];
var adjustedDayNamesShort = [];
var weekStartsOn = 0;

var dateHelper = {

  /**
   * Transform a date into an object of date values.
   * @param {Date} date
   * @return {Object}
   */
  create: function create(date) {

    date = date instanceof Date ? date : new Date(date.year, date.month - 1, date.day);

    var inst = Object.create(dateHelper);
    inst._date = date;
    inst._cache = {};

    return inst;
  },

  /**
   * Get a year.
   * @return {Number}
   */
  get year() {
    this._instanceCheck('year');
    return this._date.getFullYear();
  },

  /**
   * Set a year.
   * @param {Number} y
   */
  set year(y) {
    this._instanceCheck('year');
    this._clearCache();
    return this._date.setFullYear(y);
  },

  /**
   * Get a month.
   * @return {Number} 1-12
   */
  get month() {
    this._instanceCheck('month');
    return this._date.getMonth() + 1;
  },

  /**
   * Set a month.
   * @param {Number} m 1-12
   */
  set month(m) {
    this._instanceCheck('month');
    this._clearCache();
    return this._date.setMonth(m - 1);
  },

  /**
   * Get a day.
   * @return {Number} 1-31
   */
  get day() {
    this._instanceCheck('day');
    return this._date.getDate();
  },

  /**
   * Set a day.
   * @param {Number} d 1-31
   */
  set day(d) {
    this._instanceCheck('day');
    this._clearCache();
    return this._date.setDate(d);
  },

  /**
   * Sets the day, month and year values at once.
   * @param {Object} params
   */
  set: function set(params) {
    params = params || {};
    this.year = params.year || this.year;
    this.month = params.month || this.month;
    this.day = params.day || this.day;
  },

  /**
   * Get the full name of the month.
   * @param {Number} num
   * @return {String}
   */
  getMonthName: function getMonthName(num) {
    return monthNames[num - 1];
  },

  /**
   * Get the month name.
   * @return {String}
   */
  get monthName() {
    this._instanceCheck('monthName');
    return dateHelper.getMonthName(this.month);
  },

  /**
   * Get the list of month names.
   * @return {Array}
   */
  getMonthNames: function getMonthNames() {
    return monthNames;
  },

  /**
   * Get the short name of the month.
   * @param {Number} num
   * @return {String}
   */
  getMonthNameShort: function getMonthNameShort(num) {
    return monthNamesShort[num - 1];
  },

  /**
   * Get the month name.
   * @return {String}
   */
  get monthNameShort() {
    this._instanceCheck('monthName');
    return dateHelper.getMonthNameShort(this.month);
  },

  /**
   * Get the list of short month names.
   * @return {Array}
   */
  getMonthNamesShort: function getMonthNamesShort() {
    return monthNamesShort;
  },

  /**
   * Set the month names.
   * @param {Array} names
   */
  setMonthNames: function setMonthNames(names) {
    if (names.length === 12) monthNames = names;
  },

  /**
   * Set the short month names.
   * @param {Array} names
   */
  setMonthNamesShort: function setMonthNamesShort(names) {
    if (names.length === 12) monthNamesShort = names;
  },

  /**
   * Get the day of the week for a given day.
   * @param {Object} date
   * @return {Number} 1-7
   */
  getDayOfWeek: function getDayOfWeek(date) {
    var day = (date instanceof Date ? date : new Date(date.year, date.month - 1, date.day)).getDay() - weekStartsOn;
    return (day < 0 ? 7 - Math.abs(day) : day) + 1;
  },

  /**
   * Get the day of the week.
   * @return {Number}
   */
  get dayOfWeek() {
    return dateHelper.getDayOfWeek(this._date);
  },

  /**
   * Get the full name of a day of the week.
   * @param {Number} num
   * @return {String}
   */
  getDayName: function getDayName(num) {
    return dayNames[num - 1 + weekStartsOn] || dayNames[dayNames.length - num - 1 + weekStartsOn];
  },

  /**
   * Get the day name.
   * @return {String}
   */
  get dayName() {
    this._instanceCheck('dayName');
    return dateHelper.getDayName(this.dayOfWeek);
  },

  /**
   * Get the full name of the days of the week.
   * @return {Array}
   */
  getDayNames: function getDayNames() {
    return adjustedDayNames.length ? adjustedDayNames : dayNames;
  },

  /**
   * Get the short name of the day.
   * @param {Number} num
   * @return {String}
   */
  getDayNameShort: function getDayNameShort(num) {
    return dayNamesShort[num - 1 + weekStartsOn] || dayNames[dayNames.length - num - 1 + weekStartsOn];
  },

  /**
   * Get the short day name.
   * @return {String}
   */
  get dayNameShort() {
    this._instanceCheck('dayNameShort');
    return dateHelper.getDayNameShort(this.dayOfWeek);
  },

  /**
   * Get the full name of the days of the week.
   * @return {Array}
   */
  getDayNamesShort: function getDayNamesShort() {
    return adjustedDayNamesShort.length ? adjustedDayNamesShort : dayNamesShort;
  },

  /**
   * Set the day names.
   * @param {Array} names
   */
  setDayNames: function setDayNames(names) {
    if (names.length === 7) dayNames = names;
  },

  /**
   * Set the short day names.
   * @param {Array} names
   */
  setDayNamesShort: function setDayNamesShort(names) {
    if (names.length === 7) dayNamesShort = names;
  },

  /**
   * Get the index of the first day of the week.
   * @return {Number}
   */
  getWeekStartsOn: function getWeekStartsOn() {
    return weekStartsOn;
  },

  /**
   * Set the index of the first day of the week.
   * @param {Number} index
   * @return {String}
   */
  setWeekStartsOn: function setWeekStartsOn(number) {

    weekStartsOn = number;

    if (number) {
      adjustedDayNames = dayNames.slice(weekStartsOn);
      adjustedDayNames = adjustedDayNames.concat(dayNames.slice(0, weekStartsOn));
      adjustedDayNamesShort = dayNamesShort.slice(weekStartsOn);
      adjustedDayNamesShort = adjustedDayNamesShort.concat(dayNamesShort.slice(0, weekStartsOn));
    } else {
      adjustedDayNames = [];
      adjustedDayNamesShort = [];
    }
  },

  /**
   * Get the current date.
   * @return {Object}
   */
  now: function now() {
    return dateHelper.create(new Date());
  },

  /**
   * Get the next year after the given date.
   * This obviously isn't very complicated, but it exists
   * for parity with how we get the week, day and month.
   * @param {Object} date
   * @return {Object}
   */
  getNextYear: function getNextYear(date) {
    return dateHelper.create(new Date(date.year + 1, date.month - 1, date.day));
  },

  /**
   * Get the year following this.
   * @return {Object}
   */
  get nextYear() {
    this._instanceCheck('nextYear');
    return this._cache.nextYear || (this._cache.nextYear = dateHelper.getNextYear(this));
  },

  /**
   * Get the first day of the week for a given date.
   * @param {Object} date
   * @return {Object}
   */
  getWeekStart: function getWeekStart(date) {
    var inst = dateHelper.create(new Date(date.year, date.month - 1, date.day - dateHelper.getDayOfWeek(date) + 1));
    inst.weekStartsOn = weekStartsOn;
    return inst;
  },

  /**
   * Get the start of the week for this date.
   * @return {Object}
   */
  get weekStart() {
    this._instanceCheck('weekStart');
    return this._cache.weekStart && this._cache.weekStart.weekStartsOn === weekStartsOn ? this._cache.weekStart : this._cache.weekStart = dateHelper.getWeekStart(this);
  },

  /**
   * Get the first day of the month for a given date.
   * @param {Object} date
   * @return {Object}
   */
  getMonthStart: function getMonthStart(date) {
    var inst = dateHelper.create(new Date(date.year, date.month - 1, 1));
    return inst;
  },

  /**
   * Get the start of the month for this date.
   * @return {Object}
   */
  get monthStart() {
    this._instanceCheck('monthStart');
    return this._cache.monthStart || (this._cache.monthStart = dateHelper.getMonthStart(this));
  },

  /**
   * Get the next week after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getNextWeek: function getNextWeek(date) {
    var start = dateHelper.getWeekStart(date);
    return dateHelper.create(new Date(start.year, start.month - 1, start.day + 7));
  },

  /**
   * Get the week following this.
   * @return {Object}
   */
  get nextWeek() {
    this._instanceCheck('nextWeek');
    return this._cache.nextWeek || (this._cache.nextWeek = dateHelper.getNextWeek(this));
  },

  /**
   * Get the next day after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getNextDay: function getNextDay(date) {
    return dateHelper.create(new Date(date.year, date.month - 1, date.day + 1));
  },

  /**
   * Get the day following this.
   * @return {Object}
   */
  get nextDay() {
    this._instanceCheck('nextDay');
    return this._cache.nextDay || (this._cache.nextDay = dateHelper.getNextDay(this));
  },

  /**
   * Get the next month after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getNextMonth: function getNextMonth(date) {
    // Date() has a *bug/feature* if last day of month is 31 when calculating the next month.
    // Need to account for that so that it doesn't round up the date/month.

    if (date.day === 31 && date.month !== 1 && date.month !== 7 && date.month !== 12) {
      // Adjust for months ending in 31 followed by months ending in 30
      return dateHelper.create(new Date(date.year, date.month, date.day - 1));
    } else if (date.day > 28 && date.month === 1) {
      // fix for last day of February
      return dateHelper.create(new Date(date.year, date.month + 1, 0));
    } else {
      return dateHelper.create(new Date(date.year, date.month, date.day));
    }
  },

  /**
   * Get the month following this.
   * @return {Object}
   */
  get nextMonth() {
    this._instanceCheck('nextMonth');
    return this._cache.nextMonth || (this._cache.nextMonth = dateHelper.getNextMonth(this));
  },

  /**
   * Get the previous year after the given date.
   * This obviously isn't very complicated, but it exists
   * for parity with how we get the week, day and month.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousYear: function getPreviousYear(date) {
    return dateHelper.create(new Date(date.year - 1, date.month - 1, date.day));
  },

  /**
   * Get the year preceding this.
   * @return {Object}
   */
  get previousYear() {
    this._instanceCheck('previousYear');
    return this._cache.previousYear || (this._cache.previousYear = dateHelper.getPreviousYear(this));
  },

  /**
   * Get the previous week after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousWeek: function getPreviousWeek(date) {
    var start = dateHelper.getWeekStart(date);
    var inst = dateHelper.create(new Date(start.year, start.month - 1, start.day - 7));
    inst.weekStartsOn = weekStartsOn;
    return inst;
  },

  /**
   * Get the week preceding this.
   * @return {Object}
   */
  get previousWeek() {
    this._instanceCheck('previousWeek');
    return this._cache.previousWeek || (this._cache.previousWeek = dateHelper.getPreviousWeek(this));
  },

  /**
   * Get the previous day after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousDay: function getPreviousDay(date) {
    return dateHelper.create(new Date(date.year, date.month - 1, date.day - 1));
  },

  /**
   * Get the day preceding this.
   * @return {Object}
   */
  get previousDay() {
    this._instanceCheck('previousDay');
    return this._cache.previousDay || (this._cache.previousDay = dateHelper.getPreviousDay(this));
  },

  /**
   * Get the previous month after the given date.
   * @param {Object} date
   * @return {Object}
   */
  getPreviousMonth: function getPreviousMonth(date) {
    // Date() has a *bug/feature* if last day of month is 31 when calculating the previous month.
    // Need to account for that so that it doesn't round up the date/month.

    if (date.day === 31 && date.month !== 1 && date.month !== 3 && date.month !== 8) {
      // Adjust for months ending in 31 that follow months ending in 30
      return dateHelper.create(new Date(date.year, date.month - 2, date.day - 1));
    } else if (date.day > 28 && date.month === 3) {
      // Adjust for last day of February
      return dateHelper.create(new Date(date.year, date.month - 1, 0));
    } else {
      return dateHelper.create(new Date(date.year, date.month - 2, date.day));
    }
  },

  /**
   * Get the month preceding this.
   * @return {Object}
   */
  get previousMonth() {
    this._instanceCheck('previousMonth');
    return this._cache.previousMonth || (this._cache.previousMonth = dateHelper.getPreviousMonth(this));
  },

  /**
   * Get the last day of the month.
   * @param {Object} date
   * @return {Object}
   */
  getMonthEnd: function getMonthEnd(date) {
    return dateHelper.create(new Date(date.year, date.month, 0));
  },

  /**
   * Get the last day of the month.
   * @return {Object}
   */
  get monthEnd() {
    this._instanceCheck('monthEnd');
    return this._cache.monthEnd || (this._cache.monthEnd = dateHelper.getMonthEnd(this));
  },

  /**
   * Does a given day equal another? Or is it present in a list of others?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equal: function equal(date, compare, full) {
    return this.equalDay(date, compare, full);
  },

  /**
   * Does a given day equal another? Or is it present in a list of others?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalDay: function equalDay(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (compare[i] && date.year === compare[i].year && date.month === compare[i].month && date.day === compare[i].day) matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a week equal to another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalWeek: function equalWeek(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || !date.weekStart.equalDay(compare[i].weekStart)) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a month equal to another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalMonth: function equalMonth(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year !== compare[i].year || date.year === compare[i].year && date.month !== compare[i].month) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a year equal to another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  equalYear: function equalYear(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year !== compare[i].year) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a date before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  before: function before(date, compare, full) {
    return this.beforeDay(date, compare, full);
  },

  /**
   * Is a given date before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeDay: function beforeDay(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date._date >= compare[i]._date) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a week before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeWeek: function beforeWeek(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || !date.weekStart.beforeDay(compare[i].weekStart)) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a month before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeMonth: function beforeMonth(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year > compare[i].year || date.year === compare[i].year && date.month >= compare[i].month) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a year before another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  beforeYear: function beforeYear(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year >= compare[i].year) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a date after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  after: function after(date, compare, full) {
    return this.afterDay(date, compare, full);
  },

  /**
   * Is a given date after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterDay: function afterDay(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date._date <= compare[i]._date) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a week after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterWeek: function afterWeek(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || !date.weekStart.afterDay(compare[i].weekStart)) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a month after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterMonth: function afterMonth(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year < compare[i].year || date.year === compare[i].year && date.month <= compare[i].month) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Is a year after another?
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full Return a successful match only if all matches are found.
   * @return {Boolean}
   */
  afterYear: function afterYear(date, compare, full) {

    var args = this._checkComparisonArgs(date, compare, full);
    date = args[0];
    compare = args[1];
    full = args[2];

    var i = 0;
    var len = compare.length;
    var matches = 0;

    for (; i < len; i++) {
      if (!compare[i] || date.year <= compare[i].year) continue;else matches++;
    }

    return full ? matches === len : !!matches;
  },

  /**
   * Get the earliest date in an array.
   * @return {Object}
   */
  earliest: function earliest(arr) {

    var i = 0;
    var len = arr.length;
    var e = void 0;

    for (; i < len; i++) {
      if (!e || arr[i].before(e)) e = arr[i];
    }

    return e;
  },

  /**
   * Get the latest date in an array.
   * @return {Object}
   */
  latest: function latest(arr) {

    var i = 0;
    var len = arr.length;
    var l = void 0;

    for (; i < len; i++) {
      if (!l || arr[i].after(l)) l = arr[i];
    }

    return l;
  },

  /**
   * Clone a date instance.
   * @param {Object} date
   * @return {Object}
   */
  clone: function clone(date) {

    // If we weren't passed a date, use this instance.
    if (!date && this._date && this._date instanceof Date && dateHelper.isPrototypeOf(this)) {
      date = this;
    }

    // No date, can't clone.
    if (!date) {
      throw new Error('Must pass a date to clone or call on an instance.');
    }

    return dateHelper.create(new Date(date._date.valueOf()));
  },

  /**
   * If a comparison function is called on an instance, properly
   * assign the vars.
   * @param {Object} date
   * @param {Object|Array} compare
   * @param {Boolean} full
   */
  _checkComparisonArgs: function _checkComparisonArgs(date, compare, full) {

    if (compare === undefined || typeof compare === 'boolean') {

      if (!dateHelper.isPrototypeOf(this)) {
        throw new Error('Cannot compare only one date!');
      }

      full = compare;
      compare = date;
      date = this;
    }

    compare = compare instanceof Array ? compare : [compare];

    return [date, compare, full];
  },

  /**
   * Check to see if we have an instance of the date object.
   * @param  {String} prop
   */
  _instanceCheck: function _instanceCheck(prop) {
    if (!this._date || !(this._date instanceof Date) || !dateHelper.isPrototypeOf(this)) throw new Error('Cannot access the property "' + prop + '" of the date helper with creating an instance!');
  },

  /**
   * Clear the cache.
   */
  _clearCache: function _clearCache() {
    this._instanceCheck('clearCache');
    this._cache = {};
  }
};

exports.default = dateHelper;
module.exports = exports['default'];


},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pad = require('../util/pad');

var _pad2 = _interopRequireDefault(_pad);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Map characters to their special meanings.
 * @type {Object}
 */
/**
 * # Parse Date Format
 * Given a date format string, break it down into pieces.
 *
 * @example
 * parseDateFormat('MM-DD-YYYY');
 *
 * @module helpers/date/parse-format.js
 */

var map = {
  d: 'day',
  m: 'month',
  y: 'year',
  '-': 'divider',
  '/': 'divider',
  ' ': 'space'
};

/**
 * Given a format and a string, get the day, month and year values from that string.
 * @param {Object} format
 * @return {Function}
 */
function getValues(format) {

  return function (value) {

    var i = 0;
    var index = 0;
    var len = format.length;
    var values = {};

    // Loop through all format pieces
    for (; i < len; i++) {

      // Only worry about date values
      if (['day', 'month', 'year'].indexOf(format[i].name) !== -1) {

        // If the passed value doesn't contain a format piece, it's invalid.
        if (value.length < index + format[i].length) return;

        values[format[i].name] = parseInt(value.substr(index, format[i].length), 10);
      }
      index += format[i].length;
    }

    return _date2.default.create(values);
  };
}

/**
 * Create a formatted date string given an object of values.
 * @param {Object} format
 * @return {Function}
 */
function getString(format) {

  /**
   * @param {Object} vals
   * @return {String}
   */
  return function (vals) {

    var i = 0;
    var len = format.length;
    var str = '';

    for (; i < len; i++) {

      // Numbers
      if (vals[format[i].name]) {
        str += (0, _pad2.default)(vals[format[i].name], format[i].length);
      }
      // Dividers
      else {
          str += format[i].value;
        }
    }

    return str;
  };
}

/**
 * @param {String} format
 * @return {Object}
 */
function parseDateFormat(format) {

  var f = format.toLowerCase();
  var i = 0;
  var len = f.length;

  var obj = {
    parts: []
  };

  for (; i < len; i++) {

    // If there is a matching character mapping and the last part was of the same name, increment its length
    // and add to its content.
    if (map[f[i]] && obj.parts.length && obj.parts[obj.parts.length - 1].name === map[f[i]]) {
      obj.parts[obj.parts.length - 1].length++;
      obj.parts[obj.parts.length - 1].value += format[i];
      continue;
    }

    obj.parts.push({
      name: map[f[i]] ? map[f[i]] : '',
      value: format[i],
      length: 1
    });
  }

  // Add a way to convert the parsed date into a regex-ish string that works with the Typeahead implementation.
  obj.getValues = getValues(obj.parts);
  obj.getString = getString(obj.parts);

  return obj;
}

exports.default = parseDateFormat;
module.exports = exports['default'];


},{"../util/pad":67,"./date":34}],36:[function(require,module,exports){
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


},{"../util/trim":70,"./has-class":38}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Breakpoint Helpers
 * Find the active breakpoint.
 *
 * @param {Number} width
 *
 * @module helpers/dom/breakpoint.js
 */

/**
 * Breakpoints being used in the CSS.
 * @type {Object}
 */
var defaultBreakpoints = {
  xs: {
    min: 0,
    max: 543
  },
  sm: {
    min: 544,
    max: 795
  },
  md: {
    min: 796,
    max: 1047
  },
  lg: {
    min: 1048,
    max: 1799
  },
  xl: {
    min: 1800,
    max: Infinity
  }
};

function get(width, breakpoints) {

  breakpoints = breakpoints || defaultBreakpoints;

  var i = void 0;

  for (i in breakpoints) {
    if (width >= breakpoints[i].min && width <= breakpoints[i].max) {
      return i;
    }
  }
}

exports.get = get;


},{}],38:[function(require,module,exports){
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


},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (html) {

  if (!html) {
    throw new Error('Cannot create element with no HTML!');
  }

  var el = document.createElement('div');
  el.innerHTML = html;
  var el2 = el.children[0];
  el2.parentNode.removeChild(el2);
  return el2;
};

module.exports = exports['default']; /**
                                      * # Make Element
                                      * Make en element using a string of HTML.
                                      *
                                      * @example
                                      * makeElement('<div></div>');
                                      *
                                      * @module helpers/make-element.js
                                      *
                                      * @param {String} html
                                      * @return {Element}
                                      */


},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Offset Position
 * Get the offset position of the element.
 *
 * @param {Element} el
 * @param {Boolean} viewPortOffset The offset relative to the viewport, not page.
 * @return {Object}
 *
 * @module helpers/dom/offset.js
 */
function offset(el, viewPortOffset) {

  var rect = {
    top: 0,
    left: 0
  };

  // Native implementation
  if (el.getBoundingClientRect) {

    var bounding = el.getBoundingClientRect();
    rect.left = bounding.left;
    rect.top = bounding.top;

    if (!viewPortOffset) {
      rect.left += typeof window.scrollX !== 'undefined' ? window.scrollX : window.pageXOffset;
      rect.top += typeof window.scrollY !== 'undefined' ? window.scrollY : window.pageYOffset;
    }
  } else {
    var x = 0,
        y = 0;
    do {
      x += el.offsetLeft - (!viewPortOffset ? el.scrollLeft : 0);
      y += el.offsetTop - (!viewPortOffset ? el.scrollTop : 0);
    } while (el = el.offsetParent);

    rect.left = x;
    rect.top = y;
  }

  return rect;
}

exports.default = offset;
module.exports = exports['default'];


},{}],41:[function(require,module,exports){
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


},{"../util/each":65}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Parse DOM attributes
 * Given an element and an attribute name, parse that attribute
 * if it exists or return a default.
 *
 * @module helpers/dom/parse-attribute.js
 */

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function boolean(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val === 'true' || val === '' ? true : false;
}

/**
 * Get the numeric value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function number(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return parseInt(val, 10);
}

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function string(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val;
}

exports.boolean = boolean;
exports.number = number;
exports.string = string;


},{}],43:[function(require,module,exports){
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


},{"../util/trim":70}],44:[function(require,module,exports){
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


},{"./add-class":36,"./has-class":38,"./remove-class":43}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Trigger Event
 * Trigger a DOM event on an element.
 *
 * @param {Element} el
 * @param {String} name
 *
 * @module helpers/dom/trigger-event.js
 */
function triggerEvent(el, name) {

  var event = void 0;

  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
    event.eventName = name;
    el.dispatchEvent(event);
  } else {
    event = document.createEventObject();
    event.eventType = name;
    event.eventName = name;
    el.fireEvent('on' + event.eventType, event);
  }
}

exports.default = triggerEvent;
module.exports = exports['default'];


},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * # Build Select
 * Build a select input.
 *
 * @param {Object} params
 *
 * @example
 * buildSelect({
 *   attributes: {
 *     name: 'test',
 *     class: 'spark-select__field'
 *   },
 *   options: [1, 2, 3, 4, 5, 6]
 * });
 *
 * @example
 * buildSelect({
 *   attributes: {
 *     name: 'test',
 *     class: 'spark-select__field',
 *     'data-attr': 'thing',
 *      multiple: true
 *   },
 *   selected: [2, 4],
 *   options: [
 *     {text: 'One', value: 1},
 *     {text: 'Two', value: 2},
 *     {text: 'Three', value: 3},
 *     {text: 'Four', value: 4},
 *     {text: 'Five', value: 5},
 *   ]
 * });
 *
 * @module helpers/form/build-select.js
 */

function buildSelect(params) {

  var el = document.createElement('select');
  var html = '';
  var attrs = params.attributes;
  var selected = params.selected instanceof Array ? params.selected : params.selected ? [params.selected] : [];
  var opts = params.options;

  var i = void 0;
  var len = opts.length;

  // Set attributes
  for (i in attrs) {
    el.setAttribute(i, attrs[i]);
  }

  // Add options
  for (i = 0; i < len; i++) {
    if (_typeof(opts[i]) === 'object') {
      html += '<option value="' + opts[i].value + '" ' + (selected.indexOf(opts[i].value) !== -1 ? 'selected' : '') + '>' + opts[i].text + '</option>';
    } else {
      html += '<option value="' + opts[i] + '" ' + (selected.indexOf(opts[i]) !== -1 ? 'selected' : '') + '>' + opts[i] + '</option>';
    }
  }

  el.innerHTML = html;

  return el;
}

exports.default = buildSelect;
module.exports = exports['default'];


},{}],47:[function(require,module,exports){
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


},{"../util/each":65}],48:[function(require,module,exports){
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


},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendChildren(el, children, empty) {

  empty = empty === undefined ? false : empty;

  if (empty) {
    el.textContent = '';
  }

  var domList = children instanceof window.HTMLCollection;

  if (domList) {
    while (children.length) {
      el.appendChild(children[0]);
    }
  } else {
    (0, _each2.default)(children, function (c) {
      if (c) {
        el.appendChild(c);
      }
    });
  }
} /**
   * # Append Children
   * Append an array of children to a node.
   *
   * @param {Element} el
   * @param {Array} children
   * @param {Boolean} empty Empty the node before adding children?
   *
   * @module helpers/manipulation/append-children.js
   */

exports.default = appendChildren;
module.exports = exports['default'];


},{"../util/each":65}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyAttributes(a, b) {
  (0, _each2.default)(a.attributes, function (attr) {
    b.setAttribute(attr.name, attr.value);
  });
} /**
   * # Copy Attributes
   * Copy all of the attributes from one element to another.
   *
   * @param {Element} a
   * @param {Element} b
   *
   * @module helpers/manipulation/copy-attributes.js
   */

exports.default = copyAttributes;
module.exports = exports['default'];


},{"../util/each":65}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertBefore(el, beforeEl, children) {
  (0, _each2.default)(children, function (c) {
    el.insertBefore(c, beforeEl);
  });
} /**
   * # Insert Before
   * Insert an array of elements before a node.
   *
   * @param {Element} el
   * @param {Element} beforeEl
   * @param {Array} children
   *
   * @module helpers/manipulation/insert-before.js
   */

exports.default = insertBefore;
module.exports = exports['default'];


},{"../util/each":65}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Wrap Element
 * Wrap an element with another element.
 *
 * @param {Element} el
 * @param {Element} wrapper
 * @return {Element}
 *
 * @module helpers/manipulation/wrap-element.js
 */
function wrapElement(el, wrapper) {

  wrapper = wrapper || document.createElement('div');

  if (el.nextSibling) {
    el.parentNode.insertBefore(wrapper, el.nextSibling);
  } else {
    el.parentNode.appendChild(wrapper);
  }

  return wrapper.appendChild(el);
}

exports.default = wrapElement;
module.exports = exports['default'];


},{}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _offset2 = require('../dom/offset');

var _offset3 = _interopRequireDefault(_offset2);

var _boxPosition = require('./box-position');

var _boxPosition2 = _interopRequireDefault(_boxPosition);

var _debounce = require('../util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * # Affix
                                                                                                                                                           * Affix one element to another.
                                                                                                                                                           *
                                                                                                                                                           * @example
                                                                                                                                                           * new Affix({
                                                                                                                                                           *   el: el,
                                                                                                                                                           *   targetEl: el2,
                                                                                                                                                           *   caretEl: el3,
                                                                                                                                                           *   anchorY: 'top', // 'middle', 'bottom'
                                                                                                                                                           *   anchorX: 'left', // 'center', 'right'
                                                                                                                                                           * })
                                                                                                                                                           *
                                                                                                                                                           * @module helpers/position/affix.js
                                                                                                                                                           */

var Affix = function () {

  /**
   * Store the reference elements and position.
   * @param  {Object} params
   */
  function Affix() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Affix);

    this.el = params.el;
    this.targetEl = params.targetEl;
    this.caretEl = params.caretEl;
    this.anchorY = params.anchorY || 'top';
    this.anchorX = params.anchorX || 'center';
    this.isFixed = params.isFixed || false;

    this._addEventListeners();
    this._insertEl();
    this._setPosition();
    this._updateDebounced = (0, _debounce2.default)(this.update.bind(this), 500);
  }

  /**
   * Stop listening and clean up event listeners
   * @param {Object} params Optional
   * @return {Object} this
   */


  Affix.prototype.remove = function remove() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!params.keepEl) this._removeEl();
    this._removeEventListeners();
    return this;
  };

  /**
   * Update the position.
   * @return {Object} this
   */


  Affix.prototype.update = function update() {
    this._setPosition();
    return this;
  };

  /**
   * Listen for window resizes to update the position.
   */


  Affix.prototype._addEventListeners = function _addEventListeners() {
    this._onResizeBound = this._onResize.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
  };

  /**
   * Remove event listeners
   */


  Affix.prototype._removeEventListeners = function _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
  };

  /**
   * Insert the element into the DOM.
   */


  Affix.prototype._insertEl = function _insertEl() {
    this.el.setAttribute('data-affixed', '');
    this._getRootEl().appendChild(this.el);
  };

  /**
   * Remove the element from the DOM.
   */


  Affix.prototype._removeEl = function _removeEl() {
    this.el.parentNode.removeChild(this.el);
    this.el.removeAttribute('data-affixed');
  };

  /**
   * Set the position of the target element.
   */


  Affix.prototype._setPosition = function _setPosition() {

    // Fixed position
    this.el.style.setProperty('position', this.isFixed ? 'fixed' : 'absolute', 'important');

    // Target element properties

    var _offset = (0, _offset3.default)(this.targetEl, this.isFixed),
        targetTop = _offset.top,
        targetLeft = _offset.left;

    var targetWidth = this.targetEl.offsetWidth;
    var targetHeight = this.targetEl.offsetHeight;

    // Element to affix properties
    var elWidth = this.el.offsetWidth;
    var elHeight = this.el.offsetHeight;

    // Maxes
    var docHeight = document.documentElement.offsetHeight;
    var docWidth = document.documentElement.offsetWidth;

    // Get the values

    var _calculatePosition2 = this._calculatePosition({
      anchorX: this.anchorX,
      anchorY: this.anchorY,
      targetTop: targetTop,
      targetLeft: targetLeft,
      elHeight: elHeight,
      elWidth: elWidth,
      targetHeight: targetHeight,
      targetWidth: targetWidth,
      minX: 0,
      minY: 0,
      maxX: docWidth - elWidth,
      maxY: Math.max(docHeight - elHeight, 0)
    }),
        elTop = _calculatePosition2.elTop,
        elLeft = _calculatePosition2.elLeft;

    // Position the caret


    var _positionCaret2 = this._positionCaret({
      elLeft: elLeft,
      elTop: elTop,
      elWidth: elWidth,
      elHeight: elHeight,
      targetHeight: targetHeight,
      targetWidth: targetWidth,
      targetLeft: targetLeft,
      targetTop: targetTop
    }),
        extraLeft = _positionCaret2.extraLeft,
        extraTop = _positionCaret2.extraTop;

    // Set the position


    this.el.style.left = elLeft + extraLeft + 'px';
    this.el.style.top = elTop + extraTop + 'px';
  };

  /**
   * Get the proper top position for an anchor direction.
   * @param  {Object} p
   * @return {Object}
   */


  Affix.prototype._calculatePosition = function _calculatePosition(p) {

    // Keep track of what we're trying to do here, so on subsequent, nested calls to this
    // method we can see what has already been tried.
    p.previousAttempts = (p.previousAttempts || 0) + 1;
    p.previousChecks = p.previousChecks || [];

    var finalCheck = p.previousAttempts > 3;
    var top = void 0;
    var left = void 0;

    // Y-axis check
    switch (p.anchorY) {
      case 'bottom':
        top = p.targetTop + p.targetHeight;
        break;
      case 'middle':
        top = p.targetTop - (p.elHeight - p.targetHeight) / 2;
        break;
      default:
        top = p.targetTop - p.elHeight;
        break;
    }

    // Under min
    if (top < p.minY) {

      if (!finalCheck && p.previousChecks.indexOf('overY') === -1) {
        p.previousChecks.push('underY');
        p.anchorY = this._getNewAnchorY(true, p.anchorY, p.anchorX);
        return this._calculatePosition(p);
      } else {
        top = p.minY;
      }
    }

    // Don't check for being too tall because causing a vertical scroll
    // bar down is okay and this saves us from some real positioning hell.
    /*if (top > p.maxY) {
       if (!finalCheck && p.previousChecks.indexOf('underY') === -1) {
        p.previousChecks.push('overY');
        p.anchorY = this._getNewAnchorY(false, p.anchorY, p.anchorX);
        return this._calculatePosition(p);
      }
      // On a final check, bottom wins because at least we can scroll
      else if (!(finalCheck && p.anchorY === 'bottom')) {
        top = p.maxY;
      }
    }*/

    // X-axis check
    switch (p.anchorX) {
      case 'right':
        left = p.targetLeft + (p.anchorY !== 'middle' && !p.isOverlapping ? 0 : p.targetWidth);
        break;
      case 'center':
        left = p.targetLeft - (p.elWidth - p.targetWidth) / 2;
        break;
      default:
        left = p.targetLeft - p.elWidth + (p.anchorY !== 'middle' ? p.targetWidth : 0);
        break;
    }

    // Under min
    if (left < p.minX) {

      if (!finalCheck && p.previousChecks.indexOf('overX') === -1) {
        p.previousChecks.push('underX');
        p.anchorX = this._getNewAnchorX(true, p.anchorX, p.anchorY);
        return this._calculatePosition(p);
      } else {
        left = p.minX;
      }
    }

    // Over max
    if (left > p.maxX) {

      if (!finalCheck && p.previousChecks.indexOf('underX') === -1) {
        p.previousChecks.push('overX');
        p.anchorX = this._getNewAnchorX(false, p.anchorX, p.anchorY);
        return this._calculatePosition(p);
      } else {
        left = p.maxX;
      }
    }

    // One element is covering another. Try to fix that, but bail out after four tries.
    if ((0, _boxPosition2.default)({ width: p.elWidth, height: p.elHeight, left: left, top: top }, { width: p.targetWidth, height: p.targetHeight, left: p.targetLeft, top: p.targetTop }) === 'overlap') {

      p.isOverlapping = true;

      // Try Y
      if (p.repositionY !== false) {

        // Will start undefined, then true, then false. This limits us to entering
        // this loop twice, once to try moving in each direction.
        p.repositionY = !p.repositionY;

        // First try to put above, then try to put below.
        p.anchorY = this._getNewAnchorY(p.repositionY, 'middle', p.anchorX);

        // Give us one more shot at positioning
        p.previousAttempts--;

        return this._calculatePosition(p);
      }
      // Try X
      else if (p.repositionX !== false) {

          // Will start undefined, then true, then false. This limits us to entering
          // this loop twice, once to try moving in each direction.
          p.repositionX = !p.repositionX;

          // First try to put above, then try to put below.
          p.anchorX = this._getNewAnchorX(p.repositionX, 'center', p.anchorY);

          // Give us one more shot at positioning
          p.previousAttempts--;

          return this._calculatePosition(p);
        }
    }

    return { elTop: top, elLeft: left, anchorX: p.anchorX, anchorY: p.anchorY };
  };

  /**
   * Determine the new y-axis anchor
   * @param  {Boolean} underMin Under the min?
   * @param  {String} anchorY
   * @param  {String} anchorX
   * @return {String}
   */


  Affix.prototype._getNewAnchorY = function _getNewAnchorY(underMin, anchorY, anchorX) {

    // If the x-axis is anchored in the center, skip
    // trying to anchor to the middle because then we'd
    // be overlaying the button.
    if (anchorX === 'center' || anchorY === 'middle') {
      return underMin ? 'bottom' : 'top';
    } else {
      return 'middle';
    }
  };

  /**
   * Determine the new y-axis anchor
   * @param  {Boolean} underMin Under the min?
   * @param  {String} anchorY
   * @param  {String} anchorX
   * @return {String}
   */


  Affix.prototype._getNewAnchorX = function _getNewAnchorX(underMin, anchorX, anchorY) {

    // If the y-axis is anchored in the center, skip
    // trying to anchor to the middle because then we'd
    // be overlaying the button.
    if (anchorY === 'middle' || anchorX === 'center') {
      return underMin ? 'left' : 'right';
    } else {
      return 'center';
    }
  };

  /**
   * Set the position of the caret.
   * @param {Object} p
   * @return {Object}
   */


  Affix.prototype._positionCaret = function _positionCaret() {
    var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    if (!this.caretEl) return;

    var caretPosition = (0, _boxPosition2.default)({ width: p.elWidth, height: p.elHeight, left: p.elLeft, top: p.elTop }, { width: p.targetWidth, height: p.targetHeight, left: p.targetLeft, top: p.targetTop });

    var caretDimensions = this.caretEl.getBoundingClientRect();
    var caretWidth = caretDimensions.width;
    var caretHeight = caretDimensions.height;
    var left = Math.min(p.elWidth, Math.max(0, p.targetLeft - p.elLeft + p.targetWidth / 2));
    var top = Math.min(p.elHeight, Math.max(0, p.targetTop - p.elTop + p.targetHeight / 2));

    this.caretEl.style.left = Math.round(left) + 'px';
    this.caretEl.style.top = Math.round(top) + 'px';

    var extraLeft = 0;
    var extraTop = 0;

    this.caretEl.setAttribute('data-position', caretPosition);

    switch (caretPosition) {
      case 'above':
        extraTop = -caretWidth / 2;
        break;
      case 'below':
        extraTop = caretWidth / 2;
        break;
      case 'left':
        extraLeft = -caretHeight / 2;
        break;
      default:
        extraLeft = caretHeight / 2;
        break;
    }

    return {
      extraLeft: extraLeft,
      extraTop: extraTop
    };
  };

  /**
   * Get the root element. Want to check if there's a top-level form for working
   * with ASP .NET pages.
   */


  Affix.prototype._getRootEl = function _getRootEl() {
    var form = document.querySelector('body > form');
    return form && form.getAttribute('data-affixed') === null ? form : document.body;
  };

  /**
   * On resize, update the position.
   */


  Affix.prototype._onResize = function _onResize() {
    this.update();
  };

  /**
   * When the window scrolls, ensure the proper position of the popover.
   */


  Affix.prototype._onScroll = function _onScroll() {
    this._updateDebounced();
  };

  return Affix;
}();

exports.default = Affix;
module.exports = exports['default'];


},{"../dom/offset":40,"../util/debounce":64,"./box-position":54}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (a, b) {

  var aXSpan = a.left + a.width;
  var aYSpan = a.top + a.height;
  var bXSpan = b.left + b.width;
  var bYSpan = b.top + b.height;

  if (aXSpan <= b.left) return 'left'; // a is fully left of b
  if (a.left >= bXSpan) return 'right'; // a is fully right of b
  if (aYSpan <= b.top) return 'above'; // a is fully above b
  if (a.top >= bYSpan) return 'below'; // a is fully below b

  return 'overlap'; // boxes overlap
};

module.exports = exports['default']; /**
                                      * # Box Position
                                      * How is one element positioned relative to another?
                                      *
                                      * @example
                                      * boxPosition(
                                      * {width: 100, height: 300, left: 0, top: 0},
                                      * {width: 200, height: 50, left: 100, top: 40}
                                      * )
                                      *
                                      * @module helpers/position/box-position.js
                                      *
                                      * @param {Object} a
                                      * @param {Object} b
                                      * @return {String}
                                      */


},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChild(el, query) {

  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if ((0, _matches2.default)(el.children[i], query)) {
      return el.children[i];
    }
  }

  return null;
} /**
   * # Get Child
   * Get a child that matches the selector.
   *
   * @param {Element} el
   * @param {String} query
   * @return {Element|Null}
   *
   * @module helpers/traversal/get-child.js
   */

exports.default = getChild;
module.exports = exports['default'];


},{"./matches":63}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildren(el, query) {

  var list = [];
  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if ((0, _matches2.default)(el.children[i], query)) {
      list.push(el.children[i]);
    }
  }

  return list;
} /**
   * # Get Children
   * See if an element has children which match a query.
   *
   * @param {Element} el
   * @param {String} query
   * @return {List}
   *
   * @module helpers/traversal/get-children.js
   */

exports.default = getChildren;
module.exports = exports['default'];


},{"./matches":63}],57:[function(require,module,exports){
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


},{}],58:[function(require,module,exports){
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


},{"./matches":63}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getParent = require('./get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParents(parent, query, limitEl) {

  var list = [];

  while (parent = (0, _getParent2.default)(parent.parentNode, query, limitEl)) {
    list.push(parent);
  }

  return list;
} /**
   * # Get Parents
   * See if an element has parents which match a query.
   *
   * @param {Element} parent
   * @param {String} query
   * @param {Element} limitEl The last element we should check.
   * @return {Boolean|Array}
   *
   * @module helpers/traversal/get-parents.js
   */

exports.default = getParents;
module.exports = exports['default'];


},{"./get-parent":58}],60:[function(require,module,exports){
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


},{"./matches":63}],61:[function(require,module,exports){
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


},{"./matches":63}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Has Parent
 * See if an element has another element for a parent.
 *
 * @param {Element} child
 * @param {Element} possibleParent
 * @return {Boolean}
 *
 * @module helpers/traversal/has-parent.js
 */
function hasParent(child, possibleParent) {

  var parent = child.parentNode;

  while (parent) {

    if (parent === possibleParent) {
      return true;
    }

    parent = parent.parentNode;
  }

  return false;
}

exports.default = hasParent;
module.exports = exports["default"];


},{}],63:[function(require,module,exports){
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


},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Debounce
 * Debounce a function call
 *
 * @param {Function} func
 * @param {Integer} delay
 *
 * @module helpers/util/debounce.js
 */
function debounce(func, delay) {

  var timer = void 0;

  return function () {
    var args = arguments;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      func.apply(this, args);
    }, delay);
  };
}

exports.default = debounce;
module.exports = exports["default"];


},{}],65:[function(require,module,exports){
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


},{}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (proto) {
  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }

  (0, _each2.default)(mixins, function (mixin) {
    for (var i in mixin) {
      if (mixin.hasOwnProperty(i) && !proto[i]) proto[i] = mixin[i];
    }
  });
};

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Mixin
 * Apply a mixin, or mixins, to an Object
 *
 * @example
 * mixin(proto, mix, mix2)
 *
 * @module helpers/util/mixin.js
 */
module.exports = exports['default'];


},{"./each":65}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Pad
 * Pad a number with leading zeros
 *
 * @param {Number} n
 * @param {Number} w
 * @param {String} c Optional String to pad with
 *
 * @example
 * pad(4, 2);
 *
 * @module helpers/util/pad.js
 */
function pad(n, w, c) {
  c = c || '0';
  n = n + '';
  return n.length >= w ? n : new Array(w - n.length + 1).join(c) + n;
}

exports.default = pad;
module.exports = exports['default'];


},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Range
 * Create a range of numbers.
 *
 * @param {Number} start
 * @param {Number} stop
 * @param {Number} step Optional
 * @return {Array}
 *
 * @module helpers/util/range.js
 */
function createRange(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = new Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}

exports.default = createRange;
module.exports = exports["default"];


},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Round
 * Round to a given number of decimal places.
 *
 * @param {Number} num
 * @param {Number} len
 * @return {Number}
 *
 * @module helpers/util/round.js
 */
function round(num, len) {
  len = len !== undefined ? len : 2;
  var x = Math.pow(10, len);
  return Math.round(num * x) / x;
}

exports.default = round;
module.exports = exports["default"];


},{}],70:[function(require,module,exports){
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


},{}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  /**
   * Set the error state.
   * @param {String} message Optional
   */
  setError: function setError(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearWarning();
    this.clearSuccess();

    this.el.setAttribute('data-error', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the error state.
   */
  clearError: function clearError() {
    this.el.removeAttribute('data-error', true);
    return this;
  },


  /**
   * Set the warning state.
   * @param {String} message Optional
   */
  setWarning: function setWarning(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearError();
    this.clearSuccess();

    this.el.setAttribute('data-warning', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the error state.
   */
  clearWarning: function clearWarning() {
    this.el.removeAttribute('data-warning', true);
    return this;
  },


  /**
   * Set the success state.
   * @param {String} message Optional
   */
  setSuccess: function setSuccess(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearError();
    this.clearWarning();

    this.el.setAttribute('data-success', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the success state.
   */
  clearSuccess: function clearSuccess() {
    this.el.removeAttribute('data-success', true);
    return this;
  },


  /**
   * Clear all messages.
   */
  clearMessages: function clearMessages() {
    this._hideMessage(function () {
      this.clearError();
      this.clearWarning();
      this.clearSuccess();
    }.bind(this));
    return this;
  },


  /**
   * Set the message text.
   * @param {String} message
   */
  setMessage: function setMessage(message) {
    this.messageEl.innerHTML = message;
    return this;
  },


  /**
   * Show the message
   */
  _showMessage: function _showMessage() {

    if (!this.messageEl.parentNode) {
      this.el.appendChild(this.messageEl);
    }

    (0, _height2.default)({
      el: this.el,
      toggleEl: this.messageEl
    });
  },


  /**
   * Hide the message.
   * @param {Function} callback
   */
  _hideMessage: function _hideMessage(callback) {

    (0, _height2.default)({
      el: this.el,
      toggleEl: this.messageEl,
      toggleValue: 'none',
      action: 'collapse',
      onComplete: callback
    });
  },


  /**
   * Is the message currently visible?
   * @return {Boolean}
   */
  _isMessageVisible: function _isMessageVisible() {
    return this.el.getAttribute('data-error') || this.el.getAttribute('data-warning') || this.el.getAttribute('data-success');
  }
}; /**
    * # Messaging Mixin
    * Add functionality for showing messages related to a form field.
    *
    * @example
    * mixin(Component, messaging);
    *
    * @module mixin/messaging.js
    */

module.exports = exports['default'];


},{"../helpers/animation/height":29}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Validation Mixin
 * Add functionality for validating a form field's value.
 *
 * @example
 * mixin(Component, validation);
 *
 * @module mixin/validation.js
 */

exports.default = {

  /**
   * Default validate function. This can be overridden by passing a
   * custom validate method as a parameter. This really only helps out
   * of the box for text inputs.
   */
  validate: function validate() {

    var validate = this.validatePattern;

    // Nothing to validate.
    if (!this.onValidate || !validate) {
      return this;
    }

    var re = new RegExp(validate);

    this.onValidate(re.test(this.getValue()), this.getValue(), this);

    return this;
  }
};
module.exports = exports["default"];


},{}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateHelper = exports.Filter = exports.Tooltip = exports.ScrollToTop = exports.Toolbar = exports.ToggleSwitch = exports.TextInput = exports.Tabs = exports.Table = exports.StepIndicator = exports.Slider = exports.SelectInput = exports.RangeSlider = exports.ProgressIndicator = exports.Popover = exports.NumberSelector = exports.MultiSelectInput = exports.Modal = exports.Menu = exports.Header = exports.Expand = exports.DateInput = exports.Carousel = exports.CalendarPopover = exports.Base = undefined;

var _base = require('./components/base');

var _base2 = _interopRequireDefault(_base);

var _calendarPopover = require('./components/calendar-popover');

var _calendarPopover2 = _interopRequireDefault(_calendarPopover);

var _carousel = require('./components/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _dateInput = require('./components/date-input');

var _dateInput2 = _interopRequireDefault(_dateInput);

var _expand = require('./components/expand');

var _expand2 = _interopRequireDefault(_expand);

var _header = require('./components/header');

var _header2 = _interopRequireDefault(_header);

var _menu = require('./components/menu');

var _menu2 = _interopRequireDefault(_menu);

var _modal = require('./components/modal');

var _modal2 = _interopRequireDefault(_modal);

var _multiSelectInput = require('./components/multi-select-input');

var _multiSelectInput2 = _interopRequireDefault(_multiSelectInput);

var _numberSelector = require('./components/number-selector');

var _numberSelector2 = _interopRequireDefault(_numberSelector);

var _popover = require('./components/popover');

var _popover2 = _interopRequireDefault(_popover);

var _progressIndicator = require('./components/progress-indicator');

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

var _rangeSlider = require('./components/range-slider');

var _rangeSlider2 = _interopRequireDefault(_rangeSlider);

var _selectInput = require('./components/select-input');

var _selectInput2 = _interopRequireDefault(_selectInput);

var _slider = require('./components/slider');

var _slider2 = _interopRequireDefault(_slider);

var _table = require('./components/table');

var _table2 = _interopRequireDefault(_table);

var _tabs = require('./components/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _textInput = require('./components/text-input');

var _textInput2 = _interopRequireDefault(_textInput);

var _toggleSwitch = require('./components/toggle-switch');

var _toggleSwitch2 = _interopRequireDefault(_toggleSwitch);

var _toolbar = require('./components/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _tooltip = require('./components/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _scrollToTop = require('./components/scroll-to-top');

var _scrollToTop2 = _interopRequireDefault(_scrollToTop);

var _stepIndicator = require('./components/step-indicator');

var _stepIndicator2 = _interopRequireDefault(_stepIndicator);

var _filter = require('./components/filter');

var _filter2 = _interopRequireDefault(_filter);

var _date = require('./helpers/date/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Base = _base2.default;
exports.CalendarPopover = _calendarPopover2.default;
exports.Carousel = _carousel2.default;
exports.DateInput = _dateInput2.default;
exports.Expand = _expand2.default;
exports.Header = _header2.default;
exports.Menu = _menu2.default;
exports.Modal = _modal2.default;
exports.MultiSelectInput = _multiSelectInput2.default;
exports.NumberSelector = _numberSelector2.default;
exports.Popover = _popover2.default;
exports.ProgressIndicator = _progressIndicator2.default;
exports.RangeSlider = _rangeSlider2.default;
exports.SelectInput = _selectInput2.default;
exports.Slider = _slider2.default;
exports.StepIndicator = _stepIndicator2.default;
exports.Table = _table2.default;
exports.Tabs = _tabs2.default;
exports.TextInput = _textInput2.default;
exports.ToggleSwitch = _toggleSwitch2.default;
exports.Toolbar = _toolbar2.default;
exports.ScrollToTop = _scrollToTop2.default;
exports.Tooltip = _tooltip2.default;
exports.Filter = _filter2.default;
exports.DateHelper = _date2.default;


},{"./components/base":1,"./components/calendar-popover":2,"./components/carousel":3,"./components/date-input":4,"./components/expand":7,"./components/filter":9,"./components/header":10,"./components/menu":11,"./components/modal":12,"./components/multi-select-input":13,"./components/number-selector":14,"./components/popover":15,"./components/progress-indicator":16,"./components/range-slider":17,"./components/scroll-to-top":18,"./components/select-input":19,"./components/slider":20,"./components/step-indicator":21,"./components/table":22,"./components/tabs":23,"./components/text-input":24,"./components/toggle-switch":25,"./components/toolbar":26,"./components/tooltip":27,"./helpers/date/date":34}]},{},[73])(73)
});