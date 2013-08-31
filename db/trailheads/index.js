var _ = require('underscore'),
    
    dbName = process.env.NODE_ENV === 'testing' ? 'test-trailheads' : 'trailheads';

module.exports = function (connection) {
    function setup(callback) {
        callback = callback || function () {};
        require('../dbSetup')(dbName, require('./designDocs'), connection, callback);    
    };
    
    return _.extend({setup: setup, name: dbName}, connection.use(dbName));
};