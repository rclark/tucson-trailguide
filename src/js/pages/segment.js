var big = new trailguide.models.Segment({
  id: "segment-1"
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

