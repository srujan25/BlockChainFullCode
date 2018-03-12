const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const run = require('run-sequence');
const spawn = require('child_process').spawn;

// Clean for a regression test
gulp.task('visualRegressionClean', () => {
  return del(['html/tests/results/*', 'html/tests/failures/*']);
});

// Clean for a regression baseline
gulp.task('visualRegressionBaselineClean', () => {
  return del(['html/tests/baseline/*']);
});

// Visual regression test
gulp.task('visualRegressionRun', ['visualRegressionClean'], (cb) => {

  var tests = ['html/tests/index.js'];

  var casperChild = spawn('casperjs', ['test'].concat(tests));

  casperChild.stdout.on('data', function (data) {
    gutil.log('CasperJS:', data.toString().slice(0, -1));
  });

  casperChild.stderr.on('data', function (data) {
    gutil.log('CasperJS Error:', data.toString().slice(0, -1));
  });

  casperChild.on('close', function (/*code*/) {
    // var success = code === 0; // Will be 1 in the event of failure
    cb();
  });
});

gulp.task('visualRegression', (cb) => {
  run('tmp', 'regressionServer', 'visualRegressionRun', 'serverStop', function() {
    cb();
    process.exit(0); // @todo: there is a bug with casper or something which doesn't end the process. weird...
  });
});

gulp.task('visualRegressionBaseline', (cb) => {
  run('visualRegressionBaselineClean', 'tmp', 'regressionServer', 'visualRegressionRun', 'serverStop', function(){
    cb();
    process.exit(0); // @todo: there is a bug with casper or something which doesn't end the process. weird...
  });
});
