const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const glob = require('glob');
const es = require('event-stream');
const babel = require('gulp-babel');
const flatten = require('gulp-flatten');
const assign = require('lodash/assign');
const livereload = require('gulp-livereload');
const gulpif = require('gulp-if');
const path = require('path');

const rootName = __dirname.replace('gulp', '');


/**
 * Render the javascript as one file after passing it through babel and browserify.
 * @param {String} name
 * @param {String} out Optional
 * @param {Boolean} watch Optional
 * @param {Boolean} sourceMaps Optional
 * @return {Stream}
 */
function bundle(name, out, watch, sourceMaps) {

  out = out || 'dist';
  watch = watch || false;

  var config = {
    entries: 'js/dist/' + name,
    standalone: 'Spark',
    extensions: ['.js'],
    debug: sourceMaps
  };
  var b;

  if (watch) {
    config = assign({poll: 10}, watchify.args, config);
    config.plugin = [watchify];
    b = browserify(config);
    b.on('update', function() {
      runBundle();
    });
  }
  else {
    b = browserify(config);
  }

  function runBundle() {

    return b.bundle()
      .on('error', onError)
      .pipe(source(name))
      .pipe(buffer())
      .pipe(gulpif(sourceMaps, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(sourceMaps, sourcemaps.write('./')))
      .pipe(gulp.dest(out + '/js'))
      .pipe(gulpif(watch, livereload()));
  }

  function onError(err) {
    console.log('Browserify error: ', err);
  }

  return runBundle();
}

/**
 * Browserify a glob.
 * @param {String} name
 * @param {Function} done
 * @param {String} out Optional
 * @param {Boolean} watch Optional
 * @param {Boolean} sourceMaps Optional
 */
function bundleComponents(name, done, out, watch, sourceMaps) {

  out = out || 'dist';
  watch = watch || false;

  glob(name, (err, files) => {
    if(err) done(err);

    var tasks = files.map(function(entry) {

      var parts = path.parse(entry);
      var name = 'Spark.' + convertName(parts.name);
      var config = {
        entries: [entry],
        exclude: files,
        extensions: ['.js'],
        standalone: name,
        debug: sourceMaps
      };
      var b;

      // DISABLING WATCH FOR COMPONENTS BECAUSE FOR SOME REASON
      // WE CANNOT WATCHIFY TWO BUNDLES WITH THE SAME FILES.
      // if (watch) {
      //   config = assign({}, watchify.args, config);
      //   config.plugin = [watchify];
      //   b = browserify(config);
      //   b.on('update', runBundle);
      // }
      // else {
        b = browserify(config);
      // }

      function runBundle() {

        return b.bundle()
          .on('error', onError)
          .pipe(source(entry))
          .pipe(buffer())
          .pipe(gulpif(sourceMaps, sourcemaps.init({loadMaps: true})))
          .pipe(flatten())
          .pipe(gulpif(sourceMaps, sourcemaps.write('./')))
          .pipe(gulp.dest(out))
          .pipe(gulpif(watch, livereload()));
      }

      function onError(err) {
        console.log('Browserify error: ', err);
      }

      return runBundle();
    });

    es.merge(tasks).on('end', done);
  });

  function convertName(name) {
    var newName = '';
    name.split('-').forEach((p) => {
      newName += p[0].toUpperCase() + p.slice(1);
    });
    return newName;
  }
}

/**
 * Render the javascript as one file after passing it through babel and browserify.
 * @param {Function} done
 * @param {String} out Optional
 * @param {Boolean} watch
 * @param {Boolean} sourceMaps Optional
 * @return {Stream}
 */
function js(done, out, watch, sourceMaps) {
  var js = bundle('spark.js', out, watch, sourceMaps);
  var jquery = bundle('spark.jquery.js', out, watch, sourceMaps);
  return es.merge([js, jquery]).on('end', done);
}

/**
 * Render the javascript as individual components.
 * @param {Function} done
 * @param {String} out  Optional
 * @param {Boolean} watch Optional
 * @param {Boolean} sourceMaps Optional
 */
function jsComponents(done, out, watch, sourceMaps) {
  bundleComponents('js/dist/components/*.js', done, out, watch, sourceMaps);
}

/**
 * Compile ES6 to ES5.
 * @param {String} path
 */
function jsCompile(path, out) {
  return gulp.src(path)
    .pipe(sourcemaps.init())
    .pipe(babel({
      sourceMaps: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js/dist/' + (out || '')));
}

// Dev JS
gulp.task('js', ['js:compile', 'js:components'], (done) => {
  js(done, '.tmp', true, true);
});

// Built JS
gulp.task('js:build', ['js:compile:build', 'js:components:build'], (done) => {
  js(done);
});

// Dev Compile JS
gulp.task('js:compile', () => {
  gulp.watch('js/src/**/*.js', function(e) {
    var file = e.path.replace(rootName, '');
    console.log('Recompiling ' + file + ' with Babel.');
    jsCompile(file, file.replace('js/src/', '').replace(path.basename(file), ''));
  });
  return jsCompile('js/src/**/*');
});

// Build Compile JS
gulp.task('js:compile:build', () => {
  return jsCompile('js/src/**/*');
});

// Dev JS components
gulp.task('js:components', ['js:compile'], (done) => {
  jsComponents(done, '.tmp/js/components', true, true);
});

// Built JS components
gulp.task('js:components:build', ['js:compile:build'], (done) => {
  jsComponents(done, 'dist/js/components', false, true);
});

// Minify built JS and make a copy
gulp.task('js:build:minify', ['js:build'], () => {
  return gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});
