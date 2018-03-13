// $('.spark-menu:not(.spark-header__menu)').sparkMenu();
var menu = document.querySelectorAll('.spark-menu:not(.spark-header__menu)');
for(var i = 0, len = menu.length; i < len; i++) {
  new Spark.Menu(menu[i]);
}
