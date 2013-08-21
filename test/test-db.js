var vows = require('vows'),
    assert = require('assert'),
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
    'when asked to setup all the databases': {
        topic: function () {
            var callback = this.callback;
            setTimeout(
                function () { db.setupAll(callback); },
                2000
            );
        },
        'does not fail': function (err, result) {
            assert.isNull(err);    
        }
    }
}).export(module);