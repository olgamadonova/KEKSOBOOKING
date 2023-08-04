import { renderNotification, isEscPressed } from './utils.js';

const successPopupElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const errorPopupElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorBtn = errorPopupElement.querySelector('.error__button');

const onSuccessOverlayClick = (evt) => !evt.target.closest('.success__inner') && removeSuccessNotification();
const onSuccessPopupEscKeydown = (evt) => isEscPressed(evt) && removeSuccessNotification();

function removeSuccessNotification () {
  successPopupElement.remove();
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  successPopupElement.removeEventListener('click', onSuccessOverlayClick);
}

const showSuccessPopup = () => {
  renderNotification(successPopupElement);
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  successPopupElement.addEventListener('click', onSuccessOverlayClick);
};

const onErrorBtnClick = () => removeErrorNotification();
const onErrorOverlayClick = (evt) => !evt.target.closest('.error__inner') && removeErrorNotification();
const onErrorPopupEscKeydown = (evt) => isEscPressed(evt) && removeErrorNotification();

function removeErrorNotification () {
  errorPopupElement.remove();
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  errorBtn.removeEventListener('click', onErrorBtnClick);
  errorPopupElement.removeEventListener('click', onErrorOverlayClick);
}

const showErrorPopup = () => {
  renderNotification(errorPopupElement);
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  errorBtn.addEventListener('click', onErrorBtnClick);
  errorPopupElement.addEventListener('click', onErrorOverlayClick);
};

export { showErrorPopup, showSuccessPopup };

