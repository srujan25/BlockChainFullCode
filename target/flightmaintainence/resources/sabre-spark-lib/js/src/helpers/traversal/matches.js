/**
 * # Matches
 * See if an element matches a query selector.
 *
 * @param {Element} el
 * @param {String} query
 * @return {Boolean}
 *
 * @module helpers/traversal/matches.js
 */
const vendorMatch = typeof Element !== 'undefined' && (Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector);

function matches(el, query) {

  if (vendorMatch) return vendorMatch.call(el, query);

  let nodes = el.parentNode ? el.parentNode.querySelectorAll(query) : [];

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] === el) return true;
  }

  return false;
}

export default matches;
