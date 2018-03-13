/* global casper */
const phantom = require('../phantom');

const breakpoints = {
  xs: [320, 480],
  sm: [544, 768],
  md: [796, 1024],
  lg: [1048, 1024],
  xl: [1800, 1024]
};

const noop = function() {};

module.exports = function(fn, selector, outFile, bps) {

  // Allow the fn to be optional
  if (typeof fn === 'string') {
    bps = outFile;
    outFile = selector;
    selector = fn;
    fn = noop;
  }

  // Allow for a single breakpoint to be passed
  if (!(bps instanceof Array)) {
    bps = [bps];
  }

  var i = 0;
  var len = bps.length;
  var viewports = [];
  var bp;

  // Build a list of all the viewport sizes based on the given breakpoints
  for (; i < len; i++) {
    if (!breakpoints[bps[i]]) {
      throw new Error('No breakpoint with the name "' + bps[i] + '"!');
    }
    bp = breakpoints[bps[i]];
    viewports.push([bps[i], bp[0], bp[1]]);
  }

  // Render a screenshot at each breakpoint
  casper.then(function() {
    fn();
    casper.each(viewports, function(casper, viewport) {
      casper.then(function() {
        casper.viewport(viewport[1], viewport[2]);
      });
      // casper.then(function() {
      //   casper.wait(500);
      // });
      casper.then(function() {
        phantom.screenshot(selector, outFile + '--' + viewport[0]);
      });
    });
  });
};
