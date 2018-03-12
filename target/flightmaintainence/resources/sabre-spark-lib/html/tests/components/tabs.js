/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processTabStates(tab, name){
  // Tab hover states
  screenshot(function(){
    casper.mouse.move('.spark-tabs__tab:nth-child(' + tab + ') a');
  }, '.spark-tabs', 'tabs/' + name + 'tab-' + tab + '--hover', 'xl'); // selecting XL as all tabs will be viewable at this size

  // Tab active states
  screenshot(function(){
    casper.mouse.down('.spark-tabs__tab:nth-child(' + tab + ') a');
  }, '.spark-tabs', 'tabs/' + name + 'tab-' + tab + '--active', 'xl');

  // Focus states not available due to bug in PhantomJS

  // Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-tabs__tab:nth-child(' + tab + ') a');
    casper.mouse.move('body', 300, 300);
  });
};

function processNavigationButtonStates(name){
  screenshot(function(){
    casper.mouse.click('.spark-tabs__tab:nth-child(1) a');
    casper.mouse.move('body', 0, 0);
  }, '.spark-tabs', 'tabs/' + name + 'navigation-default', 'md');

  screenshot(function(){
    casper.mouse.move('.spark-tabs__btn--right');
  }, '.spark-tabs', 'tabs/' + name + 'right-button--hover', 'md');

  screenshot(function(){
    casper.mouse.click('.spark-tabs__btn--right');
    casper.mouse.move('body', 0, 0);
  }, '.spark-tabs', 'tabs/' + name + 'right-button--click', 'md');

  screenshot(function(){
    casper.mouse.move('.spark-tabs__btn--left');
  }, '.spark-tabs', 'tabs/' + name + 'left-button--hover', 'md');

  screenshot(function(){
    casper.mouse.click('.spark-tabs__btn--left');
    casper.mouse.move('body', 0, 0);
  }, '.spark-tabs', 'tabs/' + name + 'left-button--click', 'md');
}

loadExample('tabs--double-line.html', function() {
  // Default
  screenshot('.spark-tabs', 'tabs/double-line-default', ['xs', 'md', 'lg', 'xl']);

  // Hover and Active states for individual tabs at xl size
  var numTabs = casper.getElementsInfo('.spark-tabs__tab').length;

  for (var count = 1; count <= numTabs; count++) {
    processTabStates(count, 'double-line-');
  }

  // Navigation Buttons
  processNavigationButtonStates('double-line-');
});


loadExample('tabs--with-icons.html', function() {
  // Default
  screenshot('.spark-tabs', 'tabs/with-icons-default', ['xs', 'md', 'lg', 'xl']);

  // Hover and Active states for individual tabs at xl size
  var numTabs = casper.getElementsInfo('.spark-tabs__tab').length;

  for (var count = 1; count <= numTabs; count++) {
    processTabStates(count, 'with-icons-');
  }

  // Navigation Buttons
  processNavigationButtonStates('with-icons-');
});


loadExample('tabs.html', function() {
  // Default
  screenshot('.spark-tabs', 'tabs/default', ['xs', 'md', 'lg', 'xl']);

  // Hover and Active states for individual tabs at xl size
  var numTabs = casper.getElementsInfo('.spark-tabs__tab').length;

  for (var count = 1; count <= numTabs; count++) {
    processTabStates(count, 'default-');
  }

  // Navigation Buttons
  processNavigationButtonStates('default-');
});
