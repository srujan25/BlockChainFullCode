/**
 * # Breakpoint Helpers
 * Find the active breakpoint.
 *
 * @param {Number} width
 *
 * @module helpers/dom/breakpoint.js
 */

/**
 * Breakpoints being used in the CSS.
 * @type {Object}
 */
const defaultBreakpoints = {
  xs: {
    min: 0,
    max: 543
  },
  sm: {
    min: 544,
    max: 795
  },
  md: {
    min: 796,
    max: 1047
  },
  lg: {
    min: 1048,
    max: 1799
  },
  xl: {
    min: 1800,
    max: Infinity
  }
};

function get(width, breakpoints) {

  breakpoints = breakpoints || defaultBreakpoints;

  let i;

  for (i in breakpoints) {
    if (width >= breakpoints[i].min && width <= breakpoints[i].max) {
      return i;
    }
  }
}

export {
  get
};
