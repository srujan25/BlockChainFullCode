import * as components from './spark';

let namespace = 'spark';

/**
 * Create a jQuery plugin version of a component.
 * @param  {String} name
 * @param  {Function} cls  The class constructor
 */
function createjQueryPlugin(name, cls) {

  $.fn[namespace + name.charAt(0).toUpperCase() + name.substr(1)] = function(method, ...options) {

    return this.each(function() {

      let $this = $(this);
      let data = $this.data(`${namespace}.${name}`);

      // Create a new instance
      if (!data) {
        $this.data(`${namespace}.${name}`, (data = new cls(this)));
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
for (let i in components) {
  createjQueryPlugin(i, components[i]);
}
