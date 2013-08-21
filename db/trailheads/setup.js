var dbName = 'trailheads';

module.exports = function (connection, callback) {
    require('../dbSetup')(dbName, connection, callback);
};