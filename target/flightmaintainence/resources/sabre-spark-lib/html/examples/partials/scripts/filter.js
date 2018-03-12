var el = document.querySelector('.spark-filter');
var module1 = el.querySelector('[data-filter-module="module-1"]');
var moduleCheckboxes = module1.querySelectorAll('.spark-checkbox__input');

// Example: Clearing tags as well as associated fields
var clearCheckboxTag = function (){
  // 1. Find the parent of the tag clicked - this should be .spark-filter__tag and the counter tag
  var tag = this.parentElement;

  // 2. get the name of the checkbox that was clicked
  var elementToClear = tag.getAttribute('data-filter-name');

  // 3. find that checkbox and clear it, including any synced elements
  var domElementToClear = document.querySelector('input[name="' + elementToClear + '"]');

  if ( domElementToClear.hasAttribute('data-sync-master') ) {
    var syncedAttribute = domElementToClear.getAttribute('data-sync-master');
    var syncedElements = document.querySelectorAll('input[data-sync-dupe="' + syncedAttribute +  '"]');

    for (var i = 0; i < syncedElements.length; i++ ) {
      syncedElements[i].checked = false;
    }
  }

  domElementToClear.checked = false;

  // 4. Get the number of tags currently applied
  var tags = document.querySelectorAll('.spark-filter__tag');

  // 5. If this is the last tag then perform clearAllTags
  if (tags.length === 1) {
    // If we have only 1 tag left
    filterInst.clearAllTagEls();

    // remove the clear button if it was applied within the module
    filterInst.disableModuleClearButton('module-1');
  }
  // 6. Otherwise remove just this tag
  else {
    // 7. Remove the tag
    tag.parentNode.removeChild(tag);

    // 8. update counter for smaller screens as necessary
    var counter = el.querySelector('.spark-filter__applied-filters-counter span');
    counter.innerHTML = parseInt(counter.innerHTML) - 1; // update counter
  }
};

var clearAllCheckboxes = function() {
  var checkboxes = el.querySelectorAll('[data-filter-module=module-1] [type=checkbox]');
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
  var checkboxToSyncWith = el.querySelectorAll('[data-sync-dupe="' + syncID + '"]');

  for(var i = 0; i < checkboxToSyncWith.length; i++) {
    checkboxToSyncWith[i].checked = this.checked;
  }
};

// Example: Sync from Modal to Module
var syncWithModule = function() {
  var syncedCheckboxes = el.querySelectorAll('[data-sync-dupe]');
  for (var i = 0; i < syncedCheckboxes.length; i++) {
    var syncID = syncedCheckboxes[i].getAttribute('data-sync-dupe');
    var syncedEls = el.querySelectorAll('[data-sync-master=' + syncID + ']');

    for(var k = 0; k < syncedEls.length; k++) {
      syncedEls[k].checked = syncedCheckboxes[i].checked;
    }
  }
};

// Instantiate filter
var filterInst = new Spark.Filter(el,{
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
      onModalClose: syncWithModule,
      onClear: function(){

        clearAllCheckboxes();

        filterInst.disableModuleClearButton('module-1');

        // Set focus: If modal is open, set focus to first checkbox in modal
        var modalOpen = document.querySelector('.spark-modal-open');
        if (modalOpen) {
          el.querySelector('#simpleModal .spark-checkbox:first-child .spark-checkbox__input').focus();
        }
        else {
          el.querySelector('[data-filter-module=module-1] .spark-checkbox:first-child .spark-checkbox__input').focus();
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
var applyBtn = el.querySelector('.spark-filter__btn-apply');
applyBtn.addEventListener('click', function(){
  filterInst.clearAllTagEls();
  var checkboxes = el.querySelectorAll('.spark-checkbox:not(.spark-filter-module__show-all__duplicate)');
  var counter = el.querySelector('.spark-filter__applied-filters-counter span');

  for(var i = 0; i < checkboxes.length; i++) {
    var input = checkboxes[i].querySelector('input');
    if(input.checked) {
      var inputName = input.getAttribute('name');
      var label = checkboxes[i].querySelector('.spark-label').innerHTML;
      filterInst.createTagEl(inputName, label, clearCheckboxTag);
      counter.innerHTML = i + 1; // update counter
    }
  }

  filterInst.toggleFilter('collapse');
});


var sliderEls = document.querySelectorAll('.spark-range-slider');
for(var i = 0; i < sliderEls.length; i ++) {
  new Spark.RangeSlider(sliderEls[i]);
}

var el1 = document.querySelector('.example-double-calendar-1');
var el2 = document.querySelector('.example-double-calendar-2');
var dateInstance = new Spark.DateInput(el1);
var dateInstance2 = new Spark.DateInput(el2);
var calInstance = new Spark.CalendarPopover([el1, el2]);

var nsEls = document.querySelectorAll('.spark-number-selector');
for(var i = 0; i < nsEls.length; i ++) {
  new Spark.NumberSelector(nsEls[i]);
}

var tiEl = document.querySelector('#filter-example-text-input');
new Spark.TextInput(tiEl);
