import { getRandomPositiveFloat, getSupplementedString, getRandomPositiveInteger, getRandomArrayElement } from './utils.js';

const Offer = {
  AMOUNT:10,
  MIN_LAT_VALUE: 35.65000,
  MAX_LAT_VALUE: 35.70000,
  MIN_LNG_VALUE: 139.70000,
  MAX_LNG_VALUE: 139.80000,
  MIN_PHOTOS_AMOUNT:1,
  MAX_PHOTOS_AMOUNT:3,
  MIN_FEATURES_AMOUNT:3,
  MAX_FEATURES_AMOUNT:7,
  PRICES: [1000, 2000, 3000, 4000, 5000],
  TYPES: ['palace','flat', 'house', 'bungalow','hotel'],
  ROOMS: [1, 2, 3, 4, 5, 6, 7],
  GUESTS: [1, 2, 3, 4, 5],
  CHECKIN_CHECKOUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  TITLES: ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'],
  DESCRIPTION: ['каждый', 'охотник', 'желает', 'знать', 'где', 'сидит', 'фазан'],
  PHOTOS: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
};

const getLocation = () => ({
  lat: getRandomPositiveFloat(Offer.MIN_LAT_VALUE, Offer.MAX_LAT_VALUE, 7),
  lng: getRandomPositiveFloat(Offer.MIN_LNG_VALUE, Offer.MAX_LNG_VALUE, 7)
});

const createAdvert = (index) => {
  const { lat, lng } = getLocation();
  return {
    author: {
      avatar: `img/avatars/user${getSupplementedString(index, 2, '0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(Offer.TITLES),
      address:`${lat} ${lng}`,
      price: getRandomArrayElement(Offer.PRICES),
      type: getRandomArrayElement(Offer.TYPES),
      rooms: getRandomArrayElement(Offer.ROOMS),
      guests: getRandomArrayElement(Offer.GUESTS),
      checkin: getRandomArrayElement(Offer.CHECKIN_CHECKOUT),
      checkout: getRandomArrayElement(Offer.CHECKIN_CHECKOUT),
      features: [...new Set(Array.from({length:getRandomPositiveInteger(Offer.MIN_FEATURES_AMOUNT, Offer.MAX_FEATURES_AMOUNT)}, () => getRandomArrayElement(Offer.FEATURES)))],
      description: getRandomArrayElement(Offer.DESCRIPTION),
      photos: Array.from({length:getRandomPositiveInteger(Offer.MIN_PHOTOS_AMOUNT, Offer.MAX_PHOTOS_AMOUNT)}, () => getRandomArrayElement(Offer.PHOTOS))
    },
    location: {
      lat: lat,
      lng: lng,
    }
  };
};

const getOffers = () => Array.from({length:Offer.AMOUNT}, (_, offerIndex) => createAdvert(offerIndex + 1));

export { getOffers };
