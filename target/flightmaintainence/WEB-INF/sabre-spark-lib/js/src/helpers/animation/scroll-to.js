/**
 * # Scroll To
 * Scroll the window to a specific element or position.
 * @param {Object} params
 *
 * @module helpers/animation/scroll-to.js
 */

import getElementOffset from '../dom/offset';
import tween from './tween';

function scrollTo(params) {

  params = params || {};

  let offset;
  let x;
  let y;
  let target = params.target || window;
  let startX = target !== window ? target.scrollLeft : target.pageXOffset;
  let startY = target !== window ? target.scrollTop : target.pageYOffset;

  if (params instanceof HTMLElement) {
    offset = getElementOffset(params);
    x = offset.left;
    y = offset.top;
    params = arguments[1] || {};
  }
  else {
    x = params.x || 0;
    y = params.y || 0;
  }

  tween({
    target: target,
    prop: 'scrollTo',
    start: [startX, startY],
    end: [x, y],
    duration: params.duration,
    callback: params.callback
  });
}

export default scrollTo;
