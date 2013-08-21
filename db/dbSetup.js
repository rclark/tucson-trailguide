module.exports = function (dbName, connection, callback) {
    var _ = require('underscore'),
        events = require('events');
    
    function databaseExists(err, body) {        
        if (err) { 
            callback(err);
        } else {
            if (_.contains(body, dbName)) {
                updateDesignDocs(null);
            } else {
                connection.db.create(dbName, updateDesignDocs);
            }
        }
    }
    
    function updateDesignDocs(err) {
        if (err) {
            callback(err);
        } else {
            
            var db = connection.use(dbName),
                docs = require([__dirname, dbName, 'designDocs'].join('/')),
                emitter = new events.EventEmitter(),               
                counter = 0;
            
            function addDesignDoc(doc) {
                db.insert(doc, doc._id, function (err, response) {
                    if (err) {
                        callback(err);
                    } else {
                        emitter.emit('docAdded');
                    }
                });
            }
            
            function upsertDesignDoc(doc) {
                if (doc._id) {
                    db.get(doc._id, function (err, oldDoc) {
                        if (err && err.status_code === 404) {
                            addDesignDoc(doc);
                        } else if (err) {
                            callback(err);
                        } else {
                            addDesignDoc(_.extend(oldDoc, doc));
                        }
                    });
                } else {
                    addDesignDoc(doc);
                }
            }
                
            emitter.on('docAdded', function () { 
                counter++;
                if (counter === docs.length) {
                    callback(null, db);    
                }
            });
            
            docs.forEach(upsertDesignDoc);
        }
    }
            
    connection.db.list(databaseExists);
};