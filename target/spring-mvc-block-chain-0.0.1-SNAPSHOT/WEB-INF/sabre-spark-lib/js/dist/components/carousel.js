'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _debounce = require('../helpers/util/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _transform = require('../helpers/css/transform');

var _transform2 = _interopRequireDefault(_transform);

var _addClass = require('../helpers/dom/add-class');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('../helpers/dom/remove-class');

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Carousel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Create a Carousel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * new Carousel(el);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module components/carousel.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Carousel = function (_BaseComponent) {
  _inherits(Carousel, _BaseComponent);

  /**
   * Carousel constructor.
   * @param {Element} el
   * @param {Object} params
   */
  function Carousel(el, params) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, el, params));

    params = params || {};

    if (!el) {
      return _possibleConstructorReturn(_this);
    }

    _this._init(el);
    return _this;
  }

  /**
   * Carousel Item Contructor, exposes access to functions setTransform, setSelected, and currentPosition
   * @param {Element} el Node to initalize as carouselItem
   * @param {Object} parent reference to the parent carousel
   * @param {Element} dot Node to use as dot element
   * @param {Number} order original order in the markup
   */


  Carousel.prototype._carouselItem = function _carouselItem(el, parent, dot, order) {
    var a = {};
    a.el = el;
    a.parent = parent;
    a.dot = dot;
    a.order = order;
    a.addTransform = function (x) {
      a.setTransform(a.transform.x + x);
    };
    a.setTransform = function (x) {
      x = x ? x : 0;
      a.transform = {
        'x': x
      };
      a.el.setAttribute('style', (0, _transform2.default)('translate3d', a.transform.x + 'px, 0px, 0px'));
    };
    a.setSelected = function (b) {
      if (a.setSelected.selected === b && typeof a.setSelected.selected !== 'undefined') {
        return;
      }
      if (b) {
        (0, _addClass2.default)(a.el, 'selected');
        (0, _addClass2.default)(a.dot, 'selected');
        a.setSelected.selected = true;
      } else {
        (0, _removeClass2.default)(a.el, 'selected');
        (0, _removeClass2.default)(a.dot, 'selected');
        a.setSelected.selected = false;
      }
    };
    a.currentPosition = function () {
      return parent.transform.x + a.transform.x + a.dims.left + a.width / 2 - parent.dims.left;
    };
    a.setTransform();
    a.dims = el.getBoundingClientRect();
    a.width = a.dims.width;
    a.el.sparkcarouselitem = a;
    a.dot.sparkcarouselitemdot = a;
    return a;
  };

  /**
   * Scans element and sets up or resets the carousel based on configuration
   * @param {Element} el Node to initalize as the carousel
   */


  Carousel.prototype._init = function _init(el) {
    //cache elements and controls
    this.el = el;
    this.el.sparkcarousel = this;
    this.backe = this.el.querySelector('.spark-carousel__back');
    this.forwarde = this.el.querySelector('.spark-carousel__forward');
    this.outerContainer = this.el.querySelector('.spark-carousel__outer-container');
    this.containerMask = this.el.querySelector('.spark-carousel__container-mask');
    this.container = this.el.querySelector('.spark-carousel__container');
    this.dots = this.el.querySelector('.spark-carousel__dots');
    this.pauseEl = this.el.querySelector('.spark-carousel__pause');
    //get the options from the element
    this.opts = {};
    this.opts.wrapItems = this.el.attributes['data-spark-carousel-wrap-items'] ? true : false;
    this.opts.startingVelocity = this.el.attributes['data-spark-carousel-scroll-velocity'] ? this.el.attributes['data-spark-carousel-scroll-velocity'].value : 10;
    this.opts.smoothScroll = this.el.attributes['data-spark-carousel-smooth-scroll'] ? true : false;
    this.opts.smoothScrollCenterItems = this.el.attributes['data-spark-carousel-smooth-scroll-center'] ? true : false;
    this.opts.panelScroll = this.el.attributes['data-spark-carousel-panel'] ? true : false;
    this.opts.edgeScroll = this.opts.panelScroll || this.el.attributes['data-spark-carousel-edge'] ? true : false;
    this.opts.autoAdvance = this.el.attributes['data-spark-carousel-auto-advance'] ? this.el.attributes['data-spark-carousel-auto-advance'].value : false;
    //setup autoAdvance
    if (this.opts.autoAdvance && !this.autoAdvance && !this.pause) {
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    }
    //conditionally bind pause handlers.
    //needs to be done here so that resetting the carousel will work correctly
    if (this.opts.autoAdvance && !this.pauseH) {
      this.pauseH = this._pause.bind(this);
      this.pauseEl.addEventListener('click', this.pauseH);
    }
    //collect items and cache sizing
    var a = this.el.querySelectorAll('.spark-carousel__item');
    this.items = [];
    this.totalItemWidth = 0;
    this.dims = this.containerMask.getBoundingClientRect();
    this.width = this.dims.width;
    this.height = this.dims.height;
    var dots = document.createDocumentFragment();
    var b;
    //create our carouselItems
    for (var i = 0; i < a.length; i++) {
      b = document.createElement('div');
      dots.appendChild(b);
      this.items.push(new this._carouselItem(a[i], this, b, i));
      this.totalItemWidth += this.items[i].width;
    }
    //if we're resetting we need to empty out the exisiting elements first
    while (this.dots.firstChild) {
      this.dots.removeChild(this.dots.firstChild);
    }
    this.dots.appendChild(dots);
    //this is to test if we're dealing with 2011 flexbox (IE10) and need to do an adjustment
    //this is because ms-flex-pack: center doesn't work like 2012 flexbox center-pack
    if (typeof this.container.style.msFlexAlign !== 'undefined') {
      this._transformItems(-(this.totalItemWidth - this.width) / 2);
    }
    //setup inital transform
    this._setTransform();
    //need to bind this event handler here as we are always going to need to be listening
    //for this event, in order to react to container visibility changing
    this._handleVisibleChildren = this._handleVisibleChildrenH.bind(this);
    document.addEventListener('spark.visible-children', this._handleVisibleChildren, true);
    if (!this._rafHandler) {
      this._rafHandler = this._rafHandlerH.bind(this);
    }
    //need to also listen to resize events, even if we don't have items overflowing
    if (!this.resizeH) {
      this.resizeH = (0, _debounce2.default)(this._resize.bind(this), 100);
      window.addEventListener('resize', this.resizeH);
    }
    //if we haven't already init'd event listerers, and we have items overflowing
    if (this.totalItemWidth > this.width) {
      if (!this.touchstartH) {
        (0, _removeClass2.default)(this.el, 'noscroll');
        this._setupListeners();
        //center the first item
        this._addTransform(-this.items[0].currentPosition() + this.width / 2);
      }
    }
    //if we don't have overflowing items, then disable scrolling and remove listeners
    else {
        (0, _addClass2.default)(this.el, 'noscroll');
        this._removeListeners();
      }
    //set the new selected item
    this._updateSelected();
    //finally, display the element
    (0, _addClass2.default)(this.el, 'ready');
  };

  /**
   * Tears down the component, removes listeners, and conditionally delete the DOM element
   * @param {Boolean} leaveElement Falsey value will remove the DOM element as well as the component instance
   */


  Carousel.prototype.remove = function remove(leaveElement) {
    window.removeEventListener('resize', this.resizeH);
    delete this.resizeH;
    document.removeEventListener('spark.visible-children', this._handleVisibleChildren, true);
    delete this._handleVisibleChildren;
    _BaseComponent.prototype.remove.call(this, leaveElement);
  };

  /**
   * Pause/unpause the autoAdvance feature
   */


  Carousel.prototype._pause = function _pause() {
    if (this.pause) {
      delete this.moves;
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    } else {
      this._rafCancel();
      if (!this.opts.smoothScroll || this.opts.smoothScrollCenterItems) {
        this._scrollTo(this._selectedItem());
      }
      window.clearTimeout(this.autoAdvance);
      delete this.autoAdvance;
    }
    this._setPause(!this.pause);
  };

  /**
   * toggles the pause class on the element
   * @param {Boolean} b Truthy value will give the element the pause class
   */


  Carousel.prototype._setPause = function _setPause(b) {
    if (typeof b === 'undefined') {
      this.pause = typeof this.pause === 'undefined' ? false : this.pause;
      return this.pause;
    } else {
      if (b) {
        (0, _addClass2.default)(this.el, 'pause');
      } else {
        (0, _removeClass2.default)(this.el, 'pause');
      }
      this.pause = b;
      return this.pause;
    }
  };

  /**
   * function called by window.setTimeout, will check first to see if element is in use before triggering a slide advance
   */


  Carousel.prototype._autoAdvance = function _autoAdvance() {
    if (!this.moves && !this._laststart && !this.paused) {
      this._rafCancel();
      var a = this.items.indexOf(this._selectedItem());
      this._scrollToItem = true;
      this._scrollTo(this.items[a === this.items.length - 1 ? 0 : a + 1]);
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    }
  };

  /**
   * initalize and bind even listeners
   */


  Carousel.prototype._setupListeners = function _setupListeners() {
    this.touchstartH = this._touchstart.bind(this);
    this.container.addEventListener('touchstart', this.touchstartH);
    this.touchmoveH = this._touchmove.bind(this);
    window.addEventListener('touchmove', this.touchmoveH);
    this.touchendH = this._touchend.bind(this);
    window.addEventListener('touchend', this.touchendH);
    this.mousedownH = this._mousedown.bind(this);
    this.container.addEventListener('mousedown', this.mousedownH);
    this.mousemoveH = this._mousemove.bind(this);
    window.addEventListener('mousemove', this.mousemoveH);
    this.mouseupH = this._mouseup.bind(this);
    window.addEventListener('mouseup', this.mouseupH);
    this.forwardH = this._forward.bind(this);
    this.forwarde.addEventListener('click', this.forwardH);
    this.backH = this._back.bind(this);
    this.backe.addEventListener('click', this.backH);
    this.clickH = this._click.bind(this);
    this.el.addEventListener('click', this.clickH);
    this._focusHandler = this._scrollToClicked.bind(this);
    this.container.addEventListener('focus', this._focusHandler, true);
  };

  /**
   * Removes non-essential event listeners, called when tearing down the component, or our content
   * does not exceed the width of our element
   */


  Carousel.prototype._removeListeners = function _removeListeners() {
    this.el.removeEventListener('touchstart', this.touchstartH);
    delete this.touchstartH;
    window.removeEventListener('touchmove', this.touchmoveH);
    delete this.touchmoveH;
    window.removeEventListener('touchend', this.touchendH);
    delete this.touchendH;
    this.el.removeEventListener('mousedown', this.mousedownH);
    delete this.mousedownH;
    window.removeEventListener('mousemove', this.mousemoveH);
    delete this.mousemoveH;
    window.removeEventListener('mouseup', this.mouseupH);
    delete this.mouseupH;
    this.forwarde.removeEventListener('click', this.forwardH);
    delete this.forwardH;
    this.backe.removeEventListener('click', this.backH);
    delete this.backH;
    this.el.removeEventListener('click', this.clickH);
    delete this.clickH;
    this.container.removeEventListener('focus', this._focusHandler, true);
    delete this._focusHandler;
    if (this.pauseEl) {
      this.pauseEl.removeEventListener('click', this.pauseH);
      delete this.pauseH;
    }
  };

  /**
   * Event handler for the spark.visible-children event, just call the change function to handle any
   * visibility or sizing changes
   * @param {Event} e The spark.visible-children event
   */


  Carousel.prototype._handleVisibleChildrenH = function _handleVisibleChildrenH(e) {
    if (e.target.contains(this.el)) {
      window.setTimeout(function () {
        this.change();
      }.bind(this), 0);
    }
  };

  /**
   * Forward button click handler triggers a scrollTo to the "next" element
   * @param {Event} e The click event
   */


  Carousel.prototype._forward = function _forward(e) {
    var s = this.items.indexOf(this._selectedItem());
    s++;
    if (s > this.items.length - 1) {
      if (this.opts.wrapItems) {
        s = 0;
      } else {
        s--;
      }
    }
    delete this.moves;
    var a = this._startingVelocity;
    a = a < -this.opts.startingVelocity ? a : -this.opts.startingVelocity;
    this._rafCancel();
    this._scrollToItem = true;
    this._scrollTo(this.items[s], a);
    if (e) {
      e.preventDefault();
    }
  };

  /**
   * Back button click handler triggers a scrollTo to the "previous" element
   * @param {Event} e The click event
   */


  Carousel.prototype._back = function _back(e) {
    var s = this.items.indexOf(this._selectedItem());
    s--;
    if (s < 0) {
      if (this.opts.wrapItems) {
        s = this.items.length - 1;
      } else {
        s++;
      }
    }
    delete this.moves;
    var a = this._startingVelocity;
    a = a > this.opts.startingVelocity ? a : this.opts.startingVelocity;
    this._rafCancel();
    this._scrollToItem = true;
    this._scrollTo(this.items[s], a);
    if (e) {
      e.preventDefault();
    }
  };

  /**
   * Move start handler, handles both touchstart and mousedown events
   * @param {Object} e The start event
   */


  Carousel.prototype._movestart = function _movestart(e) {
    this._rafCancel();
    this.moves = [];
    this.moves.push(e);
  };

  /**
   * Move handler, handles internal move event objects
   * @param {Object} e The move event
   */


  Carousel.prototype._move = function _move(e) {
    if (this.moves && this.moves.length > 1) {
      this._addTransform(e.pageX - this.moves[this.moves.length - 1].pageX);
      this.moves.push(e);
      e.preventDefault = true;
    } else {
      if (this.moves && this.moves[0]) {
        if (Math.abs(this.moves[0].pageX - e.pageX) > Math.abs(this.moves[0].pageY - e.pageY) && Math.abs(this.moves[0].pageX - e.pageX) > 5 && e.cancelable) {
          this._addTransform(e.pageX - this.moves[0].pageX);
          this.moves.push(e);
          e.preventDefault = true;
        } else {
          if (Math.abs(this.moves[0].pageX - e.pageX) > 5) {
            this.moves[0] = e;
          }
        }
      }
      if (e.type === 'touchend' || e.type === 'mouseup') {
        delete this.moves;
      }
    }
  };

  /**
   * Move end handler, handles both touchend and mouseup events
   * @param {Object} e The moveend event
   */


  Carousel.prototype._moveend = function _moveend(e) {
    this._move(e);
    if (!this.opts.smoothScroll) {
      this._settle(this.moves);
    } else {
      this._interiaScroll(this.moves);
    }
    return e;
  };

  /**
   * Resize event handler, calls change to handle any element dimension changes
   */


  Carousel.prototype._resize = function _resize() {
    this.change();
  };

  /**
   * Calling the change function will handle updating the element to take into account
   * any styling, sizing, or visibility changes, and the addition or removal of any carouselItems
   */


  Carousel.prototype.change = function change() {
    var dims = this.el.getBoundingClientRect();
    if (dims.width !== this.width || dims.height !== this.height) {
      if (this.autoAdvance) {
        window.clearTimeout(this.autoAdvance);
        delete this.autoAdvance;
      }
      this._rafCancel();
      var c = this._selectedItem();
      this._setTransform(0);
      this._setTransformItems(0);
      this._init(this.el);
      if (this.items.indexOf(c.el.sparkcarouselitem) > -1 && this.totalItemWidth > this.width) {
        if (this.opts.wrapItems) {
          this._addTransform(-this.totalItemWidth + (-c.el.sparkcarouselitem.currentPosition() + this.width / 2));
        } else {
          this._addTransform(-c.el.sparkcarouselitem.currentPosition() + this.width / 2);
        }
      }
    }
  };

  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */


  Carousel.prototype.update = function update(el) {

    el = el || this.el;

    this._removeListeners();
    window.removeEventListener('resize', this.resizeH);
    delete this.resizeH;
    document.removeEventListener('spark.visible-children', this._handleVisibleChildren, true);
    delete this._handleVisibleChildren;
    this._init(el);

    this.change();

    return this;
  };

  /**
   * Touchstart event handler, passes necessary data points to the movestart function
   * @param {Object} e The touchstart event
   */


  Carousel.prototype._touchstart = function _touchstart(e) {
    var a = {
      'type': e.type,
      'pageX': e.touches[0].pageX,
      'pageY': e.touches[0].pageY,
      'timeStamp': e.timeStamp
    };
    this._movestart(a);
  };

  /**
   * Touchmove event handler, passes necessary data points to the move function
   * @param {Object} e The touchmove event
   */


  Carousel.prototype._touchmove = function _touchmove(e) {
    var a = {
      'type': e.type,
      'pageX': e.touches[0].pageX,
      'pageY': e.touches[0].pageY,
      'timeStamp': e.timeStamp,
      'cancelable': e.cancelable
    };
    this._move(a);
    if (a.preventDefault) {
      e.preventDefault();
    }
  };

  /**
   * Touchend event handler, passes necessary data points to the moveend function
   * @param {Object} e The touchend event
   */


  Carousel.prototype._touchend = function _touchend(e) {
    if (this.moves && this.moves.length > 2 && e.cancelable) {
      var a = {
        'type': e.type,
        'pageX': this.moves[this.moves.length - 1].pageX,
        'pageY': this.moves[this.moves.length - 1].pageY,
        'timeStamp': e.timeStamp
      };
      this._moveend(a);
    } else {
      delete this.moves;
    }
  };

  /**
   * Mousedown event handler, passes necessary data points to the movestart function
   * @param {Object} e The mousedown event
   */


  Carousel.prototype._mousedown = function _mousedown(e) {
    if (e.button !== 0) {
      return e;
    }
    this.isMouseDown = true;
    var a = {
      'type': e.type,
      'pageX': e.pageX,
      'pageY': e.pageY,
      'timeStamp': e.timeStamp
    };
    this._movestart(a);
    e.preventDefault();
  };

  /**
   * Mousemove event handler, passes necessary data points to the move function
   * @param {Object} e The mousemove event
   */


  Carousel.prototype._mousemove = function _mousemove(e) {
    if (this.isMouseDown) {
      var a = {
        'type': e.type,
        'pageX': e.clientX,
        'pageY': e.clientY,
        'timeStamp': e.timeStamp,
        //this was changed to correct an issue in safari - it doesn't report cancelable correctly
        'cancelable': true
      };
      this._move(a);
      if (a.preventDefault) {
        e.preventDefault();
      }
    }
  };

  /**
   * Mouseup event handler, passes necessary data points to the moveend function
   * @param {Object} e The mouseup event
   */


  Carousel.prototype._mouseup = function _mouseup(e) {
    if (this.moves && this.moves.length > 2) {
      var a = {
        'type': e.type,
        'pageX': e.pageX,
        'pageY': e.pageY,
        'timeStamp': e.timeStamp
      };
      this._moveend(a);
      this.mouseUpHandled = true;
    } else {
      delete this.moves;
      this._scrollToClicked(e);
    }
    this.isMouseDown = false;
  };

  /**
   * Click event handler
   * @param {Object} e The click event
   */


  Carousel.prototype._click = function _click(e) {
    //if we are already tracking moves, then this will be handled by the mouseend event handler and we should prevent the default action
    if (this.moves) {
      e.preventDefault();
    }
    //if it has already been handled by mouseup handler, prevent the action
    if (this.mouseUpHandled) {
      e.preventDefault();
    }
    //reset our handled state
    delete this.mouseUpHandled;
    //checking both this.moves and this.mouseUpHandled ensures we capture events correctly in all browsers, where the order of the mouseup/click events can vary
  };

  /**
   * Calculate the user's recent cursor/finger velocity
   * @param {Array} moves The array of cursor positions
   */


  Carousel.prototype._velocity = function _velocity(moves) {
    var avg = 0;
    var m = Math.min(6, moves.length - 1);
    for (var i = 1; i < m; i++) {
      if (moves[moves.length - i].timeStamp === moves[moves.length - i - 1].timeStamp) {
        avg += avg / i;
      } else {
        avg += 10 * (moves[moves.length - i].pageX - moves[moves.length - i - 1].pageX) / (moves[moves.length - i].timeStamp - moves[moves.length - i - 1].timeStamp) / m;
      }
    }
    return avg;
  };

  /**
   * Handles click events on items and dots, scrolling to the clicked item
   * @param {Event} e The click event
   */


  Carousel.prototype._scrollToClicked = function _scrollToClicked(e) {
    var tar = e.target;
    if (this.el.contains(tar)) {
      while (!tar.sparkcarousel) {
        if (tar.sparkcarouselitem) {
          this.containerMask.scrollLeft = 0;
          delete this.moves;
          this._rafCancel();
          this._scrollTo(tar.sparkcarouselitem);
          e.preventDefault();
          break;
        }
        if (tar.sparkcarouselitemdot) {
          this.containerMask.scrollLeft = 0;
          delete this.moves;
          this._rafCancel();
          var v = tar.sparkcarouselitemdot.order < this._selectedItem().order ? this.opts.startingVelocity : -this.opts.startingVelocity;
          this._scrollTo(tar.sparkcarouselitemdot, v);
          e.preventDefault();
          break;
        }
        tar = tar.parentNode;
      }
    }
  };

  /**
   * Scroll to the carouselItem, with specified startingVelocity, auto determines default velocity if not specified
   * @param {Object} item The carouselItem to scroll to
   * @param {Number} startingVelocity The startingVelocity of the scroll animation
   */


  Carousel.prototype._scrollTo = function _scrollTo(item, startingVelocity) {
    var offset = this.width / 2;
    var currentPosition = item.currentPosition();
    if (!startingVelocity) {
      startingVelocity = offset - item.currentPosition() > 0 ? this.opts.startingVelocity : -this.opts.startingVelocity;
    }
    if (this.opts.wrapItems) {
      if (startingVelocity > 0) {
        //left
        if (currentPosition > offset) {
          this._totalDistance = offset + this.totalItemWidth - currentPosition;
        } else {
          this._totalDistance = offset - currentPosition;
        }
      } else {
        //right
        if (currentPosition < offset) {
          this._totalDistance = -(this.totalItemWidth + currentPosition - offset);
        } else {
          this._totalDistance = offset - currentPosition;
        }
      }
    } else {
      this._totalDistance = offset - currentPosition;
    }
    this._startingVelocity = startingVelocity;
    delete this.moves;
    this._scrollToItem = true;
    this._raf = window.requestAnimationFrame(this._rafHandler);
  };

  /**
   * This is the animator function, it examines the options set on the carousel object
   * and selectively adds transform and requests addtional animation frames if necesary
   * @param {Number} t The timestamp for the current animation frame
   */


  Carousel.prototype._rafHandlerH = function _rafHandlerH(t) {
    if (this.opts.autoAdvance && this.autoAdvance) {
      window.clearTimeout(this.autoAdvance);
      delete this.autoAdvance;
    }
    var frames;
    if (this.moves || !this._startingVelocity) {
      this._rafCancel();
      return;
    }
    if (!this._laststart) {
      this._laststart = t;
    }
    if (!this._remainingDistance) {
      this._remainingDistance = this._totalDistance;
    }
    if (!this._lastframe) {
      this._lastframe = t;
      frames = 1;
    } else {
      frames = (t - this._lastframe) / (1 / 60 * 1000);
    }
    var d = this._startingVelocity * frames;
    if (this.opts.smoothScroll && !this._scrollToItem) {
      this._addTransform(d);
      this._startingVelocity *= Math.pow(0.97, frames);
      if (this.opts.smoothScrollCenterItems && Math.abs(this._startingVelocity) < 1) {
        this._scrollTo(this._selectedItem());
      }
      if (Math.abs(this._startingVelocity) < 0.5) {
        if (this._startingVelocity > 0 && this.transform.x > this.totalItemWidth / 2 - this.items[0].width / 2 || this._startingVelocity < 0 && this.transform.x < -(this.totalItemWidth / 2 - this.items[this.items.length - 1].width / 2)) {
          this._scrollToItem = true;
          this._scrollTo(this._selectedItem());
        } else {
          this._rafCancel();
        }
      } else {
        this._raf = window.requestAnimationFrame(this._rafHandler);
      }
    } else {
      if (this._startingVelocity > 0) {
        if (d < this._remainingDistance) {
          this._addTransform(d);
          this._remainingDistance -= d;
          if (this._remainingDistance > this._totalDistance / 2) {
            this._startingVelocity *= Math.pow(1.15, frames);
          } else {
            this._startingVelocity *= Math.pow(0.9, frames);
            this._startingVelocity = this._startingVelocity > 2 ? this._startingVelocity : 2;
          }
          this._raf = window.requestAnimationFrame(this._rafHandler);
        } else {
          this._addTransform(this._remainingDistance);
          this._rafCancel();
        }
      } else {
        if (d > this._remainingDistance) {
          this._addTransform(d);
          this._remainingDistance -= d;
          if (this._remainingDistance < this._totalDistance / 2) {
            this._startingVelocity *= Math.pow(1.15, frames);
          } else {
            this._startingVelocity *= Math.pow(0.9, frames);
            this._startingVelocity = this._startingVelocity < -2 ? this._startingVelocity : -2;
          }
          this._raf = window.requestAnimationFrame(this._rafHandler);
        } else {
          this._addTransform(this._remainingDistance);
          this._rafCancel();
        }
      }
    }
    this._lastframe = t;
  };

  /**
   * This is the animator clearing function
   * it clears values used during animation, and selectively enables autoAdvance
   */


  Carousel.prototype._rafCancel = function _rafCancel() {
    if (this.opts.autoAdvance && !this.autoAdvance && !this.pause) {
      this.autoAdvance = window.setTimeout(function () {
        this._autoAdvance();
      }.bind(this), this.opts.autoAdvance * 1000);
    }
    window.cancelAnimationFrame(this._raf);
    delete this._scrollToItem;
    delete this._laststart;
    delete this._startingVelocity;
    delete this._remainingDistance;
    delete this._totalDistance;
    delete this._lastframe;
  };

  /**
   * This computes values necessary to start an animation frame when the carousel is
   * configured to use smoothScroll
   * @param {Array} moves The captured move events
   */


  Carousel.prototype._interiaScroll = function _interiaScroll(moves) {
    if (moves[moves.length - 1].timeStamp - moves[moves.length - 2].timeStamp > 100 || moves.length < 3) {
      if (this.opts.smoothScrollCenterItems) {
        return this._scrollTo(this._selectedItem());
      }
      return;
    }
    this._startingVelocity = this._velocity(moves);
    delete this.moves;
    this._raf = window.requestAnimationFrame(this._rafHandler);
  };

  /**
   * This determines which carousel item should be focused based on the previous moves
   * made by the user
   * @param {Array} moves The captured move events
   */


  Carousel.prototype._settle = function _settle(moves) {
    if (moves && moves.length > 3) {
      if (moves[moves.length - 1].timeStamp - moves[moves.length - 2].timeStamp > 80) {
        return this._scrollTo(this._selectedItem());
      }
      var v1 = 10 * (moves[moves.length - 3].pageX - moves[moves.length - 4].pageX) / (moves[moves.length - 3].timeStamp - moves[moves.length - 4].timeStamp);
      var v2 = 10 * (moves[moves.length - 2].pageX - moves[moves.length - 3].pageX) / (moves[moves.length - 2].timeStamp - moves[moves.length - 3].timeStamp);
      if (Math.abs(v1) < Math.abs(v2) || Math.abs(v2) > 0.5 && Math.abs(v2) > 0.5) {
        //user is probably trying to go to next or prev item
        var s = this.items.indexOf(this._selectedItem());
        if (v2 > 0) {
          //prev
          if (s > 0) {
            this._scrollTo(this.items[s - 1], v2);
          } else {
            if (this.opts.wrapItems) {
              this._scrollTo(this.items[this.items.length - 1], v2);
            } else {
              this._scrollTo(this.items[0]);
            }
          }
        } else {
          //next
          if (s < this.items.length - 1) {
            this._scrollTo(this.items[s + 1], v2);
          } else {
            if (this.opts.wrapItems) {
              this._scrollTo(this.items[0], v2);
            } else {
              this._scrollTo(this.items[this.items.length - 1]);
            }
          }
        }
      } else {
        if (this._selectedItem().currentPosition() > this.width / 2) {
          this._scrollTo(this._selectedItem(), -this.opts.startingVelocity);
        } else {
          this._scrollTo(this._selectedItem(), this.opts.startingVelocity);
        }
      }
    }
  };

  /**
   * Transforms the position of all carouselItems
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._transformItems = function _transformItems(x) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].addTransform(x);
    }
  };

  /**
   * Sets the transform position of all carouselItems
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._setTransformItems = function _setTransformItems(x) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].setTransform(x);
    }
  };

  /**
   * Adds transform to the container element, does checking for bounds conditions and
   * wraps items if necessary and configured
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._addTransform = function _addTransform(x) {
    var a;
    if ((this.opts.smoothScrollCenterItems || !this.opts.smoothScroll) && !this.opts.wrapItems && !this.opts.edgeScroll) {
      var l = this.items.indexOf(this.selectedItem);
      if (l === this.items.length - 1) {
        this._leftbound(true);
      } else {
        this._leftbound(false);
      }
      if (l === 0) {
        this._rightbound(true);
      } else {
        this._rightbound(false);
      }
    } else {
      this._leftbound(false);
      this._rightbound(false);
    }
    if (this.transform.x + x < 0 && x < 0) {
      if (this.opts.wrapItems) {
        //wrap items until we have covered the visible area
        while (this.transform.x + x < -(this.totalItemWidth - this.width) / 2 && (this.totalItemWidth < this.width ? this.transform.x + x < -this.totalItemWidth / 2 : true)) {
          a = this.items.shift();
          this.items.push(a);
          a.addTransform(this.totalItemWidth);
          this._transformItems(-a.width);
          x += a.width;
        }
      } else {
        //there is a 1 pixel adjustment to account for some math rounding
        if (this.opts.edgeScroll && x < 0 && this.transform.x + x - 1 <= -(this.totalItemWidth - this.width) / 2) {
          this._leftbound(true);
          return this._setTransform(-(this.totalItemWidth - this.width) / 2);
        }
        //progressively reduce scrolling when no more items to the right
        if (x < 0 && this.transform.x + x < -(this.totalItemWidth / 2 - this.items[this.items.length - 1].width / 2)) {
          x = x * ((this.totalItemWidth / 2 + this.items[this.items.length - 1].width / 2 + (this.transform.x + x)) / this.items[this.items.length - 1].width);
          x = x > 0 ? 0 : x;
        }
      }
      return this._setTransform(this.transform.x + x);
    } else {
      if (this.transform.x + x > 0 && x > 0) {
        if (this.opts.wrapItems) {
          //wrap items until we have covered the visible area
          while (this.transform.x + x > -(this.width - this.totalItemWidth) / 2 && (this.totalItemWidth < this.width ? this.transform.x + x > this.totalItemWidth / 2 : true)) {
            a = this.items.pop();
            this.items.unshift(a);
            a.addTransform(-this.totalItemWidth);
            this._transformItems(a.width);
            x -= a.width;
          }
        } else {
          //there is a 1 pixel adjustment to account for some math rounding
          if (this.opts.edgeScroll && x > 0 && this.transform.x + x + 1 >= (this.totalItemWidth - this.width) / 2) {
            this._rightbound(true);
            return this._setTransform((this.totalItemWidth - this.width) / 2);
          }
          //progressively reduce scrolling when no more items to the left
          if (x > 0 && this.transform.x + x > this.totalItemWidth / 2 - this.items[0].width / 2) {
            x = x * ((this.totalItemWidth / 2 + this.items[0].width / 2 - (this.transform.x + x)) / this.items[0].width);
            x = x < 0 ? 0 : x;
          }
        }
      }
      return this._setTransform(this.transform.x + x);
    }
  };

  /**
   * Sets the leftbound class
   * @param {Boolean} b Set or unset the leftbound class
   */


  Carousel.prototype._leftbound = function _leftbound(b) {
    if (typeof b === 'undefined') {
      this.leftbound = typeof this.leftbound === 'undefined' ? false : this.leftbound;
      return this.leftbound;
    } else {
      if (b) {
        (0, _addClass2.default)(this.el, 'leftbound');
      } else {
        (0, _removeClass2.default)(this.el, 'leftbound');
      }
      this.leftbound = b;
      return this.leftbound;
    }
  };

  /**
   * Sets the rightbound class
   * @param {Boolean} b Set or unset the rightbound class
   */


  Carousel.prototype._rightbound = function _rightbound(b) {
    if (typeof b === 'undefined') {
      this.rightbound = typeof this.rightbound === 'undefined' ? false : this.rightbound;
      return this.rightbound;
    } else {
      if (b) {
        (0, _addClass2.default)(this.el, 'rightbound');
      } else {
        (0, _removeClass2.default)(this.el, 'rightbound');
      }
      this.rightbound = b;
      return this.rightbound;
    }
  };

  /**
   * Updates the selected item, by seeing which item has its center closest
   * to the center of the carousel
   */


  Carousel.prototype._updateSelected = function _updateSelected() {
    var tar = this.width / 2;
    var i = -1;
    var a = 1;
    var b = 0;
    while (a > b) {
      i++;
      if (i > this.items.length - 2) {
        break;
      }
      a = Math.abs(tar - this.items[i].currentPosition());
      b = Math.abs(tar - this.items[i + 1].currentPosition());
    }
    return this._selectedItem(this.items[i]);
  };

  /**
   * Stores the selected item for the carousel, and updates the previously
   * selected item and newly selected item to have the correct states
   * Conditionally sets the leftbound/rightbound states depending on configuration
   * @param {Object} item Optional: the new item select, if omitted it will
   * return the currently selected item.
   */


  Carousel.prototype._selectedItem = function _selectedItem(item) {
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
      if (this.selectedItem) {
        return this.selectedItem;
      } else {
        return this._updateSelected();
      }
    } else {
      if (this.selectedItem) {
        this.selectedItem.setSelected(false);
      }
      this.selectedItem = item;
      if ((this.opts.smoothScrollCenterItems || !this.opts.smoothScroll) && !this.opts.wrapItems && !this.opts.edgeScroll) {
        var l = this.items.indexOf(this.selectedItem);
        if (l === this.items.length - 1) {
          this._leftbound(true);
        } else {
          this._leftbound(false);
        }
        if (l === 0) {
          this._rightbound(true);
        } else {
          this._rightbound(false);
        }
      }
      this.selectedItem.setSelected(true);
    }
  };

  /**
   * Sets the transform for the carousel container
   * @param {Number} x The pixel value to transform
   */


  Carousel.prototype._setTransform = function _setTransform(x) {
    x = x ? x : 0;
    this.transform = {
      'x': x
    };
    this.container.setAttribute('style', (0, _transform2.default)('translate3d', x + 'px, 0px, 0px'));
    this._updateSelected();
    return x;
  };

  return Carousel;
}(_base2.default);

/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */


Carousel.prototype.defaults = {
  el: null
};

/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
Carousel.prototype._whitelistedParams = [];

exports.default = Carousel;
module.exports = exports['default'];
//# sourceMappingURL=carousel.js.map
