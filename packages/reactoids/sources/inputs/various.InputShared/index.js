export default InputShared = {

  OPTIONS_FOCUS_KEYS: {

    ArrowUp: ( index, options ) => ( options.length + index - 1 ) % options.length,

    ArrowLeft: ( index, options ) => ( options.length + index - 1 ) % options.length,

    ArrowDown: ( index, options ) => ( options.length + index + 1 ) % options.length,

    ArrowRight: ( index, options ) => ( options.length + index + 1 ) % options.length,

    Home: ( index, options ) => 0,

    End: ( index, options ) => options.length - 1,

  },

  PropTypes: {

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    jsonType: PropTypes.oneOf( [ 'auto', 'string', 'number', 'boolean', 'null', 'array', 'object', 'skip' ] ),

    boolMapping: PropTypes.oneOrArrayOf( PropTypes.oneOfType( [ PropTypes.string, PropTypes.oneOf( [ undefined ] ) ] ) ),

  },

  mapBoolValue( value, mapping ) {

    if ( _.isArray( mapping ) ) {

      return mapping[ +value ];

    } else {

      return value ? mapping : undefined;

    }

  },

  getOptionsSoulProps( props, filled ) {

    if ( ! filled && props.soulEmptyProps ) {

      return {

        name: _.defaultTo( props.soulEmptyProps.name, props.name ),

        value: props.soulEmptyProps.value || '',

        jsonType: props.soulEmptyProps.jsonType || 'auto',

      };

    } else {

      return {

        name: _.defaultTo( props.soulInvalidName, props.name ),

        validityOnly: true,

        jsonType: 'skip',

      };

    }

  },

};
