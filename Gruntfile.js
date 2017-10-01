var fs = require( 'fs' );

const imgExt = '.{png,jpg,gif,tiff,webp}';
const KB = 1024;
const MB = KB * KB;
const GB = MB * KB;

module.exports = function ( grunt ) {
	var assembleConfig = createAssemblyConfig( grunt );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		vendor: grunt.file.readJSON( '.bowerrc' ).directory,
		site: grunt.file.readYAML( '_config.yml' ),
		clean: [ '<%= site.dest %>' ],
		copy: {
			main: {
				files: [ {
					src: [ '**/images/*', '**/trailers/*', '**/logos/*' ],
					dest: 'dist',
					cwd: 'data',
					expand: true
				} ]
			}
		},
		less: {
			main: {
				options: { paths: [ 'assets/less' ] },
				files: { 'dist/assets/css/style.min.css': 'assets/less/app.less' }
			}
		},
		uglify: {
			main: {
				options: {
					beautify: true,
					preserveComments: true
				},
				files: {
					'dist/assets/js/scripts.min.js': [
						'assets/vendor/bower/bootstrap/js/transition.js',
						'assets/vendor/bower/bootstrap/js/alert.js',
						'assets/vendor/bower/bootstrap/js/button.js',
						'assets/vendor/bower/bootstrap/js/carousel.js',
						'assets/vendor/bower/bootstrap/js/collapse.js',
						'assets/vendor/bower/bootstrap/js/dropdown.js',
						'assets/vendor/bower/bootstrap/js/modal.js',
						'assets/vendor/bower/bootstrap/js/tooltip.js',
						'assets/vendor/bower/bootstrap/js/popover.js',
						'assets/vendor/bower/bootstrap/js/scrollspy.js',
						'assets/vendor/bower/bootstrap/js/tab.js',
						'assets/vendor/bower/bootstrap/js/affix.js',
						'assets/vendor/bower/eventEmitter/EventEmitter.js',
						'assets/vendor/bower/eventie/eventie.js',
						'assets/vendor/bower/doc-ready/doc-ready.js',
						'assets/vendor/bower/get-style-property/get-style-property.js',
						'assets/vendor/bower/get-size/get-size.js',
						'assets/vendor/bower/jquery-bridget/jquery.bridget.js',
						'assets/vendor/bower/matches-selector/matches-selector.js',
						'assets/vendor/bower/outlayer/item.js',
						'assets/vendor/bower/outlayer/outlayer.js',
						'assets/vendor/bower/masonry/masonry.js',
						'assets/vendor/bower/imagesloaded/imagesloaded.js',
						'assets/js/*.js',
						'dist/assets/js/*.js'
					]
				}
			}
		},
		coffee: {
			main: {
				expand: true,
				cwd: "assets/js/",
				src: [ "**/*.coffee" ],
				ext: ".js",
				dest: "dist/assets/js/"
			}
		},
		connect: {
			server: {
				options: {
					hostname: "localhost",
					port: 8080,
					base: "dist/",
					livereload: true
				}
			}
		},
		mkdir: {
			all: {
				options: {
					create: [
						'data/images',
						'data/logos',
						'data/trailers',
						'data/games/sample_game/images',
						'data/games/sample_game/logos',
						'data/games/sample_game/trailers'
					]
				}
			}
		},
		assemble: assembleConfig,
		watch: {
			options: { livereload: true },
			less: {
				files: [ "assets/css/*", "assets/less/*" ],
				tasks: [ "less" ]
			},
			copy: {
				files: [ "data/images/*", "data/trailers/*", "data/**/images/*", "data/**/trailers/*" ],
				tasks: [ "clean", "coffee", "uglify", "less", "copy", "assemble" ]
			},
			assemble: {
				files: [ "data/*.yml", "data/**/*.yml", 'templates/*', 'templates/**/*' ],
				tasks: [ "clean", "coffee", "uglify", "less", "copy", "assemble" ]
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-coffee' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-mkdir' );
	grunt.loadNpmTasks( 'grunt-assemble' );

	grunt.registerTask(
		'default',
		[ 'clean', 'coffee', 'uglify', 'less', 'copy', 'assemble' ]
	);
	grunt.registerTask(
		'dev',
		[ 'clean', 'coffee', 'uglify', 'less', 'copy', 'assemble', 'connect', 'watch' ]
	);
	return grunt.registerTask(
		'init',
		[ 'mkdir' ]
	);
};

function createStandardOptions() {
	return {
		flatten: true,
		production: false,
		assets: '<%= site.assets %>',
		postprocess: require( 'pretty' ),
		pkg: '<%= pkg %>',
		site: '<%= site %>',
		partials: '<%= site.includes %>',
		layoutdir: '<%= site.layouts %>',
		layout: '<%= site.layout %>',
		helpers: '<%= site.helpers %>',
		plugins: '<%= site.plugins %>'
	};
};

function getSize( grunt, f ) {
	if ( !grunt.file.exists( f ) )
		return;

	var size = fs.statSync( f ).size;

	if ( size < KB )
		return parseInt( size ) + ' B';
	else if ( size < MB )
		return parseInt( size / KB ) + ' KB';
	else if ( size < GB )
		return parseInt( size / MB ) + ' MB';
	else
		return parseInt( size / GB ) + ' GB';
}

function expand( grunt, opts, path ) {
	return grunt.file.expand( opts, path );
}

function createAssemblyConfig( grunt ) {
	const root = 'data/';
	const opts = { cwd: 'data' };

	var options = createStandardOptions();
		options.data = 'data/company.yml';
		options.games = [];
		options.logos = expand( grunt, opts, 'logos/*' + imgExt );
		options.logos_zip = expand( grunt, opts, 'logos/*.zip' );
		options.images = expand( grunt, opts,
			[ 'images/*' + imgExt, '!images/header' + imgExt ]
		);
		options.image_header = expand( grunt, opts, 'images/header' + imgExt );
		options.images_zip = expand( grunt, opts, 'images/*.zip' );
		options.images_zip_size = getSize( grunt, root + options.images_zip );
		options.logos_zip_size = getSize( grunt, root + options.logos_zip );

	var files = {
		'<%= site.dest %>/index.html': [ '<%= site.templates %>/company.hbs' ]
	};

	var credits = { options: createStandardOptions() };
		credits.files = {
			'<%= site.dest %>/credits.html':
				[ '<%= site.templates %>/credits.hbs' ]
		};

	var config = { company: { options, files }, credits };

	grunt.file.expand( 'data/games/*' ).forEach(
		value =>{
			var game = value.replace( 'data/games/', '' );

			options.games.push( game );
			config[ game ] = gameConfig( grunt, game )
		}
	);

	return config;
}

function gameConfig( grunt, game ) {
	var dataFile = `data/games/${ game }/game.yml`;
	var opts = { cwd: `data/games/${ game }` };
	var root = `data/games/${ game }/`;
	var destFile = `<%= site.dest %>/games/${ game }/index.html`;

	var options = createStandardOptions();
		options.data = [ dataFile, 'data/company.yml' ];
		options.logos = expand( grunt, opts, 'logos/*' + imgExt );
		options.logos_zip = expand( grunt, opts, 'logos/*.zip' );
		options.images = expand( grunt, opts,
			[ 'images/*' + imgExt, '!images/header' + imgExt ]
		);
		options.image_header = expand( grunt, opts,
			'images/header' + imgExt
		);
		options.images_zip = expand( grunt, opts, 'images/*.zip' );
		options.images_zip_size = getSize( grunt, root + options.images_zip );
		options.logos_zip_size = getSize( grunt, root + options.logos_zip );

	var files = {};
		files[ destFile ] = [ '<%= site.templates %>/game.hbs' ];

	return { options, files };
}
