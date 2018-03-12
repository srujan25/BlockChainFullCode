/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processHeroCarouselStates(selector, name) {
  // Default
  screenshot(selector, 'carousel/' + name + '', ['xs','sm','md','lg']);

  // Hover over entire carousel
  screenshot(function() {
    casper.mouse.move('.spark-carousel');
  }, selector, 'carousel/' + name + '--hovered', ['xs','sm','md','lg']);

  // Advance to second item and hover over pause button
  screenshot(function() {
    casper.click('.spark-carousel__dots div:nth-child(2)');
    casper.waitForSelector('.spark-carousel__dots div:nth-child(2)', function() {
      casper.mouse.move('.spark-carousel__pause');
    });
  }, selector, 'carousel/' + name + '__pause-button--hovered', ['xs','sm','md','lg']);

  // Hover over play button
  screenshot(function() {
    casper.click('.spark-carousel__pause');
    casper.mouse.move('.spark-carousel__pause');
  }, selector, 'carousel/' + name + '__play-button--hovered', ['xs','sm','md','lg']);

  // Hover over navigation arrow
  screenshot(function() {
    casper.mouse.move('.spark-carousel__forward');
  }, selector, 'carousel/' + name + '__nav-arrow--hovered', ['xs','sm','md','lg']);
}

// Carousel Hero Light
loadExample('carousel--hero-light.html', function() {
  processHeroCarouselStates('.spark-carousel', 'carousel--hero-light');
});

// Carousel Hero Dark
loadExample('carousel--hero-dark.html', function() {
  processHeroCarouselStates('.spark-carousel', 'carousel--hero-dark');
});

// Default Carousel
loadExample('carousel.html', function() {
  screenshot('.spark-carousel', 'carousel/default', ['xs','sm','md','lg']);
});

// Carousel Small
loadExample('carousel--small.html', function() {
  // Advance to second item to show all available controls
  screenshot(function() {
    casper.click('.spark-carousel__dots div:nth-child(2)');
  }, '.spark-carousel', 'carousel/carousel-small', ['xs','sm','md','lg']);
});

// Panel Carousel
loadExample('carousel--panel.html', function() {
  screenshot('.spark-carousel', 'carousel/carousel--panel', ['xs','sm','md','lg']);
});

// KPI Carousel
loadExample('carousel--kpi.html', function() {
  screenshot('.spark-carousel', 'carousel/carousel--kpi', ['xs','sm','md','lg']);
});
