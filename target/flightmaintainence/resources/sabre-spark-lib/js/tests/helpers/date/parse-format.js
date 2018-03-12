var test = require('tape');
var parseDateFormat = require('../../../src/helpers/date/parse-format');

test('should parse a variety of date formats', function(t) {

  var format1 = parseDateFormat('MM-DD-YYYY');
  t.equal(format1.parts[0].name, 'month', 'first part is a month');
  t.equal(format1.parts[0].length, 2, 'first part is two digits');
  t.equal(format1.parts[1].name, 'divider', 'second part is a divider');
  t.equal(format1.parts[1].value, '-', 'second part is a "-"');
  t.equal(format1.parts[4].length, 4, 'fifth part has a length of 4 (year)');

  var format2 = parseDateFormat('YYYY/MM/DD');
  t.equal(format2.parts[0].name, 'year', 'first part is a year');
  t.equal(format2.parts[0].length, 4, 'first part is four digits');
  t.equal(format2.parts[1].name, 'divider', 'second part is a divider');
  t.equal(format2.parts[1].value, '/', 'second part is a "/"');

  var format3 = parseDateFormat('The DD of MM');
  t.equal(format3.parts[0].value, 'T', 'allows for regular strings');
  t.equal(format3.parts[4].name, 'day', 'parses special characters within regular strings');

  t.end();
});

test('should return an object of day, month and year', function(t) {

  var values = parseDateFormat('YYYY-MM-DD').getValues('2015-12-09');

  t.equal(values.year, 2015, 'year is correct');
  t.equal(values.month, 12, 'month is correct');
  t.equal(values.day, 9, 'day is correct');

  var values2 = parseDateFormat('MM-DD-YYYY').getValues('12-09-2015');

  t.equal(values2.year, 2015, 'year is correct');
  t.equal(values2.month, 12, 'month is correct');
  t.equal(values2.day, 9, 'day is correct');

  t.ok(values._date, 'is an instance of the date helper');

  t.end();
});

test('should take an object of date components and return a formatted string', function(t) {

  var format = parseDateFormat('YYYY-MM-DD');

  t.equal('2015-02-25', format.getString({
    year: 2015,
    month: 2,
    day: 25
  }), 'formats the string properly');

  t.end();
});
