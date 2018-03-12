/**
 * # Calendar Popover
 * Create a calendar from which dates can be selected.
 *
 * @example
 * new CalendarPopover(el);
 *
 * @module components/calendar-popover.js
 */
import BaseComponent from './base';
import Popover from './popover';
import parseDateFormat from '../helpers/date/parse-format';
import dateHelper from '../helpers/date/date';
import buildSelect from '../helpers/form/build-select';
import addClass from '../helpers/dom/add-class';
import removeClass from '../helpers/dom/remove-class';
import hasClass from '../helpers/dom/has-class';
import appendChildren from '../helpers/manipulation/append-children';
import getParent from '../helpers/traversal/get-parent';
import triggerEvent from '../helpers/dom/trigger-event';
import {get as getBreakpoint} from '../helpers/dom/breakpoint';
import scrollWindowTo from '../helpers/animation/scroll-to';
import getSiblingBefore from '../helpers/traversal/get-sibling-before';
import getSiblingAfter from '../helpers/traversal/get-sibling-after';
import range from '../helpers/util/range';
import {number as parseNumberAttribute, boolean as parseBooleanAttribute, string as parseStringAttribute} from '../helpers/dom/parse-attribute';

const noop = function() {};
const domDateFormat = 'YYYY-MM-DD';
const parsedDomFormat = parseDateFormat(domDateFormat);

function createDefaultElement() {
  let el = document.createElement('span');
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

class CalendarPopover extends BaseComponent {

  /**
   * Calendar Popover constructor
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  constructor(el, params = {}) {

    params = parseInitParams(el, params);

    if (!super(el, params)) {
      return;
    }

    // Create a calendar element if we weren't passed one.
    (this.calendarEl ? noop : this._createCalendar).call(this);
    this._cacheCalendarElements();

    this._bindEventListenerCallbacks();
    this._addEventListeners();
    this._initDatesToShow();
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

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
  }


  /**
   * Open the calendar widget.
   * @param {Number} index Optional The index of the element to tie actions to
   * @param {Object} params Optional
   */
  open(index = 0, params = {}) {

    if (this._isDisabled[index]) {
      return this;
    }

    this._unfillToggle();

    // Allow for only params to be passed
    if (typeof index === 'object') {
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
    this._openCloseTimer = setTimeout(function() {
      this.popover.open({
        affixTo: this.els[index].querySelector('.spark-date__calendar-toggle')
      });
    }.bind(this), params.delay || 0);

    // Activate the corresponding element
    this._activateElement(index);

    return this;
  }


  /**
   * Close the calendar widget.
   * @param {Object} params
   */
  close(params) {

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
    this._openCloseTimer = setTimeout(function() {
      this.popover.close();
    }.bind(this), params.delay || 0);
  }


  /**
   * Get the value.
   * @param {Number|Element} index Optional
   * @return {Mixed}
   */
  getValue(index) {
    return this.values[index || 0];
  }


  /**
   * Set the date for a given element.
   * @param {String|Object} value
   * @param {Number|Element} index
   * @param {Boolean} skipRangeCheck Optional Don't check for sequential range values.
   */
  setValue(value, index, skipRangeCheck) {

    let obj = typeof value === 'object' ? value : parsedDomFormat.getValues(value);
    let el;

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

      triggerEvent(el, 'change');
      (this.onChange || noop)(el, el.value, this);

      let pos = this._inputsChanging.indexOf(index);
      this._inputsChanging.splice(pos, 1);
    }

    this.render({
      clearCache: true
    });

    return this;
  }


  /**
   * Clear the selected values.
   */
  clearValues() {

    let els = this.inputEls;
    let i = 0;
    let len = els.length;

    for (; i < len; i++) {
      this.clearValue(i);
    }

    return this;
  }


  /**
   * Clear the selected value.
   * @param {Number} index
   */
  clearValue(index = 0) {
    this.values = this.values || [];
    if (!this.inputEls[index]) throw new Error(`Cannot clear value at index ${index}. No input element exists with that index!`);
    this.values[index] = this.inputEls[index].value = null;
    return this;
  }


  /**
   * Take the date values from the inputs and set them as dates on the calendar.
   */
  updateValues() {

    let els = this.inputEls;
    let i = 0;
    let len = els.length;

    for (; i < len; i++) {
      this.updateValue(i);
    }

    return this;
  }


  /**
   * Take the date values from the inputs and set them as dates on the calendar.
   * @param {Number} index
   */
  updateValue(index = 0) {
    this.values = this.values || [];
    if (!this.inputEls[index]) throw new Error(`Cannot update value at index ${index}. No input element exists with that index!`);
    this.values[index] = this.inputEls[index].value ? parsedDomFormat.getValues(this.inputEls[index].value) : null;
    return this;
  }


  /**
   * Disable the calendar functionality.
   * @param {Number} index
   */
  disable(index) {

    let i = index || 0;
    let len = index !== undefined ? index + 1 : this.els.length;
    let toggle;

    for(; i < len; i++) {
      this._isDisabled[i] = true;
      this.els[i].setAttribute('disabled', '');
      toggle = this.els[i].querySelector('.spark-date__calendar-toggle');
      if (toggle) toggle.setAttribute('disabled', '');
    }

    this.close();

    return this;
  }


  /**
   * Enable the calendar functionality.
   * @param {Number} index
   */
  enable(index) {

    let i = index || 0;
    let len = index !== undefined ? index + 1 : this.els.length;
    let toggle;

    for(; i < len; i++) {
      this._isDisabled[i] = false;
      this.els[i].removeAttribute('disabled', '');
      toggle = this.els[i].querySelector('.spark-date__calendar-toggle');
      if (toggle) toggle.removeAttribute('disabled');
    }

    return this;
  }


  /**
   * Render the calendar or calendars into the popover.
   * @param {Object} params
   */
  render(params) {

    params = params || {};

    // If we don't have a popover yet, create it.
    if (!this.popover) {
      this._createPopover();
    }

    let content;

    // Clear the cache so that we don't show out-of-date values.
    if (params.clearCache) {
      this._renderCache = {};
    }

    // Create the visible days, weeks, months or years
    if (this.viewRange === 'year')
      content = this._renderYears();
    else if (this.viewRange === 'week')
      content = this._renderWeeks();
    else if (this.viewRange === 'day')
      content = this._renderDays();
    else
      content = this._renderMonths();

    this._insertContent(content, params);

    // Update attributes
    this._updateAttributes();

    return this;
  }


  /**
   * Cleans up event listeners and removes helpers.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  remove(leaveElement) {
    this.popover && this.popover.remove();
    return super.remove(leaveElement);
  }


  /**
   * Move to the next set of dates.
   */
  next() {
    if (this._atMax) return this;
    this._setDatesToShow(1);
    this.render({
      append: 1
    });
    return this;
  }


  /**
   * Move to the previous set of dates.
   */
  previous() {
    if (this._atMin) return this;
    this._setDatesToShow(-1);
    this.render({
      prepend: 1
    });
    return this;
  }


  /**
   * Show a specific date on the calendar.
   * @param {Object} params
   */
  showDate(params) {

    // Open if we're closed.
    if (this.activeIndex === null) {
      this.open();
    }

    let month = params.month || null;
    let year = params.year || null;
    let day = params.day || null;

    // Nothing to do.
    if (!month && !year && !day) {
      return this;
    }

    let showing = this._datesToShow[this.activeIndex].clone();
    let noun = this.viewRange.charAt(0).toUpperCase() + this.viewRange.slice(1);

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
    let min = this.mins[this.activeIndex];
    if (min && showing['before' + noun](min)) {
      showing = min.clone();
    }

    // Check max
    let max = this.maxes[this.activeIndex];
    if (max && showing['after' + noun](max)) {
      showing = max.clone();
    }
    this._datesToShow[this.activeIndex] = showing;

    // Populate the rest of the dates
    this._setDatesToShow();

    return this.render();
  }


  /**
   * Render the appropriate number of years.
   * @return {Array}
   */
  _renderYears() {
    throw new Error('Displaying years in the calendar is not yet supported!');
  }


  /**
   * Render the appropriate number of weeks.
   * @return {Array}
   */
  _renderWeeks() {
    throw new Error('Displaying weeks in the calendar is not yet supported!');
  }


  /**
   * Render the appropriate number of days.
   * @return {Array}
   */
  _renderDays() {
    throw new Error('Displaying days in the calendar is not yet supported!');
  }


  /**
   * Render the appropriate number of months.
   * @return {Array}
   */
  _renderMonths() {

    let months = [];
    let i = 0;
    let len = this._datesToShow.length;
    let current = dateHelper.now();

    for (; i < len; i++) {
      months.push(this._renderMonth(this._datesToShow[i], current));
    }

    return months;
  }


  /**
   * Render a month.
   * @param {Object} date
   * @param {Object} current
   * @return {Element}
   */
  _renderMonth(date, current) {

    // A unique key for this month used for caching
    let key = date.year + '-' + date.month;

    // Ensure we have a cache
    this._renderCache = this._renderCache || {};

    // Return a cached instance
    if (this._renderCache[key]) {
      return this._renderCache[key];
    }

    // Create the element
    let el = document.createElement('div');
    let html = '';
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
    return (this._renderCache[key] = el);
  }


  /**
   * Render the select inputs used for jumping ahead/backward several months.
   * @param {Object} date
   */
  _renderMonthQuickJump(date) {

    let el = document.createElement('div');
    let years;
    let months;

    // Min and max year to show
    let min = this.mins[this.activeIndex] ? this.mins[this.activeIndex].clone() : null;
    let max = this.maxes[this.activeIndex] ? this.maxes[this.activeIndex].clone() : null;
    let quickJumpRange = (typeof this.quickJumpRange === 'number' && (this.quickJumpRange % 1) === 0) ? this.quickJumpRange : 50;

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
    let monthOpts = dateHelper.getMonthNames().map(function(val, i) {

      // Don't show a month that is out of the valid range.
      if (min.year === max.year && (i + 1 < min.month || i + 1 > max.month)) {
        return null;
      }

      return {
        value: i + 1,
        text: val
      };
    }).filter(function(i) {
      return i;
    });


    // Min and max are the same month, so just show text.
    if (!monthOpts.length || monthOpts.length === 1) {
      months = document.createElement('span');
      months.innerHTML = date.monthName + ' ';
    } else {

      // Build a select list of months
      months = document.createElement('label');
      addClass(months, 'spark-select spark-calendar__select');
      months.appendChild(buildSelect({
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
      addClass(years, 'spark-select spark-calendar__select');
      years.appendChild(buildSelect({
        selected: date.year,
        attributes: {
          class: 'spark-select__input',
          name: 'year'
        },
        options: range(max.year, min.year - 1)
      }));
    }

    appendChildren(el, [months, years]);

    return el.innerHTML;
  }


  /**
   * Render the days of week row for a month calendar.
   * @return {String}
   */
  _renderMonthDaysOfWeek() {

    let daysOfWeek = dateHelper.getDayNames();
    let i = 0;
    let len = daysOfWeek.length;
    let str = '<div class="spark-calendar__days-of-week">';

    for (; i < len; i++) {
      str += '<span class="spark-calendar__day-of-week">' + daysOfWeek[i][0] + '</span>';
    }

    return str += '</div>';
  }


  /**
   * Render the days of week row for a month calendar.
   * @param {Object} date
   * @param {Object} current
   * @return {String}
   */
  _renderMonthDays(date, current) {

    let dayOfWeek = date.monthStart.dayOfWeek;
    let startOfWeek = dayOfWeek > 1 ? date.monthStart.weekStart : null;
    let monthEnd = date.monthEnd;
    let weeks = 6;
    let i = 0;
    let j = 0;
    let str = '<div class="spark-calendar__days">';
    let day = 0;
    let month = startOfWeek ? startOfWeek.month : date.month;
    let year = startOfWeek ? startOfWeek.year : date.year;
    let isCurrentMonth = current.year === date.year && current.month === date.month;

    // If we have days that come before the first of the month, the days will start as
    // inactive. We use a 1 here to indicate the date is inactive and _before_
    // the start of the month.
    let inactive = startOfWeek ? 1 : null;

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
  }


  /**
   * Render a day of the month.
   * @param {Number} day
   * @param {Number} month
   * @param {Number} year
   * @param {Boolean} isCurrentMonth
   * @param {Object} current
   * @param {Boolean} inactive
   */
  _renderMonthDay(day, month, year, isCurrentMonth, current, inactive) {

    let date = dateHelper.create({
      year: year,
      month: month,
      day: day
    });
    let str = '<a';
    let disabled = inactive || this._isDayDisabled(date);

    str += !disabled ? ' data-date="' + parsedDomFormat.getString(date) + '"' : '';
    str += inactive ? ' data-direction="' + (inactive === 2 ? 'next' : 'previous') + '"' : '';
    str += ' class="spark-calendar__day';
    str += (isCurrentMonth && current.day === day && current.month === month && current.year === year ? ' spark-calendar__day--today' : '');
    str += (inactive ? ' spark-calendar__day--inactive' : '');
    str += (disabled ? ' spark-calendar__day--disabled' : '');
    str += (this._isDaySelected(date) ? ' spark-calendar__day--selected' : '');
    str += (this._isDayRangeStart(date) ? ' spark-calendar__range-start' : '');
    str += (this._isDayRangeMiddle(date) ? ' spark-calendar__range-middle' : '');
    str += (this._isDayRangeEnd(date) ? ' spark-calendar__range-end' : '');
    str += (this._isDayRangeLast(date) ? ' spark-calendar__range-last' : '');
    str += '"';
    str += ' href="#"><span>';
    str += day;
    str += this._getDayInfo(date);
    str += '</span></a>';

    return str;
  }


  /**
   * Render the children into the content.
   * @param {Array} content
   */
  _insertContent(content, params) {

    this._currentContent = this._currentContent || [];

    params = params || {};

    let keep;
    let i = 0;
    let len;

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

        this._animateContent(function() {

          this.calendarEl.removeAttribute('data-prepend-count');

          this._animateContent(function() {
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

        this._animateContent(function() {

          addClass(this.calendarEl, 'no-animate');
          content = content.slice(params.append);
          this._insertContent(content);
          this.calendarEl.removeAttribute('data-append-count');

          this._animateContent(function() {
            removeClass(this.calendarEl, 'no-animate');
          }, 10);
        }, this.animationDuration);
      }
    }

    appendChildren(this.calendarContentEl, this._currentContent = content, true);
  }


  /**
   * Is a given day selected?
   * @param {Object} date
   * @return {Boolean}
   */
  _isDaySelected(date) {
    return this.values && date.equal(this.values);
  }


  /**
   * Is a given day the start of a range?
   * @param {Object} date
   * @return {Boolean}
   */
  _isDayRangeStart(date) {
    return this.inputEls.length > 1 && this.values && date.equal(this.values[0]);
  }


  /**
   * Is a given day the middle of a range?
   * @param {Object} date
   * @return {Boolean}
   */
  _isDayRangeMiddle(date) {
    return this.inputEls.length > 1 && this.values && this.values.length > 1 && date.equal(this.values.slice(1, -1));
  }


  /**
   * Is a given day the end of a range?
   * @param {Object} date
   * @return {Boolean}
   */
  _isDayRangeEnd(date) {
    return this.inputEls.length > 1 && this.values && this.values.length > 1 && date.equal(this.values[this.values.length - 1]);
  }


  /**
   * Is a given day currently the last
   * @param {Object} date
   * @return {Boolean}
   */
  _isDayRangeLast(date) {

    let i = this.values.length - 1;

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
  }


  /**
   * Is a given day disabled?
   * @param {Object} date
   * @return {Boolean}
   */
  _isDayDisabled(date) {
    return (this.daysDisabled &&
        this.daysDisabled[date.year] &&
        this.daysDisabled[date.year][date.month] &&
        this.daysDisabled[date.year][date.month].indexOf(date.day) !== -1) ||
      (this.mins[this.activeIndex] && date.before(this.mins[this.activeIndex], true)) ||
      (this.maxes[this.activeIndex] && date.after(this.maxes[this.activeIndex], true));
  }


  /**
   * Get any "info" for a given day.
   * @param {Object} date
   * @return {String}
   */
  _getDayInfo(date) {
    return this.daysInfo && this.daysInfo[date.year] && this.daysInfo[date.year][date.month] && this.daysInfo[date.year][date.month][date.day] ? '<span class="spark-calendar__day-note">' + this.daysInfo[date.year][date.month][date.day] + '</span>' : '';
  }


  /**
   * Get the class names for a month.
   * @param {Object} date
   * @return {String}
   */
  _getMonthClassNames(date) {

    let cls = [];

    // Do we have a value in this month?
    if (date.equalMonth(this.values)) {
      cls.push('has-value');
    }

    // Does this month have the start, middle or end of a range?
    if (this._isRange && this.els.length > 1) {

      let start = date.equalMonth(this.values[0]);
      let end = date.equalMonth(this.values[this.values.length - 1]);
      let middle = date.equalMonth(this.values.slice(1, -1));
      let valBefore = date.afterMonth(this.values);
      let valAfter = date.beforeMonth(this.values);
      let afterEnd = this.values[this.values.length - 1] && date.after(this.values[this.values.length - 1]);

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
  }


  /**
   * Create the calendar.
   */
  _createCalendar() {
    let el = document.createElement('div');
    addClass(el, 'spark-calendar');
    el.innerHTML = '<nav class="spark-calendar__nav"><button class="spark-calendar__previous spark-icon-chevron-left" title="Previous"></button><button class="spark-calendar__next spark-icon-chevron-right" title="Next"></button></nav><div class="spark-calendar__overflow"><div class="spark-calendar__content"></div></div>';
    this.calendarEl = el;
    this.calendarContentEl = el.querySelector('.spark-calendar__content');
    this.calendarOverflowEl = el.querySelector('.spark-calendar_overflow');
  }


  /**
   * Create the popover.
   */
  _createPopover() {

    this.popover = new Popover(document.createElement('div'), {
      anchorX: 'center',
      anchorY: 'bottom',
      contentEl: this.calendarEl,
      onClose: this._onPopoverClose.bind(this),
      onOpen: this._onPopoverOpen.bind(this)
    });
  }


  /**
   * Cache elements.
   */
  _cacheElements() {

    this.inputEls = [];

    let i = 0;
    let len = this.els.length;
    let input;

    for (; i < len; i++) {
      input = this.els[i].nodeName.toLowerCase() === 'input' ? this.els[i] : this.els[i].querySelector('input[type="date"]');
      this.inputEls[i] = input;
    }
  }


  /**
   * Cache elements specific to the calendar.
   */
  _cacheCalendarElements() {
    this.nextButtonEl = this.calendarEl.querySelector('.spark-calendar__next');
    this.previousButtonEl = this.calendarEl.querySelector('.spark-calendar__previous');
  }


  /**
   * Parse parameters from the elements.
   */
  _parseParams() {

    this._parseInputElsParams();

    this._isRange = this.els.length > 1 ? true : false;
    this.autoAdvance = this.autoAdvance !== null ? this.autoAdvance : parseBooleanAttribute(this.els[0], 'data-auto-advance', true);
    this.autoClose = this.autoClose !== null ? this.autoClose : parseBooleanAttribute(this.els[0], 'data-auto-close', true);
    this.closeDelay = this.closeDelay !== null ? this.closeDelay : parseNumberAttribute(this.els[0], 'data-close-delay', 500);
    this.quickJump = this.quickJump !== null ? this.quickJump : parseBooleanAttribute(this.els[0], 'data-quick-jump', false);
    this.viewRange = this.viewRange !== null ? this.viewRange : parseStringAttribute(this.els[0], 'data-view-range', 'month');
    this.animate = this.animate !== null ? this.animate : parseBooleanAttribute(this.els[0], 'data-animate', true);
    this.animationDuration = this.animationDuration !== null ? this.animationDuration : parseNumberAttribute(this.els[0], 'data-animation-duration', 100);
    this.showOnFocus = this.showOnFocus !== null ? this.showOnFocus : parseBooleanAttribute(this.els[0], 'data-show-on-focus', false);
  }


  /**
   * Parse the min, max, value and visible counts from the elements if we can.
   * @return {Number|Boolean}
   */
  _parseInputElsParams() {

    let els = this.inputEls;

    if (!els) {
      return;
    }

    let i = 0;
    let len = els.length;
    let mins = [];
    let maxes = [];
    let values = [];
    let visibleCounts = [];
    let disableds = [];

    for (; i < len; i++) {

      if (!els[i]) {
        continue;
      }

      if (this.mins && this.mins[i])
        mins[i] = typeof this.mins[i] === 'object' ? this.mins[i] : parsedDomFormat.getValues(this.mins[i]);
      else if (els[i].getAttribute('min'))
        mins[i] = parsedDomFormat.getValues(els[i].getAttribute('min'));

      if (this.maxes && this.maxes[i])
        maxes[i] = typeof this.maxes[i] === 'object' ? this.maxes[i] : parsedDomFormat.getValues(this.maxes[i]);
      else if (els[i].getAttribute('max'))
        maxes[i] = parsedDomFormat.getValues(els[i].getAttribute('max'));

      if (this.values && this.values[i])
        values[i] = typeof this.values[i] === 'object' ? this.values[i] : parsedDomFormat.getValues(this.values[i]);
      else if (els[i].value)
        values[i] = parsedDomFormat.getValues(els[i].value);

      disableds[i] = parseBooleanAttribute(els[i], 'disabled', false);

      if (!this.visibleCounts)
        visibleCounts[i] = parseInt(els[i].getAttribute('data-visible-count'), 10) || 1;
    }

    this.mins = mins;
    this.minVisible = dateHelper.earliest(mins);
    this.maxes = maxes;
    this.maxVisible = dateHelper.latest(maxes);
    this.values = values;
    this._isDisabled = disableds;
    if (visibleCounts.length) this.visibleCounts = visibleCounts;
  }


  /**
   * Get the dates we should be showing. Start with the first value or today's date.
   */
  _initDatesToShow() {

    let arr = [];
    let i = 0;
    let len = this.values.length;

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
      arr.push(dateHelper.now());
    }

    this._datesToShow = arr;

    this._setDatesToShow();
  }


  /**
   * Set the dates to show.
   * @param {Number} change Optional The direction to change
   */
  _setDatesToShow(change) {

    let arr = this._datesToShow;
    let visibleCount = this._currentBreakpoint === 'xs' || this._currentBreakpoint === 'sm' ? 1 : (this.visibleCounts[this.activeIndex] || this.visibleCounts[0] || 1);
    let i = 0;
    let noun = this.viewRange.charAt(0).toUpperCase() + this.viewRange.slice(1);

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

    let addDate;
    let lastSelected;
    let action;
    i = 0;

    // Add additional dates
    while (arr.length < visibleCount) {

      // If at the max, prepend
      // If we're in the last input and it has a value and it's a different month than the first value, prepend
      // If at the min, append
      // If an item we're adding is before the min, discard it and append an item after the last in the arr
      // If an item we're adding is after the max, discard it and prepend an item before the first in the arr

      lastSelected = !change &&
        this.activeIndex === this.values.length - 1 &&
        this.values[this.values.length - 1] &&
        this.values[0] &&
        !this.values[this.values.length - 1]['equal' + noun](this.values, true);

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
  }


  /**
   * Check for the min value in an array of values.
   * @param {Object} min
   * @param {String} noun The type of date to check
   * @param {Array} arr
   * @return {Boolean}
   */
  _checkMinDateVisible(noun, arr) {

    if (!this.minVisible) {
      return;
    }

    let min = this.minVisible;

    if (min && (arr[0]['equal' + noun](min) || arr[0]['before' + noun](min))) {
      arr[0] = min;
      return true;
    }

    return false;
  }


  /**
   * Check for the max value in an array of values.
   * @param {Object} max
   * @param {String} noun The type of date to check
   * @param {Array} arr
   * @return {Boolean}
   */
  _checkMaxDateVisible(noun, arr) {

    if (!this.maxVisible) {
      return;
    }

    let max = this.maxVisible;

    if (max && arr[arr.length - 1] && (arr[arr.length - 1]['equal' + noun](max) || arr[arr.length - 1]['after' + noun](max))) {
      arr[arr.length - 1] = max;
      return true;
    }

    return false;
  }


  /**
   * Check that the values are in bounds and, optinoally, in sequential order.
   * If checking for sequence, remove those which aren't.
   * @param {Number} setIndex The index of the value most recently set. This shouldn't be removed.
   * @return {Boolean} Did any values change?
   */
  _checkValues(setIndex, skipRangeCheck) {

    // Check boundaries
    let changed = this._checkMinMaxValues();

    // Sequential range items check
    if (this._isRange && !skipRangeCheck) {

      let i = this.values.length - 1;

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
  }


  /**
   * Check minimum/maximum values.
   * @return {Boolean}
   */
  _checkMinMaxValues() {

    let i = 0;
    let len = this.values.length;
    let changed = false;

    for (; i < len; i++) {
      if ((this.maxes && this.maxes[i] && this.values[i] && this.values[i].after(this.maxes[i], true))) {
        this.values[i] = this.maxes[i].clone();
        changed = true;
      } else if ((this.mins && this.mins[i] && this.values[i] && this.values[i].before(this.mins[i], true))) {
        this.values[i] = this.mins[i].clone();
        changed = true;
      }
    }

    return changed;
  }


  /**
   * Enqueue animations to be run. (Not really animations since those happen w/ CSS. More
   * of a manager of timeouts).
   * @param {Function} cb
   * @param {Number} duration
   */
  _animateContent(cb, duration) {
    this._animationQueue = this._animationQueue || [];
    this._animationQueue.push({
      cb: cb,
      d: duration
    });
    this._runAnimation();
  }


  /**
   * Run the first queued animation. When complete, run the next animation.
   */
  _runAnimation() {

    if (!this._animationTimer) {

      let a = this._animationQueue.shift();

      if (a) {

        this._animationTimer = setTimeout(function() {
          a.cb.call(this);
          this._animationTimer = null;
          this._runAnimation();
        }.bind(this), a.d);
      }
    }
  }


  /**
   * Update attributes on the element and its children.
   */
  _updateAttributes() {
    this.calendarEl.setAttribute('data-visible-count', this._currentBreakpoint === 'xs' ? 1 : (this.visibleCounts[this.activeIndex] || this.visibleCounts[0] || 1));
    this._updateNav();
  }


  /**
   * Update the navigation to reflect the ability to move forward and backward.
   */
  _updateNav() {

    if (this.previousButtonEl) {
      if (this._atMin)
        this.previousButtonEl.setAttribute('disabled', true);
      else
        this.previousButtonEl.removeAttribute('disabled');
    }

    if (this.nextButtonEl) {
      if (this._atMax)
        this.nextButtonEl.setAttribute('disabled', true);
      else
        this.nextButtonEl.removeAttribute('disabled');
    }
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {

    this._onInputChangeBound = this._onInputChange.bind(this);
    this._onSelectChangeBound = this._onSelectChange.bind(this);
    this._onInputFocusBound = this._onInputFocus.bind(this);
    this._onClickBound = this._onClick.bind(this);
    this._onCalendarClickBound = this._onCalendarClick.bind(this);

    this._onCalendarMouseOverBound = this._onCalendarMouseOver.bind(this);
    this._onCalendarMouseOutBound = this._onCalendarMouseOut.bind(this);

    this._onResizeBound = this._onResize.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {

    let i = 0;
    let len = this.els.length;

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
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {

    let i = 0;
    let len = this.els.length;

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
  }


  /**
   * Focus on the next input if there is one.
   */
  _focusNext() {

    let index;

    // If we don't have any null values, don't do anything.
    if ((index = this.values.indexOf(null)) === -1) {
      return;
    }

    if (this.activeIndex < this.els.length - 1) {
      this.open(this.activeIndex + 1);
    } else {
      this.open(index);
    }
  }


  /**
   * Close if we're on the last input and we have values.
   */
  _closeOnLast() {
    if (this.values.indexOf(null) === -1) {
      this.close({
        delay: this.closeDelay
      });
    }
  }


  /**
   * Make the toggle icon a fill icon.
   */
  _fillToggle() {

    let toggle;

    if (this.els[this.activeIndex] && (toggle = this.els[this.activeIndex].querySelector('.spark-date__calendar-toggle [class*="spark-icon"]'))) {
      addClass(toggle, 'spark-icon--fill');
    }
  }


  /**
   * Make the toggle icon a line icon.
   */
  _unfillToggle() {

    let toggle;

    if (this.els[this.activeIndex] && (toggle = this.els[this.activeIndex].querySelector('.spark-date__calendar-toggle [class*="spark-icon"]'))) {
      removeClass(toggle, 'spark-icon--fill');
    }
  }


  /**
   * Activate the element associated with the calendar.
   * @param {Number} index
   */
  _activateElement(index) {
    let el = this.els[index];
    if (el) addClass(el, 'active');
  }


  /**
   * Deactivate the element associated with the calendar.
   * @param {Number} index
   */
  _deactivateElement(index) {
    let el = this.els[index];
    if (el && !this.values[index] && !hasClass(el, 'focus') && !hasClass(el, 'has-partial-value')) {
      removeClass(el, 'active');
    }
  }


  /**
   * Check the size of the popover and see if we should be showing the XS treatment.
   */
  _checkSize() {

    let bp = getBreakpoint(window.outerWidth);

    // Don't do anything if the breakpoint hasn't changed.
    if (this._currentBreakpoint === bp) return;

    // Store the breakpoint
    this._currentBreakpoint = bp;

    // Re-render the date range
    this._setDatesToShow();
    this.render(true);
    this.popover.update();
  }


  /**
   * Scroll the active input element into view.
   */
  _scrollToInput() {
    let el = this.els[this.activeIndex];
    if (el) scrollWindowTo(el);
  }


  /**
   * Update the hover classes.
   * @param {Element} hoverStarts
   * @param {Element} hoverEnds
   */
  _updateHoverClasses(hoverStarts, hoverEnds) {

    this._hoverStarts = this._hoverStarts || [];
    this._hoverEnds = this._hoverEnds || [];

    hoverStarts = hoverStarts instanceof Array ? hoverStarts : (hoverStarts ? [hoverStarts] : []);
    hoverEnds = hoverEnds instanceof Array ? hoverEnds : (hoverEnds ? [hoverEnds] : []);

    let allStarts = [];
    let curStarts = [];
    let newStarts = [];
    let allEnds = [];
    let curEnds = [];
    let newEnds = [];

    hoverStarts.forEach(function(el) {

      let index = this._hoverStarts.indexOf(el);

      // Already hovered.
      if (index !== -1) {
        curStarts.push(el);
      }
      // Not already hovered. Ready to add the class.
      else if (el) {
        newStarts.push(el);
        addClass(el, 'hover-start');
      }
    }, this);

    allStarts = Array.prototype.concat.call([], curStarts, newStarts);

    this._hoverStarts.forEach(function(el) {
      if (allStarts.indexOf(el) === -1) {
        removeClass(el, 'hover-start');
      }
    }, this);


    hoverEnds.forEach(function(el) {

      let index = this._hoverEnds.indexOf(el);

      // Already hovered.
      if (index !== -1) {
        curEnds.push(el);
      }
      // Not already hovered. Ready to add the class.
      else if (el) {
        newEnds.push(el);
        addClass(el, 'hover-end');
      }
    }, this);

    allEnds = Array.prototype.concat.call([], curEnds, newEnds);

    this._hoverEnds.forEach(function(el) {
      if (allEnds.indexOf(el) === -1) {
        removeClass(el, 'hover-end');
      }
    }, this);

    this._hoverStarts = allStarts;
    this._hoverEnds = allEnds;
  }


  /**
   * When an element is clicked, if the toggle was the target, open the popover.
   * @param {Object} e
   */
  _onClick(e) {

    if (getParent(e.target, '.spark-date__calendar-toggle', this.els)) {

      let el = getParent(e.target, '.spark-date', this.els);
      let index = this.els.indexOf(el);

      e.preventDefault();

      // Open on the next tick. Otherwise we also receive the window click close event.
      this.open(index, {
        delay: 1
      });
    }
  }


  /**
   * When the calendar is hovered, do some highlighting if we're showing a range.
   * @param {Object} e
   */
  _onCalendarMouseOver(e) {
    if (this.viewRange === 'month')
      this._onCalendarMouseOverMonths(e.target);
  }


  /**
   * Set hover states for days.
   * @param  {Element} target
   */
  _onCalendarMouseOverMonths(target) {

    if (!this._isRange) {
      return;
    }

    let day = getParent(target, '.spark-calendar__day');

    if (!day) {
      this._updateHoverClasses();
      return;
    }

    let month = getParent(target, '.spark-calendar__month');
    let mHasClass = function(c) {
      return hasClass(month, c);
    }.bind(this);
    let newStart = [];
    let newEnd = [];
    let daySel;

    // Only do highlights if we don't already have a value for this index.
    if (!this.values[this.activeIndex]) {

      // A month with a value before it but no value of its own, hover starts
      // from the first day to the hovered day.
      if (mHasClass('value-before') && !mHasClass('after-range-end') && !mHasClass('has-value') && !mHasClass('value-after')) {

        newStart.push(month.querySelector('.spark-calendar__day:not(.spark-calendar__day--inactive):not(.spark-calendar__day--disabled)'));
        newEnd.push(day);

        // Add a hover range to a previous month.
        let prevMonth = month;
        while ((prevMonth = getSiblingBefore(prevMonth, '.spark-calendar__month')) && !hasClass(prevMonth, 'value-after') && (hasClass(prevMonth, 'has-value') || hasClass(prevMonth, 'value-before'))) {

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
      else if (mHasClass('has-value') && !mHasClass('value-before') && !mHasClass('value-after') && ((newStart = getSiblingBefore(day, '.spark-calendar__day--selected')) || (newEnd = getSiblingAfter(day, '.spark-calendar__day--selected')))) {

        if (newStart) {
          newStart = [newStart];
          newEnd = [day];
        } else {
          newEnd = [newEnd];
          newStart = [day];
        }

        if (hasClass(newEnd[0], 'spark-calendar__range-start') || hasClass(newStart[0], 'spark-calendar__range-end')) {
          newStart = [];
          newEnd = [];
        }
      }
      // A month with a middle range should highlight before
      else if (mHasClass('has-value') && mHasClass('range-middle') && mHasClass('value-before')) {
        daySel = getSiblingBefore(day, '.spark-calendar__day--selected');
        if (daySel) {
          newStart = [daySel];
          newEnd = [day];
        }
      }
    }

    this._updateHoverClasses(newStart, newEnd);
  }


  /**
   * When the calendar is hovered, undo some highlighting if we're showing a range.
   * @param {Object} e
   */
  _onCalendarMouseOut(e) {
    if (this.viewRange === 'month')
      this._onCalendarMouseOutMonths(e.target);
  }


  /**
   * Clear hover states for days.
   * @param  {Element} target
   */
  _onCalendarMouseOutMonths(target) {

    let day = getParent(target, '.spark-calendar__day');
    let days = getParent(target, '.spark-calendar__days');
    let month = getParent(target, '.spark-calendar__month');

    removeClass(day, 'hover');
    removeClass(days, 'hover');
    removeClass(month, 'hover');
    removeClass(this.calendarEl, 'hover');
  }


  /**
   * When the calendar is clicked, handle navigation clicks and date selections.
   * @param {Object} e
   */
  _onCalendarClick(e) {

    let nav = getParent(e.target, '.spark-calendar__nav', this.calendarEl);
    let day;
    let dir;

    // Navigation clicks
    if (nav) {

      // Previous
      if (getParent(e.target, '.spark-calendar__previous', nav)) {
        this.previous();
      }
      // Next
      else if (getParent(e.target, '.spark-calendar__next', nav)) {
        this.next();
      }
    }
    // Day click
    else if ((day = getParent(e.target, '.spark-calendar__day'))) {

      e.preventDefault();
      e.stopPropagation();

      // Disabled day moves can move us to the next month
      if (hasClass(day, 'spark-calendar__day--disabled')) {
        dir = day.getAttribute('data-direction');
        if (dir === 'next') this.next();
        else if (dir === 'previous') this.previous();
      }
      // Enabled day sets the value
      else {
        this.setValue(day.getAttribute('data-date'), this.activeIndex);
        if (this.autoAdvance) this._focusNext();
        if (this.autoClose) this._closeOnLast();
      }
    }
  }


  /**
   * When the popover opens, set the toggle state.
   */
  _onPopoverOpen() {
    this._fillToggle();
    this._checkSize();
    if (this._currentBreakpoint === 'xs') this._scrollToInput();
  }


  /**
   * When the popover closes, reset the active state.
   */
  _onPopoverClose() {
    this._unfillToggle();
    this._updateHoverClasses();
    this._deactivateElement(this.activeIndex);
    this.activeIndex = null;
  }


  /**
   * When the input that corresponds to this instance changes. Allows us to listen
   * and respond to changes made by other components (Calendar Popover, for example).
   * @param {Object} e
   */
  _onInputChange(e) {

    let index = this.inputEls.indexOf(e.target);

    if (this._inputsChanging && this._inputsChanging.indexOf(index) !== -1)
      return;

    this.setValue(e.target.value, index);
  }


  /**
   * When an input receives focus, if we are supposed to automatically show
   * on focus do so.
   * @param {Object} e
   */
  _onInputFocus(e) {
    if (!this.showOnFocus) return;
    let index = this.inputEls.indexOf(e.target);
    if (index !== -1) this.open(index);
  }


  /**
   * When one of the calendar quick jump select inputs changes.
   * We have to set the value of the select input back to its original
   * value or else it will be out of sync when the currently active
   * month is shown again.
   * @param {Object} e
   */
  _onSelectChange(e) {

    let name = e.target.name;
    let val = e.target.value;
    let curVal = this._datesToShow[this.activeIndex][name];
    let obj = {};

    obj[name] = val;
    this.showDate(obj);
    e.target.value = curVal;
  }


  /**
   * When the window resizes, determine if we're at the XS breakpoint so we
   * can do some mobile-esque stuff!
   * @param {Object} e
   */
  _onResize() {
    if (this.activeIndex !== null) this._checkSize();
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
CalendarPopover.prototype._whitelistedParams = [
  'els', 'visibleCounts', 'autoAdvance', 'autoClose',
  'closeDelay', 'mins', 'maxes', 'values', 'daysDisabled', 'daysInfo',
  'quickJump', 'quickJumpRange', 'calendarEl', 'viewRange', 'animate', 'animationDuration',
  'showOnFocus', 'onChange'
];


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

export default CalendarPopover;
