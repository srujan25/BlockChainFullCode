var test = require('tape');
var triggerEvent = require('../../../src/helpers/dom/trigger-event');

test('should trigger an event on an element', function(t) {

  var el = document.createElement('div');
  el.addEventListener('change', function(e) {
    t.equal(e.target, el, 'target of the event matches the element it was called upon');
    t.end();
  });
  triggerEvent(el, 'change');
});
