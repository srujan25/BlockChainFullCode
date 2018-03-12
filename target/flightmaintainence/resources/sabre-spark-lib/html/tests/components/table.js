/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

function processHoverStates(el, name, bp, container) {
  screenshot(function(){
    casper.mouse.move(el);
  }, container, 'table/' + name, bp);
}

function processMouseClick(el, name, bp, container) {
  screenshot(function(){
    casper.mouse.click(el);
  }, container, 'table/' + name, bp);
}

loadExample('table.html', function() {
  // Default
  screenshot('.spark-table', 'table/default', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'default__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'default__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/default__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/default__uncheck', 'lg');
  });
});

loadExample('table--condensed.html', function() {
  // Default
  screenshot('.spark-table', 'table/condensed', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'condensed__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'condensed__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/condensed__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/condensed__uncheck', 'lg');
  });
});

loadExample('table--disabled-rows-columns-fields--spreadsheet.html', function() {
  // Default
  screenshot('.spark-table', 'table/disabled-rows-columns-fields-spreadsheet', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'disabled-rows-columns-fields-spreadsheet__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'disabled-rows-columns-fields-spreadsheet__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/disabled-rows-columns-fields-spreadsheet__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/disabled-rows-columns-fields-spreadsheet__uncheck', 'lg');
  });

  // focused field state
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) td:nth-child(2)', 20, 20);
    }, '.spark-table', 'table/disabled-rows-columns-fields-spreadsheet__focused-field', 'lg');
  });

  // editable field
  casper.then(function(){
    screenshot(function(){
      casper.mouse.doubleclick('tbody tr:nth-child(1) td:nth-child(2)', 20, 20);
    }, '.spark-table', 'table/disabled-rows-columns-fields-spreadsheet__editable-field', 'lg');
  });

  // change field values
  casper.then(function(){
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(2) input', 'AA4351', {reset: true, keepFocus: true});
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('body', 0, 0);
    }, '.spark-table', 'table/disabled-rows-columns-fields-spreadsheet__edited-fields', 'lg');
  });
});

loadExample('table--disabled-rows-columns-fields.html', function() {
  // Default
  screenshot('.spark-table', 'table/disabled-rows-columns-fields', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'disabled-rows-columns-fields__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'disabled-rows-columns-fields__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/disabled-rows-columns-fields__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/disabled-rows-columns-fields__uncheck', 'lg');
  });

  // click on edit for second row
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row');
    }, '.spark-table', 'table/disabled-rows-columns-fields__edit-row', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row-cancel');
    }, '.spark-table', 'table/disabled-rows-columns-fields__edit-row-cancel', 'lg');
  });

  casper.then(function(){
    casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row');
  });

  casper.then(function(){
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(2) input', 'AA4351', {reset: true});
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(3) input', 'JFK', {reset: true});
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(4) input', 'BOS', {reset: true});
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row-save');
    }, '.spark-table', 'table/disabled-rows-columns-fields__edit-row-save', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(2) .spark-table__delete-row');
    }, '.spark-table', 'table/disabled-rows-columns-fields__delete-row', 'lg');
  });
});

loadExample('table--spreadsheet.html', function() {
  // Default
  screenshot('.spark-table', 'table/spreadsheet', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'spreadsheet__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'spreadsheet__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/spreadsheet__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/spreadsheet__uncheck', 'lg');
  });

  // focused field state
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) td:nth-child(2)', 20, 20);
    }, '.spark-table', 'table/spreadsheet__focused-field', 'lg');
  });

  // editable field
  casper.then(function(){
    screenshot(function(){
      casper.mouse.doubleclick('tbody tr:nth-child(1) td:nth-child(2)', 20, 20);
    }, '.spark-table', 'table/spreadsheet__editable-field', 'lg');
  });

  // change field values
  casper.then(function(){
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(2) input', 'AA4351', {reset: true, keepFocus: true});
  });

  // change dropdown value
  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('tbody tr:nth-child(1) select').selectedIndex = 1;
    });
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('body', 0, 0);
    }, '.spark-table', 'table/spreadsheet__edited-fields', 'lg');
  });
});

loadExample('table--resizable.html', function() {
  // Default
  screenshot('.spark-table', 'table/resizable', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'resizable__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'resizable__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/resizable__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/resizable__uncheck', 'lg');
  });

  // Can't currently find option to test drag resize of table
});

loadExample('table--resizable--condensed.html', function() {
  // Default
  screenshot('.spark-table', 'table/resizable-condensed', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'resizable-condensed__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'resizable-condensed__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/resizable-condensed__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/resizable-condensed__uncheck', 'lg');
  });

  // Can't currently find option to test drag resize of table
});

loadExample('table--heading-messaging.html', function() {
  // Default
  screenshot('.spark-table', 'table/heading-messaging', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'heading-messaging__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'heading-messaging__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/heading-messaging__check-all', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/heading-messaging__uncheck', 'lg');
  });

  // focus state doesn't work so can't show message
});

loadExample('table--heading-messaging--spreadsheet.html', function() {
  // Default
  screenshot('.spark-table', 'table/heading-messaging-spreadsheet', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'heading-messaging-spreadsheet__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'heading-messaging-spreadsheet__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/heading-messaging-spreadsheet__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/heading-messaging-spreadsheet__uncheck', 'lg');
  });

  // focused field state
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) td:nth-child(2)', 20, 20);
    }, '.spark-table', 'table/heading-messaging-spreadsheet__focused-field', 'lg');
  });

  // editable field
  casper.then(function(){
    screenshot(function(){
      casper.mouse.doubleclick('tbody tr:nth-child(1) td:nth-child(2)', 20, 20);
    }, '.spark-table', 'table/heading-messaging-spreadsheet__editable-field', 'lg');
  });

  // change field values
  casper.then(function(){
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(2) input', 'AA4351', {reset: true, keepFocus: true});
  });

  // change dropdown value
  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('tbody tr:nth-child(1) select').selectedIndex = 1;
    });
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('body', 0, 0);
    }, '.spark-table', 'table/heading-messaging-spreadsheet__edited-fields', 'lg');
  });
});

loadExample('table--heading-messaging--condensed.html', function() {
  // Default
  screenshot('.spark-table', 'table/heading-messaging-condensed', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'heading-messaging-condensed__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'heading-messaging-condensed__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/heading-messaging-condensed__check-all', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/heading-messaging-condensed__uncheck', 'lg');
  });

  // focus state doesn't work so can't show message
});

loadExample('table--expand-collapse.html', function() {
  // Default
  screenshot('.spark-table', 'table/expand-collapse', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'expand-collapse__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'expand-collapse__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // toggle expand-collapse
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-expand__toggle');
    }, '.spark-table', 'table/expand-collapse__toggle', ['xs', 'sm', 'md', 'lg', 'xl']);
  });
});

loadExample('table--editable-rows.html', function() {
  // Default
  screenshot('.spark-table', 'table/editable-rows', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'editable-rows__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'editable-rows__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/editable-rows__check-all', 'lg');
  });

  // click a row to uncheck
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/editable-rows__uncheck', 'lg');
  });

  // click on edit for second row
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row');
    }, '.spark-table', 'table/editable-rows__edit-row', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row-cancel');
    }, '.spark-table', 'table/editable-rows__edit-row-cancel', 'lg');
  });

  casper.then(function(){
    casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row');
  });

  casper.then(function(){
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(2) input', 'AA4351', {reset: true});
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(3) input', 'JFK', {reset: true});
    casper.sendKeys('tbody tr:nth-child(1) td:nth-child(4) input', 'BOS', {reset: true});
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-table__edit-row-save');
    }, '.spark-table', 'table/editable-rows__edit-row-save', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(2) .spark-table__delete-row');
    }, '.spark-table', 'table/editable-rows__delete-row', 'lg');
  });
});

loadExample('table--editable-fields.html', function() {
  // Default
  screenshot('.spark-table', 'table/editable-fields', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'editable-fields__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'editable-fields__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/editable-fields__check-all', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/editable-fields__uncheck', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.sendKeys('tbody tr:nth-child(1) td:nth-child(3) input', 'DL3412', {reset: true});
    }, '.spark-table', 'table/editable-fields__edited-field', 'lg');
  });
});

loadExample('table--editable-fields--condensed.html', function() {
  // Default
  screenshot('.spark-table', 'table/editable-fields-condensed', ['xs', 'sm', 'md', 'lg', 'xl']);

  // hover over individual table headers
  casper.then(function(){
    var numColumns = casper.getElementsInfo('th').length;

    for (var count = 1; count <= numColumns; count++) {
      var el = 'th:nth-child(' + count + ')';
      processHoverStates(el, 'editable-fields-condensed__table-header-' + count + '--hover', 'lg', 'body');
    }
  });

  // hover over rows
  casper.then(function(){
    var numRows = casper.getElementsInfo('tbody tr').length;

    for (var count = 1; count <= numRows; count++) {
      var el = 'tbody tr:nth-child(' + count + ')';
      processHoverStates(el, 'editable-fields-condensed__table-rows-' + count + '--hover', 'lg', 'body');
    }
  });

  // click check all/uncheck all
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-table__select-all');
    }, '.spark-table', 'table/editable-fields-condensed__check-all', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('tbody tr:nth-child(1) .spark-checkbox__box');
    }, '.spark-table', 'table/editable-fields-condensed__uncheck', 'lg');
  });

  casper.then(function(){
    screenshot(function(){
      casper.sendKeys('tbody tr:nth-child(1) td:nth-child(3) input', 'DL3412', {reset: true});
    }, '.spark-table', 'table/editable-fields-condensed__edited-field', 'lg');
  });
});
