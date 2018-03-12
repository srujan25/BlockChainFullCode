var inputs = document.querySelectorAll('.spark-input');
for(var i = 0, len = inputs.length; i < len; i++) {
  new Spark.TextInput(inputs[i]);
}
