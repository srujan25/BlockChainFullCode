'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('../util/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = ['marginTop', 'marginBottom', 'borderTop', 'borderBottom']; /**
                                                                         * # Outer Width
                                                                         * Get the outer width of an element (including margin and border)
                                                                         *
                                                                         * @param {Element} el
                                                                         * @param {Object} styles Optional Already have computed styles? Pass them in.
                                                                         *
                                                                         * @example
                                                                         * outerWidth(el, computedStyles);
                                                                         *
                                                                         * @module helpers/outer-width.js
                                                                         */


function outerWidth(el, styles) {

  styles = styles || window.getComputedStyle(el);

  var width = el.clientWidth;

  (0, _each2.default)(props, function (prop) {
    width += parseInt(styles[prop] || 0, 10);
  });

  return width;
}

exports.default = outerWidth;
module.exports = exports['default'];
//# sourceMappingURL=outer-width.js.map
