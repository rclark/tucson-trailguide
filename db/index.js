var _ = require('underscore'),
    events = require('events'),
    config = require('../configuration.js').dbConfig,
    connection = require('nano')(config.dbProtocol + '://' + config.dbHost + ':' + config.dbPort),
    dbs = {
        routes: require('./routes')(connection),
        points: require('./points')(connection),
        segments: require('./segments')(connection),
        trailheads: require('./trailheads')(connection)
    },

    setupFunctions = {
        setupAll: function (callback) {
            var counter = 0;
            
            callback = callback || function () {};
            
            function addOne(a,b) {                
                counter++;
                if (counter === _.keys(dbs).length) {
                    callback(null, connection);
                }
            }
            
            _.keys(dbs).forEach(function (dbName) {
                dbs[dbName].setup(addOne);
            });
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
            
            _.keys(dbs).forEach(function (name) {
                connection.db.destroy(name, function (err, result) {
                    if (err && err.status_code !== 404) { callback(err); }
                    emitter.emit('dbRemoved');
                });
            });
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
                db.insert(feature, feature.id, function (err, result) {
                    if (err) callback(err);
                    emitter.emit('featureLoaded');
                });
            });
            
        }
    };

module.exports = _.extend(setupFunctions, dbs);