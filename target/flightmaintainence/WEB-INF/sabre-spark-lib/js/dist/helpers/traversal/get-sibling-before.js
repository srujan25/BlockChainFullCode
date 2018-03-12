'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSiblingBefore(el, query) {

  while (el = el.previousElementSibling) {
    if ((0, _matches2.default)(el, query)) {
      return el;
    }
  }

  return null;
} /**
   * # Get Sibling Before
   * Get a nearest sibling before the given element which matches
   * the given query selector.
   *
   * @param {Element} el
   * @param {String} query
   * @return {Element|Null}
   *
   * @module helpers/traversal/get-sibling-before.js
   */

exports.default = getSiblingBefore;
module.exports = exports['default'];
//# sourceMappingURL=get-sibling-before.js.map
