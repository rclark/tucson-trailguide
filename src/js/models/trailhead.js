trailguide.models.Trailhead = Backbone.Model.extend({

  urlRoot: '/db/trailheads/',

  parse: function (response, options) {
    var additional = {};
    additional.geometry = response.geometry;

    return _.extend(additional, response.properties);
  }

});

trailguide.models.trailhead = function (trailheadId) {
  return new trailguide.models.Trailhead({ id: trailheadId });
};