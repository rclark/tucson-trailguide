var dbName = 'points';

module.exports = function (connection, callback) {
    require('../dbSetup')(dbName, connection, callback);
};