trailguide.views.Details = Backbone.View.extend({

  template: trailguide.templates.details,

  render: function() {
    var self = this,
        details = { 'details': '' };
    self.model.details(function (err, response) {
      details.details = response;
      self.$el.append(self.template(details));
    });
    return self;
  }

});

trailguide.views.details = function (options) {
  return new trailguide.views.Details(options);
};