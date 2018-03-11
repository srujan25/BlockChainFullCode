var selects = document.querySelectorAll('.spark-select');
for(var i = 0, len = selects.length; i < len; i++) {
  new Spark.SelectInput(selects[i]);
}
