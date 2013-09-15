trailguide.map = L.map('map').setView(['32.358648265262275', '-110.81634521484375'], 11);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/clarkdav.map-y00xtqe1/{z}/{x}/{y}.png')
  .addTo(trailguide.map);

trailguide.dataUrls = {
  trailheads: '/db/trailheads/_design/geo/_list/featureCollection/all',
  segments: '/db/segments/_design/geo/_list/featureCollection/all',
  routes: '/db/routes/_design/geo/_list/featureCollection/all',
  points: '/db/points/_design/geo/_list/featureCollection/all'
};

trailguide.addLayer = function(dataType) {
  this.getLayerData = function() {
    var settings = {
      url: trailguide.dataUrls[dataType],
      dataType: 'json',
      success: this.addLayerToMap
    };
    $.ajax(settings);
  };
  this.addLayerToMap = function(data) {
    L.geoJson(data).addTo(trailguide.map);
  };
  this.getLayerData();
};

trailguide.addLayer('trailheads');
trailguide.addLayer('segments');
trailguide.addLayer('routes');
trailguide.addLayer('points');

