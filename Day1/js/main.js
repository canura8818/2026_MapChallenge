/* global L */
const element = document.querySelector('#map');
const map = L.map(element, { maxZoom: 18 });

const mapBoxStyle = 'mapbox/light-v11';
const mapBoxKey = 'pk.eyJ1IjoidGF0YXIxOTAxIiwiYSI6ImNtdHVlOGxobjBqdjgzNG9pNWozd3Q1bTMifQ.KDlHQ6fNmwGfkW0ohUU_gA';

const baseLayer = L.tileLayer(
  `https://api.mapbox.com/styles/v1/${mapBoxStyle}/tiles/{z}/{x}/{y}{r}?access_token=${mapBoxKey}`,
  { zoomOffset: -1, tileSize: 512 },
);
baseLayer.addTo(map);

const response = await fetch('data/bangkok_malls.geojson');
const data = await response.json();

const dataLayer = L.geoJSON(data, {
  pointToLayer: (feature, latlng) => L.circleMarker(latlng),
  style: (feature) => {
    if (feature.geometry.type === 'Point') {
      return { stroke: false, radius: 6, fillOpacity: 10 };
    }
  },
  interactive: true,
});

dataLayer.bindPopup(
  (layer) => {
    const { name, area, image, link } = layer.feature.properties;
    const imgTag = `<br><img src="${image}" style="width:200px;height:150px;object-fit:cover;display:block;margin-top:4px;border-radius:3px;"/>`;
    const sourceTag = link ? `<br>Source: <a href="${link}" target="_blank" rel="noopener noreferrer">View</a>` : "";
    return `<strong>${name}</strong><br>Area: ${area}${sourceTag}${imgTag}`;
  },
  { maxWidth: 240, className: 'mall-tooltip', direction: 'top', opacity: 1 },
);

dataLayer.addTo(map);
map.setView([13.8,100.5850019], 10.5);