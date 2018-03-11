'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChild(el, query) {

  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if ((0, _matches2.default)(el.children[i], query)) {
      return el.children[i];
    }
  }

  return null;
} /**
   * # Get Child
   * Get a child that matches the selector.
   *
   * @param {Element} el
   * @param {String} query
   * @return {Element|Null}
   *
   * @module helpers/traversal/get-child.js
   */

exports.default = getChild;
module.exports = exports['default'];
//# sourceMappingURL=get-child.js.map
