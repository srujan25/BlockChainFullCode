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
//# sourceMappingURL=copy-attributes.js.map
