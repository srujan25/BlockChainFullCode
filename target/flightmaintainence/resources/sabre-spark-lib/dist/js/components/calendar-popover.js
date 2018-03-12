/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).CalendarPopover = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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


},{"../helpers/util/each":27}],2:[function(require,module,exports){
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


},{"../helpers/animation/scroll-to":5,"../helpers/date/date":7,"../helpers/date/parse-format":8,"../helpers/dom/add-class":9,"../helpers/dom/breakpoint":10,"../helpers/dom/has-class":11,"../helpers/dom/parse-attribute":13,"../helpers/dom/remove-class":14,"../helpers/dom/trigger-event":16,"../helpers/form/build-select":17,"../helpers/manipulation/append-children":18,"../helpers/traversal/get-parent":21,"../helpers/traversal/get-sibling-after":22,"../helpers/traversal/get-sibling-before":23,"../helpers/util/range":29,"./base":1,"./popover":3}],3:[function(require,module,exports){
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


},{"../helpers/dom/add-class":9,"../helpers/dom/has-class":11,"../helpers/dom/parse-attribute":13,"../helpers/dom/toggle-class":15,"../helpers/manipulation/append-children":18,"../helpers/position/affix":19,"../helpers/traversal/get-parent":21,"../helpers/traversal/has-parent":24,"./base":1}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
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


},{"../dom/offset":12,"./tween":6}],6:[function(require,module,exports){
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


},{"./request":4}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
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


},{"../util/pad":28,"./date":7}],9:[function(require,module,exports){
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


},{"../util/trim":30,"./has-class":11}],10:[function(require,module,exports){
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


},{}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
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


},{"../util/trim":30}],15:[function(require,module,exports){
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


},{"./add-class":9,"./has-class":11,"./remove-class":14}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
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


},{"../util/each":27}],19:[function(require,module,exports){
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


},{"../dom/offset":12,"../util/debounce":26,"./box-position":20}],20:[function(require,module,exports){
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


},{}],21:[function(require,module,exports){
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


},{"./matches":25}],22:[function(require,module,exports){
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


},{"./matches":25}],23:[function(require,module,exports){
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


},{"./matches":25}],24:[function(require,module,exports){
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


},{}],25:[function(require,module,exports){
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


},{}],26:[function(require,module,exports){
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


},{}],27:[function(require,module,exports){
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


},{}],28:[function(require,module,exports){
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


},{}],29:[function(require,module,exports){
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


},{}],30:[function(require,module,exports){
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


},{}]},{},[2])(2)
});

//# sourceMappingURL=calendar-popover.js.map
