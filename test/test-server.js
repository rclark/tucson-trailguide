var vows = require('vows'),
    assert = require('assert'),
    express = require('express'),
    http = require('http'),
    request = require('request'),
    port = 3000;

vows.describe('The HTTP server').addBatch({
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
    'when asked for a non-existant page': {
        topic: function () {
            port++;
            require('../server').test(port);
            request('http://localhost:' + port + '/flaps', this.callback);
        },
        'returns 404': function (err, response, body) {
            assert.equal(response.statusCode, 404);    
        }
    }
}).export(module);