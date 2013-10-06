var coords = function (doc) {
  var props = {
    id: doc._id,
    name: doc.properties.name
  };
  emit(doc.geometry.coordinates, props);
};

module.exports = {
    _id: "_design/trailheads",
    language: "javascript",
    views: {
        coords: {
            map: coords.toString()
        }
    }
};