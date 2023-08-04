import { createDomElement } from './create-dom-element.js';

const PropertyTypes = {
  notype: '',
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const clearElementContent = (element) => {
  element.innerHTML = '';
};

const createImage = (photoSrc) => createDomElement('img', {
  className: 'popup__photo',
  width:45,
  height: 40,
  alt: 'Фотография жилья',
  src: photoSrc,
});

const createOffer = (data) => {
  const offerCard = offerTemplate.cloneNode(true);

  const { title = '', address = '', price = '', type = 'notype', rooms = '', guests = '', checkin = '', checkout = '', description = '' } = data.offer;

  offerCard.querySelector('.popup__title').textContent = title;
  offerCard.querySelector('.popup__text--address').textContent = address;
  offerCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  offerCard.querySelector('.popup__type').textContent = PropertyTypes[type];
  offerCard.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  offerCard.querySelector('.popup__description').textContent = description;
  offerCard.querySelector('.popup__avatar').src = data?.author?.avatar ?? offerCard.querySelector('.popup__avatar').remove();

  clearElementContent(offerCard.querySelector('.popup__photos'));

  if (data?.offer?.photos) {
    data?.offer?.photos.forEach((src) => offerCard.querySelector('.popup__photos').appendChild(createImage(src)));
  }

  const featuresItems = offerCard.querySelectorAll('.popup__feature');

  if (data.offer.features) {
    featuresItems.forEach((item) => {
      const isAvaliable = data.offer.features.some((feature) => item.classList.contains(`popup__feature--${feature}`));
      if (!isAvaliable) {
        item.remove();
      }
    });
  } else {
    clearElementContent(offerCard.querySelector('.popup__features'));
  }

  return offerCard;
};

export { createOffer };

