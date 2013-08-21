module.exports = function (connection) {
    
    return {
        setup: function (callback) {
            require('./setup')(connection, callback);    
        },
        
        db: connection.use('routes')
    }
};