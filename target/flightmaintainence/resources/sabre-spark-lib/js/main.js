/* global Spark */
'use strict';

function validatePassword(val, input) {

  if (val.length === 0) {
    input.clearMessages();
  }
  else if (val.length > 6) {
    input.setSuccess('<b>NAILED IT!</b> But will you remember it?');
  }
  else if (val.length <= 6 && val.length > 3) {
    input.setWarning('<b>AVERAGE</b> (at best).');
  }
  else if (val.length <= 3) {
    input.setError('<b>SHOCKINGLY BAD.</b> Try again.');
  }
}

function debounce(func, delay) {
  var timer;
  return function() {
    var args = arguments;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(function() {
      func.apply(this, args);
    }, delay);
  };
}

function getBool(val){
  var num;
  return val != null &&(!isNaN(num = +val)? !!num : !!String(val).toLowerCase().replace(!!0,''));
}

function incrementProgress(obj, val, stop) {
  val = val || 0.01;
  stop = stop || 1;
  obj.set(Math.min(val, 1));
  if (val < 1 && val < stop) {
    window.setTimeout(function() {
      incrementProgress(obj, val + 0.01, stop);
    }, 50);
  }
  else if (val >= stop) {
    // STOP THE MADNESS
    return;
  }
  else {
    window.setTimeout(function() {
      obj.set(0);
      window.setTimeout(function() {
        incrementProgress(obj, 0);
      }, 500);
    }, 2000);
  }
}

function daysTill() {
  //----------  EDIT THE VARIABLES BELOW  ------------------
  // EDIT THE VARIABLES BELOW
  var day=  2; // Day
  var month=  11; // Month
  var year= 2015; //Year
  //----------  END OF EDIT  -------------------------------

  var daystocount=new Date(year, month -1, day);
  var today=new Date();
  if (today.getMonth() ===month && today.getDate()>day);
  daystocount.setFullYear(daystocount.getFullYear());
  var oneday=1000*60*60*24;
  return (Math.ceil((daystocount.getTime()-today.getTime())/(oneday)));
}


document.addEventListener('DOMContentLoaded', function() {
  // For filters
  var filterEl = document.querySelector('.spark-filter');

  if (filterEl) {
    var module1 = filterEl.querySelector('[data-filter-module="module-1"]');
    var moduleCheckboxes = filterEl.querySelectorAll('[data-filter-module="module-1"] .spark-checkbox__input');

    // Example: Clearing tags as well as associated fields
    var clearCheckboxTag = function (){
      var tag = this.parentElement;
      var elementToClear = tag.getAttribute('data-filter-name');
      var domElementToClear = document.querySelector('input[name="' + elementToClear + '"]');

      if ( domElementToClear.hasAttribute('data-sync-master') ) {
        var syncedAttribute = domElementToClear.getAttribute('data-sync-master');
        var syncedElements = document.querySelectorAll('input[data-sync-dupe="' + syncedAttribute +  '"]');

        for (var i = 0; i < syncedElements.length; i++ ) {
          syncedElements[i].checked = false;
        }
      }
      else {
        domElementToClear.checked = false;
      }

      var tags = document.querySelectorAll('.spark-filter__tag');
      if (tags.length === 1) {
        filterInst.clearAllTagEls();
        filterInst.disableModuleClearButton('module-1');
      }
      else {
        tag.remove();

        var counter = filterEl.querySelector('.spark-filter__applied-filters-counter span');
        counter.innerHTML = parseInt(counter.innerHTML) - 1; // update counter
      }
    };

    var clearAllCheckboxes = function() {
      var checkboxes = filterEl.querySelectorAll('[data-filter-module=module-1] [type=checkbox]');
      for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    };

    // Example: Display Module Clear button on selection of a filter
    var determineClearBtnState = function(){
      var showClearButton = false;
      var moduleClearStatus = filterInst.moduleClearButtonStatus('module-1');

      for (var i = 0; i < moduleCheckboxes.length; i++) {
        if (moduleCheckboxes[i].checked) {
          showClearButton = true;
        }
      }

      if ((!showClearButton && !moduleClearStatus) || (!showClearButton && moduleClearStatus)) {
        filterInst.disableModuleClearButton('module-1');
      }
      else if (showClearButton && !moduleClearStatus) {
        filterInst.showModuleClearButton('module-1');
      }
    };

    // Example: Sync from Module to Modal
    var syncWithModal = function() {
      var syncID = this.getAttribute('data-sync-master');
      var checkboxToSyncWith = filterEl.querySelectorAll('[data-sync-dupe="' + syncID + '"]');

      for(var i = 0; i < checkboxToSyncWith.length; i++) {
        checkboxToSyncWith[i].checked = this.checked;
      }
    };

    // Example: Sync from Modal to Module
    var syncWithModule = function() {
      var syncedCheckboxes = filterEl.querySelectorAll('[data-sync-dupe]');
      for (var i = 0; i < syncedCheckboxes.length; i++) {
        var syncID = syncedCheckboxes[i].getAttribute('data-sync-dupe');
        var syncedEls = filterEl.querySelectorAll('[data-sync-master=' + syncID + ']');

        for(var k = 0; k < syncedEls.length; k++) {
          syncedEls[k].checked = syncedCheckboxes[i].checked;
        }
      }
    };

    // Instantiate filter
    var filterInst = new Spark.Filter(filterEl,{
      onClearAll: function() {
        filterInst.clearAllTagEls();

        // You need custom code here to clear or reset all your applied filters
        // Example: Clear all checkboxes that were checked inside Module 1 and disable the Clear button
        clearAllCheckboxes();

        filterInst.disableModuleClearButton('module-1');
      },
      moduleOptions: [
        { // Module 1
          onShowAll: 'modal',
          onModalClose: syncWithModule, // TODO: Needs tweak to modal to allow onOpen and onClose
          onClear: function(){

            clearAllCheckboxes();

            filterInst.disableModuleClearButton('module-1');

            // Set focus: If modal is open, set focus to first checkbox in modal
            var modalOpen = document.querySelector('.spark-modal-open');
            if (modalOpen) {
              filterEl.querySelector('#simpleModal .spark-checkbox:first-child .spark-checkbox__input').focus();
            }
            else {
              filterEl.querySelector('[data-filter-module=module-1] .spark-checkbox:first-child .spark-checkbox__input').focus();
            }
          },
        },
        { // Module 2
          onShowAll: 'toggle'
        },
      ],
    });

    // Example: Add event listeners to checkboxes
    for (var i = 0; i < moduleCheckboxes.length; i++) {
      if (moduleCheckboxes[i].hasAttribute('data-sync-master')) {
        moduleCheckboxes[i].addEventListener('change', syncWithModal.bind(moduleCheckboxes[i]));
      }
      moduleCheckboxes[i].addEventListener('change', determineClearBtnState.bind(moduleCheckboxes[i]));
    }

    // Example: Apply filters and display tags
    var applyBtn = filterEl.querySelector('.spark-filter__btn-apply');
    applyBtn.addEventListener('click', function(){
      filterInst.clearAllTagEls();
      var checkboxes = filterEl.querySelectorAll('.spark-checkbox:not(.spark-filter-module__show-all__duplicate)');
      console.log('Checkboxes applied = ' + checkboxes.length);
      var counter = filterEl.querySelector('.spark-filter__applied-filters-counter span');
      //var showClearButton = false;

      for(var i = 0; i < checkboxes.length; i++) {
        var input = checkboxes[i].querySelector('input');
        if(input.checked) {
          var inputName = input.getAttribute('name');
          var label = checkboxes[i].querySelector('.spark-label').innerHTML;
          filterInst.createTagEl(inputName, label, clearCheckboxTag);
          counter.innerHTML = i + 1; // update counter
          //showClearButton = true;
        }
      }

      //if (showClearButton) filterInst.showModuleClearButton('module-1');

      filterInst.toggleFilter('collapse');
    });
  }
  // End Filters

  $('.spark-panel .spark-panel__heading[data-href]').on('click',function(){
    window.location = $(this).attr('data-href');
  });

  var inputs = document.querySelectorAll('.spark-input:not(.spark-input-password-example):not(.spark-input-email-example):not(.spark-date)');
  for (var i = 0, len = inputs.length; i < len; i++) {
    new Spark.TextInput(inputs[i]);
  }

  var validateInput = document.querySelectorAll('.spark-input-password-example');
  for (var i = 0, len = validateInput.length; i < len; i++) {
    new Spark.TextInput(validateInput[i], {
      onChange: debounce(validatePassword, 750)
    });
  }

  var emailInputs = document.querySelectorAll('.spark-input-email-example');
  for (i = 0, len = emailInputs.length; i < len; i++) {
    new Spark.TextInput(emailInputs[i], {
      validatePattern: '([^@]{1,})(@)([^\.]{1,})(\.)([^\.]{1,})',
      onValidate: function(isValid, val, inst) {
        if (isValid) {
          inst.clearError();
        }
        else {
          inst.setError();
        }
      }
    });
  }

  var ariaLiveEl = document.querySelector('#aria-live-example');
  if (ariaLiveEl) {
    var ariaLiveElInst = new Spark.TextInput(ariaLiveEl, {
      onChange: function(val, inst){
        if ( inst.el.attributes['data-characters'] ) {
          var chars = inst.el.attributes['data-characters'].value;
          var liveRegion = document.querySelector('#live-region-text');
          var liveRegionSuffix = (chars === '1' || chars === 1) ? 'character' : 'characters';
          liveRegion.innerHTML = chars + ' ' + liveRegionSuffix;
        }
      }
    });
  }

  var selects = document.querySelectorAll('.spark-select');
  for (i = 0, len = selects.length; i < len; i++) {
    new Spark.SelectInput(selects[i]);
  }

  // $('.spark-slider').sparkSlider();
  var sliders = document.querySelectorAll('.spark-slider, .spark-slider--input, .spark-slider--integrated');
	for(var i = 0, len = sliders.length; i < len; i++) {
	  if(sliders[i].hasAttribute('data-error')) {
	    new Spark.Slider(sliders[i], {
	      onWillChange: function(value, inst) {
	        if(value > 0) {
	          inst.setErrorState(false);
	        }
	        else {
	          inst.setErrorState(true);
	        }
	      }
	    });
	  }
	  else {
	    new Spark.Slider(sliders[i]);
	  }
	}

  // $('.spark-range-slider').sparkRangeSlider();
  var rangeSliders = document.querySelectorAll('.spark-range-slider');
  for(i = 0, len = rangeSliders.length; i < len; i++) {
    new Spark.RangeSlider(rangeSliders[i]);
  }

  // $('.spark-tabs').sparkTabs();
  var tabs = document.querySelectorAll('.spark-tabs');
  for(i = 0, len = tabs.length; i < len; i++) {
    new Spark.Tabs(tabs[i]);
  }

  // $('.spark-table').sparkTable();
  var table = document.querySelectorAll('.spark-table');
  for(i = 0, len = table.length; i < len; i++) {
    new Spark.Table(table[i]);
  }

  // $('.spark-toolbar').sparkToolbar();
  var toolbar = document.querySelectorAll('.spark-toolbar');
  for(i = 0, len = toolbar.length; i < len; i++) {
    new Spark.Toolbar(toolbar[i]);
  }

  // $('.spark-toggle-switch').sparkToggleSwitch();
  var toggleSwitch = document.querySelectorAll('.spark-toggle-switch');
  for (i = toggleSwitch.length - 1; i >= 0; i--) {
    new Spark.ToggleSwitch(toggleSwitch[i]);
  }

  // $('.spark-menu:not(.spark-header__menu)').sparkMenu();
  var menu = document.querySelectorAll('.spark-menu:not(.spark-header__menu)');
  for(i = 0, len = menu.length; i < len; i++) {
    new Spark.Menu(menu[i]);
  }

  // $('.spark-header').sparkHeader();
  var header = document.querySelectorAll('.spark-header');
  for(i = 0, len = header.length; i < len; i++) {
    new Spark.Header(header[i]);
  }

  // $('.spark-modal').sparkModal();
  var modal = document.querySelectorAll('[data-modal]');
  for(i = 0, len = modal.length; i < len; i++) {
    new Spark.Modal(modal[i]);
  }

  // $('[role="progressbar"]').sparkProgressIndicator();
  // $('[role="progressbar"]').sparkProgressIndicator.set(25); @todo: make this work
  var progress = document.querySelectorAll('.spark-progress');
  for(i = 0, len = progress.length; i < len; i++) {
    if (progress[i].querySelector('progress').getAttribute('value') === null) {
      new Spark.ProgressIndicator(progress[i]);
    }
    else if (progress[i].querySelector('progress').getAttribute('type') === 'brand') {
      // calculate percentage between dates
      var totalDays = 30;
      var remainingDays = daysTill();
      var sub = totalDays - remainingDays || 1;
      var percentage = ((sub)/totalDays);
      incrementProgress(new Spark.ProgressIndicator(progress[i]),0, percentage);
    }
    else if (progress[i].getAttribute('data-progress-defer') === null) {
      incrementProgress(new Spark.ProgressIndicator(progress[i]));
    }
  }

  // $('[data-role="expand"]').sparkExpand();
  var expands = document.querySelectorAll('.spark-expand, .spark-panel--expand');
  for(i = 0, len = expands.length; i < len; i++) {
    new Spark.Expand(expands[i]);
  }

  var popovers = document.querySelectorAll('.spark-popover');
  for (i = 0, len = popovers.length; i < len; i++) {
    new Spark.Popover(popovers[i]);
  }

  var tooltips = document.querySelectorAll('.spark-tooltip');
  for (i = 0, len = tooltips.length; i < len; i++) {
    new Spark.Tooltip(tooltips[i]);
  }

  var numberSelectors = document.querySelectorAll('.spark-number-selector');
  for(var i = 0, len = numberSelectors.length; i < len; i++) {
    if(numberSelectors[i].hasAttribute('data-error')) {
      new Spark.NumberSelector(numberSelectors[i], {
        onChange: function(value, inst) {
          if(value > 0) {
            inst.setErrorState(false);
          }
          else {
            inst.setErrorState(true);
          }
        },
        onInput: function(value, inst) {
          if(value > 0) {
            inst.setErrorState(false);
          }
          else {
            inst.setErrorState(true);
          }
        }
      });
    }
    else {
      new Spark.NumberSelector(numberSelectors[i]);
    }
  }

  var dates = document.querySelectorAll('.spark-date');
  for(var i = 0, len = dates.length; i < len; i++) {
    if(dates[i].hasAttribute('data-error')) {
      new Spark.DateInput(dates[i], {
        onChange: function(value, inst) {
          if(value.length === 10) {
            inst.clearError();
          }
          else {
            inst.setError();
          }
        },
        onInput: function(value, inst) {
          if(value.length === 10) {
            inst.clearError();
          }
          else {
            inst.setError();
          }
        }
      });
    }
    else {
      new Spark.DateInput(dates[i]);
    }
  }
  window.addEventListener('load', function() {
    var carousels = document.querySelectorAll('.spark-carousel');
    for (i = 0, len = carousels.length; i < len; i++) {
      if (carousels[i].sparkcarousel === undefined) {
        new Spark.Carousel(carousels[i]);
      }
    }
  });

  var scrolls = document.querySelectorAll('.spark-scroll-to-top');
  for (i = 0, len = scrolls.length; i < len; i++) {
    new Spark.ScrollToTop(scrolls[i]);
  }

  var steps = document.querySelectorAll('.spark-step-indicator');
  for (i = 0, len = steps.length; i < len; i++) {
    new Spark.StepIndicator(steps[i]);
  }

  var Calendar1 = document.querySelectorAll('.example-simple-calendar');
  var Calendar2 = document.querySelectorAll('.example-simple-calendar-prefilled');
  var Calendar3 = document.querySelectorAll('.example-double-calendar-1');
  var Calendar4 = document.querySelectorAll('.example-double-calendar-2');
  var Calendar5 = document.querySelectorAll('.example-triple-calendar-1');
  var Calendar6 = document.querySelectorAll('.example-triple-calendar-2');
  var Calendar7 = document.querySelectorAll('.example-triple-calendar-3');
  var Calendar8 = document.querySelectorAll('.example-double-calendar-3');
  var Calendar9 = document.querySelectorAll('.example-double-calendar-4');
  var Calendar10 = document.querySelectorAll('.example-simple-calendar-with-show-date');

  for (i = 0, len = Calendar1.length; i < len; i++) {
    if (Calendar1[i].sparkCalendarPopover === undefined) {
      Calendar1[i].sparkCalendarPopover = new Spark.CalendarPopover(Calendar1[i]);
    }
  }

  for (i = 0, len = Calendar2.length; i < len; i++) {
    if (Calendar2[i].sparkCalendarPopover === undefined) {
      Calendar2[i].sparkCalendarPopover = new Spark.CalendarPopover(Calendar2[i], {
        daysDisabled: {2016: {3: [9]}},
        daysInfo: {2016: {3: {10: 'A note'}}},
        quickJump: true
      });
    }
  }

  for (i = 0, len = Calendar3.length; i < len; i++) {
    if (Calendar3[i].sparkCalendarPopover === undefined) {
      Calendar3[i].sparkCalendarPopover = new Spark.CalendarPopover([Calendar3[i], Calendar4[i]], {visibleCount: 2});
    }
  }

  for (i = 0, len = Calendar8.length; i < len; i++) {
    if (Calendar8[i].sparkCalendarPopover === undefined) {
      Calendar8[i].sparkCalendarPopover = new Spark.CalendarPopover([Calendar8[i], Calendar9[i]], {visibleCount: 2});
    }
    //logic of custom validation, NOT INCLUDE in sabre-spark
    var customValidation = function (a, b) {
      var hasError = false;
      for(var i=0;i<3;i++) {
        if(a[i].value && b[i].value) {
          continue;
        }
        else {
          this.parentNode.setAttribute('data-error','');
          hasError = true;
          break;
        }
      }
      if(!hasError) {
        this.parentNode.removeAttribute('data-error');
      }
    }
    var input11 = Calendar8[i].querySelectorAll('.spark-input__field')[0];
    var input12 = Calendar8[i].querySelectorAll('.spark-input__field')[1];
    var input13 = Calendar8[i].querySelectorAll('.spark-input__field')[2];

    var input21 = Calendar9[i].querySelectorAll('.spark-input__field')[0];
    var input22 = Calendar9[i].querySelectorAll('.spark-input__field')[1];
    var input23 = Calendar9[i].querySelectorAll('.spark-input__field')[2];

    input11.addEventListener('input', customValidation.bind(Calendar8[i], [input11, input12, input13], [input21, input22, input23]));
    input12.addEventListener('input', customValidation.bind(Calendar8[i], [input11, input12, input13], [input21, input22, input23]));
    input13.addEventListener('input', customValidation.bind(Calendar8[i], [input11, input12, input13], [input21, input22, input23]));

    input21.addEventListener('input', customValidation.bind(Calendar9[i], [input11, input12, input13], [input21, input22, input23]));
    input22.addEventListener('input', customValidation.bind(Calendar9[i], [input11, input12, input13], [input21, input22, input23]));
    input23.addEventListener('input', customValidation.bind(Calendar9[i], [input11, input12, input13], [input21, input22, input23]));
  }

  for (i = 0, len = Calendar5.length; i < len; i++) {
    if (Calendar5[i].sparkCalendarPopover === undefined) {
      Calendar5[i].sparkCalendarPopover = new Spark.CalendarPopover([Calendar5[i], Calendar6[i], Calendar7[i]], {visibleCount: 2});
    }
  }

  for (i = 0, len = Calendar10.length; i < len; i++) {
    if (Calendar10[i].sparkCalendarPopover === undefined) {
      Calendar10[i].sparkCalendarPopover = new Spark.CalendarPopover(Calendar10[i]);
    }
  }

  // For multi-select error example ONLY
  var multiSelect1 = document.querySelectorAll('.example-multi-select-error-1');
  for(var i=0;i< multiSelect1.length; i++) {
    multiSelect1[i].addEventListener('click', (function(){
      var options = this.querySelectorAll('option');
      var counter = 0;
      for(var j=0; j < options.length; j++) {
        if(options[j].selected) counter ++;
        if(counter >= 2) {
          this.removeAttribute('data-error');
          this.parentNode.removeAttribute('data-error');
          break;
        }
      }
      if(counter < 2){
        this.setAttribute('data-error', '');
        this.parentNode.setAttribute('data-error', '');
      }
    }).bind(multiSelect1[i]));
  }

  var multiSelect2 = document.querySelectorAll('.example-multi-select-error-2');
  for(var i = 0;i < multiSelect2.length; i ++) {
    var checkboxes = multiSelect2[i].querySelectorAll('[type=checkbox]');
    for(var j = 0; j < checkboxes.length; j ++) {
      checkboxes[j].addEventListener('click', (function(){
        var checkboxes = this.querySelectorAll('[type=checkbox]');
        var counter = 0;
        for(var k=0; k < checkboxes.length; k ++) {
          if(checkboxes[k].checked) counter ++;
          if(counter >= 2) {
            this.removeAttribute('data-error');
            break;
          }
        }
        if(counter < 2) {
          this.setAttribute('data-error', '');
        }
      }).bind(multiSelect2[i]));
    }
  }

  // Toggle existing scenario select box active for the simple modal example
  var existing = document.querySelector('[name="single-form-radio"][value="existing-scenario"]');
  if (existing) {
    var select = document.querySelector('[name="single-form-select"]');
    document.querySelector('#singleFormModal [name="single-form"]').addEventListener('change', function(e) {
      if (e.target === existing || e.target === select)
        select.removeAttribute('disabled');
      else
        select.setAttribute('disabled', true);
    });
  }

  var signInProgress = document.getElementById('sign-in-progress-bar-example');
  if (signInProgress) {
    signInProgress.querySelector('.spark-btn--primary').addEventListener('click', function() {
      signInProgress.className = signInProgress.className  + ' loading';
      incrementProgress(new Spark.ProgressIndicator(signInProgress.querySelector('.spark-progress')));
    });
  }

  $('button[data-role="expand-code"]').off().on('click',function(){
      // Grab state, since it might be different on exapnd
      var code = $(this).parents('.expand-code-wrapper').find('.live-example[data-expand-code]');
      var state = code.attr('data-expand-code');
      if(state){
        state = getBool(state);
        $(this).text($(this).attr('data-label-'+state));
        //Toggle state
        code.attr('data-expand-code', !state);
      }
    });

  $('button[data-role="expand-all-code"]').off().on('click',function(){
    var state = $(this).attr('data-expand-code');
    if(state){
      state = getBool(state);
      $(this).text($(this).attr('data-label-'+state));
        // Toggle state
        $(this).attr('data-expand-code', !state);
        // Click all buttons with same state
        $('pre[data-expand-code="'+state+'"]').siblings('button[data-role="expand-code"]').click();
      }
    });

  // Make buttons lose focus after they're clicked - for demo purposes since they're placeholders.
  $('#main__content .spark-btn').click(function() { this.blur(); });

  // Remove checkbox group error state for demo purposes
  $('.spark-checkbox-group[data-error] [type="checkbox"]').on('change', function() {
    var parent = $(this).parents('.spark-checkbox-group');
    var hasValue = parent.find('[type="checkbox"]:checked').length;
    parent.get(0)[hasValue ? 'removeAttribute' : 'setAttribute']('data-error', true);
  });

  // Keyboard navigation of custom version popover
  $('.spark-header__placeholder .custom-version__wrapper a').attr('tabindex', '-1');

  $('.spark-header:not(.spark-header__placeholder) a').on('focus', function(){
    if(! $(this).parents('.custom-version__popover').length ) {
      $('.spark-header:not(.spark-header__placeholder) .custom-version__popover').removeClass('has-focus');
    }
    else {
      $('.spark-header:not(.spark-header__placeholder) .custom-version__popover').addClass('has-focus');
    }
  });

  $(document).on('click', function(e){
    if (! $('.spark-header:not(.spark-header__placeholder) .custom-version__current-version, .spark-header:not(.spark-header__placeholder) .custom-version__popover').is(e.target)) {
      $('.spark-header:not(.spark-header__placeholder) .custom-version__popover').removeClass('has-focus');
    }
  });



});

// Scrolling Functions
$(window).scroll(function(){

  // How many pixels from top of page
  var wScroll = $(this).scrollTop();

  // Condense the Header
  if(wScroll < 90){
    $('.spark-header').removeClass('spark-header--condensed spark-header--opacity');
  } else {
    $('.spark-header').addClass('spark-header--condensed spark-header--opacity');
  }
});

// Google Analytics Event Tracking
$('.js-event-tracking').on('click', function(){
  var $this = $(this);
  var sparkEventCategory = $this.attr('data-event-category');
  var sparkEventAction = $this.attr('data-event-action');
  var sparkEventLabel = $this.attr('data-event-label');

  ga('send', 'event', {
    eventCategory: sparkEventCategory,
    eventAction: sparkEventAction,
    eventLabel: sparkEventLabel,
    transport: 'beacon'
  });
});