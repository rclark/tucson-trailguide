var vows = require('vows'),
    assert = require('assert'),
    db = require('../db');

vows.describe('The Database Configurer').addBatch({
    /*'creates design documents': {
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
    },*/
    'when asked to setup the routes database': {
        topic: function () {
            var callback = this.callback;
            db.routes.setup(function (err, routes) {
                if (err) {
                    callback(err);
                } else  {
                    db.routes.db.get('_design/example', function (err, response) {
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
    }
}).export(module);