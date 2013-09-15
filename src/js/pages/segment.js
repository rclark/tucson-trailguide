var big = new trailguide.models.Segment({
  id: "segment-2"
});

big.fetch({
  success: function() {
    var butt = new trailguide.views.details({
      model: big,
      el: '#details'
    });
    butt.render();
  }
});

