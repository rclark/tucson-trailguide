# Building

To the extent possible, everything is bundled into a single `npm install` command. There is one exception to this so far:

    gem install sass
    
After that, the build procedure works through NPM. It involves:

1. Running `node setup.js`. This builds a configuration file for your server. This includes things like port and host information for the Express.js server, a list of scripts that need to be served in development environments, and database connection details.
2. Running `bower install`. Bower is used to manage front-end dependencies. Its work is defined by `bower.json`.
3. Running `grunt build`. Grunt is used to concatenate and minify JS and to compile SCSS. `Gruntfile.coffee` describes these tasks.

Those three commands occur every time you `npm install` the program.