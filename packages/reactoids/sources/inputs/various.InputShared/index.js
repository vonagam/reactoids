export default InputShared = {

  PropTypes: {

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

        name: _.defaultTo( props.soulErrorName, props.name ),

        errorOnly: true,

        jsonType: 'skip',

      };

    }

  },

};
