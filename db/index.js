var config = require('../configuration.js').dbConfig,
    connection = require('nano')(config.dbProtocol + '://' + config.dbHost + ':' + config.dbPort);

module.exports = {
    routes: require('./routes')(connection)    
};