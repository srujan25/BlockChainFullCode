const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const insert = require('gulp-insert');
const es = require('event-stream');
const fs = require('fs');


/**
 * Make a list of files to import.
 * @param {Array} names
 * @return {String}
 */
function makeImportList(names) {

  var i = 0;
  var len = names.length;
  var ret = '';

  for(; i < len; i++) {
    ret += '@import \'' + names[i] + '\';\n';
  }

  return ret;
}

/*
 * Copy fonts
 * @param  {String} out Optional
 * @return {Stream}
 */
function fonts(out) {
  out = out || 'dist';
  return gulp.src('scss/fonts/**/*')
    .pipe(gulp.dest(out + '/css/fonts'));
}

/*
 * Copy icon fonts
 * @param  {String} out Optional
 * @return {Stream}
 */
function icons(out) {
  out = out || 'dist';
  return gulp.src('icons/build/fonts/**/*')
    .pipe(gulp.dest(out + '/css/fonts/spark'));
}

/**
 * Render SCSS files
 * @param  {Array} files
 * @param  {Object} opts Optional
 * @return {Stream}
 */
function scss(files, opts) {

  var out = opts.out || 'dist';
  var streams = [];
  var prepend = (opts.prepend instanceof Array ? makeImportList(opts.prepend) : opts.prepend) || '';
  var append = (opts.append instanceof Array ? makeImportList(opts.append) : opts.append) || '';

  function run(file) {

    var newName;
    var nameConfig = {};
    var filePrepend = '';
    var fileAppend = '';

    if (typeof file === 'object') {
      newName = file.rename;
      file = file.path;
      filePrepend = (file.prepend && makeImportList(file.prepend)) || '';
      fileAppend = (file.append && makeImportList(file.append)) || '';
    }

    if (newName) {
      nameConfig.basename = newName;
    }

    if (opts.theme) {
      nameConfig.suffix = '.' + opts.theme;
    }

    return gulp.src(file)
      .pipe(insert.transform(function(contents, file) {

        // Find any theme-specific versions of this file
        if (opts.theme) {
          file.path = file.path.replace(/\\/g, '/');
          var name = file.path.slice(file.path.indexOf('/scss/') + 6);
          var themePath = file.path.replace('/scss/', '/scss/themes/' + opts.theme + '/');
          try {
            if (fs.openSync(themePath, 'r')) {
              fileAppend += makeImportList(['../themes/' + opts.theme + '/' + name]);
            }
          }
          catch(e) {
            //
          }
        }

        // Prepend and append.
        return prepend + filePrepend + contents + append + fileAppend;
      }))
      .pipe(rename(nameConfig))
      .pipe(sass(opts || {}).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 3 versions']
      }))
      .pipe(gulp.dest(out));
  }

  files.forEach((file) => {
    streams.push(run(file));
  });

  return es.merge(streams);
}

/**
 * Render components.
 */
function scssComponents(opts) {

  opts = opts || {};
  var themes = ['light', 'whitelabel'];
  var streams = [];

  themes.forEach((theme) => {
    streams.push(scss([{
      path: 'scss/components/[^_]*.scss'
    }, {
      path: 'scss/common/index.scss',
      rename: 'common'
    }, {
      path: 'scss/helpers/index.scss',
      rename: 'helpers'
    }],{
      out: opts.out,
      theme: theme,
      prepend: ['../config/index', '../functions/index', '../mixins/index', '../placeholders/index', '../themes/' + theme + '/config/index', '../themes/' + theme + '/functions/index', '../themes/' + theme + '/mixins/index', '../themes/' + theme + '/placeholders/index'],
      append: '@include flushFontQueue();'
    }));
  });

  return es.merge(streams);
}


// Dev fonts
gulp.task('fonts', () => {
  return fonts('.tmp').pipe(livereload());
});

// Built fonts
gulp.task('fonts:build', () => {
  return fonts();
});

// Dev icons
gulp.task('icons', () => {
  return icons('.tmp').pipe(livereload());
});

// Built icons
gulp.task('icons:build', () => {
  return icons();
});

// Dev scss
gulp.task('scss', () => {
  return scss(['scss/[^_]*.scss'], {out: '.tmp/css'}).pipe(livereload());
});

// Build scss
gulp.task('scss:build', ['scss:components:build', 'fonts:build', 'icons:build'], () => {
  return scss(['scss/[^_]*.scss'], {out: 'dist/css'});
});

// Dev components
gulp.task('scss:components', () => {
  return scssComponents({
    out: '.tmp/css/components'
  }).pipe(livereload());
});

// Build components
gulp.task('scss:components:build', () => {
  return scssComponents({
    out: 'dist/css/components'
  });
});

// Minify built CSS and make a copy
gulp.task('scss:build:minify', ['scss:build'], () => {
  return gulp.src('dist/**/*.css')
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});
