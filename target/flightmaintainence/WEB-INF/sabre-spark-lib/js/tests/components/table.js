var test = require('tape');
var Table = require('../../src/components/table');
var noop = function() {};

var markup = '<header class="spark-table__header"><h4 class="spark-table__title">Table</h4></header><div class="spark-table__scroll"><table role="grid"><thead><tr><th class="spark-table__select-all"><label class="spark-checkbox"><input type="checkbox" class="spark-checkbox__input"><span class="spark-checkbox__box"></span></label></th><th class="spark-text-center">Icon</th></tr></thead><tbody><tr><td><label class="spark-checkbox"><input type="checkbox" class="spark-checkbox__input"><span class="spark-checkbox__box"></span></label></td><td>DL0431</td></tr><tr><td><label class="spark-checkbox"><input type="checkbox" class="spark-checkbox__input"><span class="spark-checkbox__box"></span></label></td><td>AA1321</td></tr></tbody></table></div>';
var markupEditRows = '<header class="spark-table__header"><h4 class="spark-table__title">Table</h4></header><div class="spark-table__scroll"><table role="grid"><thead><tr><th class="spark-table__select-all"><label class="spark-checkbox"><input type="checkbox" class="spark-checkbox__input"><span class="spark-checkbox__box"></span></label></th><th class="spark-text-center">Icon</th></tr></thead><tbody><tr id="firstRow"><td><label class="spark-checkbox"><input type="checkbox" class="spark-checkbox__input"><span class="spark-checkbox__box"></span></label></td><td><input value="DL0431"></td></tr><tr id="lastRow"><td><label class="spark-checkbox"><input type="checkbox" class="spark-checkbox__input"><span class="spark-checkbox__box"></span></label></td><td><input value="AA1321"></td></tr></tbody></table></div>';

test('should create table component', function(t) {
  var el = document.createElement('div');
  el.innerHTML = markup;
  new Table(el);
  t.end();
});

test('should handle click events', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new Table(el);

  inst._onClick({
    target: el.querySelector('.spark-table__select-all'),
    preventDefault: noop,
    stopPropagation: noop
  });
  t.equal(el.querySelectorAll('tr.active').length, 2, 'all rows become checked');

  inst._onClick({
    target: el.querySelector('.spark-table__select-all'),
    preventDefault: noop,
    stopPropagation: noop
  });
  t.equal(el.querySelectorAll('tr.active').length, 0, 'all rows become unchecked');

  inst._onClick({
    target: el.querySelector('tbody tr'),
    preventDefault: noop,
    stopPropagation: noop
  });
  t.equal(el.querySelectorAll('tbody tr.active').length, 1, 'row becomes checked');

  inst._onClick({
    target: el.querySelector('tbody tr'),
    preventDefault: noop,
    stopPropagation: noop
  });
  t.equal(el.querySelectorAll('tbody tr.active').length, 0, 'row becomes unchecked');

  t.end();
});

test('should take an onRowSave callback', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupEditRows;

  var lastRow = el.querySelector('#lastRow');

  var inst = new Table(el, {
    onRowSave: function(index, el) {
      t.equal(index, 1, 'indexed passed is correct');
      t.equal(lastRow, el, 'element passed is correct');
      t.end();
    }
  });

  inst._saveRow(lastRow);
});

test('should take an onRowDelete callback', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupEditRows;

  var lastRow = el.querySelector('#lastRow');

  var inst = new Table(el, {
    onRowDelete: function(index, el) {
      t.equal(index, 1, 'indexed passed is correct');
      t.equal(lastRow, el, 'element passed is correct');
      t.end();
    }
  });

  inst._deleteRow(lastRow);
});

test('should enable and disable a cell', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupEditRows;
  var inputs = el.querySelectorAll('input:not([type=checkbox])');

  var inst = new Table(el);

  inst.disableCell(inputs[0]);

  t.ok(inputs[0].disabled, 'input is disabled');
  t.equal(inputs[0].parentNode.className, 'spark-table__disabled-cell', 'parent gets a disabled class');

  inst.enableCell(inputs[0]);

  t.notOk(inputs[0].disabled, 'input is enabled');
  t.equal(inputs[0].parentNode.className, '', 'parent loses a disabled class');

  t.end();
});

test('should enable and disable a row', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupEditRows;
  var inputs = el.querySelectorAll('input:not([type=checkbox])');
  var rows = el.querySelectorAll('tbody tr');

  var inst = new Table(el);

  inst.disableRow(rows[0]);

  t.ok(inputs[0].disabled, 'input is disabled');
  t.equal(rows[0].className, 'spark-table__disabled-row', 'parent gets a disabled class');

  inst.enableRow(rows[0]);

  t.notOk(inputs[0].disabled, 'input is enabled');
  t.equal(rows[0].className, '', 'parent loses a disabled class');

  t.end();
});

test('should enable and disable a column', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markupEditRows;
  var inputs = el.querySelectorAll('input:not([type=checkbox])');
  var columns = el.querySelectorAll('thead th');

  var inst = new Table(el);

  inst.disableColumn(columns[1]);

  t.ok(inputs[0].disabled, 'input is disabled');
  t.ok(columns[1].className.indexOf('spark-table__disabled-column') > -1, 'column gets a disabled class');

  inst.enableColumn(columns[1]);

  t.notOk(inputs[0].disabled, 'input is enabled');
  t.ok(columns[1].className.indexOf('spark-table__disabled-column') === -1, 'column loses a disabled class');

  t.end();
});

test('should activate and deactivate a row or rows', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new Table(el);

  inst.activateRow(1);
  t.ok(el.querySelectorAll('tbody tr')[1].className.indexOf('active') !== -1, 'second row is marked active when passed as an index.');
  inst.activateRow(el.querySelector('tbody tr'));
  t.ok(el.querySelectorAll('tbody tr')[0].className.indexOf('active') !== -1, 'first row is marked active when passed as an element.');
  inst.deactivateRow(1);
  t.ok(el.querySelectorAll('tbody tr')[1].className.indexOf('active') === -1, 'second row is unmarked active when passed as an index.');
  inst.deactivateRow(0);
  t.ok(el.querySelectorAll('tbody tr')[0].className.indexOf('active') === -1, 'first row is unmarked active when passed as an element.');

  inst.activateRows([0, 1]);
  t.ok(el.querySelectorAll('tbody tr')[1].className.indexOf('active') !== -1, 'second row is marked active when passed in an array.');
  t.ok(el.querySelectorAll('tbody tr')[0].className.indexOf('active') !== -1, 'first row is marked active when passed in an array.');

  inst.deactivateRows([0, 1]);
  t.ok(el.querySelectorAll('tbody tr')[1].className.indexOf('active') === -1, 'second row is unmarked active when passed in an array.');
  t.ok(el.querySelectorAll('tbody tr')[0].className.indexOf('active') === -1, 'first row is unmarked active when passed in an array.');

  t.end();
});

test('should return an array of active rows', function(t) {

  var el = document.createElement('div');
  el.innerHTML = markup;
  var inst = new Table(el);

  inst.activateRows([0, 1]);
  var activeRows = inst.getActiveRows();
  t.equal(el.querySelectorAll('tbody tr')[0], activeRows[0], 'first row ireturned matches row set');
  t.equal(el.querySelectorAll('tbody tr')[1], activeRows[1], 'second row returned matches row set');

  t.end();
});

test('should update to use a new table component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = markup;
  var inst = new Table(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
