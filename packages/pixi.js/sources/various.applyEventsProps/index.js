export default function applyEventsProps( target, mapping, prevProps, nextProps ) {

  let changeIsMade = false;

  for ( let key in prevProps ) {

    if ( mapping[ key ] === undefined ) continue;

    if ( prevProps[ key ] !== undefined && nextProps[ key ] === undefined ) {

      target.off( mapping[ key ], prevProps[ key ] );

      changeIsMade = true;

    }

  }

  for ( let key in nextProps ) {

    if ( mapping[ key ] === undefined ) continue;

    if ( nextProps[ key ] !== undefined && nextProps[ key ] !== prevProps[ key ] ) {

      if ( prevProps[ key ] ) {

        target.off( mapping[ key ], prevProps[ key ] );

      }

      target.on( mapping[ key ], nextProps[ key ] );

      changeIsMade = true;

    }

  }

};
