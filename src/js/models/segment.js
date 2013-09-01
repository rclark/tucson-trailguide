var Segment = Backbone.Model.extend({

  urlRoot: '/db/segments/',

  parse: function(response, options) {
    // Include properties and geometry in model's attributes.
    var attributes = _.extend(response.properties, {geometry: response.geometry});
    return attributes;
  },

  coordinatesToMerc: function() {
    // Return the coordinates in Mercator projection.
    var source = new proj4.Proj('EPSG:4326'),
        dest = new proj4.Proj('EPSG:3857'),
        geoType = this.get('geometry').type,
        coordinates = this.get('geometry').coordinates;

    var mercCoordinates = _.map(coordinates, function(point) {
      var p = new proj4.Point(point[0], point[1]);
      var newP = proj4.transform(source, dest, p);
      return [newP.x, newP.y];
    });
    this.mercGeometry = {
      'type': geoType,
      'coordinates': mercCoordinates
    };
  },

  geometryToJsts: function() {
    // Return what jsts.io.GeoJSONReader reads from
    // the model's geoJSON geomtry.
    var reader = new jsts.io.GeoJSONReader();
    this.jstsGeometry = reader.read(this.mercGeometry);
  },

  getDistance: function() {
    var distance = this.jstsGeometry.getLength();
    return distance;
  }

});

var seg = new Segment({
  id: 'segment-1'
});

seg.fetch({
  success: function(model, res) {
    model.coordinatesToMerc();
    model.geometryToJsts();
    $('#distance-val').html(model.getDistance());
  }
});