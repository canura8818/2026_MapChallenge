/* global L */
import * as d3 from 'd3';

const element = document.querySelector('#map');
const map = L.map(element, { maxZoom: 18 });

const mapBoxStyle = 'mapbox/light-v11';
const mapBoxKey = 'pk.eyJ1IjoidGF0YXIxOTAxIiwiYSI6ImNtdHVlOGxobjBqdjgzNG9pNWozd3Q1bTMifQ.KDlHQ6fNmwGfkW0ohUU_gA';

const baseLayer = L.tileLayer(
  `https://api.mapbox.com/styles/v1/${mapBoxStyle}/tiles/{z}/{x}/{y}{r}?access_token=${mapBoxKey}`,
  { zoomOffset: -1, tileSize: 512 },
);
baseLayer.addTo(map);

const yearSlider = document.querySelector('#year');
const yearValue = document.querySelector('#year-value');

const panel = document.querySelector('.slider');
L.DomEvent.disableClickPropagation(panel);
L.DomEvent.disableScrollPropagation(panel);

const response = await fetch('data/asian_koel.csv');
const csv = await response.text();
const data = d3.csvParse(csv);

data.forEach(d => {
  d.Latitude = +d.Latitude;
  d.Longitude = +d.Longitude;
  d.Year = +d.Year;
});

const dataLayer = L.layerGroup().addTo(map);

const customIcon = L.icon({
  iconUrl: 'data/asian_koel.png',
  iconSize: [16, 16],
  iconAnchor: [10, 20],
  popupAnchor: [0, -18]
});

function renderPoints(year) {
  dataLayer.clearLayers();

  const filtered = data.filter(d => d.Year === year);
  
  filtered.forEach(d => {
    const marker = L.marker([d.Latitude, d.Longitude], { icon: customIcon });
    marker.bindPopup(
      `<strong>${d.Date || 'Unknown'}</strong><br>`,
      { maxWidth: 240, className: 'bird-tooltip', direction: 'top', opacity: 1 }
    );

    marker.addTo(dataLayer);
  });
}

renderPoints(+yearSlider.value);
yearValue.textContent = yearSlider.value;

yearSlider.addEventListener('input', () => {
  yearValue.textContent = yearSlider.value;
  renderPoints(+yearSlider.value);
});

map.setView([13.9745934,100.7114544], 5);