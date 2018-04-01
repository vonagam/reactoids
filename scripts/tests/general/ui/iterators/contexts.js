const each = function( input, depth, iteratee, path = [] ) {

  if ( depth == 0 ) {

    return iteratee( input, path );

  }

  _.each( input, ( input, key ) => {

    each( input, depth - 1, iteratee, _.concat( path, key ) );

  } );

};

const contexts = function( type, titleFn, input, depth, suiteFn ) {

  if ( arguments.length === 3 ) return contexts( type, undefined, titleFn, 1, input );

  if ( arguments.length === 4 && _.isNumber( input ) ) return contexts( type, undefined, titleFn, input, depth );

  if ( arguments.length === 4 && ! _.isNumber( input ) ) return contexts( type, titleFn, input, 1, depth );


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


  let context = type ? global.context[ type ] : global.context;

  each( input, depth, ( value, path ) => {

    let key = _.last( path );

    if ( path.length < 2 ) path = key;

    context( titleFn( { path, key, value } ), () => {

      suiteFn( value, path );

    } );

  } );

};


global.contexts = _.partial( contexts, undefined );

global.contexts.skip = _.partial( contexts, 'skip' );

global.contexts.only = _.partial( contexts, 'only' );
