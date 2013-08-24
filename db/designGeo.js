var featureCollection = function (head, req) {
    send('{"type": "FeatureCollection", "features": [');
    
    var row = getRow();
    if (row) { send(JSON.stringify(row.value)); }
    while (row = getRow()) {
        send(', ' + JSON.stringify(row.value));
    }
    
    send(']}');
};

var all = function (doc) {
    emit(doc._id, doc);    
}

module.exports = {
    _id: "_design/geo",
    language: "javascript",
    views: {
        all: {
            map: all.toString()
        }
    },
    
    lists: {
        featureCollection: featureCollection.toString()
    }
};