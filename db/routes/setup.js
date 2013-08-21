var dbName = 'routes';

module.exports = function (connection, callback) {
    require('../dbSetup')(dbName, connection, callback);
};