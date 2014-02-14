
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
        postprocess: require('pretty')

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
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'assemble'

    grunt.registerTask 'default', [
        'clean', 'copy', 'assemble', 'connect', 'watch'
    ]

