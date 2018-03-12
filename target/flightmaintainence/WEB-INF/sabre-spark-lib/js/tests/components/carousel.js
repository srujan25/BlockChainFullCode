'use strict';

var test = require('tape');
var Carousel = require('../../src/components/carousel');
//var css = '.spark-carousel {width: 200px;} .spark-carousel__container {display: flex; flex-direction: row; flex: 1 0 100%; justify-content: center;} .spark-carousel__container-mask {width: 100%; overflow: hidden;} .spark-carousel__item {width: 200px; height: 200px; flex-shrink: 0;}';
var html = '<div class="spark-carousel example-default" data-spark-carousel-scroll-velocity="1000">  <div class="spark-carousel__outer-container">    <div class="spark-carousel__container-mask">      <div class="spark-carousel__container">        <div class="one spark-carousel__item" tabindex="1">          <div height: 200px;" class="spark-carousel__item--content spark-carousel__panel">        </div>        </div>        <div class="two spark-carousel__item" tabindex="0">          <div height: 200px;" class="spark-carousel__item--content spark-carousel__panel">   </div>        </div>        <div class="spark-carousel__item" tabindex="0">          <div class="spark-carousel__item--content spark-carousel__panel">  </div>        </div>        <div class="spark-carousel__item" tabindex="0">          <div class="spark-carousel__item--content spark-carousel__panel">    </div>        </div>        <div class="spark-carousel__item" tabindex="0">          <div class="spark-carousel__item--content spark-carousel__panel">     </div>        </div>        <div class="spark-carousel__item" tabindex="0">          <div class="spark-carousel__item--content spark-carousel__panel">         </div>        </div>      </div>    </div>    <div class="spark-carousel__controls">      <div class="spark-carousel__back"><i class="spark-icon-arrow-chevron-left spark-icon--fill"></i></div>      <div class="spark-carousel__forward"><i class="spark-icon-arrow-chevron-right spark-icon--fill"></i></div>      <div class="spark-carousel__dots"></div>    </div>  </div></div>';

test('should setup carousel', function(t) {

  // Pass modal element directly
  var el = document.createElement('div');
  el.innerHTML = html;
  var c = el.querySelector('.spark-carousel');
  new Carousel(c);
  t.ok(c.sparkcarousel, 'carousel is created');

  t.end();
});

// TODO: this test will run correctly inside a browser, but not on the commandline
// the component requires the element to have real properties to evaulate
// and these properties do not exist in the commandline utility.
/*
test('should move forward and back', function(t) {
  t.plan(1);
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.querySelector('head').appendChild(style);
  var a = function(t) {
    // Pass modal element directly
    var el = document.createElement('div');
    el.innerHTML = html;
    var c = el.querySelector('.spark-carousel');
    document.querySelector('body').appendChild(c);
    var carousel = new Carousel(c);
    var n = c.querySelector('.selected').nextElementSibling;
    var f = c.querySelector('.spark-carousel__forward');
    var b = c.querySelector('.spark-carousel__back');
    carousel._forward({
      target: f,
      preventDefault: function() {return;}
    });
    window.setTimeout(function () {
      t.equal(carousel.selectedItem.el, n, 'carousel selected next item');
    }, 1);
  }
  a(t);
});
*/



test('should update to use a new carousel component', function(t) {

  var el = document.createElement('div');
  el.innerHTML = html;

  var inst = new Carousel(el);
  var newEl = el.cloneNode(true);

  inst.update(newEl);

  t.notEqual(inst.el, el, 'stores the new element');
  t.equal(inst.el, newEl, 'stores the new element');

  t.end();
});
