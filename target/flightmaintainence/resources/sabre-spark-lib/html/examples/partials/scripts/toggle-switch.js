var toggleSwitch = document.querySelectorAll('.spark-toggle-switch');
for(i = toggleSwitch.length - 1; i >= 0; i--) {
  new Spark.ToggleSwitch(toggleSwitch[i]);
}
