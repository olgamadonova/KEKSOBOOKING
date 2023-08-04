import { toggleState } from './utils.js';
import { disableSlider, enableSlider } from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const fieldsets = adFormElement.querySelectorAll('fieldset');
const filterFormElement = document.querySelector('.map__filters');


const setInacativeAppState = () => {
  disableSlider();
  adFormElement.classList.add('ad-form--disabled');
  filterFormElement.classList.add('map__filters--disabled');
  fieldsets.forEach((field) => toggleState(field));
  for (const element of filterFormElement.elements) {
    toggleState(element);
  }
};

//after map init
const setActiveFormState = () => {
  enableSlider();
  adFormElement.classList.remove('ad-form--disabled');
  fieldsets.forEach((field) => toggleState(field));
};

//after data load
const setActiveDataState = () => {
  //render ads
  filterFormElement.classList.remove('map__filters--disabled');
  for (const element of filterFormElement.elements) {
    toggleState(element);
  }
};

const setActiveAppState = () => {
  setActiveFormState();
  setActiveDataState();
};

export { setActiveFormState, setActiveDataState, setActiveAppState, setInacativeAppState };
