import { validatePriceInput } from './form-validate.js';
const sliderElement = document.querySelector('.ad-form__slider');
const priceInputElement = document.querySelector('#price');

const initNoUiSlider = () => {
  noUiSlider.create(sliderElement, {
    start: 0,
    connect: 'lower',
    step: 1,
    range: {
      'min': 0,
      'max': 100000,
    },
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseInt(value, 10);
      },
    },
  });
};

initNoUiSlider();

const onSliderElementChange = () => {
  priceInputElement.value = sliderElement.noUiSlider.get();

  validatePriceInput();
};

sliderElement.noUiSlider.on('change', onSliderElementChange);

const onPriceInputElementInput = () => {
  sliderElement.noUiSlider.set(priceInputElement.value);
};

priceInputElement.addEventListener('input', onPriceInputElementInput);

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

const disableSlider = () => {
  sliderElement.setAttribute('disabled', true);
};

const enableSlider = () => {
  sliderElement.removeAttribute('disabled');
};

export { disableSlider, enableSlider, resetSlider };

