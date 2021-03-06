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
//# sourceMappingURL=parse-format.js.map
