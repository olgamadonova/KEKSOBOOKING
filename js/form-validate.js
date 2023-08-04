import { normalizeString } from './utils.js';
import { makeRequest } from './fetch.js';
import { showErrorPopup, showSuccessPopup } from './render-notifications.js';
import { setDefaultMapConfigs, setDefaultAdressValue } from './leaflet-map.js';
import { resetSlider } from './slider.js';

const formElement = document.querySelector('.ad-form');
const timeInInputElement = formElement.querySelector('#timein');
const timeOutInputElement = formElement.querySelector('#timeout');
const titleInputElement = formElement.querySelector('#title');
const roomNumberInputElement = formElement.querySelector('#room_number');
const capacityInputElement = formElement.querySelector('#capacity');
const housingTypeInputElement = formElement.querySelector('#type');
const priceInputElement = formElement.querySelector('#price');
const submitButtonElement = formElement.querySelector('.ad-form__submit');
const invalidTitleElement = formElement.querySelector('.title__invalid');
const invalidRoomNumberElement = formElement.querySelector('.room-number__invalid');
const invalidPriceElement = formElement.querySelector('.price__invalid');

const resetButtonElement = formElement.querySelector('.ad-form__reset');

const MAX_PRICE_FOR_HOUSING = 100000;

const MinPriceForHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const TitleLength = {
  MIN_LENGTH: 30,
  MAX_LENGTH:100,
};

const TitleValidityError = {
  TITLE_TOO_LONG: `описание должно содержать не более  ${TitleLength.MAX_LENGTH} символов`,
  TITLE_TOO_SHORT: `описание должно содержать не менее ${TitleLength.MIN_LENGTH} символов`,
  TITLE_REQUIRED: 'введите описание жилья',
};

const RoomsValidityError = {
  1: 'для 1 гостя',
  2: 'для 2 гостей или для 1 гостя',
  3: 'для 3 гостей, для 2 гостей или для 1 гостя',
  100: 'не для гостей',
};

const RoomsGuestsConfig = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const GuestsRoomsConfig = {
  0: [100],
  1: [3, 2, 1],
  2: [3, 2],
  3: [3],
};

const blockSubmitBtn = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.style.background = '#ffaa99';
};

const unBlockSubmitBtn = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.style.background = '';
};

const onHousingTypeChange = (evt) => {
  const type = evt.target.value;

  priceInputElement.placeholder = MinPriceForHousing[type];

  priceInputElement.min = MinPriceForHousing[type];

  if (parseInt(priceInputElement.value, 10) < parseInt(priceInputElement.min, 10)) {

    invalidPriceElement.classList.remove('hidden');

    invalidPriceElement.textContent = `цена не может быть ниже ${MinPriceForHousing[type]}`;

    blockSubmitBtn();
  } else {
    invalidPriceElement.classList.add('hidden');

    unBlockSubmitBtn();
  }
};

const validatePriceInput = () => {
  const minPrice = priceInputElement.getAttribute('min');
  if (priceInputElement.validity.valueMissing) {
    invalidPriceElement.classList.remove('hidden');

    invalidPriceElement.textContent = 'укажите стоимость проживания';

  } if (priceInputElement.validity.rangeUnderflow) {

    invalidPriceElement.classList.remove('hidden');

    invalidPriceElement.textContent = `цена не может быть ниже ${minPrice}`;

  } if (priceInputElement.validity.rangeOverflow) {

    invalidPriceElement.classList.remove('hidden');

    invalidPriceElement.textContent = `цена не может быть выше ${MAX_PRICE_FOR_HOUSING}`;

  } if (priceInputElement.validity.valid) {
    invalidPriceElement.classList.add('hidden');

    unBlockSubmitBtn();
  } else {
    blockSubmitBtn();
  }
};

const onPriceInput = () => validatePriceInput();

const onRoomNumberChange = (evt) => {
  const currentValue = evt.target.value;

  if (!RoomsGuestsConfig[currentValue].includes(parseInt(capacityInputElement.value, 10))) {

    invalidRoomNumberElement.classList.remove('hidden');

    invalidRoomNumberElement.textContent = `${RoomsValidityError[currentValue]}`;

    blockSubmitBtn();
  } else {
    invalidRoomNumberElement.classList.add('hidden');

    unBlockSubmitBtn();
  }
};

const onCapacityChange = (evt) => {
  const currentValue = evt.target.value;

  if (!GuestsRoomsConfig[currentValue].includes(parseInt(roomNumberInputElement.value, 10))) {

    invalidRoomNumberElement.classList.remove('hidden');

    blockSubmitBtn();
  } else {
    invalidRoomNumberElement.classList.add('hidden');

    unBlockSubmitBtn();
  }
};

const onTimeInInputChange = (evt) => {
  timeOutInputElement.value = evt.target.value;
};

const onTimeOutInputChange = (evt) => {
  timeInInputElement.value = evt.target.value;
};

const onTitleInput = (evt) => {
  const title = evt.target;
  const normalizeTitle = normalizeString(title.value);

  if (normalizeTitle.length < TitleLength.MIN_LENGTH) {
    invalidTitleElement.classList.remove('hidden');
    invalidTitleElement.textContent = TitleValidityError.TITLE_TOO_SHORT;

  } if (normalizeTitle.length === 0) {
    invalidTitleElement.classList.remove('hidden');
    invalidTitleElement.textContent = TitleValidityError.TITLE_REQUIRED;

  } if(normalizeTitle.length > TitleLength.MAX_LENGTH) {
    invalidTitleElement.classList.remove('hidden');
    invalidTitleElement.textContent = TitleValidityError.TITLE_TOO_LONG;

  } if (normalizeTitle.length >= TitleLength.MIN_LENGTH && normalizeTitle.length <= TitleLength.MAX_LENGTH) {
    unBlockSubmitBtn();
    invalidTitleElement.classList.add('hidden');
  } else {
    blockSubmitBtn();
  }
};

const validateFormOnInputEvents = () => {
  titleInputElement.addEventListener('input', onTitleInput);
  timeInInputElement.addEventListener('change', onTimeInInputChange);
  timeOutInputElement.addEventListener('change', onTimeOutInputChange);
  capacityInputElement.addEventListener('change', onCapacityChange);
  roomNumberInputElement.addEventListener('change', onRoomNumberChange);
  housingTypeInputElement.addEventListener('change', onHousingTypeChange);
  priceInputElement.addEventListener('input', onPriceInput);
};

validateFormOnInputEvents();

const onTitleInputInvalid = () => {
  invalidTitleElement.classList.remove('hidden');
  invalidTitleElement.textContent = TitleValidityError.TITLE_REQUIRED;
  blockSubmitBtn();
};

const onPriceInputInvalid = () => {
  invalidPriceElement.classList.remove('hidden');
  invalidPriceElement.textContent = 'укажите стоимость проживания';
  blockSubmitBtn();
};

const resetForm = () => {
  formElement.reset();
  setDefaultAdressValue();
  setDefaultMapConfigs();
  resetSlider();
  document.querySelectorAll('.custom-error').forEach((element) => element.classList.add('hidden'));
};

const onResetButtonClick = () => resetForm();

resetButtonElement.addEventListener('click', onResetButtonClick);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  titleInputElement.addEventListener('invalid', onTitleInputInvalid);
  priceInputElement.addEventListener('invalid', onPriceInputInvalid);
  if (formElement.checkValidity()) {
    blockSubmitBtn();
    makeRequest(() => {
      showSuccessPopup();
      resetForm();
    }, showErrorPopup, 'POST', new FormData(evt.target))
      .finally(unBlockSubmitBtn);
  }
};

formElement.addEventListener('submit', onFormSubmit);

export { validatePriceInput };
