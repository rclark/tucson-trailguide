trailguide.views.details = Backbone.View.extend({

  template: trailguide.templates.details,

  render: function() {
    this.$el.append(this.template(this.model.details()));
    return this;
  }

});