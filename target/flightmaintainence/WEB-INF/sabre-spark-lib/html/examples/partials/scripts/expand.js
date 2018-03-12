// $('[data-role="expand"]').sparkExpand();
var expands = document.querySelectorAll('.spark-expand, .spark-panel--expand');
for(var i = 0, len = expands.length; i < len; i++) {
  new Spark.Expand(expands[i]);
}
