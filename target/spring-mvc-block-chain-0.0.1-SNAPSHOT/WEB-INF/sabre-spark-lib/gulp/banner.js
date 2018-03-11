const gulp = require('gulp');
const header = require('gulp-header');
const bannerCopy = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= today %> DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */\n';
const pkg = require('../package.json');
const now = new Date();
const today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

gulp.task('banner:build', () => {
  return gulp.src('dist/**/*.{css,js}')
    .pipe(header(bannerCopy, {pkg: pkg, today: today}))
    .pipe(gulp.dest('dist'));
});
