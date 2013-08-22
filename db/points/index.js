var _ = require('underscore');

module.exports = function (connection) {
    function setup(callback) {
        callback = callback || function () {};
        require('./setup')(connection, callback);    
    };
    
    return _.extend({setup: setup}, connection.use('points'));
};