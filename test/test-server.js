var vows = require('vows'),
    assert = require('assert'),
    request = require('request'),
    port = 3000;

vows.describe('The Express.js server').addBatch({
    'when asked for the home page': {
        topic: function () {
            port++;
            require('../server').test(port);
            request('http://localhost:' + port + '/', this.callback);
        },
        'returns 200': function (err, response, body) {
            assert.equal(response.statusCode, 200);
        }
    },
    'when asked for the map page': {
        topic: function () {
            port++;
            require('../server').test(port);
            request('http://localhost:' + port + '/map', this.callback);
        },
        'returns 200': function (err, response, body) {
            assert.equal(response.statusCode, 200);
        }
    },
    'when asked for a static file': {
        topic: function () {
            port++;
            require('../server').test(port);
            request('http://localhost:' + port + '/dist/main.css', this.callback);
        },
        'returns a 200': function (err, response, body) {
            assert.equal(response.statusCode, 200);
        }
    },
    'when asked for a non-existant page': {
        topic: function () {
            port++;
            require('../server').test(port);
            request('http://localhost:' + port + '/flaps', this.callback);
        },
        'returns 404': function (err, response, body) {
            assert.equal(response.statusCode, 404);
        }
    },
    'when asked for a development file from bower': {
        topic: function () {
            port++;
            require('../server').test(port);
            request('http://localhost:' + port + '/bower_components/leaflet/build/build.js', this.callback);
        },
        'returns a 200': function (err, response, body) {
            assert.equal(response.statusCode, 200);
        }
    },
    'when asked to proxy a database GET request': {
        topic: function () {
            port++;
            require('../server').test(port);
            request('http://localhost:' + port + '/db/', this.callback);
        },
        'returns a 200': function (err, response, body) {
            assert.equal(response.statusCode, 200);       
        }
    },
    'when asked to proxy the creation of a database': {
        topic: function () {
            port++;
            require('../server').test(port);
            request({
                url: 'http://localhost:' + port + '/db/trail-test',
                method: 'PUT',
                json: true
            }, this.callback);
        },
        'returns a 201': function (err, response, body) {
            assert.equal(response.statusCode, 201);
        },
        'and then delete it': {
            topic: function () {
                port++;
                require('../server').test(port);
                request({
                    url: 'http://localhost:' + port + '/db/trail-test',
                    method: 'DELETE',
                    json: true
                }, this.callback);
            },
            'returns a 200': function (err, response, body) {
                assert.equal(response.statusCode, 200);    
            }
        }
    }
}).export(module);