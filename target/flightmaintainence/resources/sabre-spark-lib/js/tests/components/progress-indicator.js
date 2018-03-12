var test = require('tape');
var ProgressIndicator = require('../../src/components/progress-indicator');

var markupDeterminate = '<div class="spark-progress spark-progress--integrated spark-progress--lg" role="progressbar"><progress value="0"></progress><span class="spark-progress__text"><span class="spark-progress__value" role="status">0%</span><ul class="spark-progress__states" role="note"><li data-value="0" class="active">Applying Policy Rules</li><li data-value="20">Sorting Options</li><li data-value="40">Generating Jobs</li><li data-value="60">Perturbing Matrices</li><li data-value="80">Reticulating Splines</li><li data-value="100">All done!</li></ul></span><span class="spark-progress__meter"></span></div>';
var markupIndeterminate = '<div class="spark-progress spark-progress--integrated spark-progress--lg" role="progressbar"><progress></progress><span class="spark-progress__text" role="status">Fetching stuff</span><span class="spark-progress__meter"></span></div>';

test('should create a determinate progress indicator component', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupDeterminate;

  var meterEl = el.querySelector('.spark-progress__meter');

  var inst = new ProgressIndicator(el);

  t.notEqual(inst.meterEl, meterEl, 'meter element replaced with SVG');

  t.end();
});

test('should create an indeterminate progress indicator component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markupIndeterminate;
  new ProgressIndicator(el);
  t.end();
});

test('should set the value on a determinate loader', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupDeterminate;
  var inst = new ProgressIndicator(el);

  inst.set(0.23);

  t.equal(inst.value, 0.23, 'value set successfully');
  t.equal(inst.progressEl.value, 0.23, 'progress element value set successfully');

  t.end();
});

test('should update to use a new progress indicator component', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupIndeterminate;
  var inst = new ProgressIndicator(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
