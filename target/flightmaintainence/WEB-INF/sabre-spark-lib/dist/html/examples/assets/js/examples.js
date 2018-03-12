/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _stylesheetPicker = require('./stylesheet-picker');

var _stylesheetPicker2 = _interopRequireDefault(_stylesheetPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  new _stylesheetPicker2.default(document.querySelector('[data-hook="stylesheet-picker"]'), document.querySelector('[data-hook="stylesheet-toggle"]'));
});

},{"./stylesheet-picker":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StylesheetPicker;
function StylesheetPicker(el, link) {

  function onPickerChange(e) {
    link.href = e.target.value;
  }

  el.addEventListener('change', onPickerChange);
}

},{}]},{},[1]);
