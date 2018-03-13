/**
 * # Outer Height
 * Get the outer height of an element (including margin and border)
 *
 * @param {Element} el
 * @param {Object} styles Optional Already have computed styles? Pass them in.
 *
 * @example
 * outerHeight(el, computedStyles);
 *
 * @module helpers/outer-height.js
 */
import each from '../util/each';

const props = ['marginTop', 'marginBottom', 'borderTop', 'borderBottom'];

function outerHeight(el, styles) {

  styles = styles || window.getComputedStyle(el);

  let height = el.clientHeight;

  each(props, (prop) => {
    height += parseInt(styles[prop] || 0, 10);
  });

  return height;
}

export default outerHeight;
