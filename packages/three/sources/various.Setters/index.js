export default {

  set: ( defaultValue ) => ( {

    set( that, value, key ) {

      that[ key ] = value;

    },

    defaultValue,

  } ),

  copy: ( defaultValue ) => ( {

    set( that, value, key ) {

      that[ key ].copy( value );

    },

    copy: true,

    defaultValue,

  } ),

  copyDifferent: ( defaultValue ) => ( {

    set( that, value, key ) {

      if ( that[ key ].equals( value ) ) return;

      that[ key ].copy( value );

    },

    copy: true,

    defaultValue,

  } ),

};
