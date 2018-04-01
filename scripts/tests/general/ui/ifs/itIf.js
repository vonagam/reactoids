const itIf = function( type, title, bool, testFn ) {

  let it = type ? global.it[ type ] : global.it;


  title = titleIf( title, bool );


  if ( testFn.length < 2 ) {

    it( title, () => testFn( bool ) );

  } else {

    it( title, ( done ) => testFn( bool, done ) );

  }

};


global.itIf = _.partial( itIf, undefined );

global.itIf.skip = _.partial( itIf, 'skip' );

global.itIf.only = _.partial( itIf, 'only' );
