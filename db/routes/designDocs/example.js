var ways = function (doc) {
    emit(doc._id, doc);    
}

module.exports = {
    _id: "_design/example",
    language: "javascript",
    views: {
        ways: {
            map: ways.toString()
        }
    }
}