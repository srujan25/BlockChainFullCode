var test = require('tape');
var breakpoint = require('../../../src/helpers/dom/breakpoint');

test('get the name of a breakpoint for a given width', function(t) {

  t.equal(breakpoint.get(100), 'xs', 'extra small breakpoint matched');
  t.equal(breakpoint.get(641), 'sm', 'small breakpoint matched');
  t.equal(breakpoint.get(801), 'md', 'medium breakpoint matched');
  t.equal(breakpoint.get(1049), 'lg', 'large breakpoint matched');
  t.equal(breakpoint.get(1801), 'xl', 'extra large breakpoint matched');

  var breakpoints = {
    a: {
      min: 0,
      max: 1000
    },
    b: {
      min: 1001,
      max: 1523
    }
  };

  t.equal(breakpoint.get(12, breakpoints), 'a', 'custom breakpoint matched');
  t.equal(breakpoint.get(1200, breakpoints), 'b', 'custom breakpoint matched');
  t.notOk(breakpoint.get(5000, breakpoints), 'out of range breakpoint not found');

  t.end();
});
