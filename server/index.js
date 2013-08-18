var express = require('express'),
    path = require('path'),
    config = require('../configuration'),
    routes = require('./routes'),
    app = express();

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '..', 'templates'));
app.use('/static', express.static(__dirname, '..', 'dist'));

app.get('/', routes.homePage);

app.get('/map', routes.mapPage);

module.exports = {
    start: function () {
        app.listen(config.serverConfig.serverPort);
    },
    
    test: function (port) {
        app.listen(port);
    },
    
    stop: function () {
        app.close();
    }   
};
