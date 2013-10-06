// You give me an array of Backbone Models, I fetch all of them, and send you
//  back an array of populated models through your callback function.
// 
// Use it like this:
//  var models = [ ... array of un-populated models with IDs set ... ];
//  trailguide.httpUtils.fetchAll(models, function (err, populatedModels) {
//    if (err) { handle(err); return; }
//    var attribute = populatedModels[0].get('theAttributeYouWant');
//    ...
//  }

trailguide.httpUtils.fetchAll = function (models, callback) {
  function fetcher(model, fetchedOne) {
    model.fetch({
      success: function (model, response, options) {
        fetchedOne(null, model);
      },
      error: function (model, response, options) {
        fetchedOne(response, model);
      }
    });
  }
  
  async.map(models, fetcher, callback);
};
  
