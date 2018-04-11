export default BindMixin = Mixin.create( {

  name: 'BindMixin',

  argTypes: {

    binds: PropTypes.arrayOf( PropTypes.string ),

  },

  mixin( ARGS ) {

    return {

      getInitialMembers() {

        return _.transform( ARGS.binds, ( members, name ) => {

          members[ name ] = this[ name ].bind( this );

        }, {} );

      },

    };

  },

} );
