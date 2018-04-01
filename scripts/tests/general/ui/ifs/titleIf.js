global.titleIf = function( title, bool ) {

  if ( _.isFunction( title ) ) {

    return title( bool );

  }


  if ( bool ) {

    return title;

  } else {

    return title

      .replace( /^(does|is|should|will)\b/, '$1 not' )

      .replace( /^can\b/, 'cannot' )

      .replace( /^with\b/, 'without' );

  }

};
