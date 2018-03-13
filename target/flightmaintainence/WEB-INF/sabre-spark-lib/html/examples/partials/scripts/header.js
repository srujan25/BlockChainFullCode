// $('.spark-header').sparkHeader();
var header = document.querySelectorAll('.spark-header');
for(var i = 0, len = header.length; i < len; i++) {
  new Spark.Header(header[i]);
}
