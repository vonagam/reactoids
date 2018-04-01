'use strict';

const genDefaultConfig = require( '@storybook/react/dist/server/config/defaults/webpack.config.js' );

const webpack = require( 'webpack' );


module.exports = function( baseConfig, env ) {

  let config = genDefaultConfig( baseConfig, env );

  config.plugins.push( new webpack.EnvironmentPlugin( [ 'REACTOIDS_PACKAGE' ] ) );

  config.module.rules[ 0 ].query = require( '../babel/.babelrc.js' );

  return config;

};
