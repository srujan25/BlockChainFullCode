/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

function processHoverStates(el, name, bp, container) {
  screenshot(function(){
    casper.mouse.move(el);
  }, container, 'date-input/' + name, bp);
}

function processMouseClick(el, name, bp, container) {
  screenshot(function(){
    casper.mouse.click(el);
  }, container, 'date-input/' + name, bp);
}

function toggleCalendar(name) {
  // Open Calendar
  screenshot(function(){
    casper.mouse.click('.spark-date__calendar-toggle');
  }, 'body', 'date-input/' + name + '--calendar-open', 'sm');

  // Close Calendar
  screenshot(function(){
    casper.mouse.click('.spark-date__calendar-toggle');
  }, 'body', 'date-input/' + name + '--calendar-closed', 'sm');
}

function navigateCalendar(name) {
  // Open Calendar and navigate to previous 2 months
  casper.mouse.click('.spark-date__calendar-toggle');

  // Navigate back by 2 months
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-calendar__previous');
      casper.wait(250);
      casper.mouse.click('.spark-calendar__previous');
      casper.wait(250);
    }, 'body', 'date-input/' + name + '--navigate-previous', 'sm');
  });

  // Navigate forward a month
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-calendar__next');
      casper.wait(250);
    }, 'body', 'date-input/' + name + '--navigate-next', 'sm');
  });

  // Select a date from the calendar
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-calendar__day:nth-child(15)');
    }, 'body', 'date-input/' + name + '--date-selection', 'sm');
  });

  // Close calendar by clicking outside of popover
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('body', 1, 1);
    }, 'body', 'date-input/' + name + '--close-calendar-via-body', 'sm');
  });
}

function navigateCalendarJump(name) {
  casper.mouse.click('.spark-date__calendar-toggle');

  // Navigate month dropdown
  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('.spark-calendar__month-title .spark-calendar__select:nth-child(1)');
    }, 'body', 'date-input/' + name + '--month-jump', 'sm');
  });

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-calendar__month-title .spark-calendar__select:nth-child(1) select').selectedIndex = 10;
    });
  });

  casper.then(function(){
    screenshot('body', 'date-input/' + name + '--month-selected', 'sm');
  });

  // Navigate year dropdown
  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('.spark-calendar__month-title .spark-calendar__select:nth-child(2)');
    }, 'body', 'date-input/' + name + '--month-jump', 'sm');
  });

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-calendar__month-title .spark-calendar__select:nth-child(2) select').selectedIndex = 5;
    });
  });

  casper.then(function(){
    screenshot('body', 'date-input/' + name + '--year-selected', 'sm');
  });
}

loadExample('date-input--select-range.html', function() {
  // Default
  screenshot('body', 'date-input/select-range', ['xs', 'md']);

  // Group 1
  var numSelects = casper.getElementsInfo('.spark-date:nth-child(1) .spark-select').length;

  for (var count = 1; count <= numSelects; count++) {
    processHoverStates('.spark-date:nth-child(1) .spark-select:nth-child(' + count + ')', 'select-range__group-1-field' + count + '--hover', ['xs', 'md'], 'body')
  }

  // Group 2
  casper.then(function(){
    var numSelects = casper.getElementsInfo('.spark-date:nth-child(2) .spark-select').length;

    for (var count = 1; count <= numSelects; count++) {
      processHoverStates('.spark-date:nth-child(2) .spark-select:nth-child(' + count + ')', 'select-range__group-2-field' + count + '--hover', ['xs', 'md'], 'body')
    }
  });

  casper.then(function(){
    casper.mouse.move('body', 0, 0);
  });

  casper.then(function(){
    addClass('.spark-date:nth-child(1) .spark-select:nth-child(1)', 'has-value');
    addClass('.spark-date:nth-child(1) .spark-select:nth-child(2)', 'has-value');
    addClass('.spark-date:nth-child(1) .spark-select:nth-child(3)', 'has-value');

    addClass('.spark-date:nth-child(2) .spark-select:nth-child(1)', 'has-value');
    addClass('.spark-date:nth-child(2) .spark-select:nth-child(2)', 'has-value');
    addClass('.spark-date:nth-child(2) .spark-select:nth-child(3)', 'has-value');
  });

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-date:nth-child(1) .spark-select:nth-child(1) .spark-select__input').selectedIndex = 3;
      document.querySelector('.spark-date:nth-child(1) .spark-select:nth-child(2) .spark-select__input').selectedIndex = 4;
      document.querySelector('.spark-date:nth-child(1) .spark-select:nth-child(3) .spark-select__input').selectedIndex = 5;

      document.querySelector('.spark-date:nth-child(2) .spark-select:nth-child(1) .spark-select__input').selectedIndex = 6;
      document.querySelector('.spark-date:nth-child(2) .spark-select:nth-child(2) .spark-select__input').selectedIndex = 7;
      document.querySelector('.spark-date:nth-child(2) .spark-select:nth-child(3) .spark-select__input').selectedIndex = 8;
    });
  });

  casper.then(function(){
    screenshot('body', 'date-input/select-group--selections', ['xs', 'md']);
  });
});

loadExample('date-input--select.html', function() {
  // Default
  screenshot('body', 'date-input/select', ['xs', 'md']);

  // Group 1
  var numSelects = casper.getElementsInfo('.spark-date .spark-select').length;

  for (var count = 1; count <= numSelects; count++) {
    processHoverStates('.spark-select:nth-child(' + count + ')', 'select__field' + count + '--hover', ['xs', 'md'], 'body')
  }

  casper.then(function(){
    casper.mouse.move('body', 0, 0);
  });

  casper.then(function(){
    addClass('.spark-select:nth-child(1)', 'has-value');
    addClass('.spark-select:nth-child(2)', 'has-value');
    addClass('.spark-select:nth-child(3)', 'has-value');
  });

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-select:nth-child(1) .spark-select__input').selectedIndex = 3;
      document.querySelector('.spark-select:nth-child(2) .spark-select__input').selectedIndex = 4;
      document.querySelector('.spark-select:nth-child(3) .spark-select__input').selectedIndex = 5;
    });
  });

  casper.then(function(){
    screenshot('body', 'date-input/select--selections', ['xs', 'md']);
  });
});

loadExample('date-input--typeahead--error.html', function() {
  // Default
  screenshot('body', 'date-input/typeahead__error', 'sm');

  // Hover
  casper.then(function(){
    processHoverStates('.spark-date', 'typeahead__error--hover', 'sm', 'body');
  });

  // Active
  casper.then(function(){
    processMouseClick('.spark-date', 'typeahead__error--clicked', 'sm', 'body');
  });

  // Active with text
  casper.then(function(){
    casper.sendKeys('.spark-input__field', '10-22-1967');
  });

  casper.then(function(){
    screenshot('body', 'date-input/typeahead__error--with-text-and-active', 'sm');
  });

  // Inactive with text
  casper.then(function(){
    processMouseClick('body', 'typeahead__error--with-text', 'sm', 'body');
  });
});

loadExample('date-input--typeahead-calendar-date-as-text.html', function() {
  // Default
  screenshot('body', 'date-input/typeahead-calendar-date-as-text', 'sm');

  // Toggle Calendar
  casper.then(function(){
    toggleCalendar('typeahead-calendar-date-as-text');
  });

  // Hover
  casper.then(function(){
    processHoverStates('.spark-date', 'typeahead-calendar-date-as-text--hover', 'sm', 'body');
  });

  // Active
  casper.then(function(){
    processMouseClick('.spark-date', 'typeahead-calendar-date-as-text--clicked', 'sm', 'body');
  });

  // With text
  casper.then(function(){
    casper.sendKeys('.spark-input__field', '02-21-1964');
  });

  casper.then(function(){
    screenshot('body', 'date-input/typeahead-calendar-date-as-text--with-text-and-active', 'sm');
  });

  // With text and inactive
  casper.then(function(){
    processMouseClick('body', 'typeahead-calendar-date-as-text--with-text', 'sm', 'body');
  });

  //
  casper.then(function(){
    navigateCalendar('typeahead-calendar-date-as-text');
  });
});

loadExample('date-input--typeahead-calendar-jump.html', function() {
  // Default
  screenshot('body', 'date-input/typeahead-calendar-jump', 'sm');

  // Toggle Calendar
  casper.then(function(){
    toggleCalendar('typeahead-calendar-jump');
  });

  // Hover
  casper.then(function(){
    processHoverStates('.spark-date', 'typeahead-calendar-jump--hover', 'sm', 'body');
  });

  // Active
  casper.then(function(){
    processMouseClick('.spark-date', 'typeahead-calendar-jump--clicked', 'sm', 'body');
  });

  // With text
  casper.then(function(){
    casper.sendKeys('.spark-input__field', '03-23-1954');
  });

  casper.then(function(){
    screenshot('body', 'date-input/typeahead-calendar-jump--with-text-and-active', 'sm');
  });

  // With text and inactive
  casper.then(function(){
    processMouseClick('body', 'typeahead-calendar-jump--with-text', 'sm', 'body');
  });

  // Navigate Calendar
  casper.then(function(){
    navigateCalendar('typeahead-calendar-jump');
  });

  // Navigate Calendar Jump options
  casper.then(function(){
    navigateCalendarJump('typeahead-calendar-jump');
  });
});

loadExample('date-input--typeahead-calendar-range.html', function() {
  // Default
  screenshot('body', 'date-input/typeahead-calendar-range', 'sm');

  // Hover
  casper.then(function(){
    processHoverStates('.spark-date:nth-child(1)', 'typeahead-calendar-range--hover', 'sm', 'body');
  });

  casper.then(function(){
    processHoverStates('.spark-date:nth-child(2)', 'typeahead-calendar-range--hover', 'sm', 'body');
  });

  // Active
  casper.then(function(){
    processMouseClick('.spark-date:nth-child(1)', 'typeahead-calendar-range--clicked', 'sm', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-date:nth-child(2)', 'typeahead-calendar-range--clicked', 'sm', 'body');
  });

  // With text
  casper.then(function(){
    casper.sendKeys('.spark-date:nth-child(1) .spark-input__field', '12-12-1984');
  });

  casper.then(function(){
    casper.sendKeys('.spark-date:nth-child(2) .spark-input__field', '12-22-1984');
  });

  casper.then(function(){
    screenshot('body', 'date-input/typeahead-calendar-range--with-text-and-active', 'sm');
  });

  casper.then(function(){
    processMouseClick('body', 'typeahead-calendar-range--with-text', 'sm', 'body');
  });

  casper.then(function(){
    navigateCalendar('typeahead-calendar-range');
  });
});

loadExample('date-input--typeahead-calendar.html', function() {
  // Default
  screenshot('body', 'date-input/typeahead-calendar', 'sm');

  // Toggle Calendar
  casper.then(function(){
    toggleCalendar('typeahead-calendar');
  });

  // Hover
  casper.then(function(){
    processHoverStates('.spark-date', 'typeahead-calendar--hover', 'sm', 'body');
  });

  // Active
  casper.then(function(){
    processMouseClick('.spark-date', 'typeahead-calendar--clicked', 'sm', 'body');
  });

  // With text
  casper.then(function(){
    casper.sendKeys('.spark-input__field', '03-23-1954');
  });

  casper.then(function(){
    screenshot('body', 'date-input/typeahead-calendar--with-text-and-active', 'sm');
  });

  // With text and inactive
  casper.then(function(){
    processMouseClick('body', 'typeahead-calendar--with-text', 'sm', 'body');
  });

  //
  casper.then(function(){
    navigateCalendar('typeahead-calendar');
  });
});

loadExample('date-input--typeahead-range--error.html', function() {
  // Default
  screenshot('body', 'date-input/typeahead-range__error', 'sm');

  // Hover
  casper.then(function(){
    processHoverStates('.spark-date:nth-child(1)', 'typeahead-range__error--hover', 'sm', 'body');
  });

  casper.then(function(){
    processHoverStates('.spark-date:nth-child(2)', 'typeahead-range__error--hover', 'sm', 'body');
  });

  // Active
  casper.then(function(){
    processMouseClick('.spark-date:nth-child(1)', 'typeahead-range__error--clicked', 'sm', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-date:nth-child(2)', 'typeahead-range__error--clicked', 'sm', 'body');
  });

  // With text
  casper.then(function(){
    casper.sendKeys('.spark-date:nth-child(1) .spark-input__field', '12-12-1984');
  });

  casper.then(function(){
    casper.sendKeys('.spark-date:nth-child(2) .spark-input__field', '12-22-1984');
  });

  casper.then(function(){
    screenshot('body', 'date-input/typeahead-range__error--with-text-and-active', 'sm');
  });

  casper.then(function(){
    processMouseClick('body', 'typeahead-range__error--with-text', 'sm', 'body');
  });

  casper.then(function(){
    navigateCalendar('typeahead-range__error');
  });
});

loadExample('date-input--typeahead.html', function() {
  // Default
  screenshot('body', 'date-input/typeahead', 'sm');

  // Hover
  casper.then(function(){
    processHoverStates('.spark-date', 'typeahead--hover', 'sm', 'body');
  });

  // Active
  casper.then(function(){
    processMouseClick('.spark-date', 'typeahead--clicked', 'sm', 'body');
  });

  // With text
  casper.then(function(){
    casper.sendKeys('.spark-input__field', '12-12-1984');
  });

  casper.then(function(){
    screenshot('body', 'date-input/typeahead--with-text-and-active', 'sm');
  });

  // With text and inactive
  casper.then(function(){
    processMouseClick('body', 'typeahead--with-text', 'sm', 'body');
  });
});
