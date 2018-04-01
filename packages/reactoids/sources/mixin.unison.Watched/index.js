export default WatchedMixin = Mixin.create( {

  name: 'WatchedMixin',

  argTypes: {

    name: PropTypes.string,

    getValue: PropTypes.func, // ( that: mixed ) => mixed

    onChange: PropTypes.func, // ( that: mixed, currValue: mixed, prevValue: mixed ) => void

  },

  defaultArgs: {

    name: '',

  },

  mixins: [

    { Mixin: UnisonMixin, omit: [ 'update' ] },

  ],

  mixin( ARGS ) {

    const member = `_${ _.pascalCase( ARGS.name ) }WatchedMixin`;


    const update = function( that ) {

      let currValue = ARGS.getValue( that );

      let prevValue = that[ member ];

      if ( _.isEqual( currValue, prevValue ) ) return;

      that[ member ] = currValue;

      ARGS.onChange( that, currValue, prevValue );

    };


    const UnisonArgs = _.assign( UnisonMixin.pick( ARGS ), {

      name: `${ ARGS.name }Watching`,

      update: update,

    } );


    return {

      mixins: [

        UnisonMixin( UnisonArgs ),

      ],

      getInitialMembers() {

        return { [ member ]: undefined };

      },

      componentDidMount() {

        update( this );

      },

    };

  },

} );
