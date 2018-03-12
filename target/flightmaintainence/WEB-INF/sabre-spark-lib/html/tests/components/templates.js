/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('template__single-panel--side-menu.html', function() {
  screenshot('body', 'templates/single-panel--side-menu', ['xs', 'sm', 'md', 'lg', 'xl']);
});

loadExample('template__single-panel.html', function() {
  screenshot('body', 'templates/single-panel', ['xs', 'sm', 'md', 'lg', 'xl']);
});

loadExample('template__tab-panel--side-menu.html', function() {
  screenshot('body', 'templates/tab-panel--side-menu', ['xs', 'sm', 'md', 'lg', 'xl']);
});

loadExample('template__tab-panel.html', function() {
  screenshot('body', 'templates/tab-panel', ['xs', 'sm', 'md', 'lg', 'xl']);
});

loadExample('template__filter-layout-single-panel.html', function() {
  screenshot('body', 'templates/filter--single-panel', ['xs', 'sm', 'md', 'lg', 'xl']);
});

loadExample('template__form-layout-single-panel--side-menu.html', function() {
  screenshot('body', 'templates/form--single-panel--side-menu', ['xs', 'sm', 'md', 'lg', 'xl']);
});

loadExample('template__form-layout-single-panel.html', function() {
  screenshot('body', 'templates/form--single-panel', ['xs', 'sm', 'md', 'lg', 'xl']);
});

loadExample('template__form-layout-tab-panel.html', function() {
  screenshot('body', 'templates/form--tab-panel', ['xs', 'sm', 'md', 'lg', 'xl']);
});
