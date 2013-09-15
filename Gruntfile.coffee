config = require "./configuration.js"

module.exports = (grunt) ->
  grunt.initConfig

    pkg: grunt.file.readJSON "package.json"

    sass:
      dev:
        options:
          lineNumbers: true
        files:
          "dist/main.css": "src/scss/main.scss"

    autoprefixer:
      dev:
        files:
          "dist/main.css": "dist/main.css"

    cssmin:
      dist:
        options:
          keepSpecialComments: 0
        files:
          "dist/main.min.css": [
            "bower_components/leaflet/dist/leaflet.css",
            "dist/main.css"
          ]

    watch:
      livereload:
        options:
          livereload: true
        files: [
          "dist/*.css",
          "templates/*.jade",
          "templates/**/*.jade"
          "src/js/*.js"
          "src/js/**/*.js"
        ]
      style:
        files: [
          "src/scss/*.scss"
          "src/scss/**/*.scss"
        ]
        tasks: ["style"]

    exec:
      buildLeaflet:
        command: "cd bower_components/leaflet; npm install; node ../../node_modules/jake/bin/cli.js"

    uglify:
      dist:
        files:
          "dist/js-built.min.js": config.devScripts
      map:
        files:
          "dist/map-built.min.js": ["src/js/map.js"]

    bgShell:
      _defaults:
        bg: true
      couch:
        cmd: "couchdb"
      runDev:
        cmd: "npm run-script dev"
      gruntWatch:
        cmd: "grunt watch"
        bg: false

  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-autoprefixer"
  grunt.loadNpmTasks "grunt-exec"

  grunt.registerTask "style", ["sass:dev", "autoprefixer:dev"]
  grunt.registerTask "build", [
    "style"
    "exec:buildLeaflet"
    "cssmin:dist"
    "uglify:dist"
  ]