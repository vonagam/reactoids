export default function applyD3Props( target, props, defaults ) {

  let modifiers = _.defaults( {}, props, defaults );


  _.each( modifiers, ( value, key ) => {

    target[ key ]( value );

  } );


  return target;

};
