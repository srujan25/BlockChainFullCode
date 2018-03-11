/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

loadExample('messages--error.html', function() {
  screenshot('body', 'messages/error', ['xs', 'lg']);
});

loadExample('messages--info.html', function() {
  screenshot('body', 'messages/info', ['xs', 'lg']);
});

loadExample('messages--success.html', function() {
  screenshot('body', 'messages/success', ['xs', 'lg']);
});

loadExample('messages--warning.html', function() {
  screenshot('body', 'messages/warning', ['xs', 'lg']);
});

// Inline
loadExample('messages-inline--error.html', function() {
  screenshot('body', 'messages/inline-error', ['xs', 'lg']);
});

loadExample('messages-inline--info.html', function() {
  screenshot('body', 'messages/inline-info', ['xs', 'lg']);
});

loadExample('messages-inline--success.html', function() {
  screenshot('body', 'messages/inline-success', ['xs', 'lg']);
});

loadExample('messages-inline--warning.html', function() {
  screenshot('body', 'messages/inline-warning', ['xs', 'lg']);
});
