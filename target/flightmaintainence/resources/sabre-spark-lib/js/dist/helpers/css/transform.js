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
//# sourceMappingURL=transform.js.map
