var expect = require( "chai" ).expect;
var fs = require( "fs" );
var html5Lint = require( "html5-lint" );
var assert = require( "assert" );



describe( "Check for index.html", function ( done ) {

	it( "file should be present at /public/index.html", function ( done ) {
		fs.readFile( "public/index.html", "utf8", function ( err, html ) {
			if ( err )
				done( err );
			done();
		} );
	} );

} );