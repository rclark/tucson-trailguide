trailguide.map = L.map('map').setView(['32.358648265262275', '-110.81634521484375'], 11);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/clarkdav.map-y00xtqe1/{z}/{x}/{y}.png')
  .addTo(trailguide.map);

trailguide.urls = {
  trailheads: '/db/trailheads/_design/geo/_list/featureCollection/all',
  routes: '/db/routes/_design/geo/_list/featureCollection/all',
};

var addLayer = function(data) {
  L.geoJson(data)
    .addTo(trailguide.map);
};

var settings = {
  url: trailguide.urls.trailheads,
  crossDomain: true,
  dataType: 'json',
  success: addLayer
};
$.ajax(settings);