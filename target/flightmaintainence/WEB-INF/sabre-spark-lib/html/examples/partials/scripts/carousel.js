window.addEventListener('load', function() {
  var carousels = document.querySelectorAll('.spark-carousel');
  for (var i = 0, len = carousels.length; i < len; i++) {
    carousels[i].test = new Spark.Carousel(carousels[i]);
  }
});
