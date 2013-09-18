trailguide.collections.Segments = Backbone.Collection.extend({
  
  model: trailguide.models.Segment
  
});

trailguide.collections.segments = function (models, options) {
  return new trailguide.collections.Segments(models, options);
};