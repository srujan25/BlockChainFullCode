/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processStates(nthChild) {
  screenshot(function(){
    casper.mouse.move('.spark-popover:nth-child(' + nthChild + ')');
  }, 'body', 'popover/item-' + nthChild + '--hover', 'md');

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-popover:nth-child(' + nthChild + ')');
    }, 'body', 'popover/item-' + nthChild + '--active', 'md');
  });
}

loadExample('popovers.html', function() {
  screenshot('body', 'popover/default', 'md');

  casper.then(function(){
    var el = '.spark-popover-group .spark-popover';
    var items = casper.exists(el) ? casper.getElementsInfo(el).length : 0;

    if (items > 0) {
      for (var count = 1; count <= items; count++) {
        processStates(count);
      }
    }
  });

});
