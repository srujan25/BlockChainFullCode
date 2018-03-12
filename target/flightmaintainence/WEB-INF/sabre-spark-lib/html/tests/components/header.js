/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
//const addClass = require('../tools/add-class');

function processHoverStates(el, name, bp, container) {
  screenshot(function(){
    casper.mouse.move(el);
  }, container, 'header/' + name, bp);
}

function processMouseClick(el, name, bp, container) {
  screenshot(function(){
    casper.mouse.click(el);
  }, container, 'header/' + name, bp);
}

function processActiveStates(el, name, bp, container) {
  screenshot(function(){
    casper.mouse.down(el);
  }, container, 'header/' + name, bp);

  //Release mousedown
  casper.then(function(){
    casper.mouse.up(el);
    casper.mouse.move('.spark-header', 0, 0);
  });
}

function processScrollToBottom(el, name, bp, container) {
  casper.evaluate(function(){
    var el = document.querySelector('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu');
    el.scrollTop = el.scrollHeight;
  });

  casper.then(function(){
    screenshot(container, 'header/' + name, bp);
  });

  casper.then(function(){
    casper.evaluate(function(){
      var el = document.querySelector('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu');
      el.scrollTop = 0;
    });
  });
}

loadExample('header.html', function() {
  // Default
  screenshot('.spark-header', 'header/default', ['xs', 'sm', 'md', 'lg', 'xl']);

  // Product title
  casper.then(function(){
    processHoverStates('.spark-header__title', 'default__title--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__title', 'default__title--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Top Level Menu
  casper.viewport(1800, 1024);

  var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'default__links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'default__links-' + count + '--active', 'xl', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'default__cog--hover', ['lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'default__cog--active', ['lg', 'xl'], '.spark-header');
  });

  // Sign in
  casper.then(function(){
    processHoverStates('.spark-header__sign-in a', 'default__sign-in--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__sign-in a', 'default__sign-in--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Market Analysis 2nd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'default__submenu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'default__submenu-links-' + count + '--active', 'xl', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'default__third-level-menu--hover', 'xl', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'default__third-level-menu--active', 'xl', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/default__third-level-menu--clicked', 'xl');
  });

  var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'default__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'default__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  // Hamburger Icon
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'default__hamburger--hover','xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'default__hamburger--clicked','xs', 'body');
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'default__links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'default__links-' + count + '--active', 'xs', 'body');
    }
  });

  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a + button');
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'default__submenu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'default__submenu-links-' + count + '--active', 'xs', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'default__third-level-menu--hover', 'xs', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'default__third-level-menu--active', 'xs', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/default__third-level-menu--clicked', 'xs');
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'default__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'default__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'default__cog--hover', 'xs', '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'default__cog--active', 'xs', '.spark-header');
  });

  // Close Menu
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'default__close-menu--hover','xs', 'body');
  });

  casper.then(function(){
    processScrollToBottom('', 'default__menu--scrolled-to-bottom', 'xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'default__close-menu--clicked','xs', 'body');
  });
});

loadExample('header--co-branded.html', function() {
  // Default
  screenshot('.spark-header', 'header/co-branded', ['xs', 'sm', 'md', 'lg', 'xl']);

  // Product title
  casper.then(function(){
    processHoverStates('.spark-header__title', 'co-branded__title--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__title', 'co-branded__title--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Top Level Menu
  casper.viewport(1800, 1024);

  var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'co-branded__links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'co-branded__links-' + count + '--active', 'xl', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'co-branded__cog--hover', ['lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'co-branded__cog--active', ['lg', 'xl'], '.spark-header');
  });

  // Sign in
  casper.then(function(){
    processHoverStates('.spark-header__sign-in a', 'co-branded__sign-in--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__sign-in a', 'co-branded__sign-in--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Market Analysis 2nd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'co-branded__submenu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'co-branded__submenu-links-' + count + '--active', 'xl', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'co-branded__third-level-menu--hover', 'xl', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'co-branded__third-level-menu--active', 'xl', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/co-branded__third-level-menu--clicked', 'xl');
  });

  var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'co-branded__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'co-branded__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  // Hamburger Icon
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'co-branded__hamburger--hover','xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'co-branded__hamburger--clicked','xs', 'body');
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'co-branded__links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'co-branded__links-' + count + '--active', 'xs', 'body');
    }
  });

  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a + button');
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'co-branded__submenu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'co-branded__submenu-links-' + count + '--active', 'xs', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'co-branded__third-level-menu--hover', 'xs', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'co-branded__third-level-menu--active', 'xs', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/co-branded__third-level-menu--clicked', 'xs');
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'co-branded__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'co-branded__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'co-branded__cog--hover', 'xs', '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'co-branded__cog--active', 'xs', '.spark-header');
  });

  // Close Menu
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'co-branded__close-menu--hover','xs', 'body');
  });

  casper.then(function(){
    processScrollToBottom('', 'co-branded__menu--scrolled-to-bottom', 'xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'co-branded__close-menu--clicked','xs', 'body');
  });
});

loadExample('header--condensed.html', function() {
  // Default
  screenshot('.spark-header', 'header/condensed', ['xs', 'sm', 'md', 'lg', 'xl']);

  // Product title
  casper.then(function(){
    processHoverStates('.spark-header__title', 'condensed__title--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__title', 'condensed__title--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Top Level Menu
  casper.viewport(1800, 1024);

  var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'condensed__links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'condensed__links-' + count + '--active', 'xl', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'condensed__cog--hover', ['lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'condensed__cog--active', ['lg', 'xl'], '.spark-header');
  });

  // Sign in
  casper.then(function(){
    processHoverStates('.spark-header__sign-in a', 'condensed__sign-in--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__sign-in a', 'condensed__sign-in--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Market Analysis 2nd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) a');
  });

  var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'condensed__submenu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'condensed__submenu-links-' + count + '--active', 'xl', 'body');
    }
  });

  // Hamburger Icon
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'condensed__hamburger--hover','xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'condensed__hamburger--clicked','xs', 'body');
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'condensed__links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'condensed__links-' + count + '--active', 'xs', 'body');
    }
  });

  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) a + button');
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'condensed__submenu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'condensed__submenu-links-' + count + '--active', 'xs', 'body');
    }
  });

  // Close Menu
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'condensed__close-menu--hover','xs', 'body');
  });

  casper.then(function(){
    processScrollToBottom('', 'condensed__menu--scrolled-to-bottom', 'xs', 'body');
  });

  // Cog
  casper.then(function(){
    casper.evaluate(function(){
      var el = document.querySelector('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu');
      el.scrollTop = el.scrollHeight;
    });
  });

  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'condensed__cog--hover', 'xs', 'body');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'condensed__cog--active', 'xs', 'body');
  });

  casper.then(function(){
    casper.evaluate(function(){
      var el = document.querySelector('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu');
      el.scrollTop = 0;
    });
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'condensed__close-menu--clicked','xs', 'body');
  });
});

loadExample('header--fixed.html', function() {
  // Default
  screenshot('.spark-header', 'header/fixed', ['xs', 'sm', 'md', 'lg', 'xl']);

  // Product title
  casper.then(function(){
    processHoverStates('.spark-header__title', 'fixed__title--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__title', 'fixed__title--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Top Level Menu
  casper.viewport(1800, 1024);

  var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'fixed__links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'fixed__links-' + count + '--active', 'xl', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'fixed__cog--hover', ['lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'fixed__cog--active', ['lg', 'xl'], '.spark-header');
  });

  // Sign in
  casper.then(function(){
    processHoverStates('.spark-header__sign-in a', 'fixed__sign-in--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__sign-in a', 'fixed__sign-in--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Market Analysis 2nd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'fixed__submenu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'fixed__submenu-links-' + count + '--active', 'xl', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'fixed__third-level-menu--hover', 'xl', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'fixed__third-level-menu--active', 'xl', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/fixed__third-level-menu--clicked', 'xl');
  });

  var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'fixed__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'fixed__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  // Hamburger Icon
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'fixed__hamburger--hover','xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'fixed__hamburger--clicked','xs', 'body');
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'fixed__links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'fixed__links-' + count + '--active', 'xs', 'body');
    }
  });

  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a + button');
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'fixed__submenu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'fixed__submenu-links-' + count + '--active', 'xs', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'fixed__third-level-menu--hover', 'xs', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'fixed__third-level-menu--active', 'xs', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/fixed__third-level-menu--clicked', 'xs');
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'fixed__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'fixed__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'fixed__cog--hover', 'xs', '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'fixed__cog--active', 'xs', '.spark-header');
  });

  // Close Menu
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'fixed__close-menu--hover','xs', 'body');
  });

  casper.then(function(){
    processScrollToBottom('', 'fixed__menu--scrolled-to-bottom', 'xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'fixed__close-menu--clicked','xs', 'body');
  });

  // TODO
  // NEED TO ADD SCROLL TO LOCK HEADER IN PLACE
});

loadExample('header--no-logo.html', function() {
  // Default
  screenshot('.spark-header', 'header/no-logo', ['xs', 'sm', 'md', 'lg', 'xl']);

  // Product title
  casper.then(function(){
    processHoverStates('.spark-header__title', 'no-logo__title--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__title', 'no-logo__title--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Top Level Menu
  casper.viewport(1800, 1024);

  var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'no-logo__links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'no-logo__links-' + count + '--active', 'xl', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'no-logo__cog--hover', ['lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'no-logo__cog--active', ['lg', 'xl'], '.spark-header');
  });

  // Sign in
  casper.then(function(){
    processHoverStates('.spark-header__sign-in a', 'no-logo__sign-in--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__sign-in a', 'no-logo__sign-in--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Market Analysis 2nd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) a');
  });

  var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'no-logo__submenu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'no-logo__submenu-links-' + count + '--active', 'xl', 'body');
    }
  });

  // Hamburger Icon
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'no-logo__hamburger--hover','xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'no-logo__hamburger--clicked','xs', 'body');
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'no-logo__links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'no-logo__links-' + count + '--active', 'xs', 'body');
    }
  });

  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) a + button');
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'no-logo__submenu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(2) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'no-logo__submenu-links-' + count + '--active', 'xs', 'body');
    }
  });

  // Close Menu
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'no-logo__close-menu--hover','xs', 'body');
  });

  casper.then(function(){
    processScrollToBottom('', 'no-logo__menu--scrolled-to-bottom', 'xs', 'body');
  });

  // Cog
  casper.then(function(){
    casper.evaluate(function(){
      var el = document.querySelector('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu');
      el.scrollTop = el.scrollHeight;
    });
  });

  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'no-logo__cog--hover', 'xs', 'body');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'no-logo__cog--active', 'xs', 'body');
  });

  casper.then(function(){
    casper.evaluate(function(){
      var el = document.querySelector('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu');
      el.scrollTop = 0;
    });
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'no-logo__close-menu--clicked','xs', 'body');
  });
});

loadExample('header--whitelabel.html', function() {
  // Default
  screenshot('.spark-header', 'header/whitelabel', ['xs', 'sm', 'md', 'lg', 'xl']);

  // Product title
  casper.then(function(){
    processHoverStates('.spark-header__title', 'whitelabel__title--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__title', 'whitelabel__title--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Top Level Menu
  casper.viewport(1800, 1024);

  var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'whitelabel__links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'whitelabel__links-' + count + '--active', 'xl', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'whitelabel__cog--hover', ['lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'whitelabel__cog--active', ['lg', 'xl'], '.spark-header');
  });

  // Sign in
  casper.then(function(){
    processHoverStates('.spark-header__sign-in a', 'whitelabel__sign-in--hover', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__sign-in a', 'whitelabel__sign-in--active', ['xs', 'sm', 'md', 'lg', 'xl'], '.spark-header');
  });

  // Market Analysis 2nd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'whitelabel__submenu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'whitelabel__submenu-links-' + count + '--active', 'xl', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'whitelabel__third-level-menu--hover', 'xl', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'whitelabel__third-level-menu--active', 'xl', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/whitelabel__third-level-menu--clicked', 'xl');
  });

  var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'whitelabel__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  casper.then(function(){
    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'whitelabel__third-level-menu-links-' + count + '--hover', 'xl', 'body');
    }
  });

  // Hamburger Icon
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'whitelabel__hamburger--hover','xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) .spark-header__toggle', 'whitelabel__hamburger--clicked','xs', 'body');
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processHoverStates(el, 'whitelabel__links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numHeaderLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li').length;

    for (var count = 1; count <= numHeaderLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(' + count + ') a';
      processMouseClick(el, 'whitelabel__links-' + count + '--active', 'xs', 'body');
    }
  });

  casper.then(function(){
    casper.mouse.click('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) a + button');
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'whitelabel__submenu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numSubmenuLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > .spark-menu__list-item').length;

    for (var count = 1; count <= numSubmenuLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'whitelabel__submenu-links-' + count + '--active', 'xs', 'body');
    }
  });

  // Market Analysis 3rd Level Menu
  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processHoverStates(el, 'whitelabel__third-level-menu--hover', 'xs', 'body');
  });

  casper.then(function(){
    var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) li .spark-menu__list-expand';
    processActiveStates(el, 'whitelabel__third-level-menu--active', 'xs', 'body');
  });

  casper.then(function(){
    screenshot('body', 'header/whitelabel__third-level-menu--clicked', 'xs');
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processHoverStates(el, 'whitelabel__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  casper.then(function(){
    var numThirdLevelLinks = casper.getElementsInfo('.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li').length;

    for (var count = 1; count <= numThirdLevelLinks; count++) {
      var el = '.spark-header__nav:not(.spark-header__placeholder) > .spark-header__menu > .spark-header__list > li:nth-child(3) > ul ul > li:nth-child(' + count + ') a';
      processMouseClick(el, 'whitelabel__third-level-menu-links-' + count + '--hover', 'xs', 'body');
    }
  });

  // Cog
  casper.then(function(){
    processHoverStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'whitelabel__cog--hover', 'xs', '.spark-header');
  });

  casper.then(function(){
    processActiveStates('.spark-header__menu > .spark-menu__list:not(.spark-header__list) li a', 'whitelabel__cog--active', 'xs', '.spark-header');
  });

  // Close Menu
  casper.then(function(){
    processHoverStates('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'whitelabel__close-menu--hover','xs', 'body');
  });

  casper.then(function(){
    processScrollToBottom('', 'whitelabel__menu--scrolled-to-bottom', 'xs', 'body');
  });

  casper.then(function(){
    processMouseClick('.spark-header__nav:not(.spark-header__placeholder) button[title="Hide Navigation"]', 'whitelabel__close-menu--clicked','xs', 'body');
  });
});

//loadExample('header--in-page.html', function() {
  // This variation not in use
//});

//loadExample('header--xs-title.html', function() {
  // This variation not in use
//});
