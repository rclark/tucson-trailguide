var db = require('../db'),
    _ = require('underscore');

module.exports = {
    
    homePage: function (req, res) {
        res.render('home', res.templateContext);
    },
    
    
    mapPage: function (req, res) {
        res.render('map', res.templateContext);
    },
    
    infoPage: function (req, res) {
        if (!db.hasOwnProperty(req.params.type)) {
            res.send(404);
            return;
        }
        
        function displayInfo(err, body, response) {
            res.send(body);
        }
        
        db[req.params.type].get(req.params.id, displayInfo);   
    }
};