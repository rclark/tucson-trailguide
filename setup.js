var fs = require("fs"),
    // Default configuration parameters
    defaultServerConfig = {
        "serverPort": 3000
    };

// Eventually I'll accept user-input
var config = {
    serverConfig: defaultServerConfig,
    devScripts: [
        '/not-ours/leaflet/dist/leaflet-src.js'
    ]
};

fs.writeFile(
    "configuration.js",
    "module.exports=" + JSON.stringify(config) + ";"
);