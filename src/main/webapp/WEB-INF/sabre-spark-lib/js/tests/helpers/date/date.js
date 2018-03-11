var test = require('tape');
var dateHelper = require('../../../src/helpers/date/date');

test('should create an instance of special date object', function(t) {

  var date = new Date();
  var inst = dateHelper.create(date);

  t.equal(inst._date, date, 'stores an internal date copy');

  t.end();
});

test('should get and set the year', function(t) {

  var inst = dateHelper.create(new Date(2000, 1, 1));

  t.equal(inst.year, 2000, 'sets an appropriate year when created');

  inst.year = 1998;
  t.equal(inst.year, 1998, 'sets a year');

  t.end();
});

test('should get and set the month', function(t) {

  var inst = dateHelper.create(new Date(2011, 1, 1));

  t.equal(inst.month, 2, 'sets an appropriate month when created');

  inst.month = 12;
  t.equal(inst.month, 12, 'sets a month');

  inst.month = 13;
  t.equal(inst.month, 1, 'sets an out-of-bounds month');
  t.equal(inst.year, 2012, 'sets an out-of-bounds month');

  t.end();
});

test('should get and set the day', function(t) {

  var inst = dateHelper.create(new Date(2011, 4, 1));

  t.equal(inst.day, 1, 'sets an appropriate day when created');

  inst.day = 25;
  t.equal(inst.day, 25, 'sets a day');

  inst.day = 32;
  t.equal(inst.day, 1, 'sets an out-of-bounds day');
  t.equal(inst.month, 6, 'sets an out-of-bounds day');

  t.end();
});

test('should set the date', function(t) {

  var inst = dateHelper.create(new Date(2011, 4, 1));
  inst.set({
    year: 2013,
    month: 5,
    day: 3
  });

  t.ok(inst.year === 2013 && inst.month === 5 && inst.day === 3, 'sets the date');

  t.end();
});

test('should get a month name', function(t) {

  t.equal(dateHelper.getMonthName(1), 'January', 'gets the month name as a static method');
  t.equal(dateHelper.getMonthName(12), 'December', 'gets the month name as a static method');
  t.equal(dateHelper.getMonthName(13), undefined, 'gets the month name as a static method');

  var inst = dateHelper.create(new Date(2011, 0, 1));
  t.equal(inst.monthName, 'January', 'gets the month name on an instance');
  inst.month = 12;
  t.equal(inst.monthName, 'December', 'gets the month name on an instance');

  t.end();
});

test('should get a short month name', function(t) {

  t.equal(dateHelper.getMonthNameShort(1), 'Jan', 'gets the short month name as a static method');
  t.equal(dateHelper.getMonthNameShort(12), 'Dec', 'gets the short month name as a static method');
  t.equal(dateHelper.getMonthNameShort(13), undefined, 'gets the short month name as a static method');

  var inst = dateHelper.create(new Date(2011, 0, 1));
  t.equal(inst.monthNameShort, 'Jan', 'gets the short month name on an instance');
  inst.month = 12;
  t.equal(inst.monthNameShort, 'Dec', 'gets the short month name on an instance');

  t.end();
});

test('should get a list of month names', function(t) {
  t.equal(dateHelper.getMonthNames()[0], 'January', 'gets the month name');
  t.equal(dateHelper.getMonthNames()[11], 'December', 'gets the month name');
  t.equal(dateHelper.getMonthNames()[12], undefined, 'gets the month name');
  t.end();
});

test('should get a list of short month names', function(t) {
  t.equal(dateHelper.getMonthNamesShort()[0], 'Jan', 'gets the month name');
  t.equal(dateHelper.getMonthNamesShort()[11], 'Dec', 'gets the month name');
  t.equal(dateHelper.getMonthNamesShort()[12], undefined, 'gets the month name');
  t.end();
});

test('should set the list of month names', function(t) {

  var orig = dateHelper.getMonthNames();

  dateHelper.setMonthNames(['a', 'b']);
  t.notEqual(dateHelper.getMonthName(1), 'a', 'does not set the month names when given less than 12 months');

  dateHelper.setMonthNames(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']);
  t.equal(dateHelper.getMonthName(1), 'a', 'sets the month names when given 12 months');

  dateHelper.setMonthNames(orig);

  t.end();
});

test('should set the list of short month names', function(t) {

  var orig = dateHelper.getMonthNamesShort();

  dateHelper.setMonthNamesShort(['a', 'b']);
  t.notEqual(dateHelper.getMonthNameShort(1), 'a', 'does not set the month names when given less than 12 months');

  dateHelper.setMonthNamesShort(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']);
  t.equal(dateHelper.getMonthNameShort(1), 'a', 'sets the month names when given 12 months');

  dateHelper.setMonthNamesShort(orig);

  t.end();
});

test('should get the day of the week', function(t) {

  var obj = {
    year: 2014,
    month: 10,
    day: 1
  };

  var day = dateHelper.getDayOfWeek(obj);
  t.equal(day, 4, 'gets the number for the day of the week as a static method');

  dateHelper.setWeekStartsOn(1);
  day = dateHelper.getDayOfWeek(obj);
  t.equal(day, 3, 'gets the number for the day of the week as a static method');

  dateHelper.setWeekStartsOn(2);
  day = dateHelper.getDayOfWeek(obj);
  t.equal(day, 2, 'gets the number for the day of the week as a static method');

  dateHelper.setWeekStartsOn(3);
  day = dateHelper.getDayOfWeek(obj);
  t.equal(day, 1, 'gets the number for the day of the week as a static method');

  dateHelper.setWeekStartsOn(4);
  day = dateHelper.getDayOfWeek(obj);
  t.equal(day, 7, 'gets the number for the day of the week as a static method');

  dateHelper.setWeekStartsOn(5);
  day = dateHelper.getDayOfWeek(obj);
  t.equal(day, 6, 'gets the number for the day of the week as a static method');

  dateHelper.setWeekStartsOn(6);
  day = dateHelper.getDayOfWeek(obj);
  t.equal(day, 5, 'gets the number for the day of the week as a static method');

  dateHelper.setWeekStartsOn(0);


  var inst = dateHelper.create(new Date(2014, 9, 1));

  dateHelper.setWeekStartsOn(1);
  t.equal(inst.dayOfWeek, 3, 'gets the number for the day of the week on an instance');

  dateHelper.setWeekStartsOn(2);
  t.equal(inst.dayOfWeek, 2, 'gets the number for the day of the week on an instance');

  dateHelper.setWeekStartsOn(3);
  t.equal(inst.dayOfWeek, 1, 'gets the number for the day of the week on an instance');

  dateHelper.setWeekStartsOn(4);
  t.equal(inst.dayOfWeek, 7, 'gets the number for the day of the week on an instance');

  dateHelper.setWeekStartsOn(5);
  t.equal(inst.dayOfWeek, 6, 'gets the number for the day of the week on an instance');

  dateHelper.setWeekStartsOn(6);
  t.equal(inst.dayOfWeek, 5, 'gets the number for the day of the week on an instance');

  dateHelper.setWeekStartsOn(0);

  t.end();
});

test('should get a day name', function(t) {

  t.equal(dateHelper.getDayName(1), 'Sunday', 'gets the day name as a static method');
  t.equal(dateHelper.getDayName(7), 'Saturday', 'gets the day name as a static method');
  t.equal(dateHelper.getDayName(8), undefined, 'gets the day name as a static method');

  dateHelper.setWeekStartsOn(1);

  t.equal(dateHelper.getDayName(1), 'Monday', 'gets the offset day name as a static method');
  t.equal(dateHelper.getDayName(7), 'Sunday', 'gets the offset day name as a static method');

  dateHelper.setWeekStartsOn(2);

  t.equal(dateHelper.getDayName(1), 'Tuesday', 'gets the offset day name as a static method');
  t.equal(dateHelper.getDayName(7), 'Monday', 'gets the offset day name as a static method');

  dateHelper.setWeekStartsOn(0);

  var inst = dateHelper.create(new Date(2016, 2, 14));
  t.equal(inst.dayName, 'Monday', 'gets the day name on an instance');

  inst.day = 19;
  t.equal(inst.dayName, 'Saturday', 'gets the day name on an instance');

  dateHelper.setWeekStartsOn(1);

  inst.day = 14;
  t.equal(inst.dayName, 'Monday', 'gets the day name on an instance regardless of the day the week starts on');

  dateHelper.setWeekStartsOn(0);

  t.end();
});

test('should get a short day name', function(t) {

  t.equal(dateHelper.getDayNameShort(1), 'Sun', 'gets the day name');
  t.equal(dateHelper.getDayNameShort(7), 'Sat', 'gets the day name');
  t.equal(dateHelper.getDayNameShort(8), undefined, 'gets the day name');

  var inst = dateHelper.create(new Date(2016, 2, 14));
  t.equal(inst.dayNameShort, 'Mon', 'gets the day name on an instance');

  t.end();
});

test('should get a list of day names', function(t) {

  t.equal(dateHelper.getDayNames()[0], 'Sunday', 'gets the day name');
  t.equal(dateHelper.getDayNames()[6], 'Saturday', 'gets the day name');
  t.equal(dateHelper.getDayNames()[7], undefined, 'gets the day name');

  dateHelper.setWeekStartsOn(1);

  t.equal(dateHelper.getDayNames()[0], 'Monday', 'gets the offset day name');
  t.equal(dateHelper.getDayNames()[6], 'Sunday', 'gets the offset day name');

  dateHelper.setWeekStartsOn(2);

  t.equal(dateHelper.getDayNames()[0], 'Tuesday', 'gets the offset day name');
  t.equal(dateHelper.getDayNames()[6], 'Monday', 'gets the offset day name');

  dateHelper.setWeekStartsOn(0);

  t.end();
});

test('should get a list of short day names', function(t) {

  t.equal(dateHelper.getDayNamesShort()[0], 'Sun', 'gets the day name');
  t.equal(dateHelper.getDayNamesShort()[6], 'Sat', 'gets the day name');
  t.equal(dateHelper.getDayNamesShort()[7], undefined, 'gets the day name');

  dateHelper.setWeekStartsOn(1);

  t.equal(dateHelper.getDayNamesShort()[0], 'Mon', 'gets the offset day name');
  t.equal(dateHelper.getDayNamesShort()[6], 'Sun', 'gets the offset day name');

  dateHelper.setWeekStartsOn(2);

  t.equal(dateHelper.getDayNamesShort()[0], 'Tues', 'gets the offset day name');
  t.equal(dateHelper.getDayNamesShort()[6], 'Mon', 'gets the offset day name');

  dateHelper.setWeekStartsOn(0);

  t.end();
});

test('should set the list of day names', function(t) {

  dateHelper.setDayNames(['a', 'b']);
  t.notEqual(dateHelper.getDayName(1), 'a', 'does not set the day names when given less than 7 days');

  dateHelper.setDayNames(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
  t.equal(dateHelper.getDayName(1), 'a', 'sets the day names when given 7 days');

  t.end();
});

test('should set the list of short day names', function(t) {

  dateHelper.setDayNamesShort(['a', 'b']);
  t.notEqual(dateHelper.getDayNameShort(1), 'a', 'does not set the day names when given less than 7 days');

  dateHelper.setDayNamesShort(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
  t.equal(dateHelper.getDayNameShort(1), 'a', 'sets the day names when given 7 days');

  t.end();
});

test('should get the index of the first day of the week', function(t) {
  t.equal(0, dateHelper.getWeekStartsOn(), 'week starts on Sunday');
  t.end();
});

test('should set the index of the first day of the week', function(t) {
  dateHelper.setWeekStartsOn(1);
  t.equal(1, dateHelper.getWeekStartsOn(), 'week starts on Monday');
  dateHelper.setWeekStartsOn(0);
  t.end();
});

test('should get the current date as an object', function(t) {

  var today = new Date();
  var obj = dateHelper.now();

  t.equal(obj.year, today.getFullYear(), 'gets the year');
  t.equal(obj.month, today.getMonth() + 1, 'gets the month');
  t.equal(obj.day, today.getDate(), 'gets the day');

  t.end();
});

test('should get the year following the given year', function(t) {

  var next = dateHelper.getNextYear({
    year: 2013,
    month: 10,
    day: 23
  });

  t.equal(next.year, 2014, 'gets the next year');

  var inst = dateHelper.create(new Date(2016, 2, 14));
  next = inst.nextYear;
  t.equal(next.year, 2017, 'gets the next year');

  inst.year = 2099;
  t.notEqual(next, inst.nextYear, 'clears the cache of a previous next year');
  t.equal(inst.nextYear.year, 2100, 'gets the new next year');

  t.end();
});

test('should get the first day of a given week', function(t) {

  var start = dateHelper.getWeekStart({
    year: 2016,
    month: 12,
    day: 23
  });

  t.equal(start.day, 18, 'finds the first day of the week');

  dateHelper.setWeekStartsOn(1);

  start = dateHelper.getWeekStart({
    year: 2016,
    month: 12,
    day: 23
  });

  dateHelper.setWeekStartsOn(0);

  t.equal(start.day, 19, 'finds the first day of the week');

  var inst = dateHelper.create(new Date(2016, 11, 23));
  start = inst.weekStart;
  t.equal(start.day, 18, 'gets the week start');

  dateHelper.setWeekStartsOn(1);

  t.notEqual(start, inst.weekStart, 'clears the cache of a previous week start');
  t.equal(inst.weekStart.day, 19, 'gets the new week start');

  dateHelper.setWeekStartsOn(0);

  t.end();
});

test('should get the first day of a given month', function(t) {

  var start = dateHelper.getMonthStart({
    year: 2016,
    month: 12,
    day: 23
  });

  t.equal(start.day, 1, 'finds the first day of the month');

  var inst = dateHelper.create(new Date(2016, 11, 23));
  start = inst.monthStart;
  t.equal(start.day, 1, 'gets the month start');

  t.end();
});

test('should get the week following the given week', function(t) {

  var next = dateHelper.getNextWeek({
    year: 2016,
    month: 12,
    day: 23
  });

  t.equal(next.day, 25, 'finds the first day of the next week');

  dateHelper.setWeekStartsOn(1);

  next = dateHelper.getNextWeek({
    year: 2016,
    month: 12,
    day: 19
  });

  t.equal(next.day, 26, 'finds the first day of the next week');

  dateHelper.setWeekStartsOn(0);

  var inst = dateHelper.create(new Date(2016, 11, 23));
  next = inst.nextWeek;
  t.equal(next.day, 25, 'gets the next week');

  inst.day = 19;
  t.notEqual(next, inst.nextWeek, 'clears the cache of a previous next week');
  t.equal(inst.nextWeek.day, 25, 'gets the new next week');

  t.end();
});

test('should get the day following the given day', function(t) {

  var next = dateHelper.getNextDay({
    year: 2013,
    month: 12,
    day: 31
  });

  t.equal(next.year, 2014, 'increments the year');
  t.equal(next.month, 1, 'increments the month');
  t.equal(next.day, 1, 'increments the day');

  var inst = dateHelper.create(new Date(2016, 11, 31));
  next = inst.nextDay;
  t.equal(next.day, 1, 'gets the next day');
  t.equal(next.month, 1, 'gets the next day');
  t.equal(next.year, 2017, 'gets the next day');

  t.end();
});

test('should get the month following the given month', function(t) {

  var next = dateHelper.getNextMonth({
    year: 2013,
    month: 12,
    day: 23
  });

  t.equal(next.year, 2014, 'increments the year');
  t.equal(next.month, 1, 'increments the month');

  var inst = dateHelper.create(new Date(2016, 11, 31));
  next = inst.nextMonth;
  t.equal(next.month, 1, 'gets the next month');
  t.equal(next.year, 2017, 'gets the next month');

  t.end();
});

test('should get the year before the given year', function(t) {

  var previous = dateHelper.getPreviousYear({
    year: 2013,
    month: 10,
    day: 23
  });

  t.equal(previous.year, 2012, 'decrements the year');

  var inst = dateHelper.create(new Date(2016, 2, 14));
  previous = inst.previousYear;
  t.equal(previous.year, 2015, 'gets the previous year');

  inst.year = 2099;
  t.notEqual(previous, inst.previousYear, 'clears the cache of a previous previous year');
  t.equal(inst.previousYear.year, 2098, 'gets the new previous year');

  t.end();
});

test('should get the week before the given week', function(t) {

  var previous = dateHelper.getPreviousWeek({
    year: 2016,
    month: 12,
    day: 23
  });

  t.equal(previous.day, 11, 'finds the first day of the previous week');

  dateHelper.setWeekStartsOn(1);

  previous = dateHelper.getPreviousWeek({
    year: 2016,
    month: 12,
    day: 19
  });

  t.equal(previous.day, 12, 'finds the first day of the previous week');

  dateHelper.setWeekStartsOn(0);

  var inst = dateHelper.create(new Date(2016, 11, 23));
  previous = inst.previousWeek;
  t.equal(previous.day, 11, 'gets the previous week');

  inst.day = 17;
  t.notEqual(previous, inst.previousWeek, 'clears the cache of a previous previous week');
  t.equal(inst.previousWeek.day, 4, 'gets the new previous week');

  t.end();
});

test('should get the day before the given day', function(t) {

  var previous = dateHelper.getPreviousDay({
    year: 2013,
    month: 1,
    day: 1
  });

  t.equal(previous.year, 2012, 'decrements the year');
  t.equal(previous.month, 12, 'decrements the month');
  t.equal(previous.day, 31, 'decrements the day');

  var inst = dateHelper.create(new Date(2013, 0, 1));
  previous = inst.previousDay;
  t.equal(previous.year, 2012, 'decrements the year on an instance');
  t.equal(previous.month, 12, 'decrements the month on an instance');
  t.equal(previous.day, 31, 'decrements the day on an instance');

  t.end();
});

test('should get the month before the given month', function(t) {

  var previous = dateHelper.getPreviousMonth({
    year: 2013,
    month: 1,
    day: 10
  });

  t.equal(previous.year, 2012, 'decrements the year');
  t.equal(previous.month, 12, 'decrements the month');

  var inst = dateHelper.create(new Date(2013, 0, 10));
  previous = inst.previousMonth;
  t.equal(previous.year, 2012, 'decrements the year');
  t.equal(previous.month, 12, 'decrements the month');

  t.end();
});

test('should get the last day of a month', function(t) {

  var end = dateHelper.getMonthEnd({
    year: 2015,
    month: 3,
    day: 1
  });

  t.equal(end.day, 31, 'gets the last day of a month');

  end = dateHelper.getMonthEnd({
    year: 2016,
    month: 2,
    day: 1
  });

  t.equal(end.day, 29, 'gets the last day of a month');

  var inst = dateHelper.create(new Date(2015, 2, 1));
  end = inst.monthEnd;
  t.equal(end.day, 31, 'gets the last day of a month');

  t.end();
});

test('should compare dates to see if they are the same', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 1));

  t.ok(dateHelper.equal(a, c), 'matches dates');
  t.ok(dateHelper.equal(a, [c, d]), 'matches a date to one in an array of dates');
  t.ok(dateHelper.equal(a, [c, e], true), 'matches a date to all in an array of dates');
  t.notOk(dateHelper.equal(a, d), 'matches dates');
  t.notOk(dateHelper.equal(d, e), 'matches dates');

  t.ok(a.equal(c), 'matches dates on an instance');
  t.notOk(a.equal(b), 'matches dates on an instance');

  t.end();
});

test('should compare days to see if they are the same', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 1));

  t.ok(dateHelper.equalDay(a, c), 'matches days');
  t.ok(dateHelper.equalDay(a, [c, d]), 'matches a day to one in an array of days');
  t.ok(dateHelper.equalDay(a, [c, e], true), 'matches a day to all in an array of days');
  t.notOk(dateHelper.equalDay(a, d), 'matches days');
  t.notOk(dateHelper.equalDay(d, e), 'matches days');

  t.ok(a.equalDay(c), 'matches days on an instance');
  t.notOk(a.equalDay(b), 'matches days on an instance');

  t.end();
});

test('should compare weeks to see if they are the same', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 2));

  t.ok(dateHelper.equalWeek(a, c), 'matches weeks');
  t.ok(dateHelper.equalWeek(a, [b, c]), 'matches a week to one in an array of weeks');
  t.ok(dateHelper.equalWeek(a, [c, e], true), 'matches a week to all in an array of weeks');
  t.notOk(dateHelper.equalWeek(a, b), 'matches weeks');
  t.notOk(dateHelper.equalWeek(d, e), 'matches weeks');

  t.ok(a.equalWeek(c), 'matches weeks on an instance');
  t.notOk(a.equalWeek(b), 'matches weeks on an instance');

  t.end();
});

test('should compare months to see if they are the same', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 2));

  t.ok(dateHelper.equalMonth(a, c), 'matches months');
  t.ok(dateHelper.equalMonth(a, [b, c]), 'matches a month to one in an array of months');
  t.ok(dateHelper.equalMonth(a, [c, e], true), 'matches a month to all in an array of months');
  t.notOk(dateHelper.equalMonth(a, b), 'matches months');
  t.notOk(dateHelper.equalMonth(d, e), 'matches months');

  t.ok(a.equalMonth(c), 'matches months on an instance');
  t.notOk(a.equalMonth(b), 'matches months on an instance');

  t.end();
});

test('should compare years to see if they are the same', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 2));

  t.ok(dateHelper.equalYear(a, c), 'matches years');
  t.ok(dateHelper.equalYear(a, [b, c]), 'matches a year to one in an array of years');
  t.ok(dateHelper.equalYear(a, [c, e], true), 'matches a year to all in an array of years');
  t.notOk(dateHelper.equalYear(a, b), 'matches years');
  t.notOk(dateHelper.equalYear(d, b), 'matches years');

  t.ok(a.equalYear(c), 'matches years on an instance');
  t.notOk(a.equalYear(b), 'matches years on an instance');

  t.end();
});

test('should compare dates to see if one is before the other', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 2));

  t.notOk(dateHelper.before(a, c), 'equal dates are not considered before');
  t.ok(dateHelper.before(a, [b, e]), 'compares before against an array of dates');
  t.ok(dateHelper.before(d, [a, e], true), 'compares before against an array of dates');
  t.ok(dateHelper.before(d, a), 'finds a date before another');

  t.ok(a.before(b), 'finds a date before another on an instance');
  t.notOk(a.before(d), 'finds a date before another on an instance');

  t.end();
});

test('should compare days to see if one is before the other', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 2));

  t.notOk(dateHelper.beforeDay(a, c), 'equal dates are not considered before');
  t.ok(dateHelper.beforeDay(d, [b, e]), 'compares before against an array of dates');
  t.ok(dateHelper.beforeDay(d, [a, e], true), 'compares before against an array of dates');
  t.ok(dateHelper.beforeDay(d, a), 'finds a date before another');

  t.ok(a.beforeDay(b), 'finds a date before another on an instance');
  t.notOk(a.beforeDay(d), 'finds a date before another on an instance');

  t.end();
});

test('should compare dates to see if one week is before the other', function(t) {

  var a = dateHelper.create(new Date(2016, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 8));
  var c = dateHelper.create(new Date(2016, 2, 5));
  var d = dateHelper.create(new Date(2016, 3, 10));

  t.ok(dateHelper.beforeWeek(a, b), 'a week is before another');
  t.notOk(dateHelper.beforeWeek(a, c), 'a week is not before another');
  t.ok(dateHelper.beforeWeek(a, [b, d]), 'a week is before a list of others');
  t.ok(dateHelper.beforeWeek(a, [b, c, d]), 'a week is before a list of others');
  t.notOk(dateHelper.beforeWeek(a, [b, c, d], true), 'a week is not before a list of others');

  t.ok(a.beforeWeek(b), 'a week is before another on an instance');
  t.notOk(a.beforeWeek(c), 'a week is not before another on an instance');

  t.end();
});

test('should compare dates to see if one month is before the other', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 3, 1));
  var c = dateHelper.create(new Date(2015, 4, 1));
  var d = dateHelper.create(new Date(2015, 2, 2));

  t.ok(dateHelper.beforeMonth(a, b), 'a month is before another');
  t.notOk(dateHelper.beforeMonth(a, d), 'a month is not before another');
  t.ok(dateHelper.beforeMonth(a, [b, c]), 'a month is before a list of others');
  t.ok(dateHelper.beforeMonth(a, [b, c, d]), 'a month is before a list of others');
  t.notOk(dateHelper.beforeMonth(a, [b, c, d], true), 'a month is not before a list of others');

  t.ok(a.beforeMonth(b), 'a month is before another on an instance');
  t.notOk(a.beforeMonth(d), 'a month is not before another on an instance');

  t.end();
});

test('should compare dates to see if one year is before the other', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 3, 1));
  var c = dateHelper.create(new Date(2017, 4, 1));
  var d = dateHelper.create(new Date(2015, 2, 2));

  t.ok(dateHelper.beforeYear(a, b), 'a year is before another');
  t.notOk(dateHelper.beforeYear(a, d), 'a year is not before another');
  t.ok(dateHelper.beforeYear(a, [b, c]), 'a year is before a list of others');
  t.ok(dateHelper.beforeYear(a, [b, c, d]), 'a year is before a list of others');
  t.notOk(dateHelper.beforeYear(a, [b, c, d], true), 'a year is not before a list of others');

  t.ok(a.beforeYear(b), 'a year is before another on an instance');
  t.notOk(a.beforeYear(d), 'a year is not before another on an instance');

  t.end();
});

test('should compare dates to see if one is after the other', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 2));

  t.ok(dateHelper.after(b, a), 'finds a date after another');
  t.notOk(dateHelper.after(a, c), 'equal dates are not considered after');
  t.ok(dateHelper.after(a, [d, e]), 'compares after against an array of dates');
  t.notOk(dateHelper.after(a, [d, e], true), 'compares after against an array of dates');
  t.notOk(dateHelper.after(d, a), 'finds a date after another');

  t.notOk(a.after(b), 'finds a date after another on an instance');
  t.ok(a.after(d), 'finds a date after another on an instance');

  t.end();
});

test('should compare days to see if one is after the other', function(t) {

  var a = dateHelper.create(new Date(2015, 2, 1));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2015, 2, 1));
  var d = dateHelper.create(new Date(2015, 1, 1));
  var e = dateHelper.create(new Date(2015, 2, 2));

  t.ok(dateHelper.afterDay(b, a), 'finds a date after another');
  t.notOk(dateHelper.afterDay(a, c), 'equal dates are not considered after');
  t.ok(dateHelper.afterDay(a, [d, e]), 'compares after against an array of dates');
  t.notOk(dateHelper.afterDay(a, [d, e], true), 'compares after against an array of dates');
  t.notOk(dateHelper.afterDay(d, a), 'finds a date after another');

  t.notOk(a.afterDay(b), 'finds a date after another on an instance');
  t.ok(a.afterDay(d), 'finds a date after another on an instance');

  t.end();
});

test('should compare dates to see if one week is after the other', function(t) {

  var a = dateHelper.create(new Date(2016, 2, 8));
  var b = dateHelper.create(new Date(2016, 2, 1));
  var c = dateHelper.create(new Date(2016, 2, 12));
  var d = dateHelper.create(new Date(2016, 1, 10));

  t.ok(dateHelper.afterWeek(a, b), 'a week is after another');
  t.notOk(dateHelper.afterWeek(a, c), 'a week is not after another');
  t.ok(dateHelper.afterWeek(a, [b, d]), 'a week is after a list of others');
  t.ok(dateHelper.afterWeek(a, [b, c, d]), 'a week is after a list of others');
  t.notOk(dateHelper.afterWeek(a, [b, c, d], true), 'a week is not after a full list of others');

  t.ok(a.afterWeek(b), 'a week is after another on an instance');
  t.notOk(a.afterWeek(c), 'a week is not after another on an instance');

  t.end();
});

test('should compare dates to see if one month is after the other', function(t) {

  var a = dateHelper.create(new Date(2016, 2, 1));
  var b = dateHelper.create(new Date(2016, 1, 1));
  var c = dateHelper.create(new Date(2015, 4, 1));
  var d = dateHelper.create(new Date(2016, 2, 2));

  t.ok(dateHelper.afterMonth(a, b), 'a month is after another');
  t.notOk(dateHelper.afterMonth(a, d), 'a month is not after another');
  t.ok(dateHelper.afterMonth(a, [b, c]), 'a month is after a list of others');
  t.ok(dateHelper.afterMonth(a, [b, c, d]), 'a month is after a list of others');
  t.notOk(dateHelper.afterMonth(a, [b, c, d], true), 'a month is not after a full list of others');

  t.ok(a.afterMonth(b), 'a month is after another on an instance');
  t.notOk(a.afterMonth(d), 'a month is not after another on an instance');

  t.end();
});

test('should compare dates to see if one year is after the other', function(t) {

  var a = dateHelper.create(new Date(2017, 2, 1));
  var b = dateHelper.create(new Date(2016, 3, 1));
  var c = dateHelper.create(new Date(2015, 4, 1));
  var d = dateHelper.create(new Date(2017, 2, 2));

  t.ok(dateHelper.afterYear(a, b), 'a year is after another');
  t.notOk(dateHelper.afterYear(a, d), 'a year is not after another');
  t.ok(dateHelper.afterYear(a, [b, c]), 'a year is after a list of others');
  t.ok(dateHelper.afterYear(a, [b, c, d]), 'a year is after a list of others');
  t.notOk(dateHelper.afterYear(a, [b, c, d], true), 'a year is not after a full list of others');

  t.ok(a.afterYear(b), 'a year is after another on an instance');
  t.notOk(a.afterYear(d), 'a year is not after another on an instance');

  t.end();
});

test('should find the earliest date in an array of dates', function(t) {

  var a = dateHelper.create(new Date(2017, 2, 1));
  var b = dateHelper.create(new Date(2016, 3, 1));
  var c = dateHelper.create(new Date(2015, 4, 1));
  var d = dateHelper.create(new Date(2017, 2, 2));

  t.equal(dateHelper.earliest([a, b, c, d]), c, 'finds the earliest date in an array');
  t.notEqual(dateHelper.earliest([a, d]), d, 'finds the earliest date in an array');

  t.end();
});

test('should find the latest date in an array of dates', function(t) {

  var a = dateHelper.create(new Date(2017, 2, 1));
  var b = dateHelper.create(new Date(2016, 3, 1));
  var c = dateHelper.create(new Date(2015, 4, 1));
  var d = dateHelper.create(new Date(2017, 2, 2));

  t.notEqual(dateHelper.latest([a, b, c, d]), c, 'finds the latest date in an array');
  t.equal(dateHelper.latest([a, d]), d, 'finds the latest date in an array');

  t.end();
});

test('should clone a date', function(t) {

  var a = dateHelper.create(new Date(2017, 2, 1));
  var b = a.clone();
  var c = dateHelper.clone(b);

  t.equal(a.year, b.year, 'years of cloned are the same');
  t.equal(a.month, b.month, 'years of cloned are the same');
  t.equal(a.day, b.day, 'years of cloned are the same');
  t.notEqual(a._date, b._date, 'date instances are not the same');

  t.equal(c.year, b.year, 'years of cloned are the same');
  t.equal(c.month, b.month, 'years of cloned are the same');
  t.equal(c.day, b.day, 'years of cloned are the same');
  t.notEqual(c._date, b._date, 'date instances are not the same');

  t.end();
});
