trailguide.httpUtils.json = function (url, callback) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function (response, status, xhr) {
      callback(null, response);  
    },
    error: function (xhr, status, exception) {
      callback(exception || status);
    }
  });
};