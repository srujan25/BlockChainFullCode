var gulp = require('gulp');
var connect = require('gulp-connect');

// Launch a server for development
gulp.task('server', () => {
  connect.server({
    root: '.tmp',
    port: 8000
  });
});

// Launch a server for development
gulp.task('regressionServer', () => {
  connect.server({
    root: '.tmp',
    port: 8585
  });
});

// Stop a server
gulp.task('serverStop', () => {
  connect.serverClose();
});
