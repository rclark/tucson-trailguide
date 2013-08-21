var _ = require('underscore'),
    config = require('../configuration.js').dbConfig,
    connection = require('nano')(config.dbProtocol + '://' + config.dbHost + ':' + config.dbPort),
    dbs = {
        routes: require('./routes')(connection),
        points: require('./points')(connection),
        segments: require('./segments')(connection),
        trailheads: require('./trailheads')(connection)
    };

function setupAll(callback) {
    callback = callback || function () {};
    for (dbName in dbs) { dbs[dbName].setup(); }
    callback(null);
}

module.exports = _.extend({setupAll: setupAll}, dbs);