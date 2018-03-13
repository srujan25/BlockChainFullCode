// $('[data-modal]').sparkModal();
var modal = document.querySelectorAll('[data-modal]');
for(var i = 0, len = modal.length; i < len; i++) {
  new Spark.Modal(modal[i]);
}
