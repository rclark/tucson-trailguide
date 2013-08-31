trailguide.geoUtils.project = function (geoJsonGeometry, sourceProj, destProj) {
  sourceProj = sourceProj || new proj4.Proj('EPSG:4326'),
  destProj = destProj || new proj4.Proj('EPSG:3857'),
    
  var originalCoords = geoJsonGeometry.coordinates,
      mercCoordinates;
    
  function projectLine(lineString) {
    return _.map(lineString, function (coord) {
      var p = new proj4.Point(coord[0], coord[1]),
          projected = proj4.transform(source, dest, p);
      
      return [newP.x, newP.y];
    });
  }
  
  switch (geoJsonGeometry.type) {
    case "Point":
      mercCoordinates = projectLine([originalCoords])[0];
      break;
    case "LineString":
      mercCoordinates = projectLine(originalCoords);
      break;
    case "MultiLineString":
      mercCoordinates = _.map(originalCoords, function (line) {
        return projectLine(line);
      });
      break;
    case "Polygon":
      mercCoordinates = _.map(originalCoords, function (line) {
        return projectLine(line);
      });
      break;
    case "MultiPolygon":
      mercCoordinates = _.map(originalCoords, function (polygon) {
        return _.map(polygon, function (line) {
          return projectLine(line);  
        });
      });
      break;
  }
  
  return {
    'type': geoJsonGeometry.type,
    'coordinates': mercCoordinates
  };  
};