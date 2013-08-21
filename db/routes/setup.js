var dbName = 'routes';

module.exports = function (connection, callback) {
    var _ = require('underscore'),
        fs = require('fs');
    
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
            var db = connection.use(dbName);
            
            function cycleDesignDocs(err, filenames) {
                var counter = 0;
                
                console.log(err);
                function eachDesignDoc(filename) {
                    
                    var doc = require('./designDocs/' + filename);
                    db.insert(doc, doc._id, interateDocs);
                }
                
                function iterateDocs(err, response) {
                    counter++;
                    if (counter === filenames.length) {
                        callback(err, db);
                    }
                }
                
                filenames.forEach(eachDesignDoc);
            }
            
            fs.readdir('../designDocs', cycleDesignDocs);
        }
    }
            
    connection.db.list(databaseExists);
};