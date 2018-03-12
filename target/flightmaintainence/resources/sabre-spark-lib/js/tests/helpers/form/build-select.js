var test = require('tape');
var buildSelect = require('../../../src/helpers/form/build-select');

test('should create a select input when given a basic config', function(t) {

  var select = buildSelect({
    attributes: {
      name: 'test'
    },
    options: [1, 2, 3, 4, 5, 6]
  });

  t.equal(select.name, 'test', 'name property is set');
  t.equal(select.children.length, 6, 'children are added');

  t.end();
});

test('should create a select input when given an advanced config', function(t) {

  var select = buildSelect({
    attributes: {
      name: 'test',
      class: 'spark-select__field',
      'data-attr': 'thing',
      multiple: true
    },
    selected: [2, 4],
    options: [{
      text: 'One',
      value: 1
    }, {
      text: 'Two',
      value: 2
    }, {
      text: 'Three',
      value: 3
    }, {
      text: 'Four',
      value: 4
    }, {
      text: 'Five',
      value: 5
    }]
  });

  t.equal(select.name, 'test', 'name property is set');
  t.equal(select.className, 'spark-select__field', 'class property is set');
  t.equal(select.getAttribute('data-attr'), 'thing', 'arbitrary attribute is set');
  t.equal(select.getAttribute('multiple'), 'true', 'multiple attribute is set');
  t.equal(select.children.length, 5, 'children are added');
  t.notOk(select.children[0].selected, 'non-selected value is not selected');
  t.ok(select.children[1].selected, 'selected value is selected');
  t.ok(select.children[3].selected, 'selected value is selected');

  t.end();
});
