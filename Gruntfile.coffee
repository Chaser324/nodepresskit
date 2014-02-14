
fs = require 'fs'

module.exports = (grunt) ->
    'use strict'

    # DEFINE COMPANY/GAME ASSEMBLE TARGETS
    #################################################################

    # Helper function to clone base options
    clone = (obj) ->
        if not obj? or typeof obj isnt 'object'
            return obj
        
        newInstance = new obj.constructor()

        for key of obj
            newInstance[key] = clone obj[key]

        return newInstance

    # Get list of games/projects
    games = grunt.file.expand 'data/games/*'
    for i in [0..games.length-1]
        games[i] = games[i].replace 'data/games/', ''

    # Base options for all pages
    assembleBaseOptions =
        flatten: true
        production: false
        assets: '<%= site.assets %>'
        postprocess: require 'pretty'

        pkg: '<%= pkg %>'
        site: '<%= site %>'

        partials: '<%= site.includes %>'
        layoutdir: '<%= site.layouts %>'
        layout: '<%= site.layout %>'

        helpers: '<%= site.helpers %>'
        plugins: '<%= site.plugins %>'

    # Options for company page
    assembleConfig = {company: {}}
    assembleConfig.company.options = clone(assembleBaseOptions)
    assembleConfig.company.options.data = 'data/company.yml'
    assembleConfig.company.options.games = games
    assembleConfig.company.options.images = grunt.file.expand {cwd: 'data'}, 'images/*.{png,jpg,gif,tiff}'
    assembleConfig.company.options.images_zip = grunt.file.expand {cwd: 'data'}, 'images/*.zip'
    if grunt.file.exists 'data/' + assembleConfig.company.options.images_zip
        size = fs.statSync('data/' + assembleConfig.company.options.images_zip).size
        if size > 1024 and size < 1048576
            size = size / 1024
            size = parseInt(size) + 'KB'
        else if size >= 1048576
            size = (size / 1024) / 1024
            size = parseInt(size) + 'MB'
        assembleConfig.company.options.images_zip_size = size
    assembleConfig.company.files = '<%= site.dest %>/index.html': ['<%= site.templates %>/company.hbs']

    # Options for game pages
    for game in games
        destFile = '<%= site.dest %>/games/' + game + '/index.html'
        dataFile = 'data/games/' + game + '/game.yml'

        assembleConfig[game] = {}
        assembleConfig[game].options = clone(assembleBaseOptions)
        assembleConfig[game].options.data = [dataFile, 'data/company.yml']
        assembleConfig[game].files = {}
        assembleConfig[game].files[destFile] = ['<%= site.templates %>/game.hbs']

    
    # GRUNT CONFIG
    #################################################################

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        vendor: grunt.file.readJSON('.bowerrc').directory
        site: grunt.file.readYAML '_config.yml'

        clean: ['<%= site.dest %>']

        copy:
            main:
                files: [
                    {
                        src: ['**/images/*','**/trailers/*']
                        dest: 'dist'
                        cwd: 'data'
                        expand: true
                    }
                ]

        uglify:
            main:
                options:
                    beautify: true;
                    preserveComments: true;
                files: 
                    'dist/assets/js/scripts.min.js': [
                        'assets/vendor/bower/bootstrap/js/transition.js'
                        'assets/vendor/bower/bootstrap/js/alert.js'
                        'assets/vendor/bower/bootstrap/js/button.js'
                        'assets/vendor/bower/bootstrap/js/carousel.js'
                        'assets/vendor/bower/bootstrap/js/collapse.js'
                        'assets/vendor/bower/bootstrap/js/dropdown.js'
                        'assets/vendor/bower/bootstrap/js/modal.js'
                        'assets/vendor/bower/bootstrap/js/tooltip.js'
                        'assets/vendor/bower/bootstrap/js/popover.js'
                        'assets/vendor/bower/bootstrap/js/scrollspy.js'
                        'assets/vendor/bower/bootstrap/js/tab.js'
                        'assets/vendor/bower/bootstrap/js/affix.js'

                        'assets/vendor/bower/eventEmitter/EventEmitter.js'
                        'assets/vendor/bower/eventie/eventie.js'
                        'assets/vendor/bower/doc-ready/doc-ready.js'
                        'assets/vendor/bower/get-style-property/get-style-property.js'
                        'assets/vendor/bower/get-size/get-size.js'
                        'assets/vendor/bower/jquery-bridget/jquery.bridget.js'
                        'assets/vendor/bower/matches-selector/matches-selector.js'
                        'assets/vendor/bower/outlayer/item.js'
                        'assets/vendor/bower/outlayer/outlayer.js'
                        'assets/vendor/bower/masonry/masonry.js'

                        'assets/vendor/bower/imagesloaded/imagesloaded.js'
                        
                        'assets/js/*.js'
                        'dist/assets/js/*.js'
                    ]

        coffee:
            main:
                expand: true,
                cwd: "assets/js/",
                src: ["**/*.coffee"],
                ext: ".js",
                dest: "dist/assets/js/"

        connect:
            server:
                options:
                    hostname: "localhost"
                    port: 8080
                    base: "dist/"
                    livereload: true

        assemble: assembleConfig

        watch:
            options:
                livereload: true
            copy:
                files: ["data/images/*", "data/trailers/*", "data/**/images/*", "data/**/trailers/*"]
                tasks: ["clean", "copy", "assemble"]
            assemble:
                files: ["data/*.yml", "data/**/*.yml"]
                tasks: ["clean", "copy", "assemble"]

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks "grunt-contrib-connect"
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'assemble'

    grunt.registerTask 'default', [
        'clean', 'coffee', 'uglify', 'copy', 'assemble'
    ]

