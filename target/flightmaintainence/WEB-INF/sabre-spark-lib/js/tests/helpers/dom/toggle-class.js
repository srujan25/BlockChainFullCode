var test = require('tape');
var toggleClass = require('../../../src/helpers/dom/toggle-class');

test('should toggle the class on an element', function(t) {

  var el = document.createElement('div');

  t.ok(el.className.indexOf('test-class') === -1, 'does not have a class set at first');
  toggleClass(el, 'test-class', true);
  t.ok(el.className.indexOf('test-class') !== -1, 'adds the test class');
  toggleClass(el, 'test-class', true);
  t.ok(el.className.match(/test\-class/gi).length === 1, 'doesn\'t add the test class more than once');
  toggleClass(el, 'test-class', false);
  t.ok(el.className.indexOf('test-class') === -1, 'removes the test class');

  el.innerHTML = '<span></span><span></span>';
  var spans = el.querySelectorAll('span');

  toggleClass(spans, 'span-test-class', true);

  for (var j = 0; j < spans.length; j++) {
    t.ok(spans[j].className.indexOf('span-test-class') !== -1, 'adds the span test class to item ' + (j + 1) + '/' + spans.length + ' in a list of nodes');
  }

  var spansArr = [document.createElement('span'), document.createElement('span')];

  toggleClass(spansArr, 'span-test-class', true);

  for (j = 0; j < spansArr.length; j++) {
    t.ok(spansArr[j].className.indexOf('span-test-class') !== -1, 'adds the span test class to item ' + (j + 1) + '/' + spansArr.length + ' in an array of elements');
  }

  t.end();
});
