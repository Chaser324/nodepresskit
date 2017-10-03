const fs = require( 'fs' );
const pretty = require( 'pretty' );

const imgExt = '.{png,jpg,gif,tiff,webp}';
const KB = 1024;
const MB = KB * KB;
const GB = MB * KB;

var site, pkg;

module.exports = function ( grunt ) {
	const bower = 'assets/vendor/bower';
	site = grunt.file.readYAML( '_config.yml' );
	pkg = grunt.file.readJSON( 'package.json' );

	var assembleConfig = createAssemblyConfig( grunt );

	grunt.loadNpmTasks( 'grunt-assemble' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-coffee' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-mkdir' );

	grunt.registerTask(
		'default',
		[ 'clean', 'coffee', 'uglify', 'less', 'copy', 'assemble' ]
	);
	grunt.registerTask(
		'dev',
		[ 'clean', 'coffee', 'uglify', 'less', 'copy', 'assemble', 'connect', 'watch' ]
	);
	grunt.registerTask(
		'init',
		[ 'mkdir' ]
	);

	grunt.option( 'stack', true );

	grunt.initConfig( {
		pkg: pkg,
		vendor: grunt.file.readJSON( '.bowerrc' ).directory,
		site: site,
		clean: [ site.dest ],
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
						`${ bower }/bootstrap/js/transition.js`,
						`${ bower }/bootstrap/js/alert.js`,
						`${ bower }/bootstrap/js/button.js`,
						`${ bower }/bootstrap/js/carousel.js`,
						`${ bower }/bootstrap/js/collapse.js`,
						`${ bower }/bootstrap/js/dropdown.js`,
						`${ bower }/bootstrap/js/modal.js`,
						`${ bower }/bootstrap/js/tooltip.js`,
						`${ bower }/bootstrap/js/popover.js`,
						`${ bower }/bootstrap/js/scrollspy.js`,
						`${ bower }/bootstrap/js/tab.js`,
						`${ bower }/bootstrap/js/affix.js`,
						`${ bower }/eventEmitter/EventEmitter.js`,
						`${ bower }/eventie/eventie.js`,
						`${ bower }/doc-ready/doc-ready.js`,
						`${ bower }/get-style-property/get-style-property.js`,
						`${ bower }/get-size/get-size.js`,
						`${ bower }/jquery-bridget/jquery.bridget.js`,
						`${ bower }/matches-selector/matches-selector.js`,
						`${ bower }/outlayer/item.js`,
						`${ bower }/outlayer/outlayer.js`,
						`${ bower }/masonry/masonry.js`,
						`${ bower }/imagesloaded/imagesloaded.js`,
						`assets/js/*.js`,
						`dist/assets/js/*.js`
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
};

function createStandardOptions() {
	return {
		options: {
			flatten: true,
			production: false,
			assets: site.assets,
			postprocess: pretty,
			pkg: pkg,
			site: site,
			partials: site.includes,
			layoutdir: site.layouts,
			layout: site.layout,
			helpers: site.helpers,
			plugins: site.plugin
		},
		files: {}
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

function expand( pack, path ) {
	var grunt = pack.grunt;
	var opts = pack.opts;

	return grunt.file.expand( opts, path );
}

function createAssemblyConfig( grunt ) {
	var config = {
		company: createStandardOptions(),
		credits: createStandardOptions()
	};

	const root = 'data/';
	const opts = { cwd: root };
	var pack = { grunt, opts };

	var options = config.company.options;
		options.data = 'data/company.yml';
		options.games = [];
		options.logos = expand( pack, `logos/*${ imgExt }` );
		options.logos_zip = expand( pack, 'logos/*.zip' );
		options.images = expand( pack,
			[ `images/*${ imgExt }`, `!images/header${ imgExt }` ]
		);
		options.image_header = expand( pack, `images/header${ imgExt }` );
		options.images_zip = expand( pack, 'images/*.zip' );
		options.images_zip_size = getSize( grunt, root + options.images_zip );
		options.logos_zip_size = getSize( grunt, root + options.logos_zip );

	var indexPath = `${ site.dest }/index.html`;
	var creditsPath = `${ site.dest }/credits.html`;

	config.company.files[ indexPath ] = [ `${ site.templates }/company.hbs` ]
	config.credits.files[ creditsPath ] = [ `${ site.templates }/credits.hbs` ]

	grunt.file.expand( 'data/games/*' ).forEach(
		function ( value ) {
			var game = value.replace( 'data/games/', '' );

			if ( game === 'sample_game' ) return;

			options.games.push( game );
			config[ game ] = gameConfig( grunt, game )
		}
	);

	return config;
}

function gameConfig( grunt, game ) {
	var config = createStandardOptions();

	var root = `data/games/${ game }/`;
	var opts = { cwd: root };
	var pack = { grunt, opts };

	var options = config.options;
		options.data = [ `${ root }game.yml`, 'data/company.yml' ];
		options.logos = expand( pack, `logos/*${ imgExt }` );
		options.logos_zip = expand( pack, 'logos/*.zip' );
		options.images = expand( pack,
			[ `images/*${ imgExt }`, `!images/header${ imgExt }` ]
		);
		options.image_header = expand( pack, `images/header${ imgExt }` );
		options.images_zip = expand( pack, 'images/*.zip' );
		options.images_zip_size = getSize( grunt, root + options.images_zip );
		options.logos_zip_size = getSize( grunt, root + options.logos_zip );

	var destFile = `${ site.dest }/games/${ game }/index.html`;
	config.files[ destFile ] = [ `${ site.templates }/game.hbs` ];

	return config;
}
