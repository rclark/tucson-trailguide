var express = require('express'),
    exec = require('child_process').exec,
    config = require('./configuration'),
    app = express(),
    showMessages = true;

app.use(express.bodyParser());

app.post('/update-hook', function (req, res) {
    if (req.header('Authorization') !== config.updates.auth) {
        if (showMessages) process.stderr.write('Update Failed Authorization: ' + req.header('Authorization') + '\n');
        res.send(403);
    } else {
        // If the tests passed
        if (req.body.payload.status_message === 'Passed') {
            if (showMessages) process.stdout.write('---->>>> Updating application\n');
            
            // Stop the server
            if (showMessages) process.stdout.write('>> ' + config.updates.stop + '\n');    
            exec(config.updates.stop, function (err, stdout, stderr) {
                if (err !== null) {
                    if (showMessages) process.stderr.write(stderr);
                    res.send(500);
                } else {
                    
                    // Pull from the repo
                    if (showMessages) process.stdout.write(stdout);
                    if (showMessages) process.stdout.write('>> git pull\n');
                    exec('git pull', function (err, stdout, stderr) {
                        if (err !== null) {
                            if (showMessages) process.stderr.write(stderr);
                            res.send(500);
                        } else {
                            
                            // npm install
                            if (showMessages) process.stdout.write(stdout);
                            if (showMessages) process.stdout.write('>> npm install\n');
                            exec('npm install', function (err, stdout, stderr) {
                                if (err !== null) {
                                    if (showMessages) process.stderr.write(stderr);
                                    res.send(500);
                                } else {
                                    
                                    // Start the server
                                    if (showMessages) process.stdout.write(stdout);
                                    if (showMessages) process.stdout.write('>> ' + config.updates.start + '\n');
                                    exec(config.updates.start, function (err, stdout, stderr) {
                                        if (err !== null) {
                                            if (showMessages) process.stderr.write(stderr);
                                            res.send(500);
                                        } else {
                                            if (showMessages) process.stdout.write(stdout);
                                            if (showMessages) process.stdout.write('---->>>> Completed successfully\n');
                                            res.send(204);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            // Send the "OK", didn't do anything
            res.send(204);
        }
    }
});

module.exports = {
    start: function () {
        app.listen(config.updates.port);
    },
    
    test: function (port) {
        showMessages = false;
        app.listen(port);
    }
};

//module.exports.start();