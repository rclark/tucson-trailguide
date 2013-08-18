var fs = require("fs"),
    // Default configuration parameters
    defaultServerConfig = {
        "serverPort": 3000
    };

// Eventually I'll accept user-input
var serverConfig = defaultServerConfig;

fs.writeFile(
    "configuration.js", 
    "module.exports={};module.exports.serverConfig=" + JSON.stringify(serverConfig) + ";"
);