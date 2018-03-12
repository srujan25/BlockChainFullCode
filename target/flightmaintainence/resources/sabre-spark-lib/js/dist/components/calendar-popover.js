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
//# sourceMappingURL=calendar-popover.js.map
