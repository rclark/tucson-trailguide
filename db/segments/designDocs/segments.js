var endpoints = function (doc) {
    var coords = doc.geometry.coordinates;
    emit(coords[0], doc.properties);
    emit(coords[coords.length - 1], doc.properties);
}

module.exports = {
    _id: "_design/segments",
    language: "javascript",
    views: {
        endpoints: {
            map: endpoints.toString()
        }
    }
};