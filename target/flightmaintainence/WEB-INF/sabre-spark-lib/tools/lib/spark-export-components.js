'use strict';

var fs = require('fs');
var sass = require('node-sass');
var path = require('path');
var browserify = require('browserify');
var Readable = require('stream').Readable;
var pkg = require('../../package.json');
var now = new Date();
var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
var bannerCopy = '/* ' + pkg.name + ' - v' + pkg.version + ' - ' + today + ' DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */\n';
var exec = require('child_process').exec;


/**
 * Does a file exist in this repo?
 * @param  {String} path
 * @param  {Boolean} throwError Optional
 * @return {Boolean}
 */
function findFile(path, throwError) {

  var found = false;
  path = __dirname + '/../../' + path;

  try {
    if (fs.openSync(path, 'r')) {
      found = true;
    }
  }
  catch(e) {
    if (throwError) {
      console.log('Could not find the file "' + path + '".');
    }
  }

  return found;
}


/**
 * Make a list of files to import.
 * @param {Array} names
 * @param {String} pathTo
 * @return {String}
 */
function makeSCSSImportList(names, pathTo) {

  var i = 0;
  var len = names.length;
  var ret = '';

  for(; i < len; i++) {
    ret += '@import \'' + (pathTo || '') + names[i] + '\';\n';
  }

  return ret;
}


/**
 * Make a list of JS files to require.
 * @param {Array} names
 * @param {String} pathTo
 * @return {String}
 */
function makeJSRequireList(names, pathTo) {

  var i = 0;
  var len = names.length;
  var ret = 'module.exports = {\n';

  for(; i < len; i++) {
    ret += '\t' + toPascalCase(getComponentName(names[i])) + ': ' + 'require(\'' + (pathTo || '') + names[i] + '\'),\n';
  }

  // Remove the last newline and comma
  ret = ret.slice(0, -2);

  ret += '\n};';

  return ret;
}


/**
 * Get the name of a component.
 * @param {String} path
 * @return {String}
 */
function getComponentName(path) {
  var pieces = path.split('/');
  return pieces[pieces.length - 1];
}


/**
 * Convert a name to Pascal case.
 * @param {String} name
 * @return {String}
 */
function toPascalCase(name) {

  var pieces = name.split('-');
  var ret = '';
  var i = 0;
  var len = pieces.length;

  for (; i < len; i++) {
    ret += pieces[i].charAt(0).toUpperCase() + pieces[i].substr(1);
  }

  return ret;
}


/**
 * Get any SCSS files associated with a component.
 * @param {String} component
 * @param {String} theme Optional
 * @return {Array}
 */
function getSCSS(component, theme) {

  var scss = [];
  var compPath = 'scss/components/' + component + '.scss';
  var themePath = 'scss/themes/' + theme + '/components/' + component + '.scss';

  if (findFile(compPath, true)) {
    scss.push('components/' + component);
  }

  // Find any theme-specific versions of this file
  if (theme && findFile(themePath)) {
    scss.push('themes/' + theme + '/components/' + component);
  }

  return scss;
}


/**
 * Get any JS files associated with a component.
 * @param {String} component
 * @return {Array}
 */
function getJS(component) {

  var js = [];
  var compPath = 'js/dist/components/' + component + '.js';

  if (findFile(compPath)) {
    js.push('components/' + component);
  }

  return js;
}


/**
 * Build the SCSS file to be saved, processed into CSS, or both.
 * @param {Array} imports
 * @param {String} theme
 * @return {String}
 */
function buildSCSS(imports, theme) {

  console.log('Building SCSS.');

  var prepends = [
    'config/index',
    'functions/index',
    'mixins/index',
    'placeholders/index',
    'common/index'
  ];

  if (theme) {
    prepends = prepends.concat([
      'themes/' + theme + '/config/index',
      'themes/' + theme + '/functions/index',
      'themes/' + theme + '/mixins/index',
      'themes/' + theme + '/placeholders/index',
      'themes/' + theme + '/common/index'
    ]);
  }

  return makeSCSSImportList(prepends.concat(imports), 'node_modules/sabre-spark/scss/') + '\n@include flushFontQueue();';
}


/**
 * Build the JS file to be saved.
 * @param {Array} imports
 * @return {Array}
 */
function buildJS(imports) {
  console.log('Building JS.');
  return makeJSRequireList(imports, './js/dist/');
}


/**
 * Save the SCSS and rendered CSS.
 * @param {String} scss
 * @param {String} out
 * @param {Object} params
 */
function saveSCSS(scss, out, params) {

  if (!params.nocss) {
    console.log('Compiling SCSS and saving CSS.');
    saveFile(sass.renderSync({includePaths: [__dirname.replace('tools/lib', '')], data: bannerCopy + '\n' + scss.replace(/(node_modules\/sabre-spark\/)/gi, '')}).css, out, params.cssfilename || params.filename || 'spark.custom.css');
  }

  if (!params.noscss) {
    console.log('Saving SCSS.');
    saveFile(scss, out, params.cssfilename || params.filename || 'spark.custom.scss');
  }
}


/**
 * Save the JS.
 * @param {String} js
 * @param {String} out
 * @param {Object} params
 */
function saveJS(js, out, params) {

  console.log('Compiling and saving JS.');

  var outPath = path.join(out, params.cssfilename || params.filename || 'spark.custom.js');

  var rs = new Readable();
  var ws = fs.createWriteStream(outPath);

  rs.push(bannerCopy);
  rs.push(js);
  rs.push(null);

  var config = {
    entries: rs,
    paths: ['./'],
    standalone: 'Spark'
  };

  browserify(config).bundle().pipe(ws);
}


/**
 * Save a file to the disk.
 * @param {String} content
 * @param {String} out
 * @param {String} filename
 */
function saveFile(content, out, filename) {
  fs.writeFileSync(path.join(out, filename), content, 'utf8');
  console.log('File "' + path.join(out, filename) + '" written successfully.');
}


/**
 * Build a custom SASS or CSS version of Sabre Spark
 * @param  {Array} components
 * @param  {Object} flags      Optional
 */
module.exports = function(components, flags) {

  flags = flags || {};

  var theme = flags.theme || 'light';
  var out = flags.out && flags.out[0].match(/(\\|\/){1,}/) ? flags.out : path.join(process.cwd(), (flags.out || ''));

  var scss = [];
  var js = [];

  console.log('Finding component files.');
  components.forEach((component) => {
    if (!flags.nocss || !flags.noscss) scss = scss.concat(getSCSS(component, theme));
    if (!flags.nojs) js = js.concat(getJS(component));
  });

  if (scss.length) {
    saveSCSS(buildSCSS(scss, flags.theme), out, flags);
  }

  if (js.length) {

    console.log('Compiling JS modules to ES5.');

    exec('npm run compile', function(err) {

      if (err) {
        console.error('JS compile error: ' + err);
        return;
      }

      console.log('JS compiled successfully.');

      saveJS(buildJS(js), out, flags);
    });
  }
};
