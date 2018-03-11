/**
 * # Outer Width
 * Get the outer width of an element (including margin and border)
 *
 * @param {Element} el
 * @param {Object} styles Optional Already have computed styles? Pass them in.
 *
 * @example
 * outerWidth(el, computedStyles);
 *
 * @module helpers/outer-width.js
 */
import each from '../util/each';

const props = ['marginTop', 'marginBottom', 'borderTop', 'borderBottom'];

function outerWidth(el, styles) {

  styles = styles || window.getComputedStyle(el);

  let width = el.clientWidth;

  each(props, (prop) => {
    width += parseInt(styles[prop] || 0, 10);
  });

  return width;
}

export default outerWidth;
