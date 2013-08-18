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
          "src/css/main-prefixed.css": "src/css/main-unprefixed.css"

    cssmin:
      dist:
        options:
          keepSpecialComments: 0
        files:
          "dist/main.min.css": "src/css/main-prefixed.css"

    watch:
      livereload:
        options:
          livereload: true
        files: [
          "dist/*.css"
        ]
      style:
        files: [
          "src/scss/*.scss"
          "src/scss/**/*.scss"
        ]
        tasks: ["style"]

  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-autoprefixer"

  grunt.registerTask "style", ["sass:dev", "autoprefixer:dev"]
  grunt.registerTask "build", ["style", "cssmin:dist"]
