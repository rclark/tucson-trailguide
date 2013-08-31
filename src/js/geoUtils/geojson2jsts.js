trailguide.geoUtils.geojson2jsts = function (geojson) {
  var reader = new jsts.io.GeoJSONReader();
  return reader.read(geojson);
};