
module.exports = (grunt) ->
    'use strict'

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        vendor: grunt.file.readJSON('.bowerrc').directory
        site: grunt.file.readYAML '_config.yml'

        clean: ['<%= site.dest %>']

        connect:
            server:
                options:
                    hostname: "localhost"
                    port: 8080
                    base: "dist/"
                    livereload: true

        assemble:
            options:
                flatten: true
                production: false
                assets: '<%= site.assets %>'
                postprocess: require('pretty')

                # Metadata
                pkg: '<%= pkg %>'
                site: '<%= site %>'
                data: ['<%= site.data %>']

                # Templates
                partials: '<%= site.includes %>'
                layoutdir: '<%= site.layouts %>'
                layout: '<%= site.layout %>'

                # Extensions
                helpers: '<%= site.helpers %>'
                plugins: '<%= site.plugins %>'
            main:
                files:
                    '<%= site.dest %>/index.html': ['<%= site.templates %>/index.hbs']

        watch:
            options:
                livereload: true
            # coffee:
            #     files: ["site/js/*.coffee"]
            #     tasks: ["coffee"]
            # copy:
            #     files: ["site/img/**", "site/*"]
            #     tasks: ["copy"]
            # less:
            #     files: ["site/less/*.less"]
            #     tasks: ["less"]

        grunt.loadNpmTasks 'grunt-contrib-clean'
        grunt.loadNpmTasks "grunt-contrib-connect"
        grunt.loadNpmTasks 'grunt-contrib-copy'
        grunt.loadNpmTasks 'grunt-contrib-watch'
        grunt.loadNpmTasks 'assemble'

        grunt.registerTask 'default', [
            'clean', 'assemble'
        ]