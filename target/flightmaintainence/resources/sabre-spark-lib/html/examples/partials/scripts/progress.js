var progress = document.querySelectorAll('.spark-progress');
for(var i = 0, len = progress.length; i < len; i++) {
  if (progress[i].querySelector('progress').getAttribute('value') === null) {
    new Spark.ProgressIndicator(progress[i]);
  }
}
