const gulp = require('gulp');
const run = require('run-sequence');
const livereload = require('gulp-livereload');

require('./clean');
require('./scss');
require('./js');
require('./html');
require('./images');
require('./server');
require('./banner');
require('./test');

// Watch for changes during dev
gulp.task('watch', ['server'], () => {
  livereload.listen({ basePath: '.tmp' });
  gulp.watch('scss/fonts/**/*', ['fonts']);
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('html/**/*.html', ['examples']);
  gulp.watch('images/**/*', ['images']);
  gulp.watch('html/**/*.js', ['examplesJS']);
  gulp.watch('html/**/*.scss', ['examplesSCSS']);
});

// Dev
gulp.task('tmp', (cb) => {
  run('clean', ['fonts', 'icons', 'scss', 'js', 'examples', 'images'], cb);
});

// Build for release
gulp.task('build', (cb) => {
  run('clean:build', 'scss:build:minify', 'js:build:minify', 'examples:build', 'images:build', 'banner:build', cb);
});

// Default
gulp.task('default', (cb) => {
  run('tmp', 'watch', cb);
});

// Alias build to dist for historical purposes
gulp.task('dist', ['build']);

// Alias dev to default for historical purposes
gulp.task('dev', ['default']);
