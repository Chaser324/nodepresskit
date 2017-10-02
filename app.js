
var express = require( 'express' );
var path = require( 'path' );

var env = process.env.NODE_ENV || 'development';

var app = express();
	app.locals.ENV = env;
	app.locals.ENV_DEVELOPMENT = env == 'development';
	app.set( 'port', process.env.PORT || 3000 );
	app.use( express.static( path.join( __dirname, 'dist' ) ) );

/// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
	var err = new Error( 'Not Found' );
		err.status = 404;

	next( err );
} );

/// error handlers
app.use( function( err, req, res, next ) {
	var status = err.status || 500;
	var message = err.message || 'Internal error';

	res.status( status ).send( `Error: ${ status } - ${ message }` );
} );

var server = app.listen(
	app.get( 'port' ),
	() => console.log( `Listening on port ${ server.address().port }` )
);
