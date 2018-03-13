'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertBefore(el, beforeEl, children) {
  (0, _each2.default)(children, function (c) {
    el.insertBefore(c, beforeEl);
  });
} /**
   * # Insert Before
   * Insert an array of elements before a node.
   *
   * @param {Element} el
   * @param {Element} beforeEl
   * @param {Array} children
   *
   * @module helpers/manipulation/insert-before.js
   */

exports.default = insertBefore;
module.exports = exports['default'];
//# sourceMappingURL=insert-before.js.map
