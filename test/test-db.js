var vows = require('vows'),
    assert = require('assert'),
    db = require('../db');

vows.describe('The Database Configurer').addBatch({
    'when asked to setup the routes database': {
        topic: function () {
            db.routes.setup(this.callback);
        },
        'does not fail': function (err, result) {
            assert.isNull(err);
        },
        'returns a database': function (err, result) {
            if (result) {
                assert.isNotNull(result.get);
            } else {
                assert(false, 'result was undefined');
            }
        }
    },
    'creates design documents': {
        topic: function () {
            var callback = this.callback,
                fs = require('fs');
            
            db.routes.setup(function (err, routes) {
                if (err) {
                    callback(err);
                } else {
                    fs.readdir('./db/routes/designDocs', function (err, docNames) {
                        var name = docNames[0].replace('.js.', '');
                        routes.get('_design/' + name, callback);
                    });
                }
            });
        },
        'in the routes database': function (err, doc) {
            assert.isNull(err);
            assert.isNotNull(doc);
        }
    },
    'returns a database': {
        topic: function () {
            var callback = this.callback;
            db.routes.setup(function (err, routes) {
                callback(null, db.routes.db);    
            });
        },
        'when that database has already been set up': function (err, routes) {
            if (routes) {
                assert.isNotNull(routes.get);
            } else {
                assert(false, 'routes was undefined');
            }
        }
    }
}).export(module);