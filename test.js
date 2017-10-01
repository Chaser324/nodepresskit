const fs = require( 'fs' );
const path = require( 'path' );

const dist = '/dist/'

const success = [];
const fails = [];

test( 'index.html' );
test( 'credits.html' );
test( 'assets/css/style.min.css' );
test( 'assets/js/main.js' );
test( 'assets/js/scripts.min.js' );

log();

function test( f ) {
	var dir = path.join( __dirname, dist, f );

	if ( fs.existsSync( dir ) )
		success.push( f );

	else
		fails.push( f );
}

function log() {
	if ( success.length !== 0 ) {
		console.log(
			'Successes:\n\n    '
			+ success.join( '\n    ' )
			+ '\n'
		);
	}
	if ( fails.length !== 0 ) {
		console.log(
			'Fails:\n\n    '
			+ fails.join( '\n    ' )
			+ '\n'
		);
		throw 'Tests failed';
	}
}
