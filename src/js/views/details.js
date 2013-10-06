trailguide.views.Details = Backbone.View.extend({

  template: trailguide.templates.details,

  render: function() {
    var details = { 'details': '' };
    this.model.details(function (err, response) {
      details.details = response;
    });

    // Prepare trailheads for template.

    this.$el.append(this.template(details));
    return this;
  }

});

trailguide.views.details = function (options) {
  return new trailguide.views.Details(options);
};