/**
 * # Base Component
 * The base class for Spark JS components. This class should never be
 * instantiated directly.
 *
 * @param {Element} el
 * @param {Object} params
 *
 * @module components/base.js
 */

import each from '../helpers/util/each';

const noop = function() {};

class Base {

  /**
   * Set parameters and cache elements.
   */
  constructor(el, params = {}) {

    if (params.elRequired && !el) {
      return;
    }

    this.setParams(this.defaults || {}, true);
    this.setParams(params);
    (this._cacheElements || noop).call(this, el, params);
    (this._parseParams || noop).call(this);
  }


  /**
   * Remove the component from the DOM and prepare for garbage collection by dereferencing values.
   * @param {Boolean} leaveElement Leave the element intact.
   */
  remove(leaveElement) {

    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    if (!leaveElement && this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }

    this.unsetParams(this.defaults);

    return this;
  }


  /**
   * Update the component to use a new element or reparse from
   * the existing element.
   * @param {Element} el Optional
   * @param {Object} params Optional
   */
  update(el, params = {}) {

    if (this._removeEventListeners) {
      this._removeEventListeners();
    }

    (this._cacheElements || noop).call(this, el || this.el, params);
    (this._parseParams || noop).call(this);

    if (this._addEventListeners) {
      this._addEventListeners();
    }

    return this;
  }


  /**
   * Set a hash of parameters if they're whitelisted or we're told to force the set.
   * This is used to set initial values as well as set passed parameters.
   * @param {Object} params
   * @param {Boolean} force Force setting even if the param is not whitelisted.
   */
  setParams(params, force) {

    each(params, (k, v) => {
      if (this._whitelistedParams.indexOf(k) !== -1 || force) {
        this[k] = v;
      }
    });

    return this;
  }


  /**
   * Unset all parameters.
   * @param {Array|Object} keys
   * @param {Object} scope The object to unset the params from. Defaults to `this`.
   */
  unsetParams(keys, scope) {

    keys = keys instanceof Array ? keys : Object.keys(keys);
    scope = scope || this;
    each(keys, (k) => {
      delete scope[k];
    });

    return this;
  }
}


/**
 * Whitelisted parameters which can be set on construction.
 * @type {Array}
 */
Base.prototype._whitelistedParams = [];


/**
 * Default values for internal properties we will be setting.
 * These are set on each construction so we don't leak properties
 * into the prototype chain.
 * @type {Object}
 */
Base.prototype.defaults = {};

export default Base;
