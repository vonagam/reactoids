// source-maps

import sourceMapSupport from 'source-map-support';

sourceMapSupport.install( { environment: 'node', handleUncaughtExceptions: false } );


// globals

import './globals';


// helpers

import './general';

import './reactoids';
