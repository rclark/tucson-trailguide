var segments = function (doc) {
    doc.properties.segments.forEach(function (segment) {
        emit(segment, doc.properties);  
    });
};

var trailheads = function (doc) {
    emit(doc.properties.trailheads.start, doc.properties);
    emit(doc.properties.trailheads.end, doc.properties);
};

module.exports = {
    _id: "_design/routes",
    language: "javascript",
    views: {
        segments: {
            map: segments.toString()
        },
        trailheads: {
            map: trailheads.toString()
        }
    }
}