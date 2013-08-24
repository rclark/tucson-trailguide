var express = require('express'),
    path = require('path'),
    config = require('../configuration'),
    routes = require('./routes'),
    app = express();

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '..', 'templates'));
app.set('isDevelopment', app.get('env') !== 'production');
app.use('/dist', express.static(path.resolve(__dirname, '..', 'dist')));
if (app.get('isDevelopment')) {
    app.use('/bower_components', express.static(path.resolve(__dirname, '..', 'bower_components')));
    app.use('/src', express.static(path.resolve(__dirname, '..', 'src')));
}

app.use(function (req, res, next) {
    res.templateContext = {
        dev: app.get('isDevelopment'),
        devScripts: config.devScripts
    };
    next();
});

app.get('/js/main.js', function (req, res) {
    res.setHeader('Content-type', 'text/javascript');
    var js = 'var trailguide = {};';
    js += 'trailguide.dbUrl = "';
    js += config.dbConfig.dbProtocol + '://' + config.dbConfig.dbHost + ':' + config.dbConfig.dbPort;
    js += '";';
    res.send(js);
});

app.get('/', routes.homePage);

app.get('/map', routes.mapPage);

module.exports = {
    start: function () {
        app.listen(config.serverConfig.serverPort);
    },

    test: function (port) {
        app.listen(port);
    }
};
