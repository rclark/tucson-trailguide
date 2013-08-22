var db = require('../db'),
    fs = require('fs'),
    _ = require('underscore'),
    
    testData = {
        points: fs.readFileSync('poi.json'),
        routes: fs.readFileSync('route.json'),
        segments: fs.readFileSync('segment.json'),
        trailheads: fs.readFileSync('th.json')
    };

db.setupAll(function (err, connection) {
    _.keys(testData).forEach(function (dbName) {
        db.loadInto(db[dbName], JSON.parse(testData[dbName]));    
    });
});