/* global casper */
const loadExample = require('../tools/load-example');
const screenshot = require('../tools/screenshot');

function processSliderHandleStates(el, name) {
  screenshot(function(){
      casper.mouse.move(el);
  }, 'body', 'slider/' + name + '__handle--hover', 'sm');

  casper.then(function(){
    screenshot(function(){
        casper.mouse.down(el);
    }, 'body', 'slider/' + name + '__handle--active', 'sm');
  });

  casper.then(function(){
    casper.mouse.up(el);
  });
}

function processSliderTrackClick(x, y, name) {
  screenshot(function(){
      casper.mouse.click(x, y);
  }, 'body', 'slider/' + name + '__track--clicked', 'sm');
}

loadExample('slider.html', function() {
  screenshot('body', 'slider/default', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle', 'default');

  processSliderTrackClick(100, 131, 'default');
});

loadExample('slider--with-value--integrated.html', function() {
  screenshot('body', 'slider/with-value-integrated', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle', 'with-value-integrated');

  processSliderTrackClick(50, 149, 'with-value-integrated');
});

loadExample('slider--with-value--integrated--secondary.html', function() {
  screenshot('body', 'slider/with-value-integrated__secondary', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle', 'with-value-integrated__secondary');

  processSliderTrackClick(50, 149, 'with-value-integrated__secondary');
});

loadExample('slider--multiple.html', function() {
  screenshot('body', 'slider/multiple', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle:nth-child(1)', 'multiple__first');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle:nth-child(2)', 'multiple__second');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Start"]').value = '5';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Start"]').dispatchEvent(new Event('change'));

      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="End"]').value = '25';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="End"]').dispatchEvent(new Event('change'));
    });
  });

  casper.then(function(){
    screenshot('body', 'slider/multiple--with-value-edited', 'sm');
  });
});

loadExample('slider--secondary.html', function() {
  screenshot('body', 'slider/secondary', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle', 'secondary');

  processSliderTrackClick(100, 131, 'secondary');
});

loadExample('slider--with-value--input.html', function() {
  screenshot('body', 'slider/with-value__input', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle', 'with-value__input');

  processSliderTrackClick(100, 131, 'with-value__input');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input').value = '20';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input').dispatchEvent(new Event('change'));
    });
  });

  casper.then(function(){
    screenshot('body', 'slider/with-value__input--edited', 'sm');
  });
});

loadExample('slider--multiple--secondary.html', function() {
  screenshot('body', 'slider/multiple-secondary', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle:nth-child(1)', 'multiple-secondary__first');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle:nth-child(2)', 'multiple-secondary__second');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Start"]').value = '5';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Start"]').dispatchEvent(new Event('change'));

      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="End"]').value = '25';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="End"]').dispatchEvent(new Event('change'));
    });
  });

  casper.then(function(){
    screenshot('body', 'slider/multiple-secondary--with-value-edited', 'sm');
  });
});

loadExample('slider--multiple--range.html', function() {
  screenshot('body', 'slider/multiple-range', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle:nth-child(1)', 'multiple-range__first');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle:nth-child(2)', 'multiple-range__second');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle:nth-child(3)', 'multiple-range__third');

  casper.then(function(){
    casper.evaluate(function() {
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Start"]').value = '5';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Start"]').dispatchEvent(new Event('change'));

      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Middle"]').value = '15';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="Middle"]').dispatchEvent(new Event('change'));

      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="End"]').value = '30';
      document.querySelector('.spark-margin-bottom--lg:nth-child(2) input[title="End"]').dispatchEvent(new Event('change'));
    });
  });

  casper.then(function(){
    screenshot('body', 'slider/multiple-range--with-value-edited', 'sm');
  });
});

loadExample('slider--error.html', function() {
  screenshot('body', 'slider/error', 'sm');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(1) .spark-slider__handle', 'error');

  processSliderTrackClick(100, 47, 'error');

  processSliderHandleStates('.spark-margin-bottom--lg:nth-child(2) .spark-slider__handle', 'error');

  processSliderTrackClick(245, 137, 'error');
});
