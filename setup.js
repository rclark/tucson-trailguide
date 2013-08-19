var fs = require('fs'),
    // Default configuration parameters
    defaultServerConfig = {
        serverPort: 3000
    }
    defaultUpdates = {
        port: 2999,
        stop: '',
        start: '',
        auth: '',
        enabled: true
    };

// Eventually I'll accept user-input
var config = {
    serverConfig: defaultServerConfig,
    updates: defaultUpdates,
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