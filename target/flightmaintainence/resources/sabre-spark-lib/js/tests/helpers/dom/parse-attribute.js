var test = require('tape');
var parseAttribute = require('../../../src/helpers/dom/parse-attribute');

var el = document.createElement('div');
el.innerHTML = '<div min="50" data-bool data-bool-val="true" data-bool-val2="false" data-val3="sdf"></div>';
var el2 = el.children[0];

test('should parse boolean attributes or fall back to a default value.', function(t) {

  t.ok(parseAttribute.boolean(el2, 'data-bool'), 'attribute existing is considered true');
  t.ok(parseAttribute.boolean(el2, 'data-bool-val'), 'attribute set to "true" is considered true');
  t.notOk(parseAttribute.boolean(el2, 'data-bool-val2'), 'attribute set to "false" is considered false');
  t.notOk(parseAttribute.boolean(el2, 'data-val3'), 'attribute set to "sdf" is considered false');
  t.notOk(parseAttribute.boolean(el2, 'data-not', false), 'falls back to default value');

  t.end();
});

test('should parse numeric attributes or fall back to a default value.', function(t) {

  t.equal(parseAttribute.number(el2, 'min'), 50, 'parses a number');
  t.equal(parseAttribute.number(el2, 'max', 100), 100, 'returns a default numeric value');

  t.end();
});

test('should parse numeric attributes or fall back to a default value.', function(t) {

  t.equal(parseAttribute.string(el2, 'data-val3'), 'sdf', 'parses a string');
  t.equal(parseAttribute.string(el2, 'data-val4', 'aaa'), 'aaa', 'returns a default string value');

  t.end();
});
