/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('filters.html', function() {
  // Initial screenshot
  screenshot('body', 'filter/default', ['xs', 'sm', 'md', 'lg']);

  // Show Filters
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter__toggle-button');
    }, 'body', 'filter/show-filters', ['xs', 'sm', 'md', 'lg']);
  });

  // View More filters
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter__view-more-filters');
      casper.wait(250);
    }, 'body', 'filter/view-more-filters', ['sm', 'md', 'lg']);
  });

  // View Less filters
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter__view-less-filters');
      casper.wait(250);
    }, 'body', 'filter/view-less-filters', ['sm', 'md', 'lg']);
  });

  // Check some checkboxes in Module 1
  casper.then(function(){
    casper.mouse.click('[data-filter-module="module-1"] .spark-checkbox:nth-child(1)');
    casper.mouse.click('[data-filter-module="module-1"] .spark-checkbox:nth-child(2)');
  });

  casper.then(function(){
    screenshot('body', 'filter/checked-filters', ['sm', 'md', 'lg']);
  });

  // Clear selections in Module 1
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter-module__clear');
      casper.mouse.move('body', 0, 0);
    }, 'body', 'filter/clear-module', ['sm', 'md', 'lg']);
  });

  // Show All fields for Module 1
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('[data-filter-module="module-1"] .spark-filter-module__show-all');
    }, 'body', 'filter/show-all-module-1', ['sm', 'md', 'lg']);
  });

  // Check some checkboxes in Module 1 modal
  casper.then(function(){
    casper.mouse.click('.spark-modal fieldset:nth-child(1) .spark-checkbox:nth-child(1)');
    casper.mouse.click('.spark-modal fieldset:nth-child(1) .spark-checkbox:nth-child(2)');
    casper.mouse.click('.spark-modal fieldset:nth-child(1) .spark-checkbox:nth-child(4)');
  });

  casper.then(function(){
    screenshot('body', 'filter/modal-checked-filters', ['sm', 'md', 'lg']);
  });

  // Clear Modal selections
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-modal .spark-filter-module__clear');
      casper.mouse.move('body', 0, 0);
    }, 'body', 'filter/clear-modal-selections', ['sm', 'md', 'lg']);
  });

  // Apply Modal selections
  casper.then(function(){
    casper.mouse.click('.spark-modal fieldset:nth-child(1) .spark-checkbox:nth-child(1)');
    casper.mouse.click('.spark-modal fieldset:nth-child(1) .spark-checkbox:nth-child(2)');
    casper.mouse.click('.spark-modal fieldset:nth-child(1) .spark-checkbox:nth-child(4)');
  });

  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-modal .spark-filter-module__show-all__modal-button');
    }, 'body', 'filter/apply-modal-selections', ['sm', 'md', 'lg']);
  });

  // Show more Module 2 options
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('[data-filter-module="module-2"] .spark-filter-module__show-all');
    }, 'body', 'filter/show-all-module-2', ['sm', 'md', 'lg']);
  });

  // Apply filters
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter__btn-apply');
    }, 'body', 'filter/apply-filters', ['sm', 'md', 'lg']);
  });

  // Clear a single applied filter
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter__tag[data-filter-name="checkbox1"] .spark-filter__tag__close');
    }, 'body', 'filter/clear-applied-filter', ['sm', 'md', 'lg']);
  });

  // Clear All filters
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter__clear-all');
    }, 'body', 'filter/clear-all-applied-filters', ['sm', 'md', 'lg']);
  });
});

/*
Load page again to test small screen interactions due to change in DOM structure
that isn't captured if we follow above sequence
*/
loadExample('filters.html', function() {
  // Set viewport size to change DOM structure
  casper.viewport(320, 480);

  // Toggle filters
  casper.then(function(){
    casper.mouse.click('.spark-filter__toggle-button');
    casper.wait(250);
  });

  // Expand Module 1 panel
  casper.then(function(){
    casper.mouse.click('.spark-filter-module:nth-child(1) .spark-panel__header');
    casper.wait(250);
  });

  casper.then(function(){
    screenshot('body', 'filter/show-module-1', 'xs');
  });

  // Check some checkboxes in Module 1
  casper.then(function(){
    casper.mouse.click('[data-filter-module="module-1"] .spark-checkbox:nth-child(1)');
    casper.mouse.click('[data-filter-module="module-1"] .spark-checkbox:nth-child(2)');
  });

  casper.then(function(){
    screenshot('body', 'filter/modal-checked-filters', 'xs');
  });

  // Apply filters
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-filter__btn-apply');
    }, 'body', 'filter/apply-filters', 'xs');
  });
});
