var coords = function (doc) {
    emit(doc.geometry.coordinates, doc._id);
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