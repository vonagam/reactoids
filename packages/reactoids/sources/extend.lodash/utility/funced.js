export default funced = function( value ) {

  if ( _.isFunction( value ) ) {

    let args = arguments.length > 1 ? _.slice( arguments, 1 ) : undefined;

    return value.apply( this, args );

  } else {

    return value;

  }

};
