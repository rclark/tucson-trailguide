module.exports = (grunt) ->
  grunt.initConfig

    pkg: grunt.file.readJSON "package.json"

    sass:
      dev:
        options:
          lineNumbers: true
        files:
          "src/css/main-unprefixed.css": "src/scss/main.scss"

    autoprefixer:
      dev:
        files:
          "dist/main.css": "src/css/main-unprefixed.css"

    cssmin:
      dist:
        options:
          keepSpecialComments: 0
        files:
          "dist/main.min.css": "dist/main.css"

    watch:
      livereload:
        options:
          livereload: true
        files: [
          "dist/*.css",
          "templates/*.jade",
          "templates/**/*.jade"
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

  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-autoprefixer"
  grunt.loadNpmTasks "grunt-exec"

  grunt.registerTask "style", ["sass:dev", "autoprefixer:dev"]
  grunt.registerTask "build", ["style", "exec:buildLeaflet", "cssmin:dist"]
