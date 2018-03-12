var popovers = document.querySelectorAll('.spark-popover');
for(var i = 0, len = popovers.length; i < len; i++) {
  new Spark.Popover(popovers[i]);
}
