'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _height = require('../helpers/animation/height');

var _height2 = _interopRequireDefault(_height);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  /**
   * Set the error state.
   * @param {String} message Optional
   */
  setError: function setError(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearWarning();
    this.clearSuccess();

    this.el.setAttribute('data-error', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the error state.
   */
  clearError: function clearError() {
    this.el.removeAttribute('data-error', true);
    return this;
  },


  /**
   * Set the warning state.
   * @param {String} message Optional
   */
  setWarning: function setWarning(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearError();
    this.clearSuccess();

    this.el.setAttribute('data-warning', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the error state.
   */
  clearWarning: function clearWarning() {
    this.el.removeAttribute('data-warning', true);
    return this;
  },


  /**
   * Set the success state.
   * @param {String} message Optional
   */
  setSuccess: function setSuccess(message) {

    // Animate down
    if (!this._isMessageVisible()) {
      this._showMessage();
    }

    this.clearError();
    this.clearWarning();

    this.el.setAttribute('data-success', true);

    if (message) {
      this.setMessage(message);
    }

    return this;
  },


  /**
   * Set the success state.
   */
  clearSuccess: function clearSuccess() {
    this.el.removeAttribute('data-success', true);
    return this;
  },


  /**
   * Clear all messages.
   */
  clearMessages: function clearMessages() {
    this._hideMessage(function () {
      this.clearError();
      this.clearWarning();
      this.clearSuccess();
    }.bind(this));
    return this;
  },


  /**
   * Set the message text.
   * @param {String} message
   */
  setMessage: function setMessage(message) {
    this.messageEl.innerHTML = message;
    return this;
  },


  /**
   * Show the message
   */
  _showMessage: function _showMessage() {

    if (!this.messageEl.parentNode) {
      this.el.appendChild(this.messageEl);
    }

    (0, _height2.default)({
      el: this.el,
      toggleEl: this.messageEl
    });
  },


  /**
   * Hide the message.
   * @param {Function} callback
   */
  _hideMessage: function _hideMessage(callback) {

    (0, _height2.default)({
      el: this.el,
      toggleEl: this.messageEl,
      toggleValue: 'none',
      action: 'collapse',
      onComplete: callback
    });
  },


  /**
   * Is the message currently visible?
   * @return {Boolean}
   */
  _isMessageVisible: function _isMessageVisible() {
    return this.el.getAttribute('data-error') || this.el.getAttribute('data-warning') || this.el.getAttribute('data-success');
  }
}; /**
    * # Messaging Mixin
    * Add functionality for showing messages related to a form field.
    *
    * @example
    * mixin(Component, messaging);
    *
    * @module mixin/messaging.js
    */

module.exports = exports['default'];
//# sourceMappingURL=messaging.js.map
