export default function applyProps( object, schema, prevProps, nextProps ) {

  onPropsDiff( schema, prevProps, nextProps,

    ( key ) => {

      schema[ key ].set( object, nextProps[ key ], key );

    },

    ( key ) => {

      schema[ key ].set( object, schema[ key ].defaultValue, key );

    },

    ( key ) => {

      if ( schema[ key ].copy === true ) {

        schema[ key ].set( object, nextProps[ key ], key );

      }

    },

  );

};
