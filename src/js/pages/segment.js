trailguide.models.segment(trailguide.pages.segmentId).fetch({
  success: function(thisSegment) {
    
    // Stash the segment
    trailguide.pages.segment = { thisSegment: thisSegment };
    
    // Render the segment's details
    trailguide.views.details({
      model: thisSegment,
      el: '#details'
    }).render();
    
  }
});
