export default ComponentsMixin = Mixin.create( {

  name: 'ComponentsMixin',

  argTypes: {

    Components: PropTypes.object,

  },

  mixin( ARGS ) {

    return {

      propTypes: {

        Components: PropTypes.shape( _.mapValues( ARGS.Components, _.constant( PropTypes.any ) ) ),

      },

      defaultProps: {

        Components: ARGS.Components,

      },

    };

  },

} );
