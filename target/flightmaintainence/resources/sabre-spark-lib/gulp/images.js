const gulp = require('gulp');
const livereload = require('gulp-livereload');

/**
 * Copy assets.
 * @param {String} out
 */
function copy(out) {

  out = out || 'dist';

  return gulp.src(['images/**/*'])
    .pipe(gulp.dest(out + '/images'));
}

// Dev image copy
gulp.task('images', () => {
  return copy('.tmp').pipe(livereload());
});

// Build image copy
gulp.task('images:build', () => {
  return copy();
});
