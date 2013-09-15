trailguide.models.Segment = Backbone.Model.extend({

  urlRoot: '/db/segments/',

  parse: function (response, options) {
    var additional = {};
    additional.geometry = response.geometry;
    additional.projectedGeometry = trailguide.geoUtils.project(response.geometry);
    additional.jstsGeometry = trailguide.geoUtils.geojson2jsts(additional.projectedGeometry);

    return _.extend(additional, response.properties);
  },

  toJSON: function () {
    var keysToRemove = [
      'geometry',
      'projectedGeometry',
      'jstsGeometry',
      'leafletLayer'
    ];

    return {
      type: "Feature",
      properties: _.omit(this.attributes, keysToRemove),
      geometry: this.get('geometry')
    };
  },

  getDistance: function() {
    return this.get('jstsGeometry').getLength();
  },

  leafletLayer: function (options) {
    options = options || {};
    return L.geoJson(this.toJSON(), options);
  },

  details: function() {
    var details = {
      'distance': this.getDistance()
    };
    return { 'details': details };
  }
});