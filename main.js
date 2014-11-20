/*jshint node:true*/
/**
 *
 * Logger by Ståle Raknes
 *
 * Dependencies:
 *
 * morgan Copyright(c) 2010 Sencha Inc., (c) 2011 TJ Holowaychuk, (c) 2014 Jonathan Ong,
 * (c) 2014 Douglas Christopher Wilson MIT Licensed
 *
 * dateFormat by felixge, is to be found here: https://github.com/felixge/node-dateformat
 *
 */

"use strict";

var morgan = require( "morgan" );
var dateFormater = require( "dateformat" );
var uap = require( 'ua-parser' );
var colors = require( "colors" );

morgan.token( 'date', function ( req, res, format ) {
    format = format || 'HH:MM:ss.l';
    return dateFormater( format );
} );

morgan.token( 'os', function ( req ) {
    return uap.parseOS( req.headers['user-agent'] ).toString();
} );

morgan.token( 'browser', function ( req ) {
    return uap.parseUA( req.headers['user-agent'] ).toString();
} );

morgan.token( 'device', function ( req ) {
    return uap.parseDevice( req.headers['user-agent'] ).toString();
} );

morgan.token( 'status', function ( req, res ) {
    var status = res.statusCode;
    var color = "green";

    if ( status >= 404 ) {
        color = "red";
    }
    else if ( status >= 400 ) {
        color = "yellow";
    }
    return res.statusCode ? colors[color]( res.statusCode ) : null;

} );

morgan.format( "dev", [
    '->'.yellow,
    ':date[HH:MM:ss.l]'.gray,
    ':method >',
    ':status >',
    ':url'.white,
    '-',
    ':browser > :device > :os >',
    ':remote-addr'.gray
].join( " " ) );

module.exports = morgan;