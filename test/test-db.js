var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    _ = require('underscore'),
    db = require('../db');

vows.describe('The Database Module').addBatch({
    
    'CouchDB': {
        topic: function () {
            db.purge(this.callback);
        },
        
        'after a purge': {
            topic: function (connection) {
                connection.db.list(this.callback);
            },
            'is empty': function (err, dbNames) {
                if (err) { assert.isNull(err); }
                else {
                    assert.equal(_.intersection(dbNames, ['routes', 'segments', 'points', 'trailheads']).length, 0);
                }
            },
            'followed by setupAll,': {
                topic: function (dbNames) {
                    db.setupAll(this.callback);    
                },
                'contains': {
                    topic: function (connection) {
                        connection.db.list(this.callback);    
                    },
                    'all the right databases': function (err, dbNames) {
                        assert.equal(_.intersection(dbNames, ['routes', 'segments', 'points', 'trailheads']).length, 4);    
                    }
                },
                'leaves the routes database': {
                    topic: function (dbNames) {
                        db.routes.get('_design/example', this.callback);
                    },
                    'with an expected design doc': function (err, doc) {
                        assert.isNull(err);
                    }
                },
                'and then trying to load data into routes,': {
                    topic: function (connection) {
                        var callback = this.callback;
                        
                        fs.readFile('./test-data/route.json', function (err, content) {
                            db.loadInto(db.routes, JSON.parse(content), callback);
                        });
                    },
                    'ends up with': {
                        topic: function (routes) {
                            routes.list(this.callback)
                        },
                        'the right number of records': function (err, result) {
                            var docs = _.filter(result.rows, function (row) {
                                return row.id.indexOf('_design') === -1;
                            });
                            assert.equal(docs.length, 3);
                        }
                    }
                }
            }
        }
    }
}).export(module);