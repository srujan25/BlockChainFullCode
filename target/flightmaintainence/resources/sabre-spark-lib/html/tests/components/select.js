/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

function processSelectStates(name) {
  // Hover state
  screenshot(function(){
    casper.mouse.move('.spark-margin-top:nth-child(1) .spark-select');
  }, 'body', 'select/' + name + '--hover', 'md');

  // Active state
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-margin-top:nth-child(1) .spark-select');
    }, 'body', 'select/' + name + '--active', 'md');
  });

  // Make a selection
  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-margin-top:nth-child(1) .spark-select__input').selectedIndex = 3;
    });
  });

  casper.then(function(){
    screenshot('body', 'select/' + name + '--selections', 'md');
  });
}


function processMultiSelectStates(name) {
  // Hover
  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('.spark-multi-select');
    }, 'body', 'select/' + name + '--hover', 'md');
  });

  // Active selections
  casper.then(function(){
    casper.evaluate(function() {
      var select = document.querySelector('.spark-multi-select__input');
      select.options[1].selected = true;
      select.options[3].selected = true;
    });
  });

  casper.then(function(){
    screenshot('body', 'select/' + name + '--selections', 'md');
  });
}


function processSelectGroupStates(num) {
  screenshot(function(){
    casper.mouse.move('.spark-select:nth-child(' + num + ')');
  }, 'body', 'select/group__' + num + '--hover', 'md');

  // Active state
  casper.then(function(){
    screenshot(function(){
      casper.mouse.click('.spark-select:nth-child(' + num + ')');
    }, 'body', 'select/group__' + num + '--active', 'md');
  });

  casper.then(function(){
    casper.mouse.click('body', 0, 0);
  });
}

loadExample('select.html', function() {
  screenshot('body', 'select/default', 'md');

  processSelectStates('default');
});

loadExample('select--error.html', function() {
  screenshot('body', 'select/error', 'md');

  processSelectStates('error');
});

loadExample('select-group.html', function() {
  screenshot('body', 'select/group', 'md');

  var numSelects = casper.getElementsInfo('.spark-select').length;

  for (var count = 1; count <= numSelects; count++) {
    processSelectGroupStates(count);
  }

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
    screenshot('body', 'select/group--selections', 'md');
  });
});

loadExample('select-multiple__checkbox--disabled.html', function() {
  screenshot('body', 'select/multiple-checkbox--disabled', 'md');
});

loadExample('select-multiple__checkbox--error.html', function() {
  screenshot('body', 'select/multiple-checkbox__error', 'md');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-checkbox:nth-child(1) input').checked = true;
    });
  });

  casper.then(function(){
    screenshot('body', 'select/multiple-checkbox__error--checked', 'md');
  });
});

loadExample('select-multiple__checkbox--no-title.html', function() {
  screenshot('body', 'select/multiple-checkbox__no-title', 'md');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-checkbox:nth-child(1) input').checked = true;
    });
  });

  casper.then(function(){
    screenshot('body', 'select/multiple-checkbox__no-title--checked', 'md');
  });
});

loadExample('select-multiple__checkbox--success.html', function() {
  screenshot('body', 'select/multiple-checkbox__success', 'md');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-checkbox:nth-child(1) input').checked = true;
    });
  });

  casper.then(function(){
    screenshot('body', 'select/multiple-checkbox__success--checked', 'md');
  });
});

loadExample('select-multiple__checkbox--title.html', function() {
  screenshot('body', 'select/multiple-checkbox__title', 'md');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-checkbox:nth-child(1) input').checked = true;
    });
  });

  casper.then(function(){
    screenshot('body', 'select/multiple-checkbox__title--checked', 'md');
  });
});

loadExample('select-multiple__checkbox--warning.html', function() {
  screenshot('body', 'select/multiple-checkbox__warning', 'md');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-checkbox:nth-child(1) input').checked = true;
    });
  });

  casper.then(function(){
    screenshot('body', 'select/multiple-checkbox__warning--checked', 'md');
  });
});

loadExample('select-multiple__native--disabled.html', function() {
  screenshot('body', 'select/multiple-native--disabled', 'md');
});

loadExample('select-multiple__native--error.html', function() {
  screenshot('body', 'select/multiple-native__error', 'md');

  processMultiSelectStates('multiple-native__error');
});

loadExample('select-multiple__native--no-title.html', function() {
  screenshot('body', 'select/multiple-native__no-title', 'md');

  processMultiSelectStates('multiple-native__no-title');
});

loadExample('select-multiple__native--success.html', function() {
  screenshot('body', 'select/multiple-native__success', 'md');

  processMultiSelectStates('multiple-native__success');
});

loadExample('select-multiple__native--warning.html', function() {
  screenshot('body', 'select/multiple-native__warning', 'md');

  processMultiSelectStates('multiple-native__warning');
});

loadExample('select-multiple__native.html', function() {
  screenshot('body', 'select/multiple-native', 'md');

  processMultiSelectStates('multiple-native');
});
