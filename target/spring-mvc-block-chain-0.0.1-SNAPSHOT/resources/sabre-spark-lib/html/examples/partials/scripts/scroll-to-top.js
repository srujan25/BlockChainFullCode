var scrolls = document.querySelectorAll('.spark-scroll-to-top');
for(var i = 0, len = scrolls.length; i < len; i++) {
  new Spark.ScrollToTop(scrolls[i]);
}
