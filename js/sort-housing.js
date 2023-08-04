const sortFormElement = document.querySelector('.map__filters');
const housingTypeElement = sortFormElement.querySelector('#housing-type');
const housingPriceElement = sortFormElement.querySelector('#housing-price');
const housingRoomsElement = sortFormElement.querySelector('#housing-rooms');
const housingGuestsElement = sortFormElement.querySelector('#housing-guests');

const OFFERS_COUNT = 10;
const DEFAULT_TYPE = 'any';

const PriceOptions = {
  ANY:  {
    minPrice: 0,
    maxPrice: 100000,
  },
  LOW: {
    minPrice: 0,
    maxPrice: 10000,
  },
  MIDDLE: {
    minPrice: 10001,
    msxPrice: 50000,
  },
  HIGH: {
    minPrice: 50001,
    maxPrice: 100000,
  },
};
const sortByType = ({offer: {type}}) => housingTypeElement.value === type || housingTypeElement.value === DEFAULT_TYPE;

const sortByRooms = ({offer: {rooms}}) => parseInt(housingRoomsElement.value, 10) === rooms || housingRoomsElement.value === DEFAULT_TYPE;

const sortByGuests = ({offer: {guests}}) => parseInt(housingGuestsElement.value, 10) === guests || housingGuestsElement.value === DEFAULT_TYPE;

const sortByPrice = ({offer: {price}}) => {
  const chosenPrice = housingPriceElement.value.toUpperCase();
  return price >= PriceOptions[chosenPrice].minPrice && price <= PriceOptions[chosenPrice].maxPrice;
};

const sortByFeatures = ({offer: {features}}) => {
  const chosenFeatures = sortFormElement.querySelectorAll('.map__checkbox:checked');
  if (chosenFeatures.length && features) {
    return [...chosenFeatures].every((chosenFeature) => features.includes(chosenFeature.value));
  }
  return chosenFeatures.length === 0;
};

const onSortFormChange = (dataList, cb) => {
  const offers = [...dataList];

  const filteredOffers = [];

  for (const offer of offers) {
    if (sortByPrice(offer)
    && sortByGuests(offer)
    && sortByRooms(offer)
    && sortByType(offer)
    && sortByFeatures(offer)
    ) {
      filteredOffers.push(offer);
      if (filteredOffers.length >= OFFERS_COUNT) {
        break;
      }
    }
  } return cb(filteredOffers.slice(0, OFFERS_COUNT));
};


const initOffersSort = (dataList, cb) => sortFormElement.addEventListener('change', () => onSortFormChange(dataList, cb));

export {initOffersSort};

