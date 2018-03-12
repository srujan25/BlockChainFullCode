var test = require('tape');
var round = require('../../../src/helpers/util/round');

test('should round a number to a given number of decimal places', function(t) {
  t.equal(round(34.2342124, 0), 34, 'rounds to zero places');
  t.equal(round(34.2352124, 2), 34.24, 'rounds to two places');
  t.equal(round(34.2352124, 10), 34.2352124000, 'rounds to ten places');
  t.end();
});
