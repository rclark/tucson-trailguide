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

    jade:
      views:
        options:
          client: true
          namespace: "trailguide.templates"
          processName: (filename) ->
            splitPath = filename.split "/"
            splitName = splitPath[2].split "."
            return splitName[0]
        files: [
          expand: true
          cwd: "templates/views"
          src: ["*.jade"]
          dest: "src/js/templates"
          ext: ".js"
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
      viewTemplates:
        files: ["templates/views/*.jade"]
        tasks: ["jade:views"]

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

  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-jade"
  grunt.loadNpmTasks "grunt-autoprefixer"

  grunt.registerTask "style", ["sass:dev", "autoprefixer:dev"]
  grunt.registerTask "build", [
    "style"
    "cssmin:dist"
    "uglify:dist"
  ]