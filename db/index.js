var _ = require('underscore'),
    config = require('../configuration.js').dbConfig,
    connection = require('nano')(config.dbProtocol + '://' + config.dbHost + ':' + config.dbPort),
    dbs = {
        routes: require('./routes')(connection),
        points: require('./points')(connection),
        segments: require('./segments')(connection),
        trailheads: require('./trailheads')(connection)
    };

    setupFunctions = {
        setupAll: function (callback) {
            callback = callback || function () {};
            for (dbName in dbs) { dbs[dbName].setup(); }
            callback(null, connection);
        },
        
        purge: function (callback) {
            for (name in dbs) {
                connection.db.destroy(name);    
            }
            callback(null, connection);
        }
    }

module.exports = _.extend(setupFunctions, dbs);