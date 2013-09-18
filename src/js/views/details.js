trailguide.views.Details = Backbone.View.extend({

  template: trailguide.templates.details,

  render: function() {
    this.$el.append(this.template(this.model.details()));
    return this;
  }

});

trailguide.views.details = function (options) {
  return new trailguide.views.Details(options);  
};