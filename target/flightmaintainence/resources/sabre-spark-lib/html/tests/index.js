/* global casper */

casper.test.begin('Sabre Spark Visual Tests', function(t) {

  var phantom = require('./phantom');

  casper.on('remote.message', function(msg) {
    this.echo(msg);
  });

  casper.on('error', function(err) {
    this.die('PhantomJS has errored: ' + err);
  });

  casper.on('resource.error', function(err) {
    casper.log('Resource load error: ' + err, 'warning');
  });

  casper.start('http://localhost:8585');

  // Adjust viewport size
  casper.viewport(1280, 1024);

  // Load individual tests
  require('./components');

  // Compare screenshots
  casper.then(function() {
    phantom.compareAll();
  });

  // Run!
  casper.run(function() {

    // Have to give casper one assert or it wigs for some reason.
    // @todo: whut?
    t.assert(true);

    // All done!
    t.done();
    casper.test.done();
  });
});
