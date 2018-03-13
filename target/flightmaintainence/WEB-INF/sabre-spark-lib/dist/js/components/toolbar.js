/* sabre-spark - v2.4.4 - 2018-3-6 DO NOT MODIFY THIS FILE DIRECTLY OR YOU WILL NOT BE ABLE TO UPDATE YOUR VERSION OF SPARK. */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Spark || (g.Spark = {})).Toolbar = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _hasClass = require('../helpers/dom/has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _parseAttribute = require('../helpers/dom/parse-attribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * # Toolbar
                                                                                                                                                           * Setup a responsive toolbar
                                                                                                                                                           *
                                                                                                                                                           * @example
                                                                                                                                                           * new Toolbar(el);
                                                                                                                                                           *
                                                                                                                                                           * @module components/toolbar.js
                                                                                                                                                           */


var Toolbar = function () {

  /**
   * Toolbar constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Toolbar(el) {
    _classCallCheck(this, Toolbar);

    if (!el) return;
    this._init(el);
  }

  /**
   * This function will update cached sizing when an element in the toolbar is changed
   * or, when toolbar items are added or removed
   */


  Toolbar.prototype.change = function change() {
    this._closeAll();
    (0, _removeClass2.default)(this.el, ['ready', 'show-more', 'measured']);
    var v = document.createDocumentFragment();
    for (var i = 0; i < this.items.length; i++) {
      v.appendChild(this.items[i].el);
    }
    this.visibleContainer.appendChild(v);
    this._initItems();
    (0, _addClass2.default)(this.el, 'measured');
    this._calculateStyles();
    (0, _addClass2.default)(this.el, 'ready');
    return this;
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Toolbar.prototype.update = function update(el) {

    if (el) {
      this.remove(true);
      this._init(el);
    } else {
      this.change();
    }

    return this;
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Toolbar.prototype.remove = function remove(leaveElement) {
    this._removeListeners();
    delete this.el.sparktoolbarcon;
    delete this.showMoreButton.sparktoolbarshowmore;
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].remove();
    }
    if (!leaveElement && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      this.el = undefined;
    }
    return this;
  };

  /**
   * Setup a toolbarItem Instance to track the state of individual toolbar items
   * @param {Element} parent Reference to parent toolbar
   * @param {Element} el Node to initalize as toolbarItem
   * @param {Number} order The original index of the item in list of toolbarItems (used for maintaining order when sorting)
   */


  Toolbar.prototype.toolbarItem = function toolbarItem(parent, el, order) {
    //Setup and cache the values for this item
    var a = {};
    a.parent = parent;
    a.el = el;
    //cache the priority value present on the toolbar element if it is present, else default to 0
    a.priority = a.el.attributes['data-priority'] ? a.el.attributes['data-priority'].value : 0;
    a.order = a.el.attributes['data-order'] ? a.el.attributes['data-order'].value : order;
    a.hasContent = a.el.querySelector('.spark-toolbar__item--content') ? true : false;
    a.helper = a.el.querySelector('.spark-toolbar__item-helper');
    a.label = a.el.attributes.label ? a.el.attributes.label.value : false;
    a.closeOnClick = (0, _hasClass2.default)(a.el, 'spark-toolbar__item--close-more-on-click');
    a.width = a.el.offsetWidth;
    a.height = a.el.offsetHeight;
    a.dropdown = el.querySelector('.spark-toolbar__item--content');
    if (a.dropdown) {
      a.dropdown.sparktoolbardropdown = true;
    }
    /**
     * Call method to toggle the open state, optional param sets open state to value
     * Can get current state by referencing a.toggleDropdown.open
     * @param {Boolean} open Set state to this regardless of current state
     */
    a.toggleDropdown = function (open) {
      var o = typeof open !== 'undefined' ? !open : a.toggleDropdown.open;
      if (o) {
        a.toggleDropdown.open = false;
        (0, _removeClass2.default)(a.el, 'animate');
        window.setTimeout(function () {
          (0, _removeClass2.default)(a.el, 'open');
        }, 100);
      } else {
        if (a.hasContent) {
          a.toggleDropdown.open = true;
          (0, _addClass2.default)(a.el, 'open');
          a.positionDropdown();
          var e = document.createEvent('Event');
          e.initEvent('spark.visible-children', true, true);
          a.dropdown.dispatchEvent(e);
          window.setTimeout(function () {
            (0, _addClass2.default)(a.el, 'animate');
          }, 0);
        } else {
          a.parent._toggleShowMore(false);
        }
      }
    };
    /**
     * Click handler for local element - determines to close element
     * conditionally based on presence of spark-toolbar__item--close-on-click
     * closes parent's more dropdown conditionally as well
     * @param {Boolean} open Set state to this regardless of current state
     */
    a.handleClick = function (e) {

      if ((0, _parseAttribute.boolean)(a.el, 'disabled')) {
        e.preventDefault();
        return;
      }

      if (!a.toggleDropdown.open) {
        a.toggleDropdown(true);
      } else {
        if (e.target === a.el || e.target === a.helper) {
          a.toggleDropdown();
        } else {
          var b = e.target;
          while (b !== a.el) {
            if ((0, _hasClass2.default)(b, 'spark-toolbar__item--close-on-click')) {
              a.toggleDropdown(false);
              //close the mode section, as event originated inside a close-on-click area
              a.parent._toggleShowMore(false);
              break;
            }
            b = b.parentElement;
          }
        }
      }
      //e.preventDefault();
    };
    //perform bounds checking on dropdown open to position dropdown inside visual area
    //this is called each time a dropdown is opened, in case the state of the component has
    //changed since initialization
    a.positionDropdown = function () {
      if (a.dropdown) {
        a.dropdown.style.left = '';
        a.dropdown.style.right = '';
        var pos = a.dropdown.getBoundingClientRect();
        var left = window.pageXOffset;
        var right = window.pageXOffset + document.documentElement.clientWidth;
        if (pos.right > right) {
          a.dropdown.style.left = 'inherit';
          a.dropdown.style.right = 0;
        }
        if (pos.left < left) {
          a.dropdown.style.left = 0;
          a.dropdown.style.right = 'inherit';
        }
      }
    };
    a.remove = function () {
      if (a.el) {
        delete a.el.sparktoolbar;
      }
      if (a.dropdown) {
        delete a.dropdown.sparktoolbardropdown;
      }
    };
    a.el.sparktoolbar = a;
    return a;
  };

  /**
   * Close any open items, and more dropdown
   */


  Toolbar.prototype._closeAll = function _closeAll() {
    this._closeItems();
    this._toggleShowMore(false);
  };

  /**
   * Returns array of open toolbarItems
   */


  Toolbar.prototype._getOpenItems = function _getOpenItems() {
    var a = [];
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].toggleDropdown.open) {
        a.push(this.items[i]);
      }
    }
    return a;
  };

  /**
   * Close any open items
   * @param {Array} a Optional array of toolbarItems to close, defaults to all open items
   */


  Toolbar.prototype._closeItems = function _closeItems(a) {
    a = typeof a === 'undefined' ? this._getOpenItems() : a;
    for (var i = 0; i < a.length; i++) {
      a[i].toggleDropdown(false);
    }
  };

  /**
   * Setup the toolbar element, cache properties, and initalize styling
   * when complete, show toolbar
   * @param {Element} el The node to initalize on
   */


  Toolbar.prototype._init = function _init(el) {
    this.el = el;
    //store a reference to this on the node to expedite event handling
    this.el.sparktoolbarcon = this;
    this.visibleContainer = this.el.querySelector('.spark-toolbar__container--visible');
    this.hiddenContainer = this.el.querySelector('.spark-toolbar__container--hidden');
    this.showMoreButton = this.el.querySelector('.spark-toolbar__show-more');
    this.showMoreButton.sparktoolbarshowmore = true;
    this.isOpen = false;
    this.isFocus = false;
    this._setupListeners();
    this.el.style.width = '100%';
    this._initItems();
    (0, _addClass2.default)(this.el, 'measured');
    this._calculateStyles();
    this.tabindex = this.el.attributes.tabindex ? this.el.attributes.tabindex.value : 0;
    (0, _addClass2.default)(this.el, 'ready');
  };

  Toolbar.prototype._initItems = function _initItems() {
    var items = this.el.querySelectorAll('.spark-toolbar__item');
    this.items = [];
    for (var i = 0; i < items.length; i++) {
      this.items[i] = new this.toolbarItem(this, items[i], i);
    }
  };

  /**
   * Setup event listeners for clicks and resize events
   */


  Toolbar.prototype._setupListeners = function _setupListeners() {
    this._handleWindowClick = this._handleWindowClickH.bind(this);
    document.addEventListener('click', this._handleWindowClick);
    this._handleResize = (0, _debounce2.default)(this._handleResizeH.bind(this), 100);
    window.addEventListener('resize', this._handleResize);
    this._handleKeyDown = this._handleKeyDownH.bind(this);
    this.el.addEventListener('keydown', this._handleKeyDown);
    this._handleFocus = this._handleFocusH.bind(this);
    document.addEventListener('focus', this._handleFocus, true);
    this._handleBlur = this._handleBlurH.bind(this);
    document.addEventListener('blur', this._handleBlur, true);
    this._handleVisibleChildren = this._handleVisibleChildrenH.bind(this);
    document.addEventListener('spark.visible-children', this._handleVisibleChildren, true);
  };

  /**
   * Remove event listeners for clicks and resize events
   */


  Toolbar.prototype._removeListeners = function _removeListeners() {
    document.removeEventListener('click', this._handleWindowClick);
    window.removeEventListener('resize', this._handleResize);
    this.el.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('blur', this._handleBlur, true);
    document.removeEventListener('focus', this._handleFocus, true);
    document.removeEventListener('spark.visible-children', this._handleVisibleChildren, true);
  };

  /**
   * reset our tab index when user focuses outside of element (gets immediately reset to -1 if focus is placed back inside element)
   * @param {Event} e The FocusEvent
   */


  Toolbar.prototype._handleBlurH = function _handleBlurH(e) {
    if (this.el.contains(e.target)) {
      this.el.attributes.tabindex.value = this.tabindex;
    }
  };

  /**
   * focus handler, works in conjunction with blur handler to set correct tabindex value
   * @param {Event} e The FocusEvent
   */


  Toolbar.prototype._handleFocusH = function _handleFocusH(e) {
    //if we're not being focused, reset our tabindex so we are accessible again, and close anything open
    if (!this.el.contains(e.target)) {
      this._closeAll();
      this.el.attributes.tabindex.value = this.tabindex;
    } else {
      //set our tabindex to -1 so the user can shift-tab out of our element
      this.el.attributes.tabindex.value = -1;
      if (e.target.sparktoolbarcon) {
        this._focusLast();
        return;
      }
      //handle focusing an item
      if (e.target.sparktoolbar) {
        e.target.sparktoolbar.el.focus();
        return;
      }
      var a = e.target;
      //harder case - look up the tree to find if we're focusing inside content
      while (!a.sparktoolbarcon) {
        if (a.sparktoolbar) {
          break;
        }
        //if we are - give our parent element a tabindex so the user can refocus the menu using shift-tab
        if (a.sparktoolbardropdown) {
          this.el.attributes.tabindex.value = this.tabindex;
          return;
        }
        a = a.parentElement;
      }
    }
  };

  /**
   * reset our focus to the last menu item that was focused
   */


  Toolbar.prototype._focusLast = function _focusLast() {
    if (!this._lastFocus) {
      var a = this.visibleContainer.querySelector('.spark-toolbar__item') || this.hiddenContainer.querySelector('.spark-toolbar__item');
      this._lastFocus = a.sparktoolbar;
    }
    if (this.hiddenContainer.contains(this._lastFocus.el)) {
      this._toggleShowMore(true);
    }
    this._lastFocus.el.focus();
  };

  /**
   * keydown handler, used for keyboard navigation
   * @param {Event} e The KeyDown Event
   */


  Toolbar.prototype._handleKeyDownH = function _handleKeyDownH(e) {
    var a = e.target;
    //find the nearest toolbaritem
    while (!a.sparktoolbarcon) {
      if (a.sparktoolbar) {
        break;
      }
      if (a.sparktoolbardropdown) {
        return;
      }
      a = a.parentElement;
    }
    if (a.sparktoolbar) {
      //handle keys
      switch (e.keyCode) {
        //left arrow
        //up arrow
        case 37:
        case 38:
          if (a.previousSibling && a.previousSibling.sparktoolbar) {
            this._lastFocus = a.previousSibling.sparktoolbar;
            a.previousSibling.focus();
          } else {
            if (this.visibleContainer.querySelector('.spark-toolbar__item') !== a.sparktoolbar.el) {
              a = this.visibleContainer.querySelector('.spark-toolbar__item:last-of-type');
              if (a) {
                this._toggleShowMore(false);
                this._lastFocus = a.sparktoolbar;
                a.focus();
              }
            }
          }
          this._closeItems();
          e.preventDefault();
          break;
        //right arrow
        //down arrow
        case 39:
        case 40:
          if (a.nextSibling && a.nextSibling.sparktoolbar) {
            this._lastFocus = a.nextSibling.sparktoolbar;
            a.nextSibling.focus();
          } else {
            if (this.hiddenContainer.querySelector('.spark-toolbar__item:last-of-type') !== a.sparktoolbar.el) {
              a = this.hiddenContainer.querySelector('.spark-toolbar__item');
              if (a) {
                this._toggleShowMore(true);
                this._lastFocus = a.sparktoolbar;
                a.focus();
              }
            }
          }
          this._closeItems();
          e.preventDefault();
          break;
        //spacebar
        case 32:
          e.preventDefault();
          //we only want to toggle the toolbar if we are actually focused directly on it;
          if (e.target.sparktoolbar) {
            e.target.sparktoolbar.el.click();
          }
          break;
        //enter
        case 13:
          //we only want to toggle the toolbar if we are actually focused directly on it;
          if (e.target.sparktoolbar) {
            e.target.sparktoolbar.el.click();
          }
          break;
      }
    }
  };

  /**
   * Hanldes the spark.visible-children event to resize the component when it is made visible.
   * @param {Event} e The spark.visible-children event
   */


  Toolbar.prototype._handleVisibleChildrenH = function _handleVisibleChildrenH(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this.change();
      }.bind(this), 0);
    }
  };

  /**
   * Event handler for click events, handles window clicks, control element clicks,
   * and forwards events to toolbarItem click handlers as needed
   * @param {Event} e The click event
   */


  Toolbar.prototype._handleWindowClickH = function _handleWindowClickH(e) {

    if ((0, _parseAttribute.boolean)(e.target, 'disabled')) {
      e.preventDefault();
      return;
    }

    //Check to see if the click was outside of the toolbar
    if (!this.el.contains(e.target)) {
      this._closeItems();
      this._toggleShowMore(false);
    } else {
      var a = e.target;
      //traverse the dom node tree until we find an element that handles the event,
      //or we reach the toolbar root node
      if (a === this.visibleContainer || a === this.el) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      while (a !== this.el) {
        if (a.sparktoolbar) {
          var c = this._getOpenItems();
          if (c.indexOf(a.sparktoolbar) >= 0) {
            c.splice(c.indexOf(a.sparktoolbar), 1);
          }
          this._closeItems(c);
          if (!this.hiddenContainer.contains(e.target)) {
            this._toggleShowMore(false);
          }
          return a.sparktoolbar.handleClick(e);
        }
        if (a.sparktoolbarshowmore) {
          this._closeItems();
          this._toggleShowMore();
          return;
        }
        a = a.parentElement;
      }
      this._closeAll();
    }
  };

  /**
   * Toggle the state of the show more dropdown, optional parameter overrides toggle and
   * sets state to passed value
   * @param {Boolean} open The new state of the show more dropdown
   */


  Toolbar.prototype._toggleShowMore = function _toggleShowMore(open) {
    var o = typeof open !== 'undefined' ? !open : this.isOpen;
    if (o) {
      (0, _removeClass2.default)(this.el, 'animate');
      window.setTimeout(function () {
        (0, _removeClass2.default)(this.el, 'open');
        this.isOpen = false;
      }.bind(this), 100);
    } else {
      this.isOpen = true;
      (0, _addClass2.default)(this.el, 'open');
      this._positionShowMore();
      window.setTimeout(function () {
        (0, _addClass2.default)(this.el, 'animate');
      }.bind(this), 0);
    }
  };

  /**
  * Do bounds checking on show-more dropdown when it is opened, and position it accordingly
  */


  Toolbar.prototype._positionShowMore = function _positionShowMore() {
    this.hiddenContainer.style.right = '0px';
    var pos = this.hiddenContainer.getBoundingClientRect();
    var left = window.pageXOffset;
    var right = window.pageXOffset + document.documentElement.clientWidth;
    if (pos.right > right) {
      this.hiddenContainer.style.right = 'calc(' + (pos.right - right) + 'px + 1rem)';
    }
    if (pos.left < left) {
      this.hiddenContainer.style.right = 'calc(' + (pos.left - left) + 'px - 1rem)';
    }
  };

  /**
   * Resize event helper, closes items then triggers recalculation of styles
   */


  Toolbar.prototype._handleResizeH = function _handleResizeH() {
    this._closeAll();
    this._calculateStyles();
  };

  /**
   * Reevaluates the available area of the toolbar and places toolbarItems into
   * the hidden container, as necessary. Should not call with any specified value
   * for showMore (used internally)
   * @param {Boolean} showMore Used to conditionally evaluate styling when showMore area is used
   */


  Toolbar.prototype._calculateStyles = function _calculateStyles(showMore) {
    this.el.style.width = '100%';
    showMore = typeof showMore !== 'undefined' ? showMore : false;
    if (!showMore) {
      (0, _removeClass2.default)(this.el, 'show-more');
    }
    var visible = [];
    var hidden = [];
    var i;
    //sort items by their priority to ensure higher-priority items are always placed
    //into the visible area first
    this.items.sort(this._prioritySort);
    //get container width and start placing items into their containers
    var visibleWidth = this.visibleContainer.clientWidth;
    for (i = 0; i < this.items.length; i++) {
      if (visibleWidth - this.items[i].width >= 0) {
        visible.push(this.items[i]);
        visibleWidth -= this.items[i].width;
      } else {
        if (!showMore) {
          (0, _addClass2.default)(this.el, 'show-more');
          return this._calculateStyles(true);
        }
        hidden.push(this.items[i]);
      }
    }
    //sort items back into their original order before inserting them into the document
    visible.sort(this._orderSort);
    hidden.sort(this._orderSort);
    var v = document.createDocumentFragment();
    var h = document.createDocumentFragment();
    for (i = 0; i < visible.length; i++) {
      v.appendChild(visible[i].el);
    }
    for (i = 0; i < hidden.length; i++) {
      h.appendChild(hidden[i].el);
    }
    this.visibleContainer.appendChild(v);
    this.hiddenContainer.appendChild(h);
    this.el.style.width = '';
  };

  /**
   * Sorts toolbar items in descending order based on their priority value
   */


  Toolbar.prototype._prioritySort = function _prioritySort(l, r) {
    return r.priority - l.priority;
  };

  /**
   * Sorts toolbar items in ascending order based on their order value
   */


  Toolbar.prototype._orderSort = function _orderSort(l, r) {
    return l.order - r.order;
  };

  return Toolbar;
}();

exports.default = Toolbar;
module.exports = exports['default'];


},{"../helpers/dom/add-class":2,"../helpers/dom/has-class":3,"../helpers/dom/parse-attribute":4,"../helpers/dom/remove-class":5,"../helpers/util/debounce":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

var _hasClass = require('./has-class');

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Add Class
 * Add a class on an element.
 *
 * @param {Element|Array} el An element or array of elements to update.
 * @param {String} name
 * @return {Element}
 *
 * @module helpers/dom/add-class.js
 */

var ws = /\s+/;
var cleanup = /\s{2,}/g;

function addClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) {
      el.classList.add(name[0]);
    }
    return el;
  }

  var toAdd = [];
  var i = 0;
  var l = name.length;
  var item = void 0;
  var clsName = typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '';

  // see if we have anything to add
  for (; i < l; i++) {
    item = name[i];
    if (item && !(0, _hasClass2.default)(clsName, item)) {
      toAdd.push(item);
    }
  }

  if (toAdd.length) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = addClass;
module.exports = exports['default'];


},{"../util/trim":7,"./has-class":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * # Has Class
 * See if an element has a class.
 *
 * @param {Element|String} el
 * @param {String} name
 * @return {Boolean}
 *
 * @module helpers/dom/has-class.js
 */
function hasClass(el, name) {
  var cName = ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' ? el.className || el.getAttribute && el.getAttribute('class') || '' : el || '').replace(/[\t\r\n\f]/g, ' ');
  return (' ' + cName + ' ').indexOf(' ' + name + ' ') !== -1;
}

exports.default = hasClass;
module.exports = exports['default'];


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Parse DOM attributes
 * Given an element and an attribute name, parse that attribute
 * if it exists or return a default.
 *
 * @module helpers/dom/parse-attribute.js
 */

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function boolean(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val === 'true' || val === '' ? true : false;
}

/**
 * Get the numeric value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function number(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return parseInt(val, 10);
}

/**
 * Get the boolean value of an attribute on an element,
 * falling back to the default value.
 * @param  {Element} el
 * @param  {String} name
 * @param  {Boolean} def
 * @return {Boolean}
 */
function string(el, name, def) {
  var val = el.getAttribute(name);
  if (val === null) return def;
  return val;
}

exports.boolean = boolean;
exports.number = number;
exports.string = string;


},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('../util/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = /\s+/; /**
                 * # Remove Class
                 * Remove a class on an element.
                 *
                 * @param {Element|Array} el An element or array of elements to update.
                 * @param {String} name
                 * @return {Element}
                 *
                 * @module helpers/dom/remove-class.js
                 */

var cleanup = /\s{2,}/g;

function removeClass(el, name) {

  if (arguments.length === 2 && typeof name === 'string') {
    name = (0, _trim2.default)(name).split(ws);
  } else {
    name = name instanceof Array ? name : Array.prototype.slice.call(arguments, 1);
  }

  // optimize for best, most common case
  if (name.length === 1 && el.classList) {
    if (name[0]) el.classList.remove(name[0]);
    return el;
  }

  // store two copies
  var clsName = ' ' + (typeof el.className === 'string' ? el.className : el.getAttribute ? el.getAttribute('class') : '') + ' ';
  var result = clsName;
  var current = void 0;
  var start = void 0;
  for (var i = 0, l = name.length; i < l; i++) {
    current = name[i];
    start = current ? result.indexOf(' ' + current + ' ') : -1;
    if (start !== -1) {
      start += 1;
      result = result.slice(0, start) + result.slice(start + current.length);
    }
  }

  // only write if modified
  if (clsName !== result) {
    if (typeof el.className === 'string') {
      el.className = (0, _trim2.default)(result.replace(cleanup, ' '));
    } else if (el.setAttribute) {
      el.setAttribute('class', (0, _trim2.default)(result.replace(cleanup, ' ')));
    }
  }

  return el;
}

exports.default = removeClass;
module.exports = exports['default'];


},{"../util/trim":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Debounce
 * Debounce a function call
 *
 * @param {Function} func
 * @param {Integer} delay
 *
 * @module helpers/util/debounce.js
 */
function debounce(func, delay) {

  var timer = void 0;

  return function () {
    var args = arguments;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      func.apply(this, args);
    }, delay);
  };
}

exports.default = debounce;
module.exports = exports["default"];


},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Trim
 * Trim whitespace on a string.
 *
 * @param {String} str
 *
 * @module helpers/util/trim.js
 */

var trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

function trim(str) {
  return str.replace(trimRE, '');
}

exports.default = trim;
module.exports = exports['default'];


},{}]},{},[1])(1)
});

//# sourceMappingURL=toolbar.js.map
