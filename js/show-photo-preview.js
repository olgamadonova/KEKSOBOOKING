import { createDomElement } from './create-dom-element.js';

const formElement = document.querySelector('.ad-form');
const uploadHousingInputElement = formElement.querySelector('#images');
const uploadAvatarInputElement = formElement.querySelector('#avatar');
const avatarPreviewElement = formElement.querySelector('.ad-form-header__preview img');
const housingPhotoContainer = formElement.querySelector('.ad-form__photo');

const createImage = (photoSrc) => createDomElement('img', {
  width:70,
  height: 70,
  alt: 'Фотография жилья',
  src: photoSrc,
});

import { normalizeString } from './utils.js';

const FILE_TYPES = ['gif', 'webp', 'jpeg', 'png', 'avif', 'jpg', 'svg'];

const getPhotoSrc = (input) => {
  let photoSrc;
  const file = input.files[0];
  const fileName = normalizeString(file.name);

  const isMatching = FILE_TYPES.some((extention) => fileName.endsWith(extention));

  if (isMatching) {
    photoSrc = URL.createObjectURL(file);
  }
  return photoSrc;
};

const onUploadAvatarChange = () => {
  avatarPreviewElement.src = getPhotoSrc(uploadAvatarInputElement);
};

const onUploadHousingChange = () => {
  housingPhotoContainer.appendChild(createImage(getPhotoSrc(uploadHousingInputElement)));
};

uploadAvatarInputElement.addEventListener('change', onUploadAvatarChange);
uploadHousingInputElement.addEventListener('change', onUploadHousingChange);
