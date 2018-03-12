// $('.spark-tabs').sparkTabs();
var tabs = document.querySelectorAll('.spark-tabs');
for(var i = 0, len = tabs.length; i < len; i++) {
  new Spark.Tabs(tabs[i]);
}
