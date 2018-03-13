var test = require('tape');
var Toolbar = require('../../src/components/toolbar');
var toolbarMarkup = '<div class="spark-toolbar">    <div class="spark-toolbar__container--visible">      <div class="spark-toolbar__item" id="spark-toolbar-test-item-1" label="Some Text">        <div class="spark-toolbar__item--content">          <ul class="spark-toolbar__list spark-toolbar__item--close-on-click">            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>          </ul>          <ul id="spark-toolbar-test-item-2" class="spark-toolbar__list spark-toolbar__list--checkboxes">            <li>              <label>                <input type="checkbox" />                <span class="spark-toolbar__list--checkboxes--helper"></span> Check              </label>            </li>            <li>              <label>                <input type="checkbox" />                <span class="spark-toolbar__list--checkboxes--helper"></span> Check              </label>            </li>            <li>              <label>                <input type="checkbox" />                <span class="spark-toolbar__list--checkboxes--helper"></span> Check              </label>            </li>            <li>              <label>                <input type="checkbox" />                <span class="spark-toolbar__list--checkboxes--helper"></span> Check              </label>            </li>            <li>              <label>                <input type="checkbox" />                <span class="spark-toolbar__list--checkboxes--helper"></span> Cheasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfck              </label>            </li>          </ul>        </div>        <div class="spark-icon-car-rental spark-toolbar__item-helper"></div>      </div>      <div class="spark-toolbar__item" label="Some Text">        <div class="spark-toolbar__item--content spark-toolbar__item--close-on-click">          <ul class="spark-toolbar__list">            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>          </ul>        </div>        <div class="spark-toolbar__item-helper"></div>      </div>      <div class="spark-toolbar__item" label="Soasdfasdfasdfasdfasdfaasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsdfasdfasdfasdfme Text">        <div class="spark-toolbar__item--content">          <h1>Some random content</h1>        </div>        <div class="spark-icon-hotel-spa spark-toolbar__item-helper"></div>      </div>      <div class="spark-toolbar__item" data-modal="#simpleModal" label="Some Text">        <div class="spark-toolbar__item-helper"></div>      </div>      <div class="spark-toolbar__item" label="No dropdown1">        <div class="spark-icon-hotel-spa spark-toolbar__item-helper"></div>      </div>      <div class="spark-toolbar__item" label="No dropdown2">        <div class="spark-toolbar__item-helper"></div>      </div>      <div class="spark-toolbar__item" label="Some">        <div class="spark-toolbar__item--content spark-toolbar__item--close-on-click">          <ul class="spark-toolbar__list">            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>            <li>An Item</li>          </ul>        </div>        <div class="spark-icon-hotel-spa spark-toolbar__item-helper"></div>      </div>    </div>    <div class="spark-toolbar__show-more">      <i class="spark-icon-menu-ellipsis-vertical"></i>    </div>    <!-- All items should be placed in .spark-toolbar__container-shown -->    <div class="spark-toolbar__container--hidden">    </div>  </div>';
var toolbarItemMarkup = '<div class="spark-toolbar__item" id="spark-toolbar-test-item-3" label="Some"><div class="spark-toolbar__item--content spark-toolbar__item--close-on-click"><ul class="spark-toolbar__list"><li>An Item</li><li>An Item</li><li>An Item</li><li>An Item</li><li>An Item</li><li>An Item</li></ul></div><div class="spark-icon-hotel-spa spark-toolbar__item-helper"></div></div>';
var hasClass = require('../../src/helpers/dom/has-class');

test('Toolbar', function(t) {
  t.plan(10);
  var a = function(t) {
    var el = document.createElement('div');
    el.innerHTML = toolbarMarkup;
    var to = new Toolbar(el.querySelector('.spark-toolbar'));
    t.equal(hasClass(to.el, 'ready'), true, 'toolbar setup');
    to.remove();
    t.equal(to.el, undefined, 'toolbar removed');
  };
  var b = function(t) {
    var el = document.createElement('div');
    el.innerHTML = toolbarMarkup;
    var to = new Toolbar(el.querySelector('.spark-toolbar'));
    var a = el.querySelector('#spark-toolbar-test-item-1');
    to._handleWindowClickH({
      target: a
    });
    t.equal(hasClass(a, 'open'), true, 'toolbar item opens');
    to._handleWindowClickH({
      target: a
    });
    window.setTimeout(function() {
      t.equal(hasClass(a, 'open'), false, 'toolbar item closes');
    }, 100);
  };
  var c = function(t) {
    var el = document.createElement('div');
    el.innerHTML = toolbarMarkup;
    var to = new Toolbar(el.querySelector('.spark-toolbar'));
    var a = el.querySelector('.spark-toolbar__show-more');
    to._handleWindowClickH({
      target: a
    });
    t.equal(hasClass(to.el, 'open'), true, 'toolbar item opens');
    to._handleWindowClickH({
      target: a
    });
    window.setTimeout(function() {
      t.equal(hasClass(to.el, 'open'), false, 'toolbar item closes');
    }, 100);
  };
  var d = function(t) {
    var el = document.createElement('div');
    el.innerHTML = toolbarMarkup;
    var to = new Toolbar(el.querySelector('.spark-toolbar'));
    var a = el.querySelector('#spark-toolbar-test-item-1');
    to._handleWindowClickH({
      target: a
    });
    t.equal(hasClass(a, 'open'), true, 'ensure item is open first');
    var b = a.querySelector('.spark-toolbar__item--close-on-click');
    to._handleWindowClickH({
      target: b
    });
    window.setTimeout(function() {
      t.equal(hasClass(a, 'open'), false, 'toolbar item closes on content click');
    }, 100);
  };
  var e = function(t) {
    var el = document.createElement('div');
    el.innerHTML = toolbarMarkup;
    var to = new Toolbar(el.querySelector('.spark-toolbar'));
    var a = el.querySelector('#spark-toolbar-test-item-1');
    to._handleWindowClickH({
      target: a
    });
    var b = a.querySelector('#spark-toolbar-test-item-2');
    to._handleWindowClickH({
      target: b
    });
    t.equal(hasClass(a, 'animate'), false, 'toolbar item remains open');
  };
  var f = function(t) {
    var el = document.createElement('div');
    el.innerHTML = toolbarMarkup;
    var to = new Toolbar(el.querySelector('.spark-toolbar'));
    var el2 = document.createElement('div');
    el2.innerHTML = toolbarItemMarkup;
    var el3 = el2.querySelector('.spark-toolbar__item');
    to.visibleContainer.appendChild(el3);
    to.change();
    var a = to.el.querySelector('#spark-toolbar-test-item-3');
    to._handleWindowClickH({
      target: a
    });
    window.setTimeout(function() {
      t.equal(hasClass(a, 'open'), true, 'added toolbar item gets functionality');
    }, 100);
  };
  a(t);
  b(t);
  c(t);
  d(t);
  e(t);
  f(t);
});

test('should update to use a new toolbar component', function(t) {

  var el = document.createElement('label');
  el.innerHTML = toolbarMarkup;
  var inst = new Toolbar(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
