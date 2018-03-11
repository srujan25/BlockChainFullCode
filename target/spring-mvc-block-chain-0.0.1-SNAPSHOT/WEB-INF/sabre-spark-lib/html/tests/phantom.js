/* global casper */

var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js');
var phantom = require(path);

phantom.init({
  rebase: casper.cli.get('rebase'),
  screenshotRoot: './html/tests/baseline',
  failedComparisonsRoot: './html/tests/failures',
  comparisonResultRoot: './html/tests/results'
});

module.exports = phantom;
