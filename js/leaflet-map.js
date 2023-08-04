import { setActiveAppState } from './toggle-app-state.js';
import { createOffer } from './render-offer-cards.js';
import { makeRequest } from './fetch.js';
import { showAlert } from './utils.js';
import { initOffersSort } from './sort-housing.js';
import { debounce } from './utils.js';
const mapElement = document.querySelector('#map-canvas');
const addressInputElement = document.querySelector('#address');
const OFFERS_AMOUNT = 10;
const ZOOM = 12;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const NUMBERS_AFTER_COMMA = 5;

const map = L.map(mapElement);
let markerGroup;

//map configs
const startCoordinates = {
  lat:35.6895,
  lng:139.69171,
};

const tiles = L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
});

//main icon
const mainIconConfigs = {
  url: 'img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const mainIcon = L.icon({
  iconUrl: mainIconConfigs.url,
  iconSize: [mainIconConfigs.width, mainIconConfigs.height],
  iconAnchor: [mainIconConfigs.anchorX, mainIconConfigs.anchorY]
});

const mainMarker = L.marker(startCoordinates, {
  draggable: true,
  title: 'выберите адрес жилья с помощью перемещения маркера',
  icon: mainIcon,
  riseOnHover: true,
});

//other icons
const offerIconConfigs = {
  url: 'img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 52,
};

const offerIcon = L.icon({
  iconUrl: offerIconConfigs.url,
  iconSize: [offerIconConfigs.width, offerIconConfigs.height],
  iconAnchor: [offerIconConfigs.anchorX, offerIconConfigs.anchorY]
});

const setDefaultAdressValue = () => {
  mainMarker.setLatLng(startCoordinates);
  addressInputElement.value = `${startCoordinates.lat} ${startCoordinates.lng}`;
};

const setDefaultMapConfigs = () => {
  map.setView(startCoordinates, ZOOM);
};

const onMainMarkerMoveend = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInputElement.value = `${lat.toFixed(NUMBERS_AFTER_COMMA)}, ${lng.toFixed(NUMBERS_AFTER_COMMA)}`;
};

const createMarker = (dataItem) => {

  const { lat, lng } = dataItem.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      offerIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createOffer(dataItem));

  return marker;
};

const clearMarkerGroup = () => markerGroup.clearLayers();

const renderMarkers = (data) => {
  clearMarkerGroup();
  data.forEach((dataItem) => createMarker(dataItem));
};

const onSuccess = (data) => {
  const dataList = data.slice(0, OFFERS_AMOUNT);
  renderMarkers(dataList);
  initOffersSort (data, debounce(renderMarkers));
  setActiveAppState();
};

const onError = () => {
  showAlert('Не удалось загрузить данные, попробуйте обновить страницу');
};


const onInitMap = () => {
  setDefaultAdressValue();
  markerGroup = L.layerGroup().addTo(map);
  tiles.addTo(map);
  mainMarker.addTo(map);
  mainMarker.on('moveend', onMainMarkerMoveend);
  makeRequest(onSuccess, onError);
};


const initMap = () => {
  map.on('load', onInitMap).setView(startCoordinates, ZOOM);
};

export { setDefaultAdressValue, initMap, setDefaultMapConfigs };
