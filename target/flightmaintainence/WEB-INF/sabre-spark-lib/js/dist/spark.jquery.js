'use strict';

var _spark = require('./spark');

var components = _interopRequireWildcard(_spark);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var namespace = 'spark';

/**
 * Create a jQuery plugin version of a component.
 * @param  {String} name
 * @param  {Function} cls  The class constructor
 */
function createjQueryPlugin(name, cls) {

  $.fn[namespace + name.charAt(0).toUpperCase() + name.substr(1)] = function (method) {
    for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    return this.each(function () {

      var $this = $(this);
      var data = $this.data(namespace + '.' + name);

      // Create a new instance
      if (!data) {
        $this.data(namespace + '.' + name, data = new cls(this));
      }

      // If we have a method to call, do so.
      if (typeof method === 'string') {

        // Pitch a fit if this is a private method.
        if (method[0] === '_') {
          throw new Error('Cannot access private method "' + method + '" on the ' + name + ' class.');
        }

        // Fail if this method doesn't exist.
        if (typeof data[method] !== 'function') {
          throw new Error('No method "' + method + '" is defined on the ' + name + ' class.');
        }

        data[method].apply(data, options);
      }

      return data;
    });
  };
}

// Create a plugin for each
for (var i in components) {
  createjQueryPlugin(i, components[i]);
}
//# sourceMappingURL=spark.jquery.js.map
