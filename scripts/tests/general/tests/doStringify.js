global.doStringify = function( value ) {

  let result = JSON.stringify( value, ( key, value ) => {

    if ( _.isUndefined( value ) ) {

      return '__undefined__';

    }

    if ( value === document ) {

      return '__DOCUMENT__';

    }

    if ( value === window ) {

      return '__WINDOW__';

    }

    if ( _.isFunction( value ) ) {

      if ( value.name.indexOf( 'bound checkType' ) !== -1 ) {

        let key = _.findKey( PropTypes, ( x ) => x === value );

        if ( key ) {

          return `__PropTypes.${ key }__`;

        }

      }

      return value.toString().replace( /^function\s/, '' ).replace( /\n/g, ' ' ).replace( /\s+/g, ' ' );

    }

    return value;

  }, 2 );

  result = result.replace( /\s*\n\s*/g, ' ' );

  result = result.replace( /"(\S+?)":/g, '$1:' );

  result = result.replace( /"__(undefined|DOCUMENT|WINDOW|PropTypes\.\w+)__"/g, '$1' );

  result = result.replace( RegExp( _.escapeRegExp( '"noop() { // No operation performed. }"' ), 'g' ), 'noop()' );

  return result;

};
