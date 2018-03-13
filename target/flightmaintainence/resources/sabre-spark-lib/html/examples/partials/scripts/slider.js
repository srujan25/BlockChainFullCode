// $('.spark-slider').sparkSlider();
var sliders = document.querySelectorAll('.spark-slider, .spark-slider--input, .spark-slider--integrated');
for(var i = 0, len = sliders.length; i < len; i++) {
  if(sliders[i].hasAttribute('data-error')) {
    new Spark.Slider(sliders[i], {
      onWillChange: function(value, inst) {
        if(value > 0) {
          inst.setErrorState(false);
        }
        else {
          inst.setErrorState(true);
        }
      }
    });
  }
  else {
    new Spark.Slider(sliders[i]);
  }
}
