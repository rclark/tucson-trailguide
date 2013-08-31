var db = require('../db'),
    _ = require('underscore');

module.exports = {

    homePage: function (req, res) {
        res.render('home', res.templateContext);
    },


    mapPage: function (req, res) {
        res.render('map', res.templateContext);
    },

    infoPage: function (req, res, next) {
        if (!db.hasOwnProperty(req.params.type)) {
            res.send(404);
            return;
        }

        function displayInfo(err, body, response) {
            if (err) { next(err, req, res); return; }
            _.extend(body, res.templateContext);
            res.render('info/' + req.params.type, body);
        }

        db[req.params.type].get(req.params.id, displayInfo);
    }
};