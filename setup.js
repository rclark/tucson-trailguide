var fs = require("fs"),
    // Default configuration parameters
    defaultServerConfig = {
        "serverPort": 3000
    },
    defaultDbConfig = {
        'dbPort': 5984,
        'dbHost': '127.0.0.1',
        'dbProtocol': 'http'
    };

// Eventually I'll accept user-input
var config = {
    serverConfig: defaultServerConfig,
    dbConfig: defaultDbConfig,
    devScripts: [
        '/not-ours/leaflet/dist/leaflet-src.js'
    ]
};

fs.writeFile(
    "configuration.js",
    "module.exports=" + JSON.stringify(config) + ";"
);