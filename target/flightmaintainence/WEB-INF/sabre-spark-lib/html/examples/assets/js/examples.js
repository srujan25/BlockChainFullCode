import Picker from './stylesheet-picker';

document.addEventListener('DOMContentLoaded', () => {
  new Picker(document.querySelector('[data-hook="stylesheet-picker"]'), document.querySelector('[data-hook="stylesheet-toggle"]'));
});
