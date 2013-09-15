var fs = require('fs'),
    path = require('path'),

    argv = require('optimist')
        .default({
            updatePort: 2999,
            updateStart: '',
            updateStop: '',
            gitUser: 'just',
            gitRepo: 'a',
            travisToken: 'fake',
            serverPort: 3000
        })
        .argv,

    defaultDbConfig = {
        'dbPort': 5984,
        'dbHost': '127.0.0.1',
        'dbProtocol': 'http'
    };

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

    dbConfig: defaultDbConfig,

    devScripts: [
        'bower_components/lodash/dist/lodash.underscore.js',
        'bower_components/backbone/backbone.js',
        'bower_components/jsts/lib/javascript.util.js',
        'bower_components/jsts/lib/jsts.js',
        'bower_components/proj4js/dist/proj4.js',

        'src/js/trailguide.js',
        'src/js/geoUtils.js',
        'src/js/geoUtils/project.js',
        'src/js/geoUtils/geojson2jsts.js',
        'src/js/models.js',
        'src/js/models/segment.js'
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
