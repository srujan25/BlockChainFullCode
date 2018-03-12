'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (html) {

  if (!html) {
    throw new Error('Cannot create element with no HTML!');
  }

  var el = document.createElement('div');
  el.innerHTML = html;
  var el2 = el.children[0];
  el2.parentNode.removeChild(el2);
  return el2;
};

module.exports = exports['default']; /**
                                      * # Make Element
                                      * Make en element using a string of HTML.
                                      *
                                      * @example
                                      * makeElement('<div></div>');
                                      *
                                      * @module helpers/make-element.js
                                      *
                                      * @param {String} html
                                      * @return {Element}
                                      */
//# sourceMappingURL=make-element.js.map
