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

  getDistance: function () {
    return this.get('jstsGeometry').getLength();
  },

  getEndpoints: function () {
    var coords = this.get('geometry').coordinates;
    endpoints = [coords[0], coords[coords.length - 1]];
    return endpoints;
  },

  trailheadsDetails: function (callback) {
    // Get any trailheads that share
    // this segment's endpoints.
    var url = '/db/trailheads/_design/trailheads/_view/coords?keys=' + JSON.stringify(this.getEndpoints());
    trailguide.httpUtils.json(url, function (err, response) {
      var trailheads = _.pluck(response.rows, 'value');
      callback(null, trailheads);
    });
  },



  getAdjacentSegments: function (callback) {
    // Get any other segments corresponding with
    // this segment's endpoints.
    var url = '/db/segments/_design/segments/_view/endpoints?keys=' + JSON.stringify(this.getEndpoints());
    trailguide.httpUtils.json(url, function (err, response) {
      var ids = _.map(response.rows, function (row) {
        return row.id;
      });

      ids = _.uniq(ids);

      ids = _.reject(ids, function (id) {
        return id === trailguide.pages.segmentId;
      });

      callback(null, _.map(ids, function (id) {
        return trailguide.models.segment(id);
      }));
    });
  },

  getPOIs: function() {
    // Get POIs associated with this segment.
    var poiIDs = this.get('pois');
    return poiIDs;
  },

  getRelatedRoutes: function () {
    // Get any routes that include this segment.
    var url = '/db/routes/_design/routes/_view/segments?key="' + this.id + '"';
    trailguide.httpUtils.json(url, function (err, response) {
      console.log(response.rows);
    });
  },

  leafletLayer: function (options) {
    options = options || {};
    return L.geoJson(this.toJSON(), options);
  },

  details: function (callback) {
    // Prepare the details object for
    // this segment's view.
    var details = {};

    // Add distance
    details.distance = this.getDistance();

    // Add accessibility.
    var accessibility = this.get('accessibility');
    if (accessibility) {
      details.accessibility = accessibility;
    }

    // Add adjacent trailheads.
    this.trailheadsDetails(function (err, response) {
      details.trailheads = response;
    });

    // Add POIs.
    var pois = this.getPOIs();
    if (pois) {
      details.pois = pois;
    }

    // Return
    callback(null, details);

  }
});

trailguide.models.segment = function (segmentId) {
    return new trailguide.models.Segment({ id: segmentId });
};