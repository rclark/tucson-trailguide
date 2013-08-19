var express = require('express'),
    config = require('./configuration'),
    app = express(),
    server;

app.use(express.bodyParser());

app.post('/update', function (req, res) {
    if (req.header('Authorization') !== config.updates.auth) {
        res.send(403);
    } else {
        res.send(200);    
    }
});

module.exports = {
    start: function () {
        app.listen(config.serverConfig.updatePort);
    },
    
    test: function (port) {
        app.listen(port);
    }
};