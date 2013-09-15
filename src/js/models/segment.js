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

  getEndpoints: function() {
    var coords = this.get('geometry').coordinates;
    endpoints = [coords[0], coords[coords.length - 1]];
    return endpoints;
  },

  getAdjacentTrailheads: function() {

  },

  getAdjacentSegments: function() {
    var url = 'db/segments/_design/geo/_view/endpoints?keys=' + this.getEndpoints() + '';

  },

  leafletLayer: function (options) {
    options = options || {};
    return L.geoJson(this.toJSON(), options);
  },

  details: function() {
    var details = {
      'distance': this.getDistance()
    };

    var pois = this.get('pois') || false;
    if (pois) {
      details.pois = pois;
    }

    var accessibility = this.get('accessibility') || false;
    if (accessibility) {
      details.accessibility = accessibility;
    }

    return { 'details': details };
  }
});