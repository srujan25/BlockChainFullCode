/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const addClass = require('../tools/add-class');

function processDefaultStates(name){
  // Default state
  screenshot(function(){
    addClass('main', 'spark-hidden'); // hide container so that height adjustments don't intefere with footer screenshots
  }, '.spark-footer', 'footer/' + name, ['xs', 'sm', 'md', 'lg']);
};

function processLogoStates(){ // Not currently in use
  // Footer logo
  screenshot(function(){
    casper.mouse.move('.spark-footer__logo');
  }, '.spark-footer', 'footer/' + name + '--logo--hover', ['md', 'lg']);

  screenshot(function(){
    casper.mouse.down('.spark-footer__logo');
  }, '.spark-footer', 'footer/' + name + '--logo--active', ['md', 'lg']);

  //Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-footer__logo');
    casper.mouse.move('.spark-footer', 0, 0);
  });
}

function processLinkStates(count, name){
  screenshot(function(){
    casper.mouse.move('.spark-footer__content li:nth-child(' + count + ') a');
  }, '.spark-footer', 'footer/' + name + '-links-' + count + '--hover', ['xs', 'sm', 'md', 'lg']);

  screenshot(function(){
    casper.mouse.down('.spark-footer__content li:nth-child(' + count + ') a');
  }, '.spark-footer', 'footer/' + name + '-links-' + count + '--active', ['xs', 'sm', 'md', 'lg']);

  //Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-footer__content li:nth-child(' + count + ') a');
    casper.mouse.move('.spark-footer', 0, 0);
  });
};

function processSocialLinkStates(count, name){
  screenshot(function(){
    casper.mouse.move('.spark-footer__list--right li:nth-child(' + count + ') a');
  }, '.spark-footer', 'footer/' + name + '-social-links-' + count + '--hover', ['xs', 'sm', 'md', 'lg']);

  screenshot(function(){
    casper.mouse.down('.spark-footer__list--right li:nth-child(' + count + ') a');
  }, '.spark-footer', 'footer/' + name + '-social-links-' + count + '--active', ['xs', 'sm', 'md', 'lg']);

  //Release mousedown
  casper.then(function(){
    casper.mouse.up('.spark-footer__list--right li:nth-child(' + count + ') a');
    casper.mouse.move('.spark-footer', 0, 0);
  });
};


loadExample('footer--short-content.html', function() {
  processDefaultStates('shortcontent');

  var numFooterLinks = casper.getElementsInfo('.spark-footer__content .spark-footer__list li').length;
  for (var count = 1; count <= numFooterLinks; count++) {
    processLinkStates(count, 'shortcontent');
  }

  var numFooterLinks = casper.getElementsInfo('.spark-footer__list--right li').length;
  for (var count = 1; count <= numFooterLinks; count++) {
    processSocialLinkStates(count, 'shortcontent');
  }
});


loadExample('footer--whitelabel.html', function() {
  processDefaultStates('whitelabel');

  var numFooterLinks = casper.getElementsInfo('.spark-footer__content .spark-footer__list li').length;
  for (var count = 1; count <= numFooterLinks; count++) {
    processLinkStates(count, 'whitelabel');
  }

  var numFooterLinks = casper.getElementsInfo('.spark-footer__list--right li').length;
  for (var count = 1; count <= numFooterLinks; count++) {
    processSocialLinkStates(count, 'whitelabel');
  }
});


loadExample('footer.html', function() {
  processDefaultStates('default');

  var numFooterLinks = casper.getElementsInfo('.spark-footer__content .spark-footer__list li').length;
  for (var count = 1; count <= numFooterLinks; count++) {
    processLinkStates(count, 'default');
  }

  var numFooterLinks = casper.getElementsInfo('.spark-footer__list--right li').length;
  for (var count = 1; count <= numFooterLinks; count++) {
    processSocialLinkStates(count, 'default');
  }
});
