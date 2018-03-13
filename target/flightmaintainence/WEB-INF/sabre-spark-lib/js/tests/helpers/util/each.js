var test = require('tape');
var each = require('../../../src/helpers/util/each');

test('loops through an array', function(t) {

  var arr = [1, 2, 3, 4, 5];
  var count = 0;

  each(arr, function() {
    count++;
  });

  t.equal(count, arr.length, 'runs the callback for each member of the array');

  t.end();
});

test('loops through an HTMLCollection', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<span></span><span></span><span></span><input><button></button>';
  var count = 0;

  each(el.children, function() {
    count++;
  });

  t.equal(count, el.children.length, 'runs the callback for each member of the array');

  t.end();
});

test('loops through a NodeList', function(t) {

  var el = document.createElement('div');
  el.innerHTML = '<span></span><span></span><span></span><input><button></button>';
  var count = 0;

  each(el.childNodes, function() {
    count++;
  });

  t.equal(count, el.childNodes.length, 'runs the callback for each member of the array');

  t.end();
});

test('loops through an Object', function(t) {

  var obj = {
    test: 1,
    test3: 4,
    asdf: 3,
    whut: 'asd23f'
  };

  obj.prototype = {
    protoProp1: 'sdfcv',
    prot2: {}
  };

  var count = 0;

  each(obj, function() {
    count++;
  });

  t.equal(count, 4, 'runs the callback for each member of the array');

  t.end();
});

test('ensures a callback is passed', function(t) {
  t.throws(function() {
    each([], {});
  }, 'throws an error');
  t.end();
});
