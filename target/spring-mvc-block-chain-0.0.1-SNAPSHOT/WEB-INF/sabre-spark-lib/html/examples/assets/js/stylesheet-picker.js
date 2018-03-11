export default function StylesheetPicker(el, link) {

  function onPickerChange(e) {
    link.href = e.target.value;
  }

  el.addEventListener('change', onPickerChange);
}
