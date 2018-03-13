'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _transform = require('../helpers/css/transform');

var _transform2 = _interopRequireDefault(_transform);

var _toggleClass = require('../helpers/dom/toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _getParent = require('../helpers/traversal/get-parent');

var _getParent2 = _interopRequireDefault(_getParent);

var _getIndex = require('../helpers/traversal/get-index');

var _getIndex2 = _interopRequireDefault(_getIndex);

var _hasParent = require('../helpers/traversal/has-parent');

var _hasParent2 = _interopRequireDefault(_hasParent);

var _getChildren = require('../helpers/traversal/get-children');

var _getChildren2 = _interopRequireDefault(_getChildren);

var _breakpoint = require('../helpers/dom/breakpoint');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Tabs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Tabbed navigation
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Tabs(el, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   // Optional. Alternate breakpoint values.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   breakpoints: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    xs: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      min: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      max: 639
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    // ...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/tabs.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tabs = function (_BaseComponent) {
  _inherits(Tabs, _BaseComponent);

  /**
   * Tabs constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Tabs(el) {
    var _this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tabs);

    params.elRequired = true;

    if (!(_this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params)), _this)) {
      return _possibleConstructorReturn(_this);
    }

    _this._bindEventListenerCallbacks();
    _this._addEventListeners();
    _this._determineSize();
    return _possibleConstructorReturn(_this);
  }

  /**
   * Set the active item.
   * @param {String|Number|Object} el
   */


  Tabs.prototype.setActive = function setActive(el) {

    var panel;

    // If we're passed a string instead of an element or number,
    // get the panel with that id.
    if (typeof el === 'string') {
      panel = this._findPanelByName(el);

      // If we've found a panel, find the corresponding tab.
      if (panel) {
        el = this._findTabByPanel(panel);
      }
    }

    // If we're passed a number instead of an element,
    // get that item from the tabEls NodeList
    if (typeof el === 'number') {
      el = this.tabEls.item(el);
    }

    // If we couldn't find the element or it's already active, stop.
    if (!el || (typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || el === this.activeTabEl) {
      return false;
    }

    // Remove the active class from the currently active tab
    if (this.activeTabEl) {
      (0, _toggleClass2.default)(this.activeTabEl, 'active', false);

      // Remove the aria-selected attribute from the old tab
      this.activeTabEl.querySelector('a').removeAttribute('aria-selected');
      this.previousTabEl = this.activeTabEl;
    }

    // Add the active class and store.
    (0, _toggleClass2.default)(el, 'active', true);

    // Add the aria-selected attribute to the new tab
    el.querySelector('a').setAttribute('aria-selected', 'true');
    this.activeTabEl = el;

    // Focus the tab on the left side if it's to the left of the frame.
    if (-el.offsetLeft > this.x) {
      this.focus(el, 'left');
    }
    // Focus the tab on the right side if it's to the right of the frame.
    else if (el.offsetLeft + el.clientWidth > this.tabListScrollEl.clientWidth - this.x) {
        this.focus(el, 'right');
      }

    // If we don't already have a panel, find the panel that corresponds to this tab.
    if (!panel) {
      panel = this._findPanelByTab(el);
    }

    // Set the new panel to be active.
    (0, _toggleClass2.default)(panel, 'active', true);

    // Set aria-hidden attribute to false for this panel
    panel.setAttribute('aria-hidden', 'false');

    // Remove the active class from the currently active panel.
    if (this.activePanelEl) {
      (0, _toggleClass2.default)(this.activePanelEl, 'active', false);

      // Set aria-hidden attribute to true for this panel
      this.activePanelEl.setAttribute('aria-hidden', 'true');
    }

    // Store the new active panel
    this.activePanelEl = panel;

    // Set the hash
    if (this.useHash) {
      window.location.hash = this.activePanelEl.getAttribute('id') || '';
    }
    var e = document.createEvent('Event');
    e.initEvent('spark.visible-children', true, true);
    this.activePanelEl.dispatchEvent(e);

    return this;
  };

  /**
   * Start the drag
   * @param {Object} params
   */


  Tabs.prototype.start = function start(params) {

    params = params || {};

    // Start dragging
    this.isDragging = true;

    // Stash the element and its position
    this.lastX = params.lastX;
    this.lastY = params.lastY;

    // Stash the min and max values
    this._determineMinMax();

    // Add listeners to the body so we can drag this thing anywhere and still get events
    this._addMoveEventListeners(params.type || 'mouse');

    return this;
  };

  /**
   * Stop the drag
   * @param {Object} params
   */


  Tabs.prototype.stop = function stop(params) {

    params = params || {};

    // Make sure we're in bounds
    this._checkX();

    // Stop dragging
    this.isDragging = false;
    this.scrollDistance = 0;

    // Reset the scroll direction
    this.scrollDirection = '';

    // Unbind event listeners on the body
    this._removeMoveEventListeners(params.type);

    return this;
  };

  /**
   * Move the drag point
   * @param {Object} params
   */


  Tabs.prototype.move = function move(params) {

    // Make sure we're currently dragging
    if (!this.isDragging && !params.scroll && !params.force) {
      return this;
    }

    // If we're beyond the bounds, add some resistance to the scroll.
    if (!params.force && (this.x + params.x > this.maxX || this.x + params.x < this.minX)) {
      this.x += params.x / 4;
    } else {
      this.x += params.x;
    }

    this.scrollDistance += Math.abs(params.x);

    if (params.scroll) {
      this._checkX();
    }

    this._updatePosition();

    return this;
  };

  /**
   * Focus on a specific element by bringing it to the middle of the scroller.
   * @param {Element} el
   * @param {String} align Which side to align with.
   */


  Tabs.prototype.focus = function focus(el, align) {

    align = align || 'left';

    this.x = align === 'left' ? -el.offsetLeft : -(el.offsetLeft - this.tabListScrollEl.clientWidth + el.offsetWidth);

    this._checkX();
    this._updatePosition();

    return this;
  };

  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */


  Tabs.prototype.remove = function remove(leaveElement) {
    this._removeMoveEventListeners('touch');
    this._removeMoveEventListeners('mouse');
    this._removeMoveEventListeners('keyboard');
    return _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Update the elements used.
   * @param {Element} el Optional
   */


  Tabs.prototype.update = function update(el) {

    _BaseComponent.prototype.update.call(this, el);

    // Run on the next frame so sizes have updated
    setTimeout(function () {
      this._determineSize();
      this.focus(this.activeTabEl);
    }.bind(this), 0);

    return this;
  };

  /**
   * Find a panel element by name.
   * @param {String} name
   * @return {Object|Null}
   */


  Tabs.prototype._findPanelByName = function _findPanelByName(name) {

    name = name.replace('#', '');

    var i = 0;
    var len = this.panelEls.length;
    var found = null;
    var el;

    for (; i < len && !found; i++) {
      if (this.panelEls[i].getAttribute('id') === name) {
        el = this.panelEls[i];
        found = true;
      }
    }

    return found && el;
  };

  /**
   * Find a panel given its corresponding tab. Try to match based on the
   * id attribute, but fall back to matching based on index.
   * @param {Object} tab
   * @return {Object|Null}
   */


  Tabs.prototype._findPanelByTab = function _findPanelByTab(tab) {

    var anchorChild = tab.querySelector('a');
    var id = anchorChild && anchorChild.getAttribute('href');
    var index = (0, _getIndex2.default)(tab.parentNode.children, tab);
    var i = 0;
    var len = this.panelEls.length;
    var foundById = null;
    var idMatch = null;
    var indexMatch = null;

    id = id ? id.replace('#', '') : id;

    for (; i < len && !foundById; i++) {
      if (id && this.panelEls[i].getAttribute('id') === id) {
        foundById = true;
        idMatch = this.panelEls[i];
      } else if (i === index) {
        indexMatch = this.panelEls[i];
      }
    }

    return foundById && idMatch || indexMatch;
  };

  /**
   * Find a tab given its corresponding panel. Try to match based on the
   * [href] attribute, but fall back to matching based on index.
   * @param {Object} panel
   * @return {Object|Null}
   */


  Tabs.prototype._findTabByPanel = function _findTabByPanel(panel) {

    var id = panel.getAttribute('id');
    var index = (0, _getIndex2.default)(panel.parentNode.children, panel);
    var i = 0;
    var len = this.tabEls.length;
    var foundById = null;
    var idMatch = null;
    var indexMatch = null;

    for (; i < len && !foundById; i++) {
      if (id && (this.tabEls.item(i).querySelector('a').getAttribute('href') === '#' + id || this.tabEls.item(i).getAttribute('href') === '#' + id)) {
        foundById = true;
        idMatch = this.tabEls.item(i);
      } else if (i === index) {
        indexMatch = this.tabEls.item(i);
      }
    }

    return foundById && idMatch || indexMatch;
  };

  /**
   * Find the tab which an element lives inside.
   * @param {Element} el
   * @return {Object}
   */


  Tabs.prototype._findTabByChildElement = function _findTabByChildElement(el) {

    var i = 0;
    var len = this.tabEls.length;
    var found;
    var tab;

    for (; i < len && !found; i++) {

      // There is a chance that the element passed IS a tab. Or maybe a tab is its parent.
      if (this.tabEls.item(i) === el || (0, _hasParent2.default)(el, this.tabEls.item(i))) {
        found = true;
        tab = this.tabEls.item(i);
      }
    }

    return found && tab;
  };

  /**
   * Store a reference to the tabs list, each tab and each panel.
   * Set which tab is active, or use the first.
   * @param {Element} el
   */


  Tabs.prototype._cacheElements = function _cacheElements(el) {

    this.el = el;
    this.tabListEl = this.el.querySelector('.spark-tabs__list');
    this.tabListScrollEl = this.tabListEl.parentNode;
    this.tabEls = this.tabListEl.querySelectorAll('.spark-tabs__tab');
    this.panelEls = (0, _getChildren2.default)(this.el.querySelector('.spark-tabs__panels'), '[role="tabpanel"]');
    this.navEl = this.el.querySelector('.spark-tabs__nav');
    this.leftEl = this.navEl.querySelector('.spark-tabs__btn--left');
    this.rightEl = this.navEl.querySelector('.spark-tabs__btn--right');

    // Make sure we have the elements we need
    if (!this.tabListEl || !this.tabEls.length || !this.panelEls.length) {
      throw new Error('Tab element missing either a .spark-tabs__list, or elements with .spark-tabs__tab and .spark-tabs__panel!', this.el);
    }

    // If there is a hash set, use that to try and set the active panel
    var hashSet = window.location.hash && this.setActive(window.location.hash);

    // If we weren't able to set with a hash, find the tab marked active or default to the first tab
    if (!hashSet) {
      this.setActive(this.tabListEl.querySelector('.spark-tabs__tab.active') || 0);
    }
  };

  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */


  Tabs.prototype._bindEventListenerCallbacks = function _bindEventListenerCallbacks() {

    this._onResizeBound = this._onResize.bind(this);

    this._onTabListClickBound = this._onTabListClick.bind(this);

    this._onRightClickBound = this._onRightClick.bind(this);
    this._onLeftClickBound = this._onLeftClick.bind(this);

    this._onTouchStartBound = this._onTouchStart.bind(this);
    this._onTouchMoveBound = this._onTouchMove.bind(this);
    this._onTouchEndBound = this._onTouchEnd.bind(this);

    this._onMouseDownBound = this._onMouseDown.bind(this);
    this._onMouseMoveBound = this._onMouseMove.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);

    this._onScrollBound = this._onScroll.bind(this);

    this._onFocusBound = this._onFocus.bind(this);
    this._onBlurBound = this._onBlur.bind(this);
  };

  /**
   * Add event listeners for DOM events.
   */


  Tabs.prototype._addEventListeners = function _addEventListeners() {

    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('orientationchange', this._onResizeBound);

    this.tabListEl.addEventListener('click', this._onTabListClickBound);

    this.tabListEl.addEventListener('touchstart', this._onTouchStartBound);
    this.tabListEl.addEventListener('mousedown', this._onMouseDownBound);
    this.tabListEl.addEventListener('mousewheel', this._onScrollBound);
    this.tabListEl.addEventListener('DOMMouseScroll', this._onScrollBound);

    this.tabListEl.addEventListener('focus', this._onFocusBound, true);
    this.tabListEl.addEventListener('blur', this._onBlurBound, true);

    if (this.leftEl) {
      this.leftEl.addEventListener('click', this._onLeftClickBound);
    }

    if (this.rightEl) {
      this.rightEl.addEventListener('click', this._onRightClickBound);
    }
  };

  /**
   * Remove event listeners for DOM events..
   */


  Tabs.prototype._removeEventListeners = function _removeEventListeners() {

    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('orientationchange', this._onResizeBound);

    this.tabListEl.removeEventListener('click', this._onTabListClickBound);

    this.tabListEl.removeEventListener('touchstart', this._onTouchStartBound);
    this.tabListEl.removeEventListener('mousedown', this._onMouseDownBound);
    this.tabListEl.removeEventListener('mousewheel', this._onScrollBound);
    this.tabListEl.removeEventListener('DOMMouseScroll', this._onScrollBound);

    this.tabListEl.removeEventListener('focus', this._onFocusBound);
    this.tabListEl.removeEventListener('blur', this._onBlurBound);

    if (this.leftEl) {
      this.leftEl.removeEventListener('click', this._onLeftClickBound);
    }

    if (this.rightEl) {
      this.rightEl.removeEventListener('click', this._onRightClickBound);
    }
  };

  /**
   * Add event listeners for touchmove, touchend, mousemove and mouseup.
   * We add these to the window so that the user can move off of the element
   * but keep dragging the tabs.
   * @param {String} type Which type of listeners to add
   */


  Tabs.prototype._addMoveEventListeners = function _addMoveEventListeners(type) {

    // Only listen for events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.addEventListener('mousemove', this._onMouseMoveBound);
        window.addEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.addEventListener('touchmove', this._onTouchMoveBound);
        window.addEventListener('touchend', this._onTouchEndBound);
        break;
    }
  };

  /**
   * Remove event listeners for move events.
   * @param {String} type Which type of listeners to remove
   */


  Tabs.prototype._removeMoveEventListeners = function _removeMoveEventListeners(type) {

    // Only unbind events of the type we asked for.
    switch (type) {
      case 'mouse':
        window.removeEventListener('mousemove', this._onMouseMoveBound);
        window.removeEventListener('mouseup', this._onMouseUpBound);
        break;
      case 'touch':
        window.removeEventListener('touchmove', this._onTouchMoveBound);
        window.removeEventListener('touchend', this._onTouchEndBound);
        break;
    }
  };

  /**
   * Determine which size class to set on the element. This is a way of using breakpoint-like
   * logic for the tabs. We can't rely on real breakpoints because there is no guarantee that
   * the tabs will be the width of the window.
   * Also determine if we should be showing navigation arrows.
   */


  Tabs.prototype._determineSize = function _determineSize() {

    var width = this.el.clientWidth;
    var bp = (0, _breakpoint.get)(width, this.breakpoints);

    // If the found breakpoint is different than the current breakpoint, set the proper state.
    if (this.currentBreakpoint !== bp) {
      (0, _toggleClass2.default)(this.el, this.currentBreakpoint, false);
      this.currentBreakpoint = bp;
      (0, _toggleClass2.default)(this.el, this.currentBreakpoint, true);
    }

    // If the tab list is wider than the scroll container, set the scrollable class.
    this.isScrollable = this.tabListEl.clientWidth > this.tabListScrollEl.clientWidth;
    (0, _toggleClass2.default)(this.navEl, 'scrollable', this.isScrollable);
    this._determineMinMax();
  };

  /**
   * Determine the min and max values for the slider.
   */


  Tabs.prototype._determineMinMax = function _determineMinMax() {

    if (!this.tabListEl || !this.tabListScrollEl) {
      return;
    }

    this.maxX = 0;
    this.minX = this.tabListScrollEl.clientWidth - this.tabListEl.clientWidth - this.maxX;
  };

  /**
   * Enable the animation state.
   */


  Tabs.prototype._enableAnimation = function _enableAnimation() {
    this.isAnimatable = true;
    (0, _toggleClass2.default)(this.navEl, 'no-animation', !this.isAnimatable);
  };

  /**
   * Disable the animation state.
   */


  Tabs.prototype._disableAnimation = function _disableAnimation() {
    this.isAnimatable = false;
    (0, _toggleClass2.default)(this.navEl, 'no-animation', !this.isAnimatable);
  };

  /**
   * Update the position of the tabs.
   */


  Tabs.prototype._updatePosition = function _updatePosition() {
    this.tabListEl.setAttribute('style', (0, _transform2.default)('translate', this.x + 'px'));
  };

  /**
   * Check the x position
   */


  Tabs.prototype._checkX = function _checkX() {

    if (this.x < this.minX) {
      this.x = this.minX;
      this._updatePosition();
    }

    if (this.x > 0) {
      this.x = 0;
      this._updatePosition();
    }
  };

  /**
   * When the user clicks on a tab, make it active.
   * @param {Object} e
   */


  Tabs.prototype._onTabListClick = function _onTabListClick(e) {

    // Make sure we haven't scrolled.
    if (this.scrollDistance > 5) {
      e.preventDefault();
      return;
    }

    var tab;

    // Find if one of our tab elements is in the path
    if (tab = this._findTabByChildElement(e.target)) {
      e.preventDefault();
      this.setActive(tab);
    }
  };

  /**
   * When the window resizes, determine the size we should be using for tabs.
   * @param {Object} e
   */


  Tabs.prototype._onResize = function _onResize() {
    this._determineSize();
    this.focus(this.activeTabEl);
  };

  /**
   * When the touchstart event fires, start the scrolling process
   * @param {Object} e
   */


  Tabs.prototype._onTouchStart = function _onTouchStart(e) {

    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    this.start({
      lastX: e.touches[0].clientX,
      lastY: e.touches[0].clientY,
      type: 'touch'
    });
  };

  /**
   * As the user continues moving the touch, determine
   * if we should move.
   * @param {Object} e
   */


  Tabs.prototype._onTouchMove = function _onTouchMove(e) {

    var xDistance = e.touches[0].clientX - this.lastX;
    var yDistance = e.touches[0].clientY - this.lastY;

    // If we haven't yet determined a scroll direction
    if (!this.scrollDirection) {

      // Moving up and down
      if (Math.abs(yDistance) > Math.abs(xDistance)) {
        this.scrollDirection = 'ns';
      }
      // Moving side to side
      else {
          this.scrollDirection = 'ew';
        }
    }

    // If We're moving left to right, start the move.
    if (this.scrollDirection === 'ew') {

      e.preventDefault();

      this.move({
        x: xDistance
      });
    }

    this.lastX = e.touches[0].clientX;
    this.lastY = e.touches[0].clientY;
  };

  /**
   * When the touch is over.
   * @param {Object} e
   */


  Tabs.prototype._onTouchEnd = function _onTouchEnd() {

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'touch'
      });
    }.bind(this), 1);
  };

  /**
   * When the mousedown event fires, start the scrolling process
   * @param {Object} e
   */


  Tabs.prototype._onMouseDown = function _onMouseDown(e) {

    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    this.start({
      lastX: e.clientX,
      lastY: e.clientY,
      type: 'mouse'
    });
  };

  /**
   * As the user continues moving the mouse, determine
   * if we should move.
   * @param {Object} e
   */


  Tabs.prototype._onMouseMove = function _onMouseMove(e) {

    var xDistance = e.clientX - this.lastX;
    var yDistance = e.clientY - this.lastY;

    // If we haven't yet determined a scroll direction
    if (!this.scrollDirection) {

      // Moving up and down
      if (Math.abs(yDistance) > Math.abs(xDistance)) {
        this.scrollDirection = 'ns';
      }
      // Moving side to side
      else {
          this.scrollDirection = 'ew';
        }
    }

    // If We're moving left to right, start the move.
    if (this.scrollDirection === 'ew') {

      e.preventDefault();

      this.move({
        x: xDistance
      });
    }

    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  /**
   * When the mouse move is complete.
   * @param {Object} e
   */


  Tabs.prototype._onMouseUp = function _onMouseUp() {

    // If we haven't been dragging, get outta here!
    if (!this.isDragging) {
      return;
    }

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'mouse'
      });
    }.bind(this), 1);
  };

  /**
   * When the user scrolls horizontally on the tabs, slide.
   * @param {Object} e
   */


  Tabs.prototype._onScroll = function _onScroll(e) {

    // Don't bother if we aren't scrollable
    if (!this.isScrollable) {
      return;
    }

    // Disable the animation class so we scroll smoothly
    this._disableAnimation();

    // Allow for Firefox's wheel detail
    var val = e.wheelDeltaX || -e.detail * 40;

    // If the scroll has moved...
    if (val) {

      // Supress native
      e.preventDefault();

      // Move us to the new position
      this.move({
        x: val,
        scroll: true
      });
    }

    // Cancel an existing scroll timer
    if (this.scrollTimer) {
      window.clearTimeout(this.scrollTimer);
      this.scrollTimer = null;
    }

    // The scroll is considered "done" after 100ms
    this.scrollTimer = window.setTimeout(this._onScrollEnd.bind(this), 100);
  };

  /**
   * When the scrolling ends, reset the scrollTop
   */


  Tabs.prototype._onScrollEnd = function _onScrollEnd() {

    // Enable the animation class
    this._enableAnimation();

    // Stop after one frame so that animation is fully reenabled
    window.setTimeout(function () {
      this.stop({
        type: 'scroll'
      });
    }.bind(this), 1);
  };

  /**
   * When the left button is clicked, slide the tabs to the right.
   */


  Tabs.prototype._onLeftClick = function _onLeftClick() {
    this.move({
      x: this.tabListScrollEl.clientWidth,
      force: true
    });
    this.stop({
      type: 'force'
    });
  };

  /**
   * When the right button is clicked, slide the tabs to the left.
   */


  Tabs.prototype._onRightClick = function _onRightClick() {
    this.move({
      x: -this.tabListScrollEl.clientWidth,
      force: true
    });
    this.stop({
      type: 'force'
    });
  };

  /**
   * When focus is gained on a tab.
   * @param {Object} e
   */


  Tabs.prototype._onFocus = function _onFocus(e) {
    var target = e.target || e.srcElement;
    var parent = (0, _getParent2.default)(target, '.spark-tabs__tab', this.tabListEl);
    if (parent) (0, _addClass2.default)(parent, 'focus');
  };

  /**
   * When focus is lost on a tab.
   * @param {Object} e
   */


  Tabs.prototype._onBlur = function _onBlur(e) {
    var target = e.target || e.srcElement;
    var parent = (0, _getParent2.default)(target, '.spark-tabs__tab', this.tabListEl);
    if (parent) (0, _removeClass2.default)(parent, 'focus');
  };

  return Tabs;
}(_base2.default);

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */


Tabs.prototype._whitelistedParams = ['useHash', 'breakpoints'];

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Tabs.prototype.defaults = {
  el: null,
  tabListEl: null,
  tabListScrollEl: null,
  tabEls: null,
  panelEls: null,
  activeTabEl: null,
  activePanelEl: null,
  navEl: null,
  leftEl: null,
  rightEl: null,
  useHash: false,
  isScrollable: false,
  isDragging: false,
  isAnimatable: false,
  scrollDirection: '',
  scrollDistance: 0,
  lastX: 0,
  lastY: 0,
  minX: 0,
  maxX: 0,
  x: 0,
  _onFocusBound: null,
  _onBlurBound: null,
  _onTabListClickBound: null,
  _onLeftClickBound: null,
  _onRightClickBound: null,
  _onResizeBound: null,
  _onTouchStartBound: null,
  _onTouchMoveBound: null,
  _onTouchEndBound: null,
  _onMouseDownBound: null,
  _onMouseMoveBound: null,
  _onMouseUpBound: null,
  _onScrollBound: null
};

exports.default = Tabs;
module.exports = exports['default'];
//# sourceMappingURL=tabs.js.map
