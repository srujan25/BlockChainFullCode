# Sabre Spark

The Sabre Spark EDL is built using SASS and vanilla Javascript. It is designed as a framework that is easily integrated into Sabre products without adding unnecessary bloat. It provides a set of robust UI components to provide a consistent user experience across Sabre products. These components are designed to be easy to use and help shorten development cycles.

Spark is a mobile-first, responsive CSS and JS library. It has no external dependencies (other than build tools), and is a great starting point for any web application. **It is not a framework**, and can be used with any front end technologies; React, Angular, Backbone or any other SPA frameworks play nicely with Spark.

For more information about Spark, visit [sabrespark.com](http://www.sabrespark.com).

## New In v2.0

Thanks to lots of valuable community feedback, we've expanded on Spark v1's functionality to create a tool that is even more useful for Sabre developers. Version 2.0 brings many exciting, incremental changes to the Spark EDL. These improvements include:

- Load individual components
  - The `dist` directory now includes separate stylesheets and script files for each component. [Read more about how to use these.](#including-components)
- Build custom style sheets and JS bundles
  - The `spark-export-components` CLI tool adds the ability to export custom stylesheets and script bundles for a given set of components. [Read more about how this tool works.](#custom-component-exporter)
- Load only fonts being used
  - The stylesheets output by Spark now only load the fonts needed for a set of components, instead of loading the whole font family up front.

There have been some minor changes to the JS API, CSS class names and HTML structure of some components. A full list of changes is available in the [changelog](./CHANGELOG.md).

## Installing Spark

Available for your consumption are [compiled and minified CSS/JS files](./dist). Alternatively, you can [integrate the SCSS and JS source into your build process](#including-components). 

To get started, simply add Spark as a dependency in your package manager of choice (npm, Bower, etc.), or clone this repository into a Git submodule. 

### Requirements
- node.js >= v4.0.0

### Setup
`npm install && npm install -g gulp`

### Build
`gulp build`

### Develop
`gulp`

### Test
`npm test`

### Test in Browser
`npm start`

## Integrating Spark

How you integrate Spark into your project depends on the technologies you are using. The most basic approach is to include the minified CSS/JS into your project directly. This might look like:

```html
<!doctype html>
<html>
  <head>
    ...
    <link type="text/css" href="node_modules/sabre-spark/dist/css/spark.light.min.css">
    ...
  </head>
  <body>
    ...
    <script src="node_modules/sabre-spark/dist/js/spark.min.js"></script>
    ...
  </body>
</html>
```

### Including components

Spark v2.0 introduced the ability to include individual components into your project. Instead of including all of Spark, it may be useful to load components on an as-needed basis. This might look like:

```html
<!doctype html>
<html>
  <head>
    ...
    <!-- Include common styles for all components: grid, messaging, etc. -->
    <link type="text/css" href="node_modules/sabre-spark/dist/css/components/common.light.css">
    <!-- Include individual components -->
    <link type="text/css" href="node_modules/sabre-spark/dist/css/components/text-input.light.css">
    <link type="text/css" href="node_modules/sabre-spark/dist/css/components/calendar.light.css">
    <link type="text/css" href="node_modules/sabre-spark/dist/css/components/date-input.light.css">
    <link type="text/css" href="node_modules/sabre-spark/dist/css/components/button.light.css">
    ...
  </head>
  <body>
    ...
    <script src="node_modules/sabre-spark/dist/js/components/text-input.js"></script>
    <script src="node_modules/sabre-spark/dist/js/components/calendar.js"></script>
    <script src="node_modules/sabre-spark/dist/js/components/date-input.js"></script>
    ...
  </body>
</html>
```

For more advanced component integration, take a look at the [Custom Component Export Tool](#custom-component-exporter).

### SASS

Spark uses SASS as a CSS preprocessor because it is powerful, stable and widely adopted. The class naming conventions follow the [BEM style](http://www.getbem.com): block, element, modifier.

When using Spark's SASS files in your project, it is recommended you use `node-sass` instead of the `sass` Ruby gem. In addition to being much faster ([by up to 4000%!](http://www.moovweb.com/blog/libsass/)), some features of Spark do not work with older Ruby-based versions of SASS.

#### Using SASS
To use Spark's SASS in your project, simply add the following to your SCSS file:
```scss 
@import 'node_modules/sabre-spark/scss/spark.light';
```

If you want to include individual components into your SCSS, do something like:
```scss
// Load required Spark dependencies
@import 'node_modules/sabre-spark/scss/config/index';
@import 'node_modules/sabre-spark/scss/functions/index';
@import 'node_modules/sabre-spark/scss/mixins/index';
@import 'node_modules/sabre-spark/scss/placeholders/index';
@import 'node_modules/sabre-spark/scss/common/index';
@import 'node_modules/sabre-spark/scss/helpers/index';

// Include components
@import 'node_modules/sabre-spark/scss/components/button';
@import 'node_modules/sabre-spark/scss/components/modal';
@import 'node_modules/sabre-spark/scss/components/slider';
```

#### SASS Themes
Spark is built to accommodate different "themes". While the core of the SASS is the same, each theme can define its own variables to alter colors, font weights, etc. The themes are:
- White Label ([spark.scss](./scss/spark.scss))
- Light ([spark.light.scss](./scss/spark.light.scss))
- Dark (in development)

Although your product may eventually ship with the "White Label" theme, all initial development should use either the Light or Dark theme. When delivering a whitelabel product using Spark, simply replace references to `spark.light.css` or `spark.dark.css` with `spark.whitelabel.css`. If you are using the Spark SASS files directly, replace your `@import /path/to/spark.light;` with `@import /path/to/spark.whitelabel;`.

### Javascript
[View the annotated JS source.](./docs/js/index.html)

Spark's Javascript library powers some of the more complex UI components of Spark. It has no external dependencies and is required if you wish to use the Spark UI components "out of the box".

The code can be included as a compiled and minified file, or individual components can be loaded. Each component supports being exposed in the global namespace (`window.Spark.*`), being loaded as an ES6 module (Babel), a CommonJS module (Browserify, Webpack, etc.), or as an AMD module (RequireJS). There is also a jQuery version of Spark available in `dist/js`.

*SPARK'S JAVASCRIPT MODULES WILL NOT BE INSTANTIATED AUTOMATICALLY*. In order to support a broad range of use cases, the modules do not automatically create instances of themselves when the page loads. For example, a text input would need to be instantiated after the document is ready by using `new Spark.TextInput(document.querySelector('#textinputid'));` or `$('#textinputid').sparkTextInput();`. If you are using a framework like Backbone, Angular or React, instantiating each component can be done on the fly when views are rendered.

Loading an ES6 module would look like this:
```js
import TextInput from 'sabre-spark/js/src/components/text-input';
import DateInput from 'sabre-spark/js/src/components/date-input';
// OR
import {TextInput, DateInput} from 'sabre-spark/js/src/spark';
```

Loading a CommonJS module would look like this:
```js
var TextInput = require('sabre-spark').TextInput;
```

When using with RequireJS, you'll want to path Spark like this:
```js
requirejs.config({
  // ...
  paths: {
    spark: 'node_modules/sabre-spark/dist/js'
  }
});
```

## Testing
All components should be built with both unit and visual regression tests. They should exercise the component as completely as possible to protect against unintended defects later on.

### Unit tests
Spark's unit tests use [Tape](https://github.com/substack/tape) as a test suite and [Zuul](https://github.com/defunctzombie/zuul) as a test runner.

### Visual regression testing
To ensure there are no unintended visual defects, it is crucial to run visual regression tests. This can be done at any time during a project, but is especially important before a release.

To run a regression test, you must first establish a set of "baseline" image for what components _should_ look like when rendered. In most cases, this baseline will be based on the `master` branch or a version branch you are working against.
Running `npm run regression-baseline` will replace any existing baseline images you may have with a new set. **Only run this command while on a branch that is known to be good.**

After a baseline is created, switch to your working branch and run `npm run regression` to compare a new set of images against your baseline. When visual differences are detected, the script will throw warnings and place images in the `html/tests/failures` directory. These images represent all the differences between the baseline and newly created images.

It is important to note that a "failure" may not actually be a failure, but rather an intentional change. It is up to the developer to verify whether differences are purposeful or regression bugs.

Spark's visual regression tests use [CasperJS](http://casperjs.org/) and [PhantomCSS](https://github.com/Huddle/PhantomCSS). The images generated by the visual regression tool are not committed into the source code.

## Tools

### Custom Component Exporter
If you need to generate JS, SCSS and/or CSS files for a custom set of UI components, you can use the `spark-export-components` command line tool. It can output a `.js` file for use globaly or with a package manager, an `.scss` file with `@import` statements for each requested component, or a compiled `.css` file.

#### CLI Usage:
```
spark-export-components [components]
```

#### CLI Example:
```
spark-export-components button expand panel --theme light --out spark.custom
```

#### CLI Options
```
-t, --theme       Name of the theme to use
-o, --out         Output directory
-h, --help        Print usage info
--nojs            Don't output JS for components
--nocss           Don't output CSS for components
--noscss          Don't output SCSS for components
--filename        The name to use for output files
--jsfilename      The name to use for output JS files
--cssfilename     The name to use for output CSS files
```
