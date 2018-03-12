// $('.spark-table').sparkTable();
var table = document.querySelectorAll('.spark-table');
for(var i = 0, len = table.length; i < len; i++) {
  new Spark.Table(table[i]);
}
