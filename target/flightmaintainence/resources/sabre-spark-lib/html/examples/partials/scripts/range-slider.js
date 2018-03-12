var rangeSliders = document.querySelectorAll('.spark-range-slider');
for(var i = 0, len = rangeSliders.length; i < len; i++) {
  new Spark.RangeSlider(rangeSliders[i]);
}
