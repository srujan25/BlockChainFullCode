/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');
const setAttr = require('../tools/set-attribute');
const removeAttr = require('../tools/set-attribute');
const setContent = require('../tools/set-content');
const addClass = require('../tools/add-class');

loadExample('text-input.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/default', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/default--hovered', 'md');

  // Focused
  // Focus state not available due to bug in PhantomJS

  // With text
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'AnDy');
    addClass('.spark-input', 'active');
  }, '.spark-input', 'text-input/default--with-text', 'md');
});


loadExample('text-input--password.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/password', 'md');

  // With invalid message
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'pass');
    setAttr('.spark-input', 'data-error', true);
    setContent('.spark-input__message', '6-10 characters required');
  }, '.spark-input', 'text-input/password--error-messages', 'md');

  // With warning message
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'word');
    removeAttr('.spark-input', 'data-error', true);
    setAttr('.spark-input', 'data-warning', true);
    setContent('.spark-input__message', '10 characters recommended for increased security');
  }, '.spark-input', 'text-input/password--warning-messages', 'md');

  // With success message
  screenshot(function() {
    casper.sendKeys('.spark-input__field', '&9bdY');
    removeAttr('.spark-input', 'data-warning', true);
    setAttr('.spark-input', 'data-success', true);
    setContent('.spark-input__message', 'Your password meets the requirements');
  }, '.spark-input', 'text-input/password--success-messages', 'md');

  // With message and hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/password-with--message-and-hover', 'md');
});


loadExample('text-input--character-count.html', function() {
  screenshot('.spark-input', 'text-input/character-count', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/character-count--hovered', 'md');

  // With text to simulate text entry and adjust character counter
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'AnDy');
  }, '.spark-input', 'text-input/character-count--with-text', 'md');
});


loadExample('text-input--disabled.html', function() {
  screenshot('.spark-input', 'text-input/disabled', 'md');

  // Hovered - Should not have any hover states
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/disabled--hovered', 'md');
});


loadExample('text-input--email.html', function() {
  // Default (includes error state)
  screenshot('.spark-input', 'text-input/email', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/email--hovered', 'md');

  // With correct email address entered
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'AnDy@gmail.com');
  }, '.spark-input', 'text-input/email--valid-email', 'md');
});


loadExample('text-input--hard-character-count.html', function() {
  // This test uses the lg breakpoint to have a screenshot that doesn't have the text cut off
  // Default
  screenshot('.spark-input', 'text-input/hard-character-count', 'lg');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/hard-character-count--hovered', 'lg');

  // With valid text count
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'AnDy');
  }, '.spark-input', 'text-input/hard-character-count--valid-text', 'lg');

  // With invalid text count
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'This is a single line of text that will contain one hundred and forty one characters to test whether the text input field correctly responds', {reset: true});
  }, '.spark-input', 'text-input/hard-character-count--invalid-text', 'lg');
});


loadExample('text-input--multiple-line.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/multiple-line', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/multiple-line--hovered', 'md');

  // With valid text count
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'AnDy');
  }, '.spark-input', 'text-input/multiple-line--valid-text', 'md');

  // With invalid text count
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'This is a single line of text that will contain over one hundred and forty characters to test whether the text input field correctly responds and whether the text will wrap into multiple lines.', {reset: true});
  }, '.spark-input', 'text-input/multiple-line--invalid-text', 'md');
});


loadExample('text-input--typeahead-social-security.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/typeahead-social-security', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/typeahead-social-security--hovered', 'md');

  // With valid text count
  screenshot(function() {
    casper.sendKeys('.spark-input__field', '123456789', {reset: true});
  }, '.spark-input', 'text-input/typeahead-social-security--valid-text', 'md');

  // With invalid text count - should display 012345678
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'abc0123456780123', {reset: true});
  }, '.spark-input', 'text-input/typeahead-social-security--invalid-text', 'md');
});


loadExample('text-input--typeahead.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/typeahead-phone-number', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/typeahead-phone-number--hovered', 'md');

  // With valid text count
  screenshot(function() {
    casper.sendKeys('.spark-input__field', '1123456789', {reset: true});
  }, '.spark-input', 'text-input/typeahead-phone-number--valid-text', 'md');

  // With invalid text count - should display 1234567890
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'abc1234567890', {reset: true});
  }, '.spark-input', 'text-input/typeahead-phone-number--invalid-text', 'md');
});


loadExample('text-input--variable-height-character-count.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/variable-height-character-count', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/variable-height-character-count--hovered', 'md');

  // With valid text count
  screenshot(function() {
    addClass('.spark-input', 'active');
    casper.sendKeys('.spark-input__field', 'AnDy');
  }, '.spark-input', 'text-input/variable-height-character-count--valid-text', 'md');

  // With invalid text count
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'This is a single line of text that will contain over one hundred and forty characters to test whether the text input field correctly responds and whether the text will wrap into multiple lines.', {reset: true});
  }, '.spark-input', 'text-input/variable-height-character-count--invalid-text', 'md');
});


loadExample('text-input--with-icon.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/icon', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/icon--hovered', 'md');

  // Focused
  // Focus state not available due to bug in PhantomJS

  // With text
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'AnDy');
  }, '.spark-input', 'text-input/icon--with-text', 'md');
});


loadExample('text-input--with-optional.html', function() {
  // Default
  screenshot('.spark-input', 'text-input/optional', 'md');

  // Hovered
  screenshot(function() {
    casper.mouse.move('.spark-input');
  }, '.spark-input', 'text-input/optional--hovered', 'md');

  // Focused
  // Focus state not available due to bug in PhantomJS

  // With text
  screenshot(function() {
    casper.sendKeys('.spark-input__field', 'AnDy');
  }, '.spark-input', 'text-input/optional--with-text', 'md');
});
