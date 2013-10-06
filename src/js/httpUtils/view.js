// Run an AJAX request for a db view,
// then return the "value" object.

// Depends on trailguide.httpUtils.json.

trailguide.httpUtils.view = function (db, design, view, params, callback) {

  // Create the URL to the relevant db view.
  var url = '/db/' + db + '/_design/' + design + '/_view/' + view + '?';
  for (var param in params) {
    url += param + '=' + JSON.stringify(params[param]) + '&';
  }
  url = url.substring(0, url.length - 1);

  // Run an AJAX request for the view.
  trailguide.httpUtils.json(url, function (err, response) {

    // Pluck the "value" object,
    // and return it to the callback.
    var result = _.pluck(response.rows, 'value');
    callback(null, result);

  });

};