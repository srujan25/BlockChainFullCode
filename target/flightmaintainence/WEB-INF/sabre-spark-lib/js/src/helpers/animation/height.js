/**
 * # Animate Height
 * Animate the height of an element since we can't do this w/ pure CSS. Sigh.
 *
 * @example
 * animateHeight({
 *   el: ...,
 *   toggleEl: ...,
 *   // Optional params
 *   action: 'collapse'|'expand',
 *   heightAnimationClass: 'spark-animate-height',
 *   opacityAnimationClass: 'spark-animate-opacity',
 *   toggleProperty: 'display'|'overflow'|'visibility',
 *   toggleValue: 'block'|'none'|'visible'|'hidden',
 *   animationDuration: 250
 * });
 *
 * @module helpers/animation/height.js
 */

import outerHeight from '../dom/outer-height';
import addClass from '../dom/add-class';
import removeClass from '../dom/remove-class';
import hasClass from '../dom/has-class';
import toggleClass from '../dom/toggle-class';

const noop = function() {};
const runningAnimations = {
  els: [],
  completeCallbacks: []
};

/**
 * Get the inverse toggle value
 * @param  {String} property
 * @param  {String} originalValue
 * @return {String}
 */
function getInverseToggleValue(el, property, originalValue) {

  // Get the value to toggle to for the given property
  switch (property) {
    case 'overflow':
    case 'visibility':
      return originalValue === 'visible' ? 'hidden' : 'visible';
    default:
      return originalValue === 'block' || originalValue === 'inline-block' ? 'none' : 'block';
  }
}

/**
 * When an animation is complete, clean up and run the callback.
 * @param  {Object} params
 */
function onComplete(params) {

  // Reset toggle el visibility
  if (params.toggleClassName) {
    toggleClass(params.el, params.toggleClassName, !params.collapse);
  }
  else {
    params.toggleEl.style[params.toggleProperty] = '';

  }

  // Remove the height property
  params.el.style.height = '';
  params.toggleEl.style.height = '';
  params.toggleEl.style.marginBottom = '';
  params.toggleEl.style.marginTop = '';

  // Remove the spark-animate-height class so the transitions no longer apply
  removeClass(params.el, params.heightAnimationClass);
  removeClass(params.toggleEl, params.heightAnimationClass);

  // Run the callback
  params.onComplete();

  // Remove the element and callback from their respective arrays
  let runningIndex = runningAnimations.els.indexOf(params.el);
  runningAnimations.els.splice(runningIndex, 1);
  runningAnimations.completeCallbacks.splice(runningIndex, 1);
}

/**
 * @param {Object} params
 */
function animateHeight(params) {

  params = params || {};

  let el = params.el;

  if (!el) {
    return;
  }

  let collapse = params.action && params.action === 'collapse';
  let heightAnimationClass = params.heightAnimationClass || 'spark-animate-height';

  // Allow for elements to be passed or selector strings
  let toggleEl = typeof params.toggleEl === 'string' ? el.querySelector(params.toggleEl) : params.toggleEl;

  // No element to be switching with toggling so we can't determine the desired height to animate to.
  if (!toggleEl || hasClass(el, 'spark-no-animate')) {
    return;
  }

  let toggleClassName = params.toggleClass;

  // The style property to use when toggling visibility
  let toggleProperty = params.toggleProperty || 'display';
  let toggleStyles = window.getComputedStyle(toggleEl);
  let originalToggleValue = toggleStyles[toggleProperty];
  let toggleValue = params.toggleValue || getInverseToggleValue(toggleProperty, originalToggleValue);

  // If we are already animating, stop now.
  let runningIndex = runningAnimations.els.indexOf(el);
  if (runningIndex !== -1) {

    let completeCallback = runningAnimations.completeCallbacks[runningIndex];
    if (completeCallback) {
      clearTimeout(completeCallback);
    }

    onComplete({
      el: el,
      toggleEl: toggleEl,
      onComplete: params.onComplete || noop,
      collapse: collapse,
      toggleProperty: toggleProperty,
      toggleClassName: toggleClassName,
      toggleValue: toggleValue,
      heightAnimationClass: heightAnimationClass
    });
  }

  // Store the current height
  let originalHeight = outerHeight(el);

  // Toggle the visible property
  if (toggleClassName) {
    toggleClass(el, toggleClassName, !collapse);
  }
  else {
    toggleEl.style[toggleProperty] = toggleValue;
  }

  // When measuring the size for a collapse, we have to wait a tic for it to be
  // accurate. Not sure why. Ugh.
  if (collapse) {
    setTimeout(runAnimation, 0);
  }
  else {
    runAnimation();
  }

  function runAnimation() {

    // Now that the toggle el is taking up space, get the new height which we will be animating to
    let targetElHeight = outerHeight(el);

    // We need to store the original and target toggle element heights. They differ depending on
    // whether we are going to expand or collapse.
    let targetToggleElHeight;
    let originalToggleElHeight;

    // If we are collapsing, reset the toggle style and set it when we're done. Set the height so
    // that we can animate down to 0 or up to the target height.
    if (collapse) {

      if (toggleClassName) {
        removeClass(el, toggleClassName);
      }
      else {
        toggleEl.style[toggleProperty] = originalToggleValue;
      }

      originalToggleElHeight = outerHeight(toggleEl, toggleStyles);
      targetToggleElHeight = 0;
    }
    else {
      targetToggleElHeight = outerHeight(toggleEl, toggleStyles);
      originalToggleElHeight = 0;
    }

    // Set the original height
    el.style.height = originalHeight + 'px';
    toggleEl.style.height = originalToggleElHeight + 'px';
    toggleEl.style.marginBottom = '0px';
    toggleEl.style.marginTop = '0px';

    // Add the spark-animate-height class which will setup the transition-property and duration
    addClass(el, heightAnimationClass);
    addClass(toggleEl, heightAnimationClass);

    runningAnimations.els.push(el);

    // We need to wait a tick to toggle the height or else the animation class won't function
    setTimeout(function() {

      // Set the height to the target height
      el.style.height = targetElHeight + 'px';
      toggleEl.style.height = targetToggleElHeight + 'px';

      // Remove inline styles after the animation is complete
      runningAnimations.completeCallbacks.push(setTimeout(function() {
        onComplete({
          el: el,
          toggleEl: toggleEl,
          onComplete: params.onComplete || noop,
          collapse: collapse,
          toggleProperty: toggleProperty,
          toggleClassName: toggleClassName,
          toggleValue: toggleValue,
          heightAnimationClass: heightAnimationClass
        });
      }, params.animationDuration !== undefined ? params.animationDuration : 201));
    }, 0);
  }
}

export default animateHeight;
