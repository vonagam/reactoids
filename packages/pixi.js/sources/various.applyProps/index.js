export default function applyProps( target, defaults, prevProps, nextProps ) {

  let changeIsMade = false;

  for ( let key in prevProps ) {

    if ( ! defaults.hasOwnProperty( key ) ) continue;

    if ( prevProps[ key ] !== undefined && nextProps[ key ] === undefined ) {

      target[ key ] = defaults[ key ];

      changeIsMade = true;

    }

  }

  for ( let key in nextProps ) {

    if ( ! defaults.hasOwnProperty( key ) ) continue;

    if ( nextProps[ key ] !== undefined && nextProps[ key ] !== prevProps[ key ] ) {

      target[ key ] = nextProps[ key ];

      changeIsMade = true;

    }

  }

  return changeIsMade;

};
