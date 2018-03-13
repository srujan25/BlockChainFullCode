'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _offset = require('../dom/offset');

var _offset2 = _interopRequireDefault(_offset);

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Scroll To
 * Scroll the window to a specific element or position.
 * @param {Object} params
 *
 * @module helpers/animation/scroll-to.js
 */

function scrollTo(params) {

  params = params || {};

  var offset = void 0;
  var x = void 0;
  var y = void 0;
  var target = params.target || window;
  var startX = target !== window ? target.scrollLeft : target.pageXOffset;
  var startY = target !== window ? target.scrollTop : target.pageYOffset;

  if (params instanceof HTMLElement) {
    offset = (0, _offset2.default)(params);
    x = offset.left;
    y = offset.top;
    params = arguments[1] || {};
  } else {
    x = params.x || 0;
    y = params.y || 0;
  }

  (0, _tween2.default)({
    target: target,
    prop: 'scrollTo',
    start: [startX, startY],
    end: [x, y],
    duration: params.duration,
    callback: params.callback
  });
}

exports.default = scrollTo;
module.exports = exports['default'];
//# sourceMappingURL=scroll-to.js.map
