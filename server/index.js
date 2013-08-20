var express = require('express'),
    path = require('path'),
    config = require('../configuration'),
    routes = require('./routes'),
    app = express();

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '..', 'templates'));
app.use('/static', express.static(path.resolve(__dirname, '..', 'dist')));
if (app.get('env') === 'development') {
    app.use('/not-ours', express.static(path.resolve(__dirname, '..', 'bower_components')));
    app.use('/ours', express.static(path.resolve(__dirname, '..', 'src/js')));
}

app.use(function (req, res, next) {
    res.templateContext = {
        dev: app.get('env') === 'development',
        devScripts: config.devScripts
    };
    next();
});

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
