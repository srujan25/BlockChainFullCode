const gulp = require('gulp');
const del = require('del');

// Dev clean
gulp.task('clean', () => {
  return del(['.tmp']);
});

// Build clean
gulp.task('clean:build', () => {
  return del(['dist']);
});
