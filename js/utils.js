import { createDomElement } from './create-dom-element.js';

const bodyElement = document.querySelector('body');

const ALERT_TIME = 3500;
const TIMEOUT_DELAY = 500;

const getRandomPositiveFloat = (min, max, digits = 1) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;

  return parseFloat(result.toFixed(digits));
};

const getRandomPositiveInteger = (min, max) => {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const getSupplementedString = (num, minStrLength, supplementStr) => String(num).padStart(minStrLength, supplementStr);

const toggleState = (element) => {
  element.disabled = !element.disabled;
};

const showAlert = (message) => {
  const alertContainer = createDomElement('div', {
    className: 'alert-message',
    textContent: message,
  });
  alertContainer.style.cssText = 'z-index:100; position: absolute; left:0; right: 0; top: 0; padding: 10px 3px; font-size:36px; text-align: center; background: orangered; transform: scale(1);';
  bodyElement.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.style.transform = 'scale(0)';
  }, ALERT_TIME);
};
const normalizeString = (str) => str.toLowerCase().trim();

const renderNotification = (element) => bodyElement.appendChild(element);

const isEscPressed = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomPositiveFloat, getSupplementedString, getRandomPositiveInteger, getRandomArrayElement, toggleState, showAlert, normalizeString, renderNotification, isEscPressed, debounce };
