'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getParent = require('./get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParents(parent, query, limitEl) {

  var list = [];

  while (parent = (0, _getParent2.default)(parent.parentNode, query, limitEl)) {
    list.push(parent);
  }

  return list;
} /**
   * # Get Parents
   * See if an element has parents which match a query.
   *
   * @param {Element} parent
   * @param {String} query
   * @param {Element} limitEl The last element we should check.
   * @return {Boolean|Array}
   *
   * @module helpers/traversal/get-parents.js
   */

exports.default = getParents;
module.exports = exports['default'];
//# sourceMappingURL=get-parents.js.map
