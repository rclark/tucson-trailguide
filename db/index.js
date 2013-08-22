var _ = require('underscore'),
    events = require('events'),
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
            var emitter = new events.EventEmitter(),
                counter = 0;
            
            callback = callback || function () {};
            
            emitter.on('dbRemoved', function () {
                counter++;
                if (counter === _.keys(dbs).length) {
                    callback(null, connection);    
                }
            });
            
            for (name in dbs) {
                connection.db.destroy(name, function (err, result) {
                    if (err) { callback(err); }
                    emitter.emit('dbRemoved');
                });    
            }
        },
        
        loadInto: function (db, data, callback) {
            var emitter = new events.EventEmitter(),
                counter = 0;
            
            callback = callback || function () {};
            
            if (_.isObject(data) && data.type === "FeatureCollection") {
                data = data.features;
            }
            
            if (!_.isArray(data)) {
                data = [data];
            }
            
            emitter.on('featureLoaded', function () {
                counter++;
                if (counter === data.length) {
                    callback(null, db);    
                }
            });
            
            data.forEach(function (feature) {
                db.insert(feature, function (err, result) {
                    if (err) callback(err);
                    emitter.emit('featureLoaded');
                });
            });
            
        }
    }

module.exports = _.extend(setupFunctions, dbs);