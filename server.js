/*jslint node:true*/

"use strict";

var cluster = require( "cluster" );
var os = require( "os" );
var urlencode = require( "urlencode" );
var https = require( "https" );


//todo: split out functionality into master.js and worker.js

function createWorker() {
	var worker = cluster.fork();
	worker.on( "message", function ( message ) {
		console.log( message.from + ": " + message.type + " " + JSON.stringify( message.data ) );
	} );
	return worker;
}

if ( cluster.isMaster ) { // Code to run if we"re in the master process

	// Count the machine"s CPUs

	var cpuCount = os.cpus().length;
	var hostname = os.hostname();
	console.log( "platform: " + process.platform );
	console.log( process.versions );

	// Create a worker for each CPU
	var workers = [];

	console.log( "master@" + hostname + "[" + process.pid + "] started. launching " + cpuCount + " workers..." );
	for ( var i = 0; i < cpuCount; i += 1 ) {
		workers.push( createWorker() );
	}



	cluster.on( "online", function ( worker ) {
		console.log( hostname + "(" + worker.id + ")[" + worker.process.pid + "] has started" );
	} );

	cluster.on( "exit", function ( worker, code, signal ) {
		console.log( hostname + "(" + worker.id + ")[" + worker.process.pid + "] died [code:" + code + " signal:" + signal + "]" );
	} );
	setTimeout( function () {
		console.log( "sending pings.." );
		for ( var wid in cluster.workers ) {
			cluster.workers[ wid ].send( {
				type: "ping",
				from: "master",
				data: {
					number: Math.floor( Math.random() * 50 )
				}
			} );
		}

	}, 5000 );

	//
	// 	once workers are up then
	// 	create endpoint at /w some sweet sweet dataz on some nonstandard port
	//
	//
} else { // Code to run if we"re in a worker process
	process.on( "message", function ( message ) {

		process.send( {
			type: "RECIEVED " + message.type,
			from: os.hostname() + "[" + process.pid + "]",
			data: {}
		} );

	} );

	var compression = require( "compression" );
	var mongoose = require( 'mongoose' );
	var express = require( 'express' );
	var passport = require( 'passport' );
	var Strategy = require( 'passport-facebook' ).Strategy;
	var app = express();
	app.use( compression() ); // gotta save those bits
	// Configure the Facebook strategy for use by Passport.
	//
	// OAuth 2.0-based strategies require a `verify` function which receives the
	// credential (`accessToken`) for accessing the Facebook API on the user's
	// behalf, along with the user's profile.  The function must invoke `cb`
	// with a user object, which will be set at `req.user` in route handlers after
	// authentication.
	passport.use( new Strategy( {
			//ideally i'd secure this in a .json file that the script includes
			// which is included in the .gitignore and not commited to the git repository..
			// .... but whatever, have fun
			clientID: '466665887057641',
			clientSecret: '7d240ea6eda3aa520d83f7c47cc98006',
			callbackURL: 'http://swarae.homuncul.us/login/facebook/return'
		},
		function ( accessToken, refreshToken, profile, cb ) {
			// In this example, the user's Facebook profile is supplied as the user
			// record.  In a production-quality application, the Facebook profile should
			// be associated with a user record in the application's database, which
			// allows for account linking and authentication with other identity
			// providers.
			return cb( null, profile );
		} ) );


	// Configure Passport authenticated session persistence.
	//
	// In order to restore authentication state across HTTP requests, Passport needs
	// to serialize users into and deserialize users out of the session.  In a
	// production-quality application, this would typically be as simple as
	// supplying the user ID when serializing, and querying the user record by ID
	// from the database when deserializing.  However, due to the fact that this
	// example does not have a database, the complete Facebook profile is serialized
	// and deserialized.
	passport.serializeUser( function ( user, cb ) {
		cb( null, user );
	} );

	passport.deserializeUser( function ( obj, cb ) {
		cb( null, obj );
	} );



	// Configure view engine to render pug templates.
	app.set( 'views', __dirname + '/views' );
	app.set( 'view engine', 'pug' );

	// Use application-level middleware for common functionality, including
	// logging, parsing, and session handling.
	app.use( require( 'morgan' )( 'combined' ) );
	app.use( require( 'cookie-parser' )() );
	app.use( require( 'body-parser' ).urlencoded( { extended: true } ) );
	// the secret should also be something other than the default, but once again...
	app.use( require( 'express-session' )( { secret: 'keyboard cat', resave: true, saveUninitialized: true } ) );

	// Initialize Passport and restore authentication state, if any, from the
	// session.
	app.use( passport.initialize() );
	app.use( passport.session() );


	// Define routes.
	app.get( '/',
		function ( req, res ) {
			res.render( 'home', { user: req.user } );
		} );

	app.get( '/login',
		function ( req, res ) {
			res.render( 'login' );
		} );

	app.get( '/login/facebook',
		passport.authenticate( 'facebook' ) );

	app.get( '/login/facebook/return',
		passport.authenticate( 'facebook', { failureRedirect: '/login' } ),
		function ( req, res ) {
			res.redirect( '/' );
		} );

	app.get( '/profile',
		require( 'connect-ensure-login' ).ensureLoggedIn(),
		function ( req, res ) {
			//res.render( 'profile', { user: req.user, json: JSON.stringify( req.user ) } );
			res.send( req.user );
		} );

	app.get( '/logout', function ( req, res ) {
		req.logOut();
		res.redirect( "/" );
	} );

	app.use( express.static( "public" ) );

	var server = app.listen( 8081, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log( os.hostname() + "(" + cluster.worker.id + ")[" + process.pid + "] listening on %s:%s", host, port );
	} );


}