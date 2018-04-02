'use strict';

const Plugin = require( 'babel-plugin-transform-resolve-wildcard-import' );


module.exports = function() {

  let plugin = Plugin.apply( undefined, arguments );


  return {

    visitor: {

      Program: {

        exit( path ) {

          path.traverse( plugin.visitor );

        },

      },

    },

  };

};
