var postBody = {
  "payload": {
    "id": 1,
    "number": 1,
    "status": null,
    "started_at": null,
    "finished_at": null,
    "status_message": "Passed",
    "commit": "62aae5f70ceee39123ef",
    "branch": "master",
    "message": "the commit message",
    "compare_url": "https://github.com/svenfuchs/minimal/compare/master...develop",
    "committed_at": "2011-11-11T11: 11: 11Z",
    "committer_name": "Sven Fuchs",
    "committer_email": "svenfuchs@artweb-design.de",
    "author_name": "Sven Fuchs",
    "author_email": "svenfuchs@artweb-design.de",
    "repository": {
      "id": 1,
      "name": "minimal",
      "owner_name": "svenfuchs",
      "url": "http://github.com/svenfuchs/minimal"
     },
    "matrix": [
      {
        "id": 2,
        "repository_id": 1,
        "number": "1.1",
        "state": "created",
        "started_at": null,
        "finished_at": null,
        "config": {
          "notifications": {
            "webhooks": ["http://evome.fr/notifications", "http://example.com/"]
          }
        },
        "status": null,
        "log": "",
        "result": null,
        "parent_id": 1,
        "commit": "62aae5f70ceee39123ef",
        "branch": "master",
        "message": "the commit message",
        "committed_at": "2011-11-11T11: 11: 11Z",
        "committer_name": "Sven Fuchs",
        "committer_email": "svenfuchs@artweb-design.de",
        "author_name": "Sven Fuchs",
        "author_email": "svenfuchs@artweb-design.de",
        "compare_url": "https://github.com/svenfuchs/minimal/compare/master...develop"
      }
    ]
  }
};

var vows = require('vows'),
    assert = require('assert'),
    request = require('request'),
    config = require('../configuration'),
    port = 2999;

function update (auth) {
    port--;
    require('../updates').test(port);
    request({
        url: 'http://localhost:' + port + '/update-hook',
        json: postBody,
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'Authorization': auth ? config.updates.auth : 'invalid'
        }
    }, this.callback);
}

vows.describe('The update server').addBatch({
    'when it recieves a post without proper authentication': {
        topic: function () {
            update.call(this, false);    
        },
        'returns a 403': function (err, response, body) {        
            assert.equal(response.statusCode, 403);    
        }
    },
    'when it receives a post with proper authentication': {
        topic: function () {
            update.call(this, true);
        },
        'returns a 204': function (err, response, body) {            
            assert.equal(response.statusCode, 204);    
        }
    }
}).export(module);