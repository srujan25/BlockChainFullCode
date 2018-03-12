'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildren(el, query) {

  var list = [];
  var i = 0;
  var len = el.children.length;

  for (; i < len; i++) {
    if ((0, _matches2.default)(el.children[i], query)) {
      list.push(el.children[i]);
    }
  }

  return list;
} /**
   * # Get Children
   * See if an element has children which match a query.
   *
   * @param {Element} el
   * @param {String} query
   * @return {List}
   *
   * @module helpers/traversal/get-children.js
   */

exports.default = getChildren;
module.exports = exports['default'];
//# sourceMappingURL=get-children.js.map
