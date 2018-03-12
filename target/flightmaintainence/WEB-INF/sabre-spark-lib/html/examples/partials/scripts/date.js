var dates = document.querySelectorAll('.spark-date');
for(var i = 0, len = dates.length; i < len; i++) {
  if(dates[i].hasAttribute('data-error')) {
    new Spark.DateInput(dates[i], {
      onChange: function(value, inst) {
        if(value.length === 10) {
          inst.clearError();
        }
        else {
          inst.setError();
        }
      },
      onInput: function(value, inst) {
        if(value.length === 10) {
          inst.clearError();
        }
        else {
          inst.setError();
        }
      }
    });
  }
  else {
    new Spark.DateInput(dates[i]);
  }
}
