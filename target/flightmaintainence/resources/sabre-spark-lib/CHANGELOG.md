# 2.4.3
- Added error state animation for Date Input component
- Updated Dropdown Step Indicator with accessibility enhancements and allowing customization of label
- Added accessibility fixes to Step Indicator component

# 2.4.2
- Added Aria roles and attributes to panel menus and added js-driven toggling of states
- Fixed position of pagination dropdown caret
- Fixed calendar icon size
- Fixed position of View Less caret in Filter component
- Fixed aria-role in Toolbar component

# 2.4.1
- Fixed Date Input component end-of-month bug when using DD-MM-YYYY format
- Fixed Select Input component line-height when at XL screen size
- Enhanced Switch component to allow callback when toggled via Spacebar key

# 2.4.0
- Fixed changelog
- Merged visual regression tests from existing components
- Fixed documentation in Text Input component
- Added deprecation notices in Header component CSS
- Removed dimming effect on some parts of the Header component
- Removed unnecessary Logout button from Header component examples
- Added Avatar component as well as regression tests
- Added Badge component variations as well as regression tests

# 2.3.7
- Update Date Input component and examples with Accessibility enhancements
- Update Icon Button and Tooltip examples with Accessibility fixes
- Add unit test fix for Select ARIA labels, and cleanup typeahead script
- Adjust tooltip text formatting on Tooltip and Step Indicator components
- Add fix to display Tooltip on focus

# 2.3.6
- Fix line-height issue on Spark Text Input when it is inside a Toolbar
- Update Tabs component with accessibility enhancements
- Add checker to Calendar Popover component's `remove()` function to prevent removal if popover doesn't exist
- Fix IE onInput bug in Typeahead component that causes browser to crash
- Fix Typeahead input styling when a user focuses and blurs without entering content
- Fix handling of floating point numbers in Number Selector component, and add additional unit tests

# 2.3.5
- Fix radio button checked state in Windows High Contrast Mode
- Update Scroll to top component with accessibility enhancements
- Update Expand/Collapse and Panel components with accessibility enhancements
- Update pagination examples with ARIA attributes for improved accessibility
- Adjust panel heading padding to correct panel header height
- Add fix for numeric numpad keys being ignored on IE

# 2.3.4
- Fix bug where file upload inputs were being ignored when inside a table
- Update table sort hover styling
- Add new icons to library
- Update typography (modular scale, fonts, line-heights) with new brand standards
- Remove strikethrough styling for disabled links
- Add fix for `activeElement` error thrown in typeahead unit tests
- Add accessibility enhancements to the modal component

# 2.3.3
- Add accessible text for logo images on the Sign In and Splash Screen examples
- Fix `border-color` on secondary buttons at sm and xs sizes
- Fix `border-radius` when number selector has a state/message
- Update CSS for radio button, checkbox and text-input disabled states
- Fix CSS when Spark text inputs are used inside a table container e.g. inside a panel that lives in a table
- Fix bug where presence of other checkboxes in table e.g. ToggleSwitch conflicts with row selection checkbox

# 2.3.2
- Added new icons

# 2.3.1
- Moved node-sass to devDependencies
- Update page template headers with accessibility fixes
- Fix Range Slider to prevent `min="0"` being set to null in input field
- Accessibility fixes for Header component, including keyboard navigation, focus states, accessible text and attributes
- Fix calendar hover state
- Update color variables for messages, menus and tables

# 2.3.0
- Add initial Badges component used in Code Pending pages
- Fixed Secondary button focus background color
- Added new icons for tags and weather
- Removed FilterModule from the Spark namespace
- Added DateHelper to Spark namespace to help with dynamic date creation for the CalendarPopover
- Added new quickJumpRange parameter to CalendarPopover
- Fix changelog

# 2.2.0
- Add new Filter component with associated templates and tests
- Fix toolbar title and JS console errors
- Fix text input and textarea initialization when there is default text
- Fixed date calculation for end of month calculations when navigating previous months

# 2.1.8
- Added new icons

# 2.1.7
- Added new icons
- Fix invisible text input border on IE
- Fix navigation via calendar disabled days
- Fix flickering bug on Table component
- Add `:focus` state to footer links

# 2.1.6
- Updated Select Dropdown Date Selector example's `min` and `max` dates
- Added new Airplanes icon
- Fixed Select Dropdown Date Selector min and max settings

# 2.1.5
- Fix disabled number selector input color
- Add small radio button variation
- Add new line and fill icons
- Fix active state of Icon Button with fill icon and add tooltips to the buttons

# 2.1.4
- Fix alignment of Progress Indicator list
- Fix disabled text input label
- Adjust input field label green color hex for accessibility
- Fix calendar issue revolving around end of month calculations and navigating to previous and next months
- Correct Toggles component's `border-radius`
- Add disabled number selector variation

# 2.1.3
- Add 8 new icons to icon font
- Fix calendar styling for selected current day and alignment of days of week

# 2.1.2
- Re-adjust padding around step indicator in form templates
- Fix position of checkbox in small variant

# 2.1.1
- Replace carousel images for the light theme hero carousel example
- Adjust padding around step indicator in form templates
- Center Step Indicator label and sub-label for long labels
- Fix horizontal scroll caused by modal close button especially on smaller screens
- Fix Step Indicator dropdown position in Chrome
- Add 5 new icons to icon font
- Fix select height across browsers
- Fix IE11 JS error in typeahead
- Fix wrong highlight of `today` at end or each month
- Fix multi-select error example top margin
- Fix IE text-input border missing

# 2.1.0
- Added form page templates
- Fix spacing in/around checkboxes and radio buttons caused by `display: inline-block`
- Add a visual regression test suite
- Add support for dynamic form element error state example
- Fix extra modal scroll when transition
- Add large font variation for condensed table
- Fix JQuery library file not work
- Fix checkbox in condensed table not centered
- Add top-bottom margin in condensed table
- Fix header link font-size from 16px to 13px

# 2.0.9
- Adjust popover example positions
- Fix hover color for secondary slider
- Fix multi-select checkbox layout
- Adjust text input example copy
- Fix slider incorrect hover & focus state

# 2.0.8
- Fix bug to include CSS in out put component examples for website.

# 2.0.7
- Fix bug with placeholder mixin that prevents the autoprefixer from running on the docs site

# 2.0.6
- Fix popover and calendar positioning bugs introduced in v2.0.0
- Fix bug with typeahead placeholder styling
- Fix bug with Firefox highlighting required fields in red

# 2.0.5
- Added ability to have full-width buttons
- Fixed button jumpiness when :focus state is active
- Update changelog for v2.0.0 to be more accurate
- Fix button focus state padding
- Fix spacing in/around checkboxes and radio buttons caused by `display: inline-block`

# 2.0.4
- Fixed ignored `js/dist` files which was breaking imports

# 2.0.3
- Removed `.npmrc` registry file

# 2.0.2
- Fixed broken step indicator condensed tooltip.

# 2.0.1
- Removed `publishConfig` from `package.json` as it is no longer needed

# 2.0.0
- Moved JS components to ES6 with Babel.
  - ES6 files live in the `js/src` directory
  - Compiled ES5 JS lives in the `js/dist` directory
  - `import Spark from 'sabre-spark';` no longer works
    - Use `import { TextInput } from 'sabre-spark';` or `import { * as Spark } from `sabre-spark`;` instead
- Changed build process to use Gulp.
- Componentized JS and reduce (greatly) what the "Base" component does.
- Switched to Nunjucks for HTML templating to allow for future use of templates inside of components.
  - Moved examples to `html` directory
- Renamed SCSS components and common file to be exported by SCSS.
- Updated and renamed component export tool.
- Moved from jslint to eshint.
- Changed how fonts are loaded so that only those that are used in CSS defs are included.
- Removed the following deprecated components and features:
  - `.spark-caption`
  - `.spark-modal__nav`
  - `.spark-btn--alt`
  - `.spark-link--secondary`
  - `.spark-header__login`
  - `.spark-number-picker` (renamed to `.spark-number-selector`)
  - `$prefix` SASS variable
  - `_roboto-condensed.scss`, `_roboto-mono.scss`, `_roboto-slab.scss` and `_roboto.scss` font files
  - `.spark-center-text` (duplicate of `.spark-text-center`)
  - `.spark-remove-padding-*`
  - `.spark-spacer`
  - `helpers/_hidden.scss` (content moved to `_display.scss`)
- Update grid system to use latest Bootstrap v4-alpha3 grid.
  - Removed `.col-*-push`, `.col-*-offset` and `.col-*-pull` in favor of `.push-*`, `.offset-*` and `.pull-*`.
  - Removed `.col-*-top/bottom/left/right` for `.flex-*-top/bottom/left/right`.
  - Removed `.col-*-first/last/justify/etc.` for `.flex-*-first/last/justify/etc.`.
- Renamed `.spark-select--multiple` to `.spark-multi-select`.
- Merged `.spark-multiselect` with `.spark-multi-select` so they are mostly the same.
- Added `MultiSelectInput` JS component
- Added `enable`, `disable`, `getValue`, `setValue` and `clearValue` methods to all form fields.
- Added `onChange` callback to all form fields. Additional focus and blur callbacks to appropriate form fields.
- Changed argument order for the DateInput `onChange` event to bring parity to all form input callbacks.
- Added `spark.jquery.js`.
  - Removed jQuery plugins from the normal `spark.js` file and moved them here
- Added `update` method to each component so its values can be reparsed and its backing element changed.
- Added messaging styles and JS methods to all form inputs.
- Add a disabled state to the toolbar
- Updated Spark Font Icon to v0.4.0
- Deprecated the following:
  - `.spark-margin-*` and `.spark-padding-*`
  - `.spark-remove-padding`
- Added breakpoint-specific margin and padding classes.
- Add more robust positioning logic to the Popover.
  - It now tries harder to keep a Popover visible.
- Add Tooltip JS component to do dynamic tooltip positioning just like the Popover.
  - Adds fade animation to tooltips.
- Add an additional left-align style for step indicator
- Fixed extra spacing issue underneath toggles caused by inline-block
- Integrated `sabre-spark-extras` into the repo. Icon fonts now live in the `icons` directory.

# 1.9.5
- Add disabled state and method for number selector
- Fixed bug with mobile header not initializing

# 1.9.4
- Add option to the date-input to allow for the date to display as text when the input loses focus
- Enhancement: Will focus on first input when expand
- Enhancement: add onChange callback for slider and range slider
- Enhancement: Add onFocus and onBlur callback for input
- Fixed Calendar styling in IE10
- Fixed issue where switching tabs caused the page to jump around
- Fixed email example to use messaging.
- Fixed calendar dismatch of timezone change
- Add label for number selector

# 1.9.3
- Fixed step indicator break the default event
- Fix broken Calendar examples

# 1.9.2
- Fixed Header initialization process to not break when resources are hung up
- Fixed checkbox input styling so that the input itself will receive click events.
- Added `change` events to table checkboxes when their state is affected by JS.

# 1.9.1
- Updated quality of all examples images to reduce library file size

# 1.9.0
- Add Carousel
- Updated Calendar, Date Input, Date Select, Date Typeahead, Header, Popover and Typeahead to take config parameters multiple ways
- Added a set of helper methods for parsing config values from attributes

# 1.9.3
- Fix broken Calendar examples
- Add option to the date-input to allow for the date to display as text when the input loses focus

# 1.9.2
- Fixed Header initialization process to not break when resources are hung up
- Fixed checkbox input styling so that the input itself will receive click events.
- Added `change` events to table checkboxes when their state is affected by JS.

# 1.9.1
- Updated quality of all examples images to reduce library file size

# 1.9.0
- Add Carousel

# 1.8.2
- Fixed text input messaging with no value
- Fixed text Input validation - don't clear on blur
- Rework text-input validation
- Fixed Calendar Popover not calling the onChange callback.
- Fixed typeahead so it hides itself if there are only placeholder characters when the input loses focus.
- Fixed modal not being centered by default.
- Fixed bug with button type sizing at the XL breakpoint.
- Remove a bunch of unnecessary stopPropagation calls.
- Fixed broken Sign In page example.

# 1.8.1
- Fixed Edge-case issues on step-indicator

# 1.8.0
- Added Step Indicator

# 1.7.4
- Fixed green shadow incorrectly displayed on `spark-btn--negative`
- Fixed font-size of `number-selector`
- Fixed colors of label of `spark-checkbox`
- Fixed problem with `calendar-popover` input jumping around during focus due to flexbox.
- Fixed color of today's date in `calendar-popover`
- Fixed margin of `spark-slider--input`
- Added labels to `Slider` inputs

# 1.7.3
- Fixed `calendar-popover` import typo

# 1.7.2
- Updated import statement for spark icons from `sabre-spark-extras`, compatible with npm3

# 1.7.1
- Updated Spark Font Icon to v0.3.0
- Fixed onChange function not being called for calendar

# 1.7.0
- Added `View More` button via `.spark-btn--view-more`

# 1.6.3
- Fix AMD loading bug with date-select

# 1.6.2
- Fixed bug with modal scrolling
- Add variables to path to images and icon fonts
- Fix Scroll To Top bug where its cached position is incorrect after changes to the content

# 1.6.1
- Fixed `ToggleSwitch` import typo

# 1.6.0
- Add Pagination
- Add Scroll To Top
- Fix display bug in Progress banner
- Add new `spark.visible-children` event, used to inform components to recalculate their Styles
- `spark.visible-children` supported in Expand/Collapse, Popovers, Tabs, Toolbar, Date-Input, and Range-Slider.
- Examples updated for new ui component pages
- Fix eventing bug in Tabs
- Remove extra margin-bottom from `spark-select-group`

# 1.5.2
- Updated font weight of sign-in link in header
- Added ToggleSwitch object for `spark-toggle-switch` to enable keyboard control with arrow keys
- Add class to body when fixed header has condensed.

# 1.5.1
- Table, tabs and toolbar bugfixes
- Update icon set
- Fix bug w/ table messaging not working in IE

# 1.5.0
- Added advanced table functionality like editable fields, resizable columns, messaging and disabled states, and expandable rows.
- Added nested menu lists with `spark-menu__list-next`
- Added "in-page" menu treatment with `spark-menu__list-link--in-page`
- Add advanced table functionality like editable fields, resizable columns, messaging and disabled states, and expandable rows.
- Fix text color in warning messages for inputs.
- Add hover state for text inputs.
- Change icon button treatment.
- Updated `RELEASE-CHECKLIST.md`
- Allow accordion expand/collapse panels to be focused and opened/closed with a keyboard
- Adjust table navigation styling to work properly with Toolbar
- Added Toolbar with icon mode and resizing functionality

# 1.4.2
- Fix bug with calendar showing "today" in the following month as well.

# 1.4.1
- Fix bug with typeahead on Android
- Remove `min` and `max` on date range example

# 1.4.0
- Added `spark-multiselect` with two versions - using native select[multiple] element, and using `spark-checkbox` for additional styling options
- Added `spark-calendar`, as well as improved `spark-typeahead` to work better with dates
- Updated icons for info and warning messages
- Added mixin for loading fonts
- Fix bug with too liberally styling splash page panel content.
- Fix dynamic height text input not sizing when initialized hidden
- Fix bug with slider not having a visible value when initialized while hidden
- Updated to version v0.1.0 Spark Icons
- Fix bug with links having an explicit font-size and line-height
- Updated styling of `hr` to be a solid color instead of gradient

# 1.3.0
- Updated `body` styles to react better with sticky footers utilizing flexbox.
- Updated footer to have a sticky behavior with helper classes (`spark-main--sticky-footer`, `spark-content__wrapper--sticky-footer`, & `spark-content--sticky-footer`)
- Moved `.spark-modal__nav` to `.spark-btn-group`
- Deprecated `.spark-modal__nav` and `.spark-modal__nav-secondary`
- Updated text input field to have a color
- Added `make-media-queries` mixin
- Updated colors to match PSD's. Changed most instances of #767676 to #555555
- Updated to version v0.0.9 Spark Icons
- Fixed `spark-small` styling to be different than `spark-caption`
- Deprecated `.spark-btn--alt`

# 1.2.3
- Update header and menu components to fix various IE bugs. All having to do w/ spotty flexbox implementation.
- Add styles and an example for a mobile menu header using text instead of an image.
- Set a font size and center Menu Titles
- Updated heading animation to not have swinging animation
- Add a call to action button option for header menu lists
- Adjusted link colors

# 1.2.2
- Fix Modals so they work with or without an associated button.
- Remove Twitter Bootstrap dependency until v4 is released on NPM.

# 1.2.1
- Added `.spark-header--no-logo`
- Fixed transition delay of fixed header
- Add support for a select input with the `[multiple]` attribute
- Updated with latest bootstrap-grid flex attributes
- Added `Modal`,`NumberPicker`, `NumberSelector`,`animateHeight`,and `outerHeight` to module exports.
- Update font sizes to match the documentation.


# 1.2.0
- Add example and corresponding styles for a sign in screen
- Add Select Groups to allow for multiple select inputs to sit together in a horizontal group
- Deprecated `.spark-header__login`
- Added `.spark-header__sign-in`
- Added `shopping-cart` icon
- Fixed a bug where not all `spark-icon-*` classes were being included in scss and css files

# 1.1.2
- Fix bug with Select Input jumping 1px when gaining/losing focus
- Add ability to have a fixed header
- Updated years in `spark-footer`

# 1.1.1
- Add webpack imports loader as a dependency so that webpack users can include these modules and ignore the AMD definitions (with a config outlined in [README.md](./README.md))
- Fix bug with the header's "more" button showing nested lists accidentally
- Fix bug with the header's hamburger button being too narrow
- Add focus state to checkboxes and radio buttons

# 1.1.0
- Add modals
- Deprecated `.spark-link--secondary`
- Replace all instances of `.#{$prefix}` with `.spark` so we can properly parse the source with SASSDoc.
- Deprecate `$prefix` variable.
- Add annotated SCSS code into `docs`.
- Add number selector component

# 1.0.16
- Fix dependency management so that RequireJS can load other components from the same package.

# 1.0.15
- Fix several grid bugs in IE
- Adjust build process to include banner on built files. Stop minifying JS source files copied to dist.
- Move example HTML into this library and add a new dev process
- Fix small checkbox alignment bugs
- Update Twitter Bootstrap dependency path
- Move theme variables into the common config
- Fix dropdown menu widths
- Remove some legacy Ruby cruft
- Add version banner to built files

# 1.0.14
- Added `log-in`, `log-out`, and `refresh` icons to the spark icon set.

# 1.0.13
- Fixed Header Bug with IE/FF
- Added some padding to popover titles which follow a close button.

# 1.0.12
- Update secondary button colors to be more actionable
- Corrected color of `h1-h4` headings from `#555555` to `#4A5767`
- Update menu and header styles.
- Header bugfixes.
- Add animations to expand/collapse, menus, header.
- Add an outside border to tables to match comps.
- Added initial Splash Screen pattern


# 1.0.11
- Add margin to the bottom of select input to match text input
- Add command-line tool for generating custom spark SCSS and CSS builds.
- Removed extra grid class which wasn't being used properly
- Fixed location of grid variables
- Moved `sabre-spark-extras` from dev-dependency to dependency
- Update Header and Tabs `update` methods to properly reevaluate sizing

# 1.0.10
- Fix bad font linkage
- Bugfixes

# 1.0.9
- Add CHANGELOG.md
- Add update method for header and tabs to allow for recaching elements if the DOM changes
- Rework jQuery caching to use `$(...).data()` instead of an internal cache object
- Add CommonJS export index and package.json `main` value.

# 1.0.8
- _Skipped_

# 1.0.7
- _Skipped_

# 1.0.6
- Add "remove/destroy" methods to all JS helpers to allow for garbage collection
- Change slider text inputs to use "change" not "input" event so validation isn't run on every keypress. This was stopping users from typing in numbers that were seemingly out of range or didn't conform to the "step" value.
- Adjust the header icon position
- Update animation on progress indicators
- Add more HTML examples to SCSS components
- Add more examples to JS components
- Remove Sassline and simplify associated mixins
- Integrate icons from external library
- Adjust tab content styling to have border
- Add clearfix helper class

# 1.0.5
- Add more unit tests for JS
- Adjust tabs styling so tabs don't fill all space
- Set a fixed width on progress indicator so it overflows instead of squishing
- Bugfixes

# 1.0.4
- Bugfixes
- Adjust weight on text buttons

# 1.0.3
- _Skipped_

# 1.0.2
- Grunt updates related to copying font files
- Build library before a commit
- Don't lint docs files
- Remove SASSdoc content for now
- Add more README.md content

# 1.0.1
- Add JS tests
- Transition JS components to use class names instead of attributes
- Selected icons in tabs/toggles now invert
- Adjusted icon sizing to be more consistent

# 1.0.0
Initial release. Components included:
- Expand & Collapse
- Footer
- Responsive Grid
- Header
- Menu
- Panels
- Table
- Tabs
- Checkboxes
- Radio Buttons
- Select Input
- Sliders
- Text Input
- Toggles & Switches
- Messages
- Popovers
- Tooltips
- Progress Indicators
- Buttons
- Links
