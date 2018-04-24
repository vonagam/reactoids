'use strict';

const genDefaultConfig = require( '@storybook/react/dist/server/config/defaults/webpack.config.js' );

const webpack = require( 'webpack' );

const _ = require( 'lodash' );


module.exports = function( baseConfig, env ) {

  let config = genDefaultConfig( baseConfig, env );

  config.plugins.push( new webpack.EnvironmentPlugin( [ 'REACTOIDS_PACKAGE' ] ) );


  let jsRule = config.module.rules[ 0 ];

  jsRule.query = require( '../babel/.babelrc.js' );

  delete jsRule.include;

  delete jsRule.exclude;

  jsRule.test = new RegExp( '^' + _.escapeRegExp( process.env.REACTOIDS_BASE ) + '/packages/[^/]+/sources' );


  return config;

};
