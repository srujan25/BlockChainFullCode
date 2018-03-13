var stepIndicators = document.querySelectorAll('.spark-step-indicator');
for (var i = 0, len = stepIndicators.length; i < len; i++) {
  new Spark.StepIndicator(stepIndicators[i]);
}
