global.defFunc = function( name, definition ) {

  if ( typeof definition === 'function' ) {

    def( name, () => definition );

  } else {

    def( name, () => () => definition );

  }

};
