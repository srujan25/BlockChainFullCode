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
//# sourceMappingURL=date.js.map
