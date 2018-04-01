export default function onPropsDiff(

  schema,

  prevProps,

  nextProps,

  onSet,

  onUnset,

  onKeep,

) {

  let hasChange = false;

  for ( let key in prevProps ) {

    if ( ! schema.hasOwnProperty( key ) ) continue;

    if ( nextProps[ key ] === undefined && prevProps[ key ] !== undefined ) {

      if ( onUnset( key ) !== false ) {

        hasChange = true;

      }

    }

  }

  for ( let key in nextProps ) {

    if ( ! schema.hasOwnProperty( key ) ) continue;

    if ( nextProps[ key ] !== undefined ) {

      if ( prevProps[ key ] === nextProps[ key ] ) {

        if ( onKeep( key ) === false ) {

          hasChange = true;

        }

      } else {

        if ( onSet( key ) !== false ) {

          hasChange = true;

        }

      }

    }

  }

  return hasChange;

};
