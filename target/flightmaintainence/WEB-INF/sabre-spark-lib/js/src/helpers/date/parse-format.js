/**
 * # Parse Date Format
 * Given a date format string, break it down into pieces.
 *
 * @example
 * parseDateFormat('MM-DD-YYYY');
 *
 * @module helpers/date/parse-format.js
 */

import padNumber from '../util/pad';
import dateHelper from './date';

/**
 * Map characters to their special meanings.
 * @type {Object}
 */
const map = {
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

  return function(value) {

    let i = 0;
    let index = 0;
    let len = format.length;
    let values = {};

    // Loop through all format pieces
    for (; i < len; i++) {

      // Only worry about date values
      if (['day', 'month', 'year'].indexOf(format[i].name) !== -1) {

        // If the passed value doesn't contain a format piece, it's invalid.
        if (value.length < index + format[i].length)
          return;

        values[format[i].name] = parseInt(value.substr(index, format[i].length), 10);
      }
      index += format[i].length;
    }

    return dateHelper.create(values);
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
  return function(vals) {

    let i = 0;
    let len = format.length;
    let str = '';

    for (; i < len; i++) {

      // Numbers
      if (vals[format[i].name]) {
        str += padNumber(vals[format[i].name], format[i].length);
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

  let f = format.toLowerCase();
  let i = 0;
  let len = f.length;

  let obj = {
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

export default parseDateFormat;
