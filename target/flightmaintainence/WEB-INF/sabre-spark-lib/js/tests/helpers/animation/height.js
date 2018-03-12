var test = require('tape');
var animateHeight = require('../../../src/helpers/animation/height');

var markup = '<p>some body copy</p><a class="spark-expand__toggle">Toggle Button</a>';

test('should animate the height of a container based on showing a child', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  animateHeight({
    el: el,
    toggleEl: '.spark-expand__toggle'
  });

  // @todo: need to check the height
  t.end();
});

test('should accept optional arguments and animate the height of a container based on showing a child', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;

  animateHeight({
    el: el,
    toggleEl: el.querySelector('.spark-expand__toggle'),
    action: 'collapse',
    heightAnimationClass: 'animating-height',
    toggleProperty: 'overflow',
    toggleValue: 'hidden',
    onComplete: function() {
      t.end();
    }
  });
});
