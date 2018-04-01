const each = function( input, depth, iteratee, path = [] ) {

  if ( depth == 0 ) {

    return iteratee( input, path );

  }

  _.each( input, ( input, key ) => {

    each( input, depth - 1, iteratee, _.concat( path, key ) );

  } );

};

const its = function( type, titleFn, input, depth, testFn ) {

  if ( arguments.length === 3 ) return its( type, undefined, titleFn, 1, input );

  if ( arguments.length === 4 && _.isNumber( input ) ) return its( type, undefined, titleFn, input, depth );

  if ( arguments.length === 4 && ! _.isNumber( input ) ) return its( type, titleFn, input, 1, depth );


  if ( _.isString( titleFn ) ) {

    titleFn = _.template( titleFn );

  }

  if ( _.isNil( titleFn ) ) {

    if ( _.isArray( input ) && depth === 1 ) {

      titleFn = ( { path, key, value } ) => value;

    } else {

      titleFn = ( { path, key, value } ) => path;

    }

  }


  let it = type ? global.it[ type ] : global.it;

  each( input, depth, ( value, path ) => {

    let key = _.last( path );

    if ( path.length < 2 ) path = key;

    it( titleFn( { path, key, value } ), () => {

      testFn( value, path );

    } );

  } );

};


global.its = _.partial( its, undefined );

global.its.skip = _.partial( its, 'skip' );

global.its.only = _.partial( its, 'only' );
