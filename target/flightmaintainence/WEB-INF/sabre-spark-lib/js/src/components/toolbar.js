/**
 * # Toolbar
 * Setup a responsive toolbar
 *
 * @example
 * new Toolbar(el);
 *
 * @module components/toolbar.js
 */
import debounce from '../helpers/util/debounce';
import addClass from '../helpers/dom/add-class';
import hasClass from '../helpers/dom/has-class';
import removeClass from '../helpers/dom/remove-class';
import {boolean as getBooleanAttribute} from '../helpers/dom/parse-attribute';

class Toolbar {

  /**
   * Toolbar constructor.
   * @param {Element} el
   * @param {Object} params
   */
  constructor(el) {
    if (!el) return;
    this._init(el);
  }


  /**
   * This function will update cached sizing when an element in the toolbar is changed
   * or, when toolbar items are added or removed
   */
  change() {
    this._closeAll();
    removeClass(this.el, ['ready', 'show-more', 'measured']);
    var v = document.createDocumentFragment();
    for (var i = 0; i < this.items.length; i++) {
      v.appendChild(this.items[i].el);
    }
    this.visibleContainer.appendChild(v);
    this._initItems();
    addClass(this.el, 'measured');
    this._calculateStyles();
    addClass(this.el, 'ready');
    return this;
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   */
  update(el) {

    if (el) {
      this.remove(true);
      this._init(el);
    }
    else {
      this.change();
    }

    return this;
  }



  /**
   * Remove the element from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  remove(leaveElement) {
    this._removeListeners();
    delete this.el.sparktoolbarcon;
    delete this.showMoreButton.sparktoolbarshowmore;
    for(var i = 0; i < this.items.length; i++) {
      this.items[i].remove();
    }
    if (!leaveElement && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      this.el = undefined;
    }
    return this;
  }


  /**
   * Setup a toolbarItem Instance to track the state of individual toolbar items
   * @param {Element} parent Reference to parent toolbar
   * @param {Element} el Node to initalize as toolbarItem
   * @param {Number} order The original index of the item in list of toolbarItems (used for maintaining order when sorting)
   */
  toolbarItem(parent, el, order) {
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
    a.closeOnClick = hasClass(a.el, 'spark-toolbar__item--close-more-on-click');
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
    a.toggleDropdown = function(open) {
      var o = typeof open !== 'undefined' ? !open : a.toggleDropdown.open;
      if (o) {
        a.toggleDropdown.open = false;
        removeClass(a.el, 'animate');
        window.setTimeout(function() {
          removeClass(a.el, 'open');
        }, 100);
      }
      else {
        if (a.hasContent) {
          a.toggleDropdown.open = true;
          addClass(a.el, 'open');
          a.positionDropdown();
          var e = document.createEvent('Event');
          e.initEvent('spark.visible-children', true, true);
          a.dropdown.dispatchEvent(e);
          window.setTimeout(function() {
            addClass(a.el, 'animate');
          }, 0);
        }
        else {
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
    a.handleClick = function(e) {

      if (getBooleanAttribute(a.el, 'disabled')) {
        e.preventDefault();
        return;
      }

      if (!a.toggleDropdown.open) {
        a.toggleDropdown(true);
      }
      else {
        if (e.target === a.el || e.target === a.helper) {
          a.toggleDropdown();
        }
        else {
          var b = e.target;
          while (b !== a.el) {
            if (hasClass(b, 'spark-toolbar__item--close-on-click')) {
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
    a.positionDropdown = function() {
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
    a.remove = function() {
      if (a.el) {
        delete a.el.sparktoolbar;
      }
      if (a.dropdown) {
        delete a.dropdown.sparktoolbardropdown;
      }
    };
    a.el.sparktoolbar = a;
    return a;
  }


  /**
   * Close any open items, and more dropdown
   */
  _closeAll() {
    this._closeItems();
    this._toggleShowMore(false);
  }


  /**
   * Returns array of open toolbarItems
   */
  _getOpenItems() {
    var a = [];
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].toggleDropdown.open) {
        a.push(this.items[i]);
      }
    }
    return a;
  }


  /**
   * Close any open items
   * @param {Array} a Optional array of toolbarItems to close, defaults to all open items
   */
  _closeItems(a) {
    a = typeof a === 'undefined' ? this._getOpenItems() : a;
    for (var i = 0; i < a.length; i++) {
      a[i].toggleDropdown(false);
    }
  }


  /**
   * Setup the toolbar element, cache properties, and initalize styling
   * when complete, show toolbar
   * @param {Element} el The node to initalize on
   */
  _init(el) {
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
    addClass(this.el, 'measured');
    this._calculateStyles();
    this.tabindex = this.el.attributes.tabindex ? this.el.attributes.tabindex.value : 0;
    addClass(this.el, 'ready');
  }


  _initItems() {
    var items = this.el.querySelectorAll('.spark-toolbar__item');
    this.items = [];
    for (var i = 0; i < items.length; i++) {
      this.items[i] = new this.toolbarItem(this, items[i], i);
    }
  }


  /**
   * Setup event listeners for clicks and resize events
   */
  _setupListeners() {
    this._handleWindowClick = this._handleWindowClickH.bind(this);
    document.addEventListener('click', this._handleWindowClick);
    this._handleResize = debounce(this._handleResizeH.bind(this), 100);
    window.addEventListener('resize', this._handleResize);
    this._handleKeyDown = this._handleKeyDownH.bind(this);
    this.el.addEventListener('keydown', this._handleKeyDown);
    this._handleFocus = this._handleFocusH.bind(this);
    document.addEventListener('focus', this._handleFocus, true);
    this._handleBlur = this._handleBlurH.bind(this);
    document.addEventListener('blur', this._handleBlur, true);
    this._handleVisibleChildren = this._handleVisibleChildrenH.bind(this);
    document.addEventListener('spark.visible-children', this._handleVisibleChildren, true);
  }


  /**
   * Remove event listeners for clicks and resize events
   */
  _removeListeners() {
    document.removeEventListener('click', this._handleWindowClick);
    window.removeEventListener('resize', this._handleResize);
    this.el.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('blur', this._handleBlur, true);
    document.removeEventListener('focus', this._handleFocus, true);
    document.removeEventListener('spark.visible-children', this._handleVisibleChildren, true);
  }


  /**
   * reset our tab index when user focuses outside of element (gets immediately reset to -1 if focus is placed back inside element)
   * @param {Event} e The FocusEvent
   */
  _handleBlurH(e) {
    if (this.el.contains(e.target)) {
      this.el.attributes.tabindex.value = this.tabindex;
    }
  }


  /**
   * focus handler, works in conjunction with blur handler to set correct tabindex value
   * @param {Event} e The FocusEvent
   */
  _handleFocusH(e) {
    //if we're not being focused, reset our tabindex so we are accessible again, and close anything open
    if (!this.el.contains(e.target)) {
      this._closeAll();
      this.el.attributes.tabindex.value = this.tabindex;
    }
    else {
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
  }


  /**
   * reset our focus to the last menu item that was focused
   */
  _focusLast() {
    if (!this._lastFocus) {
      var a = this.visibleContainer.querySelector('.spark-toolbar__item') || this.hiddenContainer.querySelector('.spark-toolbar__item');
      this._lastFocus = a.sparktoolbar;
    }
    if (this.hiddenContainer.contains(this._lastFocus.el)) {
      this._toggleShowMore(true);
    }
    this._lastFocus.el.focus();
  }


  /**
   * keydown handler, used for keyboard navigation
   * @param {Event} e The KeyDown Event
   */
  _handleKeyDownH(e) {
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
          }
          else {
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
          }
          else {
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
  }


  /**
   * Hanldes the spark.visible-children event to resize the component when it is made visible.
   * @param {Event} e The spark.visible-children event
   */
  _handleVisibleChildrenH(e) {
    if(e.target.contains(this.el)) {
      window.setTimeout(function() {
        this.change();
      }.bind(this),0);
    }
  }


  /**
   * Event handler for click events, handles window clicks, control element clicks,
   * and forwards events to toolbarItem click handlers as needed
   * @param {Event} e The click event
   */
  _handleWindowClickH(e) {

    if (getBooleanAttribute(e.target, 'disabled')) {
      e.preventDefault();
      return;
    }

    //Check to see if the click was outside of the toolbar
    if (!this.el.contains(e.target)) {
      this._closeItems();
      this._toggleShowMore(false);
    }
    else {
      var a = e.target;
      //traverse the dom node tree until we find an element that handles the event,
      //or we reach the toolbar root node
      if(a === this.visibleContainer || a === this.el) {
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
  }


  /**
   * Toggle the state of the show more dropdown, optional parameter overrides toggle and
   * sets state to passed value
   * @param {Boolean} open The new state of the show more dropdown
   */
  _toggleShowMore(open) {
    var o = typeof open !== 'undefined' ? !open : this.isOpen;
    if (o) {
      removeClass(this.el, 'animate');
      window.setTimeout(function() {
        removeClass(this.el, 'open');
        this.isOpen = false;
      }.bind(this), 100);
    }
    else {
      this.isOpen = true;
      addClass(this.el, 'open');
      this._positionShowMore();
      window.setTimeout(function() {
        addClass(this.el, 'animate');
      }.bind(this), 0);
    }
  }


  /**
  * Do bounds checking on show-more dropdown when it is opened, and position it accordingly
  */
  _positionShowMore() {
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
  }


  /**
   * Resize event helper, closes items then triggers recalculation of styles
   */
  _handleResizeH() {
    this._closeAll();
    this._calculateStyles();
  }


  /**
   * Reevaluates the available area of the toolbar and places toolbarItems into
   * the hidden container, as necessary. Should not call with any specified value
   * for showMore (used internally)
   * @param {Boolean} showMore Used to conditionally evaluate styling when showMore area is used
   */
  _calculateStyles(showMore) {
    this.el.style.width = '100%';
    showMore = typeof showMore !== 'undefined' ? showMore : false;
    if (!showMore) {
      removeClass(this.el, 'show-more');
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
      }
      else {
        if (!showMore) {
          addClass(this.el, 'show-more');
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
  }


  /**
   * Sorts toolbar items in descending order based on their priority value
   */
  _prioritySort(l, r) {
    return r.priority - l.priority;
  }


  /**
   * Sorts toolbar items in ascending order based on their order value
   */
  _orderSort(l, r) {
    return l.order - r.order;
  }
}

export default Toolbar;
