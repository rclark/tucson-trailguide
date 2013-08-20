var fs = require('fs'),
    path = require('path');
    
var argv = require('optimist')
    .default({
        updatePort: 2999,
        updateStart: '',
        updateStop: '',
        gitUser: 'just',
        gitRepo: 'a',
        travisToken: 'fake',
        serverPort: 3000
    })
    .argv;

if (path.existsSync('defaults.json')) {
    data = JSON.parse(fs.readFileSync('defaults.json'));
    for (key in data) {
        argv[key] = data[key];    
    }
}
var config = {
    serverConfig: {
        serverPort: argv.serverPort
    },
    updates: {
        port: argv.updatePort,
        start: argv.updateStart,
        stop: argv.updateStop,
        auth: authTag(argv.gitUser, argv.gitRepo, argv.travisToken)
    },
    devScripts: [
        '/their-js/leaflet/dist/leaflet-src.js'
    ]
};

fs.writeFile(
    'configuration.js',
    'module.exports=' + JSON.stringify(config) + ';'
);

// This function can calculate the right authorization hash for updates
function authTag(githubUsername, githubRepo, travisCiToken) {
    var c = require('crypto').createHash('sha256');
    c.update(githubUsername + '/' + githubRepo + travisCiToken);
    return c.digest('hex');
}