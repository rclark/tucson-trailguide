var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    _ = require('underscore'),
    db = require('../db');

vows.describe('The Database Configurer').addBatch({
    
    'when asked to setup the routes database': {
        topic: function () {
            var callback = this.callback;
            db.routes.setup(function (err, routes) {
                if (err) {
                    callback(err);
                } else  {
                    db.routes.get('_design/example', function (err, response) {
                        callback(err, routes);
                    });    
                }
            });
        },
        'does not fail': function (err, result) {
            assert.isNull(err);
        },
        'returns a database': function (err, routes) {
            if (routes) {
                assert.isNotNull(routes.get);
            } else {
                assert(false, 'routes was undefined');
            }
        },
        'writes design docs': function (err, routes) {
            assert.isNull(err);
        }
    },
    
    'when loading data into the routes database': {
        topic: function () {
            var callback = this.callback;
            
            fs.readFile('./test-data/route.json', function (err, content) {
                db.loadInto(db.routes, JSON.parse(content), function (err, routes) {
                    if (err) {
                        callback(err);
                    } else {
                        routes.list(callback);
                    }
                });
            });
        },
        'the expected records are loaded': function (err, result) {
            assert.isNull(err);
            assert.equal(result.rows.length, 3);
        }
    },
    
    'when asked to purge all the databases': {
        topic: function () {
            var callback = this.callback;
            
            function checkForDbs(err, connection) {
                if (err) {
                    callback(err);
                } else {
                    connection.db.list(callback);
                }
            }
            
            setTimeout(
                function () { db.purge(checkForDbs); },
                3000
            );
        },
        'they all go away': function (err, result) {
            assert.isNull(err);
            assert.equal(_.intersection(result, ['routes','segments','points','trailheads']).length, 0);
        }
    },
    
    'when asked to setup all the databases': {
        topic: function () {
            var callback = this.callback;
            setTimeout(
                function () { db.setupAll(callback); },
                5000
            );
        },
        'does not fail': function (err, result) {
            assert.isNull(err);    
        }
    },
});//.export(module);