/* global casper */

module.exports = function() {

  // Remove stylesheet picker
  if (casper.exists('.stylesheet-picker')) {
    casper.evaluate(function() {
      var picker = document.querySelector('.stylesheet-picker');
      if (picker) {
        picker.parentNode.removeChild(picker);
      }
    });
  }
};
