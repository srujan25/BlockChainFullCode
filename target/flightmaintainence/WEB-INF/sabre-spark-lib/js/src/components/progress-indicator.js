/**
 * # ProgressIndicator
 *
 * @example
 * new ProgressIndicator(el, {
 *   // Optional. The precision of the progress percentage.
 *   precision: 10 // 10 decimal places
 * });
 *
 * @module components/progress-indicator.js
 */
import BaseComponent from './base';
import toggleClass from '../helpers/dom/toggle-class';
import round from '../helpers/util/round';

const sizes = {
  large: {
    diameter: 264,
    stroke: 12,
    track: 'M132 6c69.588 0 126 56.412 126 126s-56.412 126-126 126S6 201.588 6 132 62.412 6 132 6z',
    fill: '',
    border: 'M132 252c-66.274 0-120-53.726-120-120S65.726 12 132 12s120 53.726 120 120-53.726 120-120 120z'
  },
  small: {
    diameter: 60,
    stroke: 6,
    track: 'M30 3c14.912 0 27 12.088 27 27S44.912 57 30 57 3 44.912 3 30 15.088 3 30 3z',
    fill: '',
    border: 'M30 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24z'
  },
  extraSmall: {
    diameter: 24,
    stroke: 3,
    track: 'M22.5 12c0 5.8-4.7 10.5-10.5 10.5S1.5 17.8 1.5 12 6.2 1.5 12 1.5 22.5 6.2 22.5 12z',
    fill: '',
    border: ''
  }
};

class ProgressIndicator extends BaseComponent {

  /**
   * ProgressIndicator constructor.
   * @param {Element} el
   * @param {Object} params
   */
  constructor(el, params = {}) {

    params.elRequired = true;

    if (!super(el, params)) {
      return;
    }

    this._bindEventListenerCallbacks();
    this._addEventListeners();
  }


  /**
   * Set the value of the indicator.
   * @param {Number} val
   */
  set(val) {

    if (val === this.value) {
      return this;
    }

    if (val > 1) {
      val = 1;
    }

    this.value = val;

    if (this.isDeterminate && this.progressEl) {
      this.progressEl.setAttribute('value', Math.round(val * 100) / 100);
    }

    this._updateDOM();

    return this;
  }


  /**
   * Store a reference to all the needed elements.
   * @param {Element} el
   */
  _cacheElements(el) {

    this.el = el;
    this.progressEl = this.el.querySelector('progress');
    this.statusEl = this.el.querySelector('.spark-progress__value-status, [role="status"]');
    this.noteEl = this.el.querySelector('.spark-progress__states');
    this.meterEl = this.el.querySelector('.spark-progress__meter');

    this.isDeterminate = this.progressEl.getAttribute('value') !== null;
    this.size = this._determineSize();

    // If this is a determinate value, replace the meter with the SVG.
    if (this.isDeterminate) {

      var svg = this._buildSVG();
      svg.setAttribute('class', this.meterEl.className);

      this.meterEl.parentNode.replaceChild(svg, this.meterEl);
      this.meterEl = svg;
      this.fillEl = this.meterEl.querySelector('.spark-progress__fill');
    }

    if (this.noteEl) {
      this._parseNotes(this.noteEl);
    }

    if (this.progressEl) {
      this.value = this.progressEl.value;
    }

    this._cacheSize();

    this._updateDOM();
  }


  /**
   * Cache the size of the meter.
   */
  _cacheSize() {
    this.meterHeight = this.meterEl.clientHeight;
    this.meterWidth = this.meterEl.clientWidth;
  }


  /**
   * Determine the size of the indicator.
   * @return {String}
   */
  _determineSize() {

    if (this.el.className.indexOf('progress--sm') !== -1) {
      return 'small';
    } else if (this.el.className.indexOf('progress--xs') !== -1) {
      return 'extraSmall';
    }

    return 'large';
  }


  /**
   * Build the proper SVG element for this size indicator.
   * @return {Element}
   */
  _buildSVG() {
    var size = sizes[this.size];
    var template = '<svg viewBox="0 0 ' + size.diameter + ' ' + size.diameter + '" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="' + size.track + '" stroke-width="' + size.stroke + '" class="spark-progress__track"/><path d="' + (size.fill || size.track) + '" stroke-width="' + size.stroke + '" class="spark-progress__fill"/><path d="' + size.border + '" class="spark-progress__border"/></g></g></svg>';
    var div = document.createElement('div');
    div.innerHTML = template;
    return div.children[0];
  }


  /**
   * Take an unordered list of notes and determine the ranges for
   * when to show a given note.
   * @param  {Element} el
   * @return {Array}
   */
  _parseNotes(el) {

    this.notes = this.notes || [];

    var len = el.children.length;
    var i = len - 1;

    for (; i >= 0; i--) {
      this.notes.push({
        min: parseInt(el.children[i].getAttribute('data-value'), 10),
        max: el.children[i + 1] ? parseInt(el.children[i + 1].getAttribute('data-value'), 10) - 1 : 100,
        el: el.children[i]
      });
    }
  }


  /**
   * Update the text visible based on the value. Also adjust the SVG.
   */
  _updateDOM() {

    if (!this.isDeterminate) {
      return;
    }

    var updateTime = Date.now();
    var val = round(this.value * 100, this.precision);

    // Don't animate if we're animating back to 0 or it's been less than 150ms since our last update.
    var noAnimation = val === 0 || this.lastDOMUpdateTime + 150 > updateTime;
    toggleClass(this.fillEl, 'no-animation', noAnimation);

    this.statusEl.innerHTML = val + '%';

    var dashArray = (sizes[this.size].diameter - sizes[this.size].stroke) * Math.PI;
    var dashOffset = dashArray - (dashArray * (val / 100));

    this.fillEl.setAttribute('style', 'stroke-dasharray: ' + dashArray + '; stroke-dashoffset: ' + dashOffset);

    this.lastDOMUpdateTime = updateTime;

    if (!this.notes) {
      return;
    }

    var i = 0;
    var len = this.notes.length;

    for (; i < len; i++) {
      toggleClass(this.notes[i].el, 'active', (this.notes[i].min <= val && this.notes[i].max >= val));
    }
  }


  /**
   * Create bound versions of event listener callbacks and store them.
   * Otherwise we can't unbind from these events later because the
   * function signatures won't match.
   */
  _bindEventListenerCallbacks() {
    this._onResizeBound = this._onResize.bind(this);
  }


  /**
   * Add event listeners for DOM events.
   */
  _addEventListeners() {
    window.addEventListener('resize', this._onResizeBound);
  }


  /**
   * Remove event listeners for DOM events..
   */
  _removeEventListeners() {
    window.removeEventListener('resize', this._onResizeBound);
  }


  /**
   * When the window resizes, cache the dimensions.
   * @param {Object} e
   */
  _onResize() {
    this._cacheSize();
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
ProgressIndicator.prototype._whitelistedParams = ['precision'];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
ProgressIndicator.prototype.defaults = {
  el: null,
  progressEl: null,
  statusEl: null,
  noteEls: null,
  meterEl: null,
  fillEl: null,
  meterHeight: 0,
  meterWidth: 0,
  notes: null,
  isDeterminate: false,
  value: null,
  precision: 0,
  lastDOMUpdateTime: 0,
  _onResizeBound: null
};

export default ProgressIndicator;
