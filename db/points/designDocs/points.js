var ids = function (doc) {
  var props = {
    id: doc._id,
    name: doc.properties.name
  };
  emit(doc._id, props);
};

module.exports = {
    _id: "_design/points",
    language: "javascript",
    views: {
        ids: {
            map: ids.toString()
        }
    }
};