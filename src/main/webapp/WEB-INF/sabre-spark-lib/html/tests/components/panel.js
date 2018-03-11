/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processStates(name) {
  casper.then(function(){
    var el = '.spark-menu--panel > .spark-menu__list > li';
    var items = casper.exists(el) ? casper.getElementsInfo(el).length : 0;

    if (items > 0) {
      for (var count = 1; count <= items; count++) {
        processHoverStates(el, name, count);
      }
    }
  });

  casper.then(function(){
    var el = '.spark-menu--panel > .spark-menu__list > li';
    var items = casper.exists(el) ? casper.getElementsInfo(el).length : 0;

    if (items > 0) {
      for (var count = 1; count <= items; count++) {
        processActiveStates(el, name, count);
      }
    }
  });
}

function processHoverStates(element, name, nthChild) {
  var elementInfo = casper.getElementInfo(element + ':nth-child('+ nthChild + ')');
  var cssClasses = elementInfo.attributes['class'] || '';

  if ((cssClasses != '') && (cssClasses.indexOf('spark-menu__list-item') != -1)) {
    screenshot(function(){
      casper.mouse.move(element + ':nth-child('+ nthChild +') .spark-menu__list-link');
    }, '.spark-menu', 'panel/' + name + '__item-' + nthChild + '--hover', 'xs');

    casper.then(function(){
      if ( casper.exists(element + ':nth-child('+ nthChild +') .spark-menu__list-link + .spark-menu__list-expand') ) {
        screenshot(function(){
          casper.mouse.move(element + ':nth-child('+ nthChild +') .spark-menu__list-expand');
        }, '.spark-menu', 'panel/' + name + '__item-' + nthChild + '-arrow--hover', 'xs');
      }
    });
  }
}

function processActiveStates(element, name, nthChild) {
  var elementInfo = casper.getElementInfo(element + ':nth-child('+ nthChild + ')');
  var cssClasses = elementInfo.attributes['class'] || '';

  if ((cssClasses != '') && (cssClasses.indexOf('spark-menu__list-item') != -1)) {
    screenshot(function(){
      casper.mouse.click(element + ':nth-child('+ nthChild +') .spark-menu__list-link');
    }, '.spark-menu', 'panel/' + name + '__item-' + nthChild + '--active', 'xs');

    casper.then(function(){
      if ( casper.exists(element + ':nth-child('+ nthChild +') .spark-menu__list-link + .spark-menu__list-expand') ) {
        screenshot(function(){
          casper.mouse.click(element + ':nth-child('+ nthChild +') .spark-menu__list-expand');
        }, '.spark-menu', 'panel/' + name + '__item-' + nthChild + '-arrow--active', 'xs');
      }
    });
  }
}

loadExample('panel.html', function() {
  // Default state
  screenshot('.spark-panel', 'panel/default', 'md');

  // Expanded state
  screenshot(function(){
    casper.click('.spark-expand__hide--expanded');
    casper.wait(300);
  }, '.spark-panel', 'panel/default--expanded', 'md');
});

loadExample('panel--expand-collapse.html', function() {
  // Default state
  screenshot('.spark-panel', 'panel/expand-collapse', 'md');

  // Hover
  screenshot(function(){
    casper.mouse.move('.spark-panel');
  }, '.spark-panel', 'panel/expand-collapse--hover', 'md');

  // Active -- Will not show focus state of pseudo element (focus state bug)
  screenshot(function(){
    casper.mouse.down('.spark-panel__header');
  }, '.spark-panel', 'panel/expand-collapse--active', 'md');

  // Expanded
  screenshot(function(){
    casper.mouse.up('.spark-panel');
    casper.mouse.move('body', 300, 300);
  }, '.spark-panel', 'panel/expand-collapse--expanded', 'md');
});

loadExample('panel--image-heading.html', function() {
  // Default state
  screenshot('.spark-panel', 'panel/image-heading', 'xs');
});

loadExample('panel-menu--four-level.html', function() {
  // Default state
  screenshot('.spark-menu', 'panel/menu-four-level', 'xs');

  // Alpha Menu
  casper.then(function(){
    casper.mouse.click('[data-menu="#fourth"]');
    casper.wait(500);
    screenshot('.spark-menu', 'panel/menu-four-level--alpha', 'xs');
  });

  // Beta Menu
  casper.then(function(){
    casper.mouse.click('[data-nested-list-id="fourth"] > .spark-menu__list-item:nth-child(5)');
    casper.wait(500);
    screenshot('.spark-menu', 'panel/menu-four-level--beta', 'xs');
  });

  // Back Menu Hover
  casper.then(function(){
    screenshot(function(){
      casper.mouse.move('[data-nested-list-id="fourth-beta"] .spark-menu__list-back');
    }, '.spark-menu', 'panel/beta-menu-back--hover', 'xs');
  });

  // Traverse to first level menu
  casper.then(function(){
    casper.mouse.click('[data-nested-list-id="fourth-beta"] .spark-menu__list-back');
    casper.wait(250);
  });

  casper.then(function(){
    casper.mouse.click('[data-nested-list-id="fourth"] .spark-menu__list-back');
    casper.wait(250);
  });

  casper.then(function(){
    processStates('menu-four-level');
  });
});

loadExample('panel-menu--three-level.html', function() {
  // Default state
  screenshot('.spark-menu', 'panel/menu-three-level', 'xs');

  casper.then(function(){
    processStates('menu-three-level');
  });
});

loadExample('panel-menu--two-level.html', function() {
  // Default state
  screenshot('.spark-menu', 'panel/menu-two-level', 'xs');

  casper.then(function(){
    processStates('menu-two-level');
  });
});

loadExample('panel-menu--intra-page.html', function() {
  // Default state
  screenshot('.spark-menu', 'panel/intra-page', 'xs');

  casper.then(function(){
    processStates('intra-page');
  });
});

loadExample('panel-menu--group-label.html', function() {
  // Default state
  screenshot('.spark-menu', 'panel/group-label', 'xs');

  casper.then(function(){
    processStates('group-label');
  });
});
