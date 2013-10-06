trailguide.collections.Trailheads = Backbone.Collection.extend({

  model: trailguide.models.Trailheads,

  getByCoords: function (coords) {
    var url = '/db/trailheads/_design/trailheads/_view/coords?keys=' + coords,
      self = this;
    console.log(url);
    $.ajax({
      url: url,
      dataType: 'json'
    }).done(processData);

    function processData (data) {
      var idObjs = _.map(data.rows, function (val) {
        return { id: val.id };
      });
      self.reset(idObjs);
    }
  }

});

trailguide.collections.trailheads = function (models, options) {
  return new trailguide.collections.Trailheads(models, options);
};