var dbName = 'segments';

module.exports = function (connection, callback) {
    require('../dbSetup')(dbName, connection, callback);
};