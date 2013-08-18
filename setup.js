var fs = require("fs"),
    // Default configuration parameters
    defaultServerConfig = {
        "serverPort": 3000
    };

// Eventually I'll accept user-input
var config = {
    serverConfig: defaultServerConfig,
    devScripts: [
        '/dev-static/leaflet/build/build.js'
    ]
};

fs.writeFile(
    "configuration.js", 
    "module.exports=" + JSON.stringify(config) + ";"
);