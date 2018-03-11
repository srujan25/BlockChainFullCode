/**
 * # Trigger Event
 * Trigger a DOM event on an element.
 *
 * @param {Element} el
 * @param {String} name
 *
 * @module helpers/dom/trigger-event.js
 */
function triggerEvent(el, name) {

  let event;

  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
    event.eventName = name;
    el.dispatchEvent(event);
  }
  else {
    event = document.createEventObject();
    event.eventType = name;
    event.eventName = name;
    el.fireEvent('on' + event.eventType, event);
  }
}

export default triggerEvent;
