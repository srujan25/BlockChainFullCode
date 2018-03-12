const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const livereload = require('gulp-livereload');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/**
 * Use nunjucks to generate fully baked examples.
 * @todo  Need to handle errors in a way that doesn't crash gulp
 * @param  {String} out Optional
 * @return {Stream}
 */
function examples(out, data) {
  out = out || 'dist';
  data = data || {};

  return gulp.src('html/examples/*.html')
    .pipe(nunjucks({
      path: ['html'],
      data: data
    }))
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest(out));
}

/**
 * Render the javascript.
 * @param  {String} out Optional
 * @return {Stream}
 */
function js(out) {

  out = out || 'dist';

  var ret = browserify({
      entries: 'html/examples/assets/js/examples.js',
      extensions: ['.js']
    })
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('examples.js'))
    .pipe(buffer());

  ret.pipe(gulp.dest(out + '/html/examples/assets/js'));

  return ret;
}

/**
 * Render SCSS files.
 * @param  {String} out  Optional
 * @param  {Object} opts Optional
 * @return {Stream}
 */
function scss(out, opts) {

  out = out || 'dist';

  return gulp.src(['html/examples/assets/scss/examples.scss'])
    .pipe(sass(opts || {}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(gulp.dest(out + '/html/examples/assets/css'));
}

/**
 * Copy assets.
 * @param {String} out
 */
function copy(out) {

  out = out || 'dist';

  return gulp.src(['html/examples/assets/**/*', '!html/examples/assets/{js,js/**}', '!html/examples/assets/{scss,scss/**}'])
    .pipe(gulp.dest(out + '/html/examples/assets'));
}

// Dev example JS
gulp.task('examplesJS', () => {
  return js('.tmp').pipe(livereload());
});

// Build example JS
gulp.task('examplesJS:build', () => {
  return js();
});

// Dev example SCSS
gulp.task('examplesSCSS', () => {
  return scss('.tmp').pipe(livereload());
});

// Build example SCSS
gulp.task('examplesSCSS:build', () => {
  return scss();
});

// Dev example copy
gulp.task('examplesCopy', () => {
  return copy('.tmp').pipe(livereload());
});

// Build example copy
gulp.task('examplesCopy:build', () => {
  return copy();
});

// Examples for the docs site
gulp.task('examplesDocs:build', () => {
  return examples('dist/html/components', {layoutName: 'component'});
});

// Dev Examples
gulp.task('examples', ['examplesJS', 'examplesSCSS', 'examplesCopy'], () => {
  return examples('.tmp/html/examples').pipe(livereload());
});

// Built Examples
gulp.task('examples:build', ['examplesJS:build', 'examplesSCSS:build', 'examplesCopy:build', 'examplesDocs:build'], () => {
  return examples('dist/html/examples');
});
