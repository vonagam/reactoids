export default function onPropsDiff( prevProps, nextProps, schema, onReplace, onRemove ) {

  let hasDiff = false;

  for ( let key in prevProps ) {

    if ( ! schema.hasOwnProperty( key ) ) continue;

    if ( prevProps[ key ] !== undefined && nextProps[ key ] === undefined ) {

      if( onRemove( key ) !== false ) {

        hasDiff = true;

      }

    }

  }

  for ( let key in nextProps ) {

    if ( ! schema.hasOwnProperty( key ) ) continue;

    if ( nextProps[ key ] !== undefined && nextProps[ key ] !== prevProps[ key ] ) {

      if ( onReplace( key ) !== false ) {

        hasDiff = true;

      }

    }

  }

  return hasDiff;

};
