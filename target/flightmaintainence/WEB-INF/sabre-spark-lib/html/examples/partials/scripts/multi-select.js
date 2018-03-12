var selects = document.querySelectorAll('.spark-multi-select');
for(var i = 0, len = selects.length; i < len; i++) {
  new Spark.MultiSelectInput(selects[i]);
}
