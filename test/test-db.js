var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    _ = require('underscore'),
    request = require('request'),
    db = require('../db'),
    port = 4000;

function makeRequest(path, callback) {
    port++;
    require('../server').test(port);
    request('http://localhost:' + port + path, callback);
}

vows.describe('The Database Module').addBatch({

    'CouchDB': {
        topic: function () {
            db.purge(this.callback);
        },

        'after a purge': {
            topic: function (err, connection) {
                connection.db.list(this.callback);
            },
            'is empty': function (err, dbNames) {
                if (err) { assert.isNull(err); }
                else {
                    assert.equal(_.intersection(dbNames, ['test-routes', 'test-segments', 'test-points', 'test-trailheads']).length, 0);
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
                        assert.equal(_.intersection(dbNames, ['test-routes', 'test-segments', 'test-points', 'test-trailheads']).length, 4);
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
                'and then loading routes,': {
                    topic: function (connection) {
                        var callback = this.callback;

                        fs.readFile('./test-data/route.json', function (err, content) {
                            db.loadInto(db.routes, JSON.parse(content), callback);
                        });
                    },
                    'ends up with': {
                        topic: function (routes) {
                            routes.list(this.callback);
                        },
                        'the right number of records': function (err, result) {
                            var docs = _.filter(result.rows, function (row) {
                                return row.id.indexOf('_design') === -1;
                            });
                            assert.equal(docs.length, 3);
                        }
                    }/*,
                    'a single route\'s info': {
                        topic: function (routes) {
                            makeRequest('/routes/route-1', this.callback);
                        },
                        'can be accessed as html': function (err, result) {
                            assert.isNull(err);
                        }
                    }*/
                }/*,
                'and then loading segments,': {
                    topic: function (connection) {
                        var callback = this.callback;

                        fs.readFile('./test-data/segment.json', function (err, content) {
                            db.loadInto(db.segments, JSON.parse(content), callback);
                        });
                    },
                    'ends up with': {
                        topic: function (segments) {
                            segments.list(this.callback)
                        },
                        'the right number of records': function (err, result) {
                            var docs = _.filter(result.rows, function (row) {
                                return row.id.indexOf('_design') === -1;
                            });
                            assert.equal(docs.length, 5);
                        }
                    },
                    'a single segment\'s info': {
                        topic: function (segments) {
                            makeRequest('/segments/segment-1', this.callback);
                        },
                        'can be accessed as html': function (err, result) {
                            assert.isNull(err);
                        }
                    }
                },
                'and then loading points,': {
                    topic: function (connection) {
                        var callback = this.callback;

                        fs.readFile('./test-data/poi.json', function (err, content) {
                            db.loadInto(db.points, JSON.parse(content), callback);
                        });
                    },
                    'ends up with': {
                        topic: function (points) {
                            points.list(this.callback)
                        },
                        'the right number of records': function (err, result) {
                            var docs = _.filter(result.rows, function (row) {
                                return row.id.indexOf('_design') === -1;
                            });
                            assert.equal(docs.length, 3);
                        }
                    },
                    'a single point\'s info': {
                        topic: function (points) {
                            makeRequest('/points/point-1', this.callback);
                        },
                        'can be accessed as html': function (err, result) {
                            assert.isNull(err);
                        }
                    }
                },
                'and then loading trailheads,': {
                    topic: function (connection) {
                        var callback = this.callback;

                        fs.readFile('./test-data/th.json', function (err, content) {
                            db.loadInto(db.trailheads, JSON.parse(content), callback);
                        });
                    },
                    'ends up with': {
                        topic: function (trailheads) {
                            trailheads.list(this.callback)
                        },
                        'the right number of records': function (err, result) {
                            var docs = _.filter(result.rows, function (row) {
                                return row.id.indexOf('_design') === -1;
                            });
                            assert.equal(docs.length, 7);
                        }
                    },
                    'a single trailhead\'s info': {
                        topic: function (trailheads) {
                            makeRequest('/trailheads/trailhead-1', this.callback);
                        },
                        'can be accessed as html': function (err, result) {
                            assert.isNull(err);
                        }
                    }
                }*/
            }
        }
    }
}).export(module);