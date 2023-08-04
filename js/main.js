import { initMap } from './leaflet-map.js';
import './slider.js';

import './form-validate.js';
import { setInacativeAppState } from './toggle-app-state.js';
import './show-photo-preview.js';
import './sort-housing.js';

setInacativeAppState();
document.addEventListener('DOMContentLoaded', () => {
  initMap();
});

