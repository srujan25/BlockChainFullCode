var numberSelectors = document.querySelectorAll('.spark-number-selector');
for(var i = 0, len = numberSelectors.length; i < len; i++) {
  if(numberSelectors[i].hasAttribute('data-error')) {
    new Spark.NumberSelector(numberSelectors[i], {
      onChange: function(value, inst) {
        if(value > 0) {
          inst.setErrorState(false);
        }
        else {
          inst.setErrorState(true);
        }
      },
      onInput: function(value, inst) {
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
    new Spark.NumberSelector(numberSelectors[i]);
  }
}
