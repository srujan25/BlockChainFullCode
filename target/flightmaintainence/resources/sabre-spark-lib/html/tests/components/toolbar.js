/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');
const removeClass = require('../tools/remove-class');

function processToolbarScreenshots(bp, name) {
  if (typeof name === 'undefined' || name === undefined) name = 'default';

  // Initial state
  screenshot('body', 'toolbar/' + name, bp);

  // Link hover states starting at md breakpoint for visible items
  casper.then(function(){
    if ((bp === 'md') || (bp === 'lg') || (bp === 'xl')) {
      var items = casper.exists('.spark-toolbar__container--visible .spark-toolbar__item') ? casper.getElementsInfo('.spark-toolbar__container--visible .spark-toolbar__item').length : 0;

      if (items > 0) {
        for (var count = 1; count <= items; count++) {
          processToolbarHoverStates(bp, name, count);
        }
      }
    }
  });

  // Active state for links
  casper.then(function(){
    if ((bp === 'md') || (bp === 'lg') || (bp === 'xl')) {
      var items = casper.exists('.spark-toolbar__container--visible .spark-toolbar__item') ? casper.getElementsInfo('.spark-toolbar__container--visible .spark-toolbar__item').length : 0;

      if (items > 0) {
        for (var count = 1; count <= items; count++) {
          processToolbarActiveStates(bp, name, count);
        }
      }
    }
  });
}

function processKebabMenu(bp, name) {
  if (typeof name === "undefined" || name === undefined) name = 'default';

  // Kebab Menu hover state
  screenshot(function(){
    casper.mouse.move('.spark-toolbar__show-more');
  }, 'body', 'toolbar/' + name + '__kebab-menu-default--hover', bp);

  // Show hidden items
  screenshot(function(){
    casper.mouse.click('.spark-toolbar__show-more');
  }, 'body', 'toolbar/' + name + '__kebab-menu-default--active', bp);

  // Hidden items hover states
  casper.then(function(){
    var hiddenItems = casper.exists('.spark-toolbar__container--hidden .spark-toolbar__item') ? casper.getElementsInfo('.spark-toolbar__container--hidden .spark-toolbar__item').length : 0;

    if (hiddenItems > 0) {
      for (var count = 1; count <= hiddenItems; count++) {
        processToolbarHoverStates(bp, name, count, 'hidden');
      }
    }
  });

  // Hidden items active states
  casper.then(function(){
    var hiddenItems = casper.exists('.spark-toolbar__container--hidden .spark-toolbar__item') ? casper.getElementsInfo('.spark-toolbar__container--hidden .spark-toolbar__item').length : 0;

    if (hiddenItems > 0) {
      for (var count = 1; count <= hiddenItems; count++) {
        processToolbarActiveStates(bp, name, count, 'hidden');
      }
    }
  });
}

function processToolbarHoverStates(bp, name, nthChild, hiddenFlag) {
  if (typeof hiddenFlag === 'undefined' || hiddenFlag === undefined) hiddenFlag = 'visible';

  screenshot(function(){
    casper.mouse.move('.spark-toolbar__container--' + hiddenFlag + ' .spark-toolbar__item:nth-child('+ nthChild +')');
  }, 'body', 'toolbar/' + name + '__' + hiddenFlag + '-toolbar-item-' + nthChild + '--hover', bp);

  casper.then(function(){
    casper.mouse.move('body', 10, 10);
  });
}

function processToolbarActiveStates(bp, name, nthChild, hiddenFlag) {
  if (typeof hiddenFlag === 'undefined' || hiddenFlag === undefined) hiddenFlag = 'visible';

  // For visible menu
  if (hiddenFlag == 'visible') {
    screenshot(function(){
      casper.mouse.down('.spark-toolbar__container--' + hiddenFlag + ' .spark-toolbar__item:nth-child('+ nthChild +')');
    }, 'body', 'toolbar/' + name + '__' + hiddenFlag + '-toolbar-item-' + nthChild + '--active', bp);

    // Disengage active state
    casper.then(function(){
      casper.mouse.up('.spark-toolbar__container--' + hiddenFlag + ' .spark-toolbar__item:nth-child('+ nthChild +')');
    });

    // Popover activated on first item, so take screenshot and disengage
    casper.then(function(){
      if (nthChild === 1) {
        screenshot('body', 'toolbar/' + name + '__' + hiddenFlag + '-toolbar-item-1--open', bp);
      }

      // Disengage toolbar popover
      casper.then(function(){
        casper.mouse.click('.spark-toolbar__container--' + hiddenFlag + ' .spark-toolbar__item:nth-child('+ nthChild +')');
      });
    });
  }

  // For hidden items, no active state
  if ((hiddenFlag == 'hidden') && (nthChild == 1) && ((bp == 'xs') || (bp == 'sm'))) {
    screenshot(function(){
      casper.mouse.down('.spark-toolbar__container--' + hiddenFlag + ' .spark-toolbar__item:nth-child('+ nthChild +')');
    }, 'body', 'toolbar/' + name + '__' + hiddenFlag + '-toolbar-item-' + nthChild + '--active', bp);

    // Disengage active state
    casper.then(function(){
      casper.mouse.up('.spark-toolbar__container--' + hiddenFlag + ' .spark-toolbar__item:nth-child('+ nthChild +')');
      screenshot('body', 'toolbar/' + name + '__' + hiddenFlag + '-toolbar-item-1--open', bp);
    });
  }

  casper.then(function(){
    casper.mouse.move('body', 10, 10);
  });
}


// Default Toolbar
loadExample('toolbar.html', function() {
  var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processToolbarScreenshots(breakpoints[i]);
    }
  });

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processKebabMenu(breakpoints[i]);
    }
  });
});

loadExample('toolbar--panel.html', function() {
  var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processToolbarScreenshots(breakpoints[i], 'panel');
    }
  });

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processKebabMenu(breakpoints[i], 'panel');
    }
  });
});

loadExample('toolbar--small.html', function() {
  var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processToolbarScreenshots(breakpoints[i], 'small');
    }
  });

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processKebabMenu(breakpoints[i], 'small');
    }
  });
});

loadExample('toolbar--small--icons.html', function() {
  var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processToolbarScreenshots(breakpoints[i], 'small--icons');
    }
  });

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processKebabMenu(breakpoints[i], 'small--icons');
    }
  });
});

loadExample('toolbar--icons.html', function() {
  var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processToolbarScreenshots(breakpoints[i], 'icons');
    }
  });

  casper.then(function(){
    for (var i = 0, len = breakpoints.length; i < len; i++) {
      processKebabMenu(breakpoints[i], 'icons');
    }
  });
});
