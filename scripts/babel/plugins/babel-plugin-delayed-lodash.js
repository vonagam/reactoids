'use strict';

const Plugin = require( 'babel-plugin-lodash' );


module.exports = function() {

  let plugin = Plugin.apply( undefined, arguments );

  let Program = plugin.visitor.Program;


  return {

    visitor: {

      Program: {

        exit( path, state ) {

          Program( path, state );

          path.traverse( plugin.visitor );

        },

      },

    },

  };

};
