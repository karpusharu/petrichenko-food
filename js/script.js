import tabs from './modules/tabs.js';
import modalFn, {openPopup} from './modules/modal.js';
import timer from './modules/timer.js';
import cards from './modules/cards.js';
import calculator from './modules/calculator.js';
import forms from './modules/forms.js';
import slider from './modules/slider.js';
window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = window.setTimeout(() => openPopup(modalTimerId), 5000);
  tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active' );
  modalFn(modalTimerId);
  timer('2023, 06, 15');
  cards();
  calculator();
  forms(modalTimerId);
  slider({
    container:'.offer__slider',
    slide:'.offer__slide',
    nextArrow:'.offer__slider-next',
    prevArrow:'.offer__slider-prev',
    totalCounter:'#total',
    currentCounter:'#current',
    wrapper:'.offer__slider-wrapper',
    field:'.offer__slider-inner'
  });
})
