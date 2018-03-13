/**
 * # Affix
 * Affix one element to another.
 *
 * @example
 * new Affix({
 *   el: el,
 *   targetEl: el2,
 *   caretEl: el3,
 *   anchorY: 'top', // 'middle', 'bottom'
 *   anchorX: 'left', // 'center', 'right'
 * })
 *
 * @module helpers/position/affix.js
 */

import offset from '../dom/offset';
import boxPosition from './box-position';
import debounce from '../util/debounce';

class Affix {

  /**
   * Store the reference elements and position.
   * @param  {Object} params
   */
  constructor(params = {}) {

    this.el = params.el;
    this.targetEl = params.targetEl;
    this.caretEl = params.caretEl;
    this.anchorY = params.anchorY || 'top';
    this.anchorX = params.anchorX || 'center';
    this.isFixed = params.isFixed || false;

    this._addEventListeners();
    this._insertEl();
    this._setPosition();
    this._updateDebounced = debounce(this.update.bind(this), 500);
  }


  /**
   * Stop listening and clean up event listeners
   * @param {Object} params Optional
   * @return {Object} this
   */
  remove(params = {}) {
    if (!params.keepEl) this._removeEl();
    this._removeEventListeners();
    return this;
  }


  /**
   * Update the position.
   * @return {Object} this
   */
  update() {
    this._setPosition();
    return this;
  }


  /**
   * Listen for window resizes to update the position.
   */
  _addEventListeners() {
    this._onResizeBound = this._onResize.bind(this);
    this._onScrollBound = this._onScroll.bind(this);
    window.addEventListener('resize', this._onResizeBound);
    window.addEventListener('scroll', this._onScrollBound);
  }


  /**
   * Remove event listeners
   */
  _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
    window.removeEventListener('scroll', this._onScrollBound);
  }


  /**
   * Insert the element into the DOM.
   */
  _insertEl() {
    this.el.setAttribute('data-affixed', '');
    this._getRootEl().appendChild(this.el);
  }


  /**
   * Remove the element from the DOM.
   */
  _removeEl() {
    this.el.parentNode.removeChild(this.el);
    this.el.removeAttribute('data-affixed');
  }


  /**
   * Set the position of the target element.
   */
  _setPosition() {

    // Fixed position
    this.el.style.setProperty('position', this.isFixed ? 'fixed' : 'absolute', 'important');

    // Target element properties
    let {top: targetTop, left: targetLeft} = offset(this.targetEl, this.isFixed);
    let targetWidth = this.targetEl.offsetWidth;
    let targetHeight = this.targetEl.offsetHeight;

    // Element to affix properties
    let elWidth = this.el.offsetWidth;
    let elHeight = this.el.offsetHeight;

    // Maxes
    let docHeight = document.documentElement.offsetHeight;
    let docWidth = document.documentElement.offsetWidth;

    // Get the values
    let {elTop, elLeft} = this._calculatePosition({
      anchorX: this.anchorX,
      anchorY: this.anchorY,
      targetTop,
      targetLeft,
      elHeight,
      elWidth,
      targetHeight,
      targetWidth,
      minX: 0,
      minY: 0,
      maxX: docWidth - elWidth,
      maxY: Math.max(docHeight - elHeight, 0)
    });

    // Position the caret
    let {extraLeft, extraTop} = this._positionCaret({
      elLeft,
      elTop,
      elWidth,
      elHeight,
      targetHeight,
      targetWidth,
      targetLeft,
      targetTop
    });

    // Set the position
    this.el.style.left = elLeft + extraLeft + 'px';
    this.el.style.top = elTop + extraTop + 'px';
  }


  /**
   * Get the proper top position for an anchor direction.
   * @param  {Object} p
   * @return {Object}
   */
  _calculatePosition(p) {

    // Keep track of what we're trying to do here, so on subsequent, nested calls to this
    // method we can see what has already been tried.
    p.previousAttempts = (p.previousAttempts || 0) + 1;
    p.previousChecks = p.previousChecks || [];

    let finalCheck = p.previousAttempts > 3;
    let top;
    let left;

    // Y-axis check
    switch (p.anchorY) {
      case 'bottom':
        top = p.targetTop + p.targetHeight;
        break;
      case 'middle':
        top = p.targetTop - ((p.elHeight - p.targetHeight) / 2);
        break;
      default:
        top = p.targetTop - p.elHeight;
        break;
    }

    // Under min
    if (top < p.minY) {

      if (!finalCheck && p.previousChecks.indexOf('overY') === -1) {
        p.previousChecks.push('underY');
        p.anchorY = this._getNewAnchorY(true, p.anchorY, p.anchorX);
        return this._calculatePosition(p);
      }
      else {
        top = p.minY;
      }
    }

    // Don't check for being too tall because causing a vertical scroll
    // bar down is okay and this saves us from some real positioning hell.
    /*if (top > p.maxY) {

      if (!finalCheck && p.previousChecks.indexOf('underY') === -1) {
        p.previousChecks.push('overY');
        p.anchorY = this._getNewAnchorY(false, p.anchorY, p.anchorX);
        return this._calculatePosition(p);
      }
      // On a final check, bottom wins because at least we can scroll
      else if (!(finalCheck && p.anchorY === 'bottom')) {
        top = p.maxY;
      }
    }*/

    // X-axis check
    switch (p.anchorX) {
      case 'right':
        left = p.targetLeft + (p.anchorY !== 'middle' && !p.isOverlapping ? 0 : p.targetWidth);
        break;
      case 'center':
        left = p.targetLeft - ((p.elWidth - p.targetWidth) / 2);
        break;
      default:
        left = p.targetLeft - p.elWidth + (p.anchorY !== 'middle' ? p.targetWidth : 0);
        break;
    }

    // Under min
    if (left < p.minX) {

      if (!finalCheck && p.previousChecks.indexOf('overX') === -1) {
        p.previousChecks.push('underX');
        p.anchorX = this._getNewAnchorX(true, p.anchorX, p.anchorY);
        return this._calculatePosition(p);
      }
      else {
        left = p.minX;
      }
    }

    // Over max
    if (left > p.maxX) {

      if (!finalCheck && p.previousChecks.indexOf('underX') === -1) {
        p.previousChecks.push('overX');
        p.anchorX = this._getNewAnchorX(false, p.anchorX, p.anchorY);
        return this._calculatePosition(p);
      }
      else {
        left = p.maxX;
      }
    }

    // One element is covering another. Try to fix that, but bail out after four tries.
    if (boxPosition(
      {width: p.elWidth, height: p.elHeight, left: left, top: top},
      {width: p.targetWidth, height: p.targetHeight, left: p.targetLeft, top: p.targetTop}
    ) === 'overlap') {

      p.isOverlapping = true;

      // Try Y
      if (p.repositionY !== false) {

        // Will start undefined, then true, then false. This limits us to entering
        // this loop twice, once to try moving in each direction.
        p.repositionY = !p.repositionY;

        // First try to put above, then try to put below.
        p.anchorY = this._getNewAnchorY(p.repositionY, 'middle', p.anchorX);

        // Give us one more shot at positioning
        p.previousAttempts--;

        return this._calculatePosition(p);
      }
      // Try X
      else if (p.repositionX !== false) {

        // Will start undefined, then true, then false. This limits us to entering
        // this loop twice, once to try moving in each direction.
        p.repositionX = !p.repositionX;

        // First try to put above, then try to put below.
        p.anchorX = this._getNewAnchorX(p.repositionX, 'center', p.anchorY);

        // Give us one more shot at positioning
        p.previousAttempts--;

        return this._calculatePosition(p);
      }
    }

    return {elTop: top, elLeft: left, anchorX: p.anchorX, anchorY: p.anchorY};
  }


  /**
   * Determine the new y-axis anchor
   * @param  {Boolean} underMin Under the min?
   * @param  {String} anchorY
   * @param  {String} anchorX
   * @return {String}
   */
  _getNewAnchorY(underMin, anchorY, anchorX) {

    // If the x-axis is anchored in the center, skip
    // trying to anchor to the middle because then we'd
    // be overlaying the button.
    if (anchorX === 'center' || anchorY === 'middle') {
      return underMin ? 'bottom' : 'top';
    }
    else {
      return 'middle';
    }
  }


  /**
   * Determine the new y-axis anchor
   * @param  {Boolean} underMin Under the min?
   * @param  {String} anchorY
   * @param  {String} anchorX
   * @return {String}
   */
  _getNewAnchorX(underMin, anchorX, anchorY) {

    // If the y-axis is anchored in the center, skip
    // trying to anchor to the middle because then we'd
    // be overlaying the button.
    if (anchorY === 'middle' || anchorX === 'center') {
      return underMin ? 'left' : 'right';
    }
    else {
      return 'center';
    }
  }


  /**
   * Set the position of the caret.
   * @param {Object} p
   * @return {Object}
   */
  _positionCaret(p = {}) {

    if (!this.caretEl) return;

    let caretPosition = boxPosition(
      {width: p.elWidth, height: p.elHeight, left: p.elLeft, top: p.elTop},
      {width: p.targetWidth, height: p.targetHeight, left: p.targetLeft, top: p.targetTop}
    );

    let caretDimensions = this.caretEl.getBoundingClientRect();
    let caretWidth = caretDimensions.width;
    let caretHeight = caretDimensions.height;
    let left = Math.min(p.elWidth, Math.max(0, p.targetLeft - p.elLeft + (p.targetWidth / 2)));
    let top = Math.min(p.elHeight, Math.max(0, p.targetTop - p.elTop + (p.targetHeight / 2)));

    this.caretEl.style.left = Math.round(left) + 'px';
    this.caretEl.style.top = Math.round(top) + 'px';

    let extraLeft = 0;
    let extraTop = 0;

    this.caretEl.setAttribute('data-position', caretPosition);


    switch (caretPosition) {
      case 'above':
        extraTop = -caretWidth / 2;
        break;
      case 'below':
        extraTop = caretWidth / 2;
        break;
      case 'left':
        extraLeft = -caretHeight / 2;
        break;
      default:
        extraLeft = caretHeight / 2;
        break;
    }

    return {
      extraLeft: extraLeft,
      extraTop: extraTop
    };
  }


  /**
   * Get the root element. Want to check if there's a top-level form for working
   * with ASP .NET pages.
   */
  _getRootEl() {
    let form = document.querySelector('body > form');
    return form && form.getAttribute('data-affixed') === null ? form : document.body;
  }


  /**
   * On resize, update the position.
   */
  _onResize() {
    this.update();
  }


  /**
   * When the window scrolls, ensure the proper position of the popover.
   */
  _onScroll() {
    this._updateDebounced();
  }
}

export default Affix;
