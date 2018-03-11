/* global casper */
const before = require('./before-load');
const url = 'http://localhost:8585/html/examples/';

module.exports = function(name, cb) {
  casper.thenOpen(url + name, function() {
    before();
    cb();
    return casper;
  });
};
